"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiskAssessmentSchema } from '@/zod/SiteInfoFormSchema';
import SiteRiskForm from '../SiteRiskForm';

const HazardFormWrapper = ({
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    submissionError,
    onSubmit,
    submitButtonEnabled
}) =>
{
    // Track if Amount field has been focused from step transition
    const hasInitialFocus = useRef(false);
    const [currentErrorField, setCurrentErrorField] = useState(null);

    // CRITICAL: Track previous submitButtonEnabled state to detect transitions
    const prevSubmitButtonEnabled = useRef(submitButtonEnabled);

    // Create form instance
    const hazardForm = useForm({
        resolver: zodResolver(RiskAssessmentSchema),
        defaultValues: {
            Amount: formData.Amount || "",
            Parking: formData.Parking || [],
            Security: formData.Security || [],
            External: formData.External || [],
            Internal: formData.Internal || []
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = hazardForm;

    // FIXED: Focus management that only triggers on successful step 3 completion
    useEffect(() =>
    {
        // Check if submitButtonEnabled just changed from false to true
        const wasDisabled = prevSubmitButtonEnabled.current === false;
        const isNowEnabled = submitButtonEnabled === true;
        const shouldTriggerFocus = wasDisabled && isNowEnabled && !hasInitialFocus.current;

        console.log('HazardFormWrapper focus check:', {
            wasDisabled,
            isNowEnabled,
            hasInitialFocus: hasInitialFocus.current,
            shouldTriggerFocus
        });

        if (shouldTriggerFocus) {
            console.log('Step 3 completed successfully - focusing Amount field');

            setTimeout(() =>
            {
                const amountField = document.querySelector('[name="Amount"]');
                if (amountField) {
                    amountField.focus();
                    amountField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    hasInitialFocus.current = true;
                }
            }, 150);
        }

        // Update previous state for next comparison
        prevSubmitButtonEnabled.current = submitButtonEnabled;
    }, [submitButtonEnabled]);

    // Handle successful form submission
    const handleFormSubmit = async (data) =>
    {
        console.log('Hazard form validation passed:', data);
        setCurrentErrorField(null);
        const finalData = { ...formData, ...data };
        return await onSubmit(finalData);
    };

    // Handle validation errors with proper focus on actual invalid fields
    const handleValidationError = useCallback((validationErrors) =>
    {
        console.log('Hazard form validation failed:', validationErrors);

        const errorFields = Object.keys(validationErrors);
        if (errorFields.length > 0) {
            const firstErrorField = errorFields[0];
            setCurrentErrorField(firstErrorField);

            // Focus the first invalid field (not always Amount)
            setTimeout(() =>
            {
                // Find the error element using multiple strategies
                let errorElement =
                    document.querySelector(`[name="${firstErrorField}"]`) ||
                    document.querySelector(`input[name="${firstErrorField}"]`) ||
                    document.querySelector(`select[name="${firstErrorField}"]`) ||
                    document.querySelector(`input[value*="${firstErrorField}"]`);

                if (errorElement) {
                    console.log('Focusing first invalid field:', firstErrorField);
                    errorElement.focus();
                    errorElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        }
    }, []);

    return (
        <SiteRiskForm
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            handleSubmit={(onValid) => handleSubmit(onValid, handleValidationError)}
            handleFormSubmit={handleFormSubmit}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            isFormSubmitted={isSubmitted}
            setIsFormSubmitted={() => { }}
            submissionStatus={isSubmitted ? 'success' : submissionError ? 'error' : null}
            setSubmissionStatus={() => { }}
            isSubmitting={isSubmitting}
            handleStepNavigation={() => { }}
            schemaStep={3}
            submitButton={submitButtonEnabled}
            formData={formData}
            setFormData={setFormData}
        />
    );
};

export default HazardFormWrapper;