"use client";
import Image from "next/image";
import React, { useMemo } from "react";

const LOGO_CONFIG = {
  baseUrl: "/images/companies/",
  companies: [
    "dominos",
    "mcdonalds",
    "pizzahut",
    "coffee",
    "southaus",
    "muffinbreak",
    "redrooster",
    "stratco",
    "ford",
    "kathmandu",
    "nsw",
    "queens",
    "takingshape",
    "tasmanian",
    "victoria",
    "ymca",
    "west",
    "subway",
  ],
  slideWidth: 330,
  slideHeight: 150,
  animationDuration: 40,
};

const LogoSlide = ({ src, alt, width, height }) => (
  <div
    className="flex-shrink-0 flex items-center justify-center relative"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    <Image
      fill
      className="object-cover align-middle filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out"
      src={src}
      alt={`${alt} logo`}
      loading="eager"
      decoding="sync"
      sizes="(max-width: 768px) 50vw, 300px"
      quality={75}
    />
  </div>
);

const ClientLogos = ({ className = "", config = LOGO_CONFIG }) =>
{
  const { baseUrl, companies, slideWidth, slideHeight, animationDuration } = config;

  const slideData = useMemo(
    () => companies.map((name) => ({
      src: `${baseUrl}${name}.png`,
      alt: name,
    })),
    [baseUrl, companies]
  );

  const extendedSlides = useMemo(() => [...slideData, ...slideData], [slideData]);

  const totalWidth = slideWidth * extendedSlides.length;

  const handleMouseEnter = (e) =>
  {
    e.currentTarget.style.animationPlayState = "paused";
  };

  const handleMouseLeave = (e) =>
  {
    e.currentTarget.style.animationPlayState = "running";
  };

  return (
    <section
      id="client-logos"
      className={`relative px-0 py-[30px] 992px:py-[65px] bg-white ${className}`}
      aria-label="Our clients"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[100px] 992px:w-[200px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[100px] 992px:w-[200px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden w-full">
        <div
          className="flex logo-scroll-track"
          style={{
            width: `${totalWidth}px`,
            animation: `smoothScrollLeft ${animationDuration}s linear infinite`,
            willChange: 'transform',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {extendedSlides.map((slide, index) => (
            <LogoSlide
              key={`${slide.alt}-${index}`}
              src={slide.src}
              alt={slide.alt}
              width={slideWidth}
              height={slideHeight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;