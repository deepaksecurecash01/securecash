'use client';
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";



const SocialLink = ({ href, icon, alt }) => (
    <li className="float-left pr-[5px]">
        <Link href={href}>
            <Image
                width={25}
                height={25}
                quality={80}
                className=" hover:filter hover:contrast-0"
                src={`https://www.securecash.com.au/images/icons/social/webp/${icon}.webp`}
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
                className={`absolute  1024px:px-5 transition-opacity duration-200 z-10 text-primary text-[66px] top-1/2 transform -translate-y-1/2 ${isPrev
                    ? " -left-[3%] 768px:left-0  768px:top-[42%]"
                    : "-right-[3%]  768px:left-0  768px:top-[58%]"
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
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="next" slidesToShow={2} />,
        prevArrow: <CustomArrow direction="prev" slidesToShow={2} />,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <CustomArrow direction="next" slidesToShow={2} />,
                    prevArrow: <CustomArrow direction="prev" slidesToShow={2} />,
                },
            },
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <CustomArrow direction="next" slidesToShow={2} />,
                    prevArrow: <CustomArrow direction="prev" slidesToShow={2} />,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: <CustomArrow direction="next" slidesToShow={1} />,
                    prevArrow: <CustomArrow direction="prev" slidesToShow={1} />,
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
            {member?.map((member, index) => (
                <div className="team-item-wrapper relative h-[calc(100%-50px)] 768px:h-[672px] 1024px:h-[824px] 1070px:h-[768px]  1200px:h-[710px]  1280px:h-[672px] max-w-[600px]  1024px:mr-[62px]" key={index}>
                    <div
                        className="item-container relative w-full 768px:w-[300px]  1024px:w-[250px] shadow-md 1100px:w-[278px] 1200px:w-[300px] m-0 z-[9999] rounded-bl-[6px] rounded-br-[6px] inline-block  1024px:m-[6px] align-top bg-white self-center justify-center items-center"
                    >
                        <div className="item ml-0 w-full float-left">
                            <Image
                                className="w-full mx-auto my-0 object-center"
                                width={500}
                                height={300}
                                priority={true}
                                quality={80}
                                src={member.image}
                                alt={`${member.name}, ${member.position}`}
                            />
                        </div>
                        <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden bg-[#b9984b]  rounded-bl-[6px] rounded-br-[6px]">
                            <h4
                              
                                className="text-white font-semibold text-left text-[22px] pb-3 font-montserrat"
                            >
                                {member.name}
                            </h4>

                            <h5
                               
                                className="text-white font-extrabold text-left text-[16px] leading-normal pb-3 font-prata"
                            >
                                {member.position}
                            </h5>

                            <div className="email-info flex justify-items-center px-0 py-[10px]">
                                <Image
                                    width={5}
                                    height={5}
                                    className="mail-icon w-[5%] h-auto mr-2 py-[5px] filter brightness-[10]"
                                    src="https://www.securecash.com.au/images/icons/mail.png"
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
                    <div className="team-item-about-content h-[710px]  414px:h-[600px] 480px:h-[500px]  768px:border-x-[4px] border-[#b9984b]  768px:absolute  768px:top-[50px] right-0  768px:w-[calc(100%-50px)]  768px:h-[calc(100%-50px)] bg-white  768px:rounded-[8px] flex justify-center ">
                        <div className="wrapper max-h-full  768px:before:content-[''] 768px:before:h-[376px] 1024px:before:h-[320px]  1100px:before:h-[376px] 768px:before:w-[242px]  1024px:before:w-[200px]  1100px:before:w-[224px] 1200px:before:w-[252px] before:inline-block before:float-left before:mr-[32px] before:mb-3.5">
                            <p
                               
                                className="block my-5 mx-4 pr-0 text-left text-[15px] leading-[2rem] 768px:my-[38px] 768px:mx-8 414px:pr-0 font-light font-montserrat"
                            >
                                {member.description}
                            </p>

                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default TeamSlider;
