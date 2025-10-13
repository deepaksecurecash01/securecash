import React from "react";
import Container from "@/components/layout/Container";
import Typography from "@/components/common/Typography";

const HeroSection = () =>
{
  return (
    <section
      id="welcome-header-section"
      className="h-[450px] 480px:h-[584px] 768px:[550px] pt-3  1024px:h-[82vh]  1366px:h-[81vh] my-auto w-full relative"
      style={{
        background:
          'url("https://www.securecash.com.au/images/welcome/welcome-hero-bg.jpg")no-repeat center',
      }}
    >
      <Container className="w-[95%]  1366px:w-full flex flex-wrap justify-start items-center h-full ">
        <div
          id="welcome-header-text-wrapper"
          className="relative w-full text-center text-white mt-0  768px:mt-[22px] mb-0 768px:w-1/2  1024px:mt-14 1366px:mt-0"
        >
          <h3 className="absolute text-[72px] ml-5  414px:text-[82px] tracking-[-2px]  414px:ml-[20px] top-[-80px]  480px:text-[82px]  480px:tracking-[-2px]  480px:ml-[20px]  480px:top-[-80px]   600px:text-[117px]  600px:ml-[20px]  768px:text-[82px]    600px:top-[-94px]   600px:tracking-[-5px]  1024px:text-[112px] 1280px:text-[141px]  1024px:top-[-96px] left-[-4%]  1024px:ml-[-6px]  1280px:tracking-[-5px]  1366px:text-[154px] mb-[16px] text-[#a7a7a7]  1366px:top-[-50px]  1440px:left-[-8%]   1440px:ml-0 font-times prata2">
            Welcome to
          </h3>
          <h1 className="absolute text-[36px] top-[9px] ml-[76px]    414px:text-[40px]  414px:top-[18px]  414px:ml-[76px]  480px:text-[40px]  480px:top-[18px]  480px:ml-[76px]  600px:ml-[118px]  600px:text-[54px] mt-[-20px]  768px:text-[40px]  768px:top-[6px]  768px:ml-[76px]  1024px:mt-[8px]  1024px:text-[50px] 1280px:text-[67px] 1280px:top-[14px]  600px:top-[15%]  1280px:mt-[28px]   1024px:ml-[82px] left-[-4%]  1366px:ml-[126px] 1440px:ml-12  1366px:text-[72px] text-primary leading-[1em] font-semibold z-[10]  1366px:top-[74px]  1440px:left-[25px]">
            SECURECASH
          </h1>
          <hr

            className="mt-[64px] ml-5 w-[100px] 600px:mt-[96px] 768px:mt-[64px] 1024px:mt-[100px] 1280px:mt-[140px] 768px:text-left 1366px:mt-[182px] 1440px:mt-[200px] h-[4px] rounded-[5px] border-0 bg-black"
          />
          <p className="text-black max-h-[160px] 600px:w-[70%] 768px:w-full overflow-auto text-left mb-0 text-[16px] font-light leading-[1.75]   1366px:pr-[72px] p-5 ">
            <strong>
              On behalf of the Secure Cash team, we would like to thank you for
              choosing to use our services for your organization.
            </strong>
          </p>
          <div className="flex justify-start items-center 1366px:justify-start ml-5">
            <a
              className=" h-auto py-4 px-10  text-center border-0 cursor-pointer  hover:no-underline bg-black text-white  1366px:text-[16px]  1366px:px-[51px]  1366px:py-[21px] rounded-none font-['Montserrat'] hover:bg-[#c7a652] hover:text-black btn-welcome-hero text-xs 1366px:text-base"
              href="#instruction-box"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="hidden welcome-image-wrapper pl-0  768px:w-1/2  1024px:pl-10 768px:block">
          <img
            src="https://www.securecash.com.au/images/welcome/welcome-hero-img.jpg"
            alt="Passion Led Us Here"
            className="w-full ml-5 1024px:ml-0 768px:w-[95%] 992px:w-full  1600px:w-[110%] shadow-[-11px_-9px_24px_-16px_black]"
            width={707}
            height={523}
          />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
