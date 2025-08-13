import Image from "next/image";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentScroll = ({ scrollData }) =>
{
  return (
    <ul className="list-none w-full  1024px:pr-6 services-content">
      {scrollData.map((item, index) => (
        <li key={index}>
          <span className="inline-block">
    
            <h4
         
            >
              {item.title}:
            </h4>

          <p
          className="text-light"
          >
            {item.content}
          </p>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ContentScroll;
