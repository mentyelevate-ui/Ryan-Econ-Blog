import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Validate file type (should be PDF)
        if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Define the target path in the public directory
        const publicPath = path.join(process.cwd(), 'public', 'resume.pdf');

        // Write the file, overwriting the existing one
        fs.writeFileSync(publicPath, buffer);

        console.log(`[API] Resume updated at ${publicPath}`);

        return NextResponse.json({ success: true, message: "Resume updated successfully" });
    } catch (error) {
        console.error("Resume Upload Error:", error);
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
    }
}
