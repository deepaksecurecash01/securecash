import React from 'react'

const HeadlineContent = () => {
  return (
        <div
            id="headline-content"
          className="in-full bg-dots bg-gray w-full h-[406px]  768px:h-[572px] flex justify-center items-center flex-col"
        >
            <div id="headline-wrapper" className="text-center">
                <h3
                    className="text-[20px] text-[#4d4d4d] leading-[28px] text-center mb-[24px] 
          mx-auto 
         768px:text-2xl 992px:text-[40px] 992px:leading-[1em]  font-prata
       "
                >
                    Start Taking Advantage Of
                </h3>

                <h1
                    className="mx-auto font-medium text-[40px] leading-[1.2em]
         text-center 
         w-[80%] 1024px:w-full 768px:text-5xl 
         992px:text-[88px] 992px:leading-[1em] mb-6 font-montserrat
         "
                >
                    Our Services Today&nbsp;
                </h1>
                <hr
                   
                  className="1024px:mt-0 mb-6 w-[100px] h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
                />
                <p
                    className="text-[16px] text-[#4d4d4d] font-normal leading-[24px] text-center mb-4 
         w-[86%] 768px:text-xl mx-auto 
         1024px:w-full 1024px:mx-0 992px:text-[32px] font-montserrat"
                >
                    Get a quote email within 45 minutes.{" "}
                </p>
            </div>
        </div>);
}

export default HeadlineContent