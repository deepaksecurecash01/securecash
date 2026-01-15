import ScrollableSection from "@/components/layout/ScrollbarSection";
import Link from "next/link";
import Image from "next/image";
import { parseHtml } from "@/utils/htmlParser";

const SectionWrapper = ({ heading, description, contentItems, imageUrl }) =>
{
  return (
    <div className="w-full relative">
      <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-left bg-left-top bg-no-repeat -z-10" />
      <div className="absolute opacity-20 480px:opacity-30 1024px:opacity-50 1366px:opacity-60 1600px:opacity-100 inset-0 bg-quote-header-right bg-right-top bg-no-repeat -z-10" />

      <div id="intro" className="max-w-[1366px] mx-auto flex flex-col px-5 justify-center items-center">
        <h2 className="montBold text-[22px] leading-[30px] 768px:text-[34px] font-bold text-center mx-auto 768px:leading-[45px] max-w-[80%] text-black">
          {heading}
        </h2>
        <hr className="w-[100px] my-[24px] 992px:mx-0 992px:text-left 768px:mb-0 768px:mt-5 h-[4px] rounded-[5px] border-0 bg-primary" />
        <div className="content-wrapper 768px:w-4/5 768px:mt-12 p-0">
          <div id="intro-text" className="w-[90%] 768px:w-full mx-auto 768px:bg-inherit">
            <p className="text-[16px] font-light leading-[2em] text-center m-0 text-black">
              {parseHtml(description)}
            </p>
          </div>
        </div>
      </div>

      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]" />

      <div id="faq" className="inline-block w-full">
        <div
          className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex"
          style={{ "--scroll-height": "770px" }}
        >
          <div className="flex flex-grow justify-center items-center w-full 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-0 [flex:1]">
            <ScrollableSection
              className="h-auto w-[82%] 992px:w-full p-0 mx-auto 992px:h-full bg-white leading-[2] 992px:px-[10%]"
              style={{ direction: "rtl" }}
            >
              <div style={{ direction: "ltr" }}>
                <ul className="list-none w-full" id="scroll-content">
                  {contentItems.map((item, index) => (
                    <li key={index}>
                      {item.title && (
                        <h3 className={`${item.icon
                          ? "600px:text-[20px] flex flex-row justify-start items-center gap-2 768px:gap-2 text-[20px] mb-4"
                          : "mb-5 768px:w-[80%] 600px:text-[26px] text-center text-[22px]"
                          } leading-[30px] 600px:leading-[1.6em] mx-auto font-bold text-[#000] 992px:text-left 992px:w-full ${index === 0 ? '768px:mt-2.5' : ' mt-6'
                          } font-montserrat`}>
                          {item.icon && (
                            <Image
                              className="icon-data h-[40px] pr-2 w-auto"
                              src={item.icon}
                              alt={item.title.toLowerCase()}
                              width={40}
                              height={40}
                            />
                          )}
                          {item.title}
                        </h3>
                      )}

                      {item.details.map((paragraph, paragraphIndex) =>
                      {
                        const isLastParagraph = index === contentItems.length - 1 &&
                          paragraphIndex === item.details.length - 1;

                        return (
                          <div
                            key={paragraphIndex}
                            className={`text-justify 768px:text-start font-light leading-[2rem] 414px:pr-0 ${isLastParagraph ? 'mb-0' : 'mb-4'}`}
                          >
                            {parseHtml(paragraph)}
                          </div>
                        );
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollableSection>
          </div>

          <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-start 992px:float-right mt-12 1024px:mt-0">
            <div className="cta-box relative w-full h-[540px] 414px:h-[580px] 992px:h-full min-h-[500px]">
              <Image
                src={imageUrl}
                alt="Australia Cash in Transit Services"
                fill
                quality={75}
                className="backdraft object-cover"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
              <div className="absolute top-0 left-0 w-[70%] 480px:w-[60%] 1366px:w-[55%] h-full 1366px:h-auto 1366px:py-[60px] bg-black px-[30px] flex flex-col justify-center">
                <h2 className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px] 992px:leading-[48px] font-bold text-white text-center 992px:text-left mb-0 font-montserrat">
                  What Type of Service Do You Need?
                </h2>
                <hr className="w-[100px] mx-auto my-6 992px:mx-0 992px:text-left h-[4px] rounded-[5px] border-0 bg-white" />
                <p className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center 992px:text-left mt-4 pb-3 font-montserrat">
                  Let&apos;s start discussing<br />your options.
                </p>
                <p className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center 992px:text-left mt-4 pb-3 font-montserrat">
                  <strong>Call us</strong> at{" "}
                  <a href="tel:1300732873" className="text-primary hover:underline">1300 SECURE</a>
                </p>
                <p className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3 font-montserrat">
                  or
                </p>
                <Link href="/quote" className="w-full mt-[18px] button">
                  <div className="flex flex-row justify-center items-center min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-white 768px:w-full 768px:min-h-[55px] 1070px:mt-0 max-h-[73px] group 768px:mx-auto 992px:mx-0">
                    <p className="m-0 p-0 text-[14px] 768px:text-base font-semibold w-full group-hover:text-[#c7a652] text-[#000] hover:no-underline text-center">
                      Get a Quote Now!
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;