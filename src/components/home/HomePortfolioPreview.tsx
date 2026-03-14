"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { holdings } from "@/lib/mockData/portfolio";
import { HiBeaker } from "react-icons/hi2";

export default function HomePortfolioPreview() {
    const topHoldings = holdings.slice(0, 4);

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
                            <HiBeaker className="text-gold-400" size={14} />
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                                Paper Trading Sandbox
                            </p>
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold">
                            Mock Portfolio
                        </h2>
                    </div>
                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors"
                    >
                        View All Positions
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topHoldings.map((h, i) => (
                        <motion.div
                            key={h.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass rounded-2xl p-5 hover:border-gold-500/20 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-600 to-navy-700 flex items-center justify-center text-xs font-bold text-gold-400">
                                    {h.ticker.slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{h.ticker}</p>
                                    <p className="text-xs text-slate-500">{h.assetClass}</p>
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-lg font-bold">
                                    ${h.currentPrice.toFixed(2)}
                                </p>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${h.roi >= 0
                                            ? "bg-emerald-500/15 text-emerald-400"
                                            : "bg-crimson-500/15 text-crimson-400"
                                        }`}
                                >
                                    {h.roi >= 0 ? "+" : ""}
                                    {h.roi.toFixed(1)}%
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
