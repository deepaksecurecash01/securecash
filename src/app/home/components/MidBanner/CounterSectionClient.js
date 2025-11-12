"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/**
 * ✅ OPTIMIZED: Custom counter using requestAnimationFrame (GPU-accelerated)
 * REMOVED: react-countup library (saves 5.3KB + main thread work)
 */
const AnimatedCounter = ({ end, prefix, duration = 2 }) =>
{
    const [count, setCount] = useState(0);
    const rafRef = useRef();
    const startTimeRef = useRef();

    useEffect(() =>
    {
        const animate = (timestamp) =>
        {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * eased));

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [end, duration]);

    return `${prefix ? '$' : ''}${count.toLocaleString()}`;
};

export default function CounterSectionClient({ initialStats })
{
    const [stats, setStats] = useState(initialStats);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    // Mobile detection
    useEffect(() =>
    {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // IntersectionObserver for scroll-triggered animation
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

    // ✅ FIX 1: Defer API call until after component is visible + paint complete
    useEffect(() =>
    {
        if (!isVisible) return; // Only fetch when visible

        // Push to next tick after render completes
        const timer = setTimeout(() =>
        {
            fetch('/api/stats/scc')
                .then(res =>
                {
                    if (!res.ok) throw new Error(`API error: ${res.status}`);
                    return res.json();
                })
                .then(data =>
                {
                    // Validate response
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
                })
                .catch(err => console.log('Stats fetch failed:', err));
        }, 150); // 150ms delay after visibility

        return () => clearTimeout(timer);
    }, [isVisible]); // Removed stats dependency to prevent loop

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
            {/* ✅ FIX 2: Single responsive background (not two separate images) */}
            <picture>
                <source
                    media="(min-width: 992px)"
                    srcSet="/images/banner/home-statistics.jpg"
                />
                <Image
                    src="/images/banner/home-statistics-mobile.jpg"
                    alt=""
                    fill
                    priority={false}
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </picture>

            <div className="bg-black w-full h-full z-0 absolute opacity-50" />

            <div className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center">
                {counters.map((counter, index) =>
                {
                    const value = stats[counter.key] || 0;
                    const isLastItem = index === counters.length - 1;

                    return (
                        <div key={counter.id} className="contents">
                            <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">
                                <h4 className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat">
                                    {/* ✅ FIX 3: No animation on mobile (instant), animate on desktop when visible */}
                                    {isMobile || !isVisible ? (
                                        `${counter.prefix ? '$' : ''}${value.toLocaleString()}`
                                    ) : (
                                        <AnimatedCounter
                                            end={value}
                                            prefix={counter.prefix}
                                            duration={2}
                                        />
                                    )}
                                </h4>

                                {/* ✅ FIX 4: Lazy load icons (below fold) */}
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
                        </div>
                    );
                })}
            </div>
        </section>
    );
}