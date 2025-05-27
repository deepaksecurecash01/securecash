import React from "react";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import HeadlineContent from "@/components/quote/HeadlineContent";
import QuoteContent from "@/components/quote/QuoteContent";

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
