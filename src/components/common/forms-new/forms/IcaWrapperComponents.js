// /components/forms/ICA/IcaWrapperComponents.js - FIXED FILE UPLOAD VERSION
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import WarningPopup from '@/components/common/forms-new/core/WarningPopup';
import styles from "@/components/common/checkbox/Checkbox.module.css";
import { FaTimes } from 'react-icons/fa';

/**
 * ICA Input Field - Pixel-perfect wrapper maintaining exact ICA styling
 */
export const IcaInputField = ({
    formManager,
    name,
    label,
    placeholder,
    type = 'text',
    Icon,
    textarea = false,
    ...props
}) =>
{
    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>

            <UniversalFormField
                name={name}
                control={formManager.control}
                type={textarea ? 'textarea' : type}
                theme="ica"
                placeholder={placeholder}
                Icon={Icon}
                currentFocusField={formManager.currentFocusField}
                onFieldFocus={formManager.handleFieldFocus}
                onFieldBlur={formManager.handleFieldBlur}
                rows={textarea ? 3 : undefined}
                {...props}
            />
        </div>
    );
};

/**
 * ICA Selection Box - Pixel-perfect wrapper maintaining exact ICA styling
 */
export const IcaSelectionBox = ({
    formManager,
    name,
    label,
    options = [],
    Icon,
    disabled = false,
    ...props
}) =>
{
    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>

            <UniversalFormField
                name={name}
                control={formManager.control}
                type="select"
                theme="ica"
                options={options}
                Icon={Icon}
                currentFocusField={formManager.currentFocusField}
                onFieldFocus={formManager.handleFieldFocus}
                onFieldBlur={formManager.handleFieldBlur}
                disabled={disabled}
                {...props}
            />
        </div>
    );
};

/**
 * ICA File Upload - COMPLETELY FIXED VERSION with proper preview functionality
 * This recreates the original FileUpload behavior with pixel-perfect styling
 */
export const IcaFileUpload = ({
    formManager,
    name,
    label,
    accept = "image/*",
    multiple = false,
    ...props
}) =>
{
    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>

            <Controller
                name={name}
                control={formManager.control}
                render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
                    <IcaFileUploadCore
                        name={name}
                        accept={accept}
                        multiple={multiple}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        inputRef={ref}
                        error={error}
                        isFocused={formManager.currentFocusField === name}
                        onFocus={() => formManager.handleFieldFocus(name)}
                        onBlurHandler={() => formManager.handleFieldBlur()}
                        {...props}
                    />
                )}
            />
        </div>
    );
};

/**
 * Core File Upload Component with EXACT original preview functionality
 */
const IcaFileUploadCore = ({
    name,
    accept,
    multiple,
    value,
    onChange,
    onBlur,
    inputRef,
    error,
    isFocused,
    onFocus,
    onBlurHandler,
    ...props
}) =>
{
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Sync uploadedFiles with form value - FIXED to maintain preview state
    React.useEffect(() =>
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

    const handleFileChange = (files) =>
    {
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setUploadedFiles(fileArray);

            // Update form state - preserve exact original behavior
            const fileToSubmit = multiple ? fileArray : fileArray[0];
            onChange(fileToSubmit);
        }
    };

    const removeFile = (e, indexToRemove) =>
    {
        e.preventDefault();
        e.stopPropagation();

        const newFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
        setUploadedFiles(newFiles);

        const fileToSubmit = multiple ? newFiles : (newFiles.length > 0 ? newFiles[0] : null);
        onChange(fileToSubmit);
    };

    const handleDragEnter = (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
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

    // EXACT original styling classes from ICA theme
    const containerClass = `relative w-full border-2 border-dashed rounded-lg text-center transition-colors h-[200px] overflow-hidden ${dragActive
            ? "border-primary bg-blue-50"
            : "border-dark-border/50 bg-white"
        }`;

    return (
        <div className="relative">
            <div
                className={containerClass}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="h-full w-full flex flex-col justify-center items-center bg-[rgb(242,242,242,0.3)] p-4 relative">
                    {uploadedFiles.length === 0 ? (
                        <div className="flex-1 flex flex-col justify-center">
                            <svg className="mx-auto text-4xl text-gray-400 mb-4 w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                            </svg>
                            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {uploadedFiles.map((file, index) =>
                            {
                                const previewUrl = getFilePreview(file);
                                return (
                                    <div key={index} className="rounded">
                                        <button
                                            type="button"
                                            onClick={(e) => removeFile(e, index)}
                                            className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                                        >
                                            <FaTimes />
                                        </button>

                                        {previewUrl ? (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={previewUrl}
                                                    alt={file.name}
                                                    className="w-36 h-24 object-cover rounded mb-2"
                                                />
                                                <span className="text-sm text-gray-700 text-center font-medium">{file.name}</span>
                                                <span className="text-xs text-gray-500">
                                                    ({file.size ? (file.size / 1024).toFixed(1) : '0'} KB)
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg className="text-blue-500 mr-2 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                                    </svg>
                                                    <div>
                                                        <span className="text-sm text-gray-700 text-center font-medium">{file.name}</span>
                                                        <span className="text-xs text-gray-500 block">
                                                            ({file.size ? (file.size / 1024).toFixed(1) : '0'} KB)
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

                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    ref={inputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    onFocus={onFocus}
                    onBlur={(e) =>
                    {
                        onBlur(e);
                        onBlurHandler();
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...props}
                />
            </div>

            {/* Error display with exact ICA positioning */}
            {error && isFocused && (
                <WarningPopup
                    error={error?.message}
                    isFirstError={true}
                    className="top-16"
                />
            )}
        </div>
    );
};

/**
 * ICA Checkbox - Pixel-perfect wrapper maintaining exact ICA styling
 */
export const IcaCheckbox = ({
    formManager,
    name,
    label,
    ...props
}) =>
{
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <Controller
                name={name}
                control={formManager.control}
                render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
                    <div className={`${styles.checkbox} relative`}>
                        <input
                            type="checkbox"
                            name={name}
                            checked={Boolean(value)}
                            ref={ref}
                            onChange={(e) => onChange(e.target.checked)}
                            onFocus={() =>
                            {
                                setIsFocused(true);
                                formManager.handleFieldFocus(name);
                            }}
                            onBlur={(e) =>
                            {
                                setIsFocused(false);
                                onBlur(e);
                                formManager.handleFieldBlur();
                            }}
                            data-validate="CheckboxMulti"
                            className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
                            {...props}
                        />

                        <label
                            className="font-medium mt-4 text-left w-full relative flex"
                            htmlFor={name}
                        >
                            <span className="w-[28px] h-[28px]"></span>
                            <div>{label}</div>
                        </label>

                        {error && formManager.currentFocusField === name && (
                            <WarningPopup
                                error={error?.message}
                                isFirstError={true}
                                className="top-16"
                            />
                        )}
                    </div>
                )}
            />
        </div>
    );
};

/**
 * ICA Date Picker Field - Wrapper for date fields with exact ICA styling
 */
export const IcaDatePickerField = ({
    formManager,
    name,
    label,
    dayPlaceholder = "DD",
    monthPlaceholder = "MM",
    yearPlaceholder = "YYYY",
    format = "dd/MM/yyyy",
    ...props
}) =>
{
    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>

            <UniversalFormField
                name={name}
                control={formManager.control}
                type="date"
                theme="ica"
                dayPlaceholder={dayPlaceholder}
                monthPlaceholder={monthPlaceholder}
                yearPlaceholder={yearPlaceholder}
                format={format}
                currentFocusField={formManager.currentFocusField}
                onFieldFocus={formManager.handleFieldFocus}
                onFieldBlur={formManager.handleFieldBlur}
                {...props}
            />
        </div>
    );
};

/**
 * ICA Section Title - PIXEL-PERFECT MATCH to original SectionTitle
 */
export const IcaSectionTitle = ({ children, Icon, position = 'center' }) =>
{
     const Divider = ({
    color = "primary",
    width = "100px",
    alignment = "center",
    margin = "my-6",
    responsiveClassName = "",
    customStyle = {}, // <--- you can pass extra style here
  }) => {
    // normalize width (accept number -> px, or string like '50%' or '120px')
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const style = {
      width: resolvedWidth,
      height: "4px",
      borderRadius: "5px",
      ...customStyle, // allow callers to override/add styles
    };

    // alignment via inline margin
    if (alignment === "left") {
      style.marginLeft = 0;
      style.marginRight = "auto";
    } else if (alignment === "right") {
      style.marginLeft = "auto";
      style.marginRight = 0;
    } else {
      // center
      style.marginLeft = "auto";
      style.marginRight = "auto";
    }

    // color handling: if hex -> inline style, else use Tailwind bg class
    let colorClass = "";
    if (typeof color === "string" && color.startsWith("#")) {
      style.backgroundColor = color;
    } else if (color) {
      colorClass = `bg-${color}`;
    }

    // keep Tailwind for border reset / margin utility string, but remove width/align classes
    return (
      <hr
        className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
        style={style}
      />
    );
  };

    return (
        <div className="mb-2">
            <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
                {Icon && <Icon className="text-[24px] text-primary" />}
                <h3 className="text-[26px] font-semibold text-gray-800">
                    {children}
                </h3>
            </div>
            <Divider
                color="primary"
                alignment={position === 'left' ? 'left' : 'center'}
                margin="mt-[20px]"
                responsiveClassName="m-0 text-left"
            />
        </div>
    );
};