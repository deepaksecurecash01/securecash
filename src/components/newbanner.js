"use client";
import React from "react";
import CountUp from "react-countup";
import Carousel from "./Carousel";
import Facade from "./Facade";

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
  return (
    <div>
      {/* Mid Banner */}
      <section
        id="banner-mid"
        className="relative bg-banner-mid-mobile-bg pt-0 h-auto mt-[40px] 414px:h-[760px] 600px:h-[920px] 992px:bg-banner-mid-bg bg-center bg-cover bg-no-repeat 992px:h-[340px] w-full mx-auto flex flex-col  414px:mt-10 justify-center items-center 992px:mt-[100px]"
      >
        <div className=" bg-black w-full h-full z-0 absolute opacity-50"></div>

        <div
          className="inner w-full max-w-[1366px] mx-auto flex flex-col 992px:flex-row justify-center items-center"
          id="content-counter-wrapper"
        >
          {stats.map(
            ({ id, value, imgSrc, prefix, imgFallback, alt, description }) => (
              <React.Fragment key={id}>
                <div className="mid-row py-[50px] 992px:py-0 w-full float-none mx-auto pb-[50px] pl-0 992px:w-1/3 text-center relative 992px:float-left">
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
                  <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10"></div>
                )}
              </React.Fragment>
            )
          )}
        </div>
      </section>

      {/* Middle Content */}
      <section
        id="content-middle"
        className="bg-[#1a1a1a] min-h-[614px] 414px:min-h-[540px] pl-0 flex p-0 pt-0  992px:inline-block w-full mx-auto"
      >
        <div className="inner w-[95%] max-w-[1366px] mx-auto flex flex-col justify-evenly 992px:items-center py-[40px]  992px:flex-row  992px:py-[100px] ">
          <div className="w-full text-center pr-0   1024px:pr-0  992px:[flex:2] text-white ">
            <div className="service-container p-4 992px:p-0 pt-0 leading-[2em] m-0 text-[16px] text-white">
              <hr className="h-[4px] w-[100px] mx-auto my-[30px] bg-white rounded-[5px] border-0 992px:mx-0 992px:text-left text-center mb-6 1024px:mt-0 mt-0" />
              <h3
                className="text-[22px] leading-[36px]   font-prata font-regular text-center my-[8px_0_24px_0] w-[90%] 992px:w-auto mb-6  mx-auto 992px:mx-0 992px:text-left 768px:text-2xl 992px:text-[28px]
                   992px:leading-[1.4em] 992px:mb-[24px]"
              >
                Let Us Do Your Banking,
              </h3>
              <h2
                className="montSemiBold text-[40px] w-3/4 992px:w-auto py-2 leading-[1.4em] 992px:py-0 font-montserrat mb-6 font-bold  480px:text-[30px] text-center mb-7.5  mx-auto 992px:mx-0 
                  text-[#c7a652] 480px:leading-[1em] 768px:text-5xl 992px:text-[40px] 992px:leading-[1.4em] 992px:mb-[24px] 992px:text-left"
              >
                {`Don't Take The Risk!`}
              </h2>
              <p className="small text-[14px] leading-[1em] text-center 992px:text-left  414px:leading-[1.3em] 768px:text-[16px] mb-0 1024px:leading-[2em] 1366px:leading-[1em] m-0 p-0">
                Anywhere, Anytime, Australia Wide
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="ml-0 mt-[40px] 768px:mt-0  992px:[flex:3]  992px:ml-[40px] ">
            <div
              id="service-slider"
              className="w-[90%] h-[248px] 360px:h-[232px] 480px:h-auto 992px:h-0  480px:w-[80%]  768px:my-[16px] mx-auto 992px:w-full"
            >
              <Carousel />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <div className="home-video-section">
        <div
          id="video-section"
          className="w-full inline-block  mt-[-1px] relative 1024px:h-[630px] 1024px:max-h-[680px]"
        >
          <div className="black-bar hidden 1024px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0" />

          <Facade />
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
