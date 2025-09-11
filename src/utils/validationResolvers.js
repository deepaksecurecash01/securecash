// /utils/validationResolvers.js
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Single Error Resolver - Returns only the first validation error
 * Maintains the "one error at a time" behavior with clean declarative schemas
 */
export const createSingleErrorResolver = (schema) =>
{
    return async (values, context, options) =>
    {
        try {
            // Use standard Zod resolver
            const result = await zodResolver(schema)(values, context, options);

            // If there are validation errors, return only the first one
            if (result.errors && Object.keys(result.errors).length > 0) {
                const firstErrorField = Object.keys(result.errors)[0];
                const firstError = result.errors[firstErrorField];

                return {
                    values: {},
                    errors: {
                        [firstErrorField]: firstError
                    }
                };
            }

            // No errors - return success
            return {
                values: result.values,
                errors: {}
            };

        } catch (error) {
            console.error('Single error resolver failed:', error);
            // Fallback to standard resolver behavior
            return zodResolver(schema)(values, context, options);
        }
    };
};

/**
 * Field Priority Single Error Resolver
 * Returns the first error based on a specific field order (like your sequential schema)
 */
export const createPriorityErrorResolver = (schema, fieldOrder = []) =>
{
    return async (values, context, options) =>
    {
        try {
            // Use standard Zod resolver first
            const result = await zodResolver(schema)(values, context, options);

            // If there are validation errors, find the highest priority error
            if (result.errors && Object.keys(result.errors).length > 0) {
                const errorFields = Object.keys(result.errors);

                // Find the first field in our priority order that has an error
                let firstErrorField = errorFields[0]; // fallback

                for (const priorityField of fieldOrder) {
                    if (errorFields.includes(priorityField)) {
                        firstErrorField = priorityField;
                        break;
                    }
                }

                return {
                    values: {},
                    errors: {
                        [firstErrorField]: result.errors[firstErrorField]
                    }
                };
            }

            return {
                values: result.values,
                errors: {}
            };

        } catch (error) {
            console.error('Priority error resolver failed:', error);
            return zodResolver(schema)(values, context, options);
        }
    };
};

// Example usage:
/*
// Basic single error (first error found)
const resolver = createSingleErrorResolver(MySchema);

// Priority-based single error (follows specific field order)
const priorityResolver = createPriorityErrorResolver(
    MySchema, 
    ['Name', 'Position', 'Email', 'Birthdate', 'Organisation', 'ABN']
);
*/