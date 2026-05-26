export type PlatformCategory = "syndication" | "marketplace" | "website" | "social";

export type Platform = {
  id: string;
  name: string;
  category: PlatformCategory;
  /** Background color for the square logo tile */
  bg: string;
  /** Foreground color for the letter / glyph */
  fg: string;
  /** Short letter / glyph rendered inside the tile */
  glyph: string;
  /** Whether to render the glyph in italic for a more wordmark-y feel */
  italic?: boolean;
  /** Whether to use a CSS gradient instead of bg (overrides bg) */
  gradient?: string;
};

export const PLATFORMS: Platform[] = [
  // Syndication
  { id: "vincue",          name: "Vincue",          category: "syndication", bg: "#E83E54", fg: "#fff",   glyph: "W",  italic: true },

  // Marketplaces
  { id: "autotrader",      name: "Autotrader",      category: "marketplace", bg: "#ED8939", fg: "#fff",   glyph: "AT" },
  { id: "cars",            name: "Cars.com",        category: "marketplace", bg: "#7F6AF2", fg: "#fff",   glyph: "C." },
  { id: "kbb-marketplace", name: "Kellybluebook",   category: "marketplace", bg: "#1E3A8A", fg: "#FFCC00",glyph: "★" },
  { id: "cargurus",        name: "CarGurus",        category: "marketplace", bg: "#22C55E", fg: "#fff",   glyph: "CG" },
  { id: "truecar",         name: "TrueCar",         category: "marketplace", bg: "#0EA5E9", fg: "#fff",   glyph: "TC" },

  // Website
  { id: "spyne-smartview", name: "Spyne Smartview", category: "website",     bg: "#F4F0FF", fg: "#4600F2",glyph: "▭" },
  { id: "dealerprovider",  name: "Dealerprovider",  category: "website",     bg: "#ED8939", fg: "#fff",   glyph: "D" },
  { id: "kbb-website",     name: "Kellybluebook",   category: "website",     bg: "#1E3A8A", fg: "#FFCC00",glyph: "★" },

  // Social
  { id: "facebook",        name: "Facebook",        category: "social",      bg: "#1877F2", fg: "#fff",   glyph: "f" },
  { id: "instagram",       name: "Instagram",       category: "social",      bg: "#fff",    fg: "#fff",   glyph: "◌", gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #515BD4 100%)" },
  { id: "tiktok",          name: "TikTok",          category: "social",      bg: "#000",    fg: "#fff",   glyph: "♪" },
];

export const PLATFORMS_BY_CATEGORY: Record<PlatformCategory, Platform[]> = {
  syndication: PLATFORMS.filter(p => p.category === "syndication"),
  marketplace: PLATFORMS.filter(p => p.category === "marketplace"),
  website:     PLATFORMS.filter(p => p.category === "website"),
  social:      PLATFORMS.filter(p => p.category === "social"),
};

export type PublishedTo = {
  platformId: string;
  /** ISO date when this platform was published to */
  publishedAt: string;
};
