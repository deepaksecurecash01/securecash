import React from "react";

const FormHeader = ({ COMPANY_INFO }) => (
  <div className="text-center border-b border-dark-border/30 pb-12">
    <h1 className="text-[34px] font-bold text-gray-800">
      Independent Contractors Agreement
    </h1>
    <hr
      className="mt-5 mb-5 w-[100px] h-[4px] rounded-[5px] border-0 mx-auto bg-primary"
    />
    <h2 className="text-xl text-gray-600 mb-4">
      The parties to this agreement are:
    </h2>
    <div className="bg-[rgb(242,242,242,0.9)] p-6 mt-6 rounded-lg text-left space-y-5">
      <p className="text-gray-700">
        <strong>{COMPANY_INFO.name}</strong> {COMPANY_INFO.acn} of{" "}
        {COMPANY_INFO.address} its assigns, related entities, licensees or
        agents. (hereinafter referred to as &quot;the Principal&quot;)
      </p>
      <p className="text-gray-600 text-center font-medium">And</p>
      <p className="text-gray-700 space-y-3">
        <strong>
          Independent Contractor&apos;s Personal or Principal Details:
        </strong>
        <span className="text-sm text-gray-500 block">
          (The contractor shall be responsible for advising the Principal of any
          changes to its personal details as initially detailed hereunder)
        </span>
      </p>
    </div>
  </div>
);

export default FormHeader;
