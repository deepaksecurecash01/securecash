// ============================================
// STEP 1: Create Dynamic Google Maps Wrapper
// File: components/dynamic/DynamicGoogleMap.jsx
// ============================================
'use client';
import dynamic from 'next/dynamic';

// ✅ Dynamically import Google Maps components
// They will only load when this component is rendered
const DynamicGoogleMap = dynamic(
    () => import('@react-google-maps/api').then(mod => ({
        default: mod.GoogleMap
    })),
    {
        ssr: false,
        loading: () => (
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
        ),
    }
);

const DynamicUseJsApiLoader = dynamic(
    () => import('@react-google-maps/api').then(mod => ({
        default: () => mod.useJsApiLoader
    })),
    { ssr: false }
);

export { DynamicGoogleMap, DynamicUseJsApiLoader };