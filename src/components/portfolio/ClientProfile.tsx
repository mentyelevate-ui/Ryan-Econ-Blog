"use client";

import { motion } from "framer-motion";
import type { ClientProfile } from "@/lib/mockData/clientData";

export default function ClientProfileCard({ client }: { client: ClientProfile }) {
    const riskColorMap = {
        Conservative: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        Moderate: "text-gold-400 bg-gold-500/10 border-gold-500/20",
        Aggressive: "text-crimson-400 bg-crimson-500/10 border-crimson-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 lg:p-8 mb-8"
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left — Family Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center text-gold-400 font-display font-bold text-lg">
                            {client.familyName.charAt(4)}
                        </div>
                        <div>
                            <h2 className="font-display text-xl font-bold text-white">{client.familyName}</h2>
                            <p className="text-xs text-slate-400">
                                {client.members.map(m => `${m.name} (${m.role})`).join(" · ")}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${riskColorMap[client.riskTolerance]}`}>
                            {client.riskTolerance}
                        </span>
                        <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {client.timeHorizon} Horizon
                        </span>
                        <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            ${(client.combinedIncome / 1000).toFixed(0)}K Income
                        </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {client.background}
                    </p>

                    {/* Strategy */}
                    <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/10">
                        <h4 className="text-[10px] font-bold text-gold-400 uppercase tracking-widest mb-2">Investment Strategy</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{client.strategy}</p>
                    </div>
                </div>

                {/* Right — Goals */}
                <div className="w-full lg:w-80 space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Financial Goals</h4>
                    {client.goals.map((goal, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-slate-200">{goal.label}</span>
                                <span className="text-[10px] text-slate-500">{goal.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-navy-800 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${goal.progress}%` }}
                                    transition={{ duration: 1, delay: i * 0.15 }}
                                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1">{goal.target}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
