// Enhanced QuoteForm.js with Progressive Email Support
"use client";
import React from "react";
import
{
    FaUser,
    FaUsers,
    FaPhone,
    FaComments,
    FaEnvelope,
    FaHome,
    FaMapMarkerAlt,
    FaSpinner,
    FaCheckCircle,
    FaArrowLeft,
    FaClock,
    FaExclamationTriangle,
} from "react-icons/fa";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import BankingStep from "./steps/BankingStep.js";
import ChangeStep from "./steps/ChangeStep";
import { useFormManager } from "@/hooks/useFormManager";
import { QUOTE_SCHEMAS, QUOTE_DEFAULT_VALUES } from '@/zod/QuoteFormSchema';

const QuoteForm = ({ className }) =>
{
    // Enhanced form manager with progressive email support
    const formManager = useFormManager({
        // Core configuration
        schema: QUOTE_SCHEMAS, // Multi-schema object
        defaultValues: QUOTE_DEFAULT_VALUES,
        theme: 'dark',

        // Form identification
        formType: 'quote',
        formId: 'Quote',

        // Multi-step configuration
        multiStep: {
            steps: ['quote', 'banking', 'change'],
            conditional: true, // Steps shown based on Service selection
            getNextSteps: (formData) =>
            {
                const services = formData.Service || [];
                const nextSteps = [];
                if (services.includes('Banking')) nextSteps.push('banking');
                if (services.includes('Change')) nextSteps.push('change');
                return nextSteps;
            }
        },

        // Submission handlers
        onSuccess: (result, finalData) =>
        {
            console.log("✅ Quote form submitted successfully!");
        },
        onError: (error) =>
        {
            console.error("❌ Quote submission failed:", error);
        },

        // Data preparation
        prepareData: async (data) =>
        {
            return { ...data, formType: "quote" };
        }
    });

    const serviceOptions = [
        { label: "Banking", value: "Banking" },
        { label: "Change", value: "Change" },
    ];

    // Step-specific field configurations
    const quoteFields = [
        {
            name: "Name",
            type: "text",
            label: "Full Name",
            placeholder: "Enter your full name",
            Icon: FaUser,
        },
        {
            name: "Organisation",
            type: "text",
            label: "Organisation Name",
            placeholder: "Enter your organisation's name",
            Icon: FaUsers,
        },
        {
            name: "Phone",
            type: "tel",
            label: "Phone Number",
            placeholder: "Enter your phone number",
            Icon: FaPhone,
        },
        {
            name: "Referrer",
            type: "text",
            label: "Where Did You Hear About Us?",
            placeholder: "Enter where did you hear about us",
            Icon: FaComments,
        },
        {
            name: "Email",
            type: "email",
            label: "Email Address",
            placeholder: "Your email address",
            Icon: FaEnvelope,
        },
        {
            name: "Address",
            type: "text",
            label: "Postal Address",
            placeholder: "Enter your postal address",
            Icon: FaHome,
        },
        {
            name: "Locations",
            type: "text",
            label: "Location/s For Service",
            placeholder: "Enter location/s for the service (Suburb, State, Postcode)",
            Icon: FaMapMarkerAlt,
        },
        {
            name: "Service",
            type: "checkbox-group",
            label: "Services You Require",
            options: serviceOptions,
            variant: "horizontal"
        },
    ];

    // Progress indicator component
    const ProgressIndicator = () =>
    {
        const progress = formManager.getProgress();
        const { currentStep, stepId } = formManager.getCurrentStep();

        const stepTitles = {
            'quote': 'Contact Details',
            'banking': 'Banking Service',
            'change': 'Change Service'
        };

        return (
            <div className="progress-indicator mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                        Step {progress.current} of {progress.total}
                    </span>
                    <span className="text-sm text-gray-300">
                        {progress.percentage}% Complete
                    </span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div
                        className="bg-[#c6a54b] h-2 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${progress.percentage}%` }}
                    ></div>
                </div>

                <div className="text-center">
                    <h4 className="text-white text-lg font-medium">
                        {stepTitles[stepId] || 'Current Step'}
                    </h4>

                    {formManager.progressiveEmailLog.size > 0 && (
                        <div className="flex items-center justify-center mt-2 text-green-400 text-sm">
                            <FaCheckCircle className="mr-1" />
                            {formManager.progressiveEmailLog.size} progress email(s) sent
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Email status indicator
    const EmailStatusIndicator = () =>
    {
        const { progressiveEmailLog } = formManager;

        if (progressiveEmailLog.size === 0) return null;

        return (
            <div className="email-status-indicator bg-green-900 bg-opacity-30 border border-green-400 rounded p-3 mb-4">
                <div className="flex items-center text-green-400">
                    <FaCheckCircle className="mr-2" />
                    <span className="text-sm">
                        Your progress has been saved! We've sent {progressiveEmailLog.size} update(s) to our team.
                    </span>
                </div>
            </div>
        );
    };

    // Navigation component for multi-step
    const StepNavigation = () =>
    {
        const { isFirst } = formManager.getCurrentStep();
        const canGoBack = !isFirst && !formManager.isSubmitting;

        return (
            <div className="step-navigation flex justify-between items-center mt-6 mb-4">
                <div>
                    {canGoBack && (
                        <button
                            type="button"
                            onClick={formManager.goBack}
                            className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                            disabled={formManager.isSubmitting}
                        >
                            <FaArrowLeft className="mr-2" />
                            Back
                        </button>
                    )}
                </div>

                <div className="flex items-center text-gray-400 text-sm">
                    <FaClock className="mr-2" />
                    Session: {formManager.sessionId.slice(-8)}
                </div>
            </div>
        );
    };

    // Render current step based on form manager state
    const renderCurrentStep = () =>
    {
        const { currentStep, stepId } = formManager.getCurrentStep();

        switch (stepId) {
            case 'quote':
                return (
                    <div className="form-page quote">
                        <Typography
                            as="h3"
                            fontFamily="montserrat"
                            className="text-white font-montserrat text-center capitalize pb-4 text-[22px] leading-[30px]"
                        >
                            Want a quote from SecureCash?
                        </Typography>

                        <Typography
                            as="p"
                            fontFamily="font-montserrat"
                            className="text-white font-normal text-center capitalize pb-4 text-[16px]"
                        >
                            We Just Need A Few Details
                        </Typography>

                        <Divider
                            color="primary"
                            margin="mt-4"
                            alignment="center"
                        />

                        <div className="form-tab 480px:w-[90%] mx-auto">
                            {/* Quote form fields */}
                            {quoteFields.map((field) => (
                                <div key={field.name} className="relative">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme="dark"
                                        autoComplete="new-password"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Email capture info */}
                        <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-400 rounded">
                            <div className="flex items-start text-blue-300 text-sm">
                                <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <strong>Progress Saving:</strong> Your information will be automatically saved as you complete each step, so you won't lose your progress.
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'banking':
                return (
                    <BankingStep
                        formManager={formManager}
                        theme="dark"
                    />
                );

            case 'change':
                return (
                    <ChangeStep
                        formManager={formManager}
                        theme="dark"
                    />
                );

            default:
                return null;
        }
    };

    // Smart button text based on step and services
    const getButtonText = () =>
    {
        if (formManager.isSubmitting) return "Submitting...";
        if (formManager.isSubmitted) return "Thank you! Form submitted successfully.";

        const { stepId } = formManager.getCurrentStep();
        const services = formManager.getStepData().Service || [];

        if (stepId === 'quote') {
            if (services.length === 0) {
                return "Complete Quote";
            }
            return "Next Step";
        }

        // Check if this is the final step
        if (formManager.isLastStep()) return "Submit Quote";

        return "Continue";
    };

    return (
        <div className={`float-none w-full mx-auto relative left-0 flex-1 flex justify-center ${className}`}>
            <form
                className="forms-quote-v2 h-auto mx-2.5 992px:mx-0 px-[30px] 1366px:h-full forms-quote submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[546px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a]"
                data-formid="Quote"
                onSubmit={formManager.handleSubmit}
                noValidate
            >
                {/* Bot field (honeypot) */}
                <input
                    type="text"
                    name="BotField"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                />

                {/* Progress Indicator */}
                <ProgressIndicator />

                {/* Email Status Indicator */}
                <EmailStatusIndicator />

                {/* Step Navigation */}
                <StepNavigation />

                {/* Render current step */}
                {renderCurrentStep()}

                {/* Submission error display */}
                {formManager.submissionError && (
                    <div className="text-red-400 text-center mb-4 p-2 bg-red-900 bg-opacity-20 border border-red-400 rounded">
                        {formManager.submissionError}
                    </div>
                )}

                {/* Submit button */}
                <div className="button-controls-container w-[80%] mx-auto mt-10">
                    <div className="button-section relative">
                        <button
                            type="submit"
                            disabled={formManager.isSubmitting}
                            className={`nextBtn ${formManager.isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
                                } text-white border-none py-[15px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
                        >
                            {formManager.isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </div>
                            ) : formManager.isSubmitted ? (
                                <div className="flex items-center justify-center">
                                    <FaCheckCircle className="mr-2" />
                                    Thank you! Form submitted successfully.
                                </div>
                            ) : (
                                getButtonText()
                            )}
                        </button>
                    </div>
                </div>

                {/* Debug info in development */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 p-2 bg-gray-800 text-gray-300 text-xs rounded">
                        <details>
                            <summary className="cursor-pointer">Debug Info</summary>
                            <pre className="mt-2 text-left overflow-auto">
                                {JSON.stringify(formManager.getDebugInfo(), null, 2)}
                            </pre>
                        </details>
                    </div>
                )}
            </form>
        </div>
    );
};

export default QuoteForm;// Enhanced BankingStep.js with Progressive Email Integration
import React from "react";
import
{
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaUniversity,
    FaInfoCircle,
} from "react-icons/fa";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";

/**
 * Enhanced Banking Step Component with Progressive Email Support
 * Follows the controller-based architecture with UniversalFormField
 */
const BankingStep = ({ formManager, theme = 'dark' }) =>
{
    const frequencyOptions = [
        { value: "", label: "Please select..." },
        { value: "Weekly", label: "Weekly" },
        { value: "Fortnightly", label: "Fortnightly" },
        { value: "Ad Hoc", label: "Ad Hoc" },
        { value: "Special Event (once off)", label: "Special Event (once off)" },
    ];

    const amountOptions = [
        { value: "", label: "Select Amount:" },
        { value: "$0 - $1000", label: "$0 - $1000" },
        { value: "$1000 - $5000", label: "$1000 - $5000" },
        { value: "$5000 - $20,000", label: "$5000 - $20,000" },
        { value: "$20,000 - $50,000", label: "$20,000 - $50,000" },
        { value: "over $50,000", label: "over $50,000" },
    ];

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Ad Hoc",
    ];

    const daysOptions = daysOfWeek.map(day => ({ label: day, value: day }));

    // Field configurations using UniversalFormField pattern
    const bankingFields = [
        {
            name: "BankingFrequency",
            type: "select",
            label: "Collection Frequency",
            Icon: FaCalendarAlt,
            options: frequencyOptions,
            required: true,
        },
        {
            name: "BankingAmount",
            type: "select",
            label: "Average Collection Amount",
            Icon: FaMoneyBillAlt,
            options: amountOptions,
            required: true,
        },
        {
            name: "BankingBank",
            type: "text",
            label: "Who Do You Bank With?",
            placeholder: "Who do you bank with?",
            Icon: FaUniversity,
            required: true,
        },
        {
            name: "BankingDays",
            type: "checkbox-group",
            label: "Usual day/s for collection?",
            options: daysOptions,
            variant: "grid",
            required: true,
        },
        {
            name: "BankingComments",
            type: "textarea",
            label: "Comments",
            placeholder: "Anything else you would like us to know?",
            rows: 3
        },
    ];

    // Get step data for showing progress
    const stepData = formManager.getStepData();
    const hasProgressEmails = formManager.progressiveEmailLog.has('step-1');

    return (
        <div className="form-page banking">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
                Banking Service Details
            </Typography>

            <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-gray-300 font-normal text-center pb-4 text-[14px]"
            >
                Tell us about your banking collection requirements
            </Typography>

            <Divider
                color="primary"
                margin="mt-4"
                alignment="center"
            />

            {/* Progress notice */}
            {hasProgressEmails && (
                <div className="mb-4 p-3 bg-green-900 bg-opacity-30 border border-green-400 rounded">
                    <div className="flex items-center text-green-400 text-sm">
                        <FaInfoCircle className="mr-2" />
                        Your contact details from Step 1 have been saved automatically.
                    </div>
                </div>
            )}

            <div className="form-tab 480px:w-[90%] mx-auto">
                {/* All Banking form fields */}
                {bankingFields.map((field) => (
                    <div key={field.name} className="relative">
                        <UniversalFormField
                            {...formManager.getFieldProps(field)}
                            theme={theme}
                            autoComplete="new-password"
                        />
                    </div>
                ))}
            </div>

            {/* Service info */}
            <div className="mt-6 p-4 bg-gray-800 border border-gray-600 rounded">
                <h4 className="text-white text-sm font-semibold mb-2">Banking Service Information</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Secure cash collection from your business premises</li>
                    <li>• Direct banking to your nominated account</li>
                    <li>• Professional armoured vehicle service</li>
                    <li>• Full insurance coverage during transport</li>
                </ul>
            </div>

            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-2 bg-gray-800 text-gray-300 text-xs rounded">
                    <div>Step Data Preview:</div>
                    <div>Contact: {stepData.Name} ({stepData.Email})</div>
                    <div>Organisation: {stepData.Organisation}</div>
                    <div>Progressive Emails: {formManager.progressiveEmailLog.size}</div>
                </div>
            )}
        </div>
    );
};

export default BankingStep;// Enhanced ChangeStep.js with Progressive Email Integration
import React from "react";
import
{
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaDollarSign,
    FaInfoCircle,
    FaCheckCircle,
} from "react-icons/fa";
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";

/**
 * Enhanced Change Step Component with Progressive Email Support
 * Follows the controller-based architecture with UniversalFormField
 */
const ChangeStep = ({ formManager, theme = 'dark' }) =>
{
    const frequencyOptions = [
        { value: "", label: "Please select..." },
        { value: "Weekly", label: "Weekly" },
        { value: "Fortnightly", label: "Fortnightly" },
        { value: "Ad Hoc", label: "Ad Hoc" },
        { value: "Special Event (once off)", label: "Special Event (once off)" },
    ];

    const amountOptions = [
        { value: "", label: "Select Amount:" },
        { value: "$0 - $1000", label: "$0 - $1000" },
        { value: "$1000 - $5000", label: "$1000 - $5000" },
        { value: "$5000 - $20,000", label: "$5000 - $20,000" },
        { value: "$20,000 - $50,000", label: "$20,000 - $50,000" },
        { value: "over $50,000", label: "over $50,000" },
    ];

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Ad Hoc",
        "Banking", // Change step includes Banking option
    ];

    const daysOptions = daysOfWeek.map(day => ({ label: day, value: day }));

    // Field configurations using UniversalFormField pattern
    const changeFields = [
        {
            name: "ChangeFrequency",
            type: "select",
            label: "Frequency for change?",
            Icon: FaCalendarAlt,
            options: frequencyOptions,
            required: true,
        },
        {
            name: "ChangeNotesAmount",
            type: "select",
            label: "Average notes value?",
            Icon: FaMoneyBillAlt,
            options: amountOptions,
            required: true,
        },
        {
            name: "ChangeCoinsAmount",
            type: "text",
            label: "Average coins value?",
            placeholder: "Enter amount",
            Icon: FaMoneyBillAlt,
            Icon2: FaDollarSign,
            required: true,
        },
        {
            name: "ChangeDays",
            type: "checkbox-group",
            label: "Usual day/s for delivery?",
            options: daysOptions,
            variant: "grid",
            required: true,
        },
        {
            name: "ChangeComments",
            type: "textarea",
            label: "Comments",
            placeholder: "Anything else you would like us to know?",
            rows: 3
        },
    ];

    // Get step data and progressive email status
    const stepData = formManager.getStepData();
    const progressEmails = formManager.progressiveEmailLog;
    const hasStep1Email = progressEmails.has('step-1');
    const hasStep2Email = progressEmails.has('step-2');

    return (
        <div className="form-page change">
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px]"
            >
                Change Service Details
            </Typography>

            <Typography
                as="p"
                fontFamily="font-montserrat"
                className="text-gray-300 font-normal text-center pb-4 text-[14px]"
            >
                Tell us about your change delivery requirements
            </Typography>

            <Divider
                color="primary"
                margin="mt-4"
                alignment="center"
            />

            {/* Progress notices */}
            <div className="progress-notices mb-4 space-y-2">
                {hasStep1Email && (
                    <div className="p-3 bg-green-900 bg-opacity-30 border border-green-400 rounded">
                        <div className="flex items-center text-green-400 text-sm">
                            <FaCheckCircle className="mr-2" />
                            Step 1: Contact details saved automatically
                        </div>
                    </div>
                )}

                {hasStep2Email && (
                    <div className="p-3 bg-green-900 bg-opacity-30 border border-green-400 rounded">
                        <div className="flex items-center text-green-400 text-sm">
                            <FaCheckCircle className="mr-2" />
                            Step 2: Banking service details saved automatically
                        </div>
                    </div>
                )}

                <div className="p-3 bg-blue-900 bg-opacity-30 border border-blue-400 rounded">
                    <div className="flex items-center text-blue-400 text-sm">
                        <FaInfoCircle className="mr-2" />
                        Final Step: Complete this form to submit your full quote request
                    </div>
                </div>
            </div>

            <div className="form-tab 480px:w-[90%] mx-auto">
                {/* All Change form fields */}
                {changeFields.map((field) => (
                    <div key={field.name} className="relative">
                        <UniversalFormField
                            {...formManager.getFieldProps(field)}
                            theme={theme}
                            autoComplete="new-password"
                        />
                    </div>
                ))}
            </div>

            {/* Service info */}
            <div className="mt-6 p-4 bg-gray-800 border border-gray-600 rounded">
                <h4 className="text-white text-sm font-semibold mb-2">Change Service Information</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Fresh currency notes and coins delivered to your premises</li>
                    <li>• Flexible delivery scheduling to match your business needs</li>
                    <li>• Secure transport in armoured vehicles</li>
                    <li>• Denominations tailored to your business requirements</li>
                </ul>
            </div>

            {/* Services summary */}
            {stepData.Service && stepData.Service.length > 0 && (
                <div className="mt-4 p-4 bg-gray-700 border border-gray-500 rounded">
                    <h4 className="text-white text-sm font-semibold mb-2">Your Selected Services</h4>
                    <div className="flex flex-wrap gap-2">
                        {stepData.Service.map((service) => (
                            <span
                                key={service}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#c6a54b] text-white"
                            >
                                <FaCheckCircle className="mr-1" />
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-2 bg-gray-800 text-gray-300 text-xs rounded">
                    <div>Final Step Data Preview:</div>
                    <div>Contact: {stepData.Name} ({stepData.Email})</div>
                    <div>Organisation: {stepData.Organisation}</div>
                    <div>Services: {stepData.Service?.join(', ')}</div>
                    <div>Progressive Emails: {progressEmails.size}</div>
                    <div>Session: {formManager.sessionId}</div>
                </div>
            )}
        </div>
    );
};

export default ChangeStep;