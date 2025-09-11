// ============= SIMPLIFIED SiteInfoForm.js - PRODUCTION READY =============
"use client";
import React from "react";
import { FaChevronLeft, FaSpinner, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useFormManager } from '@/hooks/useFormManager';
import Typography from "@/components/common/Typography";
import Divider from "@/components/common/Divider";

// Import step components
import SiteBusinessStep from "./SiteInfo/steps/SiteBusinessStep";
import SiteContactStep from "./SiteInfo/steps/SiteContactStep";
import SiteServiceStep from "./SiteInfo/steps/SiteServiceStep";

// Import hazard form components
import SiteRiskFormFields from "./SiteRiskFormFields";

// UPDATED: Import the restructured schemas
import
    {
        UNIFIED_SITE_INFO_SCHEMA,
        UNIFIED_DEFAULT_VALUES
    } from '@/zod/SiteInfoFormSchema';
import ThankYouModal from "./ThankYouModal";

const SiteInfoForm = () =>
{
    // SIMPLIFIED: Single form manager for everything with proper schema structure
    const formManager = useFormManager({
        schema: UNIFIED_SITE_INFO_SCHEMA, // Now includes 'risk' step
        defaultValues: UNIFIED_DEFAULT_VALUES,
        formType: 'siteinfo',
        formId: 'SiteInfo',
        theme: 'hybrid',

        // Multi-step configuration
        multiStep: {
            steps: ['business', 'contact', 'service', 'risk'],
            conditional: false
        },

        // Hybrid enables hazard section after step 3
        hybrid: {
            enabled: true,
            reviewStep: 3,
            submitEnabled: false
        },

        onSuccess: (result, finalData) =>
        {
            console.log("Complete form submitted successfully!", finalData);
        },
        onError: (error) =>
        {
            console.error("Form submission failed:", error);
        },
        prepareData: async (data) =>
        {
            return { ...data, formType: "siteinfo" };
        }
    });

    const { stepId, currentStep, isFirst } = formManager.getCurrentStep();
    const { submitButtonEnabled } = formManager;

    // Focus hazard form when step completes to review
    React.useEffect(() =>
    {
        if (stepId === 'risk') {
            console.log('Reached review step - focusing hazard form');
            requestAnimationFrame(() =>
            {
                const firstHazardField = document.querySelector('.forms-franchise-v2 select:first-of-type');
                if (firstHazardField) {
                    firstHazardField.focus();
                    firstHazardField.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        }
    }, [stepId]);

    // SIMPLIFIED: Single submit handler for both forms
    const handleFormSubmit = async (e) =>
    {
        e.preventDefault();

        // The enhanced form manager handles both multi-step progression and final hybrid submission
        const result = await formManager.handleSubmit();
        return result;
    };

    // Step rendering
    const renderCurrentStep = () =>
    {
        const stepComponents = {
            business: SiteBusinessStep,
            contact: SiteContactStep,
            service: SiteServiceStep,
            risk: () => (
                <div className="h-full flex flex-col items-center justify-center gap-2">
                    <Typography as="h4" fontFamily="montserrat"
                        className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]">
                        Review & Edit Previous Steps
                    </Typography>
                    <div>
                        <button type="button" onMouseDown={(e) =>
                        {
                            e.preventDefault();
                            e.stopPropagation();
                            formManager.goToStep(2);
                        }}
                            className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat">
                            Edit Form
                        </button>
                    </div>
                </div>
            )
        };

        const StepComponent = stepComponents[stepId];
        if (!StepComponent) return <div>Unknown step: {stepId}</div>;

        if (stepId === 'risk') return <StepComponent />;

        return <StepComponent formManager={formManager} theme="dark" />;
    };

    return (
        <>
            {/* Contact Content Section */}
            <div id="content-contact" className="bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px] 1280px:my-[120px]">
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex items-center">
                    <div className="right-contact-row w-[96%] 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 992px:pt-0 [flex:1] 992px:pl-8">
                        <Typography as="h3" fontFamily="montserrat"
                            className="text-[22px] 480px:mt-10 font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0">
                            Thanks for that! This is the final step in order to getting your service setup.
                        </Typography>

                        <Divider color="primary" alignment="left" margin="my-5" responsiveClassName="768px:text-left 768px:mx-0" />

                        <Typography as="p" fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light">
                            Please provide us with the necessary contact information and the service schedule
                            that you would like us to implement. Please note that this form needs to be submitted
                            once per location that you wish us to collect cash from or deliver cash to.
                        </Typography>

                        <Typography as="p" fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light">
                            If you are not after a regular collection but a once off collection fill out the form located{" "}
                            <span className="underline">
                                <strong className="uppercase">
                                    <a href="https://www.securecash.com.au/special-event/">HERE</a>
                                </strong>
                            </span>{" "}
                            instead.
                        </Typography>

                        <Typography as="p" fontFamily="montserrat"
                            className="text-[16px] leading-[2rem] text-left mb-4 768px:text-left font-light flex flex-col gap-4">
                            <span>
                                To learn more about how we manage information provided you can view our{" "}
                                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/privacy-policy/">
                                    Privacy Policy
                                </Link>.
                            </span>
                            <strong>
                                <Link className="text-primary hover:underline" href="https://www.securecash.com.au/austrac/">
                                    &lt;&lt; Previous
                                </Link>
                            </strong>
                        </Typography>
                    </div>

                    <div className="[flex:1]">
                        {/* Multi-Step Form - Dark Theme */}
                        <div className="float-none w-full mx-auto relative left-0 flex-1 flex justify-center h-[844px]">
                            <form
                                className="forms-site-info h-auto px-[30px] 1366px:h-full submit-status mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 992px:w-[450px] 1100px:w-[480px] 1200px:w-[500px] 1280px:w-[600px] shadow-[3px_3px_5px_0px_rgba(0,0,0,0.75)] text-center py-8 rounded-[6px] bg-[#1a1a1a] relative"
                                data-formid="SiteInfoMultiStep"
                                onSubmit={handleFormSubmit}
                                noValidate
                            >
                                {/* Back button */}
                                {!isFirst && stepId !== 'risk' && (
                                    <div className="form-slide-btn-wrap mb-4 absolute">
                                        <button type="button" onClick={formManager.goBack}
                                            className="flex items-center text-white hover:text-[#c6a54b] transition-colors">
                                            <FaChevronLeft className="mr-2" />
                                            <span>Back</span>
                                        </button>
                                    </div>
                                )}

                                {/* Current step */}
                                <div className={`${stepId === 'risk' && "h-full"}`}>
                                    {renderCurrentStep()}
                                </div>

                                {/* Next button */}
                                {stepId !== 'risk' && (
                                    <div className="button-controls-container w-[80%] mx-auto mt-7">
                                        <div className="button-section relative">
                                            <button type="submit" disabled={formManager.isSubmitting}
                                                className="nextBtn bg-[#c6a54b] text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50">
                                                {formManager.isSubmitting ? (
                                                    <div className="flex items-center justify-center">
                                                        <FaSpinner className="animate-spin mr-2" />
                                                        Processing...
                                                    </div>
                                                ) : currentStep === 2 ? "Continue" : "Next"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hazard Form Section - Always Visible */}
            <div id="contact-form-section" className="inline-block w-full mb-12 480px:mb-[120px]">
                <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0 992px:flex">
                    <div className="414px:mx-4 hidden 992px:block 992px:w-[50%] 992px:mx-0 py-8 px-10 480px:px-[5%] 992px:pl-8 1280px:pl-24 992px:pt-32 shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] rounded-t-[8px] 992px:rounded-l-[8px] 992px:rounded-tr-none relative">
                        <Image
                            src="https://www.securecash.com.au/images/welcome/terms-main-img-2.jpg"
                            alt="Making A Deal"
                            fill
                            objectFit="cover"
                        />
                    </div>

                    {/* SIMPLIFIED: Hazard Form - Uses same form manager and submit handler */}
                    <div className={`float-none 992px:w-[80%] 992px:float-left relative left-0 flex justify-center transition-opacity duration-300 ${!submitButtonEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'
                        }`}>
                        <form
                            className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-4 600px:px-8 480px:px-[5%] 1366px:h-full submit-status w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative 1366px:pt-[74px] 1366px:pb-[84px]"
                            data-formid="SiteInfo"
                            style={{ background: "#f1f1f1" }}
                            onSubmit={handleFormSubmit}
                            noValidate
                        >
                            <div className="form-tab 480px:w-[90%] mx-auto">
                                <Typography as="h3" fontFamily="montserrat"
                                    className="text-[22px] font-semibold leading-[1.6em] mx-auto 992px:text-[26px] 768px:text-left 768px:mx-0">
                                    Site Risk Information
                                </Typography>

                                <Divider color="primary" alignment="left" margin="my-5" responsiveClassName="768px:text-left 768px:mx-0" />

                                <Typography as="p" fontFamily="montserrat"
                                    className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 768px:text-left font-light">
                                    Please provide us with the information below so our Area Managers
                                    and Banking Couriers can better identify any potential hazards or
                                    dangers at this location.
                                </Typography>

                                {/* SIMPLIFIED: Risk Assessment Fields - uses same form manager */}
                                <SiteRiskFormFields formManager={formManager} />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Error Display */}
                {formManager.submissionError && (
                    <div className="max-w-[1366px] mx-auto mt-4">
                        <div className="text-red-600 text-center mb-4 p-4 bg-red-50 border border-red-200 rounded mx-4">
                            <strong>Submission Error:</strong> {formManager.submissionError}
                            <button onClick={() => window.location.reload()}
                                className="ml-4 text-blue-600 hover:underline">
                                Retry
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Thank You Modal */}
            <ThankYouModal
                showThankYou={formManager.isSubmitted}
                setIsFormSubmitted={() => { }}
                type="Thankyou"
            />
        </>
    );
};

export default SiteInfoForm;