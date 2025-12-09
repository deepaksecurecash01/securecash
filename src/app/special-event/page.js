import HeadlineContent from './components/HeadlineContent';
import BottomBanner from '@/components/common/BottomBanner';
import SpecialEventForm from '@/components/common/forms-new/forms/SpecialEventForm';

export const metadata = {
  title: "Special Event Signup | SecureCash",
  description: "Part of our signup process, this form provides us all the required information about a location to physically service our clients",
  robots: "noindex, follow",
  alternates: {
    canonical: 'https://www.securecash.com.au/special-event',
  },
  openGraph: {
    title: "Special Event Signup | SecureCash",
    description: "Part of our signup process, this form provides us all the required information about a location to physically service our clients",
    url: 'https://www.securecash.com.au/special-event',
    images: [
      {
        url: 'https://www.securecash.com.au/images/welcome/special-event-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Special Event Information',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Special Event Signup | SecureCash",
    description: "Part of our signup process, this form provides us all the required information about a location to physically service our clients",
    images: ['https://www.securecash.com.au/images/welcome/special-event-img.jpg'],
  },
};

const Page = () =>
{
  return (
    <>
      <HeadlineContent />
      <SpecialEventForm />
      <BottomBanner />
    </>
  );
};

export default Page;