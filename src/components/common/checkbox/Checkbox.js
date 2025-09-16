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
  // Theme-based label styling
  const getLabelClasses = (theme) =>
  {

    switch (theme) {
      case 'light':
        return `font-medium inline-block mt-4 text-left w-full relative cursor-pointer text-primary-text`; // Dark text for light theme
      case 'ica':
        return `font-medium text-left w-full relative flex`;
      case 'dark':
      default:
        return `text-white text-base inline-block mb-2 text-left mt-[10px] w-full  relative`; // White text for dark theme
    }
  };

  return (
    <div className={`${className} ${styles.checkbox}`} style={style}>
      <input
        type="checkbox"
        name={value}
        ref={inputRef} // Forward ref for external control
        value={value}
        {...checkboxProps}
        onFocus={() => setCurrentErrorField(name)}
        onBlur={() => setCurrentErrorField(null)}
        data-validate="CheckboxMulti"
        className="mt-2 text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
      />
      <label
        className={getLabelClasses(theme)}
        htmlFor={value}
      >
        <span className="w-[28px] h-[28px]"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;