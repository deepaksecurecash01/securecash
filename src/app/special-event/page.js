import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import BottomBanner from '@/components/about-us/BottomBanner';
import Container from '@/components/layout/Container';
import { FaCircle } from "react-icons/fa6";
import SpecialEventForm from '@/components/common/forms-new/forms/SpecialEventForm';

const page = () =>
{
  return (
    <div>
      <HeadlineContent />
      <SpecialEventForm />
      <BottomBanner />
    </div>
  );
};

export default page;