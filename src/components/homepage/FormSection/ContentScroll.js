import Image from "next/image";
import Divider from "@/components/common/Divider";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentScroll = ({ scrollData }) => {
  return (
    <ul className="list-none w-full">
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
            <Heading
              as="h4"
              fontSize="16px"
              color="#333333"
              fontWeight="bold"
              textAlign="left"
              marginBottom="0"
              responsiveClassName=""
            >
              {item.title}:
            </Heading>
          </div>
          <Paragraph
            textAlign="left"
            marginBottom="50px"
            lineHeight="2rem"
            responsiveClassName="414px:pr-0 pl-8"
            className="pr-4 mt-2.5"
          >
            {item.content}
          </Paragraph>
        </li>
      ))}
    </ul>
  );
};

export default ContentScroll;
