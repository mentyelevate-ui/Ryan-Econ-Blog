"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiUserGroup } from "react-icons/hi2";
import { clients, clientPortfolios } from "@/lib/mockData/clientData";

import { useState, useEffect } from "react";

const riskBadge: Record<string, string> = {
    Conservative: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Moderate: "bg-gold-500/10 text-gold-400 border-gold-500/20",
    Aggressive: "bg-crimson-500/10 text-crimson-400 border-crimson-500/20",
};

export default function HomePortfolioPreview() {
    const [livePrices, setLivePrices] = useState<Record<string, { price: number }>>({});

    useEffect(() => {
        async function fetchAllPrices() {
            const allTickers = Array.from(new Set(
                clients.flatMap(c => clientPortfolios[c.id].holdings.map(h => h.ticker))
            )).join(",");
            
            try {
                const res = await fetch(`/api/stock-prices?tickers=${allTickers}`);
                if (res.ok) {
                    const data = await res.json();
                    setLivePrices(data);
                }
            } catch (err) {
                console.error("HomePortfolioPreview: Failed to fetch prices", err);
            }
        }
        fetchAllPrices();
    }, []);

    return (
        <section className="section-padding">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <HiUserGroup className="text-gold-400" size={14} />
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                                Client Portfolios
                            </p>
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Mock Advisory Practice
                        </h2>
                        <p className="text-sm text-slate-400 mt-2 max-w-lg">
                            Two simulated family clients with distinct risk profiles, goals, and portfolio strategies.
                        </p>
                    </div>
                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
                    >
                        View Full Portfolios
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clients.map((client, i) => {
                        const portfolio = clientPortfolios[client.id];
                        const holdings = portfolio.holdings;
                        
                        // Use live prices if available, otherwise fallback to cost basis (0% return)
                        const totalValue = holdings.reduce((s, h) => {
                            const price = livePrices[h.ticker]?.price || h.costBasis;
                            return s + price * h.shares;
                        }, 0);
                        
                        const totalCost = holdings.reduce((s, h) => s + h.costBasis * h.shares, 0);
                        const totalReturn = totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;

                        return (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                <Link
                                    href="/portfolio"
                                    className="group block glass rounded-2xl p-6 hover:border-gold-500/20 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors">
                                                {client.familyName}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                {client.members.map((m, j) => (
                                                    <span key={j}>
                                                        {m.name.split(" ")[0]}, {m.age}
                                                        {j < client.members.length - 1 && " &"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${riskBadge[client.riskTolerance]}`}>
                                            {client.riskTolerance}
                                        </span>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Value</p>
                                            <p className="text-lg font-bold text-gold-400">${(totalValue / 1000).toFixed(0)}K</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Return</p>
                                            <p className={`text-lg font-bold ${totalReturn >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                                {totalReturn >= 0 ? "+" : ""}{totalReturn.toFixed(1)}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">Positions</p>
                                            <p className="text-lg font-bold text-slate-200">{holdings.length}</p>
                                        </div>
                                    </div>

                                    {/* Goals Preview */}
                                    <div className="pt-4 border-t border-white/5">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-2">Goals</p>
                                        <div className="flex flex-wrap gap-2">
                                            {client.goals.slice(0, 3).map((goal, g) => (
                                                <span key={g} className="text-[10px] text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
                                                    {goal.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Horizon */}
                                    <p className="text-[10px] text-slate-600 mt-3">
                                        {client.timeHorizon} horizon · {client.strategy.split("—")[0].trim()}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
