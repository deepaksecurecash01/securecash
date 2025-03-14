import BottomBanner from '@/components/about-us/BottomBanner';
import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogIndex from '@/components/blog/BlogIndex';
import React from 'react'

const page = () => {
  return (
    <div>
      <BlogHeroSection title={'Thanks for being my sounding board'} date={'News, Articles & Updates From Us'} blogIndex={true} />
      <BlogIndex/>
      <BottomBanner />

    </div>
  )
}

export default page