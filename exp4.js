import React from "react";
import ScrollableSection from "../layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Typography from "../common/Typography";
import Link from "next/link";
import Divider from "../common/Divider";

const ScrollSection = ({
    contentItems,
    imgSrc,
    height,
    imagePosition = "left",
}) =>
{
    const isLeft = imagePosition === "left";

    const scrollSectionClass = `
        h-auto w-[85%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2]
        ${isLeft ? "1024px:pr-[90px]" : "1024px:px-[10%]"}
    `;

    const imageSectionClass = `
        float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-start
        ${isLeft ? "992px:float-left" : "992px:float-right"}
    `;

    return (
        <div id="faq" className="inline-block w-full">
            <div
                className={`scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex`}
                style={{
                    "--scroll-height": height,
                }}
            >
                {isLeft ? (
                    <>
                        <ImageSection imgSrc={imgSrc} imagePosition={imagePosition} />
                        <ContentSection
                            contentItems={contentItems}
                            scrollSectionClass={scrollSectionClass}
                            imagePosition={imagePosition}
                        />
                    </>
                ) : (
                    <>
                        <ContentSection
                            contentItems={contentItems}
                            scrollSectionClass={scrollSectionClass}
                            imagePosition={imagePosition}
                        />
                        <ImageSection imgSrc={imgSrc} imagePosition={imagePosition} />
                    </>
                )}
            </div>
        </div>
    );
};

const ImageSection = ({ imgSrc, imagePosition }) => (
    <div
        className={`
        float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-start
        ${imagePosition === "left" ? "992px:float-left" : "992px:float-right"}
    `}
    >
        <div
            className={`cta-box relative ${imagePosition === "left" ? "992px:w-[90%]" : "992px:w-full"
                }`}
        >
            <img
                className="backdraft h-full w-full"
                src={imgSrc}
                alt="Australia Cash in Transit Services"
            />
            <div
                className={`absolute top-0         ${imagePosition === "left" ? "992px:right-0" : "992px:left-0"
                    }
  w-[55%] bg-black py-[60px] px-[30px] flex flex-col justify-center`}
            >
                <Typography
                    as="h4"
                    fontFamily="font-montserrat"
                    className="text-[33px] font-bold text-white text-left mb-0"
                >
                    What Type of Service Do You Need?{" "}
                </Typography>
                <Divider
                    color="white"
                    margin="mt-[20px] mb-[30px]"
                    alignment="left"
                    responsiveClassName="992px:mx-0 992px:text-left w-[100px] ml-0"
                />
                <Typography
                    as="p"
                    fontFamily="font-montserrat"
                    className="text-[26px] font-medium text-white text-left mt-4 pb-5"
                >
                    Let's start discussing
                    <br />
                    your options.{" "}
                </Typography>
                <Typography
                    as="p"
                    fontFamily="font-montserrat"
                    className="text-[26px] font-medium text-white text-left mt-4 pb-5"
                >
                    <strong>Call us</strong> at{" "}
                    <a href="tel:1300732873" className="text-primary hover:underline">1300 SECURE</a>{" "}
                </Typography>{" "}
                <Typography
                    as="p"
                    fontFamily="font-montserrat"
                    className="text-[26px] font-medium text-white text-center mt-4 pb-5"
                >
                    or{" "}
                </Typography>
                <Link href={"/quote"} className="w-full mt-[18px]">
                    <div className="flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 768px:w-full 768px:min-h-[73px] 768px:mt-8 1070px:mt-0 max-h-[73px] group  768px:mx-auto 1024px:mx-0">
                        <p className="m-0 p-0 text-[14px]  768px:text-[20px] font-semibold w-full  group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
                            Get a Quote Now!                        </p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
);

const ContentSection = ({
    contentItems,
    scrollSectionClass,
    imagePosition,
}) => (
    <div className="flex flex-grow justify-center items-center w-[96%] 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]">
        <ScrollableSection
            className={scrollSectionClass}
            style={imagePosition === "right" ? { direction: "rtl" } : {}}
        >
            <div style={{ direction: "ltr" }}>
                <ContentScroll scrollData={contentItems} />
                <Typography
                    as="h3"
                    fontFamily="font-montserrat"
                    className="text-[26px] font-bold text-[#000] text-left my-[28px]"
                >
                    GET IN TOUCH TODAY!
                </Typography>
                <ContactInfo />
            </div>
        </ScrollableSection>
    </div>
);

const ContactInfo = () => (
    <>
        <Typography
            as="div"
            fontFamily="font-montserrat"
            className="text-left font-light leading-[2rem] mt-4 414px:pr-0"
        >
            <em>
                <strong>
                    You can call us on{" "}
                    <a className="text-link hover:underline" href="tel:1300732873">
                        1300 732 873
                    </a>{" "}
                    or email{" "}
                    <a
                        className="text-link hover:underline"
                        href="mailto:franchise@securecash.com.au"
                    >
                        franchise@securecash.com.au
                    </a>
                    . Our friendly staff would be more than happy to discuss how we can
                    help your Franchise queries!
                </strong>
            </em>
        </Typography>

        <Typography
            as="div"
            fontFamily="font-montserrat"
            className="text-left font-light leading-[2rem] mt-4 414px:pr-0"
        >
            <em>
                <strong>
                    Want to learn more about what it's like being a part of the SecureCash
                    team? Check out our blog post on{" "}
                    <Link
                        className="text-link hover:underline"
                        href="/blog/office-culture/"
                    >
                        Office Culture
                    </Link>
                    .
                </strong>
            </em>
        </Typography>
    </>
);

export default ScrollSection;
