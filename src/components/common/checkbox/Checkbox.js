import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  value,
  className = "",
  inputRef,
  style = {},
  register,
  label,
  name,
  theme = 'dark', // Add theme prop
  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const checkboxProps = register ? register(name) : {};
  // Use name or value as the unique ID for linking label and input

  // Theme-based label styling
  const getLabelClasses = (theme) =>
  {
    switch (theme) {
      case 'light':
        return `font-medium inline-block text-left w-full relative cursor-pointer text-primary-text`; // Dark text for light theme
      case 'ica':
        return `font-medium text-left w-full relative flex cursor-pointer`;
      case 'dark':
      default:
        return `text-white text-base inline-block mb-2 text-left w-full relative cursor-pointer`; // White text for dark theme
    }
  };

  return (
    <div className={`${className} ${styles.checkbox}`} style={style}>
      <input
        type="checkbox"
        id={value} // Add id to match htmlFor
        name={value}
        ref={inputRef} // Forward ref for external control
        value={value}
        {...checkboxProps}
        onFocus={() => setCurrentErrorField(name)}
        onBlur={() => setCurrentErrorField(null)}
        data-validate="CheckboxMulti"
        className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer cursor-pointer"
      />
      <label
        className={getLabelClasses(theme)}
        htmlFor={value} // Use inputId instead of value
      >
        <span className="w-[28px] h-[28px]"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;