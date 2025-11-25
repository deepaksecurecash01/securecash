
'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ['marker'];

const getDefaultMapOptions = () =>
{
    if (typeof window === 'undefined') return { zoom: 4, center: { lat: -31, lng: 153 } };
    const width = window.innerWidth;
    if (width <= 375) return { zoom: 2.7, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    else if (width <= 768) return { zoom: 4, center: { lat: -31, lng: 146 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
    else return { zoom: 4, center: { lat: -31, lng: 153 }, mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID };
};

const LoadingSpinner = () => (
    <div style={{ height: '500px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-10 h-10 border-4 border-[#c6a54b] border-t-transparent rounded-full animate-spin"></div>
    </div>
);


const MapInner = ({ coordinates }) =>
{
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        mapIds: ['c5ae37729b6aeaa456641527'],
        libraries: LIBRARIES,
    });

    const onLoad = useCallback((mapInstance) =>
    {
        setMap(mapInstance);
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

    const onUnmount = useCallback(() =>
    {
        markers.forEach(marker => { if (marker.map) marker.map = null; });
        setMarkers([]);
        setMap(null);
    }, [markers]);

    if (loadError) return <div className="h-[500px] flex items-center justify-center bg-red-50 text-red-600">Failed to load map.</div>;

    if (!isLoaded) return <LoadingSpinner />;

    return (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '500px' }}
            options={getDefaultMapOptions()}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapId="c5ae37729b6aeaa456641527"
        />
    );
};


const MapSection = ({ coordinates }) =>
{
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

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

    return (
        <section id="map-section" className="w-full" ref={containerRef}>
            <div id="mapContainer" className="w-full">
                {isVisible ? (
                    <MapInner coordinates={coordinates} />
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </section>
    );
};

export default MapSection;