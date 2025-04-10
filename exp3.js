import React from 'react';
import Typography from "../common/Typography";
import Link from "next/link";
import Divider from "../common/Divider";

const ImageSection = ({ imgSrc, imagePosition = 'left' }) =>
{
  const isLeftPosition = imagePosition === 'left';

  const containerClasses = `
        float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1  flex justify-start
        ${isLeftPosition ? '992px:float-left' : '992px:float-right pt-6'}
    `;

  const ctaBoxClasses = `
        cta-box relative 
        ${isLeftPosition ? '992px:w-[90%]' : 'w-full'}
    `;

  const overlayClasses = `
        absolute top-0 
        ${isLeftPosition ? 'right-0' : '992px:left-0'}
        ${isLeftPosition ? 'h-[80%] w-[70%]' : 'w-[70%] 480px:w-[60%] h-full'} 
        bg-black px-[30px] flex flex-col justify-center
        ${!isLeftPosition ? 'py-[30px]' : ''}
    `;

  return (
    <div className={containerClasses}>
      <div className={ctaBoxClasses}>
        <img
          className={`backdraft  ${isLeftPosition ? 'h-full' : 'h-[540px]'} w-full`}
          src={imgSrc}
          alt="Australia Cash in Transit Services"
        />
        <div className={overlayClasses}>
          {isLeftPosition ? (
            <Typography
              as="h4"
              fontFamily="font-montserrat"
              className="text-[22px] 480px:text-[26px] leading-[32px] 480px:leading-[36px] font-bold text-white text-left mb-0"
            >
              Why Choose SecureCash for Your Business?
            </Typography>
          ) : (
            <>
              <Typography
                as="h4"
                fontFamily="font-montserrat"
                className="text-[22px] 480px:text-[26px] leading-[32px] 480px:leading-[36px] font-bold text-white text-center mb-0"
              >
                What Type of Service Do You Need?
              </Typography>
              <Divider
                color="white"
                margin="my-6"
                alignment="center"
                responsiveClassName="992px:mx-0 992px:text-left w-[100px]"
              />
              <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-[18px] font-medium text-white text-center mt-4 pb-3"
              >
                Let's start discussing
                <br />
                your options.
              </Typography>
              <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-[18px] font-medium text-white text-center mt-4 pb-3"
              >
                <strong>Call us</strong> at{' '}
                <a href="tel:1300732873" className="text-primary hover:underline">
                  1300 SECURE
                </a>
              </Typography>
              <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-[18px] font-medium text-white text-center mt-4 pb-3"
              >
                or
              </Typography>
              <Link href="/quote" className="w-full mt-[18px]">
                <div className="flex flex-row justify-center items-center  min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 768px:w-full 768px:min-h-[73px] 768px:mt-8 1070px:mt-0 max-h-[73px] group 768px:mx-auto 1024px:mx-0">
                  <p className="m-0 p-0 text-[14px] 768px:text-[20px] font-semibold w-full group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
                    Get a Quote Now!
                  </p>
                </div>
              </Link>
            </>
          )}
          {isLeftPosition && (
            <Divider
              color="white"
              margin="mt-[20px]"
              alignment="left"
              responsiveClassName="992px:mx-0 992px:text-left w-[100px] ml-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSection;