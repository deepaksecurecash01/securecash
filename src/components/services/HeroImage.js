import React from "react";
import Divider from "../common/Divider";
import Link from "next/link";

const HeroImage = ({ title, imgSrc }) =>
{
    return (
        <div
            id="hero-image"
            className="flex flex-col justify-center items-center bg-[45%] bg-cover  768px:min-h-[40vh]  h-[70vh] 414px:h-auto  480px:bg-[position:50%] min-h-[40vh]  992px:min-h-[60vh]  600px:bg-cover bg-no-repeat  992px:bg-center 1070px:min-h-[80vh]"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.15)), url(${imgSrc})`,
            }}

        >
            <h1
                className="text-white font-bold text-center text-[30px] leading-[36px]  600px:text-[40px]  768px:leading-[48px]  992px:leading-[61px]  992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px] 1070px:mt-0"
                id="franchise-header"
                dangerouslySetInnerHTML={{ __html: title }}
            />


            <Divider
                color="white"
                width="16%"
                margin="mt-2.5 mb-5"
                alignment="center"
                responsiveClassName="992px:mx-0 992px:text-left w-[16%] 768px:mt-5 768px:mb-0 414px:mb-0 600px:w-[100px]"
            />
            <div
                className="cta-box w-[95%] 480px:w-[80%] 600px:w-[50%] justify-evenly mt-0 414px:mt-[50px] 992px:mt-[80px] relative  992px:w-[545px] flex items-center  768px:justify-between 1070px:mb-0 1070px:mt-[80px]"
                id="franchis-cta"
            >
                <Link href={"/quote"} className="mx-[10px] 992px:mx-0">
                    <div className="flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0  rounded-full bg-[#c7a652] btn-learn-more hover:bg-white 992px:min-w-[253px] 992px:min-h-[73px] max-h-[73px] group  768px:mx-auto 992px:mx-0">
                        <p className="m-0 p-0 text-[14px]  768px:text-base  992px:text-[20px] font-semibold w-full text-[#ffffff] group-hover:text-[#000] hover:no-underline text-center">
                            Get a Quote
                        </p>
                    </div>
                </Link>
                <Link href={"#read-more"} className="mx-[10px] 992px:mx-0">
                    <div className="flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 992px:min-w-[253px] 992px:min-h-[73px] max-h-[73px] group  768px:mx-auto 992px:mx-0">
                        <p className="m-0 p-0 text-[14px]  768px:text-base  992px:text-[20px] font-semibold w-full  group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
                            Read More
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HeroImage;
