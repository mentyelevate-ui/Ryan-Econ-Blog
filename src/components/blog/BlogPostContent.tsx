"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import StickyVideoPlayer from "@/components/blog/StickyVideoPlayer";
import { PortableText } from "@portabletext/react";

export default function BlogPostContent({ post }: { post: any }) {
    // Split content by double newlines to create paragraph-like sections if using the legacy string fallback
    const contentSections = typeof post.content === "string" ? post.content.split("\n\n") : [];

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
                    >
                        <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Back to Research
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                            {post.category}
                        </span>
                        <span className="text-xs text-slate-500">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span className="text-xs text-slate-600">&bull;</span>
                        <span className="text-xs text-slate-500">{post.readTime}</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        {post.title}
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {post.excerpt}
                    </p>
                </motion.div>

                {/* Video (if present) */}
                {post.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-10"
                    >
                        <StickyVideoPlayer videoUrl={post.videoUrl} />
                    </motion.div>
                )}

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose-custom prose-lg max-w-none text-slate-300"
                >
                    {post.pdfUrl && (
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-display font-bold text-slate-200 m-0">Document Viewer</h2>
                                <a 
                                    href={post.pdfUrl} 
                                    download 
                                    className="px-4 py-2 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-semibold hover:bg-gold-500/20 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Full Report
                                </a>
                            </div>
                            <div className="aspect-[3/4] sm:aspect-video w-full glass rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                                <iframe 
                                    src={`${post.pdfUrl}#toolbar=0`} 
                                    className="w-full h-full border-none"
                                    title={post.title}
                                />
                            </div>
                        </div>
                    )}

                    {post.body ? (
                        <PortableText value={post.body} />
                    ) : (
                        contentSections.map((section: string, i: number) => {
                            const trimmed = section.trim();

                            // Heading (## )
                            if (trimmed.startsWith("## ")) {
                                return (
                                    <h2
                                        key={i}
                                        className="font-display text-2xl font-bold text-foreground mt-10 mb-4"
                                    >
                                        {trimmed.replace("## ", "")}
                                    </h2>
                                );
                            }

                            // Heading (### )
                            if (trimmed.startsWith("### ")) {
                                return (
                                    <h3
                                        key={i}
                                        className="font-semibold text-lg text-foreground mt-8 mb-3"
                                    >
                                        {trimmed.replace("### ", "")}
                                    </h3>
                                );
                            }

                            // Numbered/bullet list
                            if (
                                trimmed.match(/^(\d+\.\s|\-\s)/) ||
                                trimmed.includes("\n- ") ||
                                trimmed.includes("\n1.")
                            ) {
                                const lines = trimmed.split("\n");
                                return (
                                    <ul key={i} className="space-y-2 my-4 ml-4">
                                        {lines
                                            .filter((l) => l.trim())
                                            .map((line, j) => {
                                                const cleaned = line
                                                    .replace(/^\d+\.\s/, "")
                                                    .replace(/^-\s/, "");
                                                return (
                                                    <li
                                                        key={j}
                                                        className="text-slate-300 leading-relaxed pl-2 border-l-2 border-gold-500/20"
                                                    >
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: cleaned.replace(
                                                                    /\*\*(.*?)\*\*/g,
                                                                    '<strong class="text-foreground font-semibold">$1</strong>'
                                                                ),
                                                            }}
                                                        />
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                );
                            }

                            // Markdown Table (| Header |)
                            if (trimmed.startsWith("|") && (trimmed.includes("\n|") || trimmed.includes("\r\n|"))) {
                                const rows = trimmed.split(/\r?\n/).filter(r => r.trim());
                                if (rows.length < 2) return null; // Need at least header and separator or content

                                const headerRow = rows[0].split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(s => s.trim());
                                const bodyRows = rows.slice(2).map(row =>
                                    row.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(s => s.trim())
                                );

                                return (
                                    <div key={i} className="my-10 overflow-x-auto glass rounded-2xl border border-slate-700/40">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs uppercase tracking-wider text-gold-400 bg-navy-900/50">
                                                <tr>
                                                    {headerRow.map((h, idx) => (
                                                        <th key={idx} className="px-6 py-4 font-bold border-b border-slate-700/50">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700/30">
                                                {bodyRows.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                        {row.map((cell, cidx) => (
                                                            <td key={cidx} className="px-6 py-4 text-slate-300 border-r last:border-r-0 border-slate-700/20">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            }

                            // Regular paragraph
                            return (
                                <p
                                    key={i}
                                    className="text-slate-300 leading-relaxed mb-4"
                                    dangerouslySetInnerHTML={{
                                        __html: trimmed.replace(
                                            /\*\*(.*?)\*\*/g,
                                            '<strong class="text-foreground font-semibold">$1</strong>'
                                        ),
                                    }}
                                />
                            );
                        })
                    )}
                </motion.article>
            </div>
        </div>
    );
}
