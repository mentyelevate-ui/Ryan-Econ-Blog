import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/stock-prices?tickers=AAPL,MSFT,GOOGL
 * 
 * Fetches live stock prices from Yahoo Finance v8 API.
 * Returns: { [ticker]: { price, change, changePercent, previousClose } }
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tickersParam = searchParams.get("tickers");

    if (!tickersParam) {
        return NextResponse.json({ error: "Missing 'tickers' query parameter" }, { status: 400 });
    }

    const tickers = tickersParam.split(",").map(t => t.trim().toUpperCase()).filter(Boolean);

    if (tickers.length === 0) {
        return NextResponse.json({ error: "No valid tickers provided" }, { status: 400 });
    }

    if (tickers.length > 50) {
        return NextResponse.json({ error: "Maximum 50 tickers per request" }, { status: 400 });
    }

    try {
        const symbols = tickers.join(",");
        const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketPreviousClose,regularMarketDayHigh,regularMarketDayLow,regularMarketVolume`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            },
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!response.ok) {
            console.error(`[Stock API] Yahoo Finance returned ${response.status}`);
            return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 502 });
        }

        const data = await response.json();
        const quotes = data?.quoteResponse?.result || [];

        const result: Record<string, {
            price: number;
            change: number;
            changePercent: number;
            previousClose: number;
            dayHigh: number;
            dayLow: number;
            volume: number;
        }> = {};

        for (const quote of quotes) {
            result[quote.symbol] = {
                price: quote.regularMarketPrice ?? 0,
                change: quote.regularMarketChange ?? 0,
                changePercent: quote.regularMarketChangePercent ?? 0,
                previousClose: quote.regularMarketPreviousClose ?? 0,
                dayHigh: quote.regularMarketDayHigh ?? 0,
                dayLow: quote.regularMarketDayLow ?? 0,
                volume: quote.regularMarketVolume ?? 0,
            };
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("[Stock API] Error:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
