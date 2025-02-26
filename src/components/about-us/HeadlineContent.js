import React from "react";
import BannerInfo from "../common/BannerInfo";
import Divider from "../common/Divider";
import Image from "next/image";
import Heading from "../common/Heading";
import Container from "../layout/Container";
import Paragraph from "../common/Paragraph";

const HeadlineContent = () =>
{
    return (
        <section className=" overflow-hidden">
            <div
                id="headline-content"
                className=" bg-[#dfdfdf]  768px:bg-[linear-gradient(90deg,_#dfdfdf_50%,_#fff_50%)]  w-full h-[404px]  414px:h-[412px]  768px:h-[454] 1024px:h-[572px]  flex justify-center items-center flex-col"
            >
                <div className=" bg-quote-header bg-no-repeat bg-cover 480px:bg-contain w-full h-full ">
                    <Container className=" about-hero--wrapper flex relative h-full w-full">
                        <div className=" flex flex-col justify-center gap-3 px-[30px]   768px:w-[38.25%] 1024px:pr-[10px] 1024px:pl-[34px]  1024px:w-[32.5%] 1280px:pl-[34px] 1280px:pr-[24px]  1280px:w-[30%]  1366px:pl-[34px]  1366px:pr-[94px]   1366px:w-[34.4%]  1440px:pl-[0]  1440px:pr-[174px] w-full  1440px:w-[37.7%]">
                            <Divider color="primary" alignment="left" margin="m-0" responsiveClassName='768px:text-left 768px:mx-0' />
                            <Heading
                                as="h1"
                                color=""
                                fontWeight="bold"
                                fontSize="44px"
                                lineHeight="1.6em"
                                marginBottom="0px"
                                textAlign="center"
                                className="mx-auto"
                                responsiveClassName="text-[44px] 992px:text-[56px] 768px:text-left 768px:mx-0"
                            >
                                About Us
                            </Heading>

                            <Paragraph
                                fontSize="18px"
                                fontWeight="normal"
                                lineHeight="1.4em"
                                textAlign="center"
                                marginBottom="0px"
                                responsiveClassName=" mx-auto mb-3 1024px:w-full 768px:mx-0 992px:text-[24px] 768px:text-left"
                            >
                                Established in 1992, we are a courier business that specialises
                                in the pickup and banking of your daily takings.
                            </Paragraph>

                            <div className="callback-button w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[14px] ml-auto mr-auto rounded-[50px] mt-0  768px:ml-0 z-10 hover:bg-[#000000] hover:cursor-pointer no-underline">
                                <a href="https://www.securecash.com.au/about-us/#about-us-section-story">
                                    Read more
                                </a>
                            </div>
                        </div>
                        <div className="about-hero--img-wrap hidden 768px:w-[61.75%] 1024px:w-auto 768px:flex items-end relative">
                            <Image
                                src="https://www.securecash.com.au/images/header-img-about-us.png"
                                width={851}
                                height={567}
                                alt="Picture of the author"
                                className="absolute -left-7 768px:w-[580px] 1024px:w-[851px] 1200px:relative"
                            />
                        </div>
                    </Container>
                </div>
            </div>
            <BannerInfo />
        </section>
    );
};

export default HeadlineContent;
