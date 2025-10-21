"use client";
import React, { useEffect } from "react";
import
{
    FaBuilding,
    FaIdCard,
    FaGlobe,
    FaEnvelope,
    FaList,
    FaHome,
    FaMapMarkerAlt,
    FaUsers,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatSubmissionDate } from '@/utils/formHelpers';
import AustracFormSchema, { AUSTRAC_DEFAULT_VALUES } from '@/zod/AustracFormSchema';
import { useRouter } from "next/navigation";

const AustracForm = ({ className, setOrganisation, setABN }) =>
{
    const router = useRouter();

    const formManager = useFormManager({
        schema: AustracFormSchema,
        defaultValues: AUSTRAC_DEFAULT_VALUES,
        theme: 'dark',
        formType: 'austrac',
        formId: 'AUSTRAC',
        onSuccess: (result, finalData) =>
        {
            router.push("/site-info");
            //formManager.resetForm();
        },
        onError: (error) =>
        {
        },
        prepareData: async (data) =>
        {
            const dateOfSubmission = formatSubmissionDate();

            return {
                ...data,
                "formType": "austrac",
                timestamp: new Date().toISOString(),
                formId: "AUSTRAC",
                submissionId: `austrac_${Date.now()}`,
                dateOfSubmission: dateOfSubmission,
            };
        }
    });

    const organisationValue = formManager.watch("Organisation");
    const abnValue = formManager.watch("ABN");

    useEffect(() =>
    {
        if (organisationValue && setOrganisation) setOrganisation(organisationValue);
    }, [organisationValue, setOrganisation]);

    useEffect(() =>
    {
        if (abnValue && setABN) setABN(abnValue);
    }, [abnValue, setABN]);

    const inputFields = [
        {
            name: "Organisation",
            type: "text",
            label: "What is your organisation's name?",
            placeholder: "e.g. Smith Holdings Pty Ltd or South Park Primary School",
            Icon: FaBuilding,
        },
        {
            name: "ABN",
            type: "abn",
            label: "What is your organisation's ABN number?",
            placeholder: "as per the ASIC register. Eg 45 567 678 901",
            Icon: FaIdCard,
        },
        {
            name: "Website",
            type: "url",
            label: "What is the organisation's main website?",
            placeholder: "e.g. https://www.smithholdings.com.au",
            Icon: FaGlobe,
        },
        {
            name: "OrganisationEmail",
            type: "email",
            label: "What is the organisation's main email address?",
            placeholder: "e.g. admin@smithholdings.com.au",
            Icon: FaEnvelope,
        },
        {
            name: "OrganisationType",
            type: "select",
            label: "What is the organisation's structure type?",
            Icon: FaList,
            options: [
                { value: "", label: "Please Select" },
                { value: "Individual (Sole Trader)", label: "Individual (Sole Trader)" },
                { value: "Trustees & Beneficiaries", label: "Trustees & Beneficiaries" },
                { value: "Domestic Pty Ltd or Ltd Company", label: "Domestic Pty Ltd or Ltd Company" },
                { value: "Registered Foreign Company", label: "Registered Foreign Company" },
                { value: "Foreign Company Not Registered in Australia", label: "Foreign Company Not Registered in Australia" },
                { value: "Partners & Partnerships", label: "Partners & Partnerships" },
                { value: "Associations", label: "Associations" },
                { value: "Registered Co-Operatives", label: "Registered Co-Operatives" },
                { value: "Government Body", label: "Government Body" },
                { value: "School or Education Institute", label: "School or Education Institute" },
                { value: "Church or Religious Organisation", label: "Church or Religious Organisation" },
            ],
        },
        {
            name: "Address",
            type: "text",
            label: "What is the address of the head office?",
            placeholder: "e.g. 38 Main South Road Blacktown QLD 6987",
            Icon: FaHome,
        },
        {
            name: "State",
            type: "select",
            label: "In which state is the head office?",
            Icon: FaMapMarkerAlt,
            options: [
                { value: "", label: "Please Select" },
                { value: "NSW", label: "New South Wales" },
                { value: "VIC", label: "Victoria" },
                { value: "QLD", label: "Queensland" },
                { value: "WA", label: "Western Australia" },
                { value: "SA", label: "South Australia" },
                { value: "TAS", label: "Tasmania" },
                { value: "ACT", label: "Australian Capital Territory" },
                { value: "NT", label: "Northern Territory" },
                { value: "NZ", label: "New Zealand" },
            ],
        },
        {
            name: "Personnel",
            type: "textarea",
            label: "Please provide the full names & positions of all the key people within the organisation structure;",
            placeholder: "Directors, Chairperson, Secretary etc.",
            rows: 6,
            Icon: FaUsers,
        },
    ];

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
            <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]">
                <form
                    className="text-center"
                    data-formid="AUSTRAC"
                    onSubmit={formManager.handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div className="form-page austrac">
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

                    {formManager.submissionError && (
                        <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                            <strong>Submission Error:</strong> {formManager.submissionError}
                        </div>
                    )}

                    <div className="button-controls-container 480px:w-[80%] mx-auto mt-9 mb-2">
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
                                        Submitting... Please Wait.
                                    </div>
                                ) : formManager.isSubmitted ? (
                                    <div className="flex items-center justify-center">
                                        <FaCheckCircle className="text-white mr-2" />
                                        Thank you, we received your submission!
                                    </div>
                                ) : (
                                    "Continue to Next Step"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AustracForm;