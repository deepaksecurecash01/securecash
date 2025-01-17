import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  value,
  className = "",
  style = {} ,
  register ,
  label,
  name,
  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const checkboxProps = register ? register(name) : {};

  return (
    <div className={` ${className} ${styles.checkbox}`} style={style}>
      <input
        type="checkbox"
        name={value}
        value={value}
        {...checkboxProps}
        onFocus={() => setCurrentErrorField(name)}
        onBlur={() => setCurrentErrorField(null)}
        data-validate="CheckboxMulti"
        className={` mt-2 text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer`}
      />
      <label
        className="text-white text-base inline-block mb-2 text-left mt-[10px] w-full  relative"
        htmlFor={value}
      >
        <span className="w-[28px] h-[28px]"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
