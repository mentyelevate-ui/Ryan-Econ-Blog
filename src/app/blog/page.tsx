import { getBlogPosts } from "@/lib/sanityQueries";
import BlogGrid from "@/components/blog/BlogGrid";

export const revalidate = 60; // Revalidate live data every minute

export default async function BlogPage() {
    const blogPosts = await getBlogPosts();

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                        Economics Blog
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                        Research & Notes
                    </h1>
                    <p className="text-slate-400 max-w-2xl leading-relaxed">
                        Working through ideas on macroeconomics, asset allocation,
                        commercial real estate, and emerging market structures. These are
                        research notes, not investment advice — I&apos;m still learning.
                    </p>
                </div>

                {/* Blog Grid Client Component */}
                <BlogGrid posts={blogPosts} />
            </div>
        </div>
    );
}
