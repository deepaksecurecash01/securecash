// /utils/formHelpers.js
// Device and IP detection utilities

export const getDeviceInfo = () =>
{
    const userAgent = navigator.userAgent;

    // Parse browser and version
    let browserInfo = 'Unknown';
    let browserVersion = '';

    const browserPatterns = [
        { name: 'Chrome', pattern: /Chrome\/([0-9.]+)/ },
        { name: 'Firefox', pattern: /Firefox\/([0-9.]+)/ },
        { name: 'Safari', pattern: /Version\/([0-9.]+).*Safari/ },
        { name: 'Edge', pattern: /Edge\/([0-9.]+)/ }
    ];

    for (const { name, pattern } of browserPatterns) {
        const match = userAgent.match(pattern);
        if (match) {
            browserInfo = name;
            browserVersion = match[1];
            break;
        }
    }

    // Parse OS information
    let osInfo = 'Unknown';
    const osPatterns = [
        { name: 'Windows NT', pattern: /Windows NT ([0-9._]+)/, format: (v) => `Windows NT ${v}` },
        { name: 'Mac OS X', pattern: /Mac OS X ([0-9._]+)/, format: (v) => `Mac OS X ${v.replace(/_/g, '.')}` },
        { name: 'Android', pattern: /Android ([0-9.]+)/, format: (v) => `Android ${v}` },
        { name: 'iOS', pattern: /OS ([0-9._]+)/, format: (v) => `iOS ${v.replace(/_/g, '.')}`, condition: /iPhone|iPad/.test(userAgent) },
        { name: 'Linux', pattern: /Linux/, format: () => 'Linux' }
    ];

    for (const { pattern, format, condition } of osPatterns) {
        if (condition && !condition) continue;
        const match = userAgent.match(pattern);
        if (match) {
            osInfo = format(match[1] || '');
            break;
        }
    }

    return {
        fullUserAgent: userAgent,
        browser: browserInfo,
        browserVersion: browserVersion,
        os: osInfo
    };
};

export const getIPAddress = async () =>
{
    const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://api.ip.sb/jsonip',
    ];

    for (const service of ipServices) {
        try {
            const response = await fetch(service);
            const data = await response.json();
            if (data.ip || data.query) return data.ip || data.query;
        } catch (error) {
            console.log(`IP service ${service} failed:`, error);
        }
    }
    return 'Unable to detect';
};

// Date formatting utilities
export const formatSubmissionDate = () =>
{
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).replace(/(\d+)/, (match) =>
    {
        const day = parseInt(match);
        const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
            day === 2 || day === 22 ? 'nd' :
                day === 3 || day === 23 ? 'rd' : 'th';
        return day + suffix;
    }) + ', ' + now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
};

export const formatDateForAPI = (date) =>
{
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export const formatBirthdayForAPI = (date) =>
{
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Enhanced Focus utility for complex components
export const focusInput = (ref) =>
{
    if (ref && ref.current) {
        try {
            const element = ref.current;

            // First, try to focus the element directly (works for standard inputs)
            if (element.focus && typeof element.focus === 'function') {
                // Check if the element is actually focusable
                if (element.tabIndex >= 0 || element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                    element.focus();
                    return;
                }
            }

            // If direct focus doesn't work, look for focusable children
            // This handles complex components like DatePicker, custom selects, etc.
            const focusableSelectors = [
                'input:not([disabled]):not([readonly])',
                'textarea:not([disabled]):not([readonly])',
                'select:not([disabled])',
                'button:not([disabled])',
                '[tabindex]:not([tabindex="-1"]):not([disabled])'
            ];

            const focusableElements = element.querySelectorAll(focusableSelectors.join(', '));

            if (focusableElements.length > 0) {
                // Focus the first focusable element found
                focusableElements[0].focus();
                return;
            }

            // Last resort: try to make the container focusable and focus it
            if (element.tabIndex === undefined || element.tabIndex < 0) {
                element.tabIndex = -1;
            }
            element.focus();

        } catch (error) {
            console.error('Error focusing field:', error);
        }
    }
};

// Common form data preparation
export const prepareFormMetadata = async (formType, formId) =>
{
    const deviceInfo = getDeviceInfo();
    const ipAddress = await getIPAddress();
    const submissionDate = formatSubmissionDate();

    return {
        formType,
        timestamp: new Date().toISOString(),
        formId,
        submissionId: `${formType}_${Date.now()}`,
        "IP Address": ipAddress,
        "Device": deviceInfo.fullUserAgent,
        "Browser": `${deviceInfo.browser} ${deviceInfo.browserVersion}`,
        "Operating System": deviceInfo.os,
        dateOfSubmission: submissionDate,
    };
};