"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useStatsCache } from "@/hooks/useStatsCache";

/**
 * Generate random number around target value (±15% variance)
 */
const getRandomNumber = (target) =>
{
    const variance = 0.15;
    const min = Math.floor(target * (1 - variance));
    const max = Math.floor(target * (1 + variance));
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Single counter component with smart animation logic
 */
const AnimatedCounter = ({
    targetValue,
    prefix = false,
    isVisible,
    hasAnimated,
    isUpdating,
    isMobile
}) =>
{
    const [displayValue, setDisplayValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef(null);
    const previousValueRef = useRef(0);

    /**
     * Random number animation while API is loading
     * Only runs on first load, not on mobile
     */
    useEffect(() =>
    {
        if (isUpdating && !hasAnimated && isVisible && targetValue && !isMobile) {
            console.log('🎲 Starting random number animation');
            setIsAnimating(true);

            const animate = () =>
            {
                setDisplayValue(getRandomNumber(targetValue));
                animationRef.current = setTimeout(animate, 150); // Change every 150ms
            };

            animate();

            return () =>
            {
                if (animationRef.current) {
                    clearTimeout(animationRef.current);
                }
            };
        }
    }, [isUpdating, hasAnimated, isVisible, targetValue, isMobile]);

    /**
     * Stop random animation when API returns
     */
    useEffect(() =>
    {
        if (!isUpdating && isAnimating) {
            console.log('✅ Stopping random number animation');
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
            setIsAnimating(false);
        }
    }, [isUpdating, isAnimating]);

    /**
     * Determine animation parameters based on state
     */
    const getAnimationProps = () =>
    {
        // Not visible yet - show static value
        if (!isVisible) {
            return { start: targetValue, end: targetValue, duration: 0 };
        }

        // Random animation is playing - keep displaying random value
        if (isAnimating) {
            return { start: displayValue, end: displayValue, duration: 0 };
        }

        // First animation when section becomes visible
        if (!hasAnimated) {
            const duration = isMobile ? 0.5 : 2;
            console.log(`🎬 First animation: 0 → ${targetValue} (${duration}s)`);
            return { start: 0, end: targetValue, duration };
        }

        // Update animation when value changes
        if (targetValue !== previousValueRef.current && previousValueRef.current !== 0) {
            console.log(`🔄 Update animation: ${previousValueRef.current} → ${targetValue}`);
            return { start: previousValueRef.current, end: targetValue, duration: 1 };
        }

        // No animation needed - value unchanged
        return { start: targetValue, end: targetValue, duration: 0 };
    };

    /**
     * Update previous value reference
     */
    useEffect(() =>
    {
        if (targetValue && !isUpdating) {
            previousValueRef.current = targetValue;
        }
    }, [targetValue, isUpdating]);

    const animProps = getAnimationProps();

    return (
        <CountUp
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
 * Renamed to match your existing structure
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
     * Only animates when user scrolls to section
     */
    useEffect(() =>
    {
        if (!sectionRef.current || hasAnimated) return;

        console.log('👁️  Setting up Intersection Observer');

        const observer = new IntersectionObserver(
            (entries) =>
            {
                entries.forEach((entry) =>
                {
                    if (entry.isIntersecting && !hasAnimated) {
                        console.log('✅ Counter section is visible, triggering animation');
                        setIsVisible(true);
                        setHasAnimated(true);
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
    }, [hasAnimated]);

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

    // Don't render until we have stats (prevents flash)
    if (isInitialLoad || !stats) {
        console.log('⏳ Initial load, not rendering yet');
        return null;
    }

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
                    const value = stats[config.key];
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
                                        isUpdating={isUpdating}
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

            {/* Optional: Subtle loading indicator in corner */}
            {isUpdating && hasAnimated && (
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