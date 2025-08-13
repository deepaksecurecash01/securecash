import
    {
        FaUser,
        FaPhone,
        FaEnvelope,
        FaInfoCircle,
        FaBuilding,
        FaMapMarkerAlt,
        FaIdCard,
    } from "react-icons/fa";
import
    {
        Checkbox,
        InputField,
        SelectionBox,
        FileUpload,
        SectionTitle,
    } from "../FormComponents";

const ORGANIZATION_OPTIONS = [
    { value: "", label: "Please Select" },
    { value: "Individual (Sole Trader)", label: "Individual (Sole Trader)" },
    { value: "Trustees & Beneficiaries", label: "Trustees & Beneficiaries" },
    {
        value: "Domestic Pty Ltd or Ltd Company",
        label: "Domestic Pty Ltd or Ltd Company",
    },
    { value: "Registered Foreign Company", label: "Registered Foreign Company" },
    {
        value: "Foreign Company Not Registered in Australia",
        label: "Foreign Company Not Registered in Australia",
    },
    { value: "Partners & Partnerships", label: "Partners & Partnerships" },
    { value: "Associations", label: "Associations" },
    { value: "Registered Co-Operatives", label: "Registered Co-Operatives" },
    { value: "Government Body", label: "Government Body" },
    {
        value: "School or Education Institute",
        label: "School or Education Institute",
    },
    {
        value: "Church or Religious Organisation",
        label: "Church or Religious Organisation",
    },
];

const PersonalDetailsSection = ({
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
        <SectionTitle Icon={FaUser}>Personal Details</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
                label="What is your full name?"
                name="Name"
                register={register}
                value={formData.Name}
                onChange={(value) => handleFieldChange('Name', value)}
                placeholder="Your Full Name"
                Icon={FaUser}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />

            <SelectionBox
                label="What is the organisation structure type?"
                name="OrganisationType"
                register={register}
                value={formData.OrganisationType}
                onChange={(value) => handleFieldChange('OrganisationType', value)}
                Icon={FaBuilding}
                options={ORGANIZATION_OPTIONS}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />
        </div>

        <div className="grid grid-cols-1 768px:grid-cols-2 1024px:grid-cols-3 gap-6">
            <InputField
                label="What is your ABN number?"
                name="ABN"
                register={register}
                value={formData.ABN}
                onChange={(value) => handleFieldChange('ABN', value)}
                placeholder="Your ABN Number"
                Icon={FaIdCard}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />

            <InputField
                label="What is your best contact number?"
                name="Phone"
                register={register}
                value={formData.Phone}
                onChange={(value) => handleFieldChange('Phone', value)}
                placeholder="Your Phone Number"
                type="tel"
                Icon={FaPhone}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />

            <InputField
                label="What is your email address?"
                name="Email"
                register={register}
                value={formData.Email}
                onChange={(value) => handleFieldChange('Email', value)}
                placeholder="Your Email Address"
                type="email"
                Icon={FaEnvelope}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />
        </div>

        <div className="bg-dark-border/90 p-4 rounded-lg">
            <p className="text-sm text-white">
                <FaInfoCircle className="inline mr-2" />A copy of this agreement will be
                sent to the address provided.
            </p>
        </div>

        <div className="space-y-6">
            <InputField
                label="What is your physical address?"
                name="Address"
                register={register}
                value={formData.Address}
                onChange={(value) => handleFieldChange('Address', value)}
                placeholder="Your Physical Address"
                Icon={FaMapMarkerAlt}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />

            <InputField
                label="What is your postal address?"
                name="AddressPostal"
                register={register}
                value={formData.AddressPostal}
                onChange={(value) => handleFieldChange('AddressPostal', value)}
                placeholder="Your Postal Address"
                Icon={FaMapMarkerAlt}
                currentErrorField={currentErrorField}
                setCurrentErrorField={setCurrentErrorField}
                errors={errors}
            />
        </div>
    </div>
);

export default PersonalDetailsSection;