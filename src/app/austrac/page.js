import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import FormSection from './components/FormSection';
import BottomBanner from '@/components/common/BottomBanner';

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