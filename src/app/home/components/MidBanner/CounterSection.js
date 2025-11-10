"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useStatsCache } from "@/hooks/useStatsCache";

// Fallback values (last known production values)
const FALLBACK_STATS = {
  customers: 2955,
  servicesPerformed: 578424,
  cashMoved: 2652053680,
  source: 'static-fallback'
};

/**
 * Calculate optimal animation duration based on value magnitude
 * Larger numbers get longer duration for smooth, visible count-up
 */
const getOptimalDuration = (value) =>
{
  if (value < 1000) return 2;           // Small numbers: 2s
  if (value < 10000) return 2.5;        // Thousands: 2.5s
  if (value < 100000) return 3;         // Tens of thousands: 3s
  if (value < 1000000) return 3.5;      // Hundreds of thousands: 3.5s
  return 4;                             // Millions+: 4s
};

/**
 * Single counter component with smart animation logic
 */
const AnimatedCounter = ({
  targetValue,
  prefix = false,
  isVisible,
  hasAnimated,
  isMobile
}) =>
{
  const previousValueRef = useRef(targetValue);
  const [animationKey, setAnimationKey] = useState(0);

  /**
   * Determine animation parameters based on state
   */
  const getAnimationProps = () =>
  {
    // Mobile - no animation, instant display
    if (isMobile) {
      return { start: targetValue, end: targetValue, duration: 0 };
    }

    // Not visible yet - static display (no animation)
    if (!isVisible) {
      return { start: targetValue, end: targetValue, duration: 0 };
    }

    // First animation when section scrolls into view
    if (!hasAnimated) {
      const duration = getOptimalDuration(targetValue);
      console.log(`🎬 Count-up animation: 0 → ${targetValue.toLocaleString()} (${duration}s)`);
      return { start: 0, end: targetValue, duration };
    }

    // Value changed after initial animation - smooth update
    if (targetValue !== previousValueRef.current) {
      console.log(`🔄 Value update: ${previousValueRef.current} → ${targetValue}`);
      previousValueRef.current = targetValue;
      // Force re-render by changing key
      setAnimationKey(prev => prev + 1);
      return { start: previousValueRef.current, end: targetValue, duration: 1.5 };
    }

    // No animation needed - value unchanged
    return { start: targetValue, end: targetValue, duration: 0 };
  };

  const animProps = getAnimationProps();

  return (
    <CountUp
      key={animationKey}
      start={animProps.start}
      end={animProps.end}
      prefix={prefix ? "$" : ""}
      duration={animProps.duration}
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
 * CounterSection - Main counter component
 * Always renders (no layout shift), uses cached/fallback values
 */
const CounterSection = () =>
{
  // Hook for stats management
  const { stats, isInitialLoad, isUpdating } = useStatsCache();

  // State for animations and visibility
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const sectionRef = useRef(null);

  /**
   * Determine which stats to display (cache > fallback)
   * This ensures we ALWAYS have values to display (no null/undefined)
   */
  const displayStats = stats || FALLBACK_STATS;

  /**
   * Detect mobile viewport
   */
  useEffect(() =>
  {
    const checkMobile = () =>
    {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      console.log(`📱 Device: ${mobile ? 'Mobile' : 'Desktop'}`);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Intersection Observer for scroll-triggered animation
   * Triggers ONCE per page load when user scrolls to section
   */
  useEffect(() =>
  {
    if (!sectionRef.current || isVisible) return;

    console.log('👁️  Setting up Intersection Observer');

    const observer = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          if (entry.isIntersecting && !isVisible) {
            console.log('✅ Counter section visible - triggering count-up animation');
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

  /**
   * Mark animation as complete after it plays
   * This prevents re-animation on scroll up/down
   */
  useEffect(() =>
  {
    if (isVisible && !hasAnimated && !isMobile) {
      // Delay setting hasAnimated until after the animation completes
      const maxDuration = getOptimalDuration(Math.max(
        displayStats.customers,
        displayStats.servicesPerformed,
        displayStats.cashMoved
      ));

      const timer = setTimeout(() =>
      {
        setHasAnimated(true);
        console.log('✅ Count-up animation completed');
      }, maxDuration * 1000 + 100); // Add 100ms buffer

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, isMobile, displayStats]);

  // Static configuration for each counter
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

  return (
    <section
      ref={sectionRef}
      id="banner-mid"
      className="relative bg-banner-mid-mobile-bg pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:bg-banner-mid-bg bg-center bg-cover bg-no-repeat 992px:h-[340px] w-full mx-auto flex flex-col 414px:mt-10 justify-center items-center 992px:mt-[100px]"
    >
      {/* Dark overlay */}
      <div className="bg-black w-full h-full z-0 absolute opacity-50"></div>

      {/* Content wrapper */}
      <div
        className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center"
        id="content-counter-wrapper"
      >
        {staticConfig.map((config, index) =>
        {
          const value = displayStats[config.key];
          const isLastItem = index === staticConfig.length - 1;

          return (
            <React.Fragment key={config.id}>
              <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">

                {/* Counter Value */}
                <h4 className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat">
                  <AnimatedCounter
                    targetValue={value || 0}
                    prefix={config.prefix}
                    isVisible={isVisible}
                    hasAnimated={hasAnimated}
                    isMobile={isMobile}
                  />
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
                  loading="lazy"
                  fetchPriority="low"
                />

                {/* Description */}
                <p className="text-[16px] text-white font-normal pb-0 mb-0 font-montserrat">
                  {config.description}
                </p>

              </div>

              {/* Divider between counters */}
              {!isLastItem && (
                <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Subtle background update indicator (only shows during background refresh) */}
      {isUpdating && hasAnimated && !isInitialLoad && (
        <div
          className="absolute top-4 right-4 z-20"
          title="Updating stats..."
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      )}
    </section>
  );
};

export default CounterSection;