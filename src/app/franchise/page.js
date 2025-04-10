import CompaniesSlider from "@/components/common/CompaniesSlider";
import FranchiseForm from "@/components/franchise/FormSection";
import HeroImage from "@/components/franchise/HeroImage";
import SectionWrapper from "@/components/franchise/SectionWrapper";
import React from "react";

const page = () => {
  return (
    <> <div id="content" className="overflow-hidden">
      <HeroImage />
      <div className="spacer-lg h-[30px] 768px:h-[100px]" id="read-more"></div>
      <SectionWrapper />
    </div>
      <div className="spacer-lg h-[30px] 768px:h-[80px] 1024px:h-[100px]"></div>

      <FranchiseForm />
      <CompaniesSlider />

    </>
  );
};

export default page;
