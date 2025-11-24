"use client";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/a11y";
import Link from "next/link";
import Image from "next/image";

const SocialLink = ({ href, icon, alt, memberName }) => (
  <li className="float-left pr-[5px]">
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${memberName}'s ${alt} profile`}
    >
      <Image
        width={25}
        height={25}
        quality={80}
        className="hover:filter hover:contrast-0"
        src={`/images/icons/social/webp/${icon}.webp`}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </Link>
  </li>
);

const TeamSliderSwiper = ({ member }) =>
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

  return (
    <div className="team-slider-wrapper">
      {/* PIXEL PERFECT FIX:
          1. Override global .item-container to force width: 100% and display: flex.
          2. Force slides to 'stretch' so they are all equal height immediately.
          3. Pre-calculate widths to avoid horizontal flicker.
       */}
      <style>{`
        /* 1. Fix the Global CSS conflict inside this slider */
        .team-swiper .swiper-slide .item-container {
          display: flex !important;       /* Override inline-block */
          flex-direction: column;         /* Stack content */
          width: 100% !important;         /* Override 329px fixed width */
          height: 100% !important;        /* Force full height */
          box-sizing: border-box;
        }

        /* 2. Ensure the slide itself is a flex container that stretches children */
        .team-swiper .swiper-slide {
          display: flex;
          height: auto;
        }

        /* 3. Pre-calculate widths (Same as before) */
        @media (min-width: 992px) {
          .team-swiper .swiper-slide {
            width: calc((100% - 16px) / 2);
            margin-right: 16px; 
          }
        }
        @media (min-width: 1140px) {
          .team-swiper .swiper-slide {
            width: calc((100% - 40px) / 3);
            margin-right: 20px;
          }
        }
        @media (min-width: 1366px) {
          .team-swiper .swiper-slide {
            width: calc((100% - 36px) / 4);
            margin-right: 12px;
          }
        }
      `}</style>

      {/* Custom Previous Arrow */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        disabled={isBeginning}
        aria-label="Previous team member"
        type="button"
        className="team-arrow team-arrow-prev focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div>❮</div>
      </button>

      {/* Custom Next Arrow */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        disabled={isEnd}
        aria-label="Next team member"
        type="button"
        className="team-arrow team-arrow-next focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div>❯</div>
      </button>

      <Swiper
        modules={[Navigation, EffectFade, A11y]}
        spaceBetween={12}
        speed={800}
        loop={false}
        slidesPerView={4}
        slidesPerGroup={1}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        watchSlidesProgress={true}
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous team member",
          nextSlideMessage: "Next team member",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: "fade",
            fadeEffect: {
              crossFade: true,
            },
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: "fade",
            fadeEffect: {
              crossFade: true,
            },
            spaceBetween: 0,
          },
          992: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            effect: "slide",
            spaceBetween: 16,
          },
          1140: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            effect: "slide",
            spaceBetween: 20,
          },
          1366: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            effect: "slide",
            spaceBetween: 12,
          },
        }}
        className="team-swiper"
      >
        {member.map((member, index) => (
          <SwiperSlide key={index}>
            <article className="item-container">
              <div className="item ml-0 w-full float-left">
                <Image
                  className="w-full mx-auto my-0 object-center"
                  width={500}
                  height={300}
                  loading="lazy"
                  quality={75}
                  src={member.image}
                  alt={`${member.name}, ${member.position}`}
                />
              </div>
              <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden">
                <h3 className="text-[20px] font-semibold text-[#333333] pb-3 text-left font-montserrat">
                  {member.name}
                </h3>

                <p className="text-[14px] text-[#808080] font-normal leading-normal text-left mb-[18px] font-prata">
                  {member.position}
                </p>

                <div className="email-info flex justify-items-center px-0 py-[10px]">
                  <Image
                    width={5}
                    height={5}
                    className="mail-icon w-[5%] h-auto mr-2 py-[5px]"
                    src="/images/icons/mail.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <Link
                    className="text-[14px] text-[#929292] hover:no-underline hover:text-[#c7a652]"
                    href={`mailto:${member.email}`}
                    aria-label={`Send email to ${member.name}`}
                  >
                    {member.email}
                  </Link>
                </div>
                <nav className="social-media pt-[5px]" aria-label={`${member.name}'s social media links`}>
                  <ul className="list-none flex gap-2 m-0 p-0">
                    <SocialLink
                      href={member.socialLinks?.facebook}
                      icon="fb"
                      alt="Facebook"
                      memberName={member.name}
                    />
                    <SocialLink
                      href={member.socialLinks?.twitter}
                      icon="twitter"
                      alt="Twitter"
                      memberName={member.name}
                    />
                    <SocialLink
                      href={member.socialLinks?.youtube}
                      icon="yt"
                      alt="YouTube"
                      memberName={member.name}
                    />
                    <SocialLink
                      href={member.socialLinks?.linkedin}
                      icon="linkedin"
                      alt="LinkedIn"
                      memberName={member.name}
                    />
                  </ul>
                </nav>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSliderSwiper;