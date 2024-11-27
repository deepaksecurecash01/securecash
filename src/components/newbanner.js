"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

const Banner = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const bannerInterval = useRef(null);

  const slides = [
    {
      mobile: "https://www.securecash.com.au/images/banner/Slide-1-mobile.jpg",
      tablet: "https://www.securecash.com.au/images/banner/Slide-1-tablet.jpg",
      web: "https://www.securecash.com.au/images/banner/Slide-1-web.jpg",
      heading: "Let Us Do Your Banking,",
      subHeading: "Don't Take The Risk!",
      text: "Anywhere. Anytime. Australia Wide.",
      buttonText: "Learn More",
      buttonLink: "#welcome",
    },
    {
      mobile: "https://www.securecash.com.au/images/banner/Slide-2-mobile.jpg",
      tablet: "https://www.securecash.com.au/images/banner/Slide-2-tablet.jpg",
      web: "https://www.securecash.com.au/images/banner/Slide-2-web.jpg",
      heading: "Start Taking Advantage Of Our Services Today",
      subHeading: "Get A Quote From SecureCash",
      text: "We Just Need A Few Details!",
      buttonText: "Get a Quote",
      buttonLink: "https://www.securecash.com.au/quote/",
    },
    {
      mobile: "https://www.securecash.com.au/images/banner/Slide-3-mobile.jpg",
      tablet: "https://www.securecash.com.au/images/banner/Slide-3-tablet.jpg",
      web: "https://www.securecash.com.au/images/banner/Slide-3-web.jpg",
      heading: "We're Pushing Our Industry Into The Future",
      subHeading: "Take Advantage Of Our eDockets System",
      text: "Control Your Services With A Click Of A Button",
      buttonText: "Learn More",
      buttonLink: "https://www.edockets.app/",
    },
    {
      mobile: "https://www.securecash.com.au/images/banner/Slide-4-mobile.jpg",
      tablet: "https://www.securecash.com.au/images/banner/Slide-4-tablet.jpg",
      web: "https://www.securecash.com.au/images/banner/Slide-4-web.jpg",
      heading: "Our Services Are Covert",
      subHeading: "We Don't Attract Unwanted Attention",
      text: "A Safer Solution For Your Business",
      buttonText: "Learn More",
      buttonLink:
        "https://www.securecash.com.au/about-us/#about-us-section-service",
    },
    {
      mobile: "https://www.securecash.com.au/images/banner/Slide-5-mobile.jpg",
      tablet: "https://www.securecash.com.au/images/banner/Slide-5-tablet.jpg",
      web: "https://www.securecash.com.au/images/banner/Slide-5-web.jpg",
      heading: "Use A Provider You Can Trust",
      subHeading: "We Have Been Operating Over 25 Years",
      text: "Our Managers Have Over 100 Years Combined Industry Experience",
      buttonText: "About Us",
      buttonLink: "https://www.securecash.com.au/about-us/",
    },
  ];

  const slideBannerAuto = () => {
    setSlideIndex((prev) => (prev >= slides.length ? 1 : prev + 1));
  };

  useEffect(() => {
    startBanner();
    return () => stopBanner();
  }, []);

  const startBanner = () => {
    bannerInterval.current = setInterval(slideBannerAuto, 5000);
  };

  const stopBanner = () => {
    clearInterval(bannerInterval.current);
  };

  return (
    <div
      id="banner"
      className="pt-[118px] flex flex-col justify-end items-center"
    >
      <div
        id="banner-slider"
        className="w-full inline-block relative "
        onMouseOver={stopBanner}
        onMouseOut={startBanner}
      >
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`bannerSlides   fade ${
                slideIndex === index + 1 ? "block" : "hidden"
              }`}
            >
              <picture>
                <source srcSet={slide.mobile} media="(max-width: 480px)" />
                <source srcSet={slide.tablet} media="(max-width: 768px)" />
                <img src={slide.web} alt="" className="h-full w-full" />
              </picture>
              <div className="w-full max-w-[1366px] mx-auto">
                <div className="text p-[8px_12px] absolute bottom-[8px] w-[70%] text-left top-[20%] text-white">
                  <hr className="h-[4px] border-0 my-[30px] w-[100px] rounded-[5px] bg-white 1024px:text-left mb-6 text-center 1024px:mt-0 " />
                  <h3 className="prata [text-shadow:2px_2px_5px_#111111] my-[8px_0_24px_0] font-prata text-[32px] leading-[1em] mb-[24px] ">
                    {slide.heading}
                  </h3>
                  <h1 className="montSemi text-[#c7a652] font-montserrat font-bold [text-shadow:2px_2px_6px_#111111]  mb-7.5 text-[56px] leading-[1em] mb-[16px]">
                    {slide.subHeading}
                  </h1>
                  <p className="[text-shadow:2px_2px_5px_#111111] text-xl leading-[1em]">
                    {slide.text}
                  </p>
                  <a href={slide.buttonLink} className="btn-wrapper">
                    <div className=" px-5 text-center py-0   leading-[22px] w-[182px] mt-12  min-w-[182px] min-h-[60px] max-h-[70px] flex flex-row justify-center items-center rounded-full bg-[#c7a652] btn-learn-more hover:bg-white group mx-auto 1024px:mx-0">
                      <p className="m-0 p-0 text-[#ffffff] w-full group-hover:text-[#000] hover:no-underline">
                        {slide.buttonText}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="inner-controls absolute w-[40px] h-[68px] z-10 top-[calc(50%-60px)] right-[-15px] 1200px:right-0 cursor-default m-0 mr-[30px] ml-auto ">
          <ul className="dot-navigation list-none">
            {slides.map((_, n) => (
              <li key={n} className=" ">
                <span
                  className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-[background-color_0.6s_ease] dot hover:bg-white  hover:transform  hover:scale-[1.34]  hover:w-[15px]  hover:h-[15px] ${
                    slideIndex === n + 1
                      ? "bg-white transform scale-[1.34] w-[15px] h-[15px]"
                      : ""
                  }`}
                  onClick={() => setSlideIndex(n + 1)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* New Inner Content */}
      <div className="w-full max-w-[1366px] mx-auto">
        <div
          id="banner-info"
          className="1024px:w-full 1024px:mx-auto bg-black relative 1024px:top-[-34px] 1024px:rounded-[40px] text-white text-sm 1024px:flex flex-row justify-center items-center 992px:w-[95%] 992px:inline-block 992px:rounded-none 992px:my-auto 992px:mx-0 992px:top-0 992px:px-1 992px:py-0"
        >
          <div className="pl-0 w-[33%] float-left text-center relative mid-row py-5">
            <FaPhoneAlt className=" inline text-[20px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;Ask Us Anything{" "}
            <a href="tel:1300732873" className="text-primary hover:underline">
              1300 SECURE
            </a>
          </div>
          <div className="pl-0 w-[33%] float-left text-center relative mid-row hidden 1366px:block py-5">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;For Quotes and Enquiries&nbsp;
            <a
              href="mailto:customers@securecash.com.au"
              className="text-primary hover:underline"
            >
              customers@securecash.com.au
            </a>
          </div>
          <div className="pl-0 w-[33%] float-left text-center relative mid-row block 1366px:hidden py-5">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;
            <a
              href="mailto:customers@securecash.com.au"
              className="text-primary hover:underline"
            >
              customers@securecash.com.au
            </a>
          </div>
          <div className="pl-0 w-[33%] float-left text-center relative mid-row py-5">
            <FaUsers className="inline text-[26px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;Learn More{" "}
            <a
              href="https://www.securecash.com.au/about-us/"
              className="text-primary hover:underline"
            >
              About us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
