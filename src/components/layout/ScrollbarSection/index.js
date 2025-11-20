import React from "react";

// Optimization: Removed CSS Module import to prevent render-blocking request
const ScrollableSection = ({ children, className = "", style = {} }) =>
{
  return (
    <div className={`custom-scrollbar ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollableSection;