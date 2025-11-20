// src/hooks/useScrollHide.js
import { useState, useEffect, useRef } from 'react';

export default function useScrollHide(offset = 100)
{
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const currentScrollY = window.scrollY;

            // 1. Always show at top (respecting offset)
            if (currentScrollY < offset) {
                setIsVisible(true);
            }
            // 2. Hide on scroll down
            else if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            }
            // 3. Show on scroll up
            else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

    return isVisible;
}