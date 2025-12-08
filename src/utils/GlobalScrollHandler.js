"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

const GlobalScrollHandler = () =>
{
    const pathname = usePathname();
    const scrollTimeoutRef = useRef(null);
    const previousPathnameRef = useRef(pathname);
    const isInitialMountRef = useRef(true);

    const scrollToTop = useCallback(() =>
    {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() =>
        {
            document.documentElement.style.scrollBehavior = "smooth";
        }, 50);
    }, []);

    useEffect(() =>
    {
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            previousPathnameRef.current = pathname;
            return;
        }

        if (previousPathnameRef.current !== pathname) {
            scrollToTop();
            previousPathnameRef.current = pathname;
        }

        return () =>
        {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [pathname, scrollToTop]);

    useEffect(() =>
    {
        const handleLinkClick = (e) =>
        {
            const link = e.target.closest("a");
            if (!link) return;

            const href = link.getAttribute("href");
            if (!href || href.startsWith("http") || href.startsWith("//") ||
                href.startsWith("#") || link.getAttribute("target") === "_blank") return;

            const targetPath = href.split("#")[0].split("?")[0];
            const currentPath = pathname.split("#")[0].split("?")[0];

            if (targetPath === currentPath) {
                e.preventDefault();
                scrollToTop();
            }
        };

        document.addEventListener("click", handleLinkClick, true);
        return () => document.removeEventListener("click", handleLinkClick, true);
    }, [pathname, scrollToTop]);

    return null;
};

export default GlobalScrollHandler;