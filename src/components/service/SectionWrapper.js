import React from "react";
import Divider from "../common/Divider";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../common/Typography";
import Link from "next/link";
import ScrollSection from "./ScrollSection";

const SectionWrapper = ({ heading, description, contentItems, contactInfo }) =>
{

    console.log(contentItems);
    return (
        <div className=" w-full relative">
            <div className="absolute inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10"></div>
            <div className="absolute inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10"></div>{" "}
            <div id="intro" className="max-w-[1366px] mx-auto flex flex-col px-5 justify-center items-center">
                <h2
                    className="montBold text-[22px] leading-[30px]  768px:text-[34px] font-bold text-center mx-auto  768px:leading-[45px] max-w-[80%] text-black
"
                >
                    {heading}
                </h2>
                <Divider
                    color="primary"
                    margin="my-[24px]"
                    alignment="left"
                    responsiveClassName="992px:mx-0 992px:text-left w-[100px]"
                />
                <div className="content-wrapper w-4/5  768px:mt-12 p-0">
                    <div id="intro-text" className="bg-white 768px:bg-inherit">
                        <p className="text-[16px] font-light leading-[2em] text-center  768px:mt-4 m-0 text-black" dangerouslySetInnerHTML={{ __html: description }}
                        />


                    </div>
                </div>
            </div>
            <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]"></div>
            <ScrollSection contentItems={contentItems} height={`770px`} imagePosition="right" imgSrc={`https://www.securecash.com.au/images/2-australia-securecash-services-002.jpg`} contactInfo={contactInfo} />

        </div>
    );
};

export default SectionWrapper;
