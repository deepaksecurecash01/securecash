// /utils/hydrationDebug.js - Comprehensive Hydration Debugging Utility

/**
 * Hydration Debug Utility
 * Captures and compares server vs client render differences
 */

// 1. Component Render Tracking
export const HydrationTracker = {
    renders: new Map(),

    track(componentName, renderData)
    {
        const timestamp = performance.now();
        const isServer = typeof window === 'undefined';

        if (!this.renders.has(componentName)) {
            this.renders.set(componentName, { server: null, client: null });
        }

        const entry = this.renders.get(componentName);
        const renderInfo = {
            timestamp,
            data: renderData,
            environment: isServer ? 'server' : 'client',
            userAgent: isServer ? 'server' : navigator.userAgent,
            timezone: isServer ? 'server' : Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: isServer ? 'server' : navigator.language
        };

        if (isServer) {
            entry.server = renderInfo;
        } else {
            entry.client = renderInfo;
        }

        // Compare if we have both renders
        if (entry.server && entry.client) {
            this.compareRenders(componentName, entry.server, entry.client);
        }
    },

    compareRenders(componentName, serverRender, clientRender)
    {
        const differences = [];

        // Deep compare render data
        const serverData = JSON.stringify(serverRender.data, null, 2);
        const clientData = JSON.stringify(clientRender.data, null, 2);

        if (serverData !== clientData) {
            differences.push({
                type: 'data_mismatch',
                server: serverRender.data,
                client: clientRender.data
            });
        }

        if (differences.length > 0) {
            console.group(`🔴 HYDRATION MISMATCH: ${componentName}`);
            console.log('Server render:', serverRender);
            console.log('Client render:', clientRender);
            console.log('Differences:', differences);
            console.groupEnd();

            // Store for analysis
            this.storeMismatch(componentName, differences);
        }
    },

    storeMismatch(componentName, differences)
    {
        if (typeof window !== 'undefined') {
            const mismatches = JSON.parse(localStorage.getItem('hydration_mismatches') || '[]');
            mismatches.push({
                component: componentName,
                timestamp: Date.now(),
                differences,
                url: window.location.href
            });
            localStorage.setItem('hydration_mismatches', JSON.stringify(mismatches));
        }
    },

    getMismatches()
    {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('hydration_mismatches') || '[]');
        }
        return [];
    },

    clearMismatches()
    {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('hydration_mismatches');
        }
    }
};

// 2. Component Wrapper for Debugging
export const withHydrationDebug = (WrappedComponent, componentName) =>
{
    return function HydrationDebugWrapper(props)
    {
        const renderData = {
            props: { ...props },
            timestamp: Date.now(),
            randomValue: Math.random(), // This will definitely cause mismatch if present
        };

        // Track this render
        HydrationTracker.track(componentName, renderData);

        return <WrappedComponent {...props} />;
    };
};

// 3. File Upload Debug Wrapper
export const debugFileUpload = (component, name) =>
{
    return withHydrationDebug(component, `FileUploadInput_${name}`);
};

// 4. Date Input Debug Wrapper  
export const debugDateInput = (component, name) =>
{
    return withHydrationDebug(component, `DateInput_${name}`);
};

// 5. DOM Comparison Utility
export const compareDOMNodes = (selector) =>
{
    if (typeof window === 'undefined') return;

    // Store initial HTML on page load
    const storeInitialHTML = () =>
    {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) =>
        {
            const key = `initial_html_${selector}_${index}`;
            sessionStorage.setItem(key, element.outerHTML);
        });
    };

    // Compare current HTML with initial
    const compareWithInitial = () =>
    {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) =>
        {
            const key = `initial_html_${selector}_${index}`;
            const initialHTML = sessionStorage.getItem(key);
            const currentHTML = element.outerHTML;

            if (initialHTML && initialHTML !== currentHTML) {
                console.group(`🔴 DOM MISMATCH: ${selector}[${index}]`);
                console.log('Initial HTML:', initialHTML);
                console.log('Current HTML:', currentHTML);
                console.groupEnd();
            }
        });
    };

    // Set up watchers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', storeInitialHTML);
    } else {
        storeInitialHTML();
    }

    // Compare after hydration
    setTimeout(compareWithInitial, 1000);

    return { storeInitialHTML, compareWithInitial };
};

// 6. React DevTools Integration
export const enableHydrationDevtools = () =>
{
    if (typeof window === 'undefined') return;

    // Add hydration debugging to React DevTools
    window.__HYDRATION_DEBUG__ = {
        tracker: HydrationTracker,
        mismatches: HydrationTracker.getMismatches(),
        clearMismatches: () => HydrationTracker.clearMismatches(),
        compareDOMNodes
    };

    console.log('🔍 Hydration debugging enabled. Access via window.__HYDRATION_DEBUG__');
};

// 7. Specific Debugging Functions for Your Components

export const debugSpecificIssues = {
    // Test Date.now() theory
    trackDateNowUsage()
    {
        const originalDateNow = Date.now;
        const calls = [];

        Date.now = function ()
        {
            const result = originalDateNow.call(this);
            const stack = new Error().stack;
            calls.push({ result, stack, timestamp: performance.now() });

            // Log if called during render
            if (stack.includes('FileUploadInput') || stack.includes('getFileId')) {
                console.warn('🔴 Date.now() called during render in FileUploadInput:', result);
            }

            return result;
        };

        // Restore after 10 seconds
        setTimeout(() =>
        {
            Date.now = originalDateNow;
            console.log('Date.now() calls tracked:', calls);
        }, 10000);
    },

    // Test Math.random() usage
    trackMathRandom()
    {
        const originalRandom = Math.random;
        const calls = [];

        Math.random = function ()
        {
            const result = originalRandom.call(this);
            const stack = new Error().stack;
            calls.push({ result, stack, timestamp: performance.now() });

            console.warn('🔴 Math.random() called during render:', result);
            return result;
        };

        setTimeout(() =>
        {
            Math.random = originalRandom;
            console.log('Math.random() calls tracked:', calls);
        }, 10000);
    },

    // Test dynamic CSS generation
    trackDynamicStyles()
    {
        const observer = new MutationObserver((mutations) =>
        {
            mutations.forEach((mutation) =>
            {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) =>
                    {
                        if (node.tagName === 'STYLE' && node.textContent.includes('react-date-picker')) {
                            console.warn('🔴 Dynamic style injection detected:', node.textContent);
                        }
                    });
                }
            });
        });

        observer.observe(document.head, { childList: true });

        setTimeout(() => observer.disconnect(), 10000);
    },

    // Test focus state mismatches
    trackFocusState()
    {
        const focusEvents = [];

        document.addEventListener('focus', (e) =>
        {
            focusEvents.push({
                type: 'focus',
                target: e.target.tagName + (e.target.name ? `[name="${e.target.name}"]` : ''),
                timestamp: performance.now()
            });
        }, true);

        document.addEventListener('blur', (e) =>
        {
            focusEvents.push({
                type: 'blur',
                target: e.target.tagName + (e.target.name ? `[name="${e.target.name}"]` : ''),
                timestamp: performance.now()
            });
        }, true);

        setTimeout(() =>
        {
            console.log('Focus events tracked:', focusEvents);
        }, 10000);
    }
};

// 8. Auto-enable debugging in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    enableHydrationDevtools();
}