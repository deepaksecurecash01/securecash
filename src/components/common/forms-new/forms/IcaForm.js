"use client";
import React from "react";
import { useFormManager } from '@/hooks/useFormManager';
import FormHeader from "./sections/FormHeader.js";
import PersonalDetailsSection from "./sections/PersonalDetailsSection.js";
import AgreementTermSection from "./sections/AgreementTermSection.js";
import DeedOfGuaranteeSection from "./sections/DeedOfGuaranteeSection.js";
import ExecutedAsDeedSection from "./sections/ExecutedAsDeedSection.js";
import LicensingInsuranceSection from "./sections/LicensingInsuranceSection.js";
import EDocketSystemSection from "./sections/EDocketSystemSection.js";
import DriversSection from "./sections/DriversSection.js";
import { IcaFormSchema, ICA_DEFAULT_VALUES } from "@/zod/IcaFormSchema";
import { FaCheckCircle } from "react-icons/fa";

const COMPANY_INFO = {
    name: "Office Central Pty Ltd",
    acn: "ACN 668 461 050",
    address: "30 Church Hill Road, Old Noarlunga SA 5168",
    email: "sales@securecash.com.au",
};

const FILE_UPLOAD_CONFIG = {
    enabled: true,
    fields: [
        { field: 'GovernmentID', prefix: 'Guarantors Government ID' },
        { field: 'WitnessID', prefix: 'Witness ID' },
        { field: 'SecurityLicense', prefix: 'Security or Masters License' },
        { field: 'CITInsurance', prefix: 'CIT Insurance' }
    ],
    compression: {
        targetSizeKB: 400,
        maxSizeMB: 5,
        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
    },
    concurrencyLimit: 2
};

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

const SubmitButton = ({ formManager }) => (
    <button
        type="submit"
        disabled={formManager.isSubmitting}
        className={`nextBtn ${formManager.isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"} text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        {formManager.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                Submitting... Please Wait.
            </span>
        ) : formManager.isSubmitted ? (
            <span className="flex items-center justify-center">
                <FaCheckCircle className="text-white mr-2" />
                Thank you. We received your submission!
            </span>
        ) : (
            "Click here to execute this deed & agreement"
        )}
    </button>
);

const ProcessingIndicator = ({ fileUpload }) =>
{
    if (!fileUpload?.isProcessing) return null;

    return (
        <div className="max-w-[1200px] mx-auto mt-4">
            <div className="text-blue-600 text-center mb-4 p-4 bg-blue-50 border border-blue-200 rounded mx-4">
                <strong>Processing Files:</strong> {fileUpload.processingProgress}%
            </div>
        </div>
    );
};

const IndependentContractorsForm = ({ agreementTermData, deedOfGuaranteeData }) =>
{
    const formManager = useFormManager({
        schema: IcaFormSchema,
        defaultValues: ICA_DEFAULT_VALUES,
        formType: 'ica',
        formId: 'ICA',
        theme: 'ica',
        fileUpload: FILE_UPLOAD_CONFIG,
        onSuccess: () =>
        {
            setTimeout(() =>
            {
                formManager.resetForm();
            }, 15000);
        },
        prepareData: async (data) => ({ ...data, formType: "ica" })
    });

    const handleFormSubmit = (e) =>
    {
        e.preventDefault();
        return formManager.handleSubmit();
    };

    return (
        <section className="1024px:py-[120px] 768px:bg-[#f2f2f2]">
            <div className="max-w-[1200px] mx-auto">
                <form
                    onSubmit={handleFormSubmit}
                    className="bg-white rounded-lg shadow-lg px-12 py-16 space-y-8"
                    noValidate
                    autoComplete="off"
                >
                    <FormHeader COMPANY_INFO={COMPANY_INFO} />

                    <PersonalDetailsSection formManager={formManager} />

                    <AgreementTermSection
                        formManager={formManager}
                        agreementTermData={agreementTermData}
                    />

                    <DeedOfGuaranteeSection
                        formManager={formManager}
                        deedOfGuaranteeData={deedOfGuaranteeData}
                        COMPANY_INFO={COMPANY_INFO}
                    />

                    <ExecutedAsDeedSection formManager={formManager} />

                    <LicensingInsuranceSection formManager={formManager} />

                    <EDocketSystemSection COMPANY_INFO={COMPANY_INFO} />

                    <DriversSection formManager={formManager} />

                    <div className="text-center space-y-4">
                        <SubmitButton formManager={formManager} />
                    </div>

                    <ProcessingIndicator fileUpload={formManager.fileUpload} />
                </form>
            </div>
        </section>
    );
};

export default IndependentContractorsForm;