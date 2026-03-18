const { default: YahooFinance } = await import('yahoo-finance2');
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const march2Prices = {
    "VOO": 631.28, "SCHD": 31.86, "VXF": 218.02, "AAPL": 264.72, "MSFT": 398.55,
    "GOOGL": 306.52, "JNJ": 248.56, "PG": 163.51, "COST": 1002.77, "V": 320.51,
    "O": 67.56, "AMT": 190.20, "PLD": 142.72, "VNQ": 95.93, "BND": 74.64,
    "VTIP": 49.88, "GLD": 490.00, "JPM": 297.56, "HD": 370.81, "UNH": 294.93,
    "BRK-B": 480.17, "AVGO": 318.82, "QQQ": 608.09, "SMH": 406.39, "NVDA": 182.48,
    "META": 653.56, "AMZN": 208.39, "TSLA": 403.32, "BX": 115.33, "KKR": 90.61,
    "APO": 106.45, "GS": 861.70, "MA": 521.00, "SPG": 203.16, "EQIX": 966.10,
    "CRM": 192.95, "UBER": 75.95, "COIN": 185.24, "LLY": 1017.97, "PLTR": 145.17
};

async function check() {
    console.log("Checking REAL Current ROI...");
    for (const [ticker, cost] of Object.entries(march2Prices)) {
        try {
            const quote = await yf.quoteCombine(ticker);
            const current = quote.regularMarketPrice;
            const roi = ((current - cost) / cost) * 100;
            console.log(`${ticker.padEnd(6)} | Cost: ${cost.toFixed(2)} | Now: ${current.toFixed(2)} | ROI: ${roi.toFixed(2)}%`);
        } catch (e) {}
    }
}
check();
