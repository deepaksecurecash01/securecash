import React from "react";
import { ScrollSectionWithImage } from "./ScrollSectionWithImage";
import { StorySection } from "./StorySection";
import { HelpSection } from "./HelpSection";
import { ServiceSection } from "./ServiceSection";

const AboutusSection = () =>
{
    // First section content
    const helpSectionContent = [
        "We are a courier business that specialises in the pickup and banking of your daily takings in serial numbered, tamper-evident satchels, anywhere, anytime regardless of where your business is located in Australia.",
        "Our staff will then collect these satchels and deliver them to the bank, allowing you to concentrate 100% on your business.",
        "You can bank as little, or as much as you require, and even choose what day or days you need your banking collected, even if it is just once a week or on an 'ad-hoc' basis, we don't lock you into any contracts so you are free to have complete flexibility with your services.",
        "We pride ourselves on providing a safe, reliable and affordable service to all customers. We can cater for any scenario, whether you would like services for your business during business hours or need a collection for your festival on a Saturday night, get in touch with us and find out more about how we can assist you.",
        "Our customers choose us for many good reasons: we provide professional cash transport solutions, we help reduce cash handling risks, and we offer the most affordable services.",
    ];

    // Second section content
    const storySectionContent = [
        "We have been operating in the security industry for over 25 years, since 1992 to be exact. In 2005, we made the decision to overhaul our business model and concentrate solely on Cash in Transit, starting the beginning of the SecureCash era.",
        "We made this decision so that we could specialise in one section of the security industry and give our complete attention to provide the best possible service for our customers.",
        "We strive to constantly evolve and bring innovative solutions to develop our company and make our service experience the best it can be for our customers.",
        "When it comes to your hard earned money you need someone you can trust and rely upon to handle the banking for your business. We take this very seriously and work very hard from our end to ensure all of our systems and protocols can provide that assurance.",
    ];

    // Third section content
    const covertSectionContent = [
        "Many people perceive armed security officers favorably as a deterrent against violence and an assurance that a violent incident can be quickly quelled. From a client's standpoint, it offers a perception of higher protection.",
        "Armed security officers are widely accepted as warranted in certain locations where the threat level matches the use of force. Government contracts and high-profile corporate executives are protected by highly trained armed officers. At banks, the risk of robbery also justifies an armed officer.",
        "But it is difficult to craft a convincing argument for armed security officers in many settings. The presence of a gun is not proven to de-escalate a situation in every environment, and it is unlikely to deter violent and determined individuals. The presence of an additional firearm — even in a security officer's hands — only stands to increase the risk of casualties. This is particularly true of public or crowded environments, like stadiums, schools, and restaurants.",
        "By looking at insurance claims, it's clear that when a security officer discharges his or her gun, the resulting claims are serious. Claims resulting from the use of firearms are likely to breach insurance policy limits, so firms employing armed security officers are wise to purchase higher limits of liability than firms not employing armed officers.",
        "When someone is shot by a security officer, his — or his estate — will likely sue the business that contracted the officer. And the security firm and officer are going to be brought into the suit as well—no matter how well-trained the officer. If it goes to trial, it is very rare for a judge and jury to believe use of the weapon was justified. It is almost always perceived as excessive force.",
        "This is why SecureCash operates unarmed and in plain clothes, but still with all bank couriers trained in the necessary high level risk training. We will be in and out of your business without alerting any unwanted attention, banking your money on the day we collect.",
    ];

    return (
        <div>
            <HelpSection
                title="How SecureCash will help you"
                imageUrl="https://www.securecash.com.au/images/about-us-images/img-sec-2.png"
                imageAlt="Secure Cash Logo Over Office"
                imageWidth={713}
                imageHeight={636}
                sectionContent={helpSectionContent}
                bgClass={"bg-quote-header"}
                imagePosition="left"
                id="about-us-section-help"
                hasCTA={true}
            />
            <StorySection
                title="The story of SecureCash"
                imageUrl="https://www.securecash.com.au/images/team.jpg"
                imageAlt="The SecureCash Team"
                imageWidth={683}
                imageHeight={455}
                sectionContent={storySectionContent}
                bgClass={"bg-[#dfdfdf]"}
                imagePosition="right"
                id="about-us-section-story"
            />
            <ServiceSection
                title="Why a covert service is important"
                imageUrl="https://www.securecash.com.au/images/about-us-images/img-sec-4.png"
                imageAlt="SecureCash Logo Money Wrapped In Chain"
                imageWidth={732}
                imageHeight={600}
                sectionContent={covertSectionContent}
                imagePosition="left"
                id="about-us-section-service"
            />
        </div>
    );
};

export default AboutusSection;