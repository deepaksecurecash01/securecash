// /components/common/forms-new/core/UniversalFormField.js - ENHANCED FOR ICA THEME
import React from 'react';
import { Controller } from 'react-hook-form';
import WarningPopup from './WarningPopup';
import FieldRenderer from './FieldRenderer';

// Enhanced theme configurations with ICA support
const THEMES = {
    dark: {
        label: "text-white text-base inline-block mt-4 mb-2 w-full text-left",
    },
    light: {
        label: "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0",
    },
    'legacy-hazard': {
        label: null, // Labels are handled inside specialized components for this theme
    },
    // NEW: ICA theme - labels handled externally in wrapper components
    'ica': {
        label: null, // Labels are rendered by ICA wrapper components for consistent styling
    }
};

/**
 * Enhanced UniversalFormField with Complete Theme Support
 * Handles all themes including ICA with pixel-perfect styling preservation
 */
const UniversalFormField = ({
    // Core props
    name,
    control, // Required - comes from React Hook Form
    type = 'text',
    label,
    hidden = false,

    // Theme
    theme = 'dark',

    // Focus management
    currentFocusField,
    onFieldFocus,
    onFieldBlur,

    // Field-specific props (passed to FieldRenderer)
    placeholder,
    Icon,
    Icon2,
    options = [], // for select
    rows = 3, // for textarea
    maxLength,
    footnote, // For legacy/ICA theme footnotes

    // Date picker specific
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",

    // Checkbox group specific
    variant = 'horizontal',

    // File upload specific
    accept = "image/*",
    multiple = false,
    fileUploadState, // File upload state from useFormManager

    // Standard HTML props
    disabled = false,
    required = false,
    autoComplete = "new-password",

    ...otherProps
}) =>
{
    const themeConfig = THEMES[theme];

    if (!control) {
        console.error(`UniversalFormField: 'control' prop is required for field '${name}'`);
        return (
            <div className="text-red-500 p-2 border border-red-500">
                Error: Missing &apos;control&apos; prop for field &apos;{name}&apos;
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Label - rendered only for themes that handle labels internally */}
            {label && themeConfig.label && !hidden && (
                <label className={themeConfig.label}>
                    {label}
                </label>
            )}

            {/* Enhanced Controller with complete theme support */}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <FieldRenderer
                        type={type}
                        field={field}
                        fieldState={fieldState}
                        currentFocusField={currentFocusField}
                        onFieldFocus={onFieldFocus}
                        onFieldBlur={onFieldBlur}
                        // Pass all props to FieldRenderer
                        placeholder={placeholder}
                        Icon={Icon}
                        Icon2={Icon2}
                        hidden={hidden}
                        theme={theme}
                        options={options}
                        rows={rows}
                        maxLength={maxLength}
                        dayPlaceholder={dayPlaceholder}
                        monthPlaceholder={monthPlaceholder}
                        yearPlaceholder={yearPlaceholder}
                        format={format}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        variant={variant}
                        // File upload specific
                        accept={accept}
                        multiple={multiple}
                        fileUploadState={fileUploadState}
                        // Theme specific props
                        label={label} // Pass label to component for themes that need it
                        footnote={footnote} // Pass footnote to component
                        {...otherProps}
                    />
                )}
            />

            {/* Enhanced WarningPopup with theme-aware positioning */}
            <Controller
                name={name}
                control={control}
                render={({ fieldState }) => (
                    fieldState?.error && currentFocusField === name && (
                        <WarningPopup
                            error={fieldState.error.message}
                            isFirstError={true}
                            type={type}
                            // Theme-aware positioning
                            className={
                                theme === 'legacy-hazard' ? "top-16" :
                                    theme === 'ica' ? "top-12" :
                                        theme === 'light' && type === 'textarea' ? "top-[150px]" :
                                            theme === 'dark' && type === 'textarea' ? "top-[236px]" :

                                        undefined
                            }
                        />
                    )
                )}
            />
        </div>
    );
};

UniversalFormField.displayName = 'UniversalFormField';

export default UniversalFormField;