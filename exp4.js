// app/api/forms/services/templates/quoteAdminRequestEmailTemplate.js

// Helper function to check if a section has valid data
const hasValidData = (obj, requiredFields) =>
{
    return requiredFields.some(field => obj[field] && obj[field] !== 'Not specified' && obj[field].trim() !== '');
};

// Enhanced Banking section with conditional rendering
const generateBankingSection = (formData) =>
{
    // Check if Banking service is selected and has data
    const services = formData.Service || [];
    const hasBankingService = services.includes('Banking');

    if (!hasBankingService) {
        return ''; // Don't show section if Banking not selected
    }

    // Check if any banking fields have actual data
    const bankingFields = ['BankingFrequency', 'BankingAmount', 'BankingBank', 'BankingDays', 'BankingComments'];
    const hasBankingData = hasValidData(formData, bankingFields);

    // If Banking is selected but no data yet, show minimal section
    if (!hasBankingData) {
        return `
            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                <td colspan="2"
                    style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                    <h1 style="font-size:24px;font-weight:bold;">Banking</h1>
                    <p style="color:#888888;font-style:italic;">Banking service selected - details to be provided in next step</p>
                </td>
            </tr>
        `;
    }

    // Show full section with data
    return `
        <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
            <td colspan="2"
                style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                <h1 style="font-size:24px;font-weight:bold;">Banking</h1>
                <table>
                    ${formData.BankingFrequency ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                            <strong>Frequency:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingFrequency}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.BankingAmount ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Amount:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingAmount}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.BankingBank ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Bank:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingBank}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.BankingDays ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Days:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingDays}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.BankingComments ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Comments:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingComments}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                </table>
            </td>
        </tr>
    `;
};

// Enhanced Change section with conditional rendering
const generateChangeSection = (formData) =>
{
    // Check if Change service is selected
    const services = formData.Service || [];
    const hasChangeService = services.includes('Change');

    if (!hasChangeService) {
        return ''; // Don't show section if Change not selected
    }

    // Check if any change fields have actual data
    const changeFields = ['ChangeFrequency', 'ChangeNotesAmount', 'ChangeCoinsAmount', 'ChangeDays', 'ChangeComments'];
    const hasChangeData = hasValidData(formData, changeFields);

    // If Change is selected but no data yet, show minimal section
    if (!hasChangeData) {
        return `
            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                <td colspan="2"
                    style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                    <h1 style="font-size:24px;font-weight:bold;">Change</h1>
                    <p style="color:#888888;font-style:italic;">Change service selected - details to be provided in next step</p>
                </td>
            </tr>
        `;
    }

    // Show full section with data
    return `
        <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
            <td colspan="2"
                style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                <h1 style="font-size:24px;font-weight:bold;">Change</h1>
                <table>
                    ${formData.ChangeFrequency ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                            <strong>Frequency:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeFrequency}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.ChangeNotesAmount ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Avg. Notes Value:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeNotesAmount}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.ChangeCoinsAmount ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Avg. Coins Value:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeCoinsAmount}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.ChangeDays ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Days:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeDays}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                    ${formData.ChangeComments ? `
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Comments:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeComments}</td>
                    </tr>
                    <tr><td colspan="2" style="height:2px;"></td></tr>
                    ` : ''}
                </table>
            </td>
        </tr>
    `;
};

const quoteAdminRequestEmailTemplate = (formData) =>
{
    // Generate conditional sections
    const bankingSection = generateBankingSection(formData);
    const changeSection = generateChangeSection(formData);

    return `
        <!DOCTYPE html
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">

            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>

            <body style="margin:0;padding:0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding:12px;">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="600"
                                style="border-collapse:collapse;">
                                <tr>
                                    <td style="padding:0 0 12px 0;">
                                        <img src="https://service.securecash.com.au/branded/logo.jpg">
                                    </td>
                                    <td valign="middle"
                                        style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                        SecureCash Online Quote
                                    </td>
                                </tr>
                                <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                    <td colspan="2"
                                        style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                        <h1 style="font-size:24px;font-weight:bold;">Quotation Request</h1>
                                        <p>A website visitor submitted the following details for a quote:</p>
                                        <table>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                                                    <strong>Name:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Name || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                    <strong>Organisation:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Organisation || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                    <strong>Phone #:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Phone || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                    <strong>Heard from us:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Referrer || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                    <strong>Email:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Email || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                    <strong>Address:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Address || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                    <strong>Locations:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Locations || 'Not specified'}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            ${(formData.Service && formData.Service.length > 0) ? `
                                            <tr>
                                                <td valign="top"
                                                    style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                    <strong>Services:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${Array.isArray(formData.Service) ? formData.Service.join(', ') : formData.Service}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="height:2px;">
                                            </tr>
                                            ` : ''}
                                        </table>
                                    </td>
                                </tr>
                                ${bankingSection}
                                ${changeSection}
                                <tr>
                                    <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                        <table align="left" border="0" cellpadding="0" cellspacing="0"
                                            style="border-collapse:collapse;">
                                            <tr>
                                                <td width="240"
                                                    style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                    <img src="https://service.securecash.com.au/branded/logo.jpg"
                                                        width="240">
                                                    <span><strong>SecureCash eDocket System</strong></span>
                                                    <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                                </td>
                                                <td
                                                    style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        style="border-collapse:collapse;">
                                                        <tr>
                                                            <td width="30"><img
                                                                    src="https://service.securecash.com.au/branded/email.png"
                                                                    style="margin:4px 0 0 0;"></td>
                                                            <td>customers@securecash.com.au</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="30"><img
                                                                    src="https://service.securecash.com.au/branded/phone.png"
                                                                    style="margin:4px 0 0 0;"></td>
                                                            <td>1300 SECURE</td>
                                                        </tr>
                                                        <tr>
                                                            <td width="30"><img
                                                                    src="https://service.securecash.com.au/branded/website.png"
                                                                    style="margin:4px 0 0 0;"></td>
                                                            <td><a href="https://www.securecash.com.au/" target="_blank"
                                                                    style="color:blue;">securecash.com.au</a></td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                Take 30 seconds to <a
                                                                    href="https://www.securecash.com.au/performance/"
                                                                    target="_blank">rate our performance</a>.
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"
                                        style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                        &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure
                                        Cash.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

        </html>`;
};

export default quoteAdminRequestEmailTemplate;