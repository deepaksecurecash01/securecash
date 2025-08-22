import React from 'react'

const siteInfoUserConfirmationEmailTemplate = (formData) => {
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
            </html>`
}

export default siteInfoUserConfirmationEmailTemplate