import React from 'react'

const icaEdocketsIntroductionEmailTemplate = (formData) => {
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
}

export default icaEdocketsIntroductionEmailTemplate