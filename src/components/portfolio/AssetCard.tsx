"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Holding } from "@/lib/mockData/portfolio";
import InvestmentMemo from "./InvestmentMemo";
import { HiChevronDown, HiBeaker } from "react-icons/hi2";

const riskColors: Record<string, string> = {
    Low: "bg-emerald-500/15 text-emerald-400",
    Moderate: "bg-navy-300/15 text-navy-300",
    High: "bg-gold-500/15 text-gold-400",
    Aggressive: "bg-crimson-500/15 text-crimson-400",
};

export default function AssetCard({ holding }: { holding: Holding }) {
    const [expanded, setExpanded] = useState(false);
    const isPositive = holding.roi >= 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass rounded-2xl overflow-hidden"
        >
            {/* Card Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-6 text-left hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-600 to-navy-700 flex items-center justify-center text-xs font-bold text-gold-400">
                            {holding.ticker.slice(0, 2)}
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground text-sm">
                                {holding.ticker}
                            </h4>
                            <p className="text-xs text-slate-500">{holding.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${riskColors[holding.riskProfile]
                                }`}
                        >
                            {holding.riskProfile}
                        </span>
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <HiChevronDown className="text-slate-500" size={18} />
                        </motion.div>
                    </div>
                </div>

                {/* Metrics Row — de-emphasized, thesis is the star */}
                <div className="grid grid-cols-3 gap-4">
                    <MetricCell
                        label="Price"
                        value={`$${holding.currentPrice.toFixed(2)}`}
                    />
                    <MetricCell
                        label="Paper ROI"
                        value={`${isPositive ? "+" : ""}${holding.roi.toFixed(1)}%`}
                        color={isPositive ? "text-emerald-400" : "text-crimson-400"}
                    />
                    <MetricCell
                        label="1D Return"
                        value={`${holding.ytd >= 0 ? "+" : ""}${holding.ytd.toFixed(2)}%`}
                        color={holding.ytd >= 0 ? "text-emerald-400" : "text-crimson-400"}
                    />
                </div>

                {/* Nudge to read thesis */}
                {!expanded && (
                    <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-600">
                        <HiBeaker size={12} />
                        <span>Click to read investment thesis</span>
                    </div>
                )}
            </button>

            {/* Expandable Investment Memo */}
            <InvestmentMemo holding={holding} expanded={expanded} />
        </motion.div>
    );
}

function MetricCell({
    label,
    value,
    color,
}: {
    label: string;
    value: string;
    color?: string;
}) {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-0.5">
                {label}
            </p>
            <p className={`text-sm font-semibold ${color || "text-slate-200"}`}>
                {value}
            </p>
        </div>
    );
}
