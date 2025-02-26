import React from "react";
import Container from "../layout/Container";
import Divider from "../common/Divider";
import Paragraph from "../common/Paragraph";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Heading from "../common/Heading";

const AboutusSection = () =>
{
  const sectionContent = [
    "We are a courier business that specialises in the pickup and banking of your daily takings in serial numbered, tamper-evident satchels, anywhere, anytime regardless of where your business is located in Australia.",
    "Our staff will then collect these satchels and deliver them to the bank, allowing you to concentrate 100% on your business.",
    "You can bank as little, or as much as you require, and even choose what day or days you need your banking collected, even if it is just once a week or on an 'ad-hoc' basis, we don't lock you into any contracts so you are free to have complete flexibility with your services.",
    "We pride ourselves on providing a safe, reliable and affordable service to all customers. We can cater for any scenario, whether you would like services for your business during business hours or need a collection for your festival on a Saturday night, get in touch with us and find out more about how we can assist you.",
    "Our customers choose us for many good reasons: we provide professional cash transport solutions, we help reduce cash handling risks, and we offer the most affordable services.",
  ];
  return (
    <div
      className="mt-0 h-auto py-0 bg-none 480px:bg-quote-header bg-no-repeat bg-cover 480px:bg-contain w-full  480px:h-full about-us-section 600px:pt-10 pb-[16px] flex"
      id="about-us-section-help"
    >
      <Container className="section-col relative h-full 600px:h-[calc(342px+80px)] 768px:h-[500px] 1200px:h-full flex flex-col mt-0  600px:flex-row w-full  1024px:w-[95%] 1440px:w-full">
        <div className="section-content-wrapper w-full h-full flex flex-col justify-end ">
          <img
            src="https://www.securecash.com.au/images/about-us-images/img-sec-2.png"
            alt="Secure Cash Logo Over Office"
            width={713}
            height={636}
            className="w-full 1200px:w-auto h-[calc(100%-68px)] "
          />
        </div>
        <div className="section-content-wrapper w-full flex flex-col justify-start  768px:justify-end">
          <div className="content h-full flex flex-col self-end  1200px:max-h-[calc(636px-56px)]">
            <div className="section-header px-10 600px:px-6 py-[18px]  relative  600px:absolute 1200px:relative  600px:top-[30px] right-0  w-auto 768px:top-0  768px:px-8  768px:py-10 bg-[#000000] items-end justify-center text-[#ffffff] m-0 flex flex-col text-right  ">
              <Divider
                color="primary"
                alignment="left"
                margin="m-0"
                responsiveClassName="768px:text-left 768px:mx-0 hidden 1200px:block"
              />
              <Heading
                as="h3"
                color=""
                fontWeight="bold"
                fontSize="32px"
                lineHeight="1.4em"
                marginBottom="8px"
                textAlign="center"
                className=""
                responsiveClassName="text-[32px] 768px:text-right 1200px:pl-[46px] 1366px:pl-[56px] 768px:text-[40px] 1200px:mt-6 1200px:mb-2"
              >
                How SecureCash will help you
              </Heading>
            </div>

            <ScrollableSection className=" h-auto  600px:mt-[120px] 768px:mt-[142px]  bg-white pt-8 600px:pt-5 pb-4 px-8 mx-2  1200px:mt-2.5  leading-[2]">
              <ContentScroll sectionContent={sectionContent} />
            </ScrollableSection>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutusSection;
