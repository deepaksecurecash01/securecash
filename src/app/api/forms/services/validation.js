import { FORM_VALIDATION_RULES, EMAIL_FIELDS, MAX_ATTACHMENT_SIZE } from "../config/constants.js";

export const validateFormData = (formType, formData) =>
{
    const errors = [];

    const requiredFields = FORM_VALIDATION_RULES[formType.toLowerCase()] || [];

    requiredFields.forEach(field =>
    {
        const value = formData[field];
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    EMAIL_FIELDS.forEach(field =>
    {
        const email = formData[field];
        if (email && typeof email === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                errors.push(`Invalid email format: ${field}`);
            }
        }
    });

    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment, index) =>
        {
            if (attachment.content) {
                const size = Buffer.byteLength(attachment.content, 'base64');
                if (size > MAX_ATTACHMENT_SIZE) {
                    errors.push(`Attachment ${index + 1} exceeds 5MB limit`);
                }
            }
        });
    }

    return errors;
};