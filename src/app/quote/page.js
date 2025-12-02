import React from "react";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import HeadlineContent from "./HeadlineContent";
import QuoteContent from "./QuoteContent";

export const metadata = {
  title: "Get a Quote - Secure Cash Services Australia",
  description: "Get a quote email within 45 minutes. Contact our Business Development Team for cash handling, ATM services, and security solutions across Australia.",
  openGraph: {
    title: "Get a Quote - Secure Cash Services Australia",
    description: "Get a quote email within 45 minutes. Contact our Business Development Team for cash handling, ATM services, and security solutions across Australia.",
  },
};

const QuotePage = () =>
{
  return (
    <>
      <HeadlineContent />
      <QuoteContent />
      <CompaniesSlider className="bg-[#f0f0f0]" />
    </>
  );
};

export default QuotePage;