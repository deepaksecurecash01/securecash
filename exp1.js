"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import DatePickerFieldWithRef from "@/components/common/forms/elements/DatePickerField";
import WarningPopup from "../elements/WarningPopup";
import { useRouter } from 'next/navigation';
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { formatBirthdayForAPI } from '@/utils/formHelpers';
import TermsFormSchema, { TERMS_DEFAULT_VALUES } from '@/zod/TermsFormSchema';

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  Icon,
  Icon2,
  register,
  errors,
  ref,
  currentErrorField,
  setCurrentErrorField,
  textarea = false,

}) =>
{
  const hasError = errors[name] && currentErrorField === name;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
        {label}
      </label>
      <div className="relative w-full flex items-center bg-white rounded-[2px] border">
        {Icon2 && (
          <Icon2
            className={`min-w-[50px] text-[18px] text-[#999] ${hasError
              ? "text-red-500"
              : isFocused
                ? "text-primary"
                : "text-[#999]"
              }`}
          />
        )}

        <input
          className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm  ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
            }`}
          type={type}
          name={name}
          ref={ref}
          {...register(name)}
          onFocus={() =>
          {
            setCurrentErrorField(name);
            setIsFocused(true);
          }}
          onBlur={() =>
          {
            // MODIFIED: Only clear currentErrorField if there's no error for this field
            if (!errors[name]) {
              setCurrentErrorField(null);
            }
            setIsFocused(false);
          }}
          placeholder={placeholder}
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

const index = () =>
{
  const fieldRefs = {
    Name: useRef(null),
    Position: useRef(null),
    Email: useRef(null),
    Birthdate: useRef(null),
    Organisation: useRef(null),
    ABN: useRef(null),
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: TermsFormSchema ? zodResolver(TermsFormSchema) : undefined,
    TERMS_DEFAULT_VALUES,
  });

  const nameValue = watch("Name");
  const positionValue = watch("Position");
  const organisationValue = watch("Organisation");
  const abnValue = watch("ABN");
  const birthdateValue = watch("Birthdate");

  const { currentErrorField, setCurrentErrorField, handleFieldErrors, handleSubmissionError } = useFormErrors(fieldRefs);

  const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
    formType: 'terms',
    formId: 'Terms',
    onSuccess: (result, finalData) =>
    {
      console.log("Terms form submitted successfully!");
      // Redirect to /austrac on successful submission
      // router.push("/austrac");
    },
    onError: (error) =>
    {
      console.error("Terms submission failed:", error);
    },
    prepareData: async (data) =>
    {

      return {
        data
      };
    }
  });

  // MODIFIED: Enhanced focus management effect
  useEffect(() =>
  {
    if (errors && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0]; // Get the first error field

      // Set currentErrorField to the first error field
      setCurrentErrorField(errorField);

      // Focus the field
      const refToFocus = fieldRefs[errorField];
      if (refToFocus && refToFocus.current) {
        setTimeout(() =>
        {
          refToFocus.current.focus();
        }, 100);
      }
    } else {
      // Only clear when there are no errors at all
      setCurrentErrorField(null);
    }
  }, [errors, setCurrentErrorField, fieldRefs]);

  // MODIFIED: Ensure currentErrorField persists for fields with errors
  useEffect(() =>
  {
    if (currentErrorField && !errors[currentErrorField]) {
      // If current error field no longer has an error, find the next one
      const errorFields = Object.keys(errors);
      if (errorFields.length > 0) {
        setCurrentErrorField(errorFields[0]);
      } else {
        setCurrentErrorField(null);
      }
    }
  }, [errors, currentErrorField, setCurrentErrorField]);

  const inputFields = [
    {
      label: "What is your full name?",
      name: "Name",
      placeholder: "Enter your full name",
      Icon: FaUser,
      ref: fieldRefs.Name,
    },
    {
      label: "What is your position in the organisation?",
      name: "Position",
      placeholder: "Enter your position in the organisation",
      Icon: FaBriefcase,
      ref: fieldRefs.Position,
    },
    {
      label: "What is your email address?",
      name: "Email",
      type: "email",
      placeholder: "Enter your email address",
      Icon: FaEnvelope,
      ref: fieldRefs.Email,
    },
    {
      label: "What is your organisation's name?",
      name: "Organisation",
      placeholder: "Enter your organisation's name",
      Icon: FaUsers,
      ref: fieldRefs.Organisation,
    },
  ];

  const onSubmit = async (data) =>
  {
    console.log("All validations passed, proceeding with submission...");
    await handleSubmission(data);
  };

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center `}>
      <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-16 rounded-[6px] bg-[#1a1a1a]">
        <form
          className="text-center"
          data-formid="Terms"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <div className="form-page terms">
            <Typography
              as="h3"
              fontFamily="montserrat"
              className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
              Service Agreement
            </Typography>

            <Divider
              color="primary"
              margin="mt-2.5 mb-4"
              alignment="center"
              responsiveClassName="mx-auto"
            />

            <div className="form-tab 480px:w-[90%] mx-auto">
              {/* Bot field (honeypot) - hidden */}
              <input
                type="text"
                {...register("BotField")}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {inputFields.slice(0, 3).map((field, index) => (
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
                    onBlur={() =>
                    {
                      // MODIFIED: Only clear if no error exists for this field
                      if (!errors[field.name]) {
                        setCurrentErrorField(null);
                      }
                    }}
                  />
                </div>
              ))}

              {/* DatePickerField for Birthdate at 4th position */}
              <div className="relative">
                <DatePickerFieldWithRef
                  label="What is your date of birth?"
                  name="Birthdate"
                  value={birthdateValue}
                  onChange={(date) =>
                  {
                    setValue("Birthdate", date, { shouldValidate: true });
                  }}
                  onFocus={() => setCurrentErrorField("Birthdate")}
                  onBlur={() =>
                  {
                    // MODIFIED: Only clear if no error exists for this field
                    if (!errors["Birthdate"]) {
                      setCurrentErrorField(null);
                    }
                  }}
                  errors={errors}
                  currentErrorField={currentErrorField}
                  dayPlaceholder="DD"
                  monthPlaceholder="MM"
                  yearPlaceholder="YYYY"
                  format="dd/MM/yyyy"
                  containerClassName=""
                  labelClassName="text-white text-base inline-block mt-4 mb-2 w-full text-left"
                  ref={fieldRefs.Birthdate}
                  autoComplete="new-password"
                />
              </div>

              {/* Organisation field */}
              <div className="relative">
                <InputField
                  {...inputFields[3]}
                  register={register}
                  errors={errors}
                  currentErrorField={currentErrorField}
                  setCurrentErrorField={setCurrentErrorField}
                  ref={fieldRefs.Organisation}
                  autoComplete="new-password"
                  onFocus={() => setCurrentErrorField("Organisation")}
                  onBlur={() =>
                  {
                    // MODIFIED: Only clear if no error exists for this field
                    if (!errors["Organisation"]) {
                      setCurrentErrorField(null);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Display submission error if any */}
          {submissionError && (
            <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
              <strong>Submission Error:</strong> {submissionError}
            </div>
          )}

          <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
            <div className="button-section relative">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                  } text-white border-none py-[15px] 768px:px-0 text-[16px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting, please wait...
                  </div>
                ) : isSubmitted ? (
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

export default index;