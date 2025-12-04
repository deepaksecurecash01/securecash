import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";

const HeadlineContent = () =>
{
    return (
        <section className="overflow-hidden">
            <div
                id="headline-content"
                className="bg-black 768px:bg-gradient-to-r 768px:from-black 768px:from-50% 768px:to-black 768px:to-50% w-full h-[404px] 414px:h-[412px] 768px:h-[454px] 1024px:h-[572px] flex justify-center items-center flex-col relative"
            >
                <div className="hidden 768px:block absolute inset-0 w-full h-full">
                    <div className="absolute right-0 top-0 w-1/2 h-full">
                        <Image
                            src="/images/welcome/about-location-img.avif"
                            alt="Business identification hero"
                            fill
                            style={{ objectFit: "cover" }}
                            fetchPriority="high"
                            loading="eager"
                        />
                    </div>
                </div>

                <Container className="about-hero--wrapper flex relative h-full w-full z-10 justify-center 768px:justify-start">
                    <div className="flex flex-col justify-center 768px:gap-3 px-[30px] 768px:w-1/2">
                        <h1 className="text-[26px] mb-1.5 text-white font-light leading-[30px] text-center mx-auto 992px:text-[38px] 768px:text-left 768px:mx-0 font-montserrat">
                            Information About
                        </h1>
                        <h2 className="text-[38px] text-white font-bold leading-[62px] text-center mx-auto 992px:text-[64px] 992px:leading-[1em] 768px:text-left 768px:mx-0 font-montserrat">
                            Your Location
                        </h2>

                        <hr className='mt-[22px] mb-[34px] w-[100px] mx-auto 768px:text-left 768px:mx-0 h-[4px] rounded-[5px] border-0 bg-primary' />
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default HeadlineContent;