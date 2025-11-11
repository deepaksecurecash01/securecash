// utils/statsFallback.js
// Server-side utilities for persistent fallback cache
// Works on VM/localhost (filesystem) and Vercel (in-memory)

import fs from 'fs/promises';
import path from 'path';

// Detect environment
const isVercel = process.env.VERCEL === '1';
const FALLBACK_PATH = path.join(process.cwd(), 'data/stats-fallback.json');

// In-memory cache (works in all environments)
let memoryCache = null;

// Static fallback (ultimate safety net)
const STATIC_FALLBACK = {
    version: 'v1',
    lastUpdated: 0,
    stats: {
        customers: 2955,
        servicesPerformed: 578424,
        cashMoved: 2652053680
    },
    source: 'static-fallback'
};

/**
 * Read fallback stats
 * Priority: Memory → Filesystem → Static
 * @returns {Promise<Object>} Fallback stats object
 */
export async function readFallback()
{
    try {
        // Priority 1: Memory cache (fastest, works everywhere)
        if (memoryCache) {
            console.log('[Fallback] Read from memory cache');
            return memoryCache;
        }

        // Priority 2: Filesystem (VM/localhost only)
        if (!isVercel) {
            try {
                const fileContent = await fs.readFile(FALLBACK_PATH, 'utf8');
                const parsed = JSON.parse(fileContent);

                // Validate structure
                if (validateFallbackStructure(parsed)) {
                    memoryCache = parsed; // Cache in memory for future reads
                    console.log('[Fallback] Read from filesystem:', {
                        age: Date.now() - parsed.lastUpdated,
                        source: parsed.source
                    });
                    return parsed;
                } else {
                    console.warn('[Fallback] Invalid file structure, using static fallback');
                }
            } catch (fileError) {
                // File doesn't exist yet or is corrupted
                if (fileError.code !== 'ENOENT') {
                    console.error('[Fallback] Error reading file:', fileError.message);
                } else {
                    console.log('[Fallback] File not found, using static fallback');
                }
            }
        } else {
            console.log('[Fallback] Vercel environment, skipping filesystem');
        }

        // Priority 3: Static fallback (ultimate safety net)
        memoryCache = STATIC_FALLBACK;
        console.log('[Fallback] Using static fallback');
        return STATIC_FALLBACK;

    } catch (error) {
        console.error('[Fallback] Unexpected error:', error);
        return STATIC_FALLBACK;
    }
}

/**
 * Write fallback stats (atomic operation)
 * @param {Object} stats - Stats object from API
 * @returns {Promise<boolean>} Success status
 */
export async function writeFallback(stats)
{
    try {
        // Validate input
        if (!validateStatsInput(stats)) {
            console.error('[Fallback] Invalid stats input:', stats);
            return false;
        }

        const fallbackData = {
            version: 'v1',
            lastUpdated: Date.now(),
            stats: {
                customers: stats.customers,
                servicesPerformed: stats.servicesPerformed,
                cashMoved: stats.cashMoved
            },
            source: stats.source || 'api'
        };

        // Always update memory cache (works everywhere)
        memoryCache = fallbackData;
        console.log('[Fallback] Updated memory cache');

        // Try to write to filesystem (VM/localhost only)
        if (!isVercel) {
            try {
                // Ensure directory exists
                const directory = path.dirname(FALLBACK_PATH);
                await fs.mkdir(directory, { recursive: true });

                // Atomic write: write to temp file, then rename
                const tempPath = FALLBACK_PATH + '.tmp';
                await fs.writeFile(tempPath, JSON.stringify(fallbackData, null, 2), 'utf8');
                await fs.rename(tempPath, FALLBACK_PATH);

                console.log('[Fallback] Written to filesystem:', {
                    path: FALLBACK_PATH,
                    stats: fallbackData.stats
                });
                return true;

            } catch (fileError) {
                console.error('[Fallback] Failed to write filesystem:', fileError.message);
                // Continue anyway - memory cache is updated
            }
        } else {
            console.log('[Fallback] Vercel environment, memory cache only');
        }

        return true;

    } catch (error) {
        console.error('[Fallback] Write error:', error);
        return false;
    }
}

/**
 * Validate fallback file structure
 * @param {Object} data - Parsed fallback data
 * @returns {boolean} Valid or not
 */
function validateFallbackStructure(data)
{
    return (
        data &&
        data.version === 'v1' &&
        data.stats &&
        typeof data.stats.customers === 'number' &&
        typeof data.stats.servicesPerformed === 'number' &&
        typeof data.stats.cashMoved === 'number' &&
        data.stats.customers > 0 &&
        data.stats.servicesPerformed > 0 &&
        data.stats.cashMoved > 0
    );
}

/**
 * Validate stats input before writing
 * @param {Object} stats - Stats object
 * @returns {boolean} Valid or not
 */
function validateStatsInput(stats)
{
    return (
        stats &&
        typeof stats.customers === 'number' &&
        typeof stats.servicesPerformed === 'number' &&
        typeof stats.cashMoved === 'number' &&
        stats.customers > 0 &&
        stats.servicesPerformed > 0 &&
        stats.cashMoved > 0
    );
}

/**
 * Get cache metadata (for debugging)
 * @returns {Promise<Object>} Cache metadata
 */
export async function getFallbackMetadata()
{
    try {
        const fallback = await readFallback();

        return {
            hasMemoryCache: memoryCache !== null,
            hasFileCache: !isVercel && await fileExists(FALLBACK_PATH),
            isVercel,
            age: Date.now() - fallback.lastUpdated,
            ageFormatted: formatAge(Date.now() - fallback.lastUpdated),
            source: fallback.source,
            stats: fallback.stats
        };
    } catch (error) {
        console.error('[Fallback] Metadata error:', error);
        return null;
    }
}

/**
 * Check if file exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>}
 */
async function fileExists(filePath)
{
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/**
 * Format age in human-readable format
 * @param {number} ageMs - Age in milliseconds
 * @returns {string} Formatted age
 */
function formatAge(ageMs)
{
    const seconds = Math.floor(ageMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

/**
 * Clear all caches (for testing/debugging)
 * @returns {Promise<boolean>}
 */
export async function clearAllCaches()
{
    try {
        memoryCache = null;

        if (!isVercel) {
            try {
                await fs.unlink(FALLBACK_PATH);
                console.log('[Fallback] Cleared filesystem cache');
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error('[Fallback] Error clearing file:', error);
                }
            }
        }

        console.log('[Fallback] All caches cleared');
        return true;
    } catch (error) {
        console.error('[Fallback] Clear error:', error);
        return false;
    }
}