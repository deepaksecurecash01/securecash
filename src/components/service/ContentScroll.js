import Image from "next/image";
import Divider from "@/components/common/Divider";
import Typography from "@/components/common/Typography";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentScroll = ({ scrollData }) =>
{console.log(scrollData)
    return (
        <ul className="list-none w-full" id="scroll-content">
            {scrollData.map((item, index) => (
                <li key={index}>
                    <div className="flex items-center gap-3">
                       
                        <Typography
                            as="h4"
                            fontFamily="font-montserrat"
                            className="text-[22px] 600px:text-[26px] leading-[30px] 600px:leading-[1.6em] w-[80%] mx-auto font-bold text-[#000] text-center  768px:mt-2.5 mb-[20px]  992px:w-full"
                        >
                            {item.title}
                        </Typography>
                    </div>

                    {item.details.map((paragraph, paragraphIndex) => (
                        <div
                            key={paragraphIndex}
                            className="text-justify font-light leading-[2rem] mt-2.5 414px:pr-0 mb-8"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                        
                    ))}
                </li>
            ))}
        </ul>
    );
};

export default ContentScroll;
