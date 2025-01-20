'use client'
// components/TeamMember.js
import React, { useEffect, useRef, useState } from "react";
import { TeamMember } from "./TeamMember";

 
// hooks/useWindowResize.js
const useWindowResize = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

// hooks/useSlider.js
const useSlider = (totalItems, windowWidth) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);

  const getScrollPercentage = () => (windowWidth <= 1024 ? 34 : 25);
  const cardShowing = windowWidth <= 1024 ? -11 : -11;

  const handlePrev = () => {
    const newCount = count + 1;
    setCount(newCount);
    return newCount * getScrollPercentage();
  };

  const handleNext = () => {
    const newCount = count - 1;
    setCount(newCount);
    return newCount * getScrollPercentage();
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalItems);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return {
    currentSlide,
    count,
    cardShowing,
    handlePrev,
    handleNext,
    goToNextSlide,
    goToPrevSlide,
    getScrollPercentage,
  };
};

// data/teamMembers.js
 const teamMembers = [
   {
     name: "Darren Bacchus",
     position: "Chief Executive Officer",
     email: "darren@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/darren.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/in/darrenbacchus/",
     },
   },
   {
     name: "Beth Bacchus",
     position: "Chief Operating Officer",
     email: "beth@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/beth.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/in/bethaneybacchus/",
     },
   },
   {
     name: "Jo French",
     position: "Chief Administrative Officer",
     email: "jo@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/jo.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/in/joanne-french-b67492b7/",
     },
   },
   {
     name: "Dylan Cross",
     position: "Chief Information Officer",
     email: "dylan@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/dylan.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/in/dylan-cross-491822153/",
     },
   },
   {
     name: "John Dalag",
     position: "Chief Financial Officer",
     email: "john@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/john.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Gretchen Dalag",
     position: "Accounts",
     email: "gretchen@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/gretchen.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Ange Brua",
     position: "Customer Service",
     email: "angeline@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/ange.png",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Hazel Lucidia",
     position: "Operations",
     email: "hazel@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/hazel.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Maddie Penaredondo",
     position: "Operations Manager",
     email: "maddie@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/maddie.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Mitchell Cabral",
     position: "IT Support",
     email: "mitchell@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/mitchell.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Dennise Estipona",
     position: "Customer Service",
     email: "dennise@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/dennise.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Mary Baga",
     position: "Customer Service",
     email: "mary@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/mary.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Drex Aradilla",
     position: "Reconciliation Manager",
     email: "drex@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/drex.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Kyla Lapugot",
     position: "Reconciliation",
     email: "kyla@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/kyla.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
   {
     name: "Nadeem",
     position: "Software Engineer",
     email: "nadeem@securecash.com.au",
     image: "https://www.securecash.com.au/images/team/nadeem.jpg",
     socialLinks: {
       facebook: "https://www.facebook.com/SecureCash/",
       twitter: "https://twitter.com/SecureCash",
       youtube: "https://www.youtube.com/securecash",
       linkedin: "https://www.linkedin.com/company/securecash",
     },
   },
 ];

// components/TeamContent.js
const TeamContent = () => {
  const listEl = useRef(null);
  const windowWidth = useWindowResize();
  const {
    currentSlide,
    count,
    cardShowing,
    handlePrev,
    handleNext,
    goToNextSlide,
    goToPrevSlide,
    getScrollPercentage,
  } = useSlider(teamMembers.length, windowWidth);



   const renderNavigationButton = (direction, isDisabled, handleClick) => {
     const symbol = direction === "prev" ? "❮" : "❯";

     return (
       <div>
         <button
           onClick={handleClick}
           disabled={isDisabled}
           className={`text-primary text-[50px] ${
             isDisabled
               ? "cursor-not-allowed opacity-50 pointer-events-none no-underline"
               : "cursor-pointer"
           }`}
           aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
         >
           {symbol}
         </button>
       </div>
     );
   };


  return (
    <div className="bg-[#ebebeb] inline-block w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 414px:py mt-0 768px:p-[50px] 992px:mt-[100px] 992px:px-2 992px:py-[50px]">
      <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
        <h3 className="text-[24px] leading-[1.5em] w-3/5 414px:w-auto mx-[auto] my-[0] font-prata text-center 414px:text-[32px] text-[#000]">
          Meet The SecureCash Team
        </h3>
        <hr className="divider-2 h-[4px] border-0 mt-4 mb-[40px] w-[100px] rounded-[5px] bg-[#c7a652] divider-bottom mx-auto" />

        <div className="member-controls hidden 992px:block 992px:w-[4%]  1200px:w-[8%] float-left pt-[118px]  1200px:pl-[40px]">
          {renderNavigationButton("prev", count >= 0, handlePrev)}
          {renderNavigationButton("next", count <= cardShowing, handleNext)}
        </div>

        {/* Mobile View */}
        <div className="mobile-members-slider 992px:hidden">
          <div className="h-[480px] relative 768px:h-[572px] select-none block 992px:h-[300px]">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`absolute inline-block w-full text-center mx-auto 992px:opacity-100 992px:visible ${
                  currentSlide === index
                    ? "visible opacity-100"
                    : "opacity-0 invisible"
                } 992px:relative transition-opacity duration-1000 ease-in-out 992px:align-top 992px:w-[30%] 992px:float-left text-white`}
              >
                <TeamMember
                  member={member}
                  goToNextSlide={goToNextSlide}
                  goToPrevSlide={goToPrevSlide}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="members-slider hidden 1024px:block 1024px:w-[96%] 1200px:w-[1020px] 1280px:w-[1161px] 1366px:w-[1230px] w-[92%] float-left mb-[100px]">
          <div className="team-slider w-full overflow-hidden">
            <div
              className="team-slider-grid transition-all duration-1000 relative whitespace-nowrap"
              ref={listEl}
              style={{
                position: "relative",
                left: `${count * getScrollPercentage()}%`,
              }}
            >
              {teamMembers.map((member, index) => (
                <TeamMember key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamContent;
