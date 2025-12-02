import React from "react";
import Container from "@/components/layout/Container";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import QuoteForm from "@/components/common/forms-new/forms/QuoteForm";

const QuoteContent = () =>
{
  return (
    <section id="quote-content" aria-labelledby="quote-heading">
      <Container id="quote-content-container" className="w-[95%] 1440px:w-full 992px:flex">
        <div id="quote-content-left" className="[flex-1] overflow-hidden">
          <div
            id="left-content-text-wrapper"
            className="px-3 py-[40px] flex flex-col mt-[250px] 1024px:mt-[360px] pb-[20px] pt-[54px]"
          >
            <div id="left-content-header-wrapper" className="mb-10">
              <h2
                id="quote-heading"
                className="mx-auto font-medium text-center text-[24px] 768px:text-[32px] 1100px:text-[36px] 1200px:text-[40px] mb-[8px] leading-[1.4em] -mt-[10px] font-montserrat"
              >
                Get in touch with our <br />
                Business Development Team
              </h2>
              <hr
                className="1024px:mt-0 mt-4 1024px:mb-6 w-[100px] h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
                aria-hidden="true"
              />
            </div>

            <div id="contact-info-wrapper" className="480px:flex 992px:pb-10">
              <div className="contact-info-item 768px:max-w-[50%]">
                <h3 className="mx-auto font-medium text-[24px] leading-[1.4em] flex items-center justify-center 992px:justify-start font-montserrat">
                  <FaMapMarkerAlt className="pr-2.5 text-[26px] relative inline text-primary" aria-hidden="true" />
                  Address
                </h3>
                <p className="text-center 992px:text-left font-light leading-[2em] mb-2 mt-2 font-montserrat">
                  Anywhere, Anytime, Australia Wide! No matter where you are
                  located in Australia we will be able to organise someone to
                  service your location.
                </p>
              </div>

              <div className="mid-row-divider-wrapper bg-transparent [flex-1] items-end flex ml-[16px] mr-[16px]" aria-hidden="true">
                <div className="mid-row-divider self-end bg-[#dddddd] w-px h-full"></div>
              </div>

              <div className="contact-info-item mt-8 480px:mt-0 768px:max-w-[50%]">
                <h3 className="mx-auto font-medium text-[24px] leading-[1.4em] flex items-center justify-center 992px:justify-start font-montserrat">
                  <FaEnvelope className="pr-2.5 text-[26px] relative inline text-primary" aria-hidden="true" />
                  Email Us
                </h3>
                <p className="text-center 992px:text-left font-light leading-[2em] mb-2 mt-2 font-montserrat">
                  You can reach our Business Development Team directly by
                  emailing{" "}
                  <strong>
                    <a
                      href="mailto:sales@securecash.com.au"
                      className="text-[#957433] hover:underline"
                    >
                      sales@securecash.com.au
                    </a>
                  </strong>
                </p>
              </div>
            </div>

            <div className="hidden 992px:block">
              <div id="note-wrapper" className="mb-4">
                <p className="mx-auto font-medium text-[20px] 1070px:text-[22px] 1200px:text-[24px] leading-[1.4em] text-center font-montserrat">
                  Would You Rather Talk To Us Over The Phone?
                </p>
                <p className="text-center font-light leading-[2em] mb-2 font-montserrat">
                  Request a call back at a time which is convenient for you!
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Link
                  href="/contact/#contact-form-section"
                  className="w-[200px] bg-[#c6a54b] text-white text-center cursor-pointer rounded-[40px] px-2 py-4 font-montserrat hover:bg-black transition-colors"
                  aria-label="Request a call back from our team"
                >
                  Request a Call Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="quote-content-right" className="[flex-1] overflow-visible">
          <QuoteForm className="mt-4" />
        </div>

        <div className="pt-10 w-[90%] mx-auto 480px:w-full 992px:hidden">
          <div id="note-wrapper" className="mb-4">
            <p className="mx-auto font-medium text-[20px] 1070px:text-[22px] 1200px:text-[24px] leading-[1.4em] text-center font-montserrat">
              Would You Rather Talk To Us Over The Phone?
            </p>
            <p className="text-center font-light leading-[2em] mb-2 font-montserrat">
              Request a call back at a time which is convenient for you!
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href="/contact/#contact-form-section"
              className="w-[200px] bg-[#c6a54b] text-white text-center cursor-pointer rounded-[40px] px-2 py-4 font-montserrat hover:bg-black transition-colors"
              aria-label="Request a call back from our team"
            >
              Request a Call Back
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuoteContent;