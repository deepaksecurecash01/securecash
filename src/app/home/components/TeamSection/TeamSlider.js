"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";

import Image from "next/image";
import Link from "next/link";

const SocialLink = ({ href, icon, alt }) => (
  <li className="float-left pr-[5px]">
    <Link href={href} target="_blank">
      <Image
        width={25}
        height={25}
        quality={80}
        className="hover:filter hover:contrast-0"
        src={`/images/icons/social/webp/${icon}.webp`}
        alt={alt}
      />
    </Link>
  </li>
);

const TeamSlider = ({ member }) =>
{
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSwiper = useCallback((swiper) =>
  {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleSlideChange = useCallback((swiper) =>
  {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const CustomArrow = ({ direction, isDisabled, onClick }) =>
  {
    const isPrev = direction === "prev";

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
        <button
          className="768px:w-16 cursor-pointer flex justify-center items-center bg-transparent border-0 text-primary text-[50px] p-0"
          onClick={!isDisabled ? onClick : undefined}
          aria-label={isPrev ? "Previous Slide" : "Next Slide"}
          disabled={isDisabled}
          type="button"
        >
          {isPrev ? "❮" : "❯"}
        </button>
      </div>
    );
  };

  return (
    <div className="team-slider-wrapper relative">
      {/* Custom Previous Arrow */}
      <CustomArrow
        direction="prev"
        isDisabled={isBeginning}
        onClick={() => swiperInstance?.slidePrev()}
      />

      {/* Custom Next Arrow */}
      <CustomArrow
        direction="next"
        isDisabled={isEnd}
        onClick={() => swiperInstance?.slideNext()}
      />

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        speed={800}
        slidesPerView={4}
        slidesPerGroup={1}
        watchSlidesProgress={true}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous team member",
          nextSlideMessage: "Next team member",
          firstSlideMessage: "This is the first team member",
          lastSlideMessage: "This is the last team member",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: "fade",
            fadeEffect: {
              crossFade: true,
            },
          },
          767: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: "fade",
            fadeEffect: {
              crossFade: true,
            },
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            effect: "slide",
          },
          992: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            effect: "slide",
          },
          1140: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            effect: "slide",
          },
          1366: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            effect: "slide",
          },
        }}
        className="team-swiper"
      >
        {member.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="item-container inline-block w-[80%] 1024px:w-full bg-white self-center justify-center items-center align-top">
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
                <h4 className="text-[20px] font-semibold text-[#333333] pb-3 text-left font-montserrat">
                  {member.name}
                </h4>

                <h5 className="text-[14px] text-[#808080] font-normal leading-normal text-left mb-[18px] font-prata">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSlider;