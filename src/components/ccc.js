"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Headroom from "react-headroom";

// Navigation Configuration
const NAV_CONFIG = {
  logo: {
    src: "/images/SecureCash.webp",
    alt: "SecureCash Logo",
    width: 285,
    height: 0,
  },
  menuItems: [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "/about-us",
      submenu: [
        { name: "About Us", href: "/about-us" },
        { name: "Blog", href: "/blog" },
        { name: "Franchises", href: "/franchise" },
        { name: "Partners", href: "/partners" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      submenu: [
        { name: "Cash In Transit", href: "/cash-in-transit" },
        { name: "Cash Collection", href: "/cash-collection" },
        { name: "Cash Delivery", href: "/cash-delivery" },
        { name: "Cash Counting", href: "/cash-counting" },
        { name: "No Armoured Trucks", href: "/armoured-car-service" },
        { name: "Tips On Cash Security", href: "/cash-security" },
        { name: "Our Cash Couriers", href: "/cash-couriers" },
        {
          name: "Cash Logistics Management",
          href: "/cash-logistics-management",
        },
      ],
    },
    { name: "Online Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get A Quote", href: "/quote", isQuoteButton: true },
  ],
};

// Reusable Components
const Logo = ({ onClick }) => (
  <div className="inline mx-auto text-center pb-5 1024px:mx-0 1024px:text-left 1024px:pb-0">
    <Link href="/" onClick={onClick}>
      <Image {...NAV_CONFIG.logo} className="w-[285px] h-auto" priority />
    </Link>
  </div>
);

const QuoteButton = () => (
  <div className="min-w-[182px] min-h-[70px] max-h-[70px] flex flex-row justify-center items-center rounded-full bg-primary text-black hover:text-white hover:bg-black shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] group">
    <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-1 mb-0.5 group-hover:bg-quote-icon-white" />
    <p className="m-0 p-0 text-base">Get a Quote</p>
  </div>
);

const SubmenuArrow = ({ isActive = false }) => (
  <i
    className={`rotate-45 inline-block border-solid border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] ${
      isActive ? "border-active-text" : "border-dark-border"
    }`}
  />
);

// Desktop Navigation Components
const DesktopSubmenu = ({ items }) => (
  <ul className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-50 border-t-4 border-active-text mt-5 ml-[-3px] bg-white group-hover:block">
    <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-active-text border-solid absolute -top-2 -left-0.5" />
    {items.map((item) => (
      <li key={item.href} className="border-b border-light-border">
        <Link
          href={item.href}
          className="block p-[19px_40px_18px_20px] text-primary-text text-sm leading-[22px] hover:text-active-text hover:bg-black"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

const DesktopNavigation = ({ onMenuClick }) => (
  <nav className="hidden w-full 1024px:flex flex-row items-center">
    <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[97%] 1200px:w-[90%]">
      {NAV_CONFIG.menuItems.map((item) => {
        if (item.isQuoteButton) {
          return (
            <li key={item.href} className="leading-[50px] py-5">
              <Link href={item.href}>
                <QuoteButton />
              </Link>
            </li>
          );
        }

        return (
          <li key={item.href} className="leading-[50px] py-5 relative group">
            <Link
              href={item.href}
              className="block text-primary-text text-sm leading-6 group-hover:text-active-text"
              onClick={onMenuClick}
            >
              {item.submenu && (
                <>
                  <SubmenuArrow />
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </>
              )}
              {item.name}
            </Link>
            {item.submenu && <DesktopSubmenu items={item.submenu} />}
          </li>
        );
      })}
    </ul>
  </nav>
);

// Mobile Navigation Components
const MobileSubmenu = ({ items, isActive, onMenuClick }) => (
  <ul
    className={`overflow-hidden bg-white text-[#808080] transition-all duration-300 ${
      isActive ? "opacity-100 visible h-auto mt-5" : "opacity-0 invisible h-0"
    }`}
  >
    {items.map((item) => (
      <li
        key={item.href}
        className="w-full text-left text-base py-5 bg-white 992px:w-auto"
      >
        <Link
          href={item.href}
          className="text-paragraph text-sm pl-11 ml-[20%]"
          onClick={onMenuClick}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

const MobileNavigation = ({
  isVisible,
  activeSubmenu,
  onToggleSubmenu,
  onMenuClick,
}) => (
  <nav className="block bg-white 1024px:hidden w-full">
    <button
      className="bg-primary w-full py-[15px] px-2.5 text-white pl-7"
      onClick={onMenuClick}
      aria-label="Toggle mobile menu"
    >
      <span className="flex items-center gap-0.5">
        <FaBars className="relative -left-2.5" />
        Menu
      </span>
    </button>

    <ul
      className={`transition-all duration-300 overflow-auto ${
        isVisible ? "h-[70vh] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {NAV_CONFIG.menuItems.map((item) => {
        if (item.isQuoteButton) return null;

        return (
          <li
            key={item.href}
            className={`border-b border-light-border py-5 ${
              item.submenu && activeSubmenu === item.name
                ? "bg-black pb-0"
                : "text-black"
            }`}
          >
            {item.submenu ? (
              <>
                <button
                  className={`ml-[20%] flex items-center gap-4 ${
                    activeSubmenu === item.name && "text-active-text"
                  }`}
                  onClick={() => onToggleSubmenu(item.name)}
                >
                  <SubmenuArrow isActive={activeSubmenu === item.name} />
                  {item.name}
                </button>
                <MobileSubmenu
                  items={item.submenu}
                  isActive={activeSubmenu === item.name}
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
        );
      })}
    </ul>
  </nav>
);

// Main Navigation Component
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (submenuName) => {
    setActiveSubmenu((prev) => (prev === submenuName ? null : submenuName));
  };

  const handleMenuClick = () => setIsMobileMenuOpen(false);

  return (
    <Headroom className="z-50 relative">
      <header
        className={`bg-white w-full h-auto transition-all duration-500 shadow-[0_1px_6px_0_rgba(32,33,36,.28)] ${
          isMobileMenuOpen ? "fixed" : ""
        }`}
      >
        <div className="w-full max-w-[1366px] mx-auto pt-2.5 1024px:pb-2.5 flex justify-evenly items-center">
          <div className="w-full 1024px:w-[95%] 1366px:w-full 1600px:w-full flex 1024px:flex-row flex-col justify-center items-center">
            <Logo onClick={handleMenuClick} />
            <DesktopNavigation onMenuClick={handleMenuClick} />
            <MobileNavigation
              isVisible={isMobileMenuOpen}
              activeSubmenu={activeSubmenu}
              onToggleSubmenu={handleSubmenuToggle}
              onMenuClick={handleMobileMenuToggle}
            />
          </div>
        </div>
      </header>
      {renderNavigationButton("prev", toggleSlide)}
      {renderNavigationButton("next", toggleSlide)}
    </Headroom>
  );
};

export default Navigation;
