import { Metadata } from "next";
import BottomBanner from "@/components/about-us/BottomBanner";
import SectionWrapper from "@/components/services/SectionWrapper";
import HeroImage from "@/components/services/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "@/components/services/ScrollSectionWithImage";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import Head from "next/head";

// Generate metadata for the page
export async function generateMetadata({ params })
{
  const service = params.service;
  const serviceDetails = servicesData[service];

  if (!serviceDetails) {
    return {
      title: "Service Not Found | SecureCash Australia",
      description: "The requested service could not be found."
    };
  }

  return {
    title: serviceDetails.metaTitle || serviceDetails.title,
    description: serviceDetails.description || `Learn about SecureCash ${serviceDetails.title} solutions for your business across Australia.`
  };
}

// Spacer Component - moved outside main component for cleaner code
const Spacer = () => (
  <div className="spacer-lg h-[30px] md:h-[100px]" id="read-more"></div>
);

const ServicePage = async ({ params }) =>
{
  // Destructure params directly - no need for await params
  const { service } = params;
  const serviceDetails = servicesData[service];

  // Early return if service not found
  if (!serviceDetails) {
    return (
      <div className="container mx-auto py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">  
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <p>The requested service information could not be found.</p>
      </div>
    );
  }

  // Extract content sections for cleaner JSX
  const {
    title,
    imageUrl,
    heading,
    description,
    sections
  } = serviceDetails;

  const {
    rightImageSection,
    leftImageSection,
    guaranteeSection
  } = sections;

  return (
    <div className="service-page">
      <HeroImage title={title} imgSrc={imageUrl} />

      <Spacer />

      <SectionWrapper
        heading={heading}
        description={description}
        imageUrl={rightImageSection.imageUrl}
        contentItems={rightImageSection.content}
      />

      <Spacer />

      <VideoSection service={true} height="690px" />

      <Spacer />

      <ScrollSectionWithImage
        imageUrl={leftImageSection.imageUrl}
        contentItems={leftImageSection.content}
        ctaText={leftImageSection.ctaText}
      />

      <Spacer />

      <GuaranteeSection
        guaranteeContent={guaranteeSection.content[0].details}
        imageUrl={guaranteeSection.imageUrl}
      />

      <BottomBanner />
    </div>
  );
};

export default ServicePage;