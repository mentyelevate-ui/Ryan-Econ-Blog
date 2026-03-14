export type AssetClass = "Equities" | "Alternatives" | "Commercial RE";
export type RiskProfile = "Low" | "Moderate" | "High" | "Aggressive";

export interface Holding {
    id: string;
    ticker: string;
    name: string;
    assetClass: AssetClass;
    currentPrice: number;
    costBasis: number;
    shares: number;
    roi: number;
    ytd: number;
    riskProfile: RiskProfile;
    investmentThesis: any;
    entryDate: string;
    targetPrice: number | null;
    attachedArticle?: string; // a URL string
}

export const holdings: Holding[] = [
    {
        id: "1",
        ticker: "AAPL",
        name: "Apple Inc.",
        assetClass: "Equities",
        currentPrice: 242.35,
        costBasis: 178.50,
        shares: 150,
        roi: 35.7,
        ytd: 12.4,
        riskProfile: "Moderate",
        investmentThesis:
            "Apple's services ecosystem represents a structural moat with 40%+ gross margins and 2.2B active devices. The AI integration cycle via Apple Intelligence creates a multi-year hardware refresh catalyst, while capital return policy (>$100B annual) provides downside support. Financial services expansion via Apple Card and Savings positions the company as a fintech disruptor without regulatory classification challenges.",
        entryDate: "2024-03-15",
        targetPrice: 280.0,
    },
    {
        id: "2",
        ticker: "MSFT",
        name: "Microsoft Corp.",
        assetClass: "Equities",
        currentPrice: 448.20,
        costBasis: 340.00,
        shares: 80,
        roi: 31.8,
        ytd: 8.9,
        riskProfile: "Moderate",
        investmentThesis:
            "Azure's 30%+ growth trajectory positions Microsoft as the enterprise AI infrastructure backbone. Copilot monetization across O365 ($30/user/mo) represents a $50B+ TAM expansion opportunity. LinkedIn + Dynamics provide unique data moats for enterprise AI personalization. Balance sheet optionality with $75B+ in cash/equivalents.",
        entryDate: "2024-01-22",
        targetPrice: 520.0,
    },
    {
        id: "3",
        ticker: "BX",
        name: "Blackstone Inc.",
        assetClass: "Alternatives",
        currentPrice: 178.50,
        costBasis: 122.80,
        shares: 200,
        roi: 45.3,
        ytd: 18.7,
        riskProfile: "High",
        investmentThesis:
            "Blackstone's $1T+ AUM and 30-year track record in alternatives make it the de facto institutional allocator for private equity, real estate, and credit. The secular shift from public to private markets accelerates fee-related earnings growth. Insurance channel (via Resolution Life partnerships) creates perpetual capital vehicle advantages. BREIT democratization model is replicable across strategies.",
        entryDate: "2023-11-08",
        targetPrice: 210.0,
    },
    {
        id: "4",
        ticker: "AMT",
        name: "American Tower Corp.",
        assetClass: "Commercial RE",
        currentPrice: 214.30,
        costBasis: 188.00,
        shares: 120,
        roi: 14.0,
        ytd: 6.2,
        riskProfile: "Low",
        investmentThesis:
            "Cell tower infrastructure is the ultimate toll-road asset in the 5G/AI era. 99%+ lease renewal rates with contractual 3% annual escalators create visible, inflation-protected cash flow growth. International diversification across 25+ countries hedges domestic carrier concentration risk. Dividend yield of ~3% provides income floor for total return.",
        entryDate: "2024-06-10",
        targetPrice: 245.0,
    },
    {
        id: "5",
        ticker: "PLDG",
        name: "Prologis Inc.",
        assetClass: "Commercial RE",
        currentPrice: 128.90,
        costBasis: 110.50,
        shares: 175,
        roi: 16.7,
        ytd: 5.1,
        riskProfile: "Low",
        investmentThesis:
            "Prologis controls ~1B sq ft of global logistics real estate, positioning it as the landlord of e-commerce and nearshoring trends. Mark-to-market rent spreads of 50%+ on expiring leases drive organic NOI growth without new development. Data center conversion optionality on logistics sites creates asymmetric upside as AI compute demand explodes.",
        entryDate: "2024-04-03",
        targetPrice: 150.0,
    },
    {
        id: "6",
        ticker: "KKR",
        name: "KKR & Co. Inc.",
        assetClass: "Alternatives",
        currentPrice: 128.40,
        costBasis: 85.20,
        shares: 250,
        roi: 50.7,
        ytd: 22.3,
        riskProfile: "High",
        investmentThesis:
            "KKR's transformation from PE shop to diversified alternative asset manager unlocks multiple re-rating. Strategic insurance acquisitions (Global Atlantic) create permanent capital base, reducing reliance on fundraising cycles. Infrastructure and real assets AUM growth exceeds industry average. Management owns ~40% of equity, ensuring alignment.",
        entryDate: "2023-09-14",
        targetPrice: 155.0,
    },
    {
        id: "7",
        ticker: "JPM",
        name: "JPMorgan Chase & Co.",
        assetClass: "Equities",
        currentPrice: 234.80,
        costBasis: 195.00,
        shares: 100,
        roi: 20.4,
        ytd: 9.8,
        riskProfile: "Moderate",
        investmentThesis:
            "JPM is the fortress balance sheet benchmark for global banking. $4T+ in assets, $35B+ annual technology spend, and unmatched cross-selling across investment banking, commercial banking, and wealth management. NII benefits structurally from higher-for-longer rate environment. Jamie Dimon's succession planning is the primary watch item, already de-risked through deep bench development.",
        entryDate: "2024-02-28",
        targetPrice: 270.0,
    },
    {
        id: "8",
        ticker: "SPG",
        name: "Simon Property Group",
        assetClass: "Commercial RE",
        currentPrice: 167.20,
        costBasis: 142.00,
        shares: 90,
        roi: 17.7,
        ytd: 7.3,
        riskProfile: "Moderate",
        investmentThesis:
            "SPG's Class A mall portfolio is the anti-thesis to the 'retail is dead' narrative. Occupancy rates above 95% demonstrate the irreplaceability of premier physical retail destinations. Mixed-use densification strategy (adding residential, hotel, office) unlocks embedded land value. 5%+ dividend yield with consistent growth provides compelling risk-adjusted returns.",
        entryDate: "2024-05-20",
        targetPrice: 195.0,
    },
];

export interface PerformancePoint {
    month: string;
    portfolio: number;
    benchmark: number;
}

export const performanceData: PerformancePoint[] = [
    { month: "Jan", portfolio: 2.1, benchmark: 1.8 },
    { month: "Feb", portfolio: 3.5, benchmark: 2.4 },
    { month: "Mar", portfolio: 5.2, benchmark: 3.9 },
    { month: "Apr", portfolio: 4.8, benchmark: 4.1 },
    { month: "May", portfolio: 7.1, benchmark: 5.2 },
    { month: "Jun", portfolio: 9.3, benchmark: 6.8 },
    { month: "Jul", portfolio: 11.2, benchmark: 8.1 },
    { month: "Aug", portfolio: 10.8, benchmark: 7.9 },
    { month: "Sep", portfolio: 13.5, benchmark: 9.4 },
    { month: "Oct", portfolio: 15.1, benchmark: 10.8 },
    { month: "Nov", portfolio: 17.8, benchmark: 12.3 },
    { month: "Dec", portfolio: 19.4, benchmark: 13.6 },
];
