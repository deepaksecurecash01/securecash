import React from "react";
import BannerInfo from "../../../components/common/BannerInfo";
import Image from "next/image";
import Typography from "../../../components/common/Typography";
import Container from "../../../components/layout/Container";
import Link from "next/link";

const HeadlineContent = () =>
{
    return (
        <section className=" overflow-hidden">
            <div
                id="headline-content"
                className=" bg-[#dfdfdf]  768px:bg-[linear-gradient(90deg,_#dfdfdf_50%,_#fff_50%)]  w-full h-[404px]  414px:h-[412px]  768px:h-[454px] 1024px:h-[572px]  flex justify-center items-center flex-col "
            >
                <div className=" w-full h-full relative">
                    <div className="absolute inset-0 bg-quote-header-right bg-right-top bg-no-repeat z-10"></div>

                    <Container className=" about-hero--wrapper flex relative h-full w-full">
                        <div className=" flex flex-col justify-center gap-3 px-[30px]   768px:w-[38.25%] 1024px:pr-[10px] 1024px:pl-[34px]  1024px:w-[32.5%] 1280px:pl-[34px] 1280px:pr-[24px]  1280px:w-[30%]  1366px:pl-[34px]  1366px:pr-[94px]   1366px:w-[34.4%]  1440px:pl-[0]  1440px:pr-[174px] w-full  1440px:w-[37.7%]">
                            <hr className='h-[4px] rounded-[5px] border-0 bg-primary w-[100px] mx-auto 768px:ml-0  768px:mr-auto' />
                            <Typography
                                as="h1"
                                fontFamily="montserrat"
                                className="text-[44px] font-bold leading-[1.6em] text-center mx-auto 992px:text-[56px] 768px:text-left 768px:mx-0"
                            >
                                About Us
                            </Typography>

                            <Typography
                                as="p"
                                fontFamily="montserrat"
                                className="text-[18px] font-normal leading-[1.4em] text-center mx-auto mb-3 1024px:w-full 768px:mx-0 992px:text-[24px] 768px:text-left"
                            >
                                Established in 1992, we are a courier business that specialises in the pickup and banking of your daily takings.
                            </Typography>


                            <div className="callback-button w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[14px] ml-auto mr-auto rounded-[50px] mt-0  768px:ml-0 z-10 hover:bg-[#000000] hover:cursor-pointer no-underline">
                                <Link href="#about-us-section-story">
                                    Read more
                                </Link>
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
