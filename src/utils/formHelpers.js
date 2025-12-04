export const getDeviceInfo = () =>
{
    const userAgent = navigator.userAgent;

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
            console.error(`IP service ${service} failed:`, error);
        }
    }
    return 'Unable to detect';
};

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