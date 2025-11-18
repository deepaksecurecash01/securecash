// /components/common/forms-new/core/FieldRenderer.js - FINAL OPTIMIZED VERSION

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // <-- ADDED for dynamic import
import
{
    TextInput,
    ABNInput,
    // 💥 DateInput REMOVED from static import
    SelectInput,
    TextareaInput,
    CheckboxGroupInput,
    FileUploadInput
} from './SpecializedInputs';

// 💥 CRITICAL FIX: Dynamically load DateInput and its heavy CSS bundle
const DynamicDateInput = dynamic(
    () => import('./DateInputWrapper'), // Path to the new file
    {
        ssr: false,
        loading: () => <div className="h-9 w-full bg-gray-100 animate-pulse rounded-[2px] border" />,
    }
);


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
    const isFieldFocused = currentFocusField === field.name;
    const hasError = !!fieldState?.error;

    const handleFocus = (e) =>
    {
        setIsFocused(true);
        if (onFieldFocus) onFieldFocus(field.name);
    };

    const handleBlur = (e) =>
    {
        setIsFocused(false);
        if (onFieldBlur) onFieldBlur(field.name);
    };

    // Common properties passed to all inputs
    const commonProps = {
        ref: field.ref,
        value: field.value,
        onChange: field.onChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        name: field.name,
        theme: theme,
        hasError: hasError,
        isFocused: isFieldFocused,
        disabled: disabled,
        required: required,
        autoComplete: autoComplete,
        placeholder: placeholder,
        currentErrorField: currentFocusField,
        setCurrentErrorField: onFieldFocus,
    };

    // Props specifically for legacy themes
    const legacyProps = { label, footnote };

    switch (type) {
        case 'text':
            return (
                <TextInput
                    {...commonProps}
                    type="text"
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );

        case 'abn':
            return (
                <ABNInput
                    {...commonProps}
                    type="text"
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );

        case 'email':
            return (
                <TextInput
                    {...commonProps}
                    type="email"
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );

        // 🚀 FIX: Handle 'url' type to suppress build warnings
        case 'url':
            return (
                <TextInput
                    {...commonProps}
                    type="url" // Explicitly set type to 'url' for browser validation
                    Icon={Icon || Icon2}
                    maxLength={maxLength}
                    hidden={hidden}
                />
            );

        case 'date':
            return (
                <DynamicDateInput // <-- USED DYNAMIC COMPONENT
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
                />
            );

        case 'textarea':
            return (
                <TextareaInput
                    {...commonProps}
                    rows={rows}
                />
            );

        case 'file-upload':
        // 🚀 FIX: Map 'file' type to the existing FileUploadInput component
        case 'file':
            return (
                <FileUploadInput
                    accept={accept}
                    multiple={multiple}
                    fileUploadState={fileUploadState}
                    // ENHANCED: Complete file upload integration with ref forwarding
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    name={field.name}
                    theme={theme}
                    hasError={hasError}
                    isFocused={isFieldFocused}
                    disabled={disabled}
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
            // console.warn(`Unknown field type: ${type}, falling back to text input`); // Optional: Can be commented out now
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