import React from "react";
import Typography from "../../../components/common/Typography";

const ContentScroll = ({ sectionContent }) =>
{
  return (
    <ul className="list-none w-full">
      {sectionContent.map((paragraph, index) => (
        <li key={index}>
          <Typography
            as="p"
            fontFamily="montserrat"
            className="text-left font-light leading-[2rem] mb-4 1024px:mb-4 414px:pr-0"
          >
            {paragraph}
          </Typography>

        </li>
      ))}

    </ul>
  );
};

export default ContentScroll;
