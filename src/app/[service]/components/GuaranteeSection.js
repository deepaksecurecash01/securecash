import Link from "next/link";
import Image from "next/image";
import { parseHtml } from "@/utils/htmlParser";

const GuaranteeSection = ({ guaranteeContent, imageUrl }) =>
{
    return (
        <div id="faq" className="inline-block w-full mb-16">
            <div className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex">
                <div className="flex flex-grow justify-start items-center w-[96%] 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 480px:pt-0 [flex:1]">
                    <div className="h-auto w-[82%] mx-auto 992px:w-[90%] p-0 992px:h-full bg-white leading-[2]">
                        <div id="guarantee-seal-wrapper" className="768px:flex mb-[24px] items-center justify-evenly">
                            <div className="relative w-[50%] h-[200px] mx-auto 1024px:w-[300px] 1024px:h-[230px]">
                                <Image
                                    src="/images/seal.png"
                                    alt="Australia Cash in Transit Services | SecureCash Guaranteed Seal"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 id="logo-text" className="text-[40px] font-medium font-times text-center w-full">
                                    Secure<span className="text-primary">Cash</span>
                                </h2>
                                <p className="font-bold text-[20px] leading-[27px] mb-4 w-full text-center">
                                    Don&apos;t take the risk.<br />Let us do your banking!
                                </p>
                            </div>
                        </div>

                        <ul className="list-none w-full italic" id="scroll-content">
                            {guaranteeContent.map((item, index) => (
                                <li key={index}>
                                    <div className="text-justify 768px:text-start font-light leading-[2rem] mt-2.5 414px:pr-0 mb-8">
                                        {parseHtml(item)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-center items-center 992px:justify-end 992px:float-right">
                    <div className="relative w-full 600px:w-[95%] 1024px:w-[90%] h-[400px] 600px:h-[740px] 1280px:h-[600px]">
                        <Image
                            src={imageUrl}
                            alt="Australia Cash in Transit Services"
                            fill
                            quality={75}
                            className="backdraft object-cover object-[30%]"
                            sizes="(max-width: 992px) 100vw, 50vw"
                        />

                        <div className="absolute top-0 992px:left-0 w-[70%] h-full 768px:h-[80%] bg-black/60 flex flex-col justify-center py-[30px] px-[10px] 768px:py-0 768px:px-[50px]">
                            <h2 className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px] 992px:leading-[48px] font-bold text-white text-center 992px:text-left mb-0 font-montserrat">
                                Give more focus to the things you love.
                            </h2>
                            <hr className="my-6 992px:mx-0 992px:text-left w-[100px] h-[4px] rounded-[5px] border-0 bg-white mx-auto" />

                            <p className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3 font-montserrat">
                                <strong>Call us</strong> at{" "}
                                <a href="tel:1300732873" className="text-primary hover:underline">1300 SECURE</a>
                            </p>
                            <p className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3 font-montserrat">
                                or
                            </p>
                            <Link href="/quote" className="w-full mt-[18px] button">
                                <div className="flex flex-row justify-center items-center min-h-[45px] min-w-[130px] px-5 py-0 rounded-full bg-primary hover:bg-white text-white 768px:w-full 768px:min-h-[55px] 768px:mt-8 1070px:mt-0 max-h-[73px] group 768px:mx-auto 1024px:mx-0">
                                    <p className="m-0 p-0 text-[14px] 768px:text-base font-semibold w-full group-hover:text-[#000] text-white hover:no-underline text-center">
                                        Get a Quote Now!
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuaranteeSection;