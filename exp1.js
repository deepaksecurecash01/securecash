// /components/forms/ICA/IndependentContractorsForm.js - FULLY UNIFIED WITH UNIVERSAL FORM FIELDS
"use client";
import React from "react";
import { useFormManager } from '@/hooks/useFormManager';
import FormHeader from "./sections/FormHeader.js";
import PersonalDetailsSection from "./sections/PersonalDetailsSection.js";
import AgreementTermSection from "./sections/AgreementTermSection.js";
import DeedOfGuaranteeSection from "./sections/DeedOfGuaranteeSection.js";
import ExecutedAsDeedSection from "./sections/ExecutedAsDeedSection.js";
import LicensingInsuranceSection from "./sections/LicensingInsuranceSection.js";
import EDocketSystemSection from "./sections/EDocketSystemSection.js";
import DriversSection from "./sections/DriversSection.js";
import { IcaFormSchema, ICA_DEFAULT_VALUES } from "@/zod/IcaFormSchema";

const COMPANY_INFO = {
  name: "Office Central Pty Ltd",
  acn: "ACN 668 461 050",
  address: "30 Church Hill Road, Old Noarlunga SA 5168",
  email: "sales@securecash.com.au",
};

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const SubmitButton = ({ formManager }) => (
  <button
    type="submit"
    disabled={formManager.isSubmitting}
    className={`nextBtn ${formManager.isSubmitted ? "bg-[#4bb543]" : "bg-[#c6a54b]"
      } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {formManager.isSubmitting ? (
      <span className="flex items-center justify-center gap-2">
        <LoadingSpinner />
        Submitting... Please Wait.
      </span>
    ) : formManager.isSubmitted ? (
      "Thank you. We received your submission!"
    ) : (
      "Click here to execute this deed & agreement"
    )}
  </button>
);

const SuccessMessage = () => (
  <div className="text-green-600 font-medium">
    <svg
      className="inline w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    Thank you. We received your submission!
  </div>
);

// Main Form Component - FULLY UNIFIED WITH UNIVERSAL FORM FIELDS
const IndependentContractorsForm = ({
  agreementTermData,
  deedOfGuaranteeData,
}) =>
{
  // Initialize the unified form manager with COMPLETE file upload support
  const formManager = useFormManager({
    schema: IcaFormSchema,
    defaultValues: ICA_DEFAULT_VALUES,
    formType: 'ica',
    formId: 'ICA',
    theme: 'ica',

    // ENABLE file upload with complete configuration
    fileUpload: {
      enabled: true,
      fields: [
        { field: 'GovernmentID', prefix: 'Guarantors Government ID' },
        { field: 'WitnessID', prefix: 'Witness ID' },
        { field: 'SecurityLicense', prefix: 'Security or Masters License' },
        { field: 'CITInsurance', prefix: 'CIT Insurance' }
      ],
      compression: {
        targetSizeKB: 400,
        maxSizeMB: 5,
        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
      },
      concurrencyLimit: 2
    },

    // Success/error handlers
    onSuccess: (result, finalData) =>
    {
      console.log("ICA form submitted successfully with attachments!", finalData);
    },
    onError: (error) =>
    {
      console.error("ICA form submission failed:", error);
    },

    // Data preparation - let file upload system handle everything
    prepareData: async (data) =>
    {
      // File processing is now handled automatically by useFormManager
      return { ...data, formType: "ica" };
    }
  });

  // Handle form submission
  const handleFormSubmit = async (e) =>
  {
    e.preventDefault();
    const result = await formManager.handleSubmit();
    return result;
  };

  return (
    <section className="1024px:py-[120px] 768px:bg-[#f2f2f2]">
      <div className="max-w-[1200px] mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-lg shadow-lg px-12 py-16 space-y-8"
          noValidate
          autoComplete="off"
        >
          <FormHeader COMPANY_INFO={COMPANY_INFO} />

          <PersonalDetailsSection formManager={formManager} />

          <AgreementTermSection
            formManager={formManager}
            agreementTermData={agreementTermData}
          />

          <DeedOfGuaranteeSection
            formManager={formManager}
            deedOfGuaranteeData={deedOfGuaranteeData}
            COMPANY_INFO={COMPANY_INFO}
          />

          <ExecutedAsDeedSection formManager={formManager} />

          <LicensingInsuranceSection formManager={formManager} />

          <EDocketSystemSection COMPANY_INFO={COMPANY_INFO} />

          <DriversSection formManager={formManager} />

          <div className="text-center space-y-4">
            <SubmitButton formManager={formManager} />
            {formManager.isSubmitted && <SuccessMessage />}
          </div>

          {/* Error Display */}
          {formManager.submissionError && (
            <div className="max-w-[1200px] mx-auto mt-4">
              <div className="text-red-600 text-center mb-4 p-4 bg-red-50 border border-red-200 rounded mx-4">
                <strong>Submission Error:</strong> {formManager.submissionError}
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="ml-4 text-blue-600 hover:underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* File Upload Progress */}
          {formManager.fileUpload && formManager.fileUpload.isProcessing && (
            <div className="max-w-[1200px] mx-auto mt-4">
              <div className="text-blue-600 text-center mb-4 p-4 bg-blue-50 border border-blue-200 rounded mx-4">
                <strong>Processing Files:</strong> {formManager.fileUpload.processingProgress}%
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default IndependentContractorsForm;// /components/forms/ICA/sections/AgreementTermSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import IcaContractorClauses from '../IcaAgreementClauses';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
  const Divider = ({
    color = "primary",
    width = "100px",
    alignment = "center",
    margin = "my-6",
    responsiveClassName = "",
    customStyle = {},
  }) =>
  {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const style = {
      width: resolvedWidth,
      height: "4px",
      borderRadius: "5px",
      ...customStyle,
    };

    if (alignment === "left") {
      style.marginLeft = 0;
      style.marginRight = "auto";
    } else if (alignment === "right") {
      style.marginLeft = "auto";
      style.marginRight = 0;
    } else {
      style.marginLeft = "auto";
      style.marginRight = "auto";
    }

    let colorClass = "";
    if (typeof color === "string" && color.startsWith("#")) {
      style.backgroundColor = color;
    } else if (color) {
      colorClass = `bg-${color}`;
    }

    return (
      <hr
        className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
        style={style}
      />
    );
  };

  return (
    <div className="mb-2">
      <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
        {Icon && <Icon className="text-[24px] text-primary" />}
        <h3 className="text-[26px] font-semibold text-gray-800">
          {children}
        </h3>
      </div>
      <Divider
        color="primary"
        alignment={position === 'left' ? 'left' : 'center'}
        margin="mt-[20px]"
        responsiveClassName="m-0 text-left"
      />
    </div>
  );
};

const AgreementTermSection = ({ formManager, agreementTermData }) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <SectionTitle Icon={FaCalendarAlt}>Agreement Term</SectionTitle>

    <div className="relative">
      <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
        This agreement will commence on the?
      </label>
      <UniversalFormField
        name="DateCommencement"
        control={formManager.control}
        type="date"
        theme="ica"
        dayPlaceholder="DD"
        monthPlaceholder="MM"
        yearPlaceholder="YYYY"
        format="dd/MM/yyyy"
        currentFocusField={formManager.currentFocusField}
        onFieldFocus={formManager.handleFieldFocus}
        onFieldBlur={formManager.handleFieldBlur}
      />
    </div>

    <p className="text-gray-700">
      And will be ongoing unless either party terminates this Agreement in
      accordance with the termination provisions herein (&quot;Expiry&quot;).
    </p>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">The Agreement</h4>
      <IcaContractorClauses data={agreementTermData} />

      <div className="relative">
        <UniversalFormField
          name="AcceptAgreement"
          control={formManager.control}
          type="checkbox-group"
          theme="ica"
          variant='agreement'
          options={[
            { value: "accepted", label: "I understand and accept the terms of this agreement." }
          ]}
          currentFocusField={formManager.currentFocusField}
          onFieldFocus={formManager.handleFieldFocus}
          onFieldBlur={formManager.handleFieldBlur}
        />
      </div>
    </div>
  </div>
);

export default AgreementTermSection;// /components/forms/ICA/sections/DeedOfGuaranteeSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaUser, FaMapMarkerAlt, FaCircle, FaFileSignature } from "react-icons/fa";
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import IcaContractorClauses from '../IcaAgreementClauses';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
  const Divider = ({
    color = "primary",
    width = "100px",
    alignment = "center",
    margin = "my-6",
    responsiveClassName = "",
    customStyle = {},
  }) =>
  {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const style = {
      width: resolvedWidth,
      height: "4px",
      borderRadius: "5px",
      ...customStyle,
    };

    if (alignment === "left") {
      style.marginLeft = 0;
      style.marginRight = "auto";
    } else if (alignment === "right") {
      style.marginLeft = "auto";
      style.marginRight = 0;
    } else {
      style.marginLeft = "auto";
      style.marginRight = "auto";
    }

    let colorClass = "";
    if (typeof color === "string" && color.startsWith("#")) {
      style.backgroundColor = color;
    } else if (color) {
      colorClass = `bg-${color}`;
    }

    return (
      <hr
        className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
        style={style}
      />
    );
  };

  return (
    <div className="mb-2">
      <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
        {Icon && <Icon className="text-[24px] text-primary" />}
        <h3 className="text-[26px] font-semibold text-gray-800">
          {children}
        </h3>
      </div>
      <Divider
        color="primary"
        alignment={position === 'left' ? 'left' : 'center'}
        margin="mt-[20px]"
        responsiveClassName="m-0 text-left"
      />
    </div>
  );
};

const DeedOfGuaranteeSection = ({ formManager, deedOfGuaranteeData, COMPANY_INFO }) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <SectionTitle Icon={FaFileSignature}>Deed of Guarantee</SectionTitle>

    <p className="text-gray-700">
      THIS DEED is made on the day at item 1 of the Schedule
    </p>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Recitals:</h4>

      <ul className="text-base text-gray-600 space-y-4 list-inside bg-[rgb(242,242,242,0.9)] p-4 rounded-lg">
        <li className="relative">
          <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
          <p className="pl-4">
            The Beneficiary at item 2 of the Schedule has agreed to engage the
            Contractor at item 3 of the Schedule as in the capacity of independent
            contractor.
          </p>
        </li>
        <li className="relative">
          <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
          <p className="pl-4">
            The Guarantor at item 4 of the Schedule agrees to guarantee the
            performances by the Contractor of its duties as independent contractor
            in the terms of an agreement in writing on the Beneficiaries website
            at item 5 of the Schedule (the &apos;Duties&apos; and &apos;Duty&apos; in the case of any
            individual duty within the Duties, as the context requires)
          </p>
        </li>
        <li className="relative">
          <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-2" />
          <p className="pl-4">
            In consideration of the Guarantor entering into this deed with the
            Beneficiary, the Beneficiary agrees to engage and or continue to
            engage the Contractor as independent contractor.
          </p>
        </li>
      </ul>
    </div>

    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-800">Clauses:</h4>
      <IcaContractorClauses data={deedOfGuaranteeData} />

      <div className="relative">
        <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
          Date of Deed
        </label>
        <UniversalFormField
          name="DateDeed"
          control={formManager.control}
          type="date"
          theme="ica"
          dayPlaceholder="DD"
          monthPlaceholder="MM"
          yearPlaceholder="YYYY"
          format="dd/MM/yyyy"
          currentFocusField={formManager.currentFocusField}
          onFieldFocus={formManager.handleFieldFocus}
          onFieldBlur={formManager.handleFieldBlur}
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Beneficiary:</h4>
        <div className="bg-[rgb(242,242,242,0.9)] p-4 rounded-lg">
          <p className="text-gray-700">
            {COMPANY_INFO.name.toUpperCase()} of <br />
            {COMPANY_INFO.address}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-800">Guarantors:</h4>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            What is your full name?
          </label>
          <UniversalFormField
            name="NameConfirm"
            control={formManager.control}
            type="text"
            theme="ica"
            placeholder="Your Full Name"
            Icon={FaUser}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            Please enter your residential address here:
          </label>
          <UniversalFormField
            name="AddressResidential"
            control={formManager.control}
            type="text"
            theme="ica"
            placeholder="Your Physical Address"
            Icon={FaMapMarkerAlt}
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
          />
        </div>

        <div className="relative">
          <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
            Please upload any government photo ID unique to yourself, i.e. drivers license.
          </label>
          <UniversalFormField
            name="GovernmentID"
            control={formManager.control}
            type="file"
            theme="ica"
            accept="image/*"
            currentFocusField={formManager.currentFocusField}
            onFieldFocus={formManager.handleFieldFocus}
            onFieldBlur={formManager.handleFieldBlur}
            fileUploadState={formManager.fileUpload}
          />
        </div>
      </div>
    </div>
  </div>
);

export default DeedOfGuaranteeSection;// /components/forms/ICA/sections/DriversSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaUsers, FaCircle, FaIdCard, FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
  const Divider = ({
    color = "primary",
    width = "100px",
    alignment = "center",
    margin = "my-6",
    responsiveClassName = "",
    customStyle = {},
  }) =>
  {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const style = {
      width: resolvedWidth,
      height: "4px",
      borderRadius: "5px",
      ...customStyle,
    };

    if (alignment === "left") {
      style.marginLeft = 0;
      style.marginRight = "auto";
    } else if (alignment === "right") {
      style.marginLeft = "auto";
      style.marginRight = 0;
    } else {
      style.marginLeft = "auto";
      style.marginRight = "auto";
    }

    let colorClass = "";
    if (typeof color === "string" && color.startsWith("#")) {
      style.backgroundColor = color;
    } else if (color) {
      colorClass = `bg-${color}`;
    }

    return (
      <hr
        className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
        style={style}
      />
    );
  };

  return (
    <div className="mb-2">
      <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
        {Icon && <Icon className="text-[24px] text-primary" />}
        <h3 className="text-[26px] font-semibold text-gray-800">
          {children}
        </h3>
      </div>
      <Divider
        color="primary"
        alignment={position === 'left' ? 'left' : 'center'}
        margin="mt-[20px]"
        responsiveClassName="m-0 text-left"
      />
    </div>
  );
};

const DriversSection = ({ formManager }) =>
{
  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 gap-4 flex flex-col justify-center mr-2">
            <SectionTitle position="left" Icon={FaUsers}>
              Let's get set up for contracting using eDockets!
            </SectionTitle>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-gray-700">
                To complete the submission of this Independent Contractors Agreement, if you have not done so already, you will need to access the eDockets Contractor Portal where you will be required to <strong>"Register as a Contractor"</strong> and set yourself up as a Contractor in the eDockets system.
              </p>

              <p className="text-gray-700">
                This access <strong className='font-semibold'>does not cost you anything</strong> and will provide you with:
              </p>

              <ul className="text-sm text-gray-600 space-y-4 list-inside ml-6">
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    One App login for your Staff (Operators) to service all eDockets Licensees
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Transparency for the locations you service for eDockets Licensees in a view only format
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Access to view all services your Operators perform through the eDockets App
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Ability to manage your Contractor (Assignee), including your company details, customise your email notifications and upload your Licenses and Insurances
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Create and manage your own Operators to provide access to the eDockets App
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Create and manage Run Lists based off Locations you service for eDockets Licensees, including additional bookings that come through, assigning these to your Operators for servicing in the app
                  </p>
                </li>
                <li className="relative">
                  <FaCircle className="text-primary text-[8px] mr-3 flex-shrink-0 absolute top-1" />
                  <p className="pl-4">
                    Streamline your invoicing by exporting the billing data directly from the Contractor Portal based off the services performed through the app
                  </p>
                </li>
              </ul>

              <Link
                href={'https://contractor.edockets.app/'}
                target='_blank'
                className="nextBtn bg-primary text-white my-2 border-none py-[18px] px-[20px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base shadow-none font-montserrat flex justify-center items-center gap-2 mx-auto 768px:mx-0 w-[200px]"
              >
                Register Now
                <FaArrowRightLong className="text-[14px]" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="images/eDockets-Contractor-Register.webp"
              className="1024px:h-[450px]"
              alt="Sample passport photo guidelines"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className='text-gray-700 font-semibold'>
            Once Registered - At the top of the "Assignee" tab you will see "Your code to provide to an eDockets Licensee", copy this code and paste it into the field below so we can get everything ready for you to start servicing the SecureCash clients!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg space-y-4">
          <div className="w-3/5 mx-auto">
            <div className="relative grid grid-cols-5 items-center">
              <label className="text-primary-text text-[16px] font-semibold px-1 768px:px-0 col-span-2">
                eDockets Contractor Code
              </label>
              <div className="col-span-3">
                <UniversalFormField
                  name="eDocketsContractorCode"
                  control={formManager.control}
                  type="text"
                  theme="ica"
                  placeholder="eDockets Contractor Code"
                  Icon={FaIdCard}
                  currentFocusField={formManager.currentFocusField}
                  onFieldFocus={formManager.handleFieldFocus}
                  onFieldBlur={formManager.handleFieldBlur}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversSection;// /components/forms/ICA/sections/EDocketSystemSection.js - REFACTORED FOR useFormManager
import React from 'react';
import { FaClock } from "react-icons/fa";
import { IcaSectionTitle } from '../IcaWrapperComponents';
import VimeoLite from "@/components/VimeoLite";

const EDocketSystemSection = ({ COMPANY_INFO }) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <IcaSectionTitle Icon={FaClock}>eDocket System</IcaSectionTitle>

    <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
      <p className="text-sm text-gray-700 mb-4">
        You can start using this technology to service your own clients as an
        eDockets Licensee. We know first hand how annoying it is to have a
        mountain of paperwork cluttering your office and dealing with dozens of
        seperate spreadsheets to manage your client listings. With this system
        all the paper work is gone and yet all the information is so much easier
        to access! <br /><br />

        eDockets provides you a full database to better manage your
        Operations and providing clients with their own dedicated access to be
        able to manage their own services by booking Extra Pickups, submitting
        their Change Orders and Cancelling a service when it is no longer
        required. You are also able to completely organise your daily operations
        with Run Sheets that feed directly to the Operator in the app and
        Automated Invoicing where charges automatically generate with the
        transactions you perform and instant export at the end of the month,
        just to name a couple of the benefits! <br /><br />

        Let us know if you would like more information, simply send an email to{" "}
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="text-primary underline"
        >
          {COMPANY_INFO.email}{" "}
        </a>
        and check out the video below!{" "}
      </p>

      <div className="aspect-video bg-gray-200 rounded-sm flex items-center justify-center">
        <div className="video-player rounded-lg overflow-hidden w-full h-full">
          <VimeoLite videoId="339048754" />
        </div>
      </div>
    </div>
  </div>
);

export default EDocketSystemSection;// /components/forms/ICA/sections/ExecutedAsDeedSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import { FaMapMarkerAlt, FaUser, FaFileContract, FaBuilding } from "react-icons/fa";
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
    const Divider = ({
        color = "primary",
        width = "100px",
        alignment = "center",
        margin = "my-6",
        responsiveClassName = "",
        customStyle = {},
    }) =>
    {
        const resolvedWidth = typeof width === "number" ? `${width}px` : width;

        const style = {
            width: resolvedWidth,
            height: "4px",
            borderRadius: "5px",
            ...customStyle,
        };

        if (alignment === "left") {
            style.marginLeft = 0;
            style.marginRight = "auto";
        } else if (alignment === "right") {
            style.marginLeft = "auto";
            style.marginRight = 0;
        } else {
            style.marginLeft = "auto";
            style.marginRight = "auto";
        }

        let colorClass = "";
        if (typeof color === "string" && color.startsWith("#")) {
            style.backgroundColor = color;
        } else if (color) {
            colorClass = `bg-${color}`;
        }

        return (
            <hr
                className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
                style={style}
            />
        );
    };

    return (
        <div className="mb-2">
            <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
                {Icon && <Icon className="text-[24px] text-primary" />}
                <h3 className="text-[26px] font-semibold text-gray-800">
                    {children}
                </h3>
            </div>
            <Divider
                color="primary"
                alignment={position === 'left' ? 'left' : 'center'}
                margin="mt-[20px]"
                responsiveClassName="m-0 text-left"
            />
        </div>
    );
};

const ExecutedAsDeedSection = ({ formManager }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaFileContract}>Executed As A Deed</SectionTitle>

        <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
            <p className="text-sm text-gray-700 mb-4 font-medium">
                SIGNED, SEALED and DELIVERED by:
            </p>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please enter your business/company name:
                </label>
                <UniversalFormField
                    name="BusinessName"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Business or Company Name"
                    Icon={FaBuilding}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <p className="text-xs text-gray-600 mt-4">
                In accordance with its Constitution (if any) as a deed pursuant to
                section 127 of the Corporations Act.
            </p>
        </div>

        <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">Witness:</h4>
            <p className="text-sm text-gray-600">
                Please provide the details to a person over the age of 18 that can
                witness you completing the required information and authorising this
                Deed of Guarantee:
            </p>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Full name of the witness:
                </label>
                <UniversalFormField
                    name="WitnessName"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Witness's Name"
                    Icon={FaUser}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please enter the residential address of the witness:
                </label>
                <UniversalFormField
                    name="WitnessAddress"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Witness's Address"
                    Icon={FaMapMarkerAlt}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please upload any government ID unique to the witness (e.g. driver's license):
                </label>
                <UniversalFormField
                    name="WitnessID"
                    control={formManager.control}
                    type="file"
                    theme="ica"
                    accept="image/*"
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                    fileUploadState={formManager.fileUpload}
                />
            </div>
        </div>
    </div>
);

export default ExecutedAsDeedSection; import Divider from "@/components/common/Divider";



const LicensingInsuranceSection = ({ formManager }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaShieldAlt}>Licensing & Insurance</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please upload a copy of your Security or Masters License:
                </label>
                <UniversalFormField
                    name="SecurityLicense"
                    control={formManager.control}
                    type="file"
                    theme="ica"
                    accept="image/*,.pdf"
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                    fileUploadState={formManager.fileUpload}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    Please upload a copy of your cash in transit insurance:
                </label>
                <UniversalFormField
                    name="CITInsurance"
                    control={formManager.control}
                    type="file"
                    theme="ica"
                    accept="image/*,.pdf"
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                    fileUploadState={formManager.fileUpload}
                />
            </div>
        </div>
    </div>
);

export default LicensingInsuranceSection;// /components/forms/ICA/sections/PersonalDetailsSection.js - PURE UNIVERSAL FORM FIELDS
import React from 'react';
import
    {
        FaUser,
        FaPhone,
        FaEnvelope,
        FaInfoCircle,
        FaBuilding,
        FaMapMarkerAlt,
        FaIdCard
    } from "react-icons/fa";
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';

// Section Title Component - Pixel-perfect match to original
const SectionTitle = ({ children, Icon, position = 'center' }) =>
{
    const Divider = ({
        color = "primary",
        width = "100px",
        alignment = "center",
        margin = "my-6",
        responsiveClassName = "",
        customStyle = {},
    }) =>
    {
        const resolvedWidth = typeof width === "number" ? `${width}px` : width;

        const style = {
            width: resolvedWidth,
            height: "4px",
            borderRadius: "5px",
            ...customStyle,
        };

        if (alignment === "left") {
            style.marginLeft = 0;
            style.marginRight = "auto";
        } else if (alignment === "right") {
            style.marginLeft = "auto";
            style.marginRight = 0;
        } else {
            style.marginLeft = "auto";
            style.marginRight = "auto";
        }

        let colorClass = "";
        if (typeof color === "string" && color.startsWith("#")) {
            style.backgroundColor = color;
        } else if (color) {
            colorClass = `bg-${color}`;
        }

        return (
            <hr
                className={`border-0 ${colorClass} ${margin} ${responsiveClassName}`}
                style={style}
            />
        );
    };

    return (
        <div className="mb-2">
            <div className={`flex items-center gap-3 mb-4 justify-center ${position === 'left' ? ' 1024px:justify-start' : 'justify-center'}`}>
                {Icon && <Icon className="text-[24px] text-primary" />}
                <h3 className="text-[26px] font-semibold text-gray-800">
                    {children}
                </h3>
            </div>
            <Divider
                color="primary"
                alignment={position === 'left' ? 'left' : 'center'}
                margin="mt-[20px]"
                responsiveClassName="m-0 text-left"
            />
        </div>
    );
};

const ORGANIZATION_OPTIONS = [
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
];

const PersonalDetailsSection = ({ formManager }) => (
    <div className="space-y-6 border-b border-dark-border/30 pb-12">
        <SectionTitle Icon={FaUser}>Personal Details</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your full name?
                </label>
                <UniversalFormField
                    name="Name"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Full Name"
                    Icon={FaUser}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is the organisation structure type?
                </label>
                <UniversalFormField
                    name="OrganisationType"
                    control={formManager.control}
                    type="select"
                    theme="ica"
                    options={ORGANIZATION_OPTIONS}
                    Icon={FaBuilding}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 768px:grid-cols-2 1024px:grid-cols-3 gap-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your ABN number?
                </label>
                <UniversalFormField
                    name="ABN"
                    control={formManager.control}
                    type="abn"
                    theme="ica"
                    placeholder="Your ABN Number"
                    Icon={FaIdCard}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your best contact number?
                </label>
                <UniversalFormField
                    name="Phone"
                    control={formManager.control}
                    type="tel"
                    theme="ica"
                    placeholder="Your Phone Number"
                    Icon={FaPhone}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your email address?
                </label>
                <UniversalFormField
                    name="Email"
                    control={formManager.control}
                    type="email"
                    theme="ica"
                    placeholder="Your Email Address"
                    Icon={FaEnvelope}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>

        <div className="bg-dark-border/90 p-4 rounded-lg">
            <p className="text-sm text-white">
                <FaInfoCircle className="inline mr-2" />
                A copy of this agreement will be sent to the address provided.
            </p>
        </div>

        <div className="space-y-6">
            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your physical address?
                </label>
                <UniversalFormField
                    name="Address"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Physical Address"
                    Icon={FaMapMarkerAlt}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>

            <div className="relative">
                <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                    What is your postal address?
                </label>
                <UniversalFormField
                    name="AddressPostal"
                    control={formManager.control}
                    type="text"
                    theme="ica"
                    placeholder="Your Postal Address"
                    Icon={FaMapMarkerAlt}
                    currentFocusField={formManager.currentFocusField}
                    onFieldFocus={formManager.handleFieldFocus}
                    onFieldBlur={formManager.handleFieldBlur}
                />
            </div>
        </div>
    </div>
);

export default PersonalDetailsSection;
import { z } from "zod";

export const IcaFormSchema = z.object({
    // Personal Details fields
    Name: z.string().min(1, "Full name is required"),
    OrganisationType: z
        .string()
        .min(1, "Organization type is required")
        .refine((value) => value !== "", "Please select an organization type"),
    ABN: z.string().min(11, "ABN number must be at least 11 digits"),
    Phone: z.string().min(10, "Phone number must be at least 10 digits"),
    Email: z.string().email("Invalid email address"),
    Address: z.string().min(1, "Physical address is required"),
    AddressPostal: z.string().min(1, "Postal address is required"),

    // Agreement Term fields
    DateCommencement: z
        .date({
            required_error: "Agreement commencement date is required",
            invalid_type_error: "Agreement commencement date is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Agreement commencement date must be in the past or today",
        }),
    AcceptAgreement: z
        .array(z.string()),
     

    // Deed of Guarantee fields
    DateDeed: z
        .date({
            required_error: "Date of deed is required",
            invalid_type_error: "Date of deed is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Date of deed must be in the past or today",
        }),

    NameConfirm: z.string().min(1, "Full name confirmation is required"),
    AddressResidential: z.string().min(1, "Residential address is required"),

    // File fields - Made optional initially and validated conditionally
    GovernmentID: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a government ID file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/");
        }, "Only image files are allowed for government ID"),

    // Executed as Deed fields
    BusinessName: z.string().min(1, "Business/company name is required"),
    WitnessName: z.string().min(1, "Witness name is required"),
    WitnessAddress: z.string().min(1, "Witness address is required"),

    WitnessID: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a witness ID file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/");
        }, "Only image files are allowed for witness ID"),

    // Licensing & Insurance fields
    SecurityLicense: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a security license file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/") || file.type === "application/pdf";
        }, "Only image files or PDF are allowed for security license"),

    CITInsurance: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a cash in transit insurance file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/") || file.type === "application/pdf";
        }, "Only image files or PDF are allowed for insurance document"),

    // eDockets field
    eDocketsContractorCode: z.string().min(1, "eDockets contractor code is required"),
});

// Updated default values to match schema
export const ICA_DEFAULT_VALUES = {
    // Personal Details
    Name: "",
    OrganisationType: "",
    ABN: "",
    Phone: "",
    Email: "",
    Address: "",
    AddressPostal: "",

    // Agreement Term
    DateCommencement: null,
    AcceptAgreement: false,

    // Deed of Guarantee
    DateDeed: null,
    NameConfirm: "",
    AddressResidential: "",
    GovernmentID: null,

    // Executed as Deed
    BusinessName: "",
    WitnessName: "",
    WitnessAddress: "",
    WitnessID: null,

    // Licensing & Insurance
    SecurityLicense: null,
    CITInsurance: null,

    // eDockets
    eDocketsContractorCode: "",
};

