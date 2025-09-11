// /hooks/useFormManager.js - ENHANCED WITH FILE UPLOAD SUPPORT
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFocusManager } from './useFocusManager';
import { useFormSubmission } from './useFormSubmission';
import { useFileUpload } from './useFileUpload';

/**
 * Enhanced Form Manager with Multi-Step, Hybrid, AND File Upload Support
 * Now includes integrated file processing for complex forms like ICA
 */
export const useFormManager = ({
    // Core form configuration
    schema,
    defaultValues = {},
    formType,
    formId,
    onSuccess,
    onError,
    prepareData,
    theme = 'dark',

    // Multi-step configuration
    multiStep = null,

    // Hybrid form configuration for Site Info pattern
    hybrid = null,

    // NEW: File upload configuration
    fileUpload = null, // { enabled: true, fields: [...], compression: {...} }
}) =>
{
    // Multi-step state management
    const [currentStep, setCurrentStep] = useState(0);
    const [stepData, setStepData] = useState(defaultValues);
    const [completedSteps, setCompletedSteps] = useState(new Set());

    // Hybrid form state management
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(
        hybrid?.submitEnabled ?? false
    );
    const [showReviewStep, setShowReviewStep] = useState(false);

    // Form type detection
    const isMultiStep = !!multiStep && multiStep.steps && multiStep.steps.length > 1;
    const isHybrid = !!hybrid && hybrid.enabled;
    const hasFileUpload = !!fileUpload && fileUpload.enabled;

    // Initialize file upload hook if needed
    const fileUploadHook = useFileUpload(
        hasFileUpload ? {
            compression: fileUpload.compression || {
                targetSizeKB: 400,
                maxSizeMB: 5,
                allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
            },
            concurrencyLimit: fileUpload.concurrencyLimit || 2
        } : {
            compression: {
                targetSizeKB: 400,
                maxSizeMB: 5,
                allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
            },
            concurrencyLimit: 2
        }
    );

    // Get current step information
    const getCurrentStep = useCallback(() =>
    {
        if (!isMultiStep) {
            return { currentStep: 0, stepId: 'single', isFirst: true, isLast: true };
        }

        const stepId = multiStep.steps[currentStep];
        const isFirst = currentStep === 0;
        const isLast = currentStep === multiStep.steps.length - 1;

        // Hybrid-specific logic
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

    // Get current schema
    const getCurrentSchema = useCallback(() =>
    {
        if (!isMultiStep) {
            return schema;
        }

        const { stepId } = getCurrentStep();

        if (typeof schema === 'object' && schema[stepId]) {
            return schema[stepId];
        }

        return z.object({});
    }, [schema, isMultiStep, getCurrentStep]);

    // Initialize React Hook Form
    const form = useForm({
        resolver: zodResolver(getCurrentSchema()),
        defaultValues: stepData,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldFocusError: false,
    });

    const {
        control,
        handleSubmit: rhfHandleSubmit,
        formState: { errors },
        setValue,
        watch,
        getValues,
        reset,
        setFocus
    } = form;

    // Focus and submission management
    const focus = useFocusManager(control);

    // Enhanced submission with file processing
    const submission = useFormSubmission({
        formType,
        formId,
        onSuccess,
        onError,
        prepareData: async (data) =>
        {
            let processedData = data;

            // Process files if file upload is enabled
            if (hasFileUpload && fileUpload.fields && fileUpload.fields.length > 0) {
                try {
                    const attachments = await fileUploadHook.processFiles(data, fileUpload.fields);
                    processedData = { ...data, attachments };
                } catch (error) {
                    console.error('File processing failed:', error);
                    throw error;
                }
            }

            // Apply custom prepareData if provided
            if (prepareData) {
                return await prepareData(processedData);
            }

            return processedData;
        }
    });

    // Manual step navigation for hybrid forms
    const goToStep = useCallback((targetStep) =>
    {
        if (!isMultiStep) return;

        // Save current form data
        const currentFormData = getValues();
        const updatedStepData = { ...stepData, ...currentFormData };
        setStepData(updatedStepData);

        // Navigate to target step
        setCurrentStep(targetStep);

        // Reset form with updated data
        reset(updatedStepData);

        // Clear focus
        focus.clearFocus();

        console.log(`Manual navigation to step ${targetStep}`, updatedStepData);
    }, [isMultiStep, getValues, stepData, reset, focus]);

    // Go back one step
    const goBack = useCallback(() =>
    {
        if (currentStep > 0) {
            goToStep(currentStep - 1);
        }
    }, [currentStep, goToStep]);

    // Enhanced step navigation with hybrid support
    const moveToNextStep = useCallback((stepDataUpdate = {}) =>
    {
        const updatedStepData = { ...stepData, ...stepDataUpdate };
        setStepData(updatedStepData);
        setCompletedSteps(prev => new Set([...prev, currentStep]));

        if (!isMultiStep) return updatedStepData;

        // Hybrid form logic for Site Info pattern
        if (isHybrid) {
            const reviewStep = hybrid.reviewStep || 3;

            if (currentStep === reviewStep - 1) {
                // Moving from last multi-step to review section
                setCurrentStep(reviewStep);
                setSubmitButtonEnabled(true);

                console.log('Hybrid transition: Enabling submit section');
                return updatedStepData;
            }
        }

        // Standard multi-step navigation
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
    }, [stepData, currentStep, isMultiStep, isHybrid, hybrid, getCurrentStep, multiStep]);

    // Enhanced last step detection with hybrid support
    const isLastStep = useCallback((formDataOverride = null) =>
    {
        if (!isMultiStep) return true;

        // Hybrid form logic - allow actual last step to submit
        if (isHybrid) {
            const actualLastStep = currentStep === multiStep.steps.length - 1;

            if (actualLastStep) {
                return true;
            } else {
                return false;
            }
        }

        // Standard multi-step logic
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

    // Enhanced validation
    const validateCurrentStep = useCallback((data) =>
    {
        const currentSchema = getCurrentSchema();
        if (!currentSchema) return { success: true };

        return currentSchema.safeParse(data);
    }, [getCurrentSchema]);

    // Enhanced field focus management
    const handleFieldFocus = (fieldName) =>
    {
        console.log(`Enhanced Form Manager: Field focus initiated by ${fieldName}`);
        focus.setFocusField(fieldName);
    };

    const handleFieldBlur = () =>
    {
        console.log(`Enhanced Form Manager: Field blur - clearing focus`);
        focus.clearFocus();
    };

    // Enhanced validation error handler
    const handleValidationError = (validationErrors) =>
    {
        console.log('Step validation failed:', validationErrors);

        const focusSuccess = focus.focusFirstError(validationErrors);

        if (!focusSuccess) {
            const firstErrorField = Object.keys(validationErrors)[0];
            console.log(`Fallback: Using setFocus for ${firstErrorField}`);
            try {
                setFocus(firstErrorField);
            } catch (error) {
                console.warn(`setFocus fallback failed for ${firstErrorField}:`, error);
            }
        }
    };

    // Enhanced form submission handler with file processing
    const handleSubmit = rhfHandleSubmit(
        async (formData) =>
        {
            console.log('Step validation passed:', formData);

            const validation = validateCurrentStep(formData);
            if (!validation.success) {
                console.log('Validation failed, staying on current step');
                handleValidationError(validation.error.flatten().fieldErrors);
                return false;
            }

            const isCurrentlyLastStep = isLastStep(formData);

            if (isCurrentlyLastStep) {
                // Final submission with file processing
                const finalStepData = { ...stepData, ...formData };
                console.log('Final submission with data:', finalStepData);
                focus.clearFocus();
                return await submission.handleSubmission(finalStepData);
            } else {
                // Step progression - only if validation passed
                console.log('Moving to next step');
                const updatedStepData = moveToNextStep(formData);
                focus.clearFocus();
                reset(updatedStepData);
                return true;
            }
        },
        (validationErrors) =>
        {
            console.log('React Hook Form validation failed:', validationErrors);
            handleValidationError(validationErrors);
            return false;
        }
    );

    // Enhanced field props helper with file upload support
    const getFieldProps = useCallback((fieldConfig) =>
    {
        const { name, type = 'text', ...otherConfig } = fieldConfig;

        const baseProps = {
            ...otherConfig,
            name,
            type,
            control,
            currentFocusField: focus.currentFocusField,
            onFieldFocus: handleFieldFocus,
            onFieldBlur: handleFieldBlur,
        };

        // Add file upload specific props
        if (type === 'file' && hasFileUpload) {
            return {
                ...baseProps,
                fileUploadState: {
                    isProcessing: fileUploadHook.isProcessing,
                    processingProgress: fileUploadHook.processingProgress,
                    fileErrors: fileUploadHook.fileErrors,
                    validateFile: fileUploadHook.validateFile,
                    clearFileErrors: fileUploadHook.clearFileErrors
                }
            };
        }

        return baseProps;
    }, [control, focus.currentFocusField, handleFieldFocus, handleFieldBlur, hasFileUpload, fileUploadHook]);

    // Get current step data
    const getStepData = useCallback(() =>
    {
        return stepData;
    }, [stepData]);

    // Enhanced reset form with hybrid and file upload support
    const resetForm = useCallback(() =>
    {
        setCurrentStep(0);
        setStepData(defaultValues);
        setCompletedSteps(new Set());

        // Reset hybrid state
        if (isHybrid) {
            setSubmitButtonEnabled(hybrid?.submitEnabled ?? false);
            setShowReviewStep(false);
        }

        // Clear file upload errors
        if (hasFileUpload) {
            fileUploadHook.clearFileErrors();
        }

        reset(defaultValues);
        focus.clearFocus();
        submission.resetSubmission();
    }, [defaultValues, reset, focus, submission, isHybrid, hybrid, hasFileUpload, fileUploadHook]);

    // Enhanced progress information with hybrid support
    const getProgress = useMemo(() =>
    {
        if (!isMultiStep) return { current: 1, total: 1, percentage: 100 };

        // Hybrid progress calculation
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

    // Get next valid steps helper
    const getNextValidSteps = useCallback((services) =>
    {
        if (!isMultiStep || !multiStep.conditional || !multiStep.getNextSteps) {
            return [];
        }
        return multiStep.getNextSteps({ Service: services });
    }, [isMultiStep, multiStep]);

    // Enhanced debug information
    const getDebugInfo = () =>
    {
        return {
            errors: Object.keys(errors),
            currentFocus: focus.currentFocusField,
            isSubmitting: submission.isSubmitting,
            isSubmitted: submission.isSubmitted,
            currentStep,
            stepId: getCurrentStep().stepId,
            stepData: Object.keys(stepData),
            isMultiStep,
            isHybrid,
            isLastStep: isLastStep(),
            submitButtonEnabled,
            showReviewStep,
            // File upload debug info
            hasFileUpload,
            fileProcessing: hasFileUpload ? fileUploadHook.isProcessing : false,
            fileErrors: hasFileUpload ? fileUploadHook.fileErrors : [],
            ...focus.getFocusDebugInfo()
        };
    };

    return {
        // Core form control
        control,
        handleSubmit,
        errors,

        // Form state
        isSubmitting: submission.isSubmitting,
        isSubmitted: submission.isSubmitted,
        submissionError: submission.submissionError,

        // Focus management
        currentFocusField: focus.currentFocusField,
        focusField: focus.focusField,
        clearFocus: focus.clearFocus,
        isFieldFocused: focus.isFieldFocused,
        handleFieldFocus,
        handleFieldBlur,

        // Form utilities
        setValue,
        watch,
        getValues,
        reset,

        // Helper functions
        getFieldProps,
        hasFieldError: (fieldName) => !!errors[fieldName],
        getFieldError: (fieldName) => errors[fieldName]?.message || null,

        // Multi-step methods
        getCurrentStep,
        getCurrentSchema,
        getStepData,
        isLastStep,
        validateCurrentStep,
        moveToNextStep,
        resetForm,
        getProgress,

        // Manual navigation methods for hybrid forms
        goToStep,
        goBack,

        // Hybrid-specific state
        submitButtonEnabled,
        showReviewStep,

        // Validation error handling
        handleValidationError,

        // NEW: File upload methods (only if enabled)
        ...(hasFileUpload && {
            fileUpload: {
                isProcessing: fileUploadHook.isProcessing,
                processingProgress: fileUploadHook.processingProgress,
                fileErrors: fileUploadHook.fileErrors,
                validateFile: fileUploadHook.validateFile,
                clearFileErrors: fileUploadHook.clearFileErrors
            }
        }),

        // Debug utilities
        getDebugInfo,

        // Direct access to hooks
        formMethods: form,
        submissionMethods: submission,
        focusMethods: focus,

        // Theme
        theme
    };
};