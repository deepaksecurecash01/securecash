// app/services/[service]/page.jsx
import BottomBanner from "@/components/common/BottomBanner";
import SectionWrapper from "../components/SectionWrapper";
import HeroImage from "../components/HeroImage";
import { servicesData } from "@/data/servicesData";
import VideoSection from "@/components/common/VideoSection";
import ScrollSectionWithImage from "../components/ScrollSectionWithImage";
import GuaranteeSection from "../components/GuaranteeSection";
import Link from "next/link";
import { notFound } from "next/navigation";

// Turn off fallback dynamic params → no ISR
export const dynamicParams = false;

// ----- Spacer Component -----
const Spacer = () => (
  <div className="spacer-lg h-[30px] md:h-[100px]" id="read-more"></div>
);

// ----- Free Change Order Service Page -----
const FreeChangeOrderService = () => (
  <>
    <h1 className="montBold text-[42px] leading-[45px] font-semibold text-center mx-auto 768px:leading-[60px] text-black">
      <br />
      <strong>Free Change Order Service</strong>
    </h1>

    <hr
      
      className="w-[100px] mt-[20px] h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
    />

    <div className="relative">
      <div className="absolute opacity-20 inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10"></div>
      <div className="absolute opacity-20 inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10"></div>

      <div className="max-w-[1366px] mx-auto flex flex-col px-[20px] items-center">
        <div className="content-wrapper w-4/5 mt-[50px]">
          <p className="mb-4 text-[#000]" style={{ textAlign: "left" }}>
            <strong>SecureCash</strong> can provide a{" "}
            <em><strong>FREE </strong></em>
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
            and subject to the following:
          </p>

          <ul className="768px:pl-[50px] mt-4">
            <li className="mb-6">A. Your change orders can be no more than $1,000 in cash.</li>
            <li className="mb-6">
              B. You must request your <strong>change order service</strong> via our{" "}
              <strong>
                <Link className="!text-[#957433] font-medium hover:underline" href="https://service.securecash.com.au/">
                  online services
                </Link>
              </strong>{" "}48hrs prior to delivery.
            </li>
            <li className="mb-6">C. Change orders can only be delivered on the same day as your cash collection service.</li>
            <li className="mb-6">D. You will be required to reimburse the change order (cash only, no cheques) upon delivery.</li>
          </ul>
        </div>

        <h3 className="content-wrapper w-4/5 mt-[50px] text-[26px] text-primary text-center">
          <Link className="!text-[#957433] font-medium hover:underline" href="/quote/">
            GET A QUOTE HERE
          </Link>
        </h3>
        <p className="mb-4 mt-2 text-center text-[#000]">
          Provide the codeword &quot;FreeChange2021&quot;
        </p>

        <Spacer />
      </div>
    </div>
  </>
);

// ----- Standard Service Page -----
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

// ----- Generate All Static Paths -----
export async function generateStaticParams()
{
  return [
    ...Object.keys(servicesData).map((service) => ({ service })),
    { service: "free-change-order-service" }
  ];
}

// ----- Generate Metadata -----
export async function generateMetadata({ params })
{
  const { service } = params;

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

// ----- Main Page Component -----
export default function ServicePage({ params })
{
  const { service } = params;

  if (service === "free-change-order-service") {
    return <FreeChangeOrderService />;
  }

  const serviceDetails = servicesData[service];
  if (!serviceDetails) {
    notFound(); // ⛔ Forces 404 instead of ISR
  }

  return <StandardService serviceDetails={serviceDetails} />;
}
