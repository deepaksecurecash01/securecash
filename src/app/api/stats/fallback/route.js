// app/api/stats/fallback/route.js
// Fast API endpoint for fallback stats
// Returns cached stats instantly (<10ms)

import { NextResponse } from 'next/server';
import { readFallback, getFallbackMetadata } from '@/utils/statsFallback';

/**
 * GET /api/stats/fallback
 * Returns fallback stats (memory/file cache)
 * Extremely fast, no database queries
 */
export async function GET(request)
{
    try {
        const startTime = Date.now();

        // Read fallback (memory → file → static)
        const fallback = await readFallback();

        const responseTime = Date.now() - startTime;

        console.log(`[Fallback API] Response time: ${responseTime}ms, source: ${fallback.source}`);

        return NextResponse.json(
            {
                ...fallback.stats,
                source: fallback.source,
                lastUpdated: fallback.lastUpdated,
                responseTime: `${responseTime}ms`
            },
            {
                status: 200,
                headers: {
                    // Aggressive caching for fallback endpoint
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                    'X-Cache-Source': fallback.source,
                    'X-Response-Time': `${responseTime}ms`,
                    'X-Last-Updated': new Date(fallback.lastUpdated).toISOString()
                }
            }
        );

    } catch (error) {
        console.error('[Fallback API] Error:', error);

        // Return static fallback even on error
        return NextResponse.json(
            {
                customers: 2955,
                servicesPerformed: 578424,
                cashMoved: 2652053680,
                source: 'error-fallback',
                error: error.message
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, max-age=60',
                    'X-Cache-Source': 'error-fallback'
                }
            }
        );
    }
}

/**
 * GET /api/stats/fallback?metadata=true
 * Returns metadata about fallback cache (debugging)
 */
export async function GET_metadata(request)
{
    try {
        const url = new URL(request.url);
        const showMetadata = url.searchParams.get('metadata') === 'true';

        if (showMetadata) {
            const metadata = await getFallbackMetadata();
            return NextResponse.json(metadata, { status: 200 });
        }

        // Regular fallback request
        return GET(request);

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}