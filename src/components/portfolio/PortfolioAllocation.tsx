"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AssetDistribution {
    name: string;
    value: number;
}

export default function PortfolioAllocation({ data }: { data: AssetDistribution[] }) {
    // Custom color palette for the chart
    const COLORS = ["#1e293b", "#334155", "#475569", "#64748b"];

    // Assign colors using the site palette
    const getPaletteColor = (name: string) => {
        if (name === "Equities") return "#c9a84c"; // gold-400
        if (name === "Alternatives") return "#34d399"; // emerald-400
        if (name === "Commercial RE") return "#6366f1"; // indigo-500
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    };

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-navy-900/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-semibold">
                        {payload[0].name}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                        {`$${(payload[0].value / 1000).toFixed(0)}K`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={2}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getPaletteColor(entry.name)}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                            <span className="text-xs text-slate-400 ml-1">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
