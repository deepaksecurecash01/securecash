import React from 'react';
import Link from 'next/link';

const Banner = () =>
{
    return (
        <>
            <div id="about-us-banner" className="max-[414px]:mt-0">
                <div
                    id="banner-mid-content"
                    className="flex justify-center items-center flex-col pt-0 px-4 bg-cover bg-no-repeat h-[340px] w-full mx-auto relative before:content-[''] before:w-full before:h-[340px] before:absolute before:bg-[url('https://securecash.com.au/images/banner/banner-people.webp')] before:bg-no-repeat before:grayscale before:bg-cover before:bg-center max-[414px]:before:bg-[-1000px_center]"
                >
                    <hr
                        
                        className="w-[100px] divider-gold divider-2 z-20 bg-primary h-[4px] rounded-[5px] border-0 mx-auto"
                    />
                    <h2
                        className="text-white font-medium text-center  text-[32px] z-30 py-6 font-montserrat"
                    >
                        Join The SecureCash Family
                    </h2>

                    <div className="w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[14px] rounded-[50px] mt-0 768px:ml-0 z-10 hover:bg-[#fff] hover:text-[#000] hover:cursor-pointer no-underline mr-0">
                        <Link href="quote">Get a Quote</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;