import React from "react";
import Paragraph from "../common/Paragraph";

const ContentScroll = ({ sectionContent }) => {
  return (
    <ul className="list-none w-full">
      {sectionContent.map((paragraph, index) => (
        <li key={index}>
          <Paragraph
            textAlign="left"
            marginBottom="50px"
            lineHeight="2rem"
            responsiveClassName="414px:pr-0"
            className="pr-4 mb-4  1024px:mb-[1.25rem]"
          >
            {paragraph}
          </Paragraph>
        </li>
      ))}
      
    </ul>
  );
};

export default ContentScroll;
