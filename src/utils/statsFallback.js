import fs from 'fs/promises';
import path from 'path';

const FALLBACK_PATH = path.join(process.cwd(), 'src/data/stats-fallback.json');

const STATIC_FALLBACK = {
    customers: 2955,
    servicesPerformed: 578424,
    cashMoved: 2652053680
};

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

export async function writeFallbackStats(stats)
{
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

        const tempPath = FALLBACK_PATH + '.tmp';
        await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
        await fs.rename(tempPath, FALLBACK_PATH);
    } catch (error) {
        console.error('[Fallback] Write failed:', error.message);
    }
}