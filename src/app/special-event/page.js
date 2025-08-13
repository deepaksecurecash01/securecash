import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import FormSection from './components/FormSection';
import BottomBanner from '@/components/about-us/BottomBanner';
import Container from '@/components/layout/Container';
import FormSection2 from './components/FormSection2';
import { FaCircle } from "react-icons/fa6";

const page = () =>
{
  return (
    <div>
      <HeadlineContent />
      <FormSection />
      <BottomBanner />
    </div>
  );
};

export default page;