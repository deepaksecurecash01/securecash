"use client";
import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { RISK_ASSESSMENT_FIELDS } from '@/zod/SiteInfoFormSchema';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import ScrollableSection from '@/components/layout/ScrollbarSection';
import { FaChevronLeft, FaSpinner, FaCheckCircle } from "react-icons/fa";


const SiteRiskFormFields = ({ formManager }) =>
{
    // Add icons to field configurations
    const fieldsWithIcons = RISK_ASSESSMENT_FIELDS.map(field => ({
        ...field,
        Icon: field.name === 'Amount' ? FaMoneyBillAlt : undefined
    }));

    const { submitButtonEnabled } = formManager;


    return (
        <ScrollableSection className="h-auto 992px:w-full p-0 mx-auto 992px:h-[480px] 600px:pr-10">
            {fieldsWithIcons.map(field => (
                <UniversalFormField
                    key={field.name}
                    {...formManager.getFieldProps(field)}
                    theme="legacy-hazard"
                />
            ))}
            {/* Submit Button */}
            {submitButtonEnabled && (
                <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
                    <div className="button-section relative">
                        <button type="submit" disabled={formManager.isSubmitting}
                            className={`nextBtn ${formManager.isSubmitted
                                ? 'bg-[#4bb543]'
                                : 'bg-[#c6a54b] hover:opacity-80 cursor-pointer'
                                } text-white border-none py-[15px] 768px:px-0 text-[16px] w-full rounded-[40px] outline-none appearance-none p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {formManager.isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting, please wait...
                                </div>
                            ) : formManager.isSubmitted ? (
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="text-white mr-2" />
                                    Thank you, we received your submission!
                                </div>
                            ) : (
                                "Submit this location"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </ScrollableSection>
    );
};


export default SiteRiskFormFields;

