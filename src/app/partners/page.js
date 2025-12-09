import BottomBanner from '@/components/common/BottomBanner';
import HeroSection from './HeroSection';
import Partners from './Partners';

export const metadata = {
  title: "SecureCash International Partners | SecureCash",
  description: "SecureCash is proud to partner with companies known for their outstanding services in security, safety, and executive protection in their respective countries.",
  alternates: {
    canonical: 'https://www.securecash.com.au/partners',
  },
  openGraph: {
    title: "SecureCash International Partners | SecureCash",
    description: "SecureCash is proud to partner with companies known for their outstanding services in security, safety, and executive protection in their respective countries.",
    url: 'https://www.securecash.com.au/partners',
    images: [
      {
        url: 'https://www.securecash.com.au/images/partners/australiacolors.png',
        width: 1200,
        height: 630,
        alt: 'SecureCash International Partners',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SecureCash International Partners | SecureCash",
    description: "SecureCash is proud to partner with companies known for their outstanding services in security, safety, and executive protection in their respective countries.",
    images: ['https://www.securecash.com.au/images/partners/australiacolors.png'],
  },
};

const PartnersPage = () =>
{
  return (
    <div className="section-wrapper partners-section-wrapper">
      <div className="partner-page w-[95%] px-5 max-w-[1366px] mx-auto flex flex-col justify-center items-center">
        <div className="content-wrapper w-full 480px:w-[80%] mt-0 414px:mt-[50px] p-0">
          <HeroSection />
          <Partners />
        </div>
      </div>
      <BottomBanner />
    </div>
  );
};

export default PartnersPage;