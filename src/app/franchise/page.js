import HeroImage from "@/components/franchise/HeroImage";
import SectionWrapper from "@/components/franchise/SectiomWrapper";
import React from "react";

const page = () => {
  return (
    <div id="content" className="overflow-hidden">
      <HeroImage />
      <div className="spacer-lg h-[30] 768px:h-0" id="read-more"></div>
    </div>
  );
};

export default page;
