"use client";
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
    } from "react-icons/fa";

import
    {
        FaCalendarAlt,
        FaMoneyBillAlt,
        FaUniversity,
        FaExclamationCircle,
    } from "react-icons/fa";

import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FranchiseFormSchema } from "@/zod/FranchiseFormSchema";
import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";
import styles from "@/components/common/checkbox/Checkbox.module.css";

const Checkbox = ({
    value,
    className = "",
    style = {},
    register,
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
                    name={value}
                    value={value}
                    {...checkboxProps}
                    onFocus={() => setCurrentErrorField(name)}
                    onBlur={() => setCurrentErrorField(null)}
                    data-validate="CheckboxMulti"
                    className={` mt-2 text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer`}
                />

            <label
                className="font-medium inline-block mt-4 text-left w-full relative"
                htmlFor={value}
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
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

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
                        rows="3"
                        required
                    ></textarea>
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
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
    disabled = false, // Added disabled prop with default value
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
                    disabled={disabled} // Pass disabled prop to SelectOption
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

// Fixed version of the SelectOption component to handle disabled state
const SelectOption = ({
    register,
    setValue,
    setCurrentErrorField,
    options,
    isFocused,
    hasError,
    setIsFocused,
    name,
    disabled = false, // Added disabled prop with default value
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

                setCurrentErrorField(null); // Reset error field when a selection is made
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
            disabled={disabled} // Add disabled attribute
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
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', or 'error'

    const [formData, setFormData] = useState(null);
    const calendlyURL =
        "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FranchiseFormSchema),
    });

    const formatDate = (date) =>
    {
        const unixTimestamp = Math.floor(new Date(date).getTime());
        return unixTimestamp;
    };

    const selectedCallbackDate = watch("CallbackDate");
    const needsCallback = watch("BankingDays");
  

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
        },
        {
            label: "Organisation Name",
            name: "Organisation",
            placeholder: "Enter your organisation name",
            Icon: FaBuilding,
            errorMessage: "Please enter your organisation name.",
        },
        {
            label: "Phone Number",
            name: "Phone",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
            errorMessage: "Please enter your phone number.",
        },
        {
            label: "Email Address",
            name: "Email",
            type: "email",
            placeholder: "Your email address",
            Icon: FaEnvelope,
            errorMessage: "Please enter your email address.",
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
            // Add timestamp
            const finalData = {
                ...data,
                timestamp: new Date().toISOString(),
                formId: "Franchise",
            };

            console.log("Final form data:", finalData);
            // Your API call here
            // await api.submitForm(finalData);

            // Store form data for use in Calendly
            setFormData(finalData);

            // Set form as submitted
            setIsFormSubmitted(true);

            // Open Calendly popup
            setIsCalendlyOpen(true);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    };

    const CallbackDateRef = useRef(null);
 

    useEffect(() =>
    {
        if (errors) {
            const errorField = Object.keys(errors)[0]; // Get the first error field
            setCurrentErrorField(errorField);

            switch (errorField) {
                case "CallbackDate":
                    focusInput(CallbackDateRef);
                    break;

                default:
                    focusInput(null); // Handle other errors (consider a more specific approach)
            }
        } else {
            setCurrentErrorField(null);
        }
    }, [errors, CallbackDateRef]);

    useEffect(() =>
    {
        if (submissionStatus) {
            const timer = setTimeout(() =>
            {
                dispatch(setPopupForm("")); // Dispatch blank value when closing modal
                setTimeout(() =>
                {
                    setSubmissionStatus(null);
                }, 1000);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [submissionStatus]);

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Franchise"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    <>
                        {/* Only Department Selection Box at the top */}
                        <SelectionBox
                            label="Which Department?"
                            name="Department"
                            register={register}
                            Icon={FaUsers}
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
                            />
                        ))}

                        {/* Callback checkbox */}
                        <div className="checkbox-wrapper">
                            <Checkbox
                                label={'I would like to be called back by a representative.'}
                                value={'day'}
                                name={"BankingDays"}
                                register={register}
                                currentErrorField={currentErrorField}
                                setCurrentErrorField={setCurrentErrorField}
                                className="chkbox float-left text-left mt-4 mb-2 relative text-primary-text"
                            />
                        </div>

                        {/* Date picker - styled to match theme and full width */}
                        <div className="relative w-full mt-4">
                            <label
                                className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0"
                                htmlFor="CallbackDate"
                            >
                                {`Pick a time that suits you and we'll call you back!`}
                            </label>
                            <DatePicker
                                value={selectedCallbackDate || null}
                                onChange={(date) =>
                                {
                                    setValue("CallbackDate", date, { shouldValidate: true });
                                }}
                                onFocus={() => setCurrentErrorField("CallbackDate")}
                                onBlur={() => setCurrentErrorField(null)}
                                dayPlaceholder="DD"
                                monthPlaceholder="MM"
                                yearPlaceholder="YYYY"
                                errors={errors}
                                ref={CallbackDateRef}
                                format="dd/MM/yyyy"
                                autoComplete="new-password"
                                className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left border-white leading-6 appearance-none  ${!needsCallback ? 'opacity-50 focus:outline-red-600 focus:border-none focus:ring-0' : 'focus:outline-primary'}`}
                                disabled={!needsCallback} // Disable if checkbox is not checked
                            />
                            {errors.CallbackDate && (
                                <WarningPopup
                                    error={errors.CallbackDate.message}
                                    isFirstError={currentErrorField === "CallbackDate"}
                                />
                            )}
                        </div>

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
                        />
                    </>
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

                            <p className="mb-6 ">
                                Your form has been submitted successfully. The meeting scheduler
                                should appear shortly.
                            </p>
                        </div>
                    </div>
                )}
                <div className="button-controls-container w-[80%] mx-auto mt-7">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default FranchiseForm;