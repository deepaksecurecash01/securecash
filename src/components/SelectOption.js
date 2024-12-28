import React from 'react'

const SelectOption = ({
  register,
  setValue,
  setCurrentErrorField,
  options,
  isFocused,
  hasError,
  setIsFocused,
  name,
}) => {
  return (
    <select
      className={`w-full text-sm rounded-md border border-white pl-12 shadow-none font-[Montserrat] bg-black text-white leading-6 h-9 appearance-none ${
            hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary"
          }`}
      {...register(name)}
      onChange={(e) => {
        setValue(name, e.target.value, {
          shouldValidate: true,
        });

        setCurrentErrorField(null); // Reset error field when a selection is made
      }}
      onFocus={() => {
        setCurrentErrorField(name);
        setIsFocused(true);
      }}
      onBlur={() => {
        setCurrentErrorField(null);
        setIsFocused(false);
      }}
      name={name}
      data-validate="Inline"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectOption