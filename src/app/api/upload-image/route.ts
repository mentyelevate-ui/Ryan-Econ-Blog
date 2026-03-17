import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Sanitize filename
        const fileName = `cover_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, fileName);

        // Save file to disk
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);

        const url = `/uploads/${fileName}`;

        return NextResponse.json({ success: true, url });
    } catch (error) {
        console.error("Image Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
