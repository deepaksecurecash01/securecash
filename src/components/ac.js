import React from "react";
import Checkbox from "../ui/checkbox/Checkbox";
import WarningPopup from "./WarningPopup";

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  Icon,
  errorMessage,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {
  console.log(errors.name);
  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
        {label}
      </label>
      <div
        className={`input-container relative w-[100%] mx-auto text-left flex items-center bg-white rounded-md border `}
      >
        <input
          className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none peer rounded-sm   ${
            errors[name] && currentErrorField === name
              ? " focus:outline-red-600"
              : " focus:outline-primary"
          }`}
          type={type}
          name={name}
          data-validate={name}
          {...register(name)}
          onFocus={() => setCurrentErrorField(name)}
          onBlur={() => setCurrentErrorField(null)}
          placeholder={placeholder}
          required
        />
        <Icon
          className={`icon min-w-[50px] before:pr-0 text-[18px] text-[#999]  ${
            errors[name] && currentErrorField === name
              ? "text-red-500"
              : "peer-focus:text-primary"
          }`}
        />
        {errors[name] && (
          <WarningPopup
            error={errors[name]?.message}
            isFirstError={currentErrorField === name}
          />
        )}
      </div>
    </div>
  );
};

const CheckboxGroup = ({
  label,
  name,
  options,
  errorMessage,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => (
  <div className="chkbox-container w-[100%] mx-auto text-left relative chkbox-row">
    <label className="text-white text-base inline-block mt-6 mb-2.5 w-4/5 text-left">
      {label}
    </label>
    <div className="control-wrapper flex flex-row justify-around items-center w-full mt-2">
      {options.map((option, index) => (
        <Checkbox
          option={option}
          key={index}
          name={"ServiceOptions"}
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
  const serviceOptions = ["Banking", "Change"];

  return (
    <div className="form-page quote">
      <h3 className="text-white pb-4 leading-[30px] text-[22px] 1200px:text-[26px] text-center capitalize">
        Want a quote from SecureCash?
      </h3>
      <p className="form-sub-header text-white pb-4 text-center capitalize">
        We Just Need A Few Details
      </p>
      <hr className="divider-2 h-[4px] border-0 mt-4 mx-auto w-[100px] rounded-[5px] bg-[#c7a652] divider-bottom mb-0 divider-centered" />

      <div className="form-tab ">
        {inputFields.slice(0, 4).map((field, index) => (
          <InputField
            key={index}
            {...field}
            register={register}
            errors={errors}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        ))}
      </div>

      <div className="form-tab">
        {inputFields.slice(4).map((field, index) => (
          <InputField
            key={index + 4}
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
