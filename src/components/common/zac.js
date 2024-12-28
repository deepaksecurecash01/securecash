"use client";
import React from "react";
import CountUp from "react-countup";

const stats = [
  {
    id: 1,
    value: "2031",
    imgSrc: "https://www.securecash.com.au/images/icons/clients.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/clients.png",
    alt: "Customers",
    description: "Customers",
  },
  {
    id: 2,
    value: "316788",
    imgSrc: "https://www.securecash.com.au/images/icons/services.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/services.png",
    alt: "Services Performed",
    description: "Services Performed",
  },
  {
    id: 3,
    value: "2785877642",
    prefix: true,
    imgSrc: "https://www.securecash.com.au/images/icons/transport.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/transport.png",
    alt: "Cash Moved",
    description: "Cash Moved",
  },
];

const slides = [
  {
    id: "mobimg-1",
    img: "https://www.securecash.com.au/images/icons/australia.png",
    title: "Australia Wide",
    description:
      "SecureCash is a one-stop cash-in-transit agency managing banking & change order services Australia-wide.",
  },
  {
    id: "mobimg-2",
    img: "https://www.securecash.com.au/images/icons/edocket.png",
    title: "eDocket System",
    description:
      "Track & trace deposits using our industry-leading software technology unique to SecureCash.",
  },
  {
    id: "mobimg-3",
    img: "https://www.securecash.com.au/images/icons/flexible.png",
    title: "Total Flexibility",
    description:
      "Choose the days for banking collection and modify them anytime, offering you complete flexibility.",
  },
  {
    id: "mobimg-4",
    img: "https://www.securecash.com.au/images/icons/banks.png",
    title: "All Major Banks",
    description:
      "We work with most major banks in Australia, including NAB, Commonwealth Bank, ANZ, Westpac, and more.",
  },
  {
    id: "mobimg-5",
    img: "https://www.securecash.com.au/images/icons/contracts.png",
    title: "No Lock-in Contracts",
    description:
      "Try our service risk-free without lengthy contracts; cancel anytime with notice if it’s not suitable for your organization.",
  },
  {
    id: "mobimg-6",
    img: "https://www.securecash.com.au/images/icons/olservices.png",
    title: "Online Services",
    description:
      "Manage pickups, cancel schedules, submit orders, and verify couriers online with ease.",
  },
];

const NewBanner = () => {
  function IntroVideo() {
    document.querySelector("div#iframe-container").innerHTML =
      '<iframe class="video-player w-full h-[188px]  320px:h-[280px]  480px:h-[370px] 600px:h-[427px]  768px:h-[576px]" src="https://player.vimeo.com/video/330415813?autoplay=1&title=0&byline=0&portrait=0" frameborder="0" allowfullscreen=""></iframe>';
    document.querySelector("div.video-container picture").style.display =
      "none";
  }
  return (
    <div>
      {/* Mid Banner */}
      <section
        id="banner-mid"
        className="relative bg-banner-mid-mobile-bg pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:bg-banner-mid-bg bg-center bg-cover bg-no-repeat 992px:h-[340px] w-full mx-auto flex flex-col  414px:mt-10 justify-center items-center 768px:mt-[100px]"
      >
        <div className=" bg-black w-full h-full z-0 absolute opacity-50"></div>

        <div
          className="inner w-full max-w-[1366px] mx-auto flex flex-col 768px:flex-row justify-center items-center"
          id="content-counter-wrapper"
        >
          {stats.map(
            ({ id, value, imgSrc, prefix, imgFallback, alt, description }) => (
              <React.Fragment key={id}>
                <div className="mid-row py-[50px] 768px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">
                  <h4 className="banner-mid-header pb-[30px] text-[#c7a652] text-[40px] font-montserrat font-black">
                    <CountUp end={value} prefix={prefix && "$"} duration={3} />
                  </h4>
                  <img
                    src={imgSrc}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = imgFallback;
                    }}
                    className="h-[60px] pb-[10px] mx-auto"
                    alt={alt}
                  />
                  <p className="text-white text-[16px] mb-0 pb-0">
                    {description}
                  </p>
                </div>
                {id < stats.length && (
                  <div className="mid-row-divider h-0.5 w-[150px] 768px:h-[100px] 768px:w-0.5 bg-white z-10"></div>
                )}
              </React.Fragment>
            )
          )}
        </div>
      </section>

      {/* Middle Content */}
      <section
        id="content-middle"
        className="bg-[#1a1a1a] min-h-[614px] 414px:min-h-[556px] 480px:min-h-[540px] pl-0 flex p-0 pt-0  992px:inline-block w-full mx-auto"
      >
        <div className="inner w-full max-w-[1366px] py-[40px] flex flex-col 768px:flex-row mx-auto  768px:py-[100px]  justify-between content-middle-wrapper">
          <div className="left-row-content-middle w-full text-center pr-0  768px:pr-[40px] 1024px:pr-0 [flex:2] text-white 992px:w-[35%]">
            <div className="service-container p-4 pt-0 leading-[2em] m-0 text-[16px] text-white">
              <hr className="h-[4px] w-[100px] mx-auto my-[30px] bg-white rounded-[5px] border-0 1024px:mx-0 1024px:text-left text-center mb-6 1024px:mt-0 mt-0" />
              <h3
                className="text-[24px] leading-6  414px:text-[28px]  414px:leading-[1em] font-prata font-normal  1024px:text-[20px]   1024px:leading-[24px] text-center my-[8px_0_24px_0] w-[90%] mb-6  mx-auto 1024px:mx-0 1024px:text-left 768px:text-2xl 992px:text-[28px]
                   992px:leading-[1em] 992px:mb-[24px]"
              >
                Let Us Do Your Banking,
              </h3>
              <h2
                className="montSemiBold text-[28px] w-3/4 py-2  360px:text-[30px] leading-[1.5em]  992px:py-[16px] font-montserrat mb-6 font-bold  1024px:text-[26px] 480px:text-[30px]  1024px:leading-[28px] text-center mb-7.5  414px:w-[90%] mx-auto 1024px:mx-0 
                  text-[#c7a652] 480px:leading-[1em] 768px:text-5xl 992px:text-[40px] 992px:mb-[24px] 1024px:text-left"
              >
                Don't Take The Risk!
              </h2>
              <p className="small text-xs leading-[1em]  414px:leading-[1.3em] mb-0 1024px:leading-[2em] 1366px:leading-[1em] m-0 p-0">
                Anywhere, Anytime, Australia Wide
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="ml-0 mt-[40px] 768px:mt-0 [flex:3]  768px:ml-[40px] right-row-content-middle">
            <div
              id="service-slider"
              className="w-[90%] h-[260px]  320px:h-[232px] 414px:h-auto  414px:w-[80%] my-[16px] mx-auto 992px:w-full"
            >
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
                      <div className="service-item  inline-block align-top w-[30%] float-left text-white">
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
                            SecureCash is a one stop cash in transit agency that
                            will manage your banking &amp; change order services
                            no matter where you are located in Australia.
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
                      <div className="service-item inline-block align-top w-[30%] float-left text-white">
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
                            Using our industry leading software technology
                            unique to only SecureCash, we are able to track
                            &amp; trace your deposit with a click of a button.
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
                      <div className="service-item inline-block align-top w-[30%] float-left text-white">
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
                            You can have your banking collected on any day or
                            days you choose, &amp; you are free to cancel or
                            change the days your banking is collected when ever
                            you want.
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
                      <div className="service-item inline-block align-top w-[30%] float-left text-white">
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
                            We work with most major banks in Australia including
                            the NAB, Commonwealth Bank, ANZ, Westpac &amp; some
                            local banks such as BankSA &amp; Bendigo Bank.
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
                      <div className="service-item inline-block align-top w-[30%] float-left text-white">
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
                            We do not lock you into lengthy con tracts, you are
                            free to try our service &amp; if you find that it is
                            not suitable for your organisation then you can
                            cancel at anytime with notice.
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
                      <div className="service-item inline-block align-top w-[30%] float-left text-white">
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
                              <a href="https://service.securecash.com.au/">
                                Login Here
                              </a>
                              )
                            </span>
                          </h3>
                          <p className="text-paragraph pr-[30px] leading-[1.6em]  1024px:leading-[2em] text-left mx-auto whitespace-normal 1024px:pr-[60px] font-montserrat font-light text-[12px]">
                            Customers are able to book extra pickups, cancel a
                            schedule pickup, submit change orders, &amp; even
                            verify a banking couriers identification all online.
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
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <div className="home-video-section">
        <div
          id="video-section"
          className="w-full inline-block max-h-[302px] h-[252px]  480px:max-h-[555px]  480px:h-[505px]  mt-[-1px] 1366px:mt-0 relative  768px:max-h-[680px]  768px:h-[630px]"
        >
          <div className="black-bar hidden 768px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0" />
          <div className="video-container static  768px:absolute w-full h-full top-0 left-0 text-center">
            <picture>
              <source
                srcSet="https://www.securecash.com.au/images/intro-video.webp"
                type="image/webp"
              />
              <source
                srcSet="https://www.securecash.com.au/images/intro-video.jpg"
                type="image/jpeg"
              />
              <img
                src="https://www.securecash.com.au/images/intro-video.webp"
                alt="SecureCash Introduction Video"
                className="lazyload mx-auto cursor-pointer"
                width={1024}
                height={576}
                style={{ maxWidth: "100%", height: "auto" }}
                onClick={IntroVideo}
              />
            </picture>
            <div id="iframe-container" />

            <h2 className="text-[16px] mt-[10px] leading-[1.6em] w-[60%] text-black text-center relative z-[-1] 992px:text-[20px]  768px:leading-[26px]  768px:w-[80%] 992px:w-full my-[16px] mx-auto  768px:mt-[-60px]  800px:mt-[-40px] 992px:mt-0  font-montserrat font-normal">
              A couple words from our Chief Operating Officer - Bethaney Bacchus
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
