import React from "react";
import Divider from "../common/Divider";
import ScrollableSection from "../layout/ScrollbarSection";
import Typography from "../common/Typography";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

const SectionWrapper = ({
  heading,
  description,
  contentItems,
  contactInfo,
  imageUrl,
}) =>
{
  // This is the key function that needs fixing
  const replaceLinks = (node) =>
  {
    if (node.type === "tag" && node.name === "a") {
      const { href, class: className, target, rel, ...rest } = node.attribs;

      // Extract the text content from children
      let linkText = "";
      if (node.children && node.children.length > 0) {
        // Extract text content from the children
        linkText = node.children
          .map(child =>
          {
            if (child.type === "text") {
              return child.data;
            } else if (child.type === "tag") {
              // For tags like <strong>, <em>, etc.
              return child.children
                ? child.children.map(c => c.type === "text" ? c.data : "").join("")
                : "";
            }
            return "";
          })
          .join("");
      }

      // For tel: links or external links, we keep using the <a> tag
      if (
        href.startsWith("tel:") ||
        href.startsWith("http") ||
        href.startsWith("https")
      ) {
        return (
          <a
            href={href}
            className={className}
            target={target}
            rel={rel}
            {...rest}
          >
            {/* Use the extracted text directly */}
            {linkText}
          </a>
        );
      }

      // For internal links, use Next.js Link component
      return (
        <Link
          href={href}
          className={className}
          target={target}
          rel={rel}
          {...rest}
        >
          {/* Use the extracted text directly */}
          {linkText}
        </Link>
      );
    }
  };

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10"></div>
      <div className="absolute inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10"></div>

      {/* Header Section */}
      <div
        id="intro"
        className="max-w-[1366px] mx-auto flex flex-col px-5 justify-center items-center"
      >
        <h2 className="montBold text-[22px] leading-[30px] 768px:text-[34px] font-bold text-center mx-auto 768px:leading-[45px] max-w-[80%] text-black">
          {heading}
        </h2>
        <Divider
          color="primary"
          margin="my-[24px]"
          alignment="left"
          responsiveClassName="992px:mx-0 992px:text-left w-[100px] 480px:mb-0 480px:mt-5"
        />
        <div className="content-wrapper w-4/5 768px:mt-12 p-0">
          <div id="intro-text" className="bg-white 768px:bg-inherit">
            <p
              className="text-[16px] font-light leading-[2em] text-center 768px:mt-4 m-0 text-black "
            >
              {parse(description, { replace: replaceLinks })}
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]"></div>

      {/* FAQ and CTA Section */}
      <div id="faq" className="inline-block w-full">
        <div
          className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex"
          style={{
            "--scroll-height": "770px",
          }}
        >
          {/* Scrollable Content Area */}
          <div className="flex flex-grow justify-center items-center w-full 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-0 [flex:1]">
            <ScrollableSection
              className="h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2] 992px:px-[10%]"
              style={{ direction: "rtl" }}
            >
              <div style={{ direction: "ltr" }}>
                <ul className="list-none w-full" id="scroll-content">
                  {contentItems.map((item, index) => (
                    <li key={index}>
                      {item.title && (
                        <div className=" flex flex-row justify-start items-center gap-3">
                          {item.icon && (
                            <Image
                              className="icon-data h-[40px] pr-2.5 480px:pr-[16px] w-auto"
                              src={item.icon}
                              alt={item.title.toLowerCase()}
                              width={40}
                              height={40}
                            />
                          )}
                          <Typography
                            as="h4"
                            fontFamily="font-montserrat"
                            className="text-[22px] 600px:text-[26px] leading-[30px] 600px:leading-[1.6em] w-[80%] mx-auto font-bold text-[#000] text-center 992px:text-left 768px:mt-2.5 mb-[20px] 992px:w-full"
                          >
                            {item.title}
                          </Typography>
                        </div>
                      )}

                      {item.details.map((paragraph, paragraphIndex) => (
                        <div
                          key={paragraphIndex}
                          className="text-justify 768px:text-start font-light leading-[2rem] mt-2.5 414px:pr-0 mb-8"
                        >
                          {parse(paragraph, { replace: replaceLinks })}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollableSection>
          </div>

          {/* CTA Image Section */}
          <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-start 992px:float-right pt-6">
            <div className="cta-box relative w-full">
              <img
                className="backdraft h-[540px] 414px:h-[580px] w-full 992px:h-full object-cover"
                src={imageUrl}
                alt="Australia Cash in Transit Services"
              />
              <div className="absolute top-0 left-0 w-[70%] 480px:w-[60%] h-full bg-black px-[30px] flex flex-col justify-center">
                <Typography
                  as="h4"
                  fontFamily="font-montserrat"
                  className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px]  992px:leading-[48px] font-bold text-white text-center 992px:text-left mb-0"
                >
                  What Type of Service Do You Need?
                </Typography>
                <Divider
                  color="white"
                  margin="my-6"
                  alignment="center"
                  responsiveClassName="992px:mx-0 992px:text-left w-[100px]"
                />
                <Typography
                  as="p"
                  fontFamily="font-montserrat"
                  className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center 992px:text-left mt-4 pb-3"
                >
                  Let&apos;s start discussing
                  <br />
                  your options.
                </Typography>

                <Typography
                  as="p"
                  fontFamily="font-montserrat"
                  className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center 992px:text-left mt-4 pb-3"
                >
                  <strong>Call us</strong> at{" "}
                  <a
                    href="tel:1300732873"
                    className="text-primary hover:underline"
                  >
                    1300 SECURE
                  </a>
                </Typography>
                <Typography
                  as="p"
                  fontFamily="font-montserrat"
                  className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3"
                >
                  or
                </Typography>
                <Link href="/quote" className="w-full mt-[18px]">
                  <div className="flex flex-row justify-center items-center min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 768px:w-full 768px:min-h-[55px] 1070px:mt-0 max-h-[73px] group 768px:mx-auto 992px:mx-0">
                    <p className="m-0 p-0 text-[14px] 768px:text-base font-semibold w-full group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
                      Get a Quote Now!
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;