import BottomBanner from '@/components/common/BottomBanner';
import BlogHeroSection from '@/app/blog/components/BlogHeroSection';
import BlogIndex from '@/app/blog/components/BlogIndex';
import React from 'react';

const page = () =>
{
  return (
    <div>
      <BlogHeroSection title={'Thanks for being my sounding board'} date={'News, Articles & Updates From Us'} blogIndex={true} />
      <BlogIndex />
      <BottomBanner />

    </div>
  );
};

export default page;