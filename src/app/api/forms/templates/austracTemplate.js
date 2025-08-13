export default function austracTemplate(formData, { getCurrentDateTime }) {
    const currentDateTime = getCurrentDateTime();

    // Replace placeholders with actual form data
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
}