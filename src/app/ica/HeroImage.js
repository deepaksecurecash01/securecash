import Container from "@/components/layout/Container";
import Link from "next/link";
import Image from "next/image";

const HeroImage = () => (
  <section className="welcome-main-hero h-full 600px:h-[500px] 1024px:h-[614px] relative">
    <div className="absolute left-0 w-full h-[434px] 600px:h-[500px] 600px:w-2/4 1024px:h-[614px] bg-black -z-[1]"></div>
    <div className="absolute hidden 480px:block h-[530px] right-0 w-[54%] 768px:w-1/2 768px:h-[614px] -z-10">
      <Image
        src="/images/ica/ica-hero-bg.jpg"
        alt="Independent Contractors Agreement"
        fill
        fetchPriority="high"
        priority
        loading="eager"
        sizes="(max-width: 768px) 54vw, 50vw"
        className="object-cover"
        quality={85}
      />
    </div>

    <Container className="inner w-full h-full 600px:flex flex-col">
      <div className="welcome-main-hero--wrap h-full flex flex-wrap">
        <HeroLeftContent />
        <HeroRightContent />
      </div>
    </Container>
  </section>
);

const HeroLeftContent = () => (
  <div className="welcome-main-hero--content-left relative text-white w-full text-center 600px:text-left pt-[66px] pb-[56px] 600px:w-2/4 600px:pl-3 600px:pt-[170px] 600px:pb-[153px] 1024px:pl-[18px] 1024px:w-2/4 welcome-main-hero--content-left-tnc">
    <h1 className="welcome-main-hero--content-left__title w-[70%] mx-auto 600px:mx-0 text-[38px] 600px:text-[34px] 720px:text-[38px] leading-[42px] 1024px:leading-[1em] 1024px:text-[64px] font-extrabold 600px:font-semibold 600px:text-left">
      Independent Contractors Agreement
    </h1>
    <hr className="mx-auto mt-[22px] w-[100px] h-[4px] rounded-[5px] border-0 bg-primary 600px:mx-0 1366px:mt-[30px]" />
  </div>
);

const HeroRightContent = () => (
  <div className="welcome-main-hero--content-right text-[#6e6e6e] relative w-full 600px:w-2/4 600px:grid place-items-center">
    <div className="welcome-main-hero--content-right--card relative w-auto mx-[20px] top-0 right-0 py-[40px] px-[43px] 600px:top-0 600px:right-8 720px:right-4 600px:w-[115%] 720px:w-full p-[54px_43px] 768px:right-8 768px:py-[30px] 800px:py-10 800px:right-12 768px:top-0 768px:w-[110%] 1024px:w-[105%] 1024px:right-8 1024px:p-[88px_63px] 1366px:w-[107%] bg-[#f2f2f2] 1366px:px-[70px] 1366px:py-[96px] shadow-[0px_0px_19px_-5px_#737373] 1366px:right-10 600px:my-auto">
      <p className="text-[14px] 768px:text-[16px] font-light leading-[2em] mb-4">
        <strong>
          On behalf of our team, we would like to thank you for accepting to be a preferred contractor and represent our organisation!
        </strong>
      </p>
      <p className="text-[14px] 768px:text-[16px] font-light leading-[2em] mb-4">
        <strong>
          Below is our Independent Contractors Agreement, we ask that you now take the time to read it through and if you are happy with the content then simply select below your acceptance;
        </strong>
      </p>
      <p className="text-[14px] 768px:text-[16px] font-light leading-[2em]">
        <strong>
          To learn more about how we manage information provided you can view our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </strong>
      </p>
    </div>
  </div>
);

export default HeroImage;