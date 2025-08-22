// /hooks/useFormErrors.js
import { useState } from 'react';
import { focusInput } from '@/utils/formHelpers';

export const useFormErrors = (fieldRefs) =>
{
    const [currentErrorField, setCurrentErrorField] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);
    // Handle field validation errors and focus management
    const handleFieldErrors = (validationErrors) =>
    {
        if (validationErrors && Object.keys(validationErrors).length > 0) {
            const errorField = Object.keys(validationErrors)[0];
            setCurrentErrorField(errorField);

            // Focus the field if ref is available
            const refToFocus = fieldRefs[errorField];
            if (refToFocus) {
                focusInput(refToFocus);
            }
            return false; // Validation failed
        } else {
            setCurrentErrorField(null);
            return true; // Validation passed
        }
    };

    // Handle API/network submission errors
    const handleSubmissionError = (error) =>
    {
        const errorMessage = error?.message || error || 'An error occurred during submission';
        setSubmissionError(errorMessage);
    };

    // Clear submission errors (useful for retry scenarios)
    const clearSubmissionError = () => setSubmissionError(null);

    // Clear all errors
    const clearAllErrors = () =>
    {
        setCurrentErrorField(null);
        setSubmissionError(null);
    };

    return {
        // Field error state
        currentErrorField,
        setCurrentErrorField,
        handleFieldErrors,

        // Submission error state  
        submissionError,
        handleSubmissionError,
        clearSubmissionError,

        // Utilities
        clearAllErrors
    };
};