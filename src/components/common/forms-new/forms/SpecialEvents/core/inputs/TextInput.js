import React, { forwardRef } from 'react';
import { THEMES, getStateClasses } from './themes';

export const TextInput = forwardRef(({
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    type = 'text',
    theme = 'dark',
    hasError = false,
    isFocused = false,
    Icon,
    disabled = false,
    required = false,
    autoComplete = "new-password",
    maxLength,
    hidden = false,
    currentErrorField,
    setCurrentErrorField,
    ...props
}, ref) =>
{
    const themeConfig = THEMES[theme];
    const stateClasses = getStateClasses(theme, hasError, isFocused);

    if (hidden) {
        return (
            <input
                ref={ref}
                type="text"
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                {...props}
            />
        );
    }

    return (
        <div className={themeConfig.inputContainer}>
            <input
                ref={ref}
                className={`${themeConfig.input} ${stateClasses.input}`}
                type={type}
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                maxLength={maxLength}
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

TextInput.displayName = 'TextInput';