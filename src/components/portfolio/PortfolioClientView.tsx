"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients, clientPortfolios } from "@/lib/mockData/clientData";
import ClientSelector from "./ClientSelector";
import ClientProfileCard from "./ClientProfile";
import CRMDashboard from "./CRMDashboard";
import AssetCard from "./AssetCard";
import PortfolioAllocation from "./PortfolioAllocation";
import { HiInformationCircle, HiBeaker } from "react-icons/hi2";

type ViewTab = "overview" | "holdings" | "allocation" | "crm";

const tabs: { id: ViewTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "holdings", label: "Holdings" },
    { id: "allocation", label: "Allocation" },
    { id: "crm", label: "CRM" },
];

export default function PortfolioClientView() {
    const [activeClientId, setActiveClientId] = useState("martins");
    const [activeTab, setActiveTab] = useState<ViewTab>("overview");

    const client = clients.find((c) => c.id === activeClientId)!;
    const portfolio = clientPortfolios[activeClientId];
    const holdings = portfolio.holdings;

    const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
    const totalCost = holdings.reduce((s, h) => s + h.costBasis * h.shares, 0);
    const totalReturn = ((totalValue - totalCost) / totalCost) * 100;

    const allocationData = holdings.reduce((acc, h) => {
        const val = h.currentPrice * h.shares;
        acc[h.assetClass] = (acc[h.assetClass] || 0) + val;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.keys(allocationData).map((key) => ({
        name: key,
        value: allocationData[key],
    }));

    return (
        <div>
            {/* Client Selector */}
            <ClientSelector
                clients={clients}
                activeId={activeClientId}
                onSelect={(id) => {
                    setActiveClientId(id);
                    setActiveTab("overview");
                }}
            />

            {/* Sandbox Disclosure */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-light rounded-xl p-4 mb-8 flex items-start gap-3"
            >
                <HiInformationCircle className="text-navy-300 mt-0.5 shrink-0" size={20} />
                <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-foreground">This is a simulated advisory practice.</strong>{" "}
                    All client profiles, holdings, and statistics are fictional. Created to
                    demonstrate financial planning methodology and portfolio construction skills.
                </p>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 ${
                            activeTab === tab.id
                                ? "bg-gold-500/15 border-gold-500/40 text-gold-400"
                                : "border-slate-700 text-slate-400 hover:border-slate-500"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Client Profile */}
                        <ClientProfileCard client={client} />

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                            <SummaryCard label="Portfolio Value" value={`$${(totalValue / 1000).toFixed(0)}K`} accent="gold" />
                            <SummaryCard label="Total Return" value={`${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(1)}%`} accent="emerald" />
                            <SummaryCard label="Positions" value={String(holdings.length)} accent="blue" />
                            <SummaryCard label="Risk Profile" value={client.riskTolerance} accent="crimson" />
                        </div>

                        {/* Quick Allocation */}
                        <div className="glass rounded-2xl p-6 lg:p-8">
                            <div className="text-center mb-4">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <HiBeaker className="text-slate-500" size={14} />
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                                        Simulated Allocation
                                    </span>
                                </div>
                                <h3 className="text-lg font-display font-semibold text-slate-200">
                                    {client.familyName} — Portfolio Distribution
                                </h3>
                            </div>
                            <div className="w-full h-[300px]">
                                <PortfolioAllocation data={pieData} />
                            </div>

                            {/* Target vs Actual */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {portfolio.targetAllocation.map((a, i) => (
                                    <div key={i} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{a.asset}</p>
                                        <p className="text-sm">
                                            <span className="text-slate-400">Target: </span>
                                            <span className="text-slate-200 font-semibold">{a.target}%</span>
                                            <span className="text-slate-600 mx-1">|</span>
                                            <span className="text-slate-400">Actual: </span>
                                            <span className={`font-semibold ${Math.abs(a.actual - a.target) <= 3 ? "text-emerald-400" : "text-gold-400"}`}>
                                                {a.actual}%
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "holdings" && (
                    <motion.div
                        key="holdings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-sm text-slate-500 mb-6">
                            Click any card to read the investment thesis — the reasoning matters more
                            than the simulated return.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {holdings.map((holding) => (
                                <AssetCard key={holding.id} holding={holding} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === "allocation" && (
                    <motion.div
                        key="allocation"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="glass rounded-2xl p-6 lg:p-10">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-display font-semibold text-slate-200 mb-2">
                                    Full Allocation Breakdown
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {client.familyName} · {client.riskTolerance} Risk · {client.timeHorizon}
                                </p>
                            </div>
                            <div className="w-full h-[400px]">
                                <PortfolioAllocation data={pieData} />
                            </div>

                            {/* Holdings Table */}
                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-700/50">
                                            <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Ticker</th>
                                            <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Value</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Weight</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">ROI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holdings.map((h) => {
                                            const val = h.currentPrice * h.shares;
                                            const weight = (val / totalValue) * 100;
                                            return (
                                                <tr key={h.id} className="border-b border-slate-800/50 hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-3 px-4 font-bold text-gold-400">{h.ticker}</td>
                                                    <td className="py-3 px-4 text-slate-300">{h.name}</td>
                                                    <td className="py-3 px-4 text-right text-slate-200">${(val / 1000).toFixed(1)}K</td>
                                                    <td className="py-3 px-4 text-right text-slate-400">{weight.toFixed(1)}%</td>
                                                    <td className={`py-3 px-4 text-right font-semibold ${h.roi >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                                        {h.roi >= 0 ? "+" : ""}{h.roi.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === "crm" && (
                    <motion.div
                        key="crm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CRMDashboard client={client} />
                    </motion.div>
                )}
            </AnimatePresence>
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
    accent: "gold" | "emerald" | "blue" | "crimson";
}) {
    const accentColor = {
        gold: "text-gold-400",
        emerald: "text-emerald-400",
        blue: "text-navy-300",
        crimson: "text-crimson-400",
    }[accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-5"
        >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                {label}
            </p>
            <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
        </motion.div>
    );
}
