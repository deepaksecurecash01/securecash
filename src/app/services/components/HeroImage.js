import React from "react";
import Divider from "@/components/common/Divider";
import Link from "next/link";
import DoubleButton from "@/components/common/DoubleButton";

const HeroImage = ({ title, imgSrc }) =>
{
    return (
        <div
            id="hero-image"
            className="flex flex-col justify-center items-center bg-[45%] bg-cover  480px:bg-[position:50%] h-[404px]  414px:h-[412px]  768px:h-[454px] 1024px:h-[55vh]  600px:bg-cover bg-no-repeat  992px:bg-inherit "
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${imgSrc})`,
            }}

        >
            <h1
                className="text-white font-bold text-center text-[30px] leading-[36px]  600px:text-[40px]  768px:leading-[48px]  992px:leading-[61px]  992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px] 1070px:mt-0"
                id="franchise-header"
                dangerouslySetInnerHTML={{ __html: title }}
            />


            <Divider
                color="white"
                alignment="center"
                className="mt-2.5 mb-5 992px:mx-0 992px:text-left w-[16%] 768px:mt-5 768px:mb-0 414px:mb-0 600px:w-[100px]"
            />
            <DoubleButton
                primaryButton={{ text: "Get a Quote", href: "/quote" }}
                secondaryButton={{ text: "Read More", href: "#read-more" }}
            />
        </div>
    );
};

export default HeroImage;
