import React from "react";

const Divider = ({
  color = "white", // Default color
  width = "100px", // Default width
  alignment = "center", // Alignment: 'center', 'left', or 'right'
  margin = "my-6", // Default margin
  padding = "", // Padding if needed
  responsiveClassName = "", // Additional responsive styles
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

  // Create the style object for custom values
  const customStyles = {
    width: width, // Set width via inline style for dynamic values
  };

  // Handle color
  let colorClass = "";
  if (color.includes("#")) {
    customStyles.backgroundColor = color;
  } else {
    colorClass = `bg-${color}`;
  }

  const alignmentClasses = getAlignmentClasses();

  return (
    <hr
      className={`h-[4px] rounded-[5px] border-0 ${colorClass} ${margin} ${padding} ${alignmentClasses} ${responsiveClassName}`}
      style={customStyles}
    />
  );
};

export default Divider;