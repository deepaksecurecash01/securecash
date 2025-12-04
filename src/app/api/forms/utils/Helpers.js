export const getCurrentDate = () =>
{
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

export const getCurrentDateTime = () =>
{
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatCallbackDate = (callbackDate) =>
{
    if (!callbackDate) return 'Not requested';

    try {
        let date;

        if (callbackDate instanceof Date) {
            date = callbackDate;
        } else if (typeof callbackDate === 'string') {
            if (callbackDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                const [day, month, year] = callbackDate.split('/');
                date = new Date(`${month}/${day}/${year}`);
            } else {
                date = new Date(callbackDate);
            }
        } else {
            return 'Not requested';
        }

        if (isNaN(date.getTime())) return 'Not requested';

        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting callback date:', error);
        return 'Not requested';
    }
};

export const formatArrayField = (field) =>
{
    if (field === null || field === undefined) {
        return "Not specified";
    }

    if (Array.isArray(field)) {
        const validItems = field
            .filter(item => item !== null && item !== undefined && item !== '')
            .map(item => typeof item === 'string' ? item.trim() : item)
            .filter(item => item !== '');

        if (validItems.length === 0) {
            return "No schedule - special event.";
        }

        return validItems.join(", ");
    }

    if (typeof field === 'string') {
        const trimmed = field.trim();
        return trimmed || "Not specified";
    }

    return field || "Not specified";
};

export const isValidEmail = (email) =>
{
    if (!email || typeof email !== 'string') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
        return false;
    }

    if (trimmedEmail.length > 254) {
        return false;
    }

    const invalidPatterns = [
        /^\./,
        /\.$/,
        /\.\./,
        /@.*@/,
    ];

    return !invalidPatterns.some(pattern => pattern.test(trimmedEmail));
};

export const sanitizeFilename = (filename) =>
{
    if (!filename || typeof filename !== 'string') {
        return 'unknown_file';
    }

    return filename
        .trim()
        .replace(/[<>:"/\\|?*]/g, '_')
        .replace(/\s+/g, '_')
        .replace(/_{2,}/g, '_')
        .replace(/^_+|_+$/g, '')
        .substring(0, 255);
};