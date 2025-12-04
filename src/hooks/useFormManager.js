import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFocusManager } from './useFocusManager';
import { useFormSubmission } from './useFormSubmission';
import { useFileUploadState } from './useFileUploadState';
import { useProgressiveEmail } from './useProgressiveEmail';
import { useMultiStepLogic } from './useMultiStepLogic';

export const useFormManager = ({
    schema,
    defaultValues = {},
    formType,
    formId,
    onSuccess,
    onError,
    prepareData,
    theme = 'dark',
    multiStep = null,
    hybrid = null,
    fileUpload = null,
}) =>
{
    const isQuoteForm = formType === 'quote';
    const hasFileUpload = !!fileUpload && fileUpload.enabled;

    const fileUploadState = useFileUploadState();
    const progressiveEmail = useProgressiveEmail(isQuoteForm);

    const multiStepLogic = useMultiStepLogic({
        multiStep,
        hybrid,
        defaultValues,
        isQuoteForm,
        sendProgressiveEmail: progressiveEmail.sendProgressiveEmail,
        getAccumulatedData: progressiveEmail.getAccumulatedData
    });

    const getCurrentSchema = useCallback(() =>
    {
        if (!multiStepLogic.isMultiStep) return schema;

        const { stepId } = multiStepLogic.getCurrentStep();

        if (typeof schema === 'object' && schema[stepId]) {
            return schema[stepId];
        }

        return z.object({});
    }, [schema, multiStepLogic]);

    const form = useForm({
        resolver: zodResolver(getCurrentSchema()),
        defaultValues: multiStepLogic.stepData,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldFocusError: false,
    });

    const { control, handleSubmit: rhfHandleSubmit, formState: { errors }, setValue, watch, getValues, reset, setFocus } = form;

    const focus = useFocusManager(control);

    const submission = useFormSubmission({
        formType,
        formId,
        onSuccess,
        onError,
        prepareData: async (data) =>
        {
            let processedData = data;

            if (hasFileUpload && fileUpload.fields && fileUpload.fields.length > 0) {
                const attachments = [];
                const missingFiles = [];

                for (const { field, prefix } of fileUpload.fields) {
                    if (data[field]) {
                        const files = Array.isArray(data[field]) ? data[field] : [data[field]];

                        for (const file of files) {
                            const matchingResult = Array.from(fileUploadState.fileUploadResults.values()).find(result =>
                                result.originalFile &&
                                result.originalFile.name === file.name &&
                                result.originalFile.size === file.size &&
                                result.isProcessed &&
                                result.data
                            );

                            if (matchingResult) {
                                attachments.push({
                                    filename: `${prefix || field}.${file.name.split('.').pop()}`,
                                    data: matchingResult.data
                                });
                            } else {
                                missingFiles.push(file.name);
                            }
                        }
                    }
                }

                if (missingFiles.length > 0) {
                    throw new Error(`File(s) "${missingFiles.join('", "')}" were not processed. Please remove and re-upload the file(s).`);
                }

                processedData = { ...data, attachments };
            }

            if (prepareData) {
                return await prepareData(processedData);
            }

            return processedData;
        }
    });

    const handleFieldFocus = useCallback((fieldName) =>
    {
        focus.setFocusField(fieldName);
    }, [focus]);

    const handleFieldBlur = useCallback(() =>
    {
        focus.clearFocus();
    }, [focus]);

    const handleValidationError = useCallback((validationErrors) =>
    {
        const focusSuccess = focus.focusFirstError(validationErrors);

        if (!focusSuccess) {
            const firstErrorField = Object.keys(validationErrors)[0];
            try {
                setFocus(firstErrorField);
            } catch (error) {
                if (hasFileUpload && fileUpload.fields) {
                    const fileField = fileUpload.fields.find(f => f.field === firstErrorField);
                    if (fileField) {
                        const element = document.querySelector(`[data-field-name="${firstErrorField}"]`);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }
            }
        }
    }, [focus, setFocus, hasFileUpload, fileUpload]);

    const validateCurrentStep = useCallback((data) =>
    {
        const currentSchema = getCurrentSchema();
        if (!currentSchema) return { success: true };
        return currentSchema.safeParse(data);
    }, [getCurrentSchema]);

    const handleSubmit = rhfHandleSubmit(
        async (formData) =>
        {
            const validation = validateCurrentStep(formData);
            if (!validation.success) {
                handleValidationError(validation.error.flatten().fieldErrors);
                return false;
            }

            const isCurrentlyLastStep = multiStepLogic.isLastStep(formData);

            if (isCurrentlyLastStep) {
                const finalStepData = { ...multiStepLogic.stepData, ...formData };
                focus.clearFocus();
                return await submission.handleSubmission(finalStepData);
            } else {
                const updatedStepData = await multiStepLogic.moveToNextStep(formData);
                focus.clearFocus();
                reset(updatedStepData);
                return true;
            }
        },
        (validationErrors) =>
        {
            handleValidationError(validationErrors);
            return false;
        }
    );

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

        if (type === 'file' && hasFileUpload) {
            return {
                ...baseProps,
                fileUploadState: {
                    setUploadResult: fileUploadState.setUploadResult,
                    clearUploadResult: fileUploadState.clearUploadResult,
                    getCompletedUploads: fileUploadState.getCompletedUploads,
                    compression: fileUpload.compression || {
                        maxSizeMB: 5,
                        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
                    }
                }
            };
        }

        return baseProps;
    }, [control, focus.currentFocusField, handleFieldFocus, handleFieldBlur, hasFileUpload, fileUploadState, fileUpload]);

    const getStepData = useCallback(() => multiStepLogic.stepData, [multiStepLogic.stepData]);

    const resetForm = useCallback(() =>
    {
        multiStepLogic.resetStepState();
        if (hasFileUpload) {
            fileUploadState.clearAllUploads();
        }
        reset(defaultValues);
        focus.clearFocus();
        submission.resetSubmission();
    }, [defaultValues, reset, focus, submission, hasFileUpload, fileUploadState, multiStepLogic]);

    const goToStep = useCallback((targetStep) =>
    {
        multiStepLogic.goToStep(targetStep, getValues, reset, focus.clearFocus);
    }, [multiStepLogic, getValues, reset, focus]);

    const goBack = useCallback(() =>
    {
        multiStepLogic.goBack(getValues, reset, focus.clearFocus);
    }, [multiStepLogic, getValues, reset, focus]);

    const getDebugInfo = () => ({
        errors: Object.keys(errors),
        currentFocus: focus.currentFocusField,
        isSubmitting: submission.isSubmitting,
        isSubmitted: submission.isSubmitted,
        currentStep: multiStepLogic.currentStep,
        stepId: multiStepLogic.getCurrentStep().stepId,
        stepData: Object.keys(multiStepLogic.stepData),
        isMultiStep: multiStepLogic.isMultiStep,
        isHybrid: multiStepLogic.isHybrid,
        isLastStep: multiStepLogic.isLastStep(),
        submitButtonEnabled: multiStepLogic.submitButtonEnabled,
        showReviewStep: multiStepLogic.showReviewStep,
        hasFileUpload,
        fileUploadResults: fileUploadState.fileUploadResults.size,
        completedUploads: fileUploadState.getCompletedUploads().length,
        isQuoteForm,
        progressiveEmailEnabled: isQuoteForm && multiStepLogic.isMultiStep,
        ...focus.getFocusDebugInfo()
    });

    return {
        control,
        handleSubmit,
        errors,
        isSubmitting: submission.isSubmitting,
        isSubmitted: submission.isSubmitted,
        submissionError: submission.submissionError,
        currentFocusField: focus.currentFocusField,
        focusField: focus.focusField,
        clearFocus: focus.clearFocus,
        isFieldFocused: focus.isFieldFocused,
        handleFieldFocus,
        handleFieldBlur,
        setValue,
        watch,
        getValues,
        reset,
        getFieldProps,
        hasFieldError: (fieldName) => !!errors[fieldName],
        getFieldError: (fieldName) => errors[fieldName]?.message || null,
        getCurrentStep: multiStepLogic.getCurrentStep,
        getCurrentSchema,
        getStepData,
        isLastStep: multiStepLogic.isLastStep,
        validateCurrentStep,
        moveToNextStep: multiStepLogic.moveToNextStep,
        resetForm,
        getProgress: multiStepLogic.getProgress,
        goToStep,
        goBack,
        submitButtonEnabled: multiStepLogic.submitButtonEnabled,
        showReviewStep: multiStepLogic.showReviewStep,
        handleValidationError,
        sendProgressiveEmail: progressiveEmail.sendProgressiveEmail,
        getAccumulatedData: progressiveEmail.getAccumulatedData,
        ...(hasFileUpload && {
            fileUpload: {
                setUploadResult: fileUploadState.setUploadResult,
                clearUploadResult: fileUploadState.clearUploadResult,
                getCompletedUploads: fileUploadState.getCompletedUploads,
                hasCompletedUploads: fileUploadState.fileUploadResults.size > 0,
                uploadCount: fileUploadState.fileUploadResults.size
            }
        }),
        getDebugInfo,
        formMethods: form,
        submissionMethods: submission,
        focusMethods: focus,
        theme
    };
};