import Divider from "@/components/common/Divider";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";
import BannerButton from "./BannerButton";

const BannerContent = ({
  heading,
  subHeading,
  text,
  buttonText,
  buttonLink,
}) => (
  <div className="absolute w-full text-center text-white 1024px:w-[90%] 1200px:w-[80%] 1024px:pl-[3%] 1200px:pl-[4%] 1440px:pl-0 top-[50%] transform -translate-y-1/2">
    <Divider alignment="left" responsiveClassName="1024px:mt-0 1024px:mb-6" />
    <SubHeading
      as="h3"
      fontSize="20px"
      color="white"
      lineHeight="28px"
      textAlign="center"
      marginBottom="24px"
      textShadow={true} // Apply text-shadow
      className="w-[90%] mx-auto 1024px:mx-0 1024px:text-left 768px:text-2xl 992px:text-[32px] 992px:leading-[1em] 992px:mb-[24px]"
    >
      {heading}
    </SubHeading>

    <Heading
      as="h1"
      color="primary"
      fontWeight="bold"
      fontSize="32px"
      lineHeight="28px"
      marginBottom="24px"
      textShadow={true}
      textAlign="center"
      className="mx-auto"
      responsiveClassName=" 768px:text-5xl 992px:text-[56px] 1024px:text-left 1024px:mx-0"
    >
      {subHeading}
    </Heading>

    <Paragraph
      fontSize="16px"
      color="white"
      fontWeight="normal"
      lineHeight="24px"
      textAlign="center"
      marginBottom="0px"
      className="w-[86%] "
      responsiveClassName="768px:text-xl mx-auto 1024px:w-full 1024px:mx-0 992px:text-[24px] 1024px:text-left"
      textShadow={true}
    >
      {text}
    </Paragraph>

    <BannerButton href={buttonLink} text={buttonText} />
  </div>
);

export default BannerContent;
