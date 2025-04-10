"use client";

import React from 'react';

const FlagImage = ({
    src,
    alt,
    width,
    height,
    flagColor,
    countryId
}) =>
{
    const handleFlagClick = () =>
    {
        const element = document.getElementById(countryId);
        if (element) {
            // Smooth scroll to the element with offset
            const offset = 100; // Adjust this value to control scroll position
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <img
            className="left mr-5 cursor-pointer transition-transform duration-300 hover:scale-105"
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={handleFlagClick}
            style={{
                border: `2px solid ${flagColor || 'transparent'}`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
        />
    );
};

export default FlagImage;