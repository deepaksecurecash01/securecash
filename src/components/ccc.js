import React from 'react'

const TeamContent = () =>
{
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
        <div className="members-slider">
          <div className="team-slider">
            <div className="team-slider-grid flex" style={{ left: 0 }}>
              {teamMembers.map((member, index) => (
                <div className="item-container w-[24%]" key={index}>
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
                        className="mail-icon"
                        src="https://www.securecash.com.au/images/icons/mail.png"
                        alt="Email"
                      />
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </div>
                    <div className="social-media">
                      <ul>
                        {Object.entries(member.socialLinks).map(
                          ([platform, url]) => (
                            <li key={platform}>
                              <a href={url}>
                                <img
                                  src={`https://www.securecash.com.au/images/icons/social/webp/${platform}.webp`}
                                  alt={platform}
                                />
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamContent;


  <div
              id="content-cash"
              className="relative w-full 992px:absolute mt-[32px] flex justify-between 992px:w-[900px] 992px:inset-x-0 992px:right-0 mx-auto  transform-none  mr-10 1366px:mt-[80px] -translate-x-[20%] 1200px:left-0 1200px:-translate-x-0"
            ></div>