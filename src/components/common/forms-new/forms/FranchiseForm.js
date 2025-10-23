// /components/forms/FranchiseForm.js
"use client";
import React, { useEffect, useState } from "react";
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

import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatSubmissionDate } from '@/utils/formHelpers';
import FranchiseFormSchema, { FRANCHISE_DEFAULT_VALUES } from '@/zod/FranchiseFormSchema';

/**
 * Enhanced FranchiseForm - Converted to New Foundation Architecture
 * 
 * IMPROVEMENTS APPLIED:
 * - Unified form manager with complete focus integration
 * - Controller-based architecture (no register usage)
 * - Enhanced field error handling
 * - Clean submission pipeline with Calendly integration
 * - Consistent styling with light theme
 * - Maintained exact visual styling and container classes
 */
const FranchiseForm = ({ className }) =>
{
    // State for Calendly integration
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [submittedFormData, setSubmittedFormData] = useState(null);

    const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    // Enhanced form manager with complete focus integration and Calendly support
    const formManager = useFormManager({
        schema: FranchiseFormSchema,
        defaultValues: FRANCHISE_DEFAULT_VALUES,
        theme: 'light',
        formType: 'franchise',
        formId: 'Franchise',
        onSuccess: (result, finalData) =>
        {
            console.log("Franchise form submitted successfully!");

            // Store form data for Calendly prefill
            // setSubmittedFormData(finalData);
            // setIsFormSubmitted(true);
            // setIsCalendlyOpen(true);
        },
        onError: (error) =>
        {
            console.error("Franchise submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Format date of submission
            const dateOfSubmission = formatSubmissionDate();

            return {
                ...data,
                "formType": "franchise",
                timestamp: new Date().toISOString(),
                formId: "Franchise",
                submissionId: `franchise_${Date.now()}`,
                dateOfSubmission: dateOfSubmission,
            };
        }
    });

    // Watch the ReferralSource field to determine if "Other" is selected
    const referralSource = formManager.watch('ReferralSource');
    const showOtherField = referralSource === 'Other';

    // Clear the "Other" field when user changes away from "Other"
    useEffect(() =>
    {
        if (!showOtherField) {
            formManager.setValue('ReferralSourceOther', '');
        }
    }, [showOtherField, formManager]);

    // Field configurations
    const inputFields = [
        {
            name: "FullName",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            Icon: FaUser,
        },
        {
            name: "Phone",
            type: "tel",
            label: "Phone Number",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
        },
        {
            name: "Email",
            type: "email",
            label: "Email Address",
            placeholder: "Your email address",
            Icon: FaEnvelope,
        },
        {
            name: "Address",
            type: "text",
            label: "Address",
            placeholder: "Enter your address",
            Icon: FaHome,
        },
        {
            name: "InterestedArea",
            type: "text",
            label: "Territory/Area/Suburb of Interest",
            placeholder: "What territory/area/suburb are you interested in?",
            Icon: FaMapMarkerAlt,
        },
        {
            name: "ReasonForInterest",
            type: "textarea",
            label: "What interests you in a SecureCash Franchise?",
            placeholder: "Briefly tell us why you're interested in a SecureCash franchise",
            Icon: FaInfoCircle,
            rows: 3,
        },
        {
            name: "ReferralSource",
            type: "select",
            label: "Where did you hear about this Franchise Opportunity?",
            options: [
                { value: "", label: "Please Select" },
                { value: "Google", label: "Google" },
                { value: "Business For Sale", label: "Business For Sale" },
                { value: "Facebook", label: "Facebook" },
                { value: "Instagram", label: "Instagram" },
                { value: "LinkedIn", label: "LinkedIn" },
                { value: "Other Social Media", label: "Other Social Media" },
                { value: "Other", label: "Other" },
            ],
            Icon: FaQuestionCircle,
        },
    ];

    const userName = formManager.getValues().FullName || "";

    // Debug logging for troubleshooting
    useEffect(() =>
    {
        if (process.env.NODE_ENV === 'development') {
            const debugInfo = formManager.getDebugInfo();
            if (debugInfo.currentFocus || Object.keys(debugInfo.errors).length > 0) {
                console.log('🐛 FranchiseForm Debug Info:', debugInfo);
            }
        }
    }, [formManager.currentFocusField, formManager.errors]);

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <div className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative">
                <form
                    className="text-center"
                    data-formid="Franchise"
                    onSubmit={formManager.handleSubmit}
                    noValidate
                    autoComplete="off"
                    style={{ background: "#f1f1f1" }}
                >
                    <div className="form-page franchise">
                        <div className="form-tab 480px:w-[90%] mx-auto">
                            {/* Bot field (honeypot) - hidden field for spam protection */}
                            <input
                                type="text"
                                name="BotField"
                                hidden={true}
                                control={formManager.control}
                                style={{ display: "none" }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {/* All fields now use proper focus management */}
                            {inputFields.map((field) => (
                                <div key={field.name} className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="light"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}

                            {/* Conditional "Other" text field */}
                            {showOtherField && (
                                <div className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps({
                                            name: "ReferralSourceOther",
                                            type: "text",
                                            label: "Please specify",
                                            placeholder: "Please specify where you heard about us",
                                            Icon: FaQuestionCircle,
                                        })}
                                        theme="light"
                                        autoComplete="new-password"
                                    />
                                </div>
                            )}

                            {/* Information text */}
                            <div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left px-2 768px:px-0">
                                After submitting the form, please pick a time from the popup
                                screen for a video meeting.
                            </div>
                        </div>
                    </div>

                    {/* Form submitted overlay */}
                    {isFormSubmitted && (
                        <div
                            className="form-submitted-message text-center py-4 absolute h-full top-0 flex  flex-col justify-center items-center bg-[#f1f1f1] z-10 "
                            style={{ background: "#f1f1f1" }}
                        >

                            <div className="480px:w-[90%] mx-auto 992px:h-[75%]">
                                <FaCheckCircle className="text-[#4bb543] text-[96px] mx-auto" />

                                <h3

                                    className=" text-primary font-montserrat text-center capitalize pb-2 text-[32px] leading-[30px] mt-8 font-bold"
                                >
                                    Thank you{userName && ` ${userName}`}!
                                </h3>

                                <hr className="mt-4 mb-6 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />


                                <p className="mb-6">
                                    Your form has been submitted successfully. The meeting scheduler
                                    should appear shortly.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Display submission error if any */}
                    {formManager.submissionError && (
                        <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                            <strong>Submission Error:</strong> {formManager.submissionError}
                        </div>
                    )}

                    {/* Button section */}
                    <div className="button-controls-container w-[80%] mx-auto mt-7">
                        <div className="button-section relative">
                            <button
                                type="submit"
                                disabled={formManager.isSubmitting}
                                className={`nextBtn ${formManager.isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                    } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {formManager.isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin mr-2" />
                                        Submitting... Please Wait.
                                    </div>
                                ) : formManager.isSubmitted ? (
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
            </div>

            {/* Calendly Modal Component */}
            {submittedFormData && (
                <PopupModal
                    url={calendlyURL}
                    prefill={{
                        name: submittedFormData.FullName || "",
                        email: submittedFormData.Email || "",
                        customAnswers: {
                            a1: submittedFormData.InterestedArea || "",
                        },
                    }}
                    onModalClose={() =>
                    {
                        setIsCalendlyOpen(false);
                        setIsFormSubmitted(false);
                        formManager.resetForm();
                    }}
                    open={isCalendlyOpen}
                    rootElement={document.getElementById("root") || document.body}
                />
            )}
        </div>
    );
};

export default FranchiseForm;