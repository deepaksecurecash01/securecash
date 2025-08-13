import { formatArrayField, formatCallbackDate, getCurrentDateTime, getMimeType, prepareAttachments, preparePdfAttachments, processAttachment, readPdfFile } from "../utils/Helpers.js";

export const prepareAUSTRACEmail = (formData) =>
{
    const currentDateTime = getCurrentDateTime();

    let htmlContent = `
    <!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

        <head>
            <meta http-equiv="Content-Type"
                content="text/html; charset=UTF-8" />
            <meta name="viewport"
                content="width=device-width, initial-scale=1.0" />
        </head>

        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0"
                width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0"
                            cellpadding="0" cellspacing="0"
                            width="600"
                            style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img
                                        src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle"
                                    style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    AUSTRAC
                                </td>
                            </tr>
                            <tr
                                style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2"
                                    style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1
                                        style="font-size:24px;font-weight:bold;">
                                        AUSTRAC Information</h1>
                                    <p>Thank you for telling us
                                        a bit more about your
                                        organisation!</p>
                                    <p>The following details
                                        were submitted through
                                        our AUSTRAC form:</p>
                                    <table>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                                                <strong>Organisation:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.Organisation || ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                <strong>ABN:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.ABN || ''}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                                                <strong>Main
                                                    Website:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.Website || ''}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Main
                                                    Email:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.OrganisationEmail || ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Organisation
                                                    Type:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.OrganisationType || ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Address:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.Address || ''}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>State:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.State || ''}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Personnel:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.Personnel || ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>IP
                                                    Address:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                            ${formData["IP Address"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Device:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                            ${formData.Device}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px">
                                                <strong>Date of
                                                    Submission:</strong>
                                            </td>
                                            <td
                                                style="padding:5px 9px 5px 9px;">
                                                ${formData.dateOfSubmission || currentDateTime}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"
                                                style="height:2px;">
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240"
                                                style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/logo.jpg"
                                                    width="240">
                                                <span><strong>SecureCash
                                                        eDocket
                                                        System</strong></span>
                                                <br /><span><em>"We
                                                        Pickup
                                                        &amp;
                                                        Bank
                                                        Your
                                                        Money!"</em></span>
                                            </td>
                                            <td
                                                style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table
                                                    align="left"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="border-collapse:collapse;">
                                                    <tr>
                                                        <td
                                                            width="30">
                                                            <img src="https://service.securecash.com.au/branded/email.png"
                                                                style="margin:4px 0 0 0;">
                                                        </td>
                                                        <td>customers@securecash.com.au
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="30">
                                                            <img src="https://service.securecash.com.au/branded/phone.png"
                                                                style="margin:4px 0 0 0;">
                                                        </td>
                                                        <td>1300
                                                            SECURE
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            width="30">
                                                            <img src="https://service.securecash.com.au/branded/website.png"
                                                                style="margin:4px 0 0 0;">
                                                        </td>
                                                        <td><a href="https://www.securecash.com.au/"
                                                                target="_blank"
                                                                style="color:blue;">securecash.com.au</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colspan="2">
                                                            Take
                                                            30
                                                            seconds
                                                            to
                                                            <a href="https://www.securecash.com.au/performance/"
                                                                target="_blank">rate
                                                                our
                                                                performance</a>.
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
                                    &copy; 2005 Sky Wallet Pty
                                    Ltd ABN 39 668 299 027
                                    Trading (Under License) as
                                    Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>

    </html>
  `;

    return {
        to: formData.OrganisationEmail,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `AUSTRAC - ${formData.Organisation || 'Unknown Organisation'}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareContactAdminEmail = (formData) =>
{
    const currentDateTime = getCurrentDateTime();
    const formattedCallbackDate = formatCallbackDate(formData.CallbackDate);

    let htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    SecureCash Contact Request
                                </td>
                            </tr>
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;">Contact Request</h1>
                                    <p>A website visitor submitted the following details through the contact form:</p>
                                    <table>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Sent To:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Department}@securecash.com.au</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Name:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.FullName || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Organisation:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Organisation || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Phone #:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Phone || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Email:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Email || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px"><strong>Message:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Message || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px"><strong>IP Address:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData["IP Address"] || 'Not available'}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px"><strong>Device:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Device || 'Not available'}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px"><strong>Date of Submission:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.dateOfSubmission || currentDateTime}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                    </table>
                                </td>
                            </tr>
                            ${formData.ChkCallBack === 'Yes, please.' ? `
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;">Callback</h1>
                                    <table>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Date:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formattedCallbackDate}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Time:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.CallbackTime || 'Not specified'}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>State:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.CallbackState || 'Not specified'}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                    </table>
                                </td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/logo.jpg" width="240">
                                                <span><strong>SecureCash eDocket System</strong></span>
                                                <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                            </td>
                                            <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                        <td>customers@securecash.com.au</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                        <td>1300 SECURE</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                        <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
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
                                <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                    &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `;

    return {
        to: formData.Email,
        from: "SecureCash Customer Service <customers@securecash.com.au>",
        replyTo: formData.Email,
        subject: "SecureCash - Contact Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

export const prepareContactConfirmationEmail = (formData) =>
{
    let htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    SecureCash Contact Request
                                </td>
                            </tr>
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <p>Hi,</p>
                                    <p>Thank you for contacting SecureCash!</p>
                                    <p>Your email has been received, and we will be in touch with you shortly.</p>
                                    <p>If we can be of any assistance in the meantime, then please do not hesitate to call us on <a href="tel:1300732873">1300 SECURE</a> (1300732873), or simply reply to this email.</p>
                                    <p>Kind regards,</p>
                                    <p>
                                        <strong>
                                            The SecureCash Customer Service Team
                                        </strong>
                                    </p>
                                    <p>
                                        Email: <a href="mailto:customers@securecash.com.au">customers@securecash.com.au</a><br>
                                        Phone: <a href="tel:1300732873">1300 SECURE</a>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/logo.jpg" width="240">
                                                <span><strong>SecureCash eDocket System</strong></span>
                                                <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                            </td>
                                            <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                        <td>customers@securecash.com.au</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                        <td>1300 SECURE</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                        <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
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
                                <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                    &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `;

    return {
        to: formData.Email,
        from: "SecureCash Customer Service <customers@securecash.com.au>",
        subject: "SecureCash - Contact Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

// Helper function to prepare the admin franchise email
export const prepareFranchiseAdminEmail = (formData) =>
{
    const currentDateTime = getCurrentDateTime();

    const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    SecureCash Franchise Expression of Interest
                                </td>
                            </tr> 
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;">Franchise Expression of Interest</h1>
                                    <p>A website visitor submitted the following details through the <strong>Franchise Expression of Interest form</strong>:</p>
                                    <table>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Sent To:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.FullName || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Phone #:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Phone || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Email:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Email || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Postal Address:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.Address || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Territory:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.InterestedArea || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                        <tr>
                                            <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px"><strong>Message:</strong></td>
                                            <td style="padding:5px 9px 5px 9px;">${formData.ReasonForInterest || ''}</td>
                                        </tr>
                                        <tr><td colspan="2" style="height:2px;"></tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/logo.jpg" width="240">
                                                <span><strong>SecureCash eDocket System</strong></span>
                                                <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                            </td>
                                            <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                        <td>franchise@securecash.com.au</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                        <td>1300 SECURE</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                        <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
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
                                <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                    &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        replyTo: formData.Email,
        subject: `SecureCash - Franchise Expression of Interest - ${formData.FullName || 'Unknown'}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent
    };
};

// Helper function to prepare the customer confirmation email
export const prepareFranchiseConfirmationEmail = (formData) =>
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
    const pdfAttachments = preparePdfAttachments({attachments, attachmentConfigs });

    const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding:12px;">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                        <tr>
                            <td style="padding:0 0 12px 0;">
                                <img src="https://service.securecash.com.au/branded/logo.jpg">
                            </td>
                            <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                SecureCash Franchise Enquiry
                            </td>
                        </tr>
                        <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                            <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                <p>Hi,</p>
                                <p>Thank you for enquiring about a SecureCash Franchise!</p>
                                <p>Your email has been received, and we will be in touch with you shortly.</p>
                                <p>Below is attached some reading material for you to go through in the meantime, this includes the ACCC Information Statement which needs to be understood before proceeding.</p>
                                <p>If we can be of any assistance in the meantime, then please do not hesitate to call us on <a href="tel:1300732873">1300 SECURE</a> (1300 732 873), or simply reply to this email.</p>
                                <p>Kind regards,</p>
                                <p>
                                    <strong>
                                        The SecureCash Franchise Team
                                    </strong>
                                </p>
                                <p>
                                    Email: <a href="mailto:franchise@securecash.com.au">franchise@securecash.com.au</a><br>
                                    Phone: <a href="tel:1300732873">1300 SECURE</a>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                    <tr>
                                        <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                            <img src="https://service.securecash.com.au/branded/logo.jpg" width="240">
                                            <span><strong>SecureCash eDocket System</strong></span>
                                            <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                        </td>
                                        <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                <tr>
                                                    <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                    <td>franchise@securecash.com.au</td>
                                                </tr>
                                                <tr>
                                                    <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                    <td>1300 SECURE</td>
                                                </tr>
                                                <tr>
                                                    <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                    <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        </body>
    </html>`;

    return {
        to: formData.Email,
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        subject: "SecureCash Franchise Enquiry",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlContent,
        attachments: pdfAttachments
    };
};

// Email Template 1: Operations Team Email (Updated to match original template exactly)
export const prepareOperationsEmail = (formData) => {

  // Process attachments - including all attachment types from original template
  const attachments = [];

  // Add individual attachments with proper naming (matching original template exactly)
  const attachmentMappings = [
    { field: "GovernmentID", filename: "Guarantors Government ID" },
    { field: "WitnessID", filename: "Witness ID" },
    { field: "SecurityLicense", filename: "Security or Masters License" },
    { field: "CITInsurance", filename: "CIT Insurance" },
  ];

  // Process individual attachments
  attachmentMappings.forEach((mapping) => {
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

  // Add courier attachments if they exist (keeping existing logic)
  if (formData.attachments && Array.isArray(formData.attachments)) {
    formData.attachments.forEach((attachment, index) => {
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
      const pdfAttachments = preparePdfAttachments({attachments, attachmentConfigs });

  // HTML content matching the original template exactly
  const htmlContent = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <!-- {Reference} -->
                                </td>
                            </tr>
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;">Independent Contractors Agreement</h1>
                                    <p>The following details were submitted through the ICA form:</p>


                                    
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">The Agreement</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Full Name:</strong></td><td>${
                      formData.Name || ""
                    }</td></tr>
                                        <tr><td><strong>Org. Structure:</strong></td><td>${
                      formData.OrganisationType || ""
                    }</td></tr>
                                        <tr><td><strong>ABN:</strong></td><td>${formData.ABN || ""}</td></tr>
                                        <tr><td><strong>Phone:</strong></td><td>${formData.Phone || ""}</td></tr>
                                        <tr><td><strong>Email:</strong></td><td>${formData.Email || ""}</td></tr>
                                        <tr><td><strong>Physical Address:</strong></td><td>${
                      formData.Address || ""
                    }</td></tr>
                                        <tr><td><strong>Postal Address:</strong></td><td>${
                      formData.AddressPostal || ""
                    }</td></tr>
                                        <tr><td><strong>Commencement:</strong></td><td>${
                      formData.DateCommencement || ""
                    }</td></tr>
                                    </table>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">The Deed</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Date of Deed:</strong></td><td>${
                      formData.DateDeed || ""
                    }</td></tr>
                                        <tr><td><strong>Guarantor's Name:</strong></td><td>${
                      formData.Name || ""
                    }</td></tr>
                                        <tr><td><strong>Residential Address:</strong></td><td>${
                      formData.AddressResidential || ""
                    }</td></tr>
                                        <tr><td><strong>Business Name:</strong></td><td>${
                      formData.BusinessName || ""
                    }</td></tr>
                                        <tr><td colspan="2" style="padding-top:8px;">* The Guarantor's government photo ID is attached to this email.</td></tr>
                                    </table>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">The Witness</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Witness's Name:</strong></td><td>${
                      formData.WitnessName || ""
                    }</td></tr>
                                        <tr><td><strong>Witness's Address:</strong></td><td>${
                      formData.WitnessAddress || ""
                    }</td></tr>
                                        <tr><td colspan="2" style="padding-top:8px;">* The Witness's government photo ID is attached to this email.</td></tr>
                                    </table>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">Licensing and Insurance</h3>
                                    <p style="margin-left:8px;">The Security or Masters License and CIT insurance are attached to this email.</p>
                                    

                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">eDockets Contractor Code</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Code:</strong></td><td>${
    formData.eDocketsContractorCode || ""
    }</td></tr>
                                    
                                    </table>



                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/edockets.jpg" width="240">
                                                <span><strong>SecureCash eDocket System</strong></span>
                                                <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                            </td>
                                            <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                        <td>customers@securecash.com.au</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                        <td>1300 SECURE</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                        <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                    &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;

  // Return email configuration matching original template exactly
  return {
    to: "deepak@securecash.com.au", // Keeping as per your instruction
    bcc: "dylan@securecash.com.au", // Added BCC from original template
    from: "operations@securecash.com.au",
    replyTo: formData.Email || "operations@securecash.com.au",
    subject: `Independent Contractor Agreement - ${formData.Name || ""}, ${
      formData.BusinessName || ""
    }`, // Matching original format exactly
    text: "Please enable HTML emails in your email client to view the contents of this email.",
    html: htmlContent,
    attachments: pdfAttachments,
  };
};

// Email Template 2: Customer Confirmation Email (Updated to match original template)
export const prepareCustomerEmail = (formData) => {

  // Add static PDF attachments
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
    const pdfAttachments = preparePdfAttachments({ attachments, attachmentConfigs });

  const htmlContent = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/logo.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <!-- {Reference} -->
                                </td>
                            </tr>
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;line-height:150%;">Welcome, and thank you for joining our network!</h1>
                                    <p><stong>Please note the following important information;</strong></p>

                                
                                    
                                    <h3>Invoices</h3>
                                    <ul>
                                        <li>Please send at the end of the month, NO weekly accounts,</li>
                                        <li>All invoices are to be made out to Office Central Pty Ltd ACN 668 461 050,</li>
                                        <li>All invoices must be emailed to; <a href="mailto:accounts@securecash.com.au">accounts@securecash.com.au</a>,</li>
                                        <li>Please make sure you itemise the services for the month so the client can be billed correctly.</li>
                                    </ul>
                                    
                                    <h3>Keys</h3>
                                    <p>Unless we have issued you with a key/s, <strong style="text-decoration:underline;">DO NOT</strong> accept any further keys from the clients.</p>
                                    <p>Contact us immediately if a client requests you to keep a key in order to provide their services.</p>
                                    
                                    <h3>Change Orders</h3>
                                    <p>All clients are contracted to order their change from SecureCash only via the SecureCash <a href="https://service.securecash.com.au/">online services website</a> or by telephoning SecureCash direct on 1300 732 873.</p>
                                    <p>These change orders will be forwarded to you via email in real time as lodged by the clients.</p>
                                    <p>Do not accept any change orders from clients that have not been ordered through SecureCash prior to your couriers arrival as you will not be paid for any orders that did not come through either method above.</p>
                                    
                                    <h3>Collection Days</h3>
                                    <p>If one of the clients wants to change collection days, then they must do so by using the SecureCash <a href="https://service.securecash.com.au/">online services website</a> or by telephoning SecureCash direct on 1300 732 873.</p>
                                    <p>Contact will be made to your business to confirm if the change of day/s requested are available prior to confirming with the client.</p>
                                    
                                    <h3>Your Contact</h3>
                                    <p>Your direct contact with Office Central Pty Ltd will be Drex Aradilla.</p>
                                    <p>Our Operations Department can be contacted on 1300 SECURE, their email address is: <a href="mailto:operations@securecash.com.au">operations@securecash.com.au</a></p>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">Independent Contractors Agreement</h3>
                                    <p>Please see below for a brief summary of the information you submitted. The agreement and the deed are attached to this email as PDF copies.</p>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Full Name:</strong></td><td>${
                      formData.Name || formData.CompanyName || ""
                    }</td></tr>
                                        <tr><td><strong>Org. Structure:</strong></td><td>${
                      formData.OrganisationType || ""
                    }</td></tr>
                                        <tr><td><strong>ABN:</strong></td><td>${formData.ABN || ""}</td></tr>
                                        <tr><td><strong>Phone:</strong></td><td>${formData.Phone || ""}</td></tr>
                                        <tr><td><strong>Email:</strong></td><td>${formData.Email || ""}</td></tr>
                                        <tr><td><strong>Physical Address:</strong></td><td>${
                      formData.Address || ""
                    }</td></tr>
                                        <tr><td><strong>Postal Address:</strong></td><td>${
                      formData.AddressPostal || ""
                    }</td></tr>
                                        <tr><td><strong>Commencement:</strong></td><td>${
                      formData.DateCommencement || ""
                    }</td></tr>
                                    </table>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">Schedule of The Deed</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Date of Deed:</strong></td><td>${
                      formData.DateDeed || ""
                    }</td></tr>
                                        <tr><td><strong>Beneficiary:</strong></td><td>Office Central Pty Ltd ACN 668 461 050 of 30 Church Hill Road, Old Noarlunga, SA</td></tr>
                                        <tr><td><strong>Contractor:</strong></td><td>${
                      formData.BusinessName || formData.CompanyName || ""
                    }</td></tr>
                                        <tr><td><strong>Guarantor:</strong></td><td>${
                      formData.Name || formData.CompanyName || ""
                    } of ${formData.AddressResidential || ""}</td></tr>
                                        <tr>
                                            <td colspan="2">
                                                <p>Executed as a deed.</p>
                                                <p><strong>SIGNED, SEALED and DELIVERED</strong></p>
                                                <p>By ${
                          formData.BusinessName || formData.CompanyName || ""
                        } in accordance with its Constitution (if any) as a deed pursuant to section 127 of the Corporations Act.</p>
                                            </td>
                                        </tr>
                                        <tr><td><strong>Name:</strong></td><td>${
                      formData.Name || formData.CompanyName || ""
                    }</td></tr>
                                        <tr><td><strong>Residential Address:</strong></td><td>${
                      formData.AddressResidential || ""
                    }</td></tr>
                                        <tr><td><strong>Witnessed by:</strong></td><td>${
                      formData.WitnessName || ""
                    }</td></tr>
                                        <tr><td><strong>Witness Address:</strong></td><td>${
                      formData.WitnessAddress || ""
                    }</td></tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                        <tr>
                                            <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <img src="https://service.securecash.com.au/branded/edockets.jpg" width="240">
                                                <span><strong>SecureCash eDocket System</strong></span>
                                                <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                            </td>
                                            <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;"></td>
                                                        <td>customers@securecash.com.au</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;"></td>
                                                        <td>1300 SECURE</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;"></td>
                                                        <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">
                                                            Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
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
                                <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                    &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;

  return {
    to: formData.Email,
    from: "operations@securecash.com.au",
    subject: `Independent Contractor Agreement - ${
      formData.Name || formData.CompanyName || "Unknown"
    }, ${formData.BusinessName || formData.CompanyName || "Unknown Business"}`,
    text: "Please enable HTML emails in your email client to view the contents of this email.",
    html: htmlContent,
    attachments: pdfAttachments,
  };
};

// Email Template 3: Internal Notification Email (keeping as is since no original template provided)
export const prepareInternalNotificationEmail = (formData) => {

  const htmlContent = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding:12px;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                            <tr>
                                <td style="padding:0 0 12px 0;">
                                    <img src="https://service.securecash.com.au/branded/edockets.jpg">
                                </td>
                                <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <!-- {Reference} -->
                                    Say no to unnecessary paperwork!
                                </td>
                            </tr>
                            <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <h1 style="font-size:24px;font-weight:bold;line-height:150%;">Thank you for becoming part of the SecureCash network!</h1>
                                    <p>We have created an electronic docket application called eDockets and it's available for your business to use!</p>
                                    <p>We wanted to make our processes easier for both our customers and contractors while keeping things relevant and simple!</p>
                                    <p>SecureCash are a licensed reseller for our application and they want you to receive the same benefits they have from operating with this system.</p>
                                    <p>The process is simple, you turn up to the customers business, scan a couple of barcodes, get a signature and you're out. An email will be generated for record keeping and sent straight to both parties. When depositing the banking all you need to do is select the customers banking on the app and submit the docket. Again an email is generated and sent to both parties.</p>
                                    <p>That's the basics, but of course there is a tonne more features and even more to come. It's an application which will be constantly in development and regularly maintained. We are always looking for ways to improve and feedback is always welcome.</p>
                                    <p>It can also be linked to an online portal which can store all records, be modified to each user and gives the customer the ability to tailor their services. They can book collections, cancel collections and even order change, notifying you of everything and making the whole process easier for both parties.</p>
                                    <p>We'd love to show more or set up a demo for you, just let us know by replying to this email.</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center" style="border:1px solid #dddddd;border-width:0 0 1px 0;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                    <p style="line-height:32px;"><strong style="color:darkgreen;font-size:20px;">Customer Support Team</strong><br><strong>Scan. Send. Stored. Simple &amp; Secure.</strong></p>
                                    <p><img src="https://service.securecash.com.au/branded/edockets.jpg" width="320"></p>
                                    <p style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">© 2021 Digital Dockets Pty Ltd Trading under license as 'eDockets'.<br>We care about the environment and want to see a sustainable Australia in the future.</p>
                                    <a href="mailto:info@edockets.app"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:0 6px -4px 0;padding:0 6px 0 0;position:relative;">info@edockets.app</a><a href="http://edockets.app"><img src="https://service.securecash.com.au/branded/website.png" style="margin:0 6px -4px 20px;padding:0 6px 0 20px;position:relative;">www.eDockets.app</a>
                                    <p style="font-size:13px;line-height:140%;padding-top:8px;">This message has been sent as a part of a discussion between the eDockets Customer Support Team and the addressee whose name is specified above. Should you receive this message by mistake, we would be most grateful if you informed us that the message has been sent to you. In this case, we also ask that you delete this message from your mailbox, and do not forward it or any part of it to anyone else. Thank you for your cooperation and understanding.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;

  return {
    to: formData.Email, // Keep as specified - don't change
    from: "info@edockets.app",
    subject: `eDocket App - ${formData.Name || "Name"}, ${
      formData.BusinessName || "Business"
    }`, // Fixed to match original format exactly
    text: "Please enable HTML emails in your email client to view the contents of this email.",
    html: htmlContent,
  };
};
// Helper function to generate Banking section HTML
const generateBankingSection = (formData) =>
{
    return `
        <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
            <td colspan="2"
                style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                <h1 style="font-size:24px;font-weight:bold;">Banking</h1>
                <table>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                            <strong>Frequency:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingFrequency || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Amount:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingAmount || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Bank:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingBank || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Days:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingDays || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Comments:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.BankingComments || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                </table>
            </td>
        </tr>
    `;
};

// Helper function to generate Change section HTML
const generateChangeSection = (formData) =>
{
    return `
        <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
            <td colspan="2"
                style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                <h1 style="font-size:24px;font-weight:bold;">Change</h1>
                <table>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                            <strong>Frequency:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeFrequency || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Avg. Notes Value:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeNotesAmount || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Avg. Coins Value:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeCoinsAmount || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Days:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeDays || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                    <tr>
                        <td valign="top"
                            style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Comments:</strong></td>
                        <td style="padding:5px 9px 5px 9px;">${formData.ChangeComments || 'Not specified'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="height:2px;">
                    </tr>
                </table>
            </td>
        </tr>
    `;
};

// Prepare Quote admin notification email
export const prepareQuoteAdminEmail = (formData) =>
{
    const currentDateTime = getCurrentDateTime();

    // Check which services are included
    const services = formData.Service || [];

    const includeBanking = services.includes('Banking');
    const includeChange = services.includes('Change');

    // Generate conditional sections
    const bankingSection = includeBanking ? generateBankingSection(formData) : '';
    const changeSection = includeChange ? generateChangeSection(formData) : '';

    const htmlTemplate = `
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

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Sales <sales@securecash.com.au>",
        subject: `SecureCash - Quotation Request (${formData.Organisation || "Unknown Organisation"})`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlTemplate,
    };
};

// Prepare Quote customer confirmation email
export const prepareQuoteConfirmationEmail = (formData) =>
{
    // Get any attachments if present
    const attachments = prepareAttachments(formData);

    const htmlTemplate = `
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
                                        <p>Hi,</p>
                                        <p>Thank you for taking the time to request a quote from SecureCash!</p>
                                        <p>Your information has been received and we will get working on a quote for you
                                            straight away!</p>
                                        <p>If in the meantime, if you need to provide us with any further information
                                            then please feel free to contact me on 0433 251 983, or reply to this email.
                                        </p>
                                        <p>Thanks again and I will be in touch soon,</p>
                                        <p>Kind regards,</p>
                                        <p>
                                            <strong>
                                                Beth Bacchus<br>
                                                General Manager
                                            </strong>
                                        </p>
                                        <p>
                                            Email: <a
                                                href="mailto:sales@securecash.com.au">sales@securecash.com.au</a><br>
                                            Mobile: <a href="tel:0433251983">0433 251 983</a>
                                        </p>
                                    </td>
                                </tr>
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
                                        &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as
                                        Secure Cash.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>

        </html>`;

    return {
        to: formData.Email,
        from: "SecureCash Sales <sales@securecash.com.au>",
        subject: "SecureCash - Quotation Request",
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: htmlTemplate,
        attachments: attachments.length > 0 ? attachments : undefined,
    };
};

export const prepareSiteInfoEmail = (formData) =>
{
    const currentDateTime = getCurrentDateTime();

    return {
        to: "deepak@securecash.com.au",
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `Site Info - ${formData.BusinessName} (${formData.Postcode}), ${formData.Type || "Regular Service"
            }`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                      <td style="padding:12px;">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                              <tr>
                                  <td style="padding:0 0 12px 0;">
                                      <img src="https://service.securecash.com.au/branded/logo.jpg" alt="SecureCash Logo">
                                  </td>
                                  <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      Site Info
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <h1 style="font-size:24px;font-weight:bold;">Business Information</h1>
                                      <p>The following details were submitted through our Site Info form:</p>
                                      <table>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Business Name:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.BusinessName ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Address:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Address ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Suburb:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Suburb ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>State:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.State ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Postcode:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Postcode ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <h1 style="font-size:24px;font-weight:bold;">Contacts</h1>
                                      <table>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Main Contact:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Contact ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Position:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Position ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Phone:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Phone ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Email:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Email ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Send Accounts To:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Accounts ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <h1 style="font-size:24px;font-weight:bold;">Schedule</h1>
                                      <table>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Required Services:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formatArrayField(
                formData.Services
            )}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Date/s:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Dates ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Schedule:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">
                                                  <strong>${formData.Type ||
            "Regular Service"
            }</strong><br>
                                                  ${formatArrayField(
                formData.Schedule)}
                                              </td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Bank:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Bank || "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <h1 style="font-size:24px;font-weight:bold;">Hazards</h1>
                                      <table>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>Avg. Collection:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.Amount ||
            "Not specified"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Parking:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formatArrayField(
                formData.Parking
            )}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Security:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formatArrayField(
                formData.Security
            )}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>External:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formatArrayField(
                formData.External
            )}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Internal:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formatArrayField(
                formData.Internal
            )}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <h1 style="font-size:24px;font-weight:bold;">Submitted By</h1>
                                      <table>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;"><strong>IP Address:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.ipAddress ||
            "Not available"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Device:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${formData.deviceInfo ||
            "Not available"
            }</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                          <tr>
                                              <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Date of Submission:</strong></td>
                                              <td style="padding:5px 9px 5px 9px;">${currentDateTime}</td>
                                          </tr>
                                          <tr><td colspan="2" style="height:2px;"></td></tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                          <tr>
                                              <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                  <img src="https://service.securecash.com.au/branded/logo.jpg" width="240" alt="SecureCash Logo">
                                                  <span><strong>SecureCash eDocket System</strong></span>
                                                  <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                              </td>
                                              <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;" alt="Email"></td>
                                                          <td>customers@securecash.com.au</td>
                                                      </tr>
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;" alt="Phone"></td>
                                                          <td>1300 SECURE</td>
                                                      </tr>
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;" alt="Website"></td>
                                                          <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                      </tr>
                                                      <tr>
                                                          <td colspan="2">
                                                              Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                      &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          </html>`,
    };
};

export const prepareSiteInfoConfirmationEmail = (formData) =>
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
    // Get PDF attachments
    const pdfAttachments = preparePdfAttachments({ attachments, attachmentConfigs });

    return {
        to: formData.Email,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `SecureCash Business Enrolment - ${formData.BusinessName} (${formData.Type || "Regular Service"
            })`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                      <td style="padding:12px;">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                              <tr>
                                  <td style="padding:0 0 12px 0;">
                                      <img src="https://service.securecash.com.au/branded/logo.jpg" alt="SecureCash Logo">
                                  </td>
                                  <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      SecureCash Welcome Form
                                  </td>
                              </tr>
                              <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                                  <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                      <p>Hi ${formData.Contact || "there"},</p>
                                      <p>Thank you for taking the time to fill out our Welcome forms. All details have been received.</p>
                                      <p>Soon, a member of our team will be in touch with the person you nominated to be your Site contact. They will make sure everything is ready to begin services.</p>
                                      <p><strong>If your services include banking collections, please ensure you have express deposit bags and deposit slips from your bank. These are essential for your collections.</strong></p>
                                      <p>Below we have added some information about how to prepare your banking, and also how our electronic services work.</p>
                                      <p>For any questions, please feel free to call 1300 SECURE (1300 732 873), or email customers@securecash.com.au.</p>
                                      <p>We look forward to working with you.</p>
                                      <p>Kind regards<br>The team at SecureCash</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                          <tr>
                                              <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                  <img src="https://service.securecash.com.au/branded/logo.jpg" width="240" alt="SecureCash Logo">
                                                  <span><strong>SecureCash eDocket System</strong></span>
                                                  <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                                              </td>
                                              <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;" alt="Email"></td>
                                                          <td>customers@securecash.com.au</td>
                                                      </tr>
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;" alt="Phone"></td>
                                                          <td>1300 SECURE</td>
                                                      </tr>
                                                      <tr>
                                                          <td width="30"><img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;" alt="Website"></td>
                                                          <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                                                      </tr>
                                                      <tr>
                                                          <td colspan="2">
                                                              Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                                      &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
          </html>`,
        attachments: pdfAttachments,
    };
};

export const prepareTermsEmail = (formData) =>
{
    // Read the PDF file
    const pdfFilename = "Terms & Conditions.pdf"; // Replace with your actual PDF filename
    const pdfContent = readPdfFile(pdfFilename);

    // Get current date for agreement commencement
    const agreementCommencementDate = getCurrentDateTime();

    // Prepare attachments array
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

    return {
        to: formData.Email,
        from: "SecureCash Sign Up <sign-up@securecash.com.au>",
        subject: `Terms & Conditions - ${formData["Full Name"]}, ${formData["Organisation Name"]}`,
        text: "Please enable HTML emails in your email client to view the contents of this email.",
        html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:12px;">
                <table align="left" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:0 0 12px 0;">
                      <img src="https://service.securecash.com.au/branded/logo.jpg" alt="SecureCash Logo">
                    </td>
                    <td valign="middle" style="color:#bbbbbb;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                      Terms &amp; Conditions
                    </td>
                  </tr>
                  <tr style="border:1px solid #dddddd;border-width:1px 0 1px 0;">
                    <td colspan="2" style="padding:18px 12px 18px 12px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                      <h1 style="font-size:24px;font-weight:bold;">Our Terms &amp; Conditions</h1>
                      <p>Thank you for accepting our Terms &amp; Conditions!</p>
                      <p>The following details were submitted through our Terms &amp; Conditions form:</p>
                      <table>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;width:160px;">
                            <strong>Organisation Name:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["Organisation Name"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Organisation Role:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["Organisation Role"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Organisation ABN:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["Organisation ABN"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Full Name:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["Full Name"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Birthday:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData.Birthday}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Email:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData.Email}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>IP Address:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["IP Address"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Device:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData.Device}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                        <tr>
                          <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;">
                            <strong>Date of Acceptance:</strong>
                          </td>
                          <td style="padding:5px 9px 5px 9px;">
                            ${formData["Date of Acceptance"]}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style="height:2px;"></td>
                        </tr>
                      </table>
                      <h2 style="font-size:20px;font-weight:bold;">Service Agreement</h2>
                      <p><strong>THE PARTIES TO THIS AGREEMENT ARE:</strong></p>
                      <p>Sky Wallet Pty Ltd ABN 39 668 299 027 of 30 Church Hill Road, Old Noarlunga, SA, 5168 its assigns, related entities, licensees or agents. (hereinafter referred to as "the Principal")</p>
                      <p><strong>AND</strong></p>
                      <p>${formData["Full Name"]} (${formData["Organisation Role"]}) of ${formData["Organisation Name"]} ABN ${formData["Organisation ABN"]} (hereinafter referred to as "the Customer", together with the Principal and the Customer are referred to as "the Parties")</p>
                      <p><strong>THIS AGREEMENT COMMENCES ON THE:</strong> ${agreementCommencementDate} and will be ongoing unless either party terminates this Agreement in accordance with the termination provisions herein ("Expiry").</p>
                      <p>Please see attached for a copy of the Service Agreement Clauses.</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="border:1px solid #dddddd;border-width:0 0 1px 0;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="240" style="padding:12px 0 12px 0;color:#222222;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                            <img src="https://service.securecash.com.au/branded/logo.jpg" width="240" alt="SecureCash Logo">
                            <span><strong>SecureCash eDocket System</strong></span>
                            <br /><span><em>"We Pickup &amp; Bank Your Money!"</em></span>
                          </td>
                          <td style="padding:16px 0 12px 40px;color:#222222;line-height:160%;text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                              <tr>
                                <td width="30">
                                  <img src="https://service.securecash.com.au/branded/email.png" style="margin:4px 0 0 0;" alt="Email">
                                </td>
                                <td>customers@securecash.com.au</td>
                              </tr>
                              <tr>
                                <td width="30">
                                  <img src="https://service.securecash.com.au/branded/phone.png" style="margin:4px 0 0 0;" alt="Phone">
                                </td>
                                <td>1300 SECURE</td>
                              </tr>
                              <tr>
                                <td width="30">
                                  <img src="https://service.securecash.com.au/branded/website.png" style="margin:4px 0 0 0;" alt="Website">
                                </td>
                                <td><a href="https://www.securecash.com.au/" target="_blank" style="color:blue;">securecash.com.au</a></td>
                              </tr>
                              <tr>
                                <td colspan="2">
                                  Take 30 seconds to <a href="https://www.securecash.com.au/performance/" target="_blank">rate our performance</a>.
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="color:#666666;line-height:160%;text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;padding:12px 0 0 0;">
                      &copy; 2005 Sky Wallet Pty Ltd ABN 39 668 299 027 Trading (Under License) as Secure Cash.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
        attachments: attachments
    };
};