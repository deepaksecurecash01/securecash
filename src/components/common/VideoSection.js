"use client";
import React from "react";
import VimeoLite from "./VimeoLite";

const VideoSection = ({ service = false, height }) =>
{
  return (
    <section className="home-video-section" aria-labelledby="video-heading">
      <div
        id="video-section"
        className="w-full inline-block mt-[-1px] relative 1024px:max-h-[680px]"
        style={{
          "--video-height": height,
        }}
      >
        <div className="black-bar hidden 1024px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0 absolute" aria-hidden="true" />
        <div
          className={`video-container static 1024px:absolute w-full bg-white 768px:bg-transparent left-0 1024px:flex flex-col justify-center items-center ${service ? "top-[60px]" : "top-0"
            }`}
        >
          <div className="video-player max-w-[1024px] w-full h-full">
            <VimeoLite videoId="330415813" title="Message from SecureCash Chief Operating Officer Bethaney Bacchus" />
          </div>
          <p
            id="video-heading"
            className="text-[16px] mt-[4px] leading-[22px] w-[90%] text-black text-center relative z-[1] 768px:text-xl 992px:text-[16px] 768px:leading-[1.6rem] 768px:w-[80%] 992px:w-full mx-auto 992px:mt-3 font-normal font-montserrat"
          >
            A couple words from our Chief Operating Officer - Bethaney Bacchus
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;