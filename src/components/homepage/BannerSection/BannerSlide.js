"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/components/layout/Container";
import BannerContent from "./BannerContent";

const BannerSlide = ({ slides = [] }) => {
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

    beforeChange: (_, next) => {
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
        onClick={() => {
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
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />
        <picture className="w-full h-full">
          <source media="(min-width: 1200px)" srcSet={slide.web} />
          <source media="(min-width: 768px)" srcSet={slide.tablet} />
          <source media="(max-width: 480px)" srcSet={slide.mobile} />
          <Image
            width={1200}
            height={800}
            alt={slide.alt || "Banner Image"}
            src={slide.mobile}
            priority
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
            className="w-full h-[480px] 414px:h-[490px] 768px:h-[600px] 1280px:h-[800px] object-cover"
          />
        </picture>
        <Container className=" z-10">
          <BannerContent {...slide} />
        </Container>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default BannerSlide;
