'use client';
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import HeroImage from '@/components/contact/HeroImage';
import CompaniesSlider from '@/components/common/CompaniesSlider';
import FormSection from '@/components/contact/FormSection';
import { AUSTRALIA_COORDINATES, NEW_ZEALAND_COORDINATES } from './mapCoordinates.js';
import TestimonialsSection from '@/components/contact/TestimonialsSection';

// Constants
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Libraries needed for AdvancedMarkerElement
const libraries = ['marker'];

const ContactPage = () =>
{
    // Map setup
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    // Combine all coordinates
    const allCoordinates = [...AUSTRALIA_COORDINATES, ...NEW_ZEALAND_COORDINATES];

    return (
        <>
            <HeroImage />
            <FormSection />
            <TestimonialsSection />
            <MapSection isLoaded={isLoaded} coordinates={allCoordinates} />
            <CompaniesSlider />
        </>
    );
};

// Map component
const MapSection = ({ isLoaded, coordinates }) =>
{
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const onLoad = React.useCallback((map) =>
    {
        setMap(map);

        // Create AdvancedMarkerElements
        const newMarkers = coordinates.map((position, index) =>
        {
            return new window.google.maps.marker.AdvancedMarkerElement({
                position: position,
                map: map,
                title: `Location ${index + 1}`, // Optional: add titles for accessibility
            });
        });

        setMarkers(newMarkers);
    }, [coordinates]);

    const onUnmount = React.useCallback(() =>
    {
        // Clean up markers
        markers.forEach(marker =>
        {
            if (marker.map) {
                marker.map = null;
            }
        });
        setMarkers([]);
        setMap(null);
    }, [markers]);

    if (!isLoaded) return (<div id="map-section">
        <div id="mapContainer">
            <div style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                color: '#666'
            }}>
                Loading map...
            </div>
        </div>
    </div>);

    return (
        <div id="map-section">
            <div id="mapContainer">
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '500px',
                    }}
                    options={getDefaultMapOptions()}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {/* No need for JSX markers anymore - they're created in onLoad */}
                </GoogleMap>
            </div>
        </div>
    );
};

// Helper function to determine map options based on screen size
const getDefaultMapOptions = () =>
{
    const detectWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

    if (detectWidth <= 375) {
        return {
            zoom: 2.7,
            center: { lat: -31, lng: 146 },
            mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
        };
    } else if (detectWidth <= 414) {
        return {
            zoom: 3,
            center: { lat: -31, lng: 146 },
            mapId: 'DEMO_MAP_ID',
        };
    } else if (detectWidth <= 667) {
        return {
            zoom: 3,
            center: { lat: -31, lng: 146 },
            mapId: 'DEMO_MAP_ID',
        };
    } else if (detectWidth <= 768) {
        return {
            zoom: 4,
            center: { lat: -31, lng: 146 },
            mapId: 'DEMO_MAP_ID',
        };
    } else if (detectWidth <= 1024) {
        return {
            zoom: 4,
            center: { lat: -31, lng: 145 },
            mapId: 'DEMO_MAP_ID',
        };
    } else {
        return {
            zoom: 4,
            center: { lat: -31, lng: 153 },
            mapId: 'DEMO_MAP_ID',
        };
    }
};

export default ContactPage;