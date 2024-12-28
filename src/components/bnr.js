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
        className="w-full inline-block relative overflow-hidden"
        onMouseOver={stopBanner}
        onMouseOut={startBanner}
      >
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`bannerSlides relative fade ${
                slideIndex === index + 1 ? "block" : "hidden"
              }`}
            >
              <div className=" bg-black w-full h-full z-0 absolute opacity-35"></div>
              <picture>
                <source srcSet={slide.mobile} media="(max-width: 480px)" />
                <source srcSet={slide.tablet} media="(max-width: 768px)" />
                <img
                  src={slide.web}
                  alt=""
                  className="h-full w-full min-h-[480px] 414px:min-h-[490px] object-cover 768px:min-h-[600px] 1280px:h-full -z-10"
                />
              </picture>
              <div className="w-full max-w-[1366px] mx-auto">
                <div
                  className="absolute bottom-[8px] px-0 mr-0 top-[10%] mt-12  480px:mt-14 600px:mt-7 768px:mt-14 600px:top-[20%] w-full text-center p-[8px_12px] text-white 
                1024px:w-[70%] 1024px:text-left 1024px:top-[10%] 1024px:bottom-auto 1024px:pl-[52px] 1200px:mt-0 1280px:mt-7 1200px:top-[15%] 1280px:top-[20%] 1366px:mt-10"
                >
                  <hr className="h-[4px] w-[100px] mx-auto my-[30px] bg-white rounded-[5px] border-0 1024px:mx-0 1024px:text-left text-center mb-6 1024px:mt-0 mt-0" />

                  <h3
                    className="font-prata text-[20px]  leading-[24px] text-center my-[8px_0_24px_0] w-[90%] mb-6  mx-auto 1024px:mx-0 1024px:text-left 768px:text-2xl 992px:text-[32px]
                   992px:leading-[1em] 992px:mb-[24px] [text-shadow:2px_2px_5px_#111111]"
                  >
                    {slide.heading}
                  </h3>

                  <h1
                    className="montSemi font-montserrat mb-6 font-bold text-[26px] 480px:text-[30px] leading-[28px] text-center mb-7.5 w-[90%] mx-auto 1024px:mx-0 
                  text-[#c7a652] 480px:leading-[1em] 768px:text-5xl 992px:text-[56px] 992px:mb-[16px] 1024px:text-left [text-shadow:2px_2px_6px_#111111]"
                  >
                    {slide.subHeading}
                  </h1>

                  <p className="[text-shadow:2px_2px_5px_#111111] text-[16px] 992px:text-[24px] text-center w-[86%] mx-auto  768px:text-xl 1024px:mx-0 leading-[24px]  1024px:text-left">
                    {slide.text}
                  </p>

                  <a href={slide.buttonLink} className="btn-wrapper">
                    <div className="flex flex-row justify-center items-center w-[200px] min-h-[50px] min-w-[130px] px-5 py-0 mt-5 rounded-full bg-[#c7a652] btn-learn-more hover:bg-white 480px:w-[150px] 768px:w-[182px] 768px:min-w-[182px] 768px:min-h-[60px] 768px:mt-8 1366px:mt-12 max-h-[70px] group mx-auto 1024px:mx-0">
                      <p className="m-0 p-0 text-sm w-full text-[#ffffff] group-hover:text-[#000] 480px:text-base hover:no-underline text-center">
                        {slide.buttonText}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="inner-controls absolute w-5 h-[68px] z-10 top-[calc(50%-60px)] right-0 cursor-default ml-auto mr-0 320px:w-[40px] 768px:right-0 992px:mr-[30px] 1200px:right-0">
          <ul className="dot-navigation absolute top-[32%] list-none">
            {slides.map((_, n) => (
              <li key={n}>
                <span
                  className={`cursor-pointer h-[15px] w-[15px] mx-[2px] bg-[#a3a3a3] rounded-full inline-block transition-[background-color_0.6s_ease] dot hover:bg-white hover:transform hover:scale-[1.34] hover:w-[15px] hover:h-[15px] ${
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
          className="w-full mx-auto inline-block bg-black relative top-[-34px] py-2.5 px-0 text-white text-sm 480px:pt-2.5 480px:pb-5 1024px:rounded-[40px] 1024px:py-1 1024px:px-0 1024px:flex flex-row justify-center items-center 1024px:w-[95%] 1366px:w-full"
        >
          <div className="w-[80%] mx-auto pl-0 py-[5px] text-center relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-5 mid-row">
            <FaPhoneAlt className="inline text-[20px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;Ask Us Anything{" "}
            <a href="tel:1300732873" className="text-primary hover:underline">
              1300 SECURE
            </a>
          </div>
          <div className="w-[80%] mx-auto pl-0 py-[5px] text-center relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-5 mid-row hidden 1366px:block">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;For Quotes and Enquiries&nbsp;
            <a
              href="mailto:customers@securecash.com.au"
              className="text-primary hover:underline"
            >
              customers@securecash.com.au
            </a>
          </div>
          <div className="w-[80%] mx-auto pl-0 py-[5px] text-center relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-5 mid-row block 1366px:hidden">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="mailto:customers@securecash.com.au"
              className="text-primary hover:underline"
            >
              customers@securecash.com.au
            </a>
          </div>
          <div className="w-[80%] mx-auto pl-0 py-[5px] text-center relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-5 mid-row">
            <FaUsers className="inline text-[22px]" />
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
