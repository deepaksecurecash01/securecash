"use client";
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

export default FormSection;
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
{
    FaUser,
    FaUsers,
    FaPhone,
    FaEnvelope,
    FaHome,
    FaMapMarkerAlt,
    FaBuilding,
    FaCalendarAlt,
    FaUniversity,
    FaChevronLeft,
} from "react-icons/fa";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import SelectOption from "@/components/common/forms/elements/SelectOption";
import { InputField } from "@/components/common/forms/elements/InputField";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import { SelectionBox } from "../elements/SelectionBox";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const CheckboxGroup = ({
    label,
    name,
    options,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    className = "",
    footnote = "",
}) => (
    <div className="text-left relative">
        <label className="checkboxHeaderText pt-4 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize">
            {label}
        </label>
        <div className="chkbox-container w-full mx-auto text-left relative ">
            <div className="chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-4">
                {options.map((option, index) => (
                    <Checkbox
                        label={option.label}
                        key={index}
                        value={option.value}
                        name={name}
                        register={register}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                        className="chkbox  768px:w-[150px] float-left text-left relative "
                    />
                ))}
            </div>

            {footnote && (
                <p
                    className="text-sm text-gray-300 italic"
                    style={{ textAlign: "left" }}
                >
                    {footnote}
                </p>
            )}
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

const CheckboxGroup2 = ({
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
        <div className="control-wrapper relative flex flex-row justify-between items-center w-3/4 ">
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

const BusinessInfo = ({
    register,
    errors,
    setValue,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const stateOptions = [
        { value: "select", label: "Please Select" },
        { value: "VIC", label: "Victoria" },
        { value: "NSW", label: "New South Wales" },
        { value: "QLD", label: "Queensland" },
        { value: "WA", label: "Western Australia" },
        { value: "SA", label: "South Australia" },
        { value: "TAS", label: "Tasmania" },
        { value: "ACT", label: "Australian Capital Territory" },
        { value: "NT", label: "Northern Territory" },
        { value: "NZ", label: "New Zealand" },
    ];

    return (
        <div className="form-page business-info mt-[40px]">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
                Business Information
            </Typography>

            <Divider color="primary" margin="mt-2.5 mb-4" alignment="center" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {/* Hidden Type field */}
                <input type="hidden" {...register("Type")} value="Regular Service" />

                <InputField
                    label="What is the business name of this location?"
                    name="BusinessName"
                    register={register}
                    Icon={FaBuilding}
                    placeholder="e.g. Joes Supermarket"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="What is the number & street for this location?"
                    name="Address"
                    register={register}
                    Icon={FaHome}
                    placeholder="e.g. 49 Commercial Road"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="What is the suburb for this location?"
                    name="Suburb"
                    register={register}
                    Icon={FaMapMarkerAlt}
                    placeholder="e.g. Port Adelaide"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <div className="flex flex-col 600px:flex-row  600px:gap-4">
                    <div className=" 600px:w-[80%]">
                        <SelectionBox
                            label="What state is this location in?"
                            name="State"
                            register={register}
                            Icon={FaMapMarkerAlt}
                            setValue={setValue}
                            options={stateOptions}
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                        />
                    </div>
                    <div className="">
                        <InputField
                            label="Postcode"
                            name="Postcode"
                            register={register}
                            Icon={FaMapMarkerAlt}
                            placeholder="e.g. 5015"
                            errors={errors}
                            currentErrorField={currentErrorField}
                            setCurrentErrorField={setCurrentErrorField}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactInfo = ({
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    return (
        <div className="form-page contact-info mt-[40px]">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
                Contact Information
            </Typography>

            <Divider color="primary" margin="mt-2.5 mb-4" alignment="center" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                <InputField
                    label="Who will be the main contact person at this location?"
                    name="Contact"
                    register={register}
                    Icon={FaUser}
                    placeholder="e.g. Usually the Manager or Supervisor"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="What is their position or role at this location?"
                    name="Position"
                    register={register}
                    Icon={FaUsers}
                    placeholder="e.g. Manager, Finance Officer, etc"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="What is their best contact number?"
                    name="Phone"
                    register={register}
                    Icon={FaPhone}
                    placeholder="Mobile telephone preferred if available"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="What is the email address at this location?"
                    name="Email"
                    type="email"
                    register={register}
                    Icon={FaEnvelope}
                    placeholder="Our service procedures & registers will be sent to this address"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />

                <InputField
                    label="Email address to send accounts?"
                    name="Accounts"
                    type="email"
                    register={register}
                    Icon={FaEnvelope}
                    placeholder="Our invoice will be sent to this email address for this location."
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />
            </div>
        </div>
    );
};

const OtherInfo = ({
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
}) =>
{
    const serviceOptions = [
        { label: "Banking", value: "Banking Courier Service" },
        { label: "Change", value: "Change Order Service" },
    ];

    const scheduleOptions = [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
        { label: "Weekly", value: "Weekly" },
        { label: "Fortnightly", value: "Fortnightly" },
        { label: "Monthly", value: "Monthly" },
        { label: "Ad hoc", value: "Ad Hoc" },
    ];

    return (
        <div className="form-page other-info mt-[40px]">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
                Other Information
            </Typography>

            <Divider color="primary" margin="mt-2.5 mb-4" alignment="center" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                <CheckboxGroup2
                    label="What services do you require at this location?"
                    name="Services"
                    options={serviceOptions}
                    register={register}
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                    className="flex-row justify-start"
                />

                <div className="form-control">
                    <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
                        What date would you like to commence this service?
                    </label>
                    <div className="input-container relative">
                        <input
                            type="date"
                            {...register("Dates")}
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm`}
                            min="2021-03-15"
                        />
                        {errors.Dates && (
                            <WarningPopup
                                error={errors.Dates?.message}
                                isFirstError={currentErrorField === "Dates"}
                                className={"top-12 left-[70px]"}
                            />
                        )}
                    </div>
                </div>

                <CheckboxGroup
                    label="Please tick both your preferred schedule days and frequency of service."
                    name="Schedule"
                    options={scheduleOptions}
                    register={register}
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                    className="grid grid-cols-3 gap-2"
                    footnote="Eg. Weekly - Monday, Wednesday & Friday."
                />

                <InputField
                    label="Which bank does this location use?"
                    name="Bank"
                    register={register}
                    Icon={FaUniversity}
                    placeholder="Eg. Commonwealth Bank"
                    errors={errors}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                />
            </div>
        </div>
    );
};

// Updated QuoteForm component with proper step navigation

const QuoteForm = ({
    className,
    formData,
    setFormData,
    handleSubmit,
    handleFormSubmit,
    currentStep,
    setCurrentStep,
    register,
    errors,
    setValue,
    currentErrorField,
    setCurrentErrorField,
    schemas,
    handleStepNavigation, // New prop
    schemaStep, // New prop
}) =>
{

    // Handle back button - use navigation function instead of direct step change
    const handleBack = () =>
    {
        if (currentStep > 0) {
            handleStepNavigation(currentStep - 1);
        }
    };

    // Handle form submission - only submit if we're moving forward
    const onSubmit = (data) =>
    {
        // If we're on step 3 and trying to submit a previous step's form,
        // just navigate to the next step without full submission
        if (schemaStep === 3 && currentStep < 2) {
            handleStepNavigation(currentStep + 1);
            return;
        }

        // Otherwise, use the normal submission handler
        handleFormSubmit(data);
    };


    const renderFormStep = () =>
    {
        switch (schemaStep) {
            case 0:
                return (
                    <BusinessInfo
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                );
            case 1:
                return (
                    <ContactInfo
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                );
            case 2:
                return (
                    <OtherInfo
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        currentErrorField={currentErrorField}
                        setCurrentErrorField={setCurrentErrorField}
                    />
                );
            case 3:
                return (
                    <div className=" h-full flex flex-col items-center justify-center gap-2">
                        <Typography
                            as="h4"
                            fontFamily="montserrat"
                            className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
                        >
                            Review & Edit Previous Steps
                        </Typography>
                        <div className="">

                            <button
                                type="button"
                                onClick={() => handleStepNavigation(2)}
                                className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"                  >
                                Edit Form
                            </button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div
            className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center h-[844px] ${className}`}
        >
            <form
                className="forms-site-info h-auto px-[30px] 1366px:h-full submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a] relative "
                data-formid="SiteInfo"
                onSubmit={handleSubmit(onSubmit)} // Use our custom onSubmit
                noValidate
            >
                {/* Back button for steps 1 and 2 */}
                {schemaStep > 0 && schemaStep !== 3 && (
                    <div className="form-slide-btn-wrap mb-4 absolute">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center text-white hover:text-[#c6a54b] transition-colors"
                        >
                            <FaChevronLeft className="mr-2" />
                            <span>Back</span>
                        </button>
                    </div>
                )}
                <div className={`${schemaStep === 3 && "h-full"}`}>{renderFormStep()}</div>
                {schemaStep !== 3 && (<div className="button-controls-container w-[80%] mx-auto mt-7">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"
                        >
                            {currentStep === schemas.length - 1 ? "Continue" : "Next"}
                        </button>
                    </div>
                </div>)}
            </form>
        </div>
    );
};

export default QuoteForm;
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

import { SiteRiskFormSchema } from "@/zod/SiteRiskFormSchema"; // You'll need to create this
import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";
import styles from "@/components/common/checkbox/Checkbox.module.css";
import Divider from "@/components/common/Divider";
import ScrollableSection from "@/components/layout/ScrollbarSection";

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
                            required: "This field is required" // Add validation rule
                        })}
                        onChange={(e) =>
                        {
                            setValue(name, e.target.value, {
                                shouldValidate: true,
                                shouldDirty: true, // Mark field as dirty
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
    handleStepNavigation, // New prop
    schemaStep, // New prop
    submitButton
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
            setCurrentErrorField(errorField);
        } else {
            setCurrentErrorField(null);
        }
    }, [errors]);

    useEffect(() =>
    {
        if (submissionStatus) {
            const timer = setTimeout(() =>
            {
                setSubmissionStatus(null);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [submissionStatus]);




    return (
        <div className="float-none 992px:w-[80%] 992px:float-left relative left-0 flex justify-center ">
            <form
                className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-4  600px:px-8 480px:px-[5%] 1366px:h-full submit-status w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative  1366px:pt-[74px]  1366px:pb-[84px]"
                data-formid="SiteInfo"
                style={{ background: "#f1f1f1" }}
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
            >
                <div className="form-tab 480px:w-[90%] mx-auto">
                    <Typography
                        as="h3"
                        fontFamily="montserrat"
                        className="text-[22px] font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
                    >
                        Site Risk Information
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
                        className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
                    >
                        Please provide us with the information below so our Area Managers
                        and Banking Couriers can better identify any potential hazards or
                        dangers at this location.
                    </Typography>

                    <ScrollableSection className="h-auto 992px:w-full p-0 mx-auto 992px:h-[480px]  600px:pr-10">
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
                                        className={`nextBtn  ${isFormSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b] hover:opacity-80 cursor-pointer'} text-white border-none py-[15px] 768px:px-0 text-[16px]  w-full rounded-[40px] outline-none appearance-none  p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
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
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";

// Constants
const MODAL_TYPES = {
    THANKYOU: 'Thankyou',
    BUSINESS: 'Business'
};

const MODAL_STYLES = {
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        pointerEvents: "all",
    },
    content: {
        pointerEvents: "all",
        zIndex: 99999,
    },
    button: {
        pointerEvents: "all",
        cursor: "pointer",
        zIndex: 999999,
    }
};

export default function ThankYouModal({
    setIsFormSubmitted,
    onClose,
    type,
    showThankYou = false,
})
{
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Determine if modal should be visible
    const shouldShowModal = type === MODAL_TYPES.THANKYOU ? showThankYou : true;

    // Body scroll management
    const manageBodyScroll = useCallback((lock) =>
    {
        if (lock) {
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;
            document.body.classList.add("modal-on");
        } else {
            const scrollY = document.body.style.top;
            document.body.classList.remove("modal-on");
            document.body.style.top = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, []);

    // Modal control functions
    const closeModal = useCallback(() =>
    {
        setIsOpen(false);
        setIsFormSubmitted?.(false);
        onClose?.();
    }, [setIsFormSubmitted, onClose]);

    // Event handlers
    const handleModalContentClick = useCallback((e) =>
    {
        e.stopPropagation();
    }, []);

    const createNavigationHandler = useCallback((path, additionalAction) =>
    {
        return (e) =>
        {
            e.preventDefault();
            e.stopPropagation();
            additionalAction?.();
            closeModal();
            if (path) {
                router.push(path);
            }
        };
    }, [router, closeModal]);

    // Navigation handlers
    const handleAddAnotherLocation = createNavigationHandler();
    const handleReturnToHomepage = createNavigationHandler("/");
    const handleYesClick = createNavigationHandler();
    const handleNoClick = createNavigationHandler("/special-event");

    // Effects
    useEffect(() =>
    {
        setIsOpen(shouldShowModal);
    }, [shouldShowModal]);

    useEffect(() =>
    {
        manageBodyScroll(isOpen && shouldShowModal);

        return () => manageBodyScroll(false);
    }, [isOpen, shouldShowModal, manageBodyScroll]);

    // Early return if modal should not be shown
    if (!isOpen || !shouldShowModal) {
        return null;
    }

    // Modal renderers
    const renderThankYouModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card flex flex-col items-center justify-center relative"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <FaCheckCircle className="text-[#4bb543] text-[68px] mb-4" />

                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Thank you! All these details have been sent through. You will receive
                    a confirmation email shortly.
                </p>

                <p className="business-type-thank-you--card__text mb-4">
                    For any further inquiries, please contact{" "}
                    <a href="mailto:customers@securecash.com.au" className="text-primary">
                        customers@securecash.com.au
                    </a>
                </p>

                <div className="business-type-thank-you--card__btn-wrap w-full">
                    <Link href="/add-location">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            onClick={handleAddAnotherLocation}
                            style={MODAL_STYLES.button}
                        >
                            Add another Location
                        </button>
                    </Link>
                    <Link href="/">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            onClick={handleReturnToHomepage}
                            style={MODAL_STYLES.button}
                        >
                            Return to Homepage
                        </button>
                    </Link>
                </div>

                <button
                    className="absolute -top-[13px] -right-[11px] bg-black p-2 rounded-full"
                    onClick={closeModal}
                    style={MODAL_STYLES.button}
                >
                    <FaTimes className="text-[#ffff] text-[20px]" />
                </button>
            </div>
        </div>
    );

    const renderBusinessModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Is this going to be a regular service?
                </p>
                <p className="business-type-dailog-box--card__text">
                    If so, then please click <span>&apos;Yes&apos;</span>.
                </p>
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    If not and it is only going to be for a once off special event e.g.
                    School Fete or after hours Function
                </p>
                <p className="business-type-dailog-box--card__text">
                    then please click <span>&apos;No&apos;</span>.
                </p>
                <div className="business-type-dailog-box--card__btn-wrap">
                    <button
                        className="btn-gold-alt btn-location-submit btn-yes"
                        onClick={handleYesClick}
                        style={MODAL_STYLES.button}
                    >
                        Yes
                    </button>
                    <button
                        className="btn-black btn-location-submit btn-no"
                        onClick={handleNoClick}
                        style={MODAL_STYLES.button}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );

    // Render appropriate modal based on type
    const modalRenderers = {
        [MODAL_TYPES.THANKYOU]: renderThankYouModal,
        [MODAL_TYPES.BUSINESS]: renderBusinessModal,
    };

    const ModalRenderer = modalRenderers[type];
    return ModalRenderer ? <ModalRenderer /> : null;
} "use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";

const MODAL_TYPES = {
    THANKYOU: 'Thankyou',
    BUSINESS: 'Business'
};

const MODAL_STYLES = {
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        pointerEvents: "all",
    },
    content: {
        pointerEvents: "all",
        zIndex: 99999,
    },
    button: {
        pointerEvents: "all",
        cursor: "pointer",
        zIndex: 999999,
    }
};

export default function ThankYouModal({
    setIsFormSubmitted,
    onClose,
    type,
})
{
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const router = useRouter();

    // Body scroll management functions
    const applyBodyStyles = useCallback(() =>
    {
        const scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add("modal-on");
    }, []);

    const resetBodyStyles = useCallback(() =>
    {
        const scrollY = document.body.style.top;
        document.body.classList.remove("modal-on");
        document.body.style.top = "";

        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, []);

    // Modal state management
    const closeModal = useCallback(() =>
    {
        setIsOpen(false);
        setIsFormSubmitted?.(false);
        onClose?.();
    }, [setIsFormSubmitted, onClose]);

    // Event handlers
    const handleModalContentClick = useCallback((e) =>
    {
        e.stopPropagation();
    }, []);

    const handleBackdropClick = useCallback(() =>
    {
        closeModal();
    }, [closeModal]);

    const handleAddAnotherLocation = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    }, [closeModal]);

    const handleReturnToHomepage = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        router.push("/");
        closeModal();
    }, [router, closeModal]);

    const handleYesClick = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    }, [closeModal]);

    const handleNoClick = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
        router.push("/special-event");
    }, [router, closeModal]);

    // Effects
    useEffect(() =>
    {
        console.log('showModal changed:', showModal);
        setIsOpen(showModal);
    }, [showModal]);

    useEffect(() =>
    {
        console.log('Effect triggered - isOpen:', isOpen, 'showModal:', showModal, 'type:', type);
        if (isOpen && showModal) {
            console.log('Applying body styles for type:', type);
            applyBodyStyles();
        } else {
            console.log('Resetting body styles for type:', type);
            resetBodyStyles();
        }

        return resetBodyStyles;
    }, [isOpen, showModal, applyBodyStyles, resetBodyStyles, type]);

    // Early return if modal should not be shown
    if (!isOpen || !showModal) {
        return null;
    }

    // Render Thank You Modal
    const renderThankYouModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card flex flex-col items-center justify-center relative"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <FaCheckCircle className="text-[#4bb543] text-[68px] mb-4" />

                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Thank you! All these details have been sent through. You will receive
                    a confirmation email shortly.
                </p>

                <p className="business-type-thank-you--card__text mb-4">
                    For any further inquiries, please contact{" "}
                    <a href="mailto:customers@securecash.com.au" className="text-primary">
                        customers@securecash.com.au
                    </a>
                </p>

                <div className="business-type-thank-you--card__btn-wrap w-full">
                    <Link href="/add-location">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            onClick={handleAddAnotherLocation}
                            style={MODAL_STYLES.button}
                        >
                            Add another Location
                        </button>
                    </Link>
                    <Link href="/">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            onClick={handleReturnToHomepage}
                            style={MODAL_STYLES.button}
                        >
                            Return to Homepage
                        </button>
                    </Link>
                </div>

                <button
                    className="absolute -top-[13px] -right-[11px] bg-black p-2 rounded-full"
                    onClick={closeModal}
                    style={MODAL_STYLES.button}
                >
                    <FaTimes className="text-[#ffff] text-[20px]" />
                </button>
            </div>
        </div>
    );

    // Render Business Modal
    const renderBusinessModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Is this going to be a regular service?
                </p>
                <p className="business-type-dailog-box--card__text">
                    If so, then please click <span>&apos;Yes&apos;</span>.
                </p>
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    If not and it is only going to be for a once off special event e.g.
                    School Fete or after hours Function
                </p>
                <p className="business-type-dailog-box--card__text">
                    then please click <span>&apos;No&apos;</span>.
                </p>
                <div className="business-type-dailog-box--card__btn-wrap">
                    <button
                        className="btn-gold-alt btn-location-submit btn-yes"
                        onClick={handleYesClick}
                    >
                        Yes
                    </button>
                    <button
                        className="btn-black btn-location-submit btn-no"
                        onClick={handleNoClick}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );

    // Main render
    return (
        <>
            {type === MODAL_TYPES.THANKYOU && renderThankYouModal()}
            {type === MODAL_TYPES.BUSINESS && renderBusinessModal()}
        </>
    );
}// /hooks/useFormErrors.js
import { useState } from 'react';
import { focusInput } from '@/utils/formHelpers';

export const useFormErrors = (fieldRefs) =>
{
    const [currentErrorField, setCurrentErrorField] = useState(null);
    const [submissionError, setSubmissionError] = useState(null);
    // Handle field validation errors and focus management
    const handleFieldErrors = (validationErrors) =>
    {
        if (validationErrors && Object.keys(validationErrors).length > 0) {
            const errorField = Object.keys(validationErrors)[0];
            setCurrentErrorField(errorField);

            // Focus the field if ref is available
            const refToFocus = fieldRefs[errorField];
            if (refToFocus) {
                focusInput(refToFocus);
            }
            return false; // Validation failed
        } else {
            setCurrentErrorField(null);
            return true; // Validation passed
        }
    };

    // Handle API/network submission errors
    const handleSubmissionError = (error) =>
    {
        const errorMessage = error?.message || error || 'An error occurred during submission';
        setSubmissionError(errorMessage);
    };

    // Clear submission errors (useful for retry scenarios)
    const clearSubmissionError = () => setSubmissionError(null);

    // Clear all errors
    const clearAllErrors = () =>
    {
        setCurrentErrorField(null);
        setSubmissionError(null);
    };

    return {
        // Field error state
        currentErrorField,
        setCurrentErrorField,
        handleFieldErrors,

        // Submission error state  
        submissionError,
        handleSubmissionError,
        clearSubmissionError,

        // Utilities
        clearAllErrors
    };
};// /hooks/useFormSubmission.js
import { useState } from 'react';
import { submitForm } from '@/utils/apiClient';
import { prepareFormMetadata } from '@/utils/formHelpers';

export const useFormSubmission = ({
    formType,
    formId,
    onSuccess,
    onError,
    prepareData, // Optional data transformation function
    enableHoneypot = true,
    submitEndpoint = "/api/forms" // Allow custom endpoints
}) =>
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    const handleSubmission = async (formData) =>
    {
        try {
            // Reset previous states
            setSubmissionError(null);

            // Check honeypot field if enabled
            if (enableHoneypot && formData.BotField) {
                console.log("Bot detected, ignoring submission");
                return;
            }

            setIsSubmitting(true);

            // Prepare metadata
            const metadata = await prepareFormMetadata(formType, formId);

            // Prepare final data
            let finalData = {
                ...formData,
                ...metadata
            };

            // Apply custom data preparation if provided
            if (prepareData && typeof prepareData === 'function') {
                finalData = await prepareData(finalData);
            }

            console.log(`${formType} form submission:`, finalData);

            // Submit to API
            const result = await submitForm(finalData, submitEndpoint);
            console.log("API Response:", result);

            setIsSubmitted(true);
            setIsSubmitting(false);

            // Call success handler
            if (onSuccess) {
                onSuccess(result, finalData);
            }

            return result;

        } catch (error) {
            console.error("Form submission error:", error);
            setIsSubmitting(false);
            setSubmissionError(error.message);

            // Call error handler
            if (onError) {
                onError(error, formData);
            }

            throw error; // Re-throw so caller can handle if needed
        }
    };

    const resetSubmission = () =>
    {
        setIsSubmitting(false);
        setIsSubmitted(false);
        setSubmissionError(null);
    };

    return {
        isSubmitting,
        isSubmitted,
        submissionError,
        handleSubmission,
        resetSubmission
    };
};