"use client";
import React from 'react';
import { FaMoneyBillAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { RISK_ASSESSMENT_FIELDS } from '@/zod/SiteInfoFormSchema';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import ScrollableSection from '@/components/layout/ScrollbarSection';

const addIconToFields = (fields) =>
    fields.map(field => ({
        ...field,
        Icon: field.name === 'Amount' ? FaMoneyBillAlt : undefined
    }));

const SiteRiskFormFields = ({ formManager }) =>
{
    const { submitButtonEnabled, isSubmitting, isSubmitted } = formManager;
    const fieldsWithIcons = addIconToFields(RISK_ASSESSMENT_FIELDS);

    return (
        <ScrollableSection className="h-auto 992px:w-full p-0 mx-auto 992px:h-[480px] 600px:pr-10">
            {fieldsWithIcons.map(field => (
                <UniversalFormField
                    key={field.name}
                    {...formManager.getFieldProps(field)}
                    theme="legacy-hazard"
                />
            ))}

            {submitButtonEnabled && (
                <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`nextBtn ${isSubmitted
                                    ? 'bg-[#4bb543]'
                                    : 'bg-[#c6a54b] hover:opacity-80 cursor-pointer'
                                } text-white border-none py-[15px] 768px:px-0 text-[16px] w-full rounded-[40px] outline-none appearance-none p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting, please wait...
                                </div>
                            ) : isSubmitted ? (
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