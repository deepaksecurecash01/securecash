import React from 'react'

const Container = ({ children, className = "", style = {}, id }) => {
  return (
    <div className={` max-w-[1366px] mx-auto ${className}`} style={style} id={id}>
      {children}
    </div>
  );
};

export default Container