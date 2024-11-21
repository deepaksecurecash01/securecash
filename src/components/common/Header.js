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
          className="w-full text-left text-base py-5 bg-white 992px:w-auto"
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
      <div className="w-full max-w-screen-1366px mx-auto my-2.5 flex justify-evenly items-center">
        <div className="w-full 992px:w-[95%] 1600px:w-full flex 992px:flex-row flex-col justify-center items-center">
          <div
            id="logo"
            className="inline 992px:mx-0 992px:text-left 992px:pb-0 mx-auto text-center pb-5"
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
          <div id="mobile-menu" className="block 992px:hidden w-full">
            <button
              className="bg-primary w-full py-4 px-2.5 text-white pl-7"
              onClick={toggleMobileMenu}
            >
              <span className="flex items-center gap-0.5">
                <FaBars className="relative -left-2.5" />
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
                  className={`border-b border-light-border py-5 ${
                    item.submenuId && activeSubMenu === item.submenuId
                      ? "bg-black pb-0 text-active-text"
                      : " text-black"
                  }`}
                >
                  {item.submenuId ? (
                    <>
                      <button
                        className="ml-[20%] flex items-center gap-4"
                        onClick={() => toggleMobileSubMenu(item.submenuId)}
                      >
                        <i className="rotate-45 border-dark-border border-r-2 border-b-2 w-2 h-2" />
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
            className="w-full 992px:flex flex-row items-center hidden"
          >
            <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[97%] 1200px:w-[90%]">
              {menuItems
                .filter((item) => item.name !== "Get A Quote") // Exclude "Get A Quote" item
                .map((item, index) => {
                  const hasSubMenu = Boolean(item.submenuId);

                  return (
                    <li
                      key={index}
                      className="leading-[50px] py-5 relative group"
                    >
                      <Link
                        href={item.href}
                        className="block text-primary-text text-sm no-underline leading-6 group-hover:text-active-text "
                      >
                        <i
                          className={`rotate-45 ${
                            !hasSubMenu && "hidden"
                          } inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-0.5 group-hover:border-active-text `}
                        />
                        <span className={` ${!hasSubMenu && "hidden"} `}>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {item.name}
                      </Link>
                      {hasSubMenu && (
                        <ul className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-50 border-t-4 border-active-text mt-5 ml-[-3px] bg-white group-hover:block">
                          <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-active-text border-solid -top-2 -left-0.5 absolute" />
                          {item.links.map((subLink, subIndex) => (
                            <li
                              key={subIndex}
                              className="border-b border-light-border"
                            >
                              <Link
                                href={subLink.href}
                                className="block p-[19px_40px_18px_20px] text-primary-text text-sm no-underline leading-[22px] hover:text-active-text hover:bg-black"
                              >
                                {subLink.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              <li className="leading-[50px] py-5">
                <Link href="/quote/">
                  <div className="min-w-[182px] min-h-[70px] max-h-[70px] text-black flex flex-row justify-center items-center rounded-full bg-primary hover:text-white hover:cursor-pointer shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] leading-[22px] hover:bg-black group">
                    <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-1 mb-0.5 group-hover:bg-quote-icon-white" />
                    <p className="m-0 p-0 text-base">Get a Quote</p>
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
