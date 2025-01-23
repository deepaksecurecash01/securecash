import { useState } from "react";
import WarningPopup from "./WarningPopup";

export const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  Icon,
  Icon2,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {
  const hasError = errors[name] && currentErrorField === name;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
        {label}
      </label>
      <div className="relative w-full flex items-center bg-white rounded-md border">
        {Icon2 && (
          <Icon2
            className={`min-w-[50px] text-[18px] text-[#999] ${
              hasError
                ? "text-red-500"
                : isFocused
                ? "text-primary"
                : "text-[#999]"
            }`}
          />
        )}

        <input
          className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm  ${
            hasError ? "focus:outline-red-600" : "focus:outline-primary"
          }`}
          type={type}
          name={name}
          {...register(name)}
          onFocus={() => {
            setCurrentErrorField(name);
            setIsFocused(true);
          }}
          onBlur={() => {
            setCurrentErrorField(null);
            setIsFocused(false);
          }}
          placeholder={placeholder}
          required
        />
        <Icon
          className={`min-w-[50px] text-[18px] text-[#999] ${
            hasError
              ? "text-red-500"
              : isFocused
              ? "text-primary"
              : "text-[#999]"
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
