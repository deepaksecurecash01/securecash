

// /components/forms/SpecialEvents/steps/SpecialEventContactStep.js
import React from 'react';
import { FaUser, FaUsers, FaPhone, FaEnvelope } from 'react-icons/fa';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import Typography from '@/components/common/Typography';
import Divider from '@/components/common/Divider';
import { SPECIAL_EVENT_CONTACT_FIELDS } from '@/zod/SpecialEventFormSchema';

const SpecialEventContactStep = ({ formManager, theme = 'dark' }) =>
{
    // Add icons to field configurations
    const fieldsWithIcons = SPECIAL_EVENT_CONTACT_FIELDS.map(field => ({
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
            <Typography
                as="h3"
                fontFamily="montserrat"
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px]"
            >
                Contact Information
            </Typography>

            <Divider color="primary" margin="mt-2.5 mb-4" alignment="center" />

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

export default SpecialEventContactStep;