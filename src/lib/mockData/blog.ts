export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    coverImage: string;
    videoUrl?: string;
    content: string;
}

export const blogPosts: BlogPost[] = [];
