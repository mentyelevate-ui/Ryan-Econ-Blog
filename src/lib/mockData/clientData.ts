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
    satisfactionScore: number; // 1-10
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
    crm: CRMStats;
}

export interface ClientPortfolio {
    clientId: string;
    holdings: Holding[];
    targetAllocation: { asset: string; target: number; actual: number }[];
}

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
        "James and Sarah are a young couple based in Austin, TX who recently started a family. They have a 2-year-old daughter and are expecting their second child. They bought their first home in 2024 with a $320K mortgage at 6.8%. They have $18K in student loans remaining and want to build a diversified portfolio that grows steadily while they focus on their careers and family. They max out their 401(k) employer match but haven't opened taxable brokerage accounts until now.",
    goals: [
        { label: "College Fund (529)", target: "$120,000 by 2044", progress: 8 },
        { label: "Home Equity Growth", target: "50% equity by 2035", progress: 12 },
        { label: "Emergency Fund", target: "6 months expenses", progress: 75 },
        { label: "Long-Term Wealth", target: "$1.2M net worth by 55", progress: 5 },
    ],
    strategy:
        "A balanced growth strategy emphasizing low-cost index exposure and blue-chip dividend growers. We maintain a 70/20/10 split across equities, real estate, and alternatives. The portfolio prioritizes companies with strong free cash flow and defensive moats to weather volatility while compounding over a 30-year horizon. Annual rebalancing with tax-loss harvesting in taxable accounts.",
    crm: {
        totalMeetings: 12,
        portfolioReviews: 4,
        rebalances: 2,
        clientSince: "2024-06-15",
        satisfactionScore: 9.2,
        nextReview: "2026-04-15",
        events: [
            { date: "2024-06-15", type: "onboarding", label: "Initial Discovery & Risk Assessment" },
            { date: "2024-07-20", type: "meeting", label: "Portfolio Construction Review" },
            { date: "2024-09-10", type: "review", label: "Q3 Performance Review" },
            { date: "2024-12-15", type: "rebalance", label: "Year-End Tax-Loss Harvest & Rebalance" },
            { date: "2025-03-20", type: "review", label: "Q1 2025 Review — Added 529 Plan" },
            { date: "2025-06-18", type: "meeting", label: "Mid-Year Check-In — Baby #2 Planning" },
            { date: "2025-09-12", type: "review", label: "Q3 Review — Rate Environment Update" },
            { date: "2025-12-10", type: "rebalance", label: "Annual Rebalance & Tax Strategy" },
            { date: "2026-01-15", type: "meeting", label: "2026 Goal Setting & Budget Review" },
            { date: "2026-03-10", type: "review", label: "Q1 2026 Performance & Allocation Check" },
        ],
    },
};

const martinHoldings: Holding[] = [
    {
        id: "m1",
        ticker: "VOO",
        name: "Vanguard S&P 500 ETF",
        assetClass: "Equities",
        currentPrice: 528.40,
        costBasis: 445.00,
        shares: 45,
        roi: 18.7,
        ytd: 4.2,
        riskProfile: "Moderate",
        investmentThesis:
            "Core allocation. VOO provides broad exposure to 500 large-cap U.S. companies at 0.03% expense ratio. For a 30-year horizon, this is the engine of compounding. Historical 10%+ CAGR supports long-term wealth building goals for the Martin family.",
        entryDate: "2024-07-01",
        targetPrice: null,
    },
    {
        id: "m2",
        ticker: "SCHD",
        name: "Schwab U.S. Dividend Equity ETF",
        assetClass: "Equities",
        currentPrice: 82.15,
        costBasis: 72.30,
        shares: 120,
        roi: 13.6,
        ytd: 3.1,
        riskProfile: "Low",
        investmentThesis:
            "Dividend growth core. SCHD screens for companies with 10+ years of consecutive dividend increases, strong fundamentals, and attractive yield (~3.5%). Provides income stability and downside protection for the family's moderate risk profile.",
        entryDate: "2024-07-01",
        targetPrice: null,
    },
    {
        id: "m3",
        ticker: "AAPL",
        name: "Apple Inc.",
        assetClass: "Equities",
        currentPrice: 242.35,
        costBasis: 178.50,
        shares: 30,
        roi: 35.7,
        ytd: 12.4,
        riskProfile: "Moderate",
        investmentThesis:
            "Growth satellite. Apple's services ecosystem and AI integration cycle create a multi-year catalyst. James uses Apple products daily and understands the ecosystem strength. Position sized at ~5% of portfolio as a conviction pick.",
        entryDate: "2024-08-15",
        targetPrice: 280.0,
    },
    {
        id: "m4",
        ticker: "O",
        name: "Realty Income Corp.",
        assetClass: "Commercial RE",
        currentPrice: 58.20,
        costBasis: 52.80,
        shares: 150,
        roi: 10.2,
        ytd: 2.8,
        riskProfile: "Low",
        investmentThesis:
            "Monthly dividend REIT providing predictable income. 'The Monthly Dividend Company' has 30+ years of consecutive dividend increases. Net-lease model with 99%+ occupancy provides inflation-protected cash flow for the Martins' long-term compounding.",
        entryDate: "2024-09-01",
        targetPrice: 68.0,
    },
    {
        id: "m5",
        ticker: "BND",
        name: "Vanguard Total Bond Market ETF",
        assetClass: "Alternatives",
        currentPrice: 72.40,
        costBasis: 70.10,
        shares: 80,
        roi: 3.3,
        ytd: 1.1,
        riskProfile: "Low",
        investmentThesis:
            "Portfolio ballast. BND provides diversification and reduces overall volatility for the family's moderate risk tolerance. Acts as a stabilizer during equity drawdowns and provides a rebalancing source during market corrections.",
        entryDate: "2024-07-01",
        targetPrice: null,
    },
    {
        id: "m6",
        ticker: "MSFT",
        name: "Microsoft Corp.",
        assetClass: "Equities",
        currentPrice: 448.20,
        costBasis: 340.00,
        shares: 15,
        roi: 31.8,
        ytd: 8.9,
        riskProfile: "Moderate",
        investmentThesis:
            "Azure cloud + Copilot AI monetization. Microsoft is the enterprise AI infrastructure backbone. James works in tech and has high conviction in the cloud computing thesis. Sized appropriately for the moderate risk profile.",
        entryDate: "2024-08-01",
        targetPrice: 520.0,
    },
];

const martinPortfolio: ClientPortfolio = {
    clientId: "martins",
    holdings: martinHoldings,
    targetAllocation: [
        { asset: "Equities", target: 70, actual: 72 },
        { asset: "Commercial RE", target: 15, actual: 12 },
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
        "David and Michelle are a dual-income couple in Charlotte, NC who spent their 30s focused on career advancement and paying off $95K in combined student debt. They finished paying off loans at age 42 and realized they were significantly behind on retirement savings. They have $62K in combined 401(k)s and $28K in savings. Their home is worth $485K with $310K remaining on the mortgage. They have no children and are determined to aggressively catch up on retirement planning with a target of $1.8M in investable assets by age 65.",
    goals: [
        { label: "Retirement Fund", target: "$1.8M by age 65", progress: 18 },
        { label: "Max 401(k) Catch-Up", target: "$30,500/yr each", progress: 45 },
        { label: "Mortgage Payoff", target: "Paid off by age 58", progress: 22 },
        { label: "Emergency Reserves", target: "12 months expenses", progress: 35 },
    ],
    strategy:
        "An aggressive growth strategy leveraging the Clarks' high income and dual saving capacity. We over-weight high-conviction growth equities and alternative asset managers to maximize returns over a compressed timeline. The portfolio runs a 80/10/10 equity/alternatives/RE split with quarterly rebalancing. We're maxing out catch-up 401(k) contributions and using a Roth conversion ladder strategy to optimize tax efficiency in retirement.",
    crm: {
        totalMeetings: 18,
        portfolioReviews: 6,
        rebalances: 4,
        clientSince: "2024-01-10",
        satisfactionScore: 9.5,
        nextReview: "2026-04-01",
        events: [
            { date: "2024-01-10", type: "onboarding", label: "Emergency Assessment — Retirement Gap Analysis" },
            { date: "2024-01-25", type: "meeting", label: "Aggressive Catch-Up Strategy Design" },
            { date: "2024-02-15", type: "meeting", label: "401(k) Optimization & Roth Conversion Planning" },
            { date: "2024-03-20", type: "review", label: "Q1 Review — Initial Deployment Phase" },
            { date: "2024-06-15", type: "rebalance", label: "Mid-Year Rebalance — Growth Tilt Increase" },
            { date: "2024-09-10", type: "review", label: "Q3 Review — Portfolio at $180K milestone" },
            { date: "2024-12-12", type: "rebalance", label: "Year-End Tax Strategy & Rebalance" },
            { date: "2025-03-18", type: "review", label: "Q1 2025 — Mortgage Payoff Acceleration Plan" },
            { date: "2025-06-20", type: "rebalance", label: "Mid-Year — Shifted to More Alternatives Exposure" },
            { date: "2025-09-15", type: "review", label: "Q3 Review — On Track for Catch-Up Goals" },
            { date: "2025-12-08", type: "rebalance", label: "Annual Rebalance — Portfolio Crossed $250K" },
            { date: "2026-01-20", type: "meeting", label: "2026 Strategic Planning & Goal Reassessment" },
            { date: "2026-03-12", type: "review", label: "Q1 2026 Performance — Ahead of Schedule" },
        ],
    },
};

const clarkHoldings: Holding[] = [
    {
        id: "c1",
        ticker: "QQQ",
        name: "Invesco QQQ Trust (Nasdaq-100)",
        assetClass: "Equities",
        currentPrice: 515.80,
        costBasis: 390.00,
        shares: 55,
        roi: 32.3,
        ytd: 9.8,
        riskProfile: "High",
        investmentThesis:
            "Core growth engine. QQQ gives concentrated exposure to the 100 largest Nasdaq-listed companies, heavily weighted toward tech and AI leaders. For the Clarks' aggressive catch-up timeline, this growth tilt is essential to close the retirement gap.",
        entryDate: "2024-02-01",
        targetPrice: null,
    },
    {
        id: "c2",
        ticker: "BX",
        name: "Blackstone Inc.",
        assetClass: "Alternatives",
        currentPrice: 178.50,
        costBasis: 122.80,
        shares: 65,
        roi: 45.3,
        ytd: 18.7,
        riskProfile: "High",
        investmentThesis:
            "Alternative asset manager with $1T+ AUM. Blackstone's fee-related earnings and permanent capital vehicles provide leveraged exposure to private markets. The secular shift from public to private markets is a multi-decade tailwind. High conviction position for the aggressive strategy.",
        entryDate: "2024-02-15",
        targetPrice: 210.0,
    },
    {
        id: "c3",
        ticker: "NVDA",
        name: "NVIDIA Corp.",
        assetClass: "Equities",
        currentPrice: 875.30,
        costBasis: 480.00,
        shares: 25,
        roi: 82.4,
        ytd: 28.5,
        riskProfile: "Aggressive",
        investmentThesis:
            "AI infrastructure monopoly. NVIDIA controls 80%+ of the data center GPU market. The Clarks need outsized returns, and NVDA's dominant position in the $150B+ AI chip market provides that upside. Position is actively managed with trailing stops.",
        entryDate: "2024-03-01",
        targetPrice: 1100.0,
    },
    {
        id: "c4",
        ticker: "KKR",
        name: "KKR & Co. Inc.",
        assetClass: "Alternatives",
        currentPrice: 128.40,
        costBasis: 85.20,
        shares: 80,
        roi: 50.7,
        ytd: 22.3,
        riskProfile: "High",
        investmentThesis:
            "Diversified alternative asset manager with insurance channel (Global Atlantic) creating permanent capital advantages. KKR's infrastructure and real assets AUM growth exceeds industry average. Aligns with the Clarks' aggressive growth mandate.",
        entryDate: "2024-02-15",
        targetPrice: 155.0,
    },
    {
        id: "c5",
        ticker: "AMZN",
        name: "Amazon.com Inc.",
        assetClass: "Equities",
        currentPrice: 198.60,
        costBasis: 148.00,
        shares: 70,
        roi: 34.2,
        ytd: 11.3,
        riskProfile: "Moderate",
        investmentThesis:
            "AWS cloud dominance + retail AI optimization. Amazon's advertising business alone is now a $50B+ run-rate. The combination of cloud, e-commerce, and emerging healthcare plays makes this a diversified growth compounder for the Clarks' 20-year horizon.",
        entryDate: "2024-04-01",
        targetPrice: 240.0,
    },
    {
        id: "c6",
        ticker: "AMT",
        name: "American Tower Corp.",
        assetClass: "Commercial RE",
        currentPrice: 214.30,
        costBasis: 188.00,
        shares: 40,
        roi: 14.0,
        ytd: 6.2,
        riskProfile: "Low",
        investmentThesis:
            "Cell tower infrastructure as a defensive REIT anchor. 99%+ lease renewal rates with 3% annual escalators provide inflation-protected income. This is the portfolio's stabilizer — essential even in an aggressive strategy to reduce drawdown risk.",
        entryDate: "2024-05-01",
        targetPrice: 245.0,
    },
    {
        id: "c7",
        ticker: "GOOGL",
        name: "Alphabet Inc.",
        assetClass: "Equities",
        currentPrice: 178.90,
        costBasis: 138.50,
        shares: 60,
        roi: 29.2,
        ytd: 7.8,
        riskProfile: "Moderate",
        investmentThesis:
            "Search + Cloud + AI trifecta. Google's Gemini AI integration across Search, Cloud, and Workspace creates a massive TAM expansion. YouTube's advertising moat and Waymo's autonomous vehicle optionality add asymmetric upside. Undervalued relative to peers on a P/E basis.",
        entryDate: "2024-03-15",
        targetPrice: 210.0,
    },
];

const clarkPortfolio: ClientPortfolio = {
    clientId: "clarks",
    holdings: clarkHoldings,
    targetAllocation: [
        { asset: "Equities", target: 80, actual: 78 },
        { asset: "Alternatives", target: 10, actual: 14 },
        { asset: "Commercial RE", target: 10, actual: 8 },
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
