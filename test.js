import InfoBar from "@/components/common/BannerInfo";
import Slider from "./Slider";
import "./Slider.css";

const SLIDES = [
    {
        mobile: "/images/banner/Slide-1-mobile.jpg",
        tablet: "/images/banner/Slide-1-tablet.jpg",
        web: "/images/banner/Slide-1-web.jpg",
        heading: "Let Us Do Your Banking,",
        subHeading: "Don't Take The Risk!",
        text: "Anywhere. Anytime. Australia Wide.",
        buttonText: "Learn More",
        buttonLink: "#welcome",
        alt: "SecureCash Banking Services - Australia Wide"
    },
    {
        mobile: "/images/banner/Slide-2-mobile.jpg",
        tablet: "/images/banner/Slide-2-tablet.jpg",
        web: "/images/banner/Slide-2-web.jpg",
        heading: "Start Taking Advantage Of Our Services Today",
        subHeading: "Get A Quote From SecureCash",
        text: "We Just Need A Few Details!",
        buttonText: "Get a Quote",
        buttonLink: "/quote",
        alt: "Get a Quote from SecureCash"
    },
    {
        mobile: "/images/banner/Slide-3-mobile.jpg",
        tablet: "/images/banner/Slide-3-tablet.jpg",
        web: "/images/banner/Slide-3-web.jpg",
        heading: "We're Pushing Our Industry Into The Future",
        subHeading: "Take Advantage Of Our eDockets System",
        text: "Control Your Services With A Click Of A Button",
        buttonText: "Learn More",
        buttonLink: "https://www.edockets.app/",
        alt: "eDockets System - Digital Cash Management"
    },
    {
        mobile: "/images/banner/Slide-4-mobile.jpg",
        tablet: "/images/banner/Slide-4-tablet.jpg",
        web: "/images/banner/Slide-4-web.jpg",
        heading: "Our Services Are Covert",
        subHeading: "We Don't Attract Unwanted Attention",
        text: "A Safer Solution For Your Business",
        buttonText: "Learn More",
        buttonLink: "/about-us#about-us-section-service",
        alt: "Covert Cash Transport Services"
    },
    {
        mobile: "/images/banner/Slide-5-mobile.jpg",
        tablet: "/images/banner/Slide-5-tablet.jpg",
        web: "/images/banner/Slide-5-web.jpg",
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
        <div id="banner" className="flex flex-col justify-end items-center ">
            <Slider slides={SLIDES} />
            {/* <div style={{ height: '600px', background: '#ccc' }}>Placeholder</div> */}

            <InfoBar />
        </div>
    );
};

export default HeroSection;
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

export default Slider; #banner.slick - dots li {
    content: none;
    width: auto!important;
    height: auto!important;
    position: relative;
    display: inline - block;
    padding: 0;
}

#banner.slick - dots li button {
    display: block;
    content: none!important;
}

#banner.slick - dots li button:before {
    content: none!important;
}
#banner.slick - track {
    background - color: black!important;
}

#banner.slick - slide div {
    display: flex!important;
    flex - direction: column;
}

#banner.slide - button:hover {
    background: #fff!important;
    transform: scale(1.34)!important;
}

#banner.slick - dots {
    position: absolute!important;
    width: 20px!important;
    height: 68px!important;
    z - index: 10!important;
    top: calc(50 % - 80px)!important;
    right: 20px!important;
    cursor: default !important;
    margin - left: auto!important;
    margin - right: 0!important;
}

@media(min - width: 768px) {
    #banner.slick - dots {
        right: 20px!important;
    }
}

@media(min - width: 1200px) {
    #banner.slick - dots {
        right: 40px!important;
    }
}
import Link from "next/link";

const BannerButton = ({ href, text }) => (
    <Link href={href}>
        <div className="flex flex-row justify-center items-center w-[200px] min-h-[50px] min-w-[130px] px-5 py-0 mt-5 rounded-full bg-[#c7a652] btn-learn-more hover:bg-white 480px:w-[150px] 768px:w-[182px] 768px:min-w-[182px] 768px:min-h-[60px] 768px:mt-8 1366px:mt-12 max-h-[70px] group mx-auto 1024px:mx-0">
            <p className="m-0 p-0 text-sm w-full text-[#ffffff] group-hover:text-[#000] 480px:text-base hover:no-underline text-center">
                {text}
            </p>
        </div>
    </Link>
);

export default BannerButton;
import SliderButton from "./SliderButton";

const BannerContent = ({
    heading,
    subHeading,
    text,
    buttonText,
    buttonLink,
}) => (
    <div className="absolute w-full text-center text-white 1024px:w-[90%] 1200px:w-[80%] 1024px:pl-[3%] 1200px:pl-[4%] 1440px:pl-0 top-[50%] transform -translate-y-1/2">
        <hr className="w-[100px] h-[4px] rounded-[5px] border-0 bg-white mb-6 mx-auto 1024px:ml-0  1024px:mr-auto" />
        <h3

            className="text-[20px] text-white leading-[28px] text-center mb-[24px] 
             w-[90%] mx-auto 1024px:mx-0 1024px:text-left 
             768px:text-2xl 992px:text-[32px] 992px:leading-[1em] 
             992px:mb-[24px] [text-shadow:2px_2px_6px_#111111] font-prata"
        >
            {heading}
        </h3>

        <h1
            className="mx-auto font-bold text-[32px] leading-[28px] mb-[24px] 
             text-center text-primary 
             w-[80%] 1024px:w-full 768px:text-5xl 
             992px:text-[56px] 1024px:text-left 1024px:mx-0 
             [text-shadow:2px_2px_6px_#111111] font-montserrat"
        >
            {subHeading}
        </h1>

        <p
            className="text-[16px] text-white font-normal leading-[24px] text-center mb-0 
             w-[86%] 768px:text-xl mx-auto 
             1024px:w-full 1024px:mx-0 992px:text-[24px] 1024px:text-left 
             [text-shadow:2px_2px_6px_#111111] font-montserrat"
        >
            {text}
        </p>


        <SliderButton href={buttonLink} text={buttonText} />
    </div>
);

export default BannerContent;
