"use client";
import Typography from "@/components/common/Typography";
import React, { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Link from "next/link";


const TESTIMONIALS = [
    "It makes sense for us to use SecureCash for our cash floats, cash pick-up and cash counting needs during the adelaide festival. It allowed us to concentrate on our core business in the midst of the Festival.",
    "The service is extremely discreet, punctual, safe and above all courteous. We wish we had switched to SecureCash years ago, and I would have no hesitation in recommending their services to anyone looking for an efficient banking solution.",
    "Having used SecureCash at a number of sites for banking collections, I would thoroughly recommend them. The other advantage is that we gain our working days back by not travelling to and from the bank or waiting in queues - that alone is worth it.",
    "I am very happy with the service provided by SecureCash; I find the staff to be helpful and courteous at all times and I would highly recommend their organisation to anyone who is looking for a good cash in transit service.",
    "We are very happy with the service, it's always on time and the friendly staff go out of their way to give great service. SecureCash saves our company a lot of time by going to the bank for us, and they even take our cheques to the bank to deposit them for us.",
    "Councils don't normally give testimonials, however I would like to advise that I have always found SecureCash staff to be very accommodating and professional and that our current arrangement is working well.",
    "We were unsure we even needed this type of service, as we did our own banking. We used the code J9#FREEMONEY, and we received 2 weeks free, just to try out the service and see if it was for us. We never looked back and 6 years on we are still with SecureCash",
    "We are extremely satisfied with our change to SecureCash. They are always willing to oblige, and using this service ensures safe banking and saves us a lot of valuable time. We would recommend them to any prospective client.",
];

const TeamSlider = ({ TESTIMONIALS }) =>
{
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable default arrows since we're using custom ones
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    const goToPrevSlide = () =>
    {
        sliderRef.current?.slickPrev();
    };

    const goToNextSlide = () =>
    {
        sliderRef.current?.slickNext();
    };

    const isFirstSlide = currentSlide === 0;
    const isLastSlide = currentSlide === TESTIMONIALS.length - 1;

    return (
        <>
            <Slider ref={sliderRef} {...settings}>
                {TESTIMONIALS.map((testimonial, index) => (
                    <div className="h-[330px] 414px:h-[260px] 480:h-[220px] 1024px:h-[176px] relative overflow-hidden" key={index}>
                        <div className="contact-testimonial--carousel__items h-full flex justify-center items-center">
                            <div className="carousel-item">
                                <div className="excerpt my-[24px] mx-auto text-center w-[65%] 480px:w-1/2">
                                    <Typography
                                        as="p"
                                        fontFamily="font-montserrat"
                                        className="text-center font-light leading-[29px] "
                                    >
                                        {testimonial}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="contact-testimonial--carousel-control h-[80px] flex justify-center items-center">
                <div
                    className={`${isFirstSlide ? 'opacity-30' : 'cursor-pointer'}`}
                    onClick={!isFirstSlide ? goToPrevSlide : undefined}
                >
                    <FaChevronLeft size={36} />
                </div>
                <div className="carousel-control-divider h-full w-[2px] bg-[#b9984b] mx-[20px] p-0 rounded-none">&nbsp;</div>
                <div
                    className={`${isLastSlide ? 'opacity-30' : 'cursor-pointer'}`}
                    onClick={!isLastSlide ? goToNextSlide : undefined}
                >
                    <FaChevronRight size={36} />
                </div>
            </div>
        </>
    );
};

// components/TeamContent.js
const TeamContent = () =>
{
    return (
        <div
            className=" inline-block w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 mt-0  992px:px-2 992px:pt-[130px] bg-contact-bg bg-no-repeat bg-cover bg-center"
        >
            <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
                <Typography
                    as="h2"
                    fontFamily="font-montserrat"
                    className=" text-center font-bold text-[32px] leading-[64px] mt-[18px] mb-[24px] mx-auto montSemiBold 414px:leading-[1.4em] "
                >
                    Testimonials
                </Typography>


                <hr
                    className="mb-6 mt-4 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary"
                />
                <Typography
                    as="p"
                    fontFamily="font-montserrat"
                    className="text-center font-light leading-[32px]"
                >
                    Don&apos;t just take our word for it. <br />Hear what our customers have to say about our services!
                </Typography>
                <div className=" relative select-none block w-full float-left mb-[100px]">
                    <div
                        className=" 768px:w-[90%] mx-auto  1024px:w-full "
                        aria-label="Team Members"
                    >
                        <TeamSlider TESTIMONIALS={TESTIMONIALS} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamContent;