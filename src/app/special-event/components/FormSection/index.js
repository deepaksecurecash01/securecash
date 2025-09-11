'use client';
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import QuoteForm from "../QuoteForm";
import SiteRiskForm from "@/app/site-info/components/FranchiseForm";
import Image from "next/image";
import Link from "next/link";
import ThankYouModal from "@/components/common/forms-new/forms/ThankYouModal";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import
{
  createStepSchema,
  SPECIAL_EVENT_DEFAULT_VALUES,
  BusinessInfoSchema,
  ContactInfoSchema,
  ServiceInfoSchema,
  RiskAssessmentSchema
} from '@/zod/SpecialEventFormSchema';

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
    Bank: useRef(null),
    Amount: useRef(null),
    Parking: useRef(null),
    Security: useRef(null),
    External: useRef(null),
    Internal: useRef(null),
  });

  // State management - exactly like Site-Info
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
    formType: 'specialevent',
    formId: 'SpecialEvent',
    onSuccess: (result, finalData) =>
    {
      console.log("Special event form submitted successfully!");
      setShowThankYou(true);
    },
    onError: (error) =>
    {
      console.error("Special event submission failed:", error);
    },
    prepareData: async (data) =>
    {
      return { ...data, formType: "specialevent" };
    }
  });

  // Get default values with proper empty state - exactly like Site-Info
  const getDefaultValues = () => ({
    ...SPECIAL_EVENT_DEFAULT_VALUES,
    ...formData,
  });

  const methods = useForm({
    resolver: zodResolver(createStepSchema(schemaStep)),
    defaultValues: getDefaultValues(),
  });

  const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = methods;

  // Update resolver when schema step changes - exactly like Site-Info
  useEffect(() =>
  {
    const newSchema = createStepSchema(schemaStep);
    methods.resolver = zodResolver(newSchema);
    reset(getDefaultValues());
  }, [schemaStep, formData]);

  // Step navigation handler - exactly like Site-Info
  const handleStepNavigation = (targetStep) =>
  {
    const currentFormData = getValues();
    setFormData(prev => ({ ...prev, ...currentFormData }));
    setSchemaStep(targetStep);

    if (targetStep <= 2) {
      setQuoteFormStep(targetStep);
    }
  };

  // Focus on franchise form when transitioning - exactly like Site-Info
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

  // Complete form reset function - exactly like Site-Info
  const resetFormState = () =>
  {
    setFormData({ ...SPECIAL_EVENT_DEFAULT_VALUES });
    reset(SPECIAL_EVENT_DEFAULT_VALUES);
    setQuoteFormStep(0);
    setSchemaStep(0);
    setSubmitButton(false);
    setCurrentErrorField(null);
  };

  // Modal close handler that properly resets form - exactly like Site-Info
  const handleModalClose = () =>
  {
    setShowThankYou(false);
    // resetFormState();
  };

  // Main form submission handler - restored original logic with new hooks
  const handleFormSubmit = async (data) =>
  {
    try {
      const updatedFormData = { ...formData, ...data, "formType": "specialevent" };
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
        className=" bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px]  1280px:my-[120px]"
      >
        <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex items-center">
          <div className="right-contact-row  w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1]  992px:pl-8">
            <Typography
              as="h3"
              fontFamily="montserrat"
              className="text-[22px] mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
            >
              Thanks for that! This is the final step in order to getting
              your service setup.
            </Typography>

            <Divider
              color="primary"
              alignment="left"
              margin="my-5"
              responsiveClassName='768px:text-left 768px:mx-0'
            />

            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              Please provide us with the necessary contact information and
              the service schedule that you would like us to implement. Please note that this form needs to be
              submitted once per location that you wish us to collect cash from or deliver cash to.
            </Typography>

            <Typography
              as="h3"
              fontFamily="montserrat"
              className="text-[22px] mt-10 mb-4 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0"
            >
              Please take note of the following conditions
            </Typography>

            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              You MUST have your banking ready to be picked up prior to the arrival of the banking courier.
              The banking MUST be properly packaged in your nominated banks business express deposit satchels,
              if you need any clarification or help on how your banking needs to be prepared then please
              contact us as soon as possible and we will be more than happy to help.
            </Typography>
            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              Extra charges will apply at a rate of $95 plus GST per hour or part thereof if the banking
              courier is made to wait for banking that is not ready to be picked up upon their arrival at the
              time you booked. There will also be a charge of 0.75% of the total amount deposited plus GST if
              the banking is not properly prepared in your nominated banks business express deposit satchels,
              and the banking courier is unable to successfully lodge it on your behalf and needs to wait
              until a bank teller manually processes the deposit.
            </Typography>
            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              You <strong>must</strong> also inform your bank that you are having a banking courier service and
              advise them of the approximate amount of money you are expecting to be deposited, please don&apos;t
              assume that your deposit will be unconditionally accepted by the bank without them being
              notified accordingly. If a deposit is not accepted by the bank, then it will need to be returned
              back to your address at a rate of $275 plus GST.
            </Typography>
            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
            >
              If you are not after a once off
              collection but a regular collection fill out the form located <span
                className="underline"><strong><a
                  href="https://www.securecash.com.au/site-info/">HERE</a></strong></span> instead and
              select &quot;Yes&quot; on the popup.
            </Typography>
            <Typography
              as="p"
              fontFamily="montserrat"
              className="text-[16px] leading-[2rem] text-left
               768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light flex flex-col gap-4"
            >
              <span>   To learn more about how we manage information provided you can view our{" "}
                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/privacy-policy/">Privacy Policy</Link>.</span>
              <strong>
                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/austrac/">&lt;&lt; Previous</Link>
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
      <div
        id="contact-form-section"
        className="inline-block w-full mb-12  480px:mb-[120px]"
      >
        <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex ">
          <div className=" 414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10  480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">
            <Image
              src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
              alt="Making A Deal"
              fill
              objectFit="cover"
            />
          </div>

          <SiteRiskForm
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