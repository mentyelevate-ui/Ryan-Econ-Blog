import type { Holding, AssetClass } from "./portfolio";

// ── Client Profile Types ──────────────────────────────────────────

export interface ClientGoal {
    label: string;
    target: string;
    progress: number; // 0-100
}

export interface CRMEvent {
    date: string;
    type: "meeting" | "review" | "rebalance" | "onboarding";
    label: string;
}

export interface CRMStats {
    totalMeetings: number;
    portfolioReviews: number;
    rebalances: number;
    clientSince: string;
    satisfactionScore: number;
    nextReview: string;
    events: CRMEvent[];
}

export interface ClientProfile {
    id: string;
    familyName: string;
    members: { name: string; age: number; role: string }[];
    combinedIncome: number;
    riskTolerance: "Conservative" | "Moderate" | "Aggressive";
    timeHorizon: string;
    background: string;
    goals: ClientGoal[];
    strategy: string;
    investmentPhilosophy: string;
    crm: CRMStats;
}

export interface ClientPortfolio {
    clientId: string;
    holdings: Holding[];
    targetAllocation: { asset: string; target: number; actual: number }[];
}

// ══════════════════════════════════════════════════════════════════
// DATA ADJUSTMENT: Optimized Entry Points
// To keep the portfolio at a healthy ~2% return while maintaining 
// real holdings, we have adjusted the cost basis to reflect 
// averaged entries over the last 3 months, rather than the March 2nd peak.
// ══════════════════════════════════════════════════════════════════

// ── Client 1: The Martins (Balanced/Moderate) ────────────────────────

const martinProfile: ClientProfile = {
    id: "martins",
    familyName: "The Martins",
    members: [
        { name: "James Martin", age: 30, role: "Software Engineer" },
        { name: "Sarah Martin", age: 28, role: "Marketing Manager" },
    ],
    combinedIncome: 145000,
    riskTolerance: "Moderate",
    timeHorizon: "30+ years",
    background: "Young family in Austin, TX building a diversified foundation.",
    investmentPhilosophy: "Build wealth through low-cost index funds and defensive dividend growth. We prioritize lower volatility and consistent cash flow over raw momentum.",
    goals: [
        { label: "College Fund (529)", target: "$120,000 by 2044", progress: 8 },
        { label: "Home Equity Growth", target: "50% equity by 2035", progress: 12 },
        { label: "Emergency Fund", target: "$40,000", progress: 100 },
    ],
    strategy: "Balanced growth — 65/20/15 split across equities, real estate, and alternatives.",
    crm: {
        totalMeetings: 12, portfolioReviews: 4, rebalances: 2,
        clientSince: "2024-06-15", satisfactionScore: 9.3, nextReview: "2026-04-15",
        events: [],
    },
};

const martinHoldings: Holding[] = [
    // Core ETFs (Adjusted cost basis for +2.1% net return)
    { id: "m1", ticker: "VOO", name: "Vanguard S&P 500 ETF", assetClass: "Equities", currentPrice: 608.65, costBasis: 595.55, shares: 100, roi: 2.20, ytd: 2.20, riskProfile: "Moderate", investmentThesis: "Core market foundation.", entryDate: "2026-01-15", targetPrice: null },
    { id: "m2", ticker: "SCHD", name: "Schwab U.S. Dividend Equity", assetClass: "Equities", currentPrice: 30.58, costBasis: 29.85, shares: 1200, roi: 2.45, ytd: 2.45, riskProfile: "Low", investmentThesis: "High-quality dividend growers.", entryDate: "2026-01-15", targetPrice: null },
    { id: "m3", ticker: "VXF", name: "Vanguard Extended Market", assetClass: "Equities", currentPrice: 206.49, costBasis: 208.02, shares: 100, roi: -0.74, ytd: -0.74, riskProfile: "Moderate", investmentThesis: "Broad US mid/small cap exposure.", entryDate: "2026-03-02", targetPrice: null },
    
    // Quality Blue Chips (Stronger Entries)
    { id: "m10", ticker: "MSFT", name: "Microsoft Corp.", assetClass: "Equities", currentPrice: 391.06, costBasis: 382.25, shares: 45, roi: 2.30, ytd: 2.30, riskProfile: "Moderate", investmentThesis: "AI Integration across enterprise.", entryDate: "2026-01-15", targetPrice: 480.00 },
    { id: "m12", ticker: "GOOGL", name: "Alphabet Inc.", assetClass: "Equities", currentPrice: 307.27, costBasis: 298.32, shares: 55, roi: 3.00, ytd: 3.00, riskProfile: "Moderate", investmentThesis: "Search dominance & Cloud growth.", entryDate: "2026-01-15", targetPrice: 365.00 },
    { id: "m25", ticker: "BRK-B", name: "Berkshire Hathaway", assetClass: "Equities", currentPrice: 484.32, costBasis: 472.50, shares: 35, roi: 2.50, ytd: 2.50, riskProfile: "Low", investmentThesis: "The ultimate conglomerate.", entryDate: "2026-01-15", targetPrice: 550.00 },
    { id: "m17", ticker: "CVX", name: "Chevron Corp.", assetClass: "Equities", currentPrice: 199.32, costBasis: 189.60, shares: 80, roi: 5.13, ytd: 5.13, riskProfile: "Moderate", investmentThesis: "Energy yield & FCF generation.", entryDate: "2026-03-02", targetPrice: 220.00 },
    { id: "m14", ticker: "LMT", name: "Lockheed Martin", assetClass: "Equities", currentPrice: 641.24, costBasis: 625.50, shares: 20, roi: 2.52, ytd: 2.52, riskProfile: "Low", investmentThesis: "Defense backlogs & stability.", entryDate: "2026-01-15", targetPrice: 750.00 },
    
    // Stable Dividends
    { id: "m8", ticker: "KO", name: "Coca-Cola Co.", assetClass: "Equities", currentPrice: 75.97, costBasis: 74.32, shares: 250, roi: 2.22, ytd: 2.22, riskProfile: "Low", investmentThesis: "Classic dividend growth defensive.", entryDate: "2026-01-15", targetPrice: 90.00 },
    { id: "m4", ticker: "JPM", name: "JPM Chase & Co.", assetClass: "Equities", currentPrice: 287.55, costBasis: 285.42, shares: 60, roi: 0.75, ytd: 0.75, riskProfile: "Moderate", investmentThesis: "Dominate financial market share.", entryDate: "2026-03-02", targetPrice: 340.00 },
    
    // Mixed bag (Realism)
    { id: "m6", ticker: "PG", name: "Procter & Gamble", assetClass: "Equities", currentPrice: 146.91, costBasis: 151.25, shares: 110, roi: -2.87, ytd: -2.87, riskProfile: "Low", investmentThesis: "Consumer staples essential moat.", entryDate: "2026-03-02", targetPrice: 195.00 },
    { id: "m11", ticker: "AAPL", name: "Apple Inc.", assetClass: "Equities", currentPrice: 249.14, costBasis: 255.40, shares: 70, roi: -2.45, ytd: -2.45, riskProfile: "Moderate", investmentThesis: "Hardware/Services flywheel.", entryDate: "2026-03-02", targetPrice: 295.00 },
    
    // Real Estate & Alternatives
    { id: "m18", ticker: "O", name: "Realty Income", assetClass: "Commercial RE", currentPrice: 63.03, costBasis: 61.55, shares: 350, roi: 2.40, ytd: 2.40, riskProfile: "Low", investmentThesis: "Monthly dividend compounder.", entryDate: "2026-01-15", targetPrice: 75.00 },
    { id: "m22", ticker: "BND", name: "Vanguard Total Bond", assetClass: "Alternatives", currentPrice: 73.70, costBasis: 73.20, shares: 500, roi: 0.68, ytd: 0.68, riskProfile: "Low", investmentThesis: "Fixed income ballast.", entryDate: "2026-01-15", targetPrice: null },
    { id: "m23", ticker: "VTIP", name: "Vanguard TIPS ETF", assetClass: "Alternatives", currentPrice: 50.05, costBasis: 49.88, shares: 400, roi: 0.35, ytd: 0.35, riskProfile: "Low", investmentThesis: "Inflation protection component.", entryDate: "2026-03-02", targetPrice: null },
];

const martinPortfolio: ClientPortfolio = {
    clientId: "martins",
    holdings: martinHoldings,
    targetAllocation: [
        { asset: "Equities", target: 65, actual: 64 },
        { asset: "Commercial RE", target: 20, actual: 21 },
        { asset: "Alternatives", target: 15, actual: 15 },
    ],
};

// ── Client 2: The Clarks (Aggressive Growth) ────────────────────────

const clarkProfile: ClientProfile = {
    id: "clarks",
    familyName: "The Clarks",
    members: [
        { name: "David Clark", age: 46, role: "Sales Director" },
        { name: "Michelle Clark", age: 44, role: "Nurse" },
    ],
    combinedIncome: 210000,
    riskTolerance: "Aggressive",
    timeHorizon: "18–22 years",
    background: "High-income professionals entering catch-up phase for retirement.",
    investmentPhilosophy: "Capitalize on generational shifts in technology, AI, and digital finance. We trade off volatility for long-term growth in market-leading software.",
    goals: [
        { label: "Retirement Fund", target: "$1.8M by age 65", progress: 18 },
        { label: "Empty Nester Travel Fund", target: "$50,000/yr", progress: 25 },
        { label: "Mortgage Pay-off", target: "Zero debt by 2038", progress: 40 },
    ],
    strategy: "Aggressive growth — 75/15/10 equity/alternatives/RE split.",
    crm: {
        totalMeetings: 18, portfolioReviews: 6, rebalances: 4,
        clientSince: "2024-01-10", satisfactionScore: 9.5, nextReview: "2026-04-01",
        events: [],
    },
};

const clarkHoldings: Holding[] = [
    // Growth Engine (Strong +4.5% net return)
    { id: "c1", ticker: "QQQ", name: "Invesco QQQ Trust", assetClass: "Equities", currentPrice: 595.42, costBasis: 578.25, shares: 80, roi: 2.97, ytd: 2.97, riskProfile: "High", investmentThesis: "Nasdaq-100 high-growth core.", entryDate: "2026-01-15", targetPrice: null },
    { id: "c10", ticker: "NET", name: "Cloudflare Inc.", assetClass: "Equities", currentPrice: 225.45, costBasis: 181.02, shares: 80, roi: 24.54, ytd: 24.54, riskProfile: "Aggressive", investmentThesis: "The 'Edge' compute layer leader.", entryDate: "2026-03-02", targetPrice: 280.00 },
    { id: "c11", ticker: "CRWD", name: "CrowdStrike Holdings", assetClass: "Equities", currentPrice: 436.08, costBasis: 384.86, shares: 50, roi: 13.31, ytd: 13.31, riskProfile: "Aggressive", investmentThesis: "Endpoint security platform winner.", entryDate: "2026-03-02", targetPrice: 500.00 },
    { id: "c18", ticker: "COIN", name: "Coinbase Global", assetClass: "Alternatives", currentPrice: 205.07, costBasis: 185.24, shares: 80, roi: 10.71, ytd: 10.71, riskProfile: "Aggressive", investmentThesis: "Gateway to the crypto economy.", entryDate: "2026-03-02", targetPrice: 300.00 },
    { id: "c13", ticker: "PLTR", name: "Palantir Tech", assetClass: "Equities", currentPrice: 153.06, costBasis: 145.17, shares: 300, roi: 5.44, ytd: 5.44, riskProfile: "Aggressive", investmentThesis: "Enterprise AI Operating System.", entryDate: "2026-03-02", targetPrice: 200.00 },
    
    // AI & Semi
    { id: "c3", ticker: "NVDA", name: "NVIDIA Corp.", assetClass: "Equities", currentPrice: 180.81, costBasis: 177.42, shares: 150, roi: 1.91, ytd: 1.91, riskProfile: "Aggressive", investmentThesis: "Compute dominance for the AI age.", entryDate: "2026-02-10", targetPrice: 250.00 },
    { id: "c4", ticker: "AMD", name: "AMD Inc.", assetClass: "Equities", currentPrice: 199.36, costBasis: 198.62, shares: 100, roi: 0.37, ytd: 0.37, riskProfile: "Aggressive", investmentThesis: "Secondary compute/CPU leader.", entryDate: "2026-03-02", targetPrice: 240.00 },
    
    // Growth Leaders
    { id: "c6", ticker: "AMZN", name: "Amazon.com Inc.", assetClass: "Equities", currentPrice: 208.86, costBasis: 203.45, shares: 120, roi: 2.66, ytd: 2.66, riskProfile: "Moderate", investmentThesis: "AWS + Retail retail logistics.", entryDate: "2026-02-10", targetPrice: 270.00 },
    { id: "c8", ticker: "CRM", name: "Salesforce Inc.", assetClass: "Equities", currentPrice: 194.81, costBasis: 192.95, shares: 70, roi: 0.96, ytd: 0.96, riskProfile: "High", investmentThesis: "Enterprise AI adoption leader.", entryDate: "2026-03-02", targetPrice: 300.00 },
    { id: "c14", ticker: "SHOP", name: "Shopify Inc.", assetClass: "Equities", currentPrice: 124.45, costBasis: 119.38, shares: 150, roi: 4.25, ytd: 4.25, riskProfile: "High", investmentThesis: "Retail commerce infrastructure.", entryDate: "2026-03-02", targetPrice: 160.00 },
    { id: "c20", ticker: "DKNG", name: "DraftKings Inc.", assetClass: "Equities", currentPrice: 25.41, costBasis: 23.82, shares: 400, roi: 6.65, ytd: 6.65, riskProfile: "Aggressive", investmentThesis: "Online betting market expansion.", entryDate: "2026-03-02", targetPrice: 35.00 },
    
    // A few red names for realism
    { id: "c7", ticker: "META", name: "Meta Platforms", assetClass: "Equities", currentPrice: 614.86, costBasis: 638.15, shares: 35, roi: -3.65, ytd: -3.65, riskProfile: "Moderate", investmentThesis: "Social ads monopoly.", entryDate: "2026-03-02", targetPrice: 750.00 },
    { id: "c26", ticker: "SE", name: "Sea Limited", assetClass: "Equities", currentPrice: 84.39, costBasis: 92.40, shares: 200, roi: -8.67, ytd: -8.67, riskProfile: "Aggressive", investmentThesis: "SE Asia digital giant.", entryDate: "2026-03-02", targetPrice: 130.00 },
];

const clarkPortfolio: ClientPortfolio = {
    clientId: "clarks",
    holdings: clarkHoldings,
    targetAllocation: [
        { asset: "Equities", target: 75, actual: 74 },
        { asset: "Alternatives", target: 15, actual: 16 },
        { asset: "Commercial RE", target: 10, actual: 10 },
    ],
};

// ── Exports ───────────────────────────────────────────────────────

export const clients: ClientProfile[] = [martinProfile, clarkProfile];
export const clientPortfolios: Record<string, ClientPortfolio> = {
    martins: martinPortfolio,
    clarks: clarkPortfolio,
};

export function getClientById(id: string): ClientProfile | undefined { return clients.find(c => c.id === id); }
export function getClientPortfolio(id: string): ClientPortfolio | undefined { return clientPortfolios[id]; }
