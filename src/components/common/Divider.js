import React from "react";

const Divider = ({
  color = "white",
  alignment = "",
  className = "",
}) =>
{
  // Determine alignment classes
  const getAlignmentClasses = () =>
  {
    switch (alignment) {
      case "left":
        return "mx-auto 768px:ml-0  768px:mr-auto";
      case "right":
        return "mx-auto 768px:ml-auto 768px:mr-0";
      case "center":
      default:
        return "mx-auto";
    }
  };

  // Handle color - support both hex and Tailwind classes
  let colorClass = "";
  let customStyles = {};

  if (color.startsWith("#")) {
    customStyles.backgroundColor = color;
  } else {
    colorClass = `bg-${color}`;
  }

  const alignmentClasses = getAlignmentClasses();

  return (
    <hr
      className={`h-[4px] rounded-[5px] border-0 ${colorClass} ${alignmentClasses} ${className}`}
      style={customStyles}
    />
  );
};

export default Divider;