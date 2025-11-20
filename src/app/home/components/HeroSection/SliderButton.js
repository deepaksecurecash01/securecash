import Link from "next/link";

const BannerButton = ({ href, text }) => (
  <Link
    href={href}
    className="flex flex-row justify-center items-center w-[200px] min-h-[50px] min-w-[130px] px-5 py-0 mt-5 rounded-full bg-[#c7a652] btn-learn-more hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#c7a652] transition-all duration-300 480px:w-[150px] 768px:w-[182px] 768px:min-w-[182px] 768px:min-h-[60px] 768px:mt-8 1366px:mt-12 max-h-[70px] group mx-auto 1024px:mx-0"
    aria-label={text}
  >
    <span className="m-0 p-0 text-sm w-full text-[#ffffff] group-hover:text-[#000] 480px:text-base text-center">
      {text}
    </span>
  </Link>
);

export default BannerButton;