import InfoBar from "@/components/common/BannerInfo";
import "./SliderSwiper.css";
import BannerSlider from "./SliderSwiper";


const SLIDES = [
  {
    mobile: "/images/banner/Slide-1-mobile.jpg",
    tablet: "/images/banner/Slide-1-tablet.jpg",
    web: "/images/banner/Slide-1-web.jpg",
    heading: "Let Us Do Your Banking,",
    subHeading: "Don't Take The Risk!",
    text: "Anywhere. Anytime. Australia Wide.",
    buttonText: "Explore Our Services", // ✅ Changed from "Learn More"
    buttonLink: "#welcome",
    alt: "SecureCash Banking Services - Australia Wide"
  },
  {
    mobile: "/images/banner/Slide-2-mobile.jpg",
    tablet: "/images/banner/Slide-2-tablet.jpg",
    web: "/images/banner/Slide-2-web.jpg",
    heading: "Start Taking Advantage Of Our Services Today",
    subHeading: "Get A Quote From SecureCash",
    text: "We Just Need A Few Details!",
    buttonText: "Get a Quote", // ✅ Already descriptive
    buttonLink: "/quote",
    alt: "Get a Quote from SecureCash"
  },
  {
    mobile: "/images/banner/Slide-3-mobile.jpg",
    tablet: "/images/banner/Slide-3-tablet.jpg",
    web: "/images/banner/Slide-3-web.jpg",
    heading: "We're Pushing Our Industry Into The Future",
    subHeading: "Take Advantage Of Our eDockets System",
    text: "Control Your Services With A Click Of A Button",
    buttonText: "Discover eDockets", // ✅ Changed from "Learn More"
    buttonLink: "https://www.edockets.app/",
    alt: "eDockets System - Digital Cash Management"
  },
  {
    mobile: "/images/banner/Slide-4-mobile.jpg",
    tablet: "/images/banner/Slide-4-tablet.jpg",
    web: "/images/banner/Slide-4-web.jpg",
    heading: "Our Services Are Covert",
    subHeading: "We Don't Attract Unwanted Attention",
    text: "A Safer Solution For Your Business",
    buttonText: "About Our Security", // ✅ Changed from "Learn More"
    buttonLink: "/about-us#about-us-section-service",
    alt: "Covert Cash Transport Services"
  },
  {
    mobile: "/images/banner/Slide-5-mobile.jpg",
    tablet: "/images/banner/Slide-5-tablet.jpg",
    web: "/images/banner/Slide-5-web.jpg",
    heading: "Use A Provider You Can Trust",
    subHeading: "We Have Been Operating Over 25 Years",
    text: "Our Managers Have Over 100 Years Combined Industry Experience",
    buttonText: "About Us", // ✅ Already descriptive
    buttonLink: "/about-us",
    alt: "Trusted Cash Transport Provider - 25+ Years Experience"
  },
];

const HeroSection = () => {
  return (
    <div id="banner" className="flex flex-col justify-end items-center ">
      <BannerSlider slides={SLIDES} />
      {/* <div style={{ height: '600px', background: '#ccc' }}>Placeholder</div> */}

      <InfoBar />
    </div>
  );
};

export default HeroSection;
