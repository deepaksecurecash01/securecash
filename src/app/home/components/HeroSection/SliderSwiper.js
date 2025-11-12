"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// OPTIMIZED SLIDE - Native Picture Element
// ============================================
const BannerSlide = React.memo(({ slide, slideIndex }) =>
{
    const shouldPrioritize = slideIndex === 0;

    return (
        <div className="relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
                {/* ✅ Native Picture Element - Uses your existing WebP as fallback */}
                <picture>
                    {/* Mobile: < 768px - AVIF (best) */}
                    <source
                        media="(max-width: 767px)"
                        srcSet={slide.mobile.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    {/* Mobile: < 768px - WebP (existing fallback) */}
                    <source
                        media="(max-width: 767px)"
                        srcSet={slide.mobile.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Tablet: 768px - 1023px - AVIF (best) */}
                    <source
                        media="(min-width: 768px) and (max-width: 1023px)"
                        srcSet={slide.tablet.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    {/* Tablet: 768px - 1023px - WebP (existing fallback) */}
                    <source
                        media="(min-width: 768px) and (max-width: 1023px)"
                        srcSet={slide.tablet.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Desktop: >= 1024px - AVIF (best) */}
                    <source
                        media="(min-width: 1024px)"
                        srcSet={slide.web.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    {/* Desktop: >= 1024px - WebP (existing fallback) */}
                    <source
                        media="(min-width: 1024px)"
                        srcSet={slide.web.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Final Fallback: JPEG for all devices */}
                    <img
                        src={slide.web}
                        alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
                        loading={shouldPrioritize ? "eager" : "lazy"}
                        fetchpriority={shouldPrioritize ? "high" : "low"} // ✅ Note: lowercase 'fetchpriority'
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </picture>
            </div>

            <Container className="z-10 w-full absolute inset-0 flex items-center">
                <SliderContent {...slide} />
            </Container>
        </div>
    );
});

BannerSlide.displayName = "BannerSlide";

// ============================================
// CUSTOM PAGINATION
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
                    />
                </li>
            ))}
        </ul>
    </div>
);

// ============================================
// OPTIMIZED SWIPER
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
            id="banner-slider"
            className="w-full relative overflow-hidden bg-black"
            role="region"
            aria-label="Hero slider"
            aria-live="polite"
        >
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={slides.length > 1}
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

            <CustomPagination
                slides={slides}
                activeIndex={activeIndex}
                onDotClick={handleDotClick}
            />
        </div>
    );
};

export default BannerSlider;