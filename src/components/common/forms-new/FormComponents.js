import React, { useEffect, useState } from 'react';
import { FaFileUpload, FaFile, FaTimes } from 'react-icons/fa';
import WarningPopup from "@/components/common/forms/elements/WarningPopup";


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