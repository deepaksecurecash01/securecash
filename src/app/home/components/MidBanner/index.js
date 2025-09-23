import React from "react";
import CounterSection from "./CounterSection";
import ContentSection from "./ContentSection";
import VideoSection from "@/components/common/VideoSection";



const MidBanner = () => {
  return (
    <div>
      <CounterSection />
      <ContentSection />
      <VideoSection  height={`630px`}/>
    </div>
  );
};

export default MidBanner;
