import AboutusSection from '@/components/about-us/AboutusSection';
import Banner from '@/components/about-us/Banner';
import HeadlineContent from '@/components/about-us/HeadlineContent';
import TeamSlider from '@/components/about-us/TeamSection/TeamSlider';
import React from 'react';

import TeamSection from '@/components/about-us/TeamSection';
import BottomBanner from '@/components/about-us/BottomBanner';

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