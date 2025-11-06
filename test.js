// ============================================
// FILE 1: Slider.js - Ultra-Optimized Version
// ============================================
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

// ============================================
// Optimized Slide with Native Picture Element
// ============================================
const Slide = ({ slide, slideIndex }) =>
{
    return (
        <div
            className="bannerSlides relative"
            style={{ contentVisibility: 'auto' }}
        >
            <div className="absolute inset-0 bg-black/35 z-[1]" />

            <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
                {/* ✅ OPTIMIZED: Single picture element - browser loads only 1 image */}
                <picture>
                    {/* Mobile: 320-479px */}
                    <source
                        media="(max-width: 479px)"
                        srcSet={slide.mobile}
                        type="image/avif"
                    />

                    {/* Tablet: 480-1023px */}
                    <source
                        media="(min-width: 480px) and (max-width: 1023px)"
                        srcSet={slide.tablet}
                        type="image/avif"
                    />

                    {/* Desktop: 1024px+ */}
                    <source
                        media="(min-width: 1024px)"
                        srcSet={slide.web}
                        type="image/avif"
                    />

                    {/* Fallback */}
                    <img
                        src={slide.web}
                        alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={slideIndex === 0 ? "eager" : "lazy"}
                        fetchpriority={slideIndex === 0 ? "high" : "low"}
                        decoding="async"
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
const SlideControls = React.memo(({ slides, currentSlide, onSlideChange }) => (
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
));

SlideControls.displayName = 'SlideControls';

// ============================================
// ULTRA-OPTIMIZED Slider Component
// ============================================
const Slider = ({ slides = [] }) =>
{
    const [slideIndex, setSlideIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInteractive, setIsInteractive] = useState(false);
    const bannerInterval = useRef(null);
    const sliderRef = useRef(null);

    // ✅ Defer interactivity until after page load
    useEffect(() =>
    {
        const timer = setTimeout(() => setIsInteractive(true), 100);
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

    // ✅ Intersection Observer - only animate when visible
    useEffect(() =>
    {
        if (!sliderRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(sliderRef.current);
        return () => observer.disconnect();
    }, []);

    // ✅ Auto-rotation only when interactive, visible, and not hovered
    useEffect(() =>
    {
        if (isInteractive && isVisible && !isHovered) {
            startBanner();
        } else {
            stopBanner();
        }
        return stopBanner;
    }, [isInteractive, isVisible, isHovered, startBanner, stopBanner]);

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

    // ✅ CRITICAL: Only current slide exists in DOM (true unmounting)
    const currentSlide = slides[slideIndex - 1];

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
                {/* ✅ Only render current slide - no hidden elements! */}
                {currentSlide && (
                    <Slide
                        key={`slide-${slideIndex}`}
                        slide={currentSlide}
                        slideIndex={slideIndex - 1}
                    />
                )}
            </div>

            {isInteractive && (
                <SlideControls
                    slides={slides}
                    currentSlide={slideIndex}
                    onSlideChange={handleSlideChange}
                />
            )}
        </div>
    );
};

export default Slider;


// ============================================
// FILE 2: PreloadLinks.js - Add to your layout/page
// ============================================
export const SliderPreloadLinks = ({ firstSlide }) =>
{
    if (!firstSlide) return null;

    return (
        <>
            {/* Preload first slide image based on viewport */}
            <link
                rel="preload"
                as="image"
                href={firstSlide.mobile}
                media="(max-width: 479px)"
                type="image/avif"
            />
            <link
                rel="preload"
                as="image"
                href={firstSlide.tablet}
                media="(min-width: 480px) and (max-width: 1023px)"
                type="image/avif"
            />
            <link
                rel="preload"
                as="image"
                href={firstSlide.web}
                media="(min-width: 1024px)"
                type="image/avif"
            />
        </>
    );
};


// ============================================
// FILE 3: Updated index.js
// ============================================
import InfoBar from "@/components/common/BannerInfo";
import Slider from "./Slider";
import "./Slider.css";

const SLIDES = [
    {
        mobile: "/images/banner/Slide-1-mobile.avif",
        tablet: "/images/banner/Slide-1-tablet.avif",
        web: "/images/banner/Slide-1-web.avif",
        heading: "Let Us Do Your Banking,",
        subHeading: "Don't Take The Risk!",
        text: "Anywhere. Anytime. Australia Wide.",
        buttonText: "Learn More",
        buttonLink: "#welcome",
        alt: "SecureCash Banking Services - Australia Wide"
    },
    {
        mobile: "/images/banner/Slide-2-mobile.avif",
        tablet: "/images/banner/Slide-2-tablet.avif",
        web: "/images/banner/Slide-2-web.avif",
        heading: "Start Taking Advantage Of Our Services Today",
        subHeading: "Get A Quote From SecureCash",
        text: "We Just Need A Few Details!",
        buttonText: "Get a Quote",
        buttonLink: "/quote",
        alt: "Get a Quote from SecureCash"
    },
    {
        mobile: "/images/banner/Slide-3-mobile.avif",
        tablet: "/images/banner/Slide-3-tablet.avif",
        web: "/images/banner/Slide-3-web.avif",
        heading: "We're Pushing Our Industry Into The Future",
        subHeading: "Take Advantage Of Our eDockets System",
        text: "Control Your Services With A Click Of A Button",
        buttonText: "Learn More",
        buttonLink: "https://www.edockets.app/",
        alt: "eDockets System - Digital Cash Management"
    },
    {
        mobile: "/images/banner/Slide-4-mobile.avif",
        tablet: "/images/banner/Slide-4-tablet.avif",
        web: "/images/banner/Slide-4-web.avif",
        heading: "Our Services Are Covert",
        subHeading: "We Don't Attract Unwanted Attention",
        text: "A Safer Solution For Your Business",
        buttonText: "Learn More",
        buttonLink: "/about-us#about-us-section-service",
        alt: "Covert Cash Transport Services"
    },
    {
        mobile: "/images/banner/Slide-5-mobile.avif",
        tablet: "/images/banner/Slide-5-tablet.avif",
        web: "/images/banner/Slide-5-web.avif",
        heading: "Use A Provider You Can Trust",
        subHeading: "We Have Been Operating Over 25 Years",
        text: "Our Managers Have Over 100 Years Combined Industry Experience",
        buttonText: "About Us",
        buttonLink: "/about-us",
        alt: "Trusted Cash Transport Provider - 25+ Years Experience"
    },
];

const HeroSection = () =>
{
    return (
        <div id="banner" className="flex flex-col justify-end items-center">
            <Slider slides={SLIDES} />
            <InfoBar />
        </div>
    );
};

export default HeroSection;

// Export first slide for preloading
export { SLIDES };