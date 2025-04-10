import React from "react";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../common/Typography";
import Link from "next/link";
import Divider from "../common/Divider";
import ImageSection from "./ImageSection";

const ScrollSection2 = ({
    contentItems,
    imgSrc,
    contactInfo
}) =>
{



    return (
        <div id="faq" className="inline-block w-full">
            <div
                className={`scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex`}
                style={{
                    "--scroll-height": '545px',
                }}
            >
       
                        <ImageSection imgSrc={imgSrc} imagePosition={imagePosition} />
                        <ContentSection
                            contentItems={contentItems}
                            imagePosition={imagePosition}
                            contactInfo={contactInfo}

                        />
                  
            </div>
        </div>
    );
};

const ContentSection = ({
    contentItems,
    imagePosition,
    contactInfo
}) =>
{
    console.log(contentItems);
    return (
        <div className="flex flex-grow justify-center items-center w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]">
            <ScrollableSection
                className={` h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2]
        1024px:pr-[90px]`}
                style={imagePosition === "right" ? { direction: "rtl" } : {}}
            >
                <div style={{ direction: "ltr" }}>
                    <ul className="list-none w-full" id="scroll-content">
                        {contentItems.map((item, index) => (
                            <li key={index}>
                                <div className="flex items-center gap-3">

                                    <Typography
                                        as="h4"
                                        fontFamily="font-montserrat"
                                        className="text-[22px] 600px:text-[26px] leading-[30px] 600px:leading-[1.6em] w-[80%] mx-auto font-bold text-[#000] text-center  768px:mt-2.5 mb-[20px]  992px:w-full"
                                    >
                                        {item.title}
                                    </Typography>
                                </div>

                                {item.details.map((paragraph, paragraphIndex) => (
                                    <div
                                        key={paragraphIndex}
                                        className="text-justify font-light leading-[2rem] mt-2.5 414px:pr-0 mb-8"
                                        dangerouslySetInnerHTML={{ __html: paragraph }}
                                    />

                                ))}
                            </li>
                        ))}
                    </ul>  <div
                        dangerouslySetInnerHTML={{
                            __html: contactInfo, // Correct syntax for dangerouslySetInnerHTML
                        }}
                    />
                </div>
            </ScrollableSection>
        </div>
    );
};


export default ScrollSection2;
