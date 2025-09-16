// /components/common/forms-new/core/FieldRenderer.js - ENHANCED FOR COMPLETE FILE UPLOAD INTEGRATION
import React, { useState, useEffect } from 'react';
import
    {
        TextInput,
        ABNInput,
        DateInput,
        SelectInput,
        TextareaInput,
        CheckboxGroupInput,
        FileUploadInput
    } from './SpecializedInputs';

/**
 * Enhanced FieldRenderer with Complete Theme Support and File Upload Integration
 * Handles field rendering for all themes including ICA with pixel-perfect file upload support
 */
const FieldRenderer = ({
    type,
    field,
    fieldState,
    currentFocusField,
    onFieldFocus,
    onFieldBlur,
    // Field-specific props
    placeholder,
    hidden = false,
    Icon,
    Icon2,
    theme = 'dark',
    options = [], // for select
    rows = 3, // for textarea
    maxLength,
    // Date picker props
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",
    // Checkbox group props
    variant = 'horizontal',
    // File upload props
    accept = "image/*",
    multiple = false,
    // Legacy theme props
    label,
    footnote,
    // Standard props
    disabled = false,
    required = false,
    autoComplete = "new-password",
    // ENHANCED: File upload state (from useFormManager)
    fileUploadState,
    ...otherProps
}) =>
{
    const [isFocused, setIsFocused] = useState(false);

    // Extract field and error info from React Hook Form
    const { value, onChange, onBlur, name, ref } = field;
    const { error } = fieldState;
    const hasError = !!error;

    // Focus state management
    const isCurrentFocusField = currentFocusField === name;
    const isFieldFocused = isFocused || isCurrentFocusField;

    // Enhanced focus handler with global state sync
    const handleFocus = (e) =>
    {
        setIsFocused(true);

        if (onFieldFocus && typeof onFieldFocus === 'function') {
            onFieldFocus(name);
        }

        console.log(`Field focused: ${name}`);
    };

    // Enhanced blur handler with global state sync
    const handleBlur = (e) =>
    {
        setIsFocused(false);
        onBlur(e); // Call React Hook Form's onBlur

        if (onFieldBlur && typeof onFieldBlur === 'function') {
            onFieldBlur();
        }

        console.log(`Field blurred: ${name}`);
    };

    // Sync local focus state with global focus state
    useEffect(() =>
    {
        if (isCurrentFocusField && !isFocused) {
            setIsFocused(true);
        } else if (!isCurrentFocusField && isFocused) {
            if (currentFocusField !== null && currentFocusField !== name) {
                setIsFocused(false);
            }
        }
    }, [isCurrentFocusField, isFocused, currentFocusField, name]);

    // Common props for all input types
    const commonProps = {
        value,
        onChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder,
        theme,
        hasError,
        isFocused: isFieldFocused,
        disabled,
        required,
        autoComplete,
        ref,
        ...otherProps
    };

    // Legacy theme specific props for complex components
    const legacyProps = theme === 'legacy-hazard' ? {
        label,
        footnote,
        currentErrorField: isCurrentFocusField ? name : null,
        setCurrentErrorField: onFieldFocus,
    } : {};

    // Render appropriate input based on type
    switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'tel':
        case 'url':
            return (
                <TextInput
                    {...commonProps}
                    type={type}
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );

        case 'abn':
            return (
                <ABNInput
                    {...commonProps}
                    Icon={Icon || Icon2}
                />
            );

        case 'date':
            return (
                <DateInput
                    {...commonProps}
                    dayPlaceholder={dayPlaceholder}
                    monthPlaceholder={monthPlaceholder}
                    yearPlaceholder={yearPlaceholder}
                    format={format}
                />
            );

        case 'select':
            return (
                <SelectInput
                    {...commonProps}
                    options={options}
                    Icon={Icon || Icon2}
                    {...legacyProps} // Pass legacy-specific props for SelectInput
                />
            );

        case 'textarea':
            return (
                <TextareaInput
                    {...commonProps}
                    rows={rows}
                />
            );

        case 'number':
            return (
                <TextInput
                    {...commonProps}
                    type="number"
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                />
            );

        case 'file':
            return (
                <FileUploadInput
                    // ENHANCED: Complete file upload integration with ref forwarding
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    name={field.name}
                    theme={theme}
                    hasError={hasError}
                    isFocused={isFieldFocused}
                    disabled={disabled}
                    accept={accept}
                    multiple={multiple}
                    // ENHANCED: Pass complete file upload state
                    fileUploadState={fileUploadState}
                    {...otherProps}
                />
            );

        case 'checkbox-group':
            return (
                <CheckboxGroupInput
                    {...commonProps}
                    options={options}
                    name={field.name}
                    variant={variant}
                    {...legacyProps} // Pass legacy-specific props for CheckboxGroupInput
                />
            );

        default:
            console.warn(`Unknown field type: ${type}, falling back to text input`);
            return (
                <TextInput
                    {...commonProps}
                    type="text"
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );
    }
};

export default FieldRenderer;