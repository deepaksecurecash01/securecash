import React from "react";
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
        { href: "/contact", text: "Contact Us" },
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

const Footer = () => {
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
