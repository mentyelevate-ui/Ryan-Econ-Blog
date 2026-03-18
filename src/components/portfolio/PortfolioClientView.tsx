"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clients, clientPortfolios } from "@/lib/mockData/clientData";
import type { Holding } from "@/lib/mockData/portfolio";
import ClientSelector from "./ClientSelector";
import ClientProfileCard from "./ClientProfile";
import AssetCard from "./AssetCard";
import PortfolioAllocation from "./PortfolioAllocation";
import { HiInformationCircle, HiBeaker, HiArrowTrendingUp, HiArrowTrendingDown, HiArrowPath } from "react-icons/hi2";

type ViewTab = "overview" | "holdings" | "allocation" | "performance";

const tabs: { id: ViewTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "holdings", label: "Holdings" },
    { id: "allocation", label: "Allocation" },
    { id: "performance", label: "Performance" },
];

interface LivePriceData {
    price: number;
    change: number;
    changePercent: number;
    previousClose: number;
    dayHigh: number;
    dayLow: number;
    volume: number;
}

export default function PortfolioClientView() {
    const [activeClientId, setActiveClientId] = useState("martins");
    const [activeTab, setActiveTab] = useState<ViewTab>("overview");
    const [livePrices, setLivePrices] = useState<Record<string, LivePriceData>>({});
    const [pricesLoading, setPricesLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const client = clients.find((c) => c.id === activeClientId)!;
    const portfolio = clientPortfolios[activeClientId];
    const holdings = portfolio.holdings;

    // Merge live prices into holdings
    const liveHoldings: Holding[] = holdings.map(h => {
        const live = livePrices[h.ticker];
        if (live && live.price > 0) {
            const newRoi = ((live.price - h.costBasis) / h.costBasis) * 100;
            return {
                ...h,
                currentPrice: live.price,
                roi: parseFloat(newRoi.toFixed(2)),
                ytd: parseFloat(live.changePercent.toFixed(2)),
            };
        }
        return h;
    });

    const totalValue = liveHoldings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
    const totalCost = liveHoldings.reduce((s, h) => s + h.costBasis * h.shares, 0);
    const totalReturn = ((totalValue - totalCost) / totalCost) * 100;
    const totalGainLoss = totalValue - totalCost;

    const allocationData = liveHoldings.reduce((acc, h) => {
        const val = h.currentPrice * h.shares;
        acc[h.assetClass] = (acc[h.assetClass] || 0) + val;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.keys(allocationData).map((key) => ({
        name: key,
        value: allocationData[key],
    }));

    // Fetch live prices
    const fetchPrices = useCallback(async () => {
        const tickers = holdings.map(h => h.ticker).join(",");
        setPricesLoading(true);
        try {
            const res = await fetch(`/api/stock-prices?tickers=${tickers}`);
            if (res.ok) {
                const data = await res.json();
                setLivePrices(data);
                setLastUpdated(new Date());
            }
        } catch (err) {
            console.error("Failed to fetch live prices:", err);
        } finally {
            setPricesLoading(false);
        }
    }, [holdings]);

    // Fetch on mount and when client changes
    useEffect(() => {
        fetchPrices();
        // Refresh every 60 seconds during market hours
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, [fetchPrices]);

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
                <div className="flex-1">
                    <p className="text-sm text-slate-300 leading-relaxed">
                        <strong className="text-foreground">This is a simulated advisory practice.</strong>{" "}
                        All client profiles, holdings, and statistics are fictional. Created to
                        demonstrate financial planning methodology and portfolio construction skills.
                    </p>
                </div>
                {lastUpdated && (
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            onClick={fetchPrices}
                            disabled={pricesLoading}
                            className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-gold-400 transition-colors"
                        >
                            <HiArrowPath className={`${pricesLoading ? "animate-spin" : ""}`} size={12} />
                            <span>
                                {pricesLoading ? "Updating..." : `Live · ${lastUpdated.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                            </span>
                        </button>
                    </div>
                )}
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
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <SummaryCard label="Portfolio Value" value={`$${(totalValue / 1000).toFixed(1)}K`} accent="gold" />
                            <SummaryCard
                                label="Total Return"
                                value={`${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}%`}
                                accent={totalReturn >= 0 ? "emerald" : "crimson"}
                            />
                            <SummaryCard
                                label="Gain / Loss"
                                value={`${totalGainLoss >= 0 ? "+" : "-"}$${Math.abs(totalGainLoss).toFixed(0)}`}
                                accent={totalGainLoss >= 0 ? "emerald" : "crimson"}
                            />
                            <SummaryCard label="Positions" value={String(liveHoldings.length)} accent="blue" />
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
                            Click any card to read the investment thesis.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {liveHoldings.map((holding) => (
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
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Price</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Value</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Weight</th>
                                            <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Return</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {liveHoldings.map((h) => {
                                            const val = h.currentPrice * h.shares;
                                            const weight = (val / totalValue) * 100;
                                            return (
                                                <tr key={h.id} className="border-b border-slate-800/50 hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-3 px-4 font-bold text-gold-400">{h.ticker}</td>
                                                    <td className="py-3 px-4 text-slate-300">{h.name}</td>
                                                    <td className="py-3 px-4 text-right text-slate-200 tabular-nums">${h.currentPrice.toFixed(2)}</td>
                                                    <td className="py-3 px-4 text-right text-slate-200 tabular-nums">${(val / 1000).toFixed(1)}K</td>
                                                    <td className="py-3 px-4 text-right text-slate-400 tabular-nums">{weight.toFixed(1)}%</td>
                                                    <td className={`py-3 px-4 text-right font-semibold tabular-nums ${h.roi >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                                        {h.roi >= 0 ? "+" : ""}{h.roi.toFixed(2)}%
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

                {activeTab === "performance" && (
                    <motion.div
                        key="performance"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PerformanceView holdings={liveHoldings} totalValue={totalValue} totalCost={totalCost} client={client} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════
// PERFORMANCE VIEW — replaces CRM
// ══════════════════════════════════════════════════════════════════

function PerformanceView({
    holdings,
    totalValue,
    totalCost,
    client,
}: {
    holdings: Holding[];
    totalValue: number;
    totalCost: number;
    client: typeof clients[0];
}) {
    const totalReturn = ((totalValue - totalCost) / totalCost) * 100;
    const totalGainLoss = totalValue - totalCost;

    // Sector stats
    const sectorStats = holdings.reduce((acc, h) => {
        if (!acc[h.assetClass]) {
            acc[h.assetClass] = { value: 0, cost: 0, count: 0 };
        }
        acc[h.assetClass].value += h.currentPrice * h.shares;
        acc[h.assetClass].cost += h.costBasis * h.shares;
        acc[h.assetClass].count += 1;
        return acc;
    }, {} as Record<string, { value: number; cost: number; count: number }>);

    // Top & bottom performers
    const sorted = [...holdings].sort((a, b) => b.roi - a.roi);
    const topPerformers = sorted.slice(0, 5);
    const bottomPerformers = sorted.slice(-5).reverse();

    // Risk breakdown
    const riskCounts = holdings.reduce((acc, h) => {
        acc[h.riskProfile] = (acc[h.riskProfile] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Weighted average cost basis
    const avgGain = holdings.reduce((sum, h) => {
        const gain = (h.currentPrice - h.costBasis) * h.shares;
        return sum + gain;
    }, 0);

    // Positions in the green vs red
    const greenCount = holdings.filter(h => h.roi >= 0).length;
    const redCount = holdings.filter(h => h.roi < 0).length;

    return (
        <div className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Value"
                    value={`$${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                    accent="gold"
                />
                <MetricCard
                    label="Total Return"
                    value={`${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(2)}%`}
                    accent={totalReturn >= 0 ? "emerald" : "crimson"}
                />
                <MetricCard
                    label="Gain / Loss"
                    value={`${totalGainLoss >= 0 ? "+" : "-"}$${Math.abs(totalGainLoss).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                    accent={totalGainLoss >= 0 ? "emerald" : "crimson"}
                />
                <MetricCard
                    label="Cost Basis"
                    value={`$${totalCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                    accent="blue"
                />
            </div>

            {/* Win/Loss + Risk Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Position Status</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-emerald-400 font-semibold flex items-center gap-1">
                                    <HiArrowTrendingUp size={14} /> {greenCount} Gaining
                                </span>
                                <span className="text-sm text-crimson-400 font-semibold flex items-center gap-1">
                                    {redCount} Losing <HiArrowTrendingDown size={14} />
                                </span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-navy-800 overflow-hidden flex">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full"
                                    style={{ width: `${(greenCount / holdings.length) * 100}%` }}
                                />
                                <div
                                    className="h-full bg-gradient-to-r from-crimson-500 to-crimson-400 rounded-r-full"
                                    style={{ width: `${(redCount / holdings.length) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-600 mt-2">
                                {greenCount} of {holdings.length} positions in the green ({((greenCount / holdings.length) * 100).toFixed(0)}%)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Risk Profile Mix</h4>
                    <div className="space-y-2">
                        {Object.entries(riskCounts).sort(([,a], [,b]) => b - a).map(([risk, count]) => {
                            const riskColors: Record<string, string> = {
                                Low: "bg-emerald-400", Moderate: "bg-sky-400",
                                High: "bg-gold-400", Aggressive: "bg-crimson-400",
                            };
                            return (
                                <div key={risk} className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-20">{risk}</span>
                                    <div className="flex-1 h-2 rounded-full bg-navy-800 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${riskColors[risk] || "bg-slate-400"}`}
                                            style={{ width: `${(count / holdings.length) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500 w-6 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Sector Performance */}
            <div className="glass rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Sector Performance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(sectorStats).map(([sector, stats]) => {
                        const sectorReturn = ((stats.value - stats.cost) / stats.cost) * 100;
                        const sectorGain = stats.value - stats.cost;
                        const weight = (stats.value / totalValue) * 100;
                        return (
                            <div key={sector} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-slate-200">{sector}</span>
                                    <span className="text-[10px] text-slate-500">{stats.count} positions</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-600 mb-0.5">Value</p>
                                        <p className="text-sm font-bold text-slate-200">${(stats.value / 1000).toFixed(1)}K</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-600 mb-0.5">Weight</p>
                                        <p className="text-sm font-bold text-slate-200">{weight.toFixed(1)}%</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-600 mb-0.5">Return</p>
                                        <p className={`text-sm font-bold ${sectorReturn >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                            {sectorReturn >= 0 ? "+" : ""}{sectorReturn.toFixed(2)}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase text-slate-600 mb-0.5">P&L</p>
                                        <p className={`text-sm font-bold ${sectorGain >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                            {sectorGain >= 0 ? "+" : "-"}${Math.abs(sectorGain).toFixed(0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top & Bottom Performers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400/70 mb-4 flex items-center gap-2">
                        <HiArrowTrendingUp size={14} /> Top Performers
                    </h4>
                    <div className="space-y-2">
                        {topPerformers.map((h, i) => (
                            <div key={h.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-600 w-4">{i + 1}</span>
                                    <div>
                                        <p className="text-sm font-bold text-gold-400">{h.ticker}</p>
                                        <p className="text-[10px] text-slate-500">{h.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${h.roi >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                        {h.roi >= 0 ? "+" : ""}{h.roi.toFixed(2)}%
                                    </p>
                                    <p className="text-[10px] text-slate-500 tabular-nums">${h.currentPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass rounded-2xl p-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-crimson-400/70 mb-4 flex items-center gap-2">
                        <HiArrowTrendingDown size={14} /> Bottom Performers
                    </h4>
                    <div className="space-y-2">
                        {bottomPerformers.map((h, i) => (
                            <div key={h.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-600 w-4">{i + 1}</span>
                                    <div>
                                        <p className="text-sm font-bold text-gold-400">{h.ticker}</p>
                                        <p className="text-[10px] text-slate-500">{h.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-bold ${h.roi >= 0 ? "text-emerald-400" : "text-crimson-400"}`}>
                                        {h.roi >= 0 ? "+" : ""}{h.roi.toFixed(2)}%
                                    </p>
                                    <p className="text-[10px] text-slate-500 tabular-nums">${h.currentPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Goals Progress */}
            <div className="glass rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Financial Goals Progress</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {client.goals.map((goal, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-slate-200">{goal.label}</span>
                                <span className="text-xs text-gold-400 font-bold">{goal.progress}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-navy-800 overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${goal.progress}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500">{goal.target}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════

function MetricCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent: "gold" | "emerald" | "crimson" | "blue";
}) {
    const accentColor = {
        gold: "text-gold-400",
        emerald: "text-emerald-400",
        crimson: "text-crimson-400",
        blue: "text-navy-300",
    }[accent];

    return (
        <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">{label}</p>
            <p className={`text-2xl font-bold tabular-nums ${accentColor}`}>{value}</p>
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
            <p className={`text-2xl font-bold tabular-nums ${accentColor}`}>{value}</p>
        </motion.div>
    );
}
