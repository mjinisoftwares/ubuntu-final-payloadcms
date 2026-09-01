const fs = require('fs');
const path = require('path');

// Helper functions for Lexical Nodes
function text(t, format = 0) {
  return { detail: 0, format, mode: 'normal', style: '', text: t, type: 'text', version: 1 };
}
function bold(t) {
  return text(t, 1);
}
function link(url, t) {
  return {
    type: 'link',
    fields: { linkType: 'custom', url, newTab: false },
    format: '',
    indent: 0,
    version: 2,
    direction: 'ltr',
    children: [text(t)]
  };
}
function p(children) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: Array.isArray(children) ? children : [text(children)]
  };
}
function h2(title) {
  return {
    type: 'heading',
    tag: 'h2',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(title)]
  };
}
function h3(title) {
  return {
    type: 'heading',
    tag: 'h3',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(title)]
  };
}
function ul(items) {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((item, idx) => ({
      type: 'listitem',
      value: idx + 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: Array.isArray(item) ? item : [text(item)]
    }))
  };
}

function countWords(node) {
  let count = 0;
  if (node.text) {
    count += node.text.trim().split(/\s+/).filter(Boolean).length;
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      count += countWords(child);
    }
  }
  return count;
}

// -------------------------------------------------------------
// NEW FLEET ITEMS TO ADD
// -------------------------------------------------------------
const newFleet = [
  {
    title: "Mercedes-Benz E-Class Hire Nairobi",
    slug: "mercedes-benz-hire-nairobi",
    subTitle: "Luxury executive sedans for VIP airport transfers, diplomatic transit, and weddings",
    vehicleType: "executive-suv",
    summary: "Premium Mercedes-Benz E-Class luxury sedans offering whisper-quiet cabin comfort, plush leather interior, and executive road presence for VIP delegations, weddings, and high-level corporate travel.",
    passengerCapacity: 4,
    luggageCapacity: 3,
    baseDayRateKES: 18000,
    baseDayRateUSD: 145,
    specifications: {
      is4WD: false,
      hasPopUpRoof: false,
      hasAircon: true,
      hasWifi: true,
      hasChargingPorts: true,
      hasCoolerBox: true,
      hasRadioCommunication: false,
      transmission: "automatic",
      fuelType: "petrol"
    },
    idealFor: [
      "vip-executive",
      "weddings-events",
      "airport-transfers",
      "corporate-transport"
    ],
    featuresList: [
      { feature: "Full leather interior with dual-zone climate control and acoustic glass" },
      { feature: "Uniformed, security-vetted executive chauffeur trained in diplomatic etiquette" },
      { feature: "Onboard high-speed 4G Wi-Fi hotspot and rapid USB charging cables" },
      { feature: "Complimentary chilled bottled water and premium hand wipes" },
      { feature: "Comprehensive passenger liability and full commercial insurance" }
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("When you need prestige, quiet comfort, and unmatched executive style in Nairobi, our Mercedes-Benz E-Class fleet is the premier choice. It is ideal for foreign dignitaries, chief executives, luxury airport pickups at JKIA, and bridal convoys."),
          p("Every Mercedes-Benz hire includes an impeccably dressed, vetted chauffeur who knows Nairobi's executive corridors, five-star hotels, and embassy zones inside out.")
        ]
      }
    },
    meta: {
      title: "Mercedes-Benz E-Class Hire Nairobi | Luxury VIP Chauffeur | Ubuntu Logistics",
      description: "Hire a Mercedes-Benz E-Class in Nairobi with a professional chauffeur. Luxury sedans for VIP airport transfers, business meetings, and weddings."
    },
    _status: "published"
  },
  {
    title: "Toyota Prado TX 4x4 Hire Nairobi",
    slug: "toyota-prado-tx-hire-nairobi",
    subTitle: "Rugged yet luxurious 7-seater 4WD SUVs for countrywide road trips and executive transit",
    vehicleType: "executive-suv",
    summary: "The Toyota Land Cruiser Prado TX/TXL 4x4 combines go-anywhere four-wheel-drive capability with executive interior styling. Perfect for long-distance Kenya road trips, NGO field missions, and VIP city travel.",
    passengerCapacity: 7,
    luggageCapacity: 5,
    baseDayRateKES: 15000,
    baseDayRateUSD: 120,
    specifications: {
      is4WD: true,
      hasPopUpRoof: false,
      hasAircon: true,
      hasWifi: true,
      hasChargingPorts: true,
      hasCoolerBox: true,
      hasRadioCommunication: false,
      transmission: "automatic",
      fuelType: "diesel"
    },
    idealFor: [
      "vip-executive",
      "inter-county",
      "group-excursions",
      "corporate-transport"
    ],
    featuresList: [
      { feature: "Full-time 4WD with high ground clearance and terrain management system" },
      { feature: "7 spacious seats with versatile split-folding third-row for large luggage" },
      { feature: "Dual front and rear air conditioning with independent temperature controls" },
      { feature: "High-speed 4G Wi-Fi hotspot and multiple USB charging points" },
      { feature: "Available for self-drive or with an experienced professional driver" }
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("The Toyota Prado TX is Kenya's most popular luxury 4WD vehicle for good reason. It delivers smooth highway cruising on tarmac roads and effortless power over rough rural tracks across the Great Rift Valley, Mount Kenya, and national conservancies."),
          p("Whether traveling for business in Nairobi or driving upcountry with family, the Prado TX gives you total confidence and unmatched comfort.")
        ]
      }
    },
    meta: {
      title: "Toyota Prado TX Hire Nairobi | 4x4 Luxury SUV Rental Kenya | Ubuntu Logistics",
      description: "Rent a Toyota Prado TX 4x4 in Nairobi, Kenya. Self-drive or with a driver. Reliable 7-seater SUV for business, safaris, and family travel."
    },
    _status: "published"
  },
  {
    title: "22 Seater Bus Hire Nairobi",
    slug: "22-seater-bus-hire-nairobi",
    subTitle: "Toyota Coaster & Mitsubishi Rosa mini-coaches for medium group travel",
    vehicleType: "coaster-mini-bus",
    summary: "Comfortable 22-seater mini-coaches with high-back reclining seats, large passenger windows, powerful air conditioning, and dedicated luggage space for team building, church retreats, and family functions.",
    passengerCapacity: 22,
    luggageCapacity: 15,
    baseDayRateKES: 20000,
    baseDayRateUSD: 160,
    specifications: {
      is4WD: false,
      hasPopUpRoof: false,
      hasAircon: true,
      hasWifi: true,
      hasChargingPorts: true,
      hasCoolerBox: false,
      hasRadioCommunication: true,
      transmission: "manual",
      fuelType: "diesel"
    },
    idealFor: [
      "corporate-transport",
      "group-excursions",
      "weddings-events"
    ],
    featuresList: [
      { feature: "22 comfortable reclining seats with individual seatbelts and generous legroom" },
      { feature: "Dual-compressor air conditioning with individual passenger overhead vents" },
      { feature: "Public address (PA) microphone system for guides and tour leaders" },
      { feature: "Large luggage boot and overhead parcel racks for carry-on bags" },
      { feature: "Professional PSV-certified commercial driver with clean driving record" }
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("When a 14-seater van is too small and a 33-seater coach is too large, our 22-seater mini-buses provide the perfect solution for medium-sized groups."),
          p("Enjoy a smooth, quiet ride with full climate control on group road trips to Naivasha, Nakuru, Nanyuki, and Mombasa.")
        ]
      }
    },
    meta: {
      title: "22 Seater Bus Hire Nairobi | Toyota Coaster & Rosa Minibus | Ubuntu Logistics",
      description: "Hire a 22-seater bus in Nairobi with a professional driver. Ideal for corporate team building, wedding guests, school trips, and group tours."
    },
    _status: "published"
  },
  {
    title: "50 Seater Luxury Coach Hire Kenya",
    slug: "50-seater-luxury-coach-hire-kenya",
    subTitle: "Full-size long-distance touring coaches for major conferences and large delegations",
    vehicleType: "large-bus",
    summary: "Flagship 50-seater luxury touring coaches equipped with ergonomic reclining seats, onboard entertainment screens, climate control, and massive underfloor luggage bays for major conferences and corporate group travel.",
    passengerCapacity: 50,
    luggageCapacity: 45,
    baseDayRateKES: 40000,
    baseDayRateUSD: 310,
    specifications: {
      is4WD: false,
      hasPopUpRoof: false,
      hasAircon: true,
      hasWifi: true,
      hasChargingPorts: true,
      hasCoolerBox: false,
      hasRadioCommunication: true,
      transmission: "manual",
      fuelType: "diesel"
    },
    idealFor: [
      "corporate-transport",
      "group-excursions",
      "weddings-events"
    ],
    featuresList: [
      { feature: "50 plush high-back reclining seats with footrests and foldable tray tables" },
      { feature: "High-capacity centralized climate control air conditioning" },
      { feature: "Overhead HD video screens and multi-speaker audio PA sound system" },
      { feature: "Massive underfloor through-luggage compartments for 50+ suitcases" },
      { feature: "Two experienced long-distance commercial coach captains" }
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("For international conferences, national sporting events, university field excursions, and large corporate gatherings, our 50-seater luxury coaches offer unmatched group travel efficiency."),
          p("Travel across Kenya in total comfort with dual experienced coach captains, full climate control, and generous luggage space.")
        ]
      }
    },
    meta: {
      title: "50 Seater Coach Hire Kenya | Luxury Tour Bus Rental Nairobi | Ubuntu Logistics",
      description: "Hire a 50-seater luxury coach in Kenya with experienced drivers. Full aircon, underfloor luggage, PA system for conferences and large group tours."
    },
    _status: "published"
  },
  {
    title: "Overland Safari Truck Hire Kenya",
    slug: "overland-safari-truck-hire-kenya",
    subTitle: "Heavy-duty custom 4x4 expedition overland trucks for rugged cross-country safaris",
    vehicleType: "large-bus",
    summary: "Purpose-built 24-seater 4x4 overland expedition trucks designed for rugged cross-country safaris, camping expeditions, film production crews, and off-grid wilderness exploration across East Africa.",
    passengerCapacity: 24,
    luggageCapacity: 30,
    baseDayRateKES: 35000,
    baseDayRateUSD: 275,
    specifications: {
      is4WD: true,
      hasPopUpRoof: true,
      hasAircon: false,
      hasWifi: false,
      hasChargingPorts: true,
      hasCoolerBox: true,
      hasRadioCommunication: true,
      transmission: "manual",
      fuelType: "diesel"
    },
    idealFor: [
      "safari-game-drives",
      "group-excursions",
      "inter-county"
    ],
    featuresList: [
      { feature: "Heavy-duty all-wheel-drive 4x4 chassis with high ground clearance" },
      { feature: "Roll-up canvas sides and elevated open-air wildlife viewing windows" },
      { feature: "Built-in commercial kitchen lockers, camping gear bays, and water tanks" },
      { feature: "High-output power inverters for charging cameras, laptops, and drones" },
      { feature: "Expert overland mechanical driver and certified expedition guide" }
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Our custom 4x4 overland safari trucks are built to conquer Africa's toughest off-road terrains. From Lake Turkana and the Chalbi Desert to Samburu and the Maasai Mara, these trucks take large groups deep into the wilderness."),
          p("Equipped with onboard power charging, cooking facilities, water storage, and heavy-duty recovery gear, you can explore Kenya completely self-sufficiently.")
        ]
      }
    },
    meta: {
      title: "Overland Safari Truck Hire Kenya | 4x4 Expedition Truck Rental | Ubuntu Logistics",
      description: "Hire a 4x4 overland safari truck in Kenya. Built for camping safaris, film crews, and group expeditions into remote East African wilderness."
    },
    _status: "published"
  }
];

// -------------------------------------------------------------
// NEW DESTINATIONS TO ADD
// -------------------------------------------------------------
const newDestinations = [
  {
    title: "Transport to Meru National Park",
    slug: "transport-to-meru-national-park",
    subTitle: "Untamed wilderness, lush riverine forests, and home to Elsa the Lioness",
    region: "mount-kenya",
    summary: "Meru National Park is one of Kenya's most wild, uncrowded, and scenic parks. Characterized by 13 rivers, lush green plains, doum palms, rhino sanctuaries, and thriving big cat populations.",
    distanceFromNairobiKm: 350,
    estimatedTravelTime: "6 - 7 Hours via Embu / Meru Highway",
    roadCondition: "rough-terrain-4x4-required",
    bestTimeToVisit: "June to September & December to March (Dry seasons)",
    highlights: [
      { highlight: "Dedicated 48 sq km rhino sanctuary with healthy black and white rhino populations" },
      { highlight: "Historical resting place and memorial of Elsa the Lioness from Born Free" },
      { highlight: "Scenic riverine views across 13 perennial crystal-clear streams and springs" },
      { highlight: "Exceptional uncrowded wildlife sightings of lions, cheetahs, leopards, and elephants" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Thika, Embu, or Meru Town for refreshments and fuel top-up",
      entryFeesNotes: "KWS park entry fees apply (Citizen, Resident, Non-Resident rates via eCitizen). Vehicle & driver access handled by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "land-cruiser-hire-kenya",
      "toyota-prado-tx-hire-nairobi",
      "10-seater-van-matatu-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Meru National Park is a hidden gem in Kenya's safari circuit. Located east of Mount Kenya, this pristine wilderness offers genuine off-the-beaten-path safari adventures without tourist crowds."),
          p("We provide robust 4x4 safari Land Cruisers and Toyota Prado SUVs with experienced wildlife guides who know every game trail, river crossing, and wildlife hideout in the park.")
        ]
      }
    },
    meta: {
      title: "Transport to Meru National Park | 4x4 Safari Road Trips | Ubuntu Logistics",
      description: "Book private 4x4 transport to Meru National Park from Nairobi. Land Cruisers, expert driver-guides, door-to-door lodge transfers and game drives."
    },
    _status: "published"
  },
  {
    title: "Transport to Shaba National Reserve",
    slug: "transport-to-shaba-national-reserve",
    subTitle: "Dramatic volcanic scenery, natural springs, and Northern Special Five wildlife",
    region: "northern-kenya",
    summary: "Shaba National Reserve features rugged volcanic hills, doum palm oases, and the Ewaso Nyiro River. Famous for the Samburu Northern Special 5: Grevy's zebra, reticulated giraffe, Beisa oryx, gerenuk, and Somali ostrich.",
    distanceFromNairobiKm: 315,
    estimatedTravelTime: "5.5 - 6 Hours via Isiolo",
    roadCondition: "mixed-highway-and-offroad",
    bestTimeToVisit: "June to October & December to March",
    highlights: [
      { highlight: "Spot the Northern Special Five species unique to arid northern Kenya" },
      { highlight: "Natural freshwater springs surrounded by doum palm oases in the desert" },
      { highlight: "Stunning dramatic volcanic landscapes and rugged rocky kopjes" },
      { highlight: "Filming location for Out of Africa and Joy Adamson's documentary work" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Nanyuki (Equator crossing) and Isiolo Town",
      entryFeesNotes: "Samburu County Government conservation fees apply at the gate. Driver and vehicle entrance covered by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "land-cruiser-hire-kenya",
      "toyota-prado-tx-hire-nairobi",
      "10-seater-van-matatu-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Shaba National Reserve is a dramatic desert oasis where rocky volcanic hills meet the life-giving Ewaso Nyiro River. It is home to rare northern wildlife species you will not find in southern Kenya."),
          p("Our heavy-duty 4x4 Land Cruisers with pop-up game observation roofs give you the ultimate vantage point for wildlife photography and game tracking in Shaba.")
        ]
      }
    },
    meta: {
      title: "Transport to Shaba National Reserve | Safari Vehicle Hire | Ubuntu Logistics",
      description: "Private road transport from Nairobi to Shaba National Reserve. 4x4 Safari Land Cruisers with expert driver-guides for Samburu Northern 5 game drives."
    },
    _status: "published"
  },
  {
    title: "Transport to Lake Bogoria & Lake Baringo",
    slug: "transport-to-lake-bogoria-and-baringo",
    subTitle: "Steaming hot geysers, pink flamingo spectacles, and freshwater birding boat safaris",
    region: "rift-valley",
    summary: "Experience the geothermal wonder of Lake Bogoria with hundreds of steaming hot water geysers and millions of lesser flamingos, paired with Lake Baringo's freshwater boat rides, hippos, crocodiles, and over 470 bird species.",
    distanceFromNairobiKm: 240,
    estimatedTravelTime: "4 - 5 Hours via Nakuru & Marigat",
    roadCondition: "paved-highway-all-weather",
    bestTimeToVisit: "Year-round (Best flamingo concentrations August to March)",
    highlights: [
      { highlight: "Active geothermal hot springs and boiling geysers shooting into the air" },
      { highlight: "Vibrant pink shores with millions of lesser and greater flamingos" },
      { highlight: "Boat safaris on Lake Baringo to spot fish eagles, hippos, and Nile crocodiles" },
      { highlight: "Rich cultural visits with the Ilchamus and Tugen communities" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Great Rift Valley viewpoint, Nakuru Town, and Marigat Junction",
      entryFeesNotes: "County Council park entry fees apply at Bogoria and Baringo boat stations. Vehicle and driver costs included in our packages."
    },
    recommendedFleetSlugs: [
      "suv-hire-nairobi",
      "toyota-prado-tx-hire-nairobi",
      "7-seater-van-hire-nairobi",
      "10-seater-van-matatu-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Lake Bogoria and Lake Baringo offer a breathtaking contrast in the northern Great Rift Valley. Lake Bogoria is a saline lake famous for active geysers where visitors boil eggs in natural springs, while Lake Baringo is a tranquil freshwater haven teeming with birdlife."),
          p("Ubuntu Logistics organizes smooth, scenic road trips from Nairobi in modern air-conditioned SUVs and safari vans with experienced driver-guides.")
        ]
      }
    },
    meta: {
      title: "Transport to Lake Bogoria & Lake Baringo | Flamingo & Geyser Tours | Ubuntu Logistics",
      description: "Book road transport from Nairobi to Lake Bogoria and Lake Baringo. Comfortable SUVs, vans, and 4x4s with drivers for flamingos, geysers, and boat safaris."
    },
    _status: "published"
  },
  {
    title: "Transport to Chyulu Hills National Park",
    slug: "transport-to-chyulu-hills-national-park",
    subTitle: "The Green Hills of Africa — rolling volcanic ridges, Leviathan lava tubes, and views of Kilimanjaro",
    region: "southern-kenya",
    summary: "Ernest Hemingway's legendary 'Green Hills of Africa.' Chyulu Hills boasts misty cloud forests, rolling emerald volcanic peaks, the world's longest lava tube caves (Leviathan Cave), and panoramic views of Mount Kilimanjaro.",
    distanceFromNairobiKm: 190,
    estimatedTravelTime: "3.5 - 4 Hours via Mombasa Highway (Kibwezi)",
    roadCondition: "rough-terrain-4x4-required",
    bestTimeToVisit: "June to October & December to March",
    highlights: [
      { highlight: "Explore the Leviathan Cave, one of the longest continuous lava tubes on Earth" },
      { highlight: "Unobstructed sunrise views of Mount Kilimanjaro across the Tsavo plains" },
      { highlight: "Horseback riding, hiking, and guided nature walks on pristine volcanic hills" },
      { highlight: "Pristine elephant, giraffe, and leopard habitat with zero tourist congestion" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Machakos Junction and Kibwezi Town for refreshments",
      entryFeesNotes: "KWS park entry fees apply via eCitizen. Driver and vehicle entrance managed by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "land-cruiser-hire-kenya",
      "toyota-prado-tx-hire-nairobi",
      "suv-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Chyulu Hills National Park is one of the most magical and untouched landscapes in Kenya. Rolling green volcanic hills rise dramatically between Tsavo West and Amboseli, offering stunning views of Mount Kilimanjaro."),
          p("Due to the rugged volcanic rock tracks, a capable 4WD vehicle like our Toyota Prado TX or Safari Land Cruiser is essential. We provide comfortable vehicles and experienced drivers for hiking and safari trips.")
        ]
      }
    },
    meta: {
      title: "Transport to Chyulu Hills National Park | 4x4 Car Hire Nairobi | Ubuntu Logistics",
      description: "Rent a 4x4 with driver to Chyulu Hills National Park. Explore lava tubes, volcanic hiking trails, and Kilimanjaro views with Ubuntu Logistics."
    },
    _status: "published"
  },
  {
    title: "Transport to Watamu Marine National Park",
    slug: "transport-to-watamu-marine-park",
    subTitle: "Pristine white sand beaches, coral reefs, sea turtle sanctuaries, and Gede Ruins",
    region: "coastal-kenya",
    summary: "Watamu is Kenya's premier marine sanctuary, featuring turquoise lagoons, world-class snorkeling on coral reefs, sea turtle rehabilitation centers, mangrove boardwalks at Mida Creek, and the ancient 12th-century Swahili Gede Ruins.",
    distanceFromNairobiKm: 570,
    estimatedTravelTime: "9 - 10 Hours via Mombasa Road or 25 Minutes from Malindi Airport",
    roadCondition: "paved-highway-all-weather",
    bestTimeToVisit: "July to April (Warm tropical coastal weather)",
    highlights: [
      { highlight: "Snorkeling and scuba diving among vibrant coral gardens and sea turtles" },
      { highlight: "Sunset dhow cruises and wooden mangrove boardwalks at Mida Creek" },
      { highlight: "Explore the mysterious 12th-century stone city ruins of Gede" },
      { highlight: "Relax on world-acclaimed white sand beaches like Watamu Bay and Jacaranda Beach" }
    ],
    routeInfo: {
      startingPoint: "Nairobi, Mombasa SGR Station, or Malindi Airport Pickup",
      recommendedStops: "Voi (Tsavo View), Kilifi Creek Bridge, and Matsangoni",
      entryFeesNotes: "KWS Marine park fees apply for reef snorkeling. Beach and town transfers fully covered by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "suv-hire-nairobi",
      "mercedes-benz-hire-nairobi",
      "7-seater-van-hire-nairobi",
      "14-seater-minibus-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Watamu is widely considered Kenya's most beautiful beach destination. With crystal-clear turquoise waters, gentle sea turtles, and rich Swahili coastal history, it is the ultimate seaside paradise."),
          p("Ubuntu Logistics provides overland road transfers from Nairobi, inter-hotel shuttles from Mombasa SGR Station, and airport pickups from Malindi Airport directly to your Watamu beach resort.")
        ]
      }
    },
    meta: {
      title: "Transport to Watamu Marine Park | Coastal Airport & Hotel Shuttles | Ubuntu Logistics",
      description: "Book private transport to Watamu from Nairobi, Mombasa SGR, or Malindi Airport. Comfortable vans, SUVs, and luxury sedans with professional drivers."
    },
    _status: "published"
  },
  {
    title: "Transport to Nanyuki & Laikipia Conservancies",
    slug: "transport-to-nanyuki-laikipia",
    subTitle: "Equator line crossing, high-altitude ranches, and private wildlife conservancies",
    region: "mount-kenya",
    summary: "Nanyuki is the gateway to Mount Kenya and the vast wildlife conservancies of Laikipia. Famous for the Equator crossing landmark, Ol Pejeta Conservancy, luxury safari lodges, and breathtaking views of Mount Kenya's jagged peaks.",
    distanceFromNairobiKm: 195,
    estimatedTravelTime: "3.5 - 4 Hours via Thika Superhighway & Karatina",
    roadCondition: "paved-highway-all-weather",
    bestTimeToVisit: "Year-round (Crisp highland climate with dry seasons June-October)",
    highlights: [
      { highlight: "Cross the official Earth's Equator line with water Coriolis effect demonstrations" },
      { highlight: "Direct road access to Ol Pejeta, Lewa, Borana, and Mount Kenya National Park" },
      { highlight: "Exceptional dining, craft breweries, and coffee farm visits in Nanyuki Town" },
      { highlight: "Breathtaking morning vistas of Batian and Nelion peaks on Mount Kenya" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Sagana (White water rafting viewpoint) and Karatina Market",
      entryFeesNotes: "Individual conservancy fees apply at Ol Pejeta, Lewa, or Borana gates. Highway tolls and vehicle permits covered by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "saloon-car-hire-nairobi",
      "suv-hire-nairobi",
      "toyota-prado-tx-hire-nairobi",
      "land-cruiser-hire-kenya",
      "7-seater-van-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Nanyuki is a vibrant safari hub nestled right on the Equator at the foot of Mount Kenya. It offers convenient road access to the world's most prestigious wildlife conservancies, including Ol Pejeta, Lewa, and Solio Ranch."),
          p("Whether traveling for a weekend getaway, corporate retreat, or wildlife safari, Ubuntu Logistics offers reliable sedans, executive SUVs, and 4x4 Land Cruisers with professional drivers.")
        ]
      }
    },
    meta: {
      title: "Transport to Nanyuki & Laikipia | Nairobi to Nanyuki Car Hire | Ubuntu Logistics",
      description: "Hire a car with driver from Nairobi to Nanyuki and Laikipia. Reliable SUVs, vans, and 4x4 Land Cruisers for Mount Kenya and wildlife conservancies."
    },
    _status: "published"
  },
  {
    title: "Transport to Kakamega Forest",
    slug: "transport-to-kakamega-forest",
    subTitle: "Kenya's only tropical rainforest — ancient hardwood trees, primates, and over 360 bird species",
    region: "western-kenya",
    summary: "Kakamega Forest National Reserve is the last remaining remnant of the ancient Guineo-Congolian tropical rainforest that once stretched across Central Africa. A paradise for birdwatchers, botanists, and nature lovers.",
    distanceFromNairobiKm: 390,
    estimatedTravelTime: "6.5 - 7.5 Hours via Nakuru, Kericho & Kisumu Highway",
    roadCondition: "paved-highway-all-weather",
    bestTimeToVisit: "December to February & June to August (Drier months for walking trails)",
    highlights: [
      { highlight: "Guided canopy walks and hikes through ancient 300-year-old tropical trees" },
      { highlight: "Over 360 documented bird species including the Great Blue Turaco and African Grey Parrot" },
      { highlight: "Spot rare primates including the De Brazza's monkey and black-and-white colobus" },
      { highlight: "Enchanting sunrise walks to Lirhanda Hill overlooking the misty rainforest canopy" }
    ],
    routeInfo: {
      startingPoint: "Nairobi CBD, JKIA Airport, or Hotel Pickup",
      recommendedStops: "Kericho tea estates and Kisumu Lake Victoria viewpoint",
      entryFeesNotes: "KWS forest reserve fees apply via eCitizen. Certified local forest guide fees and vehicle transport covered by Ubuntu Logistics."
    },
    recommendedFleetSlugs: [
      "suv-hire-nairobi",
      "toyota-prado-tx-hire-nairobi",
      "7-seater-van-hire-nairobi",
      "10-seater-van-matatu-hire-nairobi"
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          p("Kakamega Forest is a magical prehistoric rainforest tucked away in Western Kenya. With towering trees, colorful butterflies, rare monkeys, and hundreds of bird species, it offers a refreshing safari experience unlike anywhere else in East Africa."),
          p("Ubuntu Logistics organizes full cross-country road transfers from Nairobi via the scenic Great Rift Valley and Kericho tea plantations in comfortable, air-conditioned SUVs and passenger vans.")
        ]
      }
    },
    meta: {
      title: "Transport to Kakamega Forest | Rainforest Eco-Tours Kenya | Ubuntu Logistics",
      description: "Book transport to Kakamega Forest from Nairobi. Comfortable SUVs and vans with professional drivers for birdwatching and rainforest hikes."
    },
    _status: "published"
  }
];

module.exports = {
  newFleet,
  newDestinations
};
