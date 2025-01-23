import React from "react";
import Divider from "@/components/common/Divider";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import SubHeading from "@/components/common/SubHeading";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";import QuoteForm from "@/components/common/forms/QuoteForm";

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
      className=" bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:mt-[40px]  1280px:mt-[84px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex">
        <QuoteForm />
        <div className="right-contact-row  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
          <SubHeading
            as="h3"
            fontWeight="regular"
            fontSize="32px"
            lineHeight="1.6em"
            textAlign="center"
            marginBottom="16px"
            responsiveClassName="992px:text-left"
          >
            Make The Right Choice
          </SubHeading>
          <Divider color="primary" margin=" mb-[24px]" alignment="left" />
          <Heading
            as="h2"
            color="#c7a652"
            fontWeight="bold"
            fontSize="40px"
            lineHeight="1.4em"
            textAlign="center"
            marginBottom="24px"
            responsiveClassName=" 992px:text-left"
          >
            Why Choose SecureCash?
          </Heading>
          <Paragraph
            lineHeight="2em"
            textAlign="center"
            marginBottom="14px"
            fontWeight="normal"
            responsiveClassName="768px:mb-0 992px:text-left "
          >
            For one reason: We have been established for over 25 years, since
            1992 to be exact!
          </Paragraph>
          <ScrollableSection className=" h-auto 414px:w-[85%] 992px:w-full p-0 mx-auto   992px:h-[630px] 1200px:h-[658px] 1366px:h-[740px] bg-white mt-6 leading-[2]">
            <ContentScroll scrollData={contentItems} />
          </ScrollableSection>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
