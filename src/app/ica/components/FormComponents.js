import React, { useEffect, useState } from 'react';
import { FaFileUpload, FaFile, FaTimes } from 'react-icons/fa';
import Divider from "@/components/common/Divider";
import WarningPopup from "@/components/common/forms/elements/WarningPopup";


// Input Field Component
export const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    textarea = false,
    registerFieldRef, // Add this prop for field focusing
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    // Get the register props
    const registerProps = register ? register(name) : {};

    // Custom ref handling to support both react-hook-form and field focusing
    const handleRef = (ref) =>
    {
        // Register with react-hook-form
        if (registerProps.ref) {
            registerProps.ref(ref);
        }
        // Register with field focusing system
        if (registerFieldRef) {
            registerFieldRef(name, ref);
        }
    };

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border border-dark-border/50">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                            }`}
                        name={name}
                        {...registerProps}
                        ref={handleRef}
                        onFocus={() =>
                        {
                            setCurrentErrorField && setCurrentErrorField(name);
                            setIsFocused(true);
                        }}
                        onBlur={() =>
                        {
                            setCurrentErrorField && setCurrentErrorField(null);
                            setIsFocused(false);
                        }}
                        placeholder={placeholder}
                        rows="3"
                        required
                    />
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
                            {...registerProps}
                            ref={handleRef}
                            onFocus={() =>
                            {
                                setCurrentErrorField && setCurrentErrorField(name);
                                setIsFocused(true);
                            }}
                            onBlur={() =>
                            {
                                setCurrentErrorField && setCurrentErrorField(null);
                                setIsFocused(false);
                            }}
                            placeholder={placeholder}
                            required
                        />
                        {Icon && (
                            <Icon
                                className={`min-w-[50px] text-[18px] ${hasError
                                    ? "text-red-500"
                                    : isFocused
                                        ? "text-primary"
                                        : "text-[#999]"
                                    }`}
                            />
                        )}
                    </>
                )}

                {errors[name] && (
                    <WarningPopup
                        error={errors[name]?.message}
                        isFirstError={currentErrorField === name}
                    />
                )}
            </div>
        </div>
    );
};

// Selection Box Component
export const SelectionBox = ({
    label,
    name,
    value,
    onChange,
    setValue,
    Icon,
    options = [],
    register,
    errors = {},
    currentErrorField,
    setCurrentErrorField,
    disabled = false,
    registerFieldRef, // Add this prop for field focusing
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    // Get the register props
    const registerProps = register ? register(name) : {};

    // Custom ref handling
    const handleRef = (ref) =>
    {
        if (registerProps.ref) {
            registerProps.ref(ref);
        }
        if (registerFieldRef) {
            registerFieldRef(name, ref);
        }
    };

    const handleChange = (e) =>
    {
        const selectedValue = e.target.value;

        // Call onChange prop if provided
        if (onChange) {
            onChange(selectedValue);
        }

        // Call setValue if provided (for react-hook-form)
        if (setValue) {
            setValue(name, selectedValue, { shouldValidate: true });
        }

        // Clear error state
        if (setCurrentErrorField) {
            setCurrentErrorField(null);
        }
    };

    const handleFocus = () =>
    {
        if (setCurrentErrorField) {
            setCurrentErrorField(name);
        }
        setIsFocused(true);
    };

    const handleBlur = () =>
    {
        if (setCurrentErrorField) {
            setCurrentErrorField(null);
        }
        setIsFocused(false);
    };

    return (
        <div className="relative">
            <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                {label}
            </label>
            <div className="input-container input-container-select w-full mx-auto text-left flex items-center relative rounded-[2px] border border-dark-border/50">
                {Icon && (
                    <Icon
                        className={`icon absolute text-[18px] rounded-l min-w-[20px] text-center ml-4 z-10 ${disabled
                            ? "text-[#999] opacity-50"
                            : hasError
                                ? "text-red-500"
                                : isFocused
                                    ? "text-primary"
                                    : "text-[#999]"
                            }`}
                    />
                )}

                <select
                    className={`w-full text-sm rounded-sm border border-white pl-12 pr-12 shadow-none font-montserrat leading-6 h-9 appearance-none bg-white ${disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : hasError
                            ? "focus:outline-red-600 focus:border-red-600 focus:ring-0"
                            : "focus:outline-primary focus:border-primary"
                        }`}
                    {...registerProps}
                    ref={handleRef}
                    value={value || ''}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    name={name}
                    disabled={disabled}
                >
                    {options.map((option, index) => (
                        <option key={`${option.value}-${index}`} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown Arrow */}
                <i className={`rotate-45 inline-block border-solid border-dark-border border-t-0 border-l-0 border-r-2 border-b-2 p-[3px] absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none ${disabled ? "opacity-50" : ""
                    }`} />

                {/* Error Popup */}
                {hasError && errors[name] && (
                    <WarningPopup
                        error={errors[name]?.message}
                        isFirstError={currentErrorField === name}
                    />
                )}
            </div>
        </div>
    );
};

// File Upload Component
export const FileUpload = ({
    label,
    name,
    accept = "image/*",
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    multiple = false,
    registerFieldRef,
    value, // Add value prop
    onChange, // Add onChange prop
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Reset uploadedFiles when value prop changes (e.g., form reset)
    useEffect(() =>
    {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            setUploadedFiles([]);
        } else if (value) {
            // Handle both single file and multiple files
            const filesArray = Array.isArray(value) ? value : [value];
            // Only set files that are actual File objects
            const validFiles = filesArray.filter(file => file instanceof File);
            setUploadedFiles(validFiles);
        }
    }, [value]);

    // Get the register props
    const registerProps = register ? register(name) : {};

    // Custom ref handling
    const handleRef = (ref) =>
    {
        if (registerProps.ref) {
            registerProps.ref(ref);
        }
        if (registerFieldRef) {
            registerFieldRef(name, ref);
        }
    };

    const handleFileChange = (files) =>
    {
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setUploadedFiles(fileArray);

            // Update the form data - this is the key fix
            const fileToSubmit = multiple ? fileArray : fileArray[0];
            if (onChange) {
                onChange(fileToSubmit);
            }

            // Also trigger the register onChange if it exists
            if (registerProps.onChange) {
                const event = {
                    target: {
                        name: name,
                        files: files,
                        value: fileToSubmit
                    }
                };
                registerProps.onChange(event);
            }
        }
    };

    const removeFile = (e, indexToRemove) =>
    {
        e.preventDefault();
        e.stopPropagation();
        const newFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
        setUploadedFiles(newFiles);

        // Update form data when files are removed
        const fileToSubmit = multiple ? newFiles : (newFiles.length > 0 ? newFiles[0] : null);
        if (onChange) {
            onChange(fileToSubmit);
        }

        // Also trigger the register onChange
        if (registerProps.onChange) {
            const event = {
                target: {
                    name: name,
                    files: newFiles,
                    value: fileToSubmit
                }
            };
            registerProps.onChange(event);
        }
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

    return (
        <div className="relative">
            <label className="text-gray-700 text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1">
                {label}
            </label>
            <div
                className={`relative w-full border-2 border-dashed rounded-lg text-center transition-colors h-[200px] overflow-hidden ${dragActive ? 'border-primary bg-blue-50' : 'border-dark-border/50 bg-white'
                    } ${hasError ? 'border-red-500' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="h-full w-full flex flex-col justify-center items-center bg-[rgb(242,242,242,0.3)] p-4 relative">
                    {uploadedFiles.length === 0 ? (
                        <div className="flex-1 flex flex-col justify-center">
                            <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {uploadedFiles.map((file, index) =>
                            {
                                const previewUrl = getFilePreview(file);
                                return (
                                    <div key={index} className=" rounded">
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
                                                <span className="text-xs text-gray-500">({file.size ? (file.size / 1024).toFixed(1) : '0'} KB)</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <FaFile className="text-blue-500 mr-2" />
                                                    <div>
                                                        <span className="text-sm text-gray-700 block">{file.name}</span>
                                                        <span className="text-xs text-gray-500">({file.size ? (file.size / 1024).toFixed(1) : '0'} KB)</span>
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
                    {...registerProps}
                    ref={handleRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    onFocus={() => setCurrentErrorField && setCurrentErrorField(name)}
                    onBlur={() => setCurrentErrorField && setCurrentErrorField(null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {errors[name] && (
                    <WarningPopup
                        error={errors[name]?.message}
                        isFirstError={currentErrorField === name}
                    />
                )}
            </div>
        </div>
    );
};

// Section Title Component
export const SectionTitle = ({ children, Icon, position = 'center' }) => (
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