// /hooks/useFocusManager.js - FIXED ERROR SEQUENCING
import { useState, useCallback, useMemo } from 'react';

// FIXED: Define consistent field order for ICA form to prevent sequencing issues
const ICA_FIELD_ORDER = [
	// Personal Details Section
	'Name',
	'OrganisationType',
	'ABN',
	'Phone',
	'Email',
	'Address',
	'AddressPostal',

	// Agreement Term Section
	'DateCommencement',
	'AcceptAgreement',

	// Deed of Guarantee Section
	'DateDeed',
	'NameConfirm',
	'AddressResidential',
	'GovernmentID',

	// Executed as Deed Section
	'BusinessName',
	'WitnessName',
	'WitnessAddress',
	'WitnessID',

	// Licensing & Insurance Section
	'SecurityLicense',
	'CITInsurance',

	// eDockets Section
	'eDocketsContractorCode'
];

// Generic field order for other forms
const DEFAULT_FIELD_ORDER = [];

export const useFocusManager = (control, formType = null) =>
{
	const [currentFocusField, setCurrentFocusField] = useState(null);

	// Get appropriate field order based on form type
	const getFieldOrder = useMemo(() =>
	{
		switch (formType) {
			case 'ica':
				return ICA_FIELD_ORDER;
			default:
				return DEFAULT_FIELD_ORDER;
		}
	}, [formType]);

	// FIXED: Enhanced focus with proper error sequencing
	const focusFirstError = useCallback((validationErrors) =>
	{
		if (!validationErrors || Object.keys(validationErrors).length === 0) {
			console.log('Focus Manager: No validation errors to focus');
			return false;
		}

		console.log('Focus Manager: Attempting to focus first error from:', Object.keys(validationErrors));

		let firstErrorField = null;

		// FIXED: Use predefined field order for consistent sequencing
		if (getFieldOrder.length > 0) {
			// Use predefined order (like ICA)
			for (const fieldName of getFieldOrder) {
				if (validationErrors[fieldName]) {
					firstErrorField = fieldName;
					break;
				}
			}
		} else {
			// Fallback to first error in validation object
			firstErrorField = Object.keys(validationErrors)[0];
		}

		if (!firstErrorField) {
			console.warn('Focus Manager: Could not determine first error field');
			return false;
		}

		console.log(`Focus Manager: Focusing first error field: ${firstErrorField}`);

		// ENHANCED: Try multiple focus strategies
		const focusStrategies = [
			() =>
			{
				// Strategy 1: Use data-field-name attribute (most reliable)
				const element = document.querySelector(`[data-field-name="${firstErrorField}"]`);
				if (element) {
					console.log(`Focus Manager: Found element by data-field-name for ${firstErrorField}`);

					// Handle different input types
					if (element.scrollIntoView) {
						element.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}

					// Focus appropriate sub-element
					const focusableElement = element.querySelector('input, select, textarea, [role="button"]') || element;
					if (focusableElement && focusableElement.focus) {
						focusableElement.focus();
						setCurrentFocusField(firstErrorField);
						return true;
					}
				}
				return false;
			},

			() =>
			{
				// Strategy 2: Use name attribute
				const element = document.querySelector(`[name="${firstErrorField}"]`);
				if (element) {
					console.log(`Focus Manager: Found element by name attribute for ${firstErrorField}`);

					if (element.scrollIntoView) {
						element.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}

					element.focus();
					setCurrentFocusField(firstErrorField);
					return true;
				}
				return false;
			},

			() =>
			{
				// Strategy 3: React Hook Form control focus (most reliable for RHF)
				try {
					if (control && control.setFocus) {
						control.setFocus(firstErrorField);
						setCurrentFocusField(firstErrorField);

						// Additional scroll for file inputs and complex components
						setTimeout(() =>
						{
							const element = document.querySelector(`[data-field-name="${firstErrorField}"], [name="${firstErrorField}"]`);
							if (element && element.scrollIntoView) {
								element.scrollIntoView({ behavior: 'smooth', block: 'center' });
							}
						}, 100);

						return true;
					}
				} catch (error) {
					console.warn(`Focus Manager: setFocus failed for ${firstErrorField}:`, error);
				}
				return false;
			}
		];

		// Try each strategy until one succeeds
		for (let i = 0; i < focusStrategies.length; i++) {
			try {
				if (focusStrategies[i]()) {
					console.log(`Focus Manager: Successfully focused ${firstErrorField} using strategy ${i + 1}`);
					return true;
				}
			} catch (error) {
				console.warn(`Focus Manager: Strategy ${i + 1} failed for ${firstErrorField}:`, error);
				continue;
			}
		}

		console.warn(`Focus Manager: All focus strategies failed for field: ${firstErrorField}`);
		return false;
	}, [control, getFieldOrder]);

	// Set focus field manually
	const setFocusField = useCallback((fieldName) =>
	{
		console.log(`Focus Manager: Manual focus set to ${fieldName}`);
		setCurrentFocusField(fieldName);
	}, []);

	// Clear focus
	const clearFocus = useCallback(() =>
	{
		console.log('Focus Manager: Clearing focus');
		setCurrentFocusField(null);
	}, []);

	// Focus specific field programmatically
	const focusField = useCallback((fieldName) =>
	{
		console.log(`Focus Manager: Programmatic focus to ${fieldName}`);

		// Use the same focusing strategies as focusFirstError
		const element = document.querySelector(`[data-field-name="${fieldName}"], [name="${fieldName}"]`);
		if (element) {
			if (element.scrollIntoView) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}

			const focusableElement = element.querySelector('input, select, textarea, [role="button"]') || element;
			if (focusableElement && focusableElement.focus) {
				focusableElement.focus();
				setCurrentFocusField(fieldName);
				return true;
			}
		}

		// Fallback to React Hook Form
		try {
			if (control && control.setFocus) {
				control.setFocus(fieldName);
				setCurrentFocusField(fieldName);
				return true;
			}
		} catch (error) {
			console.warn(`Focus Manager: Direct focus failed for ${fieldName}:`, error);
		}

		return false;
	}, [control]);

	// Check if field is focused
	const isFieldFocused = useCallback((fieldName) =>
	{
		return currentFocusField === fieldName;
	}, [currentFocusField]);

	// Debug information
	const getFocusDebugInfo = useCallback(() =>
	{
		return {
			currentFocusField,
			fieldOrderLength: getFieldOrder.length,
			formType,
			hasControl: !!control
		};
	}, [currentFocusField, getFieldOrder.length, formType, control]);

	return {
		currentFocusField,
		focusFirstError,
		setFocusField,
		clearFocus,
		focusField,
		isFieldFocused,
		getFocusDebugInfo
	};
};

// /hooks/useFormManager.js - UPDATED TO PASS FORM TYPE TO FOCUS MANAGER
// Replace the relevant parts in your useFormManager.js

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

	// File upload configuration
	fileUpload = null,
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

	// FIXED: Pass formType to focus manager for proper field ordering
	const focus = useFocusManager(control, formType);

	// Enhanced submission with file processing
	const submission = useFormSubmission({
		formType,
		formId,
		onSuccess,
		onError,
		prepareData: async (data) =>
		{
			let processedData = data;

			// UPDATED: File processing now happens at selection time, not submission time
			if (hasFileUpload && fileUpload.fields && fileUpload.fields.length > 0) {
				// Files are already processed and stored in form state
				// Just need to extract them for final submission
				const attachments = [];

				for (const { field, prefix } of fileUpload.fields) {
					const fieldValue = data[field];
					if (fieldValue) {
						if (fieldValue instanceof File) {
							// If still a File object, process it now (fallback)
							try {
								const compressedFile = await fileUploadHook.compressImageFile(fieldValue);
								const base64File = await fileToBase64(compressedFile);
								if (base64File) {
									attachments.push({
										filename: `${prefix}.${fieldValue.name.split('.').pop()}`,
										data: base64File
									});
								}
							} catch (error) {
								console.error(`File processing failed for ${field}:`, error);
								throw error;
							}
						} else if (fieldValue.base64Data) {
							// File already processed, use stored data
							attachments.push({
								filename: fieldValue.filename,
								data: fieldValue.base64Data
							});
						}
					}
				}

				if (attachments.length > 0) {
					processedData = { ...data, attachments };
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
					clearFileErrors: fileUploadHook.clearFileErrors,
					compressImageFile: fileUploadHook.compressImageFile // Add compression function
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
			formType, // Add form type for debugging
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

		// File upload methods (only if enabled)
		...(hasFileUpload && {
			fileUpload: {
				isProcessing: fileUploadHook.isProcessing,
				processingProgress: fileUploadHook.processingProgress,
				fileErrors: fileUploadHook.fileErrors,
				validateFile: fileUploadHook.validateFile,
				clearFileErrors: fileUploadHook.clearFileErrors,
				compressImageFile: fileUploadHook.compressImageFile
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