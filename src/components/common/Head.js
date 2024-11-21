"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar() {
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  function toggleMobileMenu(menuId) {
    setMobileNavVisible((prevVisible) => !prevVisible);
    // Close any active submenus when toggling the mobile menu
    if (activeSubMenu) {
      toggleMobileSubMenu(activeSubMenu);
    }
    const panel = document.getElementById(menuId);
    const html = document.documentElement;
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNav = document.getElementById("mobileNav");

    const slideshowBannerControls =
      document.getElementsByClassName("inner-controls")[0];

    if (panel.style.visibility === "visible") {
      panel.style.visibility = "hidden";
      panel.style.opacity = "0";
      slideshowBannerControls?.style.setProperty("z-index", 10);
      html.style.overflow = "auto";
      html.style.width = "auto";
      html.style.height = "auto";
      html.style.position = "relative";
      mobileMenu.removeAttribute("style");
      mobileNav.style.height = "0";
    } else {
      panel.style.visibility = "visible";
      panel.style.opacity = "1";
      slideshowBannerControls?.style.setProperty("z-index", -1);
      html.style.overflow = "hidden";
      html.style.width = "100%";
      html.style.height = "100%";
      html.style.position = "fixed";
      mobileMenu.style.height = "100vh";
      mobileNav.style.height = "70vh";

      mobileMenu.style.backgroundColor = "#ffffff";
    }
  }

  function toggleMobileSubMenu(subMenuId) {
    setActiveSubMenu((prevActive) =>
      prevActive === subMenuId ? null : subMenuId
    );

    const panel = document.getElementById(subMenuId);
    const parentLi = panel?.parentElement;
    const mobileNav = document.getElementById("mobileNav");

    if (parentLi?.classList.contains("activemenu")) {
      parentLi.classList.remove("activemenu");
      parentLi.children[0].classList.remove("activelink");
      panel.style.opacity = "0";
      panel.style.visibility = "hidden";
      panel.style.overflow = "hidden";
      panel.style.marginTop = "0px";
      panel.style.height = "0";
      mobileNav.style.overflow = "hidden";
      mobileNav.style.paddingBottom = "0";
    } else {
      parentLi?.classList.add("activemenu");
      parentLi.children[0].classList.add("activelink");
      panel.style.marginTop = "20px";
      panel.style.opacity = "1";
      panel.style.visibility = "visible";
      panel.style.height = "auto";
      mobileNav.style.overflow = "auto";
      mobileNav.style.height = "70vh";
      mobileNav.style.paddingBottom = "60px";
    }
  }

  function closeMobileSubMenu(menuId) {
    const parentLi = document.getElementById(menuId)?.parentElement;
    const panel = document.getElementById(menuId);

    parentLi?.classList.remove("activemenu");
    parentLi.children[0].classList.remove("activelink");
    panel.style.opacity = "0";
    panel.style.visibility = "hidden";
    panel.style.overflow = "hidden";
    panel.style.marginTop = "0px";
    panel.style.height = "0";
  }

  return (
    <header
      id="navbar"
      className="fixed z-50 bg-white w-full h-auto max-h-[135px] top-0 transition-all duration-500 shadow-[0_1px_6px_0_rgba(32,33,36,.28)] "
    >
      <div className=" w-full max-w-[1366px] mx-auto my-[10px]">
        <div className="w-full flex lg:flex-row flex-col justify-center items-center header-wrapper">
          <div
            id="logo"
            className="inline lg:mx-0 lg:text-left lg:pb-0 mx-auto text-center pb-5"
          >
            <a href="https://www.securecash.com.au">
              <Image
                src="/images/SecureCash.webp" // Path adjusted for Next.js static handling
                alt="SecureCash Logo"
                width={285}
                height={0}
                className="w-[285px] h-auto"
                priority // Loads image with higher priority
              />
            </a>
          </div>

          <div
            id="mobile-menu"
            className="block lg:hidden w-full text-left shadow-[0_1px_6px_0_rgba(32,33,36,0.28)]"
          >
            <button
              className="bg-[#c7a652] w-full block py-[15px] px-[10px] text-white pl-[30px]"
              onClick={() => toggleMobileMenu("mobileNav")}
            >
              <span className="flex items-center gap-[2px]">
                <FaBars className="border-0 relative left-[-10px] top-0" />
                Menu
              </span>
            </button>
            <ul
              id="mobileNav"
              style={{ visibility: mobileNavVisible ? "visible" : "hidden" }}
              className="list-none h-0 opacity-0 invisible w-full mx-auto bg-white"
            >
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="https://www.securecash.com.au"
                  className="text-black ml-[20%]"
                >
                  Home
                </a>
              </li>
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="#"
                  className="text-black ml-[20%]"
                  onClick={() => {
                    toggleMobileSubMenu("mobile-subMenu1");
                    closeMobileSubMenu("mobile-subMenu2");
                  }}
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;About Us
                </a>
                <ul
                  id="mobile-subMenu1"
                  style={{ visibility: "hidden", height: "0" }}
                  className="list-none w-full mx-auto h-0 opacity-0 invisible bg-white"
                >
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/about-us/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      About Us
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/blog/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Blog
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/franchise/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Franchises
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/partners/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Partners
                    </a>
                  </li>
                </ul>
              </li>
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="#"
                  onClick={() => {
                    toggleMobileSubMenu("mobile-subMenu2");
                    closeMobileSubMenu("mobile-subMenu1");
                  }}
                  className="text-black ml-[20%]"
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;Services
                </a>
                <ul
                  id="mobile-subMenu2"
                  style={{ visibility: "hidden", height: "0" }}
                  className="list-none w-full mx-auto h-0 opacity-0 invisible bg-white"
                >
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-in-transit/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Cash In Transit
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-collection/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Cash Collection
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-delivery/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Cash Delivery
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-counting/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Cash Counting
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/armoured-car-service/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      No Armoured Trucks
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-security/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Tips On Cash Security
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-couriers/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Our Cash Couriers
                    </a>
                  </li>
                  <li className=" w-full text-left text-base py-5 bg-white  lg:w-auto">
                    <a
                      href="https://www.securecash.com.au/cash-logistics-management/"
                      className="text-paragraph text-sm pl-11 ml-[20%]"
                    >
                      Cash Logistics Management
                    </a>
                  </li>
                </ul>
              </li>
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="https://service.securecash.com.au/"
                  target="_blank"
                  className="text-black ml-[20%]"
                >
                  Online Services
                </a>
              </li>
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="https://www.securecash.com.au/contact/"
                  className="text-black ml-[20%]"
                >
                  Contact Us
                </a>
              </li>
              <li className="border-b border-[#e9e9e9] w-full text-left text-base py-5 bg-white">
                <a
                  href="https://www.securecash.com.au/quote/"
                  target="_blank"
                  className="text-black ml-[20%]"
                >
                  Get A Quote
                </a>
              </li>
            </ul>
          </div>

          <div
            id="main-menu"
            className="w-full lg:flex flex-row items-center hidden"
          >
            <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[90%]">
              <li className="leading-[50px] py-[20px]">
                <a
                  href="https://www.securecash.com.au"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Home
                </a>
              </li>
              <li className="leading-[50px] py-[20px] relative group">
                <a
                  href="https://www.securecash.com.au/about-us/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] group"
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px]  group-hover:border-[#c5a44b]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;About Us
                </a>
                <ul
                  id="subMenu1"
                  className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-[100] border-t-4 border-[#c5a44b] mt-[20px] ml-[-3px] bg-white group-hover:block"
                >
                  <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#c5a44b] border-solid top-[-8px] left-[2px] absolute" />
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/about-us/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/blog/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/franchise/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Franchises
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/partners/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Partners
                    </a>
                  </li>
                </ul>
              </li>
              <li className="leading-[50px] py-[20px] relative group">
                <a
                  href="https://www.securecash.com.au/banking-pickups/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] group"
                >
                  <i className="rotate-45 inline-block border-solid border-[#636363] border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-[2px] group-hover:border-[#c5a44b]" />
                  &nbsp;&nbsp;&nbsp;&nbsp;Services
                </a>
                <ul
                  id="subMenu2"
                  className="absolute hidden shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-[100] border-t-4 border-[#c5a44b] mt-[20px] ml-[-3px] bg-white group-hover:block"
                >
                  <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#c5a44b] border-solid top-[-8px] left-[2px] absolute" />
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-in-transit/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash In Transit
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-collection/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Collection
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-delivery/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Delivery
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-counting/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Counting
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/armoured-car-service/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      No Armoured Trucks
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-security/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Tips On Cash Security
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9]">
                    <a
                      href="https://www.securecash.com.au/cash-couriers/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Our Cash Couriers
                    </a>
                  </li>
                  <li className="border-b border-[#e9e9e9] last:border-b-0">
                    <a
                      href="https://www.securecash.com.au/cash-logistics-management/"
                      className="block p-[19px_40px_18px_20px] text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b] hover:bg-black"
                    >
                      Cash Logistics Management
                    </a>
                  </li>
                </ul>
              </li>
              <li className="leading-[50px] py-[20px]">
                <a
                  href="https://service.securecash.com.au/"
                  target="_blank"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Online Services
                </a>
              </li>
              <li className="leading-[50px] py-[20px]">
                <a
                  href="https://www.securecash.com.au/contact/"
                  className="block text-[#333333] text-[14px] no-underline leading-[22px] hover:text-[#c5a44b]"
                >
                  Contact Us
                </a>
              </li>
              <li className="leading-[50px] py-[20px]">
                <a href="https://www.securecash.com.au/quote/" target="_blank">
                  <div className="min-w-[182px] min-h-[70px] max-h-[70px] text-black flex flex-row justify-center items-center rounded-full bg-[#C7A652] hover:text-white hover:cursor-pointer shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] leading-[22px] hover:bg-black group">
                    <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-[4px] mb-[2px] group-hover:bg-quote-icon-white" />
                    <p className="m-0 p-0 text-[16px]">Get a Quote</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
