"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/layout/Container";
import BannerContent from "./SliderContent";

const SlickSlider = ({ slides = [] }) =>
{
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  if (!slides.length) return null;

  const settings = {
    infinite: slides.length > 1,
    autoplay: true,
    speed: 1000,
    dots: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,

    beforeChange: (_, next) =>
    {
      setCurrentSlide(next);
    },
    appendDots: (dots) => (
      <div className="dots-section">
        <ul
          style={{
            position: "absolute",
            top: "32%",
            listStyleType: "none",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className="slide-button"
        style={{
          width: "15px",
          height: "15px",
          padding: "0",
          borderRadius: "50%",
          background: currentSlide === i ? "#fff" : "#a3a3a3",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: currentSlide === i ? "scale(1.34)" : "scale(1)",
        }}
        onClick={() =>
        {
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(i);
          }
        }}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <div className="relative w-full">
      <Slider className="relative" ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative overflow-hidden">
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
                 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            </div>
            <Container className="z-10 w-full absolute inset-0 flex items-center">
              <BannerContent {...slide} />
            </Container>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;