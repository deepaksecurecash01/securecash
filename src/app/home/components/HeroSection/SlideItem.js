"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";

const SlideItem = ({ slide, idx, active = false, isFirst = false }) => {
  // Provide srcSet behavior via Next/Image `sizes` and separate images for device widths
  // We'll select the correct URL in src based on viewport via simple strategy
  // You can keep using slide.web/tablet/mobile; Next/Image will request appropriate size via `sizes`.
  const src = slide.web; // fallback src; sizes will let Next optimize

  return (
    <div
      className={`slide-item absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out pointer-events-none ${active ? "slide-active pointer-events-auto" : ""
        }`}
      aria-hidden={!active}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div className="relative w-full h-full min-h-[480px] 414px:min-h-[490px] 768px:min-h-[600px] 1024px:h-full 1440px:min-h-[70vh]">
        {/* Next/Image: fill mode for background hero image */}
        <Image
          src={src}
          alt={slide.alt || `Banner Slide ${idx + 1}`}
          fill
          sizes="(max-width: 479px) 100vw, (max-width: 1023px) 100vw, 1920px"
          priority={isFirst}
          quality={80}
          className="object-cover"
        />
      </div>

      {/* Content (same markup you had) */}
      <Container className="z-10 w-full absolute inset-0 flex items-center">
        <SliderContent {...slide} />
      </Container>
    </div>
  );
};

export default SlideItem;
