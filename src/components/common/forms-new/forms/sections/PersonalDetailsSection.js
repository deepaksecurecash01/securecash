// /components/forms/ICA/sections/PersonalDetailsSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import
    {
        FaUser,
        FaPhone,
        FaEnvelope,
        FaInfoCircle,
        FaBuilding,
        FaMapMarkerAlt,
        FaIdCard
    } from "react-icons/fa";
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

const ORGANIZATION_OPTIONS = [
    { value: "", label: "Please Select" },
    { value: "Individual (Sole Trader)", label: "Individual (Sole Trader)" },
    { value: "Trustees & Beneficiaries", label: "Trustees & Beneficiaries" },
    { value: "Domestic Pty Ltd or Ltd Company", label: "Domestic Pty Ltd or Ltd Company" },
    { value: "Registered Foreign Company", label: "Registered Foreign Company" },
    { value: "Foreign Company Not Registered in Australia", label: "Foreign Company Not Registered in Australia" },
    { value: "Partners & Partnerships", label: "Partners & Partnerships" },
    { value: "Associations", label: "Associations" },
    { value: "Registered Co-Operatives", label: "Registered Co-Operatives" },
    { value: "Government Body", label: "Government Body" },
    { value: "School or Education Institute", label: "School or Education Institute" },
    { value: "Church or Religious Organisation", label: "Church or Religious Organisation" },
];

const PersonalDetailsSection = ({ formManager }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaUser}>Personal Details</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your full name?
                </label>
                <UniversalFormField
                    name="Name"
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
                    What is the organisation structure type?
                </label>
                <UniversalFormField
                    name="OrganisationType"
                    control={formManager.control}
                    type="select"
                    theme="ica"
                    options={ORGANIZATION_OPTIONS}
                    Icon={FaBuilding}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 768px:grid-cols-2 1024px:grid-cols-3 gap-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your ABN number?
                </label>
                <UniversalFormField
                    name="ABN"
                    control={formManager.control}
                    type="abn"
                    theme="ica"
                    placeholder="Your ABN Number"
                    Icon={FaIdCard}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your best contact number?
                </label>
                <UniversalFormField
                    name="Phone"
                    control={formManager.control}
                    type="tel"
                    theme="ica"
                    placeholder="Your Phone Number"
                    Icon={FaPhone}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your email address?
                </label>
                <UniversalFormField
                    name="Email"
                    control={formManager.control}
                    type="email"
                    theme="ica"
                    placeholder="Your Email Address"
                    Icon={FaEnvelope}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>

        <div className="bg-dark-border/90 p-4 rounded-lg">
            <p className="text-sm text-white">
                <FaInfoCircle className="inline mr-2" />
                A copy of this agreement will be sent to the address provided.
            </p>
        </div>

        <div className="space-y-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your physical address?
                </label>
                <UniversalFormField
                    name="Address"
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
                    What is your postal address?
                </label>
                <UniversalFormField
                    name="AddressPostal"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Postal Address"
                    Icon={FaMapMarkerAlt}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>
    </div>
);

export default PersonalDetailsSection;