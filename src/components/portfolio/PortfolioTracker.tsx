"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    type AssetClass,
    type Holding,
} from "@/lib/mockData/portfolio";
import AssetCard from "./AssetCard";
import PortfolioAllocation from "./PortfolioAllocation";
import { HiBeaker, HiInformationCircle } from "react-icons/hi2";

const filters: (AssetClass | "All")[] = [
    "All",
    "Equities",
    "Alternatives",
    "Commercial RE",
];

export default function PortfolioTracker({ initialHoldings }: { initialHoldings: Holding[] }) {
    const [activeFilter, setActiveFilter] = useState<AssetClass | "All">("All");

    const filtered: Holding[] =
        activeFilter === "All"
            ? initialHoldings
            : initialHoldings.filter((h) => h.assetClass === activeFilter);

    const totalValue = initialHoldings.reduce(
        (sum, h) => sum + h.currentPrice * h.shares,
        0
    );
    const totalCost = initialHoldings.reduce(
        (sum, h) => sum + h.costBasis * h.shares,
        0
    );
    const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

    // Calculate asset allocation data for the pie chart
    const allocationMap = initialHoldings.reduce((acc, h) => {
        const val = h.currentPrice * h.shares;
        acc[h.assetClass] = (acc[h.assetClass] || 0) + val;
        return acc;
    }, {} as Record<string, number>);

    const allocationData = Object.keys(allocationMap).map((key) => ({
        name: key,
        value: allocationMap[key],
    }));

    return (
        <div>
            {/* Sandbox Disclosure Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-light rounded-xl p-4 mb-8 flex items-start gap-3"
            >
                <HiInformationCircle className="text-navy-300 mt-0.5 shrink-0" size={20} />
                <div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        <strong className="text-foreground">This is a paper trading sandbox.</strong>{" "}
                        All positions are simulated for educational purposes. No real capital
                        is at risk. The goal is to practice building and defending investment
                        theses, not to claim returns.
                    </p>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <SummaryCard
                    label="Simulated Value"
                    value={`$${(totalValue / 1000).toFixed(0)}K`}
                    accent="gold"
                />
                <SummaryCard
                    label="Paper Return"
                    value={`+${totalReturn.toFixed(1)}%`}
                    accent="emerald"
                />
                <SummaryCard
                    label="Positions Tracked"
                    value={String(initialHoldings.length)}
                    accent="blue"
                />
            </div>

            {/* Charts Section */}
            <div className="mb-10">
                {/* Allocation Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-2xl p-6 lg:p-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
                >
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <HiBeaker className="text-slate-500" size={14} />
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                Simulated Allocation
                            </span>
                        </div>
                        <h3 className="text-xl font-display font-semibold text-slate-200">
                            Current Portfolio Distribution
                        </h3>
                    </div>
                    <div className="w-full h-[350px]">
                        <PortfolioAllocation data={allocationData} />
                    </div>
                </motion.div>
            </div>

            {/* Filter Toggles */}
            <div className="flex flex-wrap gap-2 mb-8">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${activeFilter === f
                            ? "bg-gold-500/15 border-gold-500/40 text-gold-400"
                            : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Section intro — emphasize reasoning */}
            <p className="text-sm text-slate-500 mb-6">
                Click any card to read my investment thesis — the reasoning matters more
                than the simulated return.
            </p>

            {/* Asset Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((holding) => (
                        <AssetCard key={holding.id} holding={holding} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

function SummaryCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent: "gold" | "emerald" | "blue";
}) {
    const accentColor = {
        gold: "text-gold-400",
        emerald: "text-emerald-400",
        blue: "text-navy-300",
    }[accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6"
        >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                {label}
            </p>
            <p className={`text-3xl font-bold ${accentColor}`}>{value}</p>
        </motion.div>
    );
}
