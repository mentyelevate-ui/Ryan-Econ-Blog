import { NextRequest, NextResponse } from 'next/server';
import { client as sanityClient } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
            return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to Sanity as an asset
        const asset = await sanityClient.assets.upload('file', buffer, {
            filename: 'resume.pdf',
            contentType: 'application/pdf',
        });

        // Store the resume URL in a singleton document
        const resumeDoc = {
            _id: 'siteResume',
            _type: 'siteSettings',
            resumeUrl: asset.url,
            resumeAssetId: asset._id,
            updatedAt: new Date().toISOString(),
        };

        await sanityClient.createOrReplace(resumeDoc);

        console.log(`[API] Resume uploaded to Sanity: ${asset.url}`);

        return NextResponse.json({ 
            success: true, 
            message: "Resume updated successfully",
            url: asset.url,
        });
    } catch (error: any) {
        console.error("Resume Upload Error:", error?.message || error);
        return NextResponse.json({ error: "Failed to upload resume. Check Sanity credentials." }, { status: 500 });
    }
}

export async function GET() {
    try {
        const doc = await sanityClient.fetch(`*[_id == "siteResume"][0]{ resumeUrl, updatedAt }`);
        if (doc?.resumeUrl) {
            return NextResponse.json({ url: doc.resumeUrl, updatedAt: doc.updatedAt });
        }
        // Fallback to local file
        return NextResponse.json({ url: '/resume.pdf', updatedAt: null });
    } catch {
        return NextResponse.json({ url: '/resume.pdf', updatedAt: null });
    }
}
