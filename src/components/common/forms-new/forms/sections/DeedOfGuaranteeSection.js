// /components/forms/ICA/sections/DeedOfGuaranteeSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaUser, FaMapMarkerAlt, FaCircle, FaFileSignature } from "react-icons/fa";
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import IcaContractorClauses from '../IcaAgreementClauses';

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

const DeedOfGuaranteeSection = ({ formManager, deedOfGuaranteeData, COMPANY_INFO }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaFileSignature}>Deed of Guarantee</SectionTitle>

        <p className="text-gray-700">
            THIS DEED is made on the day at item 1 of the Schedule
        </p>

        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Recitals:</h4>

            <ul className="text-base text-gray-600 space-y-4 list-inside bg-[rgb(242,242,242,0.9)] p-4 rounded-lg">
                <li className="relative">
                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
                    <p className="pl-4">
                        The Beneficiary at item 2 of the Schedule has agreed to engage the
                        Contractor at item 3 of the Schedule as in the capacity of independent
                        contractor.
                    </p>
                </li>
                <li className="relative">
                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
                    <p className="pl-4">
                        The Guarantor at item 4 of the Schedule agrees to guarantee the
                        performances by the Contractor of its duties as independent contractor
                        in the terms of an agreement in writing on the Beneficiaries website
                        at item 5 of the Schedule (the &apos;Duties&apos; and &apos;Duty&apos; in the case of any
                        individual duty within the Duties, as the context requires)
                    </p>
                </li>
                <li className="relative">
                    <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
                    <p className="pl-4">
                        In consideration of the Guarantor entering into this deed with the
                        Beneficiary, the Beneficiary agrees to engage and or continue to
                        engage the Contractor as independent contractor.
                    </p>
                </li>
            </ul>
        </div>

        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">Clauses:</h4>
            <IcaContractorClauses data={deedOfGuaranteeData} />

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Date of Deed
                </label>
                <UniversalFormField
                    name="DateDeed"
                    control={formManager.control}
                    type="date"
                    theme="ica"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                    format="dd/MM/yyyy"
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Beneficiary:</h4>
                <div className="bg-[rgb(242,242,242,0.9)] p-4 rounded-lg">
                    <p className="text-gray-700">
                        {COMPANY_INFO.name.toUpperCase()} of <br />
                        {COMPANY_INFO.address}
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-800">Guarantors:</h4>

                <div className="relative">
                    <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                        What is your full name?
                    </label>
                    <UniversalFormField
                        name="NameConfirm"
                        control={formManager.control}
                        type="text"
                        theme="ica"
                        placeholder="Your Full Name"
                        Icon={FaUser}
                        currentFocusField={formManager.currentFocusField}
                        onFieldFocus={formManager.handleFieldFocus}
                        onFieldBlur={formManager.handleFieldBlur}
                    />
                </div>

                <div className="relative">
                    <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                        Please enter your residential address here:
                    </label>
                    <UniversalFormField
                        name="AddressResidential"
                        control={formManager.control}
                        type="text"
                        theme="ica"
                        placeholder="Your Physical Address"
                        Icon={FaMapMarkerAlt}
                        currentFocusField={formManager.currentFocusField}
                        onFieldFocus={formManager.handleFieldFocus}
                        onFieldBlur={formManager.handleFieldBlur}
                    />
                </div>

                <div className="relative">
                    <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                        Please upload any government photo ID unique to yourself, i.e. drivers license.
                    </label>
                    <UniversalFormField
                        name="GovernmentID"
                        control={formManager.control}
                        type="file"
                        theme="ica"
                        accept="image/*"
                        currentFocusField={formManager.currentFocusField}
                        onFieldFocus={formManager.handleFieldFocus}
                        onFieldBlur={formManager.handleFieldBlur}
                        fileUploadState={formManager.fileUpload}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default DeedOfGuaranteeSection;