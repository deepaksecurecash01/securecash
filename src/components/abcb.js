import React from "react";

const Carousel = () => {
  return (
    <div className="carousel">
      <div className="slides h-[190px]  768px:h-[220px] select-none block relative  992px:h-[340px]  1024px:h-[385px]  1200px:h-[310px]">
        <input
          className="hidden"
          type="radio"
          name="radio-buttons"
          id="img-1"
          defaultChecked="checked"
        />
        <div className="slide-container block">
          <div className="slide-image block absolute w-full top-0 opacity-0 transition-all duration-[700ms] ease-in-out">
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-1"
              defaultChecked="checked"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/australia.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]  font-montserrat font-bold">
                  Australia Wide
                </h3>
                <p className="text-paragraph pr-0 w-[70%] text-center text-[14px] leading-[1.5em]  992px:pr-[30px]  992px:leading-[1.6em]  1024px:leading-[2em]  992px:text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light  992px:text-[12px]">
                  SecureCash is a one stop cash in transit agency that will
                  manage your banking &amp; change order services no matter
                  where you are located in Australia.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-6"
                  className="prev-slide   absolute transition-opacity duration-200 cursor-pointer right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>{" "}
                </label>{" "}
                <label
                  htmlFor="mobimg-2"
                  className="next-slide    absolute transition-opacity duration-200 cursor-pointer   right-0 hover:opacity-100"
                >
                  {" "}
                  <span>›</span>
                </label>
              </div>
            </div>
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-2"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/edocket.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]   font-montserrat font-bold">
                  eDocket System
                </h3>
                <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                  Using our industry leading software technology unique to only
                  SecureCash, we are able to track &amp; trace your deposit with
                  a click of a button.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-1"
                  className="prev-slide absolute transition-opacity duration-200 cursor-pointer  right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>
                </label>{" "}
                <label
                  htmlFor="mobimg-3"
                  className="next-slide     absolute transition-opacity duration-200 cursor-pointer  right-0 hover:opacity-100"
                >
                  <span>›</span>
                </label>
              </div>
            </div>
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-3"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/flexible.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]  font-montserrat font-bold">
                  Total Flexibility
                </h3>
                <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                  You can have your banking collected on any day or days you
                  choose, &amp; you are free to cancel or change the days your
                  banking is collected when ever you want.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-2"
                  className="prev-slide absolute transition-opacity duration-200 cursor-pointer  right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>
                </label>{" "}
                <label
                  htmlFor="mobimg-4"
                  className="next-slide     absolute transition-opacity duration-200 cursor-pointer  right-0 hover:opacity-100"
                >
                  {" "}
                  <span>›</span>
                </label>
              </div>
            </div>
          </div>
          <div className="carousel-controls hidden 992px:block absolute top-[-94px] left-0 right-0 z-[999] text-[100px] leading-[600px] text-white">
            <label
              htmlFor="img-2"
              className="prev-slide   right-0 top-[-90px] hover:opacity-100 "
            >
              <span>‹</span>
            </label>{" "}
            <label
              htmlFor="img-2"
              className="next-slide    right-0 hover:opacity-100"
            >
              <span>›</span>{" "}
            </label>
          </div>
        </div>
        <input
          className="hidden"
          type="radio"
          name="radio-buttons"
          id="img-2"
        />
        <div className="slide-container block">
          <div className="slide-image block absolute w-full top-0 opacity-0 transition-all duration-[700ms] ease-in-out">
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-4"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/banks.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]  font-montserrat font-bold">
                  All Major Banks
                </h3>
                <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                  We work with most major banks in Australia including the NAB,
                  Commonwealth Bank, ANZ, Westpac &amp; some local banks such as
                  BankSA &amp; Bendigo Bank.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-3"
                  className="prev-slide  absolute transition-opacity duration-200 cursor-pointer right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>{" "}
                </label>{" "}
                <label
                  htmlFor="mobimg-5"
                  className="next-slide     absolute transition-opacity duration-200 cursor-pointer  right-0 hover:opacity-100"
                >
                  <span>›</span>{" "}
                </label>
              </div>
            </div>
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-5"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/contracts.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]  font-montserrat font-bold">
                  No Lock-in Contracts
                </h3>
                <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                  We do not lock you into lengthy con tracts, you are free to
                  try our service &amp; if you find that it is not suitable for
                  your organisation then you can cancel at anytime with notice.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-4"
                  className="prev-slide absolute transition-opacity duration-200 cursor-pointer  right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>{" "}
                </label>{" "}
                <label
                  htmlFor="mobimg-6"
                  className="next-slide    absolute transition-opacity duration-200 cursor-pointer   right-0 hover:opacity-100"
                >
                  <span>›</span>{" "}
                </label>
              </div>
            </div>
            <input
              className="hidden"
              type="radio"
              name="mobile-radio-buttons"
              id="mobimg-6"
            />
            <div className="service-item ">
              <div className="service-img">
                <img
                  className="h-[60px]"
                  src="https://www.securecash.com.au/images/icons/olservices.png"
                  alt=""
                />
              </div>
              <div className="service-info text-white clear-both">
                <h3 className="text-heading leading-[1.6em] pt-[20px] text-[16px] pb-[1rem]  font-montserrat font-bold">
                  Online Services
                  <span className="font-montserrat font-light text-[12px]">
                    &nbsp;&nbsp;(
                    <a href="https://service.securecash.com.au/">Login Here</a>)
                  </span>
                </h3>
                <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                  Customers are able to book extra pickups, cancel a schedule
                  pickup, submit change orders, &amp; even verify a banking
                  couriers identification all online.
                </p>
              </div>
              <div className="serviceitem-controls block relative top-[-200px] z-[999] text-[100px] text-white 992px:hidden">
                <label
                  htmlFor="mobimg-5"
                  className="prev-slide absolute transition-opacity duration-200 cursor-pointer  right-0 top-[-90px] hover:opacity-100"
                >
                  <span>‹</span>{" "}
                </label>{" "}
                <label
                  htmlFor="mobimg-1"
                  className="next-slide    absolute transition-opacity duration-200 cursor-pointer   right-0 hover:opacity-100"
                >
                  <span>›</span>{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="carousel-controls absolute top-[-94px] left-0 right-0 z-[999] text-[100px] leading-[600px] text-white">
            <label
              htmlFor="img-1"
              className="prev-slide   right-0 top-[-90px] hover:opacity-100"
            >
              {" "}
              <span>‹</span>
            </label>{" "}
            <label
              htmlFor="img-1"
              className="next-slide    right-0 hover:opacity-100"
            >
              {" "}
              <span>›</span>{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
