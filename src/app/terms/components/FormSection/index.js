import React from "react";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import Paragraph from "@/components/common/Paragraph";
import SubHeading from "@/components/common/SubHeading";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Link from "next/link";
import QuoteForm from "../QuoteForm";

const FormSection = () =>
{

  return (
    <div
      id="content-contact"
      className=" bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px]  1280px:my-[84px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex">
        <div className="right-contact-row  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
          <Typography
            as="h3"
            fontFamily="montserrat"
            className="text-[44px] font-semibold leading-[1.6em] text-center mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
          >
            Thank you and welcome aboard!
          </Typography>

          <Divider
            color="primary"
            alignment="left"
            margin="my-5"
            responsiveClassName='768px:text-left 768px:mx-0'
          />


          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                The next step we require is your personal particulars for our Austrac
            &apos;Know Your Customer&apos; (KYC) compliance. Information required by Austrac
            includes details like your organisation structure, your key personnel, and
            your registration details as recorded with ASIC.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                This is an automated process that will interact and update the information
            that you provide with the information currently stored in our database.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                We understand that this can be a time consuming exercise, but please be
            aware that our organisation has legal obligations under the Australian
            Transaction Reports and Analysis Centre (AUSTRAC) legislation and this
            information is required.
          </Typography>
          <Typography
            as="h3"
            fontFamily="montserrat"
            className="text-[44px] font-semibold leading-[1.6em] text-center mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0 mt-6"
          >
            Who is <span>Austrac?</span>
          </Typography>

          <Divider
            color="primary"
            alignment="left"
            margin="my-5"
            responsiveClassName='768px:text-left 768px:mx-0'
          />

          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                   Austrac is Australia&apos;s anti money laundering and counter-terrorism
            financing regulator and specialist financial intelligence unit. Austrac
            works collaboratively with Australian industries and businesses in their
            compliance with anti-money laundering and counter-terrorism financing
            legislation.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                   As Australia&apos;s financial intelligence unit, Austrac contributes to
            investigative and law enforcement work to combat financial crime and
            prosecute criminals in Australia and overseas.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                   All cash in transit business must have internal AML compliance programs
            (such as ours below) that verify the identity of customers. Businesses
            that breach the laws can be fined $11 million, while individuals within
            the company can face penalties of up to $2.2 million.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >                   For more information on Austrac and the Anti Money Laundering &amp;
            Counter Terrorism Financing Act 2006, please visit their website by
            clicking www.austrac.gov.au (a separate window will open so you will not
            loose this page).
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light flex flex-col gap-4"
          >                <span>   To learn more about how we manage information provided you can view our{" "}
              <Link className="text-primary hover:underline" href="https://www.securecash.com.au/privacy-policy/">Privacy Policy</Link>.</span>
            <strong>
              <Link className="text-primary hover:underline" href="https://www.securecash.com.au/terms/">&lt;&lt; Previous</Link>
            </strong>
          </Typography>
        </div>

        <div className="[flex:1]">
          <QuoteForm />

</div>

      </div>
    </div>
  );
};

export default FormSection;
