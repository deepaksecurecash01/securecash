import React from "react";

const Typography = ({ children, as: Tag = "h1", className = "", fontFamily = "montserrat" }) =>
{
  // Determine the correct font class based on `fontFamily`
  const fontClass =
    fontFamily === "prata-regular"
      ? "font-prata-regular"
      : fontFamily === "prata"
        ? "font-prata"
        : "font-montserrat"; // Default to Montserrat

  return <Tag className={`${fontClass} ${className}`}>{children}</Tag>;
};

export default Typography;
