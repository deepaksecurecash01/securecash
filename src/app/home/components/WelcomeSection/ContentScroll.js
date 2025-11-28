import Image from "next/image";

const ContentScroll = ({ isExpanded, scrollData, toggleContent }) => (
  <ul
    id="services-content"
    className={`list-none ${isExpanded ? "block" : "hidden"} 768px:block`}
    role="list"
  >
    {scrollData.map((data, index) => (
      <li
        key={data.id}
        className="item-box w-full clear-both mx-auto text-left mt-[40px] 768px:mt-0"
      >
        <h3 className="600px:text-[20px] flex flex-row justify-start items-center gap-2 768px:gap-2 text-[20px] mb-4 leading-[30px] 600px:leading-[1.6em] mx-auto font-bold text-[#000] 992px:text-left 992px:w-full mt-6 font-montserrat">
          <Image
            className="icon-data pr-2"
            src={data.icon}
            alt=""
            width={50}
            height={50}
            aria-hidden="true"
          />
          {data.title}
        </h3>

        <p
          className={`text-[16px] leading-[2rem] text-left mb-0 ${index !== scrollData.length - 1 && "768px:mb-3 992px:mb-4"
            } 480px:mb-0 768px:text-left font-light font-montserrat`}
        >
          {data.description}
          {index === scrollData.length - 1 && (
            <button
              type="button"
              className="read-more-link inline 768px:hidden text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={toggleContent}
              aria-expanded={isExpanded}
              aria-controls="services-content"
            >
              Show Less
            </button>
          )}
        </p>
      </li>
    ))}
  </ul>
);

export default ContentScroll;