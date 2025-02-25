import React from "react";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import { InputField } from "../elements/InputField";
import Divider from "@/components/common/Divider";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

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
}) => {
  const serviceOptions = [
    { label: "Banking", value: "Banking" },
    { label: "Change", value: "Change" },
  ];

  return (
    <div className="form-page quote">
      <Heading
        as="h3"
        color="white"
        fontSize="26px"
        textAlign="center"
        fontWeight="normal"
        marginBottom="0px"
        responsiveClassName="capitalize"
        className="pb-4"
      >
        Want a quote from SecureCash?
      </Heading>
      <Paragraph
        color="white"
        textAlign="center"
        fontWeight="normal"
        fontSize="16px"
        marginBottom="0px"
        responsiveClassName="capitalize"
        className="pb-4"
      >
        We Just Need A Few Details
      </Paragraph>

      <Divider
        color="primary" // Custom gold color
        margin="mt-4" // Margin-top 4
        alignment="center" // Center alignment
      />

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
