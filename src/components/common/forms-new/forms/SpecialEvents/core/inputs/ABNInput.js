import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { THEMES, getStateClasses } from './themes';

const formatABN = (value) =>
{
    if (!value) return '';
    const digitsOnly = value.replace(/\D/g, '');
    const limitedDigits = digitsOnly.slice(0, 11);

    let formattedValue = limitedDigits;
    if (limitedDigits.length > 2) {
        formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2);
    }
    if (limitedDigits.length > 5) {
        formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5);
    }
    if (limitedDigits.length > 8) {
        formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5, 8) + ' ' + limitedDigits.slice(8);
    }

    return formattedValue;
};

export const ABNInput = forwardRef(({
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    theme = 'dark',
    hasError = false,
    isFocused = false,
    Icon,
    disabled = false,
    required = false,
    autoComplete = "new-password",
    currentErrorField,
    setCurrentErrorField,
    ...props
}, ref) =>
{
    const inputRef = useRef();
    const themeConfig = THEMES[theme];
    const stateClasses = getStateClasses(theme, hasError, isFocused);

    useImperativeHandle(ref, () => ({
        focus: () =>
        {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        scrollIntoView: (options) => inputRef.current?.scrollIntoView(options),
        current: inputRef.current
    }), []);

    return (
        <div className={themeConfig.inputContainer}>
            <input
                ref={inputRef}
                className={`${themeConfig.input} ${stateClasses.input}`}
                type="text"
                value={formatABN(value) || ""}
                onChange={(e) =>
                {
                    const formatted = formatABN(e.target.value);
                    onChange(formatted);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                maxLength={14}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                {...props}
            />
            {Icon && (
                <Icon className={`${themeConfig.icon} ${stateClasses.icon}`} />
            )}
        </div>
    );
});

ABNInput.displayName = 'ABNInput';