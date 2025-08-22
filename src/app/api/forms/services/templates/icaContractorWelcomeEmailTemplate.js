import React from 'react'

const icaContractorWelcomeEmailTemplate = (formData) => {
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
                                        <tr><td width="200"><strong>Full Name:</strong></td><td>${formData.Name || formData.CompanyName || ""
    }</td></tr>
                                        <tr><td><strong>Org. Structure:</strong></td><td>${formData.OrganisationType || ""
    }</td></tr>
                                        <tr><td><strong>ABN:</strong></td><td>${formData.ABN || ""}</td></tr>
                                        <tr><td><strong>Phone:</strong></td><td>${formData.Phone || ""}</td></tr>
                                        <tr><td><strong>Email:</strong></td><td>${formData.Email || ""}</td></tr>
                                        <tr><td><strong>Physical Address:</strong></td><td>${formData.Address || ""
    }</td></tr>
                                        <tr><td><strong>Postal Address:</strong></td><td>${formData.AddressPostal || ""
    }</td></tr>
                                        <tr><td><strong>Commencement:</strong></td><td>${formData.DateCommencement || ""
    }</td></tr>
                                    </table>
                                    
                                    <h3 style="background:#eeeeee;padding:8px;margin-top:24px;">Schedule of The Deed</h3>
                                    <table style="margin-left:8px;">
                                        <tr><td width="200"><strong>Date of Deed:</strong></td><td>${formData.DateDeed || ""
    }</td></tr>
                                        <tr><td><strong>Beneficiary:</strong></td><td>Office Central Pty Ltd ACN 668 461 050 of 30 Church Hill Road, Old Noarlunga, SA</td></tr>
                                        <tr><td><strong>Contractor:</strong></td><td>${formData.BusinessName || formData.CompanyName || ""
    }</td></tr>
                                        <tr><td><strong>Guarantor:</strong></td><td>${formData.Name || formData.CompanyName || ""
    } of ${formData.AddressResidential || ""}</td></tr>
                                        <tr>
                                            <td colspan="2">
                                                <p>Executed as a deed.</p>
                                                <p><strong>SIGNED, SEALED and DELIVERED</strong></p>
                                                <p>By ${formData.BusinessName || formData.CompanyName || ""
    } in accordance with its Constitution (if any) as a deed pursuant to section 127 of the Corporations Act.</p>
                                            </td>
                                        </tr>
                                        <tr><td><strong>Name:</strong></td><td>${formData.Name || formData.CompanyName || ""
    }</td></tr>
                                        <tr><td><strong>Residential Address:</strong></td><td>${formData.AddressResidential || ""
    }</td></tr>
                                        <tr><td><strong>Witnessed by:</strong></td><td>${formData.WitnessName || ""
    }</td></tr>
                                        <tr><td><strong>Witness Address:</strong></td><td>${formData.WitnessAddress || ""
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

}

export default icaContractorWelcomeEmailTemplate