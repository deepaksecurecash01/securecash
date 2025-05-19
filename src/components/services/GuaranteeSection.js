import React from "react";
import Typography from "../common/Typography";
import Divider from "../common/Divider";
import Link from "next/link";
import parse from 'html-react-parser';
const GuaranteeSection = ({ guaranteeContent, imageUrl }) =>
{
    // This is the key function that needs fixing
    const replaceLinks = (node) =>
    {
        if (node.type === "tag" && node.name === "a") {
            const { href, class: className, target, rel, ...rest } = node.attribs;

            // Extract the text content from children
            let linkText = "";
            if (node.children && node.children.length > 0) {
                // Extract text content from the children
                linkText = node.children
                    .map(child =>
                    {
                        if (child.type === "text") {
                            return child.data;
                        } else if (child.type === "tag") {
                            // For tags like <strong>, <em>, etc.
                            return child.children
                                ? child.children.map(c => c.type === "text" ? c.data : "").join("")
                                : "";
                        }
                        return "";
                    })
                    .join("");
            }

            // For tel: links or external links, we keep using the <a> tag
            if (
                href.startsWith("tel:") ||
                href.startsWith("http") ||
                href.startsWith("https")
            ) {
                return (
                    <a
                        href={href}
                        className={className}
                        target={target}
                        rel={rel}
                        {...rest}
                    >
                        {/* Use the extracted text directly */}
                        {linkText}
                    </a>
                );
            }

            // For internal links, use Next.js Link component
            return (
                <Link
                    href={href}
                    className={className}
                    target={target}
                    rel={rel}
                    {...rest}
                >
                    {/* Use the extracted text directly */}
                    {linkText}
                </Link>
            );
        }
    };
    return (
        <div id="faq" className="inline-block w-full mb-16">
            <div
                className="scroll-height w-full 992px:w-[95%] max-w-[1366px] mx-auto my-0 h-auto 992px:flex"
            >
                {/* Left Side - Content Section */}
                <div className="flex flex-grow justify-start items-center w-[96%] 480px:w-full 992px:w-1/2 mx-auto 992px:mx-0 pt-[35px] 480px:pt-0 [flex:1]">
                    <div
                        className="h-auto w-[82%] mx-auto 992px:w-[90%] p-0 992px:h-full bg-white leading-[2]"
                    >
                        {/* Guarantee Seal and Logo */}
                        <div
                            id="guarantee-seal-wrapper"
                            className="768px:flex mb-[24px] items-center justify-evenly"
                        >
                            <img
                                src="https://www.securecash.com.au/images/seal.png"
                                alt="Australia Cash in Transit Services | SecureCash Guaranteed Seal"
                                width="95%"
                                height="auto"
                                className="w-[50%] h-[50%] mx-auto 1024px:w-[300px] 1024px:h-[230px]"
                            />
                            <div className="flex flex-col items-center justify-center w-full">
                                <h3
                                    id="logo-text"
                                    className="text-[40px] font-medium font-times text-center w-full"
                                >
                                    Secure<span className="text-primary">Cash</span>
                                </h3>
                                <h3 className="font-bold text-[20px] leading-[27px] mb-4 w-full text-center">
                                    Don&apos;t take the risk.
                                    <br />
                                    Let us do your banking!
                                </h3>

                            </div>
                        </div>

                        {/* Content Items */}
                        <ul className="list-none w-full italic" id="scroll-content">
                            {guaranteeContent.map((item, index) => (
                                <li key={index}>
                                          <div
                                                          key={index}
                                                          className="text-justify 768px:text-start font-light leading-[2rem] mt-2.5 414px:pr-0 mb-8"
                                                        >{parse(item, { replace: replaceLinks }) }
                                                          </div>
                                
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side - Image with CTA Overlay */}
                <div className="float-none w-full mx-auto 992px:w-1/2 relative left-0 flex-1 flex justify-center items-center 992px:justify-end 992px:float-right">
                    <div className="relative  600px:w-[95%] 1024px:w-[90%]">
                        <img
                            className="backdraft my-auto w-full h-auto  600px:h-[740px] 1280px:h-auto object-cover object-[30%]"
                            src={imageUrl}
                            alt="Australia Cash in Transit Services"
                        />

                        <div className="absolute top-0 992px:left-0 w-[70%] h-full 768px:h-[80%] bg-black/60 flex flex-col justify-center py-[30px] px-[10px] 768px:py-0 768px:px-[50px]">
                            <Typography
                                as="h4"
                                fontFamily="font-montserrat"
                                className="text-[22px] 480px:text-[26px] 768px:text-[28px] 992px:text-[33px] leading-[32px] 480px:leading-[36px] 768px:leading-[43px]  992px:leading-[48px] font-bold text-white text-center 992px:text-left mb-0"                            >
                                Give more focus to the things you love.
                            </Typography>
                            <Divider
                                color="white"
                                margin="my-6"
                                alignment="center"
                                responsiveClassName="992px:mx-0 992px:text-left w-[100px]"
                            />

                            <Typography
                                as="p"
                                fontFamily="font-montserrat"
                                className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3"
                            >
                                <strong>Call us</strong> at{' '}
                                <a href="tel:1300732873" className="text-primary hover:underline">
                                    1300 SECURE
                                </a>
                            </Typography>
                            <Typography
                                as="p"
                                fontFamily="font-montserrat"
                                className="text-[18px] 768px:text-[26px] 768px:leading-[1.4em] font-medium text-white text-center mt-4 pb-3"
                            >
                                or
                            </Typography>
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