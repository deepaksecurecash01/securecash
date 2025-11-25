// src/components/common/forms-new/core/DateInputWrapper.js

import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import DatePicker from "react-date-picker";

// 💥 CRITICAL FIX: Heavy CSS is contained here (async loading)
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { FaCalendarAlt } from "react-icons/fa";

import { THEMES } from './theme-utilities';


export const DateInput = forwardRef(
    ({
        name,
        value,
        onChange,
        onBlur,
        onFocus,
        theme = 'dark',
        disabled = false,
        required = false,
        isFocused = false,
        dayPlaceholder = "DD",
        monthPlaceholder = "MM",
        yearPlaceholder = "YYYY",
        format = "dd/MM/yyyy",
        setCurrentErrorField,
        currentErrorField,
        ...otherProps
    }, ref) =>
    {
        const internalRef = useRef();
        useImperativeHandle(ref, () => internalRef.current);

        const handleFocus = useCallback((e) =>
        {
            if (onFocus) onFocus(e);
        }, [onFocus]);

        const handleBlur = useCallback((e) =>
        {
            if (onBlur) onBlur(e);
            if (currentErrorField === name && setCurrentErrorField) {
                setCurrentErrorField(null);
            }
        }, [onBlur, currentErrorField, name, setCurrentErrorField]);

        // 💡 THEME FIX: Correctly retrieve classes based on theme, falling back to dark
        const currentTheme = THEMES[theme] || THEMES.dark;

        // Retrieve the specific class strings for the DatePicker input and its wrapper
        const baseInputClasses = currentTheme.input || THEMES.dark.input;
        const inputContainerClasses = currentTheme.inputContainer || THEMES.dark.inputContainer;

        const iconClasses = 'absolute text-[#999] text-[18px] left-3 pointer-events-none z-10';

        return (
            <div className={inputContainerClasses} data-theme={theme} data-focused={isFocused}>
                {/* Calendar Icon (decorative) */}
                <FaCalendarAlt className={iconClasses} />

                <DatePicker
                    ref={internalRef}
                    onChange={onChange}
                    value={value}
                    name={name}
                    id={name}
                    dayPlaceholder={dayPlaceholder}
                    monthPlaceholder={monthPlaceholder}
                    yearPlaceholder={yearPlaceholder}
                    format={format}
                    clearIcon={null}
                    calendarIcon={<FaCalendarAlt className="text-transparent" />}
                    disabled={disabled}
                    required={required}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    // Apply theme-based classes
                    className={`w-full ${baseInputClasses} h-9 pl-10 pr-3 z-20`}
                    {...otherProps}
                />
            </div>
        );
    }
);
DateInput.displayName = 'DateInput';

export default DateInput;