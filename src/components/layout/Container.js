import React from 'react'

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div className={`w-full max-w-[1366px] mx-auto ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container