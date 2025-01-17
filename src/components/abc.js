import Container from "@/components/layout/Container";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaUserAlt } from "react-icons/fa";

const BannerInfo = () => (
  <Container>
    <div className="w-full mx-auto bg-black relative top-[-34px] py-2.5 px-0 text-white text-sm 480px:pt-2.5  480px:pb-5 1024px:rounded-[40px] 1024px:py-0 1024px:px-0  1024px:w-[95%] 1366px:w-full flex justify-center items-center 1024px:inline-block">
      <div className=" flex flex-col 1024px:flex-row justify-center items-start">
        <InfoItem icon={FaPhoneAlt} size="20px">
          Ask Us Anything&nbsp;
          <Link href="tel:1300732873" className="text-primary hover:underline">
            1300 SECURE
          </Link>
        </InfoItem>
        <InfoItem icon={FaEnvelope} size="20px" className="hidden 1366px:block">
          For Quotes and Enquiries&nbsp;
          <Link
            href="mailto:customers@securecash.com.au"
            className="text-primary hover:underline"
          >
            customers@securecash.com.au
          </Link>
        </InfoItem>
        <InfoItem icon={FaEnvelope} size="20px" className="block 1366px:hidden">
          <Link
            href="mailto:customers@securecash.com.au"
            className="text-primary hover:underline"
          >
            customers@securecash.com.au
          </Link>
        </InfoItem>
        <InfoItem icon={FaUserAlt} size="20px">
          Learn More&nbsp;
          <Link href="/about-us" className="text-primary hover:underline">
            About us
          </Link>
        </InfoItem>
      </div>
    </div>
  </Container>
);

const InfoItem = ({ icon: Icon, size, children, className = "" }) => (
  <div
    className={`flex-1 flex justify-start items-start text-left pl-0 py-[5px] relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-6 ${className}`}
  >
    <div className="w-full flex justify-start 1024px:justify-center items-center gap-3">
      <Icon style={{ fontSize: size }} />
      <span>{children}</span>
    </div>
  </div>
);

export default BannerInfo;
