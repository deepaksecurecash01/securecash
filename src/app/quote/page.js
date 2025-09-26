import React from "react";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import HeadlineContent from "./HeadlineContent";
import QuoteContent from "./QuoteContent";

const page = () =>
{
  return (
    <>
      <HeadlineContent />
      <QuoteContent />
      <CompaniesSlider className={`bg-[#f0f0f0]`} />
    </>
  );
};

export default page;
