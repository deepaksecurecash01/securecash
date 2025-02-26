import React from "react";

const Heading = ({
  children,
  as = "h1", // Default is h1, can be changed to h2, h3, etc.
  className = "",
  style = {},
  color = "", // Default color is primary
  fontWeight = "bold", // Default weight is bold
  fontSize = "22px", // Default font size
  lineHeight = "", // Default line height
  textAlign = "center", // Default alignment
    marginBottom = "", // Default margin bottom\
  marginTop="",
    responsiveClassName = "", // Custom responsive classes
  textShadow = false,
}) => {

  // Determine the correct color class
  const colorClass = color.includes("#")
    ? `text-[${color}]`
    : `text-${color}`;

  // Dynamically render the appropriate tag (h1, h2, h3, etc.)
  const Tag = as;

  return (
    <Tag
      className={`font-montserrat font-${fontWeight} text-[${fontSize}] leading-[${lineHeight}] text-${textAlign} mb-[${marginBottom}] ${colorClass} ${responsiveClassName} ${className} ${
        textShadow && "[text-shadow:2px_2px_6px_#111111]"
      }`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default Heading;
