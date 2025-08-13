import Carousel from "./Carousel";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentSection = () =>
{
  return (
    <section
      id="content-middle"
      className="bg-[#1a1a1a] min-h-[614px] 414px:min-h-[540px] pl-0 flex p-0 pt-0  992px:inline-block w-full mx-auto"
    >
      <div className="inner w-[95%] max-w-[1366px] mx-auto  992px:grid  992px:grid-cols-5 py-[40px]  992px:f  992px:py-[100px] ">
        <div className="w-full text-center pr-0  992px:col-span-2   992px:pr-0 text-white  1024px:flex items-center">
          <div className="service-container p-4 992px:p-0 pt-0 leading-[2em] m-0 text-[16px] text-white">
            <Divider responsiveClassName="992px:mx-0 992px:text-left 1024px:mt-0" />

            <Typography
              as="h3"
              fontFamily="prata"
              className="text-[22px] leading-[36px] text-center mb-[24px] 
             w-[90%] 992px:w-auto mx-auto 992px:mx-0 992px:text-left 
             768px:text-2xl 992px:text-[28px] 992px:leading-[1.4em]"
            >
              Let Us Do Your Banking,
            </Typography>

            <Typography
              as="h2"
              fontFamily="montserrat"
              className="text-[40px] font-bold leading-[1.4em] text-center text-[#c7a652] mb-[24px] 
             w-3/4 mx-auto 992px:mx-0 480px:text-[30px] 768px:text-5xl 
             992px:w-auto 992px:text-[40px] 992px:leading-[1.4em] 992px:mb-[24px] 992px:text-left"
            >
              {`Don't Take The Risk!`}
            </Typography>

            <Typography
              as="p"
              className="text-[14px] leading-[1em] text-center mb-0 font-normal 
             992px:text-left 414px:leading-[1.3em] 768px:text-[16px] 
             1024px:leading-[2em] 1366px:leading-[1em]"
            >
              Anywhere, Anytime, Australia Wide
            </Typography>

          </div>
        </div>

        {/* Carousel */}
        <div className="ml-0 mt-[40px] 992px:mt-0  992px:mr-[40px]   992px:col-span-3">
          <div id="service-slider" className="">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
