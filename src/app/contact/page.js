'use client';
import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import HeroImage from '@/app/contact/HeroImage.js';
import CompaniesSlider from '@/components/common/CompaniesSlider';
import FormSection from '@/app/contact/FormSection.js';
import TestimonialsSection from '@/app/contact/TestimonialsSection.js';
import { AUSTRALIA_COORDINATES, NEW_ZEALAND_COORDINATES } from './mapCoordinates.js';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LIBRARIES = ['marker'];

const allCoordinates = [...AUSTRALIA_COORDINATES, ...NEW_ZEALAND_COORDINATES];

const getDefaultMapOptions = () =>
{
  const detectWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;

  if (detectWidth <= 375) {
    return {
      zoom: 2.7,
      center: { lat: -31, lng: 146 },
      mapId: 'DEMO_MAP_ID',
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

const MapSection = ({ isLoaded, coordinates }) =>
{
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const onLoad = useCallback((map) =>
  {
    setMap(map);

    const newMarkers = coordinates.map((position, index) =>
    {
      return new window.google.maps.marker.AdvancedMarkerElement({
        position: position,
        map: map,
        title: `Location ${index + 1}`,
      });
    });

    setMarkers(newMarkers);
  }, [coordinates]);

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

  if (!isLoaded) {
    return (
      <div id="map-section">
        <div id="mapContainer">
          <div className="h-[500px] flex items-center justify-center bg-gray-100 text-gray-600">
            Loading map...
          </div>
        </div>
      </div>
    );
  }

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
        />
      </div>
    </div>
  );
};

const ContactPage = () =>
{
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

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

export default ContactPage;