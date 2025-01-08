import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

const BannerInfo = () => (
  <div className="w-full max-w-[1366px] mx-auto">
    <div className="w-full mx-auto inline-block bg-black relative top-[-34px] py-2.5 px-0 text-white text-sm 480px:pt-2.5 480px:pb-5 1024px:rounded-[40px] 1024px:py-1 1024px:px-0 1024px:flex flex-row justify-center items-center 1024px:w-[95%] 1366px:w-full">
      <InfoItem icon={FaPhoneAlt} size="20px">
        Ask Us Anything{" "}
        <a href="tel:1300732873" className="text-primary hover:underline">
          1300 SECURE
        </a>
      </InfoItem>
      <InfoItem icon={FaEnvelope} size="22px" className="hidden 1366px:block">
        For Quotes and Enquiries&nbsp;
        <a
          href="mailto:customers@securecash.com.au"
          className="text-primary hover:underline"
        >
          customers@securecash.com.au
        </a>
      </InfoItem>
      <InfoItem icon={FaEnvelope} size="22px" className="block 1366px:hidden">
        <a
          href="mailto:customers@securecash.com.au"
          className="text-primary hover:underline"
        >
          customers@securecash.com.au
        </a>
      </InfoItem>
      <InfoItem icon={FaUsers} size="22px">
        Learn More{" "}
        <a
          href="https://www.securecash.com.au/about-us/"
          className="text-primary hover:underline"
        >
          About us
        </a>
      </InfoItem>
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, size, children, className = "" }) => (
  <div
    className={`w-[80%] mx-auto pl-0 py-[5px] text-center relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-5 mid-row ${className}`}
  >
    <Icon className="inline" style={{ fontSize: size }} />
    &nbsp;&nbsp;&nbsp;&nbsp;{children}
  </div>
);
export default BannerInfo;
