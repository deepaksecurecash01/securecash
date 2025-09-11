"use client";
import React from 'react';
import { FaMoneyBillAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiskAssessmentSchema, RISK_ASSESSMENT_FIELDS } from '@/zod/SiteInfoFormSchema';
import { useFormManager } from '@/hooks/useFormManager';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import Typography from '@/components/common/Typography';
import Divider from '@/components/common/Divider';
import ScrollableSection from '@/components/layout/ScrollbarSection';

/**
 * SiteRiskFormNew - New Foundation Implementation
 * 
 * This component replaces the legacy SiteRiskForm with pixel-perfect styling
 * using the new form foundation architecture and legacy-hazard theme.
 * 
 * Features:
 * - Exact visual replication of legacy form
 * - New foundation architecture (Controller pattern)
 * - Complex focus management preservation
 * - Proper validation and error handling
 */
const SiteRiskFormNew = ({
    formData,
    onSubmit,
    enabled,
    isSubmitting = false,
    isSubmitted = false
}) =>
{
    // Create separate form manager for hazard form
     const hazardFormManager = useFormManager({
           schema: RiskAssessmentSchema,
           defaultValues: {
               Amount: formData?.Amount || "",
               Parking: formData?.Parking || [],
               Security: formData?.Security || [],
               External: formData?.External || [],
               Internal: formData?.Internal || []
           },
         formType: 'siteinfo',
         formId: 'SiteInfo',
           theme: 'legacy-hazard',
           onSuccess: async (result, finalData) =>
           {
               console.log('Hazard form submitted successfully!', finalData);
               // Call the parent's onSubmit handler
               if (onSubmit) {
                   return await onSubmit(finalData);
               }
               return result;
           },
           onError: (error) =>
           {
               console.error('Hazard form submission failed:', error);
           },
           prepareData: async (data) =>
           {
               // Merge with original form data
               return { ...formData, ...data };
           }
       });
   

    // Add icons to field configurations
    const fieldsWithIcons = RISK_ASSESSMENT_FIELDS.map(field => ({
        ...field,
        Icon: field.name === 'Amount' ? FaMoneyBillAlt : undefined
    }));

    return (
        <form
            className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-4 600px:px-8 480px:px-[5%] 1366px:h-full submit-status w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative 1366px:pt-[74px] 1366px:pb-[84px]"
            data-formid="SiteInfo"
            style={{ background: "#f1f1f1" }}
            onSubmit={hazardFormManager.handleSubmit}
            noValidate
        >
            <div className="form-tab 480px:w-[90%] mx-auto">
                <Typography
                    as="h3"
                    fontFamily="montserrat"
                    className="text-[22px] font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
                >
                    Site Risk Information
                </Typography>

                <Divider
                    color="primary"
                    alignment="left"
                    margin="my-5"
                    responsiveClassName="768px:text-left 768px:mx-0"
                />

                <Typography
                    as="p"
                    fontFamily="montserrat"
                    className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                >
                    Please provide us with the information below so our Area Managers
                    and Banking Couriers can better identify any potential hazards or
                    dangers at this location.
                </Typography>

                <ScrollableSection className="h-auto 992px:w-full p-0 mx-auto 992px:h-[480px] 600px:pr-10">
                    {fieldsWithIcons.map(field => (
                        <UniversalFormField
                            key={field.name}
                            {...hazardFormManager.getFieldProps(field)}
                            theme="legacy-hazard"
                        />
                    ))}

                    {enabled && (
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
            </div>
        </form>
    );
};

export default SiteRiskFormNew;