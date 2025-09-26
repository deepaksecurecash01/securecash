import React from 'react'
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

const HeadlineContent = () => {
  return (
        <div
            id="headline-content"
            className="in-full bg-dots bg-gray w-full h-[572px] flex justify-center items-center flex-col"
        >
            <div id="headline-wrapper" className="text-center">
                <Typography
                    fontFamily="prata"
                    as="h3"
                    className="text-[20px] text-[#4d4d4d] leading-[28px] text-center mb-[24px] 
          mx-auto 
         768px:text-2xl 992px:text-[40px] 992px:leading-[1em] 
       "
                >
                    Start Taking Advantage Of
                </Typography>

                <Typography
                    as="h1"
                    className="mx-auto font-medium text-[40px] leading-[1.2em]
         text-center 
         w-[80%] 1024px:w-full 768px:text-5xl 
         992px:text-[88px] 992px:leading-[1em] mb-6
         "
                >
                    Our Services Today&nbsp;
                </Typography>
                <Divider
                    alignment="center"
                    color="primary"
                    responsiveClassName="1024px:mt-0 1024px:mb-6"
                />
                <Typography
                    as="p"
                    className="text-[16px] text-[#4d4d4d] font-normal leading-[24px] text-center mb-4 
         w-[86%] 768px:text-xl mx-auto 
         1024px:w-full 1024px:mx-0 992px:text-[32px]"
                >
                    Get a quote email within 45 minutes.{" "}
                </Typography>
            </div>
        </div>);
}

export default HeadlineContent