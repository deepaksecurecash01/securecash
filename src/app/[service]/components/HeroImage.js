import Image from "next/image";
import DoubleButton from "@/components/common/DoubleButton";

const HeroImage = ({ title, imgSrc }) =>
{
    return (
        <div className="relative flex flex-col justify-center items-center h-[404px] 414px:h-[412px] 768px:h-[454px] 1024px:h-[55vh] overflow-hidden">
            <Image
                src={imgSrc}
                alt={title.replace(/<[^>]*>/g, '')}
                fill
                priority
                fetchPriority="high"
                className="object-cover object-[45%] 480px:object-center -z-10"
                quality={75}
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 -z-5" />

            <h1
                className="text-white font-bold text-center text-[30px] leading-[36px] 600px:text-[40px] 768px:leading-[48px] 992px:leading-[61px] 992px:text-[50px] [text-shadow:2px_2px_6px_#111111] px-[25px] 1070px:mt-0 relative z-10"
                dangerouslySetInnerHTML={{ __html: title }}
            />
            <hr className="mt-2.5 mb-5 992px:mx-0 992px:text-left w-[16%] 768px:mt-5 768px:mb-0 414px:mb-0 600px:w-[100px] h-[4px] rounded-[5px] border-0 bg-white mx-auto relative z-10" />
            <div className="relative z-10">
                <DoubleButton
                    primaryButton={{ text: "Get a Quote", href: "/quote" }}
                    secondaryButton={{ text: "Read More", href: "#read-more" }}
                />
            </div>
        </div>
    );
};

export default HeroImage;