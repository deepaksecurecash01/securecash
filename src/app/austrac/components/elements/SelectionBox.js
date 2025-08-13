import { useState } from "react";
import SelectOption from "./SelectOption";
import WarningPopup from "./WarningPopup";

export const SelectionBox = ({
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
        <i className={`rotate-45 inline-block border-solid border-white border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text `} />
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
