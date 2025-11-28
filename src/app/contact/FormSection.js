"use client";
import React from "react";
import Link from "next/link";
import ContactForm from "@/components/common/forms-new/forms/ContactForm";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";

const contactInfo = [
    {
        icon: FaPhoneAlt,
        text: "1300 SECURE / 1300732873",
        link: "tel:1300732873",
        isLink: true,
    },
    {
        icon: FaMapMarkerAlt,
        text: "Anywhere, Anytime, Australia Wide",
    },
    {
        icon: FaEnvelope,
        text: "franchise@securecash.com.au",
        link: "mailto:franchise@securecash.com.au",
        isLink: true,
    },
    {
        icon: FaStar,
        text: "Proudly Serving Customers Australia Wide 24/7",
    },
];

const FormSection = () =>
{
    return (
        <div
            id="contact-form-section"
            className="inline-block w-full mt-12 480px:mt-[120px]"
        >
            <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex">
                <div className="414px:mx-4 992px:w-[50%] 992px:mx-0 py-8 px-10 480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative bg-black">
                    <h3 className="text-[32px] text-white leading-[1.4em] text-center font-bold mb-[16px] 992px:text-left font-montserrat">
                        Contact Information
                    </h3>

                    <hr className="w-[100px] mb-[24px] h-[4px] rounded-[5px] border-0 mx-auto 992px:ml-0 922px:mr-auto bg-primary" />

                    <ul className="list-none text-center lg:text-left 480px:w-[90%] mx-auto 992px:w-full">
                        {contactInfo.map((info, index) =>
                        {
                            const IconComponent = info.icon;
                            return (
                                <li
                                    key={index}
                                    className="text-white leading-[3.5em] font-normal text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px] 480px:max-w-none"
                                >
                                    <IconComponent className="pr-2.5 text-[26px] relative inline" />
                                    &nbsp;&nbsp;
                                    <span className="font-semibold">
                                        {info.isLink ? (
                                            <Link
                                                href={info.link}
                                                className="text-primary hover:underline"
                                            >
                                                {info.text}
                                            </Link>
                                        ) : (
                                            info.text
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <ContactForm />
            </div>
        </div>
    );
};

export default FormSection;