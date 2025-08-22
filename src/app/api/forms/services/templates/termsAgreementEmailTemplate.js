import React from 'react'

const termsAgreementEmailTemplate = (formData, agreementCommencementDate) =>
{
  console.log(formData, agreementCommencementDate);
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
    `;
}

export default termsAgreementEmailTemplate