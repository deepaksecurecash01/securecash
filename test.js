// In SpecializedInputs.js - Find the DateInput component and update this section:

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
	// ... all your existing state and hooks ...

	// REPLACE THIS ENTIRE SECTION:
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
        /* ACCESSIBILITY FIX: Add accessible name to calendar button */
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