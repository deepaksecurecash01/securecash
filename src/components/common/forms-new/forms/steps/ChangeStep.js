// /components/forms/steps/ChangeStep.js
import React from "react";
import
    {
        FaCalendarAlt,
        FaMoneyBillAlt,
        FaDollarSign,
    } from "react-icons/fa";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";

/**
 * Change Step Component - Controller-based Architecture
 * Follows the new foundation pattern with UniversalFormField
 */
const ChangeStep = ({ formManager, theme = 'dark' }) =>
{

    const frequencyOptions = [
        { value: "", label: "Please select..." },
        { value: "Weekly", label: "Weekly" },
        { value: "Fortnightly", label: "Fortnightly" },
        { value: "Ad Hoc", label: "Ad Hoc" },
        { value: "Special Event (once off)", label: "Special Event (once off)" },
    ];

    const amountOptions = [
        { value: "", label: "Select Amount:" },
        { value: "$0 - $1000", label: "$0 - $1000" },
        { value: "$1000 - $5000", label: "$1000 - $5000" },
        { value: "$5000 - $20,000", label: "$5000 - $20,000" },
        { value: "$20,000 - $50,000", label: "$20,000 - $50,000" },
        { value: "over $50,000", label: "over $50,000" },
    ];

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Ad Hoc",
        "Banking", // Change step includes Banking option
    ];

    const daysOptions = daysOfWeek.map(day => ({ label: day, value: day }));

    // Field configurations using UniversalFormField pattern
    const changeFields = [
        {
            name: "ChangeFrequency",
            type: "select",
            label: "Frequency for change?",
            Icon: FaCalendarAlt,
            options: frequencyOptions,
        },
        {
            name: "ChangeNotesAmount",
            type: "select",
            label: "Average notes value?",
            Icon: FaMoneyBillAlt,
            options: amountOptions,
        },
        {
            name: "ChangeCoinsAmount",
            type: "text",
            label: "Average coins value?",
            placeholder: "Enter amount",
            Icon: FaMoneyBillAlt,
            Icon2: FaDollarSign,
        },
        {
            name: "ChangeDays",
            type: "checkbox-group",
            label: "Usual day/s for delivery?",
            options: daysOptions,
            variant: "grid"
        },
        {
            name: "ChangeComments",
            type: "textarea",
            label: "Comments",
            placeholder: "Anything else you would like us to know?",
            rows: 3
        },
    ];

    return (
        <div className="form-page change">
            <h3
               
                className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px] font-montserrat"
            >
                Change
            </h3>

            <hr
                className="w-[100px] mt-4 h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
            />

            <div className="form-tab 480px:w-[90%] mx-auto">
                {/* All Change form fields */}
                {changeFields.map((field) => (
                    <div key={field.name} className="relative">
                        <UniversalFormField
                            {...formManager.getFieldProps(field)}
                            theme={theme}
                            autoComplete="new-password"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChangeStep;