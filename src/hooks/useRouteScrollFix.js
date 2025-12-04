"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useRouteScrollFix()
{
    const pathname = usePathname();

    useEffect(() =>
    {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        requestAnimationFrame(() =>
        {
            requestAnimationFrame(() =>
            {
                setTimeout(() =>
                {
                    document.documentElement.style.scrollBehavior = "smooth";
                }, 50);
            });
        });
    }, [pathname]);
}