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
// MODERATE RISK — Young family, 30-year horizon, balanced growth
// All positions entered March 1, 2026. Prices reflect ~18 days of market movement.

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
        "A balanced growth strategy emphasizing low-cost index exposure and blue-chip dividend growers. We maintain a 65/20/15 split across equities, real estate/REITs, and fixed income/alternatives. The portfolio prioritizes companies with strong free cash flow and defensive moats to weather volatility while compounding over a 30-year horizon. Annual rebalancing with tax-loss harvesting in taxable accounts.",
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
            { date: "2026-03-01", type: "review", label: "Q1 2026 — Initial Deployment of New Capital" },
        ],
    },
};

const martinHoldings: Holding[] = [
    // ── CORE INDEX (40% target) ──
    {
        id: "m1", ticker: "VOO", name: "Vanguard S&P 500 ETF",
        assetClass: "Equities", currentPrice: 615.19, costBasis: 622.00, shares: 30,
        roi: -1.1, ytd: -0.42, riskProfile: "Moderate",
        investmentThesis: "Core allocation providing broad exposure to 500 large-cap U.S. companies at a 0.03% expense ratio. For a 30-year horizon, this is the engine of compounding. Despite early March volatility, historical 10%+ CAGR supports the Martin family's long-term wealth building goals. We dollar-cost average monthly.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "m2", ticker: "SCHD", name: "Schwab U.S. Dividend Equity ETF",
        assetClass: "Equities", currentPrice: 30.95, costBasis: 31.20, shares: 500,
        roi: -0.8, ytd: -0.31, riskProfile: "Low",
        investmentThesis: "Dividend growth core. SCHD screens for companies with 10+ years of consecutive dividend increases, strong fundamentals, and attractive yield (~3.5%). Provides income stability and downside protection for the family's moderate risk profile. Reinvested dividends accelerate compounding.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "m3", ticker: "VXF", name: "Vanguard Extended Market ETF",
        assetClass: "Equities", currentPrice: 168.50, costBasis: 172.00, shares: 25,
        roi: -2.0, ytd: -0.78, riskProfile: "Moderate",
        investmentThesis: "Complements VOO by adding mid-cap and small-cap exposure that the S&P 500 misses. Historically, smaller companies outperform over 30-year periods. This gives the Martins exposure to the next generation of blue chips before they graduate to the S&P 500.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    // ── BLUE-CHIP GROWTH (25% target) ──
    {
        id: "m4", ticker: "AAPL", name: "Apple Inc.",
        assetClass: "Equities", currentPrice: 252.30, costBasis: 256.00, shares: 20,
        roi: -1.4, ytd: -0.55, riskProfile: "Moderate",
        investmentThesis: "Apple's services ecosystem represents a structural moat with 40%+ gross margins and 2.2B active devices. The AI integration cycle via Apple Intelligence creates a multi-year hardware refresh catalyst. James uses Apple products daily and deeply understands the ecosystem's stickiness.",
        entryDate: "2026-03-01", targetPrice: 295.00,
    },
    {
        id: "m5", ticker: "MSFT", name: "Microsoft Corp.",
        assetClass: "Equities", currentPrice: 401.19, costBasis: 410.00, shares: 12,
        roi: -2.1, ytd: -0.83, riskProfile: "Moderate",
        investmentThesis: "Azure's 30%+ growth trajectory positions Microsoft as the enterprise AI infrastructure backbone. Copilot monetization across Office 365 represents a $50B+ TAM expansion. James works in tech and has high conviction in the cloud computing thesis.",
        entryDate: "2026-03-01", targetPrice: 480.00,
    },
    {
        id: "m6", ticker: "GOOGL", name: "Alphabet Inc.",
        assetClass: "Equities", currentPrice: 309.41, costBasis: 315.00, shares: 15,
        roi: -1.8, ytd: -0.69, riskProfile: "Moderate",
        investmentThesis: "Search + Cloud + AI trifecta. Google's Gemini AI integration across Search, Cloud, and Workspace creates massive TAM expansion. YouTube's advertising moat and Waymo's autonomous vehicle optionality add asymmetric upside. Undervalued relative to peers on a P/E basis.",
        entryDate: "2026-03-01", targetPrice: 365.00,
    },
    {
        id: "m7", ticker: "JNJ", name: "Johnson & Johnson",
        assetClass: "Equities", currentPrice: 161.50, costBasis: 160.00, shares: 20,
        roi: 0.9, ytd: 0.35, riskProfile: "Low",
        investmentThesis: "Defensive healthcare compounder with 62 consecutive years of dividend increases (Dividend King). Post-Kenvue spin-off, JNJ is a pure-play pharmaceutical and medical devices company. Provides portfolio ballast during market drawdowns and steady income for the family.",
        entryDate: "2026-03-01", targetPrice: 185.00,
    },
    {
        id: "m8", ticker: "PG", name: "Procter & Gamble Co.",
        assetClass: "Equities", currentPrice: 172.80, costBasis: 170.00, shares: 18,
        roi: 1.6, ytd: 0.63, riskProfile: "Low",
        investmentThesis: "Consumer staples fortress with brands that consumers buy regardless of economic conditions (Tide, Pampers, Gillette). 68 consecutive years of dividend increases. As new parents, the Martins literally buy P&G products every week — this is investing in what you know.",
        entryDate: "2026-03-01", targetPrice: 195.00,
    },
    {
        id: "m9", ticker: "COST", name: "Costco Wholesale Corp.",
        assetClass: "Equities", currentPrice: 925.00, costBasis: 940.00, shares: 5,
        roi: -1.6, ytd: -0.62, riskProfile: "Moderate",
        investmentThesis: "Membership-based retail moat with 93% renewal rates. Costco's pricing power and bulk-buying model are structurally advantaged in inflationary environments. The Martins are Costco members and understand the value proposition firsthand.",
        entryDate: "2026-03-01", targetPrice: 1050.00,
    },
    {
        id: "m10", ticker: "V", name: "Visa Inc.",
        assetClass: "Equities", currentPrice: 310.11, costBasis: 316.00, shares: 10,
        roi: -1.9, ytd: -0.73, riskProfile: "Moderate",
        investmentThesis: "Payment network duopoly with Mastercard. Visa processes $15T+ in annual payment volume and earns a toll on every transaction. Cashless adoption globally is still early innings. Asset-light model generates 50%+ operating margins with minimal capital requirements.",
        entryDate: "2026-03-01", targetPrice: 360.00,
    },
    // ── REAL ESTATE / REITs (20% target) ──
    {
        id: "m11", ticker: "O", name: "Realty Income Corp.",
        assetClass: "Commercial RE", currentPrice: 65.09, costBasis: 64.00, shares: 60,
        roi: 1.7, ytd: 0.66, riskProfile: "Low",
        investmentThesis: "Monthly dividend REIT with 30+ years of consecutive dividend increases. The 'Monthly Dividend Company' has 99%+ occupancy with net-lease model providing inflation-protected cash flow. Ideal for the Martins' long-term compounding — dividends reinvested automatically.",
        entryDate: "2026-03-01", targetPrice: 72.00,
    },
    {
        id: "m12", ticker: "AMT", name: "American Tower Corp.",
        assetClass: "Commercial RE", currentPrice: 185.07, costBasis: 188.00, shares: 12,
        roi: -1.6, ytd: -0.61, riskProfile: "Low",
        investmentThesis: "Cell tower infrastructure is the ultimate toll-road asset in the 5G/AI era. 99%+ lease renewal rates with contractual 3% annual escalators create visible, inflation-protected cash flow. International diversification across 25+ countries hedges domestic risk.",
        entryDate: "2026-03-01", targetPrice: 215.00,
    },
    {
        id: "m13", ticker: "PLD", name: "Prologis Inc.",
        assetClass: "Commercial RE", currentPrice: 133.00, costBasis: 135.00, shares: 15,
        roi: -1.5, ytd: -0.58, riskProfile: "Low",
        investmentThesis: "Controls ~1B sq ft of global logistics real estate, positioning it as the landlord of e-commerce. Mark-to-market rent spreads of 50%+ on expiring leases drive organic NOI growth. Data center conversion optionality creates asymmetric upside as AI compute demand explodes.",
        entryDate: "2026-03-01", targetPrice: 155.00,
    },
    {
        id: "m14", ticker: "VNQ", name: "Vanguard Real Estate ETF",
        assetClass: "Commercial RE", currentPrice: 91.50, costBasis: 92.50, shares: 30,
        roi: -1.1, ytd: -0.42, riskProfile: "Low",
        investmentThesis: "Broad REIT index exposure at 0.12% expense ratio. Provides diversification across residential, office, industrial, and specialty REITs without single-name concentration risk. The rate-cut cycle makes REITs structurally attractive for the next 2-3 years.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    // ── FIXED INCOME & ALTERNATIVES (15% target) ──
    {
        id: "m15", ticker: "BND", name: "Vanguard Total Bond Market ETF",
        assetClass: "Alternatives", currentPrice: 73.98, costBasis: 73.50, shares: 50,
        roi: 0.7, ytd: 0.26, riskProfile: "Low",
        investmentThesis: "Portfolio ballast providing diversification and reducing overall volatility. Acts as a stabilizer during equity drawdowns and provides a rebalancing source during market corrections. Currently yielding ~4.2% which provides meaningful income alongside capital preservation.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "m16", ticker: "VTIP", name: "Vanguard Short-Term Inflation-Protected ETF",
        assetClass: "Alternatives", currentPrice: 49.80, costBasis: 49.60, shares: 40,
        roi: 0.4, ytd: 0.15, riskProfile: "Low",
        investmentThesis: "TIPS provide inflation-protected real returns. With the Martins raising two children, inflation hedging is critical — childcare, education, and housing costs all rise faster than CPI. Short-term TIPS minimize duration risk while maintaining purchasing power.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "m17", ticker: "GLD", name: "SPDR Gold Shares",
        assetClass: "Alternatives", currentPrice: 285.00, costBasis: 280.00, shares: 5,
        roi: 1.8, ytd: 0.69, riskProfile: "Low",
        investmentThesis: "5% gold allocation as portfolio insurance against tail risks and currency debasement. Gold has zero correlation with equities and tends to outperform during periods of geopolitical uncertainty. Central bank buying globally provides structural demand support.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    // ── INCOME GROWTH SATELLITES ──
    {
        id: "m18", ticker: "JPM", name: "JPMorgan Chase & Co.",
        assetClass: "Equities", currentPrice: 286.89, costBasis: 292.00, shares: 8,
        roi: -1.8, ytd: -0.68, riskProfile: "Moderate",
        investmentThesis: "Fortress balance sheet benchmark for global banking. $4T+ in assets, $35B+ annual technology spend, and unmatched cross-selling capabilities. NII benefits structurally from higher-for-longer rate environment. Jamie Dimon's succession planning is well underway.",
        entryDate: "2026-03-01", targetPrice: 330.00,
    },
    {
        id: "m19", ticker: "HD", name: "The Home Depot Inc.",
        assetClass: "Equities", currentPrice: 382.00, costBasis: 390.00, shares: 6,
        roi: -2.1, ytd: -0.80, riskProfile: "Moderate",
        investmentThesis: "As homeowners with a new mortgage, the Martins understand the home improvement cycle firsthand. HD dominates the $1T+ home improvement market with professional contractor growth accelerating. Aging U.S. housing stock (median age 40+ years) drives structural repair demand.",
        entryDate: "2026-03-01", targetPrice: 440.00,
    },
    {
        id: "m20", ticker: "UNH", name: "UnitedHealth Group Inc.",
        assetClass: "Equities", currentPrice: 287.57, costBasis: 295.00, shares: 8,
        roi: -2.5, ytd: -0.98, riskProfile: "Moderate",
        investmentThesis: "Healthcare conglomerate with Optum creating a vertically integrated care delivery model. Covers 150M+ lives and processes 50%+ of U.S. healthcare claims. As parents of young children, the Martins value exposure to the healthcare system they actively use.",
        entryDate: "2026-03-01", targetPrice: 350.00,
    },
    {
        id: "m21", ticker: "BRK.B", name: "Berkshire Hathaway Inc. Class B",
        assetClass: "Equities", currentPrice: 492.65, costBasis: 488.00, shares: 5,
        roi: 1.0, ytd: 0.37, riskProfile: "Moderate",
        investmentThesis: "Warren Buffett's conglomerate is effectively a diversified mutual fund with $200B+ in cash reserves. Provides exposure to insurance, railroads, energy, and consumer brands with zero management fees. Cash pile creates optionality for opportunistic acquisitions during market dislocations.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "m22", ticker: "AVGO", name: "Broadcom Inc.",
        assetClass: "Equities", currentPrice: 195.00, costBasis: 202.00, shares: 12,
        roi: -3.5, ytd: -1.36, riskProfile: "Moderate",
        investmentThesis: "Semiconductor infrastructure powering AI networking and custom silicon. The VMware acquisition creates a software-defined infrastructure stack rivaling only Microsoft. Broadcom's custom ASIC business with hyperscalers (Google TPU, Meta MTIA) is a secular growth driver.",
        entryDate: "2026-03-01", targetPrice: 250.00,
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
// AGGRESSIVE RISK — Dual income, catching up on retirement, 18-22yr horizon
// All positions entered March 1, 2026. Prices reflect ~18 days of market movement.

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
        "An aggressive growth strategy leveraging the Clarks' high income and dual saving capacity. We over-weight high-conviction growth equities and alternative asset managers to maximize returns over a compressed timeline. The portfolio runs a 75/15/10 equity/alternatives/RE split with quarterly rebalancing. We're maxing out catch-up 401(k) contributions and using a Roth conversion ladder strategy.",
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
            { date: "2024-09-10", type: "review", label: "Q3 Review — Portfolio at $180K Milestone" },
            { date: "2024-12-12", type: "rebalance", label: "Year-End Tax Strategy & Rebalance" },
            { date: "2025-03-18", type: "review", label: "Q1 2025 — Mortgage Payoff Acceleration Plan" },
            { date: "2025-06-20", type: "rebalance", label: "Mid-Year — Shifted to More Alternatives Exposure" },
            { date: "2025-09-15", type: "review", label: "Q3 Review — On Track for Catch-Up Goals" },
            { date: "2025-12-08", type: "rebalance", label: "Annual Rebalance — Portfolio Crossed $250K" },
            { date: "2026-01-20", type: "meeting", label: "2026 Strategic Planning & Goal Reassessment" },
            { date: "2026-03-01", type: "review", label: "Q1 2026 — Aggressive Deployment of New Capital" },
        ],
    },
};

const clarkHoldings: Holding[] = [
    // ── CORE GROWTH INDEX (30% target) ──
    {
        id: "c1", ticker: "QQQ", name: "Invesco QQQ Trust (Nasdaq-100)",
        assetClass: "Equities", currentPrice: 603.20, costBasis: 612.00, shares: 25,
        roi: -1.4, ytd: -0.56, riskProfile: "High",
        investmentThesis: "Core growth engine. QQQ gives concentrated exposure to the 100 largest Nasdaq-listed companies, heavily weighted toward tech and AI leaders. For the Clarks' aggressive catch-up timeline, this growth tilt is essential to close the retirement gap faster than broad-market returns.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "c2", ticker: "SMH", name: "VanEck Semiconductor ETF",
        assetClass: "Equities", currentPrice: 235.00, costBasis: 245.00, shares: 20,
        roi: -4.1, ytd: -1.59, riskProfile: "Aggressive",
        investmentThesis: "Concentrated semiconductor exposure capturing the AI infrastructure buildout. Semis are the foundational layer of every AI application. SMH provides diversified exposure across NVDA, AVGO, AMD, QCOM, and TSM without single-stock concentration risk.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    // ── MEGA-CAP TECH CONVICTION (25% target) ──
    {
        id: "c3", ticker: "NVDA", name: "NVIDIA Corp.",
        assetClass: "Equities", currentPrice: 182.95, costBasis: 190.00, shares: 40,
        roi: -3.7, ytd: -1.45, riskProfile: "Aggressive",
        investmentThesis: "AI infrastructure monopoly. NVIDIA controls 80%+ of the data center GPU market. The Blackwell architecture cycle and sovereign AI demand from governments worldwide creates a multi-year revenue visibility. Position is actively managed with trailing stops at -15%.",
        entryDate: "2026-03-01", targetPrice: 250.00,
    },
    {
        id: "c4", ticker: "META", name: "Meta Platforms Inc.",
        assetClass: "Equities", currentPrice: 617.64, costBasis: 630.00, shares: 10,
        roi: -2.0, ytd: -0.77, riskProfile: "High",
        investmentThesis: "Social media monopoly with 3.9B+ monthly active users. Meta's AI-driven content recommendation engine has driven a 25%+ increase in time spent on Reels. WhatsApp Business monetization is still early innings. $40B+ annual FCF funds Reality Labs without diluting shareholders.",
        entryDate: "2026-03-01", targetPrice: 750.00,
    },
    {
        id: "c5", ticker: "AMZN", name: "Amazon.com Inc.",
        assetClass: "Equities", currentPrice: 211.78, costBasis: 216.00, shares: 25,
        roi: -2.0, ytd: -0.76, riskProfile: "Moderate",
        investmentThesis: "AWS cloud dominance + retail AI optimization. Amazon's advertising business alone is now a $60B+ run-rate. The combination of cloud, e-commerce, and emerging healthcare plays makes this a diversified growth compounder for the Clarks' 20-year horizon.",
        entryDate: "2026-03-01", targetPrice: 270.00,
    },
    {
        id: "c6", ticker: "TSLA", name: "Tesla Inc.",
        assetClass: "Equities", currentPrice: 398.98, costBasis: 415.00, shares: 12,
        roi: -3.9, ytd: -1.50, riskProfile: "Aggressive",
        investmentThesis: "High-conviction bet on energy transition and autonomous driving. Tesla's Full Self-Driving software and robotaxi potential creates optionality worth $500B+ in TAM. Energy storage (Megapack) growing 100%+ YoY. The Clarks need outsized returns and accept the volatility.",
        entryDate: "2026-03-01", targetPrice: 550.00,
    },
    {
        id: "c7", ticker: "GOOGL", name: "Alphabet Inc.",
        assetClass: "Equities", currentPrice: 309.41, costBasis: 320.00, shares: 18,
        roi: -3.3, ytd: -1.29, riskProfile: "Moderate",
        investmentThesis: "Most undervalued Magnificent 7 name on a P/E basis. Google Cloud approaching profitability inflection, YouTube Shorts monetizing rapidly, and Waymo autonomous fleet expanding to new cities. The $80B+ cash pile enables aggressive share buybacks.",
        entryDate: "2026-03-01", targetPrice: 380.00,
    },
    {
        id: "c8", ticker: "AAPL", name: "Apple Inc.",
        assetClass: "Equities", currentPrice: 252.30, costBasis: 258.00, shares: 15,
        roi: -2.2, ytd: -0.86, riskProfile: "Moderate",
        investmentThesis: "Services ecosystem generating $100B+ annually at 70%+ gross margins. Apple Intelligence driving the largest iPhone upgrade cycle in 5 years. The walled garden creates customer lifetime value that no competitor can replicate.",
        entryDate: "2026-03-01", targetPrice: 300.00,
    },
    // ── ALTERNATIVE ASSET MANAGERS (15% target) ──
    {
        id: "c9", ticker: "BX", name: "Blackstone Inc.",
        assetClass: "Alternatives", currentPrice: 112.00, costBasis: 118.00, shares: 35,
        roi: -5.1, ytd: -1.98, riskProfile: "High",
        investmentThesis: "World's largest alternative asset manager with $1T+ AUM. Fee-related earnings are recurring and growing 20%+ annually. The secular shift from public to private markets accelerates as pension funds and sovereign wealth funds increase private allocations. Down from highs = entry opportunity.",
        entryDate: "2026-03-01", targetPrice: 155.00,
    },
    {
        id: "c10", ticker: "KKR", name: "KKR & Co. Inc.",
        assetClass: "Alternatives", currentPrice: 86.10, costBasis: 92.00, shares: 45,
        roi: -6.4, ytd: -2.50, riskProfile: "High",
        investmentThesis: "Transformed from PE shop to diversified alts platform. Global Atlantic insurance acquisition creates permanent capital base. Infrastructure and real assets AUM growth exceeds industry average. Management owns ~40% of equity ensuring alignment. Significant pullback from highs creates value entry.",
        entryDate: "2026-03-01", targetPrice: 130.00,
    },
    {
        id: "c11", ticker: "APO", name: "Apollo Global Management",
        assetClass: "Alternatives", currentPrice: 105.00, costBasis: 112.00, shares: 30,
        roi: -6.3, ytd: -2.44, riskProfile: "High",
        investmentThesis: "Apollo's Athene insurance platform creates the largest permanent capital vehicle in alternatives. Credit origination capabilities are unmatched. As rates normalize, Apollo's $700B AUM in credit strategies benefits from yield compression. Down 20%+ from highs = aggressive accumulation zone.",
        entryDate: "2026-03-01", targetPrice: 145.00,
    },
    // ── FINANCIALS & INDUSTRIALS ──
    {
        id: "c12", ticker: "JPM", name: "JPMorgan Chase & Co.",
        assetClass: "Equities", currentPrice: 286.89, costBasis: 295.00, shares: 12,
        roi: -2.7, ytd: -1.07, riskProfile: "Moderate",
        investmentThesis: "Fortress balance sheet with $4T+ in assets. JPM's investment banking, commercial banking, and wealth management divisions create unmatched cross-selling. Technology spend of $35B+ annually builds competitive moats that smaller banks cannot replicate.",
        entryDate: "2026-03-01", targetPrice: 350.00,
    },
    {
        id: "c13", ticker: "GS", name: "Goldman Sachs Group",
        assetClass: "Equities", currentPrice: 575.00, costBasis: 590.00, shares: 8,
        roi: -2.5, ytd: -0.99, riskProfile: "High",
        investmentThesis: "Premier investment bank and asset manager. The Marcus consumer banking pivot failed, but refocusing on institutional strengths is the right move. M&A and IPO activity recovery in 2026 creates a cyclical tailwind. Asset management pivot toward alts mirrors industry trends.",
        entryDate: "2026-03-01", targetPrice: 680.00,
    },
    {
        id: "c14", ticker: "MA", name: "Mastercard Inc.",
        assetClass: "Equities", currentPrice: 508.50, costBasis: 520.00, shares: 6,
        roi: -2.2, ytd: -0.86, riskProfile: "Moderate",
        investmentThesis: "Global payment network processing $9T+ annually. Cashless adoption in emerging markets is still in single digits. Cross-border transaction volumes growing 15%+ as global travel recovers. Asset-light model with 55%+ operating margins makes this a compounding machine.",
        entryDate: "2026-03-01", targetPrice: 600.00,
    },
    // ── COMMERCIAL RE (10% target) ──
    {
        id: "c15", ticker: "AMT", name: "American Tower Corp.",
        assetClass: "Commercial RE", currentPrice: 185.07, costBasis: 190.00, shares: 15,
        roi: -2.6, ytd: -1.01, riskProfile: "Low",
        investmentThesis: "Cell tower REIT is the portfolio's defensive anchor. Even in an aggressive strategy, we need assets that don't correlate with tech cycles. AMT's 99%+ renewal rates and 3% annual escalators provide inflation-protected income regardless of equity market conditions.",
        entryDate: "2026-03-01", targetPrice: 220.00,
    },
    {
        id: "c16", ticker: "SPG", name: "Simon Property Group",
        assetClass: "Commercial RE", currentPrice: 190.53, costBasis: 188.00, shares: 12,
        roi: 1.3, ytd: 0.51, riskProfile: "Moderate",
        investmentThesis: "Class A mall REIT defying the 'retail is dead' narrative. 95%+ occupancy demonstrates the irreplaceability of premier retail destinations. Mixed-use densification unlocks embedded land value. 5%+ dividend yield provides income floor while capital appreciates.",
        entryDate: "2026-03-01", targetPrice: 220.00,
    },
    {
        id: "c17", ticker: "EQIX", name: "Equinix Inc.",
        assetClass: "Commercial RE", currentPrice: 850.00, costBasis: 870.00, shares: 3,
        roi: -2.3, ytd: -0.89, riskProfile: "Moderate",
        investmentThesis: "Data center REIT at the epicenter of AI infrastructure demand. Equinix operates 260+ data centers across 72 metros globally. As AI model training and inference workloads explode, colocation demand creates a secular growth runway for the next decade.",
        entryDate: "2026-03-01", targetPrice: 1000.00,
    },
    // ── HIGH-GROWTH SATELLITES ──
    {
        id: "c18", ticker: "CRM", name: "Salesforce Inc.",
        assetClass: "Equities", currentPrice: 270.00, costBasis: 280.00, shares: 10,
        roi: -3.6, ytd: -1.39, riskProfile: "High",
        investmentThesis: "Enterprise AI platform play. Agentforce and Einstein AI integration across the CRM suite positions Salesforce as the enterprise AI agent platform. $35B+ revenue run rate with improving operating margins. David's sales team uses Salesforce daily — deep product understanding.",
        entryDate: "2026-03-01", targetPrice: 340.00,
    },
    {
        id: "c19", ticker: "UBER", name: "Uber Technologies Inc.",
        assetClass: "Equities", currentPrice: 72.00, costBasis: 75.00, shares: 40,
        roi: -4.0, ytd: -1.56, riskProfile: "High",
        investmentThesis: "Mobility + delivery platform with $41B+ gross bookings per quarter. Uber's marketplace flywheel creates winner-take-most dynamics in ride-sharing and delivery. Advertising revenue growing 70%+ and autonomous vehicle partnerships (Waymo, Aurora) provide optionality for margin expansion.",
        entryDate: "2026-03-01", targetPrice: 95.00,
    },
    {
        id: "c20", ticker: "COIN", name: "Coinbase Global Inc.",
        assetClass: "Alternatives", currentPrice: 185.00, costBasis: 200.00, shares: 15,
        roi: -7.5, ytd: -2.92, riskProfile: "Aggressive",
        investmentThesis: "Regulated crypto infrastructure play. Rather than betting on individual tokens, we're investing in the 'picks and shovels' of digital assets. Coinbase's custody, staking, and institutional prime brokerage services position it as the Goldman Sachs of crypto. High risk, high reward — sized at <3% of portfolio.",
        entryDate: "2026-03-01", targetPrice: 280.00,
    },
    {
        id: "c21", ticker: "LLY", name: "Eli Lilly and Co.",
        assetClass: "Equities", currentPrice: 820.00, costBasis: 840.00, shares: 4,
        roi: -2.4, ytd: -0.93, riskProfile: "Moderate",
        investmentThesis: "GLP-1 leader with Mounjaro and Zepbound creating a $100B+ obesity/diabetes market. Michelle is a nurse practitioner who sees the clinical demand firsthand. The pipeline extends beyond GLP-1 into Alzheimer's and immunology. Premium valuation is justified by revenue growth trajectory.",
        entryDate: "2026-03-01", targetPrice: 1000.00,
    },
    {
        id: "c22", ticker: "PLTR", name: "Palantir Technologies",
        assetClass: "Equities", currentPrice: 85.00, costBasis: 92.00, shares: 25,
        roi: -7.6, ytd: -2.96, riskProfile: "Aggressive",
        investmentThesis: "AI/ML platform for government and enterprise with no real competitor in the 'operating system for data' category. AIP (Artificial Intelligence Platform) bootcamp model converts enterprises at unprecedented rates. Binary risk: either becomes the AI infrastructure standard or remains niche. Sized accordingly.",
        entryDate: "2026-03-01", targetPrice: 140.00,
    },
    {
        id: "c23", ticker: "MSFT", name: "Microsoft Corp.",
        assetClass: "Equities", currentPrice: 401.19, costBasis: 412.00, shares: 10,
        roi: -2.6, ytd: -1.03, riskProfile: "Moderate",
        investmentThesis: "Azure is the #2 cloud provider with the strongest enterprise sales channel. Copilot integration across the Office 365 suite creates a $30/user/month upsell opportunity across 400M+ commercial seats. The GitHub+LinkedIn data moats enable uniquely defensible AI products.",
        entryDate: "2026-03-01", targetPrice: 500.00,
    },
    {
        id: "c24", ticker: "BRK.B", name: "Berkshire Hathaway Inc. Class B",
        assetClass: "Equities", currentPrice: 492.65, costBasis: 485.00, shares: 6,
        roi: 1.6, ytd: 0.61, riskProfile: "Moderate",
        investmentThesis: "Diversified conglomerate as portfolio insurance. Berkshire's $200B+ cash position provides optionality to deploy capital during market panics. Even in an aggressive portfolio, having 3% in Berkshire provides uncorrelated ballast and Buffett's proven capital allocation.",
        entryDate: "2026-03-01", targetPrice: null,
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
