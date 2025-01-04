"use client";
import { useEffect, useState, useRef } from "react";
import { TeamMember } from "./TeamMember";
import Carousel2 from "./Carousel2";

const TeamContent = () => {
  const listEl = useRef(null);
  const [count, setCount] = useState(0);
  const [detectWidth, setDetectWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );  const [currentSlideSection, setCurrentSlideSection] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
  
  
  
    const goToNextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const goToPrevSlide = () => {
      setCurrentSlide((prev) => {
        const newSlide = (prev - 1 + slides.length) % slides.length;
        console.log(newSlide); // Logs the correct new slide value
        return newSlide;
      });
    };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDetectWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getScrollPercentage = () => (detectWidth <= 1024 ? 34 : 25);

  // Handle Previous Slide
  const handlePrev = () => {
    const newCount = count + 1;
    setCount(newCount);
    const widthScroll = getScrollPercentage();
    if (listEl.current) {
      listEl.current.style.left = `${newCount * widthScroll}%`;
    }
  };

  // Handle Next Slide
  const handleNext = () => {
    const newCount = count - 1;
    setCount(newCount);
    const widthScroll = getScrollPercentage();
    if (listEl.current) {
      listEl.current.style.left = `${newCount * widthScroll}%`;
    }
  };

  const cardShowing = detectWidth <= 1024 ? -11 : -11;

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




  return (
    <div id="team-content">
      <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
        <h3 className="prata">Meet The SecureCash Team</h3>
        <hr className="divider-2 h-[4px] border-0  mt-4 mb-[40px] w-[100px] rounded-[5px] bg-[#c7a652]  divider-bottom mx-auto 992px:mx-0" />
        <div className="member-controls">
          <p>
            <a
              id="teamprev"
              className="btn-prev text-primary"
              onClick={handlePrev}
              style={{
                display: count >= 0 ? "none" : "block",
                cursor: "pointer",
              }}
            >
              ❮
            </a>
            <a
              id="teamprevdisabled"
              className=" text-primary"
              style={{
                display: count < 0 ? "none" : "block",
                cursor: "default",
              }}
            >
              ❮
            </a>
          </p>
          <p>
            <a
              id="teamnext"
              className="btn-next  text-primary"
              onClick={handleNext}
              style={{
                display: count <= cardShowing ? "none" : "block",
                cursor: "pointer",
              }}
            >
              ❯
            </a>
            <a
              id="teamnextdisabled"
              className=" text-primary"
              style={{
                display: count > cardShowing ? "none" : "block",
                cursor: "default",
              }}
            >
              ❯
            </a>
          </p>
        </div>

        <Carousel2 members={teamMembers} />

        <div className="members-slider">
          <div className="team-slider">
            <div
              className="team-slider-grid"
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
