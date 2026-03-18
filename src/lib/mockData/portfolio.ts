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

// Global "showcase" holdings used on the homepage preview — top picks across both portfolios
export const holdings: Holding[] = [
    {
        id: "g1", ticker: "VOO", name: "Vanguard S&P 500 ETF",
        assetClass: "Equities", currentPrice: 615.19, costBasis: 622.00, shares: 30,
        roi: -1.1, ytd: -0.42, riskProfile: "Moderate",
        investmentThesis: "Core allocation providing broad exposure to 500 large-cap U.S. companies at a 0.03% expense ratio. The engine of long-term compounding.",
        entryDate: "2026-03-01", targetPrice: null,
    },
    {
        id: "g2", ticker: "NVDA", name: "NVIDIA Corp.",
        assetClass: "Equities", currentPrice: 182.95, costBasis: 190.00, shares: 40,
        roi: -3.7, ytd: -1.45, riskProfile: "Aggressive",
        investmentThesis: "AI infrastructure monopoly. NVIDIA controls 80%+ of the data center GPU market. The Blackwell architecture cycle creates a multi-year revenue visibility.",
        entryDate: "2026-03-01", targetPrice: 250.00,
    },
    {
        id: "g3", ticker: "BX", name: "Blackstone Inc.",
        assetClass: "Alternatives", currentPrice: 112.00, costBasis: 118.00, shares: 35,
        roi: -5.1, ytd: -1.98, riskProfile: "High",
        investmentThesis: "World's largest alternative asset manager with $1T+ AUM. The secular shift from public to private markets accelerates fee-related earnings.",
        entryDate: "2026-03-01", targetPrice: 155.00,
    },
    {
        id: "g4", ticker: "O", name: "Realty Income Corp.",
        assetClass: "Commercial RE", currentPrice: 65.09, costBasis: 64.00, shares: 60,
        roi: 1.7, ytd: 0.66, riskProfile: "Low",
        investmentThesis: "Monthly dividend REIT with 30+ years of consecutive increases. 99%+ occupancy with net-lease model providing inflation-protected cash flow.",
        entryDate: "2026-03-01", targetPrice: 72.00,
    },
    {
        id: "g5", ticker: "GOOGL", name: "Alphabet Inc.",
        assetClass: "Equities", currentPrice: 309.41, costBasis: 315.00, shares: 15,
        roi: -1.8, ytd: -0.69, riskProfile: "Moderate",
        investmentThesis: "Search + Cloud + AI trifecta. Most undervalued Magnificent 7 name. YouTube's ad moat and Waymo's AV optionality add asymmetric upside.",
        entryDate: "2026-03-01", targetPrice: 365.00,
    },
    {
        id: "g6", ticker: "JPM", name: "JPMorgan Chase & Co.",
        assetClass: "Equities", currentPrice: 286.89, costBasis: 292.00, shares: 8,
        roi: -1.8, ytd: -0.68, riskProfile: "Moderate",
        investmentThesis: "Fortress balance sheet benchmark for global banking. $4T+ in assets, unmatched cross-selling, and $35B+ annual technology spend builds durable moats.",
        entryDate: "2026-03-01", targetPrice: 330.00,
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
