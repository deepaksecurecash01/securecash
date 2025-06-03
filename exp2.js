'use client';
import React from "react";
import ScrollableSection from "../layout/ScrollbarSection";
import Typography from "../common/Typography";
import Divider from "../common/Divider";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';

const ScrollSectionWithImage = ({
    contentItems = [],
    imageUrl,
    ctaText = "Why Choose SecureCash for Your Business?",
}) =>
{

    // Simple text extraction utility
    const extractTextContent = (children) =>
    {
        if (!children?.length) return "";

        return children
            .map(child =>
            {
                if (child.type === "text") return child.data;
                if (child.type === "tag" && child.children) {
                    return child.children.filter(c => c.type === "text").map(c => c.data).join("");
                }
                return "";
            })
            .join("");
    };

    // Link replacement for html-react-parser
    const replaceLinks = (node) =>
    {
        if (node.type !== "tag" || node.name !== "a") return;

        const { href, class: className, target, rel, ...rest } = node.attribs;
        const linkText = extractTextContent(node.children);
        const isExternal = href.startsWith("tel:") || href.startsWith("http");

        const LinkComponent = isExternal ? "a" : Link;

        return (
            <LinkComponent
                href={href}
                className={className}
                target={target}
                rel={rel}
                {...rest}
            >
                {linkText}
            </LinkComponent>
        );
    };

    return (
        <div id="faq" className="inline-block w-full relative">
            {/* Background Elements */}
            <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10" />
            <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10" />

            <div
                className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex"
                style={{ "--scroll-height": "545px" }}
            >
                {/* Image Section */}
                <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 992px:flex justify-start 992px:float-left">
                    <div className="cta-box relative 992px:w-[90%]">
                        <img
                            className="backdraft h-full w-full object-cover object-left"
                            src={imageUrl}
                            alt="Australia Cash in Transit Services"
                        />
                        <div className="absolute top-0 right-0 h-[80%] w-[70%] bg-black px-[30px] flex flex-col justify-center py-[30px]">
                            <Typography
                                as="h4"
                                fontFamily="font-montserrat"
                                className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px] 992px:leading-[48px] font-bold text-white 992px:text-left mb-0"
                            >
                                {ctaText}
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

                {/* Content Section */}
                <div className="flex flex-grow justify-center items-center w-full 992px:w-1/2 1024px:bg-white mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]">
                    <ScrollableSection className="h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full leading-[2] 992px:pr-[60px]">
                        <div style={{ direction: "ltr" }}>
                            <ul className="list-none w-full" id="scroll-content">
                                {contentItems.map((item, index) => (
                                    <li key={index}>
                                        {item.title && (
                                            <Typography
                                                as="h4"
                                                fontFamily="font-montserrat"
                                                className={`
                          ${item.icon
                                                        ? "600px:text-[20px] flex flex-row justify-start items-center gap-2 768px:gap-2 text-[20px] mb-4"
                                                        : "mb-5 768px:w-[80%] 600px:text-[26px] text-center text-[22px]"
                                                    }
                          leading-[30px] 600px:leading-[1.6em] mx-auto font-bold text-[#000] 992px:text-left 992px:w-full
                          ${index === 0 ? '768px:mt-2.5' : 'mt-7'}
                        `}
                                            >
                                                {item.icon && (
                                                    <Image
                                                        className="icon-data h-[40px] w-auto"
                                                        src={item.icon}
                                                        alt={item.title.toLowerCase()}
                                                        width={40}
                                                        height={40}
                                                    />
                                                )}
                                                {item.title}
                                            </Typography>
                                        )}

                                        {item.details?.map((paragraph, paragraphIndex) =>
                                        {
                                            // SOLUTION: Add first/last classes directly here
                                            const isFirst = index === 0 && paragraphIndex === 0;
                                            const isLast = index === contentItems.length - 1 &&
                                                paragraphIndex === item.details.length - 1;

                                            return (
                                                <div
                                                    key={paragraphIndex}
                                                    className={`
                            text-justify 768px:text-start font-light leading-[2rem] 414px:pr-0 testing
                            ${paragraphIndex === item.details.length - 1 ? 'mb-0' : 'mb-5'}
                            ${isFirst ? 'first-services-content' : ''}
                            ${isLast ? 'last-services-content' : ''}
                          `}
                                                >
                                                    {parse(paragraph, { replace: replaceLinks })}
                                                </div>
                                            );
                                        })}
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