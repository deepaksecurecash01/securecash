export const RATE_LIMIT_WINDOW = 60 * 1000;
export const RATE_LIMIT_MAX = 10;

export const RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 16000,
    backoffFactor: 4
};

export const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;

export const PDF_FILES_TO_CACHE = [
    "ACCC-Information-Statement.pdf",
    "SecureCash-Franchise-Prospectus.pdf",
    "SecureCash-DL-Flyer.pdf",
    "eDockets-DL-Flyer.pdf",
    "Independant Contractors Agreement - Courier Lab.pdf",
    "SecureCash Deed - Courier Lab.pdf",
    "SecureCash-Online-Services-Flyer.pdf",
    "How-to-Prepare-Your-Banking.pdf",
    "Terms & Conditions.pdf"
];

export const FORM_VALIDATION_RULES = {
    contact: ['FullName', 'Email', 'Department'],
    franchise: ['FullName', 'Email', 'InterestedArea'],
    ica: ['Name', 'Email', 'BusinessName'],
    quote: ['Name', 'Email', 'Organisation'],
    siteinfo: ['BusinessName', 'Email', 'Contact'],
    specialevent: ['BusinessName', 'Email', 'Contact'],
    terms: ['Name', 'Email', 'Organisation Name'],
    austrac: ['Organisation', 'OrganisationEmail'],
    induction: ['Name', 'Email', 'Phone', 'Address', 'State', 'ContractorName', 'EdocketUsername'],
};

export const EMAIL_FIELDS = ['Email', 'OrganisationEmail'];

export const MIME_TYPES = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};