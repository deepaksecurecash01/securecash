'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import HeroImage from '@/components/contact/HeroImage';
import CompaniesSlider from "@/components/common/CompaniesSlider";
import FormSection from '@/components/contact/FormSection';

const ContactPage = () =>
{
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAoDwTTSDtafFJrNeRrb75k8WXBrYzJX38',
    });

    // All the location coordinates
    const coordinates = [
        { lat: -31.083332, lng: 150.916672 }, // Tamworth, NSW, Australia
        { lat: -32.916668, lng: 151.75 }, // Newcastle, NSW, Australia
        { lat: -34.754723, lng: 149.618607 }, // Lithgow, NSW, Australia
        { lat: -34.754723, lng: 149.618607 }, // Goulburn, NSW, Australia
        { lat: -32.256943, lng: 148.601105 }, // Dubbo, NSW, Australia
        { lat: -31.956667, lng: 141.467773 }, // Broken Hill, NSW, Australia
        { lat: -30.5, lng: 151.649994 }, // Armidale, NSW, Australia
        { lat: -31.747, lng: 115.803001 }, // Wanneroo, WA, Australia
        { lat: -20.736, lng: 116.846001 }, // Karratha, WA, Australia
        { lat: -20.736, lng: 116.846001 }, // Karratha, WA, Australia
        { lat: -32.528889, lng: 115.723053 }, // Mandurah, WA, Australia
        { lat: -30.74889, lng: 121.465836 }, // Kalgoorlie, WA, Australia
        { lat: -33.647778, lng: 115.345833 }, // Busselton, WA, Australia
        { lat: -35.022778, lng: 117.881386 }, // Albany, WA, Australia
        { lat: -38.383331, lng: 142.483337 }, // Warrnambool, VIC, Australia
        { lat: -35.333332, lng: 143.550003 }, // Swan Hill, VIC, Australia
        { lat: -38.099998, lng: 147.066666 }, // Sale, VIC, Australia
        { lat: -38.233334, lng: 146.399994 }, // Latrobe City, VIC, Australia
        { lat: -36.716667, lng: 142.199997 }, // Horsham, VIC, Australia
        { lat: -38.150002, lng: 144.350006 }, // Geelong, VIC, Australia
        { lat: -38.133331, lng: 145.116669 }, // Frankston, VIC, Australia
        { lat: -37.549999, lng: 143.850006 }, // Ballarat, VIC, Australia
        { lat: -36.551945, lng: 145.981674 }, // Benalla, VIC, Australia
        { lat: -37.833332, lng: 147.616669 }, // Bairnsdale, VIC, Australia
        { lat: -37.283333, lng: 142.916672 }, // Ararat, VIC, Australia
        { lat: -41.180557, lng: 146.34639 }, // Devonport, Tasmania, Australia
        { lat: -41.06361, lng: 145.875275 }, // Burnie, Tasmania, Australia
        { lat: -42.880554, lng: 147.324997 }, // Hobart, Tasmania, Australia
        { lat: -33.033333, lng: 137.566666 }, // Whyalla, SA, Australia
        { lat: -35.549999, lng: 138.616669 }, // Victor Harbor, SA, Australia
        { lat: -33.185833, lng: 138.016937 }, // Port Pirie, SA, Australia
        { lat: -34.846111, lng: 138.503052 }, // Port Adelaide, SA, Australia
        { lat: -35.117001, lng: 139.266998 }, // Murray Bridge, SA, Australia
        { lat: -19.307222, lng: 146.731674 }, // Thuringowa, QLD, Australia
        { lat: -27.566668, lng: 151.949997 }, // Toowoomba, QLD, Australia
        { lat: -23.375, lng: 150.511673 }, // Rockhampton, QLD, Australia
        { lat: -21.144337, lng: 149.186813 }, // Mackay, QLD, Australia
        { lat: -24.85, lng: 152.350006 }, // Bundaberg, QLD, Australia
        { lat: -12.480556, lng: 130.983063 }, // Palmerston, Northern Territory, Australia
        { lat: -26.65, lng: 153.066666 }, // Sunshine Coast, Queensland, Australia
        { lat: -34.92123, lng: 138.599503 }, // Adelaide, SA, Australia
        { lat: -41.429825, lng: 147.157135 }, // Launceston, TAS, Australia
        { lat: -19.258965, lng: 146.816956 }, // Townsville City, QLD, Australia
        { lat: -16.925491, lng: 145.75412 }, // Cairns City, QLD, Australia
        { lat: -34.206841, lng: 142.13649 }, // Mildura, VIC, Australia
        { lat: -30.296276, lng: 153.114136 }, // Coffs Harbour, NSW, Australia
        { lat: -36.757786, lng: 144.278702 }, // Bendigo, VIC, Australia
        { lat: -36.08078, lng: 146.916473 }, // Albury, NSW, Australia
        { lat: -12.462827, lng: 130.841782 }, // Darwin, Northern Territory, Australia
        { lat: -27.470125, lng: 153.021072 }, // Brisbane, QLD, Australia
        { lat: -23.843138, lng: 151.268356 }, // Gladstone QLD, Australia
        { lat: -37.824429, lng: 140.783783 }, // Mount Gambier, SA, Australia
        { lat: -33.865143, lng: 151.2099 }, // Sydney, NSW, Australia
        { lat: -37.0201, lng: 144.9646 }, // Victoria, Australia
        { lat: -19.491411, lng: 132.550964 }, // Northern Territory, Australia
        { lat: -30.000233, lng: 136.209152 }, // South Australia, Australia
        { lat: -25.760321, lng: 122.805176 }, // Western Australia, Australia
        { lat: -20.917574, lng: 142.702789 }, // Queensland, Australia
        { lat: -31.840233, lng: 145.612793 }, // New South Wales, Australia
        { lat: -37.683334, lng: 176.166672 }, // Tauranga, North Island, New Zealand
        { lat: -38.685692, lng: 176.070206 }, // Taupo, New Zealand
        { lat: -41.270634, lng: 173.283966 }, // Nelson, New Zealand
        { lat: -41.209164, lng: 174.908051 }, // Lower Hutt, New Zealand
        { lat: -43.52565, lng: 172.639847 }, // Christchurch, Canterbury, New Zealand
        { lat: -36.746212, lng: 174.737122 }, // Rosedale, Auckland, New Zealand
        { lat: -39.62154, lng: 176.784073 }, // Flaxmere, Hastings, New Zealand
        { lat: -42.406418, lng: 171.691162 }, // West Coast, New Zealand
        { lat: -45.004103, lng: 168.806644 }, // Queenstown Lakes District
        { lat: -46.340964, lng: 168.418626 }, // South Land
        { lat: -45.783932, lng: 170.612934 }, // Dunedin City Otago, New Zealand
        { lat: -28.169287, lng: 153.53363 }, // Kirra, Coolangatta QLD, Australia
        { lat: -33.833569, lng: 138.610001 }, // Clare Valley, Clare SA, Australia
        { lat: -16.900728, lng: 145.738388 }, // Edge Hill, QLD, Australia
        { lat: -35.306179, lng: 149.126419 }, // Capital Hill, ACT, Australia
        { lat: -34.688404, lng: 135.909932 }, // Port Lincoln
        { lat: -28.777989, lng: 114.62265 }, // Geraldton, Western Australia 6530, Australia
        { lat: -23.693652, lng: 133.892037 }, // Northern Territory 0870, Australia
        { lat: -20.725378, lng: 139.493595 }, // 86 Camooweal St Mount Isa QLD 4825, Australia
    ];

    // Testimonials data
    const testimonials = [
        {
            text: "It makes sense for us to use SecureCash for our cash floats, cash pick-up and cash counting needs during the adelaide festival. It allowed us to concentrate on our core business in the midst of the Festival."
        },
        {
            text: "The service is extremely discreet, punctual, safe and above all courteous. We wish we had switched to SecureCash years ago, and I would have no hesitation in recommending their services to anyone looking for an efficient banking solution."
        },
        {
            text: "Having used SecureCash at a number of sites for banking collections, I would thoroughly recommend them. The other advantage is that we gain our working days back by not travelling to and from the bank or waiting in queues - that alone is worth it."
        },
        {
            text: "I am very happy with the service provided by SecureCash; I find the staff to be helpful and courteous at all times and I would highly recommend their organisation to anyone who is looking for a good cash in transit service."
        },
        {
            text: "We are very happy with the service, it's always on time and the friendly staff go out of their way to give great service. SecureCash saves our company a lot of time by going to the bank for us, and they even take our cheques to the bank to deposit them for us."
        },
        {
            text: "Councils don't normally give testimonials, however I would like to advise that I have always found SecureCash staff to be very accommodating and professional and that our current arrangement is working well."
        },
        {
            text: "We were unsure we even needed this type of service, as we did our own banking. We used the code J9#FREEMONEY, and we received 2 weeks free, just to try out the service and see if it was for us. We never looked back and 6 years on we are still with SecureCash"
        },
        {
            text: "We are extremely satisfied with our change to SecureCash. They are always willing to oblige, and using this service ensures safe banking and saves us a lot of valuable time. We would recommend them to any prospective client."
        },
    ];

    const getDefaultCenterPosition = () =>
    {
        const detectWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

        if (detectWidth <= 375) {
            return {
                zoom: 2.7,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 414) {
            return {
                zoom: 3,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 667) {
            return {
                zoom: 3,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 768) {
            return {
                zoom: 4,
                center: { lat: -31, lng: 146 },
            };
        } else if (detectWidth <= 1024) {
            return {
                zoom: 4,
                center: { lat: -31, lng: 145 },
            };
        } else {
            return {
                zoom: 4,
                center: { lat: -31, lng: 153 },
            };
        }
    };

    const handlePrevTestimonial = () =>
    {
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const handleNextTestimonial = () =>
    {
        setCurrentTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const renderMap = () =>
    {
        return (
            <GoogleMap
                mapContainerStyle={{
                    width: '100%',
                    height: '500px',
                }}
                options={{
                    ...getDefaultCenterPosition(),
                }}
            >
                {coordinates.map((position, index) => (
                    <Marker key={index} position={position} />
                ))}
            </GoogleMap>
        );
    };

    return (
        <>
            <HeroImage />
        

           <FormSection/>

            {/* Testimonials Section */}
            <section className="contact-testimonial">
                <div className="inner">
                    <div className="contact-testimonial--title-wrap">
                        <h3>Testimonials</h3>
                        <hr className="divider-2 divider-gold" />
                        <p>
                          {`  Don't just take our word for it. <br />
                            Hear what our customers have to say about our services!`}
                        </p>
                    </div>
                    <div className="contact-testimonial--carousel">
                        <ul className="bullet-dots-container">
                            {testimonials.map((_, index) => (
                                <li
                                    key={index}
                                    className={`bullet-dot ${index === currentTestimonial ? 'active-dot' : ''}`}
                                    onClick={() => setCurrentTestimonial(index)}
                                />
                            ))}
                        </ul>
                        <div className="contact-testimonial--carousel-container">
                            <div className="contact-testimonial--carousel__items">
                                <div className="carousel-item">
                                    <div className="excerpt">
                                        <p>{testimonials[currentTestimonial].text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-testimonial--carousel-control">
                            <div className="carousel-control-left" onClick={handlePrevTestimonial}>
                                <i className="fa fa-chevron-left"></i><br />
                            </div>
                            <div className="carousel-control-divider">&nbsp;</div>
                            <div className="carousel-control-right" onClick={handleNextTestimonial}>
                                <i className="fa fa-chevron-right"></i><br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <div id="map-section">
                <div id="mapContainer">
                    {isLoaded ? renderMap() : <div>Loading map...</div>}
                </div>
            </div>

            <CompaniesSlider />

        </>
    );
};

export default ContactPage;