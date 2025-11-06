"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// SLIDE COMPONENT - OPTIMIZED TRANSITIONS
// ============================================
const Slide = ({ slide, isActive, slideIndex }) =>
{
  // ✅ Only first slide gets priority
  const shouldPrioritize = slideIndex === 0;

  return (
    <div
      className={`bannerSlides absolute inset-0 transition-all duration-[1000ms] ease-in-out
        ${isActive
          ? "opacity-100 z-10 visible"
          : "opacity-0 z-0 invisible pointer-events-none"
        }`}
      style={{
        // ✅ Force GPU acceleration for smooth transitions
        transform: 'translate3d(0, 0, 0)',
        willChange: isActive ? 'opacity' : 'auto',
      }}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
        {/* Desktop Image */}
        <Image
          src={slide.web}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={shouldPrioritize}
          loading={shouldPrioritize ? "eager" : "lazy"}
          fetchPriority={shouldPrioritize ? "high" : "low"}
          quality={80}
          sizes="(max-width: 767px) 0vw, 100vw"
          className="object-cover hidden 1024px:block"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />

        {/* Tablet Image */}
        <Image
          src={slide.tablet}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={shouldPrioritize}
          loading={shouldPrioritize ? "eager" : "lazy"}
          fetchPriority={shouldPrioritize ? "high" : "low"}
          quality={80}
          sizes="(max-width: 479px) 0vw, (min-width: 1024px) 0vw, 100vw"
          className="object-cover hidden 480px:block 1024px:hidden"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />

        {/* Mobile Image */}
        <Image
          src={slide.mobile}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={shouldPrioritize}
          loading={shouldPrioritize ? "eager" : "lazy"}
          fetchPriority={shouldPrioritize ? "high" : "low"}
          quality={75}
          sizes="(max-width: 479px) 100vw, 0vw"
          className="object-cover block 480px:hidden"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />
      </div>

      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
};

// ============================================
// SlideControls - Same as before
// ============================================
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

// ============================================
// OPTIMIZED Slider - Only renders current slide
// ============================================
const Slider = ({ slides = [] }) =>
{
  const [slideIndex, setSlideIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const bannerInterval = useRef(null);

  const slideBannerAuto = useCallback(() =>
  {
    setSlideIndex((prev) => (prev >= slides.length ? 1 : prev + 1));
  }, [slides.length]);

  const startBanner = useCallback(() =>
  {
    if (bannerInterval.current) {
      clearInterval(bannerInterval.current);
    }
    bannerInterval.current = setInterval(slideBannerAuto, 5000);
  }, [slideBannerAuto]);

  const stopBanner = useCallback(() =>
  {
    if (bannerInterval.current) {
      clearInterval(bannerInterval.current);
    }
  }, []);

  useEffect(() =>
  {
    if (!isHovered) {
      startBanner();
    }
    return () => stopBanner();
  }, [isHovered, startBanner, stopBanner]);

  const handleSlideChange = useCallback(
    (index) =>
    {
      setSlideIndex(index);
      stopBanner();
      // Restart autoplay after user interaction
      setTimeout(() =>
      {
        if (!isHovered) {
          startBanner();
        }
      }, 1000);
    },
    [stopBanner, startBanner, isHovered]
  );

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
      <div className="slideshow-container relative min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1440px:min-h-[70vh]">
        {/* ✅ OPTIMIZED: Render ALL slides but only current is visible */}
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            slideIndex={index}
            isActive={slideIndex === index + 1}
          />
        ))}
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