import AboutusSection from '@/app/about-us/components/AboutusSection';
import Banner from '@/app/about-us/components/Banner';
import HeadlineContent from '@/app/about-us/components/HeadlineContent';
import TeamSlider from '@/app/about-us/components/TeamSection/TeamSlider';
import React from 'react';

import TeamSection from '@/app/about-us/components/TeamSection';
import BottomBanner from '@/components/common/BottomBanner';

const page = () =>
{
  return (
    <div>
      <HeadlineContent />
      <AboutusSection />
      <Banner />
      <TeamSection />
      <BottomBanner />
    </div>
  );
};

export default page;