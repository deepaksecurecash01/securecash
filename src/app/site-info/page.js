import HeadlineContent from "./components/HeadlineContent";
import BottomBanner from "@/components/common/BottomBanner";
import ThankYouModal from "@/components/common/forms-new/forms/ThankYouModal";
import SiteInfoForm from "@/components/common/forms-new/forms/SiteInfoForm";

export const metadata = {
  title: "Site Information Signup | SecureCash",
  description: "The final stage of our signup process. On this form you will provide all the details about your location, including a hazard assessment.",
  robots: "noindex, follow",
  alternates: {
    canonical: 'https://www.securecash.com.au/site-info',
  },
  openGraph: {
    title: "Site Information Signup | SecureCash",
    description: "The final stage of our signup process. On this form you will provide all the details about your location, including a hazard assessment.",
    url: 'https://www.securecash.com.au/site-info',
    images: [
      {
        url: 'https://www.securecash.com.au/images/welcome/about-location-img.jpg',
        width: 1200,
        height: 630,
        alt: 'Site Information Signup - Location Details',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Site Information Signup | SecureCash",
    description: "The final stage of our signup process. On this form you will provide all the details about your location, including a hazard assessment.",
    images: ['https://www.securecash.com.au/images/welcome/about-location-img.jpg'],
  },
};

const Page = () =>
{
  return (
    <>
      <ThankYouModal type="Business" />
      <HeadlineContent />
      <SiteInfoForm />
      <BottomBanner />
    </>
  );
};

export default Page;