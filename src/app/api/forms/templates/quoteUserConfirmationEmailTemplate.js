
const quoteUserConfirmationEmailTemplate = (formData) => {
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
                                          <p>Hi,</p>
                                          <p>Thank you for taking the time to request a quote from SecureCash!</p>
                                          <p>Your information has been received and we will get working on a quote for you
                                              straight away!</p>
                                          <p>If in the meantime, if you need to provide us with any further information
                                              then please feel free to contact me on 0433 251 983, or reply to this email.
                                          </p>
                                          <p>Thanks again and I will be in touch soon.</p>
                                          <p>Kind regards,</p>
                                          <p>
                                              <strong>
                                                  Beth Bacchus<br>
                                                  Chief Business Officer
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
}

export default quoteUserConfirmationEmailTemplate