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
    id: "estate-jumeirah-bay",
    name: "Sanctuary of the Sun",
    title: "Sanctuary of the Sun",
    location: "Jumeirah Bay Island",
    area: "Jumeirah Bay Island Seahorse",
    type: "Villa",
    transaction: "buy",
    category: "sale",
    isRent: false,
    price: 165000000,
    priceAED: 165000000,
    priceDisplay: "AED 165,000,000",
    bedrooms: 7,
    bathrooms: 9,
    size: 21500,
    areaSqFt: 21500,
    sizeDisplay: "21,500 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 4.8,
    isSignature: true,
    status: "Private Placement",
    tagline: "Ultra-private island enclave with private yacht berth and direct open Gulf panoramas.",
    highlights: ["Private 120ft Superyacht Slip", "Thermal Spa & Cold Plunge Suite", "Private White Sand Shoreline", "Direct Helipad Access", "Bulgari Resort Proximity"],
    lifestylePerks: ["Private 120ft Superyacht Slip", "Thermal Spa & Cold Plunge Suite", "Private White Sand Shoreline", "Direct Helipad Access", "Bulgari Resort Proximity"],
    description: "Conceived by Italian architectural masters, this residence on the prestigious seahorse island represents the apex of waterfront tranquility. Featuring 40 meters of private sea frontage, a dedicated 120ft yacht berth, travertine infinity pool, and discreet staff quarters.",
    overview: "Conceived by Italian architectural masters, this residence on the prestigious seahorse island represents the apex of waterfront tranquility. Featuring 40 meters of private sea frontage, a dedicated 120ft yacht berth, travertine infinity pool, and discreet staff quarters.",
    specs: {
      "Property ID": "VOE-JB-165",
      "Property Type": "Private Waterfront Island Villa",
      "Plot Size": "28,400 Sq.Ft.",
      "Built-Up Area": "21,500 Sq.Ft.",
      "Furnishing": "Italian Haute-Couture Turnkey",
      "Ownership": "Freehold Title (100% Foreign Ownership)",
      "Parking": "6 Subterranean Spaces",
      "Completion": "Ready for Handover"
    },
    locationHighlights: [
      { landmark: "Private Deepwater Berth", time: "Direct" },
      { landmark: "Bulgari Resort & Marina", time: "3 min" },
      { landmark: "Downtown Dubai & DIFC", time: "12 min" },
      { landmark: "Dubai International Airport (DXB)", time: "18 min" }
    ],
    amenities: [
      "Private Superyacht Berth",
      "Thermal Spa Suite",
      "Private Beachfront",
      "Travertine Infinity Pool",
      "Smart Home Automation",
      "Staff Accommodation"
    ],
    coverImage: "/images/jumeirah_bay_island.jpg",
    image: "/images/jumeirah_bay_island.jpg",
    heroImage: "/images/jumeirah_bay_island.jpg",
    gallery: [
      "/images/jumeirah_bay_island.jpg",
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg"
    ],
    images: {
      exterior: [
        "/images/jumeirah_bay_island.jpg",
        "/images/villa_exterior.jpg"
      ],
      living: [
        "/images/penthouse_interior.jpg"
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
        "/images/yacht_lifestyle.jpg"
      ]
    }
  },
  {
    id: "estate-palm-villa",
    name: "Villa Al-Noor",
    title: "Villa Al-Noor",
    location: "Palm Jumeirah",
    area: "Palm Jumeirah Frond M",
    type: "Villa",
    transaction: "buy",
    category: "sale",
    isRent: false,
    price: 115000000,
    priceAED: 115000000,
    priceDisplay: "AED 115,000,000",
    bedrooms: 6,
    bathrooms: 8,
    size: 16500,
    areaSqFt: 16500,
    sizeDisplay: "16,500 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 5.1,
    isSignature: true,
    status: "Exclusive Listing",
    tagline: "Architectural purity carved in limestone along the tranquil waters of the Palm fronds.",
    highlights: ["Private Calm-Water Beach Access", "25m Floating Edge Pool", "Temperature-Controlled Wine Gallery", "Private Rooftop Sunset Pavilion", "Smart Home Automation"],
    lifestylePerks: ["Private Calm-Water Beach Access", "25m Floating Edge Pool", "Temperature-Controlled Wine Gallery", "Private Rooftop Sunset Pavilion", "Smart Home Automation"],
    description: "Bathed in the warm light of the Arabian sunset, Villa Al-Noor merges indoor serenity with private beach living. Expansive floor-to-ceiling glass folds away to reveal a 25-meter infinity pool, bespoke Japanese zen garden, and a private sheltered beachfront with calm crystalline waters.",
    overview: "Bathed in the warm light of the Arabian sunset, Villa Al-Noor merges indoor serenity with private beach living. Expansive floor-to-ceiling glass folds away to reveal a 25-meter infinity pool, bespoke Japanese zen garden, and a private sheltered beachfront with calm crystalline waters.",
    specs: {
      "Property ID": "VOE-PJ-115",
      "Property Type": "Beachfront Frond Estate",
      "Plot Size": "19,200 Sq.Ft.",
      "Built-Up Area": "16,500 Sq.Ft.",
      "Furnishing": "Custom European Furnished",
      "Ownership": "Freehold Title",
      "Parking": "4 Climatized Bays",
      "Completion": "Ready for Occupation"
    },
    locationHighlights: [
      { landmark: "Private Frond Beach", time: "Direct Access" },
      { landmark: "Burj Al Arab & Royal Atlantis", time: "Front-row View" },
      { landmark: "Nakheel Mall & The Pointe", time: "6 min" },
      { landmark: "Dubai International Airport (DXB)", time: "28 min" }
    ],
    amenities: [
      "Private Calm-Water Beach",
      "25m Floating Edge Pool",
      "Temperature-Controlled Wine Gallery",
      "Rooftop Sunset Pavilion",
      "Crestron Smart Home Automation"
    ],
    coverImage: "/images/villa_exterior.jpg",
    image: "/images/villa_exterior.jpg",
    heroImage: "/images/villa_exterior.jpg",
    gallery: [
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg",
      "/images/yacht_lifestyle.jpg"
    ],
    images: {
      exterior: [
        "/images/villa_exterior.jpg"
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
    id: "estate-downtown-penthouse",
    name: "The Horizon Sky Duplex",
    title: "The Horizon Sky Duplex",
    location: "Downtown Dubai",
    area: "Downtown Dubai Opera District",
    type: "Penthouse",
    transaction: "buy",
    category: "sale",
    isRent: false,
    price: 78000000,
    priceAED: 78000000,
    priceDisplay: "AED 78,000,000",
    bedrooms: 5,
    bathrooms: 6,
    size: 9800,
    areaSqFt: 9800,
    sizeDisplay: "9,800 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 5.6,
    isSignature: true,
    status: "Active Portfolio",
    tagline: "Floating above the clouds with 360-degree panoramas of the iconic Dubai skyline.",
    highlights: ["Private High-Speed Elevator with Biometrics", "Heated Sky Lap Pool & Sunset Terrace", "Direct Chauffeured House Car Service", "Private 12-Seat Cinema & Screening Lounge", "24/7 Dedicated Concierge & Sommelier"],
    lifestylePerks: ["Private High-Speed Elevator with Biometrics", "Heated Sky Lap Pool & Sunset Terrace", "Direct Chauffeured House Car Service", "Private 12-Seat Cinema & Screening Lounge", "24/7 Dedicated Concierge & Sommelier"],
    description: "A triumph of minimalist volume and light, this two-story sky residence occupies the crowning levels of Downtown's most discreet residential tower. Features double-height 7-meter ceilings, private indoor lap pool, and bespoke furnishings curated from Milan.",
    overview: "A triumph of minimalist volume and light, this two-story sky residence occupies the crowning levels of Downtown's most discreet residential tower. Features double-height 7-meter ceilings, private indoor lap pool, and bespoke furnishings curated from Milan.",
    specs: {
      "Property ID": "VOE-DT-078",
      "Property Type": "Two-Story Sky Duplex Penthouse",
      "Floor Level": "Duplex Levels 68 & 69",
      "Built-Up Area": "9,800 Sq.Ft.",
      "Furnishing": "Milan Designer Curated",
      "Ownership": "Freehold Title",
      "Parking": "5 Dedicated Valet Spots",
      "Completion": "Ready for Occupation"
    },
    locationHighlights: [
      { landmark: "Burj Khalifa & Dubai Mall", time: "Direct Walk (3 min)" },
      { landmark: "Dubai Opera", time: "2 min" },
      { landmark: "DIFC Gate District", time: "5 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "14 min drive" }
    ],
    amenities: [
      "Biometric High-Speed Private Elevator",
      "Heated Sky Lap Pool & Terrace",
      "Private 12-Seat Screening Cinema",
      "Sommelier Wine Vault",
      "24/7 Concierge & Valet"
    ],
    coverImage: "/images/penthouse_interior.jpg",
    image: "/images/penthouse_interior.jpg",
    heroImage: "/images/penthouse_interior.jpg",
    gallery: [
      "/images/penthouse_interior.jpg",
      "/images/villa_exterior.jpg",
      "/images/desert_estate.jpg"
    ],
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
        "/images/desert_estate.jpg"
      ]
    }
  },
  {
    id: "estate-emirates-hills",
    name: "The Dunes Oasis",
    title: "The Dunes Oasis",
    location: "Emirates Hills",
    area: "Emirates Hills Sector E",
    type: "Villa",
    transaction: "buy",
    category: "sale",
    isRent: false,
    price: 92000000,
    priceAED: 92000000,
    priceDisplay: "AED 92,000,000",
    bedrooms: 6,
    bathrooms: 7,
    size: 18200,
    areaSqFt: 18200,
    sizeDisplay: "18,200 SQ.FT.",
    investmentProfile: "growth",
    illustrativeYield: 4.9,
    isSignature: true,
    status: "Private Placement",
    tagline: "Quiet seclusion wrapped in ancient olive trees, rammed earth walls, and golf fairways.",
    highlights: ["Natural Biological Swimming Lagoon", "Olive Grove Courtyard (200-Year-Old Trees)", "Independent Wellness Pavilion & Hammam", "Dedicated Security Gatehouse & Annex", "Gated Double-Access Enclave"],
    lifestylePerks: ["Natural Biological Swimming Lagoon", "Olive Grove Courtyard (200-Year-Old Trees)", "Independent Wellness Pavilion & Hammam", "Dedicated Security Gatehouse & Annex", "Gated Double-Access Enclave"],
    description: "Designed for ultimate privacy and contemplation, this estate redefines modern desert luxury. Organic limestone, rammed earth textures, and extensive reflecting ponds create a serene microclimate, while the championship golf course provides a lush endless green backdrop.",
    overview: "Designed for ultimate privacy and contemplation, this estate redefines modern desert luxury. Organic limestone, rammed earth textures, and extensive reflecting ponds create a serene microclimate, while the championship golf course provides a lush endless green backdrop.",
    specs: {
      "Property ID": "VOE-EH-092",
      "Property Type": "Golf Course Sanctuary Villa",
      "Plot Size": "32,000 Sq.Ft.",
      "Built-Up Area": "18,200 Sq.Ft.",
      "Furnishing": "Bespoke Mineral & Wood Finishes",
      "Ownership": "Freehold Title",
      "Parking": "8 Covered Vehicles",
      "Completion": "Ready for Occupation"
    },
    locationHighlights: [
      { landmark: "Montgomerie Championship Golf", time: "Direct Fairway Edge" },
      { landmark: "Dubai Marina Yacht Club", time: "10 min drive" },
      { landmark: "Downtown Dubai", time: "18 min drive" },
      { landmark: "Dubai International Airport (DXB)", time: "25 min drive" }
    ],
    amenities: [
      "Natural Biological Swimming Lagoon",
      "Olive Grove Courtyard",
      "Private Hammam & Wellness Spa",
      "Championship Golf Course Fairway",
      "Gated Double-Access Security"
    ],
    coverImage: "/images/desert_estate.jpg",
    image: "/images/desert_estate.jpg",
    heroImage: "/images/desert_estate.jpg",
    gallery: [
      "/images/desert_estate.jpg",
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg"
    ],
    images: {
      exterior: [
        "/images/desert_estate.jpg"
      ],
      living: [
        "/images/villa_exterior.jpg"
      ],
      bedrooms: [
        "/images/penthouse_interior.jpg"
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

function normalizeProperty(p) {
  if (!p) return null;
  const isRent = Boolean(p.isRent || p.transaction === 'rent' || p.category === 'rent');
  const priceVal = Number(p.price || p.priceAED || 0);
  const sizeVal = Number(p.size || p.areaSqFt || 3500);
  const coverUrl = p.coverImage || p.image || p.heroImage || (p.images && p.images.exterior && p.images.exterior[0]) || '/images/villa_exterior.jpg';

  const galleryList = Array.isArray(p.gallery) && p.gallery.length > 0
    ? p.gallery
    : (Array.isArray(p.galleryImages) && p.galleryImages.length > 0 ? p.galleryImages : [coverUrl]);

  const imagesObj = (p.images && typeof p.images === 'object' && Array.isArray(p.images.exterior))
    ? p.images
    : {
        exterior: [coverUrl],
        living: [galleryList[1] || '/images/penthouse_interior.jpg'],
        bedrooms: [galleryList[2] || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80'],
        kitchen: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'],
        bathrooms: ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80'],
        amenities: ['/images/yacht_lifestyle.jpg']
      };

  return {
    ...p,
    id: String(p.id),
    name: p.name || p.title || 'Dubai Residence',
    title: p.title || p.name || 'Dubai Residence',
    location: p.location || 'Dubai',
    area: p.area || p.location || 'Dubai',
    type: p.type || 'Villa',
    transaction: isRent ? 'rent' : 'buy',
    category: isRent ? 'rent' : 'sale',
    isRent,
    price: priceVal,
    priceAED: priceVal,
    priceDisplay: p.priceDisplay || (isRent ? `AED ${priceVal.toLocaleString()} / year` : `AED ${priceVal.toLocaleString()}`),
    bedrooms: Number(p.bedrooms || 3),
    bathrooms: Number(p.bathrooms || 4),
    size: sizeVal,
    areaSqFt: sizeVal,
    sizeDisplay: p.sizeDisplay || `${sizeVal.toLocaleString()} SQ.FT.`,
    investmentProfile: p.investmentProfile || 'balanced',
    illustrativeYield: Number(p.illustrativeYield || 5.5),
    highlights: Array.isArray(p.highlights) && p.highlights.length > 0 ? p.highlights : (p.lifestylePerks || ['Prime Dubai Address', 'Private Security']),
    lifestylePerks: Array.isArray(p.lifestylePerks) && p.lifestylePerks.length > 0 ? p.lifestylePerks : (p.highlights || ['Prime Dubai Address', 'Private Security']),
    description: p.description || p.overview || 'An exceptional luxury residence in premier Dubai enclave.',
    overview: p.overview || p.description || 'An exceptional luxury residence in premier Dubai enclave.',
    specs: (p.specs && typeof p.specs === 'object') ? p.specs : {
      "Property Type": p.type || "Luxury Residence",
      "Built-Up Area": `${sizeVal.toLocaleString()} Sq.Ft.`,
      "Ownership": "Freehold Title"
    },
    locationHighlights: Array.isArray(p.locationHighlights) && p.locationHighlights.length > 0 ? p.locationHighlights : [
      { landmark: "Dubai Marina & Downtown", time: "15 min" },
      { landmark: "International Airport (DXB)", time: "20 min" }
    ],
    amenities: Array.isArray(p.amenities) && p.amenities.length > 0 ? p.amenities : (p.lifestylePerks || ["Private Swimming Pool", "24/7 Security", "Private Parking"]),
    coverImage: coverUrl,
    image: coverUrl,
    heroImage: coverUrl,
    gallery: galleryList,
    galleryImages: galleryList,
    images: imagesObj,
    isSignature: Boolean(p.isSignature),
    status: p.status || (isRent ? 'Available for Lease' : 'Exclusive Listing'),
    tagline: p.tagline || 'Exemplary architectural presence in Dubai.'
  };
}

function getActiveCatalog() {
  try {
    const raw = localStorage.getItem('voe_properties_catalog_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If parsed catalog has fewer items than our master list, merge to ensure full catalog is visible
        const masterMap = new Map();
        DEMO_PROPERTIES.forEach(d => masterMap.set(d.id, d));
        parsed.forEach(p => masterMap.set(p.id, { ...(masterMap.get(p.id) || {}), ...p }));
        const merged = Array.from(masterMap.values()).map(p => normalizeProperty(p));
        return merged;
      }
    }
  } catch (e) {}
  return DEMO_PROPERTIES.map(p => normalizeProperty(p));
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

  // 1. Transaction filter: ALL shows both, BUY shows sales, RENT shows leases
  if (transaction && transaction !== 'all') {
    list = list.filter(p => {
      const isRent = Boolean(p.transaction === 'rent' || p.category === 'rent' || p.isRent);
      return transaction === 'rent' ? isRent : !isRent;
    });
  }

  // 2. Location filter
  if (location && location !== 'all') {
    const locNorm = location.toLowerCase();
    list = list.filter(p => {
      const pLoc = (p.location || '').toLowerCase();
      const pArea = (p.area || '').toLowerCase();
      return pLoc.includes(locNorm) || locNorm.includes(pLoc) || pArea.includes(locNorm);
    });
  }

  // 3. Type filter
  if (type && type !== 'all') {
    const typeNorm = type.toLowerCase();
    list = list.filter(p => {
      const pType = (p.type || '').toLowerCase();
      return pType.includes(typeNorm) || typeNorm.includes(pType);
    });
  }

  // 4. Bedroom filter
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

  // 5. Price filter
  if (priceRange && priceRange !== 'all') {
    if (priceRange === 'under-5m') list = list.filter(p => p.price < 5000000);
    else if (priceRange === '5m-10m') list = list.filter(p => p.price >= 5000000 && p.price <= 10000000);
    else if (priceRange === '10m-20m') list = list.filter(p => p.price > 10000000 && p.price <= 20000000);
    else if (priceRange === '20m-plus') list = list.filter(p => p.price > 20000000);
    else if (priceRange === 'under-200k') list = list.filter(p => p.price < 200000);
    else if (priceRange === '200k-350k') list = list.filter(p => p.price >= 200000 && p.price <= 350000);
    else if (priceRange === '350k-500k') list = list.filter(p => p.price > 350000 && p.price <= 500000);
    else if (priceRange === '500k-plus') list = list.filter(p => p.price > 500000);
  }

  // 6. Sorting
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
