import React from "react";
import "@slightlyoff/lite-vimeo";

const Facade = () => {
  return (
    <div className="video-container static 1024px:absolute w-full h-full  bg-white 768px:bg-transparent top-0 left-0  1024px:flex flex-col justify-center items-center">
      <div className="video-player max-w-[1024px] w-full h-full">
        <lite-vimeo videoid="330415813"></lite-vimeo>
      </div>

      <h2 className="text-[16px] mt-[4px] leading-[22px] w-[90%] text-black text-center relative z-[1] 768px:text-xl 992px:text-[16px] 768px:leading-[1.6rem] 768px:w-[80%] 992px:w-full my-[16px] mx-auto 992px:mt-0 font-montserrat font-normal">
        A couple words from our Chief Operating Officer - Bethaney Bacchus
      </h2>
    </div>
  );
};

export default Facade;
