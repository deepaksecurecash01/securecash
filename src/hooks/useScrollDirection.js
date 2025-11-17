"use client";

import { useState, useEffect } from 'react';

const useScrollDirection = ({ threshold = 5, offSet = 0 } = {}) =>
{
    const [scrollDir, setScrollDir] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() =>
    {
        let ticking = false;

        const updateScrollDir = () =>
        {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }

            if (scrollY > offSet) {
                setScrollDir(scrollY > lastScrollY ? 'down' : 'up');
            } else {
                setScrollDir('up');
            }

            setLastScrollY(scrollY > 0 ? scrollY : 0);
            ticking = false;
        };

        const onScroll = () =>
        {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () =>
        {
            window.removeEventListener('scroll', onScroll);
        };
    }, [lastScrollY, threshold, offSet]);

    return { scrollDir };
};

export default useScrollDirection;