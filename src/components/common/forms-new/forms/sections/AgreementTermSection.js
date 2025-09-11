// /components/forms/ICA/sections/AgreementTermSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
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

const AgreementTermSection = ({ formManager, agreementTermData }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaCalendarAlt}>Agreement Term</SectionTitle>

        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                This agreement will commence on the?
            </label>
            <UniversalFormField
                name="DateCommencement"
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

        <p className="text-gray-700">
            And will be ongoing unless either party terminates this Agreement in
            accordance with the termination provisions herein (&quot;Expiry&quot;).
        </p>

        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">The Agreement</h4>
            <IcaContractorClauses data={agreementTermData} />

            <div className="relative">
                <UniversalFormField
                    name="AcceptAgreement"
                    control={formManager.control}
                    type="checkbox-group"
                    theme="ica"
                    variant='agreement'
                    options={[
                        { value: "accepted", label: "I understand and accept the terms of this agreement." }
                    ]}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>
    </div>
);

export default AgreementTermSection;