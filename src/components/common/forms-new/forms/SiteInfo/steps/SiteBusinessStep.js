// /components/forms/SiteInfo/steps/SiteBusinessStep.js
import React from 'react';
import { FaBuilding, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import UniversalFormField from '@/components/common/forms-new/core/UniversalFormField';
import { BUSINESS_INFO_FIELDS } from '@/zod/SiteInfoFormSchema';

const SiteBusinessStep = ({ formManager, theme = 'dark' }) =>
{
    // Add icons to field configurations
    const fieldsWithIcons = BUSINESS_INFO_FIELDS.map(field => ({
        ...field,
        Icon: getFieldIcon(field.name)
    }));

    function getFieldIcon(fieldName)
    {
        const iconMap = {
            BusinessName: FaBuilding,
            Address: FaHome,
            Suburb: FaMapMarkerAlt,
            State: FaMapMarkerAlt,
            Postcode: FaMapMarkerAlt
        };
        return iconMap[fieldName];
    }

    return (
        <div className="form-page business-info mt-[40px]">
            {/* Hidden Type field */}
            <input type="hidden" {...formManager.formMethods.register("Type")} value="Regular Service" />

            <h3
              
                className="text-white font-normal text-center capitalize pb-4 text-[26px] leading-[30px] font-montserrat"
            >
                Business Information
            </h3>

            <hr className="w-[100px] mt-2.5 mb-4 h-[4px] rounded-[5px] border-0 bg-primary mx-auto" />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {fieldsWithIcons.map((field, index) =>
                {
                    // Handle State and Postcode side-by-side layout
                    if (field.name === 'State') {
                        const postcodeField = fieldsWithIcons.find(f => f.name === 'Postcode');
                        return (
                            <div key={field.name} className="flex flex-col 600px:flex-row 600px:gap-4">
                                <div className="600px:w-[80%]">
                                    <UniversalFormField
                                        {...formManager.getFieldProps(field)}
                                        theme={theme}
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="">
                                    <UniversalFormField
                                        {...formManager.getFieldProps({
                                            ...postcodeField,
                                            Icon: FaMapMarkerAlt
                                        })}
                                        theme={theme}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        );
                    }

                    // Skip Postcode as it's handled above
                    if (field.name === 'Postcode') {
                        return null;
                    }

                    return (
                        <UniversalFormField
                            key={field.name}
                            {...formManager.getFieldProps(field)}
                            theme={theme}
                            autoComplete="new-password"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SiteBusinessStep;

