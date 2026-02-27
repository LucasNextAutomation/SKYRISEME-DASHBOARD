import type { Client } from "./mock-data";

interface ParsedQuery {
  nationality?: string;
  minBudget?: number;
  maxBudget?: number;
  keywords: string[];
  status?: string;
  qualification?: string;
  chips: { label: string; value: string; color: string }[];
}

const nationalityMap: Record<string, string> = {
  lebanese: "Lebanese",
  saudi: "Saudi",
  emirati: "Emirati",
  uae: "Emirati",
  kuwaiti: "Kuwaiti",
  french: "French",
  american: "American",
  us: "American",
  usa: "American",
  british: "British",
  uk: "British",
};

const propertyTypeKeywords: Record<string, string> = {
  villa: "Villa",
  apartment: "Apartment",
  penthouse: "Penthouse",
  duplex: "Duplex",
  land: "Land",
  office: "Office",
  studio: "Studio",
};

const buyerTypeKeywords: Record<string, string> = {
  "gulf investor": "Investment",
  "investment buyer": "Investment",
  "expat family": "Family",
  retiree: "Retirement",
};

const locationKeywords = [
  "achrafieh", "gemmayzeh", "verdun", "rabieh", "baabda",
  "jounieh", "dbayeh", "broummana", "beit mery", "downtown beirut",
  "saifi", "hamra", "kaslik", "seaside", "mountain", "corniche",
];

const statusKeywords: Record<string, string> = {
  active: "Active",
  warm: "Warm",
  cold: "Cold",
};

const qualKeywords: Record<string, string> = {
  "a+": "A+",
  uhnw: "A+",
  "ultra high": "A+",
};

export function parseNLPQuery(raw: string): ParsedQuery {
  const q = raw.toLowerCase().trim();
  const chips: ParsedQuery["chips"] = [];
  const keywords: string[] = [];
  let nationality: string | undefined;
  let minBudget: number | undefined;
  let status: string | undefined;
  let qualification: string | undefined;

  // Nationality
  for (const [key, val] of Object.entries(nationalityMap)) {
    if (q.includes(key)) {
      nationality = val;
      chips.push({ label: "Nationality", value: val, color: "bg-blue-100 text-blue-700" });
      break;
    }
  }

  // Budget: "above 2M", "over 3m", "> 1.5m", "2-5m", "under 2m"
  const budgetAbove = q.match(/(?:above|over|>|more than|min(?:imum)?)\s*(?:\$)?\s*(\d+(?:\.\d+)?)\s*m/i);
  const budgetRange = q.match(/(\d+(?:\.\d+)?)\s*[-\u2013to]+\s*(\d+(?:\.\d+)?)\s*m/i);
  const budgetK = q.match(/(?:above|over|>)\s*(?:\$)?\s*(\d+)\s*k/i);
  if (budgetAbove) {
    minBudget = parseFloat(budgetAbove[1]) * 1_000_000;
    chips.push({ label: "Budget", value: `> $${budgetAbove[1]}M`, color: "bg-emerald-100 text-emerald-700" });
  } else if (budgetRange) {
    minBudget = parseFloat(budgetRange[1]) * 1_000_000;
    chips.push({ label: "Budget", value: `$${budgetRange[1]}-${budgetRange[2]}M`, color: "bg-emerald-100 text-emerald-700" });
  } else if (budgetK) {
    minBudget = parseFloat(budgetK[1]) * 1_000;
    chips.push({ label: "Budget", value: `> $${budgetK[1]}K`, color: "bg-emerald-100 text-emerald-700" });
  }

  // Status
  for (const [key, val] of Object.entries(statusKeywords)) {
    if (q.includes(key)) {
      status = val;
      chips.push({ label: "Status", value: val, color: "bg-amber-100 text-amber-700" });
      break;
    }
  }

  // Qualification
  for (const [key, val] of Object.entries(qualKeywords)) {
    if (q.includes(key)) {
      qualification = val;
      chips.push({ label: "Qualification", value: val, color: "bg-purple-100 text-purple-700" });
      break;
    }
  }

  // Location keywords
  for (const loc of locationKeywords) {
    if (q.includes(loc)) {
      keywords.push(loc);
      chips.push({ label: "Location", value: loc.charAt(0).toUpperCase() + loc.slice(1), color: "bg-orange-100 text-orange-700" });
    }
  }

  // Property type keywords
  for (const [key, val] of Object.entries(propertyTypeKeywords)) {
    if (q.includes(key)) {
      keywords.push(key);
      chips.push({ label: "Type", value: val, color: "bg-purple-100 text-purple-700" });
      break;
    }
  }

  // Buyer type keywords
  for (const [key, val] of Object.entries(buyerTypeKeywords)) {
    if (q.includes(key)) {
      keywords.push(key);
      chips.push({ label: "Profile", value: val, color: "bg-indigo-100 text-indigo-700" });
      break;
    }
  }

  return { nationality, minBudget, keywords, status, qualification, chips };
}

function parseBudgetNumber(budget: string): number {
  const match = budget.match(/\$?([\d.]+)/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  if (budget.toLowerCase().includes("m")) return num * 1_000_000;
  if (budget.toLowerCase().includes("k")) return num * 1_000;
  return num;
}

function getMaxBudget(budget: string): number {
  // Handle ranges like "$3-5M"
  const range = budget.match(/\$?([\d.]+)\s*[-\u2013]\s*([\d.]+)\s*m/i);
  if (range) return parseFloat(range[2]) * 1_000_000;
  const rangeK = budget.match(/\$?([\d.]+)\s*[-\u2013]\s*([\d.]+)\s*k/i);
  if (rangeK) return parseFloat(rangeK[2]) * 1_000;
  return parseBudgetNumber(budget);
}

export function nlpFilterClients(clients: Client[], query: string): Client[] {
  if (!query.trim()) return clients;

  const parsed = parseNLPQuery(query);

  // If no NLP tokens found, fall back to text search
  if (parsed.chips.length === 0) {
    const q = query.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nationality.toLowerCase().includes(q) ||
        c.budget.toLowerCase().includes(q) ||
        c.preference.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return clients.filter((c) => {
    if (parsed.nationality && c.nationality !== parsed.nationality) return false;
    if (parsed.minBudget && getMaxBudget(c.budget) < parsed.minBudget) return false;
    if (parsed.status && c.status !== parsed.status) return false;
    if (parsed.qualification && c.qualification !== parsed.qualification) return false;
    if (parsed.keywords.length > 0) {
      const clientText = `${c.preference} ${c.tags.join(" ")} ${c.properties.map((p) => p.address + " " + p.name).join(" ")}`.toLowerCase();
      // Property type: match against preference and tags
      for (const [key, val] of Object.entries(propertyTypeKeywords)) {
        if (parsed.keywords.includes(key)) {
          const prefAndTags = `${c.preference} ${c.tags.join(" ")}`.toLowerCase();
          if (!prefAndTags.includes(key) && !prefAndTags.includes(val.toLowerCase())) return false;
        }
      }
      // Buyer type: match against tags
      for (const [key, val] of Object.entries(buyerTypeKeywords)) {
        if (parsed.keywords.includes(key)) {
          if (!c.tags.some((t) => t.toLowerCase().includes(val.toLowerCase()))) return false;
        }
      }
      // General location keywords
      const nonTypeKeywords = parsed.keywords.filter(
        (kw) => !propertyTypeKeywords[kw] && !Object.keys(buyerTypeKeywords).includes(kw)
      );
      if (nonTypeKeywords.length > 0 && !nonTypeKeywords.some((kw) => clientText.includes(kw))) return false;
    }
    return true;
  });
}
