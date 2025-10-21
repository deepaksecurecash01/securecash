import React from "react";

const BottomBanner = () =>
{
  return (
    <>
      <div id="about-us-banner-bottom" className="h-[340px] w-full max-[414px]:mt-0">
        <div
          id="banner-mid-content"
          className="relative h-[340px] w-full mx-auto flex flex-col justify-end items-center px-4 
             bg-cover bg-no-repeat 
             before:content-[''] before:absolute before:inset-0 before:h-full before:w-full
             before:bg-[url('https://securecash.com.au/images/team.webp')] before:bg-no-repeat 
             before:bg-[left_34%] before:bg-cover before:brightness-50 
             no-webp:before:bg-[url('https://securecash.com.au/images/team.jpg')]"
        >

          <h2

            className="text-white font-medium leading-[2rem] text-center max-[414px]:text-[36px] text-[40px] z-30 py-6 font-montserrat"
          >
            Let us do the banking for you
          </h2>
          <hr
           
            className="w-[100px] mt-[6px] mb-[36px]  divider-gold divider-2 z-20 h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default BottomBanner;
