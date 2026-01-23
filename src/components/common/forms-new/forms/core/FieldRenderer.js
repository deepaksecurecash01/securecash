import { useEffect, useState } from "react";
import {
  ABNInput,
  CheckboxGroupInput,
  DateInput,
  FileUploadInput,
  SelectInput,
  SignatureInput,
  TextareaInput,
  TextInput,
} from "./SpecializedInputs";

const FieldRenderer = ({
  type,
  field,
  fieldState,
  currentFocusField,
  onFieldFocus,
  onFieldBlur,
  placeholder,
  hidden = false,
  Icon,
  Icon2,
  theme = "dark",
  options = [],
  rows = 3,
  maxLength,
  dayPlaceholder = "DD",
  monthPlaceholder = "MM",
  yearPlaceholder = "YYYY",
  format = "dd/MM/yyyy",
  variant = "horizontal",
  accept = "image/*",
  multiple = false,
  label,
  footnote,
  disabled = false,
  required = false,
  autoComplete = "new-password",
  fileUploadState,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const { value, onChange, onBlur, name, ref } = field;
  const { error } = fieldState;
  const hasError = !!error;

  const isCurrentFocusField = currentFocusField === name;
  const isFieldFocused = isFocused || isCurrentFocusField;

  const handleFocus = (e) => {
    setIsFocused(true);

    if (onFieldFocus && typeof onFieldFocus === "function") {
      onFieldFocus(name);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);

    if (onFieldBlur && typeof onFieldBlur === "function") {
      onFieldBlur();
    }
  };

  useEffect(() => {
    if (isCurrentFocusField && !isFocused) {
      setIsFocused(true);
    } else if (!isCurrentFocusField && isFocused) {
      if (currentFocusField !== null && currentFocusField !== name) {
        setIsFocused(false);
      }
    }
  }, [isCurrentFocusField, isFocused, currentFocusField, name]);

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
    ...otherProps,
  };

  const legacyProps =
    theme === "legacy-hazard"
      ? {
          label,
          footnote,
          currentErrorField: isCurrentFocusField ? name : null,
          setCurrentErrorField: onFieldFocus,
        }
      : {};

  switch (type) {
    case "text":
    case "email":
    case "password":
    case "tel":
    case "url":
      return (
        <TextInput
          {...commonProps}
          type={type}
          Icon={Icon || Icon2}
          maxLength={maxLength}
          hidden={hidden}
        />
      );

    case "abn":
      return <ABNInput {...commonProps} Icon={Icon || Icon2} />;

    case "date":
      return (
        <DateInput
          {...commonProps}
          dayPlaceholder={dayPlaceholder}
          monthPlaceholder={monthPlaceholder}
          yearPlaceholder={yearPlaceholder}
          format={format}
        />
      );

    case "select":
      return (
        <SelectInput
          {...commonProps}
          options={options}
          Icon={Icon || Icon2}
          {...legacyProps}
        />
      );

    case "textarea":
      return <TextareaInput {...commonProps} rows={rows} />;

    case "number":
      return (
        <TextInput
          {...commonProps}
          type="number"
          Icon={Icon || Icon2}
          maxLength={maxLength}
        />
      );

    case "file":
      return (
        <FileUploadInput
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
          fileUploadState={fileUploadState}
          {...otherProps}
        />
      );

    case "signature":
      return (
        <SignatureInput {...commonProps} label={label} hasError={hasError} />
      );

    case "checkbox-group":
      return (
        <CheckboxGroupInput
          {...commonProps}
          options={options}
          name={field.name}
          variant={variant}
          {...legacyProps}
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
