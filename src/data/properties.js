/**
 * Vision of Excellence — Demo Property Portfolio
 * 
 * NOTE FOR CLIENT / DEVELOPER:
 * This file is the SINGLE SOURCE OF TRUTH for all property listings across:
 * - /properties (main discovery catalog & filter system)
 * - /properties/:id (property detail experience & categorized gallery)
 * - /invest (investment advisory & opportunities showcase)
 * 
 * To replace demo listings with verified client listings, simply update
 * or replace the objects in the DEMO_PROPERTIES array below. No UI
 * refactoring or component rebuilding is needed.
 */

export const DEMO_PROPERTIES = [
  {
    id: "palm-residence",
    name: "Palm Residence",
    location: "Palm Jumeirah",
    area: "Palm Jumeirah Frond M",
    type: "Villa",
    transaction: "buy",
    price: 8500000,
    priceDisplay: "AED 8,500,000",
    bedrooms: 4,
    bathrooms: 5,
    size: 4500,
    sizeDisplay: "4,500 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 5.2,
    highlights: ["Private Beach Access", "Infinity Lap Pool", "Sunset Marina Skyline View", "2 Covered Parking"],
    description: "An architectural waterfront sanctuary set on the private fronds of Palm Jumeirah. Crafted with brushed limestone, double-height glazing, and seamless indoor-outdoor terraces opening directly onto crystalline waters.",
    overview: "Set along an exclusive residential frond, Palm Residence pairs understated European minimalism with panoramic open-water vistas. Floor-to-ceiling retractable glass opens to private beach frontage, an outdoor sunken lounge, and a travertine-clad pool deck.",
    specs: {
      "Property ID": "VOE-PJ-085",
      "Property Type": "Private Waterfront Villa",
      "Plot Size": "6,800 Sq.Ft.",
      "Built-Up Area": "4,500 Sq.Ft.",
      "Furnishing": "Designer Turnkey Furnished",
      "Ownership": "Freehold Title (100% Foreign Ownership)",
      "Parking": "2 Secure Covered Bays",
      "Completion": "Ready for Immediate Handover"
    },
    locationHighlights: [
      { landmark: "Private Frond Beach", time: "Direct Access" },
      { landmark: "Nakheel Mall & The Pointe", time: "5 min" },
      { landmark: "Dubai Marina & JBR", time: "12 min" },
      { landmark: "Downtown & Burj Khalifa", time: "22 min" },
      { landmark: "Dubai International Airport (DXB)", time: "28 min" }
    ],
    amenities: [
      "Private Beach",
      "Travertine Infinity Pool",
      "Miele Show Kitchen & Chef Prep Area",
      "Smart Home Automation",
      "Private Staff Quarters",
      "Floor-to-Ceiling Acoustic Glazing",
      "Landscaped Zen Garden",
      "Wine Cellar & Tasting Bar"
    ],
    coverImage: "/images/villa_exterior.jpg",
    images: {
      exterior: [
        "/images/villa_exterior.jpg",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "/images/penthouse_interior.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/morning_light.jpg",
        "/images/yacht_lifestyle.jpg"
      ]
    }
  },
  {
    id: "marina-heights",
    name: "Marina Heights",
    location: "Dubai Marina",
    area: "Marina Walk Frontline",
    type: "Apartment",
    transaction: "buy",
    price: 3200000,
    priceDisplay: "AED 3,200,000",
    bedrooms: 2,
    bathrooms: 3,
    size: 1680,
    sizeDisplay: "1,680 SQ.FT.",
    investmentProfile: "income",
    illustrativeYield: 7.4,
    highlights: ["Direct Marina Promenade", "High Floor Corner Unit", "Turnkey Luxury Spec", "Strong Rental Velocity"],
    description: "A contemporary high-elevation residence hovering over the turquoise waterways of Dubai Marina. Engineered for prime short-stay yield and effortless cosmopolitan living.",
    overview: "Positioned directly on Marina Walk, this sun-drenched residence commands 270-degree perspectives over the superyacht berths and Arabian Gulf horizon. Floorplans optimize light flow with custom Italian cabinetry and floor-to-ceiling glass.",
    specs: {
      "Property ID": "VOE-DM-032",
      "Property Type": "Waterfront Luxury Apartment",
      "Floor Level": "42nd Floor Corner Residence",
      "Built-Up Area": "1,680 Sq.Ft.",
      "Furnishing": "Poliform Italian Furnished",
      "Ownership": "Freehold Title",
      "Parking": "1 Dedicated Basement Space",
      "Completion": "Ready for Occupation"
    },
    locationHighlights: [
      { landmark: "Marina Walk Promenade", time: "Direct Elevator Access" },
      { landmark: "JBR Beach & Dining", time: "6 min walk" },
      { landmark: "Dubai Metro & Tram", time: "4 min walk" },
      { landmark: "Downtown Dubai", time: "18 min" },
      { landmark: "Al Maktoum International (DWC)", time: "25 min" }
    ],
    amenities: [
      "Heated Horizon Marina Pool",
      "Technogym Wellness Center",
      "Private Residents Lounge & Concierge",
      "Yacht Berth Concierge Access",
      "Valet Parking 24/7",
      "Children's Play Lounge"
    ],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/yacht_lifestyle.jpg"
      ]
    }
  },
  {
    id: "downtown-crown",
    name: "Downtown Crown",
    location: "Downtown Dubai",
    area: "Opera District",
    type: "Penthouse",
    transaction: "buy",
    price: 12500000,
    priceDisplay: "AED 12,500,000",
    bedrooms: 4,
    bathrooms: 5,
    size: 5200,
    sizeDisplay: "5,200 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 5.8,
    highlights: ["Burj Khalifa & Fountain Axis", "Private Sky Terrace", "Private Lift Lobby", "Dual Key Ready"],
    description: "An iconic sky palace poised above Dubai Opera with uninterrupted front-row perspectives of Burj Khalifa and the Dubai Fountains. The definitive address for ultra-prime capital appreciation.",
    overview: "Elevated on the highest residential floorplate of Downtown's Opera District, Downtown Crown features a 180-degree wrap-around terrace, private elevator vestibule, and bespoke European marble finishes throughout.",
    specs: {
      "Property ID": "VOE-DT-125",
      "Property Type": "Duplex Sky Penthouse",
      "Floor Level": "68th Floor Top Duplex",
      "Built-Up Area": "5,200 Sq.Ft.",
      "Furnishing": "Minotti Bespoke Curated",
      "Ownership": "Freehold Title",
      "Parking": "3 Subterranean Spaces",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "Dubai Opera", time: "Direct Walkway (2 min)" },
      { landmark: "Burj Khalifa & Dubai Mall", time: "5 min walk" },
      { landmark: "DIFC Gate Precinct", time: "5 min drive" },
      { landmark: "Jumeirah Beach", time: "12 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "14 min drive" }
    ],
    amenities: [
      "Private Sky Terrace & Jacuzzi",
      "Burj Khalifa View Infinity Pool",
      "Residents Private Cigar Lounge",
      "Private Sommelier Room",
      "Dedicated 24/7 Butler & Valet",
      "Private Direct Elevator"
    ],
    coverImage: "/images/penthouse_interior.jpg",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
        "/images/twilight_terrace.jpg"
      ],
      living: [
        "/images/penthouse_interior.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/twilight_terrace.jpg"
      ]
    }
  },
  {
    id: "hillside-villa",
    name: "Hillside Villa",
    location: "Dubai Hills Estate",
    area: "Golf Place Enclave",
    type: "Villa",
    transaction: "buy",
    price: 6800000,
    priceDisplay: "AED 6,800,000",
    bedrooms: 5,
    bathrooms: 6,
    size: 5800,
    sizeDisplay: "5,800 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 6.1,
    highlights: ["Championship Golf Course Fairway", "Private Heated Pool", "Lush Landscaped Grounds", "Family Enclave"],
    description: "A tranquil private estate surrounded by the championship greens of Dubai Hills. Merging expansive garden living with immediate proximity to leading international academies and healthcare.",
    overview: "Hillside Villa embodies serene parkland living with pristine views across manicured golf fairways. Designed with an emphasis on natural light, double-height living voids, and generous family suites.",
    specs: {
      "Property ID": "VOE-DH-068",
      "Property Type": "Contemporary Golf Estate",
      "Plot Size": "8,200 Sq.Ft.",
      "Built-Up Area": "5,800 Sq.Ft.",
      "Furnishing": "Semi-Furnished / Turnkey Package Available",
      "Ownership": "Freehold Title",
      "Parking": "3 Enclosed Garages + Driveway",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "Dubai Hills Golf Club", time: "2 min walk" },
      { landmark: "Dubai Hills Mall & King's College", time: "5 min drive" },
      { landmark: "Downtown Dubai", time: "15 min drive" },
      { landmark: "Dubai Marina", time: "15 min drive" },
      { landmark: "Al Maktoum Airport (DWC)", time: "25 min drive" }
    ],
    amenities: [
      "18-Hole Championship Golf Access",
      "Private Heated Overflow Pool",
      "Landscaped Pergola & BBQ Pavilion",
      "Show Kitchen & Dirty Kitchen",
      "Maid's & Driver's Quarters",
      "Community Tennis & Padel Courts"
    ],
    coverImage: "/images/desert_estate.jpg",
    images: {
      exterior: [
        "/images/desert_estate.jpg",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/forest_villa.jpg"
      ]
    }
  },
  {
    id: "business-bay-residence",
    name: "Business Bay Residence",
    location: "Business Bay",
    area: "Marasi Bay Canal",
    type: "Apartment",
    transaction: "rent",
    price: 180000,
    priceDisplay: "AED 180,000 / year",
    bedrooms: 2,
    bathrooms: 2,
    size: 1350,
    sizeDisplay: "1,350 SQ.FT.",
    investmentProfile: "income",
    illustrativeYield: 7.8,
    highlights: ["Dubai Canal Boardwalk", "Walk to DIFC & Downtown", "Floor-to-Ceiling Windows", "High Corporate Demand"],
    description: "An urban canal-front residence tailored for executive living. Moments from DIFC financial district, offering floor-to-ceiling vistas of Marasi Marina water homes and Downtown skyline.",
    overview: "A sleek canal-facing apartment featuring open-concept culinary island, custom walnut joinery, and broad private balcony overlooking Dubai Water Canal. An ideal low-maintenance prime corporate rental asset.",
    specs: {
      "Property ID": "VOE-BB-018",
      "Property Type": "Urban Canal Residence",
      "Floor Level": "19th Floor",
      "Built-Up Area": "1,350 Sq.Ft.",
      "Furnishing": "Fully Furnished Designer",
      "Ownership": "Leasehold / Annual Tenancy",
      "Parking": "1 Reserved Covered Space",
      "Availability": "Immediate"
    },
    locationHighlights: [
      { landmark: "Dubai Water Canal Promenade", time: "Direct Access" },
      { landmark: "DIFC Gate District", time: "6 min drive" },
      { landmark: "Downtown Dubai & Metro", time: "5 min drive" },
      { landmark: "DXB International Airport", time: "12 min drive" }
    ],
    amenities: [
      "Canal Horizon Swimming Pool",
      "State-of-the-Art Fitness Suite",
      "24/7 Concierge & Security",
      "On-site Cafes & Fine Dining",
      "High-speed Fiber Ready"
    ],
    coverImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/twilight_terrace.jpg"
      ]
    }
  },
  {
    id: "jumeirah-garden-house",
    name: "Jumeirah Garden House",
    location: "Jumeirah",
    area: "Jumeirah 1 Coastal Enclave",
    type: "Villa",
    transaction: "rent",
    price: 350000,
    priceDisplay: "AED 350,000 / year",
    bedrooms: 4,
    bathrooms: 5,
    size: 4200,
    sizeDisplay: "4,200 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 5.5,
    highlights: ["Stroll to La Mer Beach", "Private Courtyard Garden", "Single Row Privacy", "High Ceilings"],
    description: "An understated Mediterranean coastal residence nestled in the mature, quiet residential avenues of Jumeirah 1. Features a sunlit interior courtyard, private plunge pool, and mature bougainvillea gardens.",
    overview: "Balancing timeless coastal charm with modern interior appointments, Jumeirah Garden House provides an exclusive family home within walking distance to the beach, international schools, and boutique beach clubs.",
    specs: {
      "Property ID": "VOE-JU-035",
      "Property Type": "Private Coastal Villa",
      "Plot Size": "5,400 Sq.Ft.",
      "Built-Up Area": "4,200 Sq.Ft.",
      "Furnishing": "Semi-Furnished",
      "Ownership": "Annual Residential Tenancy",
      "Parking": "2 Shaded Carport Spaces",
      "Availability": "Vacant on Transfer"
    },
    locationHighlights: [
      { landmark: "Jumeirah Public Beach / La Mer", time: "3 min stroll" },
      { landmark: "Mercato Mall & Fine Cafes", time: "4 min drive" },
      { landmark: "DIFC Gate District", time: "10 min drive" },
      { landmark: "Downtown Dubai", time: "12 min drive" }
    ],
    amenities: [
      "Private Courtyard Plunge Pool",
      "Private Landscaped Garden",
      "Separate Maid's En-Suite",
      "Spacious Family Living Hall",
      "Outdoor Dining Pergola",
      "24-Hour Residential Security"
    ],
    coverImage: "/images/morning_light.jpg",
    images: {
      exterior: [
        "/images/morning_light.jpg",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/morning_light.jpg"
      ]
    }
  },
  {
    id: "emirates-hills-mansion",
    name: "Emirates Hills Mansion",
    location: "Emirates Hills",
    area: "Sector E Lake & Golf Frontage",
    type: "Villa",
    transaction: "buy",
    price: 34000000,
    priceDisplay: "AED 34,000,000",
    bedrooms: 6,
    bathrooms: 8,
    size: 14500,
    sizeDisplay: "14,500 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 4.8,
    highlights: ["Lake & Montgomerie Golf Panoramas", "Private Wellness Wing", "Subterranean Cinema", "10-Car Show Gallery"],
    description: "Often referred to as the Beverly Hills of Dubai, this monolithic stone mansion in Emirates Hills provides absolute security, discretion, and palatial scale for global royal and ultra-HNW dynasties.",
    overview: "Built to institutional luxury standards, the property features Calacatta Gold marble slabs, bronze architectural hardware, an indoor lap spa, commercial-grade secondary kitchen, and manicured lakefront lawns.",
    specs: {
      "Property ID": "VOE-EH-340",
      "Property Type": "Ultra-Prime Trophy Mansion",
      "Plot Size": "22,000 Sq.Ft.",
      "Built-Up Area": "14,500 Sq.Ft.",
      "Furnishing": "Bespoke Italian Turnkey",
      "Ownership": "Freehold Title",
      "Parking": "10 Underground Climate-Controlled Bays",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "Address Montgomerie Golf Club", time: "Direct Golf Cart Path" },
      { landmark: "Dubai Marina Yacht Club", time: "10 min drive" },
      { landmark: "Downtown Dubai", time: "18 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "25 min drive" }
    ],
    amenities: [
      "Olympic Length Lakefront Pool",
      "Private Cinema & Acoustic Screening Room",
      "Full Spa & Hammam Suite",
      "Staff Accommodation for 6",
      "Dual Commercial Elevators",
      "Biometric Perimeter Security"
    ],
    coverImage: "/images/jumeirah_bay_island.jpg",
    images: {
      exterior: [
        "/images/jumeirah_bay_island.jpg",
        "/images/villa_exterior.jpg"
      ],
      living: [
        "/images/penthouse_interior.jpg",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/desert_sunset.jpg"
      ]
    }
  },
  {
    id: "the-opus-sky-suite",
    name: "The Opus Sky Suite",
    location: "Business Bay",
    area: "Zaha Hadid Landmark",
    type: "Penthouse",
    transaction: "buy",
    price: 9200000,
    priceDisplay: "AED 9,200,000",
    bedrooms: 3,
    bathrooms: 4,
    size: 3400,
    sizeDisplay: "3,400 SQ.FT.",
    investmentProfile: "income",
    illustrativeYield: 6.9,
    highlights: ["Zaha Hadid Architectural Masterpiece", "Fully Serviced by ME Hotel", "Void View & Downtown Horizon", "Dual Key Investment"],
    description: "A visionary sculpture in glass conceived by Dame Zaha Hadid. Offering hotel-serviced luxury with concierge, Michelin-starred culinary destinations on premises, and striking curvilinear architecture.",
    overview: "Set in Dubai's most celebrated architectural landmark, The Opus Sky Suite blends fluid biometric geometry with high-end hospitality services by ME Dubai. A standout asset for discerning collectors and executive tenants.",
    specs: {
      "Property ID": "VOE-OP-092",
      "Property Type": "Branded Architectural Penthouse",
      "Floor Level": "18th Floor Void Axis",
      "Built-Up Area": "3,400 Sq.Ft.",
      "Furnishing": "Zaha Hadid Bespoke Interiors",
      "Ownership": "Freehold Title",
      "Parking": "2 Secure Reserved Bays",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "ME Dubai Hotel & Dining", time: "In-Building" },
      { landmark: "Burj Khalifa & Dubai Mall", time: "4 min drive" },
      { landmark: "DIFC Gate Village", time: "6 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "14 min drive" }
    ],
    amenities: [
      "ME Hotel 24/7 Room Service & Concierge",
      "Rooftop Pool & Sunset Lounge",
      "Signature Restaurants by ROKA & Central",
      "State-of-the-Art Spa & Treatment Suites",
      "Valet Parking & Chauffeur Services"
    ],
    coverImage: "/images/twilight_terrace.jpg",
    images: {
      exterior: [
        "/images/twilight_terrace.jpg",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/twilight_terrace.jpg"
      ]
    }
  },
  {
    id: "creek-horizon-duplex",
    name: "Creek Horizon Duplex",
    location: "Downtown Dubai",
    area: "Dubai Creek Harbour",
    type: "Townhouse",
    transaction: "buy",
    price: 4100000,
    priceDisplay: "AED 4,100,000",
    bedrooms: 3,
    bathrooms: 4,
    size: 2600,
    sizeDisplay: "2,600 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 6.5,
    highlights: ["Ras Al Khor Wildlife Sanctuary View", "Park & Promenade Edge", "Double Height Ceilings", "Fast Growing Prime Hub"],
    description: "A garden duplex positioned on the vibrant marina promenade of Dubai Creek Harbour. Offers tranquil vistas of pink flamingos against the gleaming Downtown Dubai silhouette.",
    overview: "Featuring direct private street access and upper terrace bedrooms, Creek Horizon Duplex provides the generous proportion of a villa with the effortless amenities of a master-planned waterfront community.",
    specs: {
      "Property ID": "VOE-CH-041",
      "Property Type": "Waterfront Promenade Duplex",
      "Built-Up Area": "2,600 Sq.Ft.",
      "Furnishing": "Designer Unfurnished / Turnkey Option",
      "Ownership": "Freehold Title",
      "Parking": "2 Covered Allocated Bays",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "Creek Marina Yacht Club", time: "Direct Walk" },
      { landmark: "Ras Al Khor Sanctuary", time: "3 min" },
      { landmark: "Downtown Dubai & Burj Khalifa", time: "10 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "10 min drive" }
    ],
    amenities: [
      "Infinity Swimming Pool overlooking Creek Marina",
      "Community Parks & Children's Play Lawns",
      "Dedicated Indoor Squash Courts",
      "Jogging & Cycling Boardwalk",
      "24/7 Security & Keycard Access"
    ],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/morning_light.jpg"
      ]
    }
  },
  {
    id: "bluewaters-haven",
    name: "Bluewaters Haven",
    location: "Dubai Marina",
    area: "Bluewaters Island",
    type: "Apartment",
    transaction: "rent",
    price: 280000,
    priceDisplay: "AED 280,000 / year",
    bedrooms: 2,
    bathrooms: 3,
    size: 1520,
    sizeDisplay: "1,520 SQ.FT.",
    investmentProfile: "income",
    illustrativeYield: 7.1,
    highlights: ["Ain Dubai Frontage", "Direct Bridge to JBR", "Private Beach Club Access", "Pedestrian Island Lifestyle"],
    description: "Island living meets metropolitan glamour on Bluewaters Island. Stroll to Michelin dining, private beach coves, and world-class retail while maintaining immediate connectivity to the city.",
    overview: "Characterized by clean Scandinavian lines and expansive glass facades, Bluewaters Haven opens to calm sea breezes and Ain Dubai illuminated evenings. A high-demand residence for international corporate executives.",
    specs: {
      "Property ID": "VOE-BW-028",
      "Property Type": "Island Waterfront Apartment",
      "Floor Level": "8th Floor",
      "Built-Up Area": "1,520 Sq.Ft.",
      "Furnishing": "Fully Furnished Turnkey",
      "Ownership": "Annual Tenancy",
      "Parking": "1 Reserved Basement Bay",
      "Availability": "Immediate"
    },
    locationHighlights: [
      { landmark: "Caesars Palace & Cove Beach", time: "2 min walk" },
      { landmark: "The Beach at JBR (via footbridge)", time: "8 min walk" },
      { landmark: "Dubai Marina", time: "5 min drive" },
      { landmark: "Downtown Dubai", time: "20 min drive" }
    ],
    amenities: [
      "Island Infinity Swimming Pool",
      "Direct Beach & Promenade Access",
      "Residents Gymnasium & Sauna",
      "Dedicated On-Island Security",
      "Boutique Retail & Gourmet Grocer"
    ],
    coverImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
    images: {
      exterior: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80"
      ],
      living: [
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/yacht_lifestyle.jpg"
      ]
    }
  },
  {
    id: "palm-crescent-retreat",
    name: "Palm Crescent Retreat",
    location: "Palm Jumeirah",
    area: "Palm Crescent West",
    type: "Apartment",
    transaction: "rent",
    price: 420000,
    priceDisplay: "AED 420,000 / year",
    bedrooms: 3,
    bathrooms: 4,
    size: 2750,
    sizeDisplay: "2,750 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 6.0,
    highlights: ["Open Gulf Horizon Views", "Private Beachfront Access", "Resort Amenities", "Valet & 24hr Concierge"],
    description: "An ultra-luxury crescent residence situated among 5-star resorts on the outer ring of Palm Jumeirah. Enjoy direct private beach privileges, sunset ocean views, and dedicated resort amenities.",
    overview: "This opulent 3-bedroom residence offers expansive outdoor terraces capturing the rhythmic tides of the Arabian Gulf. Finished with honed travertine, bronze fixtures, and European integrated appliances.",
    specs: {
      "Property ID": "VOE-PC-042",
      "Property Type": "Crescent Luxury Beach Apartment",
      "Floor Level": "6th Floor Horizon Suite",
      "Built-Up Area": "2,750 Sq.Ft.",
      "Furnishing": "Designer Furnished",
      "Ownership": "Annual Tenancy",
      "Parking": "2 Secure Underground Bays",
      "Availability": "Vacant on Transfer"
    },
    locationHighlights: [
      { landmark: "Atlantis The Royal & The Palm", time: "3 min drive" },
      { landmark: "Nakheel Mall", time: "8 min drive" },
      { landmark: "Dubai Marina", time: "16 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "30 min drive" }
    ],
    amenities: [
      "Private White Sand Beach Club",
      "Lagoon Swimming Pool & Sun Loungers",
      "Tennis Courts & Fitness Pavilion",
      "Valet Parking & 24/7 Concierge",
      "Fine Dining Room Delivery"
    ],
    coverImage: "/images/twilight_terrace.jpg",
    images: {
      exterior: [
        "/images/twilight_terrace.jpg"
      ],
      living: [
        "/images/penthouse_interior.jpg"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/yacht_lifestyle.jpg"
      ]
    }
  },
  {
    id: "sanctuary-dubai-hills",
    name: "Sanctuary at Dubai Hills",
    location: "Dubai Hills Estate",
    area: "Maple & Parkway Vista",
    type: "Townhouse",
    transaction: "buy",
    price: 4950000,
    priceDisplay: "AED 4,950,000",
    bedrooms: 4,
    bathrooms: 4,
    size: 3200,
    sizeDisplay: "3,200 SQ.FT.",
    investmentProfile: "balanced",
    illustrativeYield: 6.3,
    highlights: ["Corner End-Unit with Extended Garden", "Steps to Central Green Park", "Contemporary Façade", "Prime Family Asset"],
    description: "An impeccably finished modern corner townhouse set within the lush greenery of Dubai Hills Estate. Designed with expansive floor-to-ceiling windows, open plan living, and private landscaped garden.",
    overview: "Offering privacy and generous interior volumes, this corner residence is located within a 3-minute stroll to the central park, swimming lagoons, and sports courts. A cornerstone investment in Dubai's premier master community.",
    specs: {
      "Property ID": "VOE-DH-049",
      "Property Type": "Contemporary End-Unit Townhouse",
      "Plot Size": "3,950 Sq.Ft.",
      "Built-Up Area": "3,200 Sq.Ft.",
      "Furnishing": "Turnkey Finished",
      "Ownership": "Freehold Title",
      "Parking": "2 Shaded Covered Bays",
      "Completion": "Ready"
    },
    locationHighlights: [
      { landmark: "Dubai Hills Central Park", time: "3 min walk" },
      { landmark: "Dubai Hills Mall & King's Hospital", time: "4 min drive" },
      { landmark: "Downtown Dubai", time: "14 min drive" },
      { landmark: "Dubai Marina", time: "15 min drive" }
    ],
    amenities: [
      "Community Swimming Lagoon & Kids Splash Pad",
      "Dubai Hills Central Park & Dog Park",
      "Championship Golf Course Access",
      "Cycling & Jogging Tracks",
      "Private Landscaped Lawn & BBQ Terrace"
    ],
    coverImage: "/images/forest_villa.jpg",
    images: {
      exterior: [
        "/images/forest_villa.jpg"
      ],
      living: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
      ],
      bedrooms: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
      ],
      kitchen: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
      ],
      bathrooms: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
      ],
      amenities: [
        "/images/forest_villa.jpg"
      ]
    }
  }
];

function getActiveCatalog() {
  try {
    const raw = localStorage.getItem('voe_properties_catalog_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(p => ({
          ...p,
          name: p.name || p.title,
          title: p.title || p.name,
          price: Number(p.price || p.priceAED || 0),
          priceDisplay: p.priceDisplay || `AED ${Number(p.price || p.priceAED || 0).toLocaleString()}`,
          sizeDisplay: p.sizeDisplay || `${Number(p.size || p.areaSqFt || 0).toLocaleString()} SQ.FT.`,
          transaction: p.transaction || (p.category === 'rent' || p.isRent ? 'rent' : 'buy'),
          heroImage: p.heroImage || p.image || '/images/villa_exterior.jpg',
          galleryImages: p.galleryImages || p.gallery || [p.image || '/images/villa_exterior.jpg']
        }));
      }
    }
  } catch (e) {}
  return DEMO_PROPERTIES;
}

// Helper Functions for Catalog & Investment Pages
export function getPropertyById(id) {
  if (!id) return null;
  const cleanId = String(id).trim().toLowerCase().replace(/^\/properties\/?/, '');
  const catalog = getActiveCatalog();
  return catalog.find(p => p.id === cleanId) || null;
}

export function getAllProperties() {
  return getActiveCatalog();
}

export function filterProperties({ transaction, location, type, bedrooms, priceRange, sort }) {
  let list = getActiveCatalog();

  if (transaction && transaction !== 'all') {
    list = list.filter(p => p.transaction.toLowerCase() === transaction.toLowerCase());
  }

  if (location && location !== 'all') {
    list = list.filter(p => p.location.toLowerCase() === location.toLowerCase());
  }

  if (type && type !== 'all') {
    list = list.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }

  if (bedrooms && bedrooms !== 'all') {
    if (bedrooms === 'studio') {
      list = list.filter(p => p.bedrooms === 0 || p.bedrooms === 'studio');
    } else if (bedrooms === '4+') {
      list = list.filter(p => Number(p.bedrooms) >= 4);
    } else {
      const num = parseInt(bedrooms, 10);
      list = list.filter(p => Number(p.bedrooms) === num);
    }
  }

  if (priceRange && priceRange !== 'all') {
    // Buy ranges: 'under-5m', '5m-10m', '10m-20m', '20m-plus'
    // Rent ranges: 'under-200k', '200k-350k', '350k-500k', '500k-plus'
    if (priceRange === 'under-5m') list = list.filter(p => p.price < 5000000);
    else if (priceRange === '5m-10m') list = list.filter(p => p.price >= 5000000 && p.price <= 10000000);
    else if (priceRange === '10m-20m') list = list.filter(p => p.price > 10000000 && p.price <= 20000000);
    else if (priceRange === '20m-plus') list = list.filter(p => p.price > 20000000);
    else if (priceRange === 'under-200k') list = list.filter(p => p.price < 200000);
    else if (priceRange === '200k-350k') list = list.filter(p => p.price >= 200000 && p.price <= 350000);
    else if (priceRange === '350k-500k') list = list.filter(p => p.price > 350000 && p.price <= 500000);
    else if (priceRange === '500k-plus') list = list.filter(p => p.price > 500000);
  }

  if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'size-desc') {
    list.sort((a, b) => b.size - a.size);
  }

  return list;
}

export function getPropertiesByBudget(budgetTier) {
  // budgetTier: '1-3m', '3-10m', '10m-plus'
  if (budgetTier === '1-3m') {
    return DEMO_PROPERTIES.filter(p => p.price <= 3500000);
  } else if (budgetTier === '3-10m') {
    return DEMO_PROPERTIES.filter(p => p.price > 3000000 && p.price <= 10000000);
  } else if (budgetTier === '10m-plus') {
    return DEMO_PROPERTIES.filter(p => p.price > 10000000);
  }
  return DEMO_PROPERTIES.slice(0, 4);
}

export function getPropertiesByProfile(profile) {
  if (!profile || profile === 'all') return DEMO_PROPERTIES.slice(0, 6);
  return DEMO_PROPERTIES.filter(p => p.investmentProfile === profile);
}

export function formatCurrencyAED(amount) {
  return `AED ${Number(amount).toLocaleString('en-US')}`;
}
