import React from 'react';
import Divider from '../common/Divider';
import Heading from '../common/Heading';

const Banner = () =>
{
    return (
        <>
            <div id="about-us-banner" className="max-[414px]:mt-0">
                <div
                    id="banner-mid-content"
                    className="flex justify-center items-center flex-col pt-0 px-4 bg-cover bg-no-repeat h-[340px] w-full mx-auto relative before:content-[''] before:w-full before:h-[340px] before:absolute before:bg-[url('https://securecash.com.au/images/banner/banner-people.webp')] before:bg-no-repeat before:grayscale before:bg-cover before:bg-center max-[414px]:before:bg-[-1000px_center]"
                >
                    <Divider
                        color="primary"
                        alignment="left"
                        margin="m-0"
                        responsiveClassName="768px:text-left 768px:mx-0 divider-gold divider-2 z-20"
                    />
                    <Heading
                        as="h2"
                        color="white"
                        fontWeight="medium"
                        fontSize="40px"
                        lineHeight="1.4em"
                        marginBottom="0px"
                        textAlign="center"
                        className="font-medium max-[414px]:text-[36px]"
                        responsiveClassName="text-[32px] z-30 py-6"
                    >
                        Join The SecureCash Family
                    </Heading>
                    <div className="w-[200px] bg-[#c7a652] text-[#fff] text-center px-[8px] py-[14px] rounded-[50px] mt-0 768px:ml-0 z-10 hover:bg-[#fff] hover:text-[#000] hover:cursor-pointer no-underline mr-0">
                        <a href="https://www.securecash.com.au/quote">Get a Quote</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;