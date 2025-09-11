// /components/forms/AustracForm.js
"use client";
import React, { useEffect } from "react";
import
{
    FaBuilding,
    FaIdCard,
    FaGlobe,
    FaEnvelope,
    FaList,
    FaHome,
    FaMapMarkerAlt,
    FaUsers,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { useFormManager } from "@/hooks/useFormManager.js";
import { formatSubmissionDate } from '@/utils/formHelpers';
import AustracFormSchema, { AUSTRAC_DEFAULT_VALUES } from '@/zod/AustracFormSchema';

/**
 * Enhanced AustracForm - Converted to Terms Architecture
 * 
 * ✅ IMPROVEMENTS APPLIED:
 * - Unified form manager with complete focus integration
 * - Controller-based architecture (no register usage)
 * - Enhanced field error handling
 * - Clean submission pipeline
 * - Consistent styling with Terms form
 */
const AustracForm = ({ className, setOrganisation, setABN }) =>
{

    // Enhanced form manager with complete focus integration
    const formManager = useFormManager({
        schema: AustracFormSchema,
        defaultValues: AUSTRAC_DEFAULT_VALUES,
        theme: 'dark',
        formType: 'austrac',
        formId: 'AUSTRAC',
        onSuccess: (result, finalData) =>
        {
            console.log("AUSTRAC form submitted successfully!");
            // Redirect to /site-info on successful submission
            // router.push("/site-info");
        },
        onError: (error) =>
        {
            console.error("AUSTRAC submission failed:", error);
        },
        prepareData: async (data) =>
        {
            // Format date of submission
            const dateOfSubmission = formatSubmissionDate();

            return {
                ...data,
                "formType": "austrac",
                timestamp: new Date().toISOString(),
                formId: "AUSTRAC",
                submissionId: `austrac_${Date.now()}`,
                dateOfSubmission: dateOfSubmission,
            };
        }
    });

    // Watch form values for parent component props
    const organisationValue = formManager.watch("Organisation");
    const abnValue = formManager.watch("ABN");

    // Pass values to parent component props
    useEffect(() =>
    {
        if (organisationValue && setOrganisation) setOrganisation(organisationValue);
    }, [organisationValue, setOrganisation]);

    useEffect(() =>
    {
        if (abnValue && setABN) setABN(abnValue);
    }, [abnValue, setABN]);

    // Field configurations
    const inputFields = [
        {
            name: "Organisation",
            type: "text",
            label: "What is your organisation's name?",
            placeholder: "e.g. Smith Holdings Pty Ltd or South Park Primary School",
            Icon: FaBuilding,
        },
        {
            name: "ABN",
            type: "abn",
            label: "What is your organisation's ABN number?",
            placeholder: "as per the ASIC register. Eg 45 567 678 901",
            Icon: FaIdCard,
        },
        {
            name: "Website",
            type: "url",
            label: "What is the organisation's main website?",
            placeholder: "e.g. https://www.smithholdings.com.au",
            Icon: FaGlobe,
        },
        {
            name: "OrganisationEmail",
            type: "email",
            label: "What is the organisation's main email address?",
            placeholder: "e.g. admin@smithholdings.com.au",
            Icon: FaEnvelope,
        },
        {
            name: "OrganisationType",
            type: "select",
            label: "What is the organisation's structure type?",
            Icon: FaList,
            options: [
                { value: "", label: "Please Select" },
                { value: "Individual (Sole Trader)", label: "Individual (Sole Trader)" },
                { value: "Trustees & Beneficiaries", label: "Trustees & Beneficiaries" },
                { value: "Domestic Pty Ltd or Ltd Company", label: "Domestic Pty Ltd or Ltd Company" },
                { value: "Registered Foreign Company", label: "Registered Foreign Company" },
                { value: "Foreign Company Not Registered in Australia", label: "Foreign Company Not Registered in Australia" },
                { value: "Partners & Partnerships", label: "Partners & Partnerships" },
                { value: "Associations", label: "Associations" },
                { value: "Registered Co-Operatives", label: "Registered Co-Operatives" },
                { value: "Government Body", label: "Government Body" },
                { value: "School or Education Institute", label: "School or Education Institute" },
                { value: "Church or Religious Organisation", label: "Church or Religious Organisation" },
            ],
        },
        {
            name: "Address",
            type: "text",
            label: "What is the address of the head office?",
            placeholder: "e.g. 38 Main South Road Blacktown QLD 6987",
            Icon: FaHome,
        },
        {
            name: "State",
            type: "select",
            label: "In which state is the head office?",
            Icon: FaMapMarkerAlt,
            options: [
                { value: "", label: "Please Select" },
                { value: "NSW", label: "New South Wales" },
                { value: "VIC", label: "Victoria" },
                { value: "QLD", label: "Queensland" },
                { value: "WA", label: "Western Australia" },
                { value: "SA", label: "South Australia" },
                { value: "TAS", label: "Tasmania" },
                { value: "ACT", label: "Australian Capital Territory" },
                { value: "NT", label: "Northern Territory" },
                { value: "NZ", label: "New Zealand" },
            ],
        },
        {
            name: "Personnel",
            type: "textarea",
            label: "Please provide the full names & positions of all the key people within the organisation structure;",
            placeholder: "Directors, Chairperson, Secretary etc.",
            rows: 6,
            Icon: FaUsers,
        },
    ];

    // Debug logging for troubleshooting
    useEffect(() =>
    {
        if (process.env.NODE_ENV === 'development') {
            const debugInfo = formManager.getDebugInfo();
            if (debugInfo.currentFocus || Object.keys(debugInfo.errors).length > 0) {
                console.log('🐛 AustracForm Debug Info:', debugInfo);
            }
        }
    }, [formManager.currentFocusField, formManager.errors]);

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
            <div className="forms-quote-v2 h-auto 768px:mx-2.5 992px:mx-0 px-6 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]">
                <form
                    className="text-center"
                    data-formid="AUSTRAC"
                    onSubmit={formManager.handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <div className="form-page austrac">


                        <div className="form-tab 480px:w-[90%] mx-auto">
                            {/* Bot field (honeypot) - hidden field for spam protection */}
                            <input
                                type="text"
                                name="BotField"
                                hidden={true}
                                control={formManager.control}
                                style={{ display: "none" }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {/* All fields now use proper focus management */}
                            {inputFields.map((field) => (
                                <div key={field.name} className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="dark"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Display submission error if any */}
                    {formManager.submissionError && (
                        <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded mx-4">
                            <strong>Submission Error:</strong> {formManager.submissionError}
                        </div>
                    )}

                    {/* Button section */}
                    <div className="button-controls-container 480px:w-[80%] mx-auto mt-6 mb-2">
                        <div className="button-section relative">
                            <button
                                type="submit"
                                disabled={formManager.isSubmitting}
                                className={`nextBtn ${formManager.isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                    } text-white border-none py-[15px] 768px:px-0 text-[16px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {formManager.isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin mr-2" />
                                        Submitting... Please Wait.
                                    </div>
                                ) : formManager.isSubmitted ? (
                                    <div className="flex items-center justify-center">
                                        <FaCheckCircle className="text-white mr-2" />
                                        Thank you, we received your submission!
                                    </div>
                                ) : (
                                    "Continue to Next Step"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AustracForm;// /zod/AustracFormSchema.js
import { z } from "zod";

/**
 * Enhanced Austrac Form Schema - Clean Declarative Version
 * 
 * ✅ COMPREHENSIVE VALIDATION:
 * - Organisation name with business context validation
 * - ABN validation with proper Australian format checking
 * - Website URL validation with proper protocols
 * - Email validation with business context
 * - Organisation type selection validation
 * - Australian address validation
 * - State/territory validation
 * - Personnel information validation
 * - Honeypot spam protection
 */
const AustracFormSchema = z.object({
    Organisation: z
        .string({
            required_error: "Organisation name is required."
        })
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long.")
        .max(200, "Organisation name is too long (maximum 200 characters).")
        .refine((org) =>
        {
            const trimmed = org.trim();
            // Should contain at least one letter (not just numbers/symbols)
            return /[A-Za-z]/.test(trimmed);
        }, {
            message: "Organisation name must contain at least one letter."
        })
        .refine((org) =>
        {
            const trimmed = org.trim();
            // Should not be just common words like "test", "example"
            const invalidNames = ['test', 'example', 'company', 'business', 'organisation'];
            return !invalidNames.includes(trimmed.toLowerCase());
        }, {
            message: "Please enter a valid organisation name."
        }),

    ABN: z
        .string({
            required_error: "ABN number is required."
        })
        .min(1, "ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            // Remove spaces and check if it's exactly 11 digits
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, {
            message: "ABN must be exactly 11 digits."
        })
       ,

    Website: z
        .string({
            required_error: "Website URL is required."
        })
        .min(1, "Website URL is required.")
        .url("Please enter a valid website URL (including http:// or https://)")
        .refine((url) =>
        {
            // Must start with http:// or https://
            return /^https?:\/\/.+/.test(url.toLowerCase());
        }, {
            message: "Website URL must start with http:// or https://"
        })
        .refine((url) =>
        {
            // Should have a valid domain structure
            const domainRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
            return domainRegex.test(url);
        }, {
            message: "Please enter a valid website URL with proper domain."
        })
        .refine((url) =>
        {
            // Check for common Australian business domains or international
            const validTlds = ['.com.au', '.org.au', '.net.au', '.gov.au', '.edu.au', '.com', '.org', '.net', '.biz', '.info'];
            return validTlds.some(tld => url.toLowerCase().includes(tld));
        }, {
            message: "Please enter a valid business website URL."
        }),

    OrganisationEmail: z
        .string({
            required_error: "Organisation email is required."
        })
        .min(1, "Organisation email is required.")
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) =>
        {
            // Should not be a personal email domain for business context
            const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
            const domain = email.toLowerCase().split('@')[1];
            return !personalDomains.includes(domain);
        }, {
            message: "Please use a business email address rather than personal email."
        })
        .refine((email) =>
        {
            // Additional validation for consecutive dots
            const trimmed = email.trim().toLowerCase();
            return !trimmed.includes('..');
        }, {
            message: "Email address format is invalid (consecutive dots not allowed)."
        }),

    OrganisationType: z
        .string({
            required_error: "Organisation type is required."
        })
        .min(1, "Please select an organisation type.")
        .refine((type) =>
        {
            // Validate against the allowed organisation types
            const validTypes = [
                "Individual (Sole Trader)",
                "Trustees & Beneficiaries",
                "Domestic Pty Ltd or Ltd Company",
                "Registered Foreign Company",
                "Foreign Company Not Registered in Australia",
                "Partners & Partnerships",
                "Associations",
                "Registered Co-Operatives",
                "Government Body",
                "School or Education Institute",
                "Church or Religious Organisation"
            ];
            return validTypes.includes(type);
        }, {
            message: "Please select a valid organisation type."
        }),

    Address: z
        .string({
            required_error: "Head office address is required."
        })
        .min(1, "Head office address is required.")
        .min(10, "Address must be at least 10 characters long.")
        .max(500, "Address is too long (maximum 500 characters).")
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should contain both letters and numbers (typical address format)
            return /[A-Za-z]/.test(trimmed) && /[0-9]/.test(trimmed);
        }, {
            message: "Address must contain both letters and numbers."
        })
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should have at least 3 words (number, street, suburb/city)
            const words = trimmed.split(/\s+/);
            return words.length >= 3;
        }, {
            message: "Please enter a complete address (street number, street name, suburb/city)."
        }),

    State: z
        .string({
            required_error: "State/Territory is required."
        })
        .min(1, "Please select a state or territory.")
        .refine((state) =>
        {
            // Validate against Australian states and territories + NZ
            const validStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "NZ"];
            return validStates.includes(state);
        }, {
            message: "Please select a valid state or territory."
        }),

    Personnel: z
        .string({
            required_error: "Personnel information is required."
        })
        .min(1, "Personnel information is required.")
        .min(10, "Please provide more detailed personnel information (minimum 10 characters).")
        .max(2000, "Personnel information is too long (maximum 2000 characters).")
        .refine((personnel) =>
        {
            const trimmed = personnel.trim();
            // Should contain at least one name (letters with possible spaces/apostrophes)
            return /[A-Za-z]{2,}/.test(trimmed);
        }, {
            message: "Please provide valid personnel names and positions."
        })
       ,

    BotField: z
        .string()
        .max(0, "Bot detected!"), // Honeypot field must be empty
});

// Default values for the form
export const AUSTRAC_DEFAULT_VALUES = {
    Organisation: "",
    ABN: "",
    Website: "",
    OrganisationEmail: "",
    OrganisationType: "",
    Address: "",
    State: "",
    Personnel: "",
    BotField: "",
};

/**
 * Field priority order for sequential error display
 * Used with priority error resolver if needed
 */
export const AUSTRAC_FIELD_PRIORITY = [
    'Organisation',
    'ABN',
    'Website',
    'OrganisationEmail',
    'OrganisationType',
    'Address',
    'State',
    'Personnel'
];

/**
 * Alternative schema factory for different validation requirements
 * E.g., for different regions or business types
 */
export const createAustracSchemaForRegion = (region = 'AU') =>
{
    if (region === 'NZ') {
        // New Zealand variant - different business number validation
        return AustracFormSchema.extend({
            ABN: z
                .string({
                    required_error: "NZBN (New Zealand Business Number) is required."
                })
                .min(1, "NZBN is required.")
                .regex(/^[0-9]+$/, "NZBN must contain only digits.")
                .refine((nzbn) =>
                {
                    // NZBN is 13 digits
                    return nzbn.length === 13;
                }, {
                    message: "NZBN must be exactly 13 digits."
                }),

            OrganisationEmail: z
                .string({
                    required_error: "Organisation email is required."
                })
                .min(1, "Organisation email is required.")
                .email("Please enter a valid email address.")
                .max(254, "Email address is too long.")
            // Remove Australian business email restriction for NZ
        });
    }

    return AustracFormSchema;
};

/**
 * Schema for partial validation (useful for multi-step forms)
 */
export const AustracPartialSchema = AustracFormSchema.partial();

export default AustracFormSchema;