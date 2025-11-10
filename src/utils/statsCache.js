// utils/statsCache.js
// Pure utility functions for managing counter stats in localStorage

const CACHE_KEY = 'scc_stats';
const CACHE_VERSION = 'v1';

/**
 * Get stats from localStorage
 * @returns {Object|null} Cached stats or null if not found
 */
export function getFromCache()
{
    try {
        // Server-side check
        if (typeof window === 'undefined') {
            console.log('❌ getFromCache: Running on server, skipping');
            return null;
        }

        const cached = localStorage.getItem(CACHE_KEY);

        if (!cached) {
            console.log('❌ getFromCache: No cache found');
            return null;
        }

        const parsed = JSON.parse(cached);

        // Validate structure
        if (
            parsed &&
            parsed.version === CACHE_VERSION &&
            typeof parsed.customers === 'number' &&
            typeof parsed.servicesPerformed === 'number' &&
            typeof parsed.cashMoved === 'number'
        ) {
            const age = Date.now() - parsed.timestamp;
            console.log('✅ getFromCache: Valid cache found', {
                age: `${Math.floor(age / 1000)}s`,
                customers: parsed.customers,
                servicesPerformed: parsed.servicesPerformed,
                cashMoved: parsed.cashMoved
            });
            return parsed;
        }

        console.log('⚠️  getFromCache: Invalid cache structure, clearing');
        clearCache();
        return null;

    } catch (error) {
        console.error('❌ getFromCache error:', error);
        return null;
    }
}

/**
 * Save stats to localStorage
 * @param {Object} stats - Stats object to cache
 * @returns {boolean} Success status
 */
export function saveToCache(stats)
{
    try {
        // Server-side check
        if (typeof window === 'undefined') {
            console.log('❌ saveToCache: Running on server, skipping');
            return false;
        }

        // Validate input
        if (
            !stats ||
            typeof stats.customers !== 'number' ||
            typeof stats.servicesPerformed !== 'number' ||
            typeof stats.cashMoved !== 'number'
        ) {
            console.error('❌ saveToCache: Invalid stats object', stats);
            return false;
        }

        const cacheData = {
            version: CACHE_VERSION,
            customers: stats.customers,
            servicesPerformed: stats.servicesPerformed,
            cashMoved: stats.cashMoved,
            timestamp: Date.now(),
            source: stats.source || 'api'
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        console.log('✅ saveToCache: Stats cached successfully', {
            customers: cacheData.customers,
            servicesPerformed: cacheData.servicesPerformed,
            cashMoved: cacheData.cashMoved,
            source: cacheData.source
        });

        return true;

    } catch (error) {
        console.error('❌ saveToCache error:', error);
        return false;
    }
}

/**
 * Clear the stats cache
 * @returns {boolean} Success status
 */
export function clearCache()
{
    try {
        if (typeof window === 'undefined') {
            return false;
        }

        localStorage.removeItem(CACHE_KEY);
        console.log('✅ clearCache: Cache cleared successfully');
        return true;

    } catch (error) {
        console.error('❌ clearCache error:', error);
        return false;
    }
}

/**
 * Get cache age in milliseconds
 * @returns {number|null} Age in ms or null if no cache
 */
export function getCacheAge()
{
    try {
        const cached = getFromCache();
        if (!cached || !cached.timestamp) {
            return null;
        }

        return Date.now() - cached.timestamp;

    } catch (error) {
        console.error('❌ getCacheAge error:', error);
        return null;
    }
}

/**
 * Format cache age for display (human-readable)
 * @returns {string} Human-readable cache age
 */
export function getCacheAgeFormatted()
{
    const age = getCacheAge();

    if (!age) {
        return 'Never';
    }

    const seconds = Math.floor(age / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
}

/**
 * Check if cache is considered stale (older than 24 hours)
 * @returns {boolean}
 */
export function isCacheStale()
{
    const age = getCacheAge();

    if (!age) {
        return true;
    }

    const STALE_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours
    return age > STALE_THRESHOLD;
}

/**
 * Check if cache exists
 * @returns {boolean}
 */
export function hasCachedStats()
{
    return getFromCache() !== null;
}

/**
 * Get cache metadata
 * @returns {Object|null} Cache metadata or null
 */
export function getCacheMetadata()
{
    try {
        const cached = getFromCache();

        if (!cached) {
            return null;
        }

        return {
            version: cached.version,
            timestamp: cached.timestamp,
            age: getCacheAge(),
            ageFormatted: getCacheAgeFormatted(),
            isStale: isCacheStale(),
            source: cached.source
        };

    } catch (error) {
        console.error('❌ getCacheMetadata error:', error);
        return null;
    }
}