"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link"; // Import Link from Next.js

const Navbar = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMobileMenu = () => {
    setMobileNavVisible((prev) => !prev);
    setActiveSubMenu(null); // Close all submenus when the main menu toggles
  };

  const toggleMobileSubMenu = (subMenuId) => {
    setActiveSubMenu((prevActive) =>
      prevActive === subMenuId ? null : subMenuId
    );
  };

  const handleMenuClick = () => {
    setMobileNavVisible(false); // Close the mobile menu when a menu item is clicked
  };

  const renderSubMenu = (subMenuId, links) => (
    <ul
      className={`overflow-hidden bg-white ${
        activeSubMenu === subMenuId
          ? "opacity-100 visible h-auto mt-5"
          : "opacity-0 invisible h-0"
      }`}
    >
      {links.map((link, index) => (
        <li
          key={index}
          className="w-full text-left text-base py-5 bg-white lg:w-auto"
        >
          <Link
            href={link.href}
            className="text-paragraph text-sm pl-11 ml-[20%]"
            onClick={handleMenuClick}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      submenuId: "aboutUs",
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
      links: [
        { text: "Cash In Transit", href: "/cash-in-transit" },
        { text: "Cash Collection", href: "/cash-collection" },
        { text: "Cash Delivery", href: "/cash-delivery" },
        { text: "Cash Counting", href: "/cash-counting" },
        { text: "No Armoured Trucks", href: "/armoured-car-service" },
        { text: "Tips On Cash Security", href: "/cash-security" },
        { text: "Our Cash Couriers", href: "/cash-couriers" },
        {
          text: "Cash Logistics Management",
          href: "/cash-logistics-management",
        },
      ],
    },
    { name: "Online Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get A Quote", href: "/quote" },
  ];

  return (
    <header className="fixed z-50 bg-white w-full h-auto max-h-[135px] top-0 transition-all duration-500 shadow-[0_1px_6px_0_rgba(32,33,36,.28)]">
      <div className="w-full max-w-[1366px] mx-auto my-[10px]">
        <div className="w-full flex lg:flex-row flex-col justify-center items-center header-wrapper">
          <div
            id="logo"
            className="inline lg:mx-0 lg:text-left lg:pb-0 mx-auto text-center pb-5"
          >
            <Link href="/" onClick={handleMenuClick}>
              <Image
                src="/images/SecureCash.webp"
                alt="SecureCash Logo"
                width={285}
                height={0}
                className="w-[285px] h-auto"
                priority
              />
            </Link>
          </div>
          <div id="mobile-menu" className="block lg:hidden w-full">
            <button
              className="bg-[#c7a652] w-full py-[15px] px-[10px] text-white pl-[30px]"
              onClick={toggleMobileMenu}
            >
              <span className="flex items-center gap-[2px]">
                <FaBars className="relative left-[-10px]" />
                Menu
              </span>
            </button>

            <ul
              id="mobileNav"
              className={`transition-all duration-100 bg-white ${
                mobileNavVisible ? "h-[100vh] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`border-b border-[#e9e9e9] py-5 ${
                    item.submenuId && activeSubMenu === item.submenuId
                      ? "bg-black pb-0 text-[#c5a44b]"
                      : " text-black"
                  }`}
                >
                  {item.submenuId ? (
                    <>
                      <button
                        className="ml-[20%] flex items-center gap-4"
                        onClick={() => toggleMobileSubMenu(item.submenuId)}
                      >
                        <i className="rotate-45 border-[#636363] border-r-2 border-b-2 w-2 h-2" />
                        {item.name}
                      </button>
                      {renderSubMenu(item.submenuId, item.links)}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-black ml-[20%]"
                      onClick={handleMenuClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="main-menu"
            className="w-full lg:flex flex-row items-center hidden"
          >
            <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[90%]">
              <li className="leading-[50px] py-[20px]">
                <Link
                  href="/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Home
                </Link>
              </li>
              <li className="leading-[50px] py-[20px] relative group">
                <Link
                  href="/about-us/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] group"
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px] group-hover:border-[#c5a44b]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;About Us
                </Link>
                <ul
                  id="subMenu1"
                  className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-[100] border-t-4 border-[#c5a44b] mt-[20px] ml-[-3px] bg-white group-hover:block"
                >
                  <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#c5a44b] border-solid top-[-8px] left-[2px] absolute" />
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/about-us/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/blog/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/franchise/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Franchises
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/partners/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="leading-[50px] py-[20px] relative group">
                <Link
                  href="/banking-pickups/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] group"
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px] group-hover:border-[#c5a44b]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;Services
                </Link>
                <ul
                  id="subMenu2"
                  className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-[100] border-t-4 border-[#c5a44b] mt-[20px] ml-[-3px] bg-white group-hover:block"
                >
                  <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#c5a44b] border-solid top-[-8px] left-[2px] absolute" />
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-in-transit/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash In Transit
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-collection/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Collection
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-delivery/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Delivery
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-counting/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Counting
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/armoured-car-service/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      No Armoured Trucks
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-security/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Tips On Cash Security
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <Link
                      href="/cash-couriers/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Our Cash Couriers
                    </Link>
                  </li>
                  <li className="border-b border-[#e9e9e9] last:border-b-0">
                    <Link
                      href="/cash-logistics-management/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Logistics Management
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="leading-[50px] py-[20px]">
                <Link
                  href="/online-services/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Online Services
                </Link>
              </li>
              <li className="leading-[50px] py-[20px]">
                <Link
                  href="/contact/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Contact Us
                </Link>
              </li>
              <li className="leading-[50px] py-[20px]">
                <Link href="/quote/">
                  <div className="min-w-[182px] min-h-[70px] max-h-[70px] text-black flex flex-row justify-center items-center rounded-full bg-[#C7A652] hover:text-white hover:cursor-pointer shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] leading-[22px] hover:bg-black group">
                    <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-[4px] mb-[2px] group-hover:bg-quote-icon-white" />
                    <p className="m-0 p-0 text-[16px]">Get a Quote</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
