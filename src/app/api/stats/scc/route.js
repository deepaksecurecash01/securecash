// app/api/stats/scc/route.js
// Optimized API route with improved caching and error handling

import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define schemas
const locationSchema = new mongoose.Schema({}, { collection: 'locations', strict: false });
const transactionSchema = new mongoose.Schema({}, { collection: 'transactions', strict: false });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

// Cache configuration
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 HOURS - Fresh cache
const STALE_WINDOW = 24 * 60 * 60 * 1000; // 24 HOURS - Stale but usable

// In-memory cache - survives between requests in same instance
let cache = {
  data: null,
  timestamp: null,
  isRefreshing: false
};

/**
 * Check if cache is fresh (within TTL)
 */
function isCacheFresh() {
  return cache.data &&
    cache.timestamp &&
    (Date.now() - cache.timestamp) < CACHE_TTL;
}

/**
 * Check if cache is stale but usable (expired but within stale window)
 */
function isCacheStale() {
  return cache.data &&
    cache.timestamp &&
    (Date.now() - cache.timestamp) < STALE_WINDOW;
}

/**
 * Fetch fresh stats from database with optimized queries
 */
async function fetchFreshStats() {
  const startTime = Date.now();

  try {
    await connectMongo();

    console.log('Fetching fresh stats from database...');

    // Run all queries in parallel for maximum performance
    const [customers, servicesPerformed, cashMovedResult] = await Promise.all([
      // Query 1: Active Locations Count
      Location.countDocuments({
        Status: 'ACTIVE',
        Zone: 'SCC'
      }),

      // Query 2: Total Transactions Count
      Transaction.countDocuments({
        Organisation: 'SCC'
      }),

      // Query 3: Cash Moved - Optimized aggregation
      Transaction.aggregate([
        // Stage 1: Match SCC transactions with relevant items
        {
          $match: {
            Organisation: 'SCC',
            'Items.Type': { $in: ['Bank Service', 'Change Order'] }
          }
        },

        // Stage 2: Unwind Items array
        {
          $unwind: {
            path: '$Items',
            preserveNullAndEmptyArrays: false
          }
        },

        // Stage 3: Filter for specific item types with valid cash
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

        // Stage 4: Convert cash to number and sum
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
      queryTime: `${queryTime}ms`,
      source: 'database'
    };

    console.log(`✅ Stats fetched successfully in ${queryTime}ms:`, {
      customers,
      servicesPerformed,
      cashMoved
    });

    // Update cache
    cache = {
      data: stats,
      timestamp: Date.now(),
      isRefreshing: false
    };

    return stats;

  } catch (error) {
    console.error('❌ Database query failed:', error);
    cache.isRefreshing = false;
    throw error;
  }
}

/**
 * Background refresh function - doesn't block response
 */
async function backgroundRefresh() {
  // Prevent multiple simultaneous refreshes
  if (cache.isRefreshing) {
    console.log('⏳ Background refresh already in progress, skipping...');
    return;
  }

  console.log('🔄 Starting background refresh...');
  cache.isRefreshing = true;

  try {
    await fetchFreshStats();
    console.log('✅ Background refresh completed successfully');
  } catch (error) {
    console.error('❌ Background refresh failed:', error);
    cache.isRefreshing = false;
  }
}

/**
 * Main GET handler
 */
export async function GET() {
  try {
    // STRATEGY 1: Return fresh cache immediately (best case)
    if (isCacheFresh()) {
      console.log('✅ Cache HIT - Returning fresh data');
      
      return NextResponse.json(
        {
          ...cache.data,
          source: 'cache-fresh'
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
            'X-Cache-Status': 'HIT',
            'X-Cache-Age': `${Math.floor((Date.now() - cache.timestamp) / 1000)}s`
          }
        }
      );
    }

    // STRATEGY 2: Return stale cache while refreshing in background
    if (isCacheStale()) {
      console.log('⚠️  Cache STALE - Returning stale data and triggering background refresh');

      // Start background refresh (non-blocking)
      backgroundRefresh().catch(err => 
        console.error('Background refresh error:', err)
      );

      return NextResponse.json(
        {
          ...cache.data,
          source: 'cache-stale'
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=1800',
            'X-Cache-Status': 'STALE',
            'X-Cache-Age': `${Math.floor((Date.now() - cache.timestamp) / 1000)}s`
          }
        }
      );
    }

    // STRATEGY 3: No cache available - fetch fresh data (blocking)
    console.log('❌ Cache MISS - Fetching fresh data');
    const freshStats = await fetchFreshStats();

    return NextResponse.json(freshStats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
        'X-Cache-Status': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ API ERROR:', error);

    // FALLBACK 1: If we have any cached data (even very old), use it
    if (cache.data) {
      console.log('⚠️  Error occurred - Returning cached data as emergency fallback');
      
      return NextResponse.json(
        {
          ...cache.data,
          source: 'cache-emergency'
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=0, s-maxage=60',
            'X-Cache-Status': 'ERROR-FALLBACK'
          }
        }
      );
    }

    // FALLBACK 2: Ultimate fallback when no cache exists at all
    console.log('⚠️  No cache available - Using static fallback');
    
    return NextResponse.json(
      {
        customers: 2900,
        servicesPerformed: 556000,
        cashMoved: 2546000000,
        asOf: Date.now(),
        source: 'static-fallback'
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=0, s-maxage=60',
          'X-Cache-Status': 'STATIC-FALLBACK'
        }
      }
    );
  }
}

/**
 * Optional: Manual cache refresh endpoint
 * Usage: POST /api/stats/scc
 */
export async function POST() {
  try {
    console.log('🔄 Manual refresh triggered');
    
    // Clear existing cache
    cache = {
      data: null,
      timestamp: null,
      isRefreshing: false
    };
    
    // Fetch fresh data
    const freshStats = await fetchFreshStats();
    
    return NextResponse.json(
      {
        success: true,
        message: 'Cache refreshed successfully',
        data: freshStats
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Manual refresh failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to refresh cache',
        error: error.message
      },
      { status: 500 }
    );
  }
}