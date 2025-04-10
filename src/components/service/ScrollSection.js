import React from "react";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../common/Typography";
import Link from "next/link";
import Divider from "../common/Divider";
import ImageSection from "./ImageSection";

const ScrollSection = ({
    contentItems,
    imgSrc,
    height,
    imagePosition = "left",
    contactInfo
}) =>
{
    console.log(contentItems);
    const isLeft = imagePosition === "left";

    return (
        <div id="faq" className="inline-block w-full">
            <div
                className={`scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex`}
                style={{
                    "--scroll-height": height,
                }}
            >
             
                            <div className="flex flex-grow justify-center items-center w-full 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-0 [flex:1]">
                                <ScrollableSection
                                    className={`h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2] 1024px:px-[10%]`}
                                    style={{ direction: "rtl" }}
                                >
                                    <div style={{ direction: "ltr" }}>
                                        <ContentScroll scrollData={contentItems} />
                                        <div dangerouslySetInnerHTML={{ __html: contactInfo }}
                                        />      </div>
                                </ScrollableSection>
                            </div>
                        <ImageSection imgSrc={imgSrc} imagePosition={imagePosition} />

            </div>
        </div>
    );
};




export default ScrollSection;
