"use client";
import { useEffect, useState, useRef } from "react";
import { TeamMember } from "./TeamMember";
import Carousel2 from "./Carousel2";

const MOBILE_BREAKPOINT = 1024;
const SCROLL_PERCENTAGES = {
  mobile: 34,
  desktop: 25,
};

const TeamContent = () => {
  const [state, setState] = useState({
    currentIndex: 0,
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    slideOffset: 0,
  });

  const isMobile = state.windowWidth <= MOBILE_BREAKPOINT;
  const cardsShowing = -11;

  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        windowWidth: window.innerWidth,
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlide = (direction) => {
    setState((prev) => {
      const newOffset = prev.slideOffset + (direction === "next" ? -1 : 1);
      const scrollPercentage = isMobile
        ? SCROLL_PERCENTAGES.mobile
        : SCROLL_PERCENTAGES.desktop;

      return {
        ...prev,
        slideOffset: newOffset,
        currentIndex:
          (prev.currentIndex +
            (direction === "next" ? 1 : -1) +
            teamMembers.length) %
          teamMembers.length,
      };
    });
  };

  const renderNavigationButton = (direction, isDisabled) => {
    const symbol = direction === "prev" ? "❮" : "❯";
    const handleClick = () => handleSlide(direction);

    return (
      <p>
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className={`text-primary text-[50px] ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
        >
          {symbol}
        </button>
      </p>
    );
  };

  const renderMobileSlider = () => (
    <div className="h-[480px] relative 768px:h-[220px] select-none 992px:h-[300px]">
      {teamMembers.map((member, index) => (
        <div
          key={member.email}
          className={`absolute inline-block w-full text-center mx-auto transition-opacity duration-1000 ease-in-out
            ${
              state.currentIndex === index
                ? "visible opacity-100"
                : "opacity-0 invisible"
            }
            992px:relative 992px:opacity-100 992px:visible 992px:w-[30%] 992px:float-left`}
        >
          <TeamMember
            member={member}
            onNext={() => handleSlide("next")}
            onPrev={() => handleSlide("prev")}
          />
        </div>
      ))}
    </div>
  );

  const renderDesktopSlider = () => (
    <div className="team-slider w-full overflow-hidden">
      <div
        className="team-slider-grid transition-all duration-1000 relative whitespace-nowrap"
        style={{
          left: `${
            state.slideOffset *
            (isMobile ? SCROLL_PERCENTAGES.mobile : SCROLL_PERCENTAGES.desktop)
          }%`,
        }}
      >
        {teamMembers.map((member) => (
          <TeamMember key={member.email} member={member} />
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-[#ebebeb] w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 mt-0 768px:mt-[100px]">
      <CardHeader className="max-w-[1366px] mx-auto">
        <CardTitle className="text-[24px] leading-[1.5em] w-3/5 mx-auto font-prata text-center 414px:text-[32px] text-black">
          Meet The SecureCash Team
        </CardTitle>
        <hr className="h-[4px] border-0 mt-4 mb-[40px] w-[100px] rounded-[5px] bg-[#c7a652] mx-auto" />
      </CardHeader>

      <div className="max-w-[1366px] mx-auto flex">
        {!isMobile && (
          <div className="w-[8%] pt-[118px] pl-[40px]">
            {renderNavigationButton("prev", state.slideOffset >= 0)}
            {renderNavigationButton("next", state.slideOffset <= cardsShowing)}
          </div>
        )}

        <div className={isMobile ? "w-full" : "w-[92%] mb-[100px]"}>
          {isMobile ? renderMobileSlider() : renderDesktopSlider()}
        </div>
      </div>
    </Card>
  );
};

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
  // Remaining team members would go here
];

export default TeamContent;
