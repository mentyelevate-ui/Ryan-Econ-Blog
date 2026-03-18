import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log(`[API] Uploading image to Sanity asset: ${file.name}`);

        // Convert File to Buffer for Sanity Upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Sanity
        const asset = await client.assets.upload("image", buffer, {
            filename: file.name,
            contentType: file.type || "image/png",
        });

        // Return the asset URL
        return NextResponse.json({ 
            success: true, 
            url: asset.url,
            assetId: asset._id
        });
    } catch (error: any) {
        console.error("Sanity Image Upload Error:", error);
        return NextResponse.json({ 
            error: "Failed to upload to Sanity", 
            details: error.message 
        }, { status: 500 });
    }
}
