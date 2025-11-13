"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";

const Carousel = () =>
{
  const [swiperInstance, setSwiperInstance] = useState(null);

  const slides = [
    {
      imgSrc: "/images/icons/australia.png",
      title: "Australia Wide",
      description:
        "SecureCash is a one stop cash in transit agency that will manage your banking & change order services no matter where you are located in Australia.",
    },
    {
      imgSrc: "/images/icons/edocket.png",
      title: "eDocket System",
      description:
        "Using our industry leading software technology unique to only SecureCash, we are able to track & trace your deposit with a click of a button.",
    },
    {
      imgSrc: "/images/icons/flexible.png",
      title: "Total Flexibility",
      description:
        "You can have your banking collected on any day or days you choose, & you are free to cancel or change the days your banking is collected whenever you want.",
    },
    {
      imgSrc: "/images/icons/banks.png",
      title: "All Major Banks",
      description:
        "We work with most major banks in Australia including the NAB, Commonwealth Bank, ANZ, Westpac & some local banks such as BankSA & Bendigo Bank.",
    },
    {
      imgSrc: "/images/icons/contracts.png",
      title: "No Lock-in Contracts",
      description:
        "We do not lock you into lengthy contracts, you are free to try our service & if you find that it is not suitable for your organisation, then you can cancel at anytime with notice.",
    },
    {
      imgSrc: "/images/icons/olservices.png",
      title: "Online Services",
      description:
        "Customers are able to book extra pickups, cancel a scheduled pickup, submit change orders, & even verify a banking courier's identification all online.",
    },
  ];

  const handleSwiper = useCallback((swiper) =>
  {
    setSwiperInstance(swiper);
  }, []);

  return (
    <div className="relative carousel-wrapper">
      {/* Custom Previous Arrow */}
      <button
        onClick={() => swiperInstance?.slidePrev()}
        className={`  absolute  992px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer z-10 top-1/2  transform -translate-y-1/2 992px:-right-6  992px:top-[38%] hover:opacity-100 text-[50px] text-white `}
        aria-label="Previous slide"
        type="button"
      >
        ❮
      </button>

      {/* Custom Next Arrow */}
      <button
        onClick={() => swiperInstance?.slideNext()}
        className={`  absolute  992px:px-5 opacity-50 transition-opacity duration-200 cursor-pointer top-1/2 z-10 right-0   992px:-right-6 transform -translate-y-1/2  992px:top-[62%] hover:opacity-100 text-[50px] text-white `}
        aria-label="Next slide"
        type="button"
      >
        ❯
      </button>

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        speed={700}
        loop={true}
        slidesPerView={1}
        slidesPerGroup={1}
        onSwiper={handleSwiper}
        watchSlidesProgress={true}
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous service slide",
          nextSlideMessage: "Next service slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          991: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          1200: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          1366: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
          },
        }}
        className="services-carousel"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slick-item inline-block w-full text-center mx-auto opacity-100 visible relative transition-opacity duration-1000 ease-in-out 992px:align-top text-white">
              <div className="service-img">
                <Image
                  width={60}
                  height={60}
                  className="h-[60px] w-auto mx-auto"
                  src={slide.imgSrc}
                  alt={slide.title}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-white text-[16px] leading-[1.6em] text-center font-bold my-[1rem] font-montserrat">
                  {slide.title}
                </h3>
                <p className="text-[14px] leading-[1.6em] text-center font-light mb-0 w-[70%] 992px:w-[95%] 992px:leading-[2em] mx-auto whitespace-normal font-montserrat">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;