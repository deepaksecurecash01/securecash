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
                    className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
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
                        setCurrentErrorField(null);
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

const TermsForm = ({ setName, setPosition, setOrganisation, setAbn }) =>
{
    const router = useRouter();

    // Create field references for focus management
    const fieldRefs = {
        Name: useRef(null),
        Position: useRef(null),
        Email: useRef(null),
        Birthdate: useRef(null),
        Organisation: useRef(null),
        ABN: useRef(null),
    };

    // Initialize form hooks
    const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs);

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
                // Form data mapped to email structure
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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(TermsFormSchema),
        defaultValues: TERMS_DEFAULT_VALUES, // ✅ Fixed: added defaultValues property
    });

    const nameValue = watch("Name");
    const positionValue = watch("Position");
    const organisationValue = watch("Organisation");
    const abnValue = watch("ABN");
    const birthdateValue = watch("Birthdate");

    // Pass values to parent component props (maintaining original functionality)
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
                    onBlur={() => setCurrentErrorField(null)}
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
                />
            </div>

            {/* ABN field with custom handling using the enhanced ABNInputField */}
            <ABNInputField
                label="What is your organisation's ABN number?"
                name="ABN"
                placeholder="Enter your organisation's ABN number (11 digits)"
                Icon={FaIdCard}
                register={register}
                errors={errors}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                setValue={setValue}
                abnValue={abnValue}
                abnRef={fieldRefs.ABN}
            />
        </>
    );

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center `}>
            <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-16 rounded-[6px] bg-[#1a1a1a]">
                <form
                    className="text-center"
                    data-formid="Terms"
                    onSubmit={handleSubmit(onSubmit)} // ✅ Clean handleSubmit call
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
                            {renderFormFields()}
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

export default TermsForm;

import { FaExclamation } from "react-icons/fa";

const WarningPopup = ({ error, isFirstError, className }) =>
{
    return (
        isFirstError && (
            <span
                className={`absolute backdrop-blur-lg py-1 px-2 w-auto rounded-md text-[14px] flex items-center bg-white/95 text-black shadow-sm z-10 ${className ? className : " top-12"
                    }`}
            >
                {/* Arrow */}
                <span className="absolute left-2 transform translate-x-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></span>

                <span className="bg-red-500 p-1 rounded-sm mr-2">
                    <FaExclamation className="text-[10px] text-white" />
                </span>
                {error}
            </span>
        )
    );
};

export default WarningPopup;
import React from 'react';
import DatePicker from "react-date-picker";
import WarningPopup from './WarningPopup'; // Adjust import path as needed
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const DatePickerField = ({
    // Core props
    label,
    name,
    value,
    onChange,
    onFocus,
    onBlur,

    // DatePicker specific props
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",
    autoComplete = "new-password",

    // Styling and state props
    disabled = false,
    className = "",
    containerClassName = "",
    labelClassName = "",

    // Error handling
    errors = {},
    currentErrorField = null,

    // Ref
    ref: forwardedRef,

    // Additional customization
    showWarningPopup = true,
    ...otherProps
}) =>
{
    const error = errors[name];
    const hasError = !!error;
    const isFirstError = currentErrorField === name;

    // Default styling classes
    const defaultClassName = `w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left  leading-6 appearance-none ${disabled
        ? 'opacity-50 focus:outline-red-600 focus:border-none focus:ring-0'
        : 'focus:outline-primary'
        }`;

    const finalClassName = `${defaultClassName} ${className}`;

    const defaultContainerClassName = "relative w-full";
    const finalContainerClassName = `${defaultContainerClassName} ${containerClassName}`;

    const defaultLabelClassName = "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0";
    const finalLabelClassName = `${labelClassName ? labelClassName : defaultLabelClassName}`;

    return (
        <div className={finalContainerClassName}>
            {label && (
                <label
                    className={finalLabelClassName}
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <div className='relative w-full'>
                <DatePicker
                    value={value || null}
                    onChange={onChange}
                    onFocus={() => onFocus && onFocus(name)}
                    onBlur={() => onBlur && onBlur(null)}
                    dayPlaceholder={dayPlaceholder}
                    monthPlaceholder={monthPlaceholder}
                    yearPlaceholder={yearPlaceholder}
                    errors={errors}
                    ref={forwardedRef}
                    format={format}
                    autoComplete={autoComplete}
                    className={finalClassName}
                    disabled={disabled}
                    {...otherProps}
                />

                {hasError && showWarningPopup && (
                    <WarningPopup
                        error={error.message}
                        isFirstError={isFirstError}
                    />
                )}
            </div>

        </div>
    );
};

// Forward ref version for better ref handling
const DatePickerFieldWithRef = React.forwardRef((props, ref) => (
    <DatePickerField {...props} ref={ref} />
));

DatePickerFieldWithRef.displayName = 'DatePickerField';

export default DatePickerFieldWithRef;


// Usage example:
/*
<DatePickerField
  label="Pick a time that suits you and we'll call you back!"
  name="CallbackDate"
  value={selectedCallbackDate}
  onChange={(date) => setValue("CallbackDate", date, { shouldValidate: true })}
  onFocus={setCurrentErrorField}
  onBlur={setCurrentErrorField}
  errors={errors}
  ref={CallbackDateRef}
  disabled={!needsCallback}
/>
*/