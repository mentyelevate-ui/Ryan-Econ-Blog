import { client } from "@/sanity/lib/client";
import { holdings as mockHoldings } from "./mockData/portfolio";
import { blogPosts as mockBlogPosts } from "./mockData/blog";
import fs from "fs";
import path from "path";

function getLocalFallbackHoldings() {
    try {
        const filePath = path.join(process.cwd(), "src/lib/mockData/localHoldings.json");
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }
    } catch (e) {
        // ignore errors
    }
    return mockHoldings;
}

function getLocalFallbackBlogPosts() {
    try {
        const filePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }
    } catch (e) {
        // ignore errors
    }
    return mockBlogPosts;
}

// Function to fetch live pricing and calculate real-time ROI
async function enrichHoldingsWithLivePrices(holdings: any[]) {
    try {
        const { default: YahooFinance } = await import("yahoo-finance2");
        const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

        return await Promise.all(
            holdings.map(async (holding) => {
                // Skip private equity or non-traded assets in our mock set
                if (holding.ticker === "ANTH" || holding.name.includes("Private")) {
                    return holding;
                }

                try {
                    const quote = await yf.quoteCombine(holding.ticker);
                    if (quote && quote.regularMarketPrice) {
                        const price = quote.regularMarketPrice;
                        holding.currentPrice = price;

                        // Recalculate true ROI based on their cost basis vs live price
                        if (holding.costBasis > 0) {
                            holding.roi = ((price - holding.costBasis) / holding.costBasis) * 100;
                        }

                        // Let's use regularMarketChangePercent (daily change) instead of YTD
                        // because fetching 18 historical Jan 1st prices every page load is too slow/rate-limited.
                        // We will repurpose the 'ytd' field to act as our live Daily Change metric.
                        if (quote.regularMarketChangePercent !== undefined) {
                            holding.ytd = quote.regularMarketChangePercent;
                        }
                    }
                } catch (err) {
                    console.warn(`Could not fetch live price for ${holding.ticker}`);
                }
                return holding;
            })
        );
    } catch (error) {
        console.warn("Could not import yahoo-finance2, skipping live enrichment", error);
        return holdings;
    }
}

// Query for all holdings, including the URL for the attached article PDF
export async function getHoldings() {
    try {
        const query = `*[_type == "holding"] | order(ticker asc) {
            _id,
            ticker,
            name,
            assetClass,
            currentPrice,
            costBasis,
            shares,
            roi,
            ytd,
            riskProfile,
            investmentThesis,
            entryDate,
            targetPrice,
            "attachedArticle": attachedArticle.asset->url
        }`;
        const data = await client.fetch(query);

        // If the user hasn't added data yet to Sanity, fallback to our local/uploaded data
        let finalHoldings = [];
        if (!data || data.length === 0) {
            finalHoldings = getLocalFallbackHoldings();
        } else {
            // Map _id to id to match our frontend interface expectations
            finalHoldings = data.map((item: any) => ({
                ...item,
                id: item._id
            }));
        }

        return await enrichHoldingsWithLivePrices(finalHoldings);
    } catch (error) {
        console.warn("Failed to fetch from Sanity, falling back to local data", error);
        const fallback = getLocalFallbackHoldings();
        return await enrichHoldingsWithLivePrices(fallback);
    }
}

// Query for all blog posts
export async function getBlogPosts() {
    try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            publishedAt,
            excerpt,
            readTime,
            category,
            "imageUrl": mainImage.asset->url
        }`;
        const data = await client.fetch(query);

        if (!data || data.length === 0) {
            return getLocalFallbackBlogPosts();
        }

        return data.map((item: any) => ({
            ...item,
            id: item._id
        }));
    } catch (error) {
        console.warn("Failed to fetch from Sanity, falling back to local blog data", error);
        return getLocalFallbackBlogPosts();
    }
}

// Query for a single blog post by slug
export async function getPostBySlug(slug: string) {
    try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            publishedAt,
            excerpt,
            readTime,
            category,
            "imageUrl": mainImage.asset->url,
            body,
            videoUrl
        }`;
        const data = await client.fetch(query, { slug });

        if (!data) {
            const fbPosts = getLocalFallbackBlogPosts();
            const mockPost = fbPosts.find((p: any) => p.slug === slug);
            return mockPost || null;
        }

        return {
            ...data,
            id: data._id
        };
    } catch (error) {
        console.warn("Failed to fetch from Sanity, falling back to local blog data", error);
        const fbPosts = getLocalFallbackBlogPosts();
        const mockPost = fbPosts.find((p: any) => p.slug === slug);
        return mockPost || null;
    }
}
