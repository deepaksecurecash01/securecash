// /components/forms/SiteInfo/steps/SiteServiceStep.js
import React from 'react';
import { FaUniversity } from 'react-icons/fa';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import { SERVICE_INFO_FIELDS } from '@/zod/SiteInfoFormSchema';

const SiteServiceStep = ({ formManager, theme = 'dark' }) =>
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
    const fieldsWithIcons = SERVICE_INFO_FIELDS.map(field => ({
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

            <hr className="w-[100px] mt-2.5 mb-4 h-[4px] rounded-[5px] border-0 bg-primary mx-auto" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {fieldsWithIcons.map(field =>
                {
                    // Apply custom configurations inline
                    let fieldProps = { ...field };

                    // Custom handling for specific fields
                    if (field.name === 'Schedule') {
                        fieldProps = {
                            ...fieldProps,
                            variant: 'site-grid',
                            footnote: 'Eg. Weekly - Monday, Wednesday & Friday.'
                        };
                    }

                    if (field.name === 'Dates') {
                        fieldProps = {
                            ...fieldProps,
                            min: "2021-03-15"
                        };
                    }

                    return (
                        <div key={field.name}>
                            <UniversalFormField
                                {...formManager.getFieldProps(fieldProps)}
                                theme={theme}
                                autoComplete="new-password"
                            />

                            {/* Add footnote display if present */}
                            {fieldProps.footnote && (
                                <p className="text-sm text-gray-300 italic mt-2 text-left">
                                    {fieldProps.footnote}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SiteServiceStep;