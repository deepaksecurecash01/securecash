// /utils/validation/singleErrorResolver.js
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Single Error Resolver
 * Wraps zodResolver to return only the first validation error
 * This gives you sequential behavior with clean declarative schemas
 */
export const singleErrorResolver = (schema) =>
{
    const baseResolver = zodResolver(schema);

    return async (values, context, options) =>
    {
        // Get all validation results from zodResolver
        const result = await baseResolver(values, context, options);

        // If there are no errors, return as-is
        if (!result.errors || Object.keys(result.errors).length === 0) {
            return result;
        }

        // Get only the first error
        const firstErrorKey = Object.keys(result.errors)[0];
        const firstError = result.errors[firstErrorKey];

        console.log(`Single error resolver: showing only ${firstErrorKey}`, firstError);

        // Return result with only the first error
        return {
            ...result,
            errors: {
                [firstErrorKey]: firstError
            }
        };
    };
};

/**
 * USAGE EXAMPLE:
 * 
 * // Instead of:
 * resolver: zodResolver(MySchema)
 * 
 * // Use:
 * resolver: singleErrorResolver(MySchema)
 * 
 * This gives you:
 * ✅ Clean declarative Zod schemas
 * ✅ One error at a time display
 * ✅ Proper focus management
 * ✅ No verbose superRefine code
 */