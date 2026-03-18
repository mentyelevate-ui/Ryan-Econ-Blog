import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Manually load env from .env.local
const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
        env[match[1]] = val;
    }
});

const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-03-10",
    token: env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function migrate() {
    console.log("🚀 Starting Sanity Migration (Plain JS Mode)...");
    
    const mockFilePath = path.join(process.cwd(), "src/lib/mockData/localBlog.json");
    if (!fs.existsSync(mockFilePath)) {
        console.log("❌ No local blog data found to migrate.");
        return;
    }

    const data = fs.readFileSync(mockFilePath, "utf-8");
    const posts = JSON.parse(data);

    console.log(`📦 Found ${posts.length} posts to migrate.`);

    for (const post of posts) {
        console.log(`\n📄 Migrating: "${post.title}"`);
        
        try {
            // 1. Handle Category
            let catRef = undefined;
            if (post.category) {
                const catQuery = `*[_type == "category" && title == $title][0]._id`;
                let catId = await client.fetch(catQuery, { title: post.category });
                if (!catId) {
                    console.log(`   ➕ Creating category: ${post.category}`);
                    const newCat = await client.create({
                        _type: "category",
                        title: post.category,
                        slug: { _type: "slug", current: post.category.toLowerCase().replace(/\s+/g, "-") }
                    });
                    catId = newCat._id;
                }
                catRef = { _type: "reference", _ref: catId };
            }

            // 2. Prepare Post Doc
            const doc = {
                _type: "post",
                title: post.title,
                slug: { _type: "slug", current: post.slug },
                excerpt: post.excerpt || "",
                publishedAt: post.publishedAt || new Date().toISOString(),
                category: catRef,
            };

            await client.create(doc);
            console.log(`   ✅ Success!`);
        } catch (err) {
            console.error(`   ❌ Failed to migrate "${post.title}":`, err.message);
        }
    }

    console.log("\n🏁 Migration complete!");
}

migrate();
