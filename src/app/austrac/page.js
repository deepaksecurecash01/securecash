import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import FormSection from './components/FormSection';
import BottomBanner from '@/components/common/BottomBanner';

export const metadata = {
  title: 'AUSTRAC - SecureCash',
  description: 'Complete your AUSTRAC Know Your Customer (KYC) compliance requirements. Provide your organisation details for secure cash in transit services across Australia.',
};

const AustracPage = () =>
{
  return (
    <>
      <HeadlineContent />
      <FormSection />
      <BottomBanner />
    </>
  );
};

export default AustracPage;