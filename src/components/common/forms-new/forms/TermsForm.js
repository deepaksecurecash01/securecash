// /components/forms/TermsForm.js
"use client";
import React, { useEffect } from "react";
import
{
    FaUser,
    FaBriefcase,
    FaEnvelope,
    FaCalendarAlt,
    FaUsers,
    FaIdCard,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatBirthdayForAPI } from '@/utils/formHelpers';
import TermsFormSchema, { TERMS_DEFAULT_VALUES } from '@/zod/TermsFormSchema';
import { useRouter } from "next/navigation";


const TermsForm = ({ setName, setPosition, setOrganisation, setAbn }) =>
{
    const router = useRouter();
    // Enhanced form manager with complete focus integration
    const formManager = useFormManager({
        schema: TermsFormSchema,
        defaultValues: TERMS_DEFAULT_VALUES,
        theme: 'dark',
        formType: 'terms',
        formId: 'Terms',
        onSuccess: (result, finalData) =>
        {
            console.log("Terms form submitted successfully!");
            // Redirect to /austrac on successful submission
            router.push("/austrac");
        },
        onError: (error) =>
        {
            console.error("Terms submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Format birthday as YYYY-MM-DD
            const birthdayFormatted = formatBirthdayForAPI(data.Birthdate);

            // Format date of acceptance
            const now = new Date();
            const dateOfAcceptance = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).replace(/(\d+)/, (match) =>
            {
                const day = parseInt(match);
                const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                    day === 2 || day === 22 ? 'nd' :
                        day === 3 || day === 23 ? 'rd' : 'th';
                return day + suffix;
            }) + ', ' + now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });

            // Format agreement commencement date as DD / MM / YYYY
            const agreementDate = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, ' / ');

            return {
                ...data,
                "Organisation Name": data.Organisation,
                "Organisation Role": data.Position,
                "Organisation ABN": data.ABN,
                "Full Name": data.Name,
                "Birthday": birthdayFormatted,
                "Email": data.Email,
                "formType": "terms",
                "Date of Acceptance": dateOfAcceptance,
                "Agreement Commencement": `**THIS AGREEMENT COMMENCES ON THE:** ${agreementDate} and will be ongoing unless either party terminates this Agreement in accordance with the termination provisions herein ("Expiry").`,
            };
        }
    });

    // Watch form values for parent component props (unchanged functionality)
    const nameValue = formManager.watch("Name");
    const positionValue = formManager.watch("Position");
    const organisationValue = formManager.watch("Organisation");
    const abnValue = formManager.watch("ABN");

    // Pass values to parent component props (exact same as before)
    useEffect(() =>
    {
        if (nameValue && setName) setName(nameValue);
    }, [nameValue, setName]);

    useEffect(() =>
    {
        if (positionValue && setPosition) setPosition(positionValue);
    }, [positionValue, setPosition]);

    useEffect(() =>
    {
        if (organisationValue && setOrganisation) setOrganisation(organisationValue);
    }, [organisationValue, setOrganisation]);

    useEffect(() =>
    {
        if (abnValue && setAbn) setAbn(abnValue);
    }, [abnValue, setAbn]);

    // Field configurations - enhanced with better debugging
    const inputFields = [
        {
            name: "Name",
            type: "text",
            label: "What is your full name?",
            placeholder: "Enter your full name",
            Icon: FaUser,
        },
        {
            name: "Position",
            type: "text",
            label: "What is your position in the organisation?",
            placeholder: "Enter your position in the organisation",
            Icon: FaBriefcase,
        },

        {
            name: "Email",
            type: "email",
            label: "What is your email address?",
            placeholder: "Enter your email address",
            Icon: FaEnvelope,
        },
        {
            name: "Birthdate",
            type: "date",
            label: "What is your date of birth?",
            dayPlaceholder: "DD",
            monthPlaceholder: "MM",
            yearPlaceholder: "YYYY",
            format: "dd/MM/yyyy",
            Icon: FaCalendarAlt,
        },
        {
            name: "Organisation",
            type: "text",
            label: "What is your organisation's name?",
            placeholder: "Enter your organisation's name",
            Icon: FaUsers,
        },
        {
            name: "ABN",
            type: "abn",
            label: "What is your organisation's ABN number?",
            placeholder: "Enter your organisation's ABN number (11 digits)",
            Icon: FaIdCard,
        },
    ];

    // Debug logging for troubleshooting (can be removed in production)
    useEffect(() =>
    {
        if (process.env.NODE_ENV === 'development') {
            const debugInfo = formManager.getDebugInfo();
            if (debugInfo.currentFocus || Object.keys(debugInfo.errors).length > 0) {
                console.log('🐛 TermsForm Debug Info:', debugInfo);
            }
        }
    }, [formManager.currentFocusField, formManager.errors]);

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center`}>
            <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-16 rounded-[6px] bg-[#1a1a1a]">
                <form
                    className="text-center"
                    data-formid="Terms"
                    onSubmit={formManager.handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div className="form-page terms">
                        {/* Header - exact same as before */}
                        <h3

                            className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px] font-montserrat"
                        >
                            Service Agreement
                        </h3>

                        <hr
                            className="w-[100px] mx-auto mt-2.5 mb-4 bg-primary"
                        />

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

                            {/* FIXED: All fields now use proper focus management */}
                            {inputFields.map((field) => (
                                <div key={field.name} className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="dark"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Button section - exact same styling as before */}
                    <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
                        <div className="button-section relative">
                            <button
                                type="submit"
                                disabled={formManager.isSubmitting}
                                className={`nextBtn ${formManager.isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                    } text-white border-none py-[15px] 768px:px-0 text-[16px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {formManager.isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin mr-2" />
                                        Submitting, please wait...
                                    </div>
                                ) : formManager.isSubmitted ? (
                                    <div className="flex items-center justify-center">
                                        <FaCheckCircle className="text-white mr-2" />
                                        Thank you, we received your submission!
                                    </div>
                                ) : (
                                    "I agree with the above Terms & Conditions"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TermsForm;