import { useState } from 'react';
import { submitForm } from '@/utils/apiClient';
import { prepareFormMetadata } from '@/utils/formHelpers';

export const useFormSubmission = ({
    formType,
    formId,
    onSuccess,
    onError,
    prepareData,
    enableHoneypot = true,
    submitEndpoint = "/api/forms"
}) =>
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleSubmission = async (formData) =>
    {
        try {
            setSubmissionError(null);

            if (enableHoneypot && formData.BotField) {
                return;
            }

            setIsSubmitting(true);

            const metadata = await prepareFormMetadata(formType, formId);

            let finalData = {
                ...formData,
                ...metadata
            };

            if (prepareData && typeof prepareData === 'function') {
                finalData = await prepareData(finalData);
            }

            const result = await submitForm(finalData, submitEndpoint);

            setIsSubmitted(true);
            setIsSubmitting(false);

            if (onSuccess) {
                onSuccess(result, finalData);
            }

            return result;

        } catch (error) {
            console.error("Form submission error:", error);
            setIsSubmitting(false);
            setSubmissionError(error.message);

            if (onError) {
                onError(error, formData);
            }

            throw error;
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