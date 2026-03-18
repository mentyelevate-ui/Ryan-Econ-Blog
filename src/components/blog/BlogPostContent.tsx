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
        <div className="min-h-screen pb-20 pt-20 sm:pt-28">
            {/* Hero Section */}
            <div className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden flex items-end pb-10 sm:pb-16">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={post.imageUrl || "/uploads/default_economic_cover.png"} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Strong Global Dark Tint */}
                    <div className="absolute inset-0 bg-navy-950/60" />
                    {/* Multi-stage Scrim for maximum legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10 w-full mb-4 sm:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass p-8 sm:p-12 rounded-[2rem] border border-white/10 backdrop-blur-xl bg-navy-950/20 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative internal glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                                    {post.category}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
                                {post.title}
                            </h1>
                            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl font-light">
                                {post.excerpt}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                >
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
                    >
                        <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Back to Research
                    </Link>
                </motion.div>

                {/* Author's Insight (Personal/Informal) */}
                {post.insight && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-16 relative"
                    >
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-sky-600 rounded-full" />
                        <div className="pl-6">
                            <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em] mb-3">Informal Insight</h4>
                            <p className="text-slate-300 text-xl italic font-serif leading-relaxed">
                                &ldquo;{post.insight}&rdquo;
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-6 h-px bg-slate-700" />
                                <span className="text-[10px] text-slate-500 font-medium italic">Author's Note</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Research Disclaimer */}
                {post.disclaimer && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-16 p-8 rounded-2xl bg-gold-500/5 border border-gold-500/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                            </svg>
                        </div>
                        <h4 className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-3">Research Scope & Intent</h4>
                        <p className="text-slate-200 text-lg leading-relaxed font-medium relative z-10">
                            &ldquo;{post.disclaimer}&rdquo;
                        </p>
                    </motion.div>
                )}

                {/* Video (if present) */}
                {post.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-16"
                    >
                        <StickyVideoPlayer videoUrl={post.videoUrl} />
                    </motion.div>
                )}

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="prose-custom prose-lg max-w-none text-slate-300"
                >
                    {/* Native Content (Clean Rendering) */}
                    {post.nativeContent ? (
                        <div className="mb-16 space-y-8">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="w-8 h-[1px] bg-gold-500/30" />
                                <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">Full Research Piece</span>
                                <span className="flex-1 h-[1px] bg-gold-500/30" />
                            </div>
                            <div className="native-research-content text-slate-200 leading-[1.8] font-light space-y-6">
                                {post.nativeContent.split('\n\n').map((para: string, idx: number) => (
                                    <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:text-gold-400 first-letter:float-left first-letter:mr-2 first-letter:mt-1">{para}</p>
                                ))}
                            </div>
                            
                            {post.pdfUrl && (
                                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-crimson-500/10 flex items-center justify-center text-crimson-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200">Original Research Paper (PDF)</p>
                                            <p className="text-xs text-slate-500">View source document for charts & citations</p>
                                        </div>
                                    </div>
                                    <a 
                                        href={post.pdfUrl} 
                                        download 
                                        className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-all"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Fallback to PDF Viewer if no native content */
                        post.pdfUrl && (
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
                                    <div className="aspect-[4/5] sm:aspect-video w-full glass rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                                    <iframe 
                                        src={`${post.pdfUrl}#toolbar=0`} 
                                        className="w-full h-full border-none scale-100 sm:scale-100"
                                        title={post.title}
                                    />
                                </div>
                            </div>
                        )
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
