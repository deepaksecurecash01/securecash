
import React from 'react';
import HeroImage from './HeroImage';
import IndependentContractorsForm from '@/components/common/forms-new/forms/IcaForm';

const page = () =>
{
  
  //Agreement Term Section
  const agreementTermData = {
    opening: {
      title: "",
      items: [
        {
          number: "1.1",
          text: "It is expressly understood and accepted that this is not an employment agreement and as such the Contractor will have no claim to the Principal benefits or employee considerations, including but not limited to annual leave, personal leave, long service leave, profit sharing, pension, shares or bonuses. Upon Expiry of this contract it is understood that that the relationship between the parties has ended."
        }
      ]
    },
    interpretation: {
      title: "2 Interpretation",
      items: [
        {
          number: "2.1",
          text: '"Acts" means the Financial Transactions Act 1988 and the Anti-Money Laundering and Counter-Terrorism Financing Act 2006.'
        },
        {
          number: "2.2",
          text: '"Assistant" has the same meaning as given by clause 5.'
        },
        {
          number: "2.3",
          text: '"Confidential Information" includes Intellectual Property, confidential technical and commercial information including but not limited to the nature, location and capabilities of the Principal and its Customers, pricing structures, operating procedures, Suspicious Transaction Reports, Threshold Transaction Reports, methods and strategies, run sheets, banking details of the Principal and its Customers, completed deposit slips, the contents of documents, filmed or recorded footage, images, records, customer lists, and business marketing plans and strategies any commercially or personally sensitive information including, without limitation, the contact details of the clients.'
        },
        {
          number: "2.4",
          text: '"Customer" means any entity that has entered into an agreement with the Principal for the provision of goods or Services;'
        },
        {
          number: "2.5",
          text: '"equipment" means the equipment set out in annexure 2 to this agreement;'
        },
        {
          number: "2.6",
          text: '"intellectual property" means all confidential information and forms of intellectual or industrial property rights including, but not limited to, rights in relation to the principal\'s information, drawings (and three dimensional reproductions of drawings), literary works, inventions, discoveries, designs, signs, and rights to or arising from computer programs, patents, copyright, trademarks, and all rights of similar kind anywhere in the world and rights to registration and protection of such rights.'
        },
        {
          number: "2.7",
          text: '"nominated employee" has the same meaning as given by clause 5.'
        },
        {
          number: "2.8",
          text: '"services" means the services contained in annexure 1 and any relevant services as contained in the standard operating procedures.'
        },
        {
          number: "2.9",
          text: '"standard operating procedures" means the company\'s standard operating procedures as to be determined by the company from time to time.'
        },
        {
          number: "2.10",
          text: '"suspicious transaction reports" has the meaning given by the acts. 2.11 "threshold transaction reports" has the meaning given by the acts.'
        },
        {
          number: "2.11",
          text: '"trade secret" means a formula, practice, process, design, instrument, pattern, or compilation of information which is not generally known or reasonably ascertainable, by which the principal can obtain an economic advantage over competitors or customers.'
        }
      ]
    },
    servicesDescription: {
      title: "3 Description of Services",
      items: [
        {
          number: "3.1",
          text: "It is agreed by both parties that the Contractor shall perform the Services has full control on how these Services will be performed subject to it meeting the standards required by the Principal as set out in Annexure 1 and in the Standard Operating Procedures."
        },
        {
          number: "3.2",
          text: 'The Principal is the holder of a licence for Intellectual Property and, with the consent of the Licensor, agrees to provide to the Contractor a non-exclusive sub-licence, subject to the terms of this Agreement, for use of the business name "Secure Cash" and other Intellectual Property as may be necessary for the performance of Services, for the term of this Agreement and at the absolute discretion of the Principal.'
        },
        {
          number: "3.3",
          text: "Neither the Contractor, nor the Contractor's Assistants or Nominated Employee shall receive any training from the Principal in the professional skills necessary to perform the Services required by this Agreement."
        },
        {
          number: "3.4",
          text: "The Contractor warrants that it is not violating any other agreement by performing these Services."
        },
        {
          number: "3.5",
          text: "The Contractor agrees that (subject to the ability of the Services to be corrected) Services which are not reasonably fit for the purpose for which such services would ordinarily be acquired will be corrected. The parties agree that the Contractor will have at least one opportunity to re-perform Services, should any Services not meet the standards required by the Principal, within a specified time limit at no cost to the Principal."
        },
        {
          number: "3.6",
          text: "In the event that any aspect of the Services are not reasonably fit for the purpose for which such services would ordinarily be acquired and that aspect of the Services cannot be re-performed or corrected, the Principal has the right to withhold all or part of the Payment for that Service."
        },
        {
          number: "3.7",
          text: "The Contractor warrants that no laws will be violated in performing any Services in particular in regards to the carrying of weapons and the compliance with the Acts and any other applicable legislation."
        },
        {
          number: "3.8",
          text: "The Contractor warrants that any Nominated Employee(s) and Assistants have the right to work in Australia."
        },
        {
          number: "3.9",
          text: "The Contractor guarantees that they together with any Assistants and Nominated Employee(s) are competent to carry out the Services which it has undertaken in this Agreement and has complied with all Federal, State and local laws requiring business permits, certificates, and licences required to carry out the Services performed under this agreement. Any material misrepresentation shall lead to summary termination of this agreement without Payment."
        },
        {
          number: "3.10",
          text: "The Contractor shall perform these Services at the addresses notified to the Contractor by the Principal during the term of this Agreement."
        }
      ]
    },
    payment: {
      title: "4 Payment",
      items: [
        {
          number: "4.1",
          text: "The Contractor will be paid on the following basis:"
        },
        {
          number: "4.1.1",
          text: "The Principal agrees to pay the Contractor on presentation of a tax invoice for performing the Services. Each particular job shall be a separate contract for the term of the job."
        },
        {
          number: "4.1.2",
          text: "The Contractor warrants that it will be registered for GST at all times during the term of this Agreement."
        }
      ]
    },
    assistants: {
      title: "5 Assistants",
      items: [
        {
          number: "5.1",
          text: "Should the Contractor employ or sub-contract assistants to perform the Services in Annexure 1, the Contractor warrants that such Assistants or Nominated Employee(s) will comply with each of the provisions in this agreement including but not limited to: (i) the obligation to be properly licensed; (ii) confidentiality; (iii) ownership of works; and (iv) obligations to indemnify the Principal, as if such Assistants were parties to this agreement in place of the Contractor."
        }
      ]
    },
    remuneration: {
      title: "6 Remuneration",
      items: [
        {
          number: "6.1",
          text: "Remuneration for Assistants or Nominated Employee(s) of the Contractor to perform the Services under this agreement must be paid by the Contractor together with all applicable insurances including Worker's Compensation Insurance."
        },
        {
          number: "6.2",
          text: "The Principal agrees that all directives or instructions to Assistants or Nominated Employee(s) will be communicated through the Contractor."
        },
        {
          number: "6.3",
          text: "The Contractor will be liable for the work performed by any Assistants or Nominated Employee(s) and agrees to indemnify the Principal for any loss that the Principal may suffer as a result of the actions of any Assistants or Nominated Employee(s) hired by the Contractor."
        }
      ]
    },
    confidentiality: {
      title: "7 Confidentiality",
      items: [
        {
          number: "7.1",
          text: "The Contractor acknowledges that during the relationship with the Principal, the Contractor may become familiar with its Confidential Information including Trade Secrets relating to the Principal and/or its Customers. The Contractor agrees that during the period of performing Services and subsequent thereto, the Contractor will not disclose to others or make use of directly or indirectly, any Confidential Information of the Principal or Confidential Information of a Client of the Principal or of others who have disclosed it to the Principal under conditions of confidentiality, unless for a purpose authorised by the Principal. If there is any doubt about whether any disclosure or use is for an authorised purpose, the Contractor is to obtain a ruling in writing from the Principal and is to abide by it."
        },
        {
          number: "7.2",
          text: "The Contractor shall take reasonable security precautions to keep confidential all information deemed confidential and shall not make unauthorised copies. The Contractor further undertakes to notify the Principal immediately upon discovery of any unauthorised use or disclosure of confidential material and shall assist the Principal in regaining of such material and mitigating the loss to the Principal from such disclosure."
        },
        {
          number: "7.3",
          text: "The Contractor is required to deliver to the Principal whenever required to do so or in any event when terminating the relationship with the Principal, all footage, images, records, correspondence, notes, computer disks, identification and the like concerning or containing any reference to the business of the Principal or the Principal's clients."
        }
      ]
    },
    competition: {
      title: "8 Competition",
      items: [
        {
          number: "8.1",
          text: "Other than for the benefit of the Principal, the Contractor and/or the Nominated Employee(s) or Assistants will not:"
        },
        {
          number: "8.1.1",
          text: "during the term of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting or servicing of the Clients."
        },
        {
          number: "8.1.2",
          text: "for a period of twelve (12) months from the date of termination of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting, interfering with so as to entice away from the Principal, the Customer and/or the servicing of the Customer."
        },
        {
          number: "8.1.3",
          text: "for a period of twelve (12) months from the date of termination of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting, interfering with so as to entice away from the Principal any person or company on the customer lists of the Principal."
        },
        {
          number: "8.2",
          text: "In the event of breach of this Agreement by the Contractor and/or the Assistants or Nominated Employee(s); the Contractor and/or the Assistants or Nominated Employee(s) hereby agree to compensate the Principal or any of its associated companies for any loss or damages arising from the breach of this Agreement and any costs and expenses incurred by the Principal in enforcing the terms of this Agreement."
        }
      ]
    },
    ownershipOfWork: {
      title: "9 Ownership of Work",
      items: [
        {
          number: "9.1",
          text: "Any Trade Secrets, images, documents or records or creations including but not limited to written instructions, drawings, photographs, computer programs, notes or memoranda relating to the business of the Principal, which are made by the Contractor or which come into the Contractor's possession while it is engaged by the Principal to perform Services, shall be deemed the property of the Principal and shall be surrendered to the Principal on demand and, in any event, on the date of termination of this agreement the Contractor will not retain any copies thereof or any extracts there from."
        },
        {
          number: "9.2",
          text: "The Contractor does hereby assign to the Principal the total right, title and interest in and to any copyright in any existing or future works or part thereof of whatsoever nature that the Contractor, individually or jointly with any other person(s) has made or created or will make or will create during the course and scope of this agreement and the performing of Services by the Contractor for the Principal."
        }
      ]
    },
    obligations: {
      title: "10 Obligations of the Contractor",
      items: [
        {
          number: "10.1",
          text: "The Contractor agrees to take full responsibility for any insurances and declaration of income for tax purposes and for the payment thereof. In particular:"
        },
        {
          number: "10.1.1",
          text: "In the event that the Contractor employs any person to assist in performing the Services, the Contractor must obtain Workers Compensation Insurance and observe its legal obligations under the relevant worker's compensation insurance legislation;"
        },
        {
          number: "10.1.2",
          text: "In any event Public Liability Insurance."
        },
        {
          number: "10.2",
          text: "The Contractor shall be legally and financially liable to pay any fines, infringements, notices or permits incurred in the performance of the Services."
        },
        {
          number: "10.3",
          text: "The Contractor or the Nominated Employee(s) or Assistants must not wear a uniform of any description, nor carry a firearm or any other weapon."
        },
        {
          number: "10.4",
          text: "The Contractor shall supply all licences, permits, Equipment or tools or instruments needed to perform the Services under this agreement including:"
        },
        {
          number: "10.4.1",
          text: "Current Australian Business Number (ABN);"
        },
        {
          number: "10.4.2",
          text: "Current Australian Driver's Licence;"
        },
        {
          number: "10.4.3",
          text: "Any Equipment as set out in Annexure 2 to this Agreement; and"
        },
        {
          number: "10.4.4",
          text: "Any equipment as proscribed by the Company's Standard Operating Procedures or as may be necessary to perform the Services."
        },
        {
          number: "10.5",
          text: "In the event that equipment or tools are leased by the Contractor from the Principal, the Contractor agrees to assume all liability in the event that the equipment or tools are not returned to the Principal in the same condition as they were leased, fair wear and tear excepted. The Contractor agrees to indemnify the Principal for cost of damaged tools or equipment or replacement cost. The Principal reserves the right to deduct the cost of such repair or replacement of equipment or tools from the Payment to the Contractor after 7 days notice of the cost to the Principal of the repair or replacement has been given to the Contractor."
        },
        {
          number: "10.6",
          text: "The Principal and Contractor agree that this agreement in no way limits restricts or prevents the Contractor from performing services the same as or similar to the Services other than for the Principal. However, during the term of this Agreement, the Contractor will not provide Services to any other person without first providing to the Principal 14 days notice in writing."
        },
        {
          number: "10.7",
          text: "The Contractor must observe its legal obligations under the Acts and any other relevant legislation or policies as determined by the Australian Transaction Reports and Analysis Centre (AUSTRAC), in particular in regards to the submission of:"
        },
        {
          number: "10.7.1",
          text: "Threshold Transaction Reports; and"
        },
        {
          number: "10.7.2",
          text: "Suspicious Matter Reports."
        },
        {
          number: "10.8",
          text: "If a conflict of interest arises in respect of the Contractor, the Contractor must: (i) promptly notify the Principal and any relevant parties that the conflict has arisen and provide full details; and (ii) take reasonable steps in consultation with the Principal and any relevant parties to resolve the conflict."
        },
        {
          number: "10.9",
          text: "If the Contractor becomes aware of any matter likely to change the scope or timing of Services, then the Contractor will promptly advise the Principal."
        },
        {
          number: "10.10",
          text: "The Contractor must not act outside the scope of the authority conferred on it by this Agreement and must not bind the Principal in any way or hold itself out as having any authority to do so, except where pursuant to the terms of this Agreement. Specifically, the Contractor must not enter into any contract or transaction or make or accept any offer on behalf of the Principal except with the written authority of the Principal given after the date of this Agreement."
        },
        {
          number: "10.11",
          text: "The Contractor shall indemnify and hold the Principal harmless from any loss or liability arising from any acts or omissions of the Contractor or the Contractor's sub-contractors or Assistants or Nominated Employee(s) in performing the Services under this agreement. The Indemnity is attributable to all liability whether 'direct or indirect' arising out of the performance of the Contractor, sub-contractor, Nominated Employee(s) or Assistants of the Contractor. For the avoidance of doubt, this indemnity applies to loss or liability arising from acts or omissions of the Contractor's, sub-contractor, Nominated Employee(s) or Assistants 'irrespective of whether the Contractor's acts or omissions may have caused or contributed to the damage, loss, injury, death or claim'."
        }
      ]
    },
    renewalTermination: {
      title: "11 Renewal and Termination",
      items: [
        {
          number: "11.2",
          text: "The Contractor agrees to take full responsibility for any insurances and declaration of income for tax purposes and for the payment thereof. In particular:"
        },
        {
          number: "11.2.1",
          text: "In the event that the Contractor employs any person to assist in performing the Services, the Contractor must obtain Workers Compensation Insurance and observe its legal obligations under the relevant worker's compensation insurance legislation;"
        },
        {
          number: "11.2.2",
          text: "In any event Public Liability Insurance."
        },
        {
          number: "11.2.3",
          text: "The Contractor shall be legally and financially liable to pay any fines, infringements, notices or permits incurred in the performance of the Services."
        },
        {
          number: "11.2.4",
          text: "The Contractor or the Nominated Employee(s) or Assistants must not wear a uniform of any description, nor carry a firearm or any other weapon."
        },
        {
          number: "11.2.5",
          text: "The Contractor shall supply all licences, permits, Equipment or tools or instruments needed to perform the Services under this agreement including:"
        },
        {
          number: "11.2.6",
          text: "Current Australian Business Number (ABN);"
        },
        {
          number: "11.2.7",
          text: "Current Australian Driver's Licence;"
        },
        {
          number: "11.3",
          text: "Any Equipment as set out in Annexure 2 to this Agreement; and"
        },
        {
          number: "11.4",
          text: "Any equipment as proscribed by the Company's Standard Operating Procedures or as may be necessary to perform the Services."
        },
        {
          number: "11.5",
          text: "In the event that equipment or tools are leased by the Contractor from the Principal, the Contractor agrees to assume all liability in the event that the equipment or tools are not returned to the Principal in the same condition as they were leased, fair wear and tear excepted. The Contractor agrees to indemnify the Principal for cost of damaged tools or equipment or replacement cost. The Principal reserves the right to deduct the cost of such repair or replacement of equipment or tools from the Payment to the Contractor after 7 days notice of the cost to the Principal of the repair or replacement has been given to the Contractor."
        }
      ]
    },
    general: {
      title: "12 General",
      items: [
        {
          number: "12.1",
          text: "This agreement and any annexure attached constitute the sole and entire agreement between the parties with regard to the subject matter hereof and the parties waive the right to rely on any alleged express provision not contained herein."
        },
        {
          number: "12.2",
          text: "No party may rely on any representation, which allegedly induced that party to enter into this agreement, unless the representation is recorded herein."
        },
        {
          number: "12.3",
          text: "No agreement varying, adding to, deleting from or cancelling this agreement and no waiver of any right under this agreement shall be effective unless it is:"
        },
        {
          number: "12.3.1",
          text: "In writing;"
        },
        {
          number: "12.3.2",
          text: "Agreed to by both parties; or"
        },
        {
          number: "12.3.3",
          text: "Signed by both parties."
        },
        {
          number: "12.4",
          text: "Written notice by either party to the other may be given:"
        },
        {
          number: "12.4.1",
          text: "In person, and such notice shall be deemed valid on the date of delivery in person."
        },
        {
          number: "12.4.2",
          text: "By registered mail, and such notice shall be deemed valid as of seven days of the proof of mailing date."
        },
        {
          number: "12.4.3",
          text: "By electronic mail or facsimile which are deemed to have been received on the day that they are sent provided there is proof of sending."
        },
        {
          number: "12.5",
          text: "No relaxation by a party of any of its rights in terms of this agreement at any time shall prejudice or be a waiver of its rights (unless it is a written waiver) and it shall be entitled to exercise its rights hereafter as if such relaxation had not taken place."
        },
        {
          number: "12.6",
          text: "Except as provided for elsewhere in this Agreement, the Contractor may not transfer or assign any of its rights or delegate any of its obligations in terms of this agreement without the prior written consent of the Principal."
        },
        {
          number: "12.7",
          text: "Unless inconsistent with the context, words signifying any one gender shall include the others, words signifying the singular shall include the plural and vice versa and words signifying natural persons shall include artificial persons and vice versa."
        },
        {
          number: "12.8",
          text: "A reference in this Agreement to any statute is a reference to that statute as amended or replaced from time to time."
        },
        {
          number: "12.9",
          text: "Should any provision of this agreement be judged by an appropriate court of law as invalid, it shall not affect any of the remaining provisions whatsoever."
        },
        {
          number: "12.10",
          text: "This Agreement will be governed by the laws of South Australia and the parties submit to the courts in this jurisdiction."
        }
      ]
    },
    annexureData: {
      annexure1: {
        title: "ANNEXURE 1 - Services",
        items: [
          {
            number: "",
            text: "The Contractor is responsible for the provision of the courier services of banking from clients of Principal and Its referrers to financial institutions."
          },
          {
            number: "",
            text: "The Principal will offer the Contractor jobs/clients/referrals, and will advise how frequently the client/job be attended to (e.g. weekly, fortnightly)."
          },
          {
            number: "",
            text: "The Contractor will provide client/job updates when requested by the Principal."
          },
          {
            number: "",
            text: "The Contractor will ensure timely and accurate documentation and maintenance of Customer records/files."
          },
          {
            number: "",
            text: "The Contractor will ensure that they obtain adequate proof of delivery in regards to each and every satchel and/or item that is delivered and handed over to either the receiving bank teller or for deposit or nominated person for receipt of the delivery by obtaining;"
          },
          {
            number: "1.",
            text: "A bank stamp and signature combination from the receiving bank teller is cash is being delivered to a bank; or"
          },
          {
            number: "2.",
            text: "A signature from the receiving individual if the delivery is cash or an item."
          },
          {
            number: "3.",
            text: "A GPS Date/Time Stamp on a video showing the satchel/s being deposited along with the satchel/s serial number."
          },
          {
            number: "4.",
            text: "If the Contractor is delivering cash or an item to an individual, the Contractor must sight and take a photograph of relevant photographic identification that matches with the signature recorded on the run sheet of the client."
          },
          {
            number: "",
            text: "The Contractor will comply with the Principal's welfare check procedures (if applicable). The Contractor will ensure that any Nominated Employee(s) or Assistants will carry identification as issued by the Principal at all times."
          },
          {
            number: "",
            text: "The Contractor will report any breaches of security."
          },
          {
            number: "",
            text: "The Contractor will ensure the health and safety of themselves, the Client and others is upheld at all times, in accordance with the requirements of the occupational health and safety legislation of the relevant State."
          },
          {
            number: "",
            text: "The Contractor does not breach this agreement by failing to perform the services set out in this annexure if the Contractor reasonably believes that those services cannot be carried out without breaching the requirements of the occupational health and safety legislation of the relevant State."
          },
          {
            number: "",
            text: "Confidentiality; The Contractor will ensure Client and business confidentiality at all times."
          },
          {
            number: "",
            text: "The Contractor and the Nominated Employee(s) or Assistants will keep Confidential Information concealed from all third parties, including but not limited to bank tellers, other clients and friends and family."
          },
          {
            number: "",
            text: "Safety; The Contractor will ensure the health and safety of themselves, the Client and others is upheld at all times, in accordance with the requirements of the relevant State regulations that the services are being performed."
          },
          {
            number: "",
            text: "The Contractor does not breach this agreement by failing to perform the services set out in this annexure if the Contractor reasonably believes that those services cannot be carried out without breaching the requirements of the relevant State regulations that the services are being performed."
          },
          {
            number: "",
            text: "The Contractor will not interact with the public unless required to do so as part of the performance of the Services."
          }
        ]
      },
      annexure2: {
        title: "ANNEXURE 2 – Equipment",
        items: [
          {
            number: "",
            text: "A working and connected smart phone with a vehicle charger;"
          },
          {
            number: "",
            text: "A bag with no bright colours, logo or insignia and suitable for performing the Services;"
          },
          {
            number: "",
            text: "A Vehicle meeting the following requirements:"
          },
          {
            number: "1.",
            text: "Be no older than 15 years;"
          },
          {
            number: "2.",
            text: "Not have any loud or offensive logos or insignia of any type (Excluding Security insignia or Security markings);"
          },
          {
            number: "3.",
            text: "Not have any distinguishable features that will make the vehicle stand out in public; and"
          },
          {
            number: "4.",
            text: "Must have a working security alarm fitted at all times."
          }
        ]
      }
    }
  };


  //Deed of Guarantee Section
  const deedOfGuaranteeData = {
    opening: {
      title: "",
      items: [
        {
          number: "1.1",
          text: "The Contractor will at all times so long as it is in the Beneficiary's service and engaged by the Beneficiary, honestly diligently and faithfully fulfil such duties as the Beneficiary may reasonably call upon and require it as engaged to perform."
        },
        {
          number: "1.2",
          text: "The Guarantor will indemnify the Beneficiary (within the limits mentioned in this guarantee) against all losses, charges, damages and expenses which the Beneficiary may sustain and incur by reason of any breach of Duty and or negligence and or misconduct (criminal or otherwise) on the part of the Contractor."
        },
        {
          number: "1.3",
          text: "This guarantee is a continuing guarantee up to but not exceeding the greater of the sum of one million dollars (AUD$1,000,000) or the proceeds of any insurance paid out on an claim by the Contractor's insurer in respect of any breach of any Duty and or negligence and or misconduct (criminal or otherwise) on the part of the Contractor and within those limits will apply to and cover the whole sum that will ultimately be due to the Guarantor from the Contractor or that the Beneficiary will lose and or suffer damage by reason of Contractor's breach of any Duty and or negligence and or misconduct and not merely to so much of the sum as is co-extensive with the limits of the Guarantor's liability."
        },
        {
          number: "1.4",
          text: "The Beneficiary may (without discharging or impairing the Guarantor's liability under this guarantee) treat and deal with the Guarantor on all occasions and in all respects as though the Guarantor is jointly liable to the Beneficiary with the Contractor and not merely as a guarantor."
        },
        {
          number: "1.5",
          text: "No failure to exercise and no delay in exercising, on the part of the Beneficiary, any right or remedy under this guarantee will operate as a waiver. No single or partial exercise of any right or remedy will preclude any other or further exercise of that or any other right or remedy. The rights and remedies provided to the Beneficiary in this guarantee are cumulative and are not exclusive of any rights or remedies provided by law."
        },
        {
          number: "1.6",
          text: "This guarantee is, at the option of the Guarantor, revocable at any time as to future transactions by six month's notice in writing given to the Beneficiary by the Guarantor."
        }
      ]
    },
    interpretation: {
      title: "2 Interpretation",
      items: [
        {
          number: "2.1",
          text: '"Acts" means the Financial Transactions Act 1988 and the Anti-Money Laundering and Counter-Terrorism Financing Act 2006.'
        },
        {
          number: "2.2",
          text: '"Assistant" has the same meaning as given by clause 5.'
        },
        {
          number: "2.3",
          text: '"Confidential Information" includes Intellectual Property, confidential technical and commercial information including but not limited to the nature, location and capabilities of the Principal and its Customers, pricing structures, operating procedures, Suspicious Transaction Reports, Threshold Transaction Reports, methods and strategies, run sheets, banking details of the Principal and its Customers, completed deposit slips, the contents of documents, filmed or recorded footage, images, records, customer lists, and business marketing plans and strategies any commercially or personally sensitive information including, without limitation, the contact details of the clients.'
        },
        {
          number: "2.4",
          text: '"Customer" means any entity that has entered into an agreement with the Principal for the provision of goods or Services;'
        },
        {
          number: "2.5",
          text: '"Equipment" means the equipment set out in Annexure 2 to this Agreement;'
        },
        {
          number: "2.6",
          text: '"Intellectual Property" means all Confidential Information and forms of intellectual or industrial property rights including, but not limited to, rights in relation to the Principal\'s information, drawings (and three dimensional reproductions of drawings), literary works, inventions, discoveries, designs, signs, and rights to or arising from computer programs, patents, copyright, trademarks, and all rights of similar kind anywhere in the world and rights to registration and protection of such rights.'
        },
        {
          number: "2.7",
          text: '"Nominated Employee" has the same meaning as given by clause 5.'
        },
        {
          number: "2.8",
          text: '"Services" means the services contained in Annexure 1 and any relevant services as contained in the Standard Operating Procedures.'
        },
        {
          number: "2.9",
          text: '"Standard Operating Procedures" means the Company\'s standard operating procedures as to be determined by the Company from time to time.'
        },
        {
          number: "2.10",
          text: '"Suspicious Transaction Reports" has the meaning given by the Acts.'
        },
        {
          number: "2.11",
          text: '"Threshold Transaction Reports" has the meaning given by the Acts.'
        },
        {
          number: "2.12",
          text: '"Trade Secret" means a formula, practice, process, design, instrument, pattern, or compilation of information which is not generally known or reasonably ascertainable, by which the Principal can obtain an economic advantage over competitors or customers.'
        }
      ]
    },
    servicesDescription: {
      title: "3 Description of Services",
      items: [
        {
          number: "3.1",
          text: "It is agreed by both parties that the Contractor shall perform the Services has full control on how these Services will be performed subject to it meeting the standards required by the Principal as set out in Annexure 1 and in the Standard Operating Procedures."
        },
        {
          number: "3.2",
          text: 'The Principal is the holder of a licence for Intellectual Property and, with the consent of the Licensor, agrees to provide to the Contractor a non-exclusive sub-licence, subject to the terms of this Agreement, for use of the business name "Secure Cash" and other Intellectual Property as may be necessary for the performance of Services, for the term of this Agreement and at the absolute discretion of the Principal.'
        },
        {
          number: "3.3",
          text: "Neither the Contractor, nor the Contractor's Assistants or Nominated Employee shall receive any training from the Principal in the professional skills necessary to perform the Services required by this Agreement."
        },
        {
          number: "3.4",
          text: "The Contractor warrants that it is not violating any other agreement by performing these Services."
        },
        {
          number: "3.5",
          text: "The Contractor agrees that (subject to the ability of the Services to be corrected) Services which are not reasonably fit for the purpose for which such services would ordinarily be acquired will be corrected. The parties agree that the Contractor will have at least one opportunity to re-perform Services, should any Services not meet the standards required by the Principal, within a specified time limit at no cost to the Principal."
        },
        {
          number: "3.6",
          text: "In the event that any aspect of the Services are not reasonably fit for the purpose for which such services would ordinarily be acquired and that aspect of the Services cannot be re-performed or corrected, the Principal has the right to withhold all or part of the Payment for that Service."
        },
        {
          number: "3.7",
          text: "The Contractor warrants that no laws will be violated in performing any Services in particular in regards to the carrying of weapons and the compliance with the Acts and any other applicable legislation."
        },
        {
          number: "3.8",
          text: "The Contractor warrants that any Nominated Employee(s) and Assistants have the right to work in Australia."
        },
        {
          number: "3.9",
          text: "The Contractor guarantees that they together with any Assistants and Nominated Employee(s) are competent to carry out the Services which it has undertaken in this Agreement and has complied with all Federal, State and local laws requiring business permits, certificates, and licences required to carry out the Services performed under this agreement. Any material misrepresentation shall lead to summary termination of this agreement without Payment."
        },
        {
          number: "3.10",
          text: "The Contractor shall perform these Services at the addresses notified to the Contractor by the Principal during the term of this Agreement."
        }
      ]
    },
    payment: {
      title: "4 Payment",
      items: [
        {
          number: "",
          text: "The Contractor will be paid on the following basis:"
        },
        {
          number: "4.1",
          text: "The Principal agrees to pay the Contractor on presentation of a tax invoice for performing the Services. Each particular job shall be a separate contract for the term of the job."
        },
        {
          number: "4.2",
          text: "The Contractor warrants that it will be registered for GST at all times during the term of this Agreement."
        }
      ]
    },
    assistants: {
      title: "5 Assistants",
      items: [
        {
          number: "5.1",
          text: "Should the Contractor employ or sub-contract assistants to perform the Services in Annexure 1, the Contractor warrants that such Assistants or Nominated Employee(s) will comply with each of the provisions in this agreement including but not limited to: (i) the obligation to be properly licensed; (ii) confidentiality; (iii) ownership of works; and (iv) obligations to indemnify the Principal, as if such Assistants were parties to this agreement in place of the Contractor."
        }
      ]
    },
    remuneration: {
      title: "6 Remuneration",
      items: [
        {
          number: "6.1",
          text: "Remuneration for Assistants or Nominated Employee(s) of the Contractor to perform the Services under this agreement must be paid by the Contractor together with all applicable insurances including Worker's Compensation Insurance."
        },
        {
          number: "6.2",
          text: "The Principal agrees that all directives or instructions to Assistants or Nominated Employee(s) will be communicated through the Contractor."
        },
        {
          number: "6.3",
          text: "The Contractor will be liable for the work performed by any Assistants or Nominated Employee(s) and agrees to indemnify the Principal for any loss that the Principal may suffer as a result of the actions of any Assistants or Nominated Employee(s) hired by the Contractor."
        }
      ]
    },
    confidentiality: {
      title: "7 Confidentiality",
      items: [
        {
          number: "7.1",
          text: "The Contractor acknowledges that during the relationship with the Principal, the Contractor may become familiar with its Confidential Information including Trade Secrets relating to the Principal and/or its Customers. The Contractor agrees that during the period of performing Services and subsequent thereto, the Contractor will not disclose to others or make use of directly or indirectly, any Confidential Information of the Principal or Confidential Information of a Client of the Principal or of others who have disclosed it to the Principal under conditions of confidentiality, unless for a purpose authorised by the Principal. If there is any doubt about whether any disclosure or use is for an authorised purpose, the Contractor is to obtain a ruling in writing from the Principal and is to abide by it."
        },
        {
          number: "7.2",
          text: "The Contractor shall take reasonable security precautions to keep confidential all information deemed confidential and shall not make unauthorised copies. The Contractor further undertakes to notify the Principal immediately upon discovery of any unauthorised use or disclosure of confidential material and shall assist the Principal in regaining of such material and mitigating the loss to the Principal from such disclosure."
        },
        {
          number: "7.3",
          text: "The Contractor is required to deliver to the Principal whenever required to do so or in any event when terminating the relationship with the Principal, all footage, images, records, correspondence, notes, computer disks, identification and the like concerning or containing any reference to the business of the Principal or the Principal's clients."
        }
      ]
    },
    competition: {
      title: "8 Competition",
      items: [
        {
          number: "8.1",
          text: "Other than for the benefit of the Principal, the Contractor and/or the Nominated Employee(s) or Assistants will not:"
        },
        {
          number: "8.1.1",
          text: "during the term of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting or servicing of the Clients"
        },
        {
          number: "8.1.2",
          text: "for a period of twelve (12) months from the date of termination of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting, interfering with so as to entice away from the Principal, the Customer and/or the servicing of the Customer."
        },
        {
          number: "8.1.3",
          text: "for a period of twelve (12) months from the date of termination of this Agreement assist or be engaged or involved in, or contribute in any material way to the targeting, soliciting, interfering with so as to entice away from the Principal any person or company on the customer lists of the Principal."
        },
        {
          number: "8.2",
          text: "In the event of breach of this Agreement by the Contractor and/or the Assistants or Nominated Employee(s); the Contractor and/or the Assistants or Nominated Employee(s) hereby agree to compensate the Principal or any of its associated companies for any loss or damages arising from the breach of this Agreement and any costs and expenses incurred by the Principal in enforcing the terms of this Agreement."
        }
      ]
    },
    ownershipOfWork: {
      title: "9 Ownership of Work",
      items: [
        {
          number: "9.1",
          text: "Any Trade Secrets, images, documents or records or creations including but not limited to written instructions, drawings, photographs, computer programs, notes or memoranda relating to the business of the Principal, which are made by the Contractor or which come into the Contractor's possession while it is engaged by the Principal to perform Services, shall be deemed the property of the Principal and shall be surrendered to the Principal on demand and, in any event, on the date of termination of this agreement the Contractor will not retain any copies thereof or any extracts there from."
        },
        {
          number: "9.2",
          text: "The Contractor does hereby assign to the Principal the total right, title and interest in and to any copyright in any existing or future works or part thereof of whatsoever nature that the Contractor, individually or jointly with any other person(s) has made or created or will make or will create during the course and scope of this agreement and the performing of Services by the Contractor for the Principal."
        }
      ]
    },
    obligations: {
      title: "10 Obligations of the Contractor",
      items: [
        {
          number: "10.1",
          text: "The Contractor agrees to take full responsibility for any insurances and declaration of income for tax purposes and for the payment thereof. In particular:"
        },
        {
          number: "10.1.1",
          text: "In the event that the Contractor employs any person to assist in performing the Services, the Contractor must obtain Workers Compensation Insurance and observe its legal obligations under the relevant worker's compensation insurance legislation;"
        },
        {
          number: "10.1.2",
          text: "In any event Public Liability Insurance that includes the use of a baton if used to perform the Services; and"
        },
        {
          number: "10.1.3",
          text: "Cash in Transit or Security Guard's Liability insurance;"
        },
        {
          number: "10.1.4",
          text: "Money on Premises insurance up to the value of at least $50,000.00; and"
        },
        {
          number: "10.1.5",
          text: "Care, Custody and Control Insurance up to the value of at least $100,000.00; On request, the Contractor shall furnish to the Principal certificates of currency for all insurance required by the Contractor pursuant to clause 10.1 herein."
        },
        {
          number: "10.2",
          text: "The Contractor shall be legally and financially liable to pay any fines, infringements, notices or permits incurred in the performance of the Services."
        },
        {
          number: "10.3",
          text: "The Contractor or the Nominated Employee(s) or Assistants must not carry a firearm or any other weapon (excluding a baton if permitted by the relevant state's legislation) unless permitted to do so by the Principal."
        },
        {
          number: "10.4",
          text: "The Contractor shall supply all licences, permits, Equipment or tools or instruments needed to perform the Services under this agreement including:"
        },
        {
          number: "10.4.1",
          text: "Current Australian Business Number (ABN);"
        },
        {
          number: "10.4.2",
          text: "Current Australian Driver's Licence;"
        },
        {
          number: "10.4.3",
          text: "Relevant security licence including any required cash in transit endorsement;"
        },
        {
          number: "10.4.4",
          text: "The Equipment as set out in Annexure 2 to this Agreement; and"
        },
        {
          number: "10.4.5",
          text: "Any other equipment as proscribed by the Company's Standard Operating Procedures or as may be necessary to perform the Services."
        },
        {
          number: "10.5",
          text: "In the event that equipment or tools are leased by the Contractor from the Principal, the Contractor agrees to assume all liability in the event that the equipment or tools are not returned to the Principal in the same condition as they were leased, fair wear and tear excepted. The Contractor agrees to indemnify the Principal for cost of damaged tools or equipment or replacement cost. The Principal reserves the right to deduct the cost of such repair or replacement of equipment or tools from the Payment to the Contractor after 7 days notice of the cost to the Principal of the repair or replacement has been given to the Contractor."
        },
        {
          number: "10.6",
          text: "The Principal and Contractor agree that this agreement in no way limits restricts or prevents the Contractor from performing services the same as or similar to the Services other than for the Principal. However, during the term of this Agreement, the Contractor will not provide Services to any other person without first providing to the Principal 14 days notice in writing."
        },
        {
          number: "10.7",
          text: "The Contractor must observe its legal obligations under the Acts and any other relevant legislation or policies as determined by the Australian Transaction Reports and Analysis Centre (AUSTRAC), in particular in regards to the submission of:"
        },
        {
          number: "10.7.1",
          text: "Threshold Transaction Reports; and"
        },
        {
          number: "10.7.2",
          text: "Suspicious Matter Reports."
        },
        {
          number: "10.8",
          text: "If a conflict of interest arises in respect of the Contractor, the Contractor must: (i) promptly notify the Principal and any relevant parties that the conflict has arisen and provide full details; and (ii) take reasonable steps in consultation with the Principal and any relevant parties to resolve the conflict."
        },
        {
          number: "10.9",
          text: "If the Contractor becomes aware of any matter likely to change the scope or timing of Services, then the Contractor will promptly advise the Principal."
        },
        {
          number: "10.10",
          text: "The Contractor must not act outside the scope of the authority conferred on it by this Agreement and must not bind the Principal in any way or hold itself out as having any authority to do so, except where pursuant to the terms of this Agreement. Specifically, the Contractor must not enter into any contract or transaction or make or accept any offer on behalf of the Principal except with the written authority of the Principal given after the date of this Agreement."
        },
        {
          number: "10.11",
          text: "The Contractor shall indemnify and hold the Principal harmless from any loss or liability arising from any acts or omissions of the Contractor or the Contractor's sub-contractors or Assistants or Nominated Employee(s) in performing the Services under this agreement. The Indemnity is attributable to all liability whether 'direct or indirect' arising out of the performance of the Contractor, sub-contractor, Nominated Employee(s) or Assistants of the Contractor. For the avoidance of doubt, this indemnity applies to loss or liability arising from acts or omissions of the Contractor's, sub-contractor, Nominated Employee(s) or Assistants 'irrespective of whether the Contractor's acts or omissions may have caused or contributed to the damage, loss, injury, death or claim'."
        }
      ]
    },
    renewalTermination: {
      title: "11 Renewal and Termination",
      items: [
        {
          number: "11.2",
          text: "Either party may terminate this contract in writing without notice in the following instances:"
        },
        {
          number: "11.2.1",
          text: "If either party is convicted of a criminal offence."
        },
        {
          number: "11.2.2",
          text: "Failure by the Contractor to meet deadlines for performance of Services or failing to meet the standards required by the Principal in the performing of the Services."
        },
        {
          number: "11.2.3",
          text: "Insolvency or bankruptcy of either party."
        },
        {
          number: "11.2.4",
          text: "In the event that the project for which the Services are required is cancelled or does not eventuate."
        },
        {
          number: "11.2.5",
          text: "In the event that the Contractor is found to be performing Services under the influence of drugs or alcohol."
        },
        {
          number: "11.2.6",
          text: "In the event of failure by the Principal to comply with its payment obligations in clause 4 above."
        },
        {
          number: "11.2.7",
          text: "By mutual agreement in writing."
        },
        {
          number: "11.3",
          text: "Termination by the Principal will not release the Contractor from liability in respect of any past breach, or non-performance of any previously accrued obligation required of the Contractor pursuant to this Agreement."
        },
        {
          number: "11.4",
          text: "Unless otherwise stated in this agreement, termination will not release the Principal of its obligations to pay the Contractor for Services already performed."
        },
        {
          number: "11.5",
          text: "Either party may terminate this Agreement at any time, for any reason by providing at least 7 days written notice to the other party."
        }
      ]
    },
    general: {
      title: "12 General",
      items: [
        {
          number: "12.1",
          text: "This agreement and any annexure attached constitute the sole and entire agreement between the parties with regard to the subject matter hereof and the parties waive the right to rely on any alleged express provision not contained herein."
        },
        {
          number: "12.2",
          text: "No party may rely on any representation, which allegedly induced that party to enter into this agreement, unless the representation is recorded herein. 12.4 No agreement varying, adding to, deleting from or cancelling this agreement and no waiver of any right under this agreement shall be effective unless it is:"
        },
        {
          number: "12.3.1",
          text: "In writing;"
        },
        {
          number: "12.3.2",
          text: "Agreed to by both parties; or"
        },
        {
          number: "12.3.3",
          text: "Signed by both parties."
        },
        {
          number: "12.4",
          text: "Written notice by either party to the other may be given:"
        },
        {
          number: "12.4.1",
          text: "In person, and such notice shall be deemed valid on the date of delivery in person."
        },
        {
          number: "12.4.2",
          text: "By registered mail, and such notice shall be deemed valid as of seven days of the proof of mailing date."
        },
        {
          number: "12.4.3",
          text: "By electronic mail or facsimile which are deemed to have been received on the day that they are sent provided there is proof of sending."
        },
        {
          number: "12.5",
          text: "No relaxation by a party of any of its rights in terms of this agreement at any time shall prejudice or be a waiver of its rights (unless it is a written waiver) and it shall be entitled to exercise its rights hereafter as if such relaxation had not taken place."
        },
        {
          number: "12.6",
          text: "Except as provided for elsewhere in this Agreement, the Contractor may not transfer or assign any of its rights or delegate any of its obligations in terms of this agreement without the prior written consent of the Principal."
        },
        {
          number: "12.7",
          text: "Unless inconsistent with the context, words signifying any one gender shall include the others, words signifying the singular shall include the plural and vice versa and words signifying natural persons shall include artificial persons and vice versa."
        },
        {
          number: "12.8",
          text: "A reference in this Agreement to any statute is a reference to that statute as amended or replaced from time to time."
        },
        {
          number: "12.9",
          text: "Should any provision of this agreement be judged by an appropriate court of law as invalid, it shall not affect any of the remaining provisions whatsoever."
        },
        {
          number: "12.10",
          text: "This Agreement will be governed by the laws of South Australia and the parties submit to the courts in this jurisdiction."
        }
      ]
    },
    annexureData : {
      annexure1: {
        title: "ANNEXURE 1 - Services",
        items: [
          {
            number: "",
            text: "The Contractor is responsible for the provision of the secure transport of cash from clients of Principal and Its referrers to financial institutions."
          },
          {
            number: "",
            text: "The Principal will offer the Contractor jobs/clients/referrals, and will advise how frequently the client/job be attended to (e.g. weekly, fortnightly)."
          },
          {
            number: "",
            text: "The Contractor will provide client/job updates when requested by the Principal."
          },
          {
            number: "",
            text: "The Contractor will ensure timely and accurate documentation and maintenance of Customer records/files."
          },
          {
            number: "",
            text: "The Contractor will ensure that they obtain adequate proof of delivery in regards to each and every satchel and/or item that is delivered and handed over to either the receiving bank teller or for deposit or nominated person for receipt of the delivery by obtaining;"
          },
          {
            number: "1.",
            text: "A bank stamp and signature combination from the receiving bank teller is cash is being delivered to a bank; or"
          },
          {
            number: "2.",
            text: "A signature from the receiving individual if the delivery is cash or an item."
          },
          {
            number: "3.",
            text: "A GPS Date/Time Stamp on a video showing the satchel/s being deposited along with the satchel/s serial number."
          },
          {
            number: "4.",
            text: "If the Contractor is delivering cash or an item to an individual, the Contractor must sight and take a photograph of relevant photographic identification that matches with the signature recorded on the run sheet of the client."
          },
          {
            number: "",
            text: "The Contractor will comply with the Principal's welfare check procedures (if applicable). The Contractor will ensure that any Nominated Employee(s) or Assistants will carry identification as issued by the Principal at all times."
          },
          {
            number: "",
            text: "The Contractor will report any breaches of security."
          },
          {
            number: "",
            text: "The Contractor will ensure the health and safety of themselves, the Client and others is upheld at all times, in accordance with the requirements of the occupational health and safety legislation of the relevant State."
          },
          {
            number: "",
            text: "The Contractor does not breach this agreement by failing to perform the services set out in this annexure if the Contractor reasonably believes that those services cannot be carried out without breaching the requirements of the occupational health and safety legislation of the relevant State."
          },
          {
            number: "",
            text: "Confidentiality; The Contractor will ensure Client and business confidentiality at all times."
          },
          {
            number: "",
            text: "The Contractor and the Nominated Employee(s) or Assistants will keep Confidential Information concealed from all third parties, including but not limited to bank tellers, other clients and friends and family."
          }
        ]
      },
      safety: {
        title: "Safety",
        items: [
          {
            number: "",
            text: "The Contractor will ensure the health and safety of themselves, the Client and others is upheld at all times, in accordance with the requirements of the relevant State regulations that the services are being performed."
          },
          {
            number: "",
            text: "The Contractor does not breach this agreement by failing to perform the services set out in this annexure if the Contractor reasonably believes that those services cannot be carried out without breaching the requirements of the relevant State regulations that the services are being performed."
          },
          {
            number: "",
            text: "The Contractor will not interact with the public unless required to do so as part of the performance of the Services."
          }
        ]
      },
      annexure2: {
        title: "ANNEXURE 2 – Equipment",
        items: [
          {
            number: "",
            text: "A working and connected mobile phone with a vehicle charger;"
          },
          {
            number: "",
            text: "A bag with no bright colours, logo or insignia and suitable for performing the Services;"
          },
          {
            number: "",
            text: "A trolley suitable for the performance of the Services, being at least of 250kg capacity;"
          },
          {
            number: "",
            text: "First aid kit that is within easy reach of the Contractor;"
          },
          {
            number: "",
            text: "Have enough lockable steel boxes and/or suitable vehicle safes fastened either directly to the vehicle, or by chain and padlock."
          },
          {
            number: "",
            text: "A Vehicle, being only one of the following;"
          },
          {
            number: "1.",
            text: "A sedan;"
          },
          {
            number: "2.",
            text: "A hatchback;"
          },
          {
            number: "3.",
            text: "A van; or"
          },
          {
            number: "4.",
            text: "A four-wheel drive"
          },
          {
            number: "",
            text: "and meeting the following requirements:"
          },
          {
            number: "1.",
            text: "Be no older than 15 years;"
          },
          {
            number: "2.",
            text: "Not have any logos or insignia of any type (Excluding Security insignia or Security markings);"
          },
          {
            number: "3.",
            text: "Not have any distinguishable features that will make the vehicle stand out in public; and"
          },
          {
            number: "4.",
            text: "Must have a working security alarm fitted;"
          },
          {
            number: "5.",
            text: "Have a fire extinguisher fitted and within easy reach of the Contractor;"
          }
        ]
      }
    }
  };


  return (
    <div>
      <HeroImage/>
  <IndependentContractorsForm
        agreementTermData={agreementTermData}
        deedOfGuaranteeData={deedOfGuaranteeData}
     />

    </div>
  );
};

export default page;