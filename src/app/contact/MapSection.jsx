// ============================================
// File: app/contact/MapSection.jsx
// ============================================
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// Constants
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ['marker']; // ✅ Keep this outside to prevent re-renders

// ✅ Helper function for responsive map options
const getDefaultMapOptions = () =>
{
    if (typeof window === 'undefined') {
        return {
            zoom: 4,
            center: { lat: -31, lng: 153 },
            mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || 'DEMO_MAP_ID',
        };
    }

    const width = window.innerWidth;

    if (width <= 375) {
        return { zoom: 2.7, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    } else if (width <= 414) {
        return { zoom: 3, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    } else if (width <= 667) {
        return { zoom: 3, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    } else if (width <= 768) {
        return { zoom: 4, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    } else if (width <= 1024) {
        return { zoom: 4, center: { lat: -31, lng: 145 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    } else {
        return { zoom: 4, center: { lat: -31, lng: 153 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    }
};

const MapSection = ({ coordinates }) =>
{
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    // ✅ Load Google Maps API
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: LIBRARIES,
    });

    // ✅ Create markers when map loads
    const onLoad = useCallback((mapInstance) =>
    {
        setMap(mapInstance);

        // Wait for Advanced Markers API to be ready
        if (window.google?.maps?.marker?.AdvancedMarkerElement) {
            const newMarkers = coordinates.map((position, index) =>
            {
                return new window.google.maps.marker.AdvancedMarkerElement({
                    position: position,
                    map: mapInstance,
                    title: `Location ${index + 1}`,
                });
            });
            setMarkers(newMarkers);
        }
    }, [coordinates]);

    // ✅ Cleanup markers on unmount
    const onUnmount = useCallback(() =>
    {
        markers.forEach(marker =>
        {
            if (marker.map) {
                marker.map = null;
            }
        });
        setMarkers([]);
        setMap(null);
    }, [markers]);

    // ✅ Handle load errors
    if (loadError) {
        return (
            <div className="map-error-container">
                <div style={{
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fee',
                    color: '#c33',
                    fontSize: '16px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    Failed to load map. Please check your internet connection.
                </div>
            </div>
        );
    }

    // ✅ Loading state
    if (!isLoaded) {
        return (
            <div className="map-loading-container">
                <div style={{
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#666',
                    fontSize: '18px'
                }}>
                    <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                        <span>Loading map...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section id="map-section" className="w-full">
            <div id="mapContainer" className="w-full">
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '500px',
                    }}
                    options={getDefaultMapOptions()}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {/* Markers are created programmatically in onLoad */}
                </GoogleMap>
            </div>
        </section>
    );
};

export default MapSection;