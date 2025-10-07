import React from "react";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";
import FranchiseForm from "@/components/common/forms-new/forms/FranchiseForm";

const FormSection = () =>
{
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
            className="inline-block w-full "
        >
            <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex ">
                <div className=" 414px:mx-4 992px:w-[50%] 992px:mx-0 py-8 px-10  480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative bg-black">

                    <Typography
                        as="h3"
                        fontFamily="montserrat"
                        className="text-[32px]  text-white leading-[1.4em] text-center font-bold mb-[16px] 992px:text-left"
                    >
                        Register Your Interest
                    </Typography>

                    <Divider color="primary" className="w-[100px] mb-[24px]" alignment="left" />
                    <ul className="list-none text-center lg:text-left 480px:w-[90%] mx-auto 992px:w-full">
                        {contactInfo.map((info, index) => (
                            <li
                                key={index}
                                className="text-white leading-[3.5em] font-normal text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px] 480px:max-w-none"
                            >
                                {info.icon}
                                &nbsp;&nbsp;
                                <span className=" font-semibold">
                                    {info.isLink ? (
                                        <a
                                            href={info.link}
                                            className="text-primary hover:underline"
                                        >
                                            {info.text}
                                        </a>
                                    ) : (
                                        info.text
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>


                </div>
                <FranchiseForm />

            </div>
        </div>);
};

export default FormSection;