import React from 'react';
import Divider from '@/components/common/Divider';

const PARTNER_FLAGS = [
    {
        country: 'New Zealand',
        countryCode: 'nz',
        href: '#new-zealand'
    },
    {
        country: 'Singapore',
        countryCode: 'sg',
        href: '#singapore'
    },
    {
        country: 'Sweden',
        countryCode: 'se',
        href: '#sweden'
    },
    {
        country: 'India',
        countryCode: 'in',
        href: '#india'
    },
    {
        country: 'Thailand',
        countryCode: 'th',
        href: '#thailand'
    },
    {
        country: 'Malaysia',
        countryCode: 'my',
        href: '#malaysia'
    },
    {
        country: 'United Kingdom',
        countryCode: 'gb',
        href: '#united-kingdom'
    },
    {
        country: 'Israel',
        countryCode: 'il',
        href: '#israel'
    },
    {
        country: 'Nigeria',
        countryCode: 'ng',
        href: '#nigeria'
    }
];

const HeroSection = () =>
{
    return (
        <div className="partners-hero pt-[70px]">
            <div className="partners-hero--header">
                <h1 className="
                    montBold 
                    text-[42px] 
                    leading-[50px] 
                    768px:px-[30px] 
                    font-semibold 
                    text-center 
                    mx-auto 
                    768px:leading-[60px] 
                    text-black
                ">
                    SecureCash International Partners
                </h1>

                <Divider
                    color="primary"
                    margin="mt-[30px] mb-[60px]"
                    alignment="center"
                    responsiveClassName="w-[100px]"
                />

                <h3 className="
                    text-[22px] 
                    leading-[30px] 
                    mb-10 
                    text-center
                    mx-auto
                    768px:text-[26px] 
                    font-normal 
                    768px:leading-[45px] 
                    1024px:text-start
                    text-black
                ">
                    Our International Collaboration
                </h3>

                <p className="text-center leading-[2em]  414px:mb-3 768px:mb-9">
                    We are proud to say that we are partners of some of the world&apos;s most
                    renowned security agencies and security service providers!
                </p>


                <div className="partners-hero--header__img">
                    <img
                        src="https://www.securecash.com.au/images/partners/australiacolors.png"
                        alt="SecureCash Partners Australia Map"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="
                partners--flag-wrap 
                px-0 
                mt-[52px] 
                480px:px-[80px] 
                text-center 
                flex 
                items-center 
                justify-center 
                gap-[5px] 
                flex-wrap
            ">
                {PARTNER_FLAGS.map(({ country, countryCode, href }) => (
                    <a
                        key={country}
                        href={href}
                        style={{ margin: '6px' }}
                        aria-label={`${country} Flag`}
                    >
                        <img
                            src={`https://flagcdn.com/80x60/${countryCode}.png`}
                            srcSet={`https://flagcdn.com/160x120/${countryCode}.png 2x, https://flagcdn.com/240x180/${countryCode}.png 3x`}
                            width="60"
                            height="48"
                            alt={country}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;