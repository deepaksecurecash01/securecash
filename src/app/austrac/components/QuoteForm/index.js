"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { InputField } from "../elements/InputField";
import { SelectionBox } from "../elements/SelectionBox";
import WarningPopup from "../elements/WarningPopup";
import { useRouter } from "next/navigation";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import AustracFormSchema, { AUSTRAC_DEFAULT_VALUES } from '@/zod/AustracFormSchema';

// Enhanced ABN InputField Component
const ABNInputField = ({
  label,
  name,
  placeholder,
  Icon,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
  setValue,
  abnValue,
  abnRef
}) =>
{
  const hasError = errors[name] && currentErrorField === name;
  const [isFocused, setIsFocused] = useState(false);

  // ABN input handler to limit to 11 digits and format
  const handleABNChange = (e) =>
  {
    const value = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Limit to 11 digits
    const limitedDigits = digitsOnly.slice(0, 11);

    // Format with spaces for display (XX XXX XXX XXX)
    let formattedValue = limitedDigits;
    if (limitedDigits.length > 2) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2);
    }
    if (limitedDigits.length > 5) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5);
    }
    if (limitedDigits.length > 8) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5, 8) + ' ' + limitedDigits.slice(8);
    }

    setValue("ABN", formattedValue, { shouldValidate: true });
  };

  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
        {label}
      </label>
      <div className="relative w-full flex items-center bg-white rounded-[2px] border">
        <input
          className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
            }`}
          type="text"
          name={name}
          ref={abnRef}
          value={abnValue || ""}
          onChange={handleABNChange}
          onFocus={() =>
          {
            setCurrentErrorField(name);
            setIsFocused(true);
          }}
          onBlur={() =>
          {
            setCurrentErrorField(null);
            setIsFocused(false);
          }}
          placeholder={placeholder}
          maxLength={14}
          autoComplete="new-password"
          required
        />
        <Icon
          className={`min-w-[50px] text-[18px] text-[#999] ${hasError
            ? "text-red-500"
            : isFocused
              ? "text-primary"
              : "text-[#999]"
            }`}
        />
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

const AUSTRACForm = ({ className }) =>
{
  const router = useRouter();

  // Create field references for focus management
  const fieldRefs = {
    Organisation: useRef(null),
    ABN: useRef(null),
    Website: useRef(null),
    OrganisationEmail: useRef(null),
    OrganisationType: useRef(null),
    Address: useRef(null),
    State: useRef(null),
    Personnel: useRef(null),
  };

  // Initialize form hooks
  const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs);

  const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
    formType: 'austrac',
    formId: 'AUSTRAC',
    onSuccess: (result, finalData) =>
    {
      console.log("AUSTRAC form submitted successfully!");
      // Redirect to /site-info on successful submission
      // router.push("/site-info");
    },
    onError: (error) =>
    {
      console.error("AUSTRAC submission failed:", error);
    },
    prepareData: async (data) =>
    {
   

      // Format date of submission
      const now = new Date();
      const dateOfSubmission = now.toLocaleDateString('en-US', {
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AustracFormSchema),
    defaultValues: AUSTRAC_DEFAULT_VALUES,
  });

  const abnValue = watch("ABN");

  const inputFields = [
    {
      label: "What is your organisation's name?",
      name: "Organisation",
      placeholder: "e.g. Smith Holdings Pty Ltd or South Park Primary School",
      Icon: FaBuilding,
      errorMessage: "Please enter your organisations full name.",
      ref: fieldRefs.Organisation,
    },
    {
      label: "What is the organisation's main website?",
      name: "Website",
      placeholder: "e.g. https://www.smithholdings.com.au",
      Icon: FaGlobe,
      errorMessage: "Please enter your organisation's main website.",
      ref: fieldRefs.Website,
    },
    {
      label: "What is the organisation's main email address?",
      name: "OrganisationEmail",
      type: "email",
      placeholder: "e.g. admin@smithholdings.com.au",
      Icon: FaEnvelope,
      errorMessage: "Please enter your organisation's main email address.",
      ref: fieldRefs.OrganisationEmail,
    },
    {
      label: "What is the address of the head office?",
      name: "Address",
      placeholder: "e.g. 38 Main South Road Blacktown QLD 6987",
      Icon: FaHome,
      errorMessage: "Please enter the address of your head office.",
      ref: fieldRefs.Address,
    },
  ];

  const organisationTypeOptions = [
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
  ];

  const stateOptions = [
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
  ];

  // ✅ CLEAN onSubmit - No manual validation, trust React Hook Form
  const onSubmit = async (data) =>
  {
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


      {/* Organisation Name */}
      <div className="relative">
        <InputField
          {...inputFields[0]}
          register={register}
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          ref={fieldRefs.Organisation}
          autoComplete="new-password"
          onFocus={() => setCurrentErrorField("Organisation")}
          onBlur={() => setCurrentErrorField(null)}
        />
      </div>

      {/* ABN field with custom handling */}
      <ABNInputField
        label="What is your organisation's ABN number?"
        name="ABN"
        placeholder="as per the ASIC register. Eg 45 567 678 901"
        Icon={FaIdCard}
        register={register}
        errors={errors}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        setValue={setValue}
        abnValue={abnValue}
        abnRef={fieldRefs.ABN}
      />

      {/* Website and Email */}
      {inputFields.slice(1, 3).map((field, index) => (
        <div key={index + 1} className="relative">
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
          />
        </div>
      ))}

      <SelectionBox
        label="What is the organisation's structure type?"
        name="OrganisationType"
        register={register}
        Icon={FaList}
        setValue={setValue}
        options={organisationTypeOptions}
        errors={errors}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
      />

      {/* Address */}
      <div className="relative">
        <InputField
          {...inputFields[3]}
          register={register}
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          ref={fieldRefs.Address}
          autoComplete="new-password"
          onFocus={() => setCurrentErrorField("Address")}
          onBlur={() => setCurrentErrorField(null)}
        />
      </div>

      <SelectionBox
        label="In which state is the head office?"
        name="State"
        register={register}
        Icon={FaMapMarkerAlt}
        setValue={setValue}
        options={stateOptions}
        errors={errors}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
      />

      <div className="form-tab mx-auto">
        <div className="comment-container w-full mx-auto text-left block clear-both">
          <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
            Please provide the full names & positions of all the key people within the organisation structure;
          </label>
          <div className="relative">
            <textarea
              className={`w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white ${errors.Personnel && currentErrorField === "Personnel"
                ? "focus:outline-red-600"
                : "focus:outline-primary"
                }`}
              name="Personnel"
              ref={fieldRefs.Personnel}
              {...register("Personnel")}
              placeholder="Directors, Chairperson, Secretary etc."
              rows="6"
              onFocus={() => setCurrentErrorField("Personnel")}
              onBlur={() => setCurrentErrorField(null)}
              autoComplete="new-password"
            />
            {errors.Personnel && (
              <WarningPopup
                error={errors.Personnel?.message}
                isFirstError={currentErrorField === "Personnel"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="AUSTRAC"
        onSubmit={handleSubmit(onSubmit)} // ✅ Clean handleSubmit call
        noValidate
        autoComplete="off"
      >
        <div className="form-page austrac">
          <div className="form-tab 480px:w-[90%] mx-auto">
            {renderFormFields()}
          </div>
        </div>

        {/* Display submission error if any */}
        {submissionError && (
          <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
            <strong>Submission Error:</strong> {submissionError}
          </div>
        )}

        <div className="button-controls-container 480px:w-[80%] mx-auto mt-4 mb-2">
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
  );
};

export default AUSTRACForm;