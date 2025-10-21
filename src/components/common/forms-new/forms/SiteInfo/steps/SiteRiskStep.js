// /components/forms/SiteRiskForm.js - COMPATIBILITY WRAPPER FOR LEGACY COMPONENT

"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
    {
        FaMoneyBillAlt,
        FaUser,
        FaBriefcase,
        FaEnvelope,
        FaCalendarAlt,
        FaUsers,
        FaIdCard,
        FaSpinner,
        FaCheckCircle,
        FaCircle,
    } from "react-icons/fa";

import { RiskAssessmentSchema } from "@/zod/SiteInfoFormSchema";
import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import styles from "@/components/common/checkbox/Checkbox.module.css";
import ScrollableSection from "@/components/layout/ScrollbarSection";

// Legacy Checkbox Component - Keep original styling with improved focus handling
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
                onFocus={() => setCurrentErrorField && setCurrentErrorField(name)}
                onBlur={() =>
                {
                    // Only clear if this field was the current error field
                    if (currentErrorField === name) {
                        setCurrentErrorField && setCurrentErrorField(null);
                    }
                }}
                data-validate="CheckboxMulti"
                className={` text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer`}
            />

            <label
                className="font-light text-left w-full relative flex"
                htmlFor={value}
            >
                <span className="w-[28px] h-[28px]"></span>
                <div>{label}</div>
            </label>
        </div>
    );
};

// Legacy SelectionBox Component - Keep original styling  
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
    footnote,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <FaCircle className="text-primary text-[8px] mt-3 mr-3 flex-shrink-0 absolute top-3 " />

            <div className="pl-4 ">
                <div className="flex items-start mb-2">
                    <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                        {label}
                    </label>
                </div>
                <div className="input-container input-container-select w-full mx-auto text-left flex items-center relative rounded-[2px] border">
                    <Icon
                        className={`icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4 ${hasError
                            ? "text-red-500"
                            : isFocused
                                ? "text-primary"
                                : "text-[#999]"
                            }`}
                    />
                    <select
                        className={`w-full text-sm rounded-sm border border-white pl-12 shadow-none leading-6 h-9 appearance-none ${hasError
                            ? "focus:outline-red-600 focus:border-none focus:ring-0"
                            : "focus:outline-primary"
                            }`}
                        {...register(name, {
                            required: "This field is required"
                        })}
                        onChange={(e) =>
                        {
                            if (setValue) {
                                setValue(name, e.target.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                });
                            }
                            if (setCurrentErrorField) setCurrentErrorField(null);
                        }}
                        onFocus={() =>
                        {
                            if (setCurrentErrorField) setCurrentErrorField(name);
                            setIsFocused(true);
                        }}
                        onBlur={() =>
                        {
                            if (setCurrentErrorField) setCurrentErrorField(null);
                            setIsFocused(false);
                        }}
                        name={name}
                        data-validate="Inline"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <i
                        className={`rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text`}
                    />

                    {errors[name] && (
                        <WarningPopup
                            error={errors[name]?.message}
                            isFirstError={currentErrorField === name}
                        />
                    )}
                </div>
                {footnote && (
                    <p
                        className="text-sm text-gray-600 mt-2 italic"
                        style={{ textAlign: "left" }}
                    >
                        {footnote}
                    </p>
                )}
            </div>
        </div>
    );
};

// Legacy CheckboxGroup Component - Keep original styling
const CheckboxGroup = ({
    label,
    name,
    options,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    footnote,
}) =>
{
    return (
        <div className="relative mt-4">
            <FaCircle className="text-primary text-[8px] mt-3 mr-3 flex-shrink-0 absolute top-3 " />

            <div className="pl-4">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    {label}
                </label>

                <div className="chkbox-container w-full mx-auto text-left relative ">
                    {options.map((option, index) => (
                        <Checkbox
                            key={index}
                            label={option.label}
                            value={option.value}
                            name={name}
                            register={register}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            className="chkbox float-left text-left mt-2 mb-2 relative text-primary-text w-full"
                        />
                    ))}
                </div>

                {footnote && (
                    <p
                        className="text-sm text-gray-600 mt-2 italic"
                        style={{ textAlign: "left" }}
                    >
                        {footnote}
                    </p>
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

// Main SiteRiskForm Component - COMPATIBILITY WRAPPER
const SiteRiskForm = ({
    register,
    errors,
    setValue,
    getValues,
    handleSubmit,
    handleFormSubmit,
    currentErrorField,
    setCurrentErrorField,
    isFormSubmitted,
    setIsFormSubmitted,
    submissionStatus,
    setSubmissionStatus,
    isSubmitting,
    handleStepNavigation,
    schemaStep,
    submitButton,
    formData, // NEW: Bridge data from form manager
    setFormData, // NEW: Bridge data back to form manager
}) =>
{
    const amountOptions = [
        { value: "", label: "Select Amount:" },
        { value: "$100 to $500", label: "$100 to $500" },
        { value: "$500 to $1,000", label: "$500 to $1,000" },
        { value: "$1,000 to 5,000", label: "$1,000 to 5,000" },
        { value: "$5,000 to $10,000", label: "$5,000 to $10,000" },
        { value: "$10,000 to $20,000", label: "$10,000 to $20,000" },
        { value: "$20,000 to $25,000", label: "$20,000 to $25,000" },
        { value: "$25,000 to $50,000", label: "$25,000 to $50,000" },
        { value: "$50,000 to $100,000", label: "$50,000 to $100,000" },
        { value: "$100,000+", label: "$100,000 Plus" },
    ];

    const parkingOptions = [
        {
            value: "* There is on street parking available.",
            label: "There is on street parking available.",
        },
        {
            value: "* You will need to pay for parking.",
            label: "You will need to pay for parking.",
        },
        {
            value: "* There are loading zones on the street.",
            label: "There are loading zones on the street.",
        },
        {
            value: "* There is off street parking available.",
            label: "There is off street parking available.",
        },
        {
            value: "* You are able to park onsite.",
            label: "You are able to park onsite.",
        },
    ];

    const securityOptions = [
        {
            value: "* We have a dedicated cash office.",
            label: "We have a dedicated cash office.",
        },
        {
            value: "* We have an enclosed room.",
            label: "We have an enclosed room.",
        },
        { value: "* We have a hold up alarm.", label: "We have a hold up alarm." },
        {
            value: "* There are CCTV cameras onsite.",
            label: "There are CCTV cameras onsite.",
        },
        {
            value: "* We have security guards onsite.",
            label: "We have security guards onsite.",
        },
        {
            value: "* We have reliable staff backup onsite.",
            label: "We have reliable staff backup onsite.",
        },
        {
            value: "* We use door intercoms to let people in.",
            label: "We use door intercoms to let people in.",
        },
        {
            value: "* We have swipe cards or pin codes on public entrances.",
            label: "We have swipe cards or pin codes on public entrances.",
        },
    ];

    const externalOptions = [
        {
            value: "* There are areas that an offender could hide.",
            label: "There are areas that an offender could hide.",
        },
        {
            value: "* There is poor lighting at this site.",
            label: "There is poor lighting at this site.",
        },
        {
            value: "* The public has free access to this site.",
            label: "The public has free access to this site.",
        },
        {
            value: "* You will have to wait to be let in.",
            label: "You will have to wait to be let in.",
        },
        {
            value: "* There are obstacles like plant or machinery at this site.",
            label: "There are obstacles like plant or machinery at this site.",
        },
        {
            value: "* You will have to walk through via a car park.",
            label: "You will have to walk through via a car park.",
        },
        {
            value: "* There are hazards on the approach route.",
            label: "There are hazards on the approach route.",
        },
        {
            value: "* The entrance to the site is not easily visible.",
            label: "The entrance to the site is not easily visible.",
        },
    ];

    const internalOptions = [
        {
            value: "* You will have to wait to be let into the room.",
            label: "You will have to wait to be let into the room.",
        },
        {
            value: "* There are fire doors onsite.",
            label: "There are fire doors onsite.",
        },
        {
            value: "* You will have to go up/down a lift.",
            label: "You will have to go up/down a lift.",
        },
        {
            value: "* You will have to go up/down flights of stairs.",
            label: "You will have to go up/down flights of stairs.",
        },
        {
            value: "* You will have to go up/down escalators.",
            label: "You will have to go up/down escalators.",
        },
        {
            value: "* There are areas where an offender could hide.",
            label: "There are areas where an offender could hide.",
        },
        {
            value: "* You will have to go through doorways.",
            label: "You will have to go through doorways.",
        },
        { value: "* There are steps.", label: "There are steps." },
        { value: "* There are passageways.", label: "There are passageways." },
        {
            value: "* There are slippery floors.",
            label: "There are slippery floors.",
        },
        {
            value: "* There are obstacles like stock or merchandise.",
            label: "There are obstacles like stock or merchandise.",
        },
    ];

    useEffect(() =>
    {
        if (errors) {
            const errorField = Object.keys(errors)[0];
            if (setCurrentErrorField) setCurrentErrorField(errorField);
        } else {
            if (setCurrentErrorField) setCurrentErrorField(null);
        }
    }, [errors, setCurrentErrorField]);

    useEffect(() =>
    {
        if (submissionStatus && setSubmissionStatus) {
            const timer = setTimeout(() =>
            {
                setSubmissionStatus(null);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [submissionStatus, setSubmissionStatus]);

    return (
        <div className="float-none 992px:w-[80%] 992px:float-left relative left-0 flex justify-center">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-4 600px:px-8 480px:px-[5%] 1366px:h-full submit-status w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative 1366px:pt-[74px] 1366px:pb-[84px]"
                data-formid="SiteInfo"
                style={{ background: "#f1f1f1" }}
                onSubmit={(e) =>
                {
                    e.preventDefault();
                    // Only call handleFormSubmit if it exists and we have a submit button
                    if (handleFormSubmit && submitButton) {
                        handleFormSubmit();
                    }
                }}
                noValidate
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    <h3
                       
                        className="text-[22px] font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0 font-montserrat"
                    >
                        Site Risk Information
                    </h3>

                    <hr

                        className="my-5 w-[100px] 768px:text-left 768px:mx-0 h-[4px] rounded-[5px] border-0 bg-primary mx-auto 768px:ml-0  768px:mr-auto"
                    />

                    <p

                        className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light font-montserrat"
                    >
                        Please provide us with the information below so our Area Managers
                        and Banking Couriers can better identify any potential hazards or
                        dangers at this location.
                    </p>

                    <ScrollableSection className="h-auto 992px:w-full p-0 mx-auto 992px:h-[480px] 600px:pr-10">
                        {/* Amount Selection */}
                        <SelectionBox
                            label="What is the average amount of cash that we might be expected to collect or deliver at this location?"
                            name="Amount"
                            register={register}
                            setValue={setValue}
                            Icon={FaMoneyBillAlt}
                            options={amountOptions}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            footnote="E.g., If the collection is around $6,000, the average collection amount would be $5,000 to $10,000."
                        />

                        {/* Parking Recommendations */}
                        <CheckboxGroup
                            label="What are the parking recommendations for location?"
                            name="Parking"
                            options={parkingOptions}
                            register={register}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            footnote="Please tick what is applicable at this location."
                        />

                        {/* Security Features */}
                        <CheckboxGroup
                            label="Are any of these security features at this location?"
                            name="Security"
                            options={securityOptions}
                            register={register}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            footnote="Please tick what is applicable at this location."
                        />

                        {/* External Hazards */}
                        <CheckboxGroup
                            label="What potential EXTERNAL hazards are at this location?"
                            name="External"
                            options={externalOptions}
                            register={register}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            footnote="Please tick what is applicable at this location."
                        />

                        {/* Internal Hazards */}
                        <CheckboxGroup
                            label="What potential INTERNAL hazards are at this location?"
                            name="Internal"
                            options={internalOptions}
                            register={register}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                            footnote="Please tick what is applicable at this location."
                        />

                        {submitButton && ( // Only show button if submitButton is true
                            <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
                                <div className="button-section relative">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`nextBtn ${isFormSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b] hover:opacity-80 cursor-pointer'} text-white border-none py-[15px] 768px:px-0 text-[16px] w-full rounded-[40px] outline-none appearance-none p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <FaSpinner className="animate-spin mr-2" />
                                                Submitting, please wait...
                                            </div>
                                        ) : isFormSubmitted ? (
                                            <div className="flex items-center justify-center">
                                                <FaCheckCircle className="text-white mr-2" />
                                                Thank you, we received your submission!
                                            </div>
                                        ) : (
                                            "Submit this location"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </ScrollableSection>
                </div>
            </form>
        </div>
    );
};

export default SiteRiskForm;