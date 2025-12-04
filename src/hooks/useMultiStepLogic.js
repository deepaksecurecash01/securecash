import { useState, useCallback, useMemo } from 'react';

export const useMultiStepLogic = ({
    multiStep,
    hybrid,
    defaultValues,
    isQuoteForm,
    sendProgressiveEmail,
    getAccumulatedData
}) =>
{
    const [currentStep, setCurrentStep] = useState(0);
    const [stepData, setStepData] = useState(defaultValues);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(hybrid?.submitEnabled ?? false);
    const [showReviewStep, setShowReviewStep] = useState(false);

    const isMultiStep = !!multiStep && multiStep.steps && multiStep.steps.length > 1;
    const isHybrid = !!hybrid && hybrid.enabled;

    const getCurrentStep = useCallback(() =>
    {
        if (!isMultiStep) {
            return { currentStep: 0, stepId: 'single', isFirst: true, isLast: true };
        }

        const stepId = multiStep.steps[currentStep];
        const isFirst = currentStep === 0;
        const isLast = currentStep === multiStep.steps.length - 1;
        const isReviewStep = isHybrid && stepId === 'review';
        const isSubmitStep = isHybrid && currentStep >= (hybrid.reviewStep || 3);

        return {
            currentStep,
            stepId,
            isFirst,
            isLast,
            isReviewStep,
            isSubmitStep,
            submitButtonEnabled,
        };
    }, [isMultiStep, currentStep, multiStep, isHybrid, submitButtonEnabled, hybrid]);

    const goToStep = useCallback((targetStep, getValues, reset, clearFocus) =>
    {
        if (!isMultiStep) return;

        const currentFormData = getValues();
        const updatedStepData = { ...stepData, ...currentFormData };
        setStepData(updatedStepData);
        setCurrentStep(targetStep);
        reset(updatedStepData);
        clearFocus();
    }, [isMultiStep, stepData]);

    const goBack = useCallback((getValues, reset, clearFocus) =>
    {
        if (currentStep > 0) {
            goToStep(currentStep - 1, getValues, reset, clearFocus);
        }
    }, [currentStep, goToStep]);

    const moveToNextStep = useCallback(async (stepDataUpdate = {}) =>
    {
        const updatedStepData = { ...stepData, ...stepDataUpdate };
        setStepData(updatedStepData);
        setCompletedSteps(prev => new Set([...prev, currentStep]));

        if (isQuoteForm && multiStep) {
            const { stepId } = getCurrentStep();
            const accumulatedData = getAccumulatedData(stepData, stepDataUpdate);
            await sendProgressiveEmail(accumulatedData, stepId);
        }

        if (!isMultiStep) return updatedStepData;

        if (isHybrid) {
            const reviewStep = hybrid.reviewStep || 3;
            if (currentStep === reviewStep - 1) {
                setCurrentStep(reviewStep);
                setSubmitButtonEnabled(true);
                return updatedStepData;
            }
        }

        const { stepId } = getCurrentStep();

        if (multiStep.conditional && stepId === 'quote') {
            const services = updatedStepData.Service || [];
            const nextSteps = getNextValidSteps(services);

            if (nextSteps.length === 0) {
                return updatedStepData;
            }

            const nextStepId = nextSteps[0];
            const nextStepIndex = multiStep.steps.findIndex(step => step === nextStepId);
            if (nextStepIndex !== -1) {
                setCurrentStep(nextStepIndex);
            }
        } else {
            const nextStep = currentStep + 1;
            if (nextStep < multiStep.steps.length) {
                setCurrentStep(nextStep);
            }
        }

        return updatedStepData;
    }, [stepData, currentStep, isMultiStep, isHybrid, hybrid, getCurrentStep, multiStep, isQuoteForm, sendProgressiveEmail, getAccumulatedData]);

    const isLastStep = useCallback((formDataOverride = null) =>
    {
        if (!isMultiStep) return true;

        if (isHybrid) {
            return currentStep === multiStep.steps.length - 1;
        }

        const { stepId } = getCurrentStep();
        const dataToCheck = formDataOverride || stepData;

        if (multiStep.conditional) {
            const services = dataToCheck.Service || [];

            if (stepId === 'quote') {
                return services.length === 0;
            }

            if (stepId === 'banking') {
                return !services.includes('Change');
            }

            if (stepId === 'change') {
                return true;
            }
        }

        return currentStep === multiStep.steps.length - 1;
    }, [isMultiStep, isHybrid, getCurrentStep, stepData, currentStep, multiStep]);

    const getNextValidSteps = useCallback((services) =>
    {
        if (!isMultiStep || !multiStep.conditional || !multiStep.getNextSteps) {
            return [];
        }
        return multiStep.getNextSteps({ Service: services });
    }, [isMultiStep, multiStep]);

    const getProgress = useMemo(() =>
    {
        if (!isMultiStep) return { current: 1, total: 1, percentage: 100 };

        if (isHybrid) {
            const reviewStep = hybrid.reviewStep || 3;
            const total = reviewStep + 1;
            const current = currentStep >= reviewStep ? total : currentStep + 1;

            return {
                current,
                total,
                percentage: Math.round((current / total) * 100),
                completed: completedSteps.size,
                isInSubmitSection: currentStep >= reviewStep
            };
        }

        return {
            current: currentStep + 1,
            total: multiStep.steps.length,
            percentage: Math.round(((currentStep + 1) / multiStep.steps.length) * 100),
            completed: completedSteps.size
        };
    }, [isMultiStep, currentStep, multiStep, completedSteps.size, isHybrid, hybrid]);

    const resetStepState = useCallback(() =>
    {
        setCurrentStep(0);
        setStepData(defaultValues);
        setCompletedSteps(new Set());
        if (isHybrid) {
            setSubmitButtonEnabled(hybrid?.submitEnabled ?? false);
            setShowReviewStep(false);
        }
    }, [defaultValues, isHybrid, hybrid]);

    return {
        currentStep,
        stepData,
        completedSteps,
        submitButtonEnabled,
        showReviewStep,
        isMultiStep,
        isHybrid,
        getCurrentStep,
        goToStep,
        goBack,
        moveToNextStep,
        isLastStep,
        getNextValidSteps,
        getProgress,
        resetStepState,
        setStepData
    };
};