// hooks/useStats.js
// Optional: Advanced caching with SWR (install: npm install swr)

import useSWR from 'swr';

const fetcher = async (url) =>
{
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch stats');
    }
    return res.json();
};

export const useStats = () =>
{
    const { data, error, mutate, isLoading } = useSWR(
        `/api/dashboard/live-stats`,
        fetcher,
        {
            // Refresh every 30 minutes
            refreshInterval: 30 * 60 * 1000,

            // Cache for 5 minutes before showing as stale
            dedupingInterval: 5 * 60 * 1000,

            // Retry on error
            errorRetryCount: 3,
            errorRetryInterval: 5000,

            // Keep previous data while revalidating
            keepPreviousData: true,

            // Fallback data (SCC-specific)
            fallbackData: {
                customers: 2909,
                servicesPerformed: 556824,
                cashMoved: 2546386710,
                cached: true,
                fallback: true
            }
        }
    );

    return {
        stats: data,
        loading: isLoading,
        error,
        refresh: mutate
    };
};

// ========================================
// Alternative Counter Section using SWR
// ========================================

"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import Typography from "@/components/common/Typography";
import { useStats } from "@/hooks/useStats";

const SkeletonCounter = () => (
    <div className="animate-pulse">
        <div className="h-[40px] w-32 bg-gray-300 rounded mb-[30px] mx-auto"></div>
    </div>
);

const SWRCounterSection = () =>
{
    const { stats, loading, error } = useStats();

    const staticConfig = [
        {
            id: 1,
            key: "customers",
            imgSrc: "https://www.securecash.com.au/images/icons/clients.webp",
            imgFallback: "https://www.securecash.com.au/images/icons/clients.png",
            alt: "Customers",
            description: "Customers",
            prefix: false
        },
        {
            id: 2,
            key: "servicesPerformed",
            imgSrc: "https://www.securecash.com.au/images/icons/services.webp",
            imgFallback: "https://www.securecash.com.au/images/icons/services.png",
            alt: "Services Performed",
            description: "Services Performed",
            prefix: false
        },
        {
            id: 3,
            key: "cashMoved",
            imgSrc: "https://www.securecash.com.au/images/icons/transport.webp",
            imgFallback: "https://www.securecash.com.au/images/icons/transport.png",
            alt: "Cash Moved",
            description: "Cash Moved",
            prefix: true
        }
    ];

    return (
        <section
            id="banner-mid"
            className="relative bg-banner-mid-mobile-bg pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:bg-banner-mid-bg bg-center bg-cover bg-no-repeat 992px:h-[340px] w-full mx-auto flex flex-col 414px:mt-10 justify-center items-center 992px:mt-[100px]"
        >
            <div className="bg-black w-full h-full z-0 absolute opacity-50"></div>

            <div
                className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center"
                id="content-counter-wrapper"
            >
                {staticConfig.map((config, index) =>
                {
                    const value = stats ? stats[config.key] : null;
                    const isLastItem = index === staticConfig.length - 1;

                    return (
                        <React.Fragment key={config.id}>
                            <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">

                                <Typography
                                    as="h4"
                                    fontFamily="montserrat"
                                    className="banner-mid-header font-black text-[40px] text-primary pb-[30px]"
                                >
                                    {loading && !stats ? (
                                        <SkeletonCounter />
                                    ) : (
                                        <CountUp
                                            end={value || 0}
                                            prefix={config.prefix ? "$" : ""}
                                            duration={2}
                                            separator=","
                                            preserveValue={true}
                                        />
                                    )}
                                </Typography>

                                <Image
                                    src={config.imgSrc}
                                    onError={(e) =>
                                    {
                                        e.target.onerror = null;
                                        e.target.src = config.imgFallback;
                                    }}
                                    width={60}
                                    height={60}
                                    className="h-[60px] w-auto pb-[10px] mx-auto"
                                    alt={config.alt}
                                />

                                <Typography
                                    as="p"
                                    className="text-[16px] text-white font-normal pb-0 mb-0"
                                >
                                    {config.description}
                                </Typography>

                                {process.env.NODE_ENV === 'development' && stats && (
                                    <div className="text-xs text-gray-400 mt-2">
                                        {stats.cached && <span className="bg-yellow-600 px-1 rounded">CACHED</span>}
                                        {stats.fallback && <span className="bg-red-600 px-1 rounded ml-1">FALLBACK</span>}
                                        {error && <span className="bg-red-600 px-1 rounded ml-1">ERROR</span>}
                                    </div>
                                )}
                            </div>

                            {!isLastItem && (
                                <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10"></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default SWRCounterSection;