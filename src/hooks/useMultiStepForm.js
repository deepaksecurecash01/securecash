// /hooks/useMultiStepForm.js
import { useState, useCallback } from 'react';

export const useMultiStepForm = ({
    steps = [], // Array of step identifiers ['quote', 'banking', 'change']
    schemas = {}, // Map of step schemas { quote: QuoteSchema, banking: BankingSchema }
    conditional = false, // Whether steps can be skipped based on conditions
    initialData = {}
}) =>
{
    const [currentStep, setCurrentStep] = useState(0);
    const [stepData, setStepData] = useState(initialData);
    const [completedSteps, setCompletedSteps] = useState(new Set());

    // Get current step info
    const getCurrentStepId = () => steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const totalSteps = steps.length;

    // Validate current step data
    const validateCurrentStep = useCallback((data) =>
    {
        const stepId = getCurrentStepId();
        const stepSchema = schemas[stepId];

        if (!stepSchema) {
            console.warn(`No schema found for step: ${stepId}`);
            return { success: true };
        }

        return stepSchema.safeParse(data);
    }, [currentStep, schemas, steps]);

    // Check if a step should be shown based on conditions
    const shouldShowStep = useCallback((stepId, data = stepData) =>
    {
        if (!conditional) return true;

        // Custom logic based on step type
        switch (stepId) {
            case 'banking':
                return data.Service?.includes('Banking');
            case 'change':
                return data.Service?.includes('Change');
            default:
                return true;
        }
    }, [conditional, stepData]);

    // Get next valid step index (considering conditional steps)
    const getNextValidStep = useCallback((data = stepData) =>
    {
        if (!conditional) return currentStep + 1;

        for (let i = currentStep + 1; i < steps.length; i++) {
            if (shouldShowStep(steps[i], data)) {
                return i;
            }
        }
        return steps.length; // No more valid steps
    }, [conditional, currentStep, steps.length, shouldShowStep, stepData]);

    // Move to next step with conditional logic
    const nextStep = useCallback((data = {}) =>
    {
        // Merge new data with existing step data
        const updatedStepData = { ...stepData, ...data };
        setStepData(updatedStepData);

        // Mark current step as completed
        setCompletedSteps(prev => new Set([...prev, currentStep]));

        // Find next valid step
        if (conditional) {
            const nextValidStep = getNextValidStep(updatedStepData);
            if (nextValidStep < steps.length) {
                setCurrentStep(nextValidStep);
            }
        } else {
            // Move to next step if not last
            if (!isLastStep) {
                setCurrentStep(prev => prev + 1);
            }
        }

        return updatedStepData;
    }, [currentStep, isLastStep, stepData, conditional, getNextValidStep, steps.length]);

    // Move to previous step
    const prevStep = useCallback(() =>
    {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    }, [isFirstStep]);

    // Jump to specific step (useful for navigation)
    const goToStep = useCallback((stepIndex) =>
    {
        if (stepIndex >= 0 && stepIndex < steps.length) {
            setCurrentStep(stepIndex);
        }
    }, [steps.length]);

    // Validate all collected data (for final submission)
    const validateAllSteps = useCallback((allData) =>
    {
        // If there's a combined schema, use it
        if (schemas.combined && typeof schemas.combined === 'function') {
            const combinedSchema = schemas.combined(stepData);
            return combinedSchema.safeParse(allData);
        }

        // Otherwise, validate against all individual schemas
        for (const [stepId, schema] of Object.entries(schemas)) {
            if (stepId === 'combined') continue;

            const validation = schema.safeParse(allData);
            if (!validation.success) {
                return validation;
            }
        }

        return { success: true };
    }, [schemas, stepData]);

    // Reset form to initial state
    const resetSteps = useCallback(() =>
    {
        setCurrentStep(0);
        setStepData(initialData);
        setCompletedSteps(new Set());
    }, [initialData]);

    // Get progress information
    const getProgress = () => ({
        current: currentStep + 1,
        total: totalSteps,
        percentage: Math.round(((currentStep + 1) / totalSteps) * 100),
        completed: completedSteps.size
    });

    return {
        // Current state
        currentStep,
        getCurrentStepId,
        stepData,

        // Navigation
        nextStep,
        prevStep,
        goToStep,

        // Validation
        validateCurrentStep,
        validateAllSteps,

        // State checks
        isFirstStep,
        isLastStep,
        shouldShowStep,
        getNextValidStep,

        // Utilities
        resetSteps,
        getProgress,
        completedSteps
    };
};