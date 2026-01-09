"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
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
import UniversalFormField from "@/components/common/forms-new/forms/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatSubmissionDate } from '@/utils/formHelpers';
import FranchiseFormSchema, { FRANCHISE_DEFAULT_VALUES } from '@/zod/FranchiseFormSchema';

const PopupModal = dynamic(
    () => import('react-calendly').then(mod => mod.PopupModal),
    {
        ssr: false,
        loading: () => null
    }
);

const CALENDLY_URL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

const INPUT_FIELDS = [
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

const SuccessMessage = ({ userName }) => (
    <div
        className="form-submitted-message text-center py-4 absolute h-full top-0 flex flex-col justify-center items-center bg-[#f1f1f1] z-10"
        style={{ background: "#f1f1f1" }}
    >
        <div className="480px:w-[90%] mx-auto 992px:h-[75%]">
            <FaCheckCircle className="text-[#4bb543] text-[96px] mx-auto" />

            <h3 className="text-primary font-montserrat text-center capitalize pb-2 text-[32px] leading-[30px] mt-8 font-bold">
                Thank you{userName && ` ${userName}`}!
            </h3>

            <hr className="mt-4 mb-6 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />

            <p className="mb-6">
                Your form has been submitted successfully. The meeting scheduler should appear shortly.
            </p>
        </div>
    </div>
);

const FranchiseForm = ({ className }) =>
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [submittedFormData, setSubmittedFormData] = useState(null);

    const formManager = useFormManager({
        schema: FranchiseFormSchema,
        defaultValues: FRANCHISE_DEFAULT_VALUES,
        theme: 'light',
        formType: 'franchise',
        formId: 'Franchise',
        onSuccess: (result, finalData) =>
        {
            setSubmittedFormData(finalData);
            setIsFormSubmitted(true);
            setIsCalendlyOpen(true);
        },
        prepareData: async (data) => ({
            ...data,
            formType: "franchise",
            timestamp: new Date().toISOString(),
            formId: "Franchise",
            submissionId: `franchise_${Date.now()}`,
            dateOfSubmission: formatSubmissionDate(),
        })
    });

    const referralSource = formManager.watch('ReferralSource');
    const showOtherField = referralSource === 'Other';
    const userName = formManager.getValues().FullName || "";

    useEffect(() =>
    {
        if (!showOtherField) {
            formManager.setValue('ReferralSourceOther', '');
        }
    }, [showOtherField, formManager]);

    useEffect(() =>
    {
        return () =>
        {
            setIsFormSubmitted(false);
            setIsCalendlyOpen(false);
            setSubmittedFormData(null);
        };
    }, []);

    const handleCalendlyClose = () =>
    {
        setIsCalendlyOpen(false);
        setIsFormSubmitted(false);
        formManager.resetForm();
    };

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
                            <input
                                type="text"
                                name="BotField"
                                hidden={true}
                                control={formManager.control}
                                style={{ display: "none" }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {INPUT_FIELDS.map((field) => (
                                <div key={field.name} className="relative flex flex-col h-full justify-between">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="light"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}

                            {showOtherField && (
                                <div className="relative flex flex-col h-full justify-between">
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

                            <div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left px-2 768px:px-0">
                                After submitting the form, please pick a time from the popup screen for a video meeting.
                            </div>
                        </div>
                    </div>

                    {isFormSubmitted && <SuccessMessage userName={userName} />}

                    {formManager.submissionError && (
                        <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                            <strong>Submission Error:</strong> {formManager.submissionError}
                        </div>
                    )}

                    <div className="button-controls-container w-[80%] mx-auto mt-7">
                        <div className="button-section relative">
                            <button
                                type="submit"
                                disabled={formManager.isSubmitting}
                                className={`nextBtn ${formManager.isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'} text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
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

            {submittedFormData && isCalendlyOpen && (
                <PopupModal
                    url={CALENDLY_URL}
                    prefill={{
                        name: submittedFormData.FullName || "",
                        email: submittedFormData.Email || "",
                        customAnswers: {
                            a1: submittedFormData.InterestedArea || "",
                        },
                    }}
                    onModalClose={handleCalendlyClose}
                    open={isCalendlyOpen}
                    rootElement={document.getElementById("root") || document.body}
                />
            )}
        </div>
    );
};

export default FranchiseForm;