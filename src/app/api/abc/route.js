// app/api/dashboard/live-stats/route.js
import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define schemas based on your database structure
const locationSchema = new mongoose.Schema({}, { collection: 'locations', strict: false });
const transactionSchema = new mongoose.Schema({}, { collection: 'transactions', strict: false });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

// Cache for backup/fallback values (in-memory)
let lastKnownStats = null;
let lastUpdateTime = null;

export async function GET(request)
{
    try {
        await connectMongo();

        // Parallel execution of all queries for better performance
        const [activeLocationsCount, totalTransactions, cashMovedResult] = await Promise.all([
            // 1. Active Locations (Customers) - SCC only
            Location.countDocuments({
                Status: 'ACTIVE',
                Zone: 'SCC'
            }),

            // 2. Total Transactions (Services Performed) - SCC only
            Transaction.countDocuments({
                Organisation: 'SCC'
            }),

            // 3. Total Cash Moved from Bank Service and Change Order items - SCC only
            Transaction.aggregate([
                // Filter by SCC organization
                { $match: { Organisation: 'SCC' } },

                // Unwind Items array
                {
                    $unwind: {
                        path: "$Items",
                        preserveNullAndEmptyArrays: false
                    }
                },

                // Filter for Bank Service and Change Order with Cash values
                {
                    $match: {
                        "Items.Type": { $in: ["Bank Service", "Change Order"] },
                        "Items.Cash": {
                            $exists: true,
                            $ne: "",
                            $ne: null,
                            $ne: "0",
                            $ne: "0.00"
                        }
                    }
                },

                // Convert Cash string to number with proper error handling
                {
                    $addFields: {
                        cashValue: {
                            $convert: {
                                input: {
                                    $cond: {
                                        if: { $isNumber: "$Items.Cash" },
                                        then: "$Items.Cash",
                                        else: {
                                            // Clean string: trim whitespace, remove commas
                                            $trim: {
                                                input: {
                                                    $replaceAll: {
                                                        input: { $toString: "$Items.Cash" },
                                                        find: ",",
                                                        replacement: ""
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                to: "double",
                                onError: 0,
                                onNull: 0
                            }
                        }
                    }
                },

                // Group and sum all cash values
                {
                    $group: {
                        _id: null,
                        totalCashMoved: { $sum: "$cashValue" },
                        cashTransactionCount: { $sum: 1 }
                    }
                }
            ])
        ]);

        // Extract results
        const totalCashMoved = cashMovedResult.length > 0 ? cashMovedResult[0].totalCashMoved : 0;

        // Build fresh stats object
        const stats = {
            customers: activeLocationsCount,
            servicesPerformed: totalTransactions,
            cashMoved: Math.round(totalCashMoved * 100) / 100,
            lastUpdated: new Date().toISOString(),
            cached: false
        };

        // Store as backup for future failures
        lastKnownStats = stats;
        lastUpdateTime = Date.now();

        return NextResponse.json(stats, {
            headers: {
                // Cache for 30 minutes, serve stale for up to 1 hour while revalidating
                'Cache-Control': 's-maxage=1800, stale-while-revalidate=3600',
                'CDN-Cache-Control': 'max-age=1800',
                // CORS headers if needed
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error("Error fetching live statistics:", error);

        // Fallback to last known stats if available and recent (within 24 hours)
        if (lastKnownStats && lastUpdateTime && (Date.now() - lastUpdateTime < 24 * 60 * 60 * 1000)) {
            console.log("Returning cached fallback stats");
            return NextResponse.json({
                ...lastKnownStats,
                cached: true,
                lastUpdated: new Date(lastUpdateTime).toISOString(),
                fallback: true
            }, {
                headers: {
                    // Shorter cache on error to retry sooner
                    'Cache-Control': 's-maxage=300, stale-while-revalidate=600'
                }
            });
        }

        // Ultimate fallback with SCC-specific estimates
        const fallbackStats = {
            customers: 2909,
            servicesPerformed: 556824,
            cashMoved: 2546386710,
            lastUpdated: new Date().toISOString(),
            cached: true,
            fallback: true,
            error: "Live data unavailable"
        };

        return NextResponse.json(fallbackStats, {
            status: 200, // Still return 200 to avoid breaking UI
            headers: {
                'Cache-Control': 's-maxage=60, stale-while-revalidate=300' // Very short cache on fallback
            }
        });
    }
}