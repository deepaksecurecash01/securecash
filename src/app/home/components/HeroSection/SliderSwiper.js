"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

const BannerSlide = React.memo(({ slide, slideIndex }) =>
{
    const isLCP = slideIndex === 0;

    return (
        <div className="relative overflow-hidden bg-black h-full">
            <div className="absolute inset-0 bg-black/40 z-[1]" aria-hidden="true" />

            {/* ✅ LCP OPTIMIZATION: 
               - Fixed heights to prevent layout shifts 
            */}
            <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
                <picture>
                    {/* Mobile: < 768px */}
                    <source
                        media="(max-width: 767px)"
                        srcSet={slide.mobile.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet={slide.mobile.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Tablet: 768px - 1023px */}
                    <source
                        media="(min-width: 768px) and (max-width: 1023px)"
                        srcSet={slide.tablet.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    <source
                        media="(min-width: 768px) and (max-width: 1023px)"
                        srcSet={slide.tablet.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Desktop: >= 1024px */}
                    <source
                        media="(min-width: 1024px)"
                        srcSet={slide.web.replace('.jpg', '.avif')}
                        type="image/avif"
                    />
                    <source
                        media="(min-width: 1024px)"
                        srcSet={slide.web.replace('.jpg', '.webp')}
                        type="image/webp"
                    />

                    {/* Final Fallback */}
                    <img
                        src={slide.web}
                        alt={slide.alt || `SecureCash Banner ${slideIndex + 1}`}
                        // ✅ OPTIMIZATION: Force 'sync' decoding for LCP to paint faster. 
                        // 'async' for others to unblock main thread.
                        decoding={isLCP ? "sync" : "async"}
                        loading={isLCP ? "eager" : "lazy"}
                        fetchPriority={isLCP ? "high" : "low"}
                        className="absolute inset-0 w-full h-full object-cover"
                        // Ensure browser knows the size early to reserve space
                        style={{ objectPosition: 'center' }}
                    />
                </picture>
            </div>

            <Container className="z-10 w-full absolute inset-0 flex items-center">
                {/* Pass priority to content to maybe prioritize text rendering */}
                <SliderContent {...slide} priority={isLCP} />
            </Container>
        </div>
    );
});

BannerSlide.displayName = "BannerSlide";

const CustomPagination = ({ slides, activeIndex, onDotClick }) => (
    <div
        className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-80px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0 pointer-events-none"
        role="group"
        aria-label="Slide navigation"
    >
        <ul className="dot-navigation absolute top-[32%] list-none m-0 p-0 pointer-events-auto">
            {slides.map((_, index) => (
                <li key={index}>
                    <button
                        className={`cursor-pointer h-[15px] w-[15px] mx-[2px] rounded-full inline-block transition-all duration-300 border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${activeIndex === index
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
            aria-label="Hero banner carousel"
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
                className="w-full bg-black"
                // ✅ OPTIMIZATION: Improves accessibility performance
                aria-live="off"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* Only render content for active/near slides if memory is an issue, 
                             but for LCP, keeping DOM stable is usually better. 
                             We rely on the img loading="lazy" handled inside BannerSlide. */}
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