// ============================================
// FILE 1: Slider.js - JPG-Optimized Version
// ============================================
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// Optimized Slide Component - JPG Version
// ============================================
const Slide = ({ slide, slideIndex, isFirst }) =>
{
  return (
    <div className="bannerSlides relative">
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
        {/* ✅ Native picture element with JPG */}
        <picture>
          {/* Mobile: 320-479px */}
          <source
            media="(max-width: 479px)"
            srcSet={slide.mobile}
            type="image/jpeg"
          />

          {/* Tablet: 480-1023px */}
          <source
            media="(min-width: 480px) and (max-width: 1023px)"
            srcSet={slide.tablet}
            type="image/jpeg"
          />

          {/* Desktop: 1024px+ */}
          <source
            media="(min-width: 1024px)"
            srcSet={slide.web}
            type="image/jpeg"
          />

          {/* Fallback with optimized attributes */}
          <img
            src={slide.web}
            alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading={isFirst ? "eager" : "lazy"}
            fetchpriority={isFirst ? "high" : "low"}
            decoding={isFirst ? "sync" : "async"}
            width="1920"
            height="800"
          />
        </picture>
      </div>

      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
};

// ============================================
// Slide Controls (Memoized)
// ============================================
const SlideControls = React.memo(({ slides, currentSlide, onSlideChange, isVisible }) =>
{
  if (!isVisible) return null;

  return (
    <div
      className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-80px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0"
      role="navigation"
      aria-label="Slider navigation"
    >
      <ul className="dot-navigation absolute top-[32%] list-none">
        {slides.map((_, index) => (
          <li key={index}>
            <button
              className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-all duration-300 dot hover:bg-white hover:transform hover:scale-[1.34] border-0 ${currentSlide === index + 1
                ? "bg-white transform scale-[1.34]"
                : ""
                }`}
              onClick={() => onSlideChange(index + 1)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index + 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

SlideControls.displayName = 'SlideControls';

// ============================================
// FINAL OPTIMIZED Slider Component
// ============================================
const Slider = ({ slides = [] }) =>
{
  const [slideIndex, setSlideIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const bannerInterval = useRef(null);
  const sliderRef = useRef(null);

  // ✅ Critical: Wait for first image to load before showing controls
  useEffect(() =>
  {
    if (typeof window === 'undefined') return;

    // Small delay to ensure first paint happens
    const timer = setTimeout(() =>
    {
      setIsReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const slideBannerAuto = useCallback(() =>
  {
    setSlideIndex((prev) => (prev >= slides.length ? 1 : prev + 1));
  }, [slides.length]);

  const startBanner = useCallback(() =>
  {
    if (bannerInterval.current) clearInterval(bannerInterval.current);
    bannerInterval.current = setInterval(slideBannerAuto, 5000);
  }, [slideBannerAuto]);

  const stopBanner = useCallback(() =>
  {
    if (bannerInterval.current) clearInterval(bannerInterval.current);
  }, []);

  // ✅ Intersection Observer
  useEffect(() =>
  {
    if (!sliderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Auto-rotation - only when ready and visible
  useEffect(() =>
  {
    if (isReady && isVisible && !isHovered) {
      startBanner();
    } else {
      stopBanner();
    }
    return stopBanner;
  }, [isReady, isVisible, isHovered, startBanner, stopBanner]);

  const handleSlideChange = useCallback(
    (index) =>
    {
      setSlideIndex(index);
      stopBanner();
      setTimeout(() =>
      {
        if (isVisible && !isHovered) startBanner();
      }, 700);
    },
    [stopBanner, startBanner, isVisible, isHovered]
  );

  // ✅ Only render current slide
  const currentSlide = slides[slideIndex - 1];

  if (!currentSlide) return null;

  return (
    <div
      ref={sliderRef}
      id="banner-slider"
      className="w-full inline-block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      <div className="slideshow-container relative">
        <Slide
          key={`slide-${slideIndex}`}
          slide={currentSlide}
          slideIndex={slideIndex - 1}
          isFirst={slideIndex === 1}
        />
      </div>

      <SlideControls
        slides={slides}
        currentSlide={slideIndex}
        onSlideChange={handleSlideChange}
        isVisible={isReady}
      />
    </div>
  );
};

export default Slider;