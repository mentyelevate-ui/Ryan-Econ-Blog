/**
 * Sanity CMS Schema: Holding (Portfolio Asset)
 *
 * This schema defines the structure for portfolio holdings in Sanity Studio.
 * To use: add this to your Sanity project's schema array.
 *
 * Fields map directly to the Holding interface in src/lib/mockData/portfolio.ts
 */

const holding = {
    name: "holding",
    title: "Portfolio Holding",
    type: "document",
    fields: [
        {
            name: "ticker",
            title: "Ticker Symbol",
            type: "string",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "name",
            title: "Company Name",
            type: "string",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "assetClass",
            title: "Asset Class",
            type: "string",
            options: {
                list: [
                    { title: "Equities", value: "Equities" },
                    { title: "Alternatives", value: "Alternatives" },
                    { title: "Commercial RE", value: "Commercial RE" },
                ],
                layout: "radio",
            },
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "currentPrice",
            title: "Current Price",
            type: "number",
        },
        {
            name: "costBasis",
            title: "Cost Basis (per share)",
            type: "number",
        },
        {
            name: "shares",
            title: "Shares Held",
            type: "number",
        },
        {
            name: "roi",
            title: "ROI (%)",
            type: "number",
            description: "Total return on investment as a percentage",
        },
        {
            name: "ytd",
            title: "YTD Performance (%)",
            type: "number",
        },
        {
            name: "riskProfile",
            title: "Risk Profile",
            type: "string",
            options: {
                list: [
                    { title: "Low", value: "Low" },
                    { title: "Moderate", value: "Moderate" },
                    { title: "High", value: "High" },
                    { title: "Aggressive", value: "Aggressive" },
                ],
                layout: "radio",
            },
        },
        {
            name: "investmentThesis",
            title: "Investment Thesis",
            type: "array",
            of: [
                { type: "block" }
            ],
            description:
                "Your written investment rationale. Use rich text formatting.",
        },
        {
            name: "attachedArticle",
            title: "Attached Research/Memo (PDF)",
            type: "file",
            options: {
                accept: "application/pdf"
            },
            description: "Optional: Upload a formal PDF memo, pitch deck, or research report.",
        },
        {
            name: "entryDate",
            title: "Entry Date",
            type: "date",
        },
        {
            name: "targetPrice",
            title: "Target Price",
            type: "number",
            description: "Leave empty if no price target set",
        },
    ],
    orderings: [
        {
            title: "Ticker (A-Z)",
            name: "tickerAsc",
            by: [{ field: "ticker", direction: "asc" }],
        },
        {
            title: "ROI (High to Low)",
            name: "roiDesc",
            by: [{ field: "roi", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "ticker",
            subtitle: "name",
        },
    },
};

export default holding;
