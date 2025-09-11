// /components/common/forms-new/core/SpecializedInputs.js - UPDATED WITH FIXED ICA FILE UPLOAD
import Checkbox from "@/components/common/checkbox/Checkbox";
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react';
import DatePicker from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaTimes, FaCircle, FaFileUpload, FaFile } from "react-icons/fa";
import styles from "@/components/common/checkbox/Checkbox.module.css";

// COMPLETE THEMES - Including ICA theme with pixel-perfect styling
const THEMES = {
  dark: {
    input: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm h-9",
    inputContainer: "relative w-full flex items-center bg-white rounded-[2px] border",
    textarea: "w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white",
    select: "w-full text-sm rounded-md border border-white pl-12 shadow-none font-[Montserrat] bg-black text-white leading-6 h-9 appearance-none",
    selectContainer: "input-container input-container-select w-full mx-auto text-left flex items-center relative",
    selectIcon: "icon absolute text-[22px] rounded-l bg-black min-w-[20px] text-center ml-4",
    selectArrow: "rotate-45 inline-block border-solid border-white border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text",
    icon: "min-w-[50px] text-[18px] text-[#999]",
    datePicker: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left leading-6 appearance-none",
    datePickerContainer: "relative w-full flex items-center bg-white rounded-[2px] border"
  },
  light: {
    input: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm h-9",
    inputContainer: "relative w-full flex items-center bg-white rounded-[2px] border",
    textarea: "w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white",
    select: "w-full text-sm rounded-sm border border-white pl-12 shadow-none font-[Montserrat] leading-6 h-9 appearance-none",
    selectContainer: "input-container input-container-select w-full mx-auto text-left flex items-center relative rounded-[2px] border",
    selectIcon: "icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4",
    selectArrow: "rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text",
    icon: "min-w-[50px] text-[18px] text-[#999]",
    datePicker: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left leading-6 appearance-none",
    datePickerContainer: "relative w-full flex items-center bg-white rounded-[2px] border"
  },
  'legacy-hazard': {
    fieldContainer: "relative",
    bulletPoint: "text-primary text-[8px] mt-3 mr-3 flex-shrink-0 absolute top-3",
    contentWrapper: "pl-4",
    label: "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0",
    selectContainer: "relative",
    selectInputContainer: "input-container input-container-select w-full mx-auto text-left flex items-center relative rounded-[2px] border",
    selectIcon: "icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4",
    select: "w-full text-sm rounded-sm border border-white pl-12 shadow-none leading-6 h-9 appearance-none",
    selectArrow: "rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:border-active-text",
    selectFootnote: "text-sm text-gray-600 mt-2 italic",
    checkboxGroupContainer: "relative mt-4",
    checkboxGroupWrapper: "chkbox-container w-full mx-auto text-left relative",
    checkboxItem: "chkbox float-left text-left mt-2 mb-2 relative text-primary-text w-full",
    checkboxInput: "text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer",
    checkboxLabel: "font-light text-left w-full relative flex cursor-pointer",
    checkboxSpan: "w-[28px] h-[28px]",
    checkboxGroupFootnote: "text-sm text-gray-600 mt-2 italic"
  },
  // UPDATED: ICA Theme - Now with complete file upload integration
  'ica': {
    // Input field styling - exact replica of ICA InputField
    input: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm",
    inputContainer: "relative w-full flex items-center bg-white rounded-[2px] border border-dark-border/50",
    textarea: "w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white",

    // Select field styling - exact replica of ICA SelectionBox
    select: "w-full text-sm rounded-sm border border-white pl-12 pr-12 shadow-none font-montserrat leading-6 h-9 appearance-none bg-white",
    selectContainer: "input-container input-container-select w-full mx-auto text-left flex items-center relative rounded-[2px] border border-dark-border/50",
    selectIcon: "icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4 z-10",
    selectArrow: "rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none",

    // Label styling - consistent across all ICA fields
    label: "text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0",

    // Icon styling - consistent focus/error states
    icon: "min-w-[50px] text-[18px]",

    // Date picker styling (if needed for ICA)
    datePicker: "w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm bg-white text-left leading-6 appearance-none",
    datePickerContainer: "relative w-full flex items-center bg-white rounded-[2px] border border-dark-border/50",

    // FIXED: File upload styling - exact replica of original FileUpload
    fileUpload: "relative w-full border-2 border-dashed rounded-lg text-center transition-colors h-[200px] overflow-hidden",
    fileUploadInactive: "border-dark-border/50 bg-white",
    fileUploadActive: "border-primary bg-blue-50",
    fileUploadContent: "h-full w-full flex flex-col justify-center items-center bg-[rgb(242,242,242,0.3)] p-4 relative",
    fileUploadIcon: "mx-auto text-4xl text-gray-400 mb-4 w-16 h-16",
    fileUploadText: "text-sm text-gray-600 mb-2",
    fileUploadSubtext: "text-xs text-gray-500",
    filePreview: "space-y-3",
    filePreviewImage: "w-36 h-24 object-cover rounded mb-2",
    filePreviewName: "text-sm text-gray-700 text-center font-medium",
    filePreviewSize: "text-xs text-gray-500",
    // FIXED: Original remove button styling - exact match to original
    fileRemoveButton: "absolute top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
  }
};

// FIXED: FileUploadInput - Replace in your SpecializedInputs.js

// Complete Refined FileUploadInput Component - Replace in your SpecializedInputs.js



export const FileUploadInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  accept = "image/*",
  multiple = false,
  theme = 'dark',
  hasError,
  isFocused,
  disabled = false,
  fileUploadState,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  ...otherProps
}) =>
{
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  // Sync uploadedFiles with form value
  useEffect(() =>
  {
    if (!value) {
      setUploadedFiles([]);
    } else if (value instanceof FileList) {
      setUploadedFiles(Array.from(value));
    } else if (value instanceof File) {
      setUploadedFiles([value]);
    } else if (Array.isArray(value)) {
      setUploadedFiles(value.filter(file => file instanceof File));
    }
  }, [value]);

  // File validation
  const validateFile = (file) =>
  {
    const errors = [];

    // Size validation
    if (file.size > maxFileSize) {
      errors.push(`${file.name}: File too large. Maximum ${Math.round(maxFileSize / (1024 * 1024))}MB allowed.`);
    }

    // Type validation
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    }

    return errors;
  };

  const handleFileChange = (files) =>
  {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const newErrors = [];

    // Validate each file
    fileArray.forEach(file =>
    {
      const fileValidationErrors = validateFile(file);
      newErrors.push(...fileValidationErrors);
    });

    if (newErrors.length > 0) {
      setFileErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setFileErrors([]);
    setUploadedFiles(fileArray);

    // Update form state
    const fileToSubmit = multiple ? fileArray : fileArray[0];
    onChange(fileToSubmit);

    // Focus management
    if (onFocus) {
      onFocus({ target: { name } });
    }
  };

  const removeFile = (e, indexToRemove) =>
  {
    e.preventDefault();
    e.stopPropagation();

    const newFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(newFiles);

    // Clear any file errors when removing files
    setFileErrors([]);

    const fileToSubmit = multiple ? newFiles : (newFiles.length > 0 ? newFiles[0] : null);
    onChange(fileToSubmit);
  };

  const handleDragEnter = (e) =>
  {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e) =>
  {
    e.preventDefault();
    e.stopPropagation();
    // Only set drag inactive if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragActive(false);
    }
  };

  const handleDragOver = (e) =>
  {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) =>
  {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const isImageFile = (file) =>
  {
    return file && file.type && file.type.startsWith('image/');
  };

  const getFilePreview = (file) =>
  {
    if (file instanceof File && isImageFile(file)) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const formatFileSize = (bytes) =>
  {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Dynamic container classes based on state
  const getContainerClasses = () =>
  {
    const baseClasses = "relative w-full border-2 border-dashed rounded-lg text-center transition-all duration-200 h-[200px] overflow-hidden";

    // Drag state styling
    let stateClasses = "";
    if (disabled) {
      stateClasses = "border-gray-300 bg-gray-50 cursor-not-allowed";
    } else if (dragActive) {
      stateClasses = "border-primary bg-primary/10 shadow-lg";
    } else {
      stateClasses = "border-dark-border/50 bg-white hover:border-primary/50";
    }

    // Error styling - only when field is focused and has error
    const errorClasses = (hasError && isFocused) ? "border-red-500 bg-red-50/30" : "";

    return `${baseClasses} ${stateClasses} ${errorClasses}`;
  };

  const getFileIcon = (file) =>
  {
    if (file.type.startsWith('image/')) {
      return (
        <svg className="text-blue-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else if (file.type === 'application/pdf') {
      return (
        <svg className="text-red-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="text-gray-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="relative">
      {/* Main upload area */}
      <div
        className={getContainerClasses()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Content overlay - doesn't block clicks */}
        <div className="h-full w-full flex flex-col justify-center items-center bg-[rgb(242,242,242,0.3)] p-4 relative pointer-events-none">
          {uploadedFiles.length === 0 ? (
            // Empty state
            <div className="flex-1 flex flex-col justify-center items-center">
              <svg
                className={`mx-auto mb-4 w-16 h-16 transition-colors ${disabled ? 'text-gray-300' :
                  dragActive ? 'text-primary' : 'text-gray-400'
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                />
              </svg>
              <p className={`text-sm mb-2 ${disabled ? 'text-gray-400' : dragActive ? 'text-primary font-medium' : 'text-gray-600'}`}>
                {disabled ? 'File upload disabled' : dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
              </p>
              <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
                PNG, JPG, PDF up to {Math.round(maxFileSize / (1024 * 1024))}MB
              </p>
            </div>
          ) : (
            // Files preview
            <div className="space-y-3 w-full">
              {uploadedFiles.map((file, index) =>
              {
                const previewUrl = getFilePreview(file);
                return (
                  <div key={index} className="relative bg-white/80 rounded-lg p-3 shadow-sm">
                    {/* Remove button - positioned absolutely */}
                    <button
                      type="button"
                      onClick={(e) =>
                      {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFile(e, index);
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-30 shadow-lg border-2 border-white"
                      style={{ pointerEvents: 'auto' }}
                      disabled={disabled}
                      title="Remove file"
                    >
                      <FaTimes />
                    </button>

                    {previewUrl ? (
                      // Image preview
                      <div className="flex flex-col items-center">
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="w-32 h-20 object-cover rounded mb-2 shadow-sm"
                          onError={() => URL.revokeObjectURL(previewUrl)}
                        />
                        <span className="text-sm text-gray-700 font-medium text-center truncate max-w-full">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    ) : (
                      // Non-image file
                      <div className="flex items-center justify-center">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file)}
                          <div className="text-center">
                            <span className="text-sm text-gray-700 font-medium block truncate max-w-[200px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Hidden file input - handles all file selection */}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          disabled={disabled}
          style={{
            pointerEvents: disabled ? 'none' : 'auto',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          {...otherProps}
        />
      </div>

      {/* File validation errors */}
      {fileErrors.length > 0 && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="text-sm text-red-600">
            <strong>File Upload Errors:</strong>
            <ul className="mt-1 list-disc list-inside">
              {fileErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* File upload progress (for ICA theme with file processing) */}
      {theme === 'ica' && fileUploadState && fileUploadState.isProcessing && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm text-blue-600">
              Processing files... {fileUploadState.processingProgress || 0}%
            </span>
          </div>
        </div>
      )}

      {/* File upload processing errors (for ICA theme) */}
      {theme === 'ica' && fileUploadState && fileUploadState.fileErrors && fileUploadState.fileErrors.length > 0 && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="text-sm text-red-600">
            <strong>Processing Errors:</strong>
            <ul className="mt-1 list-disc list-inside">
              {fileUploadState.fileErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// ABN formatting utility
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

const getStateClasses = (theme, hasError, isFocused) =>
{
  const baseStyles = {
    input: hasError ? "focus:outline-red-600" : "focus:outline-primary",
    textarea: hasError ? "focus:outline-red-600" : "focus:outline-primary",
    select: hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary",
    datePicker: hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary"
  };

  const getIconColor = (iconType) =>
  {
    if (hasError && isFocused) return "text-red-500";
    if (isFocused) return "text-primary";

    // Different default colors per theme
    if (theme === 'light' || theme === 'legacy-hazard' || theme === 'ica') {
      return iconType === 'selectIcon' ? "text-[#999]" : "text-[#999]";
    } else {
      return iconType === 'selectIcon' ? "text-white" : "text-[#999]";
    }
  };

  const iconStyles = {
    icon: getIconColor('icon'),
    selectIcon: getIconColor('selectIcon'),
    dateIcon: getIconColor('dateIcon'),
  };

  return { ...baseStyles, ...iconStyles };
};

// Enhanced Text Input with ICA theme support
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

// Enhanced ABN Input with ICA theme support
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

// Enhanced Select Input with ICA theme support
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
  ...props
}, ref) =>
{
  const themeConfig = THEMES[theme];

  // Legacy theme rendering
  if (theme === 'legacy-hazard') {
    return (
      <div className={themeConfig.selectContainer}>
        <FaCircle className={themeConfig.bulletPoint} />
        <div className={themeConfig.contentWrapper}>
          <div className="flex items-start mb-2">
            <label className={themeConfig.label}>
              {label}
            </label>
          </div>
          <div className={themeConfig.selectInputContainer}>
            <Icon className={`${themeConfig.selectIcon} ${hasError && isFocused ? "text-red-500" :
              isFocused ? "text-primary" : "text-[#999]"}`} />
            <select
              ref={ref}
              className={`${themeConfig.select} ${hasError ? "focus:outline-red-600 focus:border-none focus:ring-0" : "focus:outline-primary"}`}
              value={value || ''}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              data-validate="Inline"
              {...props}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <i className={themeConfig.selectArrow} />
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

  // Standard and ICA theme rendering
  const stateClasses = getStateClasses(theme, hasError, isFocused);
  return (
    <div className={themeConfig.selectContainer}>
      {Icon && <Icon className={`${themeConfig.selectIcon} ${stateClasses.selectIcon}`} />}
      <select
        ref={ref}
        className={`${themeConfig.select} ${stateClasses.select}`}
        value={value || ''}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <i className={themeConfig.selectArrow} />
    </div>
  );
});

// Enhanced Textarea Input with ICA theme support
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



// Date Input (keeping existing implementation)
export const DateInput = forwardRef(({
  value,
  onChange,
  onBlur,
  onFocus,
  onEnterPress,
  theme = 'dark',
  hasError = false,
  isFocused = false,
  dayPlaceholder = "DD",
  monthPlaceholder = "MM",
  yearPlaceholder = "YYYY",
  format = "dd/MM/yyyy",
  disabled = false,
  autoComplete = "new-password",
  ...props
}, ref) =>
{
  const datePickerRef = useRef();
  const themeConfig = THEMES[theme];
  const hasAutoFocusedRef = useRef(false);
  const lastCommittedValueRef = useRef(value);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const [isDateSelectedFromCalendar, setIsDateSelectedFromCalendar] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() =>
  {
    setIsClient(true);
  }, []);

  useEffect(() =>
  {
    setDisplayValue(value);
    lastCommittedValueRef.current = value;
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus: () =>
    {
      const input = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input');
      input?.focus();
    },
    scrollIntoView: (options) => datePickerRef.current?.scrollIntoView(options),
    current: datePickerRef.current
  }), []);

  useEffect(() =>
  {
    if (!isClient) return;
    if (isFocused && hasError && !hasAutoFocusedRef.current) {
      const firstInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input');
      if (firstInput && document.activeElement !== firstInput) {
        firstInput.focus();
        hasAutoFocusedRef.current = true;
      }
    }
    if (!isFocused) {
      hasAutoFocusedRef.current = false;
    }
  }, [isFocused, hasError, isClient]);

  const getTypedDate = useCallback(() =>
  {
    const inputs = datePickerRef.current?.querySelectorAll(".react-date-picker__inputGroup__input");
    if (!inputs || inputs.length < 3) return null;

    const dayValue = inputs[0].value;
    const monthValue = inputs[1].value;
    const yearValue = inputs[2].value;

    if (!dayValue || !monthValue || !yearValue) return null;

    const [day, month, year] = [dayValue, monthValue, yearValue].map(v => parseInt(v, 10));
    if ([day, month, year].some(v => isNaN(v))) return null;

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) return null;

    const parsed = new Date(year, month - 1, day);
    return isNaN(parsed.getTime()) ? null : parsed;
  }, []);

  const handleDatePickerChange = useCallback((newDate) =>
  {
    setDisplayValue(newDate);

    if (newDate === null) {
      onChange(null);
      lastCommittedValueRef.current = null;
      return;
    }

    if (isDateSelectedFromCalendar) {
      onChange(newDate);
      lastCommittedValueRef.current = newDate;
      setIsCalendarOpen(false);
      setIsDateSelectedFromCalendar(false);

      const activeInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input:focus');
      if (activeInput) {
        activeInput.blur();
      }
    }
  }, [onChange, isDateSelectedFromCalendar]);

  const handleKeyDown = useCallback((event) =>
  {
    if (event.key === "Enter") {
      event.preventDefault();

      const typedDate = getTypedDate();
      const dateToCommit = typedDate || displayValue;

      if (dateToCommit) {
        onChange(dateToCommit);
        lastCommittedValueRef.current = dateToCommit;
        setDisplayValue(dateToCommit);
      }

      setIsCalendarOpen(false);
      const activeInput = datePickerRef.current?.querySelector('.react-date-picker__inputGroup__input:focus');
      if (activeInput) {
        activeInput.blur();
      }

      if (onEnterPress) onEnterPress(dateToCommit);
    }
  }, [getTypedDate, displayValue, onChange, onEnterPress]);

  const handleCalendarOpen = useCallback(() =>
  {
    setIsCalendarOpen(true);
  }, []);

  const handleCalendarClose = useCallback(() =>
  {
    setIsCalendarOpen(false);
    setIsDateSelectedFromCalendar(false);
  }, []);

  const handleCalendarClick = useCallback((event) =>
  {
    const isDateButton = event.target.closest('.react-calendar__tile:not(.react-calendar__navigation button)');
    if (isDateButton) {
      setIsDateSelectedFromCalendar(true);
    }
  }, []);

  const handleFocusEvent = useCallback((event) =>
  {
    if (onFocus) onFocus(event);
  }, [onFocus]);

  const handleBlurEvent = useCallback((event) =>
  {
    const isStillWithinComponent = event.relatedTarget && (
      datePickerRef.current?.contains(event.relatedTarget) ||
      event.relatedTarget.closest('.react-calendar')
    );

    if (!isStillWithinComponent) {
      setIsCalendarOpen(false);
      setIsDateSelectedFromCalendar(false);
      if (onBlur) onBlur(event);
    }
  }, [onBlur]);

  useEffect(() =>
  {
    if (!isClient || !isCalendarOpen) return;

    const calendar = document.querySelector('.react-calendar');
    if (calendar) {
      calendar.addEventListener('click', handleCalendarClick);
      return () => calendar.removeEventListener('click', handleCalendarClick);
    }
  }, [isCalendarOpen, handleCalendarClick, isClient]);

  const handleClearClick = useCallback(() =>
  {
    setDisplayValue(null);
    onChange(null);
    lastCommittedValueRef.current = null;
  }, [onChange]);

  const getDividerColor = () =>
  {
    if (!isClient) return '#9CA3AF';
    return displayValue ? '#000000' : '#9CA3AF';
  };

  const getIconColor = () =>
  {
    if (!isClient) return '#999999';
    return hasError && isFocused ? '#dc2626' : isFocused ? '#c7a652' : '#999999';
  };

  const getPlaceholderColor = () => '#9CA3AF';

  const dateInputStyles = `
        .react-date-picker__inputGroup__input { 
            outline: none !important; 
            color: #000000 !important; 
        }
        .react-date-picker__inputGroup__input:focus { 
            outline: ${hasError ? '2px solid #dc2626 !important' : '2px solid #c7a652 !important'}; 
            border-radius: 2px !important; 
            color: #000000 !important; 
        }
        .react-date-picker__inputGroup__divider { 
            color: ${getDividerColor()} !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__inputGroup__input::placeholder { 
            color: ${getPlaceholderColor()} !important; 
            opacity: 1 !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__calendar-button svg,
        .react-date-picker__clear-button svg { 
            color: ${getIconColor()} !important; 
            transition: color 0.2s ease !important; 
        }
        .react-date-picker__calendar-button:hover svg,
        .react-date-picker__clear-button:hover svg { 
            color: ${hasError && isFocused ? '#ef4444' : isFocused ? '#c7a652' : '#6B7280'} !important; 
        }
        .react-date-picker__wrapper { 
            height: 19px !important; 
            align-items: center; 
            border: none !important; 
        }
        .react-date-picker__inputGroup { 
            display: flex; 
            align-items: center; 
        }
        .react-date-picker__calendar { 
            position: absolute !important; 
            bottom: 44px !important; 
            left: -2px !important; 
        }
        .react-date-picker__button { 
            padding: 0 !important; 
        }
    `;

  return (
    <div className={themeConfig.datePickerContainer} ref={datePickerRef}>
      <style>{dateInputStyles}</style>
      <DatePicker
        value={displayValue || null}
        onChange={handleDatePickerChange}
        onBlur={handleBlurEvent}
        onFocus={handleFocusEvent}
        onKeyDown={handleKeyDown}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        isOpen={isCalendarOpen}
        dayPlaceholder={dayPlaceholder}
        monthPlaceholder={monthPlaceholder}
        yearPlaceholder={yearPlaceholder}
        format={format}
        autoComplete={autoComplete}
        className={themeConfig.datePicker}
        calendarIcon={<FaCalendarAlt className="text-[18px] transition-colors duration-200" />}
        clearIcon={displayValue ? <FaTimes className="min-w-[40px] text-[18px] transition-colors duration-200" onClick={handleClearClick} /> : null}
        disabled={disabled}
        {...props}
      />
    </div>
  );
});

// Checkbox Group Input (keeping existing implementation with ICA theme support)
export const CheckboxGroupInput = forwardRef(({
  value,
  onChange,
  onBlur,
  onFocus,
  options = [],
  name,
  theme = 'dark',
  hasError = false,
  isFocused = false,
  variant = 'horizontal',
  label,
  footnote,
  disabled = false,
  currentErrorField,
  setCurrentErrorField,
  ...props
}, ref) =>
{
  const themeConfig = THEMES[theme];

  // Legacy theme rendering with clean focus management
  if (theme === 'legacy-hazard') {
    return (
      <div className={themeConfig.checkboxGroupContainer}>
        <FaCircle className={themeConfig.bulletPoint} />
        <div className={themeConfig.contentWrapper}>
          <label className={themeConfig.label}>
            {label}
          </label>
          <div className={themeConfig.checkboxGroupWrapper}>
            {options.map((option, index) => (
              <LegacyCheckbox
                key={index}
                inputRef={index === 0 ? ref : null}
                label={option.label}
                value={option.value}
                name={name}
                checked={(value || []).includes(option.value)}
                onChange={(e) =>
                {
                  const currentValues = value || [];
                  const newValues = e.target.checked
                    ? [...currentValues, option.value]
                    : currentValues.filter(val => val !== option.value);
                  onChange(newValues);
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                className={themeConfig.checkboxItem}
              />
            ))}
          </div>
          {footnote && (
            <p className={themeConfig.checkboxGroupFootnote} style={{ textAlign: "left" }}>
              {footnote}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Standard theme rendering (including ICA)
  const getLayoutConfig = (variant) =>
  {
    switch (variant) {
      case 'grid':
        return {
          container: "text-left relative",
          wrapper: "chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-5 600px:grid-rows-3",
          warningPosition: "top-[142px]"
        };
      case 'site-grid':
        return {
          container: "text-left relative",
          wrapper: "chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around gap-1 1366px:place-content-between grid-rows-5 600px:grid-rows-4",
          warningPosition: "top-[142px]"
        };
      case 'agreement':
        return {
          container: "text-left relative ",
          wrapper: "control-wrapper relative w-full flex flex-row justify-left items-center mt-2",
          warningPosition: "top-12 left-[58px]"
        };
      case 'horizontal':
      default:
        return {
          container: "text-left relative",
          wrapper: "control-wrapper relative flex flex-row justify-around items-center w-full mt-2",
          warningPosition: "top-12 left-[58px]"
        };
    }
  };

  const layoutConfig = getLayoutConfig(variant);

  return (
    <div className={layoutConfig.container}>
      <div className={layoutConfig.wrapper}>
        {options.map((option, index) => (
          <Checkbox
            key={index}
            inputRef={index === 0 ? ref : null}
            label={option.label}
            value={option.value}
            name={name}
            theme={theme}
            register={() => ({
              name,
              onChange: (e) =>
              {
                const currentValues = value || [];
                const newValues = e.target.checked
                  ? [...currentValues, option.value]
                  : currentValues.filter(val => val !== option.value);
                onChange(newValues);
              },
              checked: (value || []).includes(option.value)
            })}
            currentErrorField={isFocused ? name : null}
            setCurrentErrorField={onFocus}
            className="chkbox float-left text-left relative"
            {...props}
          />
        ))}
      </div>
    </div>
  );
});

// Simplified Legacy Checkbox Component
const LegacyCheckbox = ({
  value,
  className = "",
  inputRef,
  style = {},
  label,
  name,
  checked,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  currentErrorField,
  setCurrentErrorField,
}) =>
{
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () =>
  {
    setIsActive(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e) =>
  {
    setIsActive(false);
    if (onBlur) onBlur(e);
    if (currentErrorField === name && setCurrentErrorField) {
      setCurrentErrorField(null);
    }
  };

  const handleChange = (e) =>
  {
    if (onChange) onChange(e);
  };

  return (
    <div className={`${className} ${styles.checkbox}`} style={style}>
      <input
        type="checkbox"
        name={value}
        value={value}
        checked={checked}
        ref={inputRef}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-validate="CheckboxMulti"
        className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
        disabled={disabled}
      />
      <label
        className="font-light text-left w-full relative flex cursor-pointer"
        htmlFor={value}
      >
        <span className="w-[28px] h-[28px]"></span>
        <div>{label}</div>
      </label>
    </div>
  );
};

// Set display names for debugging
TextInput.displayName = 'TextInput';
ABNInput.displayName = 'ABNInput';
DateInput.displayName = 'DateInput';
SelectInput.displayName = 'SelectInput';
TextareaInput.displayName = 'TextareaInput';
CheckboxGroupInput.displayName = 'CheckboxGroupInput';
FileUploadInput.displayName = 'FileUploadInput';