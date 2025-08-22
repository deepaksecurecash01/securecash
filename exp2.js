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
                                } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
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

export default QuoteForm;