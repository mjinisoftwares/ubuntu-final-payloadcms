const fs = require('fs');
const path = require('path');

const { countWords } = require('./lexical-helpers.cjs');
const { getAirportTransfersContent, getHotelTransfersContent, getCarHireContent, getVanHireContent } = require('./services-content/service-1-4.cjs');
const { getSafariVehicleHireContent, getChauffeurDrivenContent, getCorporateStaffTransportContent, getExecutiveVipTransportContent } = require('./services-content/service-5-8.cjs');
const { getToursSafariContent, getWeddingEventsContent, getHandicapAccessibleContent } = require('./services-content/service-9-11.cjs');

// Load current datasets
const servicesPath = path.resolve(__dirname, '../payload-services.json');
const fleetPath = path.resolve(__dirname, '../payload-fleet.json');
const destinationsPath = path.resolve(__dirname, '../payload-destinations.json');
const seedAllPath = path.resolve(__dirname, '../payload-seed-all-collections.json');

const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
const fleet = JSON.parse(fs.readFileSync(fleetPath, 'utf8'));
const destinations = JSON.parse(fs.readFileSync(destinationsPath, 'utf8'));
const seedAll = JSON.parse(fs.readFileSync(seedAllPath, 'utf8'));

// Content mapping for services
const serviceContentMap = {
  'airport-transfers-nairobi': {
    getContent: getAirportTransfersContent,
    recommendedFleetSlugs: [
      'saloon-car-hire-nairobi',
      'suv-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'mercedes-benz-hire-nairobi',
      '7-seater-van-hire-nairobi',
      '14-seater-minibus-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-nairobi-national-park',
      'transport-to-lake-naivasha',
      'transport-to-maasai-mara',
      'transport-to-amboseli-national-park',
      'transport-to-mount-kenya',
      'transport-to-diani-beach-mombasa'
    ]
  },
  'hotel-transfers-nairobi': {
    getContent: getHotelTransfersContent,
    recommendedFleetSlugs: [
      'saloon-car-hire-nairobi',
      'suv-hire-nairobi',
      'mercedes-benz-hire-nairobi',
      '7-seater-van-hire-nairobi',
      '14-seater-minibus-hire-nairobi',
      '22-seater-bus-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-nairobi-national-park',
      'transport-to-lake-naivasha',
      'transport-to-hells-gate-national-park',
      'transport-to-lake-nakuru-national-park',
      'transport-to-mount-kenya',
      'transport-to-ol-pejeta-conservancy'
    ]
  },
  'car-hire-nairobi': {
    getContent: getCarHireContent,
    recommendedFleetSlugs: [
      'saloon-car-hire-nairobi',
      'suv-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'mercedes-benz-hire-nairobi',
      '7-seater-van-hire-nairobi',
      'land-cruiser-hire-kenya'
    ],
    popularDestinationSlugs: [
      'transport-to-nairobi-national-park',
      'transport-to-lake-naivasha',
      'transport-to-lake-nakuru-national-park',
      'transport-to-mount-kenya',
      'transport-to-ol-pejeta-conservancy',
      'transport-to-diani-beach-mombasa'
    ]
  },
  'van-hire-nairobi': {
    getContent: getVanHireContent,
    recommendedFleetSlugs: [
      '7-seater-van-hire-nairobi',
      '10-seater-van-matatu-hire-nairobi',
      '14-seater-minibus-hire-nairobi',
      '22-seater-bus-hire-nairobi',
      'tour-bus-coaster-hire-nairobi',
      'wheelchair-accessible-van-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-lake-naivasha',
      'transport-to-hells-gate-national-park',
      'transport-to-lake-nakuru-national-park',
      'transport-to-maasai-mara',
      'transport-to-amboseli-national-park',
      'transport-to-mount-kenya',
      'transport-to-diani-beach-mombasa'
    ]
  },
  '4x4-safari-vehicle-hire-kenya': {
    getContent: getSafariVehicleHireContent,
    recommendedFleetSlugs: [
      'land-cruiser-hire-kenya',
      '10-seater-van-matatu-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'overland-safari-truck-hire-kenya',
      'suv-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-maasai-mara',
      'transport-to-amboseli-national-park',
      'transport-to-samburu-national-reserve',
      'transport-to-ol-pejeta-conservancy',
      'transport-to-lake-nakuru-national-park',
      'transport-to-tsavo-east-national-park',
      'transport-to-tsavo-west-national-park',
      'transport-to-meru-national-park'
    ]
  },
  'chauffeur-driven-car-hire-nairobi': {
    getContent: getChauffeurDrivenContent,
    recommendedFleetSlugs: [
      'saloon-car-hire-nairobi',
      'suv-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'mercedes-benz-hire-nairobi',
      '7-seater-van-hire-nairobi',
      '14-seater-minibus-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-nairobi-national-park',
      'transport-to-lake-naivasha',
      'transport-to-mount-kenya',
      'transport-to-ol-pejeta-conservancy',
      'transport-to-lake-nakuru-national-park',
      'transport-to-diani-beach-mombasa'
    ]
  },
  'corporate-staff-transport-kenya': {
    getContent: getCorporateStaffTransportContent,
    recommendedFleetSlugs: [
      '14-seater-minibus-hire-nairobi',
      '22-seater-bus-hire-nairobi',
      'tour-bus-coaster-hire-nairobi',
      '50-seater-luxury-coach-hire-kenya',
      'suv-hire-nairobi',
      'toyota-prado-tx-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-lake-naivasha',
      'transport-to-nairobi-national-park',
      'transport-to-mount-kenya',
      'transport-to-lake-nakuru-national-park',
      'transport-to-ol-pejeta-conservancy'
    ]
  },
  'executive-vip-transport-nairobi': {
    getContent: getExecutiveVipTransportContent,
    recommendedFleetSlugs: [
      'mercedes-benz-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'land-cruiser-hire-kenya',
      'suv-hire-nairobi',
      'tour-bus-coaster-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-mount-kenya',
      'transport-to-maasai-mara',
      'transport-to-ol-pejeta-conservancy',
      'transport-to-nairobi-national-park',
      'transport-to-diani-beach-mombasa'
    ]
  },
  'tours-safari-transport-kenya': {
    getContent: getToursSafariContent,
    recommendedFleetSlugs: [
      'land-cruiser-hire-kenya',
      '10-seater-van-matatu-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'overland-safari-truck-hire-kenya',
      'suv-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-maasai-mara',
      'transport-to-amboseli-national-park',
      'transport-to-lake-nakuru-national-park',
      'transport-to-samburu-national-reserve',
      'transport-to-ol-pejeta-conservancy',
      'transport-to-tsavo-east-national-park',
      'transport-to-tsavo-west-national-park',
      'transport-to-meru-national-park',
      'transport-to-lake-bogoria-and-baringo',
      'transport-to-chyulu-hills-national-park'
    ]
  },
  'wedding-cultural-events-transport': {
    getContent: getWeddingEventsContent,
    recommendedFleetSlugs: [
      'mercedes-benz-hire-nairobi',
      'toyota-prado-tx-hire-nairobi',
      'land-cruiser-hire-kenya',
      '7-seater-van-hire-nairobi',
      '14-seater-minibus-hire-nairobi',
      '22-seater-bus-hire-nairobi',
      'tour-bus-coaster-hire-nairobi',
      'wheelchair-accessible-van-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-lake-naivasha',
      'transport-to-mount-kenya',
      'transport-to-nairobi-national-park',
      'transport-to-diani-beach-mombasa',
      'transport-to-watamu-marine-park'
    ]
  },
  'handicap-accessible-transport-nairobi': {
    getContent: getHandicapAccessibleContent,
    recommendedFleetSlugs: [
      'wheelchair-accessible-van-hire-nairobi',
      '7-seater-van-hire-nairobi',
      '14-seater-minibus-hire-nairobi',
      'toyota-prado-tx-hire-nairobi'
    ],
    popularDestinationSlugs: [
      'transport-to-nairobi-national-park',
      'transport-to-lake-naivasha',
      'transport-to-mount-kenya',
      'transport-to-lake-nakuru-national-park',
      'transport-to-diani-beach-mombasa'
    ]
  }
};

// -------------------------------------------------------------
// IMPORT NEW FLEET & DESTINATIONS
// -------------------------------------------------------------
const { newFleet, newDestinations } = require('./generate-all-content.cjs');

// Process services
console.log('\n======================================================');
console.log('UPDATING SERVICES COLLECTION (1000+ WORDS EACH)');
console.log('======================================================\n');

for (const service of services) {
  const mapItem = serviceContentMap[service.slug];
  if (mapItem) {
    service.content = mapItem.getContent();
    service.recommendedFleetSlugs = mapItem.recommendedFleetSlugs;
    service.popularDestinationSlugs = mapItem.popularDestinationSlugs;
    
    const wordCount = countWords(service.content.root);
    console.log(`✅ [${service.slug}]: ${wordCount} words (Target: 1000+ words)`);
    if (wordCount < 1000) {
      console.warn(`⚠️ Warning: ${service.slug} has ${wordCount} words, which is under 1000!`);
    }
  } else {
    console.warn(`⚠️ No content mapping found for service ${service.slug}`);
  }
}

// Merge new fleet
const existingFleetSlugs = new Set(fleet.map(f => f.slug));
for (const f of newFleet) {
  if (!existingFleetSlugs.has(f.slug)) {
    fleet.push(f);
    existingFleetSlugs.add(f.slug);
    console.log(`➕ Added new fleet item: ${f.title} (${f.slug})`);
  }
}

// Merge new destinations
const existingDestSlugs = new Set(destinations.map(d => d.slug));
for (const d of newDestinations) {
  if (!existingDestSlugs.has(d.slug)) {
    destinations.push(d);
    existingDestSlugs.add(d.slug);
    console.log(`➕ Added new destination item: ${d.title} (${d.slug})`);
  }
}

// Update seedAll object
seedAll.services = services;
seedAll.fleet = fleet;
seedAll.destinations = destinations;

// Save all updated JSON files
fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2), 'utf8');
fs.writeFileSync(fleetPath, JSON.stringify(fleet, null, 2), 'utf8');
fs.writeFileSync(destinationsPath, JSON.stringify(destinations, null, 2), 'utf8');
fs.writeFileSync(seedAllPath, JSON.stringify(seedAll, null, 2), 'utf8');

console.log('\n======================================================');
console.log('ALL JSON FILES SUCCESSFULLY UPDATED & SYNCHRONIZED');
console.log(`- Services count: ${services.length}`);
console.log(`- Fleet count: ${fleet.length}`);
console.log(`- Destinations count: ${destinations.length}`);
console.log('======================================================\n');
