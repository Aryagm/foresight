'use client';

import { Marker } from 'react-map-gl/mapbox';

interface UserMarkerProps {
  coordinates: [number, number];
}

export function UserMarker({ coordinates }: UserMarkerProps) {
  return (
    <Marker longitude={coordinates[0]} latitude={coordinates[1]} anchor="center">
      <div className="relative">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
        </div>
        {/* Inner dot */}
        <div className="relative w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg shadow-blue-500/50" />
      </div>
    </Marker>
  );
}
