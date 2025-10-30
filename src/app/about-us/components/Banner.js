// ============================================
// Banner.jsx - OPTIMIZED
// ============================================
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Banner = () =>
{
    return (
        <>
            <div id="about-us-banner" className="max-[414px]:mt-0">
                <div
                    id="banner-mid-content"
                    className="flex justify-center items-center flex-col pt-0 px-4 h-[340px] w-full mx-auto relative overflow-hidden"
                >
                    {/* ✅ OPTIMIZED: Replaced CSS background with Next.js Image */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src="/images/banner/banner-people.webp"
                            alt="SecureCash Team"
                            fill
                            loading="lazy"
                            quality={75}
                            sizes="100vw"
                            className="object-cover object-center grayscale max-[414px]:object-[-1000px_center]"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
                        />
                    </div>

                    <hr
                        className="w-[100px] divider-gold divider-2 z-20 bg-primary h-[4px] rounded-[5px] border-0 mx-auto"
                    />
                    <h2
                        className="text-white font-medium text-center text-[32px] z-30 py-6 font-montserrat"
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

