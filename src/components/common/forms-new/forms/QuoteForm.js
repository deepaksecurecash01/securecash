// /components/forms/QuoteForm.js
"use client";
import React from "react";
import {
  FaUser,
  FaUsers,
  FaPhone,
  FaComments,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaSpinner,
  FaCheckCircle,
  FaChevronLeft,
} from "react-icons/fa";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import BankingStep from "./steps/BankingStep.js";
import ChangeStep from "./steps/ChangeStep";
import { useFormManager } from "@/hooks/useFormManager";
import { QUOTE_SCHEMAS, QUOTE_DEFAULT_VALUES } from "@/zod/QuoteFormSchema";

const QuoteForm = ({ className }) => {
  // ✅ Enhanced form manager with multi-step support
  const formManager = useFormManager({
    // Core configuration
    schema: QUOTE_SCHEMAS, // Multi-schema object
    defaultValues: QUOTE_DEFAULT_VALUES,
    theme: "dark",

    // Form identification
    formType: "quote",
    formId: "Quote",

    // Multi-step configuration
    multiStep: {
      steps: ["quote", "banking", "change"],
      conditional: true, // Steps shown based on Service selection
      getNextSteps: (formData) => {
        const services = formData.Service || [];
        const nextSteps = [];
        if (services.includes("Banking")) nextSteps.push("banking");
        if (services.includes("Change")) nextSteps.push("change");
        return nextSteps;
      },
    },

    // Submission handlers
    onSuccess: (result, finalData) => {
      console.log("✅ Quote form submitted successfully!");
    },
    onError: (error) => {
      console.error("❌ Quote submission failed:", error);
    },

    // Data preparation
    prepareData: async (data) => {
      return { ...data, formType: "quote" };
    },
  });

  const serviceOptions = [
    { label: "Banking", value: "Banking" },
    { label: "Change", value: "Change" },
  ];

  // ✅ Step-specific field configurations
  const quoteFields = [
    {
      name: "Name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      Icon: FaUser,
    },
    {
      name: "Organisation",
      type: "text",
      label: "Organisation Name",
      placeholder: "Enter your organisation's name",
      Icon: FaUsers,
    },
    {
      name: "Phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      Icon: FaPhone,
    },
    {
      name: "Referrer",
      type: "text",
      label: "Where Did You Hear About Us?",
      placeholder: "Enter where did you hear about us",
      Icon: FaComments,
    },
    {
      name: "Email",
      type: "email",
      label: "Email Address",
      placeholder: "Your email address",
      Icon: FaEnvelope,
    },
    {
      name: "Address",
      type: "text",
      label: "Postal Address",
      placeholder: "Enter your postal address",
      Icon: FaHome,
    },
    {
      name: "Locations",
      type: "text",
      label: "Location/s For Service",
      placeholder: "Enter location/s for the service (Suburb, State, Postcode)",
      Icon: FaMapMarkerAlt,
    },
    {
      name: "Service",
      type: "checkbox-group",
      label: "Services You Require",
      options: serviceOptions,
      variant: "horizontal",
    },
  ];
  const { stepId, currentStep, isFirst } = formManager.getCurrentStep();

  // ✅ Render current step based on form manager state
  const renderCurrentStep = () => {
    const { currentStep, stepId } = formManager.getCurrentStep();

    switch (stepId) {
      case "quote":
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
              className="text-white font-normal text-center capitalize pb-4 text-[16px]"
            >
              We Just Need A Few Details
            </Typography>

            <Divider color="primary" className="mt-4 w-[100px]" alignment="center" />

            <div className="form-tab 480px:w-[90%] mx-auto">
              {/* Quote form fields */}
              {quoteFields.map((field) => (
                <div key={field.name} className="relative">
                  <UniversalFormField
                    {...formManager.getFieldProps(field)}
                    theme="dark"
                    autoComplete="new-password"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "banking":
        return <BankingStep formManager={formManager} theme="dark" />;

      case "change":
        return <ChangeStep formManager={formManager} theme="dark" />;

      default:
        return null;
    }
  };

  // ✅ Smart button text based on step and services
  const getButtonText = () => {
    if (formManager.isSubmitting) return "Submitting...";
    if (formManager.isSubmitted)
      return "Thank you! Form submitted successfully.";

    const { stepId } = formManager.getCurrentStep();
    const services = formManager.getStepData().Service || [];

    if (stepId === "quote") {
      return services.length === 0 && "Next";
    }

    // Check if this is the final step
    if (formManager.isLastStep()) return "Submit";

    return "Next";
  };

  return (
    <div
      className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}
    >
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[546px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="Quote"
        onSubmit={formManager.handleSubmit}
        noValidate
      >
        {/* Back button */}
        {!isFirst && stepId !== "risk" && (
          <div className="form-slide-btn-wrap mb-4 absolute">
            <button
              type="button"
              onClick={formManager.goBack}
              className="flex items-center text-white hover:text-[#c6a54b] transition-colors"
            >
              <FaChevronLeft className="mr-2" />
              <span>Back</span>
            </button>
          </div>
        )}
        {/* Bot field (honeypot) */}
        <input
          type="text"
          name="BotField"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Render current step */}
        {renderCurrentStep()}

        {/* Submission error display */}
        {formManager.submissionError && (
          <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded">
            {formManager.submissionError}
          </div>
        )}

        {/* Submit button */}
        <div className="button-controls-container w-[80%] mx-auto mt-10">
          <div className="button-section relative">
            <button
              type="submit"
              disabled={formManager.isSubmitting}
              className={`nextBtn ${
                formManager.isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
              } text-white border-none py-[15px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {formManager.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Submitting...
                </div>
              ) : formManager.isSubmitted ? (
                <div className="flex items-center justify-center">
                  <FaCheckCircle className="mr-2" />
                  Thank you! Form submitted successfully.
                </div>
              ) : formManager.isLastStep() ? (
                "Submit"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
