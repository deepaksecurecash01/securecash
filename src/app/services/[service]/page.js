import BottomBanner from "@/components/common/BottomBanner";
import SectionWrapper from "../components/SectionWrapper";
import HeroImage from "../components/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "../components/ScrollSectionWithImage";
import GuaranteeSection from "../components/GuaranteeSection";
import { notFound } from "next/navigation";
import FreeChangeOrderService from "../components/FreeChangeOrderService";

export const dynamicParams = false;
export const dynamic = 'force-static';

const Spacer = () => (
  <div className="spacer-lg h-[30px] md:h-[100px]" id="read-more" />
);

const StandardService = ({ serviceDetails }) =>
{
  const { title, imageUrl, heading, description, sections } = serviceDetails;
  const { rightImageSection, leftImageSection, guaranteeSection } = sections;

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

export async function generateStaticParams()
{
  return [
    ...Object.keys(servicesData).map((service) => ({ service })),
    { service: "free-change-order-service" }
  ];
}

export async function generateMetadata({ params })
{
  const { service } = await params;

  if (service === "free-change-order-service") {
    return {
      title: "Free Change Order Service | SecureCash Australia",
      description: "SecureCash offers a free change order service for your business."
    };
  }

  const serviceDetails = servicesData[service];
  if (!serviceDetails) {
    return {
      title: "Service Not Found | SecureCash Australia",
      description: "The requested service could not be found."
    };
  }

  return {
    title: serviceDetails.metaTitle || serviceDetails.title,
    description: serviceDetails.description ||
      `Learn about SecureCash ${serviceDetails.title} solutions for your business across Australia.`
  };
}

export default async function ServicePage({ params })
{
  const { service } = await params;

  if (service === "free-change-order-service") {
    return <FreeChangeOrderService />;
  }

  const serviceDetails = servicesData[service];
  if (!serviceDetails) {
    notFound();
  }

  return <StandardService serviceDetails={serviceDetails} />;
}