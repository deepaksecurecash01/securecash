import React from "react";
import Link from "next/link";
import AustracForm from "@/components/common/forms-new/forms/AustracForm";

const FormSection = () =>
{
  return (
    <section
      id="content-contact"
      className="bg-content-bg bg-center bg-no-repeat bg-cover inline-block w-full 992px:my-[40px] 1280px:my-[84px]"
      aria-labelledby="austrac-heading"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex items-center">
        <div className="right-contact-row mb-20 w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1] 992px:pl-8">
          <h2
            id="austrac-heading"
            className="text-[22px] mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0 font-montserrat"
          >
            Thank you and welcome aboard!
          </h2>

          <hr
            className='h-[4px] rounded-[5px] border-0 bg-primary w-[100px] my-5 text-left mx-0'
            aria-hidden="true"
          />

          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            The next step we require is your personal particulars for our Austrac
            &apos;Know Your Customer&apos; (KYC) compliance. Information required by Austrac
            includes details like your organisation structure, your key personnel, and
            your registration details as recorded with ASIC.
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            This is an automated process that will interact and update the information
            that you provide with the information currently stored in our database.
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            We understand that this can be a time consuming exercise, but please be
            aware that our organisation has legal obligations under the Australian
            Transaction Reports and Analysis Centre (AUSTRAC) legislation and this
            information is required.
          </p>

          <h3
            className="text-[22px] mt-10 font-semibold text-left leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0 font-montserrat"
          >
            Who is <span className="uppercase">Austrac?</span>
          </h3>

          <hr
            className='h-[4px] rounded-[5px] border-0 bg-primary w-[100px] my-5 text-left mx-0'
            aria-hidden="true"
          />

          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            Austrac is Australia&apos;s anti money laundering and counter-terrorism
            financing regulator and specialist financial intelligence unit. Austrac
            works collaboratively with Australian industries and businesses in their
            compliance with anti-money laundering and counter-terrorism financing
            legislation.
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            As Australia&apos;s financial intelligence unit, Austrac contributes to
            investigative and law enforcement work to combat financial crime and
            prosecute criminals in Australia and overseas.
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            All cash in transit business must have internal AML compliance programs
            (such as ours below) that verify the identity of customers. Businesses
            that breach the laws can be fined $11 million, while individuals within
            the company can face penalties of up to $2.2 million.
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
          >
            For more information on Austrac and the Anti Money Laundering &amp;
            Counter Terrorism Financing Act 2006, please visit their website by
            clicking www.austrac.gov.au (a separate window will open so you will not
            loose this page).
          </p>
          <p
            className="text-[16px] leading-[2rem] text-left
            768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light flex flex-col gap-4 font-montserrat"
          >
            <span>
              To learn more about how we manage information provided you can view our{" "}
              <Link className="text-primary hover:underline" href="/privacy-policy/">Privacy Policy</Link>.
            </span>
            <strong>
              <Link className="text-primary hover:underline" href="/terms/">&lt;&lt; Previous</Link>
            </strong>
          </p>
        </div>

        <div className="[flex:1] mb-20">
          <AustracForm />
        </div>
      </div>
    </section>
  );
};

export default FormSection;