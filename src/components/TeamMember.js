import React from 'react'

 export const TeamMember = ({ member }) => (
    <div className="item-container">
      <div className="item">
        <img className="team-pic" src={member.image} alt={member.name} />
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
  );