import React from "react";
import Divider from "../common/Divider";
import Heading from "../common/Heading";

const BottomBanner = () => {
  return (
    <div id="about-us-banner-bottom" className="">
      <div className="inner">
        <Heading
          as="h2"
          color="white"
          fontWeight="medium"
          fontSize="40px"
          lineHeight="1.25em"
          marginBottom="0px"
          textAlign="center"
          className="font-medium max-[414px]:text-[36px]"
          responsiveClassName="text-[32px] z-30 py-0   1024px:leading-[2em]"
        >
          Let us do the banking for you
        </Heading>
        <Divider
          color="primary"
          alignment="left"
          margin="m-0"
          responsiveClassName="768px:text-left 768px:mx-0 divider-gold divider-2 z-20"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
