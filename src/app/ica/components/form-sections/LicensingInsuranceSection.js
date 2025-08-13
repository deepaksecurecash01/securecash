import { FaShieldAlt } from "react-icons/fa";
import
{
    Checkbox,
    InputField,
    SelectionBox,
    FileUpload,
    SectionTitle,
} from "../FormComponents";

const LicensingInsuranceSection = ({
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
        <SectionTitle Icon={FaShieldAlt}>Licensing & Insurance</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
                label="Please upload a copy of your Security or Masters License:"
                name="SecurityLicense"
                register={register}
                value={formData.SecurityLicense}
                onChange={(value) => handleFieldChange('SecurityLicense', value)}
                accept="image/*,.pdf"
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />

            <FileUpload
                label="Please upload a copy of your cash in transit insurance:"
                name="CITInsurance"
                register={register}
                value={formData.CitInsurance}
                onChange={(value) => handleFieldChange('CITInsurance', value)}
                accept="image/*,.pdf"
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />
        </div>
    </div>
);

export default LicensingInsuranceSection;