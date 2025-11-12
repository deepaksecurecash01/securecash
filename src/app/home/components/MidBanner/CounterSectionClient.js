"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

/**
 * Get optimal animation duration based on value size
 */
const getAnimationDuration = (value) =>
{
    if (value < 1000) return 2;
    if (value < 10000) return 2.5;
    if (value < 100000) return 3;
    if (value < 1000000) return 3.5;
    return 4;
};

/**
 * AnimatedCounter - Handles count-up animations
 */
const AnimatedCounter = ({ targetValue, prefix = false, isVisible, isMobile }) =>
{
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [duration, setDuration] = useState(0);
    const [key, setKey] = useState(0);
    const previousRef = useRef(0);
    const hasAnimatedRef = useRef(false);

    useEffect(() =>
    {
        if (!isVisible) {
            setStart(targetValue);
            setEnd(targetValue);
            setDuration(0);
            return;
        }

        if (isMobile) {
            setStart(targetValue);
            setEnd(targetValue);
            setDuration(0);
            previousRef.current = targetValue;
            return;
        }

        // First animation: 0 → initial value
        if (!hasAnimatedRef.current && targetValue > 0) {
            setStart(0);
            setEnd(targetValue);
            setDuration(getAnimationDuration(targetValue));
            setKey(prev => prev + 1);
            previousRef.current = targetValue;
            hasAnimatedRef.current = true;
            return;
        }

        // Update animation: old → new value
        if (hasAnimatedRef.current && targetValue !== previousRef.current && targetValue > 0) {
            setStart(previousRef.current);
            setEnd(targetValue);
            setDuration(1.5);
            setKey(prev => prev + 1);
            previousRef.current = targetValue;
        }
    }, [targetValue, isVisible, isMobile]);

    return (
        <CountUp
            key={key}
            start={start}
            end={end}
            prefix={prefix ? "$" : ""}
            duration={duration}
            separator=","
            preserveValue={true}
            useEasing={true}
            easingFn={(t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b}
        />
    );
};

/**
 * CounterSectionClient - Main client component
 */
export default function CounterSectionClient({ initialStats })
{
    const [stats, setStats] = useState(initialStats);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const sectionRef = useRef(null);

    // Detect mobile
    useEffect(() =>
    {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer for scroll-triggered animation
    useEffect(() =>
    {
        if (!sectionRef.current || isVisible) return;

        const observer = new IntersectionObserver(
            (entries) =>
            {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [isVisible]);

    // Fetch real-time data in background
    useEffect(() =>
    {
        setIsUpdating(true);

        fetch('/api/stats/scc')
            .then(res =>
            {
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                return res.json();
            })
            .then(data =>
            {
                // Validate response structure
                if (!data || typeof data.customers !== 'number') {
                    throw new Error('Invalid data structure');
                }

                // Only update if values changed
                if (
                    data.customers !== stats.customers ||
                    data.servicesPerformed !== stats.servicesPerformed ||
                    data.cashMoved !== stats.cashMoved
                ) {
                    setStats({
                        customers: data.customers,
                        servicesPerformed: data.servicesPerformed,
                        cashMoved: data.cashMoved
                    });
                }

                // Hide indicator on success
                setIsUpdating(false);
            })
            .catch(err =>
            {
                console.log('Stats fetch failed:', err);
                // Hide indicator on error too
                setIsUpdating(false);
            });
    }, [stats.customers, stats.servicesPerformed, stats.cashMoved]);

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
            className="relative pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:h-[340px] w-full mx-auto flex flex-col 414px:mt-10 justify-center items-center 992px:mt-[100px]"
        >
            {/* Mobile Background Image - Hidden on desktop */}
            <Image
                src="/images/banner/home-statistics-mobile.jpg"
                alt=""
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center 992px:hidden"
            />

            {/* Desktop Background Image - Hidden on mobile */}
            <Image
                src="/images/banner/home-statistics.jpg"
                alt=""
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-center hidden 992px:block"
            />

            <div className="bg-black w-full h-full z-0 absolute opacity-50" />

            <div className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center">
                {counters.map((counter, index) =>
                {
                    const value = stats[counter.key] || 0;
                    const isLastItem = index === counters.length - 1;

                    return (
                        <React.Fragment key={counter.id}>
                            <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">
                                <h4 className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat">
                                    <AnimatedCounter
                                        targetValue={value}
                                        prefix={counter.prefix}
                                        isVisible={isVisible}
                                        isMobile={isMobile}
                                    />
                                </h4>

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
                                />

                                <p className="text-[16px] text-white font-normal pb-0 mb-0 font-montserrat">
                                    {counter.description}
                                </p>
                            </div>

                            {!isLastItem && (
                                <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Update indicator - shows while fetching real-time data */}
            {isUpdating && (
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
}