import React from "react";

const Divider = ({
  color = "white",
  alignment = "center",
  className = "",
}) =>
{
  // Determine alignment classes
  const getAlignmentClasses = () =>
  {
    switch (alignment) {
      case "left":
        return "ml-0 mr-auto";
      case "right":
        return "ml-auto mr-0";
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