"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type BlogPost } from "@/lib/mockData/blog";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-20 glass rounded-3xl border border-dashed border-slate-700/50">
                <p className="text-slate-500 font-medium mb-2">No articles or research pieces yet.</p>
                <p className="text-xs text-slate-600">
                    Upload your first Markdown or Text file via the <Link href="/admin" className="text-gold-500/60 hover:text-gold-400 underline transition-colors">Admin Portal</Link>.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <Link
                        href={`/blog/${post.slug}`}
                        className="group block glass rounded-2xl overflow-hidden hover:border-gold-500/20 transition-all duration-300 h-full"
                    >
                        {/* Cover Image */}
                        <div className="h-52 bg-navy-800 relative overflow-hidden">
                            {post.imageUrl ? (
                                <img 
                                    src={post.imageUrl} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    alt={post.title}
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-600">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.08),transparent_60%)]" />
                                </div>
                            )}
                            
                            {post.videoUrl && (
                                <div className="absolute top-3 right-3">
                                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-crimson-500/20 text-crimson-400 backdrop-blur-sm border border-crimson-500/20">
                                        Video
                                    </span>
                                </div>
                            )}
                            <div className="absolute bottom-3 left-3">
                                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy-900/60 text-gold-400 backdrop-blur-sm">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-xs text-slate-500 mb-3">
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}{" "}
                                &bull; {post.readTime}
                            </p>
                            <h2 className="font-semibold text-lg text-foreground leading-snug mb-3 group-hover:text-gold-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-sm text-slate-400 line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
