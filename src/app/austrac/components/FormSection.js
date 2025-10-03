import React from "react";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

import Link from "next/link";
import AustracForm from "@/components/common/forms-new/forms/AustracForm";

const FormSection = () =>
{
  const contentItems = [
    {
      title: "Plain clothes",
      content:
        "Our couriers do not wear security uniforms. This is so they blend in with the crowd. It is to avoid drawing any attention to your business (or your staff or your customers) during the cash handling process. Unmarked vehicles: The same concern underpins our decision to use regular-looking vehicles. To draw no attention to your business activities.",
    },
    {
      title: "No contracts",
      content:
        "Our focus is on delivering a reliable cash courier service that is affordably priced. We do not feel we need to lock our clients into contracts. So you can contact us on an 'as required' basis, you can cancel anytime with notice, or you can establish a regular schedule if you find our service works well for you. We think it will, by the way.",
    },
    {
      title: "Australia Wide",
      content:
        "Coast to coast, anywhere in Australia, we've got your cash security needs covered. With branches in Adelaide, Brisbane, Canberra, Melbourne, Perth, and Sydney and a network of licensed contractors covering the rest of the country, you can rely on SecureCash to get the job done.",
    },
    {
      title: "Anytime",
      content:
        "We don't keep 'office hours' because many of our clients don't either. Whatever you need, whenever you need it, we'll be there for you. After hours and public holidays included. Online bookings: You can use our website to manage your cash courier needs, 24x7. Make a booking, adjust your booking, cancel your booking. Do it all via your secure login at our website. Or you can phone us.",
    },
    {
      title: "Verify our couriers",
      content:
        "There is one feature of our website we want to be sure you know about. Anytime you want to, you can login to verify the ID of our banking courier who is handling your cash. It's all about giving you, our valued clients, peace of mind.",
    },
    {
      title: "Your peace of mind",
      content:
        "We want you to know you can trust us as we are an Australian owned and operated business. Affordable: We don't pay for expensive media advertising campaigns. And that helps us keep our pricing realistic. Phone us today to discuss your needs and learn how affordable our services are.",
    },
    {
      title: "We are specialists",
      content:
        "As a national courier company, we do one thing, and we do it well. We do 'cash in transit' - with all its permutations. Whatever your particular need, give us a call.",
    },
    {
      title: "Special events",
      content:
        "If your group is running a fundraiser or a fete or some other function that involves cash, you will be pleased to know you can order our service on a one-time basis. Tell us how much cash you need to be delivered before the big event, and tell us the closing time, and we'll be there to take care of you.",
    },
  ];
  return (
    <div
      id="content-contact"
      className=" bg-content-bg bg-center bg-no-repeat bg-cover inline-block w-full 992px:my-[40px]  1280px:my-[84px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex items-center">
        <div className="right-contact-row mb-20  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
          <Typography
            as="h3"
            fontFamily="montserrat"
            className="text-[22px] mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
          >
            Thank you and welcome aboard!
          </Typography>

          <hr
            className='h-[4px] rounded-[5px] border-0 bg-primary w-[100px] my-5 text-left mx-0'
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
            className="text-[22px] mt-10 font-semibold text-left leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
          >
            Who is <span className=" uppercase">Austrac?</span>
          </Typography>

          <hr
            className='h-[4px] rounded-[5px] border-0 bg-primary w-[100px] my-5 text-left mx-0'

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

        <div className="[flex:1] mb-20">
          <AustracForm />

        </div>

      </div>
    </div>
  );
};

export default FormSection;
