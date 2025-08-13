"use client";
import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import Quote from "./Quote";
import Banking from "./Banking";
import Change from "./Change";

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


  // Fix 1: Update the ChangeSchema frequency options to match the frequencyOptions array
  const ChangeSchema = z.object({
    ChangeFrequency: z.enum(
      ["Weekly", "Fortnightly", "Monthly", "Ad Hoc"], // Remove this line
      ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"], // Add this line
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
      .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount for coins.") // Fix regex pattern
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

// Device and IP utilities
const getDeviceInfo = () =>
{
  const userAgent = navigator.userAgent;
  let browserInfo = 'Unknown';
  let browserVersion = '';

  const browserPatterns = [
    { name: 'Chrome', pattern: /Chrome\/([0-9.]+)/ },
    { name: 'Firefox', pattern: /Firefox\/([0-9.]+)/ },
    { name: 'Safari', pattern: /Version\/([0-9.]+).*Safari/ },
    { name: 'Edge', pattern: /Edge\/([0-9.]+)/ }
  ];

  for (const { name, pattern } of browserPatterns) {
    const match = userAgent.match(pattern);
    if (match) {
      browserInfo = name;
      browserVersion = match[1];
      break;
    }
  }

  let osInfo = 'Unknown';
  const osPatterns = [
    { name: 'Windows NT', pattern: /Windows NT ([0-9._]+)/, format: (v) => `Windows NT ${v}` },
    { name: 'Mac OS X', pattern: /Mac OS X ([0-9._]+)/, format: (v) => `Mac OS X ${v.replace(/_/g, '.')}` },
    { name: 'Android', pattern: /Android ([0-9.]+)/, format: (v) => `Android ${v}` },
    { name: 'iOS', pattern: /OS ([0-9._]+)/, format: (v) => `iOS ${v.replace(/_/g, '.')}`, condition: /iPhone|iPad/.test(userAgent) },
    { name: 'Linux', pattern: /Linux/, format: () => 'Linux' }
  ];

  for (const { pattern, format, condition } of osPatterns) {
    if (condition && !condition) continue;
    const match = userAgent.match(pattern);
    if (match) {
      osInfo = format(match[1] || '');
      break;
    }
  }

  return {
    fullUserAgent: userAgent,
    browser: browserInfo,
    browserVersion: browserVersion,
    os: osInfo
  };
};

const getIPAddress = async () =>
{
  const ipServices = [
    'https://api.ipify.org?format=json',
    'https://ipapi.co/json/',
    'https://api.ip.sb/jsonip',
  ];

  for (const service of ipServices) {
    try {
      const response = await fetch(service);
      const data = await response.json();
      if (data.ip || data.query) return data.ip || data.query;
    } catch (error) {
      console.log(`IP service ${service} failed:`, error);
    }
  }
  return 'Unable to detect';
};

const QuoteForm = ({ className }) =>
{
  // State management
  const [formData, setFormData] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);

  // Form submission states
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get schemas
  const { QuoteFormSchema, BankingSchema, ChangeSchema } = createValidationSchemas();

  // Create dynamic schema based on current step and selected services
  const createCombinedSchema = (step, services) =>
  {
    const baseFields = {
      Service: z.array(z.string()).optional(),
      BankingFrequency: z.string().optional(),
      BankingAmount: z.string().optional(),
      BankingBank: z.string().optional(),
      BankingDays: z.array(z.string()).optional(),
      BankingComments: z.string().optional(),
      ChangeFrequency: z.string().optional(),
      ChangeNotesAmount: z.string().optional(),
      ChangeCoinsAmount: z.string().optional(),
      ChangeDays: z.array(z.string()).optional(),
      ChangeComments: z.string().optional(),
    };

    switch (step) {
      case 0:
        return QuoteFormSchema.extend(baseFields);
      case 1:
        if (services.includes("Banking")) {
          return BankingSchema.extend({
            ...baseFields,
            // Override with optional fields for non-Banking fields
            ChangeFrequency: z.string().optional(),
            ChangeNotesAmount: z.string().optional(),
            ChangeCoinsAmount: z.string().optional(),
            ChangeDays: z.array(z.string()).optional(),
            ChangeComments: z.string().optional(),
          });
        }
        return z.object(baseFields);
      case 2:
        if (services.includes("Change")) {
          return ChangeSchema.extend({
            ...baseFields,
            // Override with optional fields for non-Change fields
            BankingFrequency: z.string().optional(),
            BankingAmount: z.string().optional(),
            BankingBank: z.string().optional(),
            BankingDays: z.array(z.string()).optional(),
            BankingComments: z.string().optional(),
          });
        }
        return z.object(baseFields);
      default:
        return z.object(baseFields);
    }
  };

  // Get default values
  const getDefaultValues = () => ({
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
    ...formData,
  });

  const methods = useForm({
    resolver: zodResolver(createCombinedSchema(currentStep, selectedServices)),
    defaultValues: getDefaultValues(),
  });

  const { register, handleSubmit, trigger, setValue, getValues, reset, formState: { errors } } = methods;

  // Update resolver when step or services change
  useEffect(() =>
  {
    const newSchema = createCombinedSchema(currentStep, selectedServices);
    methods.resolver = zodResolver(newSchema);

    // Don't reset the form data, just update the resolver
    // This prevents losing the previously entered data
    const currentValues = getValues();
    const mergedValues = { ...getDefaultValues(), ...formData, ...currentValues };

    // Only reset with merged values if there's actual data to preserve
    if (Object.keys(formData).length > 0) {
      reset(mergedValues);
    }
  }, [currentStep, selectedServices]);

  // Input field configurations
  const inputFields = [
    {
      label: "Full Name",
      name: "Name",
      placeholder: "Enter your full name",
      Icon: FaUser,
      errorMessage: "Please enter your full name.",
    },
    {
      label: "Organisation Name",
      name: "Organisation",
      placeholder: "Enter your organisation's name",
      Icon: FaUsers,
      errorMessage: "Please enter your organisation's name.",
    },
    {
      label: "Phone Number",
      name: "Phone",
      placeholder: "Enter your phone number",
      Icon: FaPhone,
      errorMessage: "Please enter your phone number.",
    },
    {
      label: "Where Did You Hear About Us?",
      name: "Referrer",
      placeholder: "Enter where did you hear about us",
      Icon: FaComments,
      errorMessage: "Please enter where did you hear about us.",
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
      label: "Postal Address",
      name: "Address",
      placeholder: "Enter your postal address",
      Icon: FaHome,
      errorMessage: "Please enter your postal address.",
    },
    {
      label: "Location/s For Service",
      name: "Locations",
      placeholder: "Enter location/s for the service (Suburb, State, Postcode)",
      Icon: FaMapMarkerAlt,
      errorMessage: "Please enter the location/s at where you require services.",
    },
  ];

  const frequencyOptions = [
    { value: "", label: "Please select..." },
    { value: "Weekly", label: "Weekly" },
    { value: "Fortnightly", label: "Fortnightly" },
    { value: "Ad Hoc", label: "Ad Hoc" },
    { value: "Special Event (once off)", label: "Special Event (once off)" },
  ];

  const changeFrequencyOptions = [
    { value: "", label: "Please select…" },
    { value: "Weekly", label: "Weekly" },
    { value: "Fortnightly", label: "Fortnightly" },
    { value: "Monthly", label: "Monthly" }, // Remove this if not needed
    { value: "Ad Hoc", label: "Ad Hoc" },
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

  // API submission handler
  const submitToAPI = async (finalData) =>
  {
    const deviceInfo = getDeviceInfo();
    const ipAddress = await getIPAddress();

    const payload = {
      ...finalData,
      deviceInfo: deviceInfo.fullUserAgent,
      ipAddress: ipAddress,
      timestamp: new Date().toISOString(),
      FormID: "quote",
    };

    console.log("Submitting to API:", payload);

    const response = await fetch("/api/forms", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }

    return response.json();
  };

  // Complete form reset function
  const resetFormState = () =>
  {
    const emptyFormData = {
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
    };

    setFormData(emptyFormData);
    reset(emptyFormData);
    setCurrentStep(0);
    setSelectedServices([]);
    setCurrentErrorField(null);
    setSubmissionStatus(null);
  };

  // Modal close handler
  const handleModalClose = () =>
  {
    setShowThankYou(false);
    setIsFormSubmitted(false);
    resetFormState();
  };

  const handleFormSubmit = async (data) =>
  {
    try {
      // Get current form values first
      const currentFormData = getValues();
      console.log("Current form data:", currentFormData);
      console.log("Submitted data:", data);

      // Merge the data properly
      const updatedFormData = {
        ...formData, ...currentFormData, ...data, "formType": "quote",
 };
      console.log("Updated form data:", updatedFormData);

      setFormData(updatedFormData);

      if (currentStep === 0) {
        // First step - capture services and base info
        const services = data.Service || [];
        setSelectedServices(services);

        if (services.includes("Banking")) {
          setCurrentStep(1);
        } else if (services.includes("Change")) {
          setCurrentStep(2);
        } else {
          // No services selected, submit with base info only
          await finalSubmission(updatedFormData);
        }
      } else if (currentStep === 1) {
        // Banking step
        if (selectedServices.includes("Change")) {
          setCurrentStep(2);
        } else {
          // Only Banking service, submit
          await finalSubmission(updatedFormData);
        }
      } else if (currentStep === 2) {
        // Change step - final submission
        await finalSubmission(updatedFormData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus('error');
    }
  };

  const finalSubmission = async (finalData) =>
  {
    setIsSubmitting(true);

    console.log("Final submission data:", finalData);
    console.log("Change fields:", {
      ChangeFrequency: finalData.ChangeFrequency,
      ChangeNotesAmount: finalData.ChangeNotesAmount,
      ChangeCoinsAmount: finalData.ChangeCoinsAmount,
      ChangeDays: finalData.ChangeDays,
      ChangeComments: finalData.ChangeComments
    });

    try {
      const result = await submitToAPI(finalData);
      console.log('API Response:', result);

      setIsSubmitting(false);
      setIsFormSubmitted(true);
      setSubmissionStatus('success');
      setShowThankYou(true); // Add this line to show thank you modal

    } catch (apiError) {
      console.error('API submission error:', apiError);
      setIsSubmitting(false);
      setSubmissionStatus('error');
    }
  };

  // Render current form step
  const renderFormStep = () =>
  {
    switch (currentStep) {
      case 0:
        return (
          <Quote
            inputFields={inputFields}
            register={register}
            errors={errors}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        );
      case 1:
        return selectedServices.includes("Banking") ? (
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
      case 2:
        return selectedServices.includes("Change") ? (
          <Change
            frequencyOptions={changeFrequencyOptions} // Use separate options for Change
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

  // Calculate if this is the final step
  const isFinalStep = () =>
  {
    if (currentStep === 0) return false;
    if (currentStep === 1 && !selectedServices.includes("Change")) return true;
    if (currentStep === 2) return true;
    return false;
  };

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[546px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="Quote"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        {renderFormStep()}

        <div className="button-controls-container w-[80%] mx-auto mt-7">
          <div className="button-section relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : (isFinalStep() ? "Submit" : "Next")}
            </button>
          </div>
        </div>
      </form>


    </div>
  );
};

export default QuoteForm;