"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import SlideItem from "./SlideItem.js";
import Container from "@/components/layout/Container";
import SliderContent from "./SliderContent";
import SlideControls from "./SlideControls"; // we'll provide a small control component below

const AUTO_DELAY = 5000;

const Slider = ({ slides = [] }) =>
{
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // initial true for SSR -> client adjustment
  const timerRef = useRef(null);
  const rootRef = useRef(null);

  // Intersection observer to pause when off-screen
  useEffect(() =>
  {
    if (!rootRef.current || typeof window === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) =>
      {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const clearTimer = useCallback(() =>
  {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() =>
  {
    clearTimer();
    timerRef.current = setInterval(() =>
    {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_DELAY);
  }, [clearTimer, slides.length]);

  useEffect(() =>
  {
    if (isVisible && !isHovered && slides.length > 1) {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isVisible, isHovered, startTimer, clearTimer, slides.length]);

  // Manual navigation
  const goTo = useCallback(
    (n) =>
    {
      const next = Math.max(0, Math.min(slides.length - 1, n));
      setIndex(next);
    },
    [slides.length]
  );

  const next = useCallback(() => setIndex((s) => (s + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setIndex((s) => (s - 1 + slides.length) % slides.length), [slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div
      ref={rootRef}
      id="banner-slider"
      className="w-full inline-block relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Hero slider"
      aria-live="polite"
    >
      <div className="slideshow-container relative">
        {/* Render all slides, toggle via CSS classes */}
        {slides.map((slide, idx) => (
          <SlideItem
            key={idx}
            slide={slide}
            idx={idx}
            active={idx === index}
            isFirst={idx === 0}
          >
            {/* Keep your SliderContent inside SlideItem via children or SlideItem renders it */}
          </SlideItem>
        ))}
      </div>

      {/* Controls: dots / prev-next (kept minimal and memoized) */}
      <SlideControls
        slides={slides}
        currentIndex={index}
        onGoTo={goTo}
        onNext={next}
        onPrev={prev}
        visible // we can make visible conditional if needed
      />
    </div>
  );
};

export default Slider;
