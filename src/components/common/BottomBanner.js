// ============================================
// BottomBanner.jsx - OPTIMIZED
// ============================================
import React from "react";
import Image from "next/image";

const BottomBanner = () =>
{
  return (
    <>
      <div id="about-us-banner-bottom" className="h-[340px] w-full max-[414px]:mt-0">
        <div
          id="banner-mid-content"
          className="relative h-[340px] w-full mx-auto flex flex-col justify-end items-center px-4 overflow-hidden"
        >
          {/* ✅ OPTIMIZED: Replaced CSS background with Next.js Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/team.webp"
              alt="SecureCash Team - Let us do the banking for you"
              fill
              loading="lazy"
              quality={75}
              sizes="100vw"
              className="object-cover object-[left_34%] brightness-50"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
            />
          </div>

          <h2
            className="text-white font-medium leading-[2rem] text-center max-[414px]:text-[36px] text-[40px] z-30 py-6 font-montserrat"
          >
            Let us do the banking for you
          </h2>
          <hr
            className="w-[100px] mt-[6px] mb-[36px] divider-gold divider-2 z-20 h-[4px] rounded-[5px] border-0 bg-primary mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default BottomBanner;