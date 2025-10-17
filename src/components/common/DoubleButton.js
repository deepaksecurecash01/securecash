import Link from 'next/link';
import React from 'react';

const DoubleButton = ({
    primaryButton = { text: "Get a Quote", href: "/quote" },
    secondaryButton = { text: "Read More", href: "#read-more" },
    className = "",
    id = ""
}) =>
{
    const baseContainerClasses = "cta-box w-[95%] 480px:w-[80%] 600px:w-[50%] justify-evenly mt-0 414px:mt-[50px] 992px:mt-[80px] relative 992px:w-[545px] flex items-center 1070px:mb-0 1070px:mt-[40px]";

    const baseBtnClasses = "flex flex-row justify-center items-center w-[150px] 414px:w-[170px] min-h-[45px] min-w-[130px] px-5 py-0 rounded-full 992px:min-w-[200px] 992px:min-h-[62px] max-h-[73px] group 768px:mx-auto 992px:mx-0";

    const baseTextClasses = "m-0 p-0 text-[14px] 768px:text-base 992px:text-lg font-semibold w-full hover:no-underline text-center";

    return (
        <div
            className={`${baseContainerClasses} ${className}`}
            id={id}
        >
            {/* Primary Button */}
            <Link href={primaryButton.href} className="mx-[10px] 992px:mx-0 button">
                <div className={`${baseBtnClasses} bg-[#c7a652] btn-learn-more hover:bg-white`}>
                    <p className={`${baseTextClasses} text-[#ffffff] group-hover:text-[#000]`}>
                        {primaryButton.text}
                    </p>
                </div>
            </Link>

            {/* Secondary Button */}
            <Link href={secondaryButton.href} className="mx-[10px] 992px:mx-0 button">
                <div className={`${baseBtnClasses} bg-white`}>
                    <p className={`${baseTextClasses} group-hover:text-[#c7a652] text-[#000]`}>
                        {secondaryButton.text}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default DoubleButton;