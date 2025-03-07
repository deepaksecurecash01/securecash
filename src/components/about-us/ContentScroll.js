import React from "react";
import Paragraph from "../common/Paragraph";

const ContentScroll = ({ sectionContent }) => {
  return (
    <ul className="list-none w-full">
      {sectionContent.map((paragraph, index) => (
        <li key={index}>
          <Paragraph
            textAlign="left"
            marginBottom="0"
            lineHeight="2rem"
            responsiveClassName="414px:pr-0"
            className=" mb-4  1024px:mb-[1.25rem]"
          >
            {paragraph}
          </Paragraph>
        </li>
      ))}
      
    </ul>
  );
};

export default ContentScroll;
