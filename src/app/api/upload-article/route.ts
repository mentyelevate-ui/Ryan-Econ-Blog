import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the expected BlogPost interface shape based on our mock data
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt: string;
    content?: string; // Legacy string content
    body?: any; // PortableText array if we parse it
    readTime: string;
    category: string;
    imageUrl?: string;
    videoUrl?: string;
    pdfUrl?: string;
    disclaimer?: string;
    insight?: string;
    nativeContent?: string;
}

export async function GET() {
    try {
        const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");
        if (!fs.existsSync(mockFilePath)) {
            return NextResponse.json([]);
        }
        const data = fs.readFileSync(mockFilePath, "utf-8");
        const posts: BlogPost[] = JSON.parse(data);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Check if file is a PDF
        const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

        let title = "Untitled Article";
        let bodyContent = "";
        let pdfUrl = "";

        if (isPdf) {
            // Ensure uploads directory exists
            const uploadsDir = path.join(process.cwd(), "public", "uploads");
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }

            // Sanitized filename
            const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
            const filePath = path.join(uploadsDir, fileName);
            
            // Save PDF to disk
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync(filePath, buffer);
            
            pdfUrl = `/uploads/${fileName}`;
            title = file.name.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
            bodyContent = "This is a researcher proposal in PDF format. Please view the embedded document below.";
        } else {
            // Read the file content as text
            const textContent = await file.text();

            // Very basic parsing for a Markdown file:
            const lines = textContent.split("\n");
            bodyContent = textContent;

            if (lines.length > 0) {
                // If the first line is a markdown header, use it as title
                if (lines[0].startsWith("# ")) {
                    title = lines[0].replace("# ", "").trim();
                    bodyContent = lines.slice(1).join("\n").trim();
                } else if (lines[0].trim() !== "") {
                    // Otherwise just use the first non-empty line
                    title = lines[0].trim();
                }
            }
        }

        // Generate a simple slug from the title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        // Create a short excerpt from the first paragraph
        const paragraphs = bodyContent.split("\n\n").filter(p => p.trim());
        const excerpt = paragraphs.length > 0
            ? paragraphs[0].replace(/#/g, "").substring(0, 150) + "..."
            : "No summary available.";

        // Estimate read time (rough estimate: 200 words per minute)
        const wordCount = bodyContent.split(/\s+/).length;
        const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
        const readTime = `${readTimeMinutes} min read`;

        const newPost: BlogPost = {
            id: Date.now().toString(), // Simple unique ID
            title: title,
            slug: slug,
            publishedAt: new Date().toISOString(),
            excerpt: excerpt,
            content: bodyContent, // Store as raw markdown string for now
            readTime: readTime,
            category: "Research", // Default category
            pdfUrl: pdfUrl || undefined,
            imageUrl: isPdf ? "/uploads/default_economic_cover.png" : undefined,
            disclaimer: isPdf ? "This is only a research and preexisting idea into a bigger scope we will evaluate." : undefined,
            insight: "", // Initialize as empty for user to edit
            nativeContent: "", // Initialize as empty for user to edit
        };

        // For local demonstration before Sanity is connected,
        // we append this new post to the local mock database file.
        const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");

        let existingPosts: BlogPost[] = [];
        if (fs.existsSync(mockFilePath)) {
            try {
                const data = fs.readFileSync(mockFilePath, "utf-8");
                existingPosts = JSON.parse(data);
            } catch (e) {
                console.error("Error reading local blog file", e);
            }
        }

        // Check if a post with this slug already exists, update if it does
        const existingIndex = existingPosts.findIndex(p => p.slug === slug);
        if (existingIndex >= 0) {
            existingPosts[existingIndex] = { ...existingPosts[existingIndex], ...newPost };
        } else {
            // Add new post to the top
            existingPosts.unshift(newPost);
        }

        fs.writeFileSync(mockFilePath, JSON.stringify(existingPosts, null, 4));

        return NextResponse.json({ success: true, title: newPost.title, slug: newPost.slug });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Failed to parse article data" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        console.log(`[API] Attempting to update post: ${id}`);
        console.log(`[API] Updates received:`, updates);

        if (!id) {
            console.error("[API] Error: Missing post ID");
            return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
        }

        const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");
        if (!fs.existsSync(mockFilePath)) {
            console.error(`[API] Error: Local blog file not found at ${mockFilePath}`);
            return NextResponse.json({ error: "No posts found" }, { status: 404 });
        }

        const data = fs.readFileSync(mockFilePath, "utf-8");
        const posts: BlogPost[] = JSON.parse(data);

        const index = posts.findIndex(p => p.id === id);
        if (index === -1) {
            console.error(`[API] Error: Post ID ${id} not found in local data`);
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Apply updates
        posts[index] = { ...posts[index], ...updates };

        fs.writeFileSync(mockFilePath, JSON.stringify(posts, null, 4));
        console.log(`[API] Success: Post ${id} updated on disk`);

        return NextResponse.json({ success: true, post: posts[index] });
    } catch (error) {
        console.error("[API] Critical Failure during PUT:", error);
        return NextResponse.json({ error: "Failed to update article on server" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        console.log(`[API] Deleting post ${id}`);

        if (!id) {
            return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
        }

        const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");
        if (!fs.existsSync(mockFilePath)) {
            return NextResponse.json({ error: "No posts found" }, { status: 404 });
        }

        const data = fs.readFileSync(mockFilePath, "utf-8");
        const posts: BlogPost[] = JSON.parse(data);

        const filteredPosts = posts.filter(p => p.id !== id);

        if (filteredPosts.length === posts.length) {
            console.error(`[API] Could not find post ${id} to delete`);
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        fs.writeFileSync(mockFilePath, JSON.stringify(filteredPosts, null, 4));
        console.log(`[API] Successfully deleted post ${id}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}
