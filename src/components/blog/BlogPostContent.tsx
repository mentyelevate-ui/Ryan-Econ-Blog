"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import StickyVideoPlayer from "@/components/blog/StickyVideoPlayer";
import { PortableText } from "@portabletext/react";
import { parseArticleContent, type ContentBlock } from "@/lib/articleParser";

// ====================================================================
// WSJ-GRADE ARTICLE RENDERER
// Each content block type gets a dedicated rendering component.
// ====================================================================

function HeadingBlock({ block }: { block: ContentBlock }) {
    return <h2 className="wsj-section-heading">{block.content}</h2>;
}

function SubheadingBlock({ block }: { block: ContentBlock }) {
    return <h3 className="wsj-subheading">{block.content}</h3>;
}

function LedeBlock({ block }: { block: ContentBlock }) {
    return <p className="wsj-lede wsj-drop-cap">{block.content}</p>;
}

function ParagraphBlock({ block }: { block: ContentBlock }) {
    return <p className="wsj-paragraph">{block.content}</p>;
}

function PullQuoteBlock({ block }: { block: ContentBlock }) {
    return <blockquote className="wsj-pull-quote">{block.content}</blockquote>;
}

function EquationBlock({ block }: { block: ContentBlock }) {
    return <div className="wsj-equation">{block.content}</div>;
}

function CitationBlock({ block }: { block: ContentBlock }) {
    return <p className="wsj-citation">{block.content}</p>;
}

function DividerBlock() {
    return (
        <div className="wsj-divider">
            <span className="wsj-divider-ornament">◆</span>
        </div>
    );
}

function ListBlock({ block }: { block: ContentBlock }) {
    return (
        <ul className="wsj-list">
            {(block.items || []).map((item, idx) => (
                <li key={idx}>{item}</li>
            ))}
        </ul>
    );
}

function TableBlock({ block }: { block: ContentBlock }) {
    return (
        <div className="wsj-table-container">
            <table className="wsj-table">
                {block.headers && block.headers.length > 0 && (
                    <thead>
                        <tr>
                            {block.headers.map((h, idx) => (
                                <th key={idx}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                )}
                {block.rows && block.rows.length > 0 && (
                    <tbody>
                        {block.rows.map((row, idx) => (
                            <tr key={idx}>
                                {row.map((cell, cidx) => (
                                    <td key={cidx}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
}

// --- Block Renderer Dispatch ---
function ArticleBlock({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case "heading":
            return <HeadingBlock block={block} />;
        case "subheading":
            return <SubheadingBlock block={block} />;
        case "lede":
            return <LedeBlock block={block} />;
        case "paragraph":
            return <ParagraphBlock block={block} />;
        case "pull-quote":
            return <PullQuoteBlock block={block} />;
        case "equation":
            return <EquationBlock block={block} />;
        case "citation":
            return <CitationBlock block={block} />;
        case "divider":
            return <DividerBlock />;
        case "list":
            return <ListBlock block={block} />;
        case "table":
            return <TableBlock block={block} />;
        default:
            return <p className="wsj-paragraph">{block.content}</p>;
    }
}

// ====================================================================
// MAIN COMPONENT
// ====================================================================

export default function BlogPostContent({ post }: { post: any }) {
    const contentSections = typeof post.content === "string" ? post.content.split("\n\n") : [];
    const parsedBlocks = post.nativeContent ? parseArticleContent(post.nativeContent) : [];

    return (
        <div className="min-h-screen pb-20 pt-20 sm:pt-28">
            {/* Hero Section */}
            <div className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden flex items-end pb-10 sm:pb-16">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={post.imageUrl || "/uploads/default_economic_cover.png"} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-950/60" />
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

                {/* Author's Insight */}
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
                                <span className="text-[10px] text-slate-500 font-medium italic">Author&apos;s Note</span>
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

                {/* Video */}
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

                {/* ========== ARTICLE CONTENT ========== */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Priority 1: Parsed Native Content (WSJ-style) */}
                    {parsedBlocks.length > 0 ? (
                        <div className="wsj-article">
                            {parsedBlocks.map((block, idx) => (
                                <ArticleBlock key={idx} block={block} />
                            ))}

                            {/* PDF Download Card (if available alongside native content) */}
                            {post.pdfUrl && (
                                <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-crimson-500/10 flex items-center justify-center text-crimson-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-200" style={{ fontFamily: 'var(--font-sans)' }}>Original Research Paper (PDF)</p>
                                            <p className="text-xs text-slate-500" style={{ fontFamily: 'var(--font-sans)' }}>View source document for charts & citations</p>
                                        </div>
                                    </div>
                                    <a 
                                        href={post.pdfUrl} 
                                        download 
                                        className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-all"
                                        style={{ fontFamily: 'var(--font-sans)' }}
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            )}

                            {/* Byline */}
                            <div className="wsj-byline">
                                By Ryan Renfro · {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </div>
                        </div>
                    ) : post.pdfUrl ? (
                        /* Fallback: PDF Viewer */
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
                                    className="w-full h-full border-none"
                                    title={post.title}
                                />
                            </div>
                        </div>
                    ) : null}

                    {/* Portable Text (Sanity Rich Text) */}
                    {post.body && (
                        <div className="wsj-article mt-12">
                            <PortableText value={post.body} />
                        </div>
                    )}

                    {/* Legacy Markdown Fallback */}
                    {!parsedBlocks.length && !post.pdfUrl && !post.body && contentSections.length > 0 && (
                        <div className="wsj-article">
                            {contentSections.map((section: string, i: number) => {
                                const trimmed = section.trim();
                                if (!trimmed) return null;

                                if (trimmed.startsWith("## ")) {
                                    return <h2 key={i} className="wsj-section-heading">{trimmed.replace("## ", "")}</h2>;
                                }
                                if (trimmed.startsWith("### ")) {
                                    return <h3 key={i} className="wsj-subheading">{trimmed.replace("### ", "")}</h3>;
                                }
                                if (i === 0) {
                                    return <p key={i} className="wsj-lede wsj-drop-cap">{trimmed}</p>;
                                }
                                return <p key={i} className="wsj-paragraph">{trimmed}</p>;
                            })}
                        </div>
                    )}
                </motion.article>
            </div>
        </div>
    );
}
