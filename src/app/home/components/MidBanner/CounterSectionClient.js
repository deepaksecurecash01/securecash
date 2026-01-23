"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({
  end,
  prefix,
  duration = 3,
  isUpdate = false,
  shouldAnimate = true,
}) => {
  const [count, setCount] = useState(isUpdate ? end : 0);
  const rafRef = useRef();
  const startTimeRef = useRef();
  const startValueRef = useRef(isUpdate ? end : 0);

  useEffect(() => {
    if (!shouldAnimate) return;

    startValueRef.current = count;
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / (duration * 1000),
        1,
      );

      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(
        startValueRef.current + (end - startValueRef.current) * eased,
      );
      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, shouldAnimate]);

  return `${prefix ? "$" : ""}${count.toLocaleString()}`;
};

export default function CounterSectionClient({ initialStats }) {
  const [stats, setStats] = useState(initialStats);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsUpdating(true);

      fetch("/api/stats/scc")
        .then((res) => {
          if (!res.ok) throw new Error(`API error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!data || typeof data.customers !== "number") {
            throw new Error("Invalid data structure");
          }

          if (
            data.customers !== stats.customers ||
            data.servicesPerformed !== stats.servicesPerformed ||
            data.cashMoved !== stats.cashMoved
          ) {
            setStats({
              customers: data.customers,
              servicesPerformed: data.servicesPerformed,
              cashMoved: data.cashMoved,
            });
          }

          setIsUpdating(false);
        })
        .catch((err) => {
          console.log("Stats fetch failed:", err);
          setIsUpdating(false);
        });
    }, 150);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const counters = [
    {
      id: 1,
      key: "customers",
      imgSrc: "/images/icons/clients.webp",
      imgFallback: "/images/icons/clients.png",
      alt: "Customers icon",
      description: "Customers",
      prefix: false,
    },
    {
      id: 2,
      key: "servicesPerformed",
      imgSrc: "/images/icons/services.webp",
      imgFallback: "/images/icons/services.png",
      alt: "Services icon",
      description: "Services Performed",
      prefix: false,
    },
    {
      id: 3,
      key: "cashMoved",
      imgSrc: "/images/icons/transport.webp",
      imgFallback: "/images/icons/transport.png",
      alt: "Cash transport icon",
      description: "Cash Moved",
      prefix: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="banner-mid"
      className="relative pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:h-[340px] w-full mx-auto flex flex-col 414px:mt-10 justify-center items-center 992px:mt-[100px]"
      aria-label="Company statistics"
    >
      <picture className="absolute inset-0 w-full h-full -z-10">
        <source
          media="(min-width: 992px)"
          type="image/avif"
          srcSet="/images/banner/home-statistics.avif"
        />

        <source
          media="(min-width: 992px)"
          srcSet="/images/banner/home-statistics.jpg"
        />

        <source
          type="image/avif"
          srcSet="/images/banner/home-statistics-mobile.avif"
        />

        <Image
          src="/images/banner/home-statistics-mobile.jpg"
          alt=""
          fill
          loading="lazy"
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
      </picture>

      <div
        className="bg-black w-full h-full z-0 absolute opacity-50"
        aria-hidden="true"
      />

      <div className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center">
        {counters.map((counter, index) => {
          const value = stats[counter.key] || 0;
          const isLastItem = index === counters.length - 1;

          return (
            <div key={counter.id} className="contents">
              <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">
                <p
                  className="banner-mid-header font-black text-[40px] text-primary mb-[30px] h-[40px] font-montserrat"
                  role="status"
                  aria-live="polite"
                >
                  {isMobile ? (
                    `${counter.prefix ? "$" : ""}${value.toLocaleString()}`
                  ) : (
                    <AnimatedCounter
                      end={value}
                      prefix={counter.prefix}
                      duration={hasAnimated ? 2.5 : 3.5}
                      isUpdate={hasAnimated}
                      shouldAnimate={isVisible}
                    />
                  )}
                </p>

                <Image
                  src={counter.imgSrc}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = counter.imgFallback;
                  }}
                  width={60}
                  height={60}
                  className="h-[60px] w-auto pb-[10px] mx-auto"
                  alt={counter.alt}
                  loading="lazy"
                  fetchPriority="low"
                  style={{ width: "auto" }}
                />

                <p className="text-[16px] text-white font-normal pb-0 mb-0 font-montserrat">
                  {counter.description}
                </p>
              </div>

              {!isLastItem && (
                <div
                  className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      {isUpdating && (
        <div
          className="absolute top-4 right-4 z-20"
          role="status"
          aria-label="Updating statistics"
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      )}
    </section>
  );
}
