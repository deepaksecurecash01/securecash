'use client';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import Paragraph from "@/components/common/Paragraph";
import SubHeading from "@/components/common/SubHeading";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import Link from "next/link";
import QuoteForm from "../QuoteForm";
import Image from "next/image";
import SiteRiskForm from "@/app/site-info/components/FranchiseForm";
import ThankYouModal from "@/app/site-info/components/ThankYouModal";

// Validation Schemas
const createValidationSchemas = () =>
{
  const BusinessInfoSchema = z.object({
    Type: z.string().default("Special Event"),
    BusinessName: z.string().min(1, "Please enter the business name of this location."),
    Address: z.string().min(1, "Please enter the number & street for this location."),
    Suburb: z.string().min(1, "Please enter the suburb for this location."),
    State: z.string()
      .min(1, "Please enter the state this is located in.")
      .refine((val) => val !== "select", "Please select a state."),
    Postcode: z.string().min(1, "Please enter the post code for this location."),
  });

  const ContactInfoSchema = z.object({
    Contact: z.string().min(1, "Please enter the main contact person at this location."),
    Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
    Phone: z.string().min(1, "Please enter their best contact number."),
    Email: z.string()
      .email("Please enter a valid email address.")
      .min(1, "Please enter the email address at this location."),
    Accounts: z.string()
      .email("Please enter a valid email address.")
      .min(1, "Please enter the email address to send accounts."),
  });

  const OtherInfoSchema = z.object({
    Services: z.array(z.string()).min(1, "Please select what services you require."),
    Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
    Bank: z.string().min(1, "Please enter the bank this location uses."),
  });

  const SiteRiskFormSchema = z.object({
    Amount: z.enum([
      "$100 to $500",
      "$500 to $1,000",
      "$1,000 to 5,000",
      "$5,000 to $10,000",
      "$10,000 to $20,000",
      "$20,000 to $25,000",
      "$25,000 to $50,000",
      "$50,000 to $100,000",
      "$100,000+",
    ], {
      errorMap: () => ({ message: "Please select an average notes value." })
    }).refine((val) => val !== "" && val !== undefined, {
      message: "Please select an average notes value.",
    }),
    Parking: z.array(z.string()).optional(),
    Security: z.array(z.string()).optional(),
    External: z.array(z.string()).optional(),
    Internal: z.array(z.string()).optional(),
  });

  return { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema };
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

const FormSection = () =>
{

    // State management
    const [formData, setFormData] = useState({});
    const [showThankYou, setShowThankYou] = useState(false);
    const [quoteFormStep, setQuoteFormStep] = useState(0);
    const [schemaStep, setSchemaStep] = useState(0);
  
    // Form submission states
    const [currentErrorField, setCurrentErrorField] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitButton, setSubmitButton] = useState(false);
  
    // Get schemas
    const { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema } = createValidationSchemas();
    const schemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema];
    const quoteFormSchemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema];
  
    // Create dynamic schema based on current step
    const createCombinedSchema = (currentStep) =>
    {
      const fieldConfig = {
        0: {
          BusinessName: z.string().min(1, "Please enter the business name of this location."),
          Address: z.string().min(1, "Please enter the number & street for this location."),
          Suburb: z.string().min(1, "Please enter the suburb for this location."),
          State: z.string().min(1, "Please enter the state this is located in.").refine((val) => val !== "select", "Please select a state."),
          Postcode: z.string().min(1, "Please enter the post code for this location."),
        },
        1: {
          Contact: z.string().min(1, "Please enter the main contact person at this location."),
          Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
          Phone: z.string().min(1, "Please enter their best contact number."),
          Email: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address at this location."),
          Accounts: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address to send accounts."),
        },
        2: {
          Services: z.array(z.string()).min(1, "Please select what services you require."),
          Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
          Bank: z.string().min(1, "Please enter the bank this location uses."),
        },
        3: {
          Amount: z.enum([
            "$100 to $500", "$500 to $1,000", "$1,000 to 5,000", "$5,000 to $10,000",
            "$10,000 to $20,000", "$20,000 to $25,000", "$25,000 to $50,000",
            "$50,000 to $100,000", "$100,000+",
          ], {
            errorMap: () => ({ message: "Please select an average notes value." })
          }).refine((val) => val !== "" && val !== undefined, {
            message: "Please select an average notes value.",
          }),
        }
      };
  
      const baseFields = {
        Type: z.string().default("Special Event"),
        Parking: z.array(z.string()).optional(),
        Security: z.array(z.string()).optional(),
        External: z.array(z.string()).optional(),
        Internal: z.array(z.string()).optional(),
      };
  
      // Add optional fields for all other steps
      Object.keys(fieldConfig).forEach(step =>
      {
        if (parseInt(step) !== currentStep) {
          Object.keys(fieldConfig[step]).forEach(field =>
          {
            if (field === 'Services' || field === 'Schedule' || field === 'Parking' || field === 'Security' || field === 'External' || field === 'Internal') {
              baseFields[field] = z.array(z.string()).optional();
            } else {
              baseFields[field] = z.string().optional();
            }
          });
        }
      });
  
      // Add required fields for current step
      const currentStepFields = fieldConfig[currentStep] || {};
  
      return z.object({ ...baseFields, ...currentStepFields });
    };
  
    // Form setup with default values
    const getDefaultValues = () => ({
      Type: "Special Event",
      Services: [],
      Schedule: [],
      Amount: "",
      Parking: [],
      Security: [],
      External: [],
      Internal: [],
      ...formData,
    });
  
    const methods = useForm({
      resolver: zodResolver(createCombinedSchema(schemaStep)),
      defaultValues: getDefaultValues(),
    });
  
    const { register, handleSubmit, trigger, setValue, getValues, reset, formState: { errors } } = methods;
  
    // Update resolver when schema step changes
    useEffect(() =>
    {
      const newSchema = createCombinedSchema(schemaStep);
      methods.resolver = zodResolver(newSchema);
      reset(getDefaultValues());
    }, [schemaStep, formData]);
  
    // Step navigation handler
    const handleStepNavigation = (targetStep) =>
    {
      const currentFormData = getValues();
      setFormData(prev => ({ ...prev, ...currentFormData }));
      setSchemaStep(targetStep);
  
      if (targetStep <= 2) {
        setQuoteFormStep(targetStep);
      }
    };
  
    // Focus on franchise form when transitioning
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
  const handleModalClose = () =>
  {
    setShowThankYou(false);
    setIsFormSubmitted(false);
    resetFormState();
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
      };
  
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
  
    // Reset form state
    const resetFormState = () =>
    {
      reset();
      setQuoteFormStep(0);
      setSchemaStep(0);
      setFormData({});
      setIsFormSubmitted(false);
      setSubmitButton(false);
    };
  
    // Main form submission handler
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
          setIsSubmitting(true);
  
          try {
            const result = await submitToAPI(updatedFormData);
            console.log('API Response:', result);
  
            setTimeout(() =>
            {
              setIsSubmitting(false);
              setIsFormSubmitted(true);
              setSubmissionStatus('success');
              resetFormState();
              setShowThankYou(true);
            }, 2000);
  
          } catch (apiError) {
            console.error('API submission error:', apiError);
            setIsSubmitting(false);
            setSubmissionStatus('error');
          }
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
        setSubmissionStatus('error');
      }
    };
 
  return (
    <>
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
          >              Please provide us with the necessary contact information and
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
          >             You MUST have your banking ready to be picked up prior to the arrival of the banking courier.
            The banking MUST be properly packaged in your nominated banks business express deposit satchels,
            if you need any clarification or help on how your banking needs to be prepared then please
            contact us as soon as possible and we will be more than happy to help.
          </Typography>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-[16px] leading-[2rem] text-left
             768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light"
          >            Extra charges will apply at a rate of $95 plus GST per hour or part thereof if the banking
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
          >           You <strong>must</strong> also inform your bank that you are having a banking courier service and
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
          >               If you are not after a once off
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
          >                <span>   To learn more about how we manage information provided you can view our{" "}
              <Link className="text-primary hover:underline" href="https://www.securecash.com.au/privacy-policy/">Privacy Policy</Link>.</span>
            <strong>
              <Link className="text-primary hover:underline" href="https://www.securecash.com.au/austrac/">&lt;&lt; Previous</Link>
            </strong>
          </Typography>
        </div>

        <div className="[flex:1]">
            <QuoteForm
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
     <div
      id="contact-form-section"
      className="inline-block w-full mb-12  480px:mb-[120px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex ">
        <div className=" 414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10  480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">

          <Image
            src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
            alt="Making A Deal"
            className=""
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
            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
            submissionStatus={submissionStatus}
            setSubmissionStatus={setSubmissionStatus}
            isSubmitting={isSubmitting}
            getValues={getValues}
            handleStepNavigation={handleStepNavigation}
            schemaStep={schemaStep}
            submitButton={submitButton}
          />
      </div>
      </div>
      <ThankYouModal
        showThankYou={true}
        setIsFormSubmitted={setIsFormSubmitted}
        onClose={handleModalClose}
        type={'Thankyou'}
      />
    </>
  );
};

export default FormSection;
