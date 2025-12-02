import React from "react";
import HeroImage from "@/app/contact/HeroImage.js";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import FormSection from "@/app/contact/FormSection.js";
import TestimonialsSection from "@/app/contact/TestimonialsSection.js";
import MapSection from "@/app/contact/MapSection.js";

export const metadata = {
  title: "Contact SecureCash - Get Support Within 45 Minutes",
  description: "Contact SecureCash for cash handling, ATM services, and security solutions across Australia. Get a reply within 45 minutes. Call 1300 SECURE or fill out our contact form.",
  openGraph: {
    title: "Contact SecureCash - Get Support Within 45 Minutes",
    description: "Contact SecureCash for cash handling, ATM services, and security solutions across Australia. Get a reply within 45 minutes.",
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