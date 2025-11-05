
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

const Slide = ({ slide, isActive, isPriority, slideIndex }) =>
{
  return (
    <div
      className={`bannerSlides relative transition-opacity duration-700 ${isActive ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
        {/* Desktop Image */}
        <Image
          src={slide.web}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          quality={85}
          sizes="(max-width: 768px) 0vw, 100vw"
          className="object-cover hidden 1024px:block"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />

        {/* Tablet Image */}
        <Image
          src={slide.tablet}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          quality={85}
          sizes="(max-width: 768px) 0vw, (min-width: 1024px) 100vw, 0vw"
          className="object-cover hidden 480px:block 1024px:hidden"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />

        {/* Mobile Image */}
        <Image
          src={slide.mobile}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
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
// OPTIMIZED Slider - Only renders current + next slide
// ============================================
const Slider = ({ slides = [] }) =>
{
  const [slideIndex, setSlideIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const handleSlideChange = useCallback((index) =>
  {
    setIsTransitioning(true);
    setSlideIndex(index);
    stopBanner();

    // Reset transition state after animation completes
    setTimeout(() =>
    {
      setIsTransitioning(false);
      startBanner();
    }, 700); // Match transition duration
  }, [stopBanner, startBanner]);

  // ✅ KEY OPTIMIZATION: Only render current and next slide
  const getSlidesToRender = useCallback(() =>
  {
    const currentIndex = slideIndex - 1;
    const nextIndex = (currentIndex + 1) % slides.length;

    return [
      { slide: slides[currentIndex], index: currentIndex, isActive: true, isPriority: true },
      { slide: slides[nextIndex], index: nextIndex, isActive: false, isPriority: true }
    ];
  }, [slideIndex, slides]);

  const slidesToRender = getSlidesToRender();

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
        {/* ✅ OPTIMIZED: Only render current + next slide (2 slides instead of 5!) */}
        {slidesToRender.map(({ slide, index, isActive, isPriority }) => (
          <Slide
            key={`slide-${slideIndex}-${index}`}
            slide={slide}
            slideIndex={index}
            isActive={isActive}
            isPriority={isPriority}
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