import Image from "next/image";
import DoubleButton from "../../components/common/DoubleButton";

const HeroImage = () =>
{
  return (
    <section
      id="hero-image"
      className="flex flex-col justify-center items-center overflow-hidden bg-[45%] bg-cover h-[404px] 414px:h-[412px] 768px:h-[454px] 1024px:h-[55vh] 480px:bg-[position:50%] 600px:bg-cover bg-no-repeat 992px:bg-center relative"
    >
      <Image
        src="/images/3-australia-securecash-services-featured.avif"
        alt="SecureCash Franchise Services Australia Wide"
        fill
        priority
        className="object-cover -z-10"
        style={{
          filter: 'brightness(0.5)',
        }}
      />
      <h1 className="text-white font-bold text-center text-[30px] leading-[36px] 768px:text-[40px] 768px:leading-[48px] 992px:leading-[61px] 992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px]">
        <span className="font-times font-extralight text-[70px] 768px:text-[88px] leading-[88px]">
          Secure
        </span>
        <span className="text-primary font-times font-extralight text-[70px] 768px:text-[88px] leading-[88px]">
          Cash
        </span>
        <br />
        <span className="text-[50px] 768px:text-[48px] leading-[100px]">
          Franchises
        </span>
      </h1>
      <p className="text-[32px] leading-[30px] font-medium text-white">
        Now Available
      </p>
      <hr className="w-[16%] mt-2.5 mb-5 bg-white h-[4px] rounded-[5px] border-0 768px:mt-5 768px:mb-0 414px:mb-0 600px:w-[100px]" />
      <DoubleButton
        primaryButton={{ text: "Register Now", href: "#franchise-form" }}
        secondaryButton={{ text: "Read More", href: "#read-more" }}
      />
    </section>
  );
};

export default HeroImage;