import BottomBanner from "@/components/about-us/BottomBanner";
import VideoSection from "@/components/common/VideoSection";
import GuranteeSection from "@/components/services/GuaranteeSection";
import HeroImage from "@/components/services/HeroImage";
import ScrollSection from "@/components/service/ScrollSection";
import ScrollSection2 from "@/components/service/ScrollSection2";
import SectionWrapper from "@/components/service/SectionWrapper";
import React from "react";

const contentItems = [
  {
    title: "Trust Us with Your Cash in Transit Needs",
    subtitle: "Professional Security Solutions",
    content: [
      "<strong>SecureCash</strong> offers professional security during the collection and transport of your money to the bank. Since moving large amounts of cash can be very risky, we are here to offer security solutions that are tailored according to your business needs. After helping many organisations and businesses from various industries in Australia, we have been named as the <strong>most reliable cash in transit company</strong> in the country.",
      "<strong>SecureCash provides three types of cash security services:</strong> <em><strong>Cash Collection</strong></em>, <em><strong>Cash Delivery</strong></em>, and <em><strong>Cash Counting</strong></em>.",
      "<strong>SecureCash</strong> employs highly-trained cash escorts and uses the latest technology in cash-in-transit security to protect your money while in transit. If you want us to count your money before taking it to the bank, consider it done. We have secure and well-equipped depots in <a href='https://www.securecash.com.au/cash-in-transit-brisbane/'>Brisbane</a>, <a href='https://www.securecash.com.au/cash-in-transit-adelaide/'>Adelaide</a>, <a href='https://www.securecash.com.au/cash-in-transit-melbourne/'>Melbourne</a>, <a href='https://www.securecash.com.au/cash-in-transit-sydney/'>Sydney</a>, and <a href='https://www.securecash.com.au/cash-in-transit-perth/'>Perth</a> that caters cash counting and delivery requests. If you need to order cash in specific denominations, we got you covered.",
      "<strong>SecureCash</strong> is a government-licensed and security-accredited institution with up to 150 years of combined experience among our management staff. All our services are covered by a nationwide insurance policy that takes full liability for losses from the moment it left your premises until it reaches your bank. Since 1992, we aim to provide <a href='https://www.securecash.com.au/cash-in-transit-security/'>affordable cash in transit solution</a> by not imposing lengthy contracts to our customers.",
    ],
  },
];

const contentItems2 = [
  {
    title: "Straightforward and Efficient Service",
    content: [
      "<strong>Cash in transit services</strong> reduces both internal and external risks for your business. Though some australia cash in transit companies prefer having one of their employees do the banking for them, we greatly disagree with this method as it may put your business in jeopardy.",
      "SecureCash has professional <a href='https://www.securecash.com.au/cash-in-transit-couriers/'>bank couriers</a> who are highly-trained to move your money anywhere in Australia. By outsourcing your banking transport to us, we help boost your company profits and productivity as you are free to put more focus on your business.",
      "Opting for our cash collection or money pickup service is fast and simple. All you need to do is call <strong><span style='text-decoration: underline'><a href='tel:1300732873'>1300 SECURE</a></span></strong> or <span style='text-decoration: underline'><a href='https://www.securecash.com.au/quote/' target='_blank' rel='noopener'>get a quote</a></span> through our website. You can also cancel bookings, view copies of our cash-in-transit insurance policy, and even verify the IDs of our cash couriers online.",
      "For years, <strong>SecureCash</strong> has been delivering exemplary cash security services as we take pride in our customer satisfaction rate.",
    ],
  },
  {
    title: "Solid Security Standards",
    content: [
      "<strong>We take security very seriously.</strong> This is why we implement relevant methods and procedures garnered from our decades of experience in cash security. Our covert and discreet approach makes our services unique. We deploy banking couriers in plain clothes who will carry your money in an unmarked yet security-equipped vehicle to avoid unnecessary public attention.",
      "We use the smartest technology available in providing valuable data and cash-in-transit reporting so you can easily track the transaction from your end. With SecureCash, transporting funds should now be the least of your worries. You can now spend more time running your business and keeping your customers happy.",
    ],
  },
];

const guaranteeContent = [
  {
    title: "Secure Your Cash in Transit",
    subtitle: "24/7 Banking Services Across Australia",
    content: [
      "SecureCash is available 24 hours a day, serving <strong>cash in transit services</strong> - anywhere in Australia. We provide other services such as <a href='https://www.securecash.com.au/cash-collection/'>Cash Collection services</a>, <a href='https://www.securecash.com.au/cash-pickups/'>Cash Pickup services</a>, <a href='https://www.securecash.com.au/cash-logistics/'>Cash Logistic services</a>, <a href='https://www.securecash.com.au/cash-security/'>Cash Security services</a>, <a href='https://www.securecash.com.au/cash-delivery/'>Cash Delivery services</a>, <a href='https://www.securecash.com.au/cash-transport-companies/'>Cash Transport</a> and <a href='https://www.securecash.com.au/cash-couriers/'>Cash Courier services</a>, and a network of licensed contractors covering the rest of the country. Contact us today for more information about how we can help your business in Australia.",
      "<strong>SecureCash</strong> guarantees the safest handling of your business takings. In case we miss your bank's cut-off time, your money will be kept in a protected and undisclosed location until it's delivered to your bank the next business day.",
      "<span style='font-style: normal;'><strong>Your daily takings' safety is our top priority.</strong> It is important to us that our services are delivered in a professional and timely manner, no matter what your business is—no matter where you are located.</span>"
    ]
  },
];

const page = () =>
{
  return (
    <div>
      <HeroImage
        title={"Cash In Transit"}
        imgSrc={
          "https://www.securecash.com.au/images/32-australia-securecash-services-featured.png"
        }
      />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>
      <SectionWrapper
        heading={"Looking for Cash In Transit Services?"}
        description={`<strong>Cash in transit</strong> is the physical transfer of banknotes, coins, cheques, credit cards,
          and items of value from one location to another.&nbsp;<strong>SecureCash</strong> offers
          professional security during the pickup, transport, and deposit of your business' daily
          takings.<br><a class="text-primary hover:underline" href="https://www.securecash.com.au/quote/" target="_blank" rel="noopener"><strong>Get a quote
              now</strong></a> to find out how we can help your business
          today!`}
        contentItems={contentItems}
        contactInfo={`<div style=" text-align: justify; font-weight: 300; line-height: 2rem; margin-top: 12px; margin-bottom: 12px;">
    <em>
        <strong>
            If you need someone to pick up your banking, feel 
            <span> 
                <a href="tel:1300732873" style="color: #957433; text-decoration: none;">
                    free to call us
                </a>
            </span> 
            anytime!
        </strong>
    </em>
</div>
`}
      />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>

      <VideoSection service={true} height={`690px`} />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>

      <ScrollSection2
        contentItems={contentItems2}
        height={`545px`}
        imgSrc={`https://www.securecash.com.au/images/25-australia-securecash-services-25.jpg`}
        contactInfo={`
    <h3 style=" font-size: 22px; font-weight: bold; color: #000; text-align: center; margin-bottom: 28px;">
        CALL US TODAY
    </h3>
    <div style=" text-align: justify; font-weight: 300; line-height: 2rem; margin-top: 16px;">
        <em>
            <strong>
                <span style="font-size: medium;">You can reach us at </span>
                <a href="tel:1300732873" style="color: #957433; text-decoration: none;">
                    1300 732 873
                </a>
                <span style="font-size: medium;">
                    <em>
                        <strong>
                            . Our friendly staff would be more than happy to discuss how we can help you with your cash-in-transit needs. Call now!
                        </strong>
                    </em>
                </span>
            </strong>
        </em>
    </div>
    <div style=" text-align: justify; font-weight: 300; line-height: 2rem; margin-top: 16px;">
        <em>
            <p style="font-size: medium;">
                Want to read more? Check out our blog post on
                <a href="/blog/history-of-cash-in-transit/" style="color: #957433; text-decoration: none;">
                    History of Cash in Transit
                </a>
            </p>
        </em>
    </div>

`}
      />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>
      <GuranteeSection guaranteeContent={guaranteeContent} />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>

      <BottomBanner />
    </div>
  );
};

export default page;
