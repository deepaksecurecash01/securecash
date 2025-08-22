"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import FormHeader from "./form-sections/FormHeader";
import PersonalDetailsSection from "./form-sections/PersonalDetailsSection";
import AgreementTermSection from "./form-sections/AgreementTermSection";
import DeedOfGuaranteeSection from "./form-sections/DeedOfGuaranteeSection";
import ExecutedAsDeedSection from "./form-sections/ExecutedAsDeedSection";
import LicensingInsuranceSection from "./form-sections/LicensingInsuranceSection";
import EDocketSystemSection from "./form-sections/EDocketSystemSection";
import DriversSection from "./form-sections/DriversSection";
import { IcaFormSchema } from "@/zod/IcaFormSchema";
import { useFormErrors } from "@/hooks/useFormErrors";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useFileUpload } from "@/hooks/useFileUpload";

const COMPANY_INFO = {
  name: "Office Central Pty Ltd",
  acn: "ACN 668 461 050",
  address: "30 Church Hill Road, Old Noarlunga SA 5168",
  email: "sales@securecash.com.au",
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

const SubmitButton = ({ isSubmitting, isSubmitted }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`nextBtn ${
      isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
    } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <LoadingSpinner />
        Submitting... Please Wait.
      </span>
    ) : isSubmitted ? (
      "Thank you. We received your submission!"
    ) : (
      "Click here to execute this deed & agreement"
    )}
  </button>
);

const SuccessMessage = () => (
  <div className="text-green-600 font-medium">
    <svg
      className="inline w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    Thank you. We received your submission!
  </div>
);

// Main Form Component
const IndependentContractorsForm = ({
  agreementTermData,
  deedOfGuaranteeData,
}) => {
  const fieldRefs = useRef({});

  const {
    currentErrorField,
    setCurrentErrorField,
    handleFieldErrors,
    submissionError,
    handleSubmissionError,
  } = useFormErrors(fieldRefs.current);

  const { processFiles, isProcessing, fileErrors, processingProgress } =
    useFileUpload({
      compression: {
        targetSizeKB: 400,
        maxSizeMB: 5,
        allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
      },
      concurrencyLimit: 2,
    });
  
  const handleFormSubmit = async (data) =>
  {
    try {
      // Let the submission hook handle everything
      await handleSubmission(data);
    } catch (error) {
      // Error is automatically handled by useFormSubmission and useFormErrors
      console.error("Form submission failed:", error);
    }
  };

  const { isSubmitting, isSubmitted, handleSubmission } = useFormSubmission({
    formType: 'ica',
    formId: 'ICA',
    onSuccess: (result, finalData) =>
    {
      console.log("ICA form submitted successfully!");
      // Could add redirect logic here if needed
    },
    onError: (error) =>
    {
      handleSubmissionError(error);
    },
    prepareData: async (data) =>
    {
      // Process files if any exist
      const fileFieldsConfig = [
        { field: 'GovernmentID', prefix: 'Guarantors Government ID' },
        { field: 'WitnessID', prefix: 'Witness ID' },
        { field: 'SecurityLicense', prefix: 'Security or Masters License' },
        { field: 'CITInsurance', prefix: 'CIT Insurance' }
      ];

      try {
        const attachments = await processFiles(data, fileFieldsConfig);
        return { ...data, attachments };
      } catch (error) {
        console.error("File processing failed:", error);
        throw error; // Will be handled by submission hook
      }
    }
  });

  // 4. Update onError handler for react-hook-form
  const onError = (validationErrors) =>
  {
    console.log("Form validation errors:", validationErrors);
    handleFieldErrors(validationErrors); // This will focus first error field
  };
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm({
    resolver: zodResolver(IcaFormSchema),
    mode: "onChange",
  });

  // Watch all form values
  const watchedValues = watch();

  // Function to register field refs
  const registerFieldRef = (fieldName, ref) => {
    if (ref) {
      fieldRefs.current[fieldName] = ref;
    }
  };


  const handleFieldChange = (name, value) => {
    setValue(name, value);
    if (errors[name]) clearErrors(name);
    if (currentErrorField === name) setCurrentErrorField(null);
    trigger(name);
  };


  return (
    <section className="1024px:py-[120px] 768px:bg-[#f2f2f2]">
      <div className="max-w-[1200px] mx-auto">
        <form
          onSubmit={handleSubmit(handleFormSubmit, onError)}
          className="bg-white rounded-lg shadow-lg px-12 py-16 space-y-8"
          noValidate
          autoComplete="off"
        >
          <FormHeader COMPANY_INFO={COMPANY_INFO} />

          <PersonalDetailsSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <AgreementTermSection
            agreementTermData={agreementTermData}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <DeedOfGuaranteeSection
            deedOfGuaranteeData={deedOfGuaranteeData}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            COMPANY_INFO={COMPANY_INFO}
            registerFieldRef={registerFieldRef}
          />

          <ExecutedAsDeedSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <LicensingInsuranceSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <EDocketSystemSection COMPANY_INFO={COMPANY_INFO} />

          <DriversSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <div className="text-center space-y-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
            />
            {isSubmitted && <SuccessMessage />}
          </div>
        </form>
      </div>
    </section>
  );
};

export default IndependentContractorsForm;
