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
// IMPORTANT: All costBasis values below are REAL closing prices
// from Yahoo Finance on March 2, 2026 — the first trading day
// of March. currentPrice is a placeholder that gets overwritten
// by live Yahoo Finance data on every page load via the
// enrichHoldingsWithLivePrices() function in sanityQueries.ts.
//
// ROI is recalculated in real-time:
//   ROI = (livePrice - costBasis) / costBasis * 100
// ══════════════════════════════════════════════════════════════════

// ── Client 1: The Martins ─────────────────────────────────────────

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
    background:
        "James and Sarah are a young couple based in Austin, TX who recently started a family. They have a 2-year-old daughter and are expecting their second child. They bought their first home in 2024 with a $320K mortgage at 6.8%. They have $18K in student loans remaining and want to build a diversified portfolio that grows steadily while they focus on their careers and family.",
    investmentPhilosophy:
        "Build wealth slowly through low-cost index funds and blue-chip dividend growers. We're not trying to beat the market — we're trying to stay in it for 30 years and let compounding do the work. Every position should be something we'd be comfortable holding through a 40% drawdown.",
    goals: [
        { label: "College Fund (529)", target: "$120,000 by 2044", progress: 8 },
        { label: "Home Equity Growth", target: "50% equity by 2035", progress: 12 },
        { label: "Emergency Fund", target: "6 months expenses", progress: 75 },
        { label: "Long-Term Wealth", target: "$1.2M net worth by 55", progress: 5 },
    ],
    strategy:
        "Balanced growth — 65/20/15 split across equities, real estate, and alternatives. Annual rebalancing with tax-loss harvesting.",
    crm: {
        totalMeetings: 12, portfolioReviews: 4, rebalances: 2,
        clientSince: "2024-06-15", satisfactionScore: 9.2, nextReview: "2026-04-15",
        events: [],
    },
};

// ── Martin Holdings — REAL cost basis from March 2, 2026 close ──

const martinHoldings: Holding[] = [
    // ── CORE INDEX ──
    {
        id: "m1", ticker: "VOO", name: "Vanguard S&P 500 ETF",
        assetClass: "Equities", currentPrice: 631.28, costBasis: 631.28, shares: 30,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Cheapest way to own the whole market. 0.03% fee and we DCA monthly.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "m2", ticker: "SCHD", name: "Schwab U.S. Dividend Equity ETF",
        assetClass: "Equities", currentPrice: 31.86, costBasis: 31.86, shares: 500,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Dividend growers with 10+ year track records. Pays ~3.5% and we reinvest everything.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "m3", ticker: "VXF", name: "Vanguard Extended Market ETF",
        assetClass: "Equities", currentPrice: 218.02, costBasis: 218.02, shares: 25,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Small and mid-caps that aren't in the S&P 500. Adds exposure to future blue chips.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    // ── BLUE CHIPS ──
    {
        id: "m4", ticker: "AAPL", name: "Apple Inc.",
        assetClass: "Equities", currentPrice: 264.72, costBasis: 264.72, shares: 20,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "James lives in the Apple ecosystem. Services revenue keeps growing and AI refresh cycle is real.",
        entryDate: "2026-03-02", targetPrice: 295.00,
    },
    {
        id: "m5", ticker: "MSFT", name: "Microsoft Corp.",
        assetClass: "Equities", currentPrice: 398.55, costBasis: 398.55, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Azure and Copilot are the picks and shovels of enterprise AI. James uses them at work daily.",
        entryDate: "2026-03-02", targetPrice: 480.00,
    },
    {
        id: "m6", ticker: "GOOGL", name: "Alphabet Inc.",
        assetClass: "Equities", currentPrice: 306.52, costBasis: 306.52, shares: 15,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Cheapest Mag 7 stock on earnings. Search isn't going anywhere and YouTube prints money.",
        entryDate: "2026-03-02", targetPrice: 365.00,
    },
    {
        id: "m7", ticker: "JNJ", name: "Johnson & Johnson",
        assetClass: "Equities", currentPrice: 248.56, costBasis: 248.56, shares: 20,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "62 straight years of dividend increases. Healthcare doesn't care about recessions.",
        entryDate: "2026-03-02", targetPrice: 275.00,
    },
    {
        id: "m8", ticker: "PG", name: "Procter & Gamble Co.",
        assetClass: "Equities", currentPrice: 163.51, costBasis: 163.51, shares: 18,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "We literally buy Pampers and Tide every week. 68 years of dividend growth.",
        entryDate: "2026-03-02", targetPrice: 195.00,
    },
    {
        id: "m9", ticker: "COST", name: "Costco Wholesale Corp.",
        assetClass: "Equities", currentPrice: 1002.77, costBasis: 1002.77, shares: 5,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "We're Costco members. 93% renewal rate is insane — that's a real moat.",
        entryDate: "2026-03-02", targetPrice: 1100.00,
    },
    {
        id: "m10", ticker: "V", name: "Visa Inc.",
        assetClass: "Equities", currentPrice: 320.51, costBasis: 320.51, shares: 10,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Toll booth on $15T+ in annual transactions. Cashless is still growing globally.",
        entryDate: "2026-03-02", targetPrice: 380.00,
    },
    // ── REITs ──
    {
        id: "m11", ticker: "O", name: "Realty Income Corp.",
        assetClass: "Commercial RE", currentPrice: 67.56, costBasis: 67.56, shares: 60,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Monthly dividends, 30+ years of increases. Boring and reliable — exactly what we want.",
        entryDate: "2026-03-02", targetPrice: 75.00,
    },
    {
        id: "m12", ticker: "AMT", name: "American Tower Corp.",
        assetClass: "Commercial RE", currentPrice: 190.20, costBasis: 190.20, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Cell towers. 99% renewal rates. Everyone needs cell service regardless of the economy.",
        entryDate: "2026-03-02", targetPrice: 220.00,
    },
    {
        id: "m13", ticker: "PLD", name: "Prologis Inc.",
        assetClass: "Commercial RE", currentPrice: 142.72, costBasis: 142.72, shares: 15,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Warehouses for Amazon and every other e-commerce company. Rents renewing 50% higher.",
        entryDate: "2026-03-02", targetPrice: 165.00,
    },
    {
        id: "m14", ticker: "VNQ", name: "Vanguard Real Estate ETF",
        assetClass: "Commercial RE", currentPrice: 95.93, costBasis: 95.93, shares: 30,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Broad REIT exposure at 0.12%. Rate cuts make REITs more attractive.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    // ── BONDS & ALTS ──
    {
        id: "m15", ticker: "BND", name: "Vanguard Total Bond Market ETF",
        assetClass: "Alternatives", currentPrice: 74.64, costBasis: 74.64, shares: 50,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Portfolio ballast. When stocks drop, bonds usually hold up. Yielding ~4.2%.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "m16", ticker: "VTIP", name: "Vanguard Short-Term Inflation-Protected ETF",
        assetClass: "Alternatives", currentPrice: 49.88, costBasis: 49.88, shares: 40,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Inflation hedge. Childcare and housing costs rise faster than CPI.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "m17", ticker: "GLD", name: "SPDR Gold Shares",
        assetClass: "Alternatives", currentPrice: 490.00, costBasis: 490.00, shares: 5,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "5% in gold as insurance. Central banks keep buying it.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    // ── SATELLITES ──
    {
        id: "m18", ticker: "JPM", name: "JPMorgan Chase & Co.",
        assetClass: "Equities", currentPrice: 297.56, costBasis: 297.56, shares: 8,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Best bank in the world. Higher rates = higher profits for JPM.",
        entryDate: "2026-03-02", targetPrice: 340.00,
    },
    {
        id: "m19", ticker: "HD", name: "The Home Depot Inc.",
        assetClass: "Equities", currentPrice: 370.81, costBasis: 370.81, shares: 6,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "We just bought a house — we live at Home Depot now. Old houses need repairs.",
        entryDate: "2026-03-02", targetPrice: 440.00,
    },
    {
        id: "m20", ticker: "UNH", name: "UnitedHealth Group Inc.",
        assetClass: "Equities", currentPrice: 294.93, costBasis: 294.93, shares: 8,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Covers 150M+ Americans. Healthcare spending only goes up.",
        entryDate: "2026-03-02", targetPrice: 360.00,
    },
    {
        id: "m21", ticker: "BRK.B", name: "Berkshire Hathaway Inc. Class B",
        assetClass: "Equities", currentPrice: 480.17, costBasis: 480.17, shares: 5,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Buffett has $200B in cash ready to deploy on the next dip. Basically a diversified fund with no fees.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "m22", ticker: "AVGO", name: "Broadcom Inc.",
        assetClass: "Equities", currentPrice: 318.82, costBasis: 318.82, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Makes the networking chips that connect AI servers together. VMware deal makes them a software company too.",
        entryDate: "2026-03-02", targetPrice: 400.00,
    },
];

const martinPortfolio: ClientPortfolio = {
    clientId: "martins",
    holdings: martinHoldings,
    targetAllocation: [
        { asset: "Equities", target: 65, actual: 63 },
        { asset: "Commercial RE", target: 20, actual: 21 },
        { asset: "Alternatives", target: 15, actual: 16 },
    ],
};

// ── Client 2: The Clarks ──────────────────────────────────────────

const clarkProfile: ClientProfile = {
    id: "clarks",
    familyName: "The Clarks",
    members: [
        { name: "David Clark", age: 46, role: "Regional Sales Director" },
        { name: "Michelle Clark", age: 44, role: "Nurse Practitioner" },
    ],
    combinedIncome: 210000,
    riskTolerance: "Aggressive",
    timeHorizon: "18–22 years",
    background:
        "David and Michelle are a dual-income couple in Charlotte, NC who spent their 30s paying off $95K in student debt. Now debt-free, they're playing catch-up on retirement. They have $62K in 401(k)s and want to reach $1.8M by 65.",
    investmentPhilosophy:
        "We're behind and we know it. That means we have to take more risk than a typical couple our age, but we're doing it with our eyes open. High-conviction growth names with real earnings, not meme stocks. Every position has a reason we can explain in one sentence.",
    goals: [
        { label: "Retirement Fund", target: "$1.8M by age 65", progress: 18 },
        { label: "Max 401(k) Catch-Up", target: "$30,500/yr each", progress: 45 },
        { label: "Mortgage Payoff", target: "Paid off by age 58", progress: 22 },
        { label: "Emergency Reserves", target: "12 months expenses", progress: 35 },
    ],
    strategy:
        "Aggressive growth — 75/15/10 equity/alternatives/RE split with quarterly rebalancing. Maxing catch-up 401(k) contributions with Roth conversion ladder.",
    crm: {
        totalMeetings: 18, portfolioReviews: 6, rebalances: 4,
        clientSince: "2024-01-10", satisfactionScore: 9.5, nextReview: "2026-04-01",
        events: [],
    },
};

// ── Clark Holdings — REAL cost basis from March 2, 2026 close ──

const clarkHoldings: Holding[] = [
    // ── CORE GROWTH ──
    {
        id: "c1", ticker: "QQQ", name: "Invesco QQQ Trust (Nasdaq-100)",
        assetClass: "Equities", currentPrice: 608.09, costBasis: 608.09, shares: 25,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "Top 100 Nasdaq names. Tech-heavy, which is exactly where we want to be for a 20-year hold.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    {
        id: "c2", ticker: "SMH", name: "VanEck Semiconductor ETF",
        assetClass: "Equities", currentPrice: 406.39, costBasis: 406.39, shares: 20,
        roi: 0, ytd: 0, riskProfile: "Aggressive",
        investmentThesis: "Everything runs on chips. AI just makes that more true.",
        entryDate: "2026-03-02", targetPrice: null,
    },
    // ── TECH CONVICTION ──
    {
        id: "c3", ticker: "NVDA", name: "NVIDIA Corp.",
        assetClass: "Equities", currentPrice: 182.48, costBasis: 182.48, shares: 40,
        roi: 0, ytd: 0, riskProfile: "Aggressive",
        investmentThesis: "80%+ GPU market share in data centers. If AI keeps growing, NVDA keeps winning.",
        entryDate: "2026-03-02", targetPrice: 250.00,
    },
    {
        id: "c4", ticker: "META", name: "Meta Platforms Inc.",
        assetClass: "Equities", currentPrice: 653.56, costBasis: 653.56, shares: 10,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "3.9B users, $40B+ free cash flow, and Reels is actually working. Hard to bet against that.",
        entryDate: "2026-03-02", targetPrice: 750.00,
    },
    {
        id: "c5", ticker: "AMZN", name: "Amazon.com Inc.",
        assetClass: "Equities", currentPrice: 208.39, costBasis: 208.39, shares: 25,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "AWS + ads + retail. Three $50B+ businesses in one stock.",
        entryDate: "2026-03-02", targetPrice: 270.00,
    },
    {
        id: "c6", ticker: "TSLA", name: "Tesla Inc.",
        assetClass: "Equities", currentPrice: 403.32, costBasis: 403.32, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Aggressive",
        investmentThesis: "Volatile but the robotaxi upside is huge if it works. Energy storage growing 100%+ YoY. Small position because it's risky.",
        entryDate: "2026-03-02", targetPrice: 550.00,
    },
    {
        id: "c7", ticker: "GOOGL", name: "Alphabet Inc.",
        assetClass: "Equities", currentPrice: 306.52, costBasis: 306.52, shares: 18,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Cheapest mega-cap tech name. Search, YouTube, and Cloud are all printing. Waymo is a free option.",
        entryDate: "2026-03-02", targetPrice: 380.00,
    },
    {
        id: "c8", ticker: "AAPL", name: "Apple Inc.",
        assetClass: "Equities", currentPrice: 264.72, costBasis: 264.72, shares: 15,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "2.2 billion devices locked into the ecosystem. Services margins are 70%+.",
        entryDate: "2026-03-02", targetPrice: 300.00,
    },
    // ── ALT MANAGERS ──
    {
        id: "c9", ticker: "BX", name: "Blackstone Inc.",
        assetClass: "Alternatives", currentPrice: 115.33, costBasis: 115.33, shares: 35,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "$1T+ in AUM. Money keeps moving from public to private markets and BX is the biggest player.",
        entryDate: "2026-03-02", targetPrice: 155.00,
    },
    {
        id: "c10", ticker: "KKR", name: "KKR & Co. Inc.",
        assetClass: "Alternatives", currentPrice: 90.61, costBasis: 90.61, shares: 45,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "Bought an insurance company (Global Atlantic) for permanent capital. Management owns 40% — they eat their own cooking.",
        entryDate: "2026-03-02", targetPrice: 130.00,
    },
    {
        id: "c11", ticker: "APO", name: "Apollo Global Management",
        assetClass: "Alternatives", currentPrice: 106.45, costBasis: 106.45, shares: 30,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "Biggest credit platform in private markets. Athene gives them permanent capital. Buying the dip.",
        entryDate: "2026-03-02", targetPrice: 145.00,
    },
    // ── FINANCIALS ──
    {
        id: "c12", ticker: "JPM", name: "JPMorgan Chase & Co.",
        assetClass: "Equities", currentPrice: 297.56, costBasis: 297.56, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Best bank in the world. Spends $35B/yr on tech — smaller banks can't keep up.",
        entryDate: "2026-03-02", targetPrice: 350.00,
    },
    {
        id: "c13", ticker: "GS", name: "Goldman Sachs Group",
        assetClass: "Equities", currentPrice: 861.70, costBasis: 861.70, shares: 8,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "IPO and M&A activity picking back up in 2026. Goldman is the top advisor.",
        entryDate: "2026-03-02", targetPrice: 950.00,
    },
    {
        id: "c14", ticker: "MA", name: "Mastercard Inc.",
        assetClass: "Equities", currentPrice: 521.00, costBasis: 521.00, shares: 6,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Cross-border transactions growing 15%+. Emerging markets still mostly cash — long runway.",
        entryDate: "2026-03-02", targetPrice: 620.00,
    },
    // ── REITs ──
    {
        id: "c15", ticker: "AMT", name: "American Tower Corp.",
        assetClass: "Commercial RE", currentPrice: 190.20, costBasis: 190.20, shares: 15,
        roi: 0, ytd: 0, riskProfile: "Low",
        investmentThesis: "Cell towers as the defensive anchor. Even aggressive portfolios need something steady.",
        entryDate: "2026-03-02", targetPrice: 225.00,
    },
    {
        id: "c16", ticker: "SPG", name: "Simon Property Group",
        assetClass: "Commercial RE", currentPrice: 203.16, costBasis: 203.16, shares: 12,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Class A malls at 95%+ occupancy. 'Retail is dead' was wrong — the good malls are thriving.",
        entryDate: "2026-03-02", targetPrice: 230.00,
    },
    {
        id: "c17", ticker: "EQIX", name: "Equinix Inc.",
        assetClass: "Commercial RE", currentPrice: 966.10, costBasis: 966.10, shares: 3,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "260+ data centers globally. AI needs compute and compute needs real estate.",
        entryDate: "2026-03-02", targetPrice: 1100.00,
    },
    // ── HIGH GROWTH ──
    {
        id: "c18", ticker: "CRM", name: "Salesforce Inc.",
        assetClass: "Equities", currentPrice: 192.95, costBasis: 192.95, shares: 10,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "David's sales team runs on Salesforce. Agentforce AI is actually useful — not just hype.",
        entryDate: "2026-03-02", targetPrice: 300.00,
    },
    {
        id: "c19", ticker: "UBER", name: "Uber Technologies Inc.",
        assetClass: "Equities", currentPrice: 75.95, costBasis: 75.95, shares: 40,
        roi: 0, ytd: 0, riskProfile: "High",
        investmentThesis: "Mobility + delivery + ads. Autonomous vehicles are a tailwind, not a threat — Uber partners with them.",
        entryDate: "2026-03-02", targetPrice: 100.00,
    },
    {
        id: "c20", ticker: "COIN", name: "Coinbase Global Inc.",
        assetClass: "Alternatives", currentPrice: 185.24, costBasis: 185.24, shares: 15,
        roi: 0, ytd: 0, riskProfile: "Aggressive",
        investmentThesis: "Picks and shovels of crypto. Small position (<3%) because it's speculative but the upside is big if regulation clears.",
        entryDate: "2026-03-02", targetPrice: 280.00,
    },
    {
        id: "c21", ticker: "LLY", name: "Eli Lilly and Co.",
        assetClass: "Equities", currentPrice: 1017.97, costBasis: 1017.97, shares: 4,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Michelle sees the GLP-1 demand firsthand as a nurse. Mounjaro and Zepbound are game changers.",
        entryDate: "2026-03-02", targetPrice: 1200.00,
    },
    {
        id: "c22", ticker: "PLTR", name: "Palantir Technologies",
        assetClass: "Equities", currentPrice: 145.17, costBasis: 145.17, shares: 25,
        roi: 0, ytd: 0, riskProfile: "Aggressive",
        investmentThesis: "Government and enterprise AI platform. Either becomes the next Oracle or stays niche. Small bet, big potential.",
        entryDate: "2026-03-02", targetPrice: 200.00,
    },
    {
        id: "c23", ticker: "MSFT", name: "Microsoft Corp.",
        assetClass: "Equities", currentPrice: 398.55, costBasis: 398.55, shares: 10,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "Azure + Copilot. Enterprise AI backbone. 400M+ commercial seats to upsell.",
        entryDate: "2026-03-02", targetPrice: 480.00,
    },
    {
        id: "c24", ticker: "BRK.B", name: "Berkshire Hathaway Inc. Class B",
        assetClass: "Equities", currentPrice: 480.17, costBasis: 480.17, shares: 6,
        roi: 0, ytd: 0, riskProfile: "Moderate",
        investmentThesis: "$200B cash pile. Even in an aggressive portfolio you need something that holds up in a crash.",
        entryDate: "2026-03-02", targetPrice: null,
    },
];

const clarkPortfolio: ClientPortfolio = {
    clientId: "clarks",
    holdings: clarkHoldings,
    targetAllocation: [
        { asset: "Equities", target: 75, actual: 73 },
        { asset: "Alternatives", target: 15, actual: 17 },
        { asset: "Commercial RE", target: 10, actual: 10 },
    ],
};

// ── Exports ───────────────────────────────────────────────────────

export const clients: ClientProfile[] = [martinProfile, clarkProfile];

export const clientPortfolios: Record<string, ClientPortfolio> = {
    martins: martinPortfolio,
    clarks: clarkPortfolio,
};

export function getClientById(id: string): ClientProfile | undefined {
    return clients.find((c) => c.id === id);
}

export function getClientPortfolio(id: string): ClientPortfolio | undefined {
    return clientPortfolios[id];
}
