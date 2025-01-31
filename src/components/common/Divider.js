import React from "react";

const Divider = ({
  color = "white", // Default color
  width = "100px", // Default width
  alignment = "center", // Alignment: 'center', 'left', or 'right'
  margin = "my-6", // Default margin
  padding = "", // Padding if needed
  responsiveClassName = "", // Additional responsive styles
}) => {
  // Determine alignment classes
  const alignmentClass =
    alignment === "left"
      ? "mx-0 text-left"
      : alignment === "right"
      ? "ml-auto mr-0"
      : "";

  // Determine the correct color class
  const colorClass = color.includes("#") ? `bg-[${color}]` : `bg-${color}`;

  return (
    <hr
      className={`h-[4px] rounded-[5px] border-0 ${colorClass} w-[${width}] max-w-[${width}] ${margin} ${padding} mx-auto text-center 1024px:${alignmentClass} ${responsiveClassName}`}
    />
  );
};

export default Divider;
