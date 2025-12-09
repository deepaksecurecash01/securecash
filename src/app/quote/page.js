import React from "react";
import CompaniesSlider from "@/components/common/CompaniesSlider";
import HeadlineContent from "./HeadlineContent";
import QuoteContent from "./QuoteContent";

export const metadata = {
  title: "Get an Online Quotation | SecureCash",
  description: "Get a quote here to know more about the benefits of cash-in-transit services and how SecureCash can help your business in Australia.",
  alternates: {
    canonical: 'https://www.securecash.com.au/quote',
  },
  openGraph: {
    title: "Get an Online Quotation | SecureCash",
    description: "Get a quote here to know more about the benefits of cash-in-transit services and how SecureCash can help your business in Australia.",
    url: 'https://www.securecash.com.au/quote',
  },
  twitter: {
    card: 'summary',
    title: "Get an Online Quotation | SecureCash",
    description: "Get a quote here to know more about the benefits of cash-in-transit services and how SecureCash can help your business in Australia.",
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