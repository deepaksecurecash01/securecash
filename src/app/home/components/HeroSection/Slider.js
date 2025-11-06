"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
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
    <div className="relative overflow-hidden">
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
});

BannerSlide.displayName = "BannerSlide";

// ============================================
// OPTIMIZED SWIPER SLIDER
// ============================================
const BannerSlider = ({ slides = [] }) =>
{
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Hooks BEFORE any conditional returns
  const handleSlideChange = useCallback((swiper) =>
  {
    setActiveIndex(swiper.activeIndex);
  }, []);

  // ✅ Early return AFTER all hooks
  if (!slides.length) return null;

  return (
    <div
      id="banner-slider"
      className="w-full relative overflow-hidden"
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
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
        lazy={{
          loadPrevNext: true,
          loadPrevNextAmount: 1,
        }}
        watchSlidesProgress={true}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
          {
            return `<button class="${className} swiper-custom-bullet ${activeIndex === index ? "swiper-custom-bullet-active" : ""
              }" aria-label="Go to slide ${index + 1}"></button>`;
          },
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <BannerSlide slide={slide} slideIndex={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;