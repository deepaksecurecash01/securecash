import BottomBanner from '@/components/common/BottomBanner';
import HeroSection from './HeroSection';
import Partners from './Partners';
import React from 'react';

const page = () =>
{
  return (
    <div className="section-wrapper partners-section-wrapper ">
      <div id="" className="partner-page w-[95%] px-5 max-w-[1366px] mx-auto flex flex-col justify-center items-center">
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