'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Mapbox
const MapContainer = dynamic(
  () => import('@/components/map/MapContainer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="w-full h-screen">
      <MapContainer />
    </main>
  );
}
