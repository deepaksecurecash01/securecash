import React from "react";
import Container from "../../../components/layout/Container";
import Divider from "../../../components/common/Divider";
import ScrollableSection from "../../../components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../../../components/common/Typography";

export const ServiceSection = ({
    title,
    imageUrl,
    imageAlt,
    imageWidth,
    imageHeight,
    sectionContent = [],
    imagePosition = "left",
    id,
    hasCTA = false
}) =>
{
    // Determine if image is on left or right
    const isImageLeft = imagePosition === "left";

    // Set order classes based on image position
    const firstSectionOrder = isImageLeft ? "" : "order-1 600px:order-2";
    const secondSectionOrder = isImageLeft ? "" : "order-2 600px:order-1";

    // Background and padding classes
    let bgClass = "";
    let paddingY = "";

    // Set bgClass and paddingY based on id using string includes instead of template literals
    if (id && id.includes("story")) {
        bgClass = "bg-[#dfdfdf]";
    } else {
        bgClass = "bg-quote-header";
    }

    if (id && id.includes("help")) {
        paddingY = "600px:pt-[87px] 600px:pb-[120px]";
    } else {
        paddingY = "600px:py-[120px]";
    }

    return (
        <section className=" overflow-hidden">
            <div
                id="headline-content"
                className={` w-full h-full pb-[16px] flex ${paddingY}`}
            >
                <div className=" bg-quote-header bg-no-repeat bg-cover 480px:bg-contain w-full h-full ">
                    <Container className="section-col inner relative h-full 600px:h-[calc(342px+80px)] 768px:h-[500px] 1200px:h-full flex flex-col mt-0 600px:flex-row w-full 1024px:w-[95%] 1440px:w-full">
                        <div className={`section-content-wrapper w-full h-full flex flex-col justify-end ${firstSectionOrder}`}>
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                width={imageWidth}
                                height={imageHeight}
                                className="w-full 1200px:w-auto h-[calc(100%-68px)]"
                            />
                        </div>
                        <div className={`section-content-wrapper w-full flex flex-col justify-start 768px:justify-end ${secondSectionOrder}`}>
                            <div className="content bg-white h-full flex flex-col self-end 1200px:max-h-[calc(600px-56px)]">
                                <div className="section-header px-10 600px:px-6 py-[18px] relative 600px:absolute 1200px:relative 600px:top-[30px] right-0 w-auto 768px:top-0 768px:px-8 768px:py-10 bg-[#000000] items-end justify-center text-[#ffffff] m-0 flex flex-col text-right">
                                    <Divider
                                        color="primary"
                                        alignment="right"
                                        className="w-[100px] m-0 768px:text-left 768px:mx-0 hidden 1200px:block divider-gold divider-2"
                                    />
                                    <Typography
                                        as="h3"
                                        fontFamily="montserrat"
                                        className="text-[32px] font-bold leading-[1.4em] text-center 768px:text-right 1200px:pl-[46px] 1366px:pl-[56px] 600px:text-[30px] 768px:text-[32px] 992px:text-[40px] 1200px:mt-6 1200px:mb-2"
                                    >
                                        {title}
                                    </Typography>
                                </div>

                                <ScrollableSection className={`section-content h-auto 600px:mt-[120px] 768px:mt-[142px] ${!id.includes("story") && 'bg-white'} pt-8 600px:pt-5 pb-4 px-8 mx-2 1200px:mt-2.5 leading-[2]`}>
                                    <ContentScroll sectionContent={sectionContent} />

                                    {hasCTA && (
                                        <div className="flex justify-center 768px:justify-end items-center">
                                            <div className="w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[12px] rounded-[50px] mt-0 768px:ml-0 z-10 hover:bg-[#000000] hover:cursor-pointer no-underline mr-0">
                                                <a href="https://www.securecash.com.au/quote">Get a Quote</a>
                                            </div>
                                        </div>
                                    )}
                                </ScrollableSection>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
};