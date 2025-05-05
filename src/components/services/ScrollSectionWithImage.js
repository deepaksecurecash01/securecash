import React from "react";
import ScrollableSection from "../layout/ScrollbarSection";
import Typography from "../common/Typography";
import Divider from "../common/Divider";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';

const ScrollSectionWithImage = ({
  contentItems,
  imageUrl,
  height,
  contactInfo,
  ctaText,
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
    <div id="faq" className="inline-block w-full">
      <div
        className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex"
        style={{
          "--scroll-height": "545px",
        }}
      >
        {/* Left Side - Image with Overlay */}
        <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-start 992px:float-left">
          <div className="cta-box relative  992px:w-[90%]">
            <img
              className="backdraft h-full w-full object-cover object-left"
              src={imageUrl}
              alt="Australia Cash in Transit Services"
            />
            <div className="absolute top-0 right-0 h-[80%] w-[70%] bg-black px-[30px] flex flex-col justify-center py-[30px]">
              <Typography
                as="h4"
                fontFamily="font-montserrat"
                className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px]  992px:leading-[48px] font-bold text-white text-center 992px:text-left mb-0"
              >
                {ctaText ? ctaText : "Why Choose SecureCash for Your Business?"} 
              </Typography>
              <Divider
                color="white"
                margin="mt-[20px]"
                alignment="left"
                responsiveClassName="992px:mx-0 992px:text-left w-[100px] ml-0"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="flex flex-grow justify-center items-center w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]">
          <ScrollableSection className="h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2] 992px:pr-[90px]">
            <div style={{ direction: "ltr" }}>
              <ul className="list-none w-full" id="scroll-content">
                {contentItems.map((item, index) => (
                  <li key={index}>
                    {item.title && (
                      <div className=" flex flex-row justify-start items-center gap-4">
                        {item.icon && (
                          <Image
                            className="icon-data h-[40px] w-auto"
                            src={item.icon}
                            alt={item.title.toLowerCase()}
                            width={40}
                            height={40}
                          />
                        )}
                        <Typography
                          as="h4"
                          fontFamily="font-montserrat"
                          className={`text-[22px] ${item.icon ? "600px:text-[20px]" : "600px:text-[26px]"} leading-[30px] 600px:leading-[1.6em] w-[80%] mx-auto font-bold text-[#000] text-center 992px:text-left 768px:mt-2.5 mb-[20px] 992px:w-full ${index === 0 ? '768px:mt-2.5' : ' 768px:mt-8'
                            }`}
                        >
                          {item.title}
                        </Typography>
                      </div>
                    )}

                    {item.details.map((paragraph, paragraphIndex) => (
                      <div
                        key={paragraphIndex}
                        className={`text-justify 768px:text-start font-light leading-[2rem] mt-2.5 414px:pr-0 ${paragraphIndex === item.details.length - 1 ? 'mb-0' : 'mb-8'
                          }`}
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
      </div>
    </div>
  );
};

export default ScrollSectionWithImage;
