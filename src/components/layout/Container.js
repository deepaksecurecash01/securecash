import React from 'react'

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div className={` max-w-[1366px] mx-auto ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container