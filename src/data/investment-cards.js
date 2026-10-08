/**
 * Investment Cards Data Architecture
 * Structured investment knowledge base for Dubai Luxury Real Estate
 * Official sources: UAE Ministry of Finance, Dubai Land Department (DLD), 
 * Federal Tax Authority (FTA), Dubai Statistics Center, RERA.
 */

export const INVESTMENT_CARDS = [
  {
    id: 'tax-environment',
    index: '01',
    category: 'TAX ENVIRONMENT',
    headline: 'A DIFFERENT\nTAX LANDSCAPE.',
    highlightStat: '0%',
    highlightLabel: 'PERSONAL INCOME TAX*',
    summary: "Dubai's tax environment can materially affect how investors evaluate income, ownership costs and returns.",
    keywords: ['INCOME', 'CAPITAL GAINS', 'CORPORATE TAX', 'PROPERTY COSTS'],
    interactionCue: 'EXPLORE THE INVESTMENT CASE →',
    bgImage: '/images/craft_arch.jpg',
    
    // Expanded Layer 2 Information
    expanded: {
      title: 'WHAT THE HEADLINE ACTUALLY MEANS.',
      sections: [
        {
          heading: 'PERSONAL INCOME & RENTAL PROCEEDS',
          content: 'Individual investors — both resident and non-resident — pay 0% personal income tax on employment earnings and 0% personal income tax on residential rental distributions. There is no municipal income surtax, payroll deduction, or regional personal withholding applied to individual real estate owners.'
        },
        {
          heading: 'CAPITAL APPRECIATION & DISPOSAL',
          content: '0% capital gains tax applies upon the sale or disposal of privately owned residential property. Asset appreciation compounds without annual unrealized mark-to-market taxes or capital exit levies, enabling 100% equity retention upon liquidation.'
        },
        {
          heading: 'CORPORATE TAX (FEDERAL DECREE-LAW NO. 47/2022)',
          content: 'The UAE levies a 9% federal corporate tax on taxable corporate profits exceeding AED 375,000. However, Cabinet Decision No. 49 of 2023 explicitly clarifies that natural persons (individuals) managing personal investments or deriving passive rental income from real estate in their personal capacity without a commercial business license are generally outside the scope of Corporate Tax.'
        },
        {
          heading: 'ACQUISITION & PROPERTY TRANSACTION COSTS',
          content: 'While recurring income and wealth taxes are zero, property acquisition is subject to statutory transactional charges: a standard 4% Dubai Land Department (DLD) transfer fee, Registration Trustee fees (approx. AED 4,000 + 5% VAT), Title Deed issuance fees, and ongoing developer/master community service charges governed by RERA.'
        }
      ],
      investorImplication: {
        title: 'WHAT THIS MEANS FOR AN INVESTOR',
        content: 'An investor retains a higher proportion of gross rental cash flows and 100% of realized capital gains. In high-tax jurisdictions (such as the UK, Germany, or the US), effective marginal taxation on rental profits frequently reduces net distributions by 40% to 50%+. In Dubai, fiscal drag is predominantly transactional at entry rather than continuous.'
      },
      whatToCheck: {
        title: 'WHAT TO CHECK',
        items: [
          'Home-Country Tax Residency: If you maintain tax residency in your country of citizenship or permanent origin (e.g. US worldwide taxation, UK statutory residence test), foreign rental income or capital gains may remain reportable in your home country unless restructured or offset by Double Taxation Agreements (DTAs).',
          'Double Taxation Treaties: The UAE maintains over 140 bilateral DTAs. Independent accredited cross-border tax advice is required to confirm how income derived in Dubai interacts with your domestic tax domicile.',
          'Commercial vs. Residential VAT: Standard residential resales and leases are exempt or zero-rated from 5% UAE VAT. Commercial assets and serviced hotel rooms may incur VAT obligations.'
        ]
      },
      sourceNote: 'Verified against UAE Ministry of Finance Federal Decree-Law No. 47/2022, Cabinet Decision No. 49/2023, and Dubai Land Department official fee schedules. For educational evaluation only; not licensed tax or legal counsel.'
    }
  },

  {
    id: 'rental-income',
    index: '02',
    category: 'RENTAL INCOME',
    headline: 'THE ASSET\nCAN WORK FOR YOU.',
    highlightStat: 'RENTAL YIELD',
    highlightLabel: 'GROSS VS NET PERFORMANCE',
    summary: 'Rental performance depends on what you buy, where you buy it, what you pay and how efficiently the property is operated.',
    keywords: ['ENTRY PRICE', 'ANNUAL RENT', 'VACANCY', 'SERVICE CHARGES', 'MANAGEMENT'],
    interactionCue: 'SEE THE INVESTMENT MATH →',
    bgImage: '/images/twilight_terrace.jpg',
    
    // Expanded Layer 2 Information
    expanded: {
      title: 'LOOK BEYOND THE RENT.',
      sections: [
        {
          heading: 'UNDERSTANDING GROSS YIELD',
          content: 'Gross Yield is calculated simply as: (Annual Rental Income ÷ Purchase Price) × 100%. While property listings commonly advertise headline gross yields between 6% and 9%, headline gross yield is never actual distributable return.'
        },
        {
          heading: 'THE FRICTION BETWEEN GROSS AND NET',
          content: 'Net return is determined by subtracting operational friction: tenant vacancy intervals (typically 2–4 weeks turnover buffer), mandatory building service charges (governed by the DLD Mollak index), routine preventative maintenance, insurance, and professional property management fees.'
        }
      ],
      waterfall: [
        { step: '01', label: 'GROSS RENTAL INCOME', math: '100% of Base Contract', desc: 'Achieved market rent under registered Ejari tenancy' },
        { step: '02', label: 'MINUS VACANCY BUFFER', math: '− 4% to 8%', desc: 'Factoring tenant changeover and turnaround inspection' },
        { step: '03', label: 'MINUS OPERATING SERVICE CHARGES', math: '− 12% to 22%', desc: 'DLD Mollak approved building maintenance & chiller' },
        { step: '04', label: 'MINUS PROPERTY MANAGEMENT', math: '− 5% to 8%', desc: 'Licensed agency tenant vetting, rent collection & legalities' },
        { step: '05', label: 'MINUS CONTINGENCY & INSURANCE', math: '− 1% to 2%', desc: 'Routine HVAC servicing and landlord property coverage' },
        { step: '06', label: 'ESTIMATED NET DISTRIBUTABLE YIELD', math: '═ ~65% to 75% of Gross', desc: 'Actual cash flow banked by property owner' }
      ],
      investorImplication: {
        title: 'WHAT THIS MEANS FOR AN INVESTOR',
        content: 'A luxury property with an 8.5% advertised gross yield in an older tower with high service fees (e.g. AED 34/sq.ft.) and frequent vacancy may yield less net cash flow than an ultra-prime residence with a 6.2% gross yield, AED 14/sq.ft. service charges, and zero tenant churn. Underwriting must always evaluate the net bottom line.'
      },
      whatToCheck: {
        title: 'WHAT TO CHECK',
        items: [
          'Historical Mollak Service Charges: Check the official DLD Mollak portal for historical service charge rates per square foot before submitting an acquisition offer.',
          'Registered Ejari Comps: Verify actual achieved rental contracts registered on the DLD REST database rather than speculative portal asking prices.',
          'Short-Term (DTCM) vs Long-Term Leases: Short-term holiday lets can generate higher headline revenues during peak winter season (Nov–April), but incur 18–25% operator fees and summer demand tapering.'
        ]
      },
      sourceNote: 'VERIFIED BENCHMARKS / ILLUSTRATIVE DEMO DATA. Net yields depend on individual property specifications, building management quality, and market conditions. No rental return is guaranteed.'
    }
  },

  {
    id: 'market-fundamentals',
    index: '03',
    category: 'MARKET FUNDAMENTALS',
    headline: 'CAPITAL\nFOLLOWS DEMAND.',
    highlightStat: 'GLOBAL DEMAND',
    highlightLabel: 'STRUCTURAL GROWTH DRIVERS',
    summary: 'Property returns are shaped by the relationship between demand, supply, pricing, rental activity and liquidity.',
    keywords: ['DEMAND', 'SUPPLY', 'TRANSACTIONS', 'PRICING', 'LIQUIDITY'],
    interactionCue: 'UNDERSTAND THE MARKET →',
    bgImage: '/images/craft_arch.jpg',
    
    // Expanded Layer 2 Information
    expanded: {
      title: 'THE MARKET BEHIND THE PROPERTY.',
      sections: [
        {
          heading: 'POPULATION & WEALTH MIGRATION',
          content: "Dubai's resident population expanded past 3.65 million in 2023, tracking toward a projected 5.8 million under the Dubai 2040 Urban Master Plan. Sustained growth is propelled by international entrepreneurship visas, multinational regional headquarters, and geopolitical wealth relocation from Europe, the UK, Asia, and the Americas."
        },
        {
          heading: 'DUBAI IS NOT ONE PROPERTY MARKET',
          content: 'The city does not move as a single uniform index. Performance diverges dramatically across distinct market tiers: Ultra-Prime Waterfront Enclaves (Palm Jumeirah, Jumeirah Bay) face finite geographical scarcity, while secondary inland suburban developments face significant off-plan delivery volume that can exert downward pressure on rental yields.'
        },
        {
          heading: 'SUPPLY CYCLES & REALISTIC HORIZONS',
          content: 'Over-reliance on the assumption that "Dubai property always goes up" is an amateur error. The market moves through distinct macroeconomic cycles dictated by global interest rates, currency valuation (AED pegged to USD), and handover schedules. Sound acquisitions prioritize prime location defensibility over speculative momentum.'
        }
      ],
      investorImplication: {
        title: 'WHAT THIS MEANS FOR AN INVESTOR',
        content: 'Long-term capital security is achieved by acquiring limited-supply typologies — such as high-spec 3-bedroom waterfront residences or bespoke private villas — in established prime nodes where tenant demand permanently outstrips newly completed inventory.'
      },
      whatToCheck: {
        title: 'WHAT TO CHECK',
        items: [
          'Developer Track Record & Escrow Status: Verify developer balance sheets, past project handover delays, and official RERA project escrow accounts on the DLD portal.',
          'Pipeline within 3km Radius: Audit scheduled handovers over the next 24 to 36 months in the immediate neighborhood to evaluate potential rent compression.',
          'Infrastructure Completion: Confirm walking accessibility to transport networks, private schools, premium dining, and medical infrastructure.'
        ]
      },
      sourceNote: 'Data grounded in Dubai Land Department Quarterly Reports, Dubai Statistics Center Official Censuses, and Dubai 2040 Urban Master Plan documentation.'
    }
  },

  {
    id: 'ownership-access',
    index: '04',
    category: 'OWNERSHIP & ACCESS',
    headline: 'INVESTING\nWITHOUT BORDERS.',
    highlightStat: 'GLOBAL ACCESS',
    highlightLabel: '100% FOREIGN FREEHOLD',
    summary: "International investors can access Dubai's property market subject to applicable ownership rules, regulations and transaction requirements.",
    keywords: ['FREEHOLD', 'ACQUISITION', 'FINANCING', 'RESIDENCY', 'EXIT'],
    interactionCue: 'SEE HOW IT WORKS →',
    bgImage: '/images/jumeirah_bay_island.jpg',
    
    // Expanded Layer 2 Information
    expanded: {
      title: 'FROM PURCHASE TO EXIT.',
      lifecycle: [
        {
          phase: '01',
          name: 'FIND',
          desc: 'Select a property in an officially designated Freehold Zone (Law No. 7 of 2006). Over 60 prime zones — including Downtown, Palm Jumeirah, Dubai Marina, and DIFC — grant 100% foreign freehold ownership rights with perpetual title.'
        },
        {
          phase: '02',
          name: 'VERIFY',
          desc: 'Conduct legal, financial, and structural due diligence: verify title deed authenticity via the government DLD REST app, review RERA escrow balances for off-plan assets, audit Mollak service charges, and conduct independent MEP snagging inspections.'
        },
        {
          phase: '03',
          name: 'ACQUIRE',
          desc: 'Execute the standardized Dubai Land Department Unified Form F (MOU) with a 10% deposit held by an authorized escrow broker. Obtain the developer No Objection Certificate (NOC) and complete formal title transfer at a DLD Registration Trustee office.'
        },
        {
          phase: '04',
          name: 'OPERATE',
          desc: 'Register all tenancy agreements through the mandatory government Ejari system. Contract a licensed RERA property management firm to handle tenant screening, rent collection via Central Bank direct debit or certified cheques, and maintenance.'
        },
        {
          phase: '05',
          name: 'EXIT',
          desc: 'Liquidate assets on the transparent secondary market with zero local capital gains withholding. Repatriate capital freely through UAE Central Bank banking rails in foreign currencies (USD, EUR, GBP) without capital export controls.'
        }
      ],
      investorImplication: {
        title: 'WHAT THIS MEANS FOR AN INVESTOR',
        content: 'Dubai offers institutional-grade property rights backed by government blockchain-enabled title deeds, standardized contracts, and English-law commercial arbitration (DIFC Courts), creating legal transparency comparable to London, New York, or Singapore.'
      },
      whatToCheck: {
        title: 'RESIDENCY & REGULATORY CAVEATS',
        items: [
          'UAE 10-Year Golden Visa: Investors acquiring completed or off-plan properties valued at AED 2,000,000 or greater qualify to apply for the renewable 10-Year Golden Visa for themselves, spouse, and family.',
          'IMPORTANT REGULATORY DISTINCTION: Property ownership confers a residency visa privilege, NOT UAE citizenship, passport, or second nationality. Residency status remains conditional upon maintaining qualifying real estate ownership and official regulatory criteria.',
          'Freehold vs Leasehold: Ensure the contract explicitly specifies Freehold ownership (unlimited perpetuity) rather than Usufruct or Leasehold rights (limited to 30–99 years).'
        ]
      },
      sourceNote: 'Governed by Dubai Law No. 7 of 2006 (Property Registration), Law No. 8 of 2007 (Escrow Accounts), and UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) Golden Visa guidelines.'
    }
  }
];

export const CREDIBILITY_METRICS = [
  'LOCATION',
  'ENTRY PRICE',
  'RENTAL DEMAND',
  'VACANCY',
  'SERVICE CHARGES',
  'MAINTENANCE',
  'FINANCING',
  'TRANSACTION COSTS',
  'LIQUIDITY',
  'EXIT STRATEGY'
];
