

// /components/forms/SpecialEvents/steps/SpecialEventServiceStep.js
import React from 'react';
import { FaUniversity } from 'react-icons/fa';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import { SPECIAL_EVENT_SERVICE_FIELDS } from '@/zod/SpecialEventFormSchema';

const SpecialEventServiceStep = ({ formManager, theme = 'dark' }) =>
{
    // Icon mapping function
    const getFieldIcon = (fieldName) =>
    {
        const iconMap = {
            Bank: FaUniversity
        };
        return iconMap[fieldName];
    };

    // Add icons to field configurations where needed
    const fieldsWithIcons = SPECIAL_EVENT_SERVICE_FIELDS.map(field => ({
        ...field,
        Icon: getFieldIcon(field.name)
    }));

    return (
        <div className="form-page other-info mt-[40px]">
            <h3
              
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px] font-montserrat"
            >
                Other Information
            </h3>

            <hr className="w-[100px] mt-2.5 mb-4 h-[4px] rounded-[5px] border-0 bg-primary mx-auto"/>

            <div className="form-tab 480px:w-[90%] mx-auto">
                {fieldsWithIcons.map(field =>
                {
                    // Apply custom configurations inline
                    let fieldProps = { ...field };

                    // Custom handling for Dates field (textarea)
                    if (field.name === 'Dates') {
                        fieldProps = {
                            ...fieldProps,
                            type: 'textarea',
                            rows: 6,
                            placeholder: 'Enter dates, times and other relevant information...'
                        };
                    }

                    return (
                        <UniversalFormField
                            key={field.name}
                            {...formManager.getFieldProps(fieldProps)}
                            theme={theme}
                            autoComplete="new-password"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SpecialEventServiceStep;