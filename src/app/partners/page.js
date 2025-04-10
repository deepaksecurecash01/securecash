import BottomBanner from '@/components/about-us/BottomBanner';
import HeroSection from '@/components/partners/HeroSection';
import Partners from '@/components/partners/Partners';
import React from 'react';

const page = () =>
{
  return (
    <div className="section-wrapper partners-section-wrapper ">
      <div id="intro" className="partner-page w-[95%] px-5 max-w-[1366px] mx-auto flex flex-col justify-center items-center">
        <div className="content-wrapper w-full 480px:w-[80%] mt-0  414px:mt-[50px] p-0">
          <HeroSection />
          <Partners />
        </div>       
      </div>
      <BottomBanner />
    </div>
  );
};

export default page;