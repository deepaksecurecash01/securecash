import React from "react";
import Divider from "../../components/common/Divider";

import DoubleButton from "../../components/common/DoubleButton";

const HeroImage = () =>
{
  return (
    <div
      id="hero-image"
      className="flex flex-col justify-center items-center bg-[45%] bg-cover h-[404px]  414px:h-[412px]  768px:h-[454px] 1024px:h-[55vh] 480px:bg-[position:50%]  600px:bg-cover bg-no-repeat  992px:bg-center "
      style={{
        backgroundImage:
          "-webkit-linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://www.securecash.com.au/images/3-australia-securecash-services-featured.jpg')",
      }}
    >
      <h1
        className="text-white font-bold text-center text-[30px] leading-[36px]  768px:text-[40px]  768px:leading-[48px]  992px:leading-[61px]  992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px] mt-[10vh] 1070px:mt-0"
        id="franchise-header"
      >
        <span
          id="Secure"
          className="font-times font-extralight text-[70px]  768px:text-[88px] leading-[88px]"
        >
          Secure
        </span>
        <span
          id="Cash"
          className="text-primary font-times font-extralight text-[70px] 768px:text-[88px] leading-[88px]"
        >
          Cash
        </span>
        <br />
        <span
          id="Franchises"
          className="text-[50px] 768px:text-[48px] leading-[100px]"
        >
          Franchises
        </span>
      </h1>
      <h2>
        <span id="NowAvailable" className="text-[32px] leading-[30px] font-medium text-white">
          Now Available
        </span>
      </h2>
      <Divider
        color="white"
        width="16%"
        margin="mt-2.5 mb-5"
        alignment="center"
        responsiveClassName="992px:mx-0 992px:text-left w-[16%] 768px:mt-5 768px:mb-0 414px:mb-0 600px:w-[100px]"
      />
      <DoubleButton
        primaryButton={{ text: "Register Now", href: "#franchise-form" }}
        secondaryButton={{ text: "Read More", href: "#read-more" }}

      />

    </div>
  );
};

export default HeroImage;
