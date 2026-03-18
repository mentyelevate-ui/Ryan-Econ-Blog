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
            category->title,
            "imageUrl": mainImage.asset->url,
            "pdfUrl": pdfFile.asset->url
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, excerpt, nativeContent, category: categoryName } = body;

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
        const doc = {
            _type: "post",
            title,
            slug: { _type: "slug", current: slug },
            excerpt: excerpt || "",
            publishedAt: new Date().toISOString(),
            category: categoryRef,
            // body: ... we would need to convert markdown to PortableText here for a full implementation
        };

        const result = await client.create(doc);
        return NextResponse.json({ success: true, id: result._id });
    } catch (error: any) {
        console.error("[API] POST Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, title, excerpt, category: categoryName, imageUrl, disclaimer, insight, nativeContent } = body;

        console.log(`[API] Attempting to update Sanity document: ${id}`);

        if (!id) {
            return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
        }

        // Prepare updates
        const patch: any = {};
        if (title) patch.title = title;
        if (excerpt !== undefined) patch.excerpt = excerpt;
        
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
