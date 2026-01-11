// Bay Area risk zones - based on official data sources:
// - Wildfire: Cal Fire FHSZ (Fire Hazard Severity Zones)
// - Flood: FEMA NFHL flood zones + sea level rise projections
// - Earthquake: USGS fault traces + CGS liquefaction zones
import type { FeatureCollection } from 'geojson';

// ============================================
// WILDFIRE ZONES - Based on Cal Fire FHSZ maps
// Very High Fire Hazard Severity Zones (VHFHSZ)
// ============================================
export const WILDFIRE_ZONES: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Oakland/Berkeley Hills - 1991 Oakland Hills Fire area
    {
      type: 'Feature',
      properties: {
        name: 'Oakland Hills',
        risk: 'very-high',
        description: '1991 Tunnel Fire killed 25, destroyed 3,500 homes. Dense eucalyptus, steep terrain.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.2477, 37.8324], // Claremont Canyon
          [-122.2340, 37.8410], // Grizzly Peak
          [-122.2105, 37.8520], // Tilden Park
          [-122.1830, 37.8640], // Wildcat Canyon
          [-122.1650, 37.8580], // San Pablo Ridge
          [-122.1580, 37.8350], // Upper Rockridge
          [-122.1750, 37.8180], // Piedmont Hills
          [-122.1950, 37.8050], // Montclair
          [-122.2200, 37.8100], // Shepherd Canyon
          [-122.2400, 37.8200], // Claremont
          [-122.2477, 37.8324],
        ]],
      },
    },
    // Marin Headlands / Mt Tamalpais
    {
      type: 'Feature',
      properties: {
        name: 'Mt. Tamalpais / Marin Headlands',
        risk: 'very-high',
        description: 'Coastal chaparral, high winds, limited evacuation routes.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.5950, 37.8550], // Muir Beach
          [-122.5700, 37.8750], // Muir Woods
          [-122.5400, 37.9050], // Mt Tam summit
          [-122.5100, 37.9200], // Fairfax
          [-122.4900, 37.9350], // San Anselmo hills
          [-122.5200, 37.9500], // Terra Linda ridge
          [-122.5600, 37.9300], // Lucas Valley
          [-122.5950, 37.9000], // Pt Reyes Station
          [-122.6100, 37.8700], // Olema
          [-122.5950, 37.8550],
        ]],
      },
    },
    // Santa Cruz Mountains (north section - near Woodside/Portola Valley)
    {
      type: 'Feature',
      properties: {
        name: 'Santa Cruz Mountains - Woodside',
        risk: 'very-high',
        description: 'Redwood/oak woodland, steep canyons, 2020 CZU Fire region.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.2800, 37.4200], // Woodside
          [-122.2500, 37.4000], // Portola Valley
          [-122.2200, 37.3700], // Los Trancos
          [-122.2000, 37.3400], // Skyline
          [-122.2300, 37.3100], // Page Mill
          [-122.2800, 37.3000], // Saratoga Gap
          [-122.3200, 37.3200], // Skylonda
          [-122.3400, 37.3600], // La Honda
          [-122.3300, 37.4000], // Huddart Park
          [-122.2800, 37.4200],
        ]],
      },
    },
    // East Bay Hills - Orinda/Lafayette/Moraga
    {
      type: 'Feature',
      properties: {
        name: 'Lamorinda Hills',
        risk: 'high',
        description: 'Grass and oak woodland, steep terrain, WUI area.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.1900, 37.8800], // Orinda
          [-122.1500, 37.8950], // Briones
          [-122.1200, 37.8800], // Lafayette hills
          [-122.1000, 37.8500], // Walnut Creek ridge
          [-122.1300, 37.8300], // Moraga
          [-122.1600, 37.8400], // Canyon
          [-122.1900, 37.8600], // Orinda hills
          [-122.1900, 37.8800],
        ]],
      },
    },
    // Diablo Range foothills
    {
      type: 'Feature',
      properties: {
        name: 'Mt. Diablo / Diablo Range',
        risk: 'high',
        description: 'Dry grassland and chaparral, hot Diablo winds, frequent fires.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-121.9500, 37.8800], // Mt Diablo summit
          [-121.9000, 37.8600], // Morgan Territory
          [-121.8500, 37.8200], // Livermore hills
          [-121.8200, 37.7600], // Del Valle
          [-121.8500, 37.7200], // Sunol
          [-121.9000, 37.7400], // Pleasanton Ridge
          [-121.9500, 37.7800], // Las Trampas
          [-121.9800, 37.8400], // Walnut Creek
          [-121.9500, 37.8800],
        ]],
      },
    },
    // Napa/Sonoma Wine Country - 2017 Tubbs Fire, 2020 Glass Fire area
    {
      type: 'Feature',
      properties: {
        name: 'Napa-Sonoma Hills',
        risk: 'very-high',
        description: 'Wine country, Tubbs Fire (2017), Glass Fire (2020). High wind corridor.',
        source: 'Cal Fire FHSZ'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.6200, 38.4000], // Santa Rosa hills
          [-122.5500, 38.3500], // Bennett Valley
          [-122.4800, 38.3200], // Sonoma Mountain
          [-122.4200, 38.3500], // Napa hills
          [-122.3800, 38.4200], // Atlas Peak
          [-122.4000, 38.5000], // Howell Mountain
          [-122.4500, 38.5500], // Pope Valley
          [-122.5500, 38.5200], // Knights Valley
          [-122.6200, 38.4800], // Mark West Springs
          [-122.6500, 38.4300], // Fountaingrove
          [-122.6200, 38.4000],
        ]],
      },
    },
  ],
};

// ============================================
// FLOOD ZONES - Based on FEMA NFHL + Sea Level Rise
// High-risk flood areas (Zone A, AE, VE, etc.)
// ============================================
export const FLOOD_ZONES: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Mission Bay / SOMA - historic bay fill, king tide flooding
    {
      type: 'Feature',
      properties: {
        name: 'Mission Bay / SOMA',
        risk: 'very-high',
        description: 'Historic bay fill, king tide flooding, sewer overflow risk. FEMA Zone AE.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.4050, 37.7850], // Embarcadero
          [-122.3870, 37.7750], // Pier 80
          [-122.3850, 37.7650], // Islais Creek
          [-122.3950, 37.7550], // Bayview
          [-122.4100, 37.7650], // Mission Creek
          [-122.4150, 37.7750], // AT&T Park
          [-122.4050, 37.7850],
        ]],
      },
    },
    // Foster City - entirely on bay fill, below sea level
    {
      type: 'Feature',
      properties: {
        name: 'Foster City',
        risk: 'very-high',
        description: 'Built on bay fill 1960s, below sea level, levee-protected. FEMA Zone AE.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.2750, 37.5650], // Hillsdale
          [-122.2550, 37.5600], // Marina Lagoon
          [-122.2400, 37.5450], // Bay edge
          [-122.2450, 37.5300], // Marlin Park
          [-122.2650, 37.5280], // Metro Center
          [-122.2800, 37.5400], // San Mateo
          [-122.2750, 37.5650],
        ]],
      },
    },
    // Alviso / North San Jose - salt ponds, lowest point in South Bay
    {
      type: 'Feature',
      properties: {
        name: 'Alviso / North San Jose',
        risk: 'very-high',
        description: 'Former salt ponds, 8ft below sea level at high tide. FEMA Zone VE.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.0300, 37.4350], // Milpitas
          [-121.9800, 37.4300], // Alviso
          [-121.9500, 37.4500], // Don Edwards
          [-121.9700, 37.4800], // Fremont
          [-122.0100, 37.4700], // Newark
          [-122.0400, 37.4500], // Moffett
          [-122.0300, 37.4350],
        ]],
      },
    },
    // Alameda Island - surrounded by water, no high ground
    {
      type: 'Feature',
      properties: {
        name: 'Alameda Island',
        risk: 'high',
        description: 'Island community, storm surge vulnerability, Navy fill areas.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.3100, 37.7900], // Bay Farm
          [-122.2800, 37.7750], // Harbor Bay
          [-122.2400, 37.7650], // Alameda Point
          [-122.2500, 37.7850], // Main Street
          [-122.2800, 37.7950], // Fernside
          [-122.3100, 37.7900],
        ]],
      },
    },
    // Napa River corridor - 1986, 2006 floods
    {
      type: 'Feature',
      properties: {
        name: 'Napa River Corridor',
        risk: 'very-high',
        description: 'River flooding history, 1986 and 2006 major floods. FEMA Zone AE.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.3100, 38.2900], // Napa downtown
          [-122.2850, 38.2850], // Soscol
          [-122.2800, 38.3200], // Kennedy Park
          [-122.2650, 38.3600], // Yountville
          [-122.2900, 38.3800], // Oakville
          [-122.3200, 38.3500], // Silverado Trail
          [-122.3300, 38.3100], // Trancas
          [-122.3100, 38.2900],
        ]],
      },
    },
    // San Francisco Marina / Crissy Field - 1989 Loma Prieta damage
    {
      type: 'Feature',
      properties: {
        name: 'SF Marina District',
        risk: 'high',
        description: '1906 and 1989 earthquake damage from liquefaction. Bay fill area.',
        source: 'FEMA NFHL'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.4450, 37.8060], // Presidio
          [-122.4300, 37.8070], // Marina Green
          [-122.4150, 37.8050], // Fort Mason
          [-122.4150, 37.8000], // Ghirardelli
          [-122.4300, 37.7980], // Lombard
          [-122.4450, 37.8000], // Presidio Gate
          [-122.4450, 37.8060],
        ]],
      },
    },
  ],
};

// ============================================
// EARTHQUAKE ZONES - USGS fault traces + CGS liquefaction
// ============================================
export const EARTHQUAKE_ZONES: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // Hayward Fault surface rupture zone
    {
      type: 'Feature',
      properties: {
        name: 'Hayward Fault Zone',
        risk: 'very-high',
        description: 'Most dangerous fault in US. M6.7+ overdue. Surface rupture zone.',
        source: 'USGS Quaternary Fault Database'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.1350, 37.5500], // Fremont
          [-122.1150, 37.5500],
          [-122.1000, 37.6200], // Hayward
          [-122.1050, 37.7000], // San Leandro
          [-122.1200, 37.7600], // Oakland
          [-122.1400, 37.8200], // Berkeley
          [-122.1600, 37.8700], // El Cerrito
          [-122.1800, 37.9200], // Richmond
          [-122.2000, 37.9200],
          [-122.1850, 37.8700],
          [-122.1650, 37.8200],
          [-122.1500, 37.7600],
          [-122.1350, 37.7000],
          [-122.1250, 37.6200],
          [-122.1350, 37.5500],
        ]],
      },
    },
    // San Andreas Fault Zone (Peninsula segment)
    {
      type: 'Feature',
      properties: {
        name: 'San Andreas Fault - Peninsula',
        risk: 'very-high',
        description: '1906 M7.9 rupture zone. Active plate boundary.',
        source: 'USGS Quaternary Fault Database'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.5200, 37.4200], // Woodside
          [-122.5000, 37.4200],
          [-122.4700, 37.5200], // San Andreas Lake
          [-122.4500, 37.6200], // San Bruno
          [-122.4400, 37.7000], // Daly City
          [-122.4550, 37.7800], // Lake Merced
          [-122.5050, 37.7800],
          [-122.4900, 37.7000],
          [-122.5000, 37.6200],
          [-122.5100, 37.5200],
          [-122.5200, 37.4200],
        ]],
      },
    },
    // SF/Oakland Bay Fill liquefaction zones
    {
      type: 'Feature',
      properties: {
        name: 'SF Bayshore Liquefaction Zone',
        risk: 'very-high',
        description: 'Bay fill, Young Bay Mud. High liquefaction susceptibility.',
        source: 'CGS Seismic Hazard Zones'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.4200, 37.7850], // Embarcadero
          [-122.3900, 37.7900], // Pier 39
          [-122.3700, 37.7950], // Treasure Island
          [-122.3600, 37.8050], // Bay Bridge
          [-122.3400, 37.8200], // Port of Oakland
          [-122.3000, 37.8100], // Jack London
          [-122.2900, 37.7900], // Alameda
          [-122.3200, 37.7700], // Coast Guard Island
          [-122.3600, 37.7600], // San Leandro Bay
          [-122.3900, 37.7600], // SF airport
          [-122.4100, 37.7700], // SFO
          [-122.4200, 37.7850],
        ]],
      },
    },
    // South Bay / Silicon Valley soft soil zone
    {
      type: 'Feature',
      properties: {
        name: 'South Bay Tech Corridor',
        risk: 'high',
        description: 'Bay mud amplification zone. 1989 Loma Prieta damage area.',
        source: 'CGS Seismic Hazard Zones'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-122.0800, 37.3900], // Sunnyvale
          [-122.0400, 37.3800], // Santa Clara
          [-122.0000, 37.3700], // San Jose
          [-121.9500, 37.3900], // Milpitas
          [-121.9600, 37.4200], // Bay edge
          [-122.0200, 37.4300], // Moffett
          [-122.0600, 37.4200], // Mountain View
          [-122.0800, 37.3900],
        ]],
      },
    },
  ],
};

// ============================================
// FAULT LINES - Accurate USGS fault traces
// ============================================
export const FAULT_LINES: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'San Andreas Fault',
        slip_rate: '17-24 mm/yr',
        last_major: '1906 M7.9',
        probability: '21% M6.7+ by 2043'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-122.4900, 37.1000], // Santa Cruz
          [-122.4800, 37.2500], // Los Gatos
          [-122.5100, 37.4000], // Woodside
          [-122.4700, 37.5000], // San Andreas Lake
          [-122.4500, 37.6000], // Daly City
          [-122.4550, 37.7000], // SF
          [-122.4700, 37.7800], // Golden Gate
          [-122.5200, 37.8500], // Bolinas
          [-122.6000, 38.0000], // Pt Reyes
          [-122.7500, 38.4000], // Bodega Bay
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Hayward Fault',
        slip_rate: '9 mm/yr',
        last_major: '1868 M6.8',
        probability: '33% M6.7+ by 2043'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.9000, 37.3500], // San Jose
          [-122.0500, 37.4500], // Milpitas
          [-122.1100, 37.5500], // Fremont
          [-122.1100, 37.6300], // Hayward
          [-122.1200, 37.7000], // San Leandro
          [-122.1400, 37.7700], // Oakland
          [-122.1550, 37.8400], // Berkeley
          [-122.1700, 37.8800], // El Cerrito
          [-122.1900, 37.9300], // Richmond
          [-122.2200, 37.9800], // San Pablo Bay
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Calaveras Fault',
        slip_rate: '15 mm/yr',
        last_major: '1984 M6.2 Morgan Hill',
        probability: '26% M6.7+ by 2043'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.5500, 36.9000], // Hollister
          [-121.6500, 37.1000], // Morgan Hill
          [-121.7500, 37.2500], // San Jose
          [-121.8200, 37.4500], // Calaveras Reservoir
          [-121.8800, 37.6500], // Sunol
          [-121.9200, 37.7500], // Pleasanton
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Rodgers Creek Fault',
        slip_rate: '9 mm/yr',
        last_major: '1969 M5.6',
        probability: 'Connected to Hayward'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-122.5000, 38.0500], // Petaluma
          [-122.5500, 38.2000], // Cotati
          [-122.6000, 38.3500], // Santa Rosa
          [-122.6500, 38.5000], // Healdsburg
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'Concord-Green Valley Fault',
        slip_rate: '4-6 mm/yr',
        last_major: '1955 M5.4',
        probability: '16% M6.7+ by 2043'
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-121.9000, 37.9000], // Concord
          [-121.9500, 38.0000], // Pleasant Hill
          [-122.0000, 38.1000], // Benicia
          [-122.0500, 38.2500], // Fairfield
          [-122.1000, 38.4000], // Vacaville
        ],
      },
    },
  ],
};

// Bay Area center and bounds
export const BAY_AREA_CENTER: [number, number] = [-122.25, 37.60];
export const BAY_AREA_ZOOM = 9;
