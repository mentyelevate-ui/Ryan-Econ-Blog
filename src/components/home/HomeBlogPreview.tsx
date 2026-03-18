"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

interface SanityPost {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt?: string;
    readTime?: string;
    category?: string;
    imageUrl?: string;
}

export default function HomeBlogPreview() {
    const [posts, setPosts] = useState<SanityPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch("/api/upload-article", { cache: "no-store" });
                if (res.ok) {
                    const data = await res.json();
                    setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
                }
            } catch {
                // Keep empty
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    // Don't render section if no articles
    if (!loading && posts.length === 0) return null;

    return (
        <section className="section-padding border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                            Latest Research
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Research & Notes
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
                    >
                        All Articles
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-40 bg-navy-700/50" />
                                <div className="p-5 space-y-3">
                                    <div className="h-3 bg-navy-700/50 rounded w-1/3" />
                                    <div className="h-4 bg-navy-700/50 rounded w-3/4" />
                                    <div className="h-3 bg-navy-700/50 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, i) => (
                            <motion.div
                                key={post._id || post.slug || i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block glass rounded-2xl overflow-hidden hover:border-gold-500/20 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="h-40 sm:h-48 bg-gradient-to-br from-navy-700 to-navy-600 relative overflow-hidden">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.08),transparent_60%)]" />
                                        )}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy-900/60 text-gold-400 backdrop-blur-sm">
                                                {post.category || "Research"}
                                            </span>
                                        </div>
                                        {i === 0 && (
                                            <div className="absolute top-3 right-3">
                                                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500 text-navy-950">
                                                    Latest
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-slate-500 mb-2">
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                            {post.readTime && ` · ${post.readTime}`}
                                        </p>
                                        <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-sm text-slate-400 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
