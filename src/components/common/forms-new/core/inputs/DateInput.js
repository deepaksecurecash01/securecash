import React, { forwardRef, useRef, useState, useEffect, useCallback, useImperativeHandle } from 'react';
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { THEMES } from './themes';

export const DateInput = forwardRef(({
    value,
    onChange,
    onBlur,
    onFocus,
    onEnterPress,
    theme = 'dark',
    hasError = false,
    isFocused = false,
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",
    disabled = false,
    autoComplete = "new-password",
    currentErrorField,
    setCurrentErrorField,
    ...props
}, ref) =>
{
    const datePickerRef = useRef();
    const themeConfig = THEMES[theme];
    const hasAutoFocusedRef = useRef(false);
    const lastCommittedValueRef = useRef(value);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState(value);
    const [isDateSelectedFromCalendar, setIsDateSelectedFromCalendar] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() =>
    {
        setIsClient(true);
    }, []);

    useEffect(() =>
    {
        setDisplayValue(value);
        lastCommittedValueRef.current = value;
    }, [value]);

    useImperativeHandle(ref, () => ({
        focus: () =>
        {
            const input = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input');
            if (input) {
                input.focus();
            }
        },
        scrollIntoView: (options) =>
        {
            if (datePickerRef.current) {
                datePickerRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    ...options
                });
            }
        },
        current: datePickerRef.current
    }), []);

    useEffect(() =>
    {
        if (!isClient) return;
        if (isFocused && hasError && !hasAutoFocusedRef.current) {
            const firstInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input');
            if (firstInput && document.activeElement !== firstInput) {
                firstInput.focus();
                hasAutoFocusedRef.current = true;
            }
        }
        if (!isFocused) {
            hasAutoFocusedRef.current = false;
        }
    }, [isFocused, hasError, isClient]);

    const getTypedDate = useCallback(() =>
    {
        const inputs = datePickerRef.current?.querySelectorAll(".react-date-picker__inputGroup__input");
        if (!inputs || inputs.length < 3) return null;

        const dayValue = inputs[0].value;
        const monthValue = inputs[1].value;
        const yearValue = inputs[2].value;

        if (!dayValue || !monthValue || !yearValue) return null;

        const [day, month, year] = [dayValue, monthValue, yearValue].map(v => parseInt(v, 10));
        if ([day, month, year].some(v => isNaN(v))) return null;

        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) return null;

        const parsed = new Date(year, month - 1, day);
        return isNaN(parsed.getTime()) ? null : parsed;
    }, []);

    const handleDatePickerChange = useCallback((newDate) =>
    {
        setDisplayValue(newDate);

        if (newDate === null) {
            onChange(null);
            lastCommittedValueRef.current = null;
            return;
        }

        if (isDateSelectedFromCalendar) {
            onChange(newDate);
            lastCommittedValueRef.current = newDate;
            setIsCalendarOpen(false);
            setIsDateSelectedFromCalendar(false);

            const activeInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input:focus');
            if (activeInput) {
                activeInput.blur();
            }
        } else {
            const typedDate = getTypedDate();
            if (typedDate && typedDate.getTime() === newDate.getTime()) {
                onChange(newDate);
                lastCommittedValueRef.current = newDate;
            }
        }
    }, [onChange, isDateSelectedFromCalendar, getTypedDate]);

    const handleKeyDown = useCallback((event) =>
    {
        if (event.key === "Enter") {
            event.preventDefault();

            const typedDate = getTypedDate();
            const dateToCommit = typedDate || displayValue;

            if (dateToCommit) {
                onChange(dateToCommit);
                lastCommittedValueRef.current = dateToCommit;
                setDisplayValue(dateToCommit);
            }

            setIsCalendarOpen(false);
            const activeInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input:focus');
            if (activeInput) {
                activeInput.blur();
            }

            if (onEnterPress) onEnterPress(dateToCommit);
        }
    }, [getTypedDate, displayValue, onChange, onEnterPress]);

    const handleInputChange = useCallback(() =>
    {
        setTimeout(() =>
        {
            const typedDate = getTypedDate();
            if (typedDate) {
                onChange(typedDate);
                lastCommittedValueRef.current = typedDate;
            }
        }, 50);
    }, [getTypedDate, onChange]);

    const handleCalendarOpen = useCallback(() =>
    {
        setIsCalendarOpen(true);
    }, []);

    const handleCalendarClose = useCallback(() =>
    {
        setIsCalendarOpen(false);
        setIsDateSelectedFromCalendar(false);
    }, []);

    const handleCalendarClick = useCallback((event) =>
    {
        const isDateButton = event.target.closest('.react-calendar__tile:not(.react-calendar__navigation button)');
        if (isDateButton) {
            setIsDateSelectedFromCalendar(true);
        }
    }, []);

    const handleFocusEvent = useCallback((event) =>
    {
        if (onFocus) onFocus(event);
    }, [onFocus]);

    const handleBlurEvent = useCallback((event) =>
    {
        const isStillWithinComponent = event.relatedTarget && (
            datePickerRef.current?.contains(event.relatedTarget) ||
            event.relatedTarget.closest('.react-calendar')
        );

        if (!isStillWithinComponent) {
            setIsCalendarOpen(false);
            setIsDateSelectedFromCalendar(false);

            const typedDate = getTypedDate();
            if (typedDate && (!lastCommittedValueRef.current || typedDate.getTime() !== lastCommittedValueRef.current.getTime())) {
                onChange(typedDate);
                lastCommittedValueRef.current = typedDate;
                setDisplayValue(typedDate);
            }

            if (onBlur) onBlur(event);
        }
    }, [onBlur, getTypedDate, onChange]);

    useEffect(() =>
    {
        if (!isClient || !isCalendarOpen) return;

        const calendar = document.querySelector('.react-calendar');
        if (calendar) {
            calendar.addEventListener('click', handleCalendarClick);
            return () => calendar.removeEventListener('click', handleCalendarClick);
        }
    }, [isCalendarOpen, handleCalendarClick, isClient]);

    useEffect(() =>
    {
        if (!isClient) return;

        const inputs = datePickerRef.current?.querySelectorAll('.react-date-picker__inputGroup__input');
        if (!inputs) return;

        inputs.forEach(input =>
        {
            input.addEventListener('input', handleInputChange);
            input.addEventListener('change', handleInputChange);
        });

        return () =>
        {
            inputs.forEach(input =>
            {
                input.removeEventListener('input', handleInputChange);
                input.removeEventListener('change', handleInputChange);
            });
        };
    }, [handleInputChange, isClient]);

    const handleClearClick = useCallback(() =>
    {
        setDisplayValue(null);
        onChange(null);
        lastCommittedValueRef.current = null;
    }, [onChange]);

    const getDividerColor = () =>
    {
        if (!isClient) return '#9CA3AF';
        return displayValue ? '#000000' : '#9CA3AF';
    };

    const getIconColor = () =>
    {
        if (!isClient) return '#999999';
        return hasError && isFocused ? '#dc2626' : isFocused ? '#c7a652' : '#999999';
    };

    const getPlaceholderColor = () => '#9CA3AF';

    const dateInputStyles = `
        .react-date-picker__inputGroup__input { 
            outline: none !important; 
            color: #000000 !important; 
        }
        .react-date-picker__inputGroup__input:focus { 
            outline: ${hasError ? '2px solid #dc2626 !important' : '2px solid #c7a652 !important'}; 
            border-radius: 2px !important; 
            color: #000000 !important; 
        }
        .react-date-picker__inputGroup__divider { 
            color: ${getDividerColor()} !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__inputGroup__input::placeholder { 
            color: ${getPlaceholderColor()} !important; 
            opacity: 1 !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__calendar-button svg,
        .react-date-picker__clear-button svg { 
            color: ${getIconColor()} !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__calendar-button:hover svg,
        .react-date-picker__clear-button:hover svg { 
            color: ${hasError && isFocused ? '#ef4444' : isFocused ? '#c7a652' : '#6B7280'} !important; 
        }
        .react-date-picker__wrapper { 
            height: 19px !important; 
            align-items: center; 
            border: none !important; 
        }
        .react-date-picker__inputGroup { 
            display: flex; 
            align-items: center; 
        }
        .react-date-picker__calendar { 
            position: absolute !important; 
            bottom: 44px !important; 
            left: -2px !important; 
        }
        .react-date-picker__button { 
            padding: 0 !important; 
        }
        .react-date-picker__calendar-button::before {
            content: 'Open calendar';
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;

    return (
        <div
            className={themeConfig.datePickerContainer}
            ref={datePickerRef}
            data-field-name={props.name}
        >
            <style>{dateInputStyles}</style>
            <DatePicker
                value={displayValue || null}
                onChange={handleDatePickerChange}
                onBlur={handleBlurEvent}
                onFocus={handleFocusEvent}
                onKeyDown={handleKeyDown}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
                isOpen={isCalendarOpen}
                dayPlaceholder={dayPlaceholder}
                monthPlaceholder={monthPlaceholder}
                yearPlaceholder={yearPlaceholder}
                format={format}
                autoComplete={autoComplete}
                className={themeConfig.datePicker}
                calendarIcon={<FaCalendarAlt className="text-[18px] transition-colors duration-200" aria-label="Open calendar" />}
                clearIcon={displayValue ? <FaTimes className="min-w-[40px] text-[18px] transition-colors duration-200" onClick={handleClearClick} aria-label="Clear date" /> : null}
                disabled={disabled}
                calendarAriaLabel="Choose date"
                {...props}
            />
        </div>
    );
});

DateInput.displayName = 'DateInput';