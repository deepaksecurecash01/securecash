// /components/forms/SiteInfo/steps/SiteContactStep.js
import React from 'react';
import { FaUser, FaUsers, FaPhone, FaEnvelope } from 'react-icons/fa';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import { CONTACT_INFO_FIELDS } from '@/zod/SiteInfoFormSchema';

const SiteContactStep = ({ formManager, theme = 'dark' }) =>
{
    // Add icons to field configurations
    const fieldsWithIcons = CONTACT_INFO_FIELDS.map(field => ({
        ...field,
        Icon: getFieldIcon(field.name)
    }));

    function getFieldIcon(fieldName)
    {
        const iconMap = {
            Contact: FaUser,
            Position: FaUsers,
            Phone: FaPhone,
            Email: FaEnvelope,
            Accounts: FaEnvelope
        };
        return iconMap[fieldName];
    }

    return (
        <div className="form-page contact-info mt-[40px]">
            <h3
             
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px] font-montserrat"
            >
                Contact Information
            </h3>

            <hr className="w-[100px] mt-2.5 mb-4 h-[4px] rounded-[5px] border-0 bg-primary mx-auto" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {fieldsWithIcons.map(field => (
                    <UniversalFormField
                        key={field.name}
                        {...formManager.getFieldProps(field)}
                        theme={theme}
                        autoComplete="new-password"
                    />
                ))}
            </div>
        </div>
    );
};

export default SiteContactStep;

