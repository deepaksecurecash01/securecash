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
    name: "Beth Bacchus",
    position: "Chief Business Officer",
    email: "beth@securecash.com.au",
    image: "/images/team/beth.png",
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
    image: "/images/team/jo.png",
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
    image: "/images/team/dylan.png",
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
    image: "/images/team/john.png",
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
    image: "/images/team/gretchen.png",
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
    image: "/images/team/hazel.jpg",
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
    image: "/images/team/mitchell.jpg",
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
    image: "/images/team/dennise.jpg",
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
    image: "/images/team/mary.jpg",
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
    image: "/images/team/drex.jpg",
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
    image: "/images/team/kyla.jpg",
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
    image: "/images/team/nadeem.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/SecureCash/",
      twitter: "https://twitter.com/SecureCash",
      youtube: "https://www.youtube.com/securecash",
      linkedin: "https://www.linkedin.com/company/securecash",
    },
  },
];

const TeamContent = () =>
{
  return (
    <section
      id="team"
      className="bg-[#ebebeb] inline-block w-full px-[10px] py-[24px] 414px:py-[100px] 414px:px-0 mt-0 768px:p-[50px] 992px:mt-[100px] 992px:px-2 992px:py-[100px]"
      aria-labelledby="team-heading"
    >
      <div className="w-full max-w-[1366px] mx-[auto] my-[0]">
        {/* ✅ FIXED: h3 → h2 (proper hierarchy) */}
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
};

export default TeamContent;