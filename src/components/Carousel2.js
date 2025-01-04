import React, { useState } from "react";

const Carousel2 = ({ members }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % members.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      const newSlide = (prev - 1 + members.length) % members.length;
      console.log(newSlide); // Logs the correct new slide value
      return newSlide;
    });
  };

  return (
    <div className="mobile-members-slider">
      <div className=" h-[480px] relative   768px:h-[220px] select-none block  992px:h-[300px]">
        {members.map((member, index) => (
          <div
            key={index}
            className={` absolute inline-block w-full text-center mx-auto 992px:opacity-100  992px:visible  ${
              currentSlide === index
                ? " visible opacity-100"
                : " opacity-0 invisible"
            }  992px:relative transition-opacity duration-1000 ease-in-out  992px:align-top  992px:w-[30%]  992px:float-left text-white `}
          >
            <div className="relative">
              <div className="item-container">
                <div className="item">
                  <img
                    className="team-pic"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p className="prata">{member.position}</p>
                  <div className="email-info">
                    <img
                      className="mail-icon py-[5px]"
                      src="https://www.securecash.com.au/images/icons/mail.png"
                      alt="mail"
                    />
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </div>
                  <div className="social-media">
                    <ul>
                      <li>
                        <a href={member.socialLinks?.facebook}>
                          <img
                            src="https://www.securecash.com.au/images/icons/social/webp/fb.webp"
                            alt="Facebook"
                          />
                        </a>
                      </li>
                      <li>
                        <a href={member.socialLinks?.twitter}>
                          <img
                            src="https://www.securecash.com.au/images/icons/social/webp/twitter.webp"
                            alt="Twitter"
                          />
                        </a>
                      </li>
                      <li>
                        <a href={member.socialLinks?.youtube}>
                          <img
                            src="https://www.securecash.com.au/images/icons/social/webp/yt.webp"
                            alt="YouTube"
                          />
                        </a>
                      </li>
                      <li>
                        <a href={member.socialLinks?.linkedin}>
                          <img
                            src="https://www.securecash.com.au/images/icons/social/webp/linkedin.webp"
                            alt="LinkedIn"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="   z-[999] text-[50px]  mx-auto text-primary 992px:hidden">
                <button
                  className="   absolute transition-opacity duration-200 cursor-pointer left-2 hover:opacity-100 top-1/2"
                  onClick={goToPrevSlide}
                >
                  <span>❮</span>
                </button>
                <button
                  className="    absolute transition-opacity duration-200 cursor-pointer   right-2 hover:opacity-100 top-1/2"
                  onClick={goToNextSlide}
                >
                  <span>❯</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel2;
