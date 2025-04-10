import React from 'react';
import Divider from '../common/Divider';

const PARTNER_FLAGS = [
    {
        country: 'New Zealand',
        src: 'https://www.securecash.com.au/images/partners/new-zealand.png',
        href: '#new-zealand'
    },
    {
        country: 'Singapore',
        src: 'https://www.securecash.com.au/images/partners/singapore.png',
        href: '#singapore'
    },
    {
        country: 'Sweden',
        src: 'https://www.securecash.com.au/images/partners/sweden.png',
        href: '#sweden'
    },
    {
        country: 'India',
        src: 'https://www.securecash.com.au/images/partners/india.png',
        href: '#india',
        width: 70,
        height: 70
    },
    {
        country: 'Thailand',
        src: 'https://www.securecash.com.au/images/partners/thailand.png',
        href: '#thailand',
        width: 70,
        height: 70
    },
    {
        country: 'Malaysia',
        src: 'https://www.securecash.com.au/images/partners/malaysia.png',
        href: '#malaysia',
        width: 69,
        height: 69
    },
    {
        country: 'United Kingdom',
        src: 'https://www.securecash.com.au/images/partners/uk.png',
        href: '#united-kingdom'
    },
    {
        country: 'Israel',
        src: 'https://www.securecash.com.au/images/partners/israel.png',
        href: '#israel',
        width: 74,
        height: 72
    },
    {
        country: 'Nigeria',
        src: 'https://www.securecash.com.au/images/partners/nigeria.png',
        href: '#nigeria',
        width: 75,
        height: 75
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
                    We are proud to say that we are partners of some of the world's most
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
                {PARTNER_FLAGS.map(({ country, src, href, width, height }) => (
                    <a
                        key={country}
                        href={href}
                        style={{ margin: '6px' }}
                        aria-label={`${country} Flag`}
                    >
                        <img
                            src={src}
                            alt={`Flag of ${country}`}
                            width={width || 'auto'}
                            height={height || 'auto'}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;