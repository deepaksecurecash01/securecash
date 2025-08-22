import { getCurrentDateTime } from '../utils/Helpers.js';
import { validateAustracForm, sanitizeFormData } from '../utils/validationHelpers.js';
import { prepareAustracEmail, sendEmail } from '../services/emailService.js';

// Handle AUSTRAC form submission business logic
export const handleAustracSubmission = async (formData) =>
{
    try {
        // Sanitize form data
        const sanitizedData = sanitizeFormData(formData);

        // Validate form data
        if (!validateAustracForm(sanitizedData)) {
            throw new Error('Invalid form data');
        }

        // Prepare and send AUSTRAC email
        const austracEmail = prepareAustracEmail(sanitizedData);
        await sendEmail(austracEmail);

        // Log successful submission (exact same logging as original)
        console.log("AUSTRAC form submitted successfully:", {
            organisation: sanitizedData.Organisation,
            abn: sanitizedData.ABN,
            email: sanitizedData.OrganisationEmail,
            submissionDate: getCurrentDateTime(),
            timestamp: new Date().toISOString()
        });

        // Return success response data
        return {
            success: true,
            message: "AUSTRAC information submitted and emails sent successfully!",
            timestamp: new Date().toISOString(),
            submissionDate: getCurrentDateTime()
        };

    } catch (error) {
        console.error("AUSTRAC form submission error:", error);
        throw error;
    }
};