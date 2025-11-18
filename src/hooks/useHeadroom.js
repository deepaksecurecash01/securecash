// src/hooks/useHeadroom.js

import { useState, useEffect, useRef, useCallback } from "react";

const useHeadroom = () =>
{
    const [isFixed, setIsFixed] = useState(false);
    const [isUnpinned, setIsUnpinned] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);

    const headerRef = useRef(null);
    const sentinelRef = useRef(null);
    const lastScrollY = useRef(0);
    const scrollTicking = useRef(false);

    const SCROLL_TOLERANCE = 5;
    const SCROLL_THRESHOLD = 100;

    const getScrollY = () => window.pageYOffset;

    const measureHeight = useCallback(() =>
    {
        requestAnimationFrame(() =>
        {
            if (headerRef.current) {
                const measuredHeight = headerRef.current.offsetHeight;
                if (measuredHeight > 0 && measuredHeight !== headerHeight) {
                    setHeaderHeight(measuredHeight);
                }
            }
        });
    }, [headerHeight]);

    const handleScroll = useCallback(() =>
    {
        if (scrollTicking.current) return;
        scrollTicking.current = true;

        requestAnimationFrame(() =>
        {
            const currentScrollY = getScrollY();
            const scrollDelta = currentScrollY - lastScrollY.current;

            if (scrollDelta > SCROLL_TOLERANCE && currentScrollY > SCROLL_THRESHOLD && !isUnpinned) {
                setIsUnpinned(true);
            }
            else if (scrollDelta < -SCROLL_TOLERANCE && isUnpinned) {
                setIsUnpinned(false);
            }

            lastScrollY.current = currentScrollY;
            scrollTicking.current = false;
        });

    }, [isUnpinned]);

    useEffect(() =>
    {
        measureHeight();
        window.addEventListener("resize", measureHeight, { passive: true });

        if (!sentinelRef.current) return;

        const observerCallback = ([entry]) =>
        {
            if (!entry.isIntersecting) {
                setIsFixed(true);
                window.addEventListener("scroll", handleScroll, { passive: true });
            } else {
                setIsFixed(false);
                setIsUnpinned(false);
                window.removeEventListener("scroll", handleScroll);
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        observer.observe(sentinelRef.current);

        return () =>
        {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", measureHeight);
        };
    }, [handleScroll, measureHeight]);

    return { headerRef, sentinelRef, isFixed, isUnpinned, headerHeight };
};

export default useHeadroom;