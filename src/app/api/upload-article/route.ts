import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

// Define the expected BlogPost interface for type safety
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt: string;
    readTime: string;
    category: string;
    imageUrl?: string;
    pdfUrl?: string;
}

export async function GET() {
    console.log("[API] GET Articles triggered...");
    console.log("[API] Using Project ID:", client.config().projectId);
    try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            publishedAt,
            excerpt,
            readTime,
            "category": category->title,
            "imageUrl": mainImage.asset->url,
            "pdfUrl": pdfFile.asset->url,
            nativeContent,
            body,
            insight,
            disclaimer
        }`;
        const data = await client.fetch(query);
        console.log(`[API] Found ${data?.length || 0} articles in Sanity.`);
        
        const posts = data.map((item: any) => ({
            ...item,
            id: item._id
        }));

        return NextResponse.json(posts);
    } catch (error: any) {
        console.error("[API] GET Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * POST — Upload a new article
 * 
 * Accepts either:
 *   1. FormData with a 'file' field (PDF or text file) → auto-extracts text
 *   2. JSON body with { title, excerpt, nativeContent, category }
 */
export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("content-type") || "";
        
        let title = "";
        let excerpt = "";
        let nativeContent = "";
        let categoryName = "";
        let pdfAssetId: string | undefined;

        if (contentType.includes("multipart/form-data")) {
            // --- File Upload Mode ---
            const formData = await request.formData();
            const file = formData.get("file") as File | null;

            if (!file) {
                return NextResponse.json({ error: "No file provided" }, { status: 400 });
            }

            console.log(`[API] Processing file upload: ${file.name} (${file.type}, ${file.size} bytes)`);

            const fileBuffer = Buffer.from(await file.arrayBuffer());

            if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
                // --- PDF Extraction ---
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const pdfParse = require("pdf-parse");
                
                const pdfData = await pdfParse(fileBuffer);
                nativeContent = pdfData.text || "";
                
                // Extract title from first line of PDF text
                const firstLine = nativeContent.split('\n').find(l => l.trim().length > 5);
                title = firstLine?.trim() || file.name.replace(/\.pdf$/i, '');
                
                // Generate excerpt from first ~200 chars of real content
                const contentStart = nativeContent
                    .split('\n')
                    .filter(l => l.trim().length > 20)
                    .slice(1, 3)
                    .join(' ')
                    .substring(0, 200);
                excerpt = contentStart.trim() + '...';

                // Also upload the PDF as a Sanity asset for download
                try {
                    const pdfAsset = await client.assets.upload('file', fileBuffer, {
                        filename: file.name,
                        contentType: 'application/pdf'
                    });
                    pdfAssetId = pdfAsset._id;
                    console.log(`[API] PDF uploaded as Sanity asset: ${pdfAssetId}`);
                } catch (pdfErr) {
                    console.warn("[API] PDF asset upload failed, continuing without:", pdfErr);
                }

                console.log(`[API] Extracted ${nativeContent.length} chars from PDF`);

            } else {
                // --- Text/Markdown File ---
                nativeContent = fileBuffer.toString("utf-8");
                const firstLine = nativeContent.split('\n').find(l => l.trim().length > 5);
                title = firstLine?.trim() || file.name.replace(/\.\w+$/i, '');
                
                const contentStart = nativeContent
                    .split('\n')
                    .filter(l => l.trim().length > 20)
                    .slice(1, 3)
                    .join(' ')
                    .substring(0, 200);
                excerpt = contentStart.trim() + '...';
            }

            categoryName = "Economic Research";

        } else {
            // --- JSON Mode (manual creation) ---
            const body = await request.json();
            title = body.title || "";
            excerpt = body.excerpt || "";
            nativeContent = body.nativeContent || "";
            categoryName = body.category || "";
        }

        if (!title) {
            return NextResponse.json({ error: "Could not determine article title" }, { status: 400 });
        }

        console.log(`[API] Creating new Sanity post: ${title}`);

        // 1. Ensure category exists or get reference
        let categoryRef = undefined;
        if (categoryName) {
            const catQuery = `*[_type == "category" && title == $title][0]._id`;
            let catId = await client.fetch(catQuery, { title: categoryName });
            if (!catId) {
                const newCat = await client.create({
                    _type: "category",
                    title: categoryName,
                    slug: { current: categoryName.toLowerCase().replace(/\s+/g, "-") }
                });
                catId = newCat._id;
            }
            categoryRef = { _type: "reference", _ref: catId };
        }

        // 2. Create the post
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const doc: any = {
            _type: "post",
            title,
            slug: { _type: "slug", current: slug },
            excerpt: excerpt || "",
            nativeContent: nativeContent || undefined,
            publishedAt: new Date().toISOString(),
            category: categoryRef,
        };

        // Attach PDF file reference if we uploaded one
        if (pdfAssetId) {
            doc.pdfFile = {
                _type: "file",
                asset: { _type: "reference", _ref: pdfAssetId }
            };
        }

        const result = await client.create(doc);
        console.log(`[API] Created post: ${result._id}`);
        return NextResponse.json({ success: true, id: result._id, title });
    } catch (error: any) {
        console.error("[API] POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { 
            id, 
            title, 
            excerpt, 
            category: categoryName, 
            mainImageAssetId,
            disclaimer, 
            insight, 
            nativeContent 
        } = body;

        console.log(`[API] Attempting to update Sanity document: ${id}`);

        if (!id) {
            return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
        }

        // Prepare updates
        const patch: any = {};
        if (title) patch.title = title;
        if (excerpt !== undefined) patch.excerpt = excerpt;
        if (insight !== undefined) patch.insight = insight;
        if (disclaimer !== undefined) patch.disclaimer = disclaimer;
        if (nativeContent !== undefined) patch.nativeContent = nativeContent;
        
        // Handle Category Reference if updated
        if (categoryName) {
            const catQuery = `*[_type == "category" && title == $title][0]._id`;
            let catId = await client.fetch(catQuery, { title: categoryName });
            if (!catId) {
                const newCat = await client.create({
                    _type: "category",
                    title: categoryName,
                    slug: { current: categoryName.toLowerCase().replace(/\s+/g, "-") }
                });
                catId = newCat._id;
            }
            patch.category = { _type: "reference", _ref: catId };
        }

        // Handle Image Asset Reference if updated
        if (mainImageAssetId) {
            patch.mainImage = {
                _type: "image",
                asset: { _type: "reference", _ref: mainImageAssetId }
            };
        }

        // Update the document
        const result = await client.patch(id).set(patch).commit();
        
        return NextResponse.json({ success: true, post: result });
    } catch (error: any) {
        console.error("[API] Critical Failure during Sanity PUT:", error);
        return NextResponse.json({ 
            error: "Failed to update Sanity document", 
            details: error.message 
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
        }

        console.log(`[API] Deleting Sanity document: ${id}`);
        await client.delete(id);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("[API] DELETE Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
