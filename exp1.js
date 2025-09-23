// Enhanced useFormManager.js with Progressive Email Support

import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFocusManager } from './useFocusManager';
import { useFormSubmission } from './useFormSubmission';

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

  // File upload configuration - simplified and robust
  fileUpload = null,
}) =>
{
  // Multi-step state management
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState(defaultValues);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Progressive email tracking
  const [progressiveEmailLog, setProgressiveEmailLog] = useState(new Set());
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  // Hybrid form state management
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(
    hybrid?.submitEnabled ?? false
  );
  const [showReviewStep, setShowReviewStep] = useState(false);

  // Simplified file upload state management
  const [fileUploadResults, setFileUploadResults] = useState(new Map());

  // Form type detection
  const isMultiStep = !!multiStep && multiStep.steps && multiStep.steps.length > 1;
  const isHybrid = !!hybrid && hybrid.enabled;
  const hasFileUpload = !!fileUpload && fileUpload.enabled;

  // Clean file upload state methods
  const setUploadResult = useCallback((fileId, result) =>
  {
    console.log(`Storing upload result for ${fileId}`);
    setFileUploadResults(prev => new Map(prev.set(fileId, result)));
  }, []);

  const clearUploadResult = useCallback((fileId) =>
  {
    console.log(`Clearing upload result for ${fileId}`);
    setFileUploadResults(prev =>
    {
      const updated = new Map(prev);
      updated.delete(fileId);
      return updated;
    });
  }, []);

  const getCompletedUploads = useCallback(() =>
  {
    const completed = Array.from(fileUploadResults.values()).filter(
      result => result?.isProcessed && result.data
    );
    console.log(`Found ${completed.length} completed uploads`);
    return completed;
  }, [fileUploadResults]);

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

  // Enhanced focus management
  const focus = useFocusManager(control);

  // Enhanced submission with clean file handling
  const submission = useFormSubmission({
    formType,
    formId,
    onSuccess,
    onError,
    prepareData: async (data) =>
    {
      let processedData = data;

      // Process file uploads if configured
      if (hasFileUpload && fileUpload.fields && fileUpload.fields.length > 0) {
        console.log('Processing form submission with file uploads');

        const attachments = [];
        const missingFiles = [];

        // Check each file field
        for (const { field, prefix } of fileUpload.fields) {
          if (data[field]) {
            const files = Array.isArray(data[field]) ? data[field] : [data[field]];

            for (const file of files) {
              // Look for processed result by matching file properties
              const matchingResult = Array.from(fileUploadResults.values()).find(result =>
                result.originalFile &&
                result.originalFile.name === file.name &&
                result.originalFile.size === file.size &&
                result.isProcessed &&
                result.data
              );

              if (matchingResult) {
                // Use pre-processed file
                attachments.push({
                  filename: `${prefix || field}.${file.name.split('.').pop()}`,
                  data: matchingResult.data
                });
                console.log(`Using pre-processed file: ${file.name}`);
              } else {
                // File not processed
                missingFiles.push(file.name);
                console.error(`File ${file.name} was not processed!`);
              }
            }
          }
        }

        if (missingFiles.length > 0) {
          throw new Error(`File(s) "${missingFiles.join('", "')}" were not processed. Please remove and re-upload the file(s).`);
        }

        processedData = { ...data, attachments };
        console.log(`Submission prepared with ${attachments.length} attachments`);
      }

      // Apply custom prepareData if provided
      if (prepareData) {
        return await prepareData(processedData);
      }

      return processedData;
    }
  });

  // Progressive Email Trigger Function
  const triggerProgressiveEmail = useCallback(async (updatedStepData, stepNumber) =>
  {
    // Only for Quote form
    if (formType !== 'quote' || formId !== 'Quote') return;

    const progressKey = `step-${stepNumber}`;

    // Prevent duplicate emails for the same step
    if (progressiveEmailLog.has(progressKey) || !updatedStepData.Email) return;

    console.log(`📧 Triggering progressive email for Quote Step ${stepNumber}`);

    try {
      // Send progressive email with accumulated data
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'quote-progressive',
          stepCompleted: stepNumber,
          accumulatedData: updatedStepData,
          isProgressiveEmail: true,
          sessionId: sessionId,
        }),
      });

      if (response.ok) {
        setProgressiveEmailLog(prev => new Set([...prev, progressKey]));
        console.log(`✅ Progressive email sent for Step ${stepNumber}`);
      } else {
        console.warn(`⚠️ Progressive email failed for Step ${stepNumber}`);
      }
    } catch (error) {
      console.error(`❌ Progressive email error for Step ${stepNumber}:`, error);
      // Don't block form progression on email failure
    }
  }, [formType, formId, progressiveEmailLog, sessionId]);

  // Manual step navigation for hybrid forms
  const goToStep = useCallback((targetStep) =>
  {
    if (!isMultiStep) return;

    const currentFormData = getValues();
    const updatedStepData = { ...stepData, ...currentFormData };
    setStepData(updatedStepData);
    setCurrentStep(targetStep);
    reset(updatedStepData);
    focus.clearFocus();

    console.log(`Manual navigation to step ${targetStep}`, updatedStepData);
  }, [isMultiStep, getValues, stepData, reset, focus]);

  const goBack = useCallback(() =>
  {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  // Enhanced step navigation with progressive email support
  const moveToNextStep = useCallback(async (stepDataUpdate = {}) =>
  {
    const updatedStepData = { ...stepData, ...stepDataUpdate };
    setStepData(updatedStepData);
    setCompletedSteps(prev => new Set([...prev, currentStep]));

    if (!isMultiStep) return updatedStepData;

    // PROGRESSIVE EMAIL TRIGGER - Only for Quote form
    const stepNumber = currentStep + 1;
    await triggerProgressiveEmail(updatedStepData, stepNumber);

    if (isHybrid) {
      const reviewStep = hybrid.reviewStep || 3;
      if (currentStep === reviewStep - 1) {
        setCurrentStep(reviewStep);
        setSubmitButtonEnabled(true);
        console.log('Hybrid transition: Enabling submit section');
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
  }, [stepData, currentStep, isMultiStep, isHybrid, hybrid, getCurrentStep, multiStep, triggerProgressiveEmail]);

  const isLastStep = useCallback((formDataOverride = null) =>
  {
    if (!isMultiStep) return true;

    if (isHybrid) {
      const actualLastStep = currentStep === multiStep.steps.length - 1;
      if (actualLastStep) {
        return true;
      } else {
        return false;
      }
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

  const validateCurrentStep = useCallback((data) =>
  {
    const currentSchema = getCurrentSchema();
    if (!currentSchema) return { success: true };
    return currentSchema.safeParse(data);
  }, [getCurrentSchema]);

  // Enhanced field focus management
  const handleFieldFocus = useCallback((fieldName) =>
  {
    console.log(`Field focus initiated by ${fieldName}`);
    focus.setFocusField(fieldName);
  }, [focus]);

  const handleFieldBlur = useCallback(() =>
  {
    console.log(`Field blur - clearing focus`);
    focus.clearFocus();
  }, [focus]);

  // Enhanced validation error handler
  const handleValidationError = useCallback((validationErrors) =>
  {
    console.log('Step validation failed:', validationErrors);

    // Try enhanced focus management first
    const focusSuccess = focus.focusFirstError(validationErrors);

    if (!focusSuccess) {
      const firstErrorField = Object.keys(validationErrors)[0];
      console.log(`Fallback - Using setFocus for ${firstErrorField}`);
      try {
        setFocus(firstErrorField);
      } catch (error) {
        console.warn(`setFocus fallback failed for ${firstErrorField}:`, error);

        // File field fallback
        if (hasFileUpload && fileUpload.fields) {
          const fileField = fileUpload.fields.find(f => f.field === firstErrorField);
          if (fileField) {
            console.log(`Attempting scroll to file field: ${firstErrorField}`);
            const element = document.querySelector(`[data-field-name="${firstErrorField}"]`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }
    }
  }, [focus, setFocus, hasFileUpload, fileUpload]);

  // Enhanced form submission handler
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
        const finalStepData = { ...stepData, ...formData };
        console.log('Final submission:', finalStepData);
        focus.clearFocus();
        return await submission.handleSubmission(finalStepData);
      } else {
        console.log('Moving to next step');
        const updatedStepData = await moveToNextStep(formData);
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

  // Enhanced field props helper
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

    // Add file upload state for file fields
    if (type === 'file' && hasFileUpload) {
      return {
        ...baseProps,
        fileUploadState: {
          // Methods for FileUploadInput
          setUploadResult,
          clearUploadResult,
          getCompletedUploads,

          // Configuration
          compression: fileUpload.compression || {
            maxSizeMB: 5,
            allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
          }
        }
      };
    }

    return baseProps;
  }, [control, focus.currentFocusField, handleFieldFocus, handleFieldBlur, hasFileUpload, setUploadResult, clearUploadResult, getCompletedUploads, fileUpload]);

  const getStepData = useCallback(() =>
  {
    return stepData;
  }, [stepData]);

  // Reset form with complete cleanup including progressive email log
  const resetForm = useCallback(() =>
  {
    setCurrentStep(0);
    setStepData(defaultValues);
    setCompletedSteps(new Set());
    setProgressiveEmailLog(new Set()); // Clear progressive email log

    if (isHybrid) {
      setSubmitButtonEnabled(hybrid?.submitEnabled ?? false);
      setShowReviewStep(false);
    }

    // Clean file upload state
    if (hasFileUpload) {
      setFileUploadResults(new Map());
      console.log('File upload state reset');
    }

    reset(defaultValues);
    focus.clearFocus();
    submission.resetSubmission();
  }, [defaultValues, reset, focus, submission, isHybrid, hybrid, hasFileUpload]);

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

  const getNextValidSteps = useCallback((services) =>
  {
    if (!isMultiStep || !multiStep.conditional || !multiStep.getNextSteps) {
      return [];
    }
    return multiStep.getNextSteps({ Service: services });
  }, [isMultiStep, multiStep]);

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
      // Progressive email debug info
      progressiveEmailsSent: progressiveEmailLog.size,
      sessionId: sessionId,
      // File upload debug info
      hasFileUpload,
      fileUploadResults: fileUploadResults.size,
      completedUploads: getCompletedUploads().length,
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

    // Progressive email methods
    triggerProgressiveEmail,
    progressiveEmailLog,
    sessionId,

    // Validation error handling
    handleValidationError,

    // File upload integration
    ...(hasFileUpload && {
      fileUpload: {
        // Methods
        setUploadResult,
        clearUploadResult,
        getCompletedUploads,

        // Status
        hasCompletedUploads: fileUploadResults.size > 0,
        uploadCount: fileUploadResults.size
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