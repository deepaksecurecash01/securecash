import { useCallback } from 'react';

export const useProgressiveEmail = (isQuoteForm) =>
{
    const sendProgressiveEmail = useCallback(async (stepData, currentStepId) =>
    {
        if (!isQuoteForm) return;

        try {
            const response = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'quote',
                    ...stepData,
                    progressiveStep: currentStepId,
                    isProgressiveEmail: true
                }),
            });

            if (!response.ok) {
                console.warn(`Progressive email failed for step: ${currentStepId}`);
            }
        } catch (error) {
            console.error(`Progressive email error for step: ${currentStepId}`, error);
        }
    }, [isQuoteForm]);

    const getAccumulatedData = useCallback((stepData, currentFormData) =>
    {
        return { ...stepData, ...currentFormData };
    }, []);

    return {
        sendProgressiveEmail,
        getAccumulatedData
    };
};