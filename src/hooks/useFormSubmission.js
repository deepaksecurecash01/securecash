// /hooks/useFormSubmission.js
import { useState } from 'react';
import { submitForm } from '@/utils/apiClient';
import { prepareFormMetadata } from '@/utils/formHelpers';

export const useFormSubmission = ({
    formType,
    formId,
    onSuccess,
    onError,
    prepareData, // Optional data transformation function
    enableHoneypot = true,
    submitEndpoint = "/api/forms" // Allow custom endpoints
}) =>
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleSubmission = async (formData) =>
    {
        try {
            // Reset previous states
            setSubmissionError(null);

            // Check honeypot field if enabled
            if (enableHoneypot && formData.BotField) {
                console.log("Bot detected, ignoring submission");
                return;
            }

            setIsSubmitting(true);

            // Prepare metadata
            const metadata = await prepareFormMetadata(formType, formId);

            // Prepare final data
            let finalData = {
                ...formData,
                ...metadata
            };

            // Apply custom data preparation if provided
            if (prepareData && typeof prepareData === 'function') {
                finalData = await prepareData(finalData);
            }

            console.log(`${formType} form submission:`, finalData);

            // Submit to API
            const result = await submitForm(finalData, submitEndpoint);
            console.log("API Response:", result);

            setIsSubmitted(true);
            setIsSubmitting(false);

            // Call success handler
            if (onSuccess) {
                onSuccess(result, finalData);
            }

            return result;

        } catch (error) {
            console.error("Form submission error:", error);
            setIsSubmitting(false);
            setSubmissionError(error.message);

            // Call error handler
            if (onError) {
                onError(error, formData);
            }

            throw error; // Re-throw so caller can handle if needed
        }
    };

    const resetSubmission = () =>
    {
        setIsSubmitting(false);
        setIsSubmitted(false);
        setSubmissionError(null);
    };

    return {
        isSubmitting,
        isSubmitted,
        submissionError,
        handleSubmission,
        resetSubmission
    };
};