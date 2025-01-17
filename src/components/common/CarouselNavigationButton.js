const CarouselNavigationButton = ({ onNext, onPrev }) => (
  <div className="z-40 text-[50px] mx-auto text-primary 992px:hidden">
    <button
      className="absolute transition-opacity duration-200 cursor-pointer left-2 hover:opacity-100 top-1/2"
      onClick={onPrev}
    >
      <span>❮</span>
    </button>
    <button
      className="absolute transition-opacity duration-200 cursor-pointer right-2 hover:opacity-100 top-1/2"
      onClick={onNext}
    >
      <span>❯</span>
    </button>
  </div>
);

export default CarouselNavigationButton;