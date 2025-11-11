"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useStatsCache } from "@/hooks/useStatsCache";

/**
 * Get optimal animation duration based on value magnitude
 */
const getOptimalDuration = (value) =>
{
  if (value < 1000) return 2;
  if (value < 10000) return 2.5;
  if (value < 100000) return 3;
  if (value < 1000000) return 3.5;
  return 4;
};

/**
 * AnimatedCounter - Handles 3-stage animation
 * Stage 1: Mount → display 0
 * Stage 2: Fallback arrives → animate 0 → fallback
 * Stage 3: Real value arrives → animate fallback → real (if different)
 */
const AnimatedCounter = ({
  targetValue,
  prefix = false,
  isVisible,
  isMobile
}) =>
{
  const [displayStart, setDisplayStart] = useState(0);
  const [displayEnd, setDisplayEnd] = useState(0);
  const [duration, setDuration] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const previousValueRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  /**
   * Handle value changes and trigger appropriate animations
   */
  useEffect(() =>
  {
    // Not visible yet - don't animate
    if (!isVisible) {
      setDisplayStart(targetValue);
      setDisplayEnd(targetValue);
      setDuration(0);
      return;
    }

    // Mobile - no animation, instant display
    if (isMobile) {
      setDisplayStart(targetValue);
      setDisplayEnd(targetValue);
      setDuration(0);
      previousValueRef.current = targetValue;
      return;
    }

    // First animation (0 → fallback)
    if (!hasAnimatedRef.current && targetValue > 0) {
      const animDuration = getOptimalDuration(targetValue);
      console.log(`[Counter] First animation: 0 → ${targetValue.toLocaleString()} (${animDuration}s)`);

      setDisplayStart(0);
      setDisplayEnd(targetValue);
      setDuration(animDuration);
      setAnimationKey(prev => prev + 1);

      previousValueRef.current = targetValue;
      hasAnimatedRef.current = true;
      return;
    }

    // Value changed (fallback → real, or subsequent updates)
    if (hasAnimatedRef.current && targetValue !== previousValueRef.current && targetValue > 0) {
      console.log(`[Counter] Update animation: ${previousValueRef.current.toLocaleString()} → ${targetValue.toLocaleString()}`);

      setDisplayStart(previousValueRef.current);
      setDisplayEnd(targetValue);
      setDuration(1.5);
      setAnimationKey(prev => prev + 1);

      previousValueRef.current = targetValue;
      return;
    }

  }, [targetValue, isVisible, isMobile]);

  return (
    <CountUp
      key={animationKey}
      start={displayStart}
      end={displayEnd}
      prefix={prefix ? "$" : ""}
      duration={duration}
      separator=","
      preserveValue={true}
      useEasing={true}
      easingFn={(t, b, c, d) =>
      {
        // Ease out cubic for smooth deceleration
        return c * ((t = t / d - 1) * t * t + 1) + b;
      }}
    />
  );
};

/**
 * CounterSection - Main component
 * Always visible (no layout shift), uses fallback → real flow
 */
const CounterSection = () =>
{
  const { stats, isUpdating } = useStatsCache();

  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);

  /**
   * Always have stats to display (never null)
   * This prevents layout shift and ensures component always renders
   */
  const displayStats = stats || {
    customers: 0,
    servicesPerformed: 0,
    cashMoved: 0
  };

  /**
   * Detect mobile viewport
   */
  useEffect(() =>
  {
    const checkMobile = () =>
    {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Intersection Observer - triggers animation when scrolled into view
   * Only fires once per page load
   */
  useEffect(() =>
  {
    if (!sectionRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          if (entry.isIntersecting && !isVisible) {
            console.log('[CounterSection] Section visible, triggering animations');
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(sectionRef.current);

    return () =>
    {
      if (observer) observer.disconnect();
    };
  }, [isVisible]);

  // Counter configuration
  const counters = [
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

  return (
    <section
      ref={sectionRef}
      id="banner-mid"
      className="relative b pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:h-[340px] w-full mx-auto flex flex-col 414px:mt-10 justify-center items-center 992px:mt-[100px]"
    >
      {/* Dark overlay */}
      <div className="bg-black w-full h-full z-0 absolute opacity-50" />

      {/* Content wrapper */}
      <div
        className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center"
        id="content-counter-wrapper"
      >
        {counters.map((counter, index) =>
        {
          const value = displayStats[counter.key] || 0;
          const isLastItem = index === counters.length - 1;

          return (
            <React.Fragment key={counter.id}>
              <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">

                {/* Counter Value */}
                <h4 className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat">
                  <AnimatedCounter
                    targetValue={value}
                    prefix={counter.prefix}
                    isVisible={isVisible}
                    isMobile={isMobile}
                  />
                </h4>

                {/* Icon */}
                <Image
                  src={counter.imgSrc}
                  onError={(e) =>
                  {
                    e.target.onerror = null;
                    e.target.src = counter.imgFallback;
                  }}
                  width={60}
                  height={60}
                  className="h-[60px] w-auto pb-[10px] mx-auto"
                  alt={counter.alt}
                  loading="lazy"
                  fetchPriority="low"
                  quality={70}
                />

                {/* Description */}
                <p className="text-[16px] text-white font-normal pb-0 mb-0 font-montserrat">
                  {counter.description}
                </p>

              </div>

              {/* Divider */}
              {!isLastItem && (
                <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Optional: Update indicator (only shows during background refresh) */}
      {isUpdating && stats && (
        <div
          className="absolute top-4 right-4 z-20"
          title="Refreshing data..."
          aria-label="Updating stats"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </section>
  );
};

export default CounterSection;