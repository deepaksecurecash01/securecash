import React from "react";

const ScrollableSection = ({ children, className = "", style = {} }) =>
{
  return (
    <div className={`custom-scrollbar ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollableSection;