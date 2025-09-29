import Image from "next/image";
import Typography from "@/components/common/Typography";
import SubHeading from "@/components/common/SubHeading";
import Paragraph from "@/components/common/Paragraph";

const ContentScroll = ({ scrollData }) =>
{
    return (
        <ul className="list-none w-full  ">
            {scrollData.map((item, index) => (
                <li key={index}>
                    <div className={`flex items-center mt-[30px] ${index === 0 ? '1024px:mt-0' : ' 1024px:mt-[50px]'
                            } mb-[12px] gap-3`}>
                        <Image
                            className="inline-block bg-contain bg-no-repeat  992px:w-[40px]"
                            src="https://www.securecash.com.au/images/icons/tick.png"
                            alt={"check.png"}
                            width={50}
                            height={15}
                            priority={true}

                        />
                        <Typography
                            as="h4"
                            fontFamily="font-montserrat"
                            className="text-[18px] leading-[1.5rem] font-bold text-[#000] text-left mb-0 w-full"
                        >
                            {item.title}:
                        </Typography>

                    </div>
                    <Typography
                        as="h5"
                        fontFamily="font-montserrat"
                        className="text-[18px] font-medium text-[#000]  text-left mb-0"
                    >
                        {item.subtitle}
                    </Typography>
                    <div
                        className="text-left font-light leading-[2rem] mt-2.5 414px:pr-0"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    />


                </li>
            ))}
        </ul>
    );
};

export default ContentScroll;
