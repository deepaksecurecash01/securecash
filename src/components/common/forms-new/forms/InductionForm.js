"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormManager } from "@/hooks/useFormManager";
import
{
  InductionFormSchema,
  INDUCTION_DEFAULT_VALUES,
} from "@/zod/InductionFormSchema";
import UniversalFormField from "@/components/common/forms-new/forms/SpecialEvents/core/UniversalFormField";
import
{
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaLock,
  FaInfoCircle,
  FaCheckCircle,
  FaSpinner,
  FaTimesCircle,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import IcaContractorClauses from "./IcaAgreementClauses";
import { checkUsernameAvailability, cancelUsernameCheck, validateUsernameFormat } from "@/utils/usernameValidation";

const STATE_OPTIONS = [
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

const agreementTermData = {
  confidentialityAgreement: {
    items: [
      {
        number: "1",
        text: "SecureCash and yourself (hereinafter called both parties) shall keep confidential, all confidential information which is transferred or comes into its possession during the course of or pursuant to any employment, contract or association arising between both parties both before and after the acceptance date of this agreement.",
      },
      {
        number: "2",
        text: "Both parties shall ensure that their employees, agents and sub contractors observe the same obligation of confidentiality. This clause shall survive the termination or expiration of any request or contract associated with such request that occurs from the acceptance date of this agreement.",
      },
      {
        number: "3",
        text: "Both parties acknowledge that confidential information is of a special, unique and invaluable nature such that an award of damages or an account of profits would be inadequate to adequately compensate the other party to this agreement for unauthorised disclosure or use there of.",
      },
      {
        number: "4",
        text: "Both parties therefore acknowledge that the other party to this agreement has the right to seek and obtain an ex parte, interlocutory or final injunction to prohibit or restrain that party from any violation or threatened or suspected violation of any term of any contract, employment or association arising from this or future agreements and to produce the said contract as the contractors or sub contractors obligation under such contract as both parties irrevocable consent thereto.",
      },
      {
        number: "5",
        text: "Confidential information means all information belonging to each party which is confidential and commercially sensitive, including but not limited to information concerning the nature, location and capabilities of both parties clients, pricing structure, operating procedures, methods and strategies.",
      },
      {
        number: "6",
        text: "All details included in a contract arising from or in association with this agreement and all other information of a confidential nature concerning any aspect of both parties business activities.",
      },
    ],
  },
};

const FILE_UPLOAD_CONFIG = {
  enabled: true,
  fields: [
    { field: "Photo", prefix: "Personal Photo" },
    { field: "DriversLicense", prefix: "Drivers License" },
  ],
  compression: {
    targetSizeKB: 400,
    maxSizeMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  },
  concurrencyLimit: 2,
};

const InductionForm = () =>
{
  const router = useRouter();

  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null, 
    message: ""
  });

  const formManager = useFormManager({
    schema: InductionFormSchema,
    defaultValues: INDUCTION_DEFAULT_VALUES,
    formType: "induction",
    formId: "INDUCTION",
    theme: "ica",
    fileUpload: FILE_UPLOAD_CONFIG,
    onSuccess: () =>
    {
      localStorage.removeItem("induction_progress_v1");
      localStorage.removeItem("induction_auth");
      setTimeout(() =>
      {
        router.push("/induction/complete");
      }, 2000);
    },
    prepareData: async (data) => ({ ...data, formType: "induction" }),
  });

  const usernameValue = formManager.watch("EdocketUsername");

  // ✅ Cleanup on unmount
  useEffect(() =>
  {
    return () =>
    {
      cancelUsernameCheck();
    };
  }, []);

  const handleUsernameChange = useCallback(async (value) =>
  {
    // Clear previous status
    setUsernameStatus({ checking: false, available: null, message: "" });

    // Skip if empty
    if (!value) {
      return;
    }

    // Check format first (synchronous)
    const formatCheck = validateUsernameFormat(value);
    if (!formatCheck.valid) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: formatCheck.message
      });
      return;
    }

    // Skip availability check if too short BUT SET PROPER STATE
    if (value.length < 4) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: ""
      });
      return;
    }

    // Show checking status
    setUsernameStatus({
      checking: true,
      available: null,
      message: ""
    });

    try {
      // Check availability (debounced in helper)
      const result = await checkUsernameAvailability(value);

      if (result.tooShort) {
        setUsernameStatus({
          checking: false,
          available: null,
          message: ""
        });
        return;
      }

      // ✅ PATCH: Handle API errors gracefully (non-blocking)
      if (result.error) {
        setUsernameStatus({
          checking: false,
          available: "warning", // ✅ Special state for API failures
          message: "Unable to verify username availability. After your submission it'll be validated by our system and you'll get informed about it via email."
        });
        return;
      }

      if (result.available) {
        setUsernameStatus({
          checking: false,
          available: true,
          message: "Username is available"
        });
      } else {
        setUsernameStatus({
          checking: false,
          available: false,
          message: "This username is already taken"
        });
      }
    } catch (error) {
      console.error("Username check error:", error);
      // ✅ PATCH: Treat unexpected errors as warnings (non-blocking)
      setUsernameStatus({
        checking: false,
        available: "warning",
        message: "Unable to verify username availability. After your submission it'll be validated by our system and you'll get informed about it via email."
      });
    }
  }, []);

  // ✅ FIXED: Trigger check when username value changes
  useEffect(() =>
  {
    if (usernameValue !== undefined) {
      handleUsernameChange(usernameValue);
    }
  }, [usernameValue, handleUsernameChange]);

  // ✅ FIXED: Simplified canSubmit logic with debug logging
  const canSubmit = () =>
  {
    const username = usernameValue || "";

    // Block if checking
    if (usernameStatus.checking) {
      console.log("❌ Submit blocked: checking username");
      return false;
    }

    // Block if username is not available (taken)
    if (usernameStatus.available === false) {
      console.log("❌ Submit blocked: username taken or invalid");
      return false;
    }

    // Block if username exists but is less than 4 characters
    if (username.length > 0 && username.length < 4) {
      console.log("❌ Submit blocked: username too short");
      return false;
    }

    // Block if username is 4+ chars but hasn't been validated yet (null)
    if (username.length >= 4 && usernameStatus.available === null) {
      console.log("❌ Submit blocked: username not validated (null state)");
      return false;
    }

    // ✅ ALLOW if status is "warning" (API failure - non-blocking)
    if (usernameStatus.available === "warning") {
      console.log("✅ Submit allowed: API failed (warning state)");
    }

    // ✅ ALLOW if status is true (available)
    if (usernameStatus.available === true) {
      console.log("✅ Submit allowed: username available");
    }

    // Block if form is submitting
    if (formManager.isSubmitting) {
      console.log("❌ Submit blocked: form is submitting");
      return false;
    }

    return true;
  };

  return (
    <form
      onSubmit={formManager.handleSubmit}
      className="bg-white rounded-lg shadow-lg px-12 py-16 space-y-6"
      noValidate
      autoComplete="off"
    >
      <div className="text-center border-b border-dark-border/30 pb-12">
        <h1 className="text-[34px] font-bold text-gray-800">
          Your Personal Particulars
        </h1>
        <hr className="mt-5 mb-5 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />

        <div className="bg-[rgb(242,242,242,0.9)] p-6 mt-6 rounded-lg text-center space-y-5">
          <p className="text-gray-700">
            Awesome, you've successfully completed the SecureCash induction!
            Please fill out the form below.
          </p>
        </div>
      </div>

      {/* SECTION 1: Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            What is your full name?
          </label>
          <UniversalFormField
            name="Name"
            control={formManager.control}
            type="text"
            theme="ica"
            placeholder="Your Full Name"
            Icon={FaUser}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            What is your best contact number?
          </label>
          <UniversalFormField
            name="Phone"
            control={formManager.control}
            type="tel"
            theme="ica"
            placeholder="Your Phone Number"
            Icon={FaPhone}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>
      </div>

      {/* SECTION 2: Email */}
      <div className="relative">
        <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
          What is your email address?
        </label>
        <UniversalFormField
          name="Email"
          control={formManager.control}
          type="email"
          theme="ica"
          placeholder="Your Email Address"
          Icon={FaEnvelope}
          currentFocusField={formManager.currentFocusField}
          onFieldFocus={formManager.handleFieldFocus}
          onFieldBlur={formManager.handleFieldBlur}
        />
      </div>

      {/* SECTION 3: Address */}
      <div className="relative">
        <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
          What is your physical address?
        </label>
        <UniversalFormField
          name="Address"
          control={formManager.control}
          type="text"
          theme="ica"
          placeholder="Your Physical Address"
          Icon={FaMapMarkerAlt}
          currentFocusField={formManager.currentFocusField}
          onFieldFocus={formManager.handleFieldFocus}
          onFieldBlur={formManager.handleFieldBlur}
        />
      </div>

      {/* SECTION 4: File Uploads (Photo & License) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            Clear, frontal photo of your upper body and face:
          </label>
          <UniversalFormField
            name="Photo"
            control={formManager.control}
            type="file"
            theme="ica"
            accept="image/*"
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
            fileUploadState={formManager.fileUpload}
          />
        </div>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            Drivers License:
          </label>
          <UniversalFormField
            name="DriversLicense"
            control={formManager.control}
            type="file"
            theme="ica"
            accept="image/*"
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
            fileUploadState={formManager.fileUpload}
          />
        </div>
      </div>

      {/* SECTION 5: Confidentiality Agreement */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 pt-4 mb-2 w-full text-left px-1 768px:px-0">
          Do you accept the following Confidentiality Agreement?
        </h4>
        <IcaContractorClauses data={agreementTermData} />

        <div className="relative">
          <UniversalFormField
            name="AcceptAgreement"
            control={formManager.control}
            type="checkbox-group"
            theme="ica"
            variant="agreement"
            options={[
              {
                value: "accepted",
                label: "I understand and accept the terms of this agreement.",
              },
            ]}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>
      </div>

      {/* SECTION 6: State & Contractor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            What state will you be working in?
          </label>
          <UniversalFormField
            name="State"
            control={formManager.control}
            type="select"
            theme="ica"
            options={STATE_OPTIONS}
            Icon={FaMapMarkerAlt}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            What contractor are you working for?
          </label>
          <UniversalFormField
            name="ContractorName"
            control={formManager.control}
            type="text"
            theme="ica"
            placeholder="Contractor Name"
            Icon={FaIdCard}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>
      </div>

      {/* SECTION 7: eDocket Credentials */}
      <div className="relative pt-4">
        <div className="bg-dark-border/90 p-4 rounded-lg">
          <p className="text-sm text-white">
            <FaInfoCircle className="inline mr-2" />
            In preparation for eDocket app release.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
              Preferred eDocket Username:
            </label>

            {/* ✅ Wrapper with extra padding-bottom to reserve space */}
            <div className="relative pb-8">
              <UniversalFormField
                name="EdocketUsername"
                control={formManager.control}
                type="text"
                theme="ica"
                placeholder="Choose a username"
                Icon={FaUser}
                currentFocusField={formManager.currentFocusField}
                onFieldFocus={formManager.handleFieldFocus}
                onFieldBlur={formManager.handleFieldBlur}
              />

              {/* ✅ FIXED: Always show status when available */}
              {!formManager.formState?.errors?.EdocketUsername &&
                usernameValue &&
                usernameValue.length >= 4 &&
                (usernameStatus.checking || usernameStatus.message) && (
                  <div className={`absolute left-0 right-0 top-[calc(100%-2rem)] mt-1 flex items-start gap-2 text-sm transition-opacity duration-200 ${usernameStatus.checking
                      ? 'text-active-text'
                      : usernameStatus.available === true
                        ? 'text-green-600'
                        : usernameStatus.available === "warning"
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}>
                    {usernameStatus.checking && (
                      <>
                        <FaSpinner className="animate-spin mt-0.5 flex-shrink-0" />
                        <span>Checking availability...</span>
                      </>
                    )}
                    {usernameStatus.available === true && (
                      <>
                        <FaCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{usernameStatus.message}</span>
                      </>
                    )}
                    {usernameStatus.available === "warning" && (
                      <>
                        <FaExclamationTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-left">{usernameStatus.message}</span>
                      </>
                    )}
                    {usernameStatus.available === false && (
                      <>
                        <FaTimesCircle className="text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{usernameStatus.message}</span>
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>

          <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
              Preferred eDocket Password:
            </label>
            <UniversalFormField
              name="EdocketPassword"
              control={formManager.control}
              type="password"
              theme="ica"
              placeholder="Choose a password"
              Icon={FaLock}
              currentFocusField={formManager.currentFocusField}
              onFieldFocus={formManager.handleFieldFocus}
              onFieldBlur={formManager.handleFieldBlur}
            />
          </div>
        </div>
      </div>

      {/* SECTION 8: Submit Button */}
      <div className="text-center space-y-4 pt-6">
        <button
          type="submit"
          disabled={!canSubmit()}
          className={`nextBtn ${formManager.isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
            } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {formManager.isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Submitting... Please Wait.
            </span>
          ) : usernameStatus.checking ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Checking Username...
            </span>
          ) : (usernameStatus.available === false && usernameValue && usernameValue.length < 4) ? (
            "Enter valid username"
          ) : usernameStatus.available === false ? (
            <span className="flex items-center justify-center gap-2">
              <FaTimesCircle />
              Username Not Available
            </span>
          ) : formManager.isSubmitted ? (
            <span className="flex items-center justify-center">
              <FaCheckCircle className="text-white mr-2" />
              Thank you. We received your submission!
            </span>
          ) : (
            "Submit Your Information"
          )}
        </button>
      </div>

      {/* File Upload Progress Indicator */}
      {formManager.fileUpload?.isProcessing && (
        <div className="text-blue-600 text-center p-4 bg-blue-50 border border-blue-200 rounded">
          <strong>Processing Files:</strong>{" "}
          {formManager.fileUpload.processingProgress}%
        </div>
      )}
    </form>
  );
};

export default InductionForm;