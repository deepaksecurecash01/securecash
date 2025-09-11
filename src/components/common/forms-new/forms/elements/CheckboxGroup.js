// /components/forms/elements/CheckboxGroup.js
import React from "react";
import { Controller } from 'react-hook-form';
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../../core/WarningPopup";

/**
 * Enhanced CheckboxGroup - Controller-based Architecture
 * Matches the new foundation pattern used in Terms/Austrac forms
 */
const CheckboxGroup = ({
    name,
    label,
    options = [],
    control,
    currentFocusField,
    onFieldFocus,
    onFieldBlur,
    theme = 'dark',
    className = "",
    ...otherProps
}) =>
{
    const themeConfig = {
        dark: {
            label: "checkboxHeaderText pt-6 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize",
            container: "text-left relative",
            wrapper: "chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-5 600px:grid-rows-3"
        },
        services: {
            label: "text-white text-base inline-block mt-4 mb-2",
            container: "text-left relative",
            wrapper: "control-wrapper relative flex flex-row justify-around items-center w-full mt-2"
        }

    };

    const config = themeConfig[theme];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className={`${config.container} ${className}`}>
                    <label className={config.label}>
                        {label}
                    </label>
                    <div className={config.wrapper}>
                        {options.map((option, index) => (
                            <Checkbox
                                key={index}
                                label={option.label}
                                value={option.value}
                                name={name}
                                register={() => ({
                                    name: field.name,
                                    onChange: (e) =>
                                    {
                                        const currentValues = field.value || [];
                                        const newValues = e.target.checked
                                            ? [...currentValues, option.value]
                                            : currentValues.filter(val => val !== option.value);
                                        field.onChange(newValues);
                                    },
                                    checked: (field.value || []).includes(option.value)
                                })}
                                currentErrorField={currentFocusField}
                                setCurrentErrorField={onFieldFocus}
                                className="chkbox float-left text-left relative"
                                {...otherProps}
                            />
                        ))}

                        {fieldState?.error && (
                            <WarningPopup
                                error={fieldState.error.message}
                                isFirstError={currentFocusField === name}
                                className={`${theme === 'services' ? 'top-12 left-[58px]' : 'top-[142px]'} `}
                            />
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default CheckboxGroup;