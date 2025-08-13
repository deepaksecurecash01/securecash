import React from "react";
import
{
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaDollarSign,
  FaExclamationCircle,
} from "react-icons/fa";
import Checkbox from "@/components/common/checkbox/Checkbox";
import WarningPopup from "../elements/WarningPopup";
import SelectOption from "@/components/common/forms/elements/SelectOption";
import { InputField } from "../elements/InputField";
import { SelectionBox } from "../elements/SelectionBox";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";


const Change = ({
  frequencyOptions,
  amountOptions,
  daysOfWeek,
  register,
  setValue,

  errors,
  currentErrorField,
  setCurrentErrorField,
}) =>
{
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
      <Typography
        as="h3"
        fontFamily="montserrat"
        className="text-white font-normal text-center capitalize pb-4 text-[22px] leading-[30px]"
      >
        Change
      </Typography>

      <Divider
        color="primary" // Custom gold color
        margin="mt-4" // Margin-top 4
        alignment="center" // Center alignment
      />
      <div className="form-tab 480px:w-[90%] mx-auto ">
        {selectionBoxes.map((box, index) => (
          <SelectionBox
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
      <div className="form-tab 480px:w-[90%] mx-auto">
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
      <div className="form-tab 480px:w-[90%] mx-auto">
        <div className="comment-container w-full mx-auto text-left block clear-both">
          <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
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
