import AboutusSection from '@/app/about-us/components/AboutusSection';
import Banner from '@/app/about-us/components/Banner';
import HeadlineContent from '@/app/about-us/components/HeadlineContent';
import TeamSection from '@/app/about-us/components/TeamSection';
import BottomBanner from '@/components/common/BottomBanner';

export const metadata = {
  title: "What Makes Us, Us! | About Us | SecureCash",
  description: "Get to know our team. We bring innovative solutions to ensure a top-class customer experience. Learn more about our story and individual team members.",
  alternates: {
    canonical: 'https://www.securecash.com.au/about-us',
  },
  openGraph: {
    title: "What Makes Us, Us! | About Us | SecureCash",
    description: "Get to know our team. We bring innovative solutions to ensure a top-class customer experience. Learn more about our story and individual team members.",
    url: 'https://www.securecash.com.au/about-us',
    images: [
      {
        url: 'https://www.securecash.com.au/images/header-img-about-us.png',
        width: 1200,
        height: 630,
        alt: 'SecureCash About Us - Team Members',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What Makes Us, Us! | About Us | SecureCash",
    description: "Get to know our team. We bring innovative solutions to ensure a top-class customer experience. Learn more about our story and individual team members.",
    images: ['https://www.securecash.com.au/images/header-img-about-us.png'],
  },
};

const AboutUs = () =>
{
  return (
    <>
      <HeadlineContent />
      <AboutusSection />
      <Banner />
      <TeamSection />
      <BottomBanner />
    </>
  );
};

export default AboutUs;