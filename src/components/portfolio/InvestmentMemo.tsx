"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Holding } from "@/lib/mockData/portfolio";
import { HiDocumentText, HiCalendar, HiArrowTrendingUp, HiDocumentArrowDown } from "react-icons/hi2";
import { PortableText } from "@portabletext/react";

export default function InvestmentMemo({
    holding,
    expanded,
}: {
    holding: Holding;
    expanded: boolean;
}) {
    return (
        <AnimatePresence>
            {expanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        {/* Memo Header */}
                        <div className="flex items-center gap-2 mb-3">
                            <HiDocumentText className="text-gold-400" size={16} />
                            <h5 className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                                Investment Thesis
                            </h5>
                        </div>

                        {/* Thesis Text */}
                        <div className="text-sm text-slate-300 leading-relaxed mb-5 prose-custom prose-sm max-w-none">
                            {Array.isArray(holding.investmentThesis) ? (
                                <PortableText value={holding.investmentThesis} />
                            ) : (
                                <p>{holding.investmentThesis}</p>
                            )}
                        </div>

                        {/* PDF Attachment */}
                        {holding.attachedArticle && (
                            <div className="mb-6">
                                <a
                                    href={holding.attachedArticle}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 transition-all duration-300"
                                >
                                    <HiDocumentArrowDown size={14} />
                                    Read Full Research Memo (PDF)
                                </a>
                            </div>
                        )}

                        {/* Meta Row */}
                        <div className="flex flex-wrap gap-4">
                            <MetaItem
                                icon={<HiCalendar size={14} />}
                                label="Entry Date"
                                value={new Date(holding.entryDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            />
                            <MetaItem
                                icon={<HiArrowTrendingUp size={14} />}
                                label="Cost Basis"
                                value={`$${holding.costBasis.toFixed(2)}`}
                            />
                            {holding.targetPrice && (
                                <MetaItem
                                    icon={<HiArrowTrendingUp size={14} />}
                                    label="Target Price"
                                    value={`$${holding.targetPrice.toFixed(2)}`}
                                />
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MetaItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-slate-600">{icon}</span>
            <span>{label}:</span>
            <span className="text-slate-300 font-medium">{value}</span>
        </div>
    );
}
