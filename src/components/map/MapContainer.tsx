'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Map, { NavigationControl, MapRef } from 'react-map-gl/mapbox';
import { Home } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { RiskPanel } from '@/components/panels/RiskPanel';
import { UserMarker } from './UserMarker';
import { RiskLayers } from './RiskLayers';
import { Legend } from './Legend';
import { RiskToggle } from './RiskToggle';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface LocationData {
  coordinates: [number, number];
  address: string;
  placeName: string;
}

export default function MapContainer() {
  const mapRef = useRef<MapRef>(null);
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -119.5,
    latitude: 36.5,
    zoom: 5.5,
    pitch: 0,
    bearing: 0,
  });
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [riskType, setRiskType] = useState<'wildfire' | 'flood' | 'hurricane'>('wildfire');

  // Initialize geocoder once
  useEffect(() => {
    if (!geocoderContainerRef.current || !MAPBOX_TOKEN || geocoderRef.current) return;

    try {
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mapboxgl: mapboxgl as any,
        placeholder: 'Enter your address to see your risk profile...',
        countries: 'us',
        types: 'address,place,postcode',
      });

      geocoder.addTo(geocoderContainerRef.current);
      geocoderRef.current = geocoder;

      geocoder.on('result', (e) => {
        const [lng, lat] = e.result.center;
        const address = e.result.place_name;

        setUserLocation({
          coordinates: [lng, lat],
          address: e.result.text,
          placeName: address,
        });

        // Cinematic fly-to animation
        mapRef.current?.flyTo({
          center: [lng, lat],
          zoom: 10,
          pitch: 40,
          bearing: -10,
          duration: 3000,
          essential: true,
        });

        // Show results after fly animation
        setTimeout(() => {
          setShowResults(true);
        }, 2500);
      });
    } catch (error) {
      console.error('Error initializing geocoder:', error);
    }

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove();
        geocoderRef.current = null;
      }
    };
  }, []);

  const handleDemoAddress = useCallback(() => {
    const demoLocation = {
      coordinates: [-118.2437, 34.0522] as [number, number],
      address: 'Los Angeles',
      placeName: 'Los Angeles, California, United States',
    };

    setUserLocation(demoLocation);

    mapRef.current?.flyTo({
      center: demoLocation.coordinates,
      zoom: 10,
      pitch: 40,
      bearing: -10,
      duration: 3000,
      essential: true,
    });

    setTimeout(() => {
      setShowResults(true);
    }, 2500);
  }, []);

  const handleResetView = useCallback(() => {
    mapRef.current?.flyTo({
      center: [-119.5, 36.5],
      zoom: 5.5,
      pitch: 0,
      bearing: 0,
      duration: 1500,
      essential: true,
    });
    setUserLocation(null);
    setShowResults(false);
  }, []);

  const handleMapLoad = useCallback(() => {
    setIsMapLoaded(true);
    const map = mapRef.current?.getMap();
    if (!map) return;

    try {
      // Hide all label and symbol layers for a clean look
      const layers = map.getStyle()?.layers || [];
      layers.forEach((layer) => {
        if (
          layer.type === 'symbol' ||
          layer.id.includes('label') ||
          layer.id.includes('road') ||
          layer.id.includes('path') ||
          layer.id.includes('poi')
        ) {
          map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      });

      // Add 3D terrain
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add sky layer for atmosphere
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

    } catch (error) {
      console.error('Error setting up map layers:', error);
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={handleMapLoad}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={true} />

        <RiskLayers
          mapRef={mapRef}
          mapLoaded={isMapLoaded}
          riskType={riskType}
          selectedLocation={userLocation?.coordinates}
        />

        {userLocation && (
          <UserMarker coordinates={userLocation.coordinates} />
        )}
      </Map>

      {/* Dark overlay - fades out when location selected */}
      <div
        className={`absolute inset-0 bg-black/75 pointer-events-none transition-opacity duration-1000 ${
          userLocation ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Search Bar - centered initially, moves to top after search */}
      <div
        className={`absolute z-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out ${
          userLocation
            ? 'top-6'
            : 'top-1/2 -translate-y-1/2'
        }`}
      >
        {!userLocation && (
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Foresight</h1>
            <p className="text-xl text-white/80 drop-shadow-md max-w-md">
              Understand your disaster risk. Get personalized action steps.
            </p>
          </div>
        )}
        <div
          ref={geocoderContainerRef}
          className="w-[420px] [&_.mapboxgl-ctrl-geocoder]:w-full [&_.mapboxgl-ctrl-geocoder]:max-w-none [&_.mapboxgl-ctrl-geocoder]:shadow-xl [&_.mapboxgl-ctrl-geocoder]:rounded-lg"
        />
        {!userLocation && (
          <button
            onClick={handleDemoAddress}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-lg backdrop-blur-sm border border-white/20 transition-all text-sm"
          >
            Try demo: Los Angeles, CA
          </button>
        )}
      </div>

      {/* Risk Panel */}
      {showResults && userLocation && (
        <RiskPanel
          location={userLocation}
          onClose={() => setShowResults(false)}
        />
      )}

      {/* Risk Toggle + Legend stacked */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
        <RiskToggle activeRisk={riskType} onToggle={setRiskType} />
        <Legend riskType={riskType} />
      </div>

      {/* Reset View Button */}
      <button
        onClick={handleResetView}
        className="absolute bottom-28 right-[10px] z-10 bg-white rounded-md shadow-md p-1.5 hover:bg-gray-100 transition-colors"
        title="Reset to California view"
      >
        <Home className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
