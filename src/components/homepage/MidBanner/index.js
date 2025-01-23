import React from "react";
import CounterSection from "./CounterSection";
import ContentSection from "./ContentSection";
import VideoSection from "@/components/common/VideoSection";

const stats = [
  {
    id: 1,
    value: "2031",
    imgSrc: "https://www.securecash.com.au/images/icons/clients.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/clients.png",
    alt: "Customers",
    description: "Customers",
  },
  {
    id: 2,
    value: "316788",
    imgSrc: "https://www.securecash.com.au/images/icons/services.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/services.png",
    alt: "Services Performed",
    description: "Services Performed",
  },
  {
    id: 3,
    value: "2785877642",
    prefix: true,
    imgSrc: "https://www.securecash.com.au/images/icons/transport.webp",
    imgFallback: "https://www.securecash.com.au/images/icons/transport.png",
    alt: "Cash Moved",
    description: "Cash Moved",
  },
];

const slides = [
  {
    id: "mobimg-1",
    img: "https://www.securecash.com.au/images/icons/australia.png",
    title: "Australia Wide",
    description:
      "SecureCash is a one-stop cash-in-transit agency managing banking & change order services Australia-wide.",
  },
  {
    id: "mobimg-2",
    img: "https://www.securecash.com.au/images/icons/edocket.png",
    title: "eDocket System",
    description:
      "Track & trace deposits using our industry-leading software technology unique to SecureCash.",
  },
  {
    id: "mobimg-3",
    img: "https://www.securecash.com.au/images/icons/flexible.png",
    title: "Total Flexibility",
    description:
      "Choose the days for banking collection and modify them anytime, offering you complete flexibility.",
  },
  {
    id: "mobimg-4",
    img: "https://www.securecash.com.au/images/icons/banks.png",
    title: "All Major Banks",
    description:
      "We work with most major banks in Australia, including NAB, Commonwealth Bank, ANZ, Westpac, and more.",
  },
  {
    id: "mobimg-5",
    img: "https://www.securecash.com.au/images/icons/contracts.png",
    title: "No Lock-in Contracts",
    description:
      "Try our service risk-free without lengthy contracts; cancel anytime with notice if it’s not suitable for your organization.",
  },
  {
    id: "mobimg-6",
    img: "https://www.securecash.com.au/images/icons/olservices.png",
    title: "Online Services",
    description:
      "Manage pickups, cancel schedules, submit orders, and verify couriers online with ease.",
  },
];

const MidBanner = () => {
  return (
    <div>
      <CounterSection stats={stats} />
      <ContentSection />
      <VideoSection />
    </div>
  );
};

export default MidBanner;
