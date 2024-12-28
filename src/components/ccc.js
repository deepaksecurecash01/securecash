import React from "react";
import Checkbox from "../ui/checkbox/Checkbox";

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
}) => (
  <div className="relative">
    <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
      {label}
    </label>
    <div className="input-container relative w-[100%] mx-auto text-left flex items-center rounded-md border border-gray-500 bg-white">
      <input
        className="w-full text-sm py-2 px-3 shadow-none font-montserrat border-none"
        type={type}
        name={name}
        {...register(name)}
        onFocus={() => setCurrentErrorField(name)}
        onBlur={() => setCurrentErrorField(null)}
        placeholder={placeholder}
      />
      {Icon && <Icon className="icon min-w-[50px] text-[18px] text-[#999]" />}
    </div>
    {errors[name] && (
      <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
    )}
  </div>
);

const CheckboxGroup = ({ label, name, options, errorMessage, register }) => (
  <div className="chkbox-container w-[100%] mx-auto text-left relative chkbox-row">
    <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
      {label}
    </label>
    <div className="control-wrapper flex flex-row justify-around items-center w-full mt-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={option}
            {...register(name)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
    {errorMessage && (
      <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
    )}
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

      <div className="form-tab">
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
          errorMessage="Please select what services you require."
        />
      </div>
    </div>
  );
};

export default Quote;
