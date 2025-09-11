import React from 'react';
import DatePicker from "react-date-picker";
import WarningPopup from '../elements/WarningPopup'; // Adjust import path as needed
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const DatePickerField = ({
    // Core props
    label,
    name,
    value,
    onChange,
    onFocus,
    onBlur,

    // DatePicker specific props
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",
    autoComplete = "new-password",

    // Styling and state props
    disabled = false,
    className = "",
    containerClassName = "",
    labelClassName = "",

    // Error handling
    errors = {},
    currentErrorField = null,

    // Ref
    ref: forwardedRef,

    // Additional customization
    showWarningPopup = true,
    ...otherProps
}) =>
{
    const error = errors[name];
    const hasError = !!error;
    const isFirstError = currentErrorField === name;

    // Default styling classes
    const defaultClassName = `w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left  leading-6 appearance-none ${disabled
        ? 'opacity-50 focus:outline-red-600 focus:border-none focus:ring-0'
        : 'focus:outline-primary'
        }`;

    const finalClassName = `${defaultClassName} ${className}`;

    const defaultContainerClassName = "relative w-full";
    const finalContainerClassName = `${defaultContainerClassName} ${containerClassName}`;

    const defaultLabelClassName = "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0";
    const finalLabelClassName = `${labelClassName ? labelClassName : defaultLabelClassName}`;

    return (
        <div className={finalContainerClassName}>
            {label && (
                <label
                    className={finalLabelClassName}
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            <div className='relative w-full'>
                <DatePicker
                    value={value || null}
                    onChange={onChange}
                    onFocus={() => onFocus && onFocus(name)}
                    onBlur={() => onBlur && onBlur(null)}
                    dayPlaceholder={dayPlaceholder}
                    monthPlaceholder={monthPlaceholder}
                    yearPlaceholder={yearPlaceholder}
                    errors={errors}
                    inputRef={forwardedRef}
                    format={format}
                    autoComplete={autoComplete}
                    className={finalClassName}
                    disabled={disabled}
                    {...otherProps}
                />

                {hasError && showWarningPopup && (
                    <WarningPopup
                        error={error.message}
                        isFirstError={isFirstError}
                    />
                )}
            </div>

        </div>
    );
};

// Forward ref version for better ref handling
const DatePickerFieldWithRef = React.forwardRef((props, ref) => (
    <DatePickerField {...props} ref={ref} />
));

DatePickerFieldWithRef.displayName = 'DatePickerField';

export default DatePickerFieldWithRef;


// Usage example:
/*
<DatePickerField
  label="Pick a time that suits you and we'll call you back!"
  name="CallbackDate"
  value={selectedCallbackDate}
  onChange={(date) => setValue("CallbackDate", date, { shouldValidate: true })}
  onFocus={setCurrentErrorField}
  onBlur={setCurrentErrorField}
  errors={errors}
  ref={CallbackDateRef}
  disabled={!needsCallback}
/>
*/