import Image from "next/image";
import React, { useMemo } from "react";

// Configuration - move to constants file in production
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
  duplicateSlices: 3, // Number of slides to duplicate for seamless loop
  animationDuration: 60, // seconds
};

const LogoSlide = ({ src, alt, width, height }) => (
  <div className="flex-shrink-0 p-0 mt-auto mb-auto" style={{ width: `${width}px` }}>
    <Image
      className="align-middle filter contrast-0 h-[150px] w-auto hover:cursor-default hover:filter hover:contrast-[100%] transition-all duration-300"
      width={width}
      height={height}
      src={src}
      alt={`${alt} logo`}
      loading="lazy"
    />
  </div>
);

const ClientLogos = ({ className = "", config = LOGO_CONFIG }) =>
{
  const { baseUrl, companies, slideWidth, slideHeight, duplicateSlices, animationDuration } = config;

  // Generate slide data
  const slideData = useMemo(() =>
    companies.map((name) => ({
      src: `${baseUrl}${name}.png`,
      alt: name,
    })),
    [baseUrl, companies]
  );

  // Create extended slides for seamless infinite scroll
  const extendedSlides = useMemo(() =>
  {
    return [
      ...slideData.slice(-duplicateSlices), // Last N slides at the beginning
      ...slideData,
      ...slideData.slice(0, duplicateSlices), // First N slides at the end
    ];
  }, [slideData, duplicateSlices]);

  // Calculate total width for animation
  const totalSlides = companies.length + (duplicateSlices * 2);
  const totalWidth = slideWidth * totalSlides;

  return (
    <section
      id="client-logos"
      className={`px-0 py-[30px] 992px:py-[65px] ${className}`}
      aria-label="Our clients"
    >
      <div className="h-full m-auto overflow-hidden w-full">
        <div
          className="flex"
          style={{
            width: `${totalWidth}px`,
            animation: `scrollright ${animationDuration}s linear infinite`,
          }}
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