"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

import
    {
        FaCalendarAlt,
        FaMoneyBillAlt,
        FaUniversity,
        FaExclamationCircle,
    } from "react-icons/fa";

import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";
import styles from "@/components/common/checkbox/Checkbox.module.css";
import DatePickerFieldWithRef from "../common/forms/elements/DatePickerField";

const ContactFormSchema = z.object({
    Department: z
        .string()
        .min(1, "Please select a department."),
    FullName: z
        .string()
        .min(1, "Full name is required.")
        .min(2, "Full name must be at least 2 characters long."),
    Organisation: z
        .string()
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long."),
    Phone: z
        .string()
        .min(1, "Phone number is required.")
        .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number.")
        .min(8, "Phone number must be at least 8 digits."),
    Email: z
        .string()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
    ChkCallBack: z
        .string()
        .optional(),
    CallbackDate: z
        .any()
        .optional(),
    CallbackTime: z
        .string()
        .optional(),
    CallbackState: z
        .string()
        .optional(),
    Message: z
        .string()
        .min(1, "Please tell us how we can help you.")
        .min(10, "Please provide more details about how we can help."),
    BotField: z.string().max(0, "Bot detected!").optional(),
}).refine((data) =>
{
    // Check if callback is requested (checkbox is checked)
    const callbackRequested = data.ChkCallBack === 'Yes, please.';

    if (callbackRequested) {
        // If callback is requested, all callback fields must be filled
        return data.CallbackDate &&
            data.CallbackTime &&
            data.CallbackTime !== '' &&
            data.CallbackState &&
            data.CallbackState !== '';
    }

    return true; // If no callback requested, validation passes
}, {
    message: "When requesting a callback, please select a date, time, and state.",
    path: ["CallbackDate"],
}).refine((data) =>
{
    const callbackRequested = data.ChkCallBack === 'Yes, please.';

    if (callbackRequested && (!data.CallbackTime || data.CallbackTime === '')) {
        return false;
    }
    return true;
}, {
    message: "Please select a callback time.",
    path: ["CallbackTime"],
}).refine((data) =>
{
    const callbackRequested = data.ChkCallBack === 'Yes, please.';

    if (callbackRequested && (!data.CallbackState || data.CallbackState === '')) {
        return false;
    }
    return true;
}, {
    message: "Please select your state.",
    path: ["CallbackState"],
});

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

const focusInput = (ref) =>
{
    if (ref && ref.current) {
        ref.current.focus();
    }
};

const FranchiseForm = () =>
{
    const [currentErrorField, setCurrentErrorField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [formData, setFormData] = useState(null);

    // Create refs for focus management
    const fullNameRef = useRef(null);
    const organisationRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const CallbackDateRef = useRef(null);

    const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: ContactFormSchema ? zodResolver(ContactFormSchema) : undefined,
        defaultValues: {
            Department: "",
            FullName: "",
            Organisation: "",
            Phone: "",
            Email: "",
            ChkCallBack: "", // Explicitly set to empty string
            CallbackDate: "",
            CallbackTime: "",
            CallbackState: "",
            Message: "",
            BotField: "",
        },
    });

    const formatDate = (date) =>
    {
        const unixTimestamp = Math.floor(new Date(date).getTime());
        return unixTimestamp;
    };

    const selectedCallbackDate = watch("CallbackDate");
    const needsCallback = watch("ChkCallBack");

    const handleNumericOnly = (e) =>
    {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setValue(e.target.name, value, { shouldValidate: true, shouldDirty: true });
    };

    // Function to get device information
    const getDeviceInfo = () =>
    {
        const userAgent = navigator.userAgent;

        // Parse browser and version
        let browserInfo = 'Unknown';
        let browserVersion = '';

        if (/Chrome\/([0-9.]+)/.test(userAgent)) {
            const match = userAgent.match(/Chrome\/([0-9.]+)/);
            browserInfo = 'Chrome';
            browserVersion = match[1];
        } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
            const match = userAgent.match(/Firefox\/([0-9.]+)/);
            browserInfo = 'Firefox';
            browserVersion = match[1];
        } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
            const match = userAgent.match(/Version\/([0-9.]+)/);
            browserInfo = 'Safari';
            browserVersion = match[1];
        } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
            const match = userAgent.match(/Edge\/([0-9.]+)/);
            browserInfo = 'Edge';
            browserVersion = match[1];
        }

        // Parse OS information
        let osInfo = 'Unknown';
        if (/Windows NT ([0-9._]+)/.test(userAgent)) {
            const match = userAgent.match(/Windows NT ([0-9._]+)/);
            osInfo = `Windows NT ${match[1]}`;
        } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
            const match = userAgent.match(/Mac OS X ([0-9._]+)/);
            osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
        } else if (/Android ([0-9.]+)/.test(userAgent)) {
            const match = userAgent.match(/Android ([0-9.]+)/);
            osInfo = `Android ${match[1]}`;
        } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
            const match = userAgent.match(/OS ([0-9._]+)/);
            osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
        } else if (/Linux/.test(userAgent)) {
            osInfo = 'Linux';
        }

        return {
            fullUserAgent: userAgent,
            browser: browserInfo,
            browserVersion: browserVersion,
            os: osInfo,
        };
    };

    // Function to get IP address
    const getIPAddress = async () =>
    {
        try {
            // Try multiple IP services for reliability
            const ipServices = [
                'https://api.ipify.org?format=json',
                'https://ipapi.co/json/',
                'https://api.ip.sb/jsonip',
            ];

            for (const service of ipServices) {
                try {
                    const response = await fetch(service);
                    const data = await response.json();

                    // Different services return IP in different formats
                    if (data.ip) return data.ip;
                    if (data.query) return data.query;

                } catch (error) {
                    console.log(`IP service ${service} failed:`, error);
                    continue;
                }
            }

            return 'Unable to detect';
        } catch (error) {
            console.error('Error fetching IP:', error);
            return 'Unable to detect';
        }
    };

    // Focus management effect
    useEffect(() =>
    {
        if (errors && Object.keys(errors).length > 0) {
            const errorField = Object.keys(errors)[0]; // Get the first error field
            setCurrentErrorField(errorField);

            const focusMap = {
                FullName: fullNameRef,
                Organisation: organisationRef,
                Phone: phoneRef,
                Email: emailRef,
                Message: messageRef,
                CallbackDate: CallbackDateRef,
            };

            const refToFocus = focusMap[errorField];
            if (refToFocus) {
                focusInput(refToFocus);
            }
        } else {
            setCurrentErrorField(null);
        }
    }, [errors]);

    useEffect(() =>
    {
        if (submissionStatus) {
            const timer = setTimeout(() =>
            {
                // dispatch(setPopupForm("")); // Uncomment if using Redux
                setTimeout(() =>
                {
                    setSubmissionStatus(null);
                }, 1000);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [submissionStatus]);

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

    const departmentOptions = [
        { value: "", label: "Please select a department..." },
        { value: "customers", label: "Customer Service" },
        { value: "sales", label: "Sales" },
        { value: "operations", label: "Operations" },
    ];

    const bestTimeOptions = [
        { value: "", label: "Please Select" },
        { value: "9:30am", label: "9:30am" },
        { value: "10:00am", label: "10:00am" },
        { value: "10:30am", label: "10:30am" },
        { value: "11:00am", label: "11:00am" },
        { value: "11:30am", label: "11:30am" },
        { value: "12:00pm", label: "12:00pm" },
        { value: "12:30pm", label: "12:30pm" },
        { value: "1:00pm", label: "1:00pm" },
        { value: "1:30pm", label: "1:30pm" },
        { value: "2:00pm", label: "2:00pm" },
        { value: "2:30pm", label: "2:30pm" },
        { value: "3:00pm", label: "3:00pm" },
        { value: "3:30pm", label: "3:30pm" },
        { value: "4:00pm", label: "4:00pm" },
        { value: "4:30pm", label: "4:30pm" },
        { value: "5:00pm", label: "5:00pm" },
        { value: "5:30pm", label: "5:30pm" },
        { value: "6:00pm", label: "6:00pm" },
        { value: "6:30pm", label: "6:30pm" },
        { value: "7:00pm", label: "7:00pm" },
    ];

    const stateOptions = [
        { value: "", label: "Please Select" },
        { value: "NSW", label: "NSW" },
        { value: "VIC", label: "VIC" },
        { value: "QLD", label: "QLD" },
        { value: "WA", label: "WA" },
        { value: "SA", label: "SA" },
        { value: "TAS", label: "TAS" },
        { value: "ACT", label: "ACT" },
        { value: "NT", label: "NT" },
        { value: "NZ", label: "NZ" },
    ];

    const handleFormSubmit = async (data) =>
    {
   
        try {
            // Basic validation
            if (!data.Department || !data.FullName || !data.Email || !data.Message) {
                console.log("Missing required fields:");
                console.log("Department:", data.Department);
                console.log("FullName:", data.FullName);
                console.log("Email:", data.Email);
                console.log("Message:", data.Message);
                alert("Please fill in all required fields.");
                return;
            }

            // Check honeypot field
            if (data.BotField) {
                console.log("Bot detected.");
                return;
            }

            console.log("All validations passed, proceeding with submission...");

            setIsSubmitting(true);

            // Get device information
            const deviceInfo = getDeviceInfo();

            // Get IP address
            const ipAddress = await getIPAddress();

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

            // Add timestamp, form ID, and device info
            const finalData = {
                "formType": "contact",
                ...data,
                timestamp: new Date().toISOString(),
                formId: "Contact",
                submissionId: `contact_${Date.now()}`,
                "IP Address": ipAddress,
                "Device": deviceInfo.fullUserAgent,
                "Browser": `${deviceInfo.browser} ${deviceInfo.browserVersion}`,
                "Operating System": deviceInfo.os,
                dateOfSubmission: dateOfSubmission,
            };

            console.log("Final contact form data:", finalData);

            // Uncomment this section when you want to make the actual API call
            const response = await fetch("/api/forms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit the form");
            }

            const result = await response.json();

            // Store form data for use in Calendly
            setFormData(finalData);

            // Set form as submitted
            setIsFormSubmitted(true);
            setIsSubmitted(true);
            setIsSubmitting(false);

            console.log("Form submitted successfully!");

            // Reset form after successful submission
            // setTimeout(() =>
            // {
            //     reset();
            //     setIsSubmitted(false);
            //     setIsFormSubmitted(false);
            // }, 3000);

        } catch (error) {
            console.error("Form submission error:", error);
            setIsSubmitting(false);

            // Show error message to user
            alert("There was an error submitting your form. Please try again.");
        }
    };

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Contact"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
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
                            options={departmentOptions}
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
                                    options={bestTimeOptions}
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
                                    options={stateOptions}
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