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
    description: "I joined the Australian Army in 1991 starting in Infantry and experienced various other sectors during my service. After my service commitment, I completed my service and pursued the establishment of my own business. In 2005 SecureCash was born. With a keen insight into what can be improved in this industry and a philosophy of looking outside the square, I have brought together a team which is able to provide our clientele with a superior standard of service, whilst I oversee major developments in processes and integrating technology in the deliverance of service to our customers.",
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
    description: "I initially undertook hospitality studies whilst working in that field. It was through this industry that a love of providing excellent customer service was born. I transitioned to international freight forwarding by providing customer service to key accounts. I also undertook a sea export role by managing the collection and shipment of international wine for sea freight export. This role gave me valuable insights into logistics. I joined Darren in 2009 to initially provide accounting and customer service support, but as our business has grown, so has my responsibility to now take on the role of general manager for SecureCash.",
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
    description: "I volunteer in my spare time, helping oversee 25 soccer Clubs for 4000 players in the northern areas of Adelaide. Previously working in Valuation Services at the Department of Lands, I took time after returning to University to homeschool my middle child. My two eldest are on the Autism Spectrum and the youngest has Cerebral Palsy, so any spare time goes into therapy and appointments. With three children, home life is never quiet or boring. In fact, we all game together on a regular basis. So, if you need help, or want my Blizzard or Riot username, let me know!",
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
    description: "Tough tattooed exterior, yet goes home to play Pokemon. Clearly the brains of SecureCash, I joined the company in 2018 one week after I married my best friend, Demi. I initially started doing outgoing sales but have since developed my skills to specialise in Team Management, IT, Design, and the Marketing for SecureCash. My passion is for animals, so I just imagine the rest of the team has four legs and fur to be able to put up with them all day. Anything technology and design-related piques my interest, with a passion for creating something from scratch. The only time you'll hear my name called across the office is if somebody \"breaks\" their computer.",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.",
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
    description: "With a background in law enforcement and extensive experience in high-level management roles, I bring a unique blend of skills and expertise that align perfectly with the responsibilities and requirements to the Operations manager role. Throughout my career, I have consistently demonstrated a strong commitment to safety, reliability, and customer service.As a former Sergeant in the police force, I understand the importance of compliance with regulatory standards and the critical role it plays in ensuring the well- being of individuals and clients.",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.",
  },
];

const TeamSection = () =>
{
  return (
    <section
      id="team"
      className="bg-[#ebebeb] w-full px-[10px] py-[24px] 414px:pt-[100px] 414px:px-0 414px:py mt-0 768px:p-[50px] 992px:mt-0 992px:px-2 992px:py-[120px] overflow-hidden"
    >
      <div className="w-full max-w-[1366px] mx-auto">
        <div className="members-slider relative select-none block w-full float-left">
          <div className="team-slider w-[96%] 414px:w-[92%] 768px:w-full mx-auto">
            <TeamSlider member={teamMembers} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;