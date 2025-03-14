"use client";
import React from "react";
import VimeoLite from "../VimeoLite";
import Typography from "./Typography";

const VideoSection = () =>
{
  return (
    <div className="home-video-section">
      <div
        id="video-section"
        className="w-full inline-block  mt-[-1px] relative 1024px:h-[630px] 1024px:max-h-[680px]"
      >
        <div className="black-bar hidden 1024px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0" />
        <div className="video-container static 1024px:absolute w-full h-full  bg-white 768px:bg-transparent top-0 left-0  1024px:flex flex-col justify-center items-center">
          <div className="video-player max-w-[1024px] w-full h-full">
            <VimeoLite videoId="330415813" />
          </div>
          <Typography
            as="h2"
            fontFamily="montserrat"
            className="text-[16px] mt-[4px] leading-[22px] w-[90%] text-black 
             text-center relative z-[1] 768px:text-xl 992px:text-[16px] 
             768px:leading-[1.6rem] 768px:w-[80%] 992px:w-full my-[16px] 
             mx-auto 992px:mt-0 font-normal"
          >
            A couple words from our Chief Operating Officer - Bethaney Bacchus
          </Typography>


        </div>
      </div>
    </div>
  );
};

export default VideoSection;
