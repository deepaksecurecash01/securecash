import React from "react";
import Checkbox from "../ui/checkbox/Checkbox";
import WarningPopup from "./WarningPopup";
import { InputField } from "../InputField";


const CheckboxGroup = ({
  label,
  name,
  options,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => (
  <div className="w-full text-left relative">
    <label className="text-white text-base inline-block mt-6 mb-2.5">
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
          className="chkbox float-left text-left relative  "
        />
      ))}
      {errors[name] && (
        <WarningPopup
          error={errors[name]?.message}
          isFirstError={currentErrorField === name}
          className={'top-12 left-[70px]'}
        />
      )}
    </div>
  </div>
);

const Quote = ({
  inputFields,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {
  const serviceOptions = [
    { label: "Banking", value: "Banking" },
    { label: "Change", value: "Change" },
  ];

  return (
    <div className="form-page quote">
      <h3 className="text-white pb-4 text-center capitalize text-lg">
        Want a quote from SecureCash?
      </h3>
      <p className="text-white pb-4 text-center capitalize">
        We Just Need A Few Details
      </p>
      <hr className="h-1 mt-4 mx-auto w-24 rounded bg-[#c7a652]" />

      <div className="form-tab">
        {inputFields.map((field, index) => (
          <InputField
            key={index}
            {...field}
            register={register}
            errors={errors}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        ))}
        <CheckboxGroup
          label="Services You Require"
          name="Service"
          options={serviceOptions}
          register={register}
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />
      </div>
      
    </div>
  );
};

export default Quote;
