"use client";
import React, { useState } from "react";
import Slider from "react-slick";

const Carousel = () => {
  const slides = [
    {
      imgSrc: "https://www.securecash.com.au/images/icons/australia.png",
      title: "Australia Wide",
      description:
        "SecureCash is a one stop cash in transit agency that will manage your banking &amp; change order services no matter where you are located in Australia.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/edocket.png",
      title: "eDocket System",
      description:
        "Using our industry leading software technology unique to only SecureCash, we are able to track &amp; trace your deposit with a click of a button.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/flexible.png",
      title: "Total Flexibility",
      description:
        "You can have your banking collected on any day or days you choose, &amp; you are free to cancel or change the days your banking is collected whenever you want.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/banks.png",
      title: "All Major Banks",
      description:
        "We work with most major banks in Australia including the NAB, Commonwealth Bank, ANZ, Westpac &amp; some local banks such as BankSA &amp; Bendigo Bank.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/contracts.png",
      title: "No Lock-in Contracts",
      description:
        "We do not lock you into lengthy contracts, you are free to try our service &amp; if you find that it is not suitable for your organisation, then you can cancel at anytime with notice.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/olservices.png",
      title: "Online Services",
      description:
        "Customers are able to book extra pickups, cancel a scheduled pickup, submit change orders, &amp; even verify a banking courier’s identification all online.",
    },
  ];

  const CustomPrevArrow = ({ currentSlide, slideCount, onClick }) => (
    <div
      className={`  absolute  1024px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer z-10 top-1/2  transform -translate-y-1/2 992px:right-0  992px:top-[38%] hover:opacity-100 text-[50px] text-white `}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      ❮
    </div>
  );

  const CustomNextArrow = ({ currentSlide, slideCount, onClick }) => (
    <div
      className={`  absolute  1024px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer top-1/2 z-10  right-0 transform -translate-y-1/2  992px:top-[62%] hover:opacity-100 text-[50px] text-white `}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      ❯
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slick-item inline-block w-full text-center mx-auto opacity-100  visible relative transition-opacity duration-1000 ease-in-out  992px:align-top  992px:w-[30%]  992px:float-left text-white  `}
        >
          <div className="service-img">
            <img className="h-[60px] mx-auto" src={slide.imgSrc} alt="" />
          </div>
          <div className="service-info text-white clear-both">
            <h3 className="text-heading leading-[1.6em] text-[16px] font-montserrat font-bold my-[1rem]">
              {slide.title}
            </h3>
            <p className=" w-[70%] 992px:w-[95%] text-center text-[14px] leading-[1.6em]  992px:leading-[1.6em]  1024px:leading-[2em] mx-auto whitespace-normal  font-montserrat font-light 992px:text-center">
              {slide.description}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
