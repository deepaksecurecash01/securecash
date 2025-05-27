"use client";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Image from "next/image";

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
      {TESTIMONIALS.map((testimonial, index) => (
        <div className="contact-testimonial--carousel-container">
          <div className="contact-testimonial--carousel__items">
            <div className="carousel-item">
              <div className="excerpt">
                <p>{testimonial}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

// components/TeamContent.js
const TeamContent = () =>
{
  return (
    <div
      id="contact-testimonial"
      className=" inline-block w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 414px:py mt-0 768px:p-[50px] 992px:mt-[100px] 992px:px-2 992px:pt-[100px]"
    >
      <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
        <Typography
          as="h2"
          fontFamily="font-montserrat"
          className=" text-center font-bold text-[32px] leading-[64px] mt-[18px] mb-[24px] mx-auto montSemiBold 414px:leading-[1.4em] "
        >
          Testimonials
        </Typography>


        <Divider
          color="#c7a652"
          alignment="center"
          margin="mb-10 mt-4"
        />

        <div className="members-slider relative select-none block w-full float-left mb-[100px]">
          <div
            className="team-slider w-[90%] mx-auto  1024px:w-full "
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
