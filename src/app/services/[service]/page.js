import { Metadata } from "next";
import BottomBanner from "@/components/about-us/BottomBanner";
import SectionWrapper from "@/components/services/SectionWrapper";
import HeroImage from "@/components/services/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "@/components/services/ScrollSectionWithImage";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import Head from "next/head";
import Divider from "@/components/common/Divider";
import Link from "next/link";

// Spacer Component - reusable UI element for consistent spacing
const Spacer = () => (
  <div className="spacer-lg h-[30px] md:h-[100px]" id="read-more"></div>
);

// Generate metadata for the page
export async function generateMetadata({ params })
{
  const { service } = params;

  // Special case for free change order service
  if (service === "free-change-order-service") {
    return {
      title: "Free Change Order Service | SecureCash Australia",
      description: "SecureCash offers a free change order service for your business."
    };
  }

  const serviceDetails = servicesData[service];

  // Handle case when service is not found
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

// Free Change Order Service Component
const FreeChangeOrderService = () => (
  <>
    <div>
      <h1 className="
                montBold 
                text-[42px] 
                leading-[45px] 
                768px:px-[30px] 
                font-semibold 
                text-center 
                mx-auto 
                768px:leading-[60px] 
                text-black
            ">
        <br />
        <strong>Free Change Order Service</strong>
      </h1>

      <Divider
        color="primary"
        margin="mt-[20px]"
        alignment="center"
        responsiveClassName="w-[100px]"
      />
    </div>
    <div className="relaitive">
      <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10"></div>
      <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10"></div>
      <div className="max-w-[1366px] mx-[auto] my-[0] flex flex-col pl-[20px] pr-[20px] justify-center items-center">
        <div className="content-wrapper w-4/5 mt-[50px] p-0">
          <br />
          <p className="mb-4 text-center text-[#000]" style={{ textAlign: "left" }}>
            <strong>SecureCash</strong> can provide a{" "}
            <em>
              <strong>FREE </strong>
            </em>
            <strong>
              <Link className="!text-[#957433] font-medium hover:underline" href="/services/cash-delivery/">
                change order service
              </Link>
            </strong>{" "}
            to your organisation for the next 2 months, given that it is made in
            conjunction with a paying{" "}
            <strong>
              <Link className="!text-[#957433] font-medium hover:underline" href="/services/cash-in-transit/">
                cash-in-transit service
              </Link>
            </strong>{" "}
            and subject to the following;
            <br />
            <br />
            <strong>To utilise our free change order service:</strong>
          </p>
          <ul className=" 768px:pl-[50px]" >
            <li style={{ listStyle: "none", marginBottom: "1.5rem" }}>
              A. Your change orders can be no more than $1,000 in cash.
            </li>
            <li style={{ listStyle: "none", marginBottom: "1.5rem" }}>
              B. You must request your <strong>change order service</strong> via
              our{" "}
              <strong>
                 <Link className="!text-[#957433] font-medium hover:underline" href="https://service.securecash.com.au/">online services</Link>
              </strong>{" "}
              48hrs prior to delivery.
            </li>
            <li style={{ listStyle: "none", marginBottom: "1.5rem" }}>
              C. Change orders can only be delivered on the same day as your cash
              collection service.
            </li>
            <li style={{ listStyle: "none", marginBottom: "1.5rem" }}>
              D. You will be required to reimburse the change order (in cash only,
              no cheques) upon delivery.
            </li>
          </ul>
        </div>
        <h3 className="content-wrapper w-4/5 mt-[50px] p-0 text-[26px] text-primary" style={{ textAlign: "center" }}>
           <Link className="!text-[#957433] font-medium hover:underline" href="/quote/">GET A QUOTE HERE</Link>
        </h3>
        <p className="mb-4 mt-2 text-center text-[#000]">provide the codeword "FreeChange2021"</p>
        <Spacer />
      </div>
    </div>
  </>
);

// Not Found Component
const ServiceNotFound = () => (
  <div className="container mx-auto py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
    <p>The requested service information could not be found.</p>
  </div>
);

// Standard Service Component
const StandardService = ({ serviceDetails }) =>
{
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

// Main ServicePage Component
const ServicePage = async ({ params }) =>
{
  const { service } = params;

  if (service === "free-change-order-service") {
    return <FreeChangeOrderService />;
  }

  const serviceDetails = servicesData[service];

  if (!serviceDetails) {
    return <ServiceNotFound />;
  }

  return <StandardService serviceDetails={serviceDetails} />;
};

export default ServicePage;