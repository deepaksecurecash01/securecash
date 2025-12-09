import React from "react";
import HeroImage from "@/app/contact/HeroImage.js";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import FormSection from "@/app/contact/FormSection.js";
import TestimonialsSection from "@/app/contact/TestimonialsSection.js";
import MapSection from "@/app/contact/MapSection.js";

export const metadata = {
  title: "Contact Us | SecureCash",
  description: "Call us at 1300 SECURE or email customers@securecash.com.au for a faster, safer, and more convenient way of banking.",
  alternates: {
    canonical: 'https://www.securecash.com.au/contact',
  },
  openGraph: {
    title: "Contact Us | SecureCash",
    description: "Call us at 1300 SECURE or email customers@securecash.com.au for a faster, safer, and more convenient way of banking.",
    url: 'https://www.securecash.com.au/contact',
    images: [
      {
        url: 'https://www.securecash.com.au/images/contact-page/header-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact SecureCash - Get Support Within 45 Minutes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Us | SecureCash",
    description: "Call us at 1300 SECURE or email customers@securecash.com.au for a faster, safer, and more convenient way of banking.",
    images: ['https://www.securecash.com.au/images/contact-page/header-image.png'],
  },
};

const ContactPage = () =>
{
  return (
    <>
      <HeroImage />
      <FormSection />
      <TestimonialsSection />
      <MapSection />
      <CompaniesSlider />
    </>
  );
};

export default ContactPage;