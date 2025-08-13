import { FaExclamation } from "react-icons/fa";

const WarningPopup = ({ error, isFirstError, className }) => {
  return (
    isFirstError && (
      <span
        className={`absolute backdrop-blur-lg py-1 px-2 w-auto rounded-md text-[14px] flex items-center bg-white/95 text-black shadow-sm z-10 ${
          className ? className : " top-12"
        }`}
      >
        {/* Arrow */}
        <span className="absolute left-2 transform translate-x-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></span>

        <span className="bg-red-500 p-1 rounded-sm mr-2">
          <FaExclamation className="text-[10px] text-white" />
        </span>
        {error}
      </span>
    )
  );
};

export default WarningPopup;
