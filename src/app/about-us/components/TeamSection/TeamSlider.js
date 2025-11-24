'use client';
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const SocialLink = ({ href, icon, alt }) => (
    <li className="float-left pr-[5px]">
        <Link href={href}>
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
    const sliderRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handlePrev = useCallback(() =>
    {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() =>
    {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const CustomArrow = ({ direction, onClick, disabled }) =>
    {
        const isPrev = direction === "prev";
        return (
            <div
                className={`absolute 1024px:px-5 transition-opacity duration-200 z-10 text-primary text-[66px] top-1/2 transform -translate-y-1/2 ${isPrev
                    ? " -left-[3%] 768px:left-0 768px:top-[42%]"
                    : "-right-[3%] 768px:left-0 768px:top-[58%]"
                    } ${disabled
                        ? "opacity-50 pointer-events-none cursor-not-allowed no-underline"
                        : ""
                    }`}
            >
                <div
                    className={`768px:w-16 cursor-pointer flex justify-center items-center`}
                    onClick={!disabled ? onClick : undefined}
                    aria-label={isPrev ? "Previous Slide" : "Next Slide"}
                >
                    {isPrev ? "❮" : "❯"}
                </div>
            </div>
        );
    };

    return (
        <div className="relative">
            {/* FIX APPLIED:
                1. Removed 'display: flex' and 'justify-content: center' so floats inside your card work again.
                2. Kept only the width calculation to stop the layout shift (glitch).
                3. Added 'margin: 0 auto' to your wrapper to center the card within the slide.
            */}
            <style>{`
                .team-slider-main .swiper-slide {
                    /* Restore block behavior so floats work */
                    display: block; 
                    box-sizing: border-box;
                }
                
                /* Center the content inside the slide without using flex */
                .team-slider-main .swiper-slide .team-item-wrapper {
                     margin-left: auto;
                     margin-right: auto;
                }

                /* Pre-calculate width to stop glitch */
                @media (min-width: 1140px) {
                    .team-slider-main .swiper-slide {
                        width: 50%;
                    }
                }
            `}</style>

            <CustomArrow
                direction="prev"
                onClick={handlePrev}
                disabled={isBeginning}
            />
            <CustomArrow
                direction="next"
                onClick={handleNext}
                disabled={isEnd}
            />

            <div className=" w-[85%] mx-auto  1024px:w-[93%] 768px:ml-auto 768px:mr-0 768px:w-[90%]">
                <Swiper
                    ref={sliderRef}
                    modules={[Navigation, EffectFade]}
                    speed={600}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={false}
                    className="team-slider-main" // Added class for style targeting
                    onSlideChange={(swiper) =>
                    {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    onInit={(swiper) =>
                    {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            effect: 'fade',
                            fadeEffect: { crossFade: true },
                            speed: 800,
                            allowTouchMove: true,
                        },
                        767: {
                            slidesPerView: 1,
                            effect: 'slide',
                            speed: 600,
                        },
                        992: {
                            slidesPerView: 1,
                            effect: 'slide',
                        },
                        1140: {
                            slidesPerView: 2,
                            effect: 'slide',
                        },
                        1366: {
                            slidesPerView: 2,
                            effect: 'slide',
                        }
                    }}
                >
                    {member?.map((member, index) => (
                        <SwiperSlide key={index}>
                            <div className="team-item-wrapper 1200px:mr-1 relative h-[calc(100%-50px)] 768px:h-[672px] 1024px:h-[824px] 1070px:h-[768px] 1200px:h-[710px] 1280px:h-[672px] max-w-[600px] 1024px:mr-[30px]">
                                <div
                                    className=" relative w-full 768px:w-[300px] 1024px:w-[250px] 1100px:w-[278px] 1200px:w-[300px] m-0 z-[9999] rounded-bl-[6px] rounded-br-[6px] inline-block 1024px:m-[6px] align-top bg-white self-center justify-center items-center"
                                >
                                    <div className="item ml-0 w-full float-left">
                                        <Image
                                            className="w-full mx-auto my-0 object-center"
                                            width={500}
                                            height={300}
                                            priority={true}
                                            loading="eager" // Added eager loading to assist with LCP
                                            quality={80}
                                            src={member.image}
                                            alt={`${member.name}, ${member.position}`}
                                        />
                                    </div>
                                    <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden bg-[#b9984b] rounded-bl-[6px] rounded-br-[6px]">
                                        <h4 className="text-white font-semibold text-left text-[22px] pb-3 font-montserrat">
                                            {member.name}
                                        </h4>

                                        <h5 className="text-white font-extrabold text-left text-[16px] leading-normal pb-3 font-prata">
                                            {member.position}
                                        </h5>

                                        <div className="email-info flex justify-items-center px-0 py-[10px]">
                                            <Image
                                                width={5}
                                                height={5}
                                                className="mail-icon w-[5%] h-auto mr-2 py-[5px] filter brightness-[10]"
                                                src="/images/icons/mail.png"
                                                alt="mail"
                                                aria-hidden="true"
                                            />
                                            <Link
                                                className="text-[14px] text-white hover:no-underline hover:text-[#c7a652]"
                                                href={`mailto:${member.email}`}
                                                aria-label={`Send email to ${member.name}`}
                                            >
                                                {member.email}
                                            </Link>
                                        </div>
                                        <div className="social-media pt-[5px]">
                                            <ul className="list-none flex gap-2 filter brightness-[10]">
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
                                <div className="team-item-about-content h-[710px] 414px:h-[600px] 480px:h-[500px] 768px:border-x-[4px] border-[#b9984b] 768px:absolute 768px:top-[50px] right-0 768px:w-[calc(100%-50px)] 768px:h-[calc(100%-50px)] bg-white 768px:rounded-[8px] flex justify-center ">
                                    <div className="wrapper max-h-full 768px:before:content-[''] 768px:before:h-[376px] 1024px:before:h-[320px] 1100px:before:h-[376px] 768px:before:w-[242px] 1024px:before:w-[200px] 1100px:before:w-[224px] 1200px:before:w-[252px] before:inline-block before:float-left before:mr-[32px] before:mb-3.5">
                                        <p className="block my-5 mx-4 pr-0 text-left text-[15px] leading-[2rem] 768px:my-[38px] 768px:mx-8 414px:pr-0 font-light font-montserrat">
                                            {member.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TeamSlider;