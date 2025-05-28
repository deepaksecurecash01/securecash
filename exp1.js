'use client';
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import HeroImage from '@/components/contact/HeroImage';
import CompaniesSlider from '@/components/common/CompaniesSlider';
import FormSection from '@/components/contact/FormSection';
import { AUSTRALIA_COORDINATES, NEW_ZEALAND_COORDINATES } from './mapCoordinates.js';
import TestimonialsSection from '@/components/contact/TestimonialsSection';

// Constants
const GOOGLE_MAPS_API_KEY = 'AIzaSyAoDwTTSDtafFJrNeRrb75k8WXBrYzJX38';

const ContactPage = () =>
{
  // Map setupa
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
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
  if (!isLoaded) return <div id="map-section"><div id="mapContainer">Loading map...</div></div>;

  return (
    <div id="map-section">
      <div id="mapContainer">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '500px',
          }}
          options={getDefaultMapOptions()}
        >
          {coordinates.map((position, index) => (
            <Marker key={index} position={position} />
          ))}
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

export default ContactPage;