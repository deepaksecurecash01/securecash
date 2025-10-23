// /hooks/useFocusManager.js - FIXED: Uses RHF field registry order instead of DOM
import { useState, useCallback, useRef } from 'react';

/**
 * FIXED: Smart Focus Manager that respects React Hook Form field registration order
 * Solves the file upload sequential validation issue by using RHF's internal field registry
 */
export const useFocusManager = (control) =>
{
    const [currentFocusField, setCurrentFocusField] = useState(null);
    const focusAttempts = useRef({});
    const lastFocusedField = useRef(null);

    // FIXED: Get fields in React Hook Form registration order
    const getFieldsInRegistrationOrder = useCallback(() =>
    {
        if (!control || !control._fields) {
            console.warn('SEQUENTIAL FIX: No control._fields available');
            return [];
        }

        // RHF maintains field registration order in _fields object
        const fieldNames = Object.keys(control._fields);
        console.log('SEQUENTIAL FIX: RHF field registration order:', fieldNames);
        return fieldNames;
    }, [control]);

    // FIXED: Get first error field in RHF registration order
    const getFirstErrorFieldInRegistrationOrder = useCallback((errors) =>
    {
        if (!errors || Object.keys(errors).length === 0) return null;

        const errorFields = Object.keys(errors);
        const registrationOrder = getFieldsInRegistrationOrder();

        console.log('SEQUENTIAL FIX: Error fields (alphabetical):', errorFields);
        console.log('SEQUENTIAL FIX: RHF registration order:', registrationOrder);

        // Find the first field in registration order that has an error
        for (const fieldName of registrationOrder) {
            if (errorFields.includes(fieldName)) {
                console.log(`SEQUENTIAL FIX: First error field in registration order: ${fieldName}`);
                return fieldName;
            }
        }

        // Fallback to alphabetical if registration order detection fails
        const fallback = errorFields[0];
        console.warn('SEQUENTIAL FIX: Registration order detection failed, using alphabetical fallback:', fallback);
        return fallback;
    }, [getFieldsInRegistrationOrder]);

    // Direct focus field setter (for field-initiated focus changes)
    const setFocusField = useCallback((fieldName) =>
    {
        console.log(`🎯 Setting focus field: ${fieldName}`);
        setCurrentFocusField(fieldName);
        lastFocusedField.current = fieldName;
    }, []);

    // Enhanced focus field with better error handling
    const focusField = useCallback((fieldName) =>
    {
        console.log(`SEQUENTIAL FIX: Attempting to focus field: ${fieldName}`);

        if (!control || !fieldName) {
            console.warn('Focus attempt failed: missing control or fieldName');
            return false;
        }

        // Set the focus state immediately for UI feedback
        setCurrentFocusField(fieldName);

        // Get field reference from React Hook Form's internal field registry
        const fieldRef = control._fields?.[fieldName]?._f?.ref;

        if (!fieldRef) {
            console.warn(`No ref found for field: ${fieldName}, trying DOM fallback`);

            // ENHANCED: DOM fallback for fields without refs
            const domElement = document.querySelector(`[name="${fieldName}"], [data-field-name="${fieldName}"]`);
            if (domElement) {
                // Try to find a focusable element within
                const focusableElement = domElement.querySelector('input, select, textarea, [tabindex]') || domElement;
                if (focusableElement && focusableElement.focus) {
                    focusableElement.focus();
                    console.log(`DOM fallback focus successful: ${fieldName}`);
                    return true;
                }

                // For file uploads, try scrolling into view
                if (domElement.querySelector('[type="file"]') || domElement.getAttribute('data-field-name')) {
                    domElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    console.log(`File upload scrolled into view: ${fieldName}`);
                    return true;
                }
            }

            return false;
        }

        const attemptFocus = () =>
        {
            try {
                // ENHANCED: File upload specific focus handling
                if (fieldRef && fieldRef.focus && typeof fieldRef.focus === 'function') {
                    fieldRef.focus();
                    console.log(`Successfully focused: ${fieldName}`);
                    return true;
                }

                // For wrapped components (like DatePicker), find the actual input
                if (fieldRef.querySelector) {
                    const focusableElement = fieldRef.querySelector('input, select, textarea, [tabindex]');
                    if (focusableElement) {
                        focusableElement.focus();
                        console.log(`Successfully focused nested element in: ${fieldName}`);
                        return true;
                    }
                }

                // For custom components with focus methods
                if (fieldRef.current && fieldRef.current.focus) {
                    fieldRef.current.focus();
                    console.log(`Successfully focused via ref.current: ${fieldName}`);
                    return true;
                }

                // ENHANCED: File upload container focus
                if (fieldRef.dataset && fieldRef.dataset.fieldName === fieldName) {
                    fieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    console.log(`File field scrolled into view: ${fieldName}`);
                    return true;
                }

                console.warn(`⚠ Could not focus field DOM element: ${fieldName}`, fieldRef);
                return false;

            } catch (error) {
                console.error(`Focus error for ${fieldName}:`, error);
                return false;
            }
        };

        // Immediate attempt
        const success = attemptFocus();

        // If immediate focus fails, try again after a short delay (for async components)
        if (!success && !focusAttempts.current[fieldName]) {
            focusAttempts.current[fieldName] = true;
            setTimeout(() =>
            {
                console.log(`Retrying focus for: ${fieldName}`);
                attemptFocus();
                delete focusAttempts.current[fieldName];
            }, 100);
        }

        return success;
    }, [control]);

    // FIXED: First error focus using RHF registration order instead of alphabetical order
    const focusFirstError = useCallback((errors) =>
    {
        if (!errors || Object.keys(errors).length === 0) {
            setCurrentFocusField(null);
            return false;
        }

        // CRITICAL FIX: Use RHF registration order instead of Object.keys() alphabetical order
        const firstErrorField = getFirstErrorFieldInRegistrationOrder(errors);

        if (!firstErrorField) {
            console.warn('SEQUENTIAL FIX: No error field found in registration order');
            return false;
        }

        console.log(`🚨 SEQUENTIAL FIX: Focusing first error field in registration order: ${firstErrorField}`);
        return focusField(firstErrorField);
    }, [focusField, getFirstErrorFieldInRegistrationOrder]);

    // Clear focus with logging
    const clearFocus = useCallback(() =>
    {
        console.log(`🧹 Clearing focus from: ${currentFocusField}`);
        setCurrentFocusField(null);
    }, [currentFocusField]);

    // Check if a field is currently focused
    const isFieldFocused = useCallback((fieldName) =>
    {
        return currentFocusField === fieldName;
    }, [currentFocusField]);

    // Get focus history for debugging
    const getFocusDebugInfo = useCallback(() =>
    {
        return {
            currentFocusField,
            lastFocusedField: lastFocusedField.current,
            controlExists: !!control,
            fieldsCount: control?._fields ? Object.keys(control._fields).length : 0,
            registrationOrder: getFieldsInRegistrationOrder()
        };
    }, [currentFocusField, control, getFieldsInRegistrationOrder]);

    return {
        // Core focus management
        focusField,
        focusFirstError, // Now uses RHF registration order instead of alphabetical order
        clearFocus,

        // Field-initiated focus management
        setFocusField,

        // State accessors
        currentFocusField,
        isFieldFocused,

        // Debug utilities
        getFocusDebugInfo,

        // SEQUENTIAL FIX: New utilities
        getFieldsInRegistrationOrder,
        getFirstErrorFieldInRegistrationOrder,

        // Legacy support (kept for backward compatibility)
        lastFocusedField: lastFocusedField.current
    };
};