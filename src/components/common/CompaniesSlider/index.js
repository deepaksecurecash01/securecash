"use client";
import Image from "next/image";
import React, { useMemo } from "react";

// Configuration
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
  slideWidth: 300,
  slideHeight: 150,
  animationDuration: 40,
};

const LogoSlide = ({ src, alt, width, height }) => (
  <div
    className="flex-shrink-0 flex items-center justify-center"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    <Image
      className="align-middle filter grayscale opacity-70 h-[150px] w-auto hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-in-out"
      width={300} // ✅ MATCHED: Set to match slideWidth config
      height={150} // ✅ MATCHED: Set to match slideHeight config
      src={src}
      alt={`${alt} logo`}
      // ✅ OPTIMIZATION: Always lazy load footer/bottom content
      loading="lazy"
      decoding="async"
      // ✅ OPTIMIZATION: Tell browser these are small images
      sizes="(max-width: 768px) 50vw, 300px"
      quality={75} // 85 is overkill for simple logos, 75 is visually identical
    />
  </div>
);

const ClientLogos = ({ className = "", config = LOGO_CONFIG }) =>
{
  const { baseUrl, companies, slideWidth, slideHeight, animationDuration } = config;

  // Generate slide data
  const slideData = useMemo(
    () =>
      companies.map((name) => ({
        src: `${baseUrl}${name}.png`,
        alt: name,
      })),
    [baseUrl, companies]
  );

  // Create double set for seamless infinite scroll
  const extendedSlides = useMemo(() =>
  {
    return [...slideData, ...slideData];
  }, [slideData]);

  // Calculate total width
  const totalWidth = slideWidth * extendedSlides.length;

  return (
    <section
      id="client-logos"
      className={`relative px-0 py-[30px] 992px:py-[65px] bg-white ${className}`}
      aria-label="Our clients"
    >
      {/* Gradient overlays for fade effect - kept as is, lightweight DOM */}
      <div className="absolute left-0 top-0 bottom-0 w-[100px] 992px:w-[200px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[100px] 992px:w-[200px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex logo-scroll-track"
          style={{
            width: `${totalWidth}px`,
            // Ensure this animation is defined in your global CSS or Tailwind config
            animation: `smoothScrollLeft ${animationDuration}s linear infinite`,
            willChange: 'transform', // ✅ HINT: Tells browser to optimize compositing
          }}
          onMouseEnter={(e) =>
          {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) =>
          {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {extendedSlides.map((slide, index) => (
            <LogoSlide
              key={`${slide.alt}-${index}`}
              src={slide.src}
              alt={slide.alt}
              width={slideWidth}
              height={slideHeight}
            // Removed isPriority prop entirely
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;