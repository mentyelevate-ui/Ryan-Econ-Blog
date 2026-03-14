"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { blogPosts } from "@/lib/mockData/blog";

export default function HomeBlogPreview() {
    const posts = blogPosts.slice(0, 3);

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
                            Economics Blog
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block glass rounded-2xl overflow-hidden hover:border-gold-500/20 transition-all duration-300"
                            >
                                {/* Image placeholder */}
                                <div className="h-48 bg-gradient-to-br from-navy-700 to-navy-600 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,76,0.08),transparent_60%)]" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy-900/60 text-gold-400 backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-xs text-slate-500 mb-2">
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}{" "}
                                        &bull; {post.readTime}
                                    </p>
                                    <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
