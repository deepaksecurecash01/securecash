import React, { useState } from "react";

const Carousel = () => {
  const [currentSlideSection, setCurrentSlideSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imgSrc: "https://www.securecash.com.au/images/icons/australia.png",
      title: "Australia Wide",
      description:
        "SecureCash is a one stop cash in transit agency that will manage your banking &amp; change order services no matter where you are located in Australia.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/edocket.png",
      title: "eDocket System",
      description:
        "Using our industry leading software technology unique to only SecureCash, we are able to track &amp; trace your deposit with a click of a button.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/flexible.png",
      title: "Total Flexibility",
      description:
        "You can have your banking collected on any day or days you choose, &amp; you are free to cancel or change the days your banking is collected whenever you want.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/banks.png",
      title: "All Major Banks",
      description:
        "We work with most major banks in Australia including the NAB, Commonwealth Bank, ANZ, Westpac &amp; some local banks such as BankSA &amp; Bendigo Bank.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/contracts.png",
      title: "No Lock-in Contracts",
      description:
        "We do not lock you into lengthy contracts, you are free to try our service &amp; if you find that it is not suitable for your organisation, then you can cancel at anytime with notice.",
    },
    {
      imgSrc: "https://www.securecash.com.au/images/icons/olservices.png",
      title: "Online Services",
      description:
        "Customers are able to book extra pickups, cancel a scheduled pickup, submit change orders, &amp; even verify a banking courier’s identification all online.",
    },
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = (prev - 1 + slides.length) % slides.length;
      console.log(newSlide); // Logs the correct new slide value
      return newSlide;
    });
  };

  const toggleSlide = () => {
    setCurrentSlideSection((prev) => (prev === 0 ? 1 : 0));
    console.log(currentSlide);
  };

  return (
    <div className="carousel">
      <div className="slides h-[190px] relative   768px:h-[220px] select-none block  992px:h-[300px]  1200px:h-[310px]">
        <div className="slide-container block ">
          <div
            className={`slide-image h-full  992px:block 992px:space-x-2  w-full top-0   ${
              currentSlideSection === 0
                ? " opacity-100 transform scale-100 transition-opacity duration-1000 ease-in-out"
                : " 992px:opacity-0 transition-all duration-[700ms] ease-in-out "
            }`}
          >
            {slides.slice(0, 3).map((slide, index) => (
              <div
                key={index}
                className={`service-item inline-block w-full text-center mx-auto 992px:opacity-100 absolute 992px:visible  ${
                  currentSlide === index
                    ? " visible opacity-100"
                    : " opacity-0 invisible"
                }  992px:relative transition-opacity duration-1000 ease-in-out  992px:align-top  992px:w-[30%]  992px:float-left text-white `}
              >
                <div className="service-img">
                  <img className="h-[60px] mx-auto" src={slide.imgSrc} alt="" />
                </div>
                <div className="service-info text-white clear-both">
                  <h3 className="text-heading leading-[1.6em] text-[16px] font-montserrat font-bold my-[1rem]">
                    {slide.title}
                  </h3>
                  <p className=" w-[70%] 992px:w-[95%] text-center text-[14px] leading-[1.6em]  992px:leading-[1.6em]  1024px:leading-[2em] mx-auto whitespace-normal  font-montserrat font-light 992px:text-center">
                    {slide.description}
                  </p>
                </div>
                <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                  <button
                    className="prev-slide   absolute transition-opacity duration-200 cursor-pointer left-0 hover:opacity-100"
                    onClick={goToPrevSlide}
                  >
                    <span>‹</span>
                  </button>
                  <button
                    className="next-slide    absolute transition-opacity duration-200 cursor-pointer   right-0 hover:opacity-100"
                    onClick={goToNextSlide}
                  >
                    <span>›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-controls hidden 992px:block absolute -top-1/2 left-0 right-0 z-[999] text-[100px] leading-[600px] text-white">
            <label
              htmlFor="img-1"
              className={`prev-slide  absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12   right-0 top-[-90px] hover:opacity-100 ${
                currentSlideSection === 0 ? "block" : "hidden"
              }  `}
              onClick={toggleSlide}
            >
              <span>‹</span>
            </label>
            <label
              htmlFor="img-1"
              className={`next-slide    right-0 hover:opacity-100 absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12 ${
                currentSlideSection === 0 ? "block" : "hidden"
              } `}
              onClick={toggleSlide}
            >
              <span>›</span>
            </label>
          </div>
        </div>

        <div className="slide-container block">
          <div
            className={`slide-image 992px:block 992px:space-x-2  w-full top-0 absolute ${
              currentSlideSection === 1
                ? " opacity-100 transform scale-100 transition-opacity duration-1000 ease-in-out"
                : " 992px:opacity-0 transition-all duration-[700ms] ease-in-out"
            }`}
          >
            {slides.slice(3, 6).map((slide, index) => (
              <div
                key={index + 3}
                className={`service-item inline-block w-full text-center mx-auto 992px:opacity-100 absolute 992px:visible  ${
                  currentSlide === index + 3
                    ? " visible opacity-100"
                    : " opacity-0 invisible"
                }  992px:relative transition-opacity duration-1000 ease-in-out  992px:align-top  992px:w-[30%]  992px:float-left text-white `}
              >
                <div className="service-img">
                  <img className="h-[60px] mx-auto" src={slide.imgSrc} alt="" />
                </div>
                <div className="service-info text-white clear-both">
                  <h3 className="text-heading leading-[1.6em] text-[16px] font-montserrat font-bold my-[1rem]">
                    {slide.title}
                  </h3>
                  <p className=" w-[70%] 992px:w-[95%] text-center text-[14px] leading-[1.6em]  992px:leading-[1.6em]  1024px:leading-[2em] mx-auto whitespace-normal  font-montserrat font-light 992px:text-center">
                    {slide.description}
                  </p>
                </div>
                <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                  <button
                    className="prev-slide   absolute transition-opacity duration-200 cursor-pointer left-0 hover:opacity-100"
                    onClick={goToPrevSlide}
                  >
                    <span>‹</span>
                  </button>
                  <button
                    className="next-slide    absolute transition-opacity duration-200 cursor-pointer   right-0 hover:opacity-100"
                    onClick={goToNextSlide}
                  >
                    <span>›</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-controls hidden 992px:block absolute -top-1/2 left-0 right-0 z-[999] text-[100px] leading-[600px] text-white">
            <label
              htmlFor="img-1"
              className={`prev-slide  absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12   right-0 top-[-90px] hover:opacity-100 ${
                currentSlideSection === 1 ? "block" : "hidden"
              }  `}
              onClick={toggleSlide}
            >
              <span>‹</span>
            </label>
            <label
              htmlFor="img-1"
              className={`next-slide    right-0 hover:opacity-100 absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12 ${
                currentSlideSection === 1 ? "block" : "hidden"
              } `}
              onClick={toggleSlide}
            >
              <span>›</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
