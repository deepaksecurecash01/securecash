// /hooks/useMultiFormCoordinator.js
import { useState, useCallback, useMemo } from 'react';

export const useMultiFormCoordinator = ({
    formConfig,
    initialData = {},
    onFormTransition,
    onFinalSubmission
}) =>
{
    // Core state management
    const [activeFormId, setActiveFormId] = useState(null);
    const [activeStepId, setActiveStepId] = useState(null);
    const [combinedFormData, setCombinedFormData] = useState(initialData);
    const [completedSteps, setCompletedSteps] = useState(new Set());

    // Initialize if not already set
    const initializeIfNeeded = useCallback(() =>
    {
        if (!activeFormId && formConfig.flow.length > 0) {
            const firstStep = formConfig.flow[0];
            const [formId, stepId] = firstStep.includes('.') ? firstStep.split('.') : [firstStep, null];
            setActiveFormId(formId);
            setActiveStepId(stepId);
        }
    }, [activeFormId, formConfig.flow]);

    // Always ensure initialization
    if (!activeFormId && formConfig.flow.length > 0) {
        const firstStep = formConfig.flow[0];
        const [formId, stepId] = firstStep.includes('.') ? firstStep.split('.') : [firstStep, null];
        setActiveFormId(formId);
        setActiveStepId(stepId);
    }

    // Get current position in flow
    const getCurrentFlowPosition = useMemo(() =>
    {
        if (!activeFormId) return 0;

        const currentFlowStep = activeStepId
            ? `${activeFormId}.${activeStepId}`
            : activeFormId;

        return formConfig.flow.findIndex(step => step === currentFlowStep);
    }, [activeFormId, activeStepId, formConfig.flow]);

    // Get current form configuration
    const getCurrentFormConfig = useMemo(() =>
    {
        if (!activeFormId) return null;
        return formConfig.forms[activeFormId];
    }, [activeFormId, formConfig.forms]);

    // Get current schema
    const getCurrentSchema = useCallback(() =>
    {
        const currentFormConfig = getCurrentFormConfig;
        if (!currentFormConfig) return null;

        if (currentFormConfig.type === 'multi-step' && activeStepId) {
            return currentFormConfig.schemas[activeStepId];
        } else if (currentFormConfig.type === 'simple') {
            return currentFormConfig.schema;
        }

        return null;
    }, [getCurrentFormConfig, activeStepId]);

    // Get progress information
    const getProgress = useMemo(() =>
    {
        const currentPosition = getCurrentFlowPosition + 1;
        const totalSteps = formConfig.flow.length;

        return {
            currentPosition,
            totalSteps,
            percentage: Math.round((currentPosition / totalSteps) * 100),
            completedSteps: completedSteps.size,
            isOnFinalForm: currentPosition === totalSteps,
            isOnFirstStep: currentPosition === 1
        };
    }, [getCurrentFlowPosition, formConfig.flow.length, completedSteps.size]);

    // Check if ready for final submission
    const canSubmit = useMemo(() =>
    {
        return getProgress.isOnFinalForm;
    }, [getProgress.isOnFinalForm]);

    // Move to next step/form
    const moveToNext = useCallback(async (stepData = {}) =>
    {
        // Update combined data
        const updatedData = { ...combinedFormData, ...stepData };
        setCombinedFormData(updatedData);

        // Mark current step as completed
        const currentFlowStep = activeStepId
            ? `${activeFormId}.${activeStepId}`
            : activeFormId;
        setCompletedSteps(prev => new Set([...prev, currentFlowStep]));

        // Check if this is final submission
        if (canSubmit) {
            if (onFinalSubmission) {
                await onFinalSubmission(updatedData);
            }
            return { isFinalSubmission: true, data: updatedData };
        }

        // Move to next step in flow
        const nextPosition = getCurrentFlowPosition + 1;
        if (nextPosition < formConfig.flow.length) {
            const nextFlowStep = formConfig.flow[nextPosition];
            const [nextFormId, nextStepId] = nextFlowStep.includes('.')
                ? nextFlowStep.split('.')
                : [nextFlowStep, null];

            setActiveFormId(nextFormId);
            setActiveStepId(nextStepId);

            // Call transition callback
            if (onFormTransition) {
                onFormTransition({
                    from: { formId: activeFormId, stepId: activeStepId },
                    to: { formId: nextFormId, stepId: nextStepId },
                    data: updatedData,
                    progress: getProgress
                });
            }
        }

        return { isFinalSubmission: false, data: updatedData };
    }, [
        combinedFormData,
        activeFormId,
        activeStepId,
        canSubmit,
        getCurrentFlowPosition,
        formConfig.flow,
        onFinalSubmission,
        onFormTransition,
        getProgress
    ]);

    // Navigate to specific step (for back navigation)
    const navigateToStep = useCallback((targetFlowStep) =>
    {
        const [formId, stepId] = targetFlowStep.includes('.')
            ? targetFlowStep.split('.')
            : [targetFlowStep, null];

        setActiveFormId(formId);
        setActiveStepId(stepId);
    }, []);

    // Go back to previous step
    const moveToPrevious = useCallback(() =>
    {
        const prevPosition = getCurrentFlowPosition - 1;
        if (prevPosition >= 0) {
            const prevFlowStep = formConfig.flow[prevPosition];
            navigateToStep(prevFlowStep);
        }
    }, [getCurrentFlowPosition, formConfig.flow, navigateToStep]);

    // Reset all forms to initial state
    const resetAllForms = useCallback(() =>
    {
        const firstStep = formConfig.flow[0];
        const [formId, stepId] = firstStep.includes('.') ? firstStep.split('.') : [firstStep, null];

        setActiveFormId(formId);
        setActiveStepId(stepId);
        setCombinedFormData(initialData);
        setCompletedSteps(new Set());
    }, [formConfig.flow, initialData]);

    // Validate current step
    const validateCurrentStep = useCallback((data) =>
    {
        const schema = getCurrentSchema();
        if (!schema) return { success: true };

        return schema.safeParse(data);
    }, [getCurrentSchema]);

    // Get form-specific data for rendering
    const getFormProps = useCallback((formId) =>
    {
        const isActive = activeFormId === formId;
        const currentFormConfig = formConfig.forms[formId];

        if (currentFormConfig.type === 'multi-step') {
            // For multi-step forms like QuoteForm
            return {
                isActive,
                currentStep: isActive ? (currentFormConfig.steps.findIndex(step => step === activeStepId) || 0) : 0,
                formData: combinedFormData,
                activeStepId: isActive ? activeStepId : null
            };
        } else {
            // For simple forms like FranchiseForm  
            return {
                isActive,
                formData: combinedFormData,
                canSubmit: canSubmit && isActive
            };
        }
    }, [activeFormId, activeStepId, combinedFormData, canSubmit, formConfig.forms]);

    return {
        // Current state
        activeFormId,
        activeStepId,
        combinedFormData,

        // Navigation
        moveToNext,
        moveToPrevious,
        navigateToStep,

        // State checks
        canSubmit,
        progress: getProgress,

        // Validation
        getCurrentSchema,
        validateCurrentStep,

        // Component integration
        getFormProps,

        // Utilities
        resetAllForms,
        completedSteps
    };
};