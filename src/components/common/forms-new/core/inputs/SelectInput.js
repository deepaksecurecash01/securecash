import React, { forwardRef } from 'react';
import { FaCircle } from 'react-icons/fa';
import { THEMES, getStateClasses } from './themes';

export const SelectInput = forwardRef(({
    value,
    onChange,
    onBlur,
    onFocus,
    options = [],
    theme = 'dark',
    hasError = false,
    isFocused = false,
    Icon,
    disabled = false,
    label,
    footnote,
    name,
    currentErrorField,
    setCurrentErrorField,
    ...props
}, ref) =>
{
    const themeConfig = THEMES[theme];
    const selectId = `select-${name}`;

    if (theme === 'legacy-hazard') {
        return (
            <div className={themeConfig.selectContainer}>
                <FaCircle className={themeConfig.bulletPoint} />
                <div className={themeConfig.contentWrapper}>
                    <div className="flex items-start mb-2">
                        <label htmlFor={selectId} className={themeConfig.label}>
                            {label}
                        </label>
                    </div>
                    <div className={themeConfig.selectInputContainer}>
                        <Icon className={`${themeConfig.selectIcon} ${hasError && isFocused ? "text-red-500" :
                            isFocused ? "text-primary" : "text-[#999]"}`} aria-hidden="true" />
                        <select
                            id={selectId}
                            ref={ref}
                            className={`${themeConfig.select} ${hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary"}`}
                            value={value || ''}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            disabled={disabled}
                            data-validate="Inline"
                            aria-label={label}
                            {...props}
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <i className={themeConfig.selectArrow} aria-hidden="true" />
                    </div>
                    {footnote && (
                        <p className={themeConfig.selectFootnote} style={{ textAlign: "left" }}>
                            {footnote}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    const stateClasses = getStateClasses(theme, hasError, isFocused);
    return (
        <div className={themeConfig.selectContainer}>
            {Icon && <Icon className={`${themeConfig.selectIcon} ${stateClasses.selectIcon}`} aria-hidden="true" />}
            <select
                id={selectId}
                ref={ref}
                className={`${themeConfig.select} ${stateClasses.select}`}
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                aria-label={label || `Select ${name}`}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <i className={themeConfig.selectArrow} aria-hidden="true" />
        </div>
    );
});

SelectInput.displayName = 'SelectInput';