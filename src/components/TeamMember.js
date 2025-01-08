const SocialLink = ({ href, icon, alt }) => (
  <li className="float-left pr-[5px]">
    <a href={href}>
      <img
        className="w-[80%] hover:filter hover:contrast-0"
        src={`https://www.securecash.com.au/images/icons/social/webp/${icon}.webp`}
        alt={alt}
      />
    </a>
  </li>
);

export const TeamMember = ({ member, goToNextSlide, goToPrevSlide }) => (
  <div className="item-container inline-block w-[80%] 768px:[290px] 1024px:w-[24%] m-[6px] bg-white self-center justify-center items-center align-top">
    <div className="item ml-0 bg-white float-left">
      <img
        className="team-pic w-full mx-auto my-0"
        src={member.image}
        alt={member.name}
      />
    </div>
    <div className="member-info p-4 414px:p-0 414px:pl-[20px] 414px:pr-[20px] w-full text-left 768px:pl-[16px] 768px:pr-[16px] 1366px:pl-[20px] 1366px:pr-[20px] 414px:py-[25px] clear-both overflow-hidden">
      <h4 className="text-[20px] font-semibold pb-[12px] text-[#333333]">
        {member.name}
      </h4>
      <p className="font-prata text-[14px] text-[#808080] mb-[18px]">
        {member.position}
      </p>
      <div className="email-info flex justify-items-center px-0 py-[10px]">
        <img
          className="mail-icon w-[5%] mr-2 py-[5px]"
          src="https://www.securecash.com.au/images/icons/mail.png"
          alt="mail"
        />
        <a
          className="text-[14px] text-[#929292] hover:no-underline hover:text-[#c7a652]"
          href={`mailto:${member.email}`}
        >
          {member.email}
        </a>
      </div>
      <div className="social-media pt-[5px]">
        <ul className="list-none">
          <SocialLink
            href={member.socialLinks?.facebook}
            icon="fb"
            alt="Facebook"
          />
          <SocialLink
            href={member.socialLinks?.twitter}
            icon="twitter"
            alt="Twitter"
          />
          <SocialLink
            href={member.socialLinks?.youtube}
            icon="yt"
            alt="YouTube"
          />
          <SocialLink
            href={member.socialLinks?.linkedin}
            icon="linkedin"
            alt="LinkedIn"
          />
        </ul>
      </div>
    </div>
    {goToNextSlide && goToPrevSlide && (
      <NavigationButtons onNext={goToNextSlide} onPrev={goToPrevSlide} />
    )}
  </div>
);

// components/NavigationButtons.js
const NavigationButtons = ({ onNext, onPrev }) => (
  <div className="z-[999] text-[50px] mx-auto text-primary 992px:hidden">
    <button
      className="absolute transition-opacity duration-200 cursor-pointer left-2 hover:opacity-100 top-1/2"
      onClick={onPrev}
    >
      <span>❮</span>
    </button>
    <button
      className="absolute transition-opacity duration-200 cursor-pointer right-2 hover:opacity-100 top-1/2"
      onClick={onNext}
    >
      <span>❯</span>
    </button>
  </div>
);