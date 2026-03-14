import { NextResponse } from "next/server";
import { read, utils } from "xlsx";
import fs from "fs";
import path from "path";

// Define the expected Holding interface shape based on our mock data
interface ExcelRow {
    Ticker: string;
    Name: string;
    "Asset Class": string;
    "Current Price": number;
    "Cost Basis": number;
    Shares: number;
    ROI: number;
    YTD: number;
    "Risk Profile": string;
    "Investment Thesis": string;
    "Entry Date": string | number; // Excel dates can be numbers
    "Target Price": number | string;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Read the file buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse Excel workbook
        const workbook = read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // grab first sheet
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON array
        const rawData: ExcelRow[] = utils.sheet_to_json(sheet);

        // Format the parsed data into our specific application schema
        const holdings = rawData.map((row, index) => {
            // Convert Excel serial dates safely or keep as string
            let entryDateRaw = row["Entry Date"];
            let entryDate = new Date().toISOString().split("T")[0];
            if (typeof entryDateRaw === "number") {
                // Convert Excel serial date to JS Date
                const d = new Date((entryDateRaw - 25569) * 86400 * 1000);
                entryDate = d.toISOString().split("T")[0];
            } else if (typeof entryDateRaw === "string") {
                entryDate = entryDateRaw;
            }

            return {
                id: String(index + 1),
                ticker: String(row.Ticker || "UNKNOWN"),
                name: String(row.Name || "Unknown Company"),
                assetClass: String(row["Asset Class"] || "Equities"),
                currentPrice: Number(row["Current Price"] || 0),
                costBasis: Number(row["Cost Basis"] || 0),
                shares: Number(row.Shares || 0),
                roi: Number(row.ROI || 0),
                ytd: Number(row.YTD || 0),
                riskProfile: String(row["Risk Profile"] || "Moderate"),
                investmentThesis: String(row["Investment Thesis"] || "No thesis provided."),
                entryDate: entryDate,
                targetPrice: row["Target Price"] ? Number(row["Target Price"]) : null,
                attachedArticle: ""
            };
        });

        // Normally, here is where we would push this data securely to the Sanity CMS database:
        // await sanityClient.createOrReplace(...)

        // However, for this local demonstration before you add your database keys, 
        // we will surgically inject this data right into your local mockData file!
        const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localHoldings.json");
        fs.writeFileSync(mockFilePath, JSON.stringify(holdings, null, 4));

        return NextResponse.json({ success: true, processed: holdings.length });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Failed to parse data" }, { status: 500 });
    }
}
