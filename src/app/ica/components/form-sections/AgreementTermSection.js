import
{
  InputField,
  SelectionBox,
  FileUpload,
  SectionTitle,
} from "../FormComponents";


import
{
  FaCalendarAlt,
} from "react-icons/fa";
import IcaContractorClauses from "../IcaAgreementClauses";
import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import styles from "@/components/common/checkbox/Checkbox.module.css";
import DatePickerFieldWithRef from "@/components/common/forms/elements/DatePickerField";

const Checkbox = ({
  value = false, // Default to false to prevent undefined
  className = "",
  style = {},
  register,
  label,
  name,
  errors,
  currentErrorField,
  setCurrentErrorField,
  registerFieldRef,
}) =>
{
  const registerProps = register ? register(name) : {};

  const handleRef = (ref) =>
  {
    // Register with react-hook-form
    if (registerProps.ref) {
      registerProps.ref(ref);
    }
    // Register with field focusing system
    if (registerFieldRef) {
      registerFieldRef(name, ref);
    }
  };

  return (
    <div className={`${className} ${styles.checkbox} relative`} style={style}>
      <input
        type="checkbox"
        name={name}
        checked={Boolean(value)} // Ensure it's always a boolean
        {...registerProps}
        ref={handleRef}
        onFocus={() => setCurrentErrorField && setCurrentErrorField(name)}
        onBlur={() => setCurrentErrorField && setCurrentErrorField(null)}
        data-validate="CheckboxMulti"
        className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
      />
      <label
        className="font-medium mt-4 text-left w-full relative flex"
        htmlFor={name}
      >
        <span className="w-[28px] h-[28px]"></span>
        <div>
          {label}
        </div>
      </label>
      {errors[name] && (
        <WarningPopup
          error={errors[name]?.message}
          isFirstError={currentErrorField === name}
        />
      )}
    </div>
  );
};

const AgreementTermSection = ({
  register,
  watch,
  setValue,
  trigger,
  clearErrors,
  agreementTermData,
  formData,
  handleFieldChange,
  currentErrorField,
  setCurrentErrorField,
  errors,
}) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <SectionTitle Icon={FaCalendarAlt}>Agreement Term</SectionTitle>

    <DatePickerFieldWithRef
      label="This agreement will commence on the?"
      name="DateCommencement"
      value={formData.DateCommencement}

      onChange={(date) =>
      {
        setValue("DateCommencement", date, { shouldValidate: true });
        handleFieldChange('DateCommencement', date);
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

    <p className="text-gray-700">
      And will be ongoing unless either party terminates this Agreement in
      accordance with the termination provisions herein (&quot;Expiry&quot;).
    </p>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">The Agreement</h4>
      <IcaContractorClauses data={agreementTermData} />
      <Checkbox
        label="I understand and accept the terms of this agreement."
        name="AcceptAgreement"
        value={formData.AcceptAgreement}
        register={register}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        errors={errors}
      />
    </div>
  </div>
);

export default AgreementTermSection;