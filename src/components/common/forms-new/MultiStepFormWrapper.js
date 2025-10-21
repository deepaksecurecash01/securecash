// /components/common/forms-new/MultiStepFormWrapper.js
"use client";
import React from "react";
import { FaSpinner, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import UniversalFormField from "./core/UniversalFormField";
import CheckboxGroupInput from "./core/CheckboxGroupInput";
import { useMultiStepCoordinator } from "@/hooks/useMultiStepCoordinator";
import { Controller } from "react-hook-form";

/**
 * MultiStepFormWrapper - Wrapper component for multi-step forms
 * 
 * Handles step rendering, navigation, and form submission using the 
 * useMultiStepCoordinator hook while maintaining the foundation architecture.
 */
const MultiStepFormWrapper = ({
    // Step configuration
    steps,
    stepConfigs,

    // Form configuration  
    formType,
    formId,
    onSuccess,
    onError,
    prepareData,

    // Multi-step options
    conditionalSteps = false,
    initialStepData = {},

    // UI customization
    theme = 'dark',
    className = "",
    showProgress = true,
    showBackButton = true,

    // Custom renderers
    renderStepHeader = null,
    renderStepContent = null,
    renderCustomButton = null,

    // Callbacks
    onStepTransition = null,
}) =>
{

    // Initialize multi-step coordinator
    const coordinator = useMultiStepCoordinator({
        steps,
        stepConfigs,
        formType,
        formId,
        onSuccess,
        onError,
        prepareData,
        conditionalSteps,
        initialStepData,
        onStepTransition,
        theme
    });

    // Get current step configuration
    const currentStepConfig = stepConfigs[coordinator.getCurrentStepId()] || {};

    // Default step header renderer
    const defaultRenderStepHeader = (stepConfig, progress) =>
    {
        if (!stepConfig.title) return null;

        return (
            <>
                <h3
                   
                    className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px] font-montserrat"
                >
                    {stepConfig.title}
                </h3>

                {stepConfig.subtitle && (
                    <p

                        className="text-white font-normal text-center capitalize pb-4 text-[16px] font-montserrat"
                    >
                        {stepConfig.subtitle}
                    </p>
                )}

                <hr
                    className="mt-2.5 mb-4 h-[4px] rounded-[5px] border-0  mx-auto bg-primary"
                />
            </>
        );
    };

    // Default step content renderer with special handling for checkbox-group
    const defaultRenderStepContent = (stepConfig, coordinator) =>
    {
        const fields = stepConfig.fields || [];

        return (
            <div className="form-tab 480px:w-[90%] mx-auto">
                {fields.map((field) =>
                {
                    // Special handling for checkbox-group fields
                    if (field.type === 'checkbox-group') {
                        return (
                            <div key={field.name} className="text-left relative">
                                <label className="text-white text-base inline-block mt-4 mb-2">
                                    {field.label}
                                </label>
                                <div className="control-wrapper relative flex flex-row justify-around items-center w-full mt-2">
                                    <Controller
                                        name={field.name}
                                        control={coordinator.control}
                                        render={({ field: controllerField, fieldState }) => (
                                            <CheckboxGroupInput
                                                value={controllerField.value || []}
                                                onChange={controllerField.onChange}
                                                onFocus={() => coordinator.handleFieldFocus(field.name)}
                                                onBlur={() => coordinator.handleFieldBlur()}
                                                options={field.options}
                                                name={field.name}
                                                theme={theme}
                                                hasError={!!fieldState.error}
                                                isFocused={coordinator.currentFocusField === field.name}
                                            />
                                        )}
                                    />
                                </div>
                                <Controller
                                    name={field.name}
                                    control={coordinator.control}
                                    render={({ fieldState }) => (
                                        fieldState?.error && coordinator.currentFocusField === field.name && (
                                            <div className="absolute backdrop-blur-lg py-1 px-2 w-auto rounded-md text-[14px] flex items-center bg-white/95 text-black shadow-sm z-10 top-[100px] left-[70px]">
                                                <span className="absolute left-2 transform translate-x-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></span>
                                                <span className="bg-red-500 p-1 rounded-sm mr-2">
                                                    <span className="text-[10px] text-white">!</span>
                                                </span>
                                                {fieldState.error?.message}
                                            </div>
                                        )
                                    )}
                                />
                            </div>
                        );
                    }

                    // Use UniversalFormField for all other field types
                    return (
                        <div key={field.name} className="relative">
                            <UniversalFormField
                                {...coordinator.getFieldProps(field)}
                                theme={theme}
                                autoComplete="new-password"
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    // Handle form submission
    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();

        const result = await coordinator.handleStepSubmit();

        // Additional handling based on result if needed
        if (result && result.isFinalSubmission) {
            console.log('Multi-step form completed successfully!');
        }
    };

    // Determine button text and state
    const getButtonInfo = () =>
    {
        if (coordinator.isSubmitting || coordinator.isTransitioning) {
            return {
                text: "Processing...",
                icon: FaSpinner,
                disabled: true,
                className: "bg-[#c6a54b] opacity-75"
            };
        }

        if (coordinator.isSubmitted) {
            return {
                text: "Thank you, we received your submission!",
                icon: FaCheckCircle,
                disabled: true,
                className: "bg-[#4bb543]"
            };
        }

        const buttonText = coordinator.isLastStep ?
            (currentStepConfig.submitText || "Submit") :
            (currentStepConfig.nextText || "Next");

        return {
            text: buttonText,
            icon: null,
            disabled: !coordinator.canProceedToNext(),
            className: "bg-[#c6a54b] hover:opacity-80"
        };
    };

    // Progress indicator
    const renderProgress = () =>
    {
        if (!showProgress) return null;

        const progress = coordinator.getStepProgress();

        return (
            <div className="progress-indicator mb-4">
                <div className="flex justify-between items-center text-white text-sm mb-2">
                    <span>Step {progress.current} of {progress.total}</span>
                    <span>{progress.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.percentage}%` }}
                    />
                </div>
            </div>
        );
    };

    // Back button
    const renderBackButton = () =>
    {
        if (!showBackButton || coordinator.isFirstStep) return null;

        return (
            <button
                type="button"
                onClick={coordinator.goToPreviousStep}
                disabled={coordinator.isTransitioning || coordinator.isSubmitting}
                className="flex items-center text-white/70 hover:text-white transition-colors duration-200 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaArrowLeft className="mr-2" />
                Back
            </button>
        );
    };

    const buttonInfo = getButtonInfo();

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
            <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-16 rounded-[6px] bg-[#1a1a1a]">

                {/* Progress indicator */}
                {renderProgress()}

                {/* Back button */}
                {renderBackButton()}

                <form
                    className="text-center"
                    data-formid={`${formId}_${coordinator.getCurrentStepId()}`}
                    onSubmit={handleFormSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div className={`form-page ${coordinator.getCurrentStepId()}`}>

                        {/* Step header */}
                        {renderStepHeader ?
                            renderStepHeader(currentStepConfig, coordinator.getStepProgress()) :
                            defaultRenderStepHeader(currentStepConfig, coordinator.getStepProgress())
                        }

                        {/* Bot field (honeypot) - hidden field for spam protection */}
                        <input
                            type="text"
                            name="BotField"
                            control={coordinator.control}
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {/* Step content */}
                        {renderStepContent ?
                            renderStepContent(currentStepConfig, coordinator) :
                            defaultRenderStepContent(currentStepConfig, coordinator)
                        }

                    </div>

                    {/* Display submission error */}
                    {coordinator.submissionError && (
                        <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded">
                            {coordinator.submissionError}
                        </div>
                    )}

                    {/* Button section */}
                    <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
                        <div className="button-section relative">
                            {renderCustomButton ?
                                renderCustomButton(buttonInfo, coordinator) :
                                (
                                    <button
                                        type="submit"
                                        disabled={buttonInfo.disabled}
                                        className={`nextBtn ${buttonInfo.className} text-white border-none py-[15px] 768px:px-0 text-[16px] cursor-pointer w-full rounded-[40px] outline-none appearance-none p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {buttonInfo.icon && (
                                            <div className="flex items-center justify-center">
                                                <buttonInfo.icon className={buttonInfo.icon === FaSpinner ? "animate-spin mr-2" : "mr-2"} />
                                                {buttonInfo.text}
                                            </div>
                                        ) || buttonInfo.text}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MultiStepFormWrapper;