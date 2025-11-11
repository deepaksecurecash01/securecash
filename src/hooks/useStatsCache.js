// hooks/useStatsCache.js
// Simplified hook with fallback API integration

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for stats with fast fallback + real-time data
 * Flow: Fetch fallback (fast) → Display → Fetch real (slow) → Update if changed
 * 
 * @returns {Object} { stats, isUpdating, error, refresh }
 */
export function useStatsCache()
{
    const [stats, setStats] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const hasFetchedFallbackRef = useRef(false);
    const hasFetchedRealRef = useRef(false);
    const abortControllerRef = useRef(null);

    /**
     * Fetch fallback stats (fast, <10ms)
     * This runs first to provide instant display value
     */
    const fetchFallback = useCallback(async () =>
    {
        if (hasFetchedFallbackRef.current) return;
        hasFetchedFallbackRef.current = true;

        try {
            console.log('[useStatsCache] Fetching fallback...');
            const startTime = Date.now();

            const response = await fetch('/api/stats/fallback', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                cache: 'default'
            });

            if (!response.ok) {
                throw new Error(`Fallback API error: ${response.status}`);
            }

            const data = await response.json();
            const fetchTime = Date.now() - startTime;

            console.log(`[useStatsCache] Fallback loaded in ${fetchTime}ms:`, {
                customers: data.customers,
                source: data.source
            });

            setStats({
                customers: data.customers,
                servicesPerformed: data.servicesPerformed,
                cashMoved: data.cashMoved,
                source: data.source || 'fallback'
            });

        } catch (fallbackError) {
            console.error('[useStatsCache] Fallback fetch failed:', fallbackError);
            // Set static fallback on error
            setStats({
                customers: 2990,
                servicesPerformed: 578424,
                cashMoved: 2652053680,
                source: 'static-error-fallback'
            });
        }
    }, []);

    /**
     * Fetch real-time stats (slow, 7-8s on cold start)
     * This runs in background after fallback is displayed
     */
    const fetchRealData = useCallback(async (showLoading = false) =>
    {
        if (hasFetchedRealRef.current && showLoading) {
            console.log('[useStatsCache] Real data fetch already in progress');
            return;
        }

        try {
            if (showLoading) {
                setIsUpdating(true);
                hasFetchedRealRef.current = true;
            }

            setError(null);

            console.log('[useStatsCache] Fetching real-time data...');
            const startTime = Date.now();

            // Create abort controller
            abortControllerRef.current = new AbortController();

            const response = await fetch('/api/stats/scc', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                cache: 'default',
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            const fetchTime = Date.now() - startTime;

            console.log(`[useStatsCache] Real data loaded in ${fetchTime}ms:`, {
                customers: data.customers,
                source: data.source
            });

            // Update stats (will trigger re-render and animation if value changed)
            setStats(prevStats =>
            {
                // Only update if values actually changed
                if (
                    prevStats &&
                    prevStats.customers === data.customers &&
                    prevStats.servicesPerformed === data.servicesPerformed &&
                    prevStats.cashMoved === data.cashMoved
                ) {
                    console.log('[useStatsCache] Values unchanged, no update needed');
                    return prevStats;
                }

                console.log('[useStatsCache] Values changed, updating stats');
                return {
                    customers: data.customers,
                    servicesPerformed: data.servicesPerformed,
                    cashMoved: data.cashMoved,
                    source: data.source || 'api'
                };
            });

            setError(null);

        } catch (fetchError) {
            // Don't log if aborted (component unmounted)
            if (fetchError.name === 'AbortError') {
                console.log('[useStatsCache] Real data fetch aborted');
                return;
            }

            console.error('[useStatsCache] Real data fetch failed:', fetchError);
            setError(fetchError.message);
            // Keep showing fallback/previous stats on error

        } finally {
            if (showLoading) {
                setIsUpdating(false);
            }
        }
    }, []);

    /**
     * Initial load: Fetch fallback immediately, then real data
     */
    useEffect(() =>
    {
        // Step 1: Load fallback (fast)
        fetchFallback();

        // Step 2: Load real data after small delay (let fallback render first)
        const timer = setTimeout(() =>
        {
            fetchRealData(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [fetchFallback, fetchRealData]);

    /**
     * Cleanup on unmount
     */
    useEffect(() =>
    {
        return () =>
        {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    /**
     * Manual refresh function
     */
    const refresh = useCallback(() =>
    {
        console.log('[useStatsCache] Manual refresh triggered');
        hasFetchedRealRef.current = false;
        fetchRealData(true);
    }, [fetchRealData]);

    return {
        stats,       // Current stats object (fallback → real)
        isUpdating,  // True when fetching real data
        error,       // Error message if any
        refresh      // Manual refresh function
    };
}