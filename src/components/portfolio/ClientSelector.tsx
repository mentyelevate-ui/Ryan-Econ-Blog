"use client";

import { motion } from "framer-motion";
import type { ClientProfile } from "@/lib/mockData/clientData";

const riskColors = {
    Conservative: "from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-400",
    Moderate: "from-gold-500/20 to-gold-600/10 border-gold-500/30 text-gold-400",
    Aggressive: "from-crimson-500/20 to-crimson-600/10 border-crimson-500/30 text-crimson-400",
};

export default function ClientSelector({
    clients,
    activeId,
    onSelect,
}: {
    clients: ClientProfile[];
    activeId: string;
    onSelect: (id: string) => void;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {clients.map((client) => {
                const isActive = client.id === activeId;
                const risk = riskColors[client.riskTolerance];

                return (
                    <motion.button
                        key={client.id}
                        onClick={() => onSelect(client.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                            isActive
                                ? "border-gold-500/50 bg-gradient-to-br from-gold-500/10 to-transparent shadow-[0_0_30px_rgba(201,168,76,0.1)]"
                                : "border-slate-700/50 bg-white/[0.02] hover:border-slate-600"
                        }`}
                    >
                        {/* Active indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="activeClient"
                                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(201,168,76,0.6)]"
                            />
                        )}

                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-display text-lg font-bold text-white mb-1">
                                    {client.familyName}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    {client.members.map((m, i) => (
                                        <span key={i}>
                                            {m.name.split(" ")[0]}, {m.age}
                                            {i < client.members.length - 1 && " &"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r border ${risk}`}>
                                {client.riskTolerance} Risk
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                                {client.timeHorizon}
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {client.goals[0].label} · {client.goals[1].label}
                        </p>
                    </motion.button>
                );
            })}
        </div>
    );
}
