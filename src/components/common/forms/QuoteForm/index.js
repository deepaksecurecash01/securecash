"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Quote from "./Quote";
import Banking from "./Banking";
import Change from "./Change";

const QuoteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([
    "Banking",
    "Change",
  ]);
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [formData, setFormData] = useState({});

  const schemas = [QuoteFormSchema, BankingSchema, ChangeSchema];

  const methods = useForm({
    resolver: zodResolver(schemas[currentStep]),
    defaultValues: {
      Service: [],
      BankingDays: [],
      ChangeDays: [],
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

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

  const handleFormSubmit = async (data) => {
    try {
      if (currentStep === 0) {
        const services = getValues("Service");
        setSelectedServices(services);

        // Save base form data
        setFormData({
          Name: data.Name,
          Organisation: data.Organisation,
          Phone: data.Phone,
          Referrer: data.Referrer,
          Email: data.Email,
          Address: data.Address,
          Locations: data.Locations,
          Service: services,
        });

        if (services.includes("Banking")) {
          setCurrentStep(1);
        } else if (services.includes("Change")) {
          setCurrentStep(2);
        } else {
          await submitFormData({
            Name: data.Name,
            Organisation: data.Organisation,
            Phone: data.Phone,
            Referrer: data.Referrer,
            Email: data.Email,
            Address: data.Address,
            Locations: data.Locations,
            Service: services,
          });
        }
      } else if (currentStep === 1) {
        // Add Banking data
        const updatedFormData = {
          ...formData,
          Banking: {
            BankingFrequency: data.BankingFrequency,
            BankingAmount: data.BankingAmount,
            BankingDays: data.BankingDays,
            BankingBank: data.BankingBank,
            BankingComments: data?.BankingComments,
          },
        };
        setFormData(updatedFormData);

        if (selectedServices.includes("Change")) {
          setCurrentStep(2);
        } else {
          await submitFormData(updatedFormData);
        }
      } else if (currentStep === 2) {
        // Add Change data and submit final form
        const finalFormData = {
          ...formData,
          Change: {
            ChangeFrequency: data.ChangeFrequency,
            ChangeNotesAmount: data.ChangeNotesAmount,
            ChangeCoinsAmount: data.ChangeCoinsAmount,
            ChangeDays: data.ChangeDays,
            ChangeComments: data?.ChangeComments,
          },
        };
        await submitFormData(finalFormData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const submitFormData = async (data) => {
    try {
      // Add timestamp
      const finalData = {
        ...data,
        timestamp: new Date().toISOString(),
        formId: "Quote",
      };

      console.log("Final form data:", finalData);
      // Your API call here
      // await api.submitForm(finalData);
    } catch (error) {
      console.error("API submission error:", error);
    }
  };

  const renderFormStep = () => {
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
            frequencyOptions={frequencyOptions}
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

  return (
    <div className="float-none w-full mx-auto 992px:w-1/2 992px:float-left relative left-0 flex-1 flex justify-center">
      <form
        className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[546px] shadow-md text-center py-8 rounded-lg bg-[#1a1a1a]"
        data-formid="Quote"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        {renderFormStep()}

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

export default QuoteForm;
