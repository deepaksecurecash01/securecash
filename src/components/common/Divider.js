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
  const alignmentClass =
    alignment === "left"
      ? " text-left"
      : alignment === "right"
        ? "ml-auto mr-0"
        : "";

  // Create the style object for custom values that can't be handled by Tailwind classes
  const customStyles = {};

  // Handle color
  let colorClass = "";
  if (color.includes("#")) {
    customStyles.backgroundColor = color;
  } else {
    colorClass = `bg-${color}`;
  }


  return (
    <hr
      className={`h-[4px] w-[${width}] rounded-[5px] mx-auto border-0 ${colorClass} ${margin} ${padding} text-center 1024px:${alignmentClass} ${responsiveClassName}`}
      style={customStyles}
    />
  );
};

export default Divider;