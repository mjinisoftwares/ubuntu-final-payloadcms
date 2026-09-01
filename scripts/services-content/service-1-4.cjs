const { text, bold, link, p, h2, h3, ul } = require('../lexical-helpers.cjs');

// 1. Airport Transfers Nairobi
function getAirportTransfersContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Arriving at "),
          bold("Jomo Kenyatta International Airport (JKIA)"),
          text(" or "),
          bold("Wilson Airport"),
          text(" in Nairobi should be smooth, fast, and completely stress-free. Whether you are landing after a long international flight or catching an early morning domestic flight to the safari parks, Ubuntu Logistics provides private airport transfers tailored to your schedule. We operate 24 hours a day, 7 days a week, offering dedicated meet-and-greet services, modern air-conditioned vehicles, and professional licensed drivers who track your flight in real time.")
        ]),

        h2("What Our Airport Transfer Service Entails"),
        p("Our airport transfer service is built from the ground up to eliminate airport travel anxiety. From the moment you confirm your reservation, our dispatch office assigns a dedicated chauffeur and logs your flight number into our live flight-monitoring system. Here is exactly how our transfer process works step by step:"),
        ul([
          [bold("Live Flight Tracking: "), text("We continuously track your incoming flight status. If your flight lands early or gets delayed by several hours, your pickup time adjusts automatically. You will never pay extra waiting fees for flight delays.")],
          [bold("Warm Meet and Greet at Arrivals: "), text("Once you clear customs and baggage claim, your driver will be waiting in the main arrivals hall holding a personalized name board with your name or company logo.")],
          [bold("Luggage Assistance: "), text("Your driver will greet you warmly, assist with lifting and loading all heavy suitcases into the vehicle trunk, and guide you directly to our reserved parking bay.")],
          [bold("Express Highway Route: "), text("We utilize the Nairobi Expressway whenever appropriate to bypass heavy traffic along Mombasa Road, cutting travel time from JKIA to Westlands, Kilimani, Upper Hill, or Nairobi CBD down to just 15 to 25 minutes.")],
          [bold("Direct Door-to-Door Delivery: "), text("We take you straight to your hotel reception, residential home, Airbnb apartment, or connecting departure terminal at Wilson Airport.")],
          [bold("Curbside Departure Drops: "), text("For outgoing flights, our driver arrives at your hotel or residence 15 minutes before your scheduled departure time, ensuring you arrive at the airport with ample time for check-in and security checks.")]
        ]),

        h2("Transparent Estimated Pricing for Nairobi Airport Transfers"),
        p("We believe in clear, upfront pricing with zero hidden charges. All our airport transfer quotes are fixed and pre-booked. The price you are quoted is the exact price you pay, with no surprise parking fees, fuel surcharges, or baggage fees."),
        ul([
          [bold("Sedan / Saloon Car Transfer (1 to 3 Passengers): "), text("KES 3,500 to KES 4,500 ($28 to $35 USD) each way between JKIA and Nairobi Central, Westlands, Upper Hill, or Kilimani.")],
          [bold("Executive SUV Transfer (1 to 4 Passengers): "), text("KES 7,500 to KES 10,000 ($60 to $80 USD) each way in a luxury "), link("/fleet/suv-hire-nairobi", "Executive SUV"), text(" or "), link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4"), text(".")],
          [bold("Family 7-Seater Passenger Van (1 to 6 Passengers): "), text("KES 6,000 to KES 8,000 ($48 to $65 USD) each way in a spacious "), link("/fleet/7-seater-van-hire-nairobi", "7-Seater Toyota Noah/Voxy"), text(".")],
          [bold("Group 14-Seater Minibus (7 to 13 Passengers): "), text("KES 10,000 to KES 14,000 ($80 to $110 USD) each way in a high-roof "), link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Toyota HiAce Minibus"), text(".")],
          [bold("Executive VIP Mercedes-Benz Transfer: "), text("KES 15,000 to KES 18,000 ($120 to $145 USD) each way in a premium "), link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class"), text(" with uniformed executive chauffeur.")],
          [bold("Inter-Airport Transfer (JKIA to Wilson Airport): "), text("KES 4,000 ($32 USD) in standard sedan or KES 6,500 ($52 USD) in a 7-seater van.")]
        ]),
        p("All rates include airport parking fees, fuel, driver allowances, and Nairobi Expressway toll charges unless specified otherwise."),

        h2("What You Can Expect on Every Trip"),
        p("We hold our drivers and vehicles to the highest service standards in Kenya. When you book an airport transfer with Ubuntu Logistics, you can expect:"),
        ul([
          [bold("Guaranteed Punctuality: "), text("Your driver will always be in position at least 20 minutes before your landing or scheduled hotel pickup time.")],
          [bold("Spotless, Sanitized Vehicles: "), text("Every vehicle undergoes thorough interior vacuuming, exterior washing, and air conditioning sanitization prior to each transfer.")],
          [bold("Professional English-Speaking Drivers: "), text("All our drivers are background-checked, vetted, PSV-badged by the National Transport and Safety Authority (NTSA), and trained in defensive driving.")],
          [bold("Complimentary Child Safety Seats: "), text("Traveling with infants or toddlers? We provide clean baby car seats and booster seats at no extra charge upon advance request.")],
          [bold("Flight Delay Protection: "), text("If your flight gets diverted or delayed by multiple hours, our dispatch team reschedules your pickup seamlessly without cancellation penalties.")],
          [bold("Emergency Backup Guarantee: "), text("Our 24/7 central dispatch maintains active standby vehicles across Nairobi to handle unexpected travel disruptions instantly.")]
        ]),

        h2("Our Onboard Offerings and Amenities"),
        p("We turn a routine airport ride into a refreshing and productive journey. Every vehicle in our airport transfer fleet comes equipped with premium travel amenities:"),
        ul([
          [bold("Complimentary Bottled Mineral Water: "), text("Cold, sealed 500ml mineral water bottles are provided for all arriving passengers to refresh after a long flight.")],
          [bold("Fast Onboard 4G Wi-Fi: "), text("Connect immediately to our complimentary in-vehicle Wi-Fi to message your family, check emails, or notify business colleagues of your arrival.")],
          [bold("Rapid Mobile Charging Ports: "), text("Multi-cable charging docks compatible with iPhone Lightning, USB Type-C, and Micro-USB are available at every seat.")],
          [bold("Climate-Controlled Cabin: "), text("Dual-zone air conditioning ensures you remain cool and comfortable regardless of Nairobi's weather outside.")],
          [bold("Digital Payment Options: "), text("We accept all major credit cards, M-Pesa, bank wire transfers, and cash in KES, USD, EUR, or GBP.")]
        ]),

        h2("Recommended Fleet for Nairobi Airport Pickups"),
        p("We maintain a diverse fleet of well-maintained vehicles to suit solo executives, family holidaymakers, and large conference delegations:"),
        ul([
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Compact, fuel-efficient sedans ideal for 1 to 3 passengers with 2 medium suitcases.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Spacious 5-seater SUVs offering high ground clearance and generous luggage boot space.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4 Hire"), text(" — Robust 7-seater luxury 4WD SUVs perfect for business executives and upcountry road transfers.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Comfortable Toyota Noah and Voxy minivans with sliding doors for easy family boarding.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-roof Toyota HiAce minibuses with generous luggage space for tour groups and corporate teams.")],
          [link("/fleet/tour-bus-coaster-hire-nairobi", "Tour Bus & Coaster Hire Nairobi"), text(" — 25 to 33-seater luxury mini-coaches for large conference delegations and international tour groups.")]
        ]),

        h2("Popular Destinations and Connecting Routes from JKIA"),
        p("Many of our airport transfer clients travel directly from JKIA or Wilson Airport to popular tourist destinations and safari lodges across Kenya:"),
        ul([
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Catch a morning safari game drive straight from the airport terminal (only 15 minutes away).")],
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Direct 2-hour scenic highway transfer to Great Rift Valley lakeside resorts.")],
          [link("/destinations/transport-to-maasai-mara", "Transport to Maasai Mara"), text(" — Overland safari transfer or Wilson Airport drop-off for bush flights to the Mara.")],
          [link("/destinations/transport-to-amboseli-national-park", "Transport to Amboseli National Park"), text(" — Smooth 4-hour highway drive to the foot of Mount Kilimanjaro.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — 3.5-hour direct highway transfer to central highland lodges and mountain climbing bases.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Connecting transfers to the Nairobi SGR Terminus for fast train rides to the Kenyan coast.")]
        ]),

        h2("How to Book Your Nairobi Airport Transfer in 4 Easy Steps"),
        p("Booking your private airport transfer with Ubuntu Logistics takes less than two minutes:"),
        ul([
          [bold("Step 1 - Share Flight Details: "), text("Provide your arrival flight number, landing date, passenger count, and destination hotel.")],
          [bold("Step 2 - Choose Your Vehicle: "), text("Select the vehicle size that best fits your luggage and passenger needs (Sedan, SUV, Van, or Minibus).")],
          [bold("Step 3 - Instant Confirmation: "), text("Receive an instant booking voucher containing your driver's direct contact details, vehicle registration number, and clear pickup instructions.")],
          [bold("Step 4 - Stress-Free Arrival: "), text("Land in Nairobi, meet your smiling driver in the arrivals hall, and enjoy a smooth, air-conditioned ride to your destination.")]
        ]),
        p("Experience the difference of a dependable, professional airport transfer service in Nairobi. Contact Ubuntu Logistics today to reserve your vehicle.")
      ]
    }
  };
}

// 2. Hotel Transfers Nairobi
function getHotelTransfersContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Navigating between hotels, conference centers, embassies, and fine dining restaurants across Nairobi requires dependable, punctual, and comfortable transportation. Ubuntu Logistics provides specialized "),
          bold("Hotel Transfers in Nairobi"),
          text(", offering seamless point-to-point transfers, inter-hotel relocations, dinner disposal services, and corporate meeting shuttles. Whether staying at a five-star hotel in Nairobi CBD, an executive lodge in Westlands, or a tranquil boutique retreat in Karen, our chauffeurs ensure you arrive on time, every time.")
        ]),

        h2("What Our Hotel Transfer Service Entails"),
        p("Our hotel transfer service is designed for business travelers, conference attendees, holidaymakers, and event organizers who need reliable door-to-door transit without the hassle of street hailing or unpredictable ride-sharing apps. Here is what our service covers:"),
        ul([
          [bold("Lobby Meet and Greet: "), text("Your driver checks in directly with the hotel concierge or bell desk, holding a discreet name board or waiting at the vehicle drop-off zone ready to assist you.")],
          [bold("Inter-Hotel Relocations: "), text("Moving between hotels across Nairobi or heading to upcountry safari lodges? We coordinate smooth luggage loading and direct transfer to your next accommodation.")],
          [bold("Meeting and Conference Shuttles: "), text("Punctual transport between your hotel and major business hubs including the Kenyatta International Convention Centre (KICC), UN Complex in Gigiri, Upper Hill financial district, and Westlands business towers.")],
          [bold("Dinner and Evening Disposal: "), text("Enjoy fine dining at Nairobi's renowned restaurants without worrying about evening parking or hailing late-night transport. Your driver remains on standby throughout your meal and drops you safely back at your hotel.")],
          [bold("Shopping and City Excursions: "), text("Flexible multi-stop transfers to the Maasai Market, Giraffe Centre, Karen Blixen Museum, and leading shopping malls like Village Market, Two Rivers, and Sarit Centre.")],
          [bold("Concierge Coordination: "), text("We collaborate directly with hotel guest relation managers and travel desks to ensure exact pickup timing aligned with your daily itinerary.")]
        ]),

        h2("Estimated Rates and Transparent Pricing for Hotel Transfers"),
        p("We maintain completely transparent rates with no surge pricing during rush hour or rainy weather:"),
        ul([
          [bold("Standard Point-to-Point City Transfer (Sedan): "), text("KES 2,500 to KES 3,500 ($20 to $28 USD) for transfers between Westlands, CBD, Kilimani, and Upper Hill.")],
          [bold("Cross-Town Transfer to Karen / Gigiri (Sedan): "), text("KES 3,500 to KES 4,500 ($28 to $35 USD) each way.")],
          [bold("Executive SUV City Transfer (1 to 4 Passengers): "), text("KES 6,000 to KES 8,000 ($48 to $65 USD) in a luxury "), link("/fleet/suv-hire-nairobi", "Executive SUV"), text(" or "), link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX 4x4"), text(".")],
          [bold("Full-Day Nairobi City Disposal (8 Hours / 80 km): "), text("KES 6,500 ($52 USD) for Sedans, KES 12,000 ($95 USD) for 7-Seater Vans, or KES 15,000 ($120 USD) for Executive SUVs.")],
          [bold("Evening Dinner Disposal (4 Hours Standby): "), text("KES 4,500 ($36 USD) in sedan or KES 7,500 ($60 USD) in executive SUV, including wait time.")],
          [bold("Group Hotel Shuttle in 14-Seater Minibus: "), text("KES 8,000 to KES 12,000 ($65 to $95 USD) per transfer in a "), link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus"), text(".")]
        ]),
        p("All prices include fuel, driver allowances, and standard parking fees. Custom corporate billing and monthly invoicing are available for regular corporate hotel bookings."),

        h2("What You Can Expect on Every Hotel Transfer"),
        p("When you step into an Ubuntu Logistics vehicle from your hotel, you receive a world-class hospitality experience:"),
        ul([
          [bold("Zero Waiting Time: "), text("Our chauffeur arrives at your hotel driveway 15 minutes before the scheduled pickup time.")],
          [bold("Impeccable Vehicle Presentation: "), text("Spotlessly clean, polished, non-smoking vehicles equipped with fresh interior scents and working climate control.")],
          [bold("Knowledgeable Local Drivers: "), text("Our drivers have intimate knowledge of Nairobi's streets, smart navigation shortcuts, and security protocols across all major neighborhoods.")],
          [bold("Complete Privacy and Discretion: "), text("Conduct private business calls or relax quietly during your transit in total confidentiality.")],
          [bold("Comprehensive Luggage Care: "), text("Full curbside assistance with loading, securing, and unloading your travel bags, shopping items, or conference materials.")],
          [bold("Child and Senior Friendly: "), text("Gentle boarding assistance, smooth defensive driving, and infant car seats provided upon advance notice.")]
        ]),

        h2("Onboard Offerings and Guest Amenities"),
        p("Every hotel transfer includes premium amenities to keep you refreshed and connected on the go:"),
        ul([
          [bold("Complimentary Bottled Mineral Water: "), text("Chilled, sealed mineral water bottles provided for all passengers.")],
          [bold("High-Speed 4G In-Car Wi-Fi: "), text("Enjoy fast, uninterrupted internet connectivity for emails, video calls, or social media browsing.")],
          [bold("Universal Smartphone Charging: "), text("Multi-port charging cables ready for all Android, iPhone, and tablet devices.")],
          [bold("Air-Conditioned Comfort: "), text("Customizable climate control to match your personal temperature preference.")],
          [bold("Flexible Route Changes: "), text("Need to make a quick stop at a pharmacy, currency exchange booth, or coffee shop? Your driver accommodates reasonable route adjustments gladly.")]
        ]),

        h2("Recommended Fleet for Hotel and Event Transfers"),
        p("Choose the ideal vehicle for your personal style, party size, and luggage requirements:"),
        ul([
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Ideal for solo business travelers and couples seeking fast, economical city transit.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — High-riding luxury SUVs offering superior comfort and elevated road visibility.")],
          [link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class Hire"), text(" — Executive prestige for VIP gala dinners, embassy meetings, and red-carpet events.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Passenger Van Hire"), text(" — Perfect for family groups staying in Nairobi with multi-stop shopping or sightseeing plans.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-capacity shuttles for corporate teams moving between hotels and conference centers.")],
          [link("/fleet/22-seater-bus-hire-nairobi", "22-Seater Bus Hire Nairobi"), text(" — Spacious mini-coaches for wedding guests, delegation dinners, and group airport connections.")]
        ]),

        h2("Popular Destinations and Excursions from Nairobi Hotels"),
        p("Make the most of your stay in Nairobi with easy day trips and excursions directly from your hotel:"),
        ul([
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Half-day morning or afternoon wildlife safari right at the edge of the city.")],
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Day trip to Crescent Island, boat safaris, and lakeside fresh fish dining.")],
          [link("/destinations/transport-to-hells-gate-national-park", "Transport to Hell's Gate National Park"), text(" — Cycling alongside zebras and hiking through dramatic geothermal gorges.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru National Park"), text(" — Full-day tour to see endangered rhinos and flamingos.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Weekend mountain retreats and fresh highland air.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — Visit the world's last two northern white rhinos and chimpanzee sanctuary.")]
        ]),

        h2("How to Book Hotel Transfers with Ubuntu Logistics"),
        p("Booking hotel transport with us is fast and simple:"),
        ul([
          [bold("1. Provide Your Hotel Details: "), text("Tell us your hotel name, room number or main lobby pickup, departure time, and destination.")],
          [bold("2. Pick Your Vehicle: "), text("Choose from executive sedans, luxury SUVs, family vans, or group minibuses.")],
          [bold("3. Receive Driver Details: "), text("Get your driver's name, phone number, and vehicle registration via WhatsApp or email prior to pickup.")],
          [bold("4. Ride in Total Comfort: "), text("Meet your chauffeur at the hotel driveway and enjoy a prompt, stress-free transfer.")]
        ]),
        p("Contact Ubuntu Logistics today for punctual, luxurious hotel transfers across Nairobi.")
      ]
    }
  };
}

// 3. Car Hire Nairobi
function getCarHireContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Looking for reliable, affordable, and flexible "),
          bold("Car Hire in Nairobi"),
          text("? Ubuntu Logistics provides modern, meticulously maintained vehicles for self-drive and chauffeur-driven rental across Kenya. Whether you need an economical sedan for daily city errands, an executive SUV for corporate meetings, or a rugged 4WD for upcountry adventures, our transparent rental terms, competitive rates, and 24/7 roadside assistance ensure total peace of mind.")
        ]),

        h2("What Our Car Hire Service Entails"),
        p("We believe renting a car should be simple, transparent, and free of hidden conditions. Our car hire service offers flexible options tailored to your specific travel needs:"),
        ul([
          [bold("Self-Drive Car Hire: "), text("Enjoy complete independence and privacy. Take the wheel of our modern, fuel-efficient vehicles with valid driving license documentation and simple security deposit terms.")],
          [bold("Chauffeur-Driven Car Hire: "), text("Relax in the back seat and let our professional, vetted drivers navigate Nairobi's traffic, road network, and parking while you focus on your work or leisure.")],
          [bold("Short-Term Daily Rentals: "), text("Flexible 24-hour daily car hire for weekend getaways, day trips, family outings, and temporary city transit.")],
          [bold("Long-Term Monthly Leasing: "), text("Discounted corporate and personal monthly vehicle leases with full scheduled maintenance, comprehensive insurance, and replacement vehicle guarantees.")],
          [bold("Free Doorstep Vehicle Delivery: "), text("We deliver your rental vehicle directly to your hotel, residence, office, or JKIA terminal and collect it when your hire period ends.")],
          [bold("Cross-County Travel Freedom: "), text("All our rental cars are licensed for countrywide travel across all 47 counties in Kenya with unlimited mileage packages available.")]
        ]),

        h2("Estimated Pricing and Rental Rates in Nairobi"),
        p("We pride ourselves on offering fair, competitive car rental rates in both Kenya Shillings (KES) and US Dollars (USD):"),
        ul([
          [bold("Economy Saloon Cars (Toyota Axio, Premio, Fielder): "), text("KES 4,000 to KES 5,000 ($32 to $40 USD) per day self-drive, or KES 6,500 to KES 7,500 ($52 to $60 USD) per day with a driver.")],
          [bold("Compact & Executive SUVs (Toyota RAV4, Vanguard, Harrier): "), text("KES 8,000 to KES 10,000 ($65 to $80 USD) per day self-drive, or KES 12,000 ($95 USD) per day with a driver.")],
          [bold("Full-Size Luxury 4x4 SUVs (Toyota Prado TX / TXL): "), text("KES 13,000 to KES 15,000 ($105 to $120 USD) per day self-drive, or KES 17,000 ($135 USD) per day with a driver.")],
          [bold("Executive VIP Sedans (Mercedes-Benz E-Class): "), text("KES 18,000 ($145 USD) per day (chauffeur-driven only).")],
          [bold("7-Seater Passenger Vans (Toyota Noah / Voxy): "), text("KES 7,500 to KES 9,000 ($60 to $72 USD) per day with a driver.")],
          [bold("Heavy-Duty Safari 4x4 Land Cruisers: "), text("KES 22,000 to KES 25,000 ($175 to $200 USD) per day with a certified safari guide-driver.")]
        ]),
        p("Weekly rentals receive a 10% discount, and monthly leases enjoy up to 25% savings. Rates include comprehensive commercial insurance, 24/7 roadside assistance, and standard routine maintenance."),

        h2("What You Can Expect When Renting with Us"),
        p("When you hire a vehicle from Ubuntu Logistics, you receive guaranteed reliability, safety, and transparency:"),
        ul([
          [bold("Meticulous Vehicle Condition: "), text("Every car undergoes a strict 40-point safety inspection covering brakes, tire tread, fluid levels, suspension, and air conditioning before handover.")],
          [bold("Full Comprehensive Insurance: "), text("All rental vehicles carry comprehensive commercial insurance coverage, passenger liability, and third-party protection.")],
          [bold("Transparent Fuel Policy: "), text("We operate a fair full-to-full or same-level fuel policy. You return the car with the same fuel level you received.")],
          [bold("24/7 Roadside Assistance: "), text("In the unlikely event of a flat tire, battery discharge, or mechanical issue anywhere in Kenya, our recovery network provides immediate roadside support or a replacement vehicle.")],
          [bold("Quick Handover Process: "), text("No endless paperwork. Complete digital vehicle inspection with photo documentation in under 10 minutes.")],
          [bold("Clean, Non-Smoking Interiors: "), text("Fresh, sanitized, odor-free vehicle cabins for maximum driving comfort.")]
        ]),

        h2("Included Offerings and Driver Services"),
        p("We provide high-value extras with every car hire booking:"),
        ul([
          [bold("Professional Chauffeurs: "), text("Experienced, courteous, background-vetted drivers who understand Kenya's highway code and local city traffic patterns.")],
          [bold("Complimentary Bottled Water: "), text("Fresh mineral water bottles provided for chauffeur-driven hires.")],
          [bold("Child Safety Seats: "), text("Forward-facing and rear-facing baby car seats available upon advance request.")],
          [bold("Mobile Charging Accessories: "), text("Universal 12V USB car chargers and phone dashboard mounts provided in self-drive cars.")],
          [bold("Flexible Payment Options: "), text("Pay seamlessly via Credit/Debit Card, M-Pesa Till, Bank Transfer, or Cash.")],
          [bold("Clean Security Deposit Refund: "), text("Security deposits are refunded promptly upon vehicle return without unnecessary delays.")]
        ]),

        h2("Recommended Fleet for Car Hire in Nairobi"),
        p("Explore our complete selection of rental vehicles suited for every journey:"),
        ul([
          [link("/fleet/saloon-car-hire-nairobi", "Saloon Car Hire Nairobi"), text(" — Fuel-efficient sedans ideal for daily city driving, meetings, and airport runs.")],
          [link("/fleet/suv-hire-nairobi", "Executive SUV Hire Nairobi"), text(" — Versatile 5-seater SUVs built for comfort on tarmac highways and gravel roads.")],
          [link("/fleet/toyota-prado-tx-hire-nairobi", "Toyota Prado TX Hire Nairobi"), text(" — 7-seater 4x4 power and luxury for upcountry safaris and corporate field missions.")],
          [link("/fleet/mercedes-benz-hire-nairobi", "Mercedes-Benz E-Class Hire"), text(" — Executive luxury for diplomats, wedding ceremonies, and VIP events.")],
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Family-friendly passenger vans with spacious seating and folding luggage bays.")],
          [link("/fleet/land-cruiser-hire-kenya", "Land Cruiser Hire Kenya"), text(" — Custom 4x4 safari expedition vehicles built for national parks and rough bush trails.")]
        ]),

        h2("Popular Destinations for Road Trips from Nairobi"),
        p("Our rental cars are ready to take you to Kenya's most iconic destinations:"),
        ul([
          [link("/destinations/transport-to-nairobi-national-park", "Transport to Nairobi National Park"), text(" — Quick half-day wildlife drive right outside the city center.")],
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — Scenic 90-minute highway drive down the Great Rift Valley escarpment.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Smooth 2.5-hour highway drive to see rhinos and birdlife.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — 3.5 hours on smooth dual-carriageway tarmac through lush central highlands.")],
          [link("/destinations/transport-to-ol-pejeta-conservancy", "Transport to Ol Pejeta Conservancy"), text(" — 4WD wildlife adventure to see the Big Five.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Coastal road trips or coastal resort runabout rentals.")]
        ]),

        h2("Requirements to Rent a Car in Kenya"),
        p("Renting a car with Ubuntu Logistics requires only a few basic documents and simple verification:"),
        ul([
          [bold("For Self-Drive Rentals: "), text("Valid National ID card or International Passport, valid Driver's License held for at least 2 consecutive years, minimum driver age of 23 years, and a standard refundable security deposit.")],
          [bold("For Chauffeur-Driven Rentals: "), text("No driver's license, security deposit, or driving history check required! Simply provide your pickup schedule, destination, and passenger count.")],
          [bold("International Visitors: "), text("National driving licenses printed in English or International Driving Permits (IDP) are fully recognized and valid on all roads across Kenya.")],
          [bold("Fuel and Mileage Policies: "), text("All self-drive vehicles come with standard full-to-full fuel handover. Unlimited mileage applies to all multi-day rentals within Kenyan territory.")],
          [bold("Cross-Border Permits: "), text("Traveling to Tanzania or Uganda? We provide COMESA yellow card insurance, motor vehicle logbook certified copies, and cross-border COMESA authority permits upon 48-hour advance notice.")]
        ]),
        p("Book your car hire in Nairobi today with Ubuntu Logistics for transparent rates, spotless cars, guaranteed reliability, and 24/7 customer support.")
      ]
    }
  };
}

// 4. Van Hire Nairobi
function getVanHireContent() {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [
        p([
          text("Planning a family holiday, corporate team outing, wedding guest shuttle, or group safari in Kenya? Ubuntu Logistics offers premier "),
          bold("Van Hire in Nairobi"),
          text(", featuring modern 7-seater, 10-seater, and 14-seater passenger vans with experienced professional drivers. Avoid the hassle of coordinating multiple small cars. Our spacious, air-conditioned vans keep your entire group together, comfortable, and on schedule across Kenya's roads.")
        ]),

        h2("What Our Van Hire Service Entails"),
        p("Traveling as a group requires space, comfort, safety, and reliability. Our van hire service delivers a complete transportation solution with dedicated commercial chauffeurs:"),
        ul([
          [bold("Versatile Van Fleet Sizes: "), text("Choose from compact 7-seater Toyota Noah/Voxy minivans, 10-seater Toyota HiAce safari vans with pop-up game-viewing roofs, and 14-seater high-roof passenger minibuses.")],
          [bold("Professional PSV Drivers: "), text("Every van comes with an experienced, courteous driver holding certified PSV licensing, clean driving records, and thorough knowledge of Kenyan routes.")],
          [bold("Ample Luggage Capacity: "), text("Generous boot space plus heavy-duty rooftop luggage racks and rear cargo bays to comfortably transport all group suitcases, camping gear, or camera equipment.")],
          [bold("Door-to-Door Pickup and Drop-off: "), text("We pick up your group directly from your hotel, residence, office building, or JKIA terminal and drop everyone back safely at the end of the trip.")],
          [bold("Flexible Multi-Day Road Trips: "), text("Rent by the day or book complete multi-day overland tours across the Great Rift Valley, Mount Kenya, Tsavo, and the Kenyan coast.")],
          [bold("Custom Event Shuttling: "), text("Continuous shuttle loops between hotels, churches, reception venues, and airports for weddings, ruracio dowry ceremonies, and conferences.")]
        ]),

        h2("Estimated Daily Rates and Transparent Van Hire Pricing"),
        p("We provide clear, honest pricing with no hidden costs. Our van hire rates include the vehicle, professional driver, and comprehensive passenger insurance:"),
        ul([
          [bold("7-Seater Passenger Van (Toyota Noah / Voxy): "), text("KES 7,500 to KES 9,000 ($60 to $72 USD) per day for Nairobi city use, or KES 9,000 to KES 11,000 ($72 to $88 USD) per day for upcountry travel.")],
          [bold("10-Seater Safari Tour Van (4WD Toyota HiAce with Pop-Up Roof): "), text("KES 12,000 to KES 14,000 ($95 to $110 USD) per day with a KPSGA-certified driver-guide.")],
          [bold("14-Seater High-Roof Minibus (Toyota HiAce Shark/Drone): "), text("KES 12,000 to KES 15,000 ($95 to $120 USD) per day for Nairobi and upcountry highway travel.")],
          [bold("22-Seater Mini-Coach Bus (Toyota Coaster / Rosa): "), text("KES 18,000 to KES 22,000 ($145 to $175 USD) per day for larger group excursions.")],
          [bold("One-Way Van Airport Transfer (JKIA to Hotel): "), text("KES 6,000 ($48 USD) for 7-seater van or KES 10,000 ($80 USD) for 14-seater minibus.")],
          [bold("Full-Day Nairobi City Disposal (8 Hours / 80 km): "), text("KES 8,500 ($68 USD) for 7-seater van or KES 13,000 ($105 USD) for 14-seater van, including driver and city fuel.")]
        ]),
        p("For multi-day upcountry hires, fuel is typically covered by the client (or provided as a convenient all-inclusive package), and driver overnight accommodation allowances are modest and transparent."),

        h2("What You Can Expect on Every Van Journey"),
        p("We maintain strict quality control across our entire passenger van fleet:"),
        ul([
          [bold("Supreme Group Comfort: "), text("High-roof cabins, cushioned reclining seats, ample legroom, and wide aisles allow passengers of all ages to travel without fatigue.")],
          [bold("High-Performance Air Conditioning: "), text("Dual front and rear climate control systems with overhead vents keep the entire cabin cool on hot savannah roads.")],
          [bold("Safety First: "), text("All passenger seats are fitted with functional seatbelts, speed governors set to 80 km/h as required by NTSA, first aid kits, and fire extinguishers.")],
          [bold("Punctual and Friendly Drivers: "), text("Our drivers arrive 20 minutes before departure, handle luggage loading with care, and maintain courteous, professional etiquette.")],
          [bold("Scenic Rest Stop Knowledge: "), text("Our drivers know the cleanest highway washrooms, scenic viewpoints, and quality lunch stopovers across Kenya.")],
          [bold("Emergency Backup Guarantee: "), text("In the rare event of a breakdown, our nationwide support network dispatches a replacement van promptly.")]
        ]),

        h2("Included Van Offerings and Onboard Amenities"),
        p("Keep your group entertained, connected, and hydrated throughout the journey:"),
        ul([
          [bold("Complimentary Chilled Bottled Water: "), text("Sealed mineral water provided for all passengers on long-distance and safari trips.")],
          [bold("Fast Onboard 4G Wi-Fi: "), text("Shared in-vehicle Wi-Fi hotspot so passengers can browse, stream music, and post photos along the way.")],
          [bold("Multiple Mobile USB Charging Ports: "), text("Charge smartphones, action cameras, and tablets on the move.")],
          [bold("Beverage Cooler Box: "), text("Large insulated cooler boxes (or electric car fridges) to keep your drinks, juices, and snacks chilled.")],
          [bold("Pop-Up Observation Roof (Safari Vans): "), text("High-lift elevating roof for 360-degree standing wildlife photography in national parks.")],
          [bold("Audio Sound System: "), text("High-quality sound system with Bluetooth and AUX connectivity for your group's custom road trip playlists.")]
        ]),

        h2("Recommended Fleet Options for Van Hire"),
        p("Explore our complete selection of vans and group transport vehicles:"),
        ul([
          [link("/fleet/7-seater-van-hire-nairobi", "7-Seater Van Hire Nairobi"), text(" — Compact, comfortable Toyota Noah/Voxy minivans for small families and airport pickups.")],
          [link("/fleet/10-seater-van-matatu-hire-nairobi", "10-Seater Safari Van Hire"), text(" — 4WD HiAce vans with pop-up roofs, built specifically for safari game drives.")],
          [link("/fleet/14-seater-minibus-hire-nairobi", "14-Seater Minibus Hire Nairobi"), text(" — High-roof Toyota HiAce vans for corporate teams, wedding groups, and conference shuttles.")],
          [link("/fleet/22-seater-bus-hire-nairobi", "22-Seater Bus Hire Nairobi"), text(" — Medium-sized luxury mini-coaches with PA systems and large luggage boots.")],
          [link("/fleet/tour-bus-coaster-hire-nairobi", "Tour Bus & Coaster Hire Nairobi"), text(" — 25 to 33-seater executive buses for large groups and institutional field trips.")],
          [link("/fleet/wheelchair-accessible-van-hire-nairobi", "Wheelchair Accessible Van Hire"), text(" — Purpose-built vans with hydraulic lifts and Q-Straint wheelchair tie-downs.")]
        ]),

        h2("Popular Group Destinations and Van Road Trips"),
        p("Our vans regularly travel to top tourist, conference, and team-building destinations:"),
        ul([
          [link("/destinations/transport-to-lake-naivasha", "Transport to Lake Naivasha"), text(" — 90-minute drive for team building, boat safaris, and lakeside conferences.")],
          [link("/destinations/transport-to-hells-gate-national-park", "Transport to Hell's Gate National Park"), text(" — Group cycling, rock climbing at Fischer's Tower, and natural spa swimming.")],
          [link("/destinations/transport-to-lake-nakuru-national-park", "Transport to Lake Nakuru"), text(" — Full-day group wildlife safaris to see rhinos, lions, and flamingos.")],
          [link("/destinations/transport-to-maasai-mara", "Transport to Maasai Mara"), text(" — Multi-day overland safari road trips to the world-famous savannah reserve.")],
          [link("/destinations/transport-to-amboseli-national-park", "Transport to Amboseli National Park"), text(" — Unbeatable views of Mount Kilimanjaro and giant elephant herds.")],
          [link("/destinations/transport-to-mount-kenya", "Transport to Mount Kenya & Nanyuki"), text(" — Group mountain climbing expeditions and highland country retreats.")],
          [link("/destinations/transport-to-diani-beach-mombasa", "Transport to Diani Beach & Mombasa"), text(" — Overland family road trips to coastal white sand beaches.")]
        ]),

        h2("How to Reserve Your Van in Nairobi"),
        p("Booking a passenger van with Ubuntu Logistics is fast and guaranteed:"),
        ul([
          [bold("1. Tell Us Your Group Size and Route: "), text("Share your travel dates, passenger count, luggage volume, and destination itinerary.")],
          [bold("2. Select Your Preferred Van: "), text("Choose between a 7-seater, 10-seater safari 4WD, or 14-seater high-roof minibus.")],
          [bold("3. Receive a Transparent Fixed Quote: "), text("Get an all-inclusive quotation with driver, vehicle, and insurance terms clearly outlined.")],
          [bold("4. Enjoy Your Group Road Trip: "), text("Your professional driver arrives promptly at your pickup point ready for a smooth, enjoyable journey.")]
        ]),
        p("Get in touch with Ubuntu Logistics today to book the best van hire in Nairobi.")
      ]
    }
  };
}

module.exports = {
  getAirportTransfersContent,
  getHotelTransfersContent,
  getCarHireContent,
  getVanHireContent
};
