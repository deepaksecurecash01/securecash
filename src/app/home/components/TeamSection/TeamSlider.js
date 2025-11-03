"use client";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Image from "next/image";

import Link from "next/link";

const SocialLink = ({ href, icon, alt }) => (
  <li className="float-left pr-[5px]">
    <Link href={href} target="_blank">
      <Image
        width={25}
        height={25}
        quality={80}
        className=" hover:filter hover:contrast-0"
        src={`/images/icons/social/webp/${icon}.webp`}
        alt={alt}
      />
    </Link>
  </li>
);
const TeamSlider = ({ member }) =>
{
  const CustomArrow = ({
    direction,
    currentSlide,
    slideCount,
    slidesToShow,
    onClick,
  }) =>
  {
    const isPrev = direction === "prev";
    const isDisabled = isPrev
      ? currentSlide === 0
      : currentSlide >= slideCount - slidesToShow;

    return (
      <div
        className={`absolute  1024px:px-5 transition-opacity duration-200 z-10 text-primary text-[50px] top-1/2 transform -translate-y-1/2 ${isPrev
            ? " -left-[3%] 768px:-left-3 1366px:left-0  768px:top-[42%]"
            : "-right-[3%]  768px:-left-3 1366px:left-0  768px:top-[58%]"
          } ${isDisabled
            ? "opacity-50 pointer-events-none cursor-not-allowed no-underline"
            : ""
          }`}
      >
        <div
          className={` 768px:w-16 cursor-pointer flex justify-center items-center`}
          onClick={!isDisabled ? onClick : undefined}
          aria-label={isPrev ? "Previous Slide" : "Next Slide"}
        >
          {isPrev ? "❮" : "❯"}
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
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
          fade: true,
          speed: 800,
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
          className="item-container inline-block w-[80%] 1024px:w-full bg-white self-center justify-center items-center align-top"
        >
          <div className="item ml-0 w-full float-left">
            <Image
              className="w-full mx-auto my-0 object-center"
              width={500}
              height={300}
              priority={index < 4}
              quality={80}
              src={member.image}
              alt={`${member.name}, ${member.position}`}
            />
          </div>
          <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden">
            <h4
            
              className="text-[20px] font-semibold text-[#333333] pb-3 text-left font-montserrat"
            >
              {member.name}
            </h4>

            <h5

              className="text-[14px] text-[#808080] font-normal leading-normal text-left mb-[18px] font-prata"
            >
              {member.position}
            </h5>



            <div className="email-info flex justify-items-center px-0 py-[10px]">
              <Image
                width={5}
                height={5}
                className="mail-icon w-[5%] h-auto mr-2 py-[5px]"
                src="/images/icons/mail.png"
                alt="mail"
                aria-hidden="true"
              />
              <Link
                className="text-[14px] text-[#929292] hover:no-underline hover:text-[#c7a652]"
                href={`mailto:${member.email}`}
                aria-label={`Send email to ${member.name}`}
              >
                {member.email}
              </Link>
            </div>
            <div className="social-media pt-[5px]">
              <ul className="list-none flex gap-2">
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

export default TeamSlider;
