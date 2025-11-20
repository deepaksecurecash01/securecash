import React from "react";
import CounterSection from "./CounterSection";
import ContentSection from "./ContentSection";
import VideoSection from "@/components/common/VideoSection";

const MidBanner = () =>
{
  return (
    <>
      <CounterSection />
      <ContentSection />
      <VideoSection height="630px" />
    </>
  );
};

export default MidBanner;