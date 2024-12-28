import { useState } from "react";
import WarningPopup from "./form/WarningPopup";
import SelectOption from "./SelectOption";

export const SelectioBox = ({
  label,
  name,
  setValue,
  Icon,
  options,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {
  const hasError = errors[name] && currentErrorField === name;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
        {label}
      </label>
      <div className="input-container input-container-select w-full mx-auto text-left flex items-center relative">
        <Icon
          className={`icon absolute text-[22px] rounded-l bg-black min-w-[20px] text-center ml-4 ${
            hasError
              ? "text-red-500"
              : isFocused
              ? "text-primary"
              : "text-white"
          }`}
        />

        <SelectOption
          register={register}
          setValue={setValue}
          setIsFocused={setIsFocused}
          hasError={hasError}
          isFocused={isFocused}
          setCurrentErrorField={setCurrentErrorField}
          options={options}
          name={name}
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
