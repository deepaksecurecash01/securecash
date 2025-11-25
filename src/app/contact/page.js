"use client";
import React from "react";
import HeroImage from "./HeroImage";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import FormSection from "@/app/contact/FormSection.js";
import TestimonialsSection from "@/app/contact/TestimonialsSection.js";
import MapSection from "./MapSection";
import {
  AUSTRALIA_COORDINATES,
  NEW_ZEALAND_COORDINATES,
} from "./mapCoordinates.js";

const ContactPage = () => {
  const allCoordinates = [...AUSTRALIA_COORDINATES, ...NEW_ZEALAND_COORDINATES];

  return (
    <>
      <HeroImage />
      <FormSection />
      <TestimonialsSection />
      <MapSection coordinates={allCoordinates} />
      <CompaniesSlider />
    </>
  );
};

export default ContactPage;
