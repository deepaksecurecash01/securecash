import React from "react";
import ContentScrollBar from "./ContentScrollBar";
import ContentForm from "./ContentForm";

const ContentContact = () => {
  return (
    <div
      id="content-contact"
      className=" bg-content-bg bg-center bg-no-repeat inline-block w-full 992px:my-[40px]  1280px:my-[84px]"
    >
      <div className="inner-big w-[95%] max-w-[1366px] mx-auto my-0  992px:flex">
        <ContentForm />
        <ContentScrollBar />
      </div>
    </div>
  );
};

export default ContentContact;
