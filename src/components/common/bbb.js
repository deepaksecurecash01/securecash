"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMobileMenu = () => {
    setMobileNavVisible((prev) => !prev);
    setActiveSubMenu(null); // Close all submenus when the main menu toggles
  };

  const toggleMobileSubMenu = (subMenuId) => {
    setActiveSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
  };

  const handleMenuClick = () => setMobileNavVisible(false); // Close menu on item click

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

          {/* Mobile Menu */}
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

          {/* Main Menu */}
          <div
            id="main-menu"
            className="w-full lg:flex flex-row items-center hidden"
          >
            <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[90%]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="leading-[50px] py-[20px] relative group"
                >
                  <Link
                    href={item.href}
                    className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] group"
                  >
                    <i
                      className={`rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px] ${
                        item.submenuId ? "group-hover:border-[#c5a44b]" : ""
                      }`}
                    />
                    {item.name}
                  </Link>
                  {item.submenuId && (
                    <ul className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-[100] border-t-4 border-[#c5a44b] mt-[20px] ml-[-3px] bg-white group-hover:block">
                      <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#c5a44b] border-solid top-[-8px] left-[2px] absolute" />
                      {item.links.map((subLink, subIndex) => (
                        <li
                          key={subIndex}
                          className="border-b border-[#e9e9e9]"
                        >
                          <Link
                            href={subLink.href}
                            className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                          >
                            {subLink.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
