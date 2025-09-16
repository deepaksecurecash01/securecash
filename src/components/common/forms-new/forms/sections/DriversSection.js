// /components/forms/ICA/sections/DriversSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaUsers, FaCircle, FaIdCard, FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
    const Divider = ({
        color = "primary",
        width = "100px",
        alignment = "center",
        margin = "my-6",
        responsiveClassName = "",
        customStyle = {},
    }) =>
    {
        const resolvedWidth = typeof width === "number" ? `${width}px` : width;

        const style = {
            width: resolvedWidth,
            height: "4px",
            borderRadius: "5px",
            ...customStyle,
        };

        if (alignment === "left") {
            style.marginLeft = 0;
            style.marginRight = "auto";
        } else if (alignment === "right") {
            style.marginLeft = "auto";
            style.marginRight = 0;
        } else {
            style.marginLeft = "auto";
            style.marginRight = "auto";
        }

        let colorClass = "";
        if (typeof color === "string" && color.startsWith("#")) {
            style.backgroundColor = color;
        } else if (color) {
            colorClass = `bg-${color}`;
        }

        return (
            <hr
                className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
                style={style}
            />
        );
    };

    return (
        <div className="mb-2">
            <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
                {Icon && <Icon className="text-[24px] text-primary" />}
                <h3 className="text-[26px] font-semibold text-gray-800">
                    {children}
                </h3>
            </div>
            <Divider
                color="primary"
                alignment={position === 'left' ? 'left' : 'center'}
                margin="mt-[20px]"
                responsiveClassName="m-0 text-left"
            />
        </div>
    );
};

const DriversSection = ({ formManager }) =>
{
    return (
        <div className="space-y-6">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 gap-4 flex flex-col justify-center mr-2">
                        <SectionTitle position="left" Icon={FaUsers}>
                            Let&apos;s get set up for contracting using eDockets!
                        </SectionTitle>

                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <p className="text-gray-700">
                                To complete the submission of this Independent Contractors Agreement, if you have not done so already, you will need to access the eDockets Contractor Portal where you will be required to <strong>&quot;Register as a Contractor&quot;</strong> and set yourself up as a Contractor in the eDockets system.
                            </p>

                            <p className="text-gray-700">
                                This access <strong className='font-semibold'>does not cost you anything</strong> and will provide you with:
                            </p>

                            <ul className="text-sm text-gray-600 space-y-4 list-inside ml-6">
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        One App login for your Staff (Operators) to service all eDockets Licensees
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Transparency for the locations you service for eDockets Licensees in a view only format
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Access to view all services your Operators perform through the eDockets App
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Ability to manage your Contractor (Assignee), including your company details, customise your email notifications and upload your Licenses and Insurances
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Create and manage your own Operators to provide access to the eDockets App
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Create and manage Run Lists based off Locations you service for eDockets Licensees, including additional bookings that come through, assigning these to your Operators for servicing in the app
                                    </p>
                                </li>
                                <li className="relative">
                                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                                    <p className="pl-4">
                                        Streamline your invoicing by exporting the billing data directly from the Contractor Portal based off the services performed through the app
                                    </p>
                                </li>
                            </ul>

                            <Link
                                href={'https://contractor.edockets.app/'}
                                target='_blank'
                                className="nextBtn bg-primary text-white my-2 border-none py-[18px] px-[20px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base shadow-none font-montserrat flex justify-center items-center gap-2 mx-auto 768px:mx-0 w-[200px]"
                            >
                                Register Now
                                <FaArrowRightLong className="text-[14px]" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <Image
                            src="/images/eDockets-Contractor-Register.webp"
                            width={450}
                            height={450}
                            className="1024px:h-[450px]"
                            alt="Sample passport photo guidelines"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className='text-gray-700 font-semibold'>
                        Once Registered - At the top of the &quot;Assignee&quot; tab you will see &quot;Your code to provide to an eDockets Licensee&quot;, copy this code and paste it into the field below so we can get everything ready for you to start servicing the SecureCash clients!
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg space-y-4">
                    <div className="w-3/5 mx-auto">
                        <div className="relative grid grid-cols-5 items-center">
                            <label className="text-primary-text text-[16px] font-semibold px-1 768px:px-0 col-span-2">
                                eDockets Contractor Code
                            </label>
                            <div className="col-span-3">
                                <UniversalFormField
                                    name="eDocketsContractorCode"
                                    control={formManager.control}
                                    type="text"
                                    theme="ica"
                                    placeholder="eDockets Contractor Code"
                                    Icon={FaIdCard}
                                    currentFocusField={formManager.currentFocusField}
                                    onFieldFocus={formManager.handleFieldFocus}
                                    onFieldBlur={formManager.handleFieldBlur}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriversSection;