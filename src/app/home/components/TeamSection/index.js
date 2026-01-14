"use client";
import TeamSlider from "./TeamSlider";

const teamMembers = [
  {
    name: "Darren Bacchus",
    position: "Chief Executive Officer",
    email: "darren@securecash.com.au",
    image: "/images/team/darren.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/in/darrenbacchus/",
    },
  },
  {
    name: "Bethaney Bacchus",
    position: "Co-owner",
    email: "beth@securecash.com.au",
    image: "/images/team/bethaney.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/in/bethaneybacchus/",
    },
  },
  {
    name: "Joanne French",
    position: "Legal",
    email: "jo@securecash.com.au",
    image: "/images/team/joanne.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/in/joanne-french-b67492b7/",
    },
  },
  {
    name: "Dylan Cross",
    position: "Information Technology",
    email: "dylan@securecash.com.au",
    image: "/images/team/dylan.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/in/dylan-cross-491822153/",
    },
  },
  {
    name: "Megan Tree",
    position: "Business Development",
    email: "megan@securecash.com.au",
    image: "/images/team/megan.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/company/securecash",
    },
  },
  {
    name: "David Hogg",
    position: "Onboarding",
    email: "dave@securecash.com.au",
    image: "/images/team/david.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/company/securecash",
    },
  },
  {
    name: "Robert McDonald",
    position: "Operations",
    email: "robert@securecash.com.au",
    image: "/images/team/robert.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/company/securecash",
    },
  },
  {
    name: "Patrick Amadio",
    position: "Operations",
    email: "patrick@securecash.com.au",
    image: "/images/team/patrick.png",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/company/securecash",
    },
  },
];
const TeamContent = () => (
  <section
    id="team"
    className="bg-[#ebebeb] inline-block w-full px-[10px] py-[24px] 414px:py-[100px] 414px:px-0 mt-0 992px:p-[50px] 992px:mt-[100px] 992px:px-2 992px:py-[100px]"
    aria-labelledby="team-heading"
  >
    <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
      <h2
        id="team-heading"
        className="text-[24px] text-[#000] font-normal leading-[1.5em] text-center w-3/5 mx-auto my-0 414px:w-auto 414px:text-[32px] font-prata"
      >
        Meet The SecureCash Team
      </h2>

      <hr
        className="w-[100px] mb-10 mt-4 h-[4px] rounded-[5px] border-0 mx-auto bg-primary"
        aria-hidden="true"
      />

      <div className="members-slider relative select-none block w-full float-left">
        <div className="team-slider w-[90%] mx-auto 1024px:w-full">
          <TeamSlider member={teamMembers} />
        </div>
      </div>
    </div>
  </section>
);

export default TeamContent;