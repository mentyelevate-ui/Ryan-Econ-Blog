import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/sanityQueries";
import BlogPostContent from "@/components/blog/BlogPostContent";

export const revalidate = 60; // Revalidate live data every minute

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Await params to get the slug property
    const { slug } = await params;

    // Fetch live post data from Sanity (or fallback to mock)
    const post = await getPostBySlug(slug);

    if (!post) {
        return notFound();
    }

    return <BlogPostContent post={post} />;
}
