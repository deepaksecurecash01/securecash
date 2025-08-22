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

export default AUSTRACForm; "use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
{
    FaUser,
    FaPhone,
    FaEnvelope,
    FaInfoCircle,
    FaQuestionCircle,
    FaBuilding,
    FaUsers,
    FaClock,
    FaMapMarkerAlt,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";


import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";
import styles from "@/components/common/checkbox/Checkbox.module.css";
import DatePickerFieldWithRef from "../common/forms/elements/DatePickerField";
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useFormErrors } from '@/hooks/useFormErrors';
import { formatDateForAPI } from '@/utils/formHelpers';
import ContactFormSchema, { formConfig, defaultValues } from '@/zod/ContactFormSchema';




const Checkbox = ({
    value,
    className = "",
    style = {},
    register,
    setValue,
    label,
    name,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const checkboxProps = register ? register(name) : {};

    return (
        <div className={` ${className} ${styles.checkbox}`} style={style}>
            <input
                type="checkbox"
                id={name}
                value={value}
                {...checkboxProps}
                onFocus={() => setCurrentErrorField(name)}
                onBlur={() => setCurrentErrorField(null)}
                onChange={(e) =>
                {
                    // Call the register's onChange first
                    if (checkboxProps.onChange) {
                        checkboxProps.onChange(e);
                    }

                    // Then set the actual value based on checked state
                    if (e.target.checked) {
                        // Checkbox is checked - use the provided value
                        setValue(name, value, { shouldValidate: true });
                    } else {
                        // Checkbox is unchecked - set empty string
                        setValue(name, "", { shouldValidate: true });
                    }
                }}
                data-validate="CheckboxMulti"
                className={` mt-2 text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer`}
            />

            <label
                className="font-medium inline-block mt-4 text-left w-full relative cursor-pointer"
                htmlFor={name}
            >
                <span className="w-[28px] h-[28px]"></span>
                {label}
            </label>
        </div>
    );
};

const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    textarea = false,
    ref,
    autoComplete,
    onFocus,
    onBlur,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () =>
    {
        setCurrentErrorField(name);
        setIsFocused(true);
        if (onFocus) onFocus();
    };

    const handleBlur = () =>
    {
        setCurrentErrorField(null);
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                            }`}
                        name={name}
                        ref={ref}
                        {...register(name)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        rows="3"
                        autoComplete={autoComplete || "new-password"}
                        required
                    ></textarea>
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
                            ref={ref}
                            {...register(name)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={placeholder}
                            autoComplete={autoComplete || "new-password"}
                            required
                        />
                        <Icon
                            className={`min-w-[50px] text-[18px] ${hasError
                                ? "text-red-500"
                                : isFocused
                                    ? "text-primary"
                                    : "text-[#999]"
                                }`}
                        />
                    </>
                )}

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

const SelectionBox = ({
    label,
    name,
    setValue,
    Icon,
    options,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    disabled = false,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="input-container input-container-select w-full mx-auto text-left flex items-center relative  rounded-[2px] border">
                <Icon
                    className={`icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4 ${disabled
                        ? "text-[#999] opacity-50"
                        : hasError
                            ? "text-red-500"
                            : isFocused
                                ? "text-primary"
                                : "text-[#999]"
                        }`}
                />

                <SelectOption
                    register={register}
                    setValue={setValue}
                    setIsFocused={setIsFocused}
                    hasError={hasError}
                    isFocused={isFocused}
                    setCurrentErrorField={setCurrentErrorField}
                    options={options}
                    name={name}
                    disabled={disabled}
                />
                <i className={`rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text ${disabled ? " opacity-50" : ""}`} />

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

const SelectOption = ({
    register,
    setValue,
    setCurrentErrorField,
    options,
    isFocused,
    hasError,
    setIsFocused,
    name,
    disabled = false,
}) =>
{
    return (
        <select
            className={`w-full text-sm rounded-sm border border-white pl-12 shadow-none font-[Montserrat] leading-6 h-9 appearance-none ${disabled
                ? 'opacity-50'
                : hasError
                    ? "focus:outline-red-600 focus:border-none focus:ring-0"
                    : "focus:outline-primary"
                }`}
            {...register(name)}
            onChange={(e) =>
            {
                setValue(name, e.target.value, {
                    shouldValidate: true,
                });
                setCurrentErrorField(null);
            }}
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
            name={name}
            data-validate="Inline"
            disabled={disabled}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};



const FranchiseForm = () =>
{

    // Create refs for focus management - same as before
    const fullNameRef = useRef(null);
    const organisationRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const CallbackDateRef = useRef(null);

    // Create the focus map - same as your existing logic
    const fieldRefs = {
        FullName: fullNameRef,
        Organisation: organisationRef,
        Phone: phoneRef,
        Email: emailRef,
        Message: messageRef,
        CallbackDate: CallbackDateRef,
    };


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: ContactFormSchema ? zodResolver(ContactFormSchema) : undefined,
        defaultValues,
    });

    const { currentErrorField, setCurrentErrorField, handleFieldErrors, handleSubmissionError } = useFormErrors(fieldRefs);


    const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
        formType: 'contact',
        formId: 'Contact',
        onSuccess: (result, finalData) =>
        {
            console.log("Form submitted successfully!");
            // Form will show success state via isSubmitted
        },
        onError: (error) =>
        {
            // Error is automatically handled by the hook
            console.error("Submission failed:", error);
        },
        prepareData: async (data) =>
        {
            if (data.CallbackDate) {
                const formattedDate = formatDateForAPI(data.CallbackDate);
                return { ...data, CallbackDate: formattedDate };
            }
            return data;
        }
    });

    const selectedCallbackDate = watch("CallbackDate");
    const needsCallback = watch("ChkCallBack");

    const handleNumericOnly = (e) =>
    {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setValue(e.target.name, value, { shouldValidate: true, shouldDirty: true });
    };




    const inputFields = [
        {
            label: "Full Name",
            name: "FullName",
            placeholder: "Enter your full name",
            Icon: FaUser,
            errorMessage: "Please enter your full name.",
            ref: fullNameRef,
        },
        {
            label: "Organisation Name",
            name: "Organisation",
            placeholder: "Enter your organisation name",
            Icon: FaUsers,
            errorMessage: "Please enter your organisation name.",
            ref: organisationRef,
        },
        {
            label: "Phone Number",
            name: "Phone",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
            errorMessage: "Please enter your phone number.",
            ref: phoneRef,
        },
        {
            label: "Email Address",
            name: "Email",
            type: "email",
            placeholder: "Your email address",
            Icon: FaEnvelope,
            errorMessage: "Please enter your email address.",
            ref: emailRef,
        },
    ];



    const { departments, callBackTimes, states } = formConfig;

    const onSubmit = async (data) =>
    {
        // Validate all fields first
        if (!handleFieldErrors(errors)) {
            return; // Stop if validation fails
        }

        // Check required fields manually (can be removed if schema handles this)
        if (!data.Department || !data.FullName || !data.Email || !data.Message) {
            console.log("Missing required fields");
            return;
        }

        console.log("All validations passed, proceeding with submission...");
        await handleSubmission(data);
    };

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Contact"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
            >
                {/* Bot field (honeypot) - hidden */}
                <input
                    type="text"
                    {...register("BotField")}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                />

                <div className="form-tab 480px:w-[90%] mx-auto">
                    <>
                        {/* Department Selection Box at the top */}
                        <SelectionBox
                            label="Which Department?"
                            name="Department"
                            register={register}
                            Icon={FaBuilding}
                            setValue={setValue}
                            options={departments}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                        />

                        {/* Input fields */}
                        {inputFields.map((field, index) => (
                            <InputField
                                key={index}
                                {...field}
                                register={register}
                                errors={errors}
                                currentErrorField={currentErrorField}
                                setCurrentErrorField={setCurrentErrorField}
                                autoComplete="new-password"
                            />
                        ))}

                        {/* Callback checkbox */}
                        <div className="checkbox-wrapper">
                            <Checkbox
                                label={'I would like to be called back by a representative.'}
                                value={'Yes, please.'}
                                name={"ChkCallBack"}
                                register={register}
                                setValue={setValue}
                                currentErrorField={currentErrorField}
                                setCurrentErrorField={setCurrentErrorField}
                                className="chkbox float-left text-left mt-4 mb-2 relative text-primary-text"
                            />
                        </div>

                        {/* Date picker */}
                        <DatePickerFieldWithRef
                            label="Pick a time that suits you and we'll call you back!"
                            name="CallbackDate"
                            value={selectedCallbackDate}
                            onChange={(date) =>
                            {
                                setValue("CallbackDate", date, { shouldValidate: true });
                            }}
                            onFocus={setCurrentErrorField}
                            onBlur={setCurrentErrorField}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            ref={CallbackDateRef}
                            dayPlaceholder="DD"
                            monthPlaceholder="MM"
                            yearPlaceholder="YYYY"
                            format="dd/MM/yyyy"
                            autoComplete="new-password"
                            disabled={!needsCallback}
                            className={`${!needsCallback ? 'opacity-50 focus:outline-red-600 focus:border-none focus:ring-0' : 'focus:outline-primary'}`}
                        />

                        {/* Time and State Selection Boxes inline */}
                        <div className="flex flex-col md:flex-row md:gap-4">
                            <div className="w-full md:w-1/2">
                                <SelectionBox
                                    label="What is the best time?"
                                    name="CallbackTime"
                                    register={register}
                                    Icon={FaClock}
                                    setValue={setValue}
                                    options={callBackTimes}
                                    errors={errors}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                    disabled={!needsCallback}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <SelectionBox
                                    label="Which state are you from?"
                                    name="CallbackState"
                                    register={register}
                                    Icon={FaMapMarkerAlt}
                                    setValue={setValue}
                                    options={states}
                                    errors={errors}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                    disabled={!needsCallback}
                                />
                            </div>
                        </div>

                        {/* How can we help - moved to the end before submit button */}
                        <InputField
                            label="How can we help?"
                            name="Message"
                            placeholder="Briefly let us know how we can help you?"
                            Icon={FaInfoCircle}
                            register={register}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            textarea={true}
                            ref={messageRef}
                            autoComplete="new-password"
                        />
                    </>
                </div>



                <div className="button-controls-container w-[80%] mx-auto mt-7">
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
                                    Sending Message... Please Wait.
                                </div>
                            ) : isSubmitted ? (
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
    );
};

export default FranchiseForm; "use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import Typography from "@/components/common/Typography";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import FranchiseFormSchema, { FRANCHISE_DEFAULT_VALUES } from '@/zod/FranchiseFormSchema';
import WarningPopup from "@/components/common/forms/elements/WarningPopup";

const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    textarea = false,
    ref,
    autoComplete,
    onFocus,
    onBlur,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () =>
    {
        setCurrentErrorField(name);
        setIsFocused(true);
        if (onFocus) onFocus();
    };

    const handleBlur = () =>
    {
        setCurrentErrorField(null);
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                            }`}
                        name={name}
                        ref={ref}
                        {...register(name)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        rows="3"
                        autoComplete={autoComplete || "new-password"}
                        required
                    ></textarea>
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
                            ref={ref}
                            {...register(name)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={placeholder}
                            autoComplete={autoComplete || "new-password"}
                            required
                        />
                        <Icon
                            className={`min-w-[50px] text-[18px] ${hasError
                                ? "text-red-500"
                                : isFocused
                                    ? "text-primary"
                                    : "text-[#999]"
                                }`}
                        />
                    </>
                )}

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

const FranchiseForm = () =>
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    // Create field references for focus management
    const fieldRefs = {
        FullName: useRef(null),
        Phone: useRef(null),
        Email: useRef(null),
        Address: useRef(null),
        InterestedArea: useRef(null),
        ReasonForInterest: useRef(null),
        ReferralSource: useRef(null),
    };

    // Initialize form hooks
    const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs);

    const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
        formType: 'franchise',
        formId: 'Franchise',
        onSuccess: (result, finalData) =>
        {
            console.log("Franchise form submitted successfully!");

            // Store form data for Calendly prefill
            setFormData(finalData);
            setIsFormSubmitted(true);
            setIsCalendlyOpen(true);
        },
        onError: (error) =>
        {
            console.error("Franchise submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Return data as expected by the API
            return {
                ...data,
                formType: "franchise",
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
        resolver: zodResolver(FranchiseFormSchema),
        defaultValues: FRANCHISE_DEFAULT_VALUES,
    });

    const inputFields = [
        {
            label: "Full Name",
            name: "FullName",
            placeholder: "Enter your full name",
            Icon: FaUser,
            ref: fieldRefs.FullName,
        },
        {
            label: "Phone Number",
            name: "Phone",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
            ref: fieldRefs.Phone,
        },
        {
            label: "Email Address",
            name: "Email",
            type: "email",
            placeholder: "Your email address",
            Icon: FaEnvelope,
            ref: fieldRefs.Email,
        },
        {
            label: "Address",
            name: "Address",
            placeholder: "Enter your address",
            Icon: FaHome,
            ref: fieldRefs.Address,
        },
        {
            label: "Territory/Area/Suburb of Interest",
            name: "InterestedArea",
            placeholder: "What territory/area/suburb are you interested in?",
            Icon: FaMapMarkerAlt,
            ref: fieldRefs.InterestedArea,
        },
        {
            label: "What interests you in a SecureCash Franchise?",
            name: "ReasonForInterest",
            placeholder: "Briefly tell us why you're interested in a SecureCash franchise",
            Icon: FaInfoCircle,
            textarea: true,
            ref: fieldRefs.ReasonForInterest,
        },
        {
            label: "How did you hear about this Opportunity?",
            name: "ReferralSource",
            placeholder: "E.g., Google, Social Media, Referral",
            Icon: FaQuestionCircle,
            ref: fieldRefs.ReferralSource,
        },
    ];

    // Main form submission handler
    const handleFormSubmit = async (data) =>
    {
        // Validate all fields first
        if (!handleFieldErrors(errors)) {
            return; // Stop if validation fails
        }

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

            {inputFields.map((field, index) => (
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
                        onBlur={() => setCurrentErrorField(null)}
                        labelClassName="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0"
                    />
                </div>
            ))}

            <div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left px-2 768px:px-0">
                After submitting the form, please pick a time from the popup
                screen for a video meeting.
            </div>
        </>
    );

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Franchise"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                autoComplete="off"
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    {renderFormFields()}
                </div>

                {isFormSubmitted && (
                    <div
                        className="form-submitted-message text-center py-4 absolute h-full top-0 flex justify-center items-center bg-[#f1f1f1] z-10"
                        style={{ background: "#f1f1f1" }}
                    >
                        <div className="480px:w-[90%] mx-auto">
                            <Typography
                                as="h3"
                                fontFamily="montserrat"
                                className="text-[32px] text-primary leading-[1.4em] text-center font-bold mb-[16px]"
                            >
                                Thank You for Your Interest!
                            </Typography>

                            <p className="mb-6">
                                Your form has been submitted successfully. The meeting scheduler
                                should appear shortly.
                            </p>
                        </div>
                    </div>
                )}

                {/* Display submission error if any */}
                {submissionError && (
                    <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                        <strong>Submission Error:</strong> {submissionError}
                    </div>
                )}

                <div className="button-controls-container w-[80%] mx-auto mt-7">
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
                                    Thank you, form submitted successfully!
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Calendly Modal Component */}
            {formData && (
                <PopupModal
                    url={calendlyURL}
                    prefill={{
                        name: formData.FullName || "",
                        email: formData.Email || "",
                        customAnswers: {
                            a1: formData.InterestedArea || "",
                        },
                    }}
                    onModalClose={() =>
                    {
                        setIsCalendlyOpen(false);
                        setIsFormSubmitted(false);
                    }}
                    open={isCalendlyOpen}
                    rootElement={document.getElementById("root") || document.body}
                />
            )}
        </div>
    );
};

export default FranchiseForm; "use client";
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
        className={`nextBtn ${isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
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
}) =>
{
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
    const registerFieldRef = (fieldName, ref) =>
    {
        if (ref) {
            fieldRefs.current[fieldName] = ref;
        }
    };


    const handleFieldChange = (name, value) =>
    {
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
"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import
{
    FaUser,
    FaUsers,
    FaPhone,
    FaComments,
    FaEnvelope,
    FaHome,
    FaMapMarkerAlt,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";
import Quote from "./Quote";
import Banking from "./Banking";
import Change from "./Change";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

// Validation Schemas
const createValidationSchemas = () =>
{
    const QuoteFormSchema = z.object({
        Name: z
            .string()
            .min(1, "Full Name is required.")
            .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
            .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
        Organisation: z.string().min(1, "Please enter your organisation's name."),
        Phone: z
            .string()
            .min(1, "Phone Number is required.")
            .regex(/^\d+$/, "Phone Number must contain only digits."),
        Referrer: z.string().min(1, "Please enter where you heard about us."),
        Email: z
            .string()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),
        Address: z.string().min(1, "Please enter your postal address."),
        Locations: z.string().min(1, "Please enter locations for the service."),
        Service: z
            .array(z.enum(["Banking", "Change"]))
            .min(1, "Please select at least one service."),
    });

    const BankingSchema = z.object({
        BankingFrequency: z.enum(
            ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"],
            {
                errorMap: () => ({ message: "Please select a collection frequency." }),
            }
        ),
        BankingAmount: z.enum(
            [
                "$0 - $1000",
                "$1000 - $5000",
                "$5000 - $20,000",
                "$20,000 - $50,000",
                "over $50,000",
            ],
            {
                errorMap: () => ({
                    message: "Please select an average collection amount.",
                }),
            }
        ),
        BankingBank: z.string().min(1, "Please enter who you bank with."),
        BankingDays: z
            .array(
                z.enum([
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                    "Ad Hoc",
                    "Banking",
                ])
            )
            .min(1, "Please select at least one day for collection."),
        BankingComments: z.string().optional(),
    });

    const ChangeSchema = z.object({
        ChangeFrequency: z.enum(
            ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"],
            {
                errorMap: () => ({ message: "Please select a frequency for change." }),
            }
        ),
        ChangeNotesAmount: z.enum(
            [
                "$0 - $1000",
                "$1000 - $5000",
                "$5000 - $20,000",
                "$20,000 - $50,000",
                "over $50,000",
            ],
            {
                errorMap: () => ({
                    message: "Please select an average notes value.",
                }),
            }
        ),
        ChangeCoinsAmount: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount for coins.")
            .min(1, "Please enter the average coins value."),
        ChangeDays: z
            .array(
                z.enum([
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                    "Ad Hoc",
                    "Banking",
                ])
            )
            .min(1, "Please select at least one usual day for delivery."),
        ChangeComments: z.string().optional(),
    });

    return { QuoteFormSchema, BankingSchema, ChangeSchema };
};

const QuoteForm = ({ className }) =>
{
    // Create field references for focus management
    const fieldRefs = {
        Name: useRef(null),
        Organisation: useRef(null),
        Phone: useRef(null),
        Referrer: useRef(null),
        Email: useRef(null),
        Address: useRef(null),
        Locations: useRef(null),
        // Banking fields
        BankingFrequency: useRef(null),
        BankingAmount: useRef(null),
        BankingBank: useRef(null),
        BankingDays: useRef(null),
        BankingComments: useRef(null),
        // Change fields
        ChangeFrequency: useRef(null),
        ChangeNotesAmount: useRef(null),
        ChangeCoinsAmount: useRef(null),
        ChangeDays: useRef(null),
        ChangeComments: useRef(null),
    };

    // Get validation schemas
    const { QuoteFormSchema, BankingSchema, ChangeSchema } = createValidationSchemas();

    // Initialize form error handling
    const { currentErrorField, setCurrentErrorField, handleFieldErrors, submissionError } = useFormErrors(fieldRefs);

    // Initialize multi-step form management
    const {
        currentStep,
        getCurrentStepId,
        stepData,
        nextStep,
        isLastStep,
        validateCurrentStep,
        resetSteps
    } = useMultiStepForm({
        steps: ['quote', 'banking', 'change'],
        schemas: {
            quote: QuoteFormSchema,
            banking: BankingSchema,
            change: ChangeSchema,
        },
        conditional: true,
        initialData: {
            Name: "",
            Organisation: "",
            Phone: "",
            Referrer: "",
            Email: "",
            Address: "",
            Locations: "",
            Service: [],
            BankingFrequency: "",
            BankingAmount: "",
            BankingBank: "",
            BankingDays: [],
            BankingComments: "",
            ChangeFrequency: "",
            ChangeNotesAmount: "",
            ChangeCoinsAmount: "",
            ChangeDays: [],
            ChangeComments: "",
        }
    });

    // Initialize form submission
    const { isSubmitting, isSubmitted, handleSubmission } = useFormSubmission({
        formType: 'quote',
        formId: 'Quote',
        onSuccess: (result, finalData) =>
        {
            console.log("Quote form submitted successfully!");
            // Reset steps after successful submission
            setTimeout(() => resetSteps(), 3000);
        },
        onError: (error) =>
        {
            console.error("Quote submission failed:", error);
        },
        prepareData: async (data) =>
        {
            return { ...data, formType: "quote" };
        }
    });

    // Dynamic schema creation based on current step and selected services
    const getCurrentSchema = () =>
    {
        const stepId = getCurrentStepId();
        const services = stepData.Service || [];

        switch (stepId) {
            case 'quote':
                return QuoteFormSchema;
            case 'banking':
                return services.includes('Banking') ? BankingSchema : z.object({});
            case 'change':
                return services.includes('Change') ? ChangeSchema : z.object({});
            default:
                return z.object({});
        }
    };

    // Initialize react-hook-form with current schema
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(getCurrentSchema()),
        defaultValues: stepData,
    });

    // Determine next steps based on selected services
    const getNextSteps = (services) =>
    {
        const steps = [];
        if (services.includes('Banking')) steps.push('banking');
        if (services.includes('Change')) steps.push('change');
        return steps;
    };

    // Main form submission handler
    const handleFormSubmit = async (data) =>
    {
        // Validate current step
        const validation = validateCurrentStep(data);
        if (!validation.success) {
            handleFieldErrors(validation.error.flatten().fieldErrors);
            return;
        }

        if (currentStep === 0) {
            // First step - determine next steps based on services
            const services = data.Service || [];
            const nextSteps = getNextSteps(services);

            if (nextSteps.length === 0) {
                // No services selected, submit immediately
                const finalData = { ...stepData, ...data };
                await handleSubmission(finalData);
            } else {
                // Move to next service step
                nextStep(data);
            }
        } else {
            // Service steps - check if this is the last step
            const services = stepData.Service || [];
            const currentStepId = getCurrentStepId();

            if (isLastStep ||
                (currentStepId === 'banking' && !services.includes('Change')) ||
                (currentStepId === 'change' && !services.includes('Banking'))) {
                // Final submission
                const finalData = { ...stepData, ...data };
                await handleSubmission(finalData);
            } else {
                // Move to next step
                nextStep(data);
            }
        }
    };

    // Configuration objects
    const inputFields = [
        {
            label: "Full Name",
            name: "Name",
            placeholder: "Enter your full name",
            Icon: FaUser,
            ref: fieldRefs.Name,
        },
        {
            label: "Organisation Name",
            name: "Organisation",
            placeholder: "Enter your organisation's name",
            Icon: FaUsers,
            ref: fieldRefs.Organisation,
        },
        {
            label: "Phone Number",
            name: "Phone",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
            ref: fieldRefs.Phone,
        },
        {
            label: "Where Did You Hear About Us?",
            name: "Referrer",
            placeholder: "Enter where did you hear about us",
            Icon: FaComments,
            ref: fieldRefs.Referrer,
        },
        {
            label: "Email Address",
            name: "Email",
            type: "email",
            placeholder: "Your email address",
            Icon: FaEnvelope,
            ref: fieldRefs.Email,
        },
        {
            label: "Postal Address",
            name: "Address",
            placeholder: "Enter your postal address",
            Icon: FaHome,
            ref: fieldRefs.Address,
        },
        {
            label: "Location/s For Service",
            name: "Locations",
            placeholder: "Enter location/s for the service (Suburb, State, Postcode)",
            Icon: FaMapMarkerAlt,
            ref: fieldRefs.Locations,
        },
    ];

    const frequencyOptions = [
        { value: "", label: "Please select..." },
        { value: "Weekly", label: "Weekly" },
        { value: "Fortnightly", label: "Fortnightly" },
        { value: "Ad Hoc", label: "Ad Hoc" },
        { value: "Special Event (once off)", label: "Special Event (once off)" },
    ];

    const amountOptions = [
        { value: "", label: "Select Amount:" },
        { value: "$0 - $1000", label: "$0 - $1000" },
        { value: "$1000 - $5000", label: "$1000 - $5000" },
        { value: "$5000 - $20,000", label: "$5000 - $20,000" },
        { value: "$20,000 - $50,000", label: "$20,000 - $50,000" },
        { value: "over $50,000", label: "over $50,000" },
    ];

    const daysOptions = {
        standard: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Ad Hoc",
        ],
        withBanking: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Ad Hoc",
            "Banking",
        ],
    };

    // Render current form step
    const renderFormStep = () =>
    {
        const stepId = getCurrentStepId();
        const services = stepData.Service || [];

        switch (stepId) {
            case 'quote':
                return (
                    <Quote
                        inputFields={inputFields}
                        register={register}
                        errors={errors}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                );
            case 'banking':
                return services.includes("Banking") ? (
                    <Banking
                        frequencyOptions={frequencyOptions}
                        amountOptions={amountOptions}
                        daysOfWeek={daysOptions.standard}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                ) : null;
            case 'change':
                return services.includes("Change") ? (
                    <Change
                        frequencyOptions={frequencyOptions}
                        amountOptions={amountOptions}
                        daysOfWeek={daysOptions.withBanking}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                ) : null;
            default:
                return null;
        }
    };

    // Determine button text
    const getButtonText = () =>
    {
        if (isSubmitting) return "Submitting...";
        if (isSubmitted) return "Thank you! Form submitted successfully.";

        const services = stepData.Service || [];
        const stepId = getCurrentStepId();

        if (stepId === 'quote') {
            return services.length === 0 ? "Submit" : "Next";
        }

        if (stepId === 'banking' && !services.includes('Change')) return "Submit";
        if (stepId === 'change') return "Submit";

        return "Next";
    };

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
            <form
                className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[546px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
                data-formid="Quote"
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                {/* Bot field (honeypot) */}
                <input
                    type="text"
                    {...register("BotField")}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                />

                {renderFormStep()}

                {/* Display submission error */}
                {submissionError && (
                    <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded">
                        {submissionError}
                    </div>
                )}

                <div className="button-controls-container w-[80%] mx-auto mt-7">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                } text-white border-none py-[15px]  text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </div>
                            ) : isSubmitted ? (
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="mr-2" />
                                    Thank you! Form submitted successfully.
                                </div>
                            ) : (
                                getButtonText()
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default QuoteForm; "use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import QuoteForm from "../QuoteForm";
import FranchiseForm from "../FranchiseForm";
import Image from "next/image";
import Link from "next/link";
import ThankYouModal from "../ThankYouModal";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import
{
    createStepSchema,
    SITE_INFO_DEFAULT_VALUES,
    BusinessInfoSchema,
    ContactInfoSchema,
    ServiceInfoSchema,
    RiskAssessmentSchema
} from '@/zod/SiteRiskFormSchema';

const FormSection = () =>
{
    // Create field references for focus management
    const fieldRefs = useRef({
        BusinessName: useRef(null),
        Address: useRef(null),
        Suburb: useRef(null),
        State: useRef(null),
        Postcode: useRef(null),
        Contact: useRef(null),
        Position: useRef(null),
        Phone: useRef(null),
        Email: useRef(null),
        Accounts: useRef(null),
        Services: useRef(null),
        Dates: useRef(null),
        Schedule: useRef(null),
        Bank: useRef(null),
        Amount: useRef(null),
        Parking: useRef(null),
        Security: useRef(null),
        External: useRef(null),
        Internal: useRef(null),
    });

    // State management - exactly like original
    const [formData, setFormData] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);
    const [quoteFormStep, setQuoteFormStep] = useState(0);
    const [schemaStep, setSchemaStep] = useState(0);
    const [submitButton, setSubmitButton] = useState(false);

    // Step schemas array for reference
    const stepSchemas = [BusinessInfoSchema, ContactInfoSchema, ServiceInfoSchema, RiskAssessmentSchema];
    const quoteFormSchemas = [BusinessInfoSchema, ContactInfoSchema, ServiceInfoSchema];

    // Initialize hooks
    const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs.current);

    const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
        formType: 'siteinfo',
        formId: 'SiteInfo',
        onSuccess: (result, finalData) =>
        {
            console.log("Site info form submitted successfully!");
            setShowThankYou(true);
        },
        onError: (error) =>
        {
            console.error("Site info submission failed:", error);
        },
        prepareData: async (data) =>
        {
            return { ...data, formType: "siteinfo" };
        }
    });

    // Get default values with proper empty state - exactly like original
    const getDefaultValues = () => ({
        ...SITE_INFO_DEFAULT_VALUES,
        ...formData,
    });

    const methods = useForm({
        resolver: zodResolver(createStepSchema(schemaStep)),
        defaultValues: getDefaultValues(),
    });

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = methods;

    // Update resolver when schema step changes - exactly like original
    useEffect(() =>
    {
        const newSchema = createStepSchema(schemaStep);
        methods.resolver = zodResolver(newSchema);
        reset(getDefaultValues());
    }, [schemaStep, formData]);

    // Step navigation handler - exactly like original
    const handleStepNavigation = (targetStep) =>
    {
        const currentFormData = getValues();
        setFormData(prev => ({ ...prev, ...currentFormData }));
        setSchemaStep(targetStep);

        if (targetStep <= 2) {
            setQuoteFormStep(targetStep);
        }
    };

    // Focus on franchise form when transitioning - exactly like original
    const focusOnFranchiseForm = () =>
    {
        setTimeout(() =>
        {
            const franchiseFormFirstField = document.querySelector('[name="Amount"]');
            if (franchiseFormFirstField) {
                franchiseFormFirstField.focus();
                franchiseFormFirstField.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    };

    // Complete form reset function - exactly like original
    const resetFormState = () =>
    {
        setFormData({ ...SITE_INFO_DEFAULT_VALUES });
        reset(SITE_INFO_DEFAULT_VALUES);
        setQuoteFormStep(0);
        setSchemaStep(0);
        setSubmitButton(false);
        setCurrentErrorField(null);
    };

    // Modal close handler that properly resets form - exactly like original
    const handleModalClose = () =>
    {
        setShowThankYou(false);
        // resetFormState();
    };

    // Main form submission handler - restored original logic with new hooks
    const handleFormSubmit = async (data) =>
    {
        try {
            const updatedFormData = { ...formData, ...data, "formType": "siteinfo" };
            setFormData(updatedFormData);

            if (schemaStep < 3) {
                // Progress to next step
                if (quoteFormStep < 2) setQuoteFormStep(prev => prev + 1);
                setSchemaStep(prev => prev + 1);

                // Enable submit button and focus when moving to franchise form
                if (schemaStep === 2) {
                    setSubmitButton(true);
                    focusOnFranchiseForm();
                }
            } else {
                // Final submission
                await handleSubmission(updatedFormData);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            handleFieldErrors({ general: [error.message] });
        }
    };

    return (
        <>
            {/* Contact Content Section - EXACT original UI */}
            <div
                id="content-contact"
                className="bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px] 1280px:my-[120px]"
            >
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex items-center">
                    <div className="right-contact-row w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1] 992px:pl-8">
                        <Typography
                            as="h3"
                            fontFamily="montserrat"
                            className="text-[22px] 480px:mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
                        >
                            Thanks for that! This is the final step in order to getting your service setup.
                        </Typography>

                        <Divider
                            color="primary"
                            alignment="left"
                            margin="my-5"
                            responsiveClassName="768px:text-left 768px:mx-0"
                        />

                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light"
                        >
                            Please provide us with the necessary contact information and the service schedule
                            that you would like us to implement. Please note that this form needs to be submitted
                            once per location that you wish us to collect cash from or deliver cash to.
                        </Typography>

                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light"
                        >
                            If you are not after a regular collection but a once off collection fill out the form located{" "}
                            <span className="underline">
                                <strong className="uppercase">
                                    <a href="https://www.securecash.com.au/special-event/">HERE</a>
                                </strong>
                            </span>{" "}
                            instead.
                        </Typography>

                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light flex flex-col gap-4"
                        >
                            <span>
                                To learn more about how we manage information provided you can view our{" "}
                                <Link
                                    className="text-primary hover:underline"
                                    href="https://www.securecash.com.au/privacy-policy/"
                                >
                                    Privacy Policy
                                </Link>.
                            </span>
                            <strong>
                                <Link
                                    className="text-primary hover:underline"
                                    href="https://www.securecash.com.au/austrac/"
                                >
                                    &lt;&lt; Previous
                                </Link>
                            </strong>
                        </Typography>
                    </div>

                    <div className="[flex:1]">
                        <QuoteForm
                            className=""
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                            handleFormSubmit={handleFormSubmit}
                            currentStep={quoteFormStep}
                            setCurrentStep={setQuoteFormStep}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            schemas={quoteFormSchemas}
                            handleStepNavigation={handleStepNavigation}
                            schemaStep={schemaStep}
                        />
                    </div>
                </div>
            </div>

            {/* Form Section - EXACT original UI */}
            <div id="contact-form-section" className="inline-block w-full mb-12 480px:mb-[120px]">
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex">
                    <div className="414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10 480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">
                        <Image
                            src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
                            alt="Making A Deal"
                            fill
                            objectFit="cover"
                        />
                    </div>

                    <FranchiseForm
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        handleFormSubmit={handleFormSubmit}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                        isFormSubmitted={isSubmitted}
                        setIsFormSubmitted={() => { }} // Handled by submission hook
                        submissionStatus={isSubmitted ? 'success' : submissionError ? 'error' : null}
                        setSubmissionStatus={() => { }} // Handled by submission hook
                        isSubmitting={isSubmitting}
                        getValues={getValues}
                        handleStepNavigation={handleStepNavigation}
                        schemaStep={schemaStep}
                        submitButton={submitButton}
                    />
                </div>

                {/* Display submission error if any */}
                {submissionError && (
                    <div className="max-w-[1366px] mx-auto mt-4">
                        <div className="text-red-600 text-center mb-4 p-4 bg-red-50 border border-red-200 rounded mx-4">
                            <strong>Submission Error:</strong> {submissionError}
                            <button
                                onClick={() => window.location.reload()}
                                className="ml-4 text-blue-600 hover:underline"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ThankYouModal
                showThankYou={showThankYou}
                setIsFormSubmitted={() => { }} // Handled by submission hook
                onClose={handleModalClose}
                type={'Thankyou'}
            />
        </>
    );
};

export default FormSection; 'use client';
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import QuoteForm from "../QuoteForm";
import SiteRiskForm from "@/app/site-info/components/FranchiseForm";
import Image from "next/image";
import Link from "next/link";
import ThankYouModal from "@/app/site-info/components/ThankYouModal";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import
{
    createStepSchema,
    SPECIAL_EVENT_DEFAULT_VALUES,
    BusinessInfoSchema,
    ContactInfoSchema,
    ServiceInfoSchema,
    RiskAssessmentSchema
} from '@/zod/SpecialEventFormSchema';

const FormSection = () =>
{
    // Create field references for focus management
    const fieldRefs = useRef({
        BusinessName: useRef(null),
        Address: useRef(null),
        Suburb: useRef(null),
        State: useRef(null),
        Postcode: useRef(null),
        Contact: useRef(null),
        Position: useRef(null),
        Phone: useRef(null),
        Email: useRef(null),
        Accounts: useRef(null),
        Services: useRef(null),
        Dates: useRef(null),
        Bank: useRef(null),
        Amount: useRef(null),
        Parking: useRef(null),
        Security: useRef(null),
        External: useRef(null),
        Internal: useRef(null),
    });

    // State management - exactly like Site-Info
    const [formData, setFormData] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);
    const [quoteFormStep, setQuoteFormStep] = useState(0);
    const [schemaStep, setSchemaStep] = useState(0);
    const [submitButton, setSubmitButton] = useState(false);

    // Step schemas array for reference
    const stepSchemas = [BusinessInfoSchema, ContactInfoSchema, ServiceInfoSchema, RiskAssessmentSchema];
    const quoteFormSchemas = [BusinessInfoSchema, ContactInfoSchema, ServiceInfoSchema];

    // Initialize hooks
    const { currentErrorField, setCurrentErrorField, handleFieldErrors } = useFormErrors(fieldRefs.current);

    const { isSubmitting, isSubmitted, submissionError, handleSubmission } = useFormSubmission({
        formType: 'specialevent',
        formId: 'SpecialEvent',
        onSuccess: (result, finalData) =>
        {
            console.log("Special event form submitted successfully!");
            setShowThankYou(true);
        },
        onError: (error) =>
        {
            console.error("Special event submission failed:", error);
        },
        prepareData: async (data) =>
        {
            return { ...data, formType: "specialevent" };
        }
    });

    // Get default values with proper empty state - exactly like Site-Info
    const getDefaultValues = () => ({
        ...SPECIAL_EVENT_DEFAULT_VALUES,
        ...formData,
    });

    const methods = useForm({
        resolver: zodResolver(createStepSchema(schemaStep)),
        defaultValues: getDefaultValues(),
    });

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = methods;

    // Update resolver when schema step changes - exactly like Site-Info
    useEffect(() =>
    {
        const newSchema = createStepSchema(schemaStep);
        methods.resolver = zodResolver(newSchema);
        reset(getDefaultValues());
    }, [schemaStep, formData]);

    // Step navigation handler - exactly like Site-Info
    const handleStepNavigation = (targetStep) =>
    {
        const currentFormData = getValues();
        setFormData(prev => ({ ...prev, ...currentFormData }));
        setSchemaStep(targetStep);

        if (targetStep <= 2) {
            setQuoteFormStep(targetStep);
        }
    };

    // Focus on franchise form when transitioning - exactly like Site-Info
    const focusOnFranchiseForm = () =>
    {
        setTimeout(() =>
        {
            const franchiseFormFirstField = document.querySelector('[name="Amount"]');
            if (franchiseFormFirstField) {
                franchiseFormFirstField.focus();
                franchiseFormFirstField.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    };

    // Complete form reset function - exactly like Site-Info
    const resetFormState = () =>
    {
        setFormData({ ...SPECIAL_EVENT_DEFAULT_VALUES });
        reset(SPECIAL_EVENT_DEFAULT_VALUES);
        setQuoteFormStep(0);
        setSchemaStep(0);
        setSubmitButton(false);
        setCurrentErrorField(null);
    };

    // Modal close handler that properly resets form - exactly like Site-Info
    const handleModalClose = () =>
    {
        setShowThankYou(false);
        // resetFormState();
    };

    // Main form submission handler - restored original logic with new hooks
    const handleFormSubmit = async (data) =>
    {
        try {
            const updatedFormData = { ...formData, ...data, "formType": "specialevent" };
            setFormData(updatedFormData);

            if (schemaStep < 3) {
                // Progress to next step
                if (quoteFormStep < 2) setQuoteFormStep(prev => prev + 1);
                setSchemaStep(prev => prev + 1);

                // Enable submit button and focus when moving to franchise form
                if (schemaStep === 2) {
                    setSubmitButton(true);
                    focusOnFranchiseForm();
                }
            } else {
                // Final submission
                await handleSubmission(updatedFormData);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            handleFieldErrors({ general: [error.message] });
        }
    };

    return (
        <>
            {/* Contact Content Section - EXACT original UI */}
            <div
                id="content-contact"
                className=" bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px]  1280px:my-[120px]"
            >
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex items-center">
                    <div className="right-contact-row  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
                        <Typography
                            as="h3"
                            fontFamily="montserrat"
                            className="text-[22px] mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
                        >
                            Thanks for that! This is the final step in order to getting
                            your service setup.
                        </Typography>

                        <Divider
                            color="primary"
                            alignment="left"
                            margin="my-5"
                            responsiveClassName='768px:text-left 768px:mx-0'
                        />

                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                        >
                            Please provide us with the necessary contact information and
                            the service schedule that you would like us to implement. Please note that this form needs to be
                            submitted once per location that you wish us to collect cash from or deliver cash to.
                        </Typography>

                        <Typography
                            as="h3"
                            fontFamily="montserrat"
                            className="text-[22px] mt-10 mb-4 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
                        >
                            Please take note of the following conditions
                        </Typography>

                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                        >
                            You MUST have your banking ready to be picked up prior to the arrival of the banking courier.
                            The banking MUST be properly packaged in your nominated banks business express deposit satchels,
                            if you need any clarification or help on how your banking needs to be prepared then please
                            contact us as soon as possible and we will be more than happy to help.
                        </Typography>
                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                        >
                            Extra charges will apply at a rate of $95 plus GST per hour or part thereof if the banking
                            courier is made to wait for banking that is not ready to be picked up upon their arrival at the
                            time you booked. There will also be a charge of 0.75% of the total amount deposited plus GST if
                            the banking is not properly prepared in your nominated banks business express deposit satchels,
                            and the banking courier is unable to successfully lodge it on your behalf and needs to wait
                            until a bank teller manually processes the deposit.
                        </Typography>
                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                        >
                            You <strong>must</strong> also inform your bank that you are having a banking courier service and
                            advise them of the approximate amount of money you are expecting to be deposited, please don&apos;t
                            assume that your deposit will be unconditionally accepted by the bank without them being
                            notified accordingly. If a deposit is not accepted by the bank, then it will need to be returned
                            back to your address at a rate of $275 plus GST.
                        </Typography>
                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                        >
                            If you are not after a once off
                            collection but a regular collection fill out the form located <span
                                className="underline"><strong><a
                                    href="https://www.securecash.com.au/site-info/">HERE</a></strong></span> instead and
                            select &quot;Yes&quot; on the popup.
                        </Typography>
                        <Typography
                            as="p"
                            fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light flex flex-col gap-4"
                        >
                            <span>   To learn more about how we manage information provided you can view our{" "}
                                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/privacy-policy/">Privacy Policy</Link>.</span>
                            <strong>
                                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/austrac/">&lt;&lt; Previous</Link>
                            </strong>
                        </Typography>
                    </div>

                    <div className="[flex:1]">
                        <QuoteForm
                            className=""
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                            handleFormSubmit={handleFormSubmit}
                            currentStep={quoteFormStep}
                            setCurrentStep={setQuoteFormStep}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            schemas={quoteFormSchemas}
                            handleStepNavigation={handleStepNavigation}
                            schemaStep={schemaStep}
                        />
                    </div>
                </div>
            </div>

            {/* Form Section - EXACT original UI */}
            <div
                id="contact-form-section"
                className="inline-block w-full mb-12  480px:mb-[120px]"
            >
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex ">
                    <div className=" 414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10  480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">
                        <Image
                            src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
                            alt="Making A Deal"
                            fill
                            objectFit="cover"
                        />
                    </div>

                    <SiteRiskForm
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                        handleFormSubmit={handleFormSubmit}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                        isFormSubmitted={isSubmitted}
                        setIsFormSubmitted={() => { }} // Handled by submission hook
                        submissionStatus={isSubmitted ? 'success' : submissionError ? 'error' : null}
                        setSubmissionStatus={() => { }} // Handled by submission hook
                        isSubmitting={isSubmitting}
                        getValues={getValues}
                        handleStepNavigation={handleStepNavigation}
                        schemaStep={schemaStep}
                        submitButton={submitButton}
                    />
                </div>

                {/* Display submission error if any */}
                {submissionError && (
                    <div className="max-w-[1366px] mx-auto mt-4">
                        <div className="text-red-600 text-center mb-4 p-4 bg-red-50 border border-red-200 rounded mx-4">
                            <strong>Submission Error:</strong> {submissionError}
                            <button
                                onClick={() => window.location.reload()}
                                className="ml-4 text-blue-600 hover:underline"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ThankYouModal
                showThankYou={showThankYou}
                setIsFormSubmitted={() => { }} // Handled by submission hook
                onClose={handleModalClose}
                type={'Thankyou'}
            />
        </>
    );
};

export default FormSection; "use client";
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