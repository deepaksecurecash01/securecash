import React, { useEffect, useState } from 'react';
import { FaUser, FaLock, FaPlus, FaUsers, FaCircle, FaIdCard, FaLongArrowAltRight } from "react-icons/fa";
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import WarningPopup from '@/components/common/forms/elements/WarningPopup';

const InputField = ({
    label,
    name,
    placeholder,
    type = "text",
    Icon,
    register,
    errors,
    currentErrorField,
    setCurrentErrorField,
    textarea = false,
    registerFieldRef, // Add this prop for field focusing
}) =>
{
    const hasError = errors[name] && currentErrorField === name;
    const [isFocused, setIsFocused] = useState(false);

    // Get the register props
    const registerProps = register ? register(name) : {};

    // Custom ref handling to support both react-hook-form and field focusing
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
        <div className="relative grid grid-cols-5 items-center">
            <label className="text-primary-text text-[16px] font-semibold px-1 768px:px-0 col-span-2">
                {label}            </label>
            <div className="relative w-full flex items-center bg-white rounded-[2px] border border-dark-border/50 col-span-3">
                {textarea ? (
                    <textarea
                        className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                            }`}
                        name={name}
                        {...registerProps}
                        ref={handleRef}
                        onFocus={() =>
                        {
                            setCurrentErrorField && setCurrentErrorField(name);
                            setIsFocused(true);
                        }}
                        onBlur={() =>
                        {
                            setCurrentErrorField && setCurrentErrorField(null);
                            setIsFocused(false);
                        }}
                        placeholder={placeholder}
                        rows="3"
                        required
                    />
                ) : (
                    <>
                        <input
                            className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                }`}
                            type={type}
                            name={name}
                            {...registerProps}
                            ref={handleRef}
                            onFocus={() =>
                            {
                                setCurrentErrorField && setCurrentErrorField(name);
                                setIsFocused(true);
                            }}
                            onBlur={() =>
                            {
                                setCurrentErrorField && setCurrentErrorField(null);
                                setIsFocused(false);
                            }}
                            placeholder={placeholder}
                            required
                        />
                        {Icon && (
                            <Icon
                                className={`min-w-[50px] text-[18px] ${hasError
                                    ? "text-red-500"
                                    : isFocused
                                        ? "text-primary"
                                        : "text-[#999]"
                                    }`}
                            />
                        )}
                    </>
                )}

                {errors[name] && (
                    <WarningPopup
                        error={errors[name]?.message}
                        isFirstError={currentErrorField === name}
                    />
                )}
            </div>
        </div>
    );
};
const Divider = ({
    color = "white", // Default color
    width = "100px", // Default width
    alignment = "center", // Alignment: 'center', 'left', or 'right'
    margin = "my-6", // Default margin
    padding = "", // Padding if needed
    responsiveClassName = "", // Additional responsive styles
}) =>
{
    // Determine alignment classes
    const alignmentClass =
        alignment === "left"
            ? " text-left"
            : alignment === "right"
                ? "ml-auto mr-0"
                : "";

    // Create the style object for custom values that can't be handled by Tailwind classes
    const customStyles = {};

    // Handle color
    let colorClass = "";
    if (color.includes("#")) {
        customStyles.backgroundColor = color;
    } else {
        colorClass = `bg-${color}`;
    }


    return (
        <hr
            className={`h-[4px] w-[${width}] rounded-[5px] border-0 ${colorClass} ${margin} ${padding} text-center 1024px:${alignmentClass} ${responsiveClassName}`}
            style={customStyles}
        />
    );
};
const SectionTitle = ({ children, Icon, position = 'center' }) => (
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

const CourierForm = ({
    courierIndex, // Changed from courierNumber to courierIndex (0-based)
    register,
    formData,
    handleFieldChange,
    currentErrorField,
    setCurrentErrorField,
    errors,
    onAddCourier,
    registerFieldRef, // Added this prop
}) =>
{
    const courierNumber = courierIndex + 1; // Display number (1-based)

    return (
        <div className="bg-[rgb(242,242,242,0.9)] p-6 rounded-lg space-y-4">
            <div className="w-3/5 mx-auto">

                <InputField
                    label="eDockets Contractor Code"
                    name={`eDocketsContractorCode`}
                    register={register}
                    placeholder="eDockets Contractor Code"
                    Icon={FaIdCard}
                    value={formData.eDocketsContractorCode}
                    onChange={(value) => handleFieldChange('eDocketsContractorCode', value)}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                    errors={errors}
                    registerFieldRef={registerFieldRef}
                />
            </div>
        </div>
    );
};

const DriversSection = ({
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
    registerFieldRef, // Added this prop
    onCourierCountChange,
}) =>
{
    const [courierCount, setCourierCount] = useState(1);

    // Initialize the Couriers array in form data
    useEffect(() =>
    {
        if (!formData.Couriers || formData.Couriers.length === 0) {
            const initialCouriers = Array.from({ length: courierCount }, () => ({
                DriverName: '',
                DriverUsername: '',
                DriverPassword: '',
                DriverPhoto: null
            }));
            setValue('Couriers', initialCouriers);
        }
    }, []);

    const handleAddCourier = () =>
    {
        const newCount = courierCount + 1;
        setCourierCount(newCount);

        // Add a new courier object to the array
        const currentCouriers = formData.Couriers || [];
        const newCouriers = [
            ...currentCouriers,
            {
                DriverName: '',
                DriverUsername: '',
                DriverPassword: '',
                DriverPhoto: null
            }
        ];
        setValue('Couriers', newCouriers);

        if (onCourierCountChange) {
            onCourierCountChange(newCount);
        }
    };

    // Enhanced handleFieldChange for nested courier data
    const handleCourierFieldChange = (fieldPath, value) =>
    {
        // Parse the field path (e.g., "Couriers.0.DriverName")
        const pathParts = fieldPath.split('.');
        if (pathParts[0] === 'Couriers' && pathParts[1] !== undefined && pathParts[2]) {
            const courierIndex = parseInt(pathParts[1]);
            const fieldName = pathParts[2];

            // Get current couriers array
            const currentCouriers = formData.Couriers || [];

            // Ensure the array is large enough
            while (currentCouriers.length <= courierIndex) {
                currentCouriers.push({
                    DriverName: '',
                    DriverUsername: '',
                    DriverPassword: '',
                    DriverPhoto: null
                });
            }

            // Update the specific field
            currentCouriers[courierIndex] = {
                ...currentCouriers[courierIndex],
                [fieldName]: value
            };

            // Update the form
            setValue('Couriers', currentCouriers);

            // Clear errors and trigger validation
            if (errors.Couriers?.[courierIndex]?.[fieldName]) {
                clearErrors(`Couriers.${courierIndex}.${fieldName}`);
            }
            if (currentErrorField === fieldPath) {
                setCurrentErrorField(null);
            }
            trigger(`Couriers.${courierIndex}.${fieldName}`);
        } else {
            // Fallback to original handler for non-courier fields
            handleFieldChange(fieldPath, value);
        }
    };

    useEffect(() =>
    {
        if (onCourierCountChange) {
            onCourierCountChange(courierCount);
        }
    }, [courierCount, onCourierCountChange]);

    const renderCourierForms = () =>
    {
        const forms = [];
        for (let i = 0; i < courierCount; i++) {
            forms.push(
                <CourierForm
                    key={i}
                    courierIndex={i}
                    register={register}
                    formData={formData}
                    handleFieldChange={handleCourierFieldChange}
                    currentErrorField={currentErrorField}
                    setCurrentErrorField={setCurrentErrorField}
                    errors={errors}
                    onAddCourier={handleAddCourier}
                    registerFieldRef={registerFieldRef}
                />
            );
        }
        return forms;
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 gap-4 flex flex-col justify-center mr-2">
                        <SectionTitle position={`left`} Icon={FaUsers}>Let&apos;s get set up for contracting using eDockets!</SectionTitle>
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <p className="text-gray-700">
                                To complete the submission of this Independent Contractors Agreement, if you have not done so already, you will need to access the eDockets Contractor Portal where you will be required to <strong> &quot;Register as a Contractor&quot;</strong> and set yourself up as a Contractor in the eDockets system.
                            </p>

                            <p className="text-gray-700">This access <strong className='font-semibold'>does not cost you anything</strong> and will provide you with;</p>

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
                    <p className=' text-gray-700 font-semibold'>Once Registered - At the top of the &quot;Assignee&quot; tab you will see &quot;Your code to provide to an eDockets Licensee&quot;, copy this code and paste it into the field below so we can get everything ready for you to start servicing the SecureCash clients!</p>

                </div>
            </div>

            <div className="space-y-6">
                {renderCourierForms()}
            </div>


        </div>
    );
};

export default DriversSection;