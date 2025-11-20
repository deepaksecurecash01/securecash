import SliderButton from "./SliderButton";

const BannerContent = ({
  heading,
  subHeading,
  text,
  buttonText,
  buttonLink,
}) => (
  <div className="absolute w-full text-center text-white 1024px:w-[90%] 1200px:w-[80%] 1024px:pl-[3%] 1200px:pl-[4%] 1440px:pl-0 top-[50%] transform -translate-y-1/2">
    <hr className="w-[100px] h-[4px] rounded-[5px] border-0 bg-white mb-6 mx-auto 1024px:ml-0 1024px:mr-auto" aria-hidden="true" />

    {/* ✅ FIXED: h1 is now the primary heading (visually smaller but semantically correct) */}
    <h1
      className="text-[20px] text-white leading-[28px] text-center mb-[24px] 
             w-[90%] mx-auto 1024px:mx-0 1024px:text-left 
             768px:text-2xl 992px:text-[32px] 992px:leading-[1em] 
             992px:mb-[24px] [text-shadow:2px_2px_6px_#111111] font-prata"
    >
      {heading}
    </h1>

    {/* ✅ FIXED: h2 is now the secondary heading (visually larger but semantically second) */}
    <h2
      className="mx-auto font-bold text-[32px] leading-[28px] mb-[24px] 
             text-center text-primary 
             w-[80%] 1024px:w-full 768px:text-5xl 
             992px:text-[56px] 1024px:text-left 1024px:mx-0 
             [text-shadow:2px_2px_6px_#111111] font-montserrat"
    >
      {subHeading}
    </h2>

    <p
      className="text-[16px] text-white font-normal leading-[24px] text-center mb-0 
             w-[86%] 768px:text-xl mx-auto 
             1024px:w-full 1024px:mx-0 992px:text-[24px] 1024px:text-left 
             [text-shadow:2px_2px_6px_#111111] font-montserrat"
    >
      {text}
    </p>

    <SliderButton href={buttonLink} text={buttonText} />
  </div>
);

export default BannerContent;