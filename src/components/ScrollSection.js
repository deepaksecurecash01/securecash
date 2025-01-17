import React from "react";
import Image from "next/image";
import Heading from "./common/Heading";
import Paragraph from "./common/Paragraph";

const ScrollSection = ({ isExpanded, scrollData, toggleContent }) => {
  return (
    <div>
      <div
        className={`${
          isExpanded === true ? "block" : "hidden"
        } 768px:block 768px:pt-0.5`}
      >
        {scrollData.map((data, index) => (
          <div
            key={data.id}
            className={`item-box w-full clear-both mx-auto text-left ${
              index === 0 ? "mt-[40px]" : "mt-[40px]"
            } 768px:mt-0`}
          >
            <div className=" flex flex-row justify-start items-center mb-[16px] mt-[30px] 768px:mt-[50px] ">
              <Image
                className="icon-data h-[40px] pr-2.5 480px:pr-[16px] w-auto"
                src={data.icon}
                alt={data.title.toLowerCase()}
                width={40}
                height={40}
              />
              <Heading
                as="h4"
                fontWeight="semibold"
                fontSize="18px"
                responsiveClassName="768px:text-[24px]"
              >
                {data.title}
              </Heading>
            </div>
            <Paragraph
              fontSize="16px"
              lineHeight="2rem"
              textAlign="left"
              marginBottom="0"
              marginTop="24px"
              responsiveClassName="768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left"
            >
              {data.description}&nbsp;
              {index === scrollData.length - 1 && (
                <button
                  className="read-more-link inline 768px:hidden text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline"
                  onClick={toggleContent}
                >
                  Show Less
                </button>
              )}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollSection;
