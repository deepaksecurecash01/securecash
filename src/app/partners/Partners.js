import React from "react";

const Partners = () => {
  const partnersData = [
    {
      country: "NEW ZEALAND",
      greeting: "Tēnā koutou katoa!",
      flagColor: "default",
      flagSrc: "/images/partners/new-zealand.png",
      flagWidth: "small",
      partners: [
        {
          name: "G.A.I.S NZ - Guarding and Investigation Services",
          quote:
            '"What makes us different is our exemplary track record, our utmost pride and integrity in services and the commitment to our client\'s privacy."',
          logoSrc: "/images/partners/GAISlogo.png",
          logoWidth: "150px",
          mobileWidth: "auto",
          description: [
            "<strong>GAIS</strong> has over 30 years of experience in international security for both private companies and government agencies, not only in New Zealand but also in Australia.",
            "Brandan Hooper and his team cover a wide range of possibilities in their security work which includes health regulations, safety protocols, security consulting, and investigations services.",
          ],
          contact: {
            name: "Brandan Hooper",
            phone: "+64 21 136 7736",
            email: "inquiry@gais.co.nz",
            website: "https://www.gais.co.nz",
          },
        },
        {
          name: "Smartway Security & Technologies",
          quote:
            '"Experience the DIFFERENCE, because the difference is EXPERIENCE"',
          logoSrc: "/images/partners/smartway.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>Smartway Securities & Technologies</strong> started 19 years ago aiming to be no. 1 in customer support for remote security systems and CCTV. They provide all kinds of security and technology solutions for residential, commercial, and industrial customers.",
            "They do not limit themselves to what they have. They continue to do research and broaden their knowledge to provide state-of-the-art services for existing and future clients. They are the top service provider of CCTV, Alarm Systems, and Data and Wi-Fi Access Control Systems in all of New Zealand.",
          ],
          contact: {
            phone: "+64 800 936 363",
            email: "info@smartway.co.nz",
            website: "https://www.smartway.co.nz",
          },
        },
        {
          name: "PROtective Security Services NZ Ltd",
          quote: '"Awarded with QUALITY CERTIFICATION by OH & S."',
          logoSrc: "/images/partners/pssnzl.jpg",
          logoWidth: "40%",
          mobileWidth: "90%",
          description: [
            "<strong>PROtective Security Services NZ Ltd.</strong> works hard to make a difference in the security industry. They provide constant training to their security personnel, pay them fair wages, and constantly innovate their services.",
            '<strong>PROtective Security Services NZ Ltd.</strong> treats its personnel the same way they treat their clients. Like JW Bill Marriott said: "Take care of your employees. They will take care of your clients and the business will take care of itself".',
          ],
          contact: {
            phone: "+64 800 333 099",
            email: "info@pssnzl.co.nz",
            website: "https://www.pssnzl.co.nz",
          },
        },
        {
          name: "IQ Security",
          quote: '"We are Experienced, Trusted, and Friendly"',
          logoSrc:
            "/images/partners/IQSecurity.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>IQ Security</strong> is New Zealand's most trusted security integrator. They started over 10 years ago, wholly operating and based in Auckland. They provide a wide range of products, services, and security solutions for the commercial, retail, and corporate market.",
            "They help companies achieve absolute protection and peace of mind through security implementation, design, round-the-clock monitoring, and system maintenance. They guarantee a 100% efficiency in their service to exceed customer's expectations.",
            "IQ Security is a certified member of <strong>Master Electronic Security Installers New Zealand (MESINZ)</strong>. Their team of experts also offers FREE security consultations.",
          ],
          contact: {
            phone: "+64 508 477 328",
            email: "info@iqsecurity.co.nz",
            website: "https://www.iqsecurity.co.nz",
          },
        },
      ],
    },
    {
      country: "SINGAPORE",
      greeting: "Can lah!",
      flagColor: "#ff0000",
      flagSrc: "/images/partners/singapore.png",
      flagWidth: "small",
      partners: [
        {
          name: "Event Security Specialist",
          quote: '"Your Security, Our Responsibility"',
          logoSrc: "/images/partners/ESS.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>ESS Group of Companies</strong> offers quality products, services, consultation, and effective solutions for your security needs. They specialize in event security and social occasions security. They pride themselves with service excellence to exceed client's expectations.",
            "Their number one source of industry relations are police, military, auxiliary, and first-class security training. They have A-list security professionals all across Singapore, which makes their company exceptional compared to other security providers.",
          ],
          contact: {
            name: "Jasman",
            phone: "+65 6298 0382",
            email: "enquiry@ess.com.sg",
            website: "https://www.ess.com.sg",
          },
        },
      ],
    },
    {
      country: "SWEDEN",
      greeting: "Välkommen!",
      flagColor: "#0000ff",
      flagSrc: "/images/partners/sweden.png",
      flagWidth: "small",
      partners: [
        {
          name: "Engtex – Avertic Armour Security Panels",
          quote: '"Why Worry?"',
          logoSrc:
            "/images/partners/avertiicengtex.jpg",
          logoWidth: "30%",
          mobileWidth: "70%",
          description: [
            "<strong>Engtex</strong> was established in 1939. Through the years, their innovations, quality products, and services are famed for excellence. Their latest innovation, Avertic Armour, is a lightweight security panel that can be installed into almost any security product or construction.",
            "Avertic Armour works as an extra protection layer that can withstand attacks from an electric, battery or petrol-driven tools like grinders, concrete cutters, drills, chainsaws, etc. Avertic Armour is made in Sweden and is widely used in protecting CIT vehicles and ATMs in 4 different continents.",
          ],
          contact: {
            phone: "+46 392 37770",
            email: "info@averticarmour.com",
            website: "https://averticarmour.com",
          },
        },
      ],
    },
    {
      country: "INDIA",
      greeting: "Nämaste!",
      flagColor: "#808000",
      flagSrc: "/images/partners/india.png",
      flagWidth: "small",
      partners: [
        {
          name: "Black Hawks Security",
          quote: '"Why Worry?"',
          logoSrc:
            "/images/partners/Blackhawk.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>Black Hawks Security</strong> was established in India, servicing both the private and public sectors. They have the largest reach of industrial services. They are being hired by local and international companies who are based in the country.",
            "Black Hawks is named after the most distinguished birds in terms of behaviour and survival. It blends naturally with nature and has the best hybridization in all of the hawk family. Given that characteristic, Black Hawk Security India works through all types of security matters. They thrive to give their best to clients by treating them with respect, loyalty, and providing them with efficient security solutions.",
          ],
          contact: {
            phone: "+91 7014 061 375",
            email: "blackhawkssecurcorp@gmail.com",
            website: "https://www.blackhawkssecurity.com",
          },
        },
        {
          name: "Datar Security Service Group",
          quote: '"Peerless Security Provider"',
          logoSrc: "/images/partners/DSSGIN.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>Datar Security Service Group</strong> started over 15 years ago. They are proud to be one of the most trusted security service providers in India with several prestigious companies relying on their services. They treat their personnel, clients, and partners equally. They are on the road to becoming the top service provider in the country.",
            "<strong><em>Diversity:</em></strong> Their clients and personnel have their own individualities and opinions, but they ensure to understand these differences with a positive and healthy working environment.",
            "<strong><em>Respect:</em></strong> They treat everyone with the utmost respect, whether you are a client or staff.",
            "<strong><em>Transparency:</em></strong> They make sure that all suggestions are heard and actions are taken with excellence and integrity.",
            "<strong><em>Integrity:</em></strong> They value commitment and are dedicated to delivering peerless security and protection.",
          ],
          contact: {
            phone: "+91 1800 120 4131",
            email: "info@dssg.in",
            website: "https://dssg.in",
          },
        },
      ],
    },
    {
      country: "THAILAND",
      greeting: "Sawasdee",
      flagColor: "#ffbf00",
      flagSrc: "/images/partners/thailand.png",
      flagWidth: "71",
      flagHeight: "71",
      partners: [
        {
          name: "BKK Protection Services",
          quote: '"Security is not a product but a process" - Bruce Schenier?',
          logoSrc: "/images/partners/bkk.png",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>BKK</strong> provides self-defence training, protection services, and security facilities to clients across Thailand. They are dedicated to protecting the client's business, properties, and assets. They offer state-of-the-art facilities and world-class security services that help facilitate your travel reservations. They also provide cruises, cars, and private jet accommodations.",
            "Whether you're in Thailand or still planning to visit the country, they are confident that their services and facilities will give you security, comfort, and peace of mind throughout your travels.",
            "With a team of highly-trained security professionals, BKK Protection has grown to be the best and most reliable security service provider across Thailand.",
          ],
          contact: {
            phone: "+66 89121 1741",
            email: "KANOKWAN2001_TH@HOTMAIL.COM",
            line: "ATTHYOOTH",
            website: "https://www.bkkprotection.com",
          },
        },
      ],
    },
    {
      country: "MALAYSIA",
      greeting: "Selamat siang!",
      flagColor: "#dba901",
      flagSrc: "/images/partners/malaysia.png",
      flagWidth: "72",
      flagHeight: "72",
      partners: [
        {
          name: "MVD International",
          quote:
            '"Our global mission is to be professional, efficient and trustworthy."',
          logoSrc: "/images/partners/mvd.jpg",
          logoWidth: "auto",
          mobileWidth: "auto",
          description: [
            "<strong>MVD International</strong> is the number one private investigation company in Malaysia, providing security and peace of mind since 2003. They offer background screening, private investigation, and specialised security services. They make sure to cover all aspects of the situation to give clients the satisfaction they need, whether it's personal or business-related.",
            "Their team of operatives are highly qualified intelligence personnel. Most of them have worked in government agencies such as the police force, finance industries, forensics, and customs department. They value absolute integrity and practice strict clientele confidentiality.",
          ],
          contact: {
            phone: "+603 7866 0071",
            otherPhone: "+601 2215 1776",
            email: "info@mvdinternational.my",
            website: "https://www.mvdinternational.my",
          },
        },
      ],
    },
    {
      country: "UNITED KINGDOM",
      greeting: "I'm chuffed to bits!!",
      flagColor: "#0404b4",
      flagSrc: "/images/partners/uk.png",
      flagWidth: "small",
      partners: [
        {
          name: "Corporate Investigations UK",
          quote:
            '"We will gain the evidence, you will find out the truth, your company will save time and money"',
          logoSrc:
            "/images/partners/corporate-investigations-uk.jpg",
          logoWidth: "30%",
          mobileWidth: "90%",
          description: [
            "<strong>Corporate Investigations UK</strong> started 25 years ago. They have a network of professional investigators, methods, and solutions that have helped many clients in their search for answers.",
            "<strong><em>Employee Investigations:</em></strong> Hiring the right staff is important, especially for fast-growing companies who do not have enough time and resources to conduct their own employee background screening. Corporate Investigations UK ensures that you have a proficient workforce that aids you in your company's continued success.",
            "<strong><em>Company Investigations:</em></strong> Know your competitor's background, strategies, and legitimacy. Make the right decisions and give your company the advantage before engaging in any business propositions.",
            "<strong><em>Surveillance Equipment:</em></strong> Be on the lookout for possible threats. Their surveillance system is a practical security solution against employee theft, misconduct, or property breach in your business.",
          ],
          contact: {
            phone: "+44 800 334 5440",
            email: "contact@company-investigationsuk.co.uk",
            website: "https://corporate-investigationsuk.co.uk",
          },
        },
      ],
    },
    {
      country: "ISRAEL",
      greeting: "Shalom!",
      flagColor: "#260fea",
      flagSrc: "/images/partners/israel.png",
      flagWidth: "71",
      flagHeight: "71",
      partners: [
        {
          name: "Abir Global Security Services",
          logoSrc: "/images/partners/abir.jpg",
          logoWidth: "40%",
          mobileWidth: "90%",
          description: [
            "<strong>Abir Global Security Services Ltd</strong> is a security company established in 1995 by Yanir Melech. They specialize in security consultancy and economic investigations that can be customized according to your company's demand. They also offer polygraph examinations for private and business clients.",
            "Abir Global Security Services is one of the leading Polygraph Institutes in Israel that performs a variety of tests by utilizing the most advanced polygraph machines available today.",
            "Their employees are qualified security professionals with an extensive operational background in security. Through the years, their excellence has been tested by numerous organizations and by the complex missions they have accomplished. They strive to be an exceptional security service provider by staying up-to-date with various innovations, trends, and techniques to address the evolving threats of the changing world.",
          ],
          contact: {
            phone: "+972 4870 5656",
            email: "biz@abir-inv.com",
            website: "https://www.abir-inv.com",
          },
        },
      ],
    },
    {
      country: "NIGERIA",
      greeting: "Migwo!",
      flagColor: "#000",
      flagSrc: "/images/partners/nigeria.png",
      flagWidth: "71",
      flagHeight: "71",
      partners: [
        {
          name: "Rowluk Security Services",
          logoSrc: "/images/partners/Rowluk.jpg",
          logoWidth: "40%",
          mobileWidth: "90%",
          description: [
            "<strong>Rowluk Security Services</strong> is the leading IT security provider in the country. Their whole technical and management team have the best knowledge and expertise in providing excellent and cost-effective security services to both commercial and residential sectors of the community.",
            "Their products and services are innovative and certified high quality. Imagine the possibility of monitoring your property and residence remotely in one tap of your finger.",
            "Rowluk makes sure their clients receive world-class security supply, installation, and technical support from day one. They also offer free maintenance of up to 3 months upon installation of all their services.",
          ],
          contact: {
            phone: "+234 803 335 3313",
            email: "rowluk@gmail.com",
            website: "https://www.rowluksecurityservices.simdif.com",
          },
        },
      ],
    },
  ];

    const handleFlagClick = (countryId) =>
    {
        const element = document.getElementById(countryId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
  return (
    <div className="partners mt-[78px]">
      {partnersData.map((countryPartner, countryIndex) => (
        <div key={countryIndex} className="partners--item mt-[48px]">
          <div className="partners--item__header flex items-center">
            <img
              id={countryPartner.country.toLowerCase().replace(" ", "-")}
              className="left mr-5"
              src={countryPartner.flagSrc}
              alt={`Partners from ${countryPartner.country}`}
              width={countryPartner.flagWidth}
                      height={countryPartner.flagHeight}
                      
            />
            <h3
              style={{ color: countryPartner.flagColor }}
              className="font-semibold text-start text-[27px] leading-[30px] text-[#0000a0]"
            >
              {countryPartner.country}{" "}
              <span className="title-em italic">{countryPartner.greeting}</span>
            </h3>
          </div>
          {countryPartner.partners.map((partner, partnerIndex) => (
            <div key={partnerIndex} className="partners--item__partner ">
              <h4 className=" font-medium text-[24px] mt-[40px] mb-[30px] leading-[30px]">
                {partner.name}
              </h4>
              <p className="partners--item__partner--article-head leading-[2rem] mb-4 text-left">
                <strong>{partner.quote}</strong>
              </p>
              {partner.logoSrc && (
                <img
                  className="partner-logo"
                  src={partner.logoSrc}
                  alt={partner.name}
                  style={{
                    "--mobile-width": partner.mobileWidth,
                    "--logo-width": partner.logoWidth,
                  }}
                />
              )}
              {partner.description.map((desc, descIndex) => (
                <p
                  className=" leading-[2rem] mb-4"
                  key={descIndex}
                  dangerouslySetInnerHTML={{ __html: desc }}
                />
              ))}
              {partner.contact && (
                <ul className="my-[34px]  414px:pl-5  768px:pl-[30px] text-[14px] 414px:text-[16px]">
                  {partner.contact.name && (
                    <li className="leading-[1.8em]">
                      Contact Name: {partner.contact.name}
                    </li>
                  )}
                  {partner.contact.phone && (
                    <li className="leading-[1.8em]">
                      Contact no:{" "}
                      <a
                        className="text-link hover:underline"
                        href={`tel:${partner.contact.phone}`}
                      >
                        {partner.contact.phone}
                      </a>
                    </li>
                  )}
                  {partner.contact.email && (
                    <li className="leading-[1.8em]">
                      Email:{" "}
                      <a
                        className="text-link hover:underline"
                        href={`mailto:${partner.contact.email}`}
                      >
                        {partner.contact.email}
                      </a>
                    </li>
                  )}
                  {partner.contact.website && (
                    <li className="leading-[1.8em]">
                      Website:{" "}
                      <a
                        className="text-link hover:underline "
                        href={partner.contact.website}
                        target="_blank"
                        rel="noopener"
                      >
                        {(() => {
                          let url = partner.contact.website.replace(
                            /^https?:\/\//,
                            ""
                          );
                          return url.startsWith("www.") ? url : `www.${url}`;
                        })()}
                      </a>
                    </li>
                  )}
                </ul>
              )}
              {partnerIndex < countryPartner.partners.length - 1 && (
                <hr className="block mx-auto border-inset border-[1px] overflow-hidden mb-[44px]" />
              )}
            </div>
          ))}
          {(partnersData.length > 1 || countryPartner.partners.length > 1) &&
            countryIndex < partnersData.length - 1 && (
              <hr className="partners--item__hr bg-black h-[2px] border-none my-[30px] mb-[24px]" />
            )}
        </div>
      ))}
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]"></div>
    </div>
  );
};

export default Partners;
