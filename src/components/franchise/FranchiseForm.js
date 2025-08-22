"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
    {
        FaUser,
        FaPhone,
        FaEnvelope,
        FaHome,
        FaMapMarkerAlt,
        FaInfoCircle,
        FaQuestionCircle,
        FaSpinner,
        FaCheckCircle,
    } from "react-icons/fa";
import { PopupModal } from "react-calendly";

import Typography from "@/components/common/Typography";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import FranchiseFormSchema, { FRANCHISE_DEFAULT_VALUES } from '@/zod/FranchiseFormSchema';
import WarningPopup from "@/components/common/forms/elements/WarningPopup";

const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    textarea = false,
    ref,
    autoComplete,
    onFocus,
    onBlur,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () =>
    {
        setCurrentErrorField(name);
        setIsFocused(true);
        if (onFocus) onFocus();
    };

    const handleBlur = () =>
    {
        setCurrentErrorField(null);
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                            }`}
                        name={name}
                        ref={ref}
                        {...register(name)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        rows="3"
                        autoComplete={autoComplete || "new-password"}
                        required
                    ></textarea>
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
                            ref={ref}
                            {...register(name)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={placeholder}
                            autoComplete={autoComplete || "new-password"}
                            required
                        />
                        <Icon
                            className={`min-w-[50px] text-[18px] ${hasError
                                ? "text-red-500"
                                : isFocused
                                    ? "text-primary"
                                    : "text-[#999]"
                                }`}
                        />
                    </>
                )}

                {errors[name] && (
                    <WarningPopup
                        error={errors[name]?.message}
                        isFirstError={currentErrorField === name}
                    />
                )}
            </div>
        </div>
    );
};

const FranchiseForm = () =>
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    // Create field references for focus management
    const fieldRefs = {
        FullName: useRef(null),
        Phone: useRef(null),
        Email: useRef(null),
        Address: useRef(null),
        InterestedArea: useRef(null),
        ReasonForInterest: useRef(null),
        ReferralSource: useRef(null),
    };

    // Initialize form hooks
    const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs);

    const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
        formType: 'franchise',
        formId: 'Franchise',
        onSuccess: (result, finalData) =>
        {
            console.log("Franchise form submitted successfully!");

            // Store form data for Calendly prefill
            setFormData(finalData);
            setIsFormSubmitted(true);
            setIsCalendlyOpen(true);
        },
        onError: (error) =>
        {
            console.error("Franchise submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Return data as expected by the API
            return {
                ...data,
                formType: "franchise",
            };
        }
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FranchiseFormSchema),
        defaultValues: FRANCHISE_DEFAULT_VALUES,
    });

    const inputFields = [
        {
            label: "Full Name",
            name: "FullName",
            placeholder: "Enter your full name",
            Icon: FaUser,
            ref: fieldRefs.FullName,
        },
        {
            label: "Phone Number",
            name: "Phone",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
            ref: fieldRefs.Phone,
        },
        {
            label: "Email Address",
            name: "Email",
            type: "email",
            placeholder: "Your email address",
            Icon: FaEnvelope,
            ref: fieldRefs.Email,
        },
        {
            label: "Address",
            name: "Address",
            placeholder: "Enter your address",
            Icon: FaHome,
            ref: fieldRefs.Address,
        },
        {
            label: "Territory/Area/Suburb of Interest",
            name: "InterestedArea",
            placeholder: "What territory/area/suburb are you interested in?",
            Icon: FaMapMarkerAlt,
            ref: fieldRefs.InterestedArea,
        },
        {
            label: "What interests you in a SecureCash Franchise?",
            name: "ReasonForInterest",
            placeholder: "Briefly tell us why you're interested in a SecureCash franchise",
            Icon: FaInfoCircle,
            textarea: true,
            ref: fieldRefs.ReasonForInterest,
        },
        {
            label: "How did you hear about this Opportunity?",
            name: "ReferralSource",
            placeholder: "E.g., Google, Social Media, Referral",
            Icon: FaQuestionCircle,
            ref: fieldRefs.ReferralSource,
        },
    ];

    // Main form submission handler
    const handleFormSubmit = async (data) =>
    {
        // Validate all fields first
        if (!handleFieldErrors(errors)) {
            return; // Stop if validation fails
        }

        console.log("All validations passed, proceeding with submission...");
        await handleSubmission(data);
    };

    const renderFormFields = () => (
        <>
            {/* Bot field (honeypot) - hidden */}
            <input
                type="text"
                {...register("BotField")}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
            />

            {inputFields.map((field, index) => (
                <div key={index} className="relative">
                    <InputField
                        {...field}
                        register={register}
                        errors={errors}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                        ref={field.ref}
                        autoComplete="new-password"
                        onFocus={() => setCurrentErrorField(field.name)}
                        onBlur={() => setCurrentErrorField(null)}
                        labelClassName="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0"
                    />
                </div>
            ))}

            <div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left px-2 768px:px-0">
                After submitting the form, please pick a time from the popup
                screen for a video meeting.
            </div>
        </>
    );

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Franchise"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                autoComplete="off"
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    {renderFormFields()}
                </div>

                {isFormSubmitted && (
                    <div
                        className="form-submitted-message text-center py-4 absolute h-full top-0 flex justify-center items-center bg-[#f1f1f1] z-10"
                        style={{ background: "#f1f1f1" }}
                    >
                        <div className="480px:w-[90%] mx-auto">
                            <Typography
                                as="h3"
                                fontFamily="montserrat"
                                className="text-[32px] text-primary leading-[1.4em] text-center font-bold mb-[16px]"
                            >
                                Thank You for Your Interest!
                            </Typography>

                            <p className="mb-6">
                                Your form has been submitted successfully. The meeting scheduler
                                should appear shortly.
                            </p>
                        </div>
                    </div>
                )}

                {/* Display submission error if any */}
                {submissionError && (
                    <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                        <strong>Submission Error:</strong> {submissionError}
                    </div>
                )}

                <div className="button-controls-container w-[80%] mx-auto mt-7">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting... Please Wait.
                                </div>
                            ) : isSubmitted ? (
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="text-white mr-2" />
                                    Thank you, form submitted successfully!
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Calendly Modal Component */}
            {formData && (
                <PopupModal
                    url={calendlyURL}
                    prefill={{
                        name: formData.FullName || "",
                        email: formData.Email || "",
                        customAnswers: {
                            a1: formData.InterestedArea || "",
                        },
                    }}
                    onModalClose={() =>
                    {
                        setIsCalendlyOpen(false);
                        setIsFormSubmitted(false);
                    }}
                    open={isCalendlyOpen}
                    rootElement={document.getElementById("root") || document.body}
                />
            )}
        </div>
    );
};

export default FranchiseForm;