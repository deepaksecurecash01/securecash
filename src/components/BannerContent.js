import React from "react";
import Carousel from "./Carousel";
import Divider from "./common/Divider";
import Heading from "./common/Heading";
import SubHeading from "./common/SubHeading";
import Paragraph from "./common/Paragraph";

const BannerContent = () => {
  return (
    <section
      id="content-middle"
      className="bg-[#1a1a1a] min-h-[614px] 414px:min-h-[540px] pl-0 flex p-0 pt-0  992px:inline-block w-full mx-auto"
    >
      <div className="inner w-[95%] max-w-[1366px] mx-auto flex flex-col justify-evenly 992px:items-center py-[40px]  992px:flex-row  992px:py-[100px] ">
        <div className="w-full text-center pr-0   1024px:pr-0  992px:[flex:2] text-white ">
          <div className="service-container p-4 992px:p-0 pt-0 leading-[2em] m-0 text-[16px] text-white">
            <Divider responsiveClassName="992px:mx-0 992px:text-left 1024px:mt-0" />

            <SubHeading
              as="h3"
              fontSize="22px"
              lineHeight="36px"
              textAlign="center"
              marginBottom="24px"
              responsiveClassName="w-[90%] 992px:w-auto mx-auto 992px:mx-0 992px:text-left 768px:text-2xl 992px:text-[28px] 992px:leading-[1.4em]"
            >
              Let Us Do Your Banking,
            </SubHeading>
            <Heading
              as="h2"
              color="#c7a652"
              fontWeight="bold"
              fontSize="40px"
              lineHeight="1.4em"
              textAlign="center"
              marginBottom="24px"
              responsiveClassName="w-3/4 mx-auto 992px:mx-0 480px:text-[30px] 768px:text-5xl 992px:w-auto 992px:text-[40px] 992px:leading-[1.4em] 992px:mb-[24px] 992px:text-left"
            >
              {`Don't Take The Risk!`}
            </Heading>
            <Paragraph
              fontSize="14px"
              lineHeight="1em"
              textAlign="center"
              marginBottom="0"
              fontWeight="normal"
              responsiveClassName="992px:text-left 414px:leading-[1.3em] 768px:text-[16px] 1024px:leading-[2em] 1366px:leading-[1em]"
            >
              Anywhere, Anytime, Australia Wide
            </Paragraph>

           
          </div>
        </div>

        {/* Carousel */}
        <div className="ml-0 mt-[40px] 768px:mt-0  992px:[flex:3]  992px:ml-[40px] ">
          <div
            id="service-slider"
            className="w-[90%] h-[248px] 360px:h-[232px] 480px:h-auto 992px:h-0  480px:w-[80%]  768px:my-[16px] mx-auto 992px:w-full"
          >
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerContent;
