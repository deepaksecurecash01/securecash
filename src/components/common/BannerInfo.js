import Container from "@/components/layout/Container";
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaUserAlt } from "react-icons/fa";

const InfoBar = () => (
  <Container className="w-full z-20">
    <div className={`w-full mx-auto bg-black relative  1024px:top-[-36px] py-3 px-0 text-white text-sm  1024px:rounded-[40px] 1024px:py-0 1024px:px-0  1024px:w-[95%] 1024px:flex justify-center items-center 1440px:w-full`}>
      <InfoItem icon={FaPhoneAlt} size="20px">
        Ask Us Anything&nbsp;
        <Link href="tel:1300732873" className="text-primary hover:underline">
          1300 SECURE
        </Link>
      </InfoItem>
      <InfoItem icon={FaEnvelope} size="20px" className="hidden 1440px:block">
        For Quotes and Enquiries&nbsp;
        <Link
          href="mailto:customers@securecash.com.au"
          className="text-primary hover:underline"
        >
          customers@securecash.com.au
        </Link>
      </InfoItem>
      <InfoItem icon={FaEnvelope} size="20px" className="block 1440px:hidden">
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
  </Container>
);

const InfoItem = ({ icon: Icon, size, children, className = "" }) => (
  <div
    className={` flex justify-center items-center text-left pl-0 py-[5px] relative 480px:w-full 1024px:w-[33%] 1024px:float-left 1024px:py-6 ${className}`}
  >
    <div className=" flex justify-center items-center gap-3">
      <Icon style={{ fontSize: size }} />
      <span>{children}</span>
    </div>
  </div>
);
export default InfoBar;
