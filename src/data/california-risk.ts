// California county risk data based on FEMA National Risk Index
// Risk scores: 0-100 (higher = more risk)

export interface CountyRisk {
  name: string;
  wildfire: number;
  flood: number;
  earthquake: number;
  hurricane: number;
}

// Risk scores derived from FEMA NRI and state data
// Hurricane scores based on tropical storm/remnant exposure (California has low direct hurricane risk)
export const COUNTY_RISKS: Record<string, CountyRisk> = {
  'Los Angeles': { name: 'Los Angeles', wildfire: 85, flood: 45, earthquake: 90, hurricane: 35 },
  'San Diego': { name: 'San Diego', wildfire: 75, flood: 35, earthquake: 70, hurricane: 45 },
  'Orange': { name: 'Orange', wildfire: 70, flood: 40, earthquake: 75, hurricane: 40 },
  'Riverside': { name: 'Riverside', wildfire: 80, flood: 35, earthquake: 65, hurricane: 30 },
  'San Bernardino': { name: 'San Bernardino', wildfire: 85, flood: 30, earthquake: 70, hurricane: 25 },
  'Santa Clara': { name: 'Santa Clara', wildfire: 60, flood: 35, earthquake: 85, hurricane: 15 },
  'Alameda': { name: 'Alameda', wildfire: 55, flood: 40, earthquake: 85, hurricane: 15 },
  'Sacramento': { name: 'Sacramento', wildfire: 45, flood: 65, earthquake: 40, hurricane: 10 },
  'Contra Costa': { name: 'Contra Costa', wildfire: 65, flood: 45, earthquake: 80, hurricane: 15 },
  'Fresno': { name: 'Fresno', wildfire: 50, flood: 55, earthquake: 45, hurricane: 10 },
  'Kern': { name: 'Kern', wildfire: 55, flood: 40, earthquake: 60, hurricane: 15 },
  'San Francisco': { name: 'San Francisco', wildfire: 25, flood: 50, earthquake: 95, hurricane: 20 },
  'Ventura': { name: 'Ventura', wildfire: 90, flood: 45, earthquake: 70, hurricane: 35 },
  'San Mateo': { name: 'San Mateo', wildfire: 50, flood: 45, earthquake: 85, hurricane: 20 },
  'San Joaquin': { name: 'San Joaquin', wildfire: 35, flood: 60, earthquake: 45, hurricane: 10 },
  'Stanislaus': { name: 'Stanislaus', wildfire: 40, flood: 55, earthquake: 40, hurricane: 10 },
  'Sonoma': { name: 'Sonoma', wildfire: 85, flood: 50, earthquake: 75, hurricane: 15 },
  'Tulare': { name: 'Tulare', wildfire: 55, flood: 50, earthquake: 40, hurricane: 10 },
  'Santa Barbara': { name: 'Santa Barbara', wildfire: 85, flood: 50, earthquake: 65, hurricane: 35 },
  'Monterey': { name: 'Monterey', wildfire: 60, flood: 45, earthquake: 70, hurricane: 25 },
  'Placer': { name: 'Placer', wildfire: 75, flood: 45, earthquake: 45, hurricane: 10 },
  'San Luis Obispo': { name: 'San Luis Obispo', wildfire: 70, flood: 40, earthquake: 55, hurricane: 30 },
  'Santa Cruz': { name: 'Santa Cruz', wildfire: 70, flood: 50, earthquake: 80, hurricane: 25 },
  'Marin': { name: 'Marin', wildfire: 75, flood: 45, earthquake: 85, hurricane: 20 },
  'Merced': { name: 'Merced', wildfire: 35, flood: 55, earthquake: 40, hurricane: 10 },
  'Butte': { name: 'Butte', wildfire: 90, flood: 55, earthquake: 35, hurricane: 10 },
  'Shasta': { name: 'Shasta', wildfire: 85, flood: 45, earthquake: 40, hurricane: 10 },
  'El Dorado': { name: 'El Dorado', wildfire: 85, flood: 40, earthquake: 45, hurricane: 10 },
  'Imperial': { name: 'Imperial', wildfire: 25, flood: 35, earthquake: 60, hurricane: 40 },
  'Kings': { name: 'Kings', wildfire: 30, flood: 55, earthquake: 40, hurricane: 10 },
  'Madera': { name: 'Madera', wildfire: 60, flood: 50, earthquake: 45, hurricane: 10 },
  'Napa': { name: 'Napa', wildfire: 85, flood: 50, earthquake: 75, hurricane: 15 },
  'Humboldt': { name: 'Humboldt', wildfire: 65, flood: 55, earthquake: 70, hurricane: 20 },
  'Nevada': { name: 'Nevada', wildfire: 85, flood: 40, earthquake: 40, hurricane: 10 },
  'Sutter': { name: 'Sutter', wildfire: 30, flood: 70, earthquake: 35, hurricane: 10 },
  'Mendocino': { name: 'Mendocino', wildfire: 80, flood: 50, earthquake: 65, hurricane: 20 },
  'Yolo': { name: 'Yolo', wildfire: 40, flood: 60, earthquake: 40, hurricane: 10 },
  'Solano': { name: 'Solano', wildfire: 45, flood: 55, earthquake: 65, hurricane: 15 },
  'Lake': { name: 'Lake', wildfire: 90, flood: 45, earthquake: 55, hurricane: 10 },
  'Tuolumne': { name: 'Tuolumne', wildfire: 85, flood: 40, earthquake: 45, hurricane: 10 },
  'Calaveras': { name: 'Calaveras', wildfire: 80, flood: 40, earthquake: 45, hurricane: 10 },
  'Tehama': { name: 'Tehama', wildfire: 80, flood: 50, earthquake: 35, hurricane: 10 },
  'San Benito': { name: 'San Benito', wildfire: 55, flood: 40, earthquake: 75, hurricane: 15 },
  'Amador': { name: 'Amador', wildfire: 80, flood: 35, earthquake: 45, hurricane: 10 },
  'Lassen': { name: 'Lassen', wildfire: 70, flood: 35, earthquake: 40, hurricane: 10 },
  'Glenn': { name: 'Glenn', wildfire: 55, flood: 55, earthquake: 35, hurricane: 10 },
  'Del Norte': { name: 'Del Norte', wildfire: 55, flood: 60, earthquake: 65, hurricane: 20 },
  'Colusa': { name: 'Colusa', wildfire: 45, flood: 60, earthquake: 35, hurricane: 10 },
  'Plumas': { name: 'Plumas', wildfire: 85, flood: 40, earthquake: 40, hurricane: 10 },
  'Siskiyou': { name: 'Siskiyou', wildfire: 75, flood: 45, earthquake: 45, hurricane: 10 },
  'Inyo': { name: 'Inyo', wildfire: 45, flood: 30, earthquake: 65, hurricane: 15 },
  'Mariposa': { name: 'Mariposa', wildfire: 85, flood: 35, earthquake: 45, hurricane: 10 },
  'Mono': { name: 'Mono', wildfire: 55, flood: 30, earthquake: 60, hurricane: 10 },
  'Trinity': { name: 'Trinity', wildfire: 80, flood: 50, earthquake: 50, hurricane: 10 },
  'Modoc': { name: 'Modoc', wildfire: 60, flood: 40, earthquake: 40, hurricane: 10 },
  'Sierra': { name: 'Sierra', wildfire: 80, flood: 35, earthquake: 40, hurricane: 10 },
  'Alpine': { name: 'Alpine', wildfire: 70, flood: 35, earthquake: 50, hurricane: 10 },
  'Yuba': { name: 'Yuba', wildfire: 70, flood: 65, earthquake: 35, hurricane: 10 },
};

// Helper function to get risk level label
export function getRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'very-high' {
  if (score >= 75) return 'very-high';
  if (score >= 50) return 'high';
  if (score >= 25) return 'moderate';
  return 'low';
}

// Helper function to get risk color
export function getRiskColor(score: number, type: 'wildfire' | 'flood' | 'earthquake' | 'hurricane'): string {
  const colors = {
    wildfire: {
      low: '#fef3c7',
      moderate: '#fbbf24',
      high: '#f97316',
      'very-high': '#dc2626',
    },
    flood: {
      low: '#dbeafe',
      moderate: '#60a5fa',
      high: '#3b82f6',
      'very-high': '#1d4ed8',
    },
    earthquake: {
      low: '#f3e8ff',
      moderate: '#c084fc',
      high: '#a855f7',
      'very-high': '#7c3aed',
    },
    hurricane: {
      low: '#d1fae5',
      moderate: '#34d399',
      high: '#059669',
      'very-high': '#047857',
    },
  };

  return colors[type][getRiskLevel(score)];
}
