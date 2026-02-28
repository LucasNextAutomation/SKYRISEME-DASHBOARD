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
      { name: "Karim Al-Khoury", relation: "Brother - Architect" },
    ],
    referredBy: "Tony Haddad",
    timeline: [
      { id: "t1", channel: "whatsapp", direction: "inbound", preview: "Hi Maha, we loved the Achrafieh penthouse photos. Can we visit Saturday morning?", timestamp: "1h ago" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "Of course! I'll confirm the owner and send you the details. 10am works?", timestamp: "1h ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "Perfect, 10am. Nadia wants to know if the terrace faces the sea or the mountain side?", timestamp: "2h ago" },
      { id: "t4", channel: "email", direction: "outbound", preview: "Penthouse brochure attached - 320sqm with panoramic Beirut views, 85sqm wraparound terrace facing both sea and mountain.", subject: "Achrafieh Penthouse - Exclusive Listing", timestamp: "Yesterday" },
      { id: "t5", channel: "whatsapp", direction: "inbound", preview: "The brochure looks amazing. My wife wants to know about the building amenities - is there a pool on the roof?", timestamp: "Yesterday" },
      { id: "t6", channel: "whatsapp", direction: "outbound", preview: "Yes! Rooftop infinity pool, gym, 24/7 concierge, 3 underground parking spots included. Building completed in 2024.", timestamp: "Yesterday" },
      { id: "t7", channel: "email", direction: "inbound", preview: "Following up on the Gemmayzeh duplex we discussed last week - is it still available? My brother Karim (architect) wants to see it.", subject: "Re: Gemmayzeh Duplex Inquiry", timestamp: "3 days ago" },
      { id: "t8", channel: "email", direction: "outbound", preview: "The Gemmayzeh duplex is still available. I can arrange a viewing with Karim any day this week. The stone facade is original 1920s.", subject: "Re: Gemmayzeh Duplex Inquiry", timestamp: "3 days ago" },
      { id: "t9", channel: "whatsapp", direction: "inbound", preview: "Maha, quick question - what's the maintenance fee for the Sky Residence? My father wants to compare with his building in Rabieh.", timestamp: "5 days ago" },
      { id: "t10", channel: "whatsapp", direction: "outbound", preview: "Monthly maintenance is $1,200 covering pool, gym, concierge, generator, and common areas. Very reasonable for the amenities.", timestamp: "5 days ago" },
      { id: "t11", channel: "whatsapp", direction: "inbound", preview: "That's actually quite good. My father's building charges $800 without half those amenities. We're seriously considering it.", timestamp: "5 days ago" },
      { id: "t12", channel: "email", direction: "outbound", preview: "Comparative market analysis for Achrafieh penthouses: $4,800-$6,200/sqm. Sky Residence at $5,780/sqm is well-positioned.", subject: "Market Analysis - Achrafieh Premium Penthouses", timestamp: "1 week ago" },
      { id: "t13", channel: "whatsapp", direction: "inbound", preview: "We visited the Saifi apartment yesterday on our own - nice area but too small. We need minimum 280sqm.", timestamp: "1 week ago" },
      { id: "t14", channel: "whatsapp", direction: "outbound", preview: "Understood! I'll focus on 280sqm+ listings. I have a new penthouse in Sioufi coming to market next week - 340sqm with garden.", timestamp: "1 week ago" },
      { id: "t15", channel: "linkedin", direction: "inbound", preview: "Maha, Georges Al-Khoury here (Nadia's father-in-law). Impressive portfolio. Let's discuss investment opportunities as well.", timestamp: "2 weeks ago" },
      { id: "t16", channel: "email", direction: "outbound", preview: "Welcome to SkyRise Me! I'd love to share our Achrafieh penthouse collection. Attached: 5 exclusive off-market listings.", subject: "Welcome - Premium Achrafieh Listings", timestamp: "3 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Sky Residence Penthouse", address: "Rue Gouraud, Achrafieh", price: "$1,850,000", size: "320 sqm", match: 96 },
      { id: "p2", name: "Gemmayzeh Heritage Duplex", address: "Rue Pasteur, Gemmayzeh", price: "$1,200,000", size: "280 sqm", match: 88 },
      { id: "p3", name: "Saifi Village Apartment", address: "Saifi Village, Downtown", price: "$950,000", size: "200 sqm", match: 72 },
      { id: "p4", name: "Sioufi Garden Penthouse", address: "Rue de Sioufi, Achrafieh", price: "$1,650,000", size: "340 sqm + 60sqm garden", match: 94 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Family prioritizes panoramic views and modern finishes. Father (Georges) is financing - CEO of Al-Khoury Group, major construction firm. Budget flexible if right property.", timestamp: "2 days ago" },
      { id: "n2", author: "AI", content: "High engagement - 94% score. Responded to every listing within 2 hours. Ready to close. Pattern: wife Nadia drives aesthetic decisions, Georges controls budget.", timestamp: "1 day ago" },
      { id: "n3", author: "Maha", content: "Brother Karim is an architect - could be useful for renovation assessments. Wants to see the Gemmayzeh duplex's structural integrity.", timestamp: "4 days ago" },
      { id: "n4", author: "Maha", content: "Tony Haddad referred them. Tony closed with us last year on a Rabieh villa - strong referral network. Send Tony a thank-you gift.", timestamp: "2 weeks ago" },
      { id: "n5", author: "AI", content: "Client mentioned father's building in Rabieh for comparison - possible second transaction. Flag Georges as separate high-value prospect for investment portfolio.", timestamp: "5 days ago" },
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
      { name: "Abdullah Al-Saud", relation: "Son - Managing investments" },
    ],
    referredBy: undefined,
    timeline: [
      { id: "t1", channel: "email", direction: "inbound", preview: "Maha, my son Abdullah will be in Beirut next Thursday. Can you arrange 3 private viewings in one morning? He has authority to make an offer.", subject: "Viewing Schedule - Next Thursday", timestamp: "3h ago" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Your Highness, I've arranged viewings at 9am (Royal Rabieh Estate), 10:30am (Presidential Villa), and 12pm (Broummana Mansion). Driver will be provided.", subject: "Re: Viewing Schedule - Next Thursday", timestamp: "2h ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "The Rabieh villa with the infinity pool looks excellent. My wife asked about the garden size - is it suitable for entertaining 50+ guests?", timestamp: "Yesterday" },
      { id: "t4", channel: "whatsapp", direction: "outbound", preview: "Absolutely. The garden is 400sqm with mature cedar trees, outdoor kitchen, and the pool area can accommodate 80+ guests comfortably.", timestamp: "Yesterday" },
      { id: "t5", channel: "email", direction: "outbound", preview: "Please find attached the full property dossier for Royal Rabieh Estate: land deed, building permits, architectural plans, and drone footage.", subject: "Royal Rabieh Estate - Complete Dossier", timestamp: "2 days ago" },
      { id: "t6", channel: "email", direction: "inbound", preview: "Dossier received. The drone footage is impressive. One concern: what's the security situation? We need 24/7 gated access.", subject: "Re: Royal Rabieh Estate - Complete Dossier", timestamp: "2 days ago" },
      { id: "t7", channel: "whatsapp", direction: "outbound", preview: "Rabieh is one of the most secure residential areas in Lebanon. The estate is in a gated compound with guards, CCTV, and separate staff entrance.", timestamp: "2 days ago" },
      { id: "t8", channel: "whatsapp", direction: "inbound", preview: "Good. What about the Baabda villa? I noticed it's near the presidential palace - any restrictions on foreign ownership there?", timestamp: "3 days ago" },
      { id: "t9", channel: "email", direction: "outbound", preview: "No foreign ownership restrictions in Baabda for GCC nationals. I've confirmed with our legal team. The proximity to the palace actually enhances security.", subject: "Baabda Villa - Legal Clearance", timestamp: "3 days ago" },
      { id: "t10", channel: "whatsapp", direction: "inbound", preview: "Excellent. Also interested in the rental income potential. What would the Broummana property yield if we don't use it year-round?", timestamp: "4 days ago" },
      { id: "t11", channel: "email", direction: "outbound", preview: "Broummana summer rental market analysis: $8,000-$15,000/month in peak season (June-September). Annual yield estimate: 4.5-6% of property value.", subject: "Broummana Rental Yield Analysis", timestamp: "4 days ago" },
      { id: "t12", channel: "email", direction: "inbound", preview: "I'm looking for a prestigious villa in the Rabieh or Baabda area, minimum 500sqm with pool and garden. Budget up to $5M for the right property.", subject: "Villa Inquiry - Rabieh Area", timestamp: "1 week ago" },
      { id: "t13", channel: "email", direction: "outbound", preview: "Your Highness, thank you for reaching out. I have 3 exceptional villas that match your criteria perfectly. Brochures attached.", subject: "Re: Villa Inquiry - Rabieh Area", timestamp: "1 week ago" },
      { id: "t14", channel: "linkedin", direction: "inbound", preview: "Connected via mutual contact. Interested in Lebanon luxury real estate for summer residence and investment.", timestamp: "2 weeks ago" },
      { id: "t15", channel: "email", direction: "outbound", preview: "Welcome to SkyRise Me. As a premier real estate advisory in Lebanon, we specialize in ultra-premium properties for discerning Gulf clients.", subject: "Welcome - SkyRise Me Premium Portfolio", timestamp: "2 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Royal Rabieh Estate", address: "Main Road, Rabieh", price: "$4,200,000", size: "800 sqm + 400sqm garden", match: 95 },
      { id: "p2", name: "Presidential Villa Baabda", address: "Presidential District, Baabda", price: "$3,500,000", size: "650 sqm", match: 90 },
      { id: "p3", name: "Mountain View Mansion", address: "Hillside, Broummana", price: "$2,800,000", size: "550 sqm", match: 82 },
      { id: "p4", name: "Cedar Heights Compound", address: "Yarze, Baabda", price: "$3,900,000", size: "720 sqm gated", match: 87 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "VIP client. Prefers private viewings with no other visitors present. Has budget for premium properties. Wants gated community with staff quarters.", timestamp: "Today" },
      { id: "n2", author: "AI", content: "Son Abdullah is the decision-maker for logistics. Schedule all viewings through him. Prince reviews final shortlist with wife Fatima.", timestamp: "2 days ago" },
      { id: "n3", author: "Maha", content: "Security is top priority. All properties must have gated access, CCTV, and space for security detail. Rabieh compound ticks all boxes.", timestamp: "3 days ago" },
      { id: "n4", author: "Maha", content: "Interested in rental yield for months they're not in Lebanon (Oct-May). Broummana best for summer rental market. Could be hybrid investment+residence.", timestamp: "4 days ago" },
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
      { name: "Claire Dubois", relation: "Spouse - Works at French Embassy" },
      { name: "Lucas Dubois", relation: "Son - 12 years old" },
      { name: "Sophie Dubois", relation: "Daughter - 8 years old" },
    ],
    timeline: [
      { id: "t1", channel: "whatsapp", direction: "inbound", preview: "Merci Maha! The heritage apartment on Rue Gouraud looks perfect. Is it renovated or do we need to budget for works?", timestamp: "Yesterday" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "It's been partially renovated - new kitchen and bathrooms, but the original stone walls and arches are preserved. Budget ~$40K for finishing touches.", timestamp: "Yesterday" },
      { id: "t3", channel: "email", direction: "inbound", preview: "Bonjour Maha, nous cherchons un appartement avec du caractere dans le quartier de Gemmayzeh. Proximite des ecoles francophones importante.", subject: "Recherche appartement Gemmayzeh", timestamp: "2 days ago" },
      { id: "t4", channel: "email", direction: "outbound", preview: "Bonjour! J'ai plusieurs biens qui pourraient vous plaire. Le College Protestant est a 10 min a pied de tous ces listings.", subject: "Re: Recherche appartement Gemmayzeh", timestamp: "2 days ago" },
      { id: "t5", channel: "whatsapp", direction: "inbound", preview: "Claire loved the photos of the stone arches. Can we visit this weekend? Saturday afternoon works for us.", timestamp: "3 days ago" },
      { id: "t6", channel: "whatsapp", direction: "outbound", preview: "Saturday 2pm confirmed! I'll also show you the Mar Mikhael loft next door - it's a bit edgier but very characterful. Walking distance between both.", timestamp: "3 days ago" },
      { id: "t7", channel: "email", direction: "inbound", preview: "Quick question about parking. We have two cars - is parking available in the building or nearby?", subject: "Parking - Gemmayzeh Apartments", timestamp: "5 days ago" },
      { id: "t8", channel: "email", direction: "outbound", preview: "The Heritage Loft includes 1 underground spot. I can negotiate a second spot for $25,000. Alternatively, there's a public garage 2 min walk.", subject: "Re: Parking - Gemmayzeh Apartments", timestamp: "5 days ago" },
      { id: "t9", channel: "whatsapp", direction: "inbound", preview: "Antoine (my colleague at the embassy) bought in Achrafieh last year and loves it. But we really prefer the Gemmayzeh vibe.", timestamp: "1 week ago" },
      { id: "t10", channel: "whatsapp", direction: "outbound", preview: "Gemmayzeh has the best character in Beirut! I also added a Sassine Square listing - more practical for families but still has charm.", timestamp: "1 week ago" },
      { id: "t11", channel: "email", direction: "outbound", preview: "Here's a neighborhood guide I prepared: Gemmayzeh schools, restaurants, parks, and weekend markets. Perfect for families with young children.", subject: "Gemmayzeh Living - Family Guide", timestamp: "1 week ago" },
      { id: "t12", channel: "email", direction: "inbound", preview: "Maha, the guide is wonderful! Claire shared it with her embassy colleagues. Two of them might be interested too. Can I pass your contact?", subject: "Re: Gemmayzeh Living - Family Guide", timestamp: "8 days ago" },
      { id: "t13", channel: "whatsapp", direction: "outbound", preview: "Of course! Happy to help them too. I'll prepare a special diplomatic relocation package. Merci for the referrals!", timestamp: "8 days ago" },
      { id: "t14", channel: "email", direction: "inbound", preview: "We found your website while searching for Beirut apartments. We're a French family relocating for my wife's embassy posting.", subject: "New Inquiry - French Family", timestamp: "2 weeks ago" },
      { id: "t15", channel: "email", direction: "outbound", preview: "Bienvenue! I specialize in helping expat families find the perfect home in Beirut. Let me prepare a curated selection based on your needs.", subject: "Re: New Inquiry - Welcome to Beirut!", timestamp: "2 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Heritage Loft Gemmayzeh", address: "Rue Gouraud, Gemmayzeh", price: "$780,000", size: "180 sqm", match: 92 },
      { id: "p2", name: "Modern Flat Achrafieh", address: "Sassine Square, Achrafieh", price: "$650,000", size: "150 sqm", match: 76 },
      { id: "p3", name: "Mar Mikhael Artist Loft", address: "Armenia Street, Mar Mikhael", price: "$520,000", size: "140 sqm", match: 84 },
      { id: "p4", name: "Sursock Heritage Apartment", address: "Rue Sursock, Achrafieh", price: "$920,000", size: "210 sqm", match: 80 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "French family relocating to Beirut for Claire's embassy posting (3-year minimum). Want character and walkability. Bilingual communication preferred.", timestamp: "Yesterday" },
      { id: "n2", author: "AI", content: "Strong referral potential - Claire works at French Embassy with rotating diplomatic staff. Already offered to refer 2 colleagues. Nurture this relationship.", timestamp: "3 days ago" },
      { id: "n3", author: "Maha", content: "Kids attend College Protestant Francais - 10 min walk from Gemmayzeh listings. School proximity is a deal-breaker for Claire.", timestamp: "5 days ago" },
      { id: "n4", author: "Maha", content: "Prefer heritage buildings with character (stone arches, high ceilings) over modern towers. Budget flexible up to $950K for the right property.", timestamp: "1 week ago" },
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
      { id: "t1", channel: "whatsapp", direction: "inbound", preview: "Thanks Maha. I'll review the portfolio and get back to you next week. Need to discuss with my partner in Dubai.", timestamp: "4 days ago" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Khalid, here's the complete Verdun investment portfolio: 8 units across 3 buildings, avg yield 7.8%, occupancy rate 94%.", subject: "Verdun Investment Portfolio - 8 Units", timestamp: "5 days ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "What's the rental demand like in Verdun? I heard Hamra is getting more popular with students.", timestamp: "5 days ago" },
      { id: "t4", channel: "whatsapp", direction: "outbound", preview: "Verdun is premium residential - families and professionals. Higher rents, longer leases. Hamra is student market - higher turnover, lower yield.", timestamp: "5 days ago" },
      { id: "t5", channel: "email", direction: "outbound", preview: "Welcome Khalid! Verdun offers excellent rental yields of 7-9%. I've prepared a detailed portfolio with 5 investment opportunities.", subject: "Verdun Investment Opportunities", timestamp: "1 week ago" },
      { id: "t6", channel: "whatsapp", direction: "inbound", preview: "I saw the Dbayeh marina project online. Is that a better investment than Verdun apartments?", timestamp: "1 week ago" },
      { id: "t7", channel: "whatsapp", direction: "outbound", preview: "Different profiles. Dbayeh is new construction, higher capital appreciation potential. Verdun is established, stable rental income. Depends on your strategy.", timestamp: "1 week ago" },
      { id: "t8", channel: "email", direction: "inbound", preview: "Can you prepare a comparison sheet? Verdun rental vs Dbayeh capital appreciation over 5 years.", subject: "Investment Comparison Request", timestamp: "8 days ago" },
      { id: "t9", channel: "email", direction: "outbound", preview: "Attached: 5-year projection comparing both strategies. Verdun: steady 7.5% yield. Dbayeh: projected 25-35% capital gain on completion.", subject: "Re: Investment Comparison Request", timestamp: "8 days ago" },
      { id: "t10", channel: "linkedin", direction: "inbound", preview: "Interested in investment opportunities in Beirut. Looking for rental yield properties. Connected through Dubai Real Estate Forum.", timestamp: "2 weeks ago" },
      { id: "t11", channel: "email", direction: "outbound", preview: "Khalid, great connecting! Lebanon offers some of the highest rental yields in the region. Let me share our investor prospectus.", subject: "Welcome - Lebanon Investment Guide", timestamp: "2 weeks ago" },
      { id: "t12", channel: "whatsapp", direction: "inbound", preview: "I've invested in Dubai and Oman. Lebanon is new territory for me. What's the legal framework for GCC investors?", timestamp: "2 weeks ago" },
      { id: "t13", channel: "whatsapp", direction: "outbound", preview: "GCC nationals can own up to 3,000sqm without special permission. No restrictions on resale. I'll send you our legal brief prepared by our attorney.", timestamp: "2 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Verdun Tower - 3 Units Package", address: "Rue Verdun, Verdun", price: "$1,350,000 (3 units)", size: "120 sqm/unit", match: 85 },
      { id: "p2", name: "Dbayeh Marina Residences", address: "Marina, Dbayeh", price: "$380,000/unit", size: "100 sqm/unit", match: 78 },
      { id: "p3", name: "Hamra Student Housing Block", address: "Bliss Street, Hamra", price: "$280,000/unit", size: "75 sqm/unit", match: 65 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Investor profile with partner in Dubai. Looking for 3-5 units for rental income. Comparing Verdun vs Dbayeh strategies. Follow up next week after partner review.", timestamp: "4 days ago" },
      { id: "n2", author: "AI", content: "Engagement dipped after sending portfolio - went from daily WhatsApp to 4-day silence. Likely discussing with Dubai partner. Send gentle follow-up Tuesday.", timestamp: "2 days ago" },
      { id: "n3", author: "Maha", content: "Has experience investing in Dubai and Oman. Understands real estate markets well. Needs legal comfort on Lebanese ownership framework for GCC nationals.", timestamp: "1 week ago" },
      { id: "n4", author: "Maha", content: "Prefers turnkey apartments - no renovation projects. Modern buildings with property management in place. Verdun Tower has on-site management.", timestamp: "8 days ago" },
    ],
  },
  // 5. THOMPSON - American diaspora, $800K-1.5M, Jounieh area
  {
    id: "thompson",
    name: "Michael Thompson",
    flag: "\u{1F1FA}\u{1F1F8}",
    nationality: "American",
    budget: "$800K-1.5M",
    preference: "Seaside apartment in Jounieh",
    status: "Warm",
    lastContact: "3 days ago",
    channel: "email",
    initials: "MT",
    tags: ["American diaspora", "Seaside", "Jounieh", "Retirement", "B qualified"],
    engagementScore: 55,
    qualification: "B",
    source: "Referral",
    referredBy: "Embassy contact",
    timeline: [
      { id: "t1", channel: "email", direction: "inbound", preview: "Maha, I've been thinking about the Jounieh Bay Residence. What's the condo fee situation? In the US we call them HOA fees.", subject: "Re: Jounieh Properties - HOA Equivalent?", timestamp: "3 days ago" },
      { id: "t2", channel: "email", direction: "outbound", preview: "Great question! Monthly syndic fees at Jounieh Bay are $600/month covering generator, water pump, elevator, and pool maintenance.", subject: "Re: Jounieh Properties - HOA Equivalent?", timestamp: "3 days ago" },
      { id: "t3", channel: "whatsapp", direction: "inbound", preview: "$600 is nothing compared to San Jose! My HOA there is $1,200. This is looking more and more appealing.", timestamp: "3 days ago" },
      { id: "t4", channel: "email", direction: "inbound", preview: "Can you explain the electricity situation? I've read about power cuts. Is the building generator reliable?", subject: "Electricity & Infrastructure", timestamp: "5 days ago" },
      { id: "t5", channel: "email", direction: "outbound", preview: "All recommended buildings have 24/7 generator backup. Jounieh Bay has a brand-new Caterpillar diesel generator covering all units. Also, solar panels on the roof.", subject: "Re: Electricity & Infrastructure", timestamp: "5 days ago" },
      { id: "t6", channel: "whatsapp", direction: "inbound", preview: "Solar panels? That's impressive. My tech friends would approve. What about internet speed?", timestamp: "5 days ago" },
      { id: "t7", channel: "whatsapp", direction: "outbound", preview: "Fiber optic available in all Jounieh waterfront buildings. 100Mbps+ easily. Most expats work remotely with zero issues.", timestamp: "5 days ago" },
      { id: "t8", channel: "email", direction: "outbound", preview: "Michael, here's a comparison of Jounieh vs Kaslik seaside properties. Both within your budget, but different vibes.", subject: "Jounieh vs Kaslik - Seaside Living Comparison", timestamp: "1 week ago" },
      { id: "t9", channel: "email", direction: "inbound", preview: "Hi Maha, I'm a Lebanese-American looking to retire in Lebanon. Jounieh area preferred - spent summers there as a kid with my teta.", subject: "Retirement Property Search", timestamp: "10 days ago" },
      { id: "t10", channel: "email", direction: "outbound", preview: "Welcome Michael! What a beautiful connection to Jounieh. The waterfront has transformed - modern towers with sea views and all amenities.", subject: "Re: Retirement Property Search", timestamp: "10 days ago" },
      { id: "t11", channel: "whatsapp", direction: "inbound", preview: "My mother was from Ghazir, just above Jounieh. Any properties in that area too? Mountain and sea views would be the dream.", timestamp: "10 days ago" },
      { id: "t12", channel: "whatsapp", direction: "outbound", preview: "Ghazir has some stunning villas with dual views! Let me add 2 options there. The winding road up is part of the charm.", timestamp: "10 days ago" },
      { id: "t13", channel: "email", direction: "inbound", preview: "One more thing - I'll need to transfer funds from the US. Any recommendations for international wire transfers to Lebanon?", subject: "Fund Transfer Logistics", timestamp: "12 days ago" },
      { id: "t14", channel: "email", direction: "outbound", preview: "I work with a specialized attorney who handles US-Lebanon property transactions. Fresh money accounts are fully legal and protected. I'll connect you.", subject: "Re: Fund Transfer Logistics", timestamp: "12 days ago" },
    ],
    properties: [
      { id: "p1", name: "Jounieh Bay Residence", address: "Corniche, Jounieh", price: "$1,200,000", size: "220 sqm", match: 88 },
      { id: "p2", name: "Kaslik Seafront", address: "Kaslik Main Road, Jounieh", price: "$850,000", size: "170 sqm", match: 80 },
      { id: "p3", name: "Ghazir Panoramic Villa", address: "Old Road, Ghazir", price: "$980,000", size: "300 sqm + garden", match: 75 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Lebanese heritage - mother from Ghazir, spent childhood summers in Jounieh. Strong emotional connection to the area. This will close on feeling, not just numbers.", timestamp: "3 days ago" },
      { id: "n2", author: "AI", content: "Engagement pattern: responds within 24-48h to emails but prefers detailed written answers over WhatsApp. Engineer mindset - wants data on infrastructure, costs, legal.", timestamp: "5 days ago" },
      { id: "n3", author: "Maha", content: "Retiring from Silicon Valley tech career. Budget is solid ($1.5M liquid). Concerned about infrastructure (electricity, internet) - answered all concerns satisfactorily.", timestamp: "6 days ago" },
      { id: "n4", author: "Maha", content: "Will need legal support for US-Lebanon fund transfer. Connected him with Maitre Rizk for fresh money account setup. Follow up in 1 week.", timestamp: "12 days ago" },
      { id: "n5", author: "AI", content: "HOA comparison to US costs is a strong selling point he mentioned himself. Use cost-of-living comparison as closing argument when ready.", timestamp: "3 days ago" },
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
    referredBy: "Nabil Fadel (Kuwait broker)",
    timeline: [
      { id: "t1", channel: "whatsapp", direction: "outbound", preview: "Sheikha, I hope you're well. New listing alert: a stunning estate in Beit Mery just came to market. 900sqm with century-old pine trees. Shall I send details?", timestamp: "1 week ago" },
      { id: "t2", channel: "whatsapp", direction: "outbound", preview: "Sheikha, I have a stunning mountain villa in Beit Mery that just listed. Pine forest views, private heated pool, and full staff quarters.", timestamp: "2 weeks ago" },
      { id: "t3", channel: "whatsapp", direction: "outbound", preview: "Following up on the Beit Mery property. The seller is open to negotiation - they've reduced the asking price by $200,000.", timestamp: "3 weeks ago" },
      { id: "t4", channel: "email", direction: "inbound", preview: "Maha, thank you for the Beit Mery details. Very interested but we won't be visiting Lebanon until July. Can we continue the conversation then?", subject: "Re: Beit Mery Villa - Summer Visit", timestamp: "3 weeks ago" },
      { id: "t5", channel: "email", direction: "outbound", preview: "Of course! I'll keep you updated on any premium mountain listings. The summer market in Beit Mery and Broummana is very competitive - early decisions help.", subject: "Re: Beit Mery Villa - Summer Visit", timestamp: "3 weeks ago" },
      { id: "t6", channel: "whatsapp", direction: "inbound", preview: "We usually spend July-September in Lebanon. Need a villa with at least 5 bedrooms, pool, and mountain views. Staff quarters essential.", timestamp: "1 month ago" },
      { id: "t7", channel: "whatsapp", direction: "outbound", preview: "Perfect timing! Summer properties go fast in the mountain. I'll curate 3-4 top villas that match. All with staff quarters and pool.", timestamp: "1 month ago" },
      { id: "t8", channel: "email", direction: "outbound", preview: "Sheikha, welcome to SkyRise Me! Here's our mountain villa collection: Beit Mery, Broummana, and Dhour El Choueir. All premium estates.", subject: "Mountain Villa Collection - Summer 2026", timestamp: "1 month ago" },
      { id: "t9", channel: "email", direction: "inbound", preview: "We were referred by Nabil Fadel from Kuwait. Looking for a summer residence in the Lebanese mountains. Traditional and prestigious.", subject: "Summer Villa Inquiry", timestamp: "5 weeks ago" },
      { id: "t10", channel: "email", direction: "outbound", preview: "Sheikha, delighted to receive Nabil's referral! The Lebanese mountains offer exactly what you're looking for. Let me prepare a bespoke selection.", subject: "Re: Summer Villa Inquiry - Welcome", timestamp: "5 weeks ago" },
      { id: "t11", channel: "linkedin", direction: "outbound", preview: "Connected with Sheikha Al-Sabah via Nabil Fadel's introduction. Premium Gulf client seeking mountain estate.", timestamp: "5 weeks ago" },
      { id: "t12", channel: "whatsapp", direction: "inbound", preview: "Nabil told me you're the best for mountain properties. We had a bad experience with another agent last year - showed us properties below our standard.", timestamp: "5 weeks ago" },
      { id: "t13", channel: "whatsapp", direction: "outbound", preview: "I understand completely. My curated approach means you only see properties that match your exact standard. No wasted time, I promise.", timestamp: "5 weeks ago" },
    ],
    properties: [
      { id: "p1", name: "Beit Mery Panoramic Villa", address: "Mountain Road, Beit Mery", price: "$3,800,000", size: "700 sqm + 500sqm garden", match: 90 },
      { id: "p2", name: "Broummana Garden Estate", address: "Main Street, Broummana", price: "$4,500,000", size: "900 sqm", match: 75 },
      { id: "p3", name: "Dhour El Choueir Pine Estate", address: "Pine Forest Road, Dhour El Choueir", price: "$3,200,000", size: "600 sqm + pine forest", match: 82 },
      { id: "p4", name: "Beit Mery Heritage Manor", address: "Old Village, Beit Mery", price: "$4,100,000", size: "800 sqm restored", match: 88 },
    ],
    notes: [
      { id: "n1", author: "Maha", content: "Summer residence buyer - only visits July-September. Won't visit until July. Keep warm with monthly market updates and new listings. Don't over-message.", timestamp: "1 week ago" },
      { id: "n2", author: "AI", content: "Engagement dropped after 'will visit in July' message. Expected seasonal pattern for Gulf summer buyers. Re-engagement window: May-June with urgency messaging.", timestamp: "3 days ago" },
      { id: "n3", author: "Maha", content: "Referred by Nabil Fadel (Kuwait). Had bad experience with another agent - showed below-standard properties. Must only present top-tier listings to maintain trust.", timestamp: "1 month ago" },
      { id: "n4", author: "Maha", content: "Needs 5+ bedrooms, pool, staff quarters, mountain views. Traditional Lebanese architecture preferred but with modern amenities. Budget up to $5M.", timestamp: "5 weeks ago" },
      { id: "n5", author: "AI", content: "Schedule re-engagement sequence for May 15: 'Summer is approaching - your curated mountain villa shortlist' with 3D virtual tours to spark interest before their July visit.", timestamp: "Today" },
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
