import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/layout/Container";
import ScrollableSection from "../../../components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";

export const StorySection = ({
  title,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  sectionContent = [],
  imagePosition = "left",
  id,
  hasCTA = false
}) =>
{
  const isImageLeft = imagePosition === "left";
  const firstSectionOrder = isImageLeft ? "" : "order-1 600px:order-2";
  const secondSectionOrder = isImageLeft ? "" : "order-2 600px:order-1";
  const bgClass = id?.includes("story") ? "bg-[#dfdfdf]" : "bg-quote-header";
  const paddingY = id?.includes("help") ? "600px:pt-[87px] 600px:pb-[120px]" : "600px:py-[120px]";

  return (
    <section className="overflow-hidden">
      <div className={`${bgClass} w-full h-full pb-[16px] flex ${paddingY}`}>
        <div className="bg-no-repeat bg-cover 480px:bg-contain w-full h-full">
          <Container className="section-col inner relative h-full 600px:h-[296px] 768px:h-[calc(342px+40px)] 1200px:h-[calc(456px+56px)] 1440px:h-full flex flex-col mt-0 600px:flex-row w-full 1024px:w-[95%] 1440px:w-full">
            <div className={`section-content-wrapper w-full h-full flex flex-col justify-end ${firstSectionOrder}`} id="about-us-section-story">
              <img
                src={imageUrl}
                alt={imageAlt}
                loading="lazy"
                className="w-full h-[calc(100%-58px)]"
              />
            </div>

            <div className={`section-content-wrapper w-full flex flex-col justify-start 768px:justify-end ${secondSectionOrder}`}>
              <div className="content h-full flex flex-col self-end 1200px:max-h-[390px]">
                <div className="section-header px-10 600px:px-6 py-[18px] relative 600px:absolute 1200px:relative 600px:top-[30px] left-0 w-auto 768px:top-0 768px:px-8 768px:py-10 bg-[#000000] items-start justify-center text-[#ffffff] m-0 flex flex-col text-right">
                  <hr className="h-[4px] rounded-[5px] border-0 bg-primary w-[100px] m-0 768px:text-left 768px:mx-0 hidden 1200px:block divider-gold divider-2" />
                  <h1 className="text-[32px] font-montserrat font-bold leading-[1.4em] text-center 768px:text-left 600px:text-[30px] 768px:text-[32px] 992px:text-[40px] 1200px:mt-6 1200px:mb-2">
                    {title}
                  </h1>
                </div>

                <ScrollableSection className={`section-content h-auto 600px:mt-[120px] 768px:mt-[142px] ${!id?.includes("story") && 'bg-white'} pt-8 600px:pt-5 px-8 mx-2 1200px:mt-2.5 leading-[2]`}>
                  <ContentScroll sectionContent={sectionContent} />

                  {hasCTA && (
                    <div className="flex justify-center 768px:justify-start items-center">
                      <Link
                        href="quote"
                        className="w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[12px] rounded-[50px] mt-0 768px:ml-0 z-10 hover:bg-[#000000] hover:cursor-pointer no-underline mr-0 inline-block"
                      >
                        Get a Quote
                      </Link>
                    </div>
                  )}
                </ScrollableSection>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};