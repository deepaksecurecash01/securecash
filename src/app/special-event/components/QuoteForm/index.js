"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
{
  FaUser,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaMapMarkerAlt,
  FaBuilding,
  FaUniversity,
  FaChevronLeft,
  FaExclamationCircle,
} from "react-icons/fa";
import { z } from "zod";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import { SelectionBox } from "../elements/SelectionBox";
import { InputField } from "@/components/common/forms/elements/InputField";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

// Validation Schemas
const BusinessInfoSchema = z.object({
  BusinessName: z.string().min(1, "Please enter the business name of this location."),
  Address: z.string().min(1, "Please enter the number & street for this location."),
  Suburb: z.string().min(1, "Please enter the suburb for this location."),
  Postcode: z.string().min(1, "Please enter the post code for this location."),
});

const ContactInfoSchema = z.object({
  Contact: z.string().min(1, "Please enter the main contact person at this location."),
  Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
  Phone: z.string().min(1, "Please enter their best contact number."),
  Email: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address at this location."),
  Accounts: z.string().email("Please enter a valid email address.").min(1, "Please enter the Email address to send accounts."),
});

const OtherInfoSchema = z.object({
  Services: z.array(z.string()).min(1, "Please select what services you require."),
  Dates: z.string().min(1, "Please provide us with a list of the dates, times & any other relevant information for the event."),
  Bank: z.string().min(1, "Please enter the bank this location uses."),
});

const CheckboxGroup = ({
  label,
  name,
  options,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => (
  <div className="text-left relative">
    <label className="text-white text-base inline-block mt-4 mb-2">
      {label}
    </label>
    <div className="control-wrapper relative flex flex-row justify-around items-center w-full mt-2">
      {options.map((option, index) => (
        <Checkbox
          label={option.label}
          key={index}
          value={option.value}
          name={name}
          register={register}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          className="chkbox float-left text-left relative"
        />
      ))}
      {errors[name] && (
        <WarningPopup
          error={errors[name]?.message}
          isFirstError={currentErrorField === name}
          className={"top-12 left-[70px]"}
        />
      )}
    </div>
  </div>
);

const BusinessInfo = ({
  register,
  errors, setValue,

  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const stateOptions = [
    { value: "select", label: "Please Select" },
    { value: "VIC", label: "Victoria" },
    { value: "NSW", label: "New South Wales" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
    { value: "NZ", label: "New Zealand" },
  ];

  return (
    <div className="form-page business-info">
      <Typography
        as="h3"
        fontFamily="montserrat"
        className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
      >
        Business Information
      </Typography>

      <Divider
        color="primary"
        margin="mt-2.5 mb-4"

        alignment="center"
      />

      <div className="form-tab 480px:w-[90%] mx-auto">
        <InputField
          label="What is the business name of this location?"
          name="BusinessName"
          register={register}
          Icon={FaBuilding}
          placeholder="e.g. Joes Supermarket"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="What is the number & street for this location?"
          name="Address"
          register={register}
          Icon={FaHome}
          placeholder="e.g. 49 Commercial Road"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="What is the suburb for this location?"
          name="Suburb"
          register={register}
          Icon={FaMapMarkerAlt}
          placeholder="e.g. Port Adelaide"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <div className="flex flex-col 600px:flex-row gap-4">
          <div className="w-[80%]">

            <SelectionBox
              label="What state is this location in?"
              name="State"
              register={register}
              Icon={FaMapMarkerAlt}
              setValue={setValue}
              options={stateOptions}
              errors={errors}
              currentErrorField={currentErrorField}
              setCurrentErrorField={setCurrentErrorField}
            />

          </div>
          <div className="">
            <InputField
              label="Postcode"
              name="Postcode"
              register={register}
              Icon={FaMapMarkerAlt}
              placeholder="e.g. 5015"
              errors={errors}
              currentErrorField={currentErrorField}
              setCurrentErrorField={setCurrentErrorField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({
  register,
  errors, setValue,

  currentErrorField,
  setCurrentErrorField,
}) =>
{
  return (
    <div className="form-page contact-info">
      <Typography
        as="h3"
        fontFamily="montserrat"
        className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
      >
        Contact Information
      </Typography>

      <Divider
        color="primary"
        margin="mt-2.5 mb-4"

        alignment="center"
      />

      <div className="form-tab 480px:w-[90%] mx-auto">
        <InputField
          label="Who will be the main contact person at this location?"
          name="Contact"
          register={register}
          Icon={FaUser}
          placeholder="e.g. Usually the Manager or Supervisor"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="What is their position or role at this location?"
          name="Position"
          register={register}
          Icon={FaUsers}
          placeholder="e.g. Manager, Finance Officer, etc"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="What is their best contact number?"
          name="Phone"
          register={register}
          Icon={FaPhone}
          placeholder="Mobile telephone preferred if available"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="What is email address at this location?"
          name="Email"
          type="email"
          register={register}
          Icon={FaEnvelope}
          placeholder="Our service procedures & registers will be sent to this address"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <InputField
          label="Email address to send accounts?"
          name="Accounts"
          type="email"
          register={register}
          Icon={FaEnvelope}
          placeholder="Our invoice will be sent to this email address for this location."
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />
      </div>
    </div>
  );
};

const OtherInfo = ({
  register,
  errors,
  setValue,
  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const serviceOptions = [
    { label: "Banking", value: "Banking Courier Service" },
    { label: "Change", value: "Change Order Service" },
  ];

  return (
    <div className="form-page other-info">
      <Typography
        as="h3"
        fontFamily="montserrat"
        className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
      >
        Other Information
      </Typography>

      <Divider
        color="primary"
        margin="mt-2.5 mb-4"

        alignment="center"
      />

      <div className="form-tab 480px:w-[90%] mx-auto">
        <CheckboxGroup
          label="What services do you require at this location?"
          name="Services"
          options={serviceOptions}
          register={register}
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />

        <div className="form-tab mx-auto">
          <div className="comment-container w-full mx-auto text-left block clear-both">
            <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
              Please provide us with a list of the dates, times & any other relevant information for the event below;
            </label>
            <textarea
              className="w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white focus:outline-primary"
              name="Dates"
              {...register("Dates")}
              placeholder="Enter dates, times and other relevant information..."
              rows="5"
            ></textarea>
            {errors?.Dates && (
              <WarningPopup
                error={errors?.Dates?.message}
                isFirstError={currentErrorField === "Dates"}
                className={"top-2 left-0"}
              />
            )}
          </div>
        </div>

        <InputField
          label="Which bank does this location use?"
          name="Bank"
          register={register}
          Icon={FaUniversity}
          placeholder="Eg. Commonwealth Bank"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />
      </div>
    </div>
  );
};

const SiteInfoForm = ({ className,
  formData,
  setFormData,
  handleSubmit,
  handleFormSubmit,
  currentStep,
  setCurrentStep,
  register,
  errors,
  setValue,
  currentErrorField,
  setCurrentErrorField,
  schemas,
  handleStepNavigation, // New prop
  schemaStep, // New prop
}) =>
{

  // Handle back button - use navigation function instead of direct step change
  const handleBack = () =>
  {
    if (currentStep > 0) {
      handleStepNavigation(currentStep - 1);
    }
  };

  // Handle form submission - only submit if we're moving forward
  const onSubmit = (data) =>
  {
    // If we're on step 3 and trying to submit a previous step's form,
    // just navigate to the next step without full submission
    if (schemaStep === 3 && currentStep < 2) {
      handleStepNavigation(currentStep + 1);
      return;
    }

    // Otherwise, use the normal submission handler
    handleFormSubmit(data);
  };



  const renderFormStep = () =>
  {
    switch (schemaStep) {
      case 0:
        return (
          <BusinessInfo
            register={register}
            errors={errors}
            setValue={setValue}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        );
      case 1:
        return (
          <ContactInfo
            register={register}
            errors={errors}
            setValue={setValue}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        );
      case 2:
        return (
          <OtherInfo
            register={register}
            errors={errors}
            setValue={setValue}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        );
      case 3:
        return (
          <div className=" h-full flex flex-col items-center justify-center gap-2">
            <Typography
              as="h4"
              fontFamily="montserrat"
              className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
              Review & Edit Previous Steps
            </Typography>
            <div className="">

              <button
                type="button"
                onClick={() => handleStepNavigation(2)}
                className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"                  >
                Edit Form
              </button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center h-[740px] ${className}`}>
      <form
        className="forms-site-info h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-site-info submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
        data-formid="SiteInfo"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Back button for steps 1 and 2 */}
        {schemaStep > 0 && schemaStep !== 3 && (
          <div className="form-slide-btn-wrap mb-4 absolute">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center text-white hover:text-[#c6a54b] transition-colors"
            >
              <FaChevronLeft className="mr-2" />
              <span>Back</span>
            </button>
          </div>
        )}
        <div className={`${schemaStep === 3 && "h-full"}`}>{renderFormStep()}</div>
        {schemaStep !== 3 && (<div className="button-controls-container w-[80%] mx-auto mt-7">
          <div className="button-section relative">
            <button
              type="submit"
              className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat"
            >
              {currentStep === schemas.length - 1 ? "Continue" : "Next"}
            </button>
          </div>
        </div>)}
      </form>
    </div>
  );
};

export default SiteInfoForm;