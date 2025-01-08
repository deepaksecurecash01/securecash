"use client";
import React, { useState } from "react";
import "@slightlyoff/lite-vimeo";
import ScrollableSection from "../ui/scrollable-section/ScrollableSection";
const Welcome = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State for showing/hiding content

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      id="welcome"
      className=" w-full bg-content-bg bg-no-repeat bg-center inline-block 992px:mt-[47px]"
    >
      <div className="w-full max-w-[1366px] mx-auto">
        <div
          id="content"
          className=" min-h-[400px] w-full 992px:w-auto mx-auto pt-0"
        >
          <div className="center-content pb-0 block w-[82%] 768px:[80%] 992px:w-[70%] mx-auto mb-[40px] 992px:mb-0">
            <h4
              className="header-times font-prata text-[32px] font-normal mb-4 leading-[1em]"
              style={{ textAlign: "center" }}
            >
              Welcome to
            </h4>
            <img
              src="https://www.securecash.com.au/images/SecureCash.png"
              alt="SecureCash"
              id="content-logo"
              className="block mx-auto"
            /> 
            <hr className="divider-2 divider-gold divider-bottom h-[4px] mb-[40px] border-0 mt-[16px] w-[100px] 414px:my-[24px] rounded-[5px] bg-primary text-center mx-auto" />
            <p
              id="header-content"
              className=" font-montserrat font-light text-[16px] leading-8 text-justify 992px:text-center mb-3 480px:mb-0 mt-4 mx-0 my-0"
            >
              Do you need cash in transit services? SecureCash specialises in
              picking up your money and banking it. Wherever you are, anywhere
              in Australia, any time of the day or night, seven days a week, we
              can collect your takings and deposit them at your bank. Whether
              you need cash collection, cash counting, or cash delivery,
              SecureCash has got you covered.&nbsp;
            </p>
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
                  <h3 className=" font-montserrat font-bold text-[22px] 480px:text-[26px] leading-[22px] text-center 992px:text-left mb-[40px] 768px:mb-[48px] 768px:leading-[1.6rem]">
                    Our Cash In Transit Services
                  </h3>
                  <p className=" font-montserrat font-light text-[16px] leading-8 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left text-left mb-0 mt-4 mx-0">
                    What cash in transit service does your business need? As one
                    of the largest and most respected cash logistics companies
                    in Australia, SecureCash can serve your specific needs, we
                    provide:{" "}
                    <a
                      className={`read-more-link inline 768px:hidden ${
                        isExpanded && "hidden"
                      } text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline`}
                      onClick={toggleContent}
                    >
                      Read More
                    </a>
                  </p>
                  <div
                    id="intro-more-content"
                    className={`${
                      isExpanded == true ? "block" : "hidden"
                    } 768px:block`}
                  >
                    <div className="item-box w-full clear-both mx-auto text-left mt-[40px] 768px:mt-0">
                      <div className="p-header flex flex-row justify-start items-center mb-[16px] mt-[30px] 768px:mt-[50px] text-[22px] font-montserrat font-semibold">
                        <img
                          className="icon-service h-[40px] pr-2.5 480px:pr-[16px] w-auto"
                          src="https://www.securecash.com.au/images/contentpageicons/cashcollection.png"
                          alt="cash collection"
                        />
                        <h4 className=" mb-0 text-[18px] 768px:text-[24px]">
                          Cash Collection Services
                        </h4>
                      </div>
                      <p className=" font-montserrat font-light text-[16px] leading-8 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left text-left mb-0 mt-4 mx-0">
                        Our plain clothes staff will visit your premises at an
                        agreed time, pick up and secure your takings, drive them
                        to your bank in one of our unmarked vehicles and deposit
                        them in your account. At a later time, we will deliver
                        the bank deposit records back to your office. We call
                        this our &quot;Banking Courier Service&quot; and we can
                        collect your cash takings (including cheques) any hour
                        or any day or night. That includes weekends and public
                        holidays because our number one priority is ensuring the
                        cash security of our clients.
                      </p>
                    </div>
                    <div className="item-box w-full clear-both mx-auto text-left mt-[40px] 768px:mt-0">
                      <div className="p-header flex flex-row justify-start items-center mb-[16px] mt-[50px] text-[22px] font-montserrat font-semibold">
                        <img
                          className="icon-service h-[40px] pr-2.5 480px:pr-[16px] w-auto"
                          src="https://www.securecash.com.au/images/contentpageicons/cashdelivery.png"
                          alt="cash collection"
                        />
                        <h4 className=" mb-0 text-[18px] 768px:text-[24px]">
                          Cash Delivery Services
                        </h4>
                      </div>
                      <p className=" font-montserrat font-light text-[16px] leading-8 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left text-left mb-0 mt-4 mx-0">
                        When you want cash delivered to your organisation, just
                        order our cash delivery service. We call it a
                        &quot;Change Order Service&quot; because often our
                        clients are ordering small change to meet their trading
                        needs. So we pick up the needed amount of change, in
                        whatever denominations you require.
                      </p>
                    </div>
                    <div className="item-boxw-full clear-both mx-auto text-left mt-[40px] 768px:mt-0">
                      <div className="p-header flex flex-row justify-start items-center mb-[16px] mt-[50px] text-[22px] font-montserrat font-semibold">
                        <img
                          className="icon-service h-[40px] pr-2.5 480px:pr-[16px] w-auto"
                          src="https://www.securecash.com.au/images/cashcounting.png"
                          alt="cash collection"
                        />
                        <h4 className=" mb-0 text-[18px] 768px:text-[24px]">
                          Cash Counting Services
                        </h4>
                      </div>
                      <p className=" font-montserrat font-light text-[16px] leading-8 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left text-left mb-0 mt-4 mx-0">
                        If you don&apos;t want your staff to have to deal with
                        counting the takings, our cash counting service can
                        assist. We collect your cash and count it before
                        depositing it into your bank account.{" "}
                        <a
                          className="read-more-link inline 768px:hidden  text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline"
                          onClick={toggleContent}
                        >
                          Show Less
                        </a>
                      </p>
                    </div>
                  </div>
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
