import React from "react";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import { InputField } from "../elements/InputField";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";

const CheckboxGroup = ({
  label,
  name,
  options,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => (
  <div className=" text-left relative">
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
          className="chkbox float-left text-left relative  "
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

const Quote = ({
  inputFields,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const serviceOptions = [
    { label: "Banking", value: "Banking" },
    { label: "Change", value: "Change" },
  ];

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
        className="text-white  font-normal text-center capitalize pb-4 text-[16px]"
      >
        We Just Need A Few Details
      </Typography>


      <Divider
        color="primary" // Custom gold color
        margin="mt-4" // Margin-top 4
        alignment="center" // Center alignment
      />

      <div className="form-tab  480px:w-[90%] mx-auto">
        {inputFields?.map((field, index) => (
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
