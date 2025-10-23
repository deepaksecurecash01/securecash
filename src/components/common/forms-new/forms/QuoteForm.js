"use client";
import React from "react";
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
  FaChevronLeft,
} from "react-icons/fa";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import BankingStep from "./steps/BankingStep.js";
import ChangeStep from "./steps/ChangeStep";
import { useFormManager } from "@/hooks/useFormManager";
import { QUOTE_SCHEMAS, QUOTE_DEFAULT_VALUES } from "@/zod/QuoteFormSchema";
import Link from "next/link.js";

const QuoteForm = ({ className }) =>
{
  const formManager = useFormManager({
    schema: QUOTE_SCHEMAS,
    defaultValues: QUOTE_DEFAULT_VALUES,
    theme: "dark",
    formType: "quote",
    formId: "Quote",
    multiStep: {
      steps: ["quote", "banking", "change"],
      conditional: true,
      getNextSteps: (formData) =>
      {
        const services = formData.Service || [];
        const nextSteps = [];
        if (services.includes("Banking")) nextSteps.push("banking");
        if (services.includes("Change")) nextSteps.push("change");
        return nextSteps;
      },
    },
    onSuccess: (result, finalData) =>
    {
      //formManager.resetForm();
    },
    onError: (error) =>
    {
    },
    prepareData: async (data) =>
    {
      return { ...data, formType: "quote" };
    },
  });

  const serviceOptions = [
    { label: "Banking", value: "Banking" },
    { label: "Change", value: "Change" },
  ];

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

  const renderCurrentStep = () =>
  {
    const { currentStep, stepId } = formManager.getCurrentStep();

    switch (stepId) {
      case "quote":
        return (
          <div className="form-page quote">
            <h3

              className="text-white font-montserrat text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
              Want a quote from SecureCash?
            </h3>

            <p

              className="text-white font-normal text-center capitalize pb-4 text-[16px] font-montserrat"
            >
              We Just Need A Few Details
            </p>

            <hr className="mt-4 w-[100px] h-[4px] rounded-[5px] border-0 bg-primary mx-auto"  />

            <div className="form-tab 480px:w-[90%] mx-auto">
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

  const renderSuccessMessage = () =>
  {
    const userName = formManager.getStepData().Name || "";
    return (
      <div className="form-page success text-center flex flex-col justify-center items-center 992px:h-[75%]">
        <FaCheckCircle className="text-[#4bb543] text-[96px] mx-auto" />

        <h3
         
          className="text-white font-montserrat text-center capitalize pb-2 text-[24px] leading-[30px] mt-8"
        >
          Thank you{userName && ` ${userName}`}!
        </h3>
        <h5 className="text-white font-montserrat text-center capitalize pb-2 text-[16px]">
          We received your submission.
        </h5>
        <hr className="mt-4 w-[100px] h-[4px] rounded-[5px] border-0 bg-primary mx-auto" />

        <div className="quote-ty-note">
          <p
           
            className="text-white font-normal text-center pb-4 text-[16px] mt-8 font-montserrat"
          >
            We will start working on your quote now.
          </p>
          <p
            
            className="text-white font-normal text-center pb-4 text-[16px] font-montserrat"
          >
            While you wait feel free to check out how our services can benefit your organisation:
          </p>
          <div className="ty-note-list-wrap mt-2">
            <ul className="list-none p-0 m-0 flex flex-col justify-center items-center gap-1">
              <li className="cash-collection mb-2 flex items-center">
                <img
                  src="/images/contentpageicons/cashcollection.png"
                  alt="Cash Collection"
                  className="inline-block mr-2 w-[30px]"
                />
                <Link
                  href="/services/cash-collection/"
                  className="text-[#c6a54b] hover:underline"
                >
                  <p className="m-0">Cash Collections</p>
                </Link>
              </li>
              <li className="cash-delivery mb-2 flex items-center">
                <img
                  src="/images/contentpageicons/cashdelivery.png"
                  alt="Cash Delivery"
                  className="inline-block mr-2 w-[30px]"
                />
                <Link
                  href="/services/cash-delivery/"
                  className="text-[#c6a54b] hover:underline"
                >
                  <p className="m-0">Cash Deliveries</p>
                </Link>
              </li>
              <li className="cash-counting mb-2 flex items-center">
                <img
                  src="/images/contentpageicons/cashcounting.png"
                  alt="Cash Counting"
                  className="inline-block mr-2 w-[30px]"
                />
                <Link
                  href="/services/cash-counting/"
                  className="text-[#c6a54b] hover:underline"
                >
                  <p className="m-0">Cash Counting</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="button-controls-container w-[80%] mx-auto mt-8">
          <button
            type="button"
            onClick={formManager.resetForm}
            className="bg-[#c6a54b] text-white border-none py-[15px] font-medium cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-[15px] p-2.5 shadow-none font-montserrat"
          >
            Want Another Quote?
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}
    >
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[546px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="Quote"
        onSubmit={formManager.handleSubmit}
        noValidate
      >
        {!isFirst && stepId !== "risk" && !formManager.isSubmitted && (
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

        <input
          type="text"
          name="BotField"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {formManager.isSubmitted ? renderSuccessMessage() : renderCurrentStep()}

        {formManager.submissionError && (
          <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded">
            {formManager.submissionError}
          </div>
        )}

        {!formManager.isSubmitted && (
          <div className="button-controls-container w-[80%] mx-auto mt-10">
            <div className="button-section relative">
              <button
                type="submit"
                disabled={formManager.isSubmitting}
                className={`nextBtn ${formManager.isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
                  } text-white border-none py-[15px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {formManager.isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : stepId === "quote" ? (
                  "Next"
                ) : formManager.isLastStep() ? (
                  "Submit"
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;