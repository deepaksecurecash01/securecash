"use client";
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { FaMoneyBillAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { useFormManager } from '@/hooks/useFormManager';
import { RiskAssessmentSchema, RISK_ASSESSMENT_FIELDS } from '@/zod/SiteInfoFormSchema';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import Divider from '@/components/common/Divider';
import ScrollableSection from '@/components/layout/ScrollbarSection';

const ConvertedHazardForm = forwardRef(({
    formData,
    enabled,
    isSubmitting,
    isSubmitted,
    onSubmit
}, ref) =>
{
    // DEBUG: Log the data being passed in
    console.log('ConvertedHazardForm received formData:', formData);
    console.log('ConvertedHazardForm enabled status:', enabled);

    // Track focus state to match original behavior
    const hasInitialFocus = useRef(false);
    const prevEnabled = useRef(enabled);

    // Ref for the Amount field
    const amountFieldRef = useRef(null);

    // Create form manager for hazard form
    const hazardFormManager = useFormManager({
        schema: RiskAssessmentSchema,
        defaultValues: {
            Amount: formData?.Amount || "",
            Parking: formData?.Parking || [],
            Security: formData?.Security || [],
            External: formData?.External || [],
            Internal: formData?.Internal || []
        },
        formType: 'hazard',
        formId: 'HazardForm',
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

    // Expose focus method via ref
    useImperativeHandle(ref, () => ({
        focusAmount: () =>
        {
            console.log('focusAmount called via ref');
            if (amountFieldRef.current) {
                try {
                    amountFieldRef.current.focus();
                    amountFieldRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    console.log('Successfully focused Amount field via ref');
                    return true;
                } catch (error) {
                    console.error('Error focusing Amount field:', error);
                    return false;
                }
            } else {
                console.log('Amount field ref not available');
                return false;
            }
        }
    }), []);

    // Add icons to field configurations
    const fieldsWithIcons = RISK_ASSESSMENT_FIELDS.map(field => ({
        ...field,
        Icon: field.name === 'Amount' ? FaMoneyBillAlt : undefined
    }));

    // Focus management - matches original behavior (keeping as backup)
    useEffect(() =>
    {
        const wasDisabled = prevEnabled.current === false;
        const isNowEnabled = enabled === true;
        const shouldTriggerFocus = wasDisabled && isNowEnabled && !hasInitialFocus.current;

        console.log('ConvertedHazardForm focus check:', {
            wasDisabled,
            isNowEnabled,
            hasInitialFocus: hasInitialFocus.current,
            shouldTriggerFocus
        });

        if (shouldTriggerFocus) {
            console.log('Step 3 completed successfully - focusing Amount field (backup method)');

            setTimeout(() =>
            {
                if (amountFieldRef.current) {
                    amountFieldRef.current.focus();
                    amountFieldRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    hasInitialFocus.current = true;
                } else {
                    // Fallback to DOM selector
                    const amountField = document.querySelector('[name="Amount"]');
                    if (amountField) {
                        amountField.focus();
                        amountField.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                        hasInitialFocus.current = true;
                    }
                }
            }, 150);
        }

        prevEnabled.current = enabled;
    }, [enabled]);

    // Handle form submission
    const handleFormSubmit = async (data) =>
    {
        console.log('Hazard form validation passed:', data);

        // Get the latest complete form data from parent
        const completeFormData = formData || {};
        const finalData = { ...completeFormData, ...data };
        console.log('Final submission data (complete):', finalData);

        // Call the parent's onSubmit handler
        if (onSubmit) {
            return await onSubmit(finalData);
        }
    };

    return (
        <form
            className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-4 600px:px-8 480px:px-[5%] 1366px:h-full submit-status w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative 1366px:pt-[74px] 1366px:pb-[84px]"
            data-formid="SiteInfo"
            style={{ background: "#f1f1f1" }}
            onSubmit={hazardFormManager.handleSubmit}
            noValidate
        >
            <div className="form-tab 480px:w-[90%] mx-auto">
                <h3
                   
                    className="text-[22px] font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0 font-montserrat"
                >
                    Site Risk Information
                </h3>

                <Divider
                    color="primary"
                    alignment="left"
                    className="w-[100px] my-5 768px:text-left 768px:mx-0"
                />

                <p
                  
                    className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
                >
                    Please provide us with the information below so our Area Managers
                    and Banking Couriers can better identify any potential hazards or
                    dangers at this location.
                </p>

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
                                    disabled={isSubmitting || hazardFormManager.isSubmitting}
                                    className={`nextBtn ${isSubmitted || hazardFormManager.isSubmitted
                                        ? 'bg-[#4bb543]'
                                        : 'bg-[#c6a54b] hover:opacity-80 cursor-pointer'
                                        } text-white border-none py-[15px] 768px:px-0 text-[16px] w-full rounded-[40px] outline-none appearance-none p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {(isSubmitting || hazardFormManager.isSubmitting) ? (
                                        <div className="flex items-center justify-center">
                                            <FaSpinner className="animate-spin mr-2" />
                                            Submitting, please wait...
                                        </div>
                                    ) : (isSubmitted || hazardFormManager.isSubmitted) ? (
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
});

// Add display name for debugging
ConvertedHazardForm.displayName = 'ConvertedHazardForm';

export default ConvertedHazardForm;