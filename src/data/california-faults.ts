// California Fault Lines - Based on USGS Quaternary Fault and Fold Database
// Source: https://earthquake.usgs.gov/hazards/qfaults/

import type { FeatureCollection, Feature, LineString } from 'geojson';

interface FaultProperties {
  name: string;
  slip_rate: string;
  slip_rate_mm: number;
  last_major?: string;
  probability?: string;
  length_km: number;
  significance: 'major' | 'moderate' | 'minor';
}

export const CALIFORNIA_FAULTS: FeatureCollection<LineString, FaultProperties> = {
  type: 'FeatureCollection',
  features: [
    // ==========================================
    // MAJOR FAULTS (slip rate > 8mm/yr or high probability)
    // ==========================================
    {
      type: 'Feature',
      properties: {
        name: 'San Andreas Fault',
        slip_rate: '20-35 mm/yr',
        slip_rate_mm: 25,
        last_major: '1906 M7.9 (North), 1857 M7.9 (South)',
        probability: '22% M7.0+ by 2044',
        length_km: 1200,
        significance: 'major',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-115.5, 32.9], [-115.7, 33.2], [-116.1, 33.7], [-116.5, 34.0],
          [-117.0, 34.2], [-117.5, 34.4], [-118.0, 34.6], [-118.5, 34.8],
          [-119.0, 35.0], [-119.5, 35.4], [-120.0, 35.7], [-120.5, 35.9],
          [-121.0, 36.2], [-121.4, 36.6], [-121.8, 37.0], [-122.2, 37.3],
          [-122.4, 37.5], [-122.45, 37.65], [-122.48, 37.78], [-122.52, 37.85],
          [-122.60, 38.0], [-122.75, 38.2], [-122.90, 38.5], [-123.10, 38.8],
          [-123.30, 39.1], [-123.60, 39.5], [-124.10, 40.0],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Hayward Fault',
        slip_rate: '9 mm/yr',
        slip_rate_mm: 9,
        last_major: '1868 M6.8',
        probability: '33% M6.7+ by 2044',
        length_km: 88,
        significance: 'major',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.88, 37.35], [-121.93, 37.40], [-122.03, 37.50], [-122.08, 37.55],
          [-122.10, 37.60], [-122.12, 37.68], [-122.14, 37.75], [-122.15, 37.80],
          [-122.16, 37.85], [-122.18, 37.90], [-122.19, 37.93], [-122.21, 37.97],
          [-122.25, 38.02],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Calaveras Fault',
        slip_rate: '15 mm/yr',
        slip_rate_mm: 15,
        last_major: '1984 M6.2 Morgan Hill',
        probability: '26% M6.7+ by 2044',
        length_km: 123,
        significance: 'major',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.40, 36.75], [-121.50, 36.90], [-121.60, 37.05], [-121.65, 37.15],
          [-121.70, 37.25], [-121.75, 37.35], [-121.80, 37.48], [-121.85, 37.60],
          [-121.90, 37.70], [-121.92, 37.75],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'San Jacinto Fault',
        slip_rate: '12-25 mm/yr',
        slip_rate_mm: 18,
        last_major: '1918 M6.8',
        probability: '31% M6.7+ by 2044',
        length_km: 230,
        significance: 'major',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-116.00, 32.70], [-116.30, 33.05], [-116.55, 33.35], [-116.75, 33.55],
          [-116.95, 33.75], [-117.15, 33.95], [-117.35, 34.10],
        ],
      },
    },

    // ==========================================
    // MODERATE FAULTS (slip rate 3-8mm/yr)
    // ==========================================
    {
      type: 'Feature',
      properties: {
        name: 'Rodgers Creek Fault',
        slip_rate: '9 mm/yr',
        slip_rate_mm: 9,
        last_major: '1969 M5.6',
        probability: 'Connected to Hayward',
        length_km: 63,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-122.48, 38.00], [-122.52, 38.08], [-122.58, 38.20],
          [-122.63, 38.35], [-122.68, 38.50], [-122.73, 38.62],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Garlock Fault',
        slip_rate: '7 mm/yr',
        slip_rate_mm: 7,
        last_major: '1952 M7.3 nearby',
        probability: '6% M6.7+ by 2044',
        length_km: 265,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-117.40, 35.50], [-117.70, 35.45], [-118.00, 35.40],
          [-118.30, 35.35], [-118.60, 35.30], [-119.00, 35.20],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Elsinore Fault',
        slip_rate: '5 mm/yr',
        slip_rate_mm: 5,
        last_major: '1910 M6.0',
        probability: '11% M6.7+ by 2044',
        length_km: 250,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-116.05, 32.65], [-116.45, 32.95], [-116.85, 33.25], [-117.10, 33.45],
          [-117.30, 33.65], [-117.50, 33.80], [-117.65, 33.90], [-117.80, 34.00],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Green Valley Fault',
        slip_rate: '5 mm/yr',
        slip_rate_mm: 5,
        last_major: '1892 M6.4',
        probability: '3% M6.7+ by 2044',
        length_km: 50,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-122.05, 38.15], [-122.10, 38.25], [-122.13, 38.35], [-122.15, 38.42],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Concord Fault',
        slip_rate: '4 mm/yr',
        slip_rate_mm: 4,
        last_major: '1955 M5.4',
        probability: '16% M6.7+ by 2044',
        length_km: 20,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.95, 37.90], [-121.97, 37.95], [-122.00, 38.00],
          [-122.02, 38.05], [-122.05, 38.10],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Palos Verdes Fault',
        slip_rate: '3 mm/yr',
        slip_rate_mm: 3,
        last_major: 'Prehistoric',
        probability: '12% M6.7+ by 2044',
        length_km: 50,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-118.35, 33.65], [-118.38, 33.72], [-118.42, 33.78],
          [-118.45, 33.82], [-118.48, 33.88],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Sierra Madre Fault',
        slip_rate: '2-3 mm/yr',
        slip_rate_mm: 2.5,
        last_major: '1991 M5.8 Sierra Madre',
        probability: '6% M6.7+ by 2044',
        length_km: 75,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-117.50, 34.15], [-117.70, 34.18], [-117.90, 34.20],
          [-118.05, 34.17], [-118.15, 34.15], [-118.30, 34.18], [-118.45, 34.20],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Whittier Fault',
        slip_rate: '2-3 mm/yr',
        slip_rate_mm: 2.5,
        last_major: '1987 M5.9 Whittier Narrows',
        probability: '11% M6.7+ by 2044',
        length_km: 40,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-117.60, 33.90], [-117.75, 33.95], [-117.85, 33.98], [-117.95, 34.02],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Owens Valley Fault',
        slip_rate: '1.5-3 mm/yr',
        slip_rate_mm: 2,
        last_major: '1872 M7.6',
        probability: 'Lower probability',
        length_km: 120,
        significance: 'moderate',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-118.00, 36.20], [-118.10, 36.50], [-118.20, 36.75],
          [-118.25, 37.00], [-118.35, 37.35],
        ],
      },
    },

    // ==========================================
    // MINOR FAULTS (slip rate < 3mm/yr, shorter)
    // ==========================================
    {
      type: 'Feature',
      properties: {
        name: 'Newport-Inglewood Fault',
        slip_rate: '1-1.5 mm/yr',
        slip_rate_mm: 1.25,
        last_major: '1933 M6.4 Long Beach',
        probability: '15% M6.7+ by 2044',
        length_km: 75,
        significance: 'minor',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-117.88, 33.60], [-117.93, 33.70], [-118.00, 33.78], [-118.08, 33.85],
          [-118.15, 33.90], [-118.22, 33.95], [-118.30, 34.00], [-118.35, 34.05],
          [-118.40, 34.08], [-118.45, 34.12],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Hollywood Fault',
        slip_rate: '1 mm/yr',
        slip_rate_mm: 1,
        last_major: 'Prehistoric',
        probability: '7% M6.7+ by 2044',
        length_km: 15,
        significance: 'minor',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-118.27, 34.10], [-118.32, 34.10], [-118.37, 34.09], [-118.42, 34.08],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Santa Monica Fault',
        slip_rate: '1 mm/yr',
        slip_rate_mm: 1,
        last_major: 'Prehistoric',
        probability: 'Lower probability',
        length_km: 25,
        significance: 'minor',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-118.50, 34.02], [-118.55, 34.04], [-118.60, 34.06], [-118.70, 34.08],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Rose Canyon Fault',
        slip_rate: '1-2 mm/yr',
        slip_rate_mm: 1.5,
        last_major: 'Prehistoric',
        probability: 'Moderate',
        length_km: 35,
        significance: 'minor',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-117.20, 32.70], [-117.22, 32.75], [-117.18, 32.82],
          [-117.15, 32.90], [-117.12, 32.95],
        ],
      },
    },
  ],
};

export function getAllFaultNames(): string[] {
  return CALIFORNIA_FAULTS.features.map(f => f.properties.name);
}

export function getFaultByName(name: string): Feature<LineString, FaultProperties> | undefined {
  return CALIFORNIA_FAULTS.features.find(f => f.properties.name === name);
}
