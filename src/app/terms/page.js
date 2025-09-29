import React from "react";
import
{
  FaMoneyBillAlt,
  FaCar,
  FaShieldAlt,
  FaExclamationTriangle,
  FaArrowDown,
  FaLongArrowAltDown,
  FaCircle,
} from "react-icons/fa";
import BottomBanner from '@/components/common/BottomBanner';
import { FaArrowDownLong } from "react-icons/fa6";

import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import Container from "@/components/layout/Container";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import FormSection from './components/FormSection';
import Link from "next/link";
import ServiceAgreementClauses from "./components/ServiceAgreementClauses";
import { HeroSection } from "./components/HeroSection";

// Constants
const TERMS_CONDITIONS = {
  HERO: {
    SUBTITLE: "Our Terms &",
    TITLE: "Conditions",
    LEARN_MORE: "Learn More",
    SCROLL_TARGET: "#tnc-page-main-scroll",
  },
  CARD_TEXT: {
    FIRST_PARAGRAPH:
      "Below is a copy of our terms & conditions (T&C's) of service, please understand that this is NOT a lock-in contract and if you find our services are not suitable for your organisation, then you are free to cancel at anytime!",
    SECOND_PARAGRAPH:
      "Please be aware that Secure Cash reserves the right to change or amend these terms and conditions at anytime. You will be provided with a copy of these T&C's for your records to the email address you nominate below.",
  },
  MAIN_TITLE: "Terms & Conditions",
  IMAGE: {
    SRC: "https://www.securecash.com.au/images/welcome/terms-main-img-1.jpg",
    ALT: "Filling Out Forms",
    WIDTH: 559,
    HEIGHT: 678,
  },
};

// General terms data
const GENERAL_TERMS = [
  "Minimum of one collection per week with no time restrictions for collection or change orders, unless otherwise agreed upon with our service proposal,",
  "Use of your nominated banks express deposit satchels (either NAB, WBC, CBA, ANZ, BSA, STG or BOM) and using your banks express depositing system,",
  "All banking to be prepared and ready to go before the banking courier arrives,",
  "No more than 10 bags with a total weight equaling no more than 3kg (typically the weight of a bag of oranges),",
  "Your monthly account to be paid by the 14th of each month,",
  "Limited to $50,000 (AUD) in cash per collection, cheques can be unlimited in $ value.",
];

// Change orders terms data
const CHANGE_ORDER_TERMS = [
  "All change orders must be submitted two business days before day requested,",
  "Orders must be under $1000.00. If above $1000.00 funds have to be EFT'd to our holding account,",
  "All orders are to be placed via our Online Services,",
  "5 kg and under charged as quoted,",
  "Once a change order exceeds 5 kg a flat $10+ GST service fee will be charged,",
  "Orders over 5 kg will also be charged a handling fee at $2 + GST per kilogram or part thereof,",
  "For every 50 kg a $20 + GST sourcing fee will incur.",
];



const TermsListItem = ({ text, isLastItem = false }) => (
  <li className="relative">
    <FaCircle className="text-primary text-[10px] mr-3 flex-shrink-0 absolute top-3" />
    <p className="block leading-[2em] pl-[26px]  480px:pl-[47px] font-light mb-5 1366px:mb-[30px]">
      {text}
      {isLastItem && (
        <>
          <br />
          <br />
        </>
      )}
    </p>
  </li>
);

const TermsList = ({ terms, showExtraBreak = false }) => (
  <ul className="tnc-page-main--content__list list-none relative  1024px:pr-10">
    <li />
    {terms.map((term, index) => (
      <TermsListItem
        key={index}
        text={term}
        isLastItem={showExtraBreak && index === terms.length - 1}
      />
    ))}
  </ul>
);

const MainSection = () => (
  <section className="tnc-page-main relative z-[1] mt-[52px] 480px:mt-9  1024px:mt-[150px] bg-[#f7f7f7]" id="tnc-page-main-scroll">
    <img
      src={TERMS_CONDITIONS.IMAGE.SRC}
      alt={TERMS_CONDITIONS.IMAGE.ALT}
      className="tnc-page-main__img-bg hidden 1024px:block absolute right-0  768px:w-[30%] h-full object-cover -z-[1] "
      width={TERMS_CONDITIONS.IMAGE.WIDTH}
      height={TERMS_CONDITIONS.IMAGE.HEIGHT}
    />
    <Container className="inner w-full">
      <div className="tnc-page-main--content  1024px:w-[68%] 1200px:w-[65%] py-[50px] px-[30px]  480px:py-[82px]  480px:px-[34px]  1366px:pt-[110px]  1366px:pb-[110px]  1366px:pl-[18px]">
        <Typography
          as="h3"
          fontFamily="montserrat"
          className=" text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mx-auto 992px:text-[26px] 768px:mx-0"
        >
          {TERMS_CONDITIONS.MAIN_TITLE}
        </Typography>
        <Divider
          color="primary"
          alignment="left"
          className="mt-5 mb-[34px] w-[100px] 768px:text-left 768px:mx-0"
        />
        <ScrollableSection className="h-auto w-full p-0 mx-auto 992px:h-[366px]  768px:pb-[18px] bg-[#f7f7f7]">
          <TermsList terms={GENERAL_TERMS} showExtraBreak={true} />
          <Typography
            as="h4"
            fontFamily="montserrat"
            className=" text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mb-4 mx-auto 992px:text-[26px] 768px:mx-0"
          >
            Change Orders
          </Typography>
          <TermsList terms={CHANGE_ORDER_TERMS} />
        </ScrollableSection>
      </div>
    </Container>
  </section>
);

// Main Component
const TermsAndConditionsPage = () =>
{
  return (
    <div>
      <HeroSection />
      <MainSection />
      <ServiceAgreementClauses />
      <FormSection />
      <BottomBanner />

    </div>
  );
};

export default TermsAndConditionsPage;
