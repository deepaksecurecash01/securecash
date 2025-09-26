import React from "react";
import styles from "./ScrollableSection.module.css";

const ScrollableSection = ({ children, className = "", style = {} }) =>
{
  return (
    <div className={`${styles.contentScroll} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollableSection;