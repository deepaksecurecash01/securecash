"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ✅ FIX 1: Only render active slide (not hide with CSS)
const Slide = ({ slide, slideIndex, isPriority }) => (
  <div className="bannerSlides relative">
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/35 z-[1]" />

    {/* ✅ FIX 2: Single responsive image with proper srcSet */}
    <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
      <picture>
        {/* Desktop (1024px+) */}
        <source
          media="(min-width: 1024px)"
          srcSet={slide.web}
        />
        {/* Tablet (480px - 1023px) */}
        <source
          media="(min-width: 480px)"
          srcSet={slide.tablet}
        />
        {/* Mobile (< 480px) */}
        <Image
          src={slide.mobile}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          quality={isPriority ? 75 : 60}
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />
      </picture>
    </div>

    {/* Content */}
    <Container className="z-10 w-full absolute inset-0 flex items-center">
      <SliderContent {...slide} />
    </Container>
  </div>
);

const SlideControls = ({ slides, currentSlide, onSlideChange }) => (
  <div
    className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-80px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0"
    role="navigation"
    aria-label="Slider navigation"
  >
    <ul className="dot-navigation absolute top-[32%] list-none">
      {slides.map((slide, index) => (
        <li key={index}>
          <button
            className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-all duration-300 dot hover:bg-white hover:transform hover:scale-[1.34] hover:w-[15px] hover:h-[15px] border-0 ${currentSlide === index + 1
                ? "bg-white transform scale-[1.34] w-[15px] h-[15px]"
                : ""
              }`}
            onClick={() => onSlideChange(index + 1)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index + 1 ? "true" : "false"}
          />
        </li>
      ))}
    </ul>
  </div>
);

const Slider = ({ slides = [] }) =>
{
  const [slideIndex, setSlideIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false); // ✅ Prevent hydration mismatch
  const bannerInterval = useRef(null);

  // ✅ FIX 3: Mark client-side rendering complete
  useEffect(() =>
  {
    setIsClient(true);
  }, []);

  const slideBannerAuto = useCallback(() =>
  {
    setSlideIndex((prev) => (prev >= slides.length ? 1 : prev + 1));
  }, [slides.length]);

  // ✅ FIX 4: Use requestIdleCallback for interval (low priority)
  const startBanner = useCallback(() =>
  {
    if (bannerInterval.current) {
      clearInterval(bannerInterval.current);
    }

    const startInterval = () =>
    {
      bannerInterval.current = setInterval(slideBannerAuto, 5000);
    };

    // Defer interval start to idle time (doesn't block paint)
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(startInterval);
    } else {
      setTimeout(startInterval, 100);
    }
  }, [slideBannerAuto]);

  const stopBanner = useCallback(() =>
  {
    if (bannerInterval.current) {
      clearInterval(bannerInterval.current);
    }
  }, []);

  useEffect(() =>
  {
    if (!isHovered && isClient) {
      startBanner();
    }
    return () => stopBanner();
  }, [isHovered, isClient, startBanner, stopBanner]);

  const handleSlideChange = useCallback(
    (index) =>
    {
      setSlideIndex(index);
      stopBanner();
      startBanner();
    },
    [stopBanner, startBanner]
  );

  // ✅ FIX 5: Preload next slide image
  const getNextSlideIndex = () =>
  {
    return slideIndex === slides.length ? 0 : slideIndex;
  };

  return (
    <div
      id="banner-slider"
      className="w-full inline-block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      <div className="slideshow-container relative">
        {/* ✅ FIX 6: Only render current slide + conditionally preload next */}
        {slides.map((slide, index) =>
        {
          const isCurrent = slideIndex === index + 1;

          // Only render current slide
          if (!isCurrent) return null;

          return (
            <div key={index}>
              <Slide
                slide={slide}
                slideIndex={index}
                isPriority={index === 0} // Only first slide is priority
              />
            </div>
          );
        })}

        {/* ✅ FIX 7: Preload next slide image (hidden, loads in background) */}
        {isClient && (
          <link
            rel="prefetch"
            as="image"
            href={slides[getNextSlideIndex()]?.web}
          />
        )}
      </div>

      <SlideControls
        slides={slides}
        currentSlide={slideIndex}
        onSlideChange={handleSlideChange}
      />
    </div>
  );
};

export default Slider;