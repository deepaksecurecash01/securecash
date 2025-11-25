// utils/statsFallback.js
import fs from 'fs/promises';
import path from 'path';

// 🚀 CHANGED: Path now points to 'src/data' instead of root 'data'
const FALLBACK_PATH = path.join(process.cwd(), 'src/data/stats-fallback.json');

// Static fallback (only used if file read fails)
const STATIC_FALLBACK = {
    customers: 2955,
    servicesPerformed: 578424,
    cashMoved: 2652053680
};

/**
 * Read fallback stats from JSON file
 * Used by Server Components for SSR
 */
export async function readFallbackStats()
{
    try {
        const fileContent = await fs.readFile(FALLBACK_PATH, 'utf8');
        const data = JSON.parse(fileContent);
        return data.stats;
    } catch (error) {
        console.error('[Fallback] Read failed:', error.message);
        return STATIC_FALLBACK;
    }
}

/**
 * Write fallback stats to JSON file
 * Called by API after successful data fetch
 */
export async function writeFallbackStats(stats)
{
    // Skip on Vercel (filesystem not persistent)
    if (process.env.VERCEL === '1') return;

    try {
        const data = {
            version: 'v1',
            lastUpdated: Date.now(),
            stats: {
                customers: stats.customers,
                servicesPerformed: stats.servicesPerformed,
                cashMoved: stats.cashMoved
            },
            source: 'api'
        };

        // Atomic write (write to temp, then rename)
        const tempPath = FALLBACK_PATH + '.tmp';
        await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
        await fs.rename(tempPath, FALLBACK_PATH);

        console.log('[Fallback] Updated successfully');
    } catch (error) {
        console.error('[Fallback] Write failed:', error.message);
    }
}