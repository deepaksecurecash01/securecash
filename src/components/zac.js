"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BannerInfo from "@/components/common/Banner/BannerInfo";

// Constants
const SLIDE_INTERVAL = 5000;
// Import slide images
const SLIDES = [
  {
    mobile: "/images/banner/Slide-1-mobile.jpg",
    tablet: "/images/banner/Slide-1-tablet.jpg",
    web: "/images/banner/Slide-1-web.jpg",
    heading: "Let Us Do Your Banking,",
    subHeading: "Don't Take The Risk!",
    text: "Anywhere. Anytime. Australia Wide.",
    buttonText: "Learn More",
    buttonLink: "#welcome",
  },
  {
    mobile: "/images/banner/Slide-2-mobile.jpg",
    tablet: "/images/banner/Slide-2-tablet.jpg",
    web: "/images/banner/Slide-2-web.jpg",
    heading: "Start Taking Advantage Of Our Services Today",
    subHeading: "Get A Quote From SecureCash",
    text: "We Just Need A Few Details!",
    buttonText: "Get a Quote",
    buttonLink: "/quote",
  },
  {
    mobile: "/images/banner/Slide-3-mobile.jpg",
    tablet: "/images/banner/Slide-3-tablet.jpg",
    web: "/images/banner/Slide-3-web.jpg",
    heading: "We're Pushing Our Industry Into The Future",
    subHeading: "Take Advantage Of Our eDockets System",
    text: "Control Your Services With A Click Of A Button",
    buttonText: "Learn More",
    buttonLink: "https://www.edockets.app/",
  },
  {
    mobile: "/images/banner/Slide-4-mobile.jpg",
    tablet: "/images/banner/Slide-4-tablet.jpg",
    web: "/images/banner/Slide-4-web.jpg",
    heading: "Our Services Are Covert",
    subHeading: "We Don't Attract Unwanted Attention",
    text: "A Safer Solution For Your Business",
    buttonText: "Learn More",
    buttonLink: "/about-us#about-us-section-service",
  },
  {
    mobile: "/images/banner/Slide-5-mobile.jpg",
    tablet: "/images/banner/Slide-5-tablet.jpg",
    web: "/images/banner/Slide-5-web.jpg",
    heading: "Use A Provider You Can Trust",
    subHeading: "We Have Been Operating Over 25 Years",
    text: "Our Managers Have Over 100 Years Combined Industry Experience",
    buttonText: "About Us",
    buttonLink: "/about-us",
  },
];

// Components
const BannerButton = ({ href, text }) => (
  <Link href={href}>
    <div className="flex flex-row justify-center items-center w-[200px] min-h-[50px] min-w-[130px] px-5 py-0 mt-5 rounded-full bg-[#c7a652] btn-learn-more hover:bg-white 480px:w-[150px] 768px:w-[182px] 768px:min-w-[182px] 768px:min-h-[60px] 768px:mt-8 1366px:mt-12 max-h-[70px] group mx-auto 1024px:mx-0">
      <p className="m-0 p-0 text-sm w-full text-[#ffffff] group-hover:text-[#000] 480px:text-base hover:no-underline text-center">
        {text}
      </p>
    </div>
  </Link>
);

const BannerContent = ({
  heading,
  subHeading,
  text,
  buttonText,
  buttonLink,
}) => (
  <div className="absolute bottom-[8px] px-0 mr-0 top-[10%] mt-12 480px:mt-14 600px:mt-7 768px:mt-14 600px:top-[20%] w-full text-center p-[8px_12px] text-white 1024px:w-[70%] 1024px:text-left 1024px:top-[10%] 1024px:bottom-auto 1024px:pl-[52px] 1200px:mt-0 1280px:mt-7 1200px:top-[15%] 1280px:top-[20%] 1366px:mt-10">
    <hr className="h-[4px] w-[100px] mx-auto my-[30px] bg-white rounded-[5px] border-0 1024px:mx-0 1024px:text-left text-center mb-6 1024px:mt-0 mt-0" />
    <h3 className="font-prata text-[20px] leading-[24px] text-center my-[8px_0_24px_0] w-[90%] mb-6 mx-auto 1024px:mx-0 1024px:text-left 768px:text-2xl 992px:text-[32px] 992px:leading-[1em] 992px:mb-[24px] [text-shadow:2px_2px_5px_#111111]">
      {heading}
    </h3>
    <h1 className="montSemi font-montserrat mb-6 font-bold text-[26px] 480px:text-[30px] leading-[28px] text-center mb-7.5 w-[90%] mx-auto 1024px:mx-0 text-[#c7a652] 480px:leading-[1em] 768px:text-5xl 992px:text-[56px] 992px:mb-[16px] 1024px:text-left [text-shadow:2px_2px_6px_#111111]">
      {subHeading}
    </h1>
    <p className="[text-shadow:2px_2px_5px_#111111] text-[16px] 992px:text-[24px] text-center w-[86%] mx-auto 768px:text-xl 1024px:mx-0 leading-[24px] 1024px:text-left">
      {text}
    </p>
    <BannerButton href={buttonLink} text={buttonText} />
  </div>
);

const BannerSlide = ({ slide, isActive }) => (
  <div
    className={`bannerSlides relative fade ${isActive ? "block" : "hidden"}`}
  >
    <div className="bg-black w-full h-full z-0 absolute opacity-35" />
    <picture>
      <source srcSet={slide.mobile} media="(max-width: 480px)" />
      <source srcSet={slide.tablet} media="(max-width: 768px)" />
      <Image
        src={slide.web}
        alt=""
        className="h-full w-full min-h-[480px] 414px:min-h-[490px] object-cover 768px:min-h-[600px] 1280px:h-full -z-10"
        fill
        priority={isActive}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
      />
    </picture>
    <div className="w-full max-w-[1366px] mx-auto">
      <BannerContent {...slide} />
    </div>
  </div>
);

const SlideControls = ({ slides, currentSlide, onSlideChange }) => (
  <div className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-60px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0">
    <ul className="dot-navigation absolute top-[32%] list-none">
      {slides.map((_, index) => (
        <li key={index}>
          <button
            className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-[background-color_0.6s_ease] dot hover:bg-white hover:transform hover:scale-[1.34] hover:w-[15px] hover:h-[15px] ${
              currentSlide === index + 1
                ? "bg-white transform scale-[1.34] w-[15px] h-[15px]"
                : ""
            }`}
            onClick={() => onSlideChange(index + 1)}
            aria-label={`Go to slide ${index + 1}`}
          />
        </li>
      ))}
    </ul>
  </div>
);

const useBannerAutoplay = (slidesLength, initialDelay = SLIDE_INTERVAL) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const intervalRef = useRef(null);

  const slideBannerAuto = () => {
    setSlideIndex((prev) => (prev >= slidesLength ? 1 : prev + 1));
  };

  const startAutoplay = () => {
    intervalRef.current = setInterval(slideBannerAuto, initialDelay);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  return {
    slideIndex,
    setSlideIndex,
    startAutoplay,
    stopAutoplay,
  };
};

const Banner = () => {
  const { slideIndex, setSlideIndex, startAutoplay, stopAutoplay } =
    useBannerAutoplay(SLIDES.length);

  return (
    <div id="banner" className="flex flex-col justify-end items-center">
      <div
        id="banner-slider"
        className="w-full inline-block relative overflow-hidden"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div className="slideshow-container">
          {SLIDES.map((slide, index) => (
            <BannerSlide
              key={index}
              slide={slide}
              isActive={slideIndex === index + 1}
            />
          ))}
        </div>
        <SlideControls
          slides={SLIDES}
          currentSlide={slideIndex}
          onSlideChange={setSlideIndex}
        />
      </div>
      <BannerInfo />
    </div>
  );
};

export default Banner;
