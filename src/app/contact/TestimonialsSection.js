"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Update state when slide changes
    const handleSlideChange = (swiper) =>
    {
        setActiveIndex(swiper.activeIndex);
    };

    const goToPrevSlide = useCallback(() =>
    {
        swiperInstance?.slidePrev();
    }, [swiperInstance]);

    const goToNextSlide = useCallback(() =>
    {
        swiperInstance?.slideNext();
    }, [swiperInstance]);

    const isFirstSlide = activeIndex === 0;
    const isLastSlide = activeIndex === TESTIMONIALS.length - 1;

    return (
        <>
            <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                speed={500}
                loop={false} // Matches original "infinite: false"
                onSwiper={setSwiperInstance}
                onSlideChange={handleSlideChange}
                className="w-full"
            >
                {TESTIMONIALS.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        {/* Kept exact styling structure. 
                           The height classes allow the container to reserve space,
                           and the inner flexbox centers the text vertically.
                        */}
                        <div className="h-[330px] 414px:h-[260px] 480:h-[220px] 1024px:h-[176px] relative overflow-hidden">
                            <div className="contact-testimonial--carousel__items h-full flex justify-center items-center">
                                <div className="carousel-item">
                                    <div className="excerpt my-[24px] mx-auto text-center w-[65%] 480px:w-1/2">
                                        <p className="text-center font-light leading-[29px] font-montserrat">
                                            {testimonial}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* External Controls - Kept exact styling */}
            <div className="contact-testimonial--carousel-control h-[80px] flex justify-center items-center">
                <div
                    className={`${isFirstSlide ? "opacity-30" : "cursor-pointer"}`}
                    onClick={!isFirstSlide ? goToPrevSlide : undefined}
                    role="button"
                    aria-label="Previous Testimonial"
                    aria-disabled={isFirstSlide}
                >
                    <FaChevronLeft size={36} />
                </div>
                <div className="carousel-control-divider h-full w-[2px] bg-[#b9984b] mx-[20px] p-0 rounded-none">
                    &nbsp;
                </div>
                <div
                    className={`${isLastSlide ? "opacity-30" : "cursor-pointer"}`}
                    onClick={!isLastSlide ? goToNextSlide : undefined}
                    role="button"
                    aria-label="Next Testimonial"
                    aria-disabled={isLastSlide}
                >
                    <FaChevronRight size={36} />
                </div>
            </div>
        </>
    );
};

const TeamContent = () =>
{
    return (
        <div className="inline-block w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 mt-0 992px:px-2 992px:pt-[130px] bg-contact-bg bg-no-repeat bg-cover bg-center">
            <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
                <h2 className="text-center font-bold text-[32px] leading-[64px] mt-[18px] mb-[24px] mx-auto montSemiBold 414px:leading-[1.4em] font-montserrat">
                    Testimonials
                </h2>
                <hr className="mb-6 mt-4 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />
                <p className="text-center font-light leading-[32px] font-montserrat">
                    Don&apos;t just take our word for it. <br />
                    Hear what our customers have to say about our services!
                </p>
                <div className="relative select-none block w-full float-left mb-[100px]">
                    <div
                        className="768px:w-[90%] mx-auto 1024px:w-full"
                        aria-label="Testimonials Slider"
                    >
                        <TeamSlider TESTIMONIALS={TESTIMONIALS} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamContent;