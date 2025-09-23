// app/api/stats/scc/route.js
import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define schemas
const locationSchema = new mongoose.Schema({}, { collection: 'locations', strict: false });
const transactionSchema = new mongoose.Schema({}, { collection: 'transactions', strict: false });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

// Cache configuration
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 HOURS
const STALE_WINDOW = 6 * 60 * 60 * 1000; // 6 HOURS

// In-memory cache - simple and fast
let cache = {
    data: null,
    timestamp: null,
    isRefreshing: false
};

// Check if cache is fresh (within TTL)
function isCacheFresh()
{
    return cache.data &&
        cache.timestamp &&
        (Date.now() - cache.timestamp) < CACHE_TTL;
}

// Check if cache is stale but usable (expired but within stale window)
function isCacheStale()
{
    return cache.data &&
        cache.timestamp &&
        (Date.now() - cache.timestamp) < STALE_WINDOW;
}

// Optimized database queries
async function fetchFreshStats()
{
    const startTime = Date.now();

    await connectMongo();

    // Run all queries in parallel
    const [customers, servicesPerformed, cashMovedResult] = await Promise.all([
        // 1. Active Locations Count
        Location.countDocuments({
            Status: 'ACTIVE',
            Zone: 'SCC'
        }),

        // 2. Total Transactions Count
        Transaction.countDocuments({
            Organisation: 'SCC'
        }),

        // 3. Cash Moved - Optimized aggregation
        Transaction.aggregate([
            // Match SCC transactions with relevant items
            {
                $match: {
                    Organisation: 'SCC',
                    'Items.Type': { $in: ['Bank Service', 'Change Order'] }
                }
            },

            // Unwind Items array
            {
                $unwind: {
                    path: '$Items',
                    preserveNullAndEmptyArrays: false
                }
            },

            // Filter for specific item types with valid cash
            {
                $match: {
                    'Items.Type': { $in: ['Bank Service', 'Change Order'] },
                    'Items.Cash': {
                        $exists: true,
                        $ne: null,
                        $ne: '',
                        $ne: '0',
                        $ne: '0.00',
                        $ne: 0
                    }
                }
            },

            // Convert cash to number and sum
            {
                $group: {
                    _id: null,
                    totalCash: {
                        $sum: {
                            $toDouble: {
                                $replaceAll: {
                                    input: { $trim: { input: { $toString: '$Items.Cash' } } },
                                    find: ',',
                                    replacement: ''
                                }
                            }
                        }
                    }
                }
            }
        ]).allowDiskUse(true)
    ]);

    const cashMoved = cashMovedResult.length > 0 ? Math.round(cashMovedResult[0].totalCash) : 0;
    const queryTime = Date.now() - startTime;

    const stats = {
        customers,
        servicesPerformed,
        cashMoved,
        asOf: Date.now(),
        source: 'db'
    };

    console.log(`Stats fetched in ${queryTime}ms:`, stats);

    // Update cache
    cache = {
        data: stats,
        timestamp: Date.now(),
        isRefreshing: false
    };

    return stats;
}

// Background refresh function
async function backgroundRefresh()
{
    if (cache.isRefreshing) return;

    console.log('Starting background refresh...');
    cache.isRefreshing = true;

    try {
        await fetchFreshStats();
        console.log('Background refresh completed');
    } catch (error) {
        console.error('Background refresh failed:', error);
        cache.isRefreshing = false;
    }
}

export async function GET()
{
    try {
        // Return fresh cache immediately
        if (isCacheFresh()) {
            console.log('Cache hit - returning fresh data');
            return NextResponse.json({
                ...cache.data,
                source: 'cache'
            }, {
                headers: {
                    'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600'
                }
            });
        }

        // Return stale cache while refreshing in background
        if (isCacheStale()) {
            console.log('Cache stale - returning stale data and refreshing');

            // Start background refresh (don't wait)
            backgroundRefresh();

            return NextResponse.json({
                ...cache.data,
                source: 'stale-cache'
            }, {
                headers: {
                    'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=1800'
                }
            });
        }

        // No cache available - fetch fresh data
        console.log('Cache miss - fetching fresh data');
        const freshStats = await fetchFreshStats();

        return NextResponse.json(freshStats, {
            headers: {
                'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600'
            }
        });

    } catch (error) {
        console.error('API error:', error);

        // If we have any cached data (even very old), use it
        if (cache.data) {
            console.log('Error occurred - returning cached data as fallback');
            return NextResponse.json({
                ...cache.data,
                source: 'error-cache'
            }, {
                headers: {
                    'Cache-Control': 'public, max-age=0, s-maxage=60'
                }
            });
        }

        // Ultimate fallback when no cache exists
        console.log('No cache available - using ultimate fallback');
        return NextResponse.json({
            customers: 2909,
            servicesPerformed: 556824,
            cashMoved: 2546386710,
            asOf: Date.now(),
            source: 'fallback'
        }, {
            status: 200,
            headers: {
                'Cache-Control': 'public, max-age=0, s-maxage=60'
            }
        });
    }
}