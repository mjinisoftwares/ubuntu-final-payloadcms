const { text, bold, link, p, h2, h3, ul } = require('../lexical-helpers.cjs');

// 5. 4x4 & Safari Vehicle Hire Kenya
function getSafariVehicleHireContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Conquer Kenya's untamed savannahs, rugged mountain tracks, and iconic national parks with specialized "),
          bold("4x4 & Safari Vehicle Hire in Kenya"),
          text(" from Ubuntu Logistics. We provide custom-built Toyota Land Cruiser 4x4s and 4WD Safari HiAce vans equipped with pop-up game observation roofs, high ground clearance, heavy-duty suspension, and certified KPSGA wildlife driver-guides. Whether planning a photographic safari into the Maasai Mara, an elephant tracking expedition in Amboseli, or an off-grid journey across Samburu, our expedition fleet delivers unmatched reliability, comfort, and wildlife viewing angles.")
        ]),

        h2("What Our 4x4 Safari Vehicle Hire Entails"),
        p("Going on safari in East Africa requires robust, purpose-engineered vehicles that can handle muddy riverbanks, rocky volcanic trails, and deep sandy ruts while keeping passengers safe and comfortable. Our safari transport service includes:"),
        ul([
          [bold("Custom-Stretched Safari Land Cruisers: "), text("Our 7-seater Toyota Land Cruiser 4x4s feature extended chassis with individual padded bucket seats, wide sliding glass windows, and high-lift elevating roofs for 360-degree game photography.")],
          [bold("4WD Safari Vans with Pop-Up Roofs: "), text("Cost-effective Toyota HiAce 4x4 tour vans configured with 8 to 10 forward-facing window seats, heavy-duty suspension, and elevating game-viewing roofs.")],
          [bold("Certified Wildlife Driver-Guides: "), text("Every safari vehicle is piloted by a professional driver-guide certified by the Kenya Professional Safari Guides Association (KPSGA). Our guides are experts in wildlife biology, animal tracking, bird identification, and local ecosystem history.")],
          [bold("Complete Door-to-Door Safari Logistics: "), text("Pickup from your Nairobi hotel or JKIA, smooth highway transit to national park gates, morning and afternoon game drives, and direct transfers between safari lodges and bush airstrips.")],
          [bold("Bespoke Safari Itinerary Planning: "), text("We assist in planning realistic driving times, entry gate procedures, fuel stops, and scenic viewpoints across all Kenyan national parks and private wildlife conservancies.")],
          [bold("Cross-Border Safari Capability: "), text("All-inclusive COMESA cross-border permits and yellow fever documentation available for extended safaris connecting Kenya with Tanzania (Serengeti, Ngorongoro) and Uganda.")]
        ]),

        h2("Estimated Pricing and Daily Safari Vehicle Rates"),
        p("We offer clear, transparent daily hire rates in KES and USD. Rates include the customized vehicle, certified driver-guide, comprehensive passenger insurance, and unlimited game drive mileage inside the parks:"),
        ul([
          [bold("4x4 Custom Safari Land Cruiser (7 Window Seats): "), text("KES 22,000 to KES 25,000 ($175 to $200 USD) per day with a professional KPSGA guide-driver.")],
          [bold("4WD Safari Tour Van (8 to 10 Seats with Pop-Up Roof): "), text("KES 12,000 to KES 14,000 ($95 to $110 USD) per day with a certified safari driver.")],
          [bold("Toyota Prado TX 4x4 SUV (Self-Drive Safari): "), text("KES 13,000 to KES 15,000 ($105 to $120 USD) per day with unlimited cross-county mileage.")],
          [bold("Overland Expedition Safari Truck (24 Seats): "), text("KES 32,000 to KES 35,000 ($250 to $275 USD) per day for large student or camping groups.")],
          [bold("All-Inclusive Safari Package Option: "), text("Includes vehicle hire, fuel for entire safari itinerary, driver park entry fees, and driver meals/lodging allowances.")],
          [bold("Fuel and Park Entry Terms: "), text("Driver park entry fees and vehicle commercial entrance fees are fully included in our comprehensive safari packages. National park entry fees for guests are paid directly via the eCitizen portal.")]
        ]),

        h2("What You Can Expect on Your Safari Journey"),
        p("We ensure every day of your safari expedition runs with total safety and precision:"),
        ul([
          [bold("Guaranteed Window Seat for Every Guest: "), text("In our Safari Land Cruisers, every passenger has an unobstructed window seat with direct access to sliding glass windows and the pop-up roof.")],
          [bold("Exceptional Off-Road Capability: "), text("Dual fuel tanks, snorkel air intakes, heavy-duty winches, high-lift jacks, and twin spare tires ensure your vehicle tackles the most challenging terrain without stalling.")],
          [bold("Unmatched Wildlife Sightings: "), text("Our guides stay connected via long-range two-way HF radios with wildlife rangers and other safari vehicles to locate rare animal sightings like leopards, cheetah kills, and rhino families.")],
          [bold("Rigorous Pre-Safari Maintenance: "), text("Every safari 4x4 undergoes an exhaustive mechanical inspection in our Nairobi workshop before embarking on any multi-day expedition.")],
          [bold("Comfortable High-Suspension Ride: "), text("Heavy-duty Old Man Emu shock absorbers and reinforced leaf springs smooth out rough washboard gravel roads and rocky tracks.")],
          [bold("Clean, Non-Smoking Interiors: "), text("Vehicles are cleaned daily during your safari, with dust swept out after every game drive.")]
        ]),

        h2("Specialized Onboard Safari Amenities"),
        p("Our vehicles are custom outfitted with all the equipment needed for a world-class photographic safari:"),
        ul([
          [bold("Complimentary Chilled Mineral Water: "), text("Sealed bottled water refreshed daily and stored inside the onboard cooler box.")],
          [bold("Electric Mini-Fridge / Beverage Cooler: "), text("Keep your water, soft drinks, wine, and beer cold even under the midday African sun.")],
          [bold("220V / 12V Onboard Power Inverters: "), text("Continuous electrical power outlets to recharge camera batteries, drones, laptops, and smartphones while tracking wildlife on game drives.")],
          [bold("High-Lift Pop-Up Game Roof: "), text("Effortlessly elevating roof with canvas sun-shade protection, allowing comfortable standing photography for all passengers simultaneously.")],
          [bold("Binoculars and Wildlife Field Reference Books: "), text("High-magnification binoculars and comprehensive mammal/bird identification guidebooks on board.")],
          [bold("First Aid and Emergency Trauma Kit: "), text("Full first aid medical kit and fire extinguishers on every vehicle.")]
        ]),

        h2("Recommended Fleet for Kenya Safari Expeditions"),
        p("Select the ideal safari vehicle for your group size, photographic requirements, and terrain:"),
        ul([
          [link("/fleet/land-cruiser-hire-kenya", "Land Cruiser Hire Kenya"), text(" — The gold-standard 4x4 safari expedition vehicle with pop-up roof and 7 window seats.")],
          [link("/fleet/10-seater-van-matatu-hire-nairobi", "10-Seater Safari Van Hire"), text(" — Custom 4WD Toyota HiAce safari vans with pop-up roofs for budget-friendly group safaris.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Luxurious 7-seater 4WD SUV for self-drive safaris and executive park tours.")],
          [link("/fleet/overland-safari-truck-hire-kenya", "Overland Safari Truck Hire Kenya"), text(" — Heavy-duty 24-seater 4x4 expedition truck for camping safaris and wilderness research.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Ideal for day trips to Nairobi National Park, Lake Naivasha, and Ol Pejeta.")]
        ]),

        h2("Iconic Safari Destinations Across Kenya"),
        p("Our safari vehicles operate daily across Kenya's world-famous wilderness reserves:"),
        ul([
          [link("/destinations/transport-to-maasai-mara", "Transport to Maasai Mara"), text(" — Witness the Great Wildebeest Migration, river crossings, and incredible lion prides.")],
          [link("/destinations/transport-to-amboseli-national-park", "Transport to Amboseli National Park"), text(" — Giant elephant herds roaming against the iconic backdrop of Mount Kilimanjaro.")],
          [link("/destinations/transport-to-samburu-national-reserve", "Transport to Samburu National Reserve"), text(" — Arid northern wilderness home to the unique Samburu Special Five species.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — East Africa's largest black rhino sanctuary and home to the world's last northern white rhinos.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Thousands of pink flamingos, white and black rhinos, and rare Rothschild giraffes.")],
          [link("/destinations/transport-to-tsavo-east-national-park", "Transport to Tsavo East National Park"), text(" — Vast red-dust savannahs, famous Tsavo red elephants, and Lugard Falls.")],
          [link("/destinations/transport-to-tsavo-west-national-park", "Transport to Tsavo West National Park"), text(" — Mzima Springs underwater hippo viewing and Shetani lava flows.")],
          [link("/destinations/transport-to-meru-national-park", "Transport to Meru National Park"), text(" — Remote, uncrowded riverine wilderness and Elsa the Lioness territory.")]
        ]),

        h2("How to Book Your 4x4 Safari Vehicle"),
        p("Reserving your custom safari vehicle with Ubuntu Logistics is simple:"),
        ul([
          [bold("1. Choose Your Safari Dates: "), text("Provide your travel dates, pickup location in Nairobi, and the national parks you plan to visit.")],
          [bold("2. Select Vehicle Type: "), text("Choose between a 4x4 Safari Land Cruiser or a 4WD Safari Van.")],
          [bold("3. Finalize Your Itinerary: "), text("Our safari logistics team reviews your route, advises on driving times, and confirms all inclusions.")],
          [bold("4. Embark on the Adventure: "), text("Meet your professional safari guide in Nairobi and set off on an unforgettable East African safari.")]
        ]),
        p("Book your 4x4 safari vehicle today with Ubuntu Logistics for the ultimate Kenyan wildlife expedition.")
      ]
    }
  };
}

// 6. Chauffeur Driven Car Hire Nairobi
function getChauffeurDrivenContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Driving through Nairobi's bustling traffic, roundabout intersections, and unfamiliar street networks can be stressful and time-consuming. Ubuntu Logistics provides executive "),
          bold("Chauffeur Driven Car Hire in Nairobi"),
          text(", providing vetted, uniformed, and highly trained personal chauffeurs paired with spotless, modern vehicles. Whether you are a visiting business executive, diplomat, holidaymaker, or local resident needing hassle-free transportation for meetings, dinners, or cross-country road trips, our professional chauffeur service allows you to relax, work, and arrive in total comfort.")
        ]),

        h2("What Our Chauffeur Driven Service Entails"),
        p("Our chauffeur service delivers a full-service executive travel experience that takes complete care of all driving, routing, parking, and vehicle security responsibilities:"),
        ul([
          [bold("Full-Day Vehicle and Driver Disposal: "), text("Have a dedicated chauffeur and vehicle exclusively at your disposal for 8, 10, or 12 hours daily, ready to drive you wherever your schedule demands.")],
          [bold("Corporate and Business Meeting Transit: "), text("Effortless movement between Nairobi's prime commercial hubs — Westlands, Upper Hill, Kilimani, Riverside, Gigiri UN enclave, and Nairobi Central Business District.")],
          [bold("Airport Transfers and VIP Escorts: "), text("Meet-and-greet service at JKIA and Wilson Airport with curbside luggage handling and direct expressway transit.")],
          [bold("Dinner and Evening Function Disposal: "), text("Enjoy evening cocktail parties, fine dining, or diplomatic receptions without the stress of parking or finding late-night transport.")],
          [bold("Inter-County and Upcountry Travel: "), text("Professional chauffeurs ready to drive you safely across Kenya to Naivasha, Nakuru, Nanyuki, Mombasa, Kisumu, and beyond.")],
          [bold("Discreet and Confidential Service: "), text("All our chauffeurs operate under strict non-disclosure policies, ensuring complete privacy for your sensitive business calls and conversations.")]
        ]),

        h2("Transparent Estimated Pricing for Chauffeur Driven Hires"),
        p("We maintain completely transparent pricing in both KES and USD. Rates include the vehicle, professional chauffeur, and standard passenger insurance:"),
        ul([
          [bold("Executive Saloon Car with Chauffeur (8 Hours / 80 km City Use): "), text("KES 6,500 to KES 7,500 ($52 to $60 USD) per day inclusive of driver and city fuel.")],
          [bold("Executive SUV with Chauffeur (Toyota RAV4 / Vanguard / Harrier): "), text("KES 11,000 to KES 13,000 ($88 to $105 USD) per day inclusive of driver.")],
          [bold("Luxury 4x4 SUV with Chauffeur (Toyota Prado TX / TXL): "), text("KES 16,000 to KES 18,000 ($130 to $145 USD) per day with uniformed chauffeur.")],
          [bold("VIP Luxury Mercedes-Benz with Executive Chauffeur: "), text("KES 18,000 to KES 22,000 ($145 to $175 USD) per day in a "), link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class"), text(".")],
          [bold("7-Seater Passenger Van with Chauffeur (Toyota Noah / Voxy): "), text("KES 8,500 to KES 10,000 ($68 to $80 USD) per day for family and group city transit.")],
          [bold("14-Seater Minibus with Chauffeur (Toyota HiAce): "), text("KES 13,000 to KES 15,000 ($105 to $120 USD) per day for corporate team transit.")],
          [bold("Overtime Hourly Rate: "), text("Fair, transparent overtime charge of KES 500 to KES 1,000 ($4 to $8 USD) per hour beyond the agreed daily schedule.")]
        ]),

        h2("What You Can Expect from an Ubuntu Logistics Chauffeur"),
        p("We select and train only the most courteous, skilled, and professional drivers in Kenya. Every chauffeur on our team provides:"),
        ul([
          [bold("Unfailing Punctuality: "), text("Your chauffeur arrives at your residence or hotel at least 15 to 20 minutes before your scheduled departure time.")],
          [bold("Immaculate Professional Appearance: "), text("Smartly dressed in clean corporate uniform with company identification badge.")],
          [bold("Defensive Driving Certification: "), text("Advanced driving skills emphasizing smooth acceleration, gentle braking, and maximum passenger safety.")],
          [bold("In-Depth Street and Navigation Knowledge: "), text("Expert familiarity with Nairobi's bypasses, expressways, security gates, embassy protocols, and traffic shortcuts.")],
          [bold("Luggage and Door Etiquette: "), text("Chauffeurs open doors for passengers, hold umbrellas during rainy weather, and carry all bags with utmost care.")],
          [bold("Background Checked and PSV Licensed: "), text("Every driver is police-cleared with valid Certificate of Good Conduct and official NTSA PSV driver licensing.")]
        ]),

        h2("Onboard Offerings and Chauffeur Amenities"),
        p("We ensure every journey with our chauffeur service is comfortable, productive, and refreshing:"),
        ul([
          [bold("Complimentary Bottled Mineral Water: "), text("Chilled bottled water provided daily for all passengers.")],
          [bold("High-Speed 4G In-Car Wi-Fi: "), text("Fast internet hotspot enabling you to send emails, prepare presentations, or join Zoom meetings on the go.")],
          [bold("Universal Mobile Charging Cables: "), text("High-speed multi-pin charging cables ready for iOS and Android devices.")],
          [bold("Climate-Controlled Cabin: "), text("Fully functional dual-zone air conditioning set to your preferred temperature.")],
          [bold("Daily Sanitation and Cleanliness: "), text("Vehicles are vacuumed, washed, and disinfected before every booking.")],
          [bold("Flexible Multi-Stop Routing: "), text("Direct your chauffeur to make multiple stops throughout the day without pre-scheduling complications.")]
        ]),

        h2("Recommended Fleet for Chauffeur-Driven Car Hire"),
        p("Choose from a wide variety of executive vehicles matched with professional drivers:"),
        ul([
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Smooth, comfortable sedans ideal for daily city errands, business meetings, and solo executives.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Elevated seating, spacious legroom, and high ground clearance for executives and families.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Prestigious 7-seater 4WD SUV for high-level meetings and countrywide road trips.")],
          [link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class Hire"), text(" — The ultimate executive sedan for VIP delegations, weddings, and formal gala dinners.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Spacious passenger van with sliding doors for executive teams and family outings.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-capacity executive shuttles for corporate delegations and conference movements.")]
        ]),

        h2("Popular Destinations and Itineraries with a Private Chauffeur"),
        p("Enjoy stress-free road travel with your private chauffeur to popular destinations across Kenya:"),
        ul([
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Half-day morning game drive with a knowledgeable local driver.")],
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Smooth day trip down the Rift Valley for lakeside meetings or weekend relaxation.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Executive road trip through central Kenya's scenic coffee and tea farms.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — Luxury wildlife safari in a chauffeur-driven 4x4 Prado or Land Cruiser.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Scenic highway trip to explore birdlife and rhino sanctuaries.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Cross-country road transfers or chauffeur services at the Kenyan coast.")]
        ]),

        h2("How to Hire a Chauffeur in Nairobi"),
        p("Booking your private chauffeur with Ubuntu Logistics takes just a few moments and guarantees complete peace of mind:"),
        ul([
          [bold("1. Choose Your Service Hours & Scope: "), text("Select half-day city disposal (4 hours), standard full-day disposal (8-10 hours), or extended multi-day countrywide chauffeur service.")],
          [bold("2. Select Your Vehicle Class: "), text("Pick the executive sedan, luxury SUV, Toyota Prado 4x4, Mercedes-Benz, or passenger van that best fits your itinerary and passenger party.")],
          [bold("3. Receive Instant Chauffeur Confirmation: "), text("Get your chauffeur's direct contact phone number, photo ID, vehicle registration, and clear pickup instructions delivered to your email or WhatsApp in advance.")],
          [bold("4. Sit Back, Work, and Relax: "), text("Meet your chauffeur at your doorstep, hotel lobby, or airport terminal, and travel across Nairobi and Kenya with complete ease, safety, and comfort.")],
          [bold("5. Flexible Payment and Billing: "), text("Pay securely via major credit/debit cards, M-Pesa, bank wire, or receive itemized corporate monthly invoicing.")]
        ]),
        p("Experience the luxury, productivity, and convenience of a dedicated personal chauffeur in Nairobi. Contact Ubuntu Logistics today to reserve your vehicle and driver.")
      ]
    }
  };
}

// 7. Corporate & Staff Transport Kenya
function getCorporateStaffTransportContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Efficient, punctual, and safe employee transit is essential for organizational productivity, staff morale, and overall operational performance. Ubuntu Logistics provides turnkey "),
          bold("Corporate & Staff Transport Solutions in Kenya"),
          text(", serving multinational corporations, commercial banks, non-governmental organizations (NGOs), business process outsourcing (BPO) call centers, manufacturing plants, international schools, and diplomatic missions. From dedicated daily commuter shuttles and late-night shift drop-offs to executive motorpools and large-scale conference fleet logistics, our customized corporate contracts keep your workforce moving safely, comfortably, and on schedule 24 hours a day, 365 days a year.")
        ]),

        h2("What Our Corporate Staff Transport Service Entails"),
        p("Managing company-owned vehicles or coordinating ad-hoc employee transport internally creates major administrative burdens, unexpected maintenance expenses, and severe operational liabilities. Ubuntu Logistics takes over the entire corporate transport lifecycle, providing a dependable, fully outsourced logistics operation with transparent reporting:"),
        ul([
          [bold("Daily Employee Commuter Shuttles: "), text("Scheduled morning pickups and evening drop-offs connecting major residential zones across Nairobi (Kasarani, Rongai, Kitengela, Kikuyu, Thika Road, Eastlands, Ruaka, Ngong, South B/C) directly to corporate office parks.")],
          [bold("24/7 Shift Transport for BPOs and Call Centers: "), text("Door-to-door night shift transport ensuring safe, direct arrivals and departures for late-night customer support, healthcare staff, and data processing teams.")],
          [bold("Executive Business Travel and Motorpools: "), text("Dedicated executive sedans and SUVs on standby for corporate leadership, board directors, client meetings, and commercial site visits.")],
          [bold("Conference, AGM, and Event Delegation Fleets: "), text("End-to-end fleet coordination of 14-seater vans, 22-seater mini-buses, and 33 to 50-seater luxury coaches for annual general meetings, corporate team building, product launches, and international symposiums.")],
          [bold("Intelligent Route Optimization and Geofencing: "), text("Our logistics dispatch team designs optimal pickup cluster routes to minimize employee transit time, reduce fuel consumption, and lower overall corporate transport expenditure.")],
          [bold("Consolidated Monthly Invoicing and Reporting: "), text("Itemized monthly billing with transparent trip logs, employee attendance manifests, fuel consumption records, and key performance indicator (KPI) reports.")],
          [bold("Dedicated Field Operations Supervisors: "), text("On-the-ground transport marshals stationed at your corporate facility during peak shift turnover to oversee smooth passenger boarding and vehicle departures.")]
        ]),

        h2("Transparent Corporate Transport Pricing and Contract Models"),
        p("We offer flexible, cost-effective corporate contract structures designed to match your company's operational budget and cash flow requirements:"),
        ul([
          [bold("Daily Fixed-Route Shuttle (14-Seater Minibus): "), text("KES 9,000 to KES 13,000 ($72 to $105 USD) per shift / day, inclusive of vehicle, driver, fuel, maintenance, and comprehensive passenger liability insurance.")],
          [bold("Daily Fixed-Route Shuttle (22-Seater Mini-Coach): "), text("KES 15,000 to KES 18,000 ($120 to $145 USD) per shift.")],
          [bold("Daily Fixed-Route Shuttle (33-Seater Tour Bus): "), text("KES 20,000 to KES 24,000 ($160 to $190 USD) per shift.")],
          [bold("50-Seater Luxury Coach Full-Day Hire: "), text("KES 38,000 to KES 42,000 ($300 to $330 USD) per day for company-wide retreats and conference delegations.")],
          [bold("Monthly Corporate Retainer Contracts: "), text("Substantial volume discounts for 6-month and 12-month service level agreements (SLAs) with dedicated branded fleets.")],
          [bold("Executive Day-Hire Corporate Account Rate (SUV / Prado): "), text("KES 12,000 to KES 16,000 ($95 to $130 USD) per day on credit account terms.")],
          [bold("Airport VIP Delegation Meet-and-Greet: "), text("KES 4,000 ($32 USD) for executive sedans or KES 10,000 ($80 USD) for 14-seater passenger vans.")],
          [bold("Guaranteed Zero Hidden Costs: "), text("All corporate agreements include comprehensive insurance, routine servicing, driver overtime allowances, and guaranteed backup replacement vehicles.")]
        ]),

        h2("What Your Organization Can Expect (SLA Guarantees)"),
        p("We operate under rigid corporate service level agreements (SLAs) designed to guarantee punctuality, passenger safety, and regulatory compliance:"),
        ul([
          [bold("99.9% On-Time Dispatch Guarantee: "), text("Rigid scheduling controls ensure employees arrive at the workplace well before their shift starts, eliminating shift handover delays.")],
          [bold("Guaranteed Standby Backup Fleet: "), text("In the rare event of mechanical maintenance or a tire puncture, an active replacement vehicle is dispatched immediately from our standby depot within 20 minutes.")],
          [bold("Real-Time GPS Fleet Tracking and Telematics: "), text("Every vehicle is monitored via our 24/7 central GPS dispatch room with automated speed alerts, harsh braking monitoring, geofencing, and live route status updates.")],
          [bold("100% PSV and Regulatory Compliance: "), text("Fully compliant with all National Transport and Safety Authority (NTSA) regulations, speed governors calibrated to 80 km/h, valid commercial PSV inspection stickers, and certified first aid equipment.")],
          [bold("Extensive Passenger Liability Cover: "), text("Multi-million shilling commercial passenger liability insurance coverage protecting all employees throughout their transit.")],
          [bold("Dedicated Corporate Account Manager: "), text("A senior operations manager assigned exclusively to your account, available 24/7 to handle schedule changes, new employee route additions, and emergency requests.")],
          [bold("Driver Vetting and Drug Testing: "), text("All corporate drivers undergo regular background checks, defensive driving refreshers, customer service training, and random alcohol/substance screening.")]
        ]),

        h2("Onboard Offerings and Safety Amenities for Employees"),
        p("We ensure employees travel safely, comfortably, and productively between home and the workplace:"),
        ul([
          [bold("High-Speed Onboard 4G Wi-Fi: "), text("Allows corporate staff to catch up on emails, review morning presentations, or collaborate with team members while commuting.")],
          [bold("Individual USB Smartphone Charging Ports: "), text("Passenger seat USB charging outlets keep employee phones powered throughout the journey.")],
          [bold("Full Climate Control Air Conditioning: "), text("High-capacity dual climate control keeps the cabin fresh, cool, and well-ventilated in all weather conditions.")],
          [bold("Ergonomic High-Back Reclining Seats: "), text("Cushioned, ergonomic seating with generous legroom allows employees to rest and arrive at work energized and ready.")],
          [bold("Daily Sanitization and Deep Cleaning: "), text("Vehicles are vacuumed, washed, and disinfected daily to ensure superior workplace hygiene.")],
          [bold("Professional Uniformed Chauffeurs: "), text("Courteous, vetted drivers wearing clean company uniforms with visible ID badges, trained to treat your employees with utmost respect.")],
          [bold("Digital Passenger Check-In Support: "), text("QR-code or digital roster manifest verification to ensure only authorized company staff board company commuter shuttles.")]
        ]),

        h2("Recommended Fleet for Corporate and Staff Transport"),
        p("Our diverse commercial fleet accommodates organizations of all sizes and operational requirements:"),
        ul([
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-roof Toyota HiAce vans ideal for shift commuter routes, departmental site visits, and project field teams.")],
          [link("/fleet/22-seater-bus-hire-nairobi", "22-Seater Bus Hire Nairobi"), text(" — Mid-size Toyota Coaster and Rosa mini-coaches for medium workforce commuter routes and regional office transfers.")],
          [link("/fleet/tour-bus-coaster-hire-nairobi", "Tour Bus & Coaster Hire Nairobi"), text(" — 33-seater executive buses for large-scale employee transportation, company retreats, and annual sports days.")],
          [link("/fleet/50-seater-luxury-coach-hire-kenya", "50-Seater Luxury Coach Hire Kenya"), text(" — Full-size touring coaches for major corporate conferences, annual general meetings, and company-wide excursions.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Executive 5-seater SUVs for senior leadership, board directors, and visiting overseas investors.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Rugged luxury 4WD SUVs for engineering site inspections, upcountry project management, and VIP executives.")],
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Economical sedans for company sales reps, administrative errands, and individual client pickups.")]
        ]),

        h2("Popular Corporate Routes and Team Building Destinations"),
        p("We transport corporate teams to leading conference, workshop, and retreat venues across Kenya:"),
        ul([
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Prime destination for corporate team building, strategic planning retreats, and executive seminars.")],
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Half-day corporate team retreats, end-of-year staff lunches, and international client entertainment.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — High-altitude leadership workshops, executive retreats, and luxury highland lodge conferences.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Annual staff retreats, conservation workshops, and organizational field expeditions.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — Corporate conservation retreats and wildlife team building experiences.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Company incentive holiday trips and national sales conference shuttles.")]
        ]),

        h2("How to Partner with Ubuntu Logistics for Corporate Transport"),
        p("Transitioning your employee transport to Ubuntu Logistics is seamless and risk-free:"),
        ul([
          [bold("1. Route Assessment & Staff Clustering: "), text("Our operations team reviews your employee residential distribution, shift timings, and fleet volume requirements.")],
          [bold("2. Customized Route and Cost Proposal: "), text("We deliver an optimized route simulation, vehicle allocation plan, and transparent monthly cost proposal.")],
          [bold("3. Two-Week Trial Pilot Program: "), text("Run a 1-to-2 week trial shuttle service to validate punctuality, driver etiquette, and employee satisfaction.")],
          [bold("4. Full Service Launch: "), text("Deploy the dedicated fleet with 24/7 central dispatch monitoring, live GPS tracking, and monthly consolidated invoicing.")]
        ]),
        p("Partner with Ubuntu Logistics today to elevate your corporate transportation in Kenya. Contact our corporate accounts team for a free route consultation.")
      ]
    }
  };
}

// 8. Executive & VIP Transport Nairobi
function getExecutiveVipTransportContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("When privacy, executive prestige, luxury comfort, and flawless security are paramount, Ubuntu Logistics delivers unmatched "),
          bold("Executive & VIP Transport in Nairobi and across Kenya"),
          text(". We cater to visiting heads of state, foreign diplomats, multinational chief executives, high-net-worth individuals, celebrities, and global conference delegations. Our luxury fleet features pristine Mercedes-Benz E-Class and S-Class sedans, Toyota Land Cruiser V8 / 300-Series SUVs, Prado TXLs, and armored luxury vehicles, operated by advanced security-trained chauffeurs familiar with diplomatic motorcades, VIP tarmac airside clearances, and executive close protection protocols.")
        ]),

        h2("What Our Executive & VIP Transport Service Entails"),
        p("Our VIP transport division operates under the highest international standards of executive protocol, discretion, and confidentiality. Here is what our elite service encompasses:"),
        ul([
          [bold("VIP Airport Tarmac & Airside Protocol: "), text("Coordinated executive meet-and-greet right from the aircraft steps or VIP lounge at JKIA and Wilson Airport, with expedited diplomatic clearance and direct tarmac vehicle access.")],
          [bold("Luxury Motorcade and Convoy Coordination: "), text("Multi-vehicle VIP convoys with lead escort vehicles, principal executive vehicles, and discreet security chase cars for smooth, unimpeded city transit.")],
          [bold("Security-Trained Executive Chauffeurs: "), text("All VIP drivers are vetted, background-checked, and certified in advanced defensive driving, counter-surveillance awareness, executive evasive maneuvers, and diplomatic protocol.")],
          [bold("Armored and Luxury Vehicle Options: "), text("Access to certified ballistic-armored B6/B7 luxury SUVs and flagship luxury sedans for high-threat or high-profile security requirements.")],
          [bold("Dedicated Close Protection Integration: "), text("Seamless operational integration with your private executive protection officers, embassy security attachés, or government security details.")],
          [bold("Strict Non-Disclosure Agreements (NDAs): "), text("Complete confidentiality and discretion. Our chauffeurs and dispatch managers adhere to legally binding privacy agreements to protect your sensitive conversations and travel itineraries.")],
          [bold("Dedicated 24/7 Executive Dispatch Desk: "), text("A dedicated senior dispatcher monitoring your motorcade via live satellite tracking with immediate capability to divert routes during unexpected congestion or security alerts.")]
        ]),

        h2("Transparent VIP Transport Pricing and Luxury Fleet Rates"),
        p("We offer transparent daily and hourly VIP rental rates with comprehensive executive inclusions:"),
        ul([
          [bold("Mercedes-Benz E-Class VIP Chauffeur (8 Hours / 80 km): "), text("KES 18,000 to KES 22,000 ($145 to $175 USD) per day with uniformed executive chauffeur and city fuel.")],
          [bold("Toyota Land Cruiser V8 / 300-Series VIP Luxury SUV: "), text("KES 25,000 to KES 30,000 ($200 to $240 USD) per day.")],
          [bold("Toyota Land Cruiser Prado TX / TXL Executive SUV: "), text("KES 15,000 to KES 18,000 ($120 to $145 USD) per day.")],
          [bold("Armored B6 Luxury SUV (Upon Advance Request): "), text("Custom quote based on security assessment and operational itinerary.")],
          [bold("VIP Group Mercedes Sprinter / Luxury Coaster (15-25 Seats): "), text("KES 25,000 to KES 35,000 ($200 to $275 USD) per day with luxury leather captain seats.")],
          [bold("JKIA VIP Airport Meet & Greet (One-Way Luxury Transfer): "), text("KES 12,000 to KES 16,000 ($95 to $130 USD) in Mercedes-Benz or Land Cruiser V8.")],
          [bold("All-Inclusive Executive Inclusions: "), text("Rates include professional chauffeur, fuel within Nairobi, VIP airport parking fees, Nairobi Expressway tolls, and onboard amenities.")],
          [bold("Flexible Overtime Terms: "), text("Transparent hourly overtime rates of KES 1,500 to KES 2,500 ($12 to $20 USD) per hour for evening functions and diplomatic galas.")]
        ]),

        h2("What You Can Expect from Our VIP Division"),
        p("We ensure every VIP transit is executed with military-grade precision and five-star luxury:"),
        ul([
          [bold("Zero Tolerated Delays: "), text("Vehicles arrive in position at least 30 minutes ahead of the scheduled departure time.")],
          [bold("Pristine Vehicle Detailing: "), text("Immaculate showroom condition inside and out, with conditioned leather upholstery and crystal-clear acoustic glass.")],
          [bold("Chauffeur Etiquette and Diplomatic Protocol: "), text("Impeccably dressed chauffeurs in dark tailored suits who understand international diplomatic rank, greeting protocols, and silent privacy.")],
          [bold("Advanced Route Planning and Alternative Corridors: "), text("Every route is surveyed in advance with primary and secondary contingency corridors to avoid congestion or road closures.")],
          [bold("Direct 24/7 Security Operations Center (SOC): "), text("Live satellite tracking and real-time security intelligence monitoring throughout your movement.")],
          [bold("Dedicated Concierge Support: "), text("Immediate handling of itinerary revisions, emergency flight bookings, and luggage logistics.")],
          [bold("Curbside Umbrella and Luggage Protocol: "), text("Chauffeurs provide full luggage handling and umbrella escort during inclement weather, maintaining guest dignity at all times.")]
        ]),

        h2("Elite Onboard Amenities for Executive Clients"),
        p("Our VIP fleet is outfitted with the highest standard of mobile office and luxury amenities:"),
        ul([
          [bold("High-Speed Encrypted 4G Wi-Fi: "), text("Secure, high-bandwidth internet connectivity for confidential business communications and video conferences.")],
          [bold("Chilled Premium Refreshments: "), text("Sealed imported and local artisan mineral water, fresh juices, and refreshment towels in the onboard electric fridge.")],
          [bold("Universal Device Charging Docks: "), text("Rapid multi-device wireless and wired charging pads for smartphones, iPads, and MacBooks.")],
          [bold("Rear Climate and Media Controls: "), text("Independent rear passenger climate control and premium sound isolation for absolute relaxation.")],
          [bold("Privacy Sunshades and Tinted Windows: "), text("High-grade privacy tinting and electronic rear window sunblinds.")],
          [bold("Daily International Newspapers & Magazines: "), text("Complimentary business publications provided upon advance request.")],
          [bold("Onboard 220V Power Inverter: "), text("Continuous clean power for laptop workstations and executive electronic devices.")]
        ]),

        h2("Recommended Fleet for Executive and VIP Travel"),
        p("Explore our flagship luxury vehicles designed for discerning executives and dignitaries:"),
        ul([
          [link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class Hire"), text(" — Flagship luxury sedan for corporate chiefs, diplomatic receptions, and red-carpet galas.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — High-riding luxury 4WD SUV offering commanding road presence and supreme comfort.")],
          [link("/fleet/land-cruiser-hire-kenya", "Land Cruiser Hire Kenya"), text(" — High-spec V8 luxury Land Cruisers built for executive inter-county travel and high-profile visits.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Sleek, versatile luxury SUVs for daily city meetings and airport runs.")],
          [link("/fleet/tour-bus-coaster-hire-nairobi", "Tour Bus & Coaster Hire Nairobi"), text(" — Custom VIP mini-coaches with executive leather captain seating for delegations.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — Executive passenger shuttles for supporting delegation staff and security details.")]
        ]),

        h2("Popular Destinations and VIP Itineraries"),
        p("We manage VIP transfers to Kenya's most prestigious resorts, diplomatic hubs, and safari lodges:"),
        ul([
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Luxury helicopter connections and road transfers to Fairmont Mount Kenya Safari Club and exclusive Laikipia ranches.")],
          [link("/destinations/transport-to-maasai-mara", "Transport to Maasai Mara"), text(" — Private airstrip pickups and VIP transfers to ultra-luxury tented safari camps.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — High-profile private conservation visits and wildlife viewing.")],
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Private VIP game drives in customized Land Cruiser V8s.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — VIP coastal transfers to private beachfront villas and luxury boutique resorts.")],
          [link("/destinations/transport-to-watamu-marine-park", "Transport to Watamu Marine Park"), text(" — Executive oceanfront villa transfers and private coastal retreat transport.")]
        ]),

        h2("How to Reserve Executive & VIP Transport"),
        p("Our dedicated VIP concierge team manages your booking with complete confidentiality:"),
        ul([
          [bold("1. Confidential Consultation: "), text("Contact our VIP director via phone, WhatsApp, or encrypted email with your delegation details and itinerary.")],
          [bold("2. Custom Security and Fleet Plan: "), text("We construct a comprehensive movement plan including vehicle allocations, driver security clearance, and timing.")],
          [bold("3. Protocol Execution: "), text("Our operations team coordinates tarmac access, hotel clearances, and escort logistics.")],
          [bold("4. Flawless Executive Delivery: "), text("Experience seamless, world-class executive transport from arrival to departure.")]
        ]),
        p("Contact Ubuntu Logistics VIP Division today for discreet, prestigious executive transportation across Kenya.")
      ]
    }
  };
}

module.exports = {
  getSafariVehicleHireContent,
  getChauffeurDrivenContent,
  getCorporateStaffTransportContent,
  getExecutiveVipTransportContent
};
