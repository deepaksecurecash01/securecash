import { FaArrowDownLong } from "react-icons/fa6";
import Container from "@/components/layout/Container";

export const HeroSection = () => (
  <section className="welcome-main-hero h-full 600px:h-[500px] 1024px:h-[547px] relative">
    <div className="absolute left-0 w-full h-[434px] 600px:h-[500px] 600px:w-[40%] 1024px:w-2/4 1024px:h-[610px] bg-black -z-[1]"></div>

    <Container className="inner w-full h-full 600px:flex flex-col">
      <div className="welcome-main-hero--wrap h-full flex flex-wrap">
        <HeroLeftContent />
        <HeroRightContent />
      </div>
    </Container>
  </section>
);

const HeroLeftContent = () => (
  <div className="welcome-main-hero--content-left relative text-white w-full text-center 600px:text-left pt-[66px] pb-[56px] 600px:pt-[138px] 600px:pr-0 600px:pb-[128px] 600px:pl-[12px] 600px:w-2/5 768px:pl-6 768px:pt-[170px] 768px:pb-[153px] 1024px:pl-[18px] 1024px:w-2/4 welcome-main-hero--content-left-tnc">
    <h2 className="welcome-main-hero--content-left__title-sm text-[26px] 1024px:text-[38px] font-light mb-[6px] 1024px:mb-[3px] 600px:text-left">
      Our Terms &{" "}
    </h2>
    <h1 className="welcome-main-hero--content-left__title text-[38px] leading-[42px] 1024px:leading-[1em] 1024px:text-[64px] font-extrabold 600px:font-semibold 600px:text-left">
      Conditions{" "}
    </h1>
    <hr className="mx-auto my-[22px] mb-[34px] w-[100px] 600px:mx-0 1024px:text-left 1024px:mx-0 1366px:mt-[30px] 1024px:mb-[57px] bg-primary h-[4px] rounded-[5px] border-0" />
    <a
      className="btn btn-welcome-hero btn-welcome-main text-[14px] px-5 py-3 border border-white 1024px:text-[16px] 1024px:px-[40px] 1024px:py-[20px] mb-[30px]"
      href="#tnc-page-main-scroll"
    >
      Learn More
    </a>
    <div
      className="arrow-down hidden absolute w-[60px] h-[60px] bg-black right-0 -bottom-[70px] 1024px:flex justify-center items-center z-10"
      id="ins-pane-trigger"
    >
      <a className="py-[18px] px-[25px]" href="#tnc-page-main-scroll" aria-label="Scroll to terms and conditions">
        <FaArrowDownLong className="text-white text-[22px]" aria-hidden="true" />
      </a>
    </div>
  </div>
);

const HeroRightContent = () => (
  <div className="welcome-main-hero--content-right text-[#6e6e6e] relative w-full 600px:w-[60%] 1024px:w-2/4 600px:grid place-items-center">
    <div className="welcome-main-hero--content-right--card relative w-auto mx-[20px] top-0 right-0 py-[40px] px-[43px] 600px:top-0 600px:right-[10px] 720px:right-8 600px:w-full p-[54px_43px] 768px:right-8 800px:right-12 768px:top-0 768px:w-[110%] 1024px:w-[105%] 1024px:right-8 1024px:p-[88px_63px] 1366px:w-[107%] bg-[#f2f2f2] 1366px:px-[70px] 1366px:py-[96px] shadow-[0px_0px_19px_-5px_#737373] 1366px:right-10 1024px:top-5 600px:my-auto">
      <p className="text-[14px] 768px:text-[16px] font-light leading-[2em] mb-[16px]">
        <strong>
          Below is a copy of our terms & conditions (T&C&apos;s) of service, please
          understand that this is NOT a lock-in contract and if you find our
          services are not suitable for your organisation, then you are free to
          cancel at anytime!
        </strong>
      </p>
      <p className="text-[14px] 768px:text-[16px] font-light leading-[2em]">
        <strong>
          Please be aware that Secure Cash reserves the right to change or amend
          these terms and conditions at anytime. You will be provided with a
          copy of these T&C&apos;s for your records to the email address you nominate
          below.
        </strong>
      </p>
    </div>
  </div>
);