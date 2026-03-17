"use client";

import { motion } from "framer-motion";
import type { ClientProfile } from "@/lib/mockData/clientData";

const eventIcons: Record<string, string> = {
    onboarding: "🟢",
    meeting: "📋",
    review: "📊",
    rebalance: "⚖️",
};

export default function CRMDashboard({ client }: { client: ClientProfile }) {
    const { crm } = client;
    const clientMonths = Math.round(
        (Date.now() - new Date(crm.clientSince).getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 lg:p-8 mb-8"
        >
            <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <h3 className="text-lg font-display font-bold text-slate-200">
                    Client Relationship Management
                </h3>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                <StatCard label="Client Since" value={`${clientMonths} mo`} accent="gold" />
                <StatCard label="Meetings" value={String(crm.totalMeetings)} accent="sky" />
                <StatCard label="Reviews" value={String(crm.portfolioReviews)} accent="emerald" />
                <StatCard label="Rebalances" value={String(crm.rebalances)} accent="indigo" />
                <StatCard label="Satisfaction" value={`${crm.satisfactionScore}/10`} accent="gold" />
                <StatCard
                    label="Next Review"
                    value={new Date(crm.nextReview).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    accent="crimson"
                />
            </div>

            {/* Timeline */}
            <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Engagement Timeline
                </h4>
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/30 via-slate-700/30 to-transparent" />

                    <div className="space-y-3">
                        {crm.events.slice().reverse().slice(0, 6).map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="flex items-start gap-4 pl-8 relative"
                            >
                                <span className="absolute left-1.5 top-1.5 text-xs">
                                    {eventIcons[event.type]}
                                </span>
                                <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-200">
                                            {event.label}
                                        </span>
                                        <span className="text-[10px] text-slate-500">
                                            {new Date(event.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent: "gold" | "sky" | "emerald" | "indigo" | "crimson";
}) {
    const colors = {
        gold: "text-gold-400",
        sky: "text-sky-400",
        emerald: "text-emerald-400",
        indigo: "text-indigo-400",
        crimson: "text-crimson-400",
    };

    return (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                {label}
            </p>
            <p className={`text-xl font-bold ${colors[accent]}`}>{value}</p>
        </div>
    );
}
