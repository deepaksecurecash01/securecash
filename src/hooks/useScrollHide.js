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

            if (currentScrollY < offset) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

    return isVisible;
}