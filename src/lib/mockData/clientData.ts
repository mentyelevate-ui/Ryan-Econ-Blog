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
// This ensures that even if the live Yahoo Finance API fails, 
// the user sees the real returns as of today.
// ══════════════════════════════════════════════════════════════════

// ── Client 1: The Martins (Balanced) ────────────────────────────────

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
    ],
    strategy: "Balanced growth — 65/20/15 split across equities, real estate, and alternatives.",
    crm: {
        totalMeetings: 12, portfolioReviews: 4, rebalances: 2,
        clientSince: "2024-06-15", satisfactionScore: 9.2, nextReview: "2026-04-15",
        events: [],
    },
};

const martinHoldings: Holding[] = [
    { id: "m1", ticker: "VOO", name: "Vanguard S&P 500 ETF", assetClass: "Equities", currentPrice: 611.27, costBasis: 631.28, shares: 30, roi: -3.17, ytd: -3.17, riskProfile: "Moderate", investmentThesis: "Cheap market beta.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m2", ticker: "SCHD", name: "Schwab U.S. Dividend Equity ETF", assetClass: "Equities", currentPrice: 30.68, costBasis: 31.86, shares: 500, roi: -3.70, ytd: -3.70, riskProfile: "Low", investmentThesis: "Quality dividend growth.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m3", ticker: "VXF", name: "Vanguard Extended Market ETF", assetClass: "Equities", currentPrice: 207.47, costBasis: 218.02, shares: 25, roi: -4.84, ytd: -4.84, riskProfile: "Moderate", investmentThesis: "Small/Mid-cap exposure.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m4", ticker: "AAPL", name: "Apple Inc.", assetClass: "Equities", currentPrice: 250.32, costBasis: 264.72, shares: 20, roi: -5.44, ytd: -5.44, riskProfile: "Moderate", investmentThesis: "High FCF and ecosystem.", entryDate: "2026-03-02", targetPrice: 295.00 },
    { id: "m5", ticker: "MSFT", name: "Microsoft Corp.", assetClass: "Equities", currentPrice: 392.75, costBasis: 398.55, shares: 12, roi: -1.46, ytd: -1.46, riskProfile: "Moderate", investmentThesis: "Cloud & AI leadership.", entryDate: "2026-03-02", targetPrice: 480.00 },
    { id: "m6", ticker: "GOOGL", name: "Alphabet Inc.", assetClass: "Equities", currentPrice: 308.70, costBasis: 306.52, shares: 15, roi: 0.71, ytd: 0.71, riskProfile: "Moderate", investmentThesis: "Undervalued search giant.", entryDate: "2026-03-02", targetPrice: 365.00 },
    { id: "m7", ticker: "JPM", name: "JPM Chase", assetClass: "Equities", currentPrice: 288.59, costBasis: 297.56, shares: 15, roi: -3.01, ytd: -3.01, riskProfile: "Moderate", investmentThesis: "Fortress balance sheet.", entryDate: "2026-03-02", targetPrice: 340.00 },
    { id: "m8", ticker: "BND", name: "Vanguard Total Bond Market", assetClass: "Alternatives", currentPrice: 73.75, costBasis: 74.64, shares: 100, roi: -1.20, ytd: -1.20, riskProfile: "Low", investmentThesis: "Fixed income stability.", entryDate: "2026-03-02", targetPrice: null },
    { id: "m9", ticker: "O", name: "Realty Income", assetClass: "Commercial RE", currentPrice: 63.42, costBasis: 67.56, shares: 80, roi: -6.13, ytd: -6.13, riskProfile: "Low", investmentThesis: "Monthly dividend compounder.", entryDate: "2026-03-02", targetPrice: 75.00 },
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

// ── Client 2: The Clarks (Aggressive) ──────────────────────────────

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
    background: "Catch-up retirement phase with high income potential.",
    investmentPhilosophy: "High-conviction growth names with real earnings. No speculative 'meme' stocks — only companies with dominant market share.",
    goals: [
        { label: "Retirement Fund", target: "$1.8M by age 65", progress: 18 },
        { label: "Max 401(k) Catch-Up", target: "$30,500/yr each", progress: 45 },
    ],
    strategy: "Aggressive growth — 75/15/10 equity/alternatives/RE split.",
    crm: {
        totalMeetings: 18, portfolioReviews: 6, rebalances: 4,
        clientSince: "2024-01-10", satisfactionScore: 9.5, nextReview: "2026-04-01",
        events: [],
    },
};

const clarkHoldings: Holding[] = [
    { id: "c1", ticker: "QQQ", name: "Invesco QQQ Trust", assetClass: "Equities", currentPrice: 598.24, costBasis: 608.09, shares: 25, roi: -1.62, ytd: -1.62, riskProfile: "High", investmentThesis: "Nasdaq-100 exposure.", entryDate: "2026-03-02", targetPrice: null },
    { id: "c2", ticker: "NVDA", name: "NVIDIA Corp.", assetClass: "Equities", currentPrice: 181.60, costBasis: 182.48, shares: 40, roi: -0.48, ytd: -0.48, riskProfile: "Aggressive", investmentThesis: "Unrivaled AI chip leader.", entryDate: "2026-03-02", targetPrice: 250.00 },
    { id: "c3", ticker: "AMZN", name: "Amazon.com Inc.", assetClass: "Equities", currentPrice: 210.05, costBasis: 208.39, shares: 30, roi: 0.80, ytd: 0.80, riskProfile: "Moderate", investmentThesis: "Cloud & Retail dominant player.", entryDate: "2026-03-02", targetPrice: 270.00 },
    { id: "c4", ticker: "COIN", name: "Coinbase Global", assetClass: "Alternatives", currentPrice: 206.23, costBasis: 185.24, shares: 20, roi: 11.33, ytd: 11.33, riskProfile: "Aggressive", investmentThesis: "Crypto economy infrastructure.", entryDate: "2026-03-02", targetPrice: 280.00 },
    { id: "c5", ticker: "PLTR", name: "Palantir Technologies", assetClass: "Equities", currentPrice: 153.55, costBasis: 145.17, shares: 50, roi: 5.77, ytd: 5.77, riskProfile: "Aggressive", investmentThesis: "Enterprise AI operating system.", entryDate: "2026-03-02", targetPrice: 200.00 },
    { id: "c6", ticker: "APO", name: "Apollo Global Mgmt", assetClass: "Alternatives", currentPrice: 111.67, costBasis: 106.45, shares: 40, roi: 4.91, ytd: 4.91, riskProfile: "High", investmentThesis: "Alternative asset consolidation.", entryDate: "2026-03-02", targetPrice: 145.00 },
    { id: "c7", ticker: "CRM", name: "Salesforce Inc.", assetClass: "Equities", currentPrice: 195.19, costBasis: 192.95, shares: 15, roi: 1.16, ytd: 1.16, riskProfile: "High", investmentThesis: "Enterprise CRM & Agentic AI.", entryDate: "2026-03-02", targetPrice: 300.00 },
    { id: "c8", ticker: "UBER", name: "Uber Technologies", assetClass: "Equities", currentPrice: 76.96, costBasis: 75.95, shares: 60, roi: 1.33, ytd: 1.33, riskProfile: "High", investmentThesis: "Mobility & delivery global network.", entryDate: "2026-03-02", targetPrice: 100.00 },
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
