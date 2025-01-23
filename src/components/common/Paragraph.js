import React from 'react'

const Paragraph = ({
  children,
  className = "",
  style = {},
  color = "", // Default color is primary
  fontSize = "16px", // Default font size
  fontWeight = "light", // Default weight is bold
  lineHeight = "", // Default line height
  textAlign = "center", // Default alignment
  marginBottom = "24px", // Default margin bottom\
  marginTop = "",
  responsiveClassName = "", // Custom responsive classes
  textShadow = false,
}) => {
  // Determine the correct color class
  const colorClass = color.includes("#") ? `text-[${color}]` : `text-${color}`;

  // Dynamically render the appropriate tag (h1, h2, h3, etc.)

  return (
    <p
      className={`font-montserrat font-${fontWeight} text-[${fontSize}] leading-[${lineHeight}] text-${textAlign} mb-[${marginBottom}] ${colorClass} ${responsiveClassName} ${className} ${
        textShadow && "[text-shadow:2px_2px_6px_#111111]"
      }`}
      style={style}
    >
      {children}
    </p>
  );
};

export default Paragraph