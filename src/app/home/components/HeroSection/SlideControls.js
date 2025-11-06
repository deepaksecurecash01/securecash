import React from "react";

const SlideControls = React.memo(({ slides = [], currentIndex = 0, onGoTo, onNext, onPrev, visible = true }) => {
  if (!visible) return null;

  return (
    <div className="inner-controls absolute z-10 top-1/2 right-4 transform -translate-y-1/2">
      <ul className="dot-navigation list-none m-0 p-0">
        {slides.map((_, i) => (
          <li key={i} className="mb-2 inline-block">
            <button
              onClick={() => onGoTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={currentIndex === i}
              className={`h-[15px] w-[15px] rounded-full transition-transform duration-300 border-0 ${currentIndex === i ? "bg-white scale-[1.34]" : "bg-[#a3a3a3]"}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

SlideControls.displayName = "SlideControls";
export default SlideControls;
