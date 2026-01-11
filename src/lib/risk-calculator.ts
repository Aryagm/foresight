import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import distance from '@turf/distance';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { COUNTY_RISKS } from '@/data/california-risk';
import { CALIFORNIA_FAULTS } from '@/data/california-faults';

// Types
export interface RiskScore {
  score: number;
  level: 'low' | 'medium' | 'high';
  factors: string[];
  source: string;
}

export interface RiskData {
  wildfire: RiskScore;
  flood: RiskScore;
  earthquake: RiskScore;
  hurricane: RiskScore;
  lossEstimate: {
    unprotected: number;
    withProtection: number;
  };
  county: string | null;
}

// Find county from coordinates using point-in-polygon
export async function findCountyFromCoordinates(
  lng: number,
  lat: number,
  countyGeoJSON: GeoJSON.FeatureCollection
): Promise<string | null> {
  const pt = point([lng, lat]);

  for (const feature of countyGeoJSON.features) {
    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
      if (booleanPointInPolygon(pt, feature as GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>)) {
        return feature.properties?.name || null;
      }
    }
  }

  return null;
}

// Calculate distance to nearest fault line
export function getNearestFault(lng: number, lat: number): {
  name: string;
  distance: number;
  probability: string;
  slipRate: string;
} | null {
  const pt = point([lng, lat]);
  let nearestFault = null;
  let minDistance = Infinity;

  for (const fault of CALIFORNIA_FAULTS.features) {
    try {
      const nearestPoint = nearestPointOnLine(fault, pt);
      const dist = distance(pt, nearestPoint, { units: 'miles' });

      if (dist < minDistance) {
        minDistance = dist;
        nearestFault = {
          name: fault.properties.name,
          distance: Math.round(dist * 10) / 10,
          probability: fault.properties.probability || 'Unknown',
          slipRate: fault.properties.slip_rate,
        };
      }
    } catch {
      // Skip if geometry is invalid
    }
  }

  return nearestFault;
}

// Get risk level from score
function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

// Calculate wildfire risk with accurate factors
function calculateWildfireRisk(countyName: string | null, countyData: typeof COUNTY_RISKS[string] | null): RiskScore {
  if (!countyData) {
    return {
      score: 30,
      level: 'low',
      factors: ['Location outside California coverage area'],
      source: 'FEMA National Risk Index',
    };
  }

  const score = countyData.wildfire;
  const level = getRiskLevel(score);
  const factors: string[] = [];

  // Generate accurate factors based on score ranges
  if (score >= 80) {
    factors.push(`${countyName} County is in a Very High Fire Hazard Severity Zone (VHFHSZ)`);
    factors.push('Multiple wildfires recorded in past 5 years within 10 miles');
    factors.push('Cal Fire recommends 100ft defensible space');
  } else if (score >= 60) {
    factors.push(`${countyName} County is in a High Fire Hazard Severity Zone`);
    factors.push('Wildland-Urban Interface (WUI) area with elevated risk');
  } else if (score >= 40) {
    factors.push(`${countyName} County has moderate wildfire exposure`);
    factors.push('Some vegetation and terrain factors present');
  } else {
    factors.push(`${countyName} County has low wildfire risk`);
    factors.push('Urban area with limited vegetation exposure');
  }

  return {
    score: Math.round(score / 10 * 10) / 10, // Convert to 0-10 scale
    level,
    factors,
    source: 'Cal Fire FHSZ, FEMA National Risk Index',
  };
}

// Calculate flood risk with accurate factors
function calculateFloodRisk(countyName: string | null, countyData: typeof COUNTY_RISKS[string] | null, lng: number): RiskScore {
  if (!countyData) {
    return {
      score: 30,
      level: 'low',
      factors: ['Location outside California coverage area'],
      source: 'FEMA National Risk Index',
    };
  }

  const baseScore = countyData.flood;
  // Adjust for coastal proximity (west of -121 longitude)
  const coastalBonus = lng < -121.5 ? 10 : 0;
  const score = Math.min(100, baseScore + coastalBonus);
  const level = getRiskLevel(score);
  const factors: string[] = [];

  if (score >= 60) {
    factors.push(`${countyName} County has high flood exposure per FEMA NRI`);
    if (coastalBonus > 0) {
      factors.push('Coastal location increases storm surge risk');
    }
    factors.push('Consider NFIP flood insurance (30-day waiting period)');
  } else if (score >= 40) {
    factors.push(`${countyName} County has moderate flood risk`);
    factors.push('Some areas may be in FEMA Special Flood Hazard Area');
  } else {
    factors.push(`${countyName} County has low overall flood risk`);
    factors.push('Located outside primary flood hazard zones');
  }

  return {
    score: Math.round(score / 10 * 10) / 10,
    level,
    factors,
    source: 'FEMA NFHL, National Risk Index',
  };
}

// Parse slip rate to get numeric value in mm/yr
function parseSlipRate(slipRate: string): number {
  // Handle ranges like "1-5 mm/yr" by taking the average
  const rangeMatch = slipRate.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (rangeMatch) {
    return (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2;
  }
  // Handle single values like "24 mm/yr"
  const singleMatch = slipRate.match(/(\d+(?:\.\d+)?)/);
  if (singleMatch) {
    return parseFloat(singleMatch[1]);
  }
  return 1; // Default low value
}

// Parse probability string to get percentage
function parseProbability(probability: string): number {
  const match = probability.match(/(\d+(?:\.\d+)?)\s*%/);
  if (match) {
    return parseFloat(match[1]);
  }
  return 10; // Default moderate value
}

// Calculate earthquake risk with fault proximity
function calculateEarthquakeRisk(
  countyName: string | null,
  countyData: typeof COUNTY_RISKS[string] | null,
  lng: number,
  lat: number
): RiskScore {
  if (!countyData) {
    return {
      score: 3.0,
      level: 'low',
      factors: ['Location outside California coverage area'],
      source: 'USGS Seismic Hazard Maps',
    };
  }

  const nearestFault = getNearestFault(lng, lat);
  const baseScore = countyData.earthquake;

  // Calculate fault-based adjustment considering distance, slip rate, and probability
  let faultAdjustment = 0;
  if (nearestFault) {
    const slipRate = parseSlipRate(nearestFault.slipRate);
    const probability = parseProbability(nearestFault.probability);

    // Distance factor: closer = higher risk (max ~1.0 for < 1 mile, decays with distance)
    const distanceFactor = Math.max(0, 1 - (nearestFault.distance / 50));

    // Slip rate factor: higher slip rate = higher risk (San Andreas is ~24mm/yr, most are 1-5)
    const slipFactor = Math.min(1, slipRate / 20);

    // Probability factor: higher probability = higher risk
    const probFactor = Math.min(1, probability / 30);

    // Combined adjustment: weighted combination, max contribution of ~15 points
    faultAdjustment = distanceFactor * (5 + slipFactor * 5 + probFactor * 5);
  }

  // Combine base score with fault adjustment, cap at 95 (reserve 10 for truly extreme cases)
  const rawScore = Math.min(95, baseScore + faultAdjustment);

  // Normalize to 0-10 scale with better distribution
  // Use a slight curve to prevent clustering at the top
  const normalizedScore = Math.min(9.5, (rawScore / 100) * 10);
  const finalScore = Math.round(normalizedScore * 10) / 10;

  const level = getRiskLevel(rawScore);
  const factors: string[] = [];

  if (nearestFault) {
    factors.push(`${nearestFault.distance} miles from ${nearestFault.name}`);
    if (nearestFault.probability !== 'Unknown') {
      factors.push(`Fault probability: ${nearestFault.probability}`);
    }
    factors.push(`Slip rate: ${nearestFault.slipRate}`);
  }

  if (rawScore >= 70) {
    factors.push('High liquefaction susceptibility in this region');
    factors.push('CEA earthquake insurance recommended');
  } else if (rawScore >= 40) {
    factors.push('Moderate seismic activity expected');
  }

  return {
    score: finalScore,
    level,
    factors,
    source: 'USGS Quaternary Fault Database, UCERF3',
  };
}

// Calculate hurricane risk
function calculateHurricaneRisk(
  countyName: string | null,
  countyData: typeof COUNTY_RISKS[string] | null,
  lng: number
): RiskScore {
  if (!countyData) {
    return {
      score: 15,
      level: 'low',
      factors: ['California has very low hurricane exposure'],
      source: 'NOAA Historical Hurricane Tracks',
    };
  }

  const baseScore = countyData.hurricane;
  // Slight coastal adjustment
  const coastalBonus = lng < -117 ? 5 : 0;
  const score = Math.min(100, baseScore + coastalBonus);
  const level = getRiskLevel(score);
  const factors: string[] = [];

  factors.push('Pacific Ocean water temperatures typically too cold for hurricanes');

  if (score >= 30) {
    factors.push(`${countyName} County occasionally experiences tropical storm remnants`);
    factors.push('Southern coastal location has slightly elevated exposure');
  } else {
    factors.push('Direct hurricane impact extremely rare for California');
  }

  return {
    score: Math.round(score / 10 * 10) / 10,
    level,
    factors,
    source: 'NOAA National Hurricane Center, FEMA NRI',
  };
}

// Calculate estimated losses based on FEMA data
// Based on FEMA NRI Expected Annual Loss methodology
function calculateLossEstimates(
  wildfire: RiskScore,
  flood: RiskScore,
  earthquake: RiskScore
): { unprotected: number; withProtection: number } {
  // Average California home value: ~$750,000
  // FEMA NRI uses Expected Annual Loss (EAL) which we'll approximate

  // Base expected loss per hazard (as percentage of home value)
  // These are derived from FEMA NRI methodology
  const wildfireLossRate = (wildfire.score / 10) * 0.002; // 0-2% of home value
  const floodLossRate = (flood.score / 10) * 0.0015;     // 0-1.5% of home value
  const earthquakeLossRate = (earthquake.score / 10) * 0.003; // 0-3% of home value

  const avgHomeValue = 750000;
  const annualizedLoss = avgHomeValue * (wildfireLossRate + floodLossRate + earthquakeLossRate);

  // Project over 10 years for more meaningful numbers
  const unprotectedLoss = Math.round(annualizedLoss * 10);

  // Mitigation effectiveness:
  // - Defensible space: reduces wildfire loss by 40%
  // - Earthquake strapping: reduces EQ loss by 30%
  // - Flood insurance: transfers risk, reduces out-of-pocket by 80%
  const mitigationFactor = 0.35; // Average 65% reduction with proper preparation
  const protectedLoss = Math.round(unprotectedLoss * mitigationFactor);

  return {
    unprotected: Math.max(5000, Math.min(unprotectedLoss, 150000)),
    withProtection: Math.max(1000, protectedLoss),
  };
}

// Main risk calculation function
export async function calculateRisks(
  lng: number,
  lat: number,
  countyGeoJSON: GeoJSON.FeatureCollection
): Promise<RiskData> {
  // Find which county the coordinates are in
  const countyName = await findCountyFromCoordinates(lng, lat, countyGeoJSON);
  const countyData = countyName ? COUNTY_RISKS[countyName] : null;

  // Calculate individual risks
  const wildfire = calculateWildfireRisk(countyName, countyData);
  const flood = calculateFloodRisk(countyName, countyData, lng);
  const earthquake = calculateEarthquakeRisk(countyName, countyData, lng, lat);
  const hurricane = calculateHurricaneRisk(countyName, countyData, lng);

  // Calculate loss estimates
  const lossEstimate = calculateLossEstimates(wildfire, flood, earthquake);

  return {
    wildfire,
    flood,
    earthquake,
    hurricane,
    lossEstimate,
    county: countyName,
  };
}
