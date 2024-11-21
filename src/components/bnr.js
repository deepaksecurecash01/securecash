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
    <div id="banner" className="pt-[118px]">
      <div id="banner-slider" onMouseOver={stopBanner} onMouseOut={startBanner}>
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`bannerSlides fade ${
                slideIndex === index + 1 ? "active" : ""
              }`}
            >
              <picture>
                <source srcSet={slide.mobile} media="(max-width: 480px)" />
                <source srcSet={slide.tablet} media="(max-width: 768px)" />
                <img src={slide.web} alt="" className="h-full w-full" />
              </picture>
              <div className="inner">
                <div className="text">
                  <hr className="divider-2 divider-white" />
                  <h3 className="prata">{slide.heading}</h3>
                  <h1 className="montSemi">{slide.subHeading}</h1>
                  <p>{slide.text}</p>
                  <a href={slide.buttonLink} className="btn-wrapper">
                    <div className="d-btn btn-learn-more">
                      <p>{slide.buttonText}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="inner-controls">
          <ul className="dot-navigation">
            {slides.map((_, n) => (
              <li key={n}>
                <span
                  className={`dot ${slideIndex === n + 1 ? "active" : ""}`}
                  onClick={() => setSlideIndex(n + 1)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* New Inner Content */}
      <div className="inner">
        <div id="banner-info">
          <div className="mid-row flex justify-center items-center">
            <FaPhoneAlt className=" inline text-[20px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;Ask Us Anything{" "}
            <a href="tel:1300732873">1300 SECURE</a>
          </div>
          <div className="mid-row email-desktop flex justify-center items-center">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;For Quotes and Enquiries&nbsp;
            <a href="mailto:customers@securecash.com.au">
              customers@securecash.com.au
            </a>
          </div>
          <div className="mid-row email-mobile">
            <FaEnvelope className="inline text-[22px]" />
            &nbsp;&nbsp;
            <a href="mailto:customers@securecash.com.au">
              customers@securecash.com.au
            </a>
          </div>
          <div className="mid-row">
            <FaUsers className="inline text-[26px]" />
            &nbsp;&nbsp;&nbsp;&nbsp;Learn More{" "}
            <a href="https://www.securecash.com.au/about-us/">About us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
