'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function JivoWidget()
{
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() =>
    {
        // 1. Function to trigger the load
        const startLoading = () => setShouldLoad(true);

        // 2. Events that indicate the user is active
        const interactionEvents = ['scroll', 'mousemove', 'keydown', 'touchstart'];

        const onInteraction = () =>
        {
            startLoading();
        };

        // 3. Add listeners to detect user activity
        interactionEvents.forEach((event) =>
            window.addEventListener(event, onInteraction, { passive: true, once: true })
        );

        // 4. Fallback: Load after 5 seconds automatically if no interaction occurs
        const timer = setTimeout(startLoading, 5000);

        // Cleanup listeners and timer
        return () =>
        {
            clearTimeout(timer);
            interactionEvents.forEach((event) =>
                window.removeEventListener(event, onInteraction)
            );
        };
    }, []);

    // Don't render anything until the delay or interaction has occurred
    if (!shouldLoad) return null;

    return (
        <Script
            src="https://code.jivosite.com/widget.js"
            data-jv-id={process.env.NEXT_PUBLIC_JIVO_ID}
            strategy="lazyOnload"
        />
    );
}