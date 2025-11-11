// app/api/stats/scc/route.js
// Main API route with fallback persistence

import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { writeFallback } from "@/utils/statsFallback";

// Define schemas
const locationSchema = new mongoose.Schema({}, { collection: 'locations', strict: false });
const transactionSchema = new mongoose.Schema({}, { collection: 'transactions', strict: false });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

// Cache configuration
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 HOURS - Fresh cache
const STALE_WINDOW = 24 * 60 * 60 * 1000; // 24 HOURS - Stale but usable

// In-memory cache
let cache = {
  data: null,
  timestamp: null,
  isRefreshing: false
};

/**
 * Check if cache is fresh
 */
function isCacheFresh()
{
  return cache.data &&
    cache.timestamp &&
    (Date.now() - cache.timestamp) < CACHE_TTL;
}

/**
 * Check if cache is stale but usable
 */
function isCacheStale()
{
  return cache.data &&
    cache.timestamp &&
    (Date.now() - cache.timestamp) < STALE_WINDOW;
}

/**
 * Fetch fresh stats from database
 */
async function fetchFreshStats()
{
  const startTime = Date.now();

  try {
    await connectMongo();

    console.log('[Stats API] Fetching fresh data from database...');

    // Run queries in parallel
    const [customers, servicesPerformed, cashMovedResult] = await Promise.all([
      Location.countDocuments({
        Status: 'ACTIVE',
        Zone: 'SCC'
      }),

      Transaction.countDocuments({
        Organisation: 'SCC'
      }),

      Transaction.aggregate([
        {
          $match: {
            Organisation: 'SCC',
            'Items.Type': { $in: ['Bank Service', 'Change Order'] }
          }
        },
        {
          $unwind: {
            path: '$Items',
            preserveNullAndEmptyArrays: false
          }
        },
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

    console.log(`[Stats API] Query completed in ${queryTime}ms:`, {
      customers,
      servicesPerformed,
      cashMoved
    });

    // Update in-memory cache
    cache = {
      data: stats,
      timestamp: Date.now(),
      isRefreshing: false
    };

    // Write to fallback storage (non-blocking)
    writeFallback(stats).catch(err =>
      console.error('[Stats API] Failed to write fallback:', err)
    );

    return stats;

  } catch (error) {
    console.error('[Stats API] Database query failed:', error);
    cache.isRefreshing = false;
    throw error;
  }
}

/**
 * Background refresh
 */
async function backgroundRefresh()
{
  if (cache.isRefreshing) {
    console.log('[Stats API] Background refresh already in progress');
    return;
  }

  console.log('[Stats API] Starting background refresh...');
  cache.isRefreshing = true;

  try {
    await fetchFreshStats();
    console.log('[Stats API] Background refresh completed');
  } catch (error) {
    console.error('[Stats API] Background refresh failed:', error);
    cache.isRefreshing = false;
  }
}

/**
 * Main GET handler
 */
export async function GET()
{
  try {
    // Strategy 1: Fresh cache
    if (isCacheFresh()) {
      console.log('[Stats API] Cache HIT (fresh)');

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

    // Strategy 2: Stale cache with background refresh
    if (isCacheStale()) {
      console.log('[Stats API] Cache STALE - returning stale + refreshing');

      // Non-blocking background refresh
      backgroundRefresh().catch(err =>
        console.error('[Stats API] Background refresh error:', err)
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

    // Strategy 3: No cache - fetch fresh
    console.log('[Stats API] Cache MISS - fetching fresh data');
    const freshStats = await fetchFreshStats();

    return NextResponse.json(freshStats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
        'X-Cache-Status': 'MISS'
      }
    });

  } catch (error) {
    console.error('[Stats API] Error:', error);

    // Fallback 1: Emergency cache
    if (cache.data) {
      console.log('[Stats API] Error - returning emergency cache');

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

    // Fallback 2: Static values
    console.log('[Stats API] No cache - returning static fallback');

    return NextResponse.json(
      {
        customers: 2990,
        servicesPerformed: 578424,
        cashMoved: 2652053680,
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
 * Manual refresh endpoint
 */
export async function POST()
{
  try {
    console.log('[Stats API] Manual refresh triggered');

    // Clear cache
    cache = {
      data: null,
      timestamp: null,
      isRefreshing: false
    };

    // Fetch fresh
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
    console.error('[Stats API] Manual refresh failed:', error);

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