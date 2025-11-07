"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

const Slide = ({ slide, isActive, isPriority, slideIndex }) =>
{
  const [viewport, setViewport] = useState("desktop");

  useEffect(() =>
  {
    const update = () =>
    {
      const w = window.innerWidth;
      if (w < 480) setViewport("mobile");
      else if (w < 1024) setViewport("tablet");
      else setViewport("web");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const src =
    viewport === "mobile" ? slide.mobile : viewport === "tablet" ? slide.tablet : slide.web;

  return (
    <div
      className={`bannerSlides relative transition-opacity duration-700 ${isActive ? "opacity-100 block" : "opacity-0 hidden"}`}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
        <Image
          src={src}
          alt={slide.alt || `Banner Slide ${slideIndex + 1}`}
          fill
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "low"}
          quality={isPriority ? 75 : 50}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
};

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
    if (bannerInterval.current) clearInterval(bannerInterval.current);
    bannerInterval.current = setInterval(slideBannerAuto, 5000);
  }, [slideBannerAuto]);

  const stopBanner = useCallback(() =>
  {
    if (bannerInterval.current) clearInterval(bannerInterval.current);
  }, []);

  useEffect(() =>
  {
    if (!isHovered) startBanner();
    return () => stopBanner();
  }, [isHovered, startBanner, stopBanner]);

  const handleSlideChange = useCallback((index) =>
  {
    setSlideIndex(index);
    stopBanner();
    startBanner();
  }, [stopBanner, startBanner]);

  const currentIndex = slideIndex - 1;
  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

  const getPriority = (index) =>
  {
    if (index === 0) return true;
    return index === nextIndex || index === prevIndex;
  };

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
        {slides.map((slide, index) =>
        {
          const isActive = currentIndex === index;
          const shouldRender = isActive || index === prevIndex || index === nextIndex;
          if (!shouldRender) return null;

          return (
            <Slide
              key={index}
              slide={slide}
              slideIndex={index}
              isActive={isActive}
              isPriority={getPriority(index)}
            />
          );
        })}
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
