"use client";
import React, { useState } from "react";
import "@slightlyoff/lite-vimeo";
import Link from "next/link";
import Image from "next/image";
import ScrollableSection from "./ui/scrollable-section/ScrollableSection";
import SubHeading from "./common/SubHeading";
import Divider from "./common/Divider";
import Paragraph from "./common/Paragraph";
import ScrollSection from "./ScrollSection";
import Heading from "./common/Heading";

const servicesData = [
  {
    id: 1,
    title: "Cash Collection Services",
    icon: "https://www.securecash.com.au/images/contentpageicons/cashcollection.png",
    description:
      'Our plain clothes staff will visit your premises at an agreed time, pick up and secure your takings, drive them to your bank in one of our unmarked vehicles and deposit them in your account. At a later time, we will deliver the bank deposit records back to your office. We call this our "Banking Courier Service" and we can collect your cash takings (including cheques) any hour or any day or night. That includes weekends and public holidays because our number one priority is ensuring the cash security of our clients.',
  },
  {
    id: 2,
    title: "Cash Delivery Services",
    icon: "https://www.securecash.com.au/images/contentpageicons/cashdelivery.png",
    description:
      'When you want cash delivered to your organisation, just order our cash delivery service. We call it a "Change Order Service" because often our clients are ordering small change to meet their trading needs. So we pick up the needed amount of change, in whatever denominations you require.',
  },
  {
    id: 3,
    title: "Cash Counting Services",
    icon: "https://www.securecash.com.au/images/cashcounting.png",
    description:
      "If you don't want your staff to have to deal with counting the takings, our cash counting service can assist. We collect your cash and count it before depositing it into your bank account.",
  },
];

const Welcome = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className=" w-full bg-content-bg bg-no-repeat bg-center inline-block 992px:mt-[47px]">
      <div className="w-full max-w-[1366px] mx-auto">
        <div
          id="content"
          className=" min-h-[400px] w-full 992px:w-auto mx-auto pt-0"
        >
          <div className="center-content pb-0 block w-[82%] 768px:[80%] 992px:w-[70%] mx-auto mb-[40px] 992px:mb-0">
            <SubHeading
              as="h4"
              fontSize="32px"
              fontWeight="normal"
              lineHeight="1em"
              textAlign="center"
              marginBottom="24px"
              className="mx-auto"
            >
              Welcome to
            </SubHeading>

            <Image
              src="/images/SecureCash.webp"
              alt="SecureCash Logo"
              width={320}
              height={0}
              className=" h-auto block mx-auto"
            />
            <Divider
              color="primary"
              width="100px"
              margin="mt-[16px] mb-[40px]"
              alignment="center"
              responsiveStyles="414px:my-[24px]"
            />

            <Paragraph
              fontSize="16px"
              lineHeight="2rem"
              textAlign="center"
              marginBottom="12px"
              marginTop="16px"
              responsiveClassName="992px:text-center 480px:mb-0"
            >
              Do you need cash in transit services? SecureCash specialises in
              picking up your money and banking it. Wherever you are, anywhere
              in Australia, any time of the day or night, seven days a week, we
              can collect your takings and deposit them at your bank. Whether
              you need cash collection, cash counting, or cash delivery,
              SecureCash has got you covered.&nbsp;
            </Paragraph>
          </div>
          <div className="content-columns pt-0 block text-left mt-[40px] 768px:mt-0 992px:w-[95%] 992px:mx-auto 1366px:w-full 992px:flex 992px:pt-[100px] items-center">
            <div className="leftside-column mb-[40px] 992px:mb-0 text-left w-full 992px:w-1/2 p-0 mx-auto my-0 pl-0 ">
              <ScrollableSection
                className=" h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-[290px] 1024px:h-[290px] 1200px:h-[320px] 1366px:h-[390px] bg-white 992px:px-[40px] "
                style={{ direction: "rtl" }}
              >
                <div
                  className="scrollable-content my-2"
                  style={{ direction: "ltr" }}
                >
                  <Heading
                    as="h3"
                    fontWeight="bold"
                    fontSize="22px"
                    lineHeight="22px"
                    textAlign="center"
                    marginBottom="40px"
                    responsiveClassName="480px:text-[26px] 992px:text-left 768px:mb-[48px] 768px:leading-[1.6rem]"
                  >
                    Our Cash In Transit Services
                  </Heading>

                  <Paragraph
                    fontSize="16px"
                    lineHeight="2rem"
                    textAlign="left"
                    marginBottom="32px"
                    marginTop="24px"
                    responsiveClassName="768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left"
                  >
                    What cash in transit service does your business need? As one
                    of the largest and most respected cash logistics companies
                    in Australia, SecureCash can serve your specific needs, we
                    provide:&nbsp;
                    <button
                      className={`read-more-link inline 768px:hidden ${
                        isExpanded && "hidden"
                      } text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline`}
                      onClick={toggleContent}
                    >
                      Read More
                    </button>
                  </Paragraph>

                  <ScrollSection
                    isExpanded={isExpanded}
                    scrollData={servicesData}
                    toggleContent={toggleContent}
                  />
                </div>
              </ScrollableSection>
            </div>
            <div className="rightside-column pb-0 float-none w-full 992px:w-1/2 p-0 mx-auto my-0 992px:pb-0">
              <lite-vimeo videoid="312442368"></lite-vimeo>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
