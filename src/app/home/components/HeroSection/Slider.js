"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules"; // ✅ Removed Pagination module
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// SINGLE SLIDE COMPONENT - Memoized
// ============================================
const BannerSlide = React.memo(({ slide, slideIndex }) =>
{
  const shouldPrioritize = slideIndex === 0;

  return (
    <div className="relative overflow-hidden bg-black">
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
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        />

      </div>

      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
});

BannerSlide.displayName = "BannerSlide";

// ============================================
// ✅ CUSTOM PAGINATION CONTROLS
// ============================================
const CustomPagination = ({ slides, activeIndex, onDotClick }) => (
  <div
    className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-80px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0"
    role="navigation"
    aria-label="Slider navigation"
  >
    <ul className="dot-navigation absolute top-[32%] list-none m-0 p-0">
      {slides.map((_, index) => (
        <li key={index}>
          <button
            className={`cursor-pointer h-[15px] w-[15px] mx-[2px] rounded-full inline-block transition-all duration-300 border-0 p-0 ${activeIndex === index
              ? "bg-white transform scale-[1.34]"
              : "bg-[#a3a3a3]"
              }`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : "false"}
            style={{
              transition: 'all 0.3s ease',
            }}
          />
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// OPTIMIZED SWIPER SLIDER
// ============================================
const BannerSlider = ({ slides = [] }) =>
{
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = useCallback((swiper) =>
  {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSwiper = useCallback((swiper) =>
  {
    setSwiperInstance(swiper);
  }, []);

  // ✅ Handle dot click
  const handleDotClick = useCallback((index) =>
  {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index); // Use slideToLoop for loop mode
    }
  }, [swiperInstance]);

  if (!slides.length) return null;

  return (
    <div
      id="banner-slider"
      className="w-full relative overflow-hidden bg-black"
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      <Swiper
        modules={[Autoplay, EffectFade]} // ✅ Removed Pagination module
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={slides.length > 1}
        watchSlidesProgress={true}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        onRealIndexChange={handleSlideChange}
        className="w-full bg-black"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <BannerSlide slide={slide} slideIndex={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Custom Pagination Outside Swiper */}
      <CustomPagination
        slides={slides}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default BannerSlider;