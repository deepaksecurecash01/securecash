// /components/forms/ContactForm.js
"use client";
import React, { useEffect } from "react";
import
{
    FaUser,
    FaPhone,
    FaEnvelope,
    FaInfoCircle,
    FaBuilding,
    FaUsers,
    FaClock,
    FaMapMarkerAlt,
    FaSpinner,
    FaCheckCircle,
    FaCalendarAlt,
} from "react-icons/fa";

import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatSubmissionDate, formatDateForAPI } from '@/utils/formHelpers';
import ContactFormSchema, { CONTACT_DEFAULT_VALUES, formConfig } from '@/zod/ContactFormSchema';
import Link from "next/link";

const ContactForm = ({ className }) =>
{

    // Enhanced form manager with complete focus integration
    const formManager = useFormManager({
        schema: ContactFormSchema,
        defaultValues: CONTACT_DEFAULT_VALUES,
        theme: 'light',
        formType: 'contact',
        formId: 'Contact',
        onSuccess: (result, finalData) =>
        {
            console.log("Contact form submitted successfully!");

        },
        onError: (error) =>
        {
            console.error("Contact submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Format date of submission
            const dateOfSubmission = formatSubmissionDate();

            // Format callback date if present
            let processedData = {
                ...data,
                "formType": "contact",
                timestamp: new Date().toISOString(),
                formId: "Contact",
                submissionId: `contact_${Date.now()}`,
                dateOfSubmission: dateOfSubmission,
            };

            // Format CallbackDate if it exists
            if (data.CallbackDate) {
                processedData.CallbackDate = formatDateForAPI(data.CallbackDate);
            }

            return processedData;
        }
    });

    // Watch form values for conditional logic
    const needsCallback = formManager.watch("ChkCallBack");
    const selectedCallbackDate = formManager.watch("CallbackDate");

    // Extract form config
    const { departments, callBackTimes, states } = formConfig;

    // Basic input fields configuration
    const inputFields = [
        {
            name: "FullName",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            Icon: FaUser,
        },
        {
            name: "Organisation",
            type: "text",
            label: "Organisation Name",
            placeholder: "Enter your organisation name",
            Icon: FaUsers,
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
    ];

    const userName = formManager.getValues().FullName || "";


    // Debug logging for troubleshooting
    useEffect(() =>
    {
        if (process.env.NODE_ENV === 'development') {
            const debugInfo = formManager.getDebugInfo();
            if (debugInfo.currentFocus || Object.keys(debugInfo.errors).length > 0) {
                console.log('🐛 ContactForm Debug Info:', debugInfo);
            }
        }
    }, [formManager.currentFocusField, formManager.errors]);

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <div className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative">
                <form
                    className="text-center"
                    data-formid="Contact"
                    onSubmit={formManager.handleSubmit}
                    noValidate
                    autoComplete="off"
                    style={{ background: "#f1f1f1" }}
                >
                    <div className="form-page contact">
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

                            {/* Department Selection - at the top */}
                            <div className="relative">
                                <UniversalFormField
                                    {...formManager.getFieldProps({
                                        name: "Department",
                                        type: "select",
                                        label: "Which Department?",
                                        Icon: FaBuilding,
                                        options: departments,
                                    })}
                                    theme="light"
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* Basic input fields */}
                            {inputFields.map((field) => (
                                <div key={field.name} className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="light"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}

                            {/* Callback checkbox */}
                            <div className="relative mt-6">
                                <UniversalFormField
                                    {...formManager.getFieldProps({
                                        name: "ChkCallBack",
                                        type: "checkbox-group",
                                        label: "",
                                        options: [
                                            {
                                                label: "I would like to be called back by a representative.",
                                                value: "Yes, please."
                                            }
                                        ],
                                        variant: "agreement"
                                    })}
                                    theme="light"
                                />
                            </div>


                            {/* Date picker - conditional on callback */}
                            <div className="relative">
                                <UniversalFormField
                                    {...formManager.getFieldProps({
                                        name: "CallbackDate",
                                        type: "date",
                                        label: "Pick a time that suits you and we'll call you back!",
                                        dayPlaceholder: "DD",
                                        monthPlaceholder: "MM",
                                        yearPlaceholder: "YYYY",
                                        format: "dd/MM/yyyy",
                                        disabled: !needsCallback || needsCallback.length === 0,
                                    })}
                                    theme="light"

                                />
                            </div>

                            {/* Time and State Selection Boxes inline */}
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <div className="w-full md:w-1/2 relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps({
                                            name: "CallbackTime",
                                            type: "select",
                                            label: "What is the best time?",
                                            Icon: FaClock,
                                            options: callBackTimes,
                                            disabled: !needsCallback || needsCallback.length === 0,
                                        })}
                                        theme="light"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps({
                                            name: "CallbackState",
                                            type: "select",
                                            label: "Which state are you from?",
                                            Icon: FaMapMarkerAlt,
                                            options: states,
                                            disabled: !needsCallback || needsCallback.length === 0,
                                        })}
                                        theme="light"
                                    />
                                </div>
                            </div>

                            {/* Message textarea - at the end */}
                            <div className="relative">
                                <UniversalFormField
                                    {...formManager.getFieldProps({
                                        name: "Message",
                                        type: "textarea",
                                        label: "How can we help?",
                                        placeholder: "Briefly let us know how we can help you?",
                                        rows: 3,
                                    })}
                                    theme="light"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Form submitted overlay */}
                    {formManager.isSubmitted && (
                        <div
                            className="form-submitted-message text-center py-4 absolute h-full top-0 flex  flex-col justify-center items-center bg-[#f1f1f1] z-10 w-[90%]"
                            style={{ background: "#f1f1f1" }}
                        >

                            <div className="480px:w-[90%] mx-auto 992px:h-[75%]">
                                <FaCheckCircle className="text-[#4bb543] text-[96px] mx-auto" />

                                <h3

                                    className=" text-primary font-montserrat text-center capitalize pb-2 text-[32px] leading-[30px] mt-8 font-bold"
                                >
                                    Thank you{userName && ` ${userName}`}!
                                </h3>
                                <h5 className=" font-montserrat text-center capitalize pb-2 text-[16px]">
                                    Your message has been sent successfully.
                                </h5>
                                <hr className="mt-4 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />

                                <div className="quote-ty-note">
                                    <p
                                      
                                        className=" font-normal text-center pb-4 text-[16px] mt-8 font-montserrat"
                                    >
                                        We&apos;ve received your inquiry and will get back to you shortly.
                                    </p>
                                    <p
                                      
                                        className=" font-normal text-center pb-4 text-[16px] font-montserrat"
                                    >
                                        In the meantime, feel free to explore more about our services:
                                    </p>
                                    <div className="ty-note-list-wrap mt-2">
                                        <ul className="list-none p-0 m-0 flex flex-col justify-center items-center gap-1 font-medium">
                                            <li className="cash-collection mb-2 flex items-center">
                                                <img
                                                    src="/images/contentpageicons/cashcollection.png"
                                                    alt="Cash Collection"
                                                    className="inline-block mr-2 w-[30px]"
                                                />
                                                <Link
                                                    href="/services/cash-collection/"
                                                    className="text-[#c6a54b] hover:underline"
                                                >
                                                    <p className="m-0">Cash Collections</p>
                                                </Link>
                                            </li>
                                            <li className="cash-delivery mb-2 flex items-center">
                                                <img
                                                    src="/images/contentpageicons/cashdelivery.png"
                                                    alt="Cash Delivery"
                                                    className="inline-block mr-2 w-[30px]"
                                                />
                                                <Link
                                                    href="/services/cash-delivery/"
                                                    className="text-[#c6a54b] hover:underline"
                                                >
                                                    <p className="m-0">Cash Deliveries</p>
                                                </Link>
                                            </li>
                                            <li className="cash-counting mb-2 flex items-center">
                                                <img
                                                    src="/images/contentpageicons/cashcounting.png"
                                                    alt="Cash Counting"
                                                    className="inline-block mr-2 w-[30px]"
                                                />
                                                <Link
                                                    href="/services/cash-counting/"
                                                    className="text-[#c6a54b] hover:underline"
                                                >
                                                    <p className="m-0">Cash Counting</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="button-controls-container w-[80%] mx-auto mt-8">
                                    <button
                                        type="button"
                                        onClick={formManager.resetForm}
                                        className="bg-[#c6a54b] text-white border-none py-[15px] font-medium cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-[15px] p-2.5 shadow-none font-montserrat"
                                    >
                                        Send Another Message
                                    </button>
                                </div>

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
                                        Sending Message... Please Wait.
                                    </div>
                                ) : formManager.isSubmitted ? (
                                    <div className="flex items-center justify-center">
                                        <FaCheckCircle className="text-white mr-2" />
                                        Thank you, we received your message!
                                    </div>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;