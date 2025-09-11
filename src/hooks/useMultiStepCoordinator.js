// /hooks/useMultiStepCoordinator.js
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useFormManager } from './useFormManager';
import { useMultiStepForm } from './useMultiStepForm';

/**
 * Multi-Step Form Coordinator
 * 
 * Orchestrates between useFormManager (single-step form logic) and 
 * useMultiStepForm (step navigation) to create seamless multi-step forms
 * while preserving the clean foundation architecture.
 */
export const useMultiStepCoordinator = ({
    // Step configuration
    steps = [], // ['quote', 'banking', 'change']
    stepConfigs = {}, // { quote: { schema: QuoteSchema, defaultValues: {...} }, ... }

    // Form submission config
    formType,
    formId,
    onSuccess,
    onError,
    prepareData,

    // Multi-step specific
    conditionalSteps = false,
    initialStepData = {},
    onStepTransition = null, // Callback when moving between steps

    // Theme
    theme = 'dark'
}) =>
{
    // Step transition state
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Initialize multi-step form management
    const stepManager = useMultiStepForm({
        steps,
        schemas: Object.fromEntries(
            Object.entries(stepConfigs).map(([key, config]) => [key, config.schema])
        ),
        conditional: conditionalSteps,
        initialData: initialStepData
    });

    // Get current step configuration
    const getCurrentStepConfig = useCallback(() =>
    {
        const currentStepId = stepManager.getCurrentStepId();
        return stepConfigs[currentStepId] || {};
    }, [stepManager, stepConfigs]);

    // Memoize current step config to prevent unnecessary re-renders
    const currentStepConfig = useMemo(() =>
    {
        return getCurrentStepConfig();
    }, [getCurrentStepConfig]);

    // Initialize form manager for current step
    const formManager = useFormManager({
        schema: currentStepConfig.schema,
        defaultValues: {
            ...currentStepConfig.defaultValues,
            ...stepManager.stepData
        },
        formType: `${formType}_step_${stepManager.getCurrentStepId()}`,
        formId: `${formId}_${stepManager.getCurrentStepId()}`,
        theme,
        onSuccess: (result, finalData) =>
        {
            // Individual step success - don't call final success yet
            console.log(`Step ${stepManager.getCurrentStepId()} validation passed`);
        },
        onError: (error) =>
        {
            console.error(`Step ${stepManager.getCurrentStepId()} validation error:`, error);
        }
    });

    // Handle step form reset when step changes
    useEffect(() =>
    {
        if (stepManager.stepData) {
            // Reset form with new step data when step changes
            const newStepDefaults = {
                ...currentStepConfig.defaultValues,
                ...stepManager.stepData
            };
            formManager.reset(newStepDefaults);

            // Clear any existing focus state
            formManager.clearFocus();
        }
    }, [stepManager.currentStep, stepManager.stepData]);

    // Handle step submission with full validation
    const handleStepSubmit = useCallback(async (manualStepData = null) =>
    {
        try {
            setIsTransitioning(true);

            let stepFormData;
            let isValidationSuccessful = false;

            // Use manual data if provided, otherwise trigger form validation
            if (manualStepData) {
                stepFormData = manualStepData;
                isValidationSuccessful = true;
            } else {
                // Get current form values for validation
                stepFormData = formManager.getValues();

                // Manually trigger validation using React Hook Form's trigger method
                const validationResult = await formManager.formMethods.trigger();

                if (validationResult) {
                    isValidationSuccessful = true;
                } else {
                    // Handle validation errors
                    const errors = formManager.formMethods.formState.errors;
                    console.log('Step validation failed:', errors);

                    // Focus first error field
                    const firstErrorField = Object.keys(errors)[0];
                    if (firstErrorField) {
                        formManager.focusField(firstErrorField);
                    }

                    setIsTransitioning(false);
                    return false;
                }
            }

            if (!isValidationSuccessful) {
                setIsTransitioning(false);
                return false;
            }

            // Validate step data against step schema
            const stepValidation = stepManager.validateCurrentStep(stepFormData);
            if (!stepValidation.success) {
                console.error('Step schema validation failed:', stepValidation.error);
                setIsTransitioning(false);
                return false;
            }

            // Check if this is the final step
            if (stepManager.isLastStep) {
                // Final submission - combine all step data
                const finalData = { ...stepManager.stepData, ...stepFormData };

                // Apply data preparation if provided
                let preparedData = finalData;
                if (prepareData && typeof prepareData === 'function') {
                    preparedData = await prepareData(finalData);
                }

                // Perform final submission
                try {
                    // Use the form manager's submission logic directly
                    const result = await formManager.submissionMethods.handleSubmission(preparedData);

                    if (onSuccess) {
                        onSuccess(result, preparedData);
                    }

                    setIsTransitioning(false);
                    return { isFinalSubmission: true, success: true, data: preparedData };
                } catch (submissionError) {
                    console.error('Final submission failed:', submissionError);
                    if (onError) onError(submissionError);
                    setIsTransitioning(false);
                    return false;
                }
            }

            // Not final step - move to next step
            const updatedStepData = stepManager.nextStep(stepFormData);

            // Call step transition callback
            if (onStepTransition) {
                onStepTransition({
                    fromStep: stepManager.currentStep - 1,
                    toStep: stepManager.currentStep,
                    stepData: updatedStepData,
                    stepId: stepManager.getCurrentStepId()
                });
            }

            setIsTransitioning(false);
            return { isFinalSubmission: false, data: updatedStepData };

        } catch (error) {
            console.error('Step submission error:', error);
            setIsTransitioning(false);
            return false;
        }
    }, [formManager, stepManager, prepareData, onSuccess, onError, onStepTransition]);

    // Check if we can proceed to next step
    const canProceedToNext = useCallback(() =>
    {
        // No validation errors and not currently transitioning
        return Object.keys(formManager.errors).length === 0 && !isTransitioning;
    }, [formManager.errors, isTransitioning]);

    // Navigate to previous step
    const goToPreviousStep = useCallback(() =>
    {
        if (!stepManager.isFirstStep && !isTransitioning) {
            setIsTransitioning(true);
            stepManager.prevStep();

            // Transition will be handled by useEffect
            setTimeout(() => setIsTransitioning(false), 100);
        }
    }, [stepManager, isTransitioning]);

    // Navigate to specific step (useful for step indicators)
    const goToStep = useCallback((targetStep) =>
    {
        if (!isTransitioning && targetStep >= 0 && targetStep < steps.length) {
            setIsTransitioning(true);
            stepManager.goToStep(targetStep);

            setTimeout(() => setIsTransitioning(false), 100);
        }
    }, [stepManager, steps.length, isTransitioning]);

    // Get step progress information
    const getStepProgress = useCallback(() =>
    {
        const baseProgress = stepManager.getProgress();
        return {
            ...baseProgress,
            stepId: stepManager.getCurrentStepId(),
            isTransitioning,
            canGoBack: !stepManager.isFirstStep && !isTransitioning,
            canProceed: canProceedToNext()
        };
    }, [stepManager, isTransitioning, canProceedToNext]);

    // Reset entire multi-step form
    const resetAllSteps = useCallback(() =>
    {
        if (!isTransitioning) {
            stepManager.resetSteps();
            formManager.reset(initialStepData);
            formManager.clearFocus();
        }
    }, [stepManager, formManager, initialStepData, isTransitioning]);

    // Get field props for current step (integrates with foundation)
    const getFieldProps = useCallback((fieldConfig) =>
    {
        // Use form manager's getFieldProps but add step context
        const baseProps = formManager.getFieldProps(fieldConfig);

        return {
            ...baseProps,
            // Add step-specific context if needed
            stepId: stepManager.getCurrentStepId(),
            currentStep: stepManager.currentStep
        };
    }, [formManager, stepManager]);

    // Debug information
    const getDebugInfo = useCallback(() =>
    {
        const formDebug = formManager.getDebugInfo();
        const stepDebug = {
            currentStep: stepManager.currentStep,
            stepId: stepManager.getCurrentStepId(),
            totalSteps: steps.length,
            isTransitioning,
            stepData: stepManager.stepData,
            completedSteps: stepManager.completedSteps
        };

        return {
            form: formDebug,
            step: stepDebug,
            combined: {
                isReady: !isTransitioning && !formManager.isSubmitting,
                hasErrors: Object.keys(formManager.errors).length > 0,
                canProceed: canProceedToNext()
            }
        };
    }, [formManager, stepManager, steps.length, isTransitioning, canProceedToNext]);

    return {
        // Current step form management (delegate to useFormManager)
        ...formManager,

        // Override handleSubmit to use step logic
        handleSubmit: handleStepSubmit,

        // Multi-step specific properties
        currentStep: stepManager.currentStep,
        getCurrentStepId: stepManager.getCurrentStepId,
        isFirstStep: stepManager.isFirstStep,
        isLastStep: stepManager.isLastStep,
        stepData: stepManager.stepData,
        totalSteps: steps.length,

        // Step navigation
        handleStepSubmit,
        canProceedToNext,
        goToPreviousStep,
        goToStep,

        // Step state
        isTransitioning,
        completedSteps: stepManager.completedSteps,

        // Utilities
        getStepProgress,
        resetAllSteps,
        getFieldProps, // Enhanced with step context

        // Debug utilities
        getDebugInfo,

        // Direct access to underlying managers
        stepManager,
        formManager
    };
};