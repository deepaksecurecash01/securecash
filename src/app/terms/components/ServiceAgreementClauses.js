import Divider from '@/components/common/Divider';
import Typography from '@/components/common/Typography';
import Container from '@/components/layout/Container';
import ScrollableSection from '@/components/layout/ScrollbarSection';
import React from 'react';



// Terms data structure
const termsData = {
    definitions: {
        title: "1 Definitions in this Agreement:",
        items: [
            {
                number: "1.1",
                text: "'Agreement' means an agreement between the Customer and the Principal for the supply of the Services constituted by the elements outlined in clause 3.1 hereof;"
            },
            {
                number: "1.2",
                text: "'Confidential Information' means any Trade Secrets, confidential or commercially sensitive or valuable information, whether or not labelled 'Confidential', including, but not in any way limited to, all past, present and future discussions and negotiations; correspondence, emails, facsimiles, letters and papers of every description, including all extracts and copies of the same and other similar items whether or not reduced to material form; any of the above information which relates to and is the property of the Principal or the Customer;"
            },
            {
                number: "1.3",
                text: "'Customer' means a person or entity to which the Principal supplies Goods or Services;"
            },
            {
                number: "1.4",
                text: "'Direct Damages' means damage flowing directly from the breach of a warranty or term of this Agreement and does not include consequential loss or indirect damage of any nature whatsoever including, without limitation, loss of profits;"
            },
            {
                number: "1.5",
                text: "'Electronic Communication' means electronic communications including, without limitation, a communication of information in the form of data, text or images by means of guided and or unguided electromagnetic energy, including by means of the internet;"
            },
            {
                number: "1.6",
                text: "'Goods' means any goods described in the Quotation;"
            },
            {
                number: "1.7",
                text: "'Instructions' means any instructions given to the Principal from the Customer which specifies the particulars of the Services to be provided;"
            },
            {
                number: "1.8",
                text: "'PPSA' means the Personal Property Securities Act 2009 (Cth);"
            },
            {
                number: "1.9",
                text: "'Public Holiday' means a public holiday as proclaimed in each particular State or Territory of Australia where the Goods are being supplied or Services are being performed;"
            },
            {
                number: "1.10",
                text: "'Quotation' means the most current correspondence from the Principal detailing the amount to be paid for the Goods or Services as per the Instructions;"
            },
            {
                number: "1.11",
                text: "'the Principal' means Sky Wallet Pty Ltd (ABN: 39 668 299 027) trading under license as 'the Principal';"
            },
            {
                number: "1.12",
                text: "'Services' means any service which may be provided, directly or indirectly, by the Principal to the Customer under this Agreement including, without limitation, cash in transit services;"
            },
            {
                number: "1.13",
                text: "'Terms and Conditions' means these terms and conditions of Services in this Agreement;"
            },
            {
                number: "1.14",
                text: "'Trade Secret' means a formula, practice, process, design, instrument, pattern, or compilation of information which is not generally known or reasonably ascertainable, by which the Principal can obtain an economic advantage over competitors or customers;"
            },
            {
                number: "1.15",
                text: "'Business Hours' as specified in the Quotation means between the hours of 9am to 5pm Monday to Friday;"
            },
            {
                number: "1.16",
                text: "'Weekends' as specified in the Quotation means between the hours of 9am to 5pm Saturday & Sunday;"
            },
            {
                number: "1.17",
                text: "'After Hours' as specified in the Quotation means between the hours of 5pm to 12 Midnight Monday to Sunday;"
            },
            {
                number: "1.18",
                text: "'Overnight' as specified in the Quotation means between the hours of 12 Midnight to 9am Monday to Sunday."
            }
        ]
    },
    interpretation: {
        title: "2 Interpretation",
        items: [
            {
                number: "2.1",
                text: "A reference to persons includes an individual, the estate of an individual, a body politic, a corporation and a statutory or other authority or association (incorporated or unincorporated)."
            },
            {
                number: "2.1.1",
                text: "Words denoting the singular number include the plural and vice versa."
            },
            {
                number: "2.1.2",
                text: "Words denoting any gender include all genders."
            },
            {
                number: "2.1.3",
                text: "Where a word or phrase is defined, other parts of speech and grammatical forms of that word or phrase have corresponding meanings."
            },
            {
                number: "2.1.4",
                text: "References to clauses are to clauses of this Agreement."
            },
            {
                number: "2.1.5",
                text: "Headings are for convenience only and do not affect interpretation."
            },
            {
                number: "2.1.6",
                text: "A reference to any party to this Agreement or to any other document includes that party¹s executors, administrators, successors and permitted assigns (as the case may be)."
            },
            {
                number: "2.1.7",
                text: "References to any document include references to such document as amended, novated, supplemented, varied or replaced from time to time."
            },
            {
                number: "2.1.8",
                text: "References to any legislation or to any provision of any legislation include any modification or re-enactment of that legislation or legislative provision or any legislation or legislative provision substituted for, and all regulations and instruments issued under such legislation or provision."
            },
            {
                number: "2.1.9",
                text: "Except for the purpose of identification headings and underlinings have been inserted in this Agreement for the purpose of guidance only and are not part of this Agreement."
            },
            {
                number: "2.1.10",
                text: "A provision of this Agreement must not be construed to the disadvantage of a party merely because that party was responsible for the preparation of this Agreement or the inclusion of the provision in this Agreement."
            }
        ]
    },
    agreement: {
        title: "3 Agreement",
        items: [
            {
                number: "3.1",
                text: "The entire Agreement between the Principal and the Customer for the provision of Services to the Customer from Principal is:"
            },
            {
                number: "3.1.1",
                text: "These Terms and Conditions;"
            },
            {
                number: "3.1.2",
                text: "Any other terms and conditions (including Instructions) incorporated by reference in the Quotation; and"
            },
            {
                number: "3.1.3",
                text: "Any other terms and conditions which are imposed by law and which cannot be excluded; and"
            },
            {
                number: "3.1.4",
                text: "Any agreed written variation."
            },
            {
                number: "3.2",
                text: "The Customer placing an order with the Principal constitutes acceptance of the Agreement."
            },
            {
                number: "3.3",
                text: "The Customer acknowledges that the Services which are provided by the Principal under this Agreement are not acquired by the Customer wholly or predominantly for personal, domestic or household use or consumption."
            }
        ]
    },
    information: {
        title: "4 Information supplied by Customer",
        items: [
            {
                number: "4.1",
                text: "In the event that Instructions are to be supplied by the Customer:"
            },
            {
                number: "4.1.1",
                text: "The Customer shall supply the Instructions prior to the Principal providing the Quotation;"
            },
            {
                number: "4.1.2",
                text: "The Principal will endeavour to comply with any subsequent requests for alterations to the Instructions but shall be under no obligation to do so and may require payment of an additional charge in respect of any alterations to which the Principal may agree;"
            },
            {
                number: "4.1.3",
                text: "The Customer warrants that any details of the Customer including, but not limited to, the name, address and principal place of business of the Customer or the identities of officers or agents of the Customer or email addresses, facsimile numbers or telephone numbers of the Customer which have been provided to the Principal are accurate. This warranty is given each time the Principal accepts an order from the Customer or otherwise agrees to supply Goods and or Services to the Customer;"
            },
            {
                number: "4.1.4",
                text: "Upon any change or alteration of the Customer, including but not limited to changes or alterations in the ownership of the Customer, the Customer shall notify the Principal in writing of the changes within 14 days of legal change of ownership. The Customer hereby agrees to indemnify and keep indemnified the Principal against any loss, damage or expense of whatsoever nature arising from the Customer¹s failure to notify, or as a result of the change or alteration."
            }
        ]
    },
    nonSolicitation: {
        title: "5 Non Solicitation",
        items: [
            {
                number: "5.1",
                text: "The Customer, its past or present employees, associates, contractors, representatives or agents will not during the term of this Agreement and for a period of twelve (12) months from the date of termination of this Agreement:-"
            },
            {
                number: "5.1.1",
                text: "Assist or be engaged in or be involved in, or contribute in any way to the targeting or soliciting or interfering with any of the Principal past or present employees, associates, contractors, representatives or agents involved with providing services to the Customer under this Agreement; and"
            },
            {
                number: "5.1.2",
                text: "In the event of a breach by the Customer under this Agreement, the Customer hereby agrees to compensate the Principal or any of its associated companies for any loss or damages arising from the breach, and any costs and expenses incurred by the Principal in enforcing the terms of this Agreement."
            }
        ]
    },
    pricing: {
        title: "6 Pricing",
        items: [
            {
                number: "6.1",
                text: "The Customer agrees to the price of the Goods and/or Services as specified in the Quotation plus any additional charges as detailed in clause"
            },
            {
                number: "6.2",
                text: "the Principal may vary the price of the Goods and/or Services subject to written agreement by the Customer. Principal will notify the Customer of any significant changes to the price specified in the Quotation as soon as practicable."
            },
            {
                number: "6.3",
                text: "The Customer is liable to pay the amount specified in the Quotation in the event that their premises are closed contrary to the hours specified in any correspondence between the Parties."
            },
            {
                number: "6.4",
                text: "The Customer is liable to pay the amount specified in the Quotation if the Customer¹s nominated financial institution, business or individual refuses to accept the delivery, including by closure of the premises where delivery was to be made."
            },
            {
                number: "6.5",
                text: "The Principal may (at the discretion of the Principal) additionally charge for:"
            },
            {
                number: "6.5.1",
                text: "Tamper-evident satchels provided by the Principal where the Customer does not have any of their own available;"
            },
            {
                number: "6.5.2",
                text: "Each amount over $50,000.00 (in cash) or part thereof, that is collected at the discretion of the Principal;"
            },
            {
                number: "6.5.3",
                text: "Any alterations in the Instructions;"
            },
            {
                number: "6.5.4",
                text: "The delivery of Goods or performance of the Services that fall on a Public Holiday."
            }
        ]
    },
    services: {
        title: "7 Services",
        items: [
            {
                number: "7.1",
                text: "Time is not of the essence unless otherwise indicated on the Quotation."
            },
            {
                number: "7.2",
                text: "The Customer warrants that it shall only hand over monies to representatives of approved Principal appointed contractors by verifying that either;"
            },
            {
                number: "7.2.1",
                text: "the representative of the contractor is named and listed on the corresponding website",
                link: { href: "https://service.securecash.com.au/", text: "service.securecash.com.au", title: "Online Services" }
            },
            {
                number: "7.2.2",
                text: "or by scanning the representatives identification QR code,"
            },
            {
                number: "7.2.3",
                text: "or by telephoning",
                phone: { href: "tel:1300732873", text: "1300 SECURE" },
                additionalText: "(732 873) and ask for confirmation that the representative is authorised to collect your banking."
            },
            {
                number: "7.3",
                text: "A physical identification (i.e. a badge or ID card) from the representative is not sufficient authorization in itself unless verified by either method as described in 7.2.1, 7.2.2 or 7.2.3 and the Customer acknowledges that the Principal is not liable for any loss or damage arising from the Customers failure to follow this verification procedure."
            },
            {
                number: "7.4",
                text: "Where applicable, the Customer will use their nominated financial institutions express deposit satchels or equivalent for all monies handled. Such satchels must be tamper-evident and have a printed unique serial number."
            },
            {
                number: "7.5",
                text: "All monies that the Principal count are subject to final bank verification."
            },
            {
                number: "7.6",
                text: "The Principal will make all efforts to deliver your cash to the bank on the same day; however, there may be circumstances beyond our control that may prevent this from happening, for example but not limited to traffic, weather, special events, vehicle breakdown etc. In the event that this occurs, your cash will be delivered to the bank the next available business day."
            },
            {
                number: "7.7",
                text: "The amount as verified by the Customers nominated financial institution shall prevail over any count carried out by the Customer and the Principal shall not be held liable for any discrepancy in the count."
            },
            {
                number: "7.8",
                text: "The Customer indemnifies the Principal in the event that the Customers nominated financial institution or receiver of the Services does not provide adequate proof of delivery for any reason whatsoever, including, but without limitation, through any negligent act or omission by any contractor, agent or employee of the Principal."
            },
            {
                number: "7.9",
                text: "The Customer shall make themselves familiar with and comply with the procedures as contained in the 'How to' manual that can be found on the Principal website and as varied or amended by the Principal from time to time."
            },
            {
                number: "7.10",
                text: "The Customer shall not provide the Principal with any amounts over $50,000.00 unless otherwise agreed prior by the Principal."
            },
            {
                number: "7.11",
                text: "The Customer warrants that it does not seek the provision of the Services from the Principal for any illegal, malicious or vindictive purpose. The Principal reserves the right to terminate this Agreement without notice for any breach of such warranty and shall be entitled to the payment for any Services provided."
            },
            {
                number: "7.12",
                text: "In the event that the Principal and/or an employee, agent or contractor of the Principal identifies an occupational health and safety risk in the vicinity of the Customer¹s premises, the Principal may cancel the service without notice until the collection premises are fully compliant with any applicable occupational health and safety law."
            }
        ]
    }
};

const additionalSections = [
    {
        title: "8 Payment",
        items: [
            { number: "8.1", text: "Payment is to be made in full within fourteen (14) days from the issue date of an invoice supplied by the Principal." },
            { number: "8.2", text: "If the Service provided is a once-off service, the Principal may request that all payments be made in full prior to the date of service by the approved methods of payment." },
            { number: "8.3", text: "The Payment shall be made in Australian Dollars only." },
            { number: "8.4", text: "In the event that the Customer makes default in payment, the Principal shall be entitled to charge $15 on all invoices not paid by the due date." },
            { number: "8.5", text: "On default of payment the Principal may cease provision of the Services and suspend the Customer's account." },
            { number: "8.6", text: "All legal costs (on a solicitor/client basis), charges, duties and other expenses incurred by the Principal in respect of this Agreement or other documentation required hereunder, or incurred as a result of the Customer failing to perform their covenants and obligations contained herein, shall be paid by the Customer to the Principal. The expenses include, but are not limited to, the commission payable to a mercantile agent of debt collector to pursue or recover outstanding monies pursuant to this Agreement and the liability to pay this commission arises at the time the recovery is placed in the hands of the debt collector." }
        ]
    },
    {
        title: "9 Indemnity (From anything not covered by the contractors insurance policy)",
        items: [
            { number: "9.1", text: "The Customer will keep the Principal and its workers, contractors and agents fully indemnified against all actions, demands, costs and losses however arising from the use of the Goods or Supplied Services." },
            { number: "9.2", text: "Subject to any express provision of this Agreement and the applicable law, the Principal will not be liable in tort, contract or in any other way for any direct or indirect loss, damage, contamination or deterioration to the Goods or miss-delivery or failure to deliver or any delay in the delivery of the Goods or for any injury, loss or damage, direct or indirect, to any person or real or personal property arising in any way in connection with the carriage of the Goods whether due to any action or inaction by the Principal or any other person or otherwise." },
            { number: "9.3", text: "The Customer fully indemnifies and holds harmless the Principal for any loss or damage (including consequential loss) arising out of the provision of the Goods or Services under the Agreement including any loss or damage caused by the negligence of Principal or an agent, contractor or employee of the Principal." },
            { number: "9.4", text: "The above clause, applies notwithstanding any loss or damage being remote or unforeseeable and whether or not the Principal failed to mitigate the loss or damage." }
        ]
    },
    {
        title: "10 Limitation of Liability",
        items: [
            { number: "10.1", text: "This clause does not exclude or limit the application of any provision of any statute (including the Competition and Consumer Act 2010 (Cth)) where to do so would contravene that statute or cause any part of this clause to be void." },
            { number: "10.2", text: "the Principal excludes all implied conditions and warranties except any implied condition or warranty the exclusion of which would contravene any statute or cause any part of this clause to be void (Non-excludable Conditions)." },
            { number: "10.3", text: "In the event that the Principal makes available or sends documents to the Customer including, without limitation, invoices, quotations and directions by means of an Electronic Communication, Principal will not be liable in respect of:" },
            { number: "10.3.1", text: "any error, omission or loss of confidentiality arising from an Electronic Communication; or" },
            { number: "10.3.2", text: "any unauthorised copying, recording or interference with a document; or" },
            { number: "10.3.3", text: "any delay or non-delivery of a document; or" },
            { number: "10.3.4", text: "any damage caused to your system or files by such Electronic Communication (including by any computer virus)." },
            { number: "10.4", text: "Liability of the Principal to the Customer for breach of any express provision of this Agreement or any Non-excludable Condition is limited, at the option of Principal to:" },
            { number: "10.4.1", text: "In the event that Services were provided to the Customer, refunding the price of the Services in respect of which the breach occurred or to providing similar services;" },
            { number: "10.4.2", text: "In the event that Goods were provided to the Customer, whichever is the lesser amount out of; the costs of replacing the Goods, the cost of obtaining equivalent Goods, or the cost of having the Good repaired." },
            { number: "10.4.3", text: "In the event that a court finds that it would not be fair or reasonable for Principal to rely upon one or more clauses 10.2, 10.3.1, 10.3.2 or 10.3.3, the Principal may limit its liability for the breach to Direct Damages only." },
            { number: "10.5", text: "Subject to the Non-excludable conditions, the Principal gives no warranty in relation to the suitability or performance of the Goods for the Customer's application. Any party making a warranty claim will be liable for the Principal's costs in connection with the claim where there was no valid warranty claim." }
        ]
    },
    {
        title: "11 Personal Property Securities Act",
        items: [
            { number: "11.1", text: "In the event that the PPSA applies to a grant of security under this Agreement, including any retention of title under clause 11.1 herein:-" },
            { number: "11.1.1", text: "In the event that anything is used as collateral for a security interest held by the Principal within the meaning of the PPSA and is not predominantly used for personal, domestic or household use, the enforcement provisions listed in s115 of the PPSA are excluded from application to that collateral to the full extent permitted under the PPSA other than the following sections: s117, s118, s123, s126, s128, s129 and all of Division 6 of Part 4.3 of the PPSA." },
            { number: "11.1.2", text: "If the Customer grants the Principal a security interest in collateral which is predominantly used for personal, domestic or household use the Customer must give written notice to the Principal of that predominant use within 14 days of the grant of the security interest. In the event that the Customer does not give such notice, the Customer represents to the Principal that the collateral is not predominantly used for personal, domestic or household use." },
            { number: "11.1.3", text: "The Customer will do all things reasonably required of it by the Principal to allow the Principal to register its security interest under the PPSA." },
            { number: "11.1.4", text: "The Customer will reimburse the Principal for maintenance fees payable by the Principal under s168 of the PPSA." }
        ]
    },
    {
        title: "12 Confidentiality",
        items: [
            { number: "12.1", text: "The Parties agree to keep confidential keep confidential all Confidential Information concerning or arising from the performance of the Services. This clause does not apply to Confidential Information that is lawfully obtained from a third party, is public knowledge, is already known or is otherwise independently developed by representatives of the Principal who have not been exposed to the Confidential Information." }
        ]
    },
    {
        title: "13 Termination",
        items: [
            { number: "13.1", text: "Without prejudice to any other rights which the Principal has, the Principal may terminate this Agreement immediately by giving written notice to the Customer if:-" },
            { number: "13.1.1", text: "Any payments due from the Customer to the Principal under this Agreement are more than 10 business days overdue (whether or not the Principal has demanded payment); or" },
            { number: "13.1.2", text: "The Customer is presumed insolvent within the Sec 459C(2) of the Corporations Act 2001 (Cth); or" },
            { number: "13.1.3", text: "The Customer commits an act of bankruptcy; or" },
            { number: "13.1.4", text: "The Customer is placed into, or any of its assets are subject to, external administration or if any proceedings are issued or an event occurs intended to lead to any of those consequences or if any other action relating to insolvent debtors occurs in relation to the Customer or if the Customer ceases to carry on its existing business; or" },
            { number: "13.1.5", text: "Any judgment is entered against the Customer for a sum of not less than $5,000 and is not satisfied by the Customer within 14 days of being entered; or" },
            { number: "13.1.6", text: "The Customer breaches any of the terms of this Agreement and within 7 days of receiving a notice from Principal specifying the breach, has not remedied it." },
            { number: "13.2", text: "The Customer may terminate this Agreement:" },
            { number: "13.2.1", text: "If the Principal is in breach of its obligations under this Agreement and does not, within 21 days after receiving written notice from the Customer of a breach of this Agreement, remedy that breach; or" },
            { number: "13.2.2", text: "If there are no amounts outstanding to the Principal, the customer may give 31 days written notice that it does not intend to purchase any more Goods or Services from the Principal in the future, and the Customer agrees to either continue ordering the regular schedule of Goods and Services as it has in the past until the 31 days notice has been served, or pay an amount equal to the regular schedule of Goods and Services as it has ordered in the past equivalent to 31 days in lieu." },
            { number: "13.3", text: "If the Service is for a special event or a once-off collection, the Principal requires and the Customer agrees to provide eight (8) hours notice in writing of termination." }
        ]
    },
    {
        title: "14 Subcontractors",
        items: [
            { number: "14.1", text: "The Customer understands and agrees that the Principal may engage contractors to perform services that are purchased by the Customer under this Agreement." }
        ]
    },
    {
        title: "15 Insurance",
        items: [
            { number: "15.1", text: "The Principal will take all reasonable steps to ensure that the contractor it engages has current public liability insurance and cash in transit insurance for the Services to be performed." },
            { number: "15.2", text: "The Customer agrees that a claim will only be against the contractor and their relevant insurance policy." },
            { number: "15.3", text: "A copy of the contractors certificate of currency of the insurance can be forwarded to the Customer upon request." }
        ]
    },
    {
        title: "16 Paramountcy of Terms and Conditions",
        items: [
            { number: "16.1", text: "In the event of any inconsistency or conflict between the requirements and provisions of these Terms and Conditions and the requirements and provisions of the Quotation then the requirements and provisions of these Terms and Conditions shall prevail to the extent of such inconsistency or conflict to the intent and purpose that these Terms and Conditions set out the paramount intentions and agreements of the Parties to this Agreement." }
        ]
    },
    {
        title: "17 Trustee of a Trust",
        items: [
            { number: "17.1", text: "In the case that the Customer shall be a company acting as a trustee for a trust, the Customer hereby acknowledges and represents to the Principal that the trust shall be liable on the account and the trust has sufficient assets to meet the payment of the account." }
        ]
    },
    {
        title: "18 Notice",
        items: [
            { number: "18.1", text: "Any notice given pursuant to this Agreement to the Principal must be in writing and hand delivered to a current Director of the Principal only, sent by prepaid post to PO Box 215, Blackwood, SA, 5051 or by Electronic Communication to customers@securecash.com.au and the Principal may send any notice given or invoice provided pursuant to this Agreement to any address, facsimile number or email address that the Customer has provided at the time of entering into this Agreement and that notice sent will be deemed sufficiently given:" },
            { number: "18.1.1", text: "In the case of hand delivery, on the date of delivery; or" },
            { number: "18.1.2", text: "In the case of prepaid post, 2 business days after being sent by prepaid post; or" },
            { number: "18.1.3", text: "Subject to clause 18.2, in the case of Electronic Communication, on receipt by the sender of electronic confirmation that the Electronic Communication has been received by the recipient party." },
            { number: "18.2", text: "In the case of email, evidence that the email has been successfully sent will be prima facie evidence of the addressed recipient's receipt of that email at the time of dispatch." }
        ]
    },
    {
        title: "19 Proper Law",
        items: [
            { number: "19.1", text: "This Agreement is to be construed according to the laws of South Australia and the parties submit themselves to the jurisdiction of the Courts of South Australia and any competent appellate courts (\"the Courts\")." },
            { number: "19.2", text: "The Parties irrevocably agree and undertake:" },
            { number: "19.2.1", text: "To the sole and exclusive jurisdiction of the Courts; and" },
            { number: "19.2.2", text: "a Party shall not commence or continue any action, matter or proceeding in any other court or tribunal (\"Unauthorised Action\"), without the signed approval or consent of the other Party; and" },
            { number: "19.2.3", text: "To the grant in any other court or tribunal of an injunction restraining the commencement and or continuation of any Unauthorised Action" },
            { number: "19.2.4", text: "Further to paragraph 19.1.3, the cost of any injunction (and anything related to the injunction) shall be the sole cost and expense of the Party in breach of this clause 19 payable:" },
            { number: "19.1.4.1", text: "on a full (solicitor and own client) indemnity basis" },
            { number: "19.1.4.2", text: "on demand to the Party and irrespective of whether any amount is paid by the Party not in breach of this clause 19." }
        ]
    },
    {
        title: "20 Waiver",
        items: [
            { number: "20.1", text: "The failure of a party to insist in any one or more instances upon the performance of any provisions of this Agreement shall not be construed as a waiver or relinquishment of that party¹s rights to future performance of such provision and the other party¹s obligation in respect of such future performance shall continue in full force and effect." }
        ]
    },
    {
        title: "21 Severability",
        items: [
            { number: "21.1", text: "In the event that any one or more of the provisions contained in this Agreement shall for any reason be held to be unenforceable, illegal or otherwise invalid in any respect under the law governing this Agreement or its performance, such unenforceability, illegality or invalidity shall not affect any other provisions of this Agreement and this Agreement shall be construed as if such unenforceable illegal or invalid provisions had never been contained herein." }
        ]
    },
    {
        title: "22 Force majeure",
        items: [
            { number: "22.1", text: "Neither party shall be liable to the other for any failure to perform or delay in performance of its obligations hereunder other than an obligation to pay moneys caused by (i) Act of God (ii) outbreak of hostilities, riot, civil disturbance, acts of terrorism (iii) the act of any government or authority (including, revocation of any license or consent) (iv) explosion, flood, fog or bad weather (v) theft, malicious damage, strike, lockout or industrial action of any kind (vi) any cause or circumstance whatsoever beyond its reasonable control." }
        ]
    },
    {
        title: "23 Whole agreement",
        items: [
            { number: "23.1", text: "This Agreement (including schedules referred to herein) supersedes all prior representations, arrangements, understandings and agreements between the Parties (whether written or oral) relating to the subject matter hereof including the Principal's quoted price lists, catalogues, brochures or other advertising material and sets forth the entire complete and exclusive agreement and understanding between the parties hereto relating to the subject matter hereof." }
        ]
    },
    {
        title: "24 Variationn",
        items: [
            { number: "24.1", text: "The Parties irrevocably agree and undertake that the Principal may amend or vary this Agreement from time to time and such amendments or variations shall take effect as and from the time written notice is given to the Customer." }
        ]
    }
];


// Component for rendering list items
const TermsListItem = ({ item }) => (
    <li>
        <span className="tnc-number absolute left-0 text-[16px] font-semibold text-primary">{item.number}</span>
        <p className={`${item.wide ? "bullet-wide" : ""} block leading-[2em] pl-[47px] mb-[30px]`}>
            {item.text}
            {item.link && (
                <>
                    {" "}
                    <strong>
                        <a
                            href={item.link.href}
                            title={item.link.title}
                            target="_blank"
                            rel="noopener"
                        >
                            {item.link.text}
                        </a>
                    </strong>
                </>
            )}
            {item.phone && (
                <>
                    {" "}
                    <strong>
                        <a href={item.phone.href}>{item.phone.text}</a>
                    </strong>
                    {item.additionalText && ` ${item.additionalText}`}
                </>
            )}
        </p>
    </li>
);

// Component for rendering sections
const TermsSection = ({ section }) => (
    <>
        <Typography
            as="h4"
            fontFamily="montserrat"
            className="text-[16px] font-medium leading-[1.6em] text-left mx-auto 992px:text-[18px] pt-4 mb-[24px] 768px:text-left 768px:mx-0"
        >            {section.title}
        </Typography>
        <ul className="tnc-page-sa-clauses--content__list list-none font-light relative pr-10">
            {section.items.map((item, index) => (
                <TermsListItem key={index} item={item} />
            ))}
        </ul>
    </>
);

// Main component
const ServiceAgreementClauses = () =>
{
    const allSections = [
        termsData.definitions,
        termsData.interpretation,
        termsData.agreement,
        termsData.information,
        termsData.nonSolicitation,
        termsData.pricing,
        termsData.services,
        ...additionalSections
    ];

    return (
        <section className="tnc-page-sa-clauses relative z-[1] bg-[#fff] shadow-[0_1px_6px_0_rgba(32,33,36,0.28)] 1024px:shadow-none">
            <img
                src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
                alt="Two People Shaking Hands"
                className="tnc-page-sa-clauses__img-bg hidden 1024px:block absolute left-0 768px:w-[30%] h-full object-cover -z-[1]"
                width={559}
                height={620}
            />
            <Container className="inner w-full">
                <div className="tnc-page-sa-clauses--wrap flex justify-end">
                    <div className="tnc-page-sa-clauses--content 1024px:w-[70%] 1200px:w-[65%] py-[50px] px-[30px] 480px:py-[82px]  480px:px-[34px]  1366px:pt-[110px]  1366px:pb-[110px]  1366px:pl-[18px]">
                        <Typography
                            as="h3"
                            fontFamily="montserrat"
                            className=" text-[22px] 480px:text-[24px] 1024px:text-[26px] font-semibold leading-[1.6em] text-left mx-auto 992px:text-[26px] 768px:mx-0"
                            >
                            Service Agreement Clauses
                        </Typography>
                        <Divider
                            color="primary"
                            alignment="left"
                            className="mt-5 mb-[34px] w-[100px] 768px:text-left 768px:mx-0"

                        />
                        <ScrollableSection className="h-[652px] 992px:w-full p-0 mx-auto 992px:h-[370px] pb-[18px]">
                            {allSections.map((section, index) => (
                                <TermsSection key={index} section={section} />
                            ))}
                        </ScrollableSection>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ServiceAgreementClauses;