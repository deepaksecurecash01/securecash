"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// Enhanced Zod schema for AUSTRAC form validation
const AUSTRACFormSchema = z.object({
  Organisation: z
    .string()
    .nonempty("Organisation name is required.")
    .min(2, "Organisation name must be at least 2 characters long."),
  ABN: z
    .string()
    .nonempty("ABN number is required.")
    .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
    .refine((abn) =>
    {
      // Remove spaces and check if it's 11 digits
      const cleanABN = abn.replace(/\s/g, '');
      return cleanABN.length === 11;
    }, {
      message: "ABN must be exactly 11 digits.",
    }),
  Website: z
    .string()
    .nonempty("Website is required.").url("Please enter a valid URL."),
  OrganisationEmail: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  OrganisationType: z
    .string()
    .nonempty("Organisation type is required."),
  Address: z
    .string()
    .nonempty("Address is required.")
    .min(5, "Address must be at least 5 characters long."),
  State: z
    .string()
    .nonempty("State is required."),
  Personnel: z
    .string()
    .nonempty("Personnel information is required.")
    .min(10, "Please provide detailed personnel information."),
  BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
});

// Focus utility function
const focusInput = (ref) =>
{
  if (ref && ref.current) {
    ref.current.focus();
  }
};

const AUSTRACForm = ({ className }) =>
{
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Create refs for focus management
  const organisationRef = useRef(null);
  const abnRef = useRef(null);
  const websiteRef = useRef(null);
  const emailRef = useRef(null);
  const organisationTypeRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const personnelRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AUSTRACFormSchema),
  });

  const abnValue = watch("ABN");

  // Focus management effect
  useEffect(() =>
  {
    if (errors && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      setCurrentErrorField(errorField);

      const focusMap = {
        Organisation: organisationRef,
        ABN: abnRef,
        Website: websiteRef,
        OrganisationEmail: emailRef,
        OrganisationType: organisationTypeRef,
        Address: addressRef,
        State: stateRef,
        Personnel: personnelRef,
      };

      const refToFocus = focusMap[errorField];
      if (refToFocus) {
        focusInput(refToFocus);
      } else {
        console.warn(`Unhandled error field: ${errorField}`);
      }
    } else {
      setCurrentErrorField(null);
    }
  }, [errors]);

  const inputFields = [
    {
      label: "What is your organisation's name?",
      name: "Organisation",
      placeholder: "e.g. Smith Holdings Pty Ltd or South Park Primary School",
      Icon: FaBuilding,
      errorMessage: "Please enter your organisations full name.",
      ref: organisationRef,
    },
    {
      label: "What is the organisation's main website?",
      name: "Website",
      placeholder: "e.g. https://www.smithholdings.com.au",
      Icon: FaGlobe,
      errorMessage: "Please enter your organisation's main website.",
      ref: websiteRef,
    },
    {
      label: "What is the organisation's main email address?",
      name: "OrganisationEmail",
      type: "email",
      placeholder: "e.g. admin@smithholdings.com.au",
      Icon: FaEnvelope,
      errorMessage: "Please enter your organisation's main email address.",
      ref: emailRef,
    },
    {
      label: "What is the address of the head office?",
      name: "Address",
      placeholder: "e.g. 38 Main South Road Blacktown QLD 6987",
      Icon: FaHome,
      errorMessage: "Please enter the address of your head office.",
      ref: addressRef,
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

  const handleFormSubmit = async (data) =>
  {
    try {
      // Check honeypot field
      if (data.BotField) {
        console.log("Bot detected.");
        return;
      }

      setIsSubmitting(true);

      // Get device information
      const deviceInfo = getDeviceInfo();

      // Get IP address
      const ipAddress = await getIPAddress();

      // Format date of submission
      // Format date of acceptance as "Wednesday, July 9th 2025, 6:48:31 am"
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

      // Add timestamp and form ID
      const finalData = {
        "formType": "austrac",
        ...data,
        timestamp: new Date().toISOString(),
        formId: "AUSTRAC",
        submissionId: `austrac_${Date.now()}`,
        "IP Address": ipAddress,
        "Device": deviceInfo.fullUserAgent, // Use full user agent instead of deviceString
        dateOfSubmission: dateOfSubmission,
      };

      console.log("AUSTRAC form data:", finalData);

      // Make the API call
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

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form
      reset();

      // Redirect to /austrac on successful submission
      router.push("/site-info");
      // Auto-hide success message after 3 seconds
      setTimeout(() =>
      {
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);

      // You might want to show an error message to the user
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="AUSTRAC"
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

        {/* Hidden ABN field for form validation */}
        <input
          type="hidden"
          {...register("ABN")}
          value={abnValue || ""}
        />

        <div className="form-page austrac">
          <div className="form-tab 480px:w-[90%] mx-auto">
            {/* Organisation Name */}
            <div className="relative">
              <InputField
                {...inputFields[0]}
                register={register}
                errors={errors}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                ref={organisationRef}
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
              abnRef={abnRef}
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
                ref={addressRef}
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
                    ref={personnelRef}
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
          </div>
        </div>

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

export default AUSTRACForm;