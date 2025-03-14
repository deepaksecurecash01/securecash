import Image from "next/image";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentScroll = ({ scrollData }) =>
{
  return (
    <ul className="list-none w-full  1024px:pr-6">
      {scrollData.map((item, index) => (
        <li key={index}>
          <div className=" flex items-center  mb-[14px] gap-3">
            <Image
              className="inline-block bg-contain bg-no-repeat "
              src={"/images/icons/check.png"}
              alt={"check.png"}
              width={20}
              height={15}
            />
            <Typography
              as="h4"
              fontFamily="font-montserrat"
              className="text-[16px] font-bold text-[#333333] text-left mb-0"
            >
              {item.title}:
            </Typography>

          </div>
          <Typography
            as="p"
            fontFamily="font-montserrat"
            className="text-left font-light leading-[2rem] pr-4 mt-2.5 mb-6 1024px:mb-[50px] 414px:pr-0 pl-8"
          >
            {item.content}
          </Typography>

        </li>
      ))}
    </ul>
  );
};

export default ContentScroll;
