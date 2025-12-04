import { useState, useCallback, useRef } from 'react';

export const useFocusManager = (control) =>
{
    const [currentFocusField, setCurrentFocusField] = useState(null);
    const focusAttempts = useRef({});
    const lastFocusedField = useRef(null);

    const getFieldsInRegistrationOrder = useCallback(() =>
    {
        if (!control || !control._fields) {
            return [];
        }
        return Object.keys(control._fields);
    }, [control]);

    const getFirstErrorFieldInRegistrationOrder = useCallback((errors) =>
    {
        if (!errors || Object.keys(errors).length === 0) return null;

        const errorFields = Object.keys(errors);
        const registrationOrder = getFieldsInRegistrationOrder();

        for (const fieldName of registrationOrder) {
            if (errorFields.includes(fieldName)) {
                return fieldName;
            }
        }

        return errorFields[0];
    }, [getFieldsInRegistrationOrder]);

    const setFocusField = useCallback((fieldName) =>
    {
        setCurrentFocusField(fieldName);
        lastFocusedField.current = fieldName;
    }, []);

    const focusField = useCallback((fieldName) =>
    {
        if (!control || !fieldName) return false;

        setCurrentFocusField(fieldName);

        const fieldRef = control._fields?.[fieldName]?._f?.ref;

        if (!fieldRef) {
            const domElement = document.querySelector(`[name="${fieldName}"], [data-field-name="${fieldName}"]`);
            if (domElement) {
                const focusableElement = domElement.querySelector('input, select, textarea, [tabindex]') || domElement;
                if (focusableElement && focusableElement.focus) {
                    focusableElement.focus();
                    return true;
                }

                if (domElement.querySelector('[type="file"]') || domElement.getAttribute('data-field-name')) {
                    domElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return true;
                }
            }

            return false;
        }

        const attemptFocus = () =>
        {
            try {
                if (fieldRef && fieldRef.focus && typeof fieldRef.focus === 'function') {
                    fieldRef.focus();
                    return true;
                }

                if (fieldRef.querySelector) {
                    const focusableElement = fieldRef.querySelector('input, select, textarea, [tabindex]');
                    if (focusableElement) {
                        focusableElement.focus();
                        return true;
                    }
                }

                if (fieldRef.current && fieldRef.current.focus) {
                    fieldRef.current.focus();
                    return true;
                }

                if (fieldRef.dataset && fieldRef.dataset.fieldName === fieldName) {
                    fieldRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return true;
                }

                return false;
            } catch (error) {
                console.error(`Focus error for ${fieldName}:`, error);
                return false;
            }
        };

        const success = attemptFocus();

        if (!success && !focusAttempts.current[fieldName]) {
            focusAttempts.current[fieldName] = true;
            setTimeout(() =>
            {
                attemptFocus();
                delete focusAttempts.current[fieldName];
            }, 100);
        }

        return success;
    }, [control]);

    const focusFirstError = useCallback((errors) =>
    {
        if (!errors || Object.keys(errors).length === 0) {
            setCurrentFocusField(null);
            return false;
        }

        const firstErrorField = getFirstErrorFieldInRegistrationOrder(errors);

        if (!firstErrorField) return false;

        return focusField(firstErrorField);
    }, [focusField, getFirstErrorFieldInRegistrationOrder]);

    const clearFocus = useCallback(() =>
    {
        setCurrentFocusField(null);
    }, []);

    const isFieldFocused = useCallback((fieldName) =>
    {
        return currentFocusField === fieldName;
    }, [currentFocusField]);

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
        focusField,
        focusFirstError,
        clearFocus,
        setFocusField,
        currentFocusField,
        isFieldFocused,
        getFocusDebugInfo,
        getFieldsInRegistrationOrder,
        getFirstErrorFieldInRegistrationOrder,
        lastFocusedField: lastFocusedField.current
    };
};