import
    {
        prepareContactAdminNotificationEmail,
        prepareContactUserConfirmationEmail,
        prepareFranchiseAdminInquiryEmail,
        prepareFranchiseUserWelcomeEmail,
        prepareICAContractorWelcomeEmail,
        prepareICAEdocketsIntroductionEmail,
        prepareICAOperationsReviewEmail,
        prepareQuoteAdminRequestEmail,
        prepareQuoteUserConfirmationEmail,
        prepareSiteInfoAdminNotificationEmail,
        prepareSiteInfoUserConfirmationEmail,
        prepareTermsAgreementEmail,
        prepareAustracSubmissionEmail,
        prepareInductionEmail
    } from "../services/emailService.js";
import { sendEmailWithRetry, executeMultiEmailBatch, queueEmail } from "../services/emailQueue.js";
import { fastSanitize } from "../utils/sanitization.js";
import { processAttachmentsSequentially } from "../utils/attachments.js";

const isQuoteFinalStep = (formData) =>
{
    const services = formData.Service || [];

    if (services.length === 0) {
        return true;
    }

    const hasBanking = services.includes('Banking');
    const hasChange = services.includes('Change');

    if (hasBanking) {
        const bankingComplete = !!(formData.BankingFrequency && formData.BankingAmount);
        if (!bankingComplete) return false;
    }

    if (hasChange) {
        const changeComplete = !!(formData.ChangeFrequency && formData.ChangeNotesAmount);
        if (!changeComplete) return false;
    }

    return true;
};

export const FORM_HANDLERS = {
  austrac: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "austrac",
        formType: "AUSTRAC",
        executeWithResilience: async () => {
          const emailData = prepareAustracSubmissionEmail(data, readPdfFile);
          const emailDetails = [await sendEmailWithRetry(emailData, "austrac")];

          return {
            emailsSent: emailDetails.length,
            emailDetails,
          };
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      const emailData = prepareAustracSubmissionEmail(data, readPdfFile);
      const emailDetails = [await sendEmailWithRetry(emailData, "austrac")];

      return {
        emailsSent: emailDetails.length,
        emailDetails,
      };
    },
    response: "AUSTRAC information submitted successfully!",
    logData: (data) => ({
      org: data.Organisation,
      email: data.OrganisationEmail,
    }),
  },


  terms: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "terms",
        formType: "Terms",
        executeWithResilience: async () => {
          // Await the email preparation (now async)
          const emailData = await prepareTermsAgreementEmail(data, readPdfFile);
          const emailDetails = [await sendEmailWithRetry(emailData, "terms")];

          return {
            emailsSent: emailDetails.length,
            emailDetails,
          };
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      // Await the email preparation (now async)
      const emailData = await prepareTermsAgreementEmail(data, readPdfFile);
      const emailDetails = [await sendEmailWithRetry(emailData, "terms")];

      return {
        emailsSent: emailDetails.length,
        emailDetails,
      };
    },
    response: "Terms & Conditions accepted successfully!",
    logData: (data) => ({
      org: data["Organisation Name"],
      name: data["Full Name"],
    }),
  },

  contact: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "contact",
        formType: "Contact",
        executeWithResilience: async () => {
          return await executeMultiEmailBatch(
            [
              {
                id: "admin-notification",
                type: "contact-admin",
                prepare: () =>
                  prepareContactAdminNotificationEmail(data, readPdfFile),
                recipient: "admin",
              },
              {
                id: "user-confirmation",
                type: "contact-user",
                prepare: () =>
                  prepareContactUserConfirmationEmail(data, readPdfFile),
                recipient: "customer",
              },
            ],
            "Contact",
          );
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      return await executeMultiEmailBatch(
        [
          {
            id: "admin-notification",
            type: "contact-admin",
            prepare: () =>
              prepareContactAdminNotificationEmail(data, readPdfFile),
            recipient: "admin",
          },
          {
            id: "user-confirmation",
            type: "contact-user",
            prepare: () =>
              prepareContactUserConfirmationEmail(data, readPdfFile),
            recipient: "customer",
          },
        ],
        "Contact",
      );
    },
    response: "Contact request submitted successfully!",
    logData: (data) => ({ name: data.FullName, dept: data.Department }),
  },

  franchise: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "franchise",
        formType: "Franchise",
        executeWithResilience: async () => {
          return await executeMultiEmailBatch(
            [
              {
                id: "admin-inquiry",
                type: "franchise-admin",
                prepare: () =>
                  prepareFranchiseAdminInquiryEmail(data, readPdfFile),
                recipient: "admin",
              },
              {
                id: "user-welcome",
                type: "franchise-user",
                prepare: () =>
                  prepareFranchiseUserWelcomeEmail(data, readPdfFile),
                recipient: "customer",
              },
            ],
            "Franchise",
          );
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      return await executeMultiEmailBatch(
        [
          {
            id: "admin-inquiry",
            type: "franchise-admin",
            prepare: () => prepareFranchiseAdminInquiryEmail(data, readPdfFile),
            recipient: "admin",
          },
          {
            id: "user-welcome",
            type: "franchise-user",
            prepare: () => prepareFranchiseUserWelcomeEmail(data, readPdfFile),
            recipient: "customer",
          },
        ],
        "Franchise",
      );
    },
    response: "Franchise enquiry submitted successfully!",
    logData: (data) => ({ name: data.FullName, area: data.InterestedArea }),
  },

  ica: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "ica",
        formType: "ICA",
        executeWithResilience: async () => {
          return await executeMultiEmailBatch(
            [
              {
                id: "operations-review",
                type: "ica-operations",
                prepare: () =>
                  prepareICAOperationsReviewEmail(
                    data,
                    readPdfFile,
                    processAttachmentsSequentially,
                  ),
                recipient: "admin",
              },
              {
                id: "contractor-welcome",
                type: "ica-contractor",
                prepare: () =>
                  prepareICAContractorWelcomeEmail(data, readPdfFile),
                recipient: "customer",
              },
              {
                id: "edockets-intro",
                type: "ica-edockets",
                prepare: () =>
                  prepareICAEdocketsIntroductionEmail(data, readPdfFile),
                recipient: "customer",
              },
            ],
            "ICA",
          );
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      return await executeMultiEmailBatch(
        [
          {
            id: "operations-review",
            type: "ica-operations",
            prepare: () =>
              prepareICAOperationsReviewEmail(
                data,
                readPdfFile,
                processAttachmentsSequentially,
              ),
            recipient: "admin",
          },
          {
            id: "contractor-welcome",
            type: "ica-contractor",
            prepare: () => prepareICAContractorWelcomeEmail(data, readPdfFile),
            recipient: "customer",
          },
          {
            id: "edockets-intro",
            type: "ica-edockets",
            prepare: () =>
              prepareICAEdocketsIntroductionEmail(data, readPdfFile),
            recipient: "customer",
          },
        ],
        "ICA",
      );
    },
    response: "ICA form submitted successfully!",
    logData: (data) => ({ name: data.Name, business: data.BusinessName }),
  },

  quote: {
    queueEmails: (data, readPdfFile) => {
      const clean = {
        ...data,
        Name: fastSanitize(data.Name),
        Organisation: fastSanitize(data.Organisation),
        FormID: data.FormID || "quote",
      };

      const isProgressive = data.isProgressiveEmail === true;
      const isFinalStep = isQuoteFinalStep(clean);

      queueEmail({
        type: "quote",
        formType: "Quote",
        executeWithResilience: async () => {
          const emailTasks = [
            {
              id: "admin-request",
              type: "quote-admin",
              prepare: () => prepareQuoteAdminRequestEmail(clean, readPdfFile),
              recipient: "admin",
            },
          ];

          if (!isProgressive && isFinalStep) {
            emailTasks.push({
              id: "user-confirmation",
              type: "quote-user",
              prepare: () =>
                prepareQuoteUserConfirmationEmail(clean, readPdfFile),
              recipient: "customer",
            });
          }

          return await executeMultiEmailBatch(emailTasks, "Quote");
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      const clean = {
        ...data,
        Name: fastSanitize(data.Name),
        Organisation: fastSanitize(data.Organisation),
        FormID: data.FormID || "quote",
      };

      const isProgressive = data.isProgressiveEmail === true;
      const isFinalStep = isQuoteFinalStep(clean);

      const emailTasks = [
        {
          id: "admin-request",
          type: "quote-admin",
          prepare: () => prepareQuoteAdminRequestEmail(clean, readPdfFile),
          recipient: "admin",
        },
      ];

      if (!isProgressive && isFinalStep) {
        emailTasks.push({
          id: "user-confirmation",
          type: "quote-user",
          prepare: () => prepareQuoteUserConfirmationEmail(clean, readPdfFile),
          recipient: "customer",
        });
      }

      return await executeMultiEmailBatch(emailTasks, "Quote");
    },
    response: "Quote request submitted successfully!",
    logData: (data) => ({ org: data.Organisation, name: data.Name }),
  },

  siteinfo: {
    queueEmails: (data, readPdfFile) => {
      const clean = {
        ...data,
        BusinessName: fastSanitize(data.BusinessName),
        Contact: fastSanitize(data.Contact),
        Type: data.Type || "Regular Service",
        Services: Array.isArray(data.Services)
          ? data.Services
          : [data.Services].filter(Boolean),
      };

      queueEmail({
        type: "siteinfo",
        formType: "Site Info",
        executeWithResilience: async () => {
          return await executeMultiEmailBatch(
            [
              {
                id: "admin-notification",
                type: "siteinfo-admin",
                prepare: () =>
                  prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                recipient: "admin",
              },
              {
                id: "user-confirmation",
                type: "siteinfo-user",
                prepare: () =>
                  prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                recipient: "customer",
              },
            ],
            "Site Info",
          );
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      const clean = {
        ...data,
        BusinessName: fastSanitize(data.BusinessName),
        Contact: fastSanitize(data.Contact),
        Type: data.Type || "Regular Service",
        Services: Array.isArray(data.Services)
          ? data.Services
          : [data.Services].filter(Boolean),
      };

      return await executeMultiEmailBatch(
        [
          {
            id: "admin-notification",
            type: "siteinfo-admin",
            prepare: () =>
              prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
            recipient: "admin",
          },
          {
            id: "user-confirmation",
            type: "siteinfo-user",
            prepare: () =>
              prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
            recipient: "customer",
          },
        ],
        "Site Info",
      );
    },
    response: "Site info submitted successfully!",
    logData: (data) => ({ business: data.BusinessName, contact: data.Contact }),
  },

  specialevent: {
    queueEmails: (data, readPdfFile) => {
      const clean = {
        ...data,
        BusinessName: fastSanitize(data.BusinessName),
        Contact: fastSanitize(data.Contact),
        Type: data.Type || "Special Event",
      };

      queueEmail({
        type: "specialevent",
        formType: "Special Event",
        executeWithResilience: async () => {
          return await executeMultiEmailBatch(
            [
              {
                id: "admin-notification",
                type: "specialevent-admin",
                prepare: () =>
                  prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                recipient: "admin",
              },
              {
                id: "user-confirmation",
                type: "specialevent-user",
                prepare: () =>
                  prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                recipient: "customer",
              },
            ],
            "Special Event",
          );
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      const clean = {
        ...data,
        BusinessName: fastSanitize(data.BusinessName),
        Contact: fastSanitize(data.Contact),
        Type: data.Type || "Special Event",
      };

      return await executeMultiEmailBatch(
        [
          {
            id: "admin-notification",
            type: "specialevent-admin",
            prepare: () =>
              prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
            recipient: "admin",
          },
          {
            id: "user-confirmation",
            type: "specialevent-user",
            prepare: () =>
              prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
            recipient: "customer",
          },
        ],
        "Special Event",
      );
    },
    response: "Special event info submitted successfully!",
    logData: (data) => ({ business: data.BusinessName, type: "special" }),
  },
  induction: {
    queueEmails: (data, readPdfFile) => {
      queueEmail({
        type: "induction",
        formType: "Induction",
        executeWithResilience: async () => {
          const emailData = prepareInductionEmail(data, readPdfFile);
          const emailDetails = [
            await sendEmailWithRetry(emailData, "induction"),
          ];

          return {
            emailsSent: emailDetails.length,
            emailDetails,
          };
        },
      });
    },
    executeEmailsSync: async (data, readPdfFile) => {
      const emailData = prepareInductionEmail(data, readPdfFile);
      const emailDetails = [await sendEmailWithRetry(emailData, "induction")];

      return {
        emailsSent: emailDetails.length,
        emailDetails,
      };
    },
    response: "Induction form submitted successfully!",
    logData: (data) => ({
      name: data.Name,
      state: data.State,
      contractor: data.ContractorName,
    }),
  },
};