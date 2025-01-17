import React from "react";

const Controls = ({ currentSlideSection, toggleSlide, section }) => {
  return (
    <div className="carousel-controls hidden 992px:block absolute -top-1/2 left-0 right-0 z-[999] text-[100px] leading-[600px] text-white">
      <label
        htmlFor="img-1"
        className={`prev-slide  absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12   right-0 top-[-90px] hover:opacity-100 ${
          currentSlideSection === section ? "block" : "hidden"
        }  `}
        onClick={toggleSlide}
      >
        <span>‹</span>
      </label>
      <label
        htmlFor="img-1"
        className={`next-slide    right-0 hover:opacity-100 absolute p-5 opacity-50 transition-opacity duration-200 cursor-pointer h-12 w-12 ${
          currentSlideSection === section ? "block" : "hidden"
        } `}
        onClick={toggleSlide}
      >
        <span>›</span>
      </label>
    </div>
  );
};

export default Controls;

const renderNavigationButton = (
  direction,
  isDisabled,
  handleClick,
  currentSlideSection,
  section
) => {
  const symbol = direction === "prev" ? "❮" : "❯";

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`text-primary text-[50px] ${
          isDisabled
            ? "cursor-not-allowed opacity-50 pointer-events-none no-underline"
            : "cursor-pointer"
        }  ${currentSlideSection === section ? "block" : "hidden"}`}
        aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
      >
        {symbol}
      </button>
    </div>
  );
};
