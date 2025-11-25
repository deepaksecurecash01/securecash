'use client';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// Use the ENV variable for consistency, fallback to the hardcoded one if needed
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || 'c5ae37729b6aeaa456641527';
const LIBRARIES = ['marker'];

const getDefaultMapOptions = (width) =>
{
    // Helper to get consistent options
    const commonOptions = {
        mapId: MAP_ID,
        disableDefaultUI: false, // Optional: clean up UI if desired
        clickableIcons: false
    };

    if (width <= 375) return { ...commonOptions, zoom: 2.7, center: { lat: -31, lng: 146 } };
    if (width <= 414) return { ...commonOptions, zoom: 3, center: { lat: -31, lng: 146 } };
    if (width <= 667) return { ...commonOptions, zoom: 3, center: { lat: -31, lng: 146 } };
    if (width <= 768) return { ...commonOptions, zoom: 4, center: { lat: -31, lng: 146 } };
    if (width <= 1024) return { ...commonOptions, zoom: 4, center: { lat: -31, lng: 145 } };

    return { ...commonOptions, zoom: 4, center: { lat: -31, lng: 153 } };
};

const LoadingSpinner = () => (
    <div style={{ height: '500px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-10 h-10 border-4 border-[#c6a54b] border-t-transparent rounded-full animate-spin"></div>
    </div>
);

// Separated Logic Component for cleaner renders
const MapInstance = ({ coordinates }) =>
{
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    // Memoize options to prevent re-renders
    const mapOptions = useMemo(() =>
    {
        if (typeof window === 'undefined') return getDefaultMapOptions(1024);
        return getDefaultMapOptions(window.innerWidth);
    }, []);

    const onLoad = useCallback((mapInstance) =>
    {
        setMap(mapInstance);

        // Advanced Marker Logic
        if (window.google?.maps?.marker?.AdvancedMarkerElement) {
            const newMarkers = coordinates.map((position, index) =>
            {
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    position: position,
                    map: mapInstance,
                    title: `Location ${index + 1}`,
                });
                return marker;
            });
            setMarkers(newMarkers);
        }
    }, [coordinates]);

    const onUnmount = useCallback(() =>
    {
        markers.forEach(marker =>
        {
            if (marker.map) marker.map = null;
        });
        setMarkers([]);
        setMap(null);
    }, [markers]);

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '500px' }}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
        />
    );
};

const MapSection = ({ coordinates }) =>
{
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    // 1. HOISTED LOADER: Load script at section level, not inside conditional child
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        mapId: MAP_ID, // Ensure this matches the Map options exactly
        libraries: LIBRARIES,
    });

    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            (entries) =>
            {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (loadError) return <div className="h-[500px] flex items-center justify-center bg-red-50 text-red-600">Failed to load map.</div>;

    return (
        <section id="map-section" className="w-full" ref={containerRef}>
            <div id="mapContainer" className="w-full">
                {/* Only render MapInstance if Visible AND Script is Loaded */}
                {isVisible && isLoaded ? (
                    <MapInstance coordinates={coordinates} />
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </section>
    );
};

export default MapSection;