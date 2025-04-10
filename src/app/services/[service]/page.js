import BottomBanner from "@/components/about-us/BottomBanner";
import SectionWrapper from "@/components/services/SectionWrapper";
import HeroImage from "@/components/services/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "@/components/services/ScrollSectionWithImage";
import GuranteeSection from "@/components/services/GuaranteeSection";

const ServicePage = async ({ params }) => {
  const paramsData = await params;
  const { service } = paramsData;

  const serviceDetails = servicesData[service];

  if (!serviceDetails) return <div>Service not found</div>;
  return (
    <div>
      <HeroImage
        title={serviceDetails.title}
        imgSrc={serviceDetails.imageUrl}
      />
      <Spacer />
      <SectionWrapper
        heading={serviceDetails.heading}
        description={serviceDetails.description}
        imageUrl={serviceDetails.sections.rightImageSection.imageUrl} // Added imgSrc
        contentItems={serviceDetails.sections.rightImageSection.content} // Adjusted to include content
        contactInfo={serviceDetails.sections.rightImageSection.info} // Added contactInfo
      />
      <Spacer />

      <VideoSection service={true} height="690px" />
      <Spacer />
      <ScrollSectionWithImage
        imageUrl={serviceDetails.sections.leftImageSection.imageUrl} // Added imgSrc
        contentItems={serviceDetails.sections.leftImageSection.content} // Adjusted to include content
        contactInfo={serviceDetails.sections.leftImageSection.info} // Added contactInfo
      />
      <Spacer />
      <GuranteeSection
        guaranteeContent={
          serviceDetails.sections.guaranteeSection.content[0].details
        }
        imageUrl={serviceDetails.sections.guaranteeSection.imageUrl}
      />
      <BottomBanner />
    </div>
  );
};

// Spacer Component
const Spacer = () => (
  <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>
);

export default ServicePage;
