"use client";
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

export default FranchiseForm;