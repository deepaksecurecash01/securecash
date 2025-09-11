import
{
  Checkbox,
  InputField,
  SelectionBox,
  FileUpload,
  SectionTitle,
} from "../FormComponents";

import
{
  FaUser,
  FaMapMarkerAlt,
  FaCircle,
  FaCalendarAlt,
  FaFileSignature,
} from "react-icons/fa";
import IcaContractorClauses from "../IcaAgreementClauses";
import DatePickerFieldWithRef from "@/components/common/forms/QuoteForm/DatePickerField";

const DeedOfGuaranteeSection = ({
  register,
  watch,
  setValue,
  trigger,
  clearErrors,
  deedOfGuaranteeData,
  formData,
  handleFieldChange,
  currentErrorField,
  setCurrentErrorField,
  errors,
  COMPANY_INFO,
}) => (
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

      <DatePickerFieldWithRef
        label="Date of Deed"
        name="DateDeed"
        value={formData.DateDeed}
        onChange={(date) =>
        {
          setValue("DateDeed", date, { shouldValidate: true });
          handleFieldChange('DateDeed', date);
        }}
        onFocus={setCurrentErrorField}
        onBlur={setCurrentErrorField}
        errors={errors}
        currentErrorField={currentErrorField}
        dayPlaceholder="DD"
        monthPlaceholder="MM"
        yearPlaceholder="YYYY"
        format="dd/MM/yyyy"
      />

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

        <InputField
          label="What is your full name?"
          name="NameConfirm"
          register={register}
          value={formData.NameConfirm}
          onChange={(value) => handleFieldChange('NameConfirm', value)}
          placeholder="Your Full Name"
          Icon={FaUser}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          errors={errors}
        />

        <InputField
          label="Please enter your residential address here:"
          name="AddressResidential"
          register={register}
          value={formData.AddressResidential}
          onChange={(value) => handleFieldChange('AddressResidential', value)}
          placeholder="Your Physical Address"
          Icon={FaMapMarkerAlt}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          errors={errors}
        />

        <FileUpload
          label="Please upload any government photo ID unique to yourself, i.e. drivers license."
          name="GovernmentID"
          register={register}
          value={formData.GovernmentID}
          onChange={(value) => handleFieldChange('GovernmentID', value)}
          accept="image/*"
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
          errors={errors}
        />
      </div>
    </div>
  </div>
);

export default DeedOfGuaranteeSection;