// /components/forms/ICA/sections/ExecutedAsDeedSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaMapMarkerAlt, FaUser, FaFileContract, FaBuilding } from "react-icons/fa";
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

const ExecutedAsDeedSection = ({ formManager }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaFileContract}>Executed As A Deed</SectionTitle>

        <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
            <p className="text-sm text-gray-700 mb-4 font-medium">
                SIGNED, SEALED and DELIVERED by:
            </p>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please enter your business/company name:
                </label>
                <UniversalFormField
                    name="BusinessName"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Business or Company Name"
                    Icon={FaBuilding}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <p className="text-xs text-gray-600 mt-4">
                In accordance with its Constitution (if any) as a deed pursuant to
                section 127 of the Corporations Act.
            </p>
        </div>

        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">Witness:</h4>
            <p className="text-sm text-gray-600">
                Please provide the details to a person over the age of 18 that can
                witness you completing the required information and authorising this
                Deed of Guarantee:
            </p>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Full name of the witness:
                </label>
                <UniversalFormField
                    name="WitnessName"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Witness's Name"
                    Icon={FaUser}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please enter the residential address of the witness:
                </label>
                <UniversalFormField
                    name="WitnessAddress"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Witness's Address"
                    Icon={FaMapMarkerAlt}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please upload any government ID unique to the witness (e.g. driver&apos;s license):
                </label>
                <UniversalFormField
                    name="WitnessID"
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
);

export default ExecutedAsDeedSection;