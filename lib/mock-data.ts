export interface Client {
  id: string;
  name: string;
  flag: string;
  nationality: string;
  budget: string;
  preference: string;
  status: "Active" | "Warm" | "Cold";
  lastContact: string;
  channel: "whatsapp" | "email" | "linkedin" | "phone";
  initials: string;
  tags: string[];
  timeline: TimelineEntry[];
  properties: MatchedProperty[];
  notes: Note[];
  engagementScore: number;
  qualification: "A+" | "A" | "B" | "C";
  source: string;
  family?: { name: string; relation: string }[];
  referredBy?: string;
}

export interface TimelineEntry {
  id: string;
  channel: "whatsapp" | "email" | "linkedin";
  direction: "inbound" | "outbound";
  preview: string;
  subject?: string;
  timestamp: string;
}

export interface MatchedProperty {
  id: string;
  name: string;
  address: string;
  price: string;
  size: string;
  match: number;
}

export interface Note {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Signal {
  id: string;
  source: "Database" | "Market" | "Lead";
  title: string;
  location: string;
  estimatedValue: string;
  priority: "High" | "Medium";
  gerant?: string;
  details: string;
  detectedAt: string;
  matchingClients?: { name: string; matchScore: number }[];
  expandedDetails?: {
    gerantAddress?: string;
    parcels?: string;
    comparable?: string;
    energyClass?: string;
    renovationEstimate?: string;
  };
}

export interface PipelineContact {
  id: string;
  name: string;
  initials: string;
  budget: string;
  stage: "dormant" | "sequence" | "reengaged";
  daysInactive?: number;
  step?: string;
  lastSent?: string;
  response?: string;
  aiTag?: string;
  sequenceEmails?: { subject: string; status: "sent" | "pending" }[];
  conversionProbability?: number;
}

export interface ActivityItem {
  id: string;
  type: "whatsapp" | "email" | "signal" | "reengagement" | "property" | "linkedin";
  title: string;
  description: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: "signal" | "match" | "reengagement" | "message";
}

// =============================================================================
// CLIENTS - 6 clients with Lebanese real estate context
// =============================================================================

export const clients: Client[] = [
  // 1. AL-KHOURY FAMILY - Lebanese, $1-2M, Achrafieh penthouse
  {
    id: "alkhoury",
    name: "Al-Khoury Family",
    flag: "\u{1F1F1}\u{1F1E7}",
    nationality: "Lebanese",
    budget: "$1-2M",
    preference: "Penthouse in Achrafieh",
    status: "Active",
    lastContact: "1h ago",
    channel: "whatsapp",
    initials: "AK",
    tags: ["Local buyer", "Penthouse", "Achrafieh", "A+ qualified"],
    engagementScore: 94,
    qualification: "A+",
    source: "Referral",
    family: [
      { name: "Nadia Al-Khoury", relation: "Spouse" },
      { name: "Georges Al-Khoury", relation: "Father - CEO Al-Khoury Group" },
    ],
    referredBy: "Tony Haddad",
    timeline: [
      { id: "t1", channel: "whatsapp", direction: "inbound", preview: "Hi Maha, we loved the Achrafieh penthouse photos. Can we visit Saturday morning?", timestamp: "1h ago" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "Of course! I'll confirm the owner and send you the details. 10am works?", timestamp: "1h ago" },
      { id: "t3", channel: "email", direction: "outbound", preview: "Penthouse brochure attached - 320sqm with panoramic Beirut views", subject: "Achrafieh Penthouse - Exclusive Listing", timestamp: "Yesterday" },
      { id: "t4", channel: "whatsapp", direction: "inbound", preview: "The brochure looks amazing. My wife wants to know about the building amenities.", timestamp: "Yesterday" },
      { id: "t5", channel: "email", direction: "inbound", preview: "Following up on the Gemmayzeh duplex we discussed last week - is it still available?", subject: "Re: Gemmayzeh Duplex Inquiry", timestamp: "3 days ago" },
    ],
    properties: [
      { id: "p1", name: "Sky Residence Penthouse", address: "Rue Gouraud, Achrafieh", price: "$1,850,000", size: "320 sqm", match: 96 },
      { id: "p2", name: "Gemmayzeh Heritage Duplex", address: "Rue Pasteur, Gemmayzeh", price: "$1,200,000", size: "280 sqm", match: 88 },
      { id: "p3", name: "Saifi Village Apartment", address: "Saifi Village, Downtown", price: "$950,000", size: "200 sqm", match: 72 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Family prioritizes panoramic views and modern finishes. Father is financing.", timestamp: "2 days ago" },
      { id: "n2", author: "AI", content: "High engagement - 94% score. Responded to every listing within 2 hours. Ready to close.", timestamp: "1 day ago" },
    ],
  },
  // 2. PRINCE AL-SAUD - Saudi investor, $2-5M, luxury villas
  {
    id: "alsaud",
    name: "Prince Al-Saud",
    flag: "\u{1F1F8}\u{1F1E6}",
    nationality: "Saudi",
    budget: "$2-5M",
    preference: "Luxury villa in Rabieh",
    status: "Active",
    lastContact: "3h ago",
    channel: "email",
    initials: "AS",
    tags: ["Gulf investor", "Villa", "Rabieh", "A+ qualified", "Investment"],
    engagementScore: 88,
    qualification: "A+",
    source: "Direct inquiry",
    family: [
      { name: "Fatima Al-Saud", relation: "Spouse" },
    ],
    referredBy: undefined,
    timeline: [
      { id: "t1", channel: "email", direction: "inbound", preview: "I'm looking for a prestigious villa in the Rabieh or Baabda area, minimum 500sqm with pool and garden.", subject: "Villa Inquiry - Rabieh Area", timestamp: "3h ago" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Your Highness, thank you for reaching out. I have 3 exceptional villas that match your criteria perfectly.", subject: "Re: Villa Inquiry - Rabieh Area", timestamp: "2h ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "The Rabieh villa with the infinity pool looks excellent. When can we arrange a viewing?", timestamp: "1h ago" },
    ],
    properties: [
      { id: "p1", name: "Royal Rabieh Estate", address: "Main Road, Rabieh", price: "$4,200,000", size: "800 sqm", match: 95 },
      { id: "p2", name: "Presidential Villa Baabda", address: "Presidential District, Baabda", price: "$3,500,000", size: "650 sqm", match: 90 },
      { id: "p3", name: "Mountain View Mansion", address: "Hillside, Broummana", price: "$2,800,000", size: "550 sqm", match: 82 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "VIP client. Prefers private viewings. Has budget for premium properties. Wants gated community.", timestamp: "Today" },
    ],
  },
  // 3. DUBOIS FAMILY - French expats, $500K-1M, Gemmayzeh apartment
  {
    id: "dubois",
    name: "Dubois Family",
    flag: "\u{1F1EB}\u{1F1F7}",
    nationality: "French",
    budget: "$500K-1M",
    preference: "Apartment in Gemmayzeh",
    status: "Active",
    lastContact: "Yesterday",
    channel: "email",
    initials: "DF",
    tags: ["French expat", "Apartment", "Gemmayzeh", "Heritage", "A qualified"],
    engagementScore: 78,
    qualification: "A",
    source: "Website",
    family: [
      { name: "Claire Dubois", relation: "Spouse" },
      { name: "Lucas Dubois", relation: "Son - 12 years old" },
    ],
    timeline: [
      { id: "t1", channel: "email", direction: "inbound", preview: "Bonjour Maha, nous cherchons un appartement avec du caractere dans le quartier de Gemmayzeh.", subject: "Recherche appartement Gemmayzeh", timestamp: "Yesterday" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Bonjour! J'ai plusieurs biens qui pourraient vous plaire dans ce quartier. Voici une premiere selection.", subject: "Re: Recherche appartement Gemmayzeh", timestamp: "Yesterday" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "Merci Maha! The heritage apartment on Rue Gouraud looks perfect. Is it renovated?", timestamp: "Today" },
    ],
    properties: [
      { id: "p1", name: "Heritage Loft Gemmayzeh", address: "Rue Gouraud, Gemmayzeh", price: "$780,000", size: "180 sqm", match: 92 },
      { id: "p2", name: "Modern Flat Achrafieh", address: "Sassine Square, Achrafieh", price: "$650,000", size: "150 sqm", match: 76 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "French family relocating to Beirut. Want character and walkability. Bilingual communication.", timestamp: "Yesterday" },
    ],
  },
  // 4. AL-RASHID - Emirati investor, $1-3M, multiple units
  {
    id: "alrashid",
    name: "Khalid Al-Rashid",
    flag: "\u{1F1E6}\u{1F1EA}",
    nationality: "Emirati",
    budget: "$1-3M",
    preference: "Multiple investment units in Verdun",
    status: "Warm",
    lastContact: "4 days ago",
    channel: "whatsapp",
    initials: "KR",
    tags: ["Gulf investor", "Multi-unit", "Verdun", "Investment", "B qualified"],
    engagementScore: 62,
    qualification: "B",
    source: "LinkedIn",
    timeline: [
      { id: "t1", channel: "linkedin", direction: "inbound", preview: "Interested in investment opportunities in Beirut. Looking for rental yield properties.", timestamp: "1 week ago" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "Welcome Khalid! Verdun offers excellent rental yields of 7-9%. Let me prepare a portfolio.", timestamp: "5 days ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "Thanks Maha. I'll review the portfolio and get back to you next week.", timestamp: "4 days ago" },
    ],
    properties: [
      { id: "p1", name: "Verdun Tower Apartments", address: "Rue Verdun, Verdun", price: "$450,000/unit", size: "120 sqm/unit", match: 85 },
      { id: "p2", name: "Dbayeh Marina Residences", address: "Marina, Dbayeh", price: "$380,000/unit", size: "100 sqm/unit", match: 78 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Investor profile. Looking for 3-5 units for rental income. Follow up next week.", timestamp: "4 days ago" },
    ],
  },
  // 5. THOMPSON - American investor, $800K-1.5M, Jounieh area
  {
    id: "thompson",
    name: "Michael Thompson",
    flag: "\u{1F1FA}\u{1F1F8}",
    nationality: "American",
    budget: "$800K-1.5M",
    preference: "Seaside apartment in Jounieh",
    status: "Warm",
    lastContact: "1 week ago",
    channel: "email",
    initials: "MT",
    tags: ["American expat", "Seaside", "Jounieh", "Retirement", "B qualified"],
    engagementScore: 55,
    qualification: "B",
    source: "Referral",
    referredBy: "Embassy contact",
    timeline: [
      { id: "t1", channel: "email", direction: "inbound", preview: "Hi Maha, I'm a Lebanese-American looking to retire in Lebanon. Jounieh area preferred.", subject: "Retirement Property Search", timestamp: "1 week ago" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Welcome Michael! Jounieh has some beautiful seaside options. Let me curate a selection for you.", subject: "Re: Retirement Property Search", timestamp: "6 days ago" },
    ],
    properties: [
      { id: "p1", name: "Jounieh Bay Residence", address: "Corniche, Jounieh", price: "$1,200,000", size: "220 sqm", match: 88 },
      { id: "p2", name: "Kaslik Seafront", address: "Kaslik Main Road, Jounieh", price: "$850,000", size: "170 sqm", match: 80 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Lebanese heritage. Retiring from tech career in Silicon Valley. Wants sea view and modern amenities.", timestamp: "6 days ago" },
    ],
  },
  // 6. AL-SABAH - Kuwaiti, $3-5M, Beit Mery villa
  {
    id: "alsabah",
    name: "Sheikha Al-Sabah",
    flag: "\u{1F1F0}\u{1F1FC}",
    nationality: "Kuwaiti",
    budget: "$3-5M",
    preference: "Mountain villa in Beit Mery",
    status: "Cold",
    lastContact: "3 weeks ago",
    channel: "phone",
    initials: "SA",
    tags: ["Gulf investor", "Villa", "Beit Mery", "Mountain", "C qualified"],
    engagementScore: 35,
    qualification: "C",
    source: "Agent referral",
    timeline: [
      { id: "t1", channel: "whatsapp", direction: "outbound", preview: "Sheikha, I have a stunning mountain villa in Beit Mery that just listed. Would love to share details.", timestamp: "2 weeks ago" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "Following up on the Beit Mery property. The seller is open to negotiation.", timestamp: "3 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Beit Mery Panoramic Villa", address: "Mountain Road, Beit Mery", price: "$3,800,000", size: "700 sqm", match: 90 },
      { id: "p2", name: "Broummana Garden Estate", address: "Main Street, Broummana", price: "$4,500,000", size: "900 sqm", match: 75 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Summer residence buyer. Has not responded in 3 weeks. Consider re-engagement sequence.", timestamp: "1 week ago" },
    ],
  },
];

// =============================================================================
// PIPELINE CONTACTS
// =============================================================================

export const pipelineContacts: PipelineContact[] = [
  {
    id: "pc1",
    name: "Omar Hayek",
    initials: "OH",
    budget: "$600K",
    stage: "dormant",
    daysInactive: 75,
    aiTag: "Was actively searching in Verdun. Price sensitivity noted.",
  },
  {
    id: "pc2",
    name: "Rania Chamoun",
    initials: "RC",
    budget: "$1.2M",
    stage: "dormant",
    daysInactive: 92,
    aiTag: "Interested in Achrafieh. Lost contact after viewing.",
  },
  {
    id: "pc3",
    name: "Faisal Al-Thani",
    initials: "FT",
    budget: "$2M",
    stage: "sequence",
    step: "Step 2 of 4",
    lastSent: "2 days ago",
    sequenceEmails: [
      { subject: "New luxury listings in Rabieh", status: "sent" },
      { subject: "Market update: Beirut premium sector Q1 2026", status: "sent" },
      { subject: "Exclusive villa - private viewing invitation", status: "pending" },
      { subject: "Investment opportunity - limited availability", status: "pending" },
    ],
    conversionProbability: 42,
  },
  {
    id: "pc4",
    name: "Layla Nassar",
    initials: "LN",
    budget: "$800K",
    stage: "sequence",
    step: "Step 3 of 4",
    lastSent: "Yesterday",
    sequenceEmails: [
      { subject: "Welcome back - new Gemmayzeh listings", status: "sent" },
      { subject: "Heritage apartments curated for you", status: "sent" },
      { subject: "Exclusive brochure - Rue Gouraud collection", status: "sent" },
      { subject: "Private viewing this weekend?", status: "pending" },
    ],
    conversionProbability: 58,
  },
  {
    id: "pc5",
    name: "Ahmad Hariri",
    initials: "AH",
    budget: "$1.5M",
    stage: "reengaged",
    response: "Interested — wants updated listings",
    conversionProbability: 72,
  },
  {
    id: "pc6",
    name: "Salma El-Masri",
    initials: "SM",
    budget: "$950K",
    stage: "reengaged",
    response: "Scheduled viewing for next Thursday",
    conversionProbability: 85,
  },
  {
    id: "pc7",
    name: "Pierre Gemayel",
    initials: "PG",
    budget: "$2.5M",
    stage: "dormant",
    daysInactive: 120,
    aiTag: "High-value prospect. Was looking at Jounieh penthouses.",
  },
  {
    id: "pc8",
    name: "Noor Al-Qassimi",
    initials: "NQ",
    budget: "$3M",
    stage: "sequence",
    step: "Step 1 of 4",
    lastSent: "Today",
    sequenceEmails: [
      { subject: "Curated mountain villas for summer residence", status: "sent" },
      { subject: "Broummana & Beit Mery market report", status: "pending" },
      { subject: "Private estate - just listed", status: "pending" },
      { subject: "Viewing invitation - mountain collection", status: "pending" },
    ],
    conversionProbability: 35,
  },
];

// =============================================================================
// SIGNALS (Database / Market / Lead)
// =============================================================================

export const signals: Signal[] = [
  {
    id: "s1",
    source: "Database",
    title: "347 duplicate properties detected",
    location: "All regions",
    estimatedValue: "$82M total",
    priority: "High",
    details: "AI scan found 347 potential duplicate entries across Apimo CRM and Excel imports. Merging would clean 11.6% of the database.",
    detectedAt: "2h ago",
    matchingClients: [
      { name: "Al-Khoury Family", matchScore: 3 },
      { name: "Dubois Family", matchScore: 2 },
    ],
    expandedDetails: {
      comparable: "Achrafieh: 89 duplicates, Verdun: 67, Jounieh: 54, Rabieh: 42, Others: 95",
    },
  },
  {
    id: "s2",
    source: "Market",
    title: "Achrafieh prices up 12% YoY",
    location: "Achrafieh",
    estimatedValue: "$1.2M avg",
    priority: "High",
    details: "Market data shows Achrafieh premium segment increased 12% year-over-year. New developments driving demand.",
    detectedAt: "4h ago",
    matchingClients: [
      { name: "Al-Khoury Family", matchScore: 96 },
      { name: "Dubois Family", matchScore: 78 },
    ],
  },
  {
    id: "s3",
    source: "Lead",
    title: "New inquiry from Saudi investor group",
    location: "Rabieh / Baabda",
    estimatedValue: "$5-10M",
    priority: "High",
    details: "Investment group from Riyadh inquired about bulk villa purchases in the Rabieh-Baabda corridor. Budget: $5-10M for 3-5 properties.",
    detectedAt: "Today",
    matchingClients: [
      { name: "Prince Al-Saud", matchScore: 88 },
    ],
  },
  {
    id: "s4",
    source: "Database",
    title: "892 properties missing key fields",
    location: "All regions",
    estimatedValue: "N/A",
    priority: "Medium",
    details: "Database audit found 892 properties missing photos, floor plans, or pricing. AI can auto-fill 340 from Apimo data.",
    detectedAt: "Yesterday",
  },
  {
    id: "s5",
    source: "Market",
    title: "Jounieh rental yield trending 8.5%",
    location: "Jounieh",
    estimatedValue: "$450K-1.2M",
    priority: "Medium",
    details: "Jounieh seaside apartments showing strong rental yields at 8.5%, attracting Gulf and diaspora investors.",
    detectedAt: "2 days ago",
    matchingClients: [
      { name: "Michael Thompson", matchScore: 82 },
      { name: "Khalid Al-Rashid", matchScore: 75 },
    ],
  },
  {
    id: "s6",
    source: "Lead",
    title: "French embassy staff relocation wave",
    location: "Achrafieh / Gemmayzeh",
    estimatedValue: "$400K-800K",
    priority: "Medium",
    details: "3 new French diplomatic staff looking for apartments in Achrafieh/Gemmayzeh area. Budget range $400K-$800K each.",
    detectedAt: "3 days ago",
    matchingClients: [
      { name: "Dubois Family", matchScore: 70 },
    ],
  },
];

// =============================================================================
// ACTIVITY FEED
// =============================================================================

export const activityFeed: ActivityItem[] = [
  { id: "a1", type: "property", title: "Database cleanup batch #12 complete", description: "47 duplicates merged, 23 missing fields filled from Apimo sync", timestamp: "15 min ago" },
  { id: "a2", type: "whatsapp", title: "Voice note from Al-Khoury", description: "Transcribed: Wants to schedule Achrafieh penthouse visit for Saturday", timestamp: "1h ago" },
  { id: "a3", type: "email", title: "Follow-up sequence sent", description: "Step 2 sent to Faisal Al-Thani - Market update with Rabieh listings", timestamp: "2h ago" },
  { id: "a4", type: "signal", title: "New lead: Saudi investment group", description: "$5-10M budget for Rabieh-Baabda villas. Auto-matched to Prince Al-Saud.", timestamp: "3h ago" },
  { id: "a5", type: "reengagement", title: "Ahmad Hariri re-engaged", description: "Responded to sequence after 90 days dormant. Wants updated listings.", timestamp: "4h ago" },
  { id: "a6", type: "property", title: "AI staging completed", description: "3 Gemmayzeh apartments staged in Modern Luxury style. Ready for review.", timestamp: "5h ago" },
  { id: "a7", type: "whatsapp", title: "Voice note processed", description: "Maha's note about Dubois meeting transcribed and CRM updated automatically", timestamp: "Yesterday" },
  { id: "a8", type: "email", title: "Follow-up sent to Layla Nassar", description: "Step 3 - Exclusive brochure for Rue Gouraud heritage collection", timestamp: "Yesterday" },
  { id: "a9", type: "signal", title: "Market alert: Achrafieh +12%", description: "Premium segment prices rising. 4 matching clients notified.", timestamp: "Yesterday" },
  { id: "a10", type: "linkedin", title: "New connection: Pierre Gemayel", description: "High-value prospect added from LinkedIn. $2.5M budget, Jounieh interest.", timestamp: "2 days ago" },
];

// =============================================================================
// NOTIFICATIONS
// =============================================================================

export const notifications: Notification[] = [
  { id: "n1", title: "347 duplicates found", description: "Database scan complete - review and merge recommended", timestamp: "2h ago", read: false, type: "signal" },
  { id: "n2", title: "New Saudi investor inquiry", description: "$5-10M budget group from Riyadh - high priority lead", timestamp: "3h ago", read: false, type: "match" },
  { id: "n3", title: "Ahmad Hariri re-engaged", description: "Responded after 90 days - wants updated Achrafieh listings", timestamp: "4h ago", read: false, type: "reengagement" },
  { id: "n4", title: "Voice note transcribed", description: "Al-Khoury wants Saturday penthouse viewing - auto-added to calendar", timestamp: "1h ago", read: true, type: "message" },
  { id: "n5", title: "AI staging ready", description: "3 Gemmayzeh properties staged - awaiting your review", timestamp: "5h ago", read: true, type: "signal" },
  { id: "n6", title: "Achrafieh market up 12%", description: "4 clients with matching criteria notified automatically", timestamp: "Yesterday", read: true, type: "match" },
];

// =============================================================================
// DATABASE HEALTH
// =============================================================================

export const databaseHealth = {
  totalProperties: 3000,
  duplicatesFound: 347,
  missingFields: 892,
  outdatedListings: 234,
  cleanedThisMonth: 1247,
  healthScore: 72,
  active: 42,
  warm: 28,
  cold: 18,
  archived: 12,
  recoveredPipeline: "$4.2M",
};
