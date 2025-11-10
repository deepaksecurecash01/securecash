// hooks/useStatsCache.js
// Custom hook for managing stats with localStorage cache and API fetching

import { useState, useEffect, useRef, useCallback } from 'react';
import { getFromCache, saveToCache } from '@/utils/statsCache';

// Static fallback values (update these weekly)
const STATIC_FALLBACK = {
    customers: 2955,
    servicesPerformed: 578424,
    cashMoved: 2652053680,
    source: 'static-fallback'
};

/**
 * Custom hook for stats with intelligent caching
 * @returns {Object} { stats, isInitialLoad, isUpdating, error, refresh }
 */
export function useStatsCache()
{
    // State management
    const [stats, setStats] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    // Refs
    const hasFetchedRef = useRef(false);
    const refreshTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    /**
     * Initialize with cached or fallback data
     */
    useEffect(() =>
    {
        console.log('🔄 useStatsCache: Initializing...');

        const cached = getFromCache();

        if (cached) {
            console.log('✅ useStatsCache: Loaded from cache');
            setStats(cached);
        } else {
            console.log('⚠️  useStatsCache: No cache found, using static fallback');
            setStats(STATIC_FALLBACK);
        }

        setIsInitialLoad(false);
    }, []);

    /**
     * Fetch fresh stats from API
     */
    const fetchStats = useCallback(async (showLoading = false) =>
    {
        // Prevent multiple simultaneous fetches
        if (hasFetchedRef.current && showLoading) {
            console.log('⏳ fetchStats: Already fetching, skipping...');
            return;
        }

        try {
            if (showLoading) {
                console.log('🔄 fetchStats: Starting API call with loading state...');
                setIsUpdating(true);
                hasFetchedRef.current = true;
            } else {
                console.log('🔄 fetchStats: Starting background API call...');
            }

            setError(null);

            // Create abort controller for this request
            abortControllerRef.current = new AbortController();

            const response = await fetch('/api/stats/scc', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                cache: 'default',
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            console.log('✅ fetchStats: API response received', {
                source: data.source,
                customers: data.customers,
                servicesPerformed: data.servicesPerformed,
                cashMoved: data.cashMoved
            });

            // Validate data structure
            if (
                data &&
                typeof data.customers === 'number' &&
                typeof data.servicesPerformed === 'number' &&
                typeof data.cashMoved === 'number'
            ) {
                // Save to localStorage
                saveToCache(data);

                // Update state
                setStats(data);
                setError(null);

                console.log('✅ fetchStats: Stats updated successfully');
            } else {
                throw new Error('Invalid data structure received from API');
            }

        } catch (fetchError) {
            // Don't log error if request was aborted (component unmounted)
            if (fetchError.name === 'AbortError') {
                console.log('⚠️  fetchStats: Request aborted');
                return;
            }

            console.error('❌ fetchStats error:', fetchError);
            setError(fetchError.message);

            // Keep showing cached value on error
            // If no cache exists, the static fallback is already shown

        } finally {
            if (showLoading) {
                setIsUpdating(false);
            }
        }
    }, []);

    /**
     * Trigger initial API fetch after component mounts
     */
    useEffect(() =>
    {
        if (!isInitialLoad && !hasFetchedRef.current) {
            console.log('🚀 useStatsCache: Triggering initial API fetch...');

            // Small delay to prioritize rendering cached data first
            const timer = setTimeout(() =>
            {
                fetchStats(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isInitialLoad, fetchStats]);

    /**
     * Auto-refresh every 30 minutes
     */
    useEffect(() =>
    {
        if (!isInitialLoad && hasFetchedRef.current) {
            // Clear any existing timeout
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            // Refresh interval: 30 minutes
            const REFRESH_INTERVAL = 30 * 60 * 1000;

            console.log('⏰ useStatsCache: Setting up auto-refresh (30 minutes)');

            refreshTimeoutRef.current = setTimeout(() =>
            {
                console.log('🔄 useStatsCache: Auto-refresh triggered');
                hasFetchedRef.current = false;
                fetchStats(false); // Background refresh without loading state
            }, REFRESH_INTERVAL);

            return () =>
            {
                if (refreshTimeoutRef.current) {
                    clearTimeout(refreshTimeoutRef.current);
                }
            };
        }
    }, [isInitialLoad, stats, fetchStats]);

    /**
     * Cleanup on unmount
     */
    useEffect(() =>
    {
        return () =>
        {
            // Clear timeout
            if (refreshTimeoutRef.current) {
                clearTimeout(refreshTimeoutRef.current);
            }

            // Abort any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            console.log('🧹 useStatsCache: Cleanup complete');
        };
    }, []);

    /**
     * Manual refresh function
     */
    const refresh = useCallback(() =>
    {
        console.log('🔄 useStatsCache: Manual refresh triggered');
        hasFetchedRef.current = false;
        fetchStats(true);
    }, [fetchStats]);

    return {
        stats,           // Current stats object
        isInitialLoad,   // True during first render
        isUpdating,      // True when API call is in progress
        error,           // Error message if API failed
        refresh          // Function to manually refresh
    };
}