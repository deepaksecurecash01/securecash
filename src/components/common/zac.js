import React from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div
        id="footer-links"
        className=" w-full bg-[#1a1a1a] flex flex-wrap py-10 md:py-20"
      >
        <div className="w-[95%] xl:w-full max-w-[1366px] mx-auto footer-wrapper flex justify-center items-center flex-col md:flex-row">
          <div className="left-column float-left w-[85%] sm:w-[100%] lg:w-[65%] xl:w-[70%]  ">
            <h4 className=" font-prata text-[30px] text-white text-center lg:text-start font-normal m-0">
              Useful Links
            </h4>
            <hr className="h-[4px] border-0 m-[16px_0_40px_0] w-[180px] rounded-[5px] bg-[#c7a652] text-left mx-auto lg:mx-0" />
            <div className="hidden lg:block ">
              <div className="pl-[40px] lg:pl-0 pt-0 w-[33%] lg:w-[30%] float-left text-center relative">
                <ul className="list-none text-left">
                  <li>
                    <a
                      href="https://www.securecash.com.au"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/cash-in-transit/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/quote/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Get a Quote
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/contact/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pl-[40px] lg:pl-0 pt-0 w-[33%] lg:w-[30%] float-left text-center relative">
                <ul className="list-none text-left">
                  <li>
                    <a
                      href="https://service.securecash.com.au/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Online Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.edockets.app/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      eDocket App
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/blog/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/franchise/"
                      className="text-white text-sm leading-[3.5em] font-normal hover:underline"
                    >
                      SecureCash Franchises
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="block lg:hidden">
              <div className="lg:text-center w-1/2 m-0 p-0 text-left float-left">
                <ul className="list-none text-center md:text-left">
                  <li>
                    <a
                      href="https://www.securecash.com.au"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/cash-in-transit/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/quote/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Get a Quote
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/contact/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="lg:text-center w-1/2 m-0 p-0 text-left float-left">
                <ul className="list-none text-center md:text-left">
                  <li>
                    <a
                      href="https://service.securecash.com.au/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Online Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.edockets.app/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      eDocket App
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/blog/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.securecash.com.au/franchise/"
                      className="text-white text-sm leading-[3.5em] font-normal"
                    >
                      SecureCash Franchises
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right-column block mt-[40px] md:mt-0 lg:float-left w-[380px] sm:w-[100%] lg:w-[40%]  xl:w-[30%]">
            <h4 className=" font-prata text-[30px] text-white text-center lg:text-start font-normal m-0">
              Contact
            </h4>
            <hr className="h-[4px] border-0 m-[16px_0_40px_0] w-[120px] rounded-[5px] bg-[#c7a652] text-left mx-auto lg:mx-0" />
            <ul className="list-none text-center lg:text-left">
              <li className="text-white text-sm leading-[3.5em] font-normal text-left">
                <FaPhone className="pr-2.5 text-[26px] relative inline" />
                &nbsp;&nbsp;&nbsp;
                <a
                  href="tel:1300732873"
                  className="text-[#c7a652] hover:underline"
                >
                  1300 SECURE / 1300732873
                </a>
              </li>
              <li className="text-white text-sm leading-[3.5em] font-normal text-left">
                <FaMapMarkerAlt className="pr-2.5 text-[26px] relative inline" />
                &nbsp;&nbsp;&nbsp;&nbsp;Anywhere,&nbsp;&nbsp;Anytime,&nbsp;&nbsp;Australia
                Wide
              </li>
              <li className="text-white text-sm leading-[3.5em] font-normal text-left">
                <FaEnvelope className="pr-2.5 text-[26px] relative inline" />
                &nbsp;&nbsp;
                <a
                  href="mailto:customers@securecash.com.au"
                  className="text-[#c7a652] hover:underline"
                >
                  customers@securecash.com.au
                </a>
              </li>
              <li className="text-white text-sm leading-[3.5em] font-normal text-left line-clamp-1">
                <FaStar className="pr-2.5 text-[26px] relative inline" />
                &nbsp;&nbsp;&nbsp;Proudly Serving Customers Australia Wide 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="">
        <p>
          &copy;2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under
          License) as Secure Cash - NSW Master License Number 108420 | Proud
          creators of{" "}
          <a href="https://www.edockets.app/" target="_blank">
            eDockets
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
