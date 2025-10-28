"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

const Slide = ({ slide, isActive }) => (
    <div
        className={`bannerSlides relative animate-fade transition-opacity duration-300 ${isActive ? " opacity-100 block" : " opacity-0 hidden"
            }`}
    >
        <div className="absolute inset-0 bg-black/35 transition-opacity duration-700" />
        <picture>
            <source media="(min-width: 1200px)" srcSet={slide.web} />
            <source media="(min-width: 768px)" srcSet={slide.tablet} />
            <source media="(max-width: 480px)" srcSet={slide.mobile} />
            <img

                priority="true"
                alt={slide.alt || "Banner Image"}
                src={slide.mobile}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
                className="h-full w-full min-h-[480px] 414px:min-h-[490px] object-cover 768px:min-h-[600px] 1280px:h-full -z-10"
            />
        </picture>
        <Container className=" z-10 w-full">
            <SliderContent {...slide} />
        </Container>
    </div>
);

const SlideControls = ({ slides, currentSlide, onSlideChange }) => (
    <div className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-80px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0">
        <ul className="dot-navigation absolute top-[32%] list-none">
            {slides.map((_, index) => (
                <li key={index}>
                    <span
                        className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-[background-color_0.6s_ease] dot hover:bg-white hover:transform hover:scale-[1.34] hover:w-[15px] hover:h-[15px] ${currentSlide === index + 1
                                ? "bg-white transform scale-[1.34] w-[15px] h-[15px]"
                                : ""
                            }`}
                        onClick={() => onSlideChange(index + 1)}
                    />
                </li>
            ))}
        </ul>
    </div>
);

const Slider = ({ slides = [] }) =>
{
    const [slideIndex, setSlideIndex] = useState(1);
    const bannerInterval = useRef(null);

    const slideBannerAuto = () =>
    {
        setSlideIndex((prev) => (prev >= slides.length ? 1 : prev + 1));
    };

    useEffect(() =>
    {
        const startBanner = () =>
        {
            bannerInterval.current = setInterval(slideBannerAuto, 5000);
        };

        const stopBanner = () =>
        {
            clearInterval(bannerInterval.current);
        };

        startBanner();
        return () => stopBanner();
    }, []);

    return (
        <div
            id="banner-slider"
            className="w-full inline-block relative overflow-hidden"
            onMouseOver={() => clearInterval(bannerInterval.current)}
            onMouseOut={() =>
            {
                bannerInterval.current = setInterval(slideBannerAuto, 5000);
            }}
        >
            <div className="slideshow-container">
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        slide={slide}
                        isActive={slideIndex === index + 1}
                    />
                ))}
            </div>
            <SlideControls
                slides={slides}
                currentSlide={slideIndex}
                onSlideChange={setSlideIndex}
            />
        </div>
    );
};

export default Slider;
