import { formatArrayField, formatCallbackDate, getCurrentDateTime } from "../utils/Helpers.js";
import { getMimeType, processAttachment } from "../utils/attachments.js";
import austracSubmissionEmailTemplate from "../templates/austracSubmissionEmailTemplate.js";
import contactAdminNotificationEmailTemplate from "../templates/contactAdminNotificationEmailTemplate.js";
import contactUserConfirmationEmailTemplate from "../templates/contactUserConfirmationEmailTemplate.js";
import franchiseAdminInquiryEmailTemplate from "../templates/franchiseAdminInquiryEmailTemplate.js";
import franchiseUserWelcomeEmailTemplate from "../templates/franchiseUserWelcomeEmailTemplate.js";
import icaContractorWelcomeEmailTemplate from "../templates/icaContractorWelcomeEmailTemplate.js";
import icaEdocketsIntroductionEmailTemplate from "../templates/icaEdocketsIntroductionEmailTemplate.js";
import icaOperationsReviewEmailTemplate from "../templates/icaOperationsReviewEmailTemplate.js";
import quoteAdminRequestEmailTemplate from "../templates/quoteAdminRequestEmailTemplate.js";
import quoteUserConfirmationEmailTemplate from "../templates/quoteUserConfirmationEmailTemplate.js";
import siteInfoAdminNotificationEmailTemplate from "../templates/siteInfoAdminNotificationEmailTemplate.js";
import siteInfoUserConfirmationEmailTemplate from "../templates/siteInfoUserConfirmationEmailTemplate.js";
import termsAgreementEmailTemplate from "../templates/termsAgreementEmailTemplate.js";
import inductionEmailTemplate from "../templates/inductionEmailTemplate.js";

const preparePdfAttachmentsWithCache = ({ attachments, attachmentConfigs, readPdfFile }) =>
{
    for (const config of attachmentConfigs) {
        const pdfContent = readPdfFile(config.filename);
        if (pdfContent) {
            attachments.push({
                content: pdfContent,
                filename: config.displayName,
                type: "application/pdf",
                disposition: "attachment",
            });
        }
    }

    return attachments;
};

const prepareAttachments = (formData) =>
{
    const attachments = [];

    if (!formData || typeof formData !== 'object') {
        return attachments;
    }

    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment, index) =>
        {
            try {
                if (attachment && typeof attachment === 'object' && attachment.filename && attachment.content) {
                    const sizeBytes = Buffer.byteLength(attachment.content, 'base64');
                    if (sizeBytes > 5 * 1024 * 1024) {
                        return;
                    }

                    const detectedMimeType = getMimeType(attachment.filename);
                    const finalMimeType = attachment.type || detectedMimeType;

                    attachments.push({
                        content: attachment.content,
                        filename: attachment.filename,
                        type: finalMimeType,
                        disposition: "attachment",
                    });
                }
            } catch (error) {
                console.error(`Error processing attachment ${index}:`, error);
            }
        });
    }

    return attachments;
};

export const prepareAustracSubmissionEmail = (formData, readPdfFile) =>
{
    const currentDateTime = getCurrentDateTime();
    const htmlContent = austracSubmissionEmailTemplate(formData, currentDateTime);

    return {
        to: formData?.OrganisationEmail,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `AUSTRAC - ${formData?.Organisation || 'Unknown Organisation'}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareContactAdminNotificationEmail = (formData, readPdfFile) =>
{
    const currentDateTime = getCurrentDateTime();
    const formattedCallbackDate = formatCallbackDate(formData.CallbackDate);
    const htmlContent = contactAdminNotificationEmailTemplate(formData, currentDateTime, formattedCallbackDate);

    return {
        to: formData.Email,
        from: "SecureCash Customer Service <customers@securecash.com.au>",
        replyTo: formData.Email,
        subject: "SecureCash - Contact Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareContactUserConfirmationEmail = (formData, readPdfFile) =>
{
    const htmlContent = contactUserConfirmationEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "SecureCash Customer Service <customers@securecash.com.au>",
        subject: "SecureCash - Contact Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareFranchiseAdminInquiryEmail = (formData, readPdfFile) =>
{
    const htmlContent = franchiseAdminInquiryEmailTemplate(formData);

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        replyTo: formData.Email,
        subject: `SecureCash - Franchise Expression of Interest - ${formData.FullName || 'Unknown'}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareFranchiseUserWelcomeEmail = (formData, readPdfFile) =>
{
    const attachments = [];

    const attachmentConfigs = [
        {
            filename: "ACCC-Information-Statement.pdf",
            displayName: "ACCC - 2023 Information Statement for Prospective Franchisees.pdf",
        },
        {
            filename: "SecureCash-Franchise-Prospectus.pdf",
            displayName: "SecureCash Franchise Prospectus.pdf",
        },
        {
            filename: "SecureCash-DL-Flyer.pdf",
            displayName: "SecureCash Flyer.pdf",
        },
        {
            filename: "eDockets-DL-Flyer.pdf",
            displayName: "eDockets Flyer.pdf",
        },
    ];

    const pdfAttachments = preparePdfAttachmentsWithCache({ attachments, attachmentConfigs, readPdfFile });
    const htmlContent = franchiseUserWelcomeEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        subject: "SecureCash Franchise Enquiry",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: pdfAttachments
    };
};

export const prepareICAOperationsReviewEmail = (formData, readPdfFile, processAttachmentsSequentially) =>
{
    const attachmentMappings = [
        { field: "GovernmentID", filename: "Guarantors Government ID" },
        { field: "WitnessID", filename: "Witness ID" },
        { field: "SecurityLicense", filename: "Security or Masters License" },
        { field: "CITInsurance", filename: "CIT Insurance" },
    ];

    let attachments = [];
    if (processAttachmentsSequentially) {
        attachments = processAttachmentsSequentially(attachmentMappings, formData);
    } else {
        attachmentMappings.forEach((mapping) =>
        {
            if (formData[mapping.field]) {
                const mimeType = getMimeType(mapping.filename);
                const processedAttachment = processAttachment(
                    formData[mapping.field],
                    mapping.filename,
                    mimeType
                );
                if (processedAttachment) {
                    attachments.push(processedAttachment);
                }
            }
        });
    }

    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment, index) =>
        {
            if (attachment && attachment.data && attachment.filename) {
                const mimeType = getMimeType(attachment.filename);
                const processedAttachment = processAttachment(
                    attachment.data,
                    attachment.filename,
                    mimeType
                );
                if (processedAttachment) {
                    attachments.push(processedAttachment);
                }
            }
        });
    }

    const attachmentConfigs = [
        {
            filename: "Independant Contractors Agreement - Courier Lab.pdf",
            displayName: "Independant Contractors Agreement - Courier Lab.pdf",
        },
        {
            filename: "SecureCash Deed - Courier Lab.pdf",
            displayName: "SecureCash Deed - Courier Lab.pdf",
        },
    ];

    const pdfAttachments = preparePdfAttachmentsWithCache({ attachments, attachmentConfigs, readPdfFile });
    const htmlContent = icaOperationsReviewEmailTemplate(formData);

    return {
        to: "deepak@securecash.com.au",
        from: "operations@securecash.com.au",
        replyTo: formData.Email || "operations@securecash.com.au",
        subject: `Independent Contractor Agreement - ${formData.Name || ""}, ${formData.BusinessName || ""}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: pdfAttachments,
    };
};

export const prepareICAContractorWelcomeEmail = (formData, readPdfFile) =>
{
    const attachments = [];

    const attachmentConfigs = [
        {
            filename: "Independant Contractors Agreement - Courier Lab.pdf",
            displayName: "Independant Contractors Agreement - Courier Lab.pdf",
        },
        {
            filename: "SecureCash Deed - Courier Lab.pdf",
            displayName: "SecureCash Deed - Courier Lab.pdf",
        },
    ];

    const pdfAttachments = preparePdfAttachmentsWithCache({ attachments, attachmentConfigs, readPdfFile });
    const htmlContent = icaContractorWelcomeEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "operations@securecash.com.au",
        subject: `Independent Contractor Agreement - ${formData.Name || formData.CompanyName || "Unknown"}, ${formData.BusinessName || formData.CompanyName || "Unknown Business"}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: pdfAttachments,
    };
};

export const prepareICAEdocketsIntroductionEmail = (formData, readPdfFile) =>
{
    const htmlContent = icaEdocketsIntroductionEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "info@edockets.app",
        subject: `eDocket App - ${formData.Name || "Name"}, ${formData.BusinessName || "Business"}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
    };
};

export const prepareQuoteAdminRequestEmail = (formData, readPdfFile) =>
{
    const htmlTemplate = quoteAdminRequestEmailTemplate(formData);

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Sales <sales@securecash.com.au>",
        subject: `SecureCash - Quotation Request (${formData.Organisation || "Unknown Organisation"})`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlTemplate,
    };
};

export const prepareQuoteUserConfirmationEmail = (formData, readPdfFile) =>
{
    const attachments = prepareAttachments(formData);
    const htmlTemplate = quoteUserConfirmationEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "SecureCash Sales <sales@securecash.com.au>",
        subject: "SecureCash - Quotation Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlTemplate,
        attachments: attachments.length > 0 ? attachments : undefined,
    };
};

export const prepareSiteInfoAdminNotificationEmail = (formData, readPdfFile) =>
{
    const currentDateTime = getCurrentDateTime();
    const htmlContent = siteInfoAdminNotificationEmailTemplate(formData, currentDateTime, formatArrayField);

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `Site Info - ${formData.BusinessName} (${formData.Postcode}), ${formData.Type || "Regular Service"}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareSiteInfoUserConfirmationEmail = (formData, readPdfFile) =>
{
    const attachments = [];

    const attachmentConfigs = [
        {
            filename: "SecureCash-Online-Services-Flyer.pdf",
            displayName: "SecureCash Online Services Flyer.pdf",
        },
        {
            filename: "How-to-Prepare-Your-Banking.pdf",
            displayName: "How to Prepare Your Banking.pdf",
        },
    ];

    const pdfAttachments = preparePdfAttachmentsWithCache({ attachments, attachmentConfigs, readPdfFile });
    const htmlContent = siteInfoUserConfirmationEmailTemplate(formData);

    return {
        to: formData.Email,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `SecureCash Business Enrolment - ${formData.BusinessName} (${formData.Type || "Regular Service"})`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: pdfAttachments,
    };
};

export const prepareTermsAgreementEmail = (formData, readPdfFile) =>
{
    const pdfFilename = "Terms & Conditions.pdf";
    const pdfContent = readPdfFile(pdfFilename);
    const agreementCommencementDate = getCurrentDateTime();

    const attachments = [];
    if (pdfContent) {
        attachments.push({
            filename: "Terms & Conditions.pdf",
            type: "application/pdf",
            disposition: "attachment",
            content_id: "terms_conditions",
            content: pdfContent
        });
    }

    const htmlContent = termsAgreementEmailTemplate(formData, agreementCommencementDate);

    return {
        to: formData.Email,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `Terms & Conditions - ${formData["Full Name"]}, ${formData["Organisation Name"]}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: attachments
    };
};


export const prepareInductionEmail = (formData, readPdfFile) =>
{
    const currentDateTime = getCurrentDateTime();
    const htmlContent = inductionEmailTemplate(formData, currentDateTime);

    // Process attachments (photo + license)
    const attachments = prepareAttachments(formData);

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Operations <operations@securecash.com.au>",
        replyTo: formData.Email,
        subject: `Induction Complete - ${formData.Name}, ${formData.State}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: attachments.length > 0 ? attachments : undefined
    };
};