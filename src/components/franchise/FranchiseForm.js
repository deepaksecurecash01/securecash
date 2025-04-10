"use client";
import React, { useState } from "react";
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
} from "react-icons/fa";
import { PopupModal } from "react-calendly";

import { FranchiseFormSchema } from "@/zod/FranchiseFormSchema";
import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";

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
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left">
                {label}
            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-md border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
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

const FranchiseForm = () =>
{
    const [currentErrorField, setCurrentErrorField] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const calendlyURL =
        "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FranchiseFormSchema),
    });

    const inputFields = [
        {
            label: "Full Name",
            name: "FullName",
            placeholder: "Enter your full name",
            Icon: FaUser,
            errorMessage: "Please enter your full name.",
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
        {
            label: "Address",
            name: "Address",
            placeholder: "Enter your address",
            Icon: FaHome,
            errorMessage: "Please enter your address.",
        },
        {
            label: "Territory/Area/Suburb of Interest",
            name: "InterestedArea",
            placeholder: "What territory/area/suburb are you interested in?",
            Icon: FaMapMarkerAlt,
            errorMessage:
                "Please specify what territory/area/suburb you are interested in.",
        },
        {
            label: "What interests you in a SecureCash Franchise?",
            name: "ReasonForInterest",
            placeholder:
                "Briefly tell us why you're interested in a SecureCash franchise",
            Icon: FaInfoCircle,
            errorMessage: "Please tell us why you're interested in a franchise.",
            textarea: true,
        },
        {
            label: "How did you hear about this Opportunity?",
            name: "ReferralSource",
            placeholder: "E.g., Google, Social Media, Referral",
            Icon: FaQuestionCircle,
            errorMessage: "Please let us know how you heard about this opportunity.",
        },
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

    return (
        <div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center  414px:mx-4 992px:mx-0">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-[30px] 1366px:h-full submit-status  992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
                data-formid="Franchise"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    <>
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

                        <div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left">
                            After submitting the form, please pick a time from the popup
                            screen for a video meeting.
                        </div>
                    </>
                </div>
                {isFormSubmitted && (
                    <div
                        className="form-submitted-message text-center py-4 absolute h-full  top-0 flex justify-center items-center bg-[#f1f1f1] z-10"
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
                            Submit
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

export default FranchiseForm;
