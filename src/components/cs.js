"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Quote from "./form/Quote";
import Banking from "./form/Banking";
import Change from "./form/Change";
import {
  FaUser,
  FaUsers,
  FaPhone,
  FaComments,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { QuoteFormSchema } from "@/zod/QuoteFormSchema";
import BankingSchema from "@/zod/BankingSchema";
import ChangeSchema from "@/zod/ChangeSchema";

const ContentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBanking, setShowBanking] = useState(true);
  const [showChange, setShowChange] = useState(true);
  const [isBankingComplete, setIsBankingComplete] = useState(false);
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const schemas = [QuoteFormSchema, BankingSchema, ChangeSchema];
  const [selectedServices, setSelectedServices] = useState([]); // Ensure it's an empty array initially

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[currentStep]),
    defaultValues: {
      service: [], // Ensure service is an empty array initially
      BankingDays: [],
      ChangeDays: [],
    },
  });

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
      label: "Location/s For Service (Suburb, State, Postcode)",
      name: "Locations",
      placeholder: "Enter location/s for the service",
      Icon: FaMapMarkerAlt,
      errorMessage:
        "Please enter the location/s at where you require services.",
    },
  ];
  const frequencyOptions = [
    { value: "", label: "Please select..." },
    { value: "Weekly", label: "Weekly" },
    { value: "Fortnightly", label: "Fortnightly" },
    { value: "Ad Hoc", label: "Ad Hoc" },
    { value: "Special Event (once off)", label: "Special Event (once off)" },
  ];

  const amountOptions = [
    { value: "", label: "Select Amount:" },
    { value: "$0 - $1000", label: "$0 - $1000" },
    { value: "$1000 - $5000", label: "$1000 - $5000" },
    { value: "$5000- $20,000", label: "$5000- $20,000" },
    { value: "$20,000 - $50,000", label: "$20,000 - $50,000" },
    { value: "over $50,000", label: "over $50,000" },
  ];

  const daysForChangeForm = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Ad Hoc",
    "Banking",
  ];

  const daysForBankingForm = daysForChangeForm.filter(
    (day) => day !== "Banking"
  );

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    // If current step is not the last one, navigate to the next step
    if (currentStep === 0) {
      const services = getValues("service");
      console.log(services);
      setSelectedServices(services); // Update selected services
      if (services.includes("banking")) {
        setCurrentStep(1); // Move to Banking step if selected
      } else if (services.includes("Change")) {
        setCurrentStep(2); // Move to Change step if Banking is not selected
      }
    } else if (currentStep === 1) {
      if (selectedServices.includes("change")) {
        setCurrentStep(2); // Move to Change step
      } else {
        handleSubmit(onSubmit)(); // Submit the form if no further steps
      }
    } else {
      handleSubmit(onSubmit)(); // Submit the form at the last step
    }
  };

  useEffect(() => {
    // Trigger form validation when the step changes
    trigger();
  }, [currentStep, trigger]);

  return (
    <div className="float-none w-full mx-auto 992px:w-1/2   992px:float-left relative left-0 [flex:1] flex justify-center">
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px]  1366px:h-full forms-quote submit-status mt-4 992px:mt-0  992px:mb-16 w-full lg:mt-0 lg:mb-0  992px:w-[546px] shadow-md text-center py-8 rounded-lg bg-[#1a1a1a] "
        data-formid="Quote"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {currentStep === 0 && (
          <Quote
            inputFields={inputFields}
            register={register}
            errors={errors}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        )}
        {currentStep === 1 && selectedServices.includes("banking") && (
          <Banking
            frequencyOptions={frequencyOptions}
            amountOptions={amountOptions}
            daysOfWeek={daysForBankingForm}
            register={register}
            errors={errors}
            setValue={setValue}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
            onComplete={() => setIsBankingComplete(true)}
          />
        )}
        {currentStep === 2 && selectedServices.includes("change") && (
          <Change
            frequencyOptions={frequencyOptions}
            amountOptions={amountOptions}
            daysOfWeek={daysForChangeForm}
            register={register}
            errors={errors}
            setValue={setValue}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        )}

        <div className="button-controls-container w-[80%] mx-auto mt-7">
          <div className="button-section relative">
            <button
              type="submit"
              className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"
            >
              {currentStep === schemas.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
