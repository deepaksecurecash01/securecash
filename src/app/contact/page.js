// File: app/contact/page.jsx (ENHANCED VERSION)
'use client';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import HeroImage from './HeroImage';
import CompaniesSlider from '@/components/common/CompaniesSlider';
import FormSection from '@/app/contact/FormSection.js';
// import TestimonialsSection from '@/app/contact/TestimonialsSection.js';
import { AUSTRALIA_COORDINATES, NEW_ZEALAND_COORDINATES } from './mapCoordinates.js';

// ✅ Dynamically import MapSection
const DynamicMapSection = dynamic(() => import('./MapSection'), {
    ssr: false,
    loading: () => (
        <div style={{ height: '500px', backgroundColor: '#f5f5f5' }}>
            Loading map...
        </div>
    ),
});

const ContactPage = () =>
{
    const [shouldLoadMap, setShouldLoadMap] = useState(false);
    const mapSectionRef = useRef(null);
    const allCoordinates = [...AUSTRALIA_COORDINATES, ...NEW_ZEALAND_COORDINATES];

    useEffect(() =>
    {
        // ✅ Only load map when user scrolls near it
        const observer = new IntersectionObserver(
            (entries) =>
            {
                if (entries[0].isIntersecting) {
                    setShouldLoadMap(true);
                    observer.disconnect(); // Stop observing after loading
                }
            },
            {
                rootMargin: '200px', // Start loading 200px before it comes into view
            }
        );

        if (mapSectionRef.current) {
            observer.observe(mapSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <HeroImage />
            <FormSection />
            {/* <TestimonialsSection /> */}

            {/* ✅ Placeholder that triggers loading */}
            <div ref={mapSectionRef}>
                {shouldLoadMap ? (
                    <DynamicMapSection coordinates={allCoordinates} />
                ) : (
                    <div style={{ height: '500px', backgroundColor: '#f5f5f5' }}>
                        {/* Placeholder */}
                    </div>
                )}
            </div>

            <CompaniesSlider />
        </>
    );
};

export default ContactPage;