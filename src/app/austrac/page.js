import React from 'react';
import HeadlineContent from './components/HeadlineContent';
import FormSection from './components/FormSection';
import BottomBanner from '@/components/common/BottomBanner';

export const metadata = {
  title: "Austrac Information Signup | SecureCash",
  description: "This form is required by all who take up our services to maintain the necessary reporting process as outlined by AUSTRAC.",
  robots: "noindex, follow",
  alternates: {
    canonical: 'https://www.securecash.com.au/austrac',
  },
  openGraph: {
    title: "Austrac Information Signup | SecureCash",
    description: "This form is required by all who take up our services to maintain the necessary reporting process as outlined by AUSTRAC.",
    url: 'https://www.securecash.com.au/austrac',
    images: [
      {
        url: 'https://www.securecash.com.au/images/at-securecash-give-more-focus-to-the-things-you-love.jpg',
        width: 1200,
        height: 630,
        alt: 'AUSTRAC Information Signup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Austrac Information Signup | SecureCash",
    description: "This form is required by all who take up our services to maintain the necessary reporting process as outlined by AUSTRAC.",
    images: ['https://www.securecash.com.au/images/at-securecash-give-more-focus-to-the-things-you-love.jpg'],
  },
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