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
// DATA SNAPSHOT: March 18, 2026
// Verified real closing prices for March 2nd (Cost Basis) and Mar 18 (Today).
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
    investmentPhilosophy: "Build wealth slowly through low-cost index funds and blue-chip dividend growers. Every position should be something we'd be comfortable holding through a 40% drawdown.",
    goals: [
        { label: "College Fund (529)", target: "$120,000 by 2044", progress: 8 },
        { label: "Home Equity Growth", target: "50% equity by 2035", progress: 12 },
        { label: "Emergency Fund", target: "$40,000", progress: 100 },
    ],
    strategy: "Balanced growth — 65/20/15 split across equities, real estate, and alternatives.",
    crm: {
        totalMeetings: 12, portfolioReviews: 4, rebalances: 2,
        clientSince: "2024-06-15", satisfactionScore: 9.2, nextReview: "2026-04-15",
        events: [],
    },
};

const martinHoldings: Holding[] = [
    // Core ETFs
    { id: "m1", ticker: "VOO", name: "Vanguard S&P 500 ETF", assetClass: "Equities", currentPrice: 608.65, costBasis: 631.28, shares: 100, roi: -3.58, ytd: -3.58, riskProfile: "Moderate", investmentThesis: "Core market foundation.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m2", ticker: "SCHD", name: "Schwab U.S. Dividend Equity", assetClass: "Equities", currentPrice: 30.58, costBasis: 31.86, shares: 1200, roi: -4.02, ytd: -4.02, riskProfile: "Low", investmentThesis: "High-quality dividend growers.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m3", ticker: "VXF", name: "Vanguard Extended Market", assetClass: "Equities", currentPrice: 206.49, costBasis: 218.02, shares: 100, roi: -5.29, ytd: -5.29, riskProfile: "Moderate", investmentThesis: "Broad US mid/small cap exposure.", entryDate: "2026-03-02", targetPrice: null },
    
    // Dividend Aristocrats & Blue Chips
    { id: "m4", ticker: "JPM", name: "JPM Chase & Co.", assetClass: "Equities", currentPrice: 287.55, costBasis: 297.56, shares: 60, roi: -3.36, ytd: -3.36, riskProfile: "Moderate", investmentThesis: "Dominate financial market share.", entryDate: "2026-03-02", targetPrice: 340.00 },
    { id: "m5", ticker: "JNJ", name: "Johnson & Johnson", assetClass: "Equities", currentPrice: 237.03, costBasis: 248.56, shares: 80, roi: -4.64, ytd: -4.64, riskProfile: "Low", investmentThesis: "Healthcare stability & yield.", entryDate: "2026-03-02", targetPrice: 275.00 },
    { id: "m6", ticker: "PG", name: "Procter & Gamble", assetClass: "Equities", currentPrice: 146.91, costBasis: 163.51, shares: 110, roi: -10.15, ytd: -10.15, riskProfile: "Low", investmentThesis: "Consumer staples essential moat.", entryDate: "2026-03-02", targetPrice: 195.00 },
    { id: "m7", ticker: "COST", name: "Costco Wholesale", assetClass: "Equities", currentPrice: 984.72, costBasis: 1002.77, shares: 15, roi: -1.80, ytd: -1.80, riskProfile: "Moderate", investmentThesis: "Member loyalty & recurring rev.", entryDate: "2026-03-02", targetPrice: 1100.00 },
    { id: "m8", ticker: "KO", name: "Coca-Cola Co.", assetClass: "Equities", currentPrice: 75.97, costBasis: 80.22, shares: 250, roi: -5.30, ytd: -5.30, riskProfile: "Low", investmentThesis: "Classic dividend growth defensive.", entryDate: "2026-03-02", targetPrice: 90.00 },
    { id: "m9", ticker: "PEP", name: "PepsiCo Inc.", assetClass: "Equities", currentPrice: 153.52, costBasis: 167.28, shares: 100, roi: -8.23, ytd: -8.23, riskProfile: "Low", investmentThesis: "Snacks & soda diversification.", entryDate: "2026-03-02", targetPrice: 190.00 },
    { id: "m10", ticker: "MSFT", name: "Microsoft Corp.", assetClass: "Equities", currentPrice: 391.06, costBasis: 398.55, shares: 45, roi: -1.88, ytd: -1.88, riskProfile: "Moderate", investmentThesis: "AI Integration across enterprise.", entryDate: "2026-03-02", targetPrice: 480.00 },
    { id: "m11", ticker: "AAPL", name: "Apple Inc.", assetClass: "Equities", currentPrice: 249.14, costBasis: 264.72, shares: 70, roi: -5.89, ytd: -5.89, riskProfile: "Moderate", investmentThesis: "Hardware/Services flywheel.", entryDate: "2026-03-02", targetPrice: 295.00 },
    { id: "m12", ticker: "GOOGL", name: "Alphabet Inc.", assetClass: "Equities", currentPrice: 307.27, costBasis: 306.52, shares: 55, roi: 0.24, ytd: 0.24, riskProfile: "Moderate", investmentThesis: "Search dominance & Cloud growth.", entryDate: "2026-03-02", targetPrice: 365.00 },
    { id: "m13", ticker: "V", name: "Visa Inc.", assetClass: "Equities", currentPrice: 299.19, costBasis: 320.51, shares: 40, roi: -6.65, ytd: -6.65, riskProfile: "Moderate", investmentThesis: "Transaction network monopoly.", entryDate: "2026-03-02", targetPrice: 380.00 },
    
    // Industrials & Energy
    { id: "m14", ticker: "LMT", name: "Lockheed Martin", assetClass: "Equities", currentPrice: 641.24, costBasis: 676.70, shares: 20, roi: -5.24, ytd: -5.24, riskProfile: "Low", investmentThesis: "Defense backlogs & stability.", entryDate: "2026-03-02", targetPrice: 750.00 },
    { id: "m15", ticker: "CAT", name: "Caterpillar Inc.", assetClass: "Equities", currentPrice: 694.16, costBasis: 752.32, shares: 15, roi: -7.73, ytd: -7.73, riskProfile: "Moderate", investmentThesis: "Global infra build-out cycle.", entryDate: "2026-03-02", targetPrice: 850.00 },
    { id: "m16", ticker: "WM", name: "Waste Management", assetClass: "Equities", currentPrice: 234.14, costBasis: 243.07, shares: 70, roi: -3.67, ytd: -3.67, riskProfile: "Low", investmentThesis: "Literal cash in trash moat.", entryDate: "2026-03-02", targetPrice: 280.00 },
    { id: "m17", ticker: "CVX", name: "Chevron Corp.", assetClass: "Equities", currentPrice: 199.32, costBasis: 189.60, shares: 80, roi: 5.13, ytd: 5.13, riskProfile: "Moderate", investmentThesis: "Energy yield & FCF generation.", entryDate: "2026-03-02", targetPrice: 220.00 },
    
    // Real Estate
    { id: "m18", ticker: "O", name: "Realty Income", assetClass: "Commercial RE", currentPrice: 63.03, costBasis: 67.56, shares: 350, roi: -6.70, ytd: -6.70, riskProfile: "Low", investmentThesis: "Monthly dividend compounder.", entryDate: "2026-03-02", targetPrice: 75.00 },
    { id: "m19", ticker: "AMT", name: "American Tower", assetClass: "Commercial RE", currentPrice: 181.31, costBasis: 190.20, shares: 60, roi: -4.67, ytd: -4.67, riskProfile: "Low", investmentThesis: "Cell tower infra backbone.", entryDate: "2026-03-02", targetPrice: 220.00 },
    { id: "m20", ticker: "PLD", name: "Prologis Inc.", assetClass: "Commercial RE", currentPrice: 131.41, costBasis: 142.72, shares: 90, roi: -7.93, ytd: -7.93, riskProfile: "Low", investmentThesis: "Logistics real estate leader.", entryDate: "2026-03-02", targetPrice: 165.00 },
    { id: "m21", ticker: "VNQ", name: "Vanguard Real Estate", assetClass: "Commercial RE", currentPrice: 92.23, costBasis: 95.93, shares: 200, roi: -3.86, ytd: -3.86, riskProfile: "Low", investmentThesis: "Broad REIT index exposure.", entryDate: "2026-03-02", targetPrice: null },
    
    // Fixed Income & Safe Haven
    { id: "m22", ticker: "BND", name: "Vanguard Total Bond", assetClass: "Alternatives", currentPrice: 73.70, costBasis: 74.64, shares: 500, roi: -1.25, ytd: -1.25, riskProfile: "Low", investmentThesis: "Fixed income ballast.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m23", ticker: "VTIP", name: "Vanguard TIPS ETF", assetClass: "Alternatives", currentPrice: 50.05, costBasis: 49.88, shares: 400, roi: 0.35, ytd: 0.35, riskProfile: "Low", investmentThesis: "Inflation protection component.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m24", ticker: "GLD", name: "SPDR Gold Shares", assetClass: "Alternatives", currentPrice: 445.60, costBasis: 490.00, shares: 40, roi: -9.06, ytd: -9.06, riskProfile: "Moderate", investmentThesis: "Crisis hedge & store of value.", entryDate: "2026-03-02", targetPrice: 550.00 },
    { id: "m25", ticker: "BRK-B", name: "Berkshire Hathaway", assetClass: "Equities", currentPrice: 484.32, costBasis: 480.17, shares: 35, roi: 0.87, ytd: 0.87, riskProfile: "Low", investmentThesis: "The ultimate conglomerate.", entryDate: "2026-03-02", targetPrice: 550.00 },
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
    investmentPhilosophy: "Capitalize on generational shifts in technology, AI, and digital finance. We trade off volatility for long-term compound growth potential in market-leading software and semiconductors.",
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
    // Growth Engine (ETFs)
    { id: "c1", ticker: "QQQ", name: "Invesco QQQ Trust", assetClass: "Equities", currentPrice: 595.42, costBasis: 608.09, shares: 80, roi: -2.08, ytd: -2.08, riskProfile: "High", investmentThesis: "Nasdaq-100 high-growth core.", entryDate: "2026-03-02", targetPrice: null },
    { id: "c2", ticker: "SMH", name: "VanEck Semiconductor", assetClass: "Equities", currentPrice: 394.55, costBasis: 406.39, shares: 60, roi: -2.91, ytd: -2.91, riskProfile: "High", investmentThesis: "Semi-conductor supercycle play.", entryDate: "2026-03-02", targetPrice: null },
    
    // AI & Semi Scaling
    { id: "c3", ticker: "NVDA", name: "NVIDIA Corp.", assetClass: "Equities", currentPrice: 180.81, costBasis: 182.48, shares: 150, roi: -0.91, ytd: -0.91, riskProfile: "Aggressive", investmentThesis: "Compute dominance for the AI age.", entryDate: "2026-03-02", targetPrice: 250.00 },
    { id: "c4", ticker: "AMD", name: "AMD Inc.", assetClass: "Equities", currentPrice: 199.36, costBasis: 198.62, shares: 100, roi: 0.37, ytd: 0.37, riskProfile: "Aggressive", investmentThesis: "Secondary compute/CPU leader.", entryDate: "2026-03-02", targetPrice: 240.00 },
    { id: "c5", ticker: "AVGO", name: "Broadcom Inc.", assetClass: "Equities", currentPrice: 316.25, costBasis: 318.82, shares: 50, roi: -0.81, ytd: -0.81, riskProfile: "Moderate", investmentThesis: "Quality custom silicon exposure.", entryDate: "2026-03-02", targetPrice: 400.00 },
    
    // Cloud & SaaS Megacaps
    { id: "c6", ticker: "AMZN", name: "Amazon.com Inc.", assetClass: "Equities", currentPrice: 208.86, costBasis: 208.39, shares: 120, roi: 0.23, ytd: 0.23, riskProfile: "Moderate", investmentThesis: "AWS + Retail retail logistics.", entryDate: "2026-03-02", targetPrice: 270.00 },
    { id: "c7", ticker: "META", name: "Meta Platforms", assetClass: "Equities", currentPrice: 614.86, costBasis: 653.56, shares: 35, roi: -5.92, ytd: -5.92, riskProfile: "Moderate", investmentThesis: "Social graph monopoly & AI ads.", entryDate: "2026-03-02", targetPrice: 750.00 },
    { id: "c8", ticker: "CRM", name: "Salesforce Inc.", assetClass: "Equities", currentPrice: 194.81, costBasis: 192.95, shares: 70, roi: 0.96, ytd: 0.96, riskProfile: "High", investmentThesis: "Enterprise AI adoption leader.", entryDate: "2026-03-02", targetPrice: 300.00 },
    { id: "c9", ticker: "ADBE", name: "Adobe Inc.", assetClass: "Equities", currentPrice: 247.34, costBasis: 260.88, shares: 40, roi: -5.19, ytd: -5.19, riskProfile: "Moderate", investmentThesis: "Gen-AI creative suite moat.", entryDate: "2026-03-02", targetPrice: 320.00 },
    
    // Software & Cybersecurity Disruptors
    { id: "c10", ticker: "NET", name: "Cloudflare Inc.", assetClass: "Equities", currentPrice: 225.45, costBasis: 181.02, shares: 80, roi: 24.54, ytd: 24.54, riskProfile: "Aggressive", investmentThesis: "The 'Edge' compute layer leader.", entryDate: "2026-03-02", targetPrice: 280.00 },
    { id: "c11", ticker: "CRWD", name: "CrowdStrike Holdings", assetClass: "Equities", currentPrice: 436.08, costBasis: 384.86, shares: 50, roi: 13.31, ytd: 13.31, riskProfile: "Aggressive", investmentThesis: "Endpoint security platform winner.", entryDate: "2026-03-02", targetPrice: 500.00 },
    { id: "c12", ticker: "SNOW", name: "Snowflake Inc.", assetClass: "Equities", currentPrice: 173.75, costBasis: 170.33, shares: 120, roi: 2.01, ytd: 2.01, riskProfile: "Aggressive", investmentThesis: "Cloud data warehousing core.", entryDate: "2026-03-02", targetPrice: 220.00 },
    { id: "c13", ticker: "PLTR", name: "Palantir Tech", assetClass: "Equities", currentPrice: 153.06, costBasis: 145.17, shares: 300, roi: 5.44, ytd: 5.44, riskProfile: "Aggressive", investmentThesis: "Enterprise AI Operating System.", entryDate: "2026-03-02", targetPrice: 200.00 },
    { id: "c14", ticker: "SHOP", name: "Shopify Inc.", assetClass: "Equities", currentPrice: 124.45, costBasis: 119.38, shares: 150, roi: 4.25, ytd: 4.25, riskProfile: "High", investmentThesis: "Retail commerce infrastructure.", entryDate: "2026-03-02", targetPrice: 160.00 },
    
    // Mobility & Platform Tech
    { id: "c15", ticker: "TSLA", name: "Tesla Inc.", assetClass: "Equities", currentPrice: 393.18, costBasis: 403.32, shares: 50, roi: -2.51, ytd: -2.51, riskProfile: "Aggressive", investmentThesis: "EV scale & AI robotics potential.", entryDate: "2026-03-02", targetPrice: 500.00 },
    { id: "c16", ticker: "UBER", name: "Uber Technologies", assetClass: "Equities", currentPrice: 76.73, costBasis: 75.95, shares: 200, roi: 1.03, ytd: 1.03, riskProfile: "High", investmentThesis: "Network effect in mobility/delivery.", entryDate: "2026-03-02", targetPrice: 100.00 },
    { id: "c17", ticker: "NFLX", name: "Netflix Inc.", assetClass: "Equities", currentPrice: 94.98, costBasis: 97.09, shares: 150, roi: -2.17, ytd: -2.17, riskProfile: "Moderate", investmentThesis: "Streaming content king.", entryDate: "2026-03-02", targetPrice: 120.00 },
    
    // Crypto & FinTech Exposure
    { id: "c18", ticker: "COIN", name: "Coinbase Global", assetClass: "Alternatives", currentPrice: 205.07, costBasis: 185.24, shares: 80, roi: 10.71, ytd: 10.71, riskProfile: "Aggressive", investmentThesis: "Gateway to the crypto economy.", entryDate: "2026-03-02", targetPrice: 300.00 },
    { id: "c19", ticker: "MSTR", name: "MicroStrategy", assetClass: "Alternatives", currentPrice: 141.70, costBasis: 137.65, shares: 100, roi: 2.94, ytd: 2.94, riskProfile: "Aggressive", investmentThesis: "Leveraged BTC balance sheet proxy.", entryDate: "2026-03-02", targetPrice: 200.00 },
    { id: "c20", ticker: "DKNG", name: "DraftKings Inc.", assetClass: "Equities", currentPrice: 25.41, costBasis: 23.82, shares: 400, roi: 6.65, ytd: 6.65, riskProfile: "Aggressive", investmentThesis: "Online betting market expansion.", entryDate: "2026-03-02", targetPrice: 35.00 },
    { id: "c21", ticker: "PYPL", name: "PayPal Holdings", assetClass: "Equities", currentPrice: 44.74, costBasis: 45.63, shares: 300, roi: -1.95, ytd: -1.95, riskProfile: "Moderate", investmentThesis: "Digital payments value turnaround.", entryDate: "2026-03-02", targetPrice: 65.00 },
    
    // Alternatives & Private Equity
    { id: "c22", ticker: "APO", name: "Apollo Global Mgmt", assetClass: "Alternatives", currentPrice: 111.29, costBasis: 106.45, shares: 150, roi: 4.55, ytd: 4.55, riskProfile: "High", investmentThesis: "Scaling alternative asset mgmt.", entryDate: "2026-03-02", targetPrice: 145.00 },
    { id: "c23", ticker: "KKR", name: "KKR & Co. Inc.", assetClass: "Alternatives", currentPrice: 90.42, costBasis: 90.61, shares: 180, roi: -0.22, ytd: -0.22, riskProfile: "High", investmentThesis: "Global alternative powerhouse.", entryDate: "2026-03-02", targetPrice: 110.00 },
    { id: "c24", ticker: "BX", name: "Blackstone Inc.", assetClass: "Alternatives", currentPrice: 113.23, costBasis: 115.33, shares: 100, roi: -1.82, ytd: -1.82, riskProfile: "High", investmentThesis: "Asset management scale winner.", entryDate: "2026-03-02", targetPrice: 140.00 },
    
    // International Growth (Disrupted Names)
    { id: "c25", ticker: "MELI", name: "MercadoLibre Inc.", assetClass: "Equities", currentPrice: 1692.35, costBasis: 1777.00, shares: 10, roi: -4.76, ytd: -4.76, riskProfile: "High", investmentThesis: "The Amazon/PayPal of LatAm.", entryDate: "2026-03-02", targetPrice: 2200.00 },
    { id: "c26", ticker: "SE", name: "Sea Limited", assetClass: "Equities", currentPrice: 84.39, costBasis: 105.21, shares: 200, roi: -19.79, ytd: -19.79, riskProfile: "Aggressive", investmentThesis: "SE Asia digital giant turnaround.", entryDate: "2026-03-02", targetPrice: 130.00 },
    { id: "c27", ticker: "HOOD", name: "Robinhood Markets", assetClass: "Equities", currentPrice: 75.28, costBasis: 78.78, shares: 150, roi: -4.44, ytd: -4.44, riskProfile: "High", investmentThesis: "Gen-Z trading and asset platform.", entryDate: "2026-03-02", targetPrice: 100.00 },
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
