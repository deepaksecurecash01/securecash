import React, { forwardRef } from 'react';
import { THEMES, getStateClasses } from './themes';

export const TextareaInput = forwardRef(({
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    rows = 3,
    theme = 'dark',
    hasError = false,
    isFocused = false,
    disabled = false,
    required = false,
    autoComplete = "new-password",
    currentErrorField,
    setCurrentErrorField,
    ...props
}, ref) =>
{
    const themeConfig = THEMES[theme];
    const stateClasses = getStateClasses(theme, hasError, isFocused);

    return (
        <textarea
            ref={ref}
            className={`${themeConfig.textarea} ${stateClasses.textarea}`}
            value={value || ''}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
            {...props}
        />
    );
});

TextareaInput.displayName = 'TextareaInput';