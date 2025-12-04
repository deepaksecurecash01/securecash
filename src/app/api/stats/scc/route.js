import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { writeFallbackStats } from "@/utils/statsFallback";

const locationSchema = new mongoose.Schema({}, { collection: 'locations', strict: false });
const transactionSchema = new mongoose.Schema({}, { collection: 'transactions', strict: false });

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

const CACHE_TTL = 6 * 60 * 60 * 1000;
const STALE_WINDOW = 24 * 60 * 60 * 1000;

let cache = {
  data: null,
  timestamp: null,
  isRefreshing: false
};

const isCacheFresh = () =>
{
  return cache.data && cache.timestamp && (Date.now() - cache.timestamp) < CACHE_TTL;
};

const isCacheStale = () =>
{
  return cache.data && cache.timestamp && (Date.now() - cache.timestamp) < STALE_WINDOW;
};

const fetchFreshStats = async () =>
{
  const startTime = Date.now();

  await connectMongo();

  const [customers, servicesPerformed, cashMovedResult] = await Promise.all([
    Location.countDocuments({ Status: 'ACTIVE', Zone: 'SCC' }),
    Transaction.countDocuments({ Organisation: 'SCC' }),
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

  cache = {
    data: stats,
    timestamp: Date.now(),
    isRefreshing: false
  };

  writeFallbackStats(stats).catch(err =>
    console.error('[API] Fallback write failed:', err)
  );

  return stats;
};

const backgroundRefresh = async () =>
{
  if (cache.isRefreshing) return;
  cache.isRefreshing = true;

  try {
    await fetchFreshStats();
  } catch (error) {
    console.error('[API] Background refresh failed:', error);
    cache.isRefreshing = false;
  }
};

export async function GET()
{
  try {
    if (isCacheFresh()) {
      return NextResponse.json(
        { ...cache.data, source: 'cache-fresh' },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
            'X-Cache-Status': 'HIT'
          }
        }
      );
    }

    if (isCacheStale()) {
      backgroundRefresh().catch(console.error);

      return NextResponse.json(
        { ...cache.data, source: 'cache-stale' },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=1800',
            'X-Cache-Status': 'STALE'
          }
        }
      );
    }

    const freshStats = await fetchFreshStats();

    return NextResponse.json(freshStats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
        'X-Cache-Status': 'MISS'
      }
    });

  } catch (error) {
    console.error('[API] Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

export async function POST()
{
  try {
    cache = { data: null, timestamp: null, isRefreshing: false };
    const freshStats = await fetchFreshStats();

    return NextResponse.json({
      success: true,
      message: 'Cache refreshed',
      data: freshStats
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Refresh failed',
      error: error.message
    }, { status: 500 });
  }
}