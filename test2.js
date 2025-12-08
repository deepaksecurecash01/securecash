"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScrollHide from "@/hooks/useScrollHide";

const MENU_ITEMS = [
    { name: "Home", href: "/" },
    {
        name: "About Us",
        submenuId: "aboutUs",
        href: "",
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
        href: "",
        links: [
            { text: "Cash In Transit", href: "/services/cash-in-transit" },
            { text: "Cash Collection", href: "/services/cash-collection" },
            { text: "Cash Delivery", href: "/services/cash-delivery" },
            { text: "Cash Counting", href: "/services/cash-counting" },
            { text: "No Armoured Trucks", href: "/services/armoured-car-service" },
            { text: "Tips On Cash Security", href: "/services/cash-security" },
            { text: "Our Cash Couriers", href: "/services/cash-couriers" },
            {
                text: "Cash Logistics Management",
                href: "/services/cash-logistics-management",
            },
        ],
    },
    { name: "Online Services", href: "https://service.securecash.com.au/" },
    { name: "Contact Us", href: "/contact" },
    { name: "Get A Quote", href: "/quote" },
];

const Logo = ({ onClick }) => (
    <div className="inline 1024px:mx-0 1024px:text-left 1024px:pb-0 mx-auto text-center pb-5">
        <Link href="/" onClick={onClick}>
            <Image
                src="/images/SecureCash.webp"
                alt="SecureCash Logo"
                width={285}
                height={91}
                sizes="285px"
                className="w-[285px] h-auto"
                style={{ width: "285px", height: "auto" }}
                priority={true}
            />
        </Link>
    </div>
);

const QuoteButton = () => (
    <Link href="/quote/">
        <div className="min-w-[182px] min-h-[70px] max-h-[70px] text-black flex flex-row justify-center items-center rounded-full bg-primary hover:text-white hover:cursor-pointer shadow-[0px_7px_64px_-16px_rgba(199,166,82,1)] leading-[22px] hover:bg-black group">
            <span className="bg-quote-icon inline-block w-[22px] h-[22px] bg-contain bg-no-repeat mr-1 mb-0.5 group-hover:bg-quote-icon-white" />
            <p className="m-0 p-0 text-base">Get a Quote</p>
        </div>
    </Link>
);

const DesktopSubmenu = ({ links, isOpen, submenuId, onClose }) =>
{
    const submenuRef = useRef(null);

    // Close submenu when clicking outside
    useEffect(() =>
    {
        if (!isOpen) return;

        const handleClickOutside = (e) =>
        {
            if (submenuRef.current && !submenuRef.current.contains(e.target)) {
                const parentLi = submenuRef.current.closest('li');
                if (parentLi && !parentLi.contains(e.target)) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    return (
        <div
            ref={submenuRef}
            className={`absolute shadow-[0_2px_5px_rgba(0,0,0,0.5)] w-[220px] z-50 border-t-4 border-active-text mt-5 ml-[-3px] bg-white transition-all duration-200 ease-in-out ${isOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
        >
            <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-l-transparent border-r-transparent border-b-active-text border-solid -top-2 -left-0.5 absolute" />
            <ul className="m-0 p-0 list-none">
                {links.map((subLink, index) => (
                    <li key={index} className="border-b border-light-border">
                        <Link
                            href={subLink.href}
                            onClick={onClose}
                            className="block p-[19px_40px_18px_20px] text-primary-text text-sm no-underline leading-[22px] hover:text-active-text hover:bg-black transition-colors duration-150"
                        >
                            {subLink.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DesktopMenu = ({ onMenuClick }) =>
{
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [hoverSubmenu, setHoverSubmenu] = useState(null);
    const hoverTimeoutRef = useRef(null);
    const pathname = usePathname();

    // Reset submenu state on navigation
    useEffect(() =>
    {
        setActiveSubmenu(null);
        setHoverSubmenu(null);
    }, [pathname]);

    const handleMouseEnter = (submenuId) =>
    {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setHoverSubmenu(submenuId);
    };

    const handleMouseLeave = () =>
    {
        hoverTimeoutRef.current = setTimeout(() =>
        {
            setHoverSubmenu(null);
        }, 150);
    };

    const handleClick = (submenuId) =>
    {
        // Toggle submenu on click (for touch devices)
        setActiveSubmenu(prev => prev === submenuId ? null : submenuId);
    };

    const closeSubmenu = () =>
    {
        setActiveSubmenu(null);
        setHoverSubmenu(null);
    };

    const isSubmenuOpen = (submenuId) =>
    {
        return activeSubmenu === submenuId || hoverSubmenu === submenuId;
    };

    return (
        <div id="main-menu" className="w-full 1024px:flex flex-row items-center hidden">
            <ul className="m-0 p-0 bg-white list-none flex flex-row justify-between items-center ml-auto w-[97%] 1200px:w-[90%]">
                {MENU_ITEMS.filter((item) => item.name !== "Get A Quote").map((item, index) =>
                {
                    const hasSubMenu = Boolean(item.submenuId);

                    return (
                        <li
                            key={index}
                            className="leading-[50px] py-5 relative group"
                            onMouseEnter={() => hasSubMenu && handleMouseEnter(item.submenuId)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hasSubMenu ? (
                                <button
                                    onClick={() => handleClick(item.submenuId)}
                                    className="block text-primary-text text-sm no-underline leading-6 group-hover:text-active-text transition-colors duration-150 bg-transparent border-none cursor-pointer"
                                >
                                    <i className="rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] relative -top-0.5 transition-all duration-200 group-hover:border-active-text " />
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={onMenuClick}
                                    className="block text-primary-text text-sm no-underline leading-6 group-hover:text-active-text transition-colors duration-150"
                                >
                                    {item.name}
                                </Link>
                            )}
                            {hasSubMenu && (
                                <DesktopSubmenu
                                    links={item.links}
                                    isOpen={isSubmenuOpen(item.submenuId)}
                                    submenuId={item.submenuId}
                                    onClose={closeSubmenu}
                                />
                            )}
                        </li>
                    );
                })}
                <li className="leading-[50px] py-5">
                    <QuoteButton />
                </li>
            </ul>
        </div>
    );
};

const MobileSubmenu = ({ subMenuId, links, isActive, onMenuClick }) =>
{
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() =>
    {
        if (contentRef.current) {
            setHeight(isActive ? contentRef.current.scrollHeight : 0);
        }
    }, [isActive]);

    return (
        <div
            style={{ height: `${height}px` }}
            className="overflow-hidden bg-white transition-all duration-300 ease-in-out"
        >
            <ul ref={contentRef} className="m-0 p-0 list-none">
                {links.map((link, index) => (
                    <li key={index} className="w-full text-left text-base py-5 bg-white 992px:w-auto">
                        <Link
                            href={link.href}
                            className="text-paragraph text-sm pl-11 ml-[20%] transition-colors duration-150  text-[#808080] hover:text-active-text"
                            onClick={onMenuClick}
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const MobileMenu = ({ isVisible, activeSubMenu, onToggleSubmenu, onMenuClick }) => (
    <div
        id="mobile-menu"
        className={`block ${isVisible ? "h-screen" : ""} bg-white 1024px:hidden w-full`}
    >
        <button
            className="bg-primary w-full py-[15px] px-2.5 text-white pl-7 transition-colors duration-150"
            onClick={onMenuClick}
            aria-label="Toggle mobile menu"
        >
            <span className="flex items-center gap-0.5">
                <FaBars className="relative -left-2.5" />
                Menu
            </span>
        </button>
        <ul
            className={`transition-all  duration-300 ease-in-out ${isVisible ? "h-[70vh] opacity-100" : "max-h-0 opacity-0"
                } overflow-auto`}
        >
            {MENU_ITEMS.map((item, index) =>
            {
                const isActive = item.submenuId && activeSubMenu === item.submenuId;

                return (
                    <li
                        key={index}
                        className={`border-b border-light-border ${item.submenuId ? "py-0" : "py-5"
                            }`}
                    >
                        {item.submenuId ? (
                            <>
                                <div
                                    className={`w-full py-5 transition-colors duration-200 ${isActive ? "bg-black" : "bg-transparent"
                                        }`}
                                >
                                    <button
                                        className={`ml-[20%] flex items-center gap-4 transition-colors duration-200 bg-transparent border-none cursor-pointer ${isActive ? "text-active-text" : "text-black"
                                            }`}
                                        onClick={() => onToggleSubmenu(item.submenuId)}
                                        aria-expanded={isActive}
                                        aria-label={`Toggle ${item.name} submenu`}
                                    >
                                        <i
                                            className={`rotate-45 border-r-2 border-b-2 w-2 h-2 transition-all duration-200 ${isActive
                                                ? "border-active-text"
                                                : "border-dark-border"
                                                }`}
                                        />
                                        {item.name}
                                    </button>
                                </div>
                                <MobileSubmenu
                                    subMenuId={item.submenuId}
                                    links={item.links}
                                    isActive={isActive}
                                    onMenuClick={onMenuClick}
                                />
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-black ml-[20%] transition-colors duration-150 hover:text-active-text"
                                onClick={onMenuClick}
                            >
                                {item.name}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
);

const Navbar = () =>
{
    const [mobileNavVisible, setMobileNavVisible] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const pathname = usePathname();

    const isVisible = useScrollHide(100);

    // Reset mobile menu on navigation
    useEffect(() =>
    {
        setMobileNavVisible(false);
        setActiveSubMenu(null);
    }, [pathname]);

    const toggleMobileMenu = () =>
    {
        setMobileNavVisible((prev) => !prev);
        setActiveSubMenu(null);
    };

    const toggleMobileSubMenu = (subMenuId) =>
    {
        setActiveSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
    };

    const handleMenuClick = () =>
    {
        setMobileNavVisible(false);
        setActiveSubMenu(null);
    };

    const shouldShow = isVisible || mobileNavVisible;

    return (
        <div className="relative z-50">
            <div className="w-full h-[160px] 1024px:h-[130px] bg-transparent" aria-hidden="true" />

            <header
                className={`
          fixed top-0 left-0 right-0 z-50
          bg-white w-full shadow-[0_1px_6px_0_rgba(32,33,36,.28)]
          transition-transform duration-300 ease-in-out
          ${mobileNavVisible ? "h-screen overflow-y-auto no-doc-scroll" : "h-auto"}
        `}
                style={{
                    transform: shouldShow ? "translateY(0)" : "translateY(-100%)",
                }}
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
        </div>
    );
};

export default Navbar;