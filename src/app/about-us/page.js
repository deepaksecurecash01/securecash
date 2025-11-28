import AboutusSection from '@/app/about-us/components/AboutusSection';
import Banner from '@/app/about-us/components/Banner';
import HeadlineContent from '@/app/about-us/components/HeadlineContent';
import TeamSection from '@/app/about-us/components/TeamSection';
import BottomBanner from '@/components/common/BottomBanner';

export const metadata = {
  title: 'About Us - SecureCash | Cash in Transit Since 1992',
  description: 'Established in 1992, SecureCash specialises in the pickup and banking of your daily takings. Learn about our 25+ years of experience in cash transport solutions.',
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