export default function franchiseTemplate(formData, { getCurrentDateTime, preparePdfAttachments }) {
    const currentDateTime = getCurrentDateTime();

    // Admin notification email
    const adminEmail = {
        to: "deepak@securecash.com.au",
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        replyTo: formData.Email,
        subject: `SecureCash - Franchise Expression of Interest - ${formData.FullName || 'Unknown'}`,
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
    </html>`
    };

    // Customer confirmation email with PDF attachments
    const pdfAttachments = preparePdfAttachments();
    const confirmationEmail = {
        to: formData.Email,
        from: "SecureCash Franchise <franchise@securecash.com.au>",
        subject: "SecureCash Franchise Enquiry",
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
    </html>`,
        attachments: pdfAttachments
    };

    // Return array of emails to send both admin notification and customer confirmation
    return [adminEmail, confirmationEmail];
}