import React from "react";
import { FaCircle } from "react-icons/fa";
import BottomBanner from "@/components/common/BottomBanner";
import Container from "@/components/layout/Container";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import FormSection from "./components/FormSection";
import ServiceAgreementClauses from "./components/ServiceAgreementClauses";
import { HeroSection } from "./components/HeroSection";
import Image from "next/image";

export const metadata = {
  title: "Terms and Conditions | SecureCash",
  description:
    "Read about the Terms and Conditions (T&C) of our services here. These are our agreements for service. Our services are flexible with no lock-in contracts.",
  robots: "noindex, follow",
  alternates: {
    canonical: "https://www.securecash.com.au/terms",
  },
  openGraph: {
    title: "Terms and Conditions | SecureCash",
    description:
      "Read about the Terms and Conditions (T&C) of our services here. These are our agreements for service. Our services are flexible with no lock-in contracts.",
    url: "https://www.securecash.com.au/terms",
    images: [
      {
        url: "https://www.securecash.com.au/images/welcome/terms-main-img-1.jpg",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | SecureCash",
    description:
      "Read about the Terms and Conditions (T&C) of our services here. These are our agreements for service. Our services are flexible with no lock-in contracts.",
    images: [
      "https://www.securecash.com.au/images/welcome/terms-main-img-1.jpg",
    ],
  },
};

// Updated content based on the screenshot
const SERVICE_CONDITIONS = [
  {
    text: "A minimum of one (1) collection per week applies, unless otherwise agreed in writing as part of your service proposal.",
  },
  {
    text: "Collections and deliveries do not have guaranteed times and are carried out subject to security, safety, access, and operational requirements, unless otherwise agreed in writing as part of your service proposal.",
  },
  {
    text: "You must use your nominated bank’s express deposit satchels and express depositing system, where applicable.",
  },
  {
    text: "All banking must be fully prepared, sealed, and ready for handover before the SecureCash courier arrives.",
  },
  {
    text: "Each collection is limited to:",
    subItems: [
      "no more than ten (10) bags",
      "a total combined weight of no more than 3kg",
      "cash with an aggregate face value not exceeding $50,000 AUD per collection",
      "cheques are not subject to a face value limit",
    ],
  },
  {
    text: "Invoices are payable within fourteen (14) days of issue, unless otherwise stated on your invoice.",
  },
];

const CHANGE_ORDER_TERMS = [
  {
    text: "All change orders must be submitted at least two (2) business days before the requested delivery date.",
  },
  {
    text: "Orders exceeding $1,000 require prepayment of the excess amount by electronic funds transfer (EFT) before the order will be processed.",
  },
  {
    text: "All change orders must be placed via SecureCash’s online ordering systems.",
  },
  {
    text: "Change orders with a total packaged weight of 5kg or less are charged as quoted.",
  },
  {
    text: "Once a change order exceeds 5kg:",
    subItems: [
      "a flat service fee of $10 + GST will apply, and",
      "a handling fee of $2 + GST per kilogram (or part thereof) will be charged.",
    ],
  },
  {
    text: "For every 50kg (or part thereof) included in a change order, a sourcing fee of $20 + GST will apply.",
  },
  {
    text: "SecureCash reserves the right to reject, modify, or defer change orders that present security, safety, or operational risks.",
  },
];

// Updated Item component
const TermsListItem = ({ item, isLastInList, addSectionBreak }) => {
  const marginClass = isLastInList ? "" : "mb-5 1366px:mb-[30px]";

  return (
    <li className="relative">
      <FaCircle className="text-primary text-[10px] mr-3 flex-shrink-0 absolute top-3" />
      <div className={`block leading-[2em] pl-[26px] 480px:pl-[47px] font-light ${marginClass}`}>
        <p>{item.text}</p>
        
        {/* Render sub-list if it exists */}
        {item.subItems && (
          <ul className="list-[disc] pl-5 mt-2 space-y-1 ">
            {item.subItems.map((sub, idx) => (
              <li 
                key={idx} 
               
                className="pl-1 marker:text-primary/70 marker:text-2xl" 
              >
                <span className="text-base font-light text-black">
                  {sub}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Add extra visual break only if requested */}
        {addSectionBreak && (
          <>
            <br />
          </>
        )}
      </div>
    </li>
  );
};

const TermsList = ({ terms, showExtraBreak = false }) => (
  <ul className="tnc-page-main--content__list list-none relative 1024px:pr-10">
    {terms.map((term, index) => {
      const isLastIndex = index === terms.length - 1;
      return (
        <TermsListItem
          key={index}
          item={term}
          isLastInList={isLastIndex}
          addSectionBreak={showExtraBreak && isLastIndex}
        />
      );
    })}
  </ul>
);

const MainSection = () => (
  <section
    className="tnc-page-main relative z-[1] mt-[52px] 480px:mt-9 1024px:mt-[150px] bg-[#f7f7f7]"
    id="tnc-page-main-scroll"
  >
    <div className="tnc-page-main__img-bg hidden 1024px:block absolute right-0 768px:w-[30%] h-full -z-[1]">
      <Image
        src="/images/welcome/terms-main-img-1.jpg"
        alt="Filling Out Forms"
        fill
        sizes="30vw"
        className="object-cover"
        quality={85}
        priority
        fetchPriority="high"
      />
    </div>
    <Container className="inner w-full">
      <div className="tnc-page-main--content 1024px:w-[68%] 1200px:w-[65%] py-[50px] px-[30px] 480px:py-[82px] 480px:px-[34px] 1366px:pt-[110px] 1366px:pb-[110px] 1366px:pl-[18px] 1366px:pr-0">
        <h1 className="text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mx-auto 992px:text-[26px] 768px:mx-0 font-montserrat uppercase">
          Service Conditions
        </h1>
        <hr className="mt-5 h-[4px] rounded-[5px] border-0 mb-[34px] w-[100px] 768px:text-left 768px:mx-0 bg-primary" />
        <ScrollableSection className="h-auto w-full p-0 mx-auto 992px:h-[368px] 768px:pb-[18px] bg-[#f7f7f7]">
          <TermsList terms={SERVICE_CONDITIONS} showExtraBreak={true} />
          <h2 className="text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mb-4 mx-auto 992px:text-[26px] 768px:mx-0 font-montserrat uppercase">
            Change Orders
          </h2>
          <TermsList terms={CHANGE_ORDER_TERMS} />
        </ScrollableSection>
      </div>
    </Container>
  </section>
);

const TermsAndConditionsPage = () => {
  return (
    <>
      <HeroSection />
      <MainSection />
      <ServiceAgreementClauses />
      <FormSection />
      <BottomBanner />
    </>
  );
};

export default TermsAndConditionsPage;
