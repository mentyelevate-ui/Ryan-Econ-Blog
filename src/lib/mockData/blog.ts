export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    readTime: string;
    imageUrl?: string;
    videoUrl?: string;
    pdfUrl?: string;
    disclaimer?: string;
    content: string;
}

export const blogPosts: BlogPost[] = [];
