import { FaMapMarkerAlt, FaUser, FaFileContract, FaBuilding } from "react-icons/fa";
import
{
  Checkbox,
  InputField,
  SelectionBox,
  FileUpload,
  SectionTitle,
} from "../FormComponents";

const ExecutedAsDeedSection = ({
  register,
  watch,
  setValue,
  trigger,
  clearErrors,
  formData,
  handleFieldChange,
  currentErrorField,
  setCurrentErrorField,
  errors,
}) => (
  <div className="space-y-6 border-b border-dark-border/30 pb-12">
    <SectionTitle Icon={FaFileContract}>Executed As A Deed</SectionTitle>

    <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg">
      <p className="text-sm text-gray-700 mb-4 font-medium">
        SIGNED, SEALED and DELIVERED by:
      </p>

      <InputField
        label="Please enter your business/company name:"
        name="BusinessName"
        register={register}
        value={formData.BusinessName}
        onChange={(value) => handleFieldChange('BusinessName', value)}
        placeholder="Your Business or Company Name"
        Icon={FaBuilding}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        errors={errors}
      />

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

      <InputField
        label="Full name of the witness:"
        name="WitnessName"
        register={register}
        value={formData.WitnessName}
        onChange={(value) => handleFieldChange('WitnessName', value)}
        placeholder="Your Witness's Name"
        Icon={FaUser}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        errors={errors}
      />

      <InputField
        label="Please enter the residential address of the witness:"
        name="WitnessAddress"
        register={register}
        value={formData.WitnessAddress}
        onChange={(value) => handleFieldChange('WitnessAddress', value)}
        placeholder="Your Witness's Address"
        Icon={FaMapMarkerAlt}
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        errors={errors}
      />

      <FileUpload
        label="Please upload any government ID unique to the witness (e.g. driver's license):"
        name="WitnessID"
        register={register}
        value={formData.WitnessId}
        onChange={(value) => handleFieldChange('WitnessID', value)}
        accept="image/*"
        currentErrorField={currentErrorField}
        setCurrentErrorField={setCurrentErrorField}
        errors={errors}
      />
    </div>
  </div>
);

export default ExecutedAsDeedSection;