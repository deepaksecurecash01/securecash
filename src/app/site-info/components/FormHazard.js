import React from "react";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import Paragraph from "@/components/common/Paragraph";
import SubHeading from "@/components/common/SubHeading";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";
import FranchiseForm from "./FranchiseForm";
import Image from "next/image";

const FormHazard = () => {
  const contactInfo = [
    {
      icon: <FaPhoneAlt className="pr-2.5 text-[26px] relative inline" />,
      text: "1300 SECURE / 1300732873",
      link: "tel:1300732873",
      isLink: true,
    },
    {
      icon: <FaMapMarkerAlt className="pr-2.5 text-[26px] relative inline" />,
      text: "Anywhere, Anytime, Australia Wide",
    },
    {
      icon: <FaEnvelope className="pr-2.5 text-[26px] relative inline" />,
      text: "franchise@securecash.com.au",
      link: "mailto:franchise@securecash.com.au",
      isLink: true,
    },
    {
      icon: <FaStar className="pr-2.5 text-[26px] relative inline" />,
      text: "Proudly Serving Customers Australia Wide 24/7",
    },
  ];
  return (
    <div
      id="contact-form-section"
      className="inline-block w-full mb-12  480px:mb-[120px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex ">
        <div className=" 414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10  480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">
          <Image
            src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
            alt="Making A Deal"
            className=""
            fill
            objectFit="cover"
          />
        </div>
        <FranchiseForm />
      </div>
    </div>
  );
};

export default FormHazard;
