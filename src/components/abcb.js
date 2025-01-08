import React from "react";

export const TeamMember = ({ member }) => (
  <div className="item-container inline-block w-[80%] 768px:[290px]  1024px:w-[24%] m-[6px] bg-white self-center justify-center items-center align-top">
    <div className="item ml-0 bg-[white] float-left">
      <img
        className="team-pic w-full mx-auto my-0"
        src={member.image}
        alt={member.name}
      />
    </div>
    <div className="member-info p-4 414px:p-0  414px:pl-[20px]  414px:pr-[20px] w-full text-left  768px:pl-[16px]  768px:pr-[16px]  1366px:pl-[20px]  1366px:pr-[20px]  414px:py-[25px] clear-both overflow-hidden">
      <h4 className="text-[20px] font-semibold pb-[12px] text-[#333333]">
        {member.name}
      </h4>
      <p className=" font-prata text-[14px] text-[#808080] mb-[18px]">
        {member.position}
      </p>
      <div className="email-info flex justify-items-center px-0 py-[10px]">
        <img
          className="mail-icon w-[5%] mr-2 py-[5px]"
          src="https://www.securecash.com.au/images/icons/mail.png"
          alt="mail"
        />
        <a
          className=" text-[14px] text-[#929292] hover:no-underline hover:text-[#c7a652]"
          href={`mailto:${member.email}`}
        >
          {member.email}
        </a>
      </div>
      <div className="social-media pt-[5px]">
        <ul className=" list-none">
          <li className="float-left pr-[5px]">
            <a href={member.socialLinks?.facebook}>
              <img
                className="w-[80%] hover:filter hover:contrast-0"
                src="https://www.securecash.com.au/images/icons/social/webp/fb.webp"
                alt="Facebook"
              />
            </a>
          </li>
          <li className="float-left pr-[5px]">
            <a href={member.socialLinks?.twitter}>
              <img
                className="w-[80%] hover:filter hover:contrast-0"
                src="https://www.securecash.com.au/images/icons/social/webp/twitter.webp"
                alt="Twitter"
              />
            </a>
          </li>
          <li className="float-left pr-[5px]">
            <a href={member.socialLinks?.youtube}>
              <img
                className="w-[80%] hover:filter hover:contrast-0"
                src="https://www.securecash.com.au/images/icons/social/webp/yt.webp"
                alt="YouTube"
              />
            </a>
          </li>
          <li className="float-left pr-[5px]">
            <a href={member.socialLinks?.linkedin}>
              <img
                className="w-[80%] hover:filter hover:contrast-0"
                src="https://www.securecash.com.au/images/icons/social/webp/linkedin.webp"
                alt="LinkedIn"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
