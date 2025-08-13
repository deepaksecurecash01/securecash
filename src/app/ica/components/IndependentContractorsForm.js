"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import FormHeader from "./form-sections/FormHeader";
import PersonalDetailsSection from "./form-sections/PersonalDetailsSection";
import AgreementTermSection from "./form-sections/AgreementTermSection";
import DeedOfGuaranteeSection from "./form-sections/DeedOfGuaranteeSection";
import ExecutedAsDeedSection from "./form-sections/ExecutedAsDeedSection";
import LicensingInsuranceSection from "./form-sections/LicensingInsuranceSection";
import EDocketSystemSection from "./form-sections/EDocketSystemSection";
import DriversSection from "./form-sections/DriversSection";
import { IcaFormSchema } from "@/zod/IcaFormSchema";

const COMPANY_INFO = {
  name: "Office Central Pty Ltd",
  acn: "ACN 668 461 050",
  address: "30 Church Hill Road, Old Noarlunga SA 5168",
  email: "sales@securecash.com.au",
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Submit Button Component
const SubmitButton = ({ isSubmitting, isSubmitted }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'} text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <LoadingSpinner />
        Submitting... Please Wait.
      </span>
    ) : isSubmitted ? (
      "Thank you. We received your submission!"
    ) : (
      "Click here to execute this deed & agreement"
    )}
  </button>
);

// Success Message Component
const SuccessMessage = () => (
  <div className="text-green-600 font-medium">
    <svg
      className="inline w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    Thank you. We received your submission!
  </div>
);

// Progressive image compression function
const compressImageFile = async (file) =>
{
  const targetSizeKB = 400;
  const targetSizeBytes = targetSizeKB * 1024;

  // Compression options in order of preference (quality, maxWidth, maxHeight)
  const compressionLevels = [
    { quality: 0.8, maxWidthOrHeight: 1920 },
    { quality: 0.6, maxWidthOrHeight: 1280 },
    { quality: 0.4, maxWidthOrHeight: 800 },
    { quality: 0.2, maxWidthOrHeight: 600 }
  ];

  console.log(`Starting compression for ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);

  // Try each compression level until we get under 400KB or exhaust all options
  for (let i = 0; i < compressionLevels.length; i++) {
    const options = {
      maxSizeMB: targetSizeKB / 1024, // Convert KB to MB
      maxWidthOrHeight: compressionLevels[i].maxWidthOrHeight,
      useWebWorker: true,
      quality: compressionLevels[i].quality
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Compression level ${i + 1}: ${(compressedFile.size / 1024).toFixed(2)}KB (quality: ${options.quality})`);

      // If we're under the target size, or this is our last attempt, use this version
      if (compressedFile.size <= targetSizeBytes || i === compressionLevels.length - 1) {
        console.log(`Final compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`);
        return compressedFile;
      }
    } catch (error) {
      console.error(`Compression level ${i + 1} failed:`, error);
      // If this compression level fails, try the next one
      continue;
    }
  }

  // If all compression attempts failed, return original file
  console.warn('All compression attempts failed, using original file');
  return file;
};

const processAttachments = async (fileFields, data) =>
{
  const attachments = [];
  const errors = [];

  // Process files concurrently but with limit
  const concurrencyLimit = 2; // Process 2 files at a time

  for (let i = 0; i < fileFields.length; i += concurrencyLimit) {
    const batch = fileFields.slice(i, i + concurrencyLimit);

    const batchPromises = batch.map(async ({ field, prefix }) =>
    {
      if (data[field]) {
        try {
          // First compress the image, then convert to base64
          const compressedFile = await compressImageFile(data[field]);
          const base64File = await fileToBase64(compressedFile);
          if (base64File) {
            return {
              filename: `${prefix}.${data[field].name.split('.').pop()}`,
              data: base64File
            };
          }
        } catch (error) {
          errors.push(`${field}: ${error.message}`);
          return null;
        }
      }
      return null;
    });

    const batchResults = await Promise.all(batchPromises);
    attachments.push(...batchResults.filter(Boolean));
  }

  if (errors.length > 0) {
    throw new Error(`File processing errors: ${errors.join(', ')}`);
  }

  return attachments;
};

const fileToBase64 = async (file) =>
{
  return new Promise((resolve, reject) =>
  {
    if (!file) {
      resolve(null);
      return;
    }

    // Updated file size validation - now 5MB is still the max for original files
    // but we'll compress them down to 400KB
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error(`File ${file.name} is too large. Max 5MB allowed.`));
      return;
    }

    // Updated file type validation - only images allowed now
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error(`File ${file.name} type not allowed. Only JPEG and PNG images allowed.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
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

  // Parse WebKit version if present
  let webkitVersion = '';
  if (/WebKit\/([0-9.]+)/.test(userAgent)) {
    const match = userAgent.match(/WebKit\/([0-9.]+)/);
    webkitVersion = match[1];
  }

  // Format device info
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

// Main Form Component
const IndependentContractorsForm = ({
  agreementTermData,
  deedOfGuaranteeData,
}) =>
{
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Create refs for form fields that need to be focused
  const fieldRefs = useRef({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
    clearErrors,
  } = useForm({
    resolver: zodResolver(IcaFormSchema),
    mode: "onChange"
  });

  // Watch all form values
  const watchedValues = watch();

  // Function to register field refs
  const registerFieldRef = (fieldName, ref) =>
  {
    if (ref) {
      fieldRefs.current[fieldName] = ref;
    }
  };

  // Enhanced function to focus on error field
  const focusErrorField = (fieldName) =>
  {
    console.log('Attempting to focus field:', fieldName);
    console.log('Available field refs:', Object.keys(fieldRefs.current));

    if (fieldRefs.current[fieldName]) {
      console.log('Field ref found, focusing...');
      // Small delay to ensure DOM is updated
      setTimeout(() =>
      {
        try {
          fieldRefs.current[fieldName].focus();
          fieldRefs.current[fieldName].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          console.log('Field focused successfully:', fieldName);
        } catch (error) {
          console.error('Error focusing field:', fieldName, error);
        }
      }, 100);
    } else {
      console.warn('Field ref not found for:', fieldName);
    }
  };

  const handleFieldChange = (name, value) =>
  {
    setValue(name, value);
    if (errors[name]) clearErrors(name);
    if (currentErrorField === name) setCurrentErrorField(null);
    trigger(name);
  };

  const handleFormSubmit = async (data) =>
  {
    try {
      setIsSubmitting(true);
      setCurrentErrorField(null);

      console.log("Raw form data:", data);

      // Get device information
      const deviceInfo = getDeviceInfo();

      // Get IP address
      const ipAddress = await getIPAddress();

      // Format current date and time
      const now = new Date();
      const currentDateTime = now.toLocaleDateString('en-US', {
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

      // Process file uploads with compression
      const fileFields = [
        { field: 'GovernmentID', prefix: 'Guarantors Government ID' },
        { field: 'WitnessID', prefix: 'Witness ID' },
        { field: 'SecurityLicense', prefix: 'Security or Masters License' },
        { field: 'CITInsurance', prefix: 'CIT Insurance' }
      ];

      console.log("Starting file processing and compression...");
      const attachments = await processAttachments(fileFields, data);
      console.log("File processing completed. Attachments:", attachments.length);

      // Format dates for API
      const formatDate = (date) =>
      {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      // Prepare final data matching API expectations
      const finalData = {
        // Personal/Principal Details (matching HTML form field names)
        Name: data.Name || '',
        OrganisationType: data.OrganisationType || '',
        ABN: data.ABN || '',
        Phone: data.Phone || '',
        Email: data.Email || '',
        Address: data.Address || '',
        AddressPostal: data.AddressPostal || '',

        // Agreement Term fields
        DateCommencement: formatDate(data.DateCommencement),
        AcceptAgreement: data.AcceptAgreement || false,

        // Deed of Guarantee fields
        DateDeed: formatDate(data.DateDeed),
        NameConfirm: data.NameConfirm || '',
        AddressResidential: data.AddressResidential || '',

        // Executed as Deed fields
        BusinessName: data.BusinessName || '',
        WitnessName: data.WitnessName || '',
        WitnessAddress: data.WitnessAddress || '',

        eDocketsContractorCode: data.eDocketsContractorCode || '',

        // System data
        attachments: attachments,
        timestamp: new Date().toISOString(),
        formType: "ica",
        formId: "ICA",
        submissionId: `ica_${Date.now()}`,
        fullUserAgent: deviceInfo.fullUserAgent,
        ipAddress: ipAddress,
        deviceInfo: deviceInfo.deviceString,
        submissionDateTime: currentDateTime,
      };

      console.log("Final data being sent to API:", finalData);

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
      console.log("API Response:", result);

      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form
      // reset();

      // Optional: Redirect after successful submission
      // setTimeout(() => {
      //   router.push("/success");
      // }, 2000);

    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);

      // Show error message to user
      alert("There was an error submitting your form. Please try again.");
    }
  };

  const onError = (validationErrors) =>
  {
    console.log("Form validation errors:", validationErrors);
    const firstErrorField = Object.keys(validationErrors)[0];
    setCurrentErrorField(firstErrorField);

    // Focus on the first error field
    focusErrorField(firstErrorField);
  };

  // Focus management effect
  useEffect(() =>
  {
    if (errors && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0];
      setCurrentErrorField(errorField);
      focusErrorField(errorField);
    } else {
      setCurrentErrorField(null);
    }
  }, [errors]);

  return (
    <section className="1024px:py-[120px] 768px:bg-[#f2f2f2]">
      <div className="max-w-[1200px] mx-auto">
        <form
          onSubmit={handleSubmit(handleFormSubmit, onError)}
          className="bg-white rounded-lg shadow-lg px-12 py-16 space-y-8"
          noValidate
          autoComplete="off"
        >
          <FormHeader COMPANY_INFO={COMPANY_INFO} />

          <PersonalDetailsSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <AgreementTermSection
            agreementTermData={agreementTermData}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <DeedOfGuaranteeSection
            deedOfGuaranteeData={deedOfGuaranteeData}
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            COMPANY_INFO={COMPANY_INFO}
            registerFieldRef={registerFieldRef}
          />

          <ExecutedAsDeedSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <LicensingInsuranceSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <EDocketSystemSection COMPANY_INFO={COMPANY_INFO} />

          <DriversSection
            register={register}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            formData={watchedValues}
            handleFieldChange={handleFieldChange}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            errors={errors}
            registerFieldRef={registerFieldRef}
          />

          <div className="text-center space-y-4">
            <SubmitButton isSubmitting={isSubmitting} isSubmitted={isSubmitted} />
            {isSubmitted && <SuccessMessage />}
          </div>
        </form>
      </div>
    </section>
  );
};

export default IndependentContractorsForm;