"use client";
import React, { useState } from "react";
import Controls from "./Controls";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
const SocialLink = ({ href, icon, alt }) => (
  <li className="float-left pr-[5px]">
    <a href={href}>
      <img
        className="w-[80%] hover:filter hover:contrast-0"
        src={`https://www.securecash.com.au/images/icons/social/webp/${icon}.webp`}
        alt={alt}
      />
    </a>
  </li>
);
const Member = ({ member }) => {
  const CustomPrevArrow = ({ currentSlide, slideCount, onClick }) => (
    <div
      className={`  absolute p-5 transition-opacity duration-200 cursor-pointer z-10   992px:left-0  992px:top-20 text-primary text-[50px]  ${
        currentSlide === 0
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "opacity-100 cursor-pointer"
      }`}
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
      className={`  absolute p-5 transition-opacity duration-200 cursor-pointer top-0 z-10  left-0  992px:top-40 opacity-100 text-primary text-[50px] ${
        currentSlide >= slideCount - 4
          ? "cursor-not-allowed opacity-50 pointer-events-none no-underline"
          : "cursor-pointer"
      } `}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      ❯
    </div>
  );

  const CustomArrow = ({
    direction,
    currentSlide,
    slideCount,
    slidesToShow,
    onClick,
  }) => {
    const isPrev = direction === "prev";
    const isDisabled = isPrev
      ? currentSlide === 0
      : currentSlide >= slideCount - slidesToShow;

    return (
      <div
        className={`absolute p-5 transition-opacity duration-200 z-10 text-primary text-[50px] ${
          isPrev ? "992px:left-0 992px:top-20" : "left-0 top-0 992px:top-40"
        } ${
          isDisabled ? "opacity-50 pointer-events-none cursor-not-allowed no-underline" : "cursor-pointer"
        }`}
        onClick={!isDisabled ? onClick : undefined}
        aria-label={isPrev ? "Previous Slide" : "Next Slide"}
      >
        {isPrev ? "❮" : "❯"}
      </div>
    );
  };


const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <CustomArrow direction="next" slidesToShow={4} />,
  prevArrow: <CustomArrow direction="prev" slidesToShow={4} />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" slidesToShow={4} />,
        prevArrow: <CustomArrow direction="prev" slidesToShow={4} />,
      },
    },
    {
      breakpoint: 1140,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" slidesToShow={3} />,
        prevArrow: <CustomArrow direction="prev" slidesToShow={3} />,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" slidesToShow={2} />,
        prevArrow: <CustomArrow direction="prev" slidesToShow={2} />,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" slidesToShow={1} />,
        prevArrow: <CustomArrow direction="prev" slidesToShow={1} />,
      },
    },
  ],
};

  return (
    <Slider {...settings}>
      {member.map((member, index) => (
        <div
          key={index}
          className="item-container inline-block w-[80%] 1024px:w-[25%] bg-white self-center justify-center items-center align-top"
        >
          <div className="item ml-0 bg-white float-left">
            <img
              className="team-pic w-full mx-auto my-0"
              src={member.image}
              alt={member.name}
            />
          </div>
          <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden">
            <h4 className="text-[20px] font-semibold pb-[12px] text-[#333333]">
              {member.name}
            </h4>
            <p className="font-prata text-[14px] text-[#808080] mb-[18px]">
              {member.position}
            </p>
            <div className="email-info flex justify-items-center px-0 py-[10px]">
              <img
                className="mail-icon w-[5%] mr-2 py-[5px]"
                src="https://www.securecash.com.au/images/icons/mail.png"
                alt="mail"
              />
              <a
                className="text-[14px] text-[#929292] hover:no-underline hover:text-[#c7a652]"
                href={`mailto:${member.email}`}
              >
                {member.email}
              </a>
            </div>
            <div className="social-media pt-[5px]">
              <ul className="list-none">
                <SocialLink
                  href={member.socialLinks?.facebook}
                  icon="fb"
                  alt="Facebook"
                />
                <SocialLink
                  href={member.socialLinks?.twitter}
                  icon="twitter"
                  alt="Twitter"
                />
                <SocialLink
                  href={member.socialLinks?.youtube}
                  icon="yt"
                  alt="YouTube"
                />
                <SocialLink
                  href={member.socialLinks?.linkedin}
                  icon="linkedin"
                  alt="LinkedIn"
                />
              </ul>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Member;
