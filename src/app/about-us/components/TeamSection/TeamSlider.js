'use client';
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const SocialLink = ({ href, icon: Icon, alt }) => (
    <li className="float-left pr-[5px]">
        <Link href={href}>
            <Icon
                className="text-[25px] text-white hover:filter hover:contrast-0 border-[0.5px] rounded-full p-1 border-white transition-colors"
                aria-label={alt}
            />
        </Link>
    </li>
);

const CustomArrow = ({ direction, onClick, disabled }) =>
{
    const isPrev = direction === "prev";
    return (
        <div
            className={`absolute 1024px:px-5 transition-opacity duration-200 z-10 text-primary text-[66px] top-1/2 transform -translate-y-1/2 ${isPrev
                ? " -left-[3%] 768px:left-0 min-[912px]:left-16 992px:left-32 1024px:-left-4 1100px:left-0  768px:top-[42%]"
                : "-right-[3%] 768px:left-0 min-[912px]:left-16 992px:left-32 1024px:-left-4 1100px:left-0 768px:top-[58%]"
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

    return (
        <div className="relative">
            <style>{`
                .team-slider-main .swiper-slide {
                    display: block;
                    box-sizing: border-box;
                }
                
                .team-slider-main .swiper-slide .team-item-wrapper {
                    margin-left: auto;
                    margin-right: auto;
                }
              @media (min-width: 1024px) {
         .team-slider-main .swiper-slide {
            width: calc((100% - 16px) / 2);
            margin-right: 16px; 
          }
        }
                @media (min-width: 1366px) {
                    .team-slider-main .swiper-slide {
                        width: 50%;
                                    margin-right: 0px; 

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

            <div className="w-[85%] mx-auto 1024px:w-[93%] 768px:ml-auto 768px:mr-0 768px:w-[90%]">
                <Swiper
                    ref={sliderRef}
                    modules={[Navigation, EffectFade]}
                    speed={600}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={false}
                    className="team-slider-main"
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
                            spaceBetween: 0,

                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                            effect: 'slide',
                        },

                        1366: {
                            slidesPerView: 2,
                            effect: 'slide',
                            spaceBetween: 0,

                        }
                    }}
                >
                    {member?.map((member, index) => (
                        <SwiperSlide key={index}>
                            <div className="team-item-wrapper 1200px:mr-1 relative h-[calc(100%-80px)] 414px:h-[calc(100%-50px)] 768px:h-[672px] 1024px:h-[824px] 1070px:h-[768px] 1200px:h-[710px] 1280px:h-[672px] max-w-[600px] 1024px:mr-[30px]">
                                <div className="relative w-full 768px:w-[300px] 1024px:w-[250px] 1100px:w-[278px] 1200px:w-[300px] m-0 z-[9999] rounded-bl-[6px] rounded-br-[6px] inline-block 1024px:m-[6px] align-top bg-white self-center justify-center items-center">
                                    <div className="item ml-0 w-full float-left">
                                        <Image
                                            className="w-full mx-auto my-0 object-center"
                                            width={500}
                                            height={300}
                                            quality={80}
                                            src={member.image}
                                            alt={`${member.name}, ${member.position}`}
                                        />
                                    </div>

                                    <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden bg-[#b9984b] rounded-bl-[6px] rounded-br-[6px]">
                                        <h2 className="text-white font-semibold text-left text-[22px] pb-3 font-montserrat">
                                            {member.name}
                                        </h2>

                                        <h3 className="text-white font-extrabold text-left text-[16px] leading-normal pb-3 font-prata">
                                            {member.position}
                                        </h3>

                                        <div className="email-info flex items-center px-0 py-[10px]">
                                            <FaEnvelope className="pr-2 text-[24px] relative inline text-white" />

                                            <Link
                                                className="text-[14px] text-white hover:no-underline hover:text-[#c7a652]"
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
                                                    icon={FaFacebookF}
                                                    alt="Facebook"
                                                />
                                                <SocialLink
                                                    href={member.socialLinks?.twitter}
                                                    icon={FaTwitter}
                                                    alt="Twitter"
                                                />
                                                <SocialLink
                                                    href={member.socialLinks?.youtube}
                                                    icon={FaYoutube}
                                                    alt="YouTube"
                                                />
                                                <SocialLink
                                                    href={member.socialLinks?.linkedin}
                                                    icon={FaLinkedinIn}
                                                    alt="LinkedIn"
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="team-item-about-content h-[710px] 414px:h-[600px] 480px:h-[500px] 600px:h-[440px] 768px:border-x-[4px] border-[#b9984b] 768px:absolute 768px:top-[50px] right-0 768px:w-[calc(100%-50px)] 768px:h-[calc(100%-50px)] bg-white 768px:rounded-[8px] flex justify-center">
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