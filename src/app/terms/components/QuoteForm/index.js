"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import
  {
    FaUser,
    FaBriefcase,
    FaEnvelope,
    FaCalendarAlt,
    FaUsers,
    FaIdCard,
    FaSpinner,
    FaCheckCircle,
  } from "react-icons/fa";
import { InputField } from "../elements/InputField";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import DatePickerFieldWithRef from "@/components/common/forms/elements/DatePickerField";
import WarningPopup from "../elements/WarningPopup";
import { useRouter } from 'next/navigation';

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

// Enhanced Zod schema for Terms form validation
const TermsFormSchema = z.object({
  Name: z
    .string()
    .nonempty("Full Name is required.")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
    .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
  Position: z
    .string()
    .nonempty("Position is required.")
    .min(2, "Position must be at least 2 characters long."),
  Email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  Birthdate: z
    .date({
      required_error: "Date of Birth is required",
      invalid_type_error: "Date of Birth is required",
    })
    .refine((date) => date <= new Date(), {
      message: "Date of Birth must be in the past or today",
    }),
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
  BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
});

// Focus utility function
const focusInput = (ref) =>
{
  if (ref && ref.current) {
    ref.current.focus();
  }
};

const TermsForm = ({ setName, setPosition, setOrganisation, setAbn }) =>
{
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Create refs for focus management
  const nameRef = useRef(null);
  const positionRef = useRef(null);
  const emailRef = useRef(null);
  const birthdateRef = useRef(null);
  const organisationRef = useRef(null);
  const abnRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TermsFormSchema),
  });

  const nameValue = watch("Name");
  const positionValue = watch("Position");
  const organisationValue = watch("Organisation");
  const abnValue = watch("ABN");
  const birthdateValue = watch("Birthdate");

  useEffect(() =>
  {
    if (nameValue && setName) {
      setName(nameValue);
    }
  }, [nameValue, setName]);

  useEffect(() =>
  {
    if (positionValue && setPosition) {
      setPosition(positionValue);
    }
  }, [positionValue, setPosition]);

  useEffect(() =>
  {
    if (organisationValue && setOrganisation) {
      setOrganisation(organisationValue);
    }
  }, [organisationValue, setOrganisation]);

  useEffect(() =>
  {
    if (abnValue && setAbn) {
      setAbn(abnValue);
    }
  }, [abnValue, setAbn]);

  const inputFields = [
    {
      label: "What is your full name?",
      name: "Name",
      placeholder: "Enter your full name",
      Icon: FaUser,
      errorMessage: "Please enter your full name.",
      ref: nameRef,
    },
    {
      label: "What is your position in the organisation?",
      name: "Position",
      placeholder: "Enter your position in the organisation",
      Icon: FaBriefcase,
      errorMessage: "Please enter your position in the organisation.",
      ref: positionRef,
    },
    {
      label: "What is your email address?",
      name: "Email",
      type: "email",
      placeholder: "Enter your email address",
      Icon: FaEnvelope,
      errorMessage: "Please enter your work email address.",
      ref: emailRef,
    },
    {
      label: "What is your organisation's name?",
      name: "Organisation",
      placeholder: "Enter your organisation's name",
      Icon: FaUsers,
      errorMessage: "Please enter your organisations full name.",
      ref: organisationRef,
    },
  ];

  // Focus management effect
  useEffect(() =>
  {
    if (errors && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      setCurrentErrorField(errorField);

      const focusMap = {
        Name: nameRef,
        Position: positionRef,
        Email: emailRef,
        Birthdate: birthdateRef,
        Organisation: organisationRef,
        ABN: abnRef,
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

  // Function to get device information in the exact format needed
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

    // Parse WebKit version if present
    let webkitVersion = '';
    if (/WebKit\/([0-9.]+)/.test(userAgent)) {
      const match = userAgent.match(/WebKit\/([0-9.]+)/);
      webkitVersion = match[1];
    }

    // Format device info similar to the email example
    let deviceString = '';
    if (browserInfo === 'Chrome') {
      deviceString = `${browserInfo}/${browserVersion}`;
    } else if (browserInfo === 'Safari') {
      deviceString = `${browserInfo}/${browserVersion}`;
    } else if (browserInfo === 'Firefox') {
      deviceString = `${browserInfo}/${browserVersion}`;
    } else {
      deviceString = `${browserInfo}/${browserVersion}`;
    }

    // Add additional browser engine info
    if (webkitVersion) {
      deviceString += ` (WebKit/${webkitVersion})`;
    }

    if (osInfo !== 'Unknown') {
      deviceString += ` ${osInfo}`;
    }

    return {
      deviceString,
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

      // Format birthday as YYYY-MM-DD
      const birthdayFormatted = (() =>
      {
        const date = new Date(data.Birthdate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })();


      // Format date of acceptance as "Wednesday, July 9th 2025, 6:48:31 am"
      const now = new Date();
      const dateOfAcceptance = now.toLocaleDateString('en-US', {
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

      // Format agreement commencement date as DD / MM / YYYY
      const agreementDate = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, ' / ');

      // Format the data exactly like the email structure
      const finalData = {
        // Form data mapped to email structure
        "Organisation Name": data.Organisation,
        "Organisation Role": data.Position,
        "Organisation ABN": data.ABN,
        "Full Name": data.Name,
        "Birthday": birthdayFormatted,
        "Email": data.Email,
        "formType": "terms",
        "IP Address": ipAddress,
        "Device": deviceInfo.fullUserAgent, // Use full user agent instead of deviceString
        "Date of Acceptance": dateOfAcceptance,
        "Agreement Commencement": `**THIS AGREEMENT COMMENCES ON THE:** ${agreementDate} and will be ongoing unless either party terminates this Agreement in accordance with the termination provisions herein ("Expiry").`,

        // Additional system data for backend processing
        timestamp: new Date().toISOString(),
        formId: "Terms",
        submissionId: `terms_${Date.now()}`,
        fullUserAgent: deviceInfo.fullUserAgent,
      };

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
      router.push("/austrac");

    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);

      // You might want to show an error message to the user
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const renderFormFields = () => (
    <>
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

      {inputFields.slice(0, 3).map((field, index) => (
        <div key={index} className="relative">
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

      {/* DatePickerField for Birthdate at 4th position */}
      <div className="relative">
        <DatePickerFieldWithRef
          label="What is your date of birth?"
          name="Birthdate"
          value={birthdateValue}
          onChange={(date) =>
          {
            setValue("Birthdate", date, { shouldValidate: true });
          }}
          onFocus={() => setCurrentErrorField("Birthdate")}
          onBlur={() => setCurrentErrorField(null)}
          errors={errors}
          currentErrorField={currentErrorField}
          dayPlaceholder="DD"
          monthPlaceholder="MM"
          yearPlaceholder="YYYY"
          format="dd/MM/yyyy"
          containerClassName=""
          labelClassName="text-white text-base inline-block mt-4 mb-2 w-full text-left"
          ref={birthdateRef}
          autoComplete="new-password"
        />
      </div>

      {/* Organisation field */}
      <div className="relative">
        <InputField
          {...inputFields[3]}
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

      {/* ABN field with custom handling using the enhanced ABNInputField */}
      <ABNInputField
        label="What is your organisation's ABN number?"
        name="ABN"
        placeholder="Enter your organisation's ABN number (11 digits)"
        Icon={FaIdCard}
        register={register}
        errors={errors}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        setValue={setValue}
        abnValue={abnValue}
        abnRef={abnRef}
      />
    </>
  );

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center `}>
      <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-16 rounded-[6px] bg-[#1a1a1a]">
        <form
          className="text-center"
          data-formid="Terms"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          autoComplete="off"
        >
          <div className="form-page terms">
            <Typography
              as="h3"
              fontFamily="montserrat"
              className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
              Service Agreement
            </Typography>

            <Divider
              color="primary"
              margin="mt-2.5 mb-4"
              alignment="center"
              responsiveClassName="mx-auto"
            />

            <div className="form-tab 480px:w-[90%] mx-auto">
              {renderFormFields()}
            </div>
          </div>

          <div className="button-controls-container 480px:w-[80%] mx-auto mt-12">
            <div className="button-section relative">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`nextBtn  ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'} text-white border-none py-[15px] 768px:px-0 text-[16px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting, please wait...
                  </div>
                ) : isSubmitted ? (
                  <div className="flex items-center justify-center">
                    <FaCheckCircle className="text-white mr-2" />
                    Thank you, we received your submission!
                  </div>
                ) : (
                  "I agree with the above Terms & Conditions"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsForm;