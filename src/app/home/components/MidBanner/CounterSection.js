"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

// Skeleton component for loading state
const SkeletonCounter = () => (
  <div className="animate-pulse">
    <div className="h-[40px] w-32 bg-primary/50 rounded  mx-auto"></div>
  </div>
);

// Simple fallback values
const FALLBACK_STATS = {
  customers: 2909,
  servicesPerformed: 556824,
  cashMoved: 2546386710,
  source: 'fallback'
};

const DynamicCounterSection = () =>
{
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimeoutRef = useRef(null);

  // Static configuration
  const staticConfig = [
    {
      id: 1,
      key: "customers",
      imgSrc: "/images/icons/clients.webp",
      imgFallback: "/images/icons/clients.png",
      alt: "Customers",
      description: "Customers",
      prefix: false
    },
    {
      id: 2,
      key: "servicesPerformed",
      imgSrc: "/images/icons/services.webp",
      imgFallback: "/images/icons/services.png",
      alt: "Services Performed",
      description: "Services Performed",
      prefix: false
    },
    {
      id: 3,
      key: "cashMoved",
      imgSrc: "/images/icons/transport.webp",
      imgFallback: "/images/icons/transport.png",
      alt: "Cash Moved",
      description: "Cash Moved",
      prefix: true
    }
  ];

  // Fetch stats function
  const fetchStats = async (showLoading = true) =>
  {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      console.log('Fetching stats from /api/stats/scc...');

      const response = await fetch('/api/stats/scc', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // Let browser handle caching
        cache: 'default'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Stats received (${data.source}):`, data);

      // Validate data structure
      if (data && typeof data.customers === 'number' && typeof data.servicesPerformed === 'number') {
        setStats(data);
        setError(null);
      } else {
        throw new Error('Invalid data structure received from API');
      }

    } catch (fetchError) {
      console.error('Failed to fetch stats:', fetchError);
      setError(fetchError.message);

      // Use simple fallback
      console.log('Using fallback stats');
      setStats({
        ...FALLBACK_STATS,
        asOf: Date.now()
      });
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Initial fetch
  useEffect(() =>
  {
    fetchStats(true);
  }, []);

  // Auto-refresh setup
  useEffect(() =>
  {
    if (!loading) {
      // Clear any existing timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      // Set up refresh - 30 minutes for cache hits, 5 minutes for errors
      const refreshInterval = error ? 5 * 60 * 1000 : 30 * 60 * 1000;

      refreshTimeoutRef.current = setTimeout(() =>
      {
        fetchStats(false); // Background refresh without loading state
      }, refreshInterval);

      return () =>
      {
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
      };
    }
  }, [loading, error]);

  // Cleanup on unmount
  useEffect(() =>
  {
    return () =>
    {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

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

                {/* Counter Value with Loading State */}
                <h4
                
                  className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat"
                >
                  {loading ? (
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
                </h4>

                {/* Icon */}
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

                {/* Description */}
                <p
                  className="text-[16px] text-white font-normal pb-0 mb-0 font-montserrat"
                >
                  {config.description}
                </p>

              </div>

              {/* Divider between items */}
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

export default DynamicCounterSection;