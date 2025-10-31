

// ============================================
// STEP 2: Optimized Contact Page
// File: app/contact/page.jsx (or wherever your contact page is)
// ============================================
'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import HeroImage from './HeroImage';
import CompaniesSlider from '@/components/common/CompaniesSlider';
import FormSection from '@/app/contact/FormSection.js';
import TestimonialsSection from '@/app/contact/TestimonialsSection.js';

// ✅ Static imports (these are needed immediately)
import { AUSTRALIA_COORDINATES, NEW_ZEALAND_COORDINATES } from './mapCoordinates.js';

// ✅ Dynamically import the MapSection
// It will only load when user scrolls down to it
const DynamicMapSection = dynamic(
    () => import('./MapSection'),
    {
        ssr: false,
        loading: () => (
            <div id="map-section">
                <div id="mapContainer">
                    <div style={{
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                        fontSize: '18px'
                    }}>
                        Loading map...
                    </div>
                </div>
            </div>
        ),
    }
);

const ContactPage = () =>
{
    // Combine all coordinates
    const allCoordinates = [...AUSTRALIA_COORDINATES, ...NEW_ZEALAND_COORDINATES];

    return (
        <>
            <HeroImage />
            <FormSection />
            <TestimonialsSection />
            {/* ✅ Map section loads dynamically */}
            <DynamicMapSection coordinates={allCoordinates} />
            <CompaniesSlider />
        </>
    );
};

export default ContactPage;