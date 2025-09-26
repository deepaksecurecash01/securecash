"use client";
import React from "react";
import VimeoLite from "./VimeoLite";
import Typography from "./Typography";

const VideoSection = ({ service = false, height }) =>
{
    return (
        <div className="home-video-section">
            <div
                id="video-section"
                className={`w-full inline-block mt-[-1px] relative  1024px:max-h-[680px]`}
                style={{
                    "--video-height": height,
                }}
            >
                <div className="black-bar hidden 1024px:block bg-[#1a1a1a] w-full top-0 h-[400px] left-0 absolute" />
                <div
                    className={`
            video-container 
            static 1024px:absolute 
            w-full 
            bg-white 768px:bg-transparent 
            left-0 
            1024px:flex flex-col justify-center items-center
            ${service ? 'top-[60px]' : 'top-0'}
          `}
                >
                    <div className="video-player max-w-[1024px] w-full h-full">
                        <VimeoLite videoId="330415813" />
                    </div>
                    <Typography
                        as="h2"
                        fontFamily="montserrat"
                        className="text-[16px] mt-[4px] leading-[22px] w-[90%] text-black 
             text-center relative z-[1] 768px:text-xl 992px:text-[16px] 
             768px:leading-[1.6rem] 768px:w-[80%] 992px:w-full
             mx-auto 992px:mt-3 font-normal"
                    >
                        A couple words from our Chief Operating Officer - Bethaney Bacchus
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VimeoLite = ({
  videoId,
  title = "Vimeo Video",
  width = "100%",
  aspectRatio = "16:9",
  thumbnail,
}) => {
  const [videoState, setVideoState] = useState("idle");
  const iframeRef = useRef(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnail);

  useEffect(() => {
    if (!thumbnail) {
      fetch(`https://vimeo.com/api/v2/video/${videoId}.json`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]) {
            setThumbnailUrl(data[0].thumbnail_large);
          }
        })
        .catch((error) =>
          console.error("Error fetching Vimeo thumbnail:", error)
        );
    }
  }, [videoId, thumbnail]);

  const handlePlay = () => {
    if (iframeRef.current) {
      const newSrc = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;

      // Set iframe src directly
      iframeRef.current.src = newSrc;

      // Update state to playing
      setVideoState("playing");
    }
  };

  return (
    <div
      className="vimeo-lite"
      style={{
        position: "relative",
        width: width,
        maxWidth: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: `${
            (1 / aspectRatio.split(":").reduce((a, b) => a / b)) * 100
          }%`,
        }}
      >
        {/* Thumbnail Layer */}
        {videoState === "idle" && thumbnailUrl && (
          <div
            className="vimeo-lite-preview group"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
              overflow: "hidden",
            }}
            onClick={handlePlay}
          >
            {/* Thumbnail Image with Next.js Image */}
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  zIndex: 1, // Ensure the image stays under the vignette
                }}
              />
            )}

            {/* Vignette Effect using pseudo-element */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.6) 100%)", // Vignette at corners, clear center
                zIndex: 2, // Ensure vignette is on top of the image
              }}
            ></div>

            {/* YouTube-style Play Button */}
            <div
              className={`youtube-play-button bg-[#212121] opacity-80 group-hover:bg-primary group-hover:opacity-100`}
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10%",
                transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
                zIndex: 11,
                width: "70px",
                height: "46px",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                  borderLeft: "19px solid white",
                  marginLeft: "8px",
                  marginRight: "4px",
                }}
              />
            </div>
          </div>
        )}

        {/* Iframe Layer */}
        <iframe
          ref={iframeRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: videoState === "playing" ? 9 : 1,
          }}
          src={null} // Set initial src to null to avoid the empty string issue
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VimeoLite;
import React from 'react'

const Container = ({ children, className = "", style = {}, id }) => {
  return (
    <div className={` max-w-[1366px] mx-auto ${className}`} style={style} id={id}>
      {children}
    </div>
  );
};

export default Containerimport React from "react";
import styles from "./ScrollableSection.module.css";


const ScrollableSection = ({ children, className = "", style = {} }) =>
{
    return (
        <div className={`${styles.contentScroll} ${className} `} style={style}>
            {children}
        </div>
    );
};

export default ScrollableSection;
/* Universal Scrollable Styles */
.contentScroll {
    overflow: auto;

    /* Custom scrollbar variables */
    --scrollbarBG: #ebebeb;
    --thumbBG: #808080;
    /* Rounded thumb */
    /* Cross-browser scrollbar styles */
}

/* Webkit scrollbar styles (Chrome, Edge, Safari) */
.contentScroll:: -webkit - scrollbar {
    width: 10px; /* Adjust scrollbar width */
}

.contentScroll:: -webkit - scrollbar - thumb {
    background: var(--thumbBG); /* Thumb color */
    border - radius: 20px; /* Rounded thumb */
}

.contentScroll:: -webkit - scrollbar - track {
    background: var(--scrollbarBG); /* Track color */
    border - radius: 20px; /* Rounded track */
}

import Image from "next/image";
import React, { useMemo } from "react";

const BASE_URL = "https://www.securecash.com.au/images/companies/";

const companyNames = [
  "dominos",
  "mcdonalds",
  "pizzahut",
  "coffee",
  "southaus",
  "muffinbreak",
  "redrooster",
  "stratco",
  "ford",
  "kathmandu",
  "nsw",
  "queens",
  "takingshape",
  "tasmanian",
  "victoria",
  "ymca",
  "west",
  "subway",
];

const slideData = companyNames.map((name) => ({
  src: `${BASE_URL}${name}.png`,
  alt: name,
}));

const Slide = ({ src, alt }) => (
  <div className="w-[300px] p-0 mt-auto mb-auto">
    <Image
      className="align-middle filter contrast-0 h-[150px] w-auto hover:cursor-default hover:filter hover:contrast-[100%]"
      width={300}
      height={150}
      src={src}
      alt={alt}
    />
  </div>
);

const CompaniesSlider = ({ className }) =>
{
  const extendedSlides = useMemo(() =>
  {
    const sliceCount = 3;
    return [
      ...slideData.slice(-sliceCount), // Append last 3 slides to the beginning
      ...slideData,
      ...slideData.slice(0, sliceCount), // Prepend first 3 slides to the end
    ];
  }, []);

  return (
    <div id="companies1" className={`px-0 py-[30px] 992px:py-[65px] ${className} `}>
      <div className=" h-full m-auto overflow-hidden w-full">
        <div className="animate-[scrollright_60s_linear_infinite] flex w-[calc(300px * 36)]">
          {extendedSlides.map((slide, index) => (
            <Slide key={index} src={slide.src} alt={slide.alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSlider;
import React from "react";
import Divider from "./Divider";
import Typography from "./Typography";

const BottomBanner = () =>
{
    return (
        <>
            <div id="about-us-banner-bottom" className="h-[340px] w-full max-[414px]:mt-0">
                <div
                    id="banner-mid-content"
                    className="relative h-[340px] w-full mx-auto flex flex-col justify-end items-center px-4 
             bg-cover bg-no-repeat 
             before:content-[''] before:absolute before:inset-0 before:h-full before:w-full
             before:bg-[url('https://securecash.com.au/images/team.webp')] before:bg-no-repeat 
             before:bg-[left_34%] before:bg-cover before:brightness-50 
             no-webp:before:bg-[url('https://securecash.com.au/images/team.jpg')]"
                >

                    <Typography
                        as="h2"
                        fontFamily="montserrat"
                        className="text-white font-medium leading-[2rem] text-center max-[414px]:text-[36px] text-[40px] z-30 py-6"
                    >
                        Let us do the banking for you
                    </Typography>
                    <Divider
                        color="primary"
                        alignment="left"
                        margin="mt-[6px] mb-[36px]"
                        responsiveClassName="768px:text-left 768px:mx-0 divider-gold divider-2 z-20"
                    />
                </div>
            </div>
        </>
    );
};

export default BottomBanner;
import Container from "@/components/layout/Container";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaUserAlt } from "react-icons/fa";

const BannerInfo = () => (
    <Container className="w-full">
        <div className={`w-full mx-auto bg-black relative  1024px:top-[-36px] py-3 px-0 text-white text-sm  1024px:rounded-[40px] 1024px:py-0 1024px:px-0  1024px:w-[95%] 1024px:flex justify-center items-center 1440px:w-full`}>
            <InfoItem icon={FaPhoneAlt} size="20px">
                Ask Us Anything&nbsp;
                <Link href="tel:1300732873" className="text-primary hover:underline">
                    1300 SECURE
                </Link>
            </InfoItem>
            <InfoItem icon={FaEnvelope} size="20px" className="hidden 1440px:block">
                For Quotes and Enquiries&nbsp;
                <Link
                    href="mailto:customers@securecash.com.au"
                    className="text-primary hover:underline"
                >
                    customers@securecash.com.au
                </Link>
            </InfoItem>
            <InfoItem icon={FaEnvelope} size="20px" className="block 1440px:hidden">
                <Link
                    href="mailto:customers@securecash.com.au"
                    className="text-primary hover:underline"
                >
                    customers@securecash.com.au
                </Link>
            </InfoItem>
            <InfoItem icon={FaUserAlt} size="20px">
                Learn More&nbsp;
                <Link href="/about-us" className="text-primary hover:underline">
                    About us
                </Link>
            </InfoItem>
        </div>
    </Container>
);

const InfoItem = ({ icon: Icon, size, children, className = "" }) => (
    <div
        className={` flex justify-center items-center text-left pl-0 py-[5px] relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-6 ${className}`}
    >
        <div className=" flex justify-center items-center gap-3">
            <Icon style={{ fontSize: size }} />
            <span>{children}</span>
        </div>
    </div>
);
export default BannerInfo;
import React from "react";

const Divider = ({
  color = "white", // Default color
  width = "100px", // Default width
  alignment = "center", // Alignment: 'center', 'left', or 'right'
  margin = "my-6", // Default margin
  padding = "", // Padding if needed
  responsiveClassName = "", // Additional responsive styles
}) =>
{
  // Determine alignment classes
  const getAlignmentClasses = () =>
  {
    switch (alignment) {
      case "left":
        return "ml-0 mr-auto";
      case "right":
        return "ml-auto mr-0";
      case "center":
      default:
        return "mx-auto";
    }
  };

  // Create the style object for custom values
  const customStyles = {
    width: width, // Set width via inline style for dynamic values
  };

  // Handle color
  let colorClass = "";
  if (color.includes("#")) {
    customStyles.backgroundColor = color;
  } else {
    colorClass = `bg-${color}`;
  }

  const alignmentClasses = getAlignmentClasses();

  return (
    <hr
      className={`h-[4px] rounded-[5px] border-0 ${colorClass} ${margin} ${padding} ${alignmentClasses} ${responsiveClassName}`}
      style={customStyles}
    />
  );
};

export default Divider; import Link from 'next/link';
import React from 'react';

const DoubleButton = ({
    primaryButton = { text: "Get a Quote", href: "/quote" },
    secondaryButton = { text: "Read More", href: "#read-more" },
    className = "",
    id = ""
}) =>
{
    const baseContainerClasses = "cta-box w-[95%] 480px:w-[80%] 600px:w-[50%] justify-evenly mt-0 414px:mt-[50px] 992px:mt-[80px] relative 992px:w-[545px] flex items-center 1070px:mb-0 1070px:mt-[40px]";

    const baseBtnClasses = "flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0 rounded-full 992px:min-w-[200px] 992px:min-h-[62px] max-h-[73px] group 768px:mx-auto 992px:mx-0";

    const baseTextClasses = "m-0 p-0 text-[14px] 768px:text-base 992px:text-[20px] font-semibold w-full hover:no-underline text-center";

    return (
        <div
            className={`${baseContainerClasses} ${className}`}
            id={id}
        >
            {/* Primary Button */}
            <Link href={primaryButton.href} className="mx-[10px] 992px:mx-0 button">
                <div className={`${baseBtnClasses} bg-[#c7a652] btn-learn-more hover:bg-white`}>
                    <p className={`${baseTextClasses} text-[#ffffff] group-hover:text-[#000]`}>
                        {primaryButton.text}
                    </p>
                </div>
            </Link>

            {/* Secondary Button */}
            <Link href={secondaryButton.href} className="mx-[10px] 992px:mx-0 button">
                <div className={`${baseBtnClasses} bg-white`}>
                    <p className={`${baseTextClasses} group-hover:text-[#c7a652] text-[#000]`}>
                        {secondaryButton.text}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default DoubleButton; import React from "react";
import Link from "next/link";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";

const links = [
    {
        title: "Useful Links",
        columns: [
            [
                { href: "/", text: "Home" },
                { href: "/services/cash-in-transit", text: "Services" },
                { href: "/quote", text: "Get a Quote" },
                { href: "/contact-us", text: "Contact Us" },
            ],
            [
                { href: "https://service.securecash.com.au/", text: "Online Services" },
                { href: "https://www.edockets.app/", text: "eDocket App" },
                { href: "/blog", text: "Blog" },
                { href: "/franchise", text: "SecureCash Franchises" },
            ],
        ],
    },
];

const contactInfo = [
    {
        icon: <FaPhoneAlt className="pr-2.5 text-[26px] relative inline" />,
        text: "1300 SECURE / 1300732873",
        link: "tel:1300732873",
        isLink: true,
    },
    {
        icon: <FaMapMarkerAlt className="pr-2.5 text-[26px] relative inline" />,
        text: "Anywhere, Anytime, Australia Wide",
    },
    {
        icon: <FaEnvelope className="pr-2.5 text-[26px] relative inline" />,
        text: "customers@securecash.com.au",
        link: "mailto:customers@securecash.com.au",
        isLink: true,
    },
    {
        icon: <FaStar className="pr-2.5 text-[26px] relative inline" />,
        text: "Proudly Serving Customers Australia Wide 24/7",
    },
];

const Footer = () =>
{
    return (
        <>
            <div
                id="footer-links"
                className="w-full bg-[#1a1a1a] flex flex-wrap py-10 768px:py-20"
            >
                <div className="w-[95%] 1280px:w-full max-w-screen-1366px mx-auto flex justify-center items-center flex-col 768px:flex-row">
                    {/* Left Column */}
                    <div className="left-column w-[85%] 600px:w-full 1024px:w-[65%] 1280x:w-[70%]">
                        <h4 className="font-prata text-3xl text-white text-center 1024px:text-start font-normal m-0">
                            Useful Links
                        </h4>
                        <hr className="h-1 border-0 m-[16px_0_40px_0] w-[180px] rounded-[5px] bg-primary text-left mx-auto 1024px:mx-0" />

                        {/* Desktop Links */}
                        <div className="hidden lg:block">
                            {links[0].columns.map((column, index) => (
                                <div
                                    key={index}
                                    className="pl-10 lg:pl-0 pt-0 w-[33%] lg:w-[30%] float-left text-center relative"
                                >
                                    <ul className="list-none text-left">
                                        {column.map((link, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={link.href}
                                                    className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Links */}
                        <div className="block lg:hidden">
                            {links[0].columns.map((column, index) => (
                                <div
                                    key={index}
                                    className="lg:text-center w-1/2 m-0 p-0 text-left float-left"
                                >
                                    <ul className="list-none text-left md:text-left">
                                        {column.map((link, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={link.href}
                                                    className="text-white text-sm leading-[3.5em] font-normal"
                                                >
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="right-column block mt-10 md:mt-0 lg:float-left w-[85%] sm:w-full lg:w-[40%] xl:w-[30%]">
                        <h4 className="font-prata text-3xl text-white text-center lg:text-start font-normal m-0">
                            Contact
                        </h4>
                        <hr className="h-1 border-0 m-[16px_0_40px_0] w-[120px] rounded-[5px] bg-primary text-left mx-auto lg:mx-0" />
                        <ul className="list-none text-center lg:text-left">
                            {contactInfo.map((info, index) => (
                                <li
                                    key={index}
                                    className="text-white text-sm leading-[3.5em] font-normal text-left line-clamp-1"
                                >
                                    {info.icon}
                                    &nbsp;&nbsp;
                                    {info.isLink ? (
                                        <a
                                            href={info.link}
                                            className="text-primary hover:underline"
                                        >
                                            {info.text}
                                        </a>
                                    ) : (
                                        info.text
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="w-full min-h-[50px] bg-[#0e0e0e] text-white text-center text-base flex justify-center items-center mb-0 pt-0">
                <p className="m-0 text-[12px] leading-[2em] p-5">
                    &copy;2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under
                    License) as Secure Cash - NSW Master License Number 108420 | Proud
                    creators of&nbsp;
                    <Link href="/edocket-app" className="text-primary hover:underline">
                        eDockets
                    </Link>
                </p>
            </footer>
        </>
    );
};

export default Footer;
"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import Headroom from "react-headroom";

// Constants
const MENU_ITEMS = [
    { name: "Home", href: "/" },
    {
        name: "About Us",
        submenuId: "aboutUs",
        href: "/about-us",
        links: [
            { text: "About Us", href: "/about-us" },
            { text: "Blog", href: "/blog" },
            { text: "Franchises", href: "/franchise" },
            { text: "Partners", href: "/partners" },
        ],
    },
    {
        name: "Services",
        submenuId: "services",
        href: "/about-us",
        links: [
            { text: "Cash In Transit", href: "/services/cash-in-transit" },
            { text: "Cash Collection", href: "/services/cash-collection" },
            { text: "Cash Delivery", href: "/services/cash-delivery" },
            { text: "Cash Counting", href: "/services/cash-counting" },
            { text: "No Armoured Trucks", href: "/services/armoured-car-service" },
            { text: "Tips On Cash Security", href: "/services/cash-security" },
            { text: "Our Cash Couriers", href: "/services/cash-couriers" },
            { text: "Cash Logistics Management", href: "/services/cash-logistics-management" },
        ],
    },
    { name: "Online Services", href: "https://service.securecash.com.au/" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get A Quote", href: "/quote" },
];

// Logo Component
const Logo = ({ onClick }) => (
    <div className="inline 1024px:mx-0 1024px:text-left 1024px:pb-0 mx-auto text-center pb-5">
        <Link href="/" onClick={onClick}>
            <Image
                src="/images/SecureCash.webp"
                alt="SecureCash Logo"
                width={285}
                height={0}
                className="w-[285px] h-auto"
                priority={true}
            />
        </Link>
    </div>
);

// Quote Button Component
const QuoteButton = () => (
    <Link href="/quote/">
        <div className="min-w-[182px] min-h-[70px] max-h-[70px] text-black flex flex-row justify-center items-center rounded-full bg-primary hover:text-white hover:cursor-pointer shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] leading-[22px] hover:bg-black group">
            <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-1 mb-0.5 group-hover:bg-quote-icon-white" />
            <p className="m-0 p-0 text-base">Get a Quote</p>
        </div>
    </Link>
);

// Desktop Submenu Component
const DesktopSubmenu = ({ links }) => (
    <ul className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-50 border-t-4 border-active-text mt-5 ml-[-3px] bg-white group-hover:block">
        <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-active-text border-solid -top-2 -left-0.5 absolute" />
        {links.map((subLink, index) => (
            <li key={index} className="border-b border-light-border">
                <Link
                    href={subLink.href}
                    className="block p-[19px_40px_18px_20px] text-primary-text text-sm no-underline leading-[22px] hover:text-active-text hover:bg-black"
                >
                    {subLink.text}
                </Link>
            </li>
        ))}
    </ul>
);

// Desktop Menu Component
const DesktopMenu = ({ onMenuClick }) => (
    <div
        id="main-menu"
        className="w-full 1024px:flex flex-row items-center hidden "
    >
        <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[97%] 1200px:w-[90%]">
            {MENU_ITEMS.filter((item) => item.name !== "Get A Quote").map(
                (item, index) =>
                {
                    const hasSubMenu = Boolean(item.submenuId);

                    return (
                        <li key={index} className="leading-[50px] py-5 relative group">
                            <Link
                                href={item.href}
                                className="block text-primary-text text-sm no-underline leading-6 group-hover:text-active-text"
                            >
                                {hasSubMenu && (
                                    <>
                                        <i className="rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-0.5 group-hover:border-active-text" />
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </>
                                )}
                                {item.name}
                            </Link>
                            {hasSubMenu && <DesktopSubmenu links={item.links} />}
                        </li>
                    );
                }
            )}
            <li className="leading-[50px] py-5">
                <QuoteButton />
            </li>
        </ul>
    </div>
);

// Mobile Submenu Component
const MobileSubmenu = ({ subMenuId, links, isActive, onMenuClick }) => (
    <ul
        className={`overflow-hidden bg-white text-[#808080] ${isActive ? "opacity-100 visible h-auto mt-5" : "opacity-0 invisible h-0"
            }`}
    >
        {links.map((link, index) => (
            <li
                key={index}
                className="w-full text-left text-base py-5 bg-white 992px:w-auto"
            >
                <Link
                    href={link.href}
                    className="text-paragraph text-sm pl-11 ml-[20%]"
                    onClick={onMenuClick}
                >
                    {link.text}
                </Link>
            </li>
        ))}
    </ul>
);

// Mobile Menu Component
const MobileMenu = ({
    isVisible,
    activeSubMenu,
    onToggleSubmenu,
    onMenuClick,
}) => (
    <div
        id="mobile-menu"
        className={`block ${isVisible ? "h-screen" : ""
            }  bg-white 1024px:hidden w-full`}
    >
        <button
            className="bg-primary w-full py-[15px] px-2.5 text-white pl-7"
            onClick={onMenuClick}
        >
            <span className="flex items-center gap-0.5">
                <FaBars className="relative -left-2.5" />
                Menu
            </span>
        </button>
        <ul
            className={`transition-all duration-100 ${isVisible ? "h-[70vh] opacity-100" : "max-h-0 opacity-0"
                } overflow-auto`}
        >
            {MENU_ITEMS.map((item, index) => (
                <li
                    key={index}
                    className={`border-b border-light-border py-5 ${item.submenuId && activeSubMenu === item.submenuId
                        ? "bg-black pb-0"
                        : "text-black"
                        }`}
                >
                    {item.submenuId ? (
                        <>
                            <button
                                className={`ml-[20%] flex items-center gap-4 ${activeSubMenu === item.submenuId && "text-active-text"
                                    }`}
                                onClick={() => onToggleSubmenu(item.submenuId)}
                            >
                                <i className="rotate-45 border-dark-border border-r-2 border-b-2 w-2 h-2" />
                                {item.name}
                            </button>
                            <MobileSubmenu
                                subMenuId={item.submenuId}
                                links={item.links}
                                isActive={activeSubMenu === item.submenuId}
                                onMenuClick={onMenuClick}
                            />
                        </>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-black ml-[20%]"
                            onClick={onMenuClick}
                        >
                            {item.name}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    </div>
);

// Main Navbar Component
const Navbar = () =>
{
    const [mobileNavVisible, setMobileNavVisible] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const toggleMobileMenu = () =>
    {
        setMobileNavVisible((prev) => !prev);
        setActiveSubMenu(null);
    };

    const toggleMobileSubMenu = (subMenuId) =>
    {
        setActiveSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
    };

    const handleMenuClick = () => setMobileNavVisible(false);

    return (
        <Headroom className="z-50 relative ">
            <header
                className={`bg-white  w-full h-auto transition-all duration-500 shadow-[0_1px_6px_0_rgba(32,33,36,.28)] ${mobileNavVisible ? "fixed no-doc-scroll" : ""
                    }`}
            >
                <div className="w-full max-w-[1366px] mx-auto pt-2.5 1024px:pb-2.5 flex justify-evenly items-center">
                    <div className="w-full 1024px:w-[95%] 1440px:w-full flex 1024px:flex-row flex-col justify-center items-center">
                        <Logo onClick={handleMenuClick} />
                        <DesktopMenu onMenuClick={handleMenuClick} />
                        <MobileMenu
                            isVisible={mobileNavVisible}
                            activeSubMenu={activeSubMenu}
                            onToggleSubmenu={toggleMobileSubMenu}
                            onMenuClick={toggleMobileMenu}
                        />
                    </div>
                </div>
            </header>
        </Headroom>
    );
};

export default Navbar;
import { FaArrowDownLong } from "react-icons/fa6";
import Container from "@/components/layout/Container";
import Divider from "@/components/common/Divider";

export const HeroSectionWithParagraph = ({
    titleSm,
    title = "title",
    buttonText,
    buttonHref,
    page,
    paragraphs = [],
}) => (
    <section className={`welcome-main-hero h-[434px] 600px:h-[500px] 1024px:h-[600px] 1200px:h-[547px]  relative ${page === "ica" ? "1366px:h-[610px]" : ""}`}>

        {page === "terms" && (
            <div className="absolute left-0 w-full h-[434px] 600px:h-[500px]  600px:w-[40%] 1024px:w-2/4 1024px:h-[600px] 1200px:h-[547px]  1366px:h-[610px] bg-black -z-[1]"></div>
        )}{" "}
        {page === "ica" && (
            <>
                <div className="absolute left-0 w-full h-[434px] 600px:h-[500px] 1024px:h-[600px] 1200px:h-[547px] 1366px:h-[610px] 600px:w-[40%] 1024px:w-2/4 bg-black -z-[1]"></div>

                <div
                    className="absolute hidden 480px:block right-0 w-[54%] 768px:w-1/2 h-[434px] 600px:h-[500px] 1024px:h-[600px] 1200px:h-[547px] 1366px:h-[610px] bg-cover bg-no-repeat -z-10"
                    style={{
                        backgroundImage:
                            'url("https://www.securecash.com.au/images/ica/ica-hero-bg.jpg")',
                    }}
                ></div>
            </>
        )}
        <Container className="inner w-full h-full  600px:flex flex-col">
            <div className="welcome-main-hero--wrap h-full flex flex-wrap">
                <HeroLeftContent
                    titleSm={titleSm}
                    title={title}
                    buttonText={buttonText}
                    buttonHref={buttonHref}
                />
                <HeroRightContent paragraphs={paragraphs} page={page} />
            </div>
        </Container>
    </section>
);

const HeroLeftContent = ({ titleSm, title, buttonText, buttonHref }) => (
    <div
        className="welcome-main-hero--content-left relative text-white w-full text-center 600px:text-left pt-[66px] pb-[56px]  600px:pt-[138px]  600px:pr-0  600px:pb-[128px]  600px:pl-[12px]  
  600px:w-2/5 768px:pl-6  768px:pt-[170px]  768px:pb-[153px]   1366px:pl-[18px] 1024px:w-2/4 welcome-main-hero--content-left-tnc"
    >
        {titleSm && (
            <h2 className="welcome-main-hero--content-left__title-sm text-[26px]  1024px:text-[38px] font-light mb-[6px]  1024px:mb-[3px] 600px:text-left">
                {titleSm}
            </h2>
        )}

        <h1 className="welcome-main-hero--content-left__title text-[38px] leading-[42px] 1024px:leading-[1em] 1024px:text-[64px] font-extrabold 600px:font-semibold 600px:text-left">
            {title}
        </h1>

        <Divider
            color="primary"
            alignment="center"
            margin="my-[22px] mb-[34px]"
            responsiveClassName="mx-auto  600px:mx-0 1024px:text-left 1024px:mx-0 1366px:mt-[30px] 1024px:mb-[57px]"
        />

        {buttonText && buttonHref && (
            <>
                <a
                    className="btn btn-welcome-hero btn-welcome-main text-[14px] px-5 py-3 border border-white   1024px:text-[16px]  1024px:px-[40px]  1024px:py-[20px] mb-[30px] "
                    href={buttonHref}
                >
                    {buttonText}
                </a>

                <div
                    className="arrow-down hidden absolute w-[60px] h-[60px] bg-black right-0 -bottom-[20px] 1366px:-bottom-[70px]  1024px:flex justify-center items-center z-10"
                    id="ins-pane-trigger"
                >
                    <a className="py=[18px] px-[25px]" href={buttonHref}>
                        <FaArrowDownLong className="text-white text-[22px]" />
                    </a>
                </div>
            </>
        )}
    </div>
);

const HeroRightContent = ({ paragraphs, page }) => (
    <div className="welcome-main-hero--content-right text-[#6e6e6e] relative w-full  600px:w-[60%] 1024px:w-2/4  600px:grid place-items-center">
        <div className="welcome-main-hero--content-right--card relative w-auto mx-[20px] top-0 right-0 py-[40px] px-[43px]  600px:top-0 600px:right-[10px]  600px:w-full p-[54px_43px] 768px:right-8 800px:right-12 768px:top-0    768px:w-[110%] 1024px:w-[105%]  1024px:right-8  1024px:p-[88px_63px]   1366px:absolute  1366px:top-[15%]  1366px:w-[107%] bg-[#f2f2f2]  1366px:px-[70px]  1366px:py-[96px] shadow-[0px_0px_19px_-5px_#737373] 1366px:right-0  600px:my-auto ">
            {paragraphs.map((text, index) => (
                <p
                    key={index}
                    className={`text-[14px]  768px:text-[16px] font-light leading-[2em] ${index === paragraphs.length - 1 ? "" : "mb-[16px]"}`}
                >
                    {text}
                </p>
            ))}
            {page === "ica" && (
                <p className="text-[14px]  768px:text-[16px] font-light leading-[2em] mt-4">
                    To learn more about how we manage information provided you can view
                    our{" "}
                    <a href="https://www.securecash.com.au/privacy-policy/">
                        Privacy Policy
                    </a>
                </p>
            )}
        </div>
    </div>
);
import React from 'react'

const Paragraph = ({
  children,
  className = "",
  style = {},
  color = "", // Default color is primary
  fontSize = "16px", // Default font size
  fontWeight = "light", // Default weight is bold
  lineHeight = "", // Default line height
  textAlign = "center", // Default alignment
  marginBottom = "24px", // Default margin bottom\
  marginTop = "",
  responsiveClassName = "", // Custom responsive classes
  textShadow = false,
}) => {
  // Determine the correct color class
  const colorClass = color.includes("#") ? `text-[${color}]` : `text-${color}`;

  // Dynamically render the appropriate tag (h1, h2, h3, etc.)

  return (
    <p
      className={`font-montserrat font-${fontWeight} text-[${fontSize}] leading-[${lineHeight}] text-${textAlign} mb-[${marginBottom}] ${colorClass} ${responsiveClassName} ${className} ${
        textShadow && "[text-shadow:2px_2px_6px_#111111]"
      }`}
      style={style}
    >
      {children}
    </p>
  );
};

export default Paragraphimport React from "react";

const SubHeading = ({
  children,
  as = "h1", // Default is h1, can be changed to h2, h3, etc.
  className = "",
  style = {},
  color = "", // Default color is primary
  fontWeight = "", // Default weight is bold
  fontSize = "22px", // Default font size
  lineHeight = "32", // Default line height
  textAlign = "center", // Default alignment
    marginBottom = "24px", // Default margin bottom\
  marginTop="",
    responsiveClassName = "", // Custom responsive classes
  textShadow = false,
}) => {


  // Determine the correct color class
  const colorClass = color.includes("#")
    ? `text-[${color}]`
      : `text-${color}`;
    
      const fontFamily = fontWeight.includes("regular")
        ? `font-prata-regular`
        : `font-prata`;

  // Dynamically render the appropriate tag (h1, h2, h3, etc.)
  const Tag = as;

  return (
    <Tag
      className={`${fontFamily} font-${fontWeight} text-[${fontSize}] leading-[${lineHeight}] text-${textAlign} mb-[${marginBottom}] ${colorClass} ${responsiveClassName} ${className} ${
        textShadow && "[text-shadow:2px_2px_6px_#111111]"
      }`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default SubHeading;
import React from "react";

const Typography = ({ children, as: Tag = "h1", className = "", fontFamily = "montserrat" }) =>
{
  // Determine the correct font class based on `fontFamily`
  const fontClass =
    fontFamily === "prata-regular"
      ? "font-prata-regular"
      : fontFamily === "prata"
        ? "font-prata"
        : "font-montserrat"; // Default to Montserrat

  return <Tag className={`${fontClass} ${className}`}>{children}</Tag>;
};

export default Typography;
