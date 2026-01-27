import { Controller } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";
import WarningPopup from "./WarningPopup";

const THEMES = {
  dark: {
    label: "text-white text-base inline-block mt-4 mb-2 w-full text-left",
  },
  light: {
    label:
      "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0",
  },
  "legacy-hazard": {
    label: null,
  },
  ica: {
    label: null,
  },
};

const UniversalFormField = ({
  name,
  control,
  type = "text",
  label,
  hidden = false,
  theme = "dark",
  currentFocusField,
  onFieldFocus,
  onFieldBlur,
  placeholder,
  Icon,
  Icon2,
  options = [],
  rows = 3,
  maxLength,
  footnote,
  dayPlaceholder = "DD",
  monthPlaceholder = "MM",
  yearPlaceholder = "YYYY",
  format = "dd/MM/yyyy",
  variant = "horizontal",
  accept = "image/*",
  multiple = false,
  fileUploadState,
  disabled = false,
  required = false,
  autoComplete = "new-password",
  ...otherProps
}) => {
  const themeConfig = THEMES[theme];

  if (!control) {
    console.error(
      `UniversalFormField: 'control' prop is required for field '${name}'`,
    );
    return (
      <div className="text-red-500 p-2 border border-red-500">
        Error: Missing &apos;control&apos; prop for field &apos;{name}&apos;
      </div>
    );
  }

  return (
    <div className="relative">
      {label && themeConfig.label && !hidden && (
        <label className={themeConfig.label}>{label}</label>
      )}

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
            accept={accept}
            multiple={multiple}
            fileUploadState={fileUploadState}
            label={label}
            footnote={footnote}
            {...otherProps}
          />
        )}
      />

      <Controller
        name={name}
        control={control}
        render={({ fieldState }) =>
          fieldState?.error &&
          currentFocusField === name && (
            <WarningPopup
              error={fieldState.error.message}
              isFirstError={true}
              type={type}
              className={
                theme === "legacy-hazard"
                  ? "top-16"
                  : theme === "ica" && type === "file"
                    ? "top-[210px]"
                    : theme === "ica"
                      ? "top-12"
                      : theme === "light" && type === "textarea"
                        ? "top-[150px]"
                        : theme === "dark" && type === "textarea"
                          ? "top-[236px]"
                          : theme === "dark" && type === "signature"
                            ? "top-[252px]"
                            : undefined
              }
            />
          )
        }
      />
    </div>
  );
};

UniversalFormField.displayName = "UniversalFormField";

export default UniversalFormField;
