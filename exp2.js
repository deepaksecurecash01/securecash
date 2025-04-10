import BottomBanner from "@/components/about-us/BottomBanner";
import VideoSection from "@/components/common/VideoSection";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import HeroImage from "@/components/services/HeroImage";
import ScrollSection2 from "@/components/service/ScrollSection2";
import SectionWrapper from "@/components/service/SectionWrapper";
import { servicesData } from "@/data/servicesData";

const ServicePage = async ({ params }) =>
{
  const paramsData = await params;
  const { service } = paramsData;

  const serviceDetails = servicesData[service];

  if (!serviceDetails) return <div>Service not found</div>;
  console.log(serviceDetails.rightImageSection.content[0].details);
  return (
    <div>
      <HeroImage title={serviceDetails.title} imgSrc={serviceDetails.imageUrl} />
      <Spacer />

      <SectionWrapper
        heading={serviceDetails.heading}
        description={serviceDetails.description}
        contentItems={serviceDetails.rightImageSection.content} // Adjusted to include content
        contactInfo={serviceDetails.rightImageSection.content.info} // Added contactInfo
      />
      <Spacer />

      <VideoSection service={true} height="690px" />
      <Spacer />

      <ScrollSection2
        contentItems={serviceDetails.leftImageSection.content} // Adjusted to include content
        height="545px"
        imgSrc="https://www.securecash.com.au/images/25-australia-securecash-services-25.jpg"
        contactInfo={serviceDetails.leftImageSection.content.info} // Added contactInfo
      />
      <Spacer />

      <GuaranteeSection guaranteeContent={serviceDetails.guaranteeDetails} />
      <Spacer />

      <BottomBanner />
    </div>
  );
};

// Spacer Component
const Spacer = () => <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>;

export default ServicePage;
