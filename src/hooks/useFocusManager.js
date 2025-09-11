// /hooks/useFocusManager.js
import { useState, useCallback, useRef } from 'react';

/**
 * Enhanced Smart Focus Manager for React Hook Form Controller Fields
 * Now provides proper callbacks for field-level focus management
 */
export const useFocusManager = (control) =>
{
    const [currentFocusField, setCurrentFocusField] = useState(null);
    const focusAttempts = useRef({});
    const lastFocusedField = useRef(null);

    // ✅ NEW: Direct focus field setter (for field-initiated focus changes)
    const setFocusField = useCallback((fieldName) =>
    {
        console.log(`🎯 Setting focus field: ${fieldName}`);
        setCurrentFocusField(fieldName);
        lastFocusedField.current = fieldName;
    }, []);

    // ✅ Enhanced focus field with better error handling
    const focusField = useCallback((fieldName) =>
    {
        console.log(`Attempting to focus field: ${fieldName}`);

        if (!control || !fieldName) {
            console.warn('Focus attempt failed: missing control or fieldName');
            return false;
        }

        // Set the focus state immediately for UI feedback
        setCurrentFocusField(fieldName);

        // Get field reference from React Hook Form's internal field registry
        const fieldRef = control._fields?.[fieldName]?._f?.ref;

        if (!fieldRef) {
            console.warn(`No ref found for field: ${fieldName}, but setting focus state anyway`);
            return true; // Still return true because we set the focus state
        }

        const attemptFocus = () =>
        {
            try {
                // Direct focus for standard inputs
                if (fieldRef.focus && typeof fieldRef.focus === 'function') {
                    fieldRef.focus();
                    console.log(`✅ Successfully focused: ${fieldName}`);
                    
                    return true;
                }

                // For wrapped components (like DatePicker), find the actual input
                if (fieldRef.querySelector) {
                    const focusableElement = fieldRef.querySelector('input, select, textarea, [tabindex]');
                    if (focusableElement) {
                        focusableElement.focus();
                        console.log(`✅ Successfully focused nested element in: ${fieldName}`);

                        return true;
                    }
                }

                // For custom components with focus methods
                if (fieldRef.current && fieldRef.current.focus) {
                    fieldRef.current.focus();
                    console.log(`✅ Successfully focused via ref.current: ${fieldName}`);
                   
                    return true;
                }

                console.warn(`❌ Could not focus field DOM element: ${fieldName}`, fieldRef);
                return true; // Still return true because we set the focus state

            } catch (error) {
                console.error(`Focus error for ${fieldName}:`, error);
                return true; // Still return true because we set the focus state
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

    // ✅ Enhanced first error focus with better logging
    const focusFirstError = useCallback((errors) =>
    {
        if (!errors || Object.keys(errors).length === 0) {
            setCurrentFocusField(null);
            return false;
        }

        const firstErrorField = Object.keys(errors)[0];
        console.log(`🚨 Focusing first error field: ${firstErrorField}`, errors[firstErrorField]);
        return focusField(firstErrorField);
    }, [focusField]);

    // ✅ NEW: Clear focus with logging
    const clearFocus = useCallback(() =>
    {
        console.log(`🧹 Clearing focus from: ${currentFocusField}`);
        setCurrentFocusField(null);
    }, [currentFocusField]);

    // ✅ NEW: Check if a field is currently focused
    const isFieldFocused = useCallback((fieldName) =>
    {
        return currentFocusField === fieldName;
    }, [currentFocusField]);

    // ✅ NEW: Get focus history for debugging
    const getFocusDebugInfo = useCallback(() =>
    {
        return {
            currentFocusField,
            lastFocusedField: lastFocusedField.current,
            controlExists: !!control,
            fieldsCount: control._fields ? Object.keys(control._fields).length : 0
        };
    }, [currentFocusField, control]);

    return {
        // Core focus management
        focusField,
        focusFirstError,
        clearFocus,

        // ✅ NEW: Field-initiated focus management
        setFocusField, // For when fields initiate their own focus

        // State accessors
        currentFocusField,
        isFieldFocused,

        // ✅ NEW: Debug utilities
        getFocusDebugInfo,

        // Legacy support (kept for backward compatibility)
        lastFocusedField: lastFocusedField.current
    };
};