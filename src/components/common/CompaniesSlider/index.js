import React, { useMemo } from "react";

const BASE_URL = "https://www.securecash.com.au/images/companies/";

const companyNames = [
  "dominos",
  "mcdonalds",
  "pizzahut",
  "coffee",
  "southaus",
  "muffinbreak",
  "redrooster",
  "stratco",
  "ford",
  "kathmandu",
  "nsw",
  "queens",
  "takingshape",
  "tasmanian",
  "victoria",
  "ymca",
  "west",
  "subway",
];

const slideData = companyNames.map((name) => ({
  src: `${BASE_URL}${name}.png`,
  alt: name,
}));

const Slide = ({ src, alt }) => (
  <div className="w-[300px] p-0 mt-auto mb-auto">
    <img
      className="align-middle filter contrast-0 h-[150px] hover:cursor-default hover:filter hover:contrast-[100%]"
      src={src}
      alt={alt}
    />
  </div>
);

const CompaniesSlider = () => {
  const extendedSlides = useMemo(() => {
    const sliceCount = 3;
    return [
      ...slideData.slice(-sliceCount), // Append last 3 slides to the beginning
      ...slideData,
      ...slideData.slice(0, sliceCount), // Prepend first 3 slides to the end
    ];
  }, []);

  return (
    <div id="companies1" className="px-0 py-[30px] 992px:py-[65px]">
      <div className="bg-[#fff] h-full m-auto overflow-hidden w-full">
        <div className="animate-[scrollright_60s_linear_infinite] flex w-[calc(300px * 36)]">
          {extendedSlides.map((slide, index) => (
            <Slide key={index} src={slide.src} alt={slide.alt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesSlider;
