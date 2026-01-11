// Real data sources for risk overlays

// USGS Quaternary Fault Database - Real fault line data
export const USGS_FAULTS_URL = 'https://earthquake.usgs.gov/static/lfs/nshm/qfaults/Qfaults_GeoJSON.zip';

// FEMA National Flood Hazard Layer REST API
export const FEMA_NFHL_API = 'https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer';

// Cal Fire FHSZ Web Map Service
export const CALFIRE_FHSZ_URL = 'https://egis.fire.ca.gov/arcgis/rest/services';

// For the hackathon demo, we'll use these simplified but real-world accurate datasets:

// Fetch earthquake fault data from USGS
export async function fetchFaultLines(bounds: {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}) {
  // USGS provides fault data via their Earthquake Hazards API
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=${bounds.minLat}&maxlatitude=${bounds.maxLat}&minlongitude=${bounds.minLng}&maxlongitude=${bounds.maxLng}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching fault data:', error);
    return null;
  }
}

// Fetch flood zones from FEMA NFHL
export async function fetchFloodZones(lat: number, lng: number, radius: number = 0.1) {
  // FEMA NFHL ArcGIS REST API
  const geometry = `${lng - radius},${lat - radius},${lng + radius},${lat + radius}`;
  const url = `https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/28/query?geometry=${geometry}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&f=geojson`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching flood data:', error);
    return null;
  }
}

// USGS real-time earthquake data (last 30 days, M2.5+)
export const USGS_EARTHQUAKES_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';

// For wildfire risk, we can use NIFC (National Interagency Fire Center) data
export const NIFC_FIRE_PERIMETERS_URL = 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson';

// Cal Fire FHSZ (Fire Hazard Severity Zones) - for California
export async function fetchCalFireZones(bounds: {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}) {
  const geometry = JSON.stringify({
    xmin: bounds.minLng,
    ymin: bounds.minLat,
    xmax: bounds.maxLng,
    ymax: bounds.maxLat,
    spatialReference: { wkid: 4326 }
  });

  const url = `https://egis.fire.ca.gov/arcgis/rest/services/FHSZ/FHSZ_SRA_LRA_Combined/MapServer/0/query?geometry=${encodeURIComponent(geometry)}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=HAZ_CLASS,HAZ_CODE&returnGeometry=true&f=geojson`;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching Cal Fire data:', error);
    return null;
  }
}
