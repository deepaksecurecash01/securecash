import React from "react";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaDollarSign,
  FaExclamationCircle,
} from "react-icons/fa";
import Checkbox from "../ui/checkbox/Checkbox";
import WarningPopup from "./WarningPopup";
import SelectOption from "../SelectOption";
import { InputField } from "../InputField";
import { SelectioBox } from "../SelectioBox";

const Change = ({
  frequencyOptions,
  amountOptions,
  daysOfWeek,
  register,
  setValue,

  errors,
  currentErrorField,
  setCurrentErrorField,
}) => {
  const selectionBoxes = [
    {
      label: "Frequency for change?",
      name: "ChangeFrequency",
      icon: FaCalendarAlt,
      options: frequencyOptions,
    },
    {
      label: "Average notes value?",
      name: "ChangeNotesAmount",
      icon: FaMoneyBillAlt,
      options: amountOptions,
    },
  ];
  return (
    <div className="form-page change ">
      <h3 className="text-white pb-4 leading-[30px] text-[22px] text-center capitalize">
        Change
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
          label="Average coins value?"
          name="ChangeCoinsAmount"
          register={register}
          Icon={FaMoneyBillAlt}
          Icon2={FaDollarSign}
          placeholder="Enter amount"
          errors={errors}
          currentErrorField={currentErrorField}
          setCurrentErrorField={setCurrentErrorField}
        />
      </div>
      <div className="form-tab">
        <div>
          <h5 className="checkboxHeaderText pt-6 text-base inline-block text-left font-normal w-full text-white pb-4 capitalize">
            Usual day/s for delivery?
          </h5>
          <div className="chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-5 600px:grid-rows-3">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="checkbox-wrapper">
                <Checkbox
                  label={day}
                  key={index}
                  value={day}
                  name={"ChangeDays"}
                  register={register}
                  currentErrorField={currentErrorField}
                  setCurrentErrorField={setCurrentErrorField}
                  className="chkbox  768px:w-[150px] float-left text-left relative "
                />
              </div>
            ))}
            {errors?.ChangeDays && (
              <WarningPopup
                error={errors?.ChangeDays?.message}
                isFirstError={currentErrorField === "ChangeDays"}
                className={`top-[150px]`}
              />
            )}
          </div>
        </div>
      </div>
      <div className="form-tab">
        <div className="comment-container w-full mx-auto text-left block clear-both">
          <label className="text-white text-base inline-block mt-6 mb-2.5 w-full text-left">
            Comments
          </label>
          <textarea
            className="w-full text-sm rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white focus:outline-primary"
            name="ChangeComments"
            {...register("ChangeComments")}
            data-validate="Multiline"
            placeholder="Anything else you would like us to know?"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Change;
