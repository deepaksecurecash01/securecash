
const siteInfoAdminNotificationEmailTemplate = (formData, currentDateTime, formatArrayField) =>
{
    console.log(formData)
  return `
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
                                                <td style="padding:5px 9px 5px 9px;">${formData["IP Address"] ||
              "Not available"
              }</td>
                                            </tr>
                                            <tr><td colspan="2" style="height:2px;"></td></tr>
                                            <tr>
                                                <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Device:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.Device ||
              "Not available"
              }</td>
                                            </tr>
                                            <tr><td colspan="2" style="height:2px;"></td></tr>
                                            <tr>
                                                <td valign="top" style="color:#ffffff;background-color:#c2a14b;padding:5px 9px 5px 9px;"><strong>Date of Submission:</strong></td>
                                                <td style="padding:5px 9px 5px 9px;">${formData.dateOfSubmission || currentDateTime}</td>
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
            </html>`
}

export default siteInfoAdminNotificationEmailTemplate