import React from "react";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaUniversity,
  FaExclamationCircle,
} from "react-icons/fa";
import Checkbox from "../ui/checkbox/Checkbox";
import WarningPopup from "./WarningPopup";
import SelectOption from "../SelectOption";
import { InputField } from "../InputField";
import { SelectioBox } from "../SelectioBox";

const Banking = ({
  frequencyOptions,
  amountOptions,
  daysOfWeek,
  register,
  setValue,
  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {  const selectionBoxes = [
  {
    label: "Collection Frequency",
    name: "BankingFrequency",
    icon: FaCalendarAlt,
    options: frequencyOptions,
  },
  {
    label: "Average Collection Amount",
    name: "BankingAmount",
    icon: FaMoneyBillAlt,
    options: amountOptions,
  },
];
  return (
    <div className="form-page banking">
      <h3 className="text-white pb-4  leading-[30px] text-[22px] text-center capitalize">
        Banking
      </h3>
      <hr className="divider-2 h-[4px] border-0 mt-4 mx-auto w-[100px] rounded-[5px] bg-[#c7a652] divider-bottom mb-0 divider-centered" />

      <div className="form-tab">
        {selectionBoxes.map((box, index) => (
          <SelectioBox
            key={index}
            label={box.label}
            name={box.name}
            register={register}
            Icon={box.icon}
            setValue={setValue}
            options={box.options}
            errors={errors}
            currentErrorField={currentErrorField}
            setCurrentErrorField={setCurrentErrorField}
          />
        ))}
        <InputField
          label="Who Do You Bank With?"
          name="BankingBank"
          register={register}
          Icon={FaUniversity}
          placeholder="Who do you bank with?"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />
      </div>

      <div className="form-tab">
        {/* Usual day/s for collection */}
        <div>
          <h5 className="checkboxHeaderText pt-6 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize">
            Usual day/s for collection?
          </h5>
          <div className="chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-4 600px:grid-rows-3">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="checkbox-wrapper">
                <Checkbox
                  label={day}
                  key={index}
                  value={day}
                  name={"BankingDays"}
                  register={register}
                  currentErrorField={currentErrorField}
                  setCurrentErrorField={setCurrentErrorField}
                  className="chkbox  768px:w-[150px] float-left text-left relative "
                />
              </div>
            ))}
            {errors?.BankingDays && (
              <WarningPopup
                error={errors?.BankingDays?.message}
                isFirstError={currentErrorField === "BankingDays"}
                className={`top-[150px]`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="form-tab">
        <div className="comment-container w-full mx-auto text-left block clear-both">
          <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
            Comments
          </label>
          <textarea
            className="w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white focus:outline-primary"
            name="BankingComments"
            {...register("BankingComments")}
            data-validate="Multiline"
            placeholder="Anything else you would like us to know?"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Banking;
