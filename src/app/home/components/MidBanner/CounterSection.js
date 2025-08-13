"use client";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import Typography from "@/components/common/Typography";
import Paragraph from "@/components/common/Paragraph";

const CounterSection = ({ stats }) =>
{
  return (
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
                <Typography
                  as="h4"
                  fontFamily="montserrat"
                  className="banner-mid-header font-black text-[40px] text-primary pb-[30px]"
                >
                  <CountUp end={value} prefix={prefix ? "$" : ""} duration={3} />
                </Typography>




                <Image
                  src={imgSrc}
                  onError={(e) =>
                  {
                    e.target.onerror = null;
                    e.target.src = imgFallback;
                  }}
                  width={60}
                  height={0}
                  className="h-[60px] w-auto pb-[10px] mx-auto"
                  alt={alt}
                />
                <Typography
                  as="p"
                  className="text-[16px] text-white font-normal pb-0 mb-0"
                >
                  {description}
                </Typography>

              </div>
              {id < stats.length && (
                <div className="mid-row-divider h-0.5 w-[150px] 992px:h-[100px] 992px:w-0.5 bg-white z-10"></div>
              )}
            </React.Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default CounterSection;
