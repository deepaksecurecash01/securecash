"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";

const Carousel = () =>
{
  const slides = [
    {
      imgSrc: "/images/icons/australia.png",
      title: "Australia Wide",
      description:
        "SecureCash is a one stop cash in transit agency that will manage your banking & change order services no matter where you are located in Australia.",
    },
    {
      imgSrc: "/images/icons/edocket.png",
      title: "eDocket System",
      description:
        "Using our industry leading software technology unique to only SecureCash, we are able to track & trace your deposit with a click of a button.",
    },
    {
      imgSrc: "/images/icons/flexible.png",
      title: "Total Flexibility",
      description:
        "You can have your banking collected on any day or days you choose, & you are free to cancel or change the days your banking is collected whenever you want.",
    },
    {
      imgSrc: "/images/icons/banks.png",
      title: "All Major Banks",
      description:
        "We work with most major banks in Australia including the NAB, Commonwealth Bank, ANZ, Westpac & some local banks such as BankSA & Bendigo Bank.",
    },
    {
      imgSrc: "/images/icons/contracts.png",
      title: "No Lock-in Contracts",
      description:
        "We do not lock you into lengthy contracts, you are free to try our service & if you find that it is not suitable for your organisation, then you can cancel at anytime with notice.",
    },
    {
      imgSrc: "/images/icons/olservices.png",
      title: "Online Services",
      description:
        "Customers are able to book extra pickups, cancel a scheduled pickup, submit change orders, & even verify a banking courier’s identification all online.",
    },
  ];

  const CustomPrevArrow = ({ currentSlide, slideCount, onClick }) => (
    <div
      className={`  absolute  992px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer z-10 top-1/2  transform -translate-y-1/2 992px:-right-6  992px:top-[38%] hover:opacity-100 text-[50px] text-white `}
      onClick={() =>
      {
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
      className={`  absolute  992px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer top-1/2 z-10 right-0   992px:-right-6 transform -translate-y-1/2  992px:top-[62%] hover:opacity-100 text-[50px] text-white `}
      onClick={() =>
      {
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
            <Image
              width={60}
              height={60}
              className="h-[60px] w-auto mx-auto"
              src={slide.imgSrc}
              alt=""
            />
          </div>
          <div className="service-info text-white clear-both">
            <h2

              className="text-white text-[16px] leading-[1.6em] text-center font-bold my-[1rem] font-montserrat"
            >
              {slide.title}
            </h2>

            <p

              className="text-[14px] leading-[1.6em] text-center font-light mb-0 
             w-[70%] 992px:w-[95%]
             992px:leading-[2em] mx-auto whitespace-normal 992px:text-center font-montserrat"
            >
              {slide.description}
            </p>


          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
