import React from "react";
import Container from "@/components/layout/Container";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import Image from "next/image";
import { FaCircle, FaRegCircle } from "react-icons/fa";

// Data Structure based on "Updated Service Agreement Clauses.pdf"
const serviceAgreementData = [
  {
    title: "1. DEFINITIONS",
    items: [
      {
        text: "<strong>Agreement</strong> means these Terms, any Quotation, Instructions, schedules, and any agreed written variations.",
      },
      {
        text: "<strong>Authorised Representative</strong> means a person authorised by SecureCash to perform the Services and whose authority is verifiable at the time of handover through SecureCash's systems, records, or verification processes.",
      },
      {
        text: "<strong>Bank Verification</strong> means the final count performed by the Customer's nominated financial institution.",
      },
      {
        text: "<strong>Business Day</strong> means a day other than a Saturday, Sunday, or public holiday in South Australia.",
      },
      {
        text: "<strong>Cash</strong> includes banknotes, coin, sealed deposit bags, and associated banking instruments.",
      },
      {
        text: "<strong>Confidential Information</strong> means all non-public information relating to the business, operations, security arrangements, pricing, procedures, systems, finances, or commercial affairs of either party.",
      },
      {
        text: "<strong>Consequential Loss</strong> includes loss of profit, revenue, opportunity, goodwill, reputation, indirect loss, and economic loss.",
      },
      {
        text: "<strong>Services</strong> means cash-in-transit services, change delivery, temporary secure storage, and associated security services.",
      },
    ],
  },
  {
    title: "2. ENTIRE AGREEMENT",
    items: [
      {
        text: "This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions, representations, or arrangements.",
      },
      {
        text: "No terms proposed by the Customer apply unless expressly accepted in writing by the Principal.",
      },
    ],
  },
  {
    title: "3. COMMERCIAL BASIS",
    items: [
      {
        text: "The Customer acknowledges that the Services are acquired solely for business purposes and not for personal, domestic, or household use.",
      },
      {
        text: "Nothing in this clause excludes or limits statutory rights that cannot be excluded by law.",
      },
    ],
  },
  {
    title: "4. SERVICE CONDITIONS",
    items: [
      {
        number: "4.1",
        text: "A minimum of one (1) collection per week applies unless otherwise agreed in writing.",
      },
      {
        number: "4.2",
        text: "SecureCash will use reasonable endeavours to perform collections and deliveries having regard to security, safety, access, and operational requirements. No specific collection or delivery time is guaranteed.",
      },
      {
        number: "4.3",
        text: "All Cash must be fully prepared, sealed in tamper-evident satchels, and ready for handover prior to arrival.",
      },
      {
        number: "4.4",
        text: "Each collection is limited to:",
        subItems: [
          "ten (10) bags",
          "total weight of 3kg",
          "$50,000 AUD in cash unless approved in writing",
        ],
      },
      {
        text: "Cheques are not subject to a face value limit.",
      },
    ],
  },
  {
    title: "5. CHANGE ORDERS",
    items: [
      {
        number: "5.1",
        text: "Change orders must be submitted at least two (2) Business Days prior via SecureCash systems.",
      },
      {
        number: "5.2",
        text: "Orders exceeding $1,000 require prepayment of the excess before processing.",
      },
      {
        number: "5.3",
        text: "Fees apply as quoted and may include handling and sourcing fees.",
      },
      {
        text: "SecureCash may reject, modify, or defer orders presenting security, safety, or operational risk.",
      },
    ],
  },
  {
    title: "6. CUSTOMER OBLIGATIONS",
    items: [
      {
        text: "The Customer must:",
        subItems: [
          "provide safe, secure, and adequately lit access",
          "ensure designated and authorised handover points",
          "comply with SecureCash procedures and manuals",
          "ensure staff follow verification requirements",
        ],
      },
      { text: "Failure to comply constitutes a material breach." },
    ],
  },
  {
    title: "7. VERIFICATION AND HANDOVER",
    items: [
      {
        number: "7.1",
        text: "Cash may only be released to an Authorised Representative verified through:",
        subItems: [
          "SecureCash systems or portal",
          "QR identification",
          "telephone confirmation",
        ],
      },
      { number: "7.2", text: "Physical identification alone is insufficient." },
      {
        number: "7.3",
        text: "Loss arising from failure to follow verification procedures is the Customer's responsibility, except to the extent directly caused by SecureCash's negligence.",
      },
    ],
  },
  {
    title: "8. BANK VERIFICATION",
    items: [
      {
        number: "8.1",
        text: "Subject to Clause 8A, Bank Verification is final and binding.",
      },
      {
        number: "8.2",
        text: "SecureCash is not liable for discrepancies identified after Bank Verification unless directly caused by SecureCash's negligence.",
      },
    ],
  },
  {
    title: "8A. BANK VERIFICATION DISPUTE PROCESS",
    items: [
      {
        number: "8A.1",
        text: "The Customer must notify SecureCash in writing of any dispute within five (5) Business Days of receiving Bank Verification, providing reasonable supporting information.",
      },
      {
        number: "8A.2",
        text: "SecureCash will acknowledge the dispute within two (2) Business Days and complete an internal investigation within ten (10) Business Days.",
      },
      {
        number: "8A.3",
        text: "Where SecureCash error is established, SecureCash will rectify the loss within fourteen (14) days.",
      },
      {
        number: "8A.4",
        text: "If no dispute is raised within the timeframe, or after completion of the investigation, Bank Verification remains final.",
      },
    ],
  },
  {
    title: "9. DELAYS AND STORAGE",
    items: [
      { number: "9.1", text: "Same-day delivery is not guaranteed." },
      {
        number: "9.2",
        text: "Where delivery is delayed for reasons beyond reasonable control, Cash may be securely stored and delivered the next Business Day.",
      },
      {
        number: "9.3",
        text: "SecureCash will not store Cash for more than three (3) Business Days without the Customer's consent unless required by law or security necessity.",
      },
    ],
  },
  {
    title: "10. PAYMENT",
    items: [
      {
        number: "10.1",
        text: "Invoices are payable within fourteen (14) days.",
      },
      {
        number: "10.2",
        text: "SecureCash may suspend Services after forty-eight (48) hours' written notice for non-payment.",
      },
      {
        number: "10.3",
        text: "The Customer indemnifies SecureCash for reasonable costs incurred in recovering overdue amounts.",
      },
    ],
  },
  {
    title: "11. INSURANCE",
    items: [
      {
        number: "11.1",
        text: "SecureCash maintains public liability and cash-in-transit insurance appropriate to the nature and risk of the Services.",
      },
      {
        number: "11.2",
        text: "Contractors and franchisees engaged by SecureCash must maintain equivalent insurance as required by SecureCash.",
      },
      {
        number: "11.3",
        text: "Insurance responds subject to policy terms, exclusions, and conditions. Nothing in this Agreement constitutes an insurance policy or guarantee of coverage.",
      },
      {
        number: "11.4",
        text: "Certificates of currency will be provided upon reasonable request.",
      },
    ],
  },
  {
    title: "12. RESPONSIBILITY FRAMEWORK",
    items: [
      {
        number: "12.1",
        text: "SecureCash remains managerially responsible for coordination and delivery of the Services.",
      },
      {
        number: "12.2",
        text: "Contractors and franchisees act as authorised service providers within SecureCash operational controls.",
      },
    ],
  },
  {
    title: "13. INDEMNITY",
    items: [
      {
        text: "The Customer indemnifies SecureCash against loss arising from:",
        subItems: [
          "breach of this Agreement",
          "failure to comply with procedures",
          "unsafe premises or access",
          "unlawful or unauthorised use of the Services",
        ],
      },
      {
        text: "For the purposes of this clause, <strong>unsafe premises or access</strong> means conditions that present a foreseeable risk to personnel safety, including inadequate lighting, uncontrolled hazards, or unsecured access points.",
      },
      {
        text: "This indemnity does not apply to loss directly caused by SecureCash's negligence.",
      },
    ],
  },
  {
    title: "14. LIMITATION OF LIABILITY",
    items: [
      {
        number: "14.1",
        text: "To the maximum extent permitted by law:",
        // UPDATED STRUCTURE FOR 14.1
        subItems: [
          "SecureCash is not liable for Consequential Loss",
          {
            // Object indicates a bullet with its own nested list
            text: "SecureCash's total liability is limited to the lesser of:",
            subItems: [
              "re-performance of the Services, or",
              "fees paid in the preceding three (3) months",
            ],
          },
        ],
      },
      {
        number: "14.2",
        text: "Nothing excludes liability that cannot be excluded by law.",
      },
    ],
  },
  {
    title: "15. DATA AND PRIVACY",
    items: [
      {
        number: "15.1",
        text: "The Customer consents to SecureCash collecting, storing, and using personal and transactional data for operational, compliance, security, and audit purposes.",
      },
      {
        number: "15.2",
        text: "SecureCash will comply with applicable privacy legislation and notify the Customer of any notifiable data breach in accordance with law.",
      },
    ],
  },
  {
    title: "16. SUBCONTRACTING",
    items: [
      {
        text: "SecureCash may subcontract Services and retains overall responsibility for service coordination and compliance.",
      },
    ],
  },
  {
    title: "17. TERMINATION",
    items: [
      {
        number: "17.1",
        text: "SecureCash may terminate immediately for non-payment, material breach, or WHS or security risk.",
      },
      {
        number: "17.2",
        text: "The Customer may terminate for material breach by SecureCash if not remedied within fourteen (14) days of written notice.",
      },
      {
        number: "17.3",
        text: "The Customer may otherwise terminate on thirty-one (31) days' notice if accounts are current.",
      },
    ],
  },
  {
    title: "18. FORCE MAJEURE",
    items: [
      {
        text: "Neither party is liable for failure caused by events beyond reasonable control.",
      },
    ],
  },
  {
    title: "19. CONFIDENTIALITY",
    items: [
      {
        text: "Each party must keep Confidential Information confidential and use it only for purposes of this Agreement, subject to lawful disclosure.",
      },
      { text: "This clause survives termination for five (5) years." },
    ],
  },
  {
    title: "20. NOTICES",
    items: [
      { text: "Notices may be given electronically." },
      {
        text: "Email is deemed received when sent, unless a delivery failure notice is received.",
      },
    ],
  },
  {
    title: "21. GOVERNING LAW",
    items: [
      { text: "This Agreement is governed by the laws of South Australia." },
      { text: "The courts of South Australia have exclusive jurisdiction." },
    ],
  },
  {
    title: "22. VARIATION",
    items: [
      {
        text: "SecureCash may vary this Agreement on thirty (30) days' notice.",
      },
      {
        text: "The Customer may terminate prior to commencement of a material variation.",
      },
    ],
  },
  {
    title: "23. ACCEPTANCE",
    items: [
      {
        text: "Acceptance occurs by signature, electronic acceptance, or continued use of the Services.",
      },
    ],
  },
];

const TermsListItem = ({ item, index, section }) => (
  <li key={index} className="relative">
    {item.number && (
      <span
        className="tnc-number absolute left-0 text-[16px] font-semibold text-[#8B7355]"
        aria-hidden="true"
      >
        {item.number}
      </span>
    )}
    <div
      className={`block leading-[2em] ${item.number ? "pl-[47px]" : "pl-0"} ${index !== section.length - 1 ? "mb-[20px]" : ""}`}
    >
      {/* Render HTML text to support <strong> tags in Definitions */}
      <p dangerouslySetInnerHTML={{ __html: item.text }} />

      {/* Render sub-list if it exists */}
      {item.subItems && (
        <ul className="list-[disc] pl-5 mt-2 space-y-1">
          {item.subItems.map((sub, idx) => {
            // Check if sub is a string or an object (for deep nesting like 14.1)
            const isObject = typeof sub === "object" && sub !== null;
            const subText = isObject ? sub.text : sub;

            return (
              <li
                key={idx}
                className="pl-1 marker:text-primary/70 marker:text-2xl"
              >
                <span className="text-base font-light text-black ">
                  {subText}
                </span>

                {/* Level 3 Nesting (e.g. for Section 14.1) */}
                {isObject && sub.subItems && (
                  <ul className="list-[circle] pl-5 mt-1 space-y-1">
                    {sub.subItems.map((nestedSub, nestedIdx) => (
                      <li
                        key={nestedIdx}
                        className="pl-1 marker:text-primary marker:text-2xl"
                      >
                        <span className="text-base font-light text-black ">
                          {nestedSub}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </li>
);

// Added isLast prop to conditionally remove the bottom margin
const TermsSection = ({ section, isLast }) => (
  <div className={isLast ? "" : "mb-8"}>
    <h3 className="text-[16px] font-bold leading-[1.6em] text-left mx-auto 992px:text-[18px] mb-[24px] 768px:text-left 768px:mx-0 font-montserrat uppercase">
      {section.title}
    </h3>
    <ul className="tnc-page-sa-clauses--content__list list-none font-light relative pr-10">
      {section.items.map((item, index) => (
        <TermsListItem
          key={index}
          item={item}
          index={index}
          section={section.items}
        />
      ))}
    </ul>
  </div>
);

const ServiceAgreementClauses = () => {
  return (
    <section className="tnc-page-sa-clauses relative z-[1] bg-[#f7f7f7] shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] 1024px:shadow-none">
      <div className="tnc-page-sa-clauses__img-bg hidden 1024px:block absolute left-0 768px:w-[30%] h-full -z-[1]">
        <Image
          src="/images/welcome/terms-main-img-2.jpg"
          alt="Two People Shaking Hands"
          fill
          sizes="30vw"
          className="object-cover"
          quality={85}
        />
      </div>
      <Container className="inner w-full">
        <div className="tnc-page-sa-clauses--wrap flex justify-end">
          <div className="tnc-page-sa-clauses--content 1024px:w-[70%] 1200px:w-[65%] py-[50px] px-[30px] 480px:py-[82px] 480px:px-[34px] 1366px:pt-[74px] 1366px:pb-[74px] 1366px:pl-[0px] 1366px:pr-[18px]">
            <h2 className="text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mx-auto 992px:text-[26px] 768px:mx-0 font-montserrat uppercase">
              Service Agreement Clauses
            </h2>
            <hr className="mt-5 mb-[34px] w-[100px] 768px:text-left 768px:mx-0 h-[4px] rounded-[5px] border-0 bg-primary" />
            <ScrollableSection className="h-[652px] 992px:w-full p-0 mx-auto 992px:h-[380px]">
              {serviceAgreementData.map((section, index) => (
                <TermsSection
                  key={index}
                  section={section}
                  isLast={index === serviceAgreementData.length - 1} // Check if last section
                />
              ))}
            </ScrollableSection>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceAgreementClauses;
