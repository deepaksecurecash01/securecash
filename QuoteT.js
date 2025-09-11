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

export default QuoteForm; import React from "react";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import { InputField } from "../elements/InputField";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

const CheckboxGroup = ({
    label,
    name,
    options,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) => (
    <div className=" text-left relative">
        <label className="text-white text-base inline-block mt-4 mb-2">
            {label}
        </label>
        <div className="control-wrapper relative flex flex-row justify-around items-center w-full mt-2">
            {options.map((option, index) => (
                <Checkbox
                    label={option.label}
                    key={index}
                    value={option.value}
                    name={name}
                    register={register}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                    className="chkbox float-left text-left relative  "
                />
            ))}
            {errors[name] && (
                <WarningPopup
                    error={errors[name]?.message}
                    isFirstError={currentErrorField === name}
                    className={"top-12 left-[70px]"}
                />
            )}
        </div>
    </div>
);

const Quote = ({
    inputFields,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const serviceOptions = [
        { label: "Banking", value: "Banking" },
        { label: "Change", value: "Change" },
    ];

    return (
        <div className="form-page quote">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-montserrat text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
                Want a quote from SecureCash?
            </Typography>

            <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-white  font-normal text-center capitalize pb-4 text-[16px]"
            >
                We Just Need A Few Details
            </Typography>


            <Divider
                color="primary" // Custom gold color
                margin="mt-4" // Margin-top 4
                alignment="center" // Center alignment
            />

            <div className="form-tab  480px:w-[90%] mx-auto">
                {inputFields?.map((field, index) => (
                    <InputField
                        key={index}
                        {...field}
                        register={register}
                        errors={errors}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                ))}
                <CheckboxGroup
                    label="Services You Require"
                    name="Service"
                    options={serviceOptions}
                    register={register}
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />
            </div>
        </div>
    );
};

export default Quote;
import React from "react";
import
{
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaDollarSign,
    FaExclamationCircle,
} from "react-icons/fa";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import SelectOption from "@/components/common/forms/elements/SelectOption";
import { InputField } from "../elements/InputField";
import { SelectionBox } from "../elements/SelectionBox";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";


const Change = ({
    frequencyOptions,
    amountOptions,
    daysOfWeek,
    register,
    setValue,

    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const selectionBoxes = [
        {
            label: "Frequency for change?",
            name: "ChangeFrequency",
            icon: FaCalendarAlt,
            options: frequencyOptions,
        },
        {
            label: "Average notes value?",
            name: "ChangeNotesAmount",
            icon: FaMoneyBillAlt,
            options: amountOptions,
        },
    ];
    return (
        <div className="form-page change ">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
                Change
            </Typography>

            <Divider
                color="primary" // Custom gold color
                margin="mt-4" // Margin-top 4
                alignment="center" // Center alignment
            />
            <div className="form-tab 480px:w-[90%] mx-auto ">
                {selectionBoxes.map((box, index) => (
                    <SelectionBox
                        key={index}
                        label={box.label}
                        name={box.name}
                        register={register}
                        Icon={box.icon}
                        setValue={setValue}
                        options={box.options}
                        errors={errors}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                ))}
                <InputField
                    label="Average coins value?"
                    name="ChangeCoinsAmount"
                    register={register}
                    Icon={FaMoneyBillAlt}
                    Icon2={FaDollarSign}
                    placeholder="Enter amount"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />
            </div>
            <div className="form-tab 480px:w-[90%] mx-auto">
                <div>
                    <h5 className="checkboxHeaderText pt-6 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize">
                        Usual day/s for delivery?
                    </h5>
                    <div className="chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-5 600px:grid-rows-3">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="checkbox-wrapper">
                                <Checkbox
                                    label={day}
                                    key={index}
                                    value={day}
                                    name={"ChangeDays"}
                                    register={register}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                    className="chkbox  768px:w-[150px] float-left text-left relative "
                                />
                            </div>
                        ))}
                        {errors?.ChangeDays && (
                            <WarningPopup
                                error={errors?.ChangeDays?.message}
                                isFirstError={currentErrorField === "ChangeDays"}
                                className={`top-[150px]`}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="form-tab 480px:w-[90%] mx-auto">
                <div className="comment-container w-full mx-auto text-left block clear-both">
                    <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
                        Comments
                    </label>
                    <textarea
                        className="w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white focus:outline-primary"
                        name="ChangeComments"
                        {...register("ChangeComments")}
                        data-validate="Multiline"
                        placeholder="Anything else you would like us to know?"
                        rows="3"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Change;
import React from "react";
import
{
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaUniversity,
    FaExclamationCircle,
} from "react-icons/fa";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import SelectOption from "@/components/common/forms/elements/SelectOption";
import { InputField } from "@/components/common/forms/elements/InputField";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

import { SelectionBox } from "../elements/SelectionBox";

const Banking = ({
    frequencyOptions,
    amountOptions,
    daysOfWeek,
    register,
    setValue,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const selectionBoxes = [
        {
            label: "Collection Frequency",
            name: "BankingFrequency",
            icon: FaCalendarAlt,
            options: frequencyOptions,
        },
        {
            label: "Average Collection Amount",
            name: "BankingAmount",
            icon: FaMoneyBillAlt,
            options: amountOptions,
        },
    ];
    return (
        <div className="form-page banking">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
                Banking
            </Typography>


            <Divider
                color="primary"
                margin="mt-4" // Margin-top 4
                alignment="center" // Center alignment
            />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {selectionBoxes.map((box, index) => (
                    <SelectionBox
                        key={index}
                        label={box.label}
                        name={box.name}
                        register={register}
                        Icon={box.icon}
                        setValue={setValue}
                        options={box.options}
                        errors={errors}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                ))}
                <InputField
                    label="Who Do You Bank With?"
                    name="BankingBank"
                    register={register}
                    Icon={FaUniversity}
                    placeholder="Who do you bank with?"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />
            </div>

            <div className="form-tab 480px:w-[90%] mx-auto">
                {/* Usual day/s for collection */}
                <div>
                    <h5 className="checkboxHeaderText pt-6 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize">
                        Usual day/s for collection?
                    </h5>
                    <div className="chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-4 600px:grid-rows-3">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="checkbox-wrapper">
                                <Checkbox
                                    label={day}
                                    key={index}
                                    value={day}
                                    name={"BankingDays"}
                                    register={register}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                    className="chkbox  768px:w-[150px] float-left text-left relative "
                                />
                            </div>
                        ))}
                        {errors?.BankingDays && (
                            <WarningPopup
                                error={errors?.BankingDays?.message}
                                isFirstError={currentErrorField === "BankingDays"}
                                className={`top-[150px]`}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="form-tab 480px:w-[90%] mx-auto">
                <div className="comment-container w-full mx-auto text-left block clear-both">
                    <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
                        Comments
                    </label>
                    <textarea
                        className="w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white focus:outline-primary"
                        name="BankingComments"
                        {...register("BankingComments")}
                        data-validate="Multiline"
                        placeholder="Anything else you would like us to know?"
                        rows="3"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Banking;
import { useState } from "react";
import WarningPopup from "./WarningPopup";

export const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    Icon2,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
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
import { useState } from "react";
import SelectOption from "./SelectOption";
import WarningPopup from "./WarningPopup";

export const SelectionBox = ({
    label,
    name,
    setValue,
    Icon,
    options,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative">
            <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
                {label}
            </label>
            <div className="input-container input-container-select w-full mx-auto text-left flex items-center relative">
                <Icon
                    className={`icon absolute text-[22px] rounded-l bg-black min-w-[20px] text-center ml-4 ${hasError
                        ? "text-red-500"
                        : isFocused
                            ? "text-primary"
                            : "text-white"
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
                />
                <i className={`rotate-45 inline-block border-solid border-white border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text `} />
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
import React from 'react';

const SelectOption = ({
    register,
    setValue,
    setCurrentErrorField,
    options,
    isFocused,
    hasError,
    setIsFocused,
    name,
}) =>
{
    return (
        <select
            className={`w-full text-sm rounded-md border border-white pl-12 shadow-none font-[Montserrat] bg-black text-white leading-6 h-9 appearance-none ${hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary"
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
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectOptionimport { FaExclamation; } from "react-icons/fa";

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