"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// OPTIMIZED PICTURE COMPONENT
// ============================================
const ResponsiveSlideImage = ({ slide, slideIndex, isActive }) =>
{
  const isPriority = slideIndex === 0;

  // Generate optimized Next.js image URLs
  const getImageUrl = (src, width, quality) =>
  {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  };

  return (
    <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
      <picture>
        {/* Desktop - Only loads on large screens */}
        <source
          media="(min-width: 1024px)"
          srcSet={`${getImageUrl(slide.web, 1920, 55)} 1920w, ${getImageUrl(slide.web, 1536, 55)} 1536w`}
          type="image/jpeg"
        />

        {/* Tablet - Only loads on medium screens */}
        <source
          media="(min-width: 480px)"
          srcSet={`${getImageUrl(slide.tablet, 1200, 50)} 1200w, ${getImageUrl(slide.tablet, 1024, 50)} 1024w`}
          type="image/jpeg"
        />

        {/* Mobile - Default fallback */}
        <img
          src={getImageUrl(slide.mobile, 750, 45)}
          srcSet={`${getImageUrl(slide.mobile, 640, 45)} 640w, ${getImageUrl(slide.mobile, 750, 45)} 750w`}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          decoding={isPriority ? "sync" : "async"}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </picture>
    </div>
  );
};

// ============================================
// SINGLE SLIDE COMPONENT
// ============================================
const BannerSlide = React.memo(({ slide, slideIndex, isActive }) =>
{
  return (
    <div className="relative overflow-hidden bg-black">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      {/* Optimized Image */}
      <ResponsiveSlideImage
        slide={slide}
        slideIndex={slideIndex}
        isActive={isActive}
      />

      {/* Content */}
      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
});

BannerSlide.displayName = "BannerSlide";

// ============================================
// OPTIMIZED CUSTOM PAGINATION
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
            className={`dot-button ${activeIndex === index ? 'active' : ''}`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : "false"}
          />
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// MAIN SLIDER WITH INTERSECTION OBSERVER
// ============================================
const BannerSlider = ({ slides = [] }) =>
{
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [shouldInit, setShouldInit] = useState(false);
  const sliderRef = useRef(null);

  // Intersection Observer - Only initialize when visible
  useEffect(() =>
  {
    if (typeof window === 'undefined' || !sliderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) =>
      {
        if (entries[0].isIntersecting) {
          setShouldInit(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading slightly before visible
        threshold: 0.01
      }
    );

    observer.observe(sliderRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSlideChange = useCallback((swiper) =>
  {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSwiper = useCallback((swiper) =>
  {
    setSwiperInstance(swiper);
  }, []);

  const handleDotClick = useCallback(
    (index) =>
    {
      if (swiperInstance) {
        swiperInstance.slideToLoop(index);
      }
    },
    [swiperInstance]
  );

  if (!slides.length) return null;

  return (
    <div
      ref={sliderRef}
      id="banner-slider"
      className="w-full relative overflow-hidden bg-black"
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      {shouldInit ? (
        <Swiper
          modules={[Autoplay]}
          speed={800}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={slides.length > 1}
          slidesPerView={1}
          preloadImages={false}
          lazy={false}
          watchSlidesProgress={false}
          observer={false}
          observeParents={false}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
          className="w-full bg-black banner-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <BannerSlide
                slide={slide}
                slideIndex={index}
                isActive={activeIndex === index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Placeholder for first slide while slider initializes
        <BannerSlide
          slide={slides[0]}
          slideIndex={0}
          isActive={true}
        />
      )}

      <CustomPagination
        slides={slides}
        activeIndex={activeIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default BannerSlider;