import React from "react";
import Divider from "../common/Divider";
import BannerButton from "../homepage/BannerSection/BannerButton";
import Link from "next/link";

const HeroImage = () => {
  return (
    <div
      id="hero-image"
      className="flex flex-col justify-center items-center bg-[45%] bg-cover  768px:min-h-[50vh]  h-[70vh] 414px:h-auto  480px:bg-[position:50%] min-h-[40vh]  1024px:min-h-[40vh]  600px:bg-cover bg-no-repeat  992px:bg-center 1070px:min-h-[80vh]"
      style={{
        backgroundImage:
          "-webkit-linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.15)), url('https://www.securecash.com.au/images/3-australia-securecash-services-featured.jpg')",
      }}
    >
      <h1
        className="text-white font-bold text-center text-[30px] leading-[36px]  768px:text-[40px]  768px:leading-[48px]  992px:leading-[61px]  992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px] mt-[10vh] 1070px:mt-0"
        id="franchise-header"
      >
        <span
          id="Secure"
          className="font-times font-extralight text-[70px]  768px:text-[140px]"
        >
          Secure
        </span>
        <span
          id="Cash"
          className="text-primary font-times font-extralight text-[70px] 768px:text-[140px]"
        >
          Cash
        </span>
        <br />
        <span
          id="Franchises"
          className="text-[50px] 768px:text-[80px] leading-[100px]"
        >
          Franchises
        </span>
      </h1>
      <h2>
        <span id="NowAvailable" className="text-[40px] leading-[30px] 768px:leading-[60px] font-medium text-white">
          Now Available
        </span>
      </h2>
      <Divider
        color="white"
        width="16%"
        margin="mt-[10px] mb-[24px]"
        alignment="center"
        responsiveClassName="992px:mx-0 992px:text-left 414px:mb-0 768px:w-[100px]"
      />
      <div
        className="cta-box w-[95%] 480px:w-[80%] 600px:w-[60%] justify-evenly mt-0 414px:mt-[50px] relative  768px:w-[545px] flex items-center  768px:justify-between mb-[5vh] 1070px:mb-0 1070px:mt-[80px]"
        id="franchis-cta"
      >
        <Link href={"#franchise-form"} className="mx-[10px] 1024px:mx-0">
          <div className="flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0  rounded-full bg-[#c7a652] btn-learn-more hover:bg-white 768px:min-w-[253px] 768px:min-h-[73px] 768px:mt-8 1070px:mt-0 max-h-[73px] group  768px:mx-auto 1024px:mx-0">
            <p className="m-0 p-0 text-[14px]  768px:text-[20px] font-semibold w-full text-[#ffffff] group-hover:text-[#000] hover:no-underline text-center">
              Register Now
            </p>
          </div>
        </Link>
        <Link href={"#read-more"} className="mx-[10px] 1024px:mx-0">
          <div className="flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 768px:min-w-[253px] 768px:min-h-[73px] 768px:mt-8 1070px:mt-0 max-h-[73px] group  768px:mx-auto 1024px:mx-0">
            <p className="m-0 p-0 text-[14px]  768px:text-[20px] font-semibold w-full  group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
              Read More
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroImage;
