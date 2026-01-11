'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { MapRef } from 'react-map-gl/mapbox';
import { point } from '@turf/helpers';
import distance from '@turf/distance';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { CALIFORNIA_FAULTS } from '@/data/california-faults';
import { COUNTY_RISKS } from '@/data/california-risk';

// Find the nearest fault to a given point
function findNearestFault(lng: number, lat: number): GeoJSON.Feature | null {
  const pt = point([lng, lat]);
  let nearestFault: GeoJSON.Feature | null = null;
  let minDistance = Infinity;

  for (const fault of CALIFORNIA_FAULTS.features) {
    try {
      const nearestPoint = nearestPointOnLine(fault as GeoJSON.Feature<GeoJSON.LineString>, pt);
      const dist = distance(pt, nearestPoint, { units: 'miles' });

      if (dist < minDistance) {
        minDistance = dist;
        nearestFault = fault as GeoJSON.Feature;
      }
    } catch {
      // Skip if geometry is invalid
    }
  }

  return nearestFault;
}

// ============================================
// COLOR PALETTE ANALYSIS
// ============================================
//
// FAULT LINES: Magenta/Pink (#ec4899)
// - Contrasts with warm tones (wildfire reds/oranges)
// - Contrasts with cool tones (flood blues)
// - USGS standard for fault lines on geological maps
// - Intuitive "danger/rupture" signifier
//
// WILDFIRE RISK: Green → Yellow → Orange → Red
// - Intuitive fire danger progression
// - Matches Cal Fire severity standards
//
// FLOOD RISK: Green → Teal → Cyan → Purple
// - Distinct from water body blue
// - Progressive danger indication
// - Purple for extreme = stands out from all blues
//
// WATER BODIES: Dark slate blue (#0f172a)
// - Clearly water, but muted
// - Won't compete with flood risk visualization
// ============================================

interface RiskLayersProps {
  mapRef: React.RefObject<MapRef | null>;
  mapLoaded: boolean;
  riskType: 'wildfire' | 'flood' | 'hurricane';
  selectedLocation?: [number, number] | null;
}

export function RiskLayers({ mapRef, mapLoaded, riskType, selectedLocation }: RiskLayersProps) {
  const layersInitialized = useRef(false);
  const [countyData, setCountyData] = useState<GeoJSON.FeatureCollection | null>(null);

  // Compute nearest fault using useMemo instead of useState + useEffect
  const nearestFault = useMemo(() => {
    if (selectedLocation) {
      const [lng, lat] = selectedLocation;
      return findNearestFault(lng, lat);
    }
    return null;
  }, [selectedLocation]);

  // Fetch real county boundaries
  useEffect(() => {
    fetch('/data/california-counties.geojson')
      .then(res => res.json())
      .then((data: GeoJSON.FeatureCollection) => {
        const enrichedFeatures = data.features.map(feature => {
          const countyName = feature.properties?.name as string;
          const riskData = COUNTY_RISKS[countyName];
          return {
            ...feature,
            properties: {
              ...feature.properties,
              wildfire_score: riskData?.wildfire ?? 30,
              flood_score: riskData?.flood ?? 30,
              earthquake_score: riskData?.earthquake ?? 30,
              hurricane_score: riskData?.hurricane ?? 15,
            },
          };
        });
        setCountyData({ type: 'FeatureCollection', features: enrichedFeatures });
      })
      .catch(err => console.error('Failed to load county data:', err));
  }, []);

  // Update highlighted fault layer
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const map = mapRef.current.getMap();
    if (!map) return;

    // Remove existing highlight layers
    ['nearest-fault-glow', 'nearest-fault-line', 'nearest-fault-label'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
    });
    if (map.getSource('nearest-fault')) {
      map.removeSource('nearest-fault');
    }

    // Add highlight for nearest fault if we have one
    if (nearestFault) {
      map.addSource('nearest-fault', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [nearestFault],
        },
      });

      // Bright outer glow
      map.addLayer({
        id: 'nearest-fault-glow',
        type: 'line',
        source: 'nearest-fault',
        paint: {
          'line-color': '#facc15', // Yellow-400
          'line-width': 20,
          'line-opacity': 0.5,
          'line-blur': 8,
        },
      });

      // Bright main line
      map.addLayer({
        id: 'nearest-fault-line',
        type: 'line',
        source: 'nearest-fault',
        paint: {
          'line-color': '#fef08a', // Yellow-200
          'line-width': 4,
          'line-opacity': 1,
        },
      });

      // Fault name label
      map.addLayer({
        id: 'nearest-fault-label',
        type: 'symbol',
        source: 'nearest-fault',
        layout: {
          'symbol-placement': 'line-center',
          'text-field': ['get', 'name'],
          'text-size': 14,
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#fef9c3', // Yellow-100
          'text-halo-color': '#000000',
          'text-halo-width': 2,
        },
      });
    }
  }, [mapLoaded, mapRef, nearestFault]);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !countyData) return;

    const map = mapRef.current.getMap();
    if (!map) return;

    // Add county source if needed
    if (!map.getSource('california-counties')) {
      map.addSource('california-counties', {
        type: 'geojson',
        data: countyData,
      });
    }

    // Add fault source if needed
    if (!map.getSource('california-faults')) {
      map.addSource('california-faults', {
        type: 'geojson',
        data: CALIFORNIA_FAULTS as GeoJSON.FeatureCollection,
      });
    }

    // Remove existing risk layers (but keep water and faults)
    ['county-risk-fill', 'county-boundaries'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
    });

    // Add fault layers only once
    if (!layersInitialized.current) {
      // Fault lines - MAGENTA for visibility
      // Outer glow
      map.addLayer({
        id: 'fault-lines-major-glow',
        type: 'line',
        source: 'california-faults',
        filter: ['==', ['get', 'significance'], 'major'],
        paint: {
          'line-color': '#ec4899', // Pink-500
          'line-width': 12,
          'line-opacity': 0.25,
          'line-blur': 4,
        },
      });
      // Main line
      map.addLayer({
        id: 'fault-lines-major',
        type: 'line',
        source: 'california-faults',
        filter: ['==', ['get', 'significance'], 'major'],
        paint: {
          'line-color': '#f472b6', // Pink-400
          'line-width': 2.5,
          'line-opacity': 1,
        },
      });
      // Moderate faults
      map.addLayer({
        id: 'fault-lines-moderate',
        type: 'line',
        source: 'california-faults',
        filter: ['==', ['get', 'significance'], 'moderate'],
        minzoom: 6,
        paint: {
          'line-color': '#f9a8d4', // Pink-300
          'line-width': 1.5,
          'line-opacity': 0.8,
        },
      });
      // Minor faults
      map.addLayer({
        id: 'fault-lines-minor',
        type: 'line',
        source: 'california-faults',
        filter: ['==', ['get', 'significance'], 'minor'],
        minzoom: 8,
        paint: {
          'line-color': '#fbcfe8', // Pink-200
          'line-width': 1,
          'line-opacity': 0.6,
        },
      });

      layersInitialized.current = true;
    }

    // Update water styling based on mode (outdoors-v12 has built-in water layer)
    if (map.getLayer('water')) {
      if (riskType === 'flood') {
        // Brighter, more prominent water in flood mode
        map.setPaintProperty('water', 'fill-color', '#0284c7'); // Sky-600
      } else if (riskType === 'hurricane') {
        // Ocean emphasis for hurricane mode
        map.setPaintProperty('water', 'fill-color', '#0891b2'); // Cyan-600
      } else {
        // Subtle water in wildfire mode
        map.setPaintProperty('water', 'fill-color', '#7dd3fc'); // Sky-300 (default-ish)
      }
    }

    if (riskType === 'wildfire') {
      // ========================================
      // WILDFIRE MODE
      // Green → Yellow → Orange → Red
      // ========================================

      map.addLayer(
        {
          id: 'county-risk-fill',
          type: 'fill',
          source: 'california-counties',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'wildfire_score'],
              25, '#22c55e',  // Green-500 (Low)
              45, '#eab308',  // Yellow-500 (Moderate)
              65, '#f97316',  // Orange-500 (High)
              85, '#dc2626',  // Red-600 (Very High)
            ],
            'fill-opacity': 0.45,  // Higher opacity for satellite visibility
          },
        },
        'fault-lines-major-glow'
      );

      map.addLayer(
        {
          id: 'county-boundaries',
          type: 'line',
          source: 'california-counties',
          paint: {
            'line-color': 'rgba(255, 255, 255, 0.3)',
            'line-width': 1,
          },
        },
        'fault-lines-major-glow'
      );

    } else if (riskType === 'flood') {
      // ========================================
      // FLOOD MODE
      // Green → Teal → Cyan → Purple
      // (Distinct from water body blue)
      // ========================================

      // Flood risk: Green → Teal → Cyan → Purple
      // Purple for high risk creates clear differentiation from water
      map.addLayer(
        {
          id: 'county-risk-fill',
          type: 'fill',
          source: 'california-counties',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'flood_score'],
              25, '#10b981',  // Emerald-500 (Low - safe)
              40, '#14b8a6',  // Teal-500 (Moderate)
              55, '#06b6d4',  // Cyan-500 (High)
              70, '#8b5cf6',  // Violet-500 (Very High - danger)
            ],
            'fill-opacity': 0.5,
          },
        },
        'fault-lines-major-glow'
      );

      map.addLayer(
        {
          id: 'county-boundaries',
          type: 'line',
          source: 'california-counties',
          paint: {
            'line-color': 'rgba(139, 92, 246, 0.4)', // Violet tint
            'line-width': 1,
          },
        },
        'fault-lines-major-glow'
      );
    } else {
      // ========================================
      // HURRICANE MODE
      // Light Teal → Teal → Emerald → Dark Emerald
      // Coastal/tropical feel
      // ========================================

      map.addLayer(
        {
          id: 'county-risk-fill',
          type: 'fill',
          source: 'california-counties',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'hurricane_score'],
              10, '#99f6e4',  // Teal-200 (Very Low)
              25, '#5eead4',  // Teal-300 (Low)
              35, '#2dd4bf',  // Teal-400 (Moderate)
              50, '#14b8a6',  // Teal-500 (High)
            ],
            'fill-opacity': 0.5,
          },
        },
        'fault-lines-major-glow'
      );

      map.addLayer(
        {
          id: 'county-boundaries',
          type: 'line',
          source: 'california-counties',
          paint: {
            'line-color': 'rgba(20, 184, 166, 0.4)', // Teal tint
            'line-width': 1,
          },
        },
        'fault-lines-major-glow'
      );
    }

  }, [mapLoaded, mapRef, countyData, riskType]);

  return null;
}
