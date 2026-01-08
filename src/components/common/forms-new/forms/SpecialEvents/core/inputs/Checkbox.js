import React from "react";
import styles from "./Checkbox.module.css";

const getLabelClasses = (theme) =>
{
  const themeClasses = {
    light: 'font-medium inline-block text-left w-full relative cursor-pointer text-primary-text',
    ica: 'font-medium text-left w-full relative flex cursor-pointer',
    dark: 'text-white text-base inline-block mb-2 text-left w-full relative cursor-pointer'
  };

  return themeClasses[theme] || themeClasses.dark;
};

const Checkbox = ({
  value,
  className = "",
  inputRef,
  style = {},
  register,
  label,
  name,
  theme = 'dark',
  setCurrentErrorField,
}) =>
{
  const checkboxProps = register ? register(name) : {};

  const handleFocus = () => setCurrentErrorField?.(name);
  const handleBlur = () => setCurrentErrorField?.(null);

  return (
    <div className={`${className} ${styles.checkbox}`} style={style}>
      <input
        type="checkbox"
        id={value}
        name={value}
        ref={inputRef}
        value={value}
        {...checkboxProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-validate="CheckboxMulti"
        className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer cursor-pointer"
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