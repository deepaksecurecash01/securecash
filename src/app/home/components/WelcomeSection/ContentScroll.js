import React from "react";
import Image from "next/image";
import Typography from "@/components/common/Typography";


const ContentScroll = ({ isExpanded, scrollData, toggleContent }) =>
{
  return (
    <ul
      className={` list-none ${isExpanded === true ? "block" : "hidden"
        } 768px:block `}
    >
      {scrollData.map((data, index) => (
        <div
          key={data.id}
          className={`item-box w-full clear-both mx-auto text-left mt-[40px] 768px:mt-0`}
        >
          <Typography
            as="h4"
            fontFamily="font-montserrat"
            className={`600px:text-[20px] flex flex-row justify-start items-center gap-2 768px:gap-2 text-[20px] mb-4 leading-[30px] 600px:leading-[1.6em] mx-auto font-bold text-[#000] 992px:text-left 992px:w-full mt-6`}
          >
              <Image
                className="icon-data h-[40px] pr-2 w-auto"
              src={data.icon}
              alt={data.title.toLowerCase()}
              width={40}
                height={40}
              />
            {data.title}
              </Typography>
      

            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left mb-0 
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              {data.description}&nbsp;
              {index === scrollData.length - 1 && (
                <button
                  className="read-more-link inline 768px:hidden text-[#957433] 
                 text-[16px] font-bold font-[Montserrat] hover:underline"
                  onClick={toggleContent}
                >
                  Show Less
                </button>
              )}
            </Typography>

        </div>
      ))}
    </ul>
  );
};

export default ContentScroll;
