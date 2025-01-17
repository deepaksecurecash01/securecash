"use client";
import React, { useEffect, useRef, useState } from "react";
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
    <div className="relative">
      <Slider className="" ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className=" relative animate-fade ">
            <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />
            <picture className="w-full">
              <source media="(min-width: 1200px)" srcSet={`${slide.web}`} />
              <source srcSet={slide.tablet} media="(min-width: 768px)" />
              <source media="(max-width: 480px)" srcSet={`${slide.mobile}`} />
              <Image
                width={0}
                height={0}
                alt={slide.alt || "Banner Image"}
                src={slide.mobile}
                priority={true}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
                className="h-full w-full min-h-[480px] 414px:min-h-[490px] object-cover 768px:min-h-[600px] 1280px:h-full -z-10"
              />
            </picture>
            <Container>
              <BannerContent {...slide} />
            </Container>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlide;
