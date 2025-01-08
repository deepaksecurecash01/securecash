const slideData = [
  {
    src: "https://www.securecash.com.au/images/companies/dominos.png",
    alt: "dominos",
  },
  {
    src: "https://www.securecash.com.au/images/companies/mcdonalds.png",
    alt: "mcdonalds",
  },
  {
    src: "https://www.securecash.com.au/images/companies/pizzahut.png",
    alt: "pizzahut",
  },
  {
    src: "https://www.securecash.com.au/images/companies/coffee.png",
    alt: "coffee",
  },
  {
    src: "https://www.securecash.com.au/images/companies/southaus.png",
    alt: "southaus",
  },
  {
    src: "https://www.securecash.com.au/images/companies/muffinbreak.png",
    alt: "muffinbreak",
  },
  {
    src: "https://www.securecash.com.au/images/companies/redrooster.png",
    alt: "redrooster",
  },
  {
    src: "https://www.securecash.com.au/images/companies/stratco.png",
    alt: "stratco",
  },
  {
    src: "https://www.securecash.com.au/images/companies/ford.png",
    alt: "ford",
  },
  {
    src: "https://www.securecash.com.au/images/companies/kathmandu.png",
    alt: "kathmandu",
  },
  { src: "https://www.securecash.com.au/images/companies/nsw.png", alt: "nsw" },
  {
    src: "https://www.securecash.com.au/images/companies/queens.png",
    alt: "queens",
  },
  {
    src: "https://www.securecash.com.au/images/companies/takingshape.png",
    alt: "takingshape",
  },
  {
    src: "https://www.securecash.com.au/images/companies/tasmanian.png",
    alt: "tasmanian",
  },
  {
    src: "https://www.securecash.com.au/images/companies/victoria.png",
    alt: "victoria",
  },
  {
    src: "https://www.securecash.com.au/images/companies/ymca.png",
    alt: "ymca",
  },
  {
    src: "https://www.securecash.com.au/images/companies/west.png",
    alt: "west",
  },
  {
    src: "https://www.securecash.com.au/images/companies/subway.png",
    alt: "subway",
  },
];
const extendedSlides = [
  ...slideData.slice(-3), // Append last 3 slides to the beginning
  ...slideData,
  ...slideData.slice(0, 3), // Prepend first 3 slides to the end
];
const Slide = ({ src, alt }) => (
  <div className=" w-[300px] p-0 mt-auto mb-auto">
    <img
      className="align-middle filter contrast-0 h-[150px] hover:cursor-default hover:filter  hover:contrast-[100%]"
      src={src}
      alt={alt}
    />
  </div>
);

const CompaniesSlider = () => {
  return (
    <div id="companies1" className="px-[0] py-[30px]  992px:py-[65px]">
      <div className=" bg-[#fff] h-full m-auto overflow-hidden w-full">
        <div className=" animate-[scrollright_60s_linear_infinite] flex w-[calc(300px * 36)]">
          {extendedSlides.map((slide, index) => (
            <Slide key={index} src={slide.src} alt={slide.alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSlider;
