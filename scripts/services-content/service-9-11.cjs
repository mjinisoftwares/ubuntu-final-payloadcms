const { text, bold, link, p, h2, h3, ul } = require('../lexical-helpers.cjs');

// 9. Tours & Safari Transport Kenya
function getToursSafariContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Kenya is the birthplace of the African safari, home to the legendary Big Five, vast rolling savannahs, dramatic Great Rift Valley lakes, and rich Maasai and Samburu cultural heritage. Ubuntu Logistics delivers comprehensive "),
          bold("Tours & Safari Transport across Kenya"),
          text(", offering custom-tailored overland safari circuits, guided wildlife game drives, and seamless lodge-to-lodge transfers. With custom-built 4x4 Safari Land Cruisers, 4WD safari vans, and certified KPSGA driver-guides, we turn your East African wildlife dream into an unforgettable, safe, and exhilarating reality.")
        ]),

        h2("What Our Tours and Safari Transport Service Entails"),
        p("We manage every logistical detail of your overland road safari, from your initial hotel pickup in Nairobi to the final game drive in the savannah. Here is what our full-service safari transport encompasses:"),
        ul([
          [bold("Custom Multi-Day Overland Safari Circuits: "), text("Seamless transport connecting Kenya's premier national parks — Maasai Mara, Amboseli, Lake Nakuru, Samburu, Tsavo East, Tsavo West, and Ol Pejeta — with flexible driving paces and scenic stops.")],
          [bold("Daily Morning and Afternoon Game Drives: "), text("Unlimited game drive hours inside the national reserves. Our expert guides track big cat movements, elephant migration corridors, and river crossings during prime early morning and golden hour periods.")],
          [bold("Certified Professional Safari Guides: "), text("Every vehicle is commanded by an experienced driver-guide holding Bronze or Silver certification from the Kenya Professional Safari Guides Association (KPSGA), with encyclopedic knowledge of animal behavior, botany, and bird taxonomy.")],
          [bold("Door-to-Door Lodge & Bush Airstrip Transfers: "), text("Direct connections between luxury tented safari camps, national park entrance gates, and regional airstrips (Mara Serena, Keekorok, Olkiombo, Amboseli).")],
          [bold("Photographic Safari Outfitting: "), text("Vehicles optimized for wildlife photographers, featuring beanbag camera mounts, wide-angle sliding glass windows, pop-up game observation roofs, and onboard battery charging inverters.")],
          [bold("Cultural and Community Village Visits: "), text("Authentic, respectful cultural visits to Maasai, Samburu, and Pokot traditional villages and local artisan markets arranged along your safari route.")]
        ]),

        h2("Transparent Estimated Safari Tour Pricing"),
        p("We provide clear, all-inclusive safari transport packages in KES and USD with no unexpected surcharges:"),
        ul([
          [bold("Custom 4x4 Safari Land Cruiser (Up to 7 Passengers): "), text("KES 22,000 to KES 25,000 ($175 to $200 USD) per day inclusive of vehicle, driver-guide, and unlimited game drive mileage.")],
          [bold("4WD Safari Tour Van (Up to 8 Passengers): "), text("KES 12,000 to KES 14,000 ($95 to $110 USD) per day with a professional driver-guide.")],
          [bold("Toyota Prado TX 4x4 SUV (Family Safari): "), text("KES 15,000 to KES 17,000 ($120 to $135 USD) per day with driver.")],
          [bold("3-Day / 2-Night Maasai Mara Safari Transport Package: "), text("From KES 75,000 ($600 USD) per Land Cruiser, inclusive of vehicle, driver-guide, fuel from Nairobi, park gate transfers, and all game drives.")],
          [bold("Full-Day Nairobi National Park Safari Excursion: "), text("KES 12,000 to KES 15,000 ($95 to $120 USD) per vehicle, including hotel pickup, 5-hour game drive, and return drop-off.")],
          [bold("Day Trip to Lake Naivasha & Hell's Gate: "), text("KES 14,000 to KES 18,000 ($110 to $145 USD) per van/SUV, including boat ride transfers and gorge hiking transport.")],
          [bold("Inclusions & Park Fees: "), text("Our comprehensive safari packages include vehicle hire, professional guide services, fuel, driver park entry fees, and emergency rescue insurance. Guest park entry fees are paid directly to KWS/County reserves via eCitizen.")]
        ]),

        h2("What You Can Expect on Every Safari Expedition"),
        p("We design every safari expedition with safety, comfort, and exceptional wildlife discovery in mind:"),
        ul([
          [bold("Guaranteed Window Seat for Every Guest: "), text("Never fight for a viewing angle. Every passenger gets a dedicated window seat with panoramic views.")],
          [bold("High-Performance 4x4 Capability: "), text("Locking differentials, heavy-duty suspension, high ground clearance, and all-terrain tires ensure you never get stuck in black cotton mud or river crossings.")],
          [bold("Expert Wildlife Tracking: "), text("Our guides communicate via long-range two-way HF radio networks to track lion prides, cheetah hunts, leopard sightings, and rhino movements in real time.")],
          [bold("Clean and Dust-Free Presentation: "), text("Vehicles are cleaned and detailed daily at the safari camp before each morning game drive.")],
          [bold("Comfortable Travel Pace: "), text("Thoughtfully planned driving schedules with scenic viewpoints, clean highway rest stops, and lunch breaks.")],
          [bold("Flying Doctors AMREF Emergency Evacuation Cover: "), text("Optional comprehensive air ambulance medical evacuation cover available for all safari guests.")]
        ]),

        h2("Dedicated Onboard Safari Amenities"),
        p("Enjoy superior creature comforts deep in the African bush:"),
        ul([
          [bold("Complimentary Chilled Mineral Water: "), text("Cold, sealed mineral water provided daily inside the onboard electric cooler box.")],
          [bold("220V Power Inverters & USB Ports: "), text("Easily charge DSLR camera batteries, drone controllers, laptops, and smartphones while on the move.")],
          [bold("High-Lift Pop-Up Game Roof: "), text("Elevates in seconds to give you an unobstructed 360-degree standing view for stunning wildlife photography.")],
          [bold("High-Magnification Binoculars: "), text("Pairs of multi-coated optical binoculars on board to spot distant birds, leopards in acacia trees, and river wildlife.")],
          [bold("Mammal and Bird Field Guidebooks: "), text("Illustrated East African wildlife reference manuals to help identify and record animal species.")],
          [bold("Onboard Electric Fridge: "), text("Stocked with cool drinks, snacks, and fruits to keep you refreshed during full-day game drives.")]
        ]),

        h2("Recommended Fleet for Guided Kenya Safaris"),
        p("Choose the safari vehicle that matches your group size and style:"),
        ul([
          [link("/fleet/land-cruiser-hire-kenya", "Land Cruiser Hire Kenya"), text(" — Custom-stretched 4x4 safari Land Cruiser with pop-up roof and 7 individual window seats.")],
          [link("/fleet/10-seater-van-matatu-hire-nairobi", "10-Seater Safari Van Hire"), text(" — Reliable 4WD Toyota HiAce safari vans with pop-up roofs for budget-friendly group tours.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — 7-seater luxury 4WD SUV for private family safaris and day excursions.")],
          [link("/fleet/overland-safari-truck-hire-kenya", "Overland Safari Truck Hire Kenya"), text(" — 24-seater custom 4x4 expedition truck for overland camping tours and student safaris.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Comfortable 5-seater SUVs for day safaris to Nairobi National Park and Lake Naivasha.")]
        ]),

        h2("Popular Safari Circuits and Destinations"),
        p("Explore Kenya's premier national parks and wilderness conservancies:"),
        ul([
          [link("/destinations/transport-to-maasai-mara", "Transport to Maasai Mara"), text(" — World-famous for the Great Migration, big cats, and vast savannah horizons.")],
          [link("/destinations/transport-to-amboseli-national-park", "Transport to Amboseli National Park"), text(" — Enormous elephant herds set against the snow-capped peak of Mount Kilimanjaro.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Sanctuary for black and white rhinos, Rothschild giraffes, and flamingo flocks.")],
          [link("/destinations/transport-to-samburu-national-reserve", "Transport to Samburu National Reserve"), text(" — Northern wilderness featuring Grevy's zebras, reticulated giraffes, and Beisa oryx.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — High-density predator viewing and home to the world's last northern white rhinos.")],
          [link("/destinations/transport-to-tsavo-east-national-park", "Transport to Tsavo East National Park"), text(" — Famous red-dust elephants, Aruba Dam, and the world's longest lava flow (Yatta Plateau).")],
          [link("/destinations/transport-to-tsavo-west-national-park", "Transport to Tsavo West National Park"), text(" — Mzima Springs underwater hippo observatory, Shetani lava flows, and dramatic volcanic scenery.")],
          [link("/destinations/transport-to-meru-national-park", "Transport to Meru National Park"), text(" — Pristine, uncrowded riverine wilderness and Elsa the Lioness territory.")],
          [link("/destinations/transport-to-lake-bogoria-and-baringo", "Transport to Lake Bogoria & Lake Baringo"), text(" — Steaming hot geysers, pink flamingos, and freshwater boat safaris.")],
          [link("/destinations/transport-to-chyulu-hills-national-park", "Transport to Chyulu Hills"), text(" — Hemingway's Green Hills of Africa, Leviathan lava caves, and horse safaris.")]
        ]),

        h2("How to Book Your Safari Transport"),
        p("Planning your dream safari with Ubuntu Logistics is easy:"),
        ul([
          [bold("1. Choose Your Safari Parks: "), text("Select the parks you want to visit (e.g. Mara, Amboseli, Nakuru, Samburu) and your travel dates.")],
          [bold("2. Pick Your Safari Vehicle: "), text("Choose between a 4x4 Safari Land Cruiser or a 4WD Safari Tour Van.")],
          [bold("3. Receive a Customized Route Plan: "), text("Our safari desk crafts a detailed itinerary with exact driving times, fuel logistics, and lodge transfers.")],
          [bold("4. Embark on the Safari of a Lifetime: "), text("Meet your professional safari guide in Nairobi and head out for an unforgettable wildlife adventure.")]
        ]),
        p("Book your guided safari transport with Ubuntu Logistics today and explore Kenya's wildlife wonders.")
      ]
    }
  };
}

// 10. Wedding & Cultural Events Transport
function getWeddingEventsContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Your wedding day, ruracio / dowry negotiation ceremony, family celebration, or cultural festival is a milestone event that deserves flawless, elegant, and punctual transportation. Ubuntu Logistics provides comprehensive "),
          bold("Wedding & Cultural Events Transport across Kenya"),
          text(". From prestigious bridal luxury cars and groom convoys to coordinated guest shuttle fleets (7-seater vans, 14-seater minibuses, and 33-seater luxury coaches), our dedicated event transport coordinators manage every vehicle, route, and schedule to ensure your special day runs without a hitch.")
        ]),

        h2("What Our Wedding & Event Transport Service Entails"),
        p("Coordinating transportation for large wedding parties and traditional ceremonies across multiple locations (home, church, photo session venue, and reception grounds) can be overwhelming. We provide a complete turnkey transport management service:"),
        ul([
          [bold("Bridal Luxury Cars and Groom Convoys: "), text("Immaculate executive sedans and luxury SUVs (Mercedes-Benz E/S-Class, Toyota Prado TX, Land Cruiser V8) adorned in your chosen theme ribbon decorations with uniformed professional chauffeurs.")],
          [bold("Coordinated Guest Shuttles: "), text("Fleets of clean, air-conditioned 7-seater minivans, 14-seater minibuses, and 33-seater luxury Coaster buses to transport family members and guests smoothly between hotels, churches, and reception gardens.")],
          [bold("Traditional Ruracio / Dowry Ceremony Fleets: "), text("Multi-vehicle convoys for traditional dowry ceremonies, traveling together from Nairobi to upcountry family homesteads across Kiambu, Murang'a, Nyeri, Machakos, Meru, Kisumu, and Western Kenya.")],
          [bold("Bridal Party Photo Session Transfers: "), text("Punctual, coordinated transit for the bride, groom, bridesmaids, and groomsmen to botanical gardens, parks, or scenic photo shoot venues.")],
          [bold("Late-Night Guest Return Drop-offs: "), text("Safe, reliable evening and late-night shuttle services taking guests back to their hotels and residences after the evening wedding party.")],
          [bold("Dedicated On-Site Logistics Manager: "), text("For large weddings (100+ guests), we assign an on-site transport coordinator with two-way radios to manage vehicle staging, parking, and on-time departures.")]
        ]),

        h2("Transparent Estimated Pricing for Wedding and Event Fleets"),
        p("We offer flexible, cost-effective wedding packages in KES and USD with transparent terms and no surprise overtime charges:"),
        ul([
          [bold("Bridal Luxury Mercedes-Benz E-Class (Full Day / 10 Hours): "), text("KES 18,000 to KES 22,000 ($145 to $175 USD) inclusive of uniformed chauffeur, fuel within Nairobi, and standard vehicle ribbons.")],
          [bold("Executive Toyota Prado TX Bridal / Groom SUV: "), text("KES 15,000 to KES 18,000 ($120 to $145 USD) per day.")],
          [bold("Toyota Land Cruiser V8 / 300-Series Flagship VIP Car: "), text("KES 25,000 to KES 30,000 ($200 to $240 USD) per day.")],
          [bold("Family 7-Seater Passenger Van (Toyota Noah / Voxy): "), text("KES 8,000 to KES 10,000 ($65 to $80 USD) per day for bridal party or nuclear family transport.")],
          [bold("Guest Shuttle 14-Seater Minibus (Toyota HiAce): "), text("KES 12,000 to KES 15,000 ($95 to $120 USD) per day for guest shuttles.")],
          [bold("Large Guest 33-Seater Luxury Coaster Bus: "), text("KES 22,000 to KES 25,000 ($175 to $200 USD) per day for upcountry wedding convoys.")],
          [bold("Complete Multi-Vehicle Wedding Package Discount: "), text("Book 3 or more vehicles (e.g., 1 Bridal Car + 2 Guest Buses) and enjoy a 15% bundled fleet discount.")]
        ]),

        h2("What You Can Expect on Your Big Day"),
        p("We know there are no second chances on your wedding day. We guarantee total reliability, punctuality, and immaculate presentation:"),
        ul([
          [bold("Early Vehicle Staging: "), text("All wedding vehicles arrive at the pickup venue at least 30 to 45 minutes before departure, decorated and ready.")],
          [bold("Showroom Detailing: "), text("Every car is professionally washed, polished, interior-shampooed, and sanitized on the morning of the event.")],
          [bold("Impeccably Attired Chauffeurs: "), text("Our chauffeurs wear dark business suits, ties, and polished dress shoes, maintaining courteous and celebratory etiquette.")],
          [bold("Umbrella and Red-Carpet Curbside Service: "), text("Chauffeurs hold large golf umbrellas for the bridal party during rain or strong sun, keeping hair and dresses pristine.")],
          [bold("Pre-Surveyed Route Timing: "), text("Our team surveys traffic bottlenecks between ceremony venues in advance to calculate precise departure timelines.")],
          [bold("Standby Replacement Vehicle: "), text("An active backup vehicle is placed on standby in Nairobi to ensure zero disruptions.")]
        ]),

        h2("Specialized Onboard Amenities for Wedding Parties"),
        p("We ensure the wedding party travels in luxury and refreshment:"),
        ul([
          [bold("Complimentary Chilled Bottled Water & Mints: "), text("Fresh sealed mineral water bottles and breath mints provided for the bridal party.")],
          [bold("Beverage Cooler Boxes: "), text("Insulated ice coolers in bridal cars and vans to chill celebratory champagne, wine, and juices.")],
          [bold("Bluetooth Audio Systems: "), text("High-fidelity sound systems so the bridal party can play their custom celebration and entrance playlists.")],
          [bold("Rapid Phone Charging Docks: "), text("Keep bridal party smartphones fully charged for hundreds of photos and videos throughout the day.")],
          [bold("High-Performance Air Conditioning: "), text("Keeps makeup fresh, dresses cool, and suits comfortable during warm afternoon ceremonies.")],
          [bold("Custom Ribbon Decoration Assistance: "), text("We coordinate with your florist or wedding planner to attach vehicle ribbons and floral arrangements safely.")]
        ]),

        h2("Recommended Fleet for Weddings and Cultural Ceremonies"),
        p("Create the perfect convoy from our extensive vehicle collection:"),
        ul([
          [link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class Hire"), text(" — Flagship luxury sedan for the bride, groom, and principal wedding VIPs.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Imposing executive SUV for the groom's party and upcountry convoy leadership.")],
          [link("/fleet/land-cruiser-hire-kenya", "Land Cruiser Hire Kenya"), text(" — Luxury V8 Land Cruisers for grand wedding entrances and rough terrain homesteads.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Comfortable Toyota Noah/Voxy minivans for bridesmaids, groomsmen, and close family.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-roof minibuses for church choir, family delegations, and guest transport.")],
          [link("/fleet/22-seater-bus-hire-nairobi", "22-Seater Bus Hire Nairobi"), text(" — Elegant mini-coaches for extended family wedding convoys.")],
          [link("/fleet/tour-bus-coaster-hire-nairobi", "Tour Bus & Coaster Hire Nairobi"), text(" — 33-seater luxury buses for transporting large groups of wedding guests seamlessly.")],
          [link("/fleet/wheelchair-accessible-van-hire-nairobi", "Wheelchair Accessible Van Hire"), text(" — Modified vans ensuring grandparents and mobility-impaired relatives attend comfortably.")]
        ]),

        h2("Popular Wedding and Event Destinations Across Kenya"),
        p("We transport wedding parties to premier garden venues, luxury hotels, and upcountry ceremonies:"),
        ul([
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — World-class destination wedding resorts like Enashipai, Great Rift Valley Lodge, and Sawela.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Highland wedding venues like Fairmont Mount Kenya Safari Club and Maiyan.")],
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Unique wilderness wedding photo shoots and scenic safari receptions.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Breathtaking coastal beach weddings, honeymoon shuttles, and seaside receptions.")],
          [link("/destinations/transport-to-watamu-marine-park", "Transport to Watamu Marine Park"), text(" — Exclusive oceanfront villa weddings and tropical coastal ceremonies.")]
        ]),

        h2("How to Book Wedding Fleet Transport"),
        p("Reserving your wedding fleet with Ubuntu Logistics is stress-free:"),
        ul([
          [bold("1. Share Your Event Schedule: "), text("Provide your wedding date, pickup venues, church/ceremony location, photo shoot stop, and reception grounds.")],
          [bold("2. Select Your Fleet Combination: "), text("Choose your bridal car, groom SUV, and guest shuttle buses.")],
          [bold("3. Receive a Bundled Quote: "), text("Get an all-inclusive quotation with vehicle ribbons, fuel, driver allowances, and timeline coordination.")],
          [bold("4. Enjoy a Flawless Wedding Day: "), text("Our professional chauffeurs execute your transport timeline with absolute elegance and precision.")]
        ]),
        p("Contact Ubuntu Logistics today to reserve your luxury wedding fleet in Nairobi and across Kenya.")
      ]
    }
  };
}

// 11. Handicap Accessible Transport Nairobi
function getHandicapAccessibleContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Every individual deserves the fundamental right to travel with total dignity, safety, independence, and comfort. Ubuntu Logistics provides specialized "),
          bold("Handicap & Wheelchair Accessible Transport in Nairobi and across Kenya"),
          text(", featuring purpose-built accessible vans fitted with certified commercial hydraulic wheelchair lifts, low-gradient rear access ramps, international Q-Straint 4-point wheelchair docking floor tie-downs, and comfortable accompanying passenger seating for family members, nurses, or caregivers. Whether you require accessible airport transfers at JKIA, hospital and medical appointment shuttles, church and family event transport, or wheelchair-accessible safaris into Kenya's iconic national parks, our compassionate, certified team is dedicated to providing barrier-free travel solutions.")
        ]),

        h2("What Our Accessible Transport Service Entails"),
        p("Accessible mobility requires specialized vehicle engineering, safety certifications, and patient, empathetic staff trained in disability etiquette. Our wheelchair-accessible transport service provides comprehensive door-to-door mobility assistance:"),
        ul([
          [bold("Commercial Hydraulic Electric Wheelchair Lifts: "), text("Smooth, remote-controlled hydraulic lifts that effortlessly raise manual wheelchairs, heavy motorized power chairs, and bariatric mobility chairs from ground level into the vehicle cabin without the passenger ever needing to transfer out of their seat.")],
          [bold("Low-Gradient Non-Slip Rear Access Ramps: "), text("Heavy-duty aluminum ramps with textured non-skid surfaces, ideal for manual wheelchairs, lightweight travel chairs, and mobility scooters.")],
          [bold("Q-Straint 4-Point Docking Tie-Down Systems: "), text("Crash-tested 4-point floor track anchor systems with heavy-duty retractor straps that lock the wheelchair frame securely to the vehicle chassis, paired with integrated 3-point occupant lap and diagonal shoulder seatbelts.")],
          [bold("Patient, Mobility-Certified Chauffeurs: "), text("Our chauffeurs undergo formal training in wheelchair boarding techniques, secure tie-down docking, transfer assistance, disability sensitivity, and smooth defensive driving.")],
          [bold("Hospital and Medical Clinic Shuttles: "), text("Door-to-door transport to leading medical facilities across Nairobi — including Aga Khan University Hospital, The Nairobi Hospital, MP Shah Hospital, Kenyatta National Hospital, Karen Hospital, and specialized physical rehabilitation centers — with driver standby throughout your consultation or dialysis appointment.")],
          [bold("Accessible JKIA and Wilson Airport Meet & Greet: "), text("Curbside and arrivals hall meet-and-greet with dedicated wheelchair baggage handling, terminal escort assistance, and direct hydraulic boarding.")],
          [bold("Wheelchair-Accessible Safari & Country Tours: "), text("Custom-designed accessible road trips to Nairobi National Park, Lake Naivasha, Mount Kenya, and Lake Nakuru with pre-verified step-free lodge access and accessible safari viewing.")],
          [bold("Church, Wedding, and Family Function Shuttles: "), text("Ensure grandparents, elderly relatives, and mobility-impaired loved ones participate comfortably in all family weddings, birthday parties, and cultural ceremonies.")]
        ]),

        h2("Transparent Pricing for Wheelchair Accessible Van Hire"),
        p("We believe accessible transport should be affordable, fair, and completely transparent in both KES and USD, with zero equipment surcharges:"),
        ul([
          [bold("One-Way Accessible Airport Transfer (JKIA to Nairobi Hotel/Residence): "), text("KES 6,500 to KES 8,000 ($52 to $65 USD) inclusive of hydraulic lift van, certified driver, fuel, and airport parking.")],
          [bold("Round-Trip Hospital Appointment Shuttle (with 3 Hours Standby): "), text("KES 8,000 to KES 10,000 ($65 to $80 USD) inclusive of round-trip transit and waiting time.")],
          [bold("Full-Day Nairobi City Disposal (8 Hours / 80 km): "), text("KES 12,000 to KES 14,000 ($95 to $110 USD) inclusive of wheelchair accessible van, driver, and city fuel.")],
          [bold("Half-Day Nairobi City Disposal (4 Hours / 40 km): "), text("KES 8,500 ($68 USD) for local medical visits, shopping, or family functions.")],
          [bold("Multi-Day Upcountry Accessible Van Hire: "), text("KES 14,000 to KES 16,000 ($110 to $130 USD) per day plus fuel for road trips to Naivasha, Nakuru, Nanyuki, or Mombasa.")],
          [bold("Accessible Nairobi National Park Half-Day Safari Excursion: "), text("KES 14,000 ($110 USD) per vehicle, including hotel pickup, 4-hour game drive from the wheelchair van, and return transfer.")],
          [bold("100% Zero Surcharges for Equipment: "), text("Wheelchair lift usage, safety tie-downs, ramp deployment, and driver physical boarding assistance are always fully included at no extra cost.")]
        ]),

        h2("What You Can Expect (Safety & Dignity Standards)"),
        p("We hold our accessible transport service to the highest international passenger care and safety protocols:"),
        ul([
          [bold("Dignified, Transfer-Free Travel: "), text("Passengers remain comfortably seated in their own custom, posture-supporting wheelchair throughout the boarding, journey, and arrival process.")],
          [bold("Certified Floor Anchors and Occupant Harnesses: "), text("Heavy-duty crash-tested Q-Straint floor tracks and three-point occupant harnesses keep the wheelchair completely stable during sudden deceleration or turns.")],
          [bold("High-Roof Cabins with Ample Headroom: "), text("High-roof van clearance (over 1.5 meters internal height) ensures tall wheelchair users sit upright comfortably without ducking, crouching, or tilting.")],
          [bold("Companion and Caregiver Seating: "), text("Spacious upholstered seating alongside the wheelchair position for up to 4 family members, nurses, or caregivers to provide continuous companionship.")],
          [bold("Gentle, Smooth Defensive Driving: "), text("Our chauffeurs avoid sudden braking, sharp cornering, and bumpy road surfaces, prioritizing passenger comfort and spinal stability above all else.")],
          [bold("Punctual Arrival Guarantee: "), text("Drivers arrive 20 minutes prior to pickup time to allow unhurried, calm, and dignified boarding.")],
          [bold("Spacious Luggage and Mobility Storage: "), text("Generous boot space to easily accommodate luggage, portable oxygen concentrators, spare batteries, walking frames, and folding travel ramps.")]
        ]),

        h2("Onboard Accessible Amenities and Comforts"),
        p("Every accessible vehicle is outfitted with thoughtful amenities for maximum comfort:"),
        ul([
          [bold("Full Climate Control Air Conditioning: "), text("High-capacity front and rear climate control with individual overhead vents to ensure a cool, pleasant interior climate.")],
          [bold("Complimentary Chilled Bottled Water: "), text("Sealed mineral water provided for passengers and accompanying caregivers.")],
          [bold("Universal Mobile Device USB Charging Ports: "), text("Charge mobile phones, communication tablets, and motorized wheelchair batteries on the move.")],
          [bold("Onboard High-Speed 4G Wi-Fi: "), text("Complimentary in-car internet connection to stay connected during medical commutes.")],
          [bold("First Aid and Medical Emergency Kit: "), text("Comprehensive first aid trauma kit, sanitizing wipes, and emergency equipment on board every accessible vehicle.")],
          [bold("Smooth Air-Suspension Ride: "), text("Tuned shock absorbers that dampen road vibrations across Nairobi's speed bumps and uneven surfaces.")]
        ]),

        h2("Recommended Fleet for Accessible Mobility in Kenya"),
        p("Our purpose-built accessible vehicle fleet includes:"),
        ul([
          [link("/fleet/wheelchair-accessible-van-hire-nairobi", "Wheelchair Accessible Van Hire Nairobi"), text(" — Custom Toyota HiAce van with hydraulic electric lift, Q-Straint tie-downs, and caregiver seats.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Low step-in height Toyota Noah/Voxy minivans with grab handles for passengers with mild walking assistance requirements.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-roof passenger minibus for group outings with foldable manual wheelchairs in the luggage bay.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Comfortable luxury SUV for passengers capable of transfer seating for safari trips.")],
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Comfortable sedans with spacious front passenger seats and large trunks for folding wheelchairs.")]
        ]),

        h2("Popular Accessible Destinations and Excursions"),
        p("Experience Kenya's beauty with verified step-free and accessible destinations:"),
        ul([
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Accessible wildlife game drives directly from the comfort of your wheelchair van.")],
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Step-free access to luxury lakeside hotel gardens, boat docks, and geothermal spas.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Accessible country getaways to Fairmont Mount Kenya Safari Club and Ol Pejeta.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Smooth tarmac highway drive and paved park viewpoints to see rhinos and flamingos.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Accessible coastal resort transfers from Mombasa SGR Station or Ukunda Airstrip.")],
          [link("/destinations/transport-to-watamu-marine-park", "Transport to Watamu Marine Park"), text(" — Scenic coastal beach resort transfers with verified step-free wheelchair access.")]
        ]),

        h2("How to Book Handicap & Wheelchair Transport"),
        p("Booking an accessible van with Ubuntu Logistics is simple, reassuring, and dignified:"),
        ul([
          [bold("1. Tell Us Your Mobility Needs: "), text("Share whether the passenger uses a manual wheelchair, electric power wheelchair, or mobility scooter, along with companion passenger count.")],
          [bold("2. Specify Your Itinerary: "), text("Provide pickup location, destination (airport, hospital, hotel, church, or safari lodge), and appointment schedule.")],
          [bold("3. Receive Guaranteed Confirmation: "), text("Get vehicle confirmation with lift specifications, driver contact details, and transparent pricing.")],
          [bold("4. Enjoy Dignified Accessible Travel: "), text("Your compassionate driver assists with smooth hydraulic boarding, secure floor docking, and safe transit.")]
        ]),
        p("Contact Ubuntu Logistics today for safe, reliable, and dignified wheelchair accessible transport in Nairobi and across Kenya.")
      ]
    }
  };
}

module.exports = {
  getToursSafariContent,
  getWeddingEventsContent,
  getHandicapAccessibleContent
};
