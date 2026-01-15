import CompaniesSlider from "@/components/common/CompaniesSlider";
import FranchiseForm from "@/app/franchise/FormSection";
import HeroImage from "@/app/franchise/HeroImage";
import SectionWrapper from "@/app/franchise/SectionWrapper";

export const metadata = {
  title: "SecureCash | Franchise Opportunity",
  description: "Become Your Own Boss by joining the established SecureCash network as a Franchise Owner! We are excited to offer Franchise Opportunities for sale across Australia and New Zealand.",
  alternates: {
    canonical: 'https://www.securecash.com.au/franchise',
  },
  openGraph: {
    title: "SecureCash | Franchise Opportunity",
    description: "Become Your Own Boss by joining the established SecureCash network as a Franchise Owner! We are excited to offer Franchise Opportunities for sale across Australia and New Zealand.",
    url: 'https://www.securecash.com.au/franchise',
    images: [
      {
        url: 'https://www.securecash.com.au/images/3-australia-securecash-services-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'SecureCash Franchise Opportunity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SecureCash | Franchise Opportunity",
    description: "Become Your Own Boss by joining the established SecureCash network as a Franchise Owner! We are excited to offer Franchise Opportunities for sale across Australia and New Zealand.",
    images: ['https://www.securecash.com.au/images/3-australia-securecash-services-featured.jpg'],
  },
  other: {
    'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://calendly.com https://m.stripe.network https://m.stripe.com;",
  },
};

const FranchisePage = () =>
{
  return (
    <>
      <main id="content">
        <HeroImage />
        <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more" />
        <SectionWrapper />
      </main>
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]" id="franchise-form" />
      <FranchiseForm />
      <CompaniesSlider />
    </>
  );
};

export default FranchisePage;