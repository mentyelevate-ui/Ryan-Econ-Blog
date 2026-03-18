"use client";

import { motion } from "framer-motion";
import type { ClientProfile } from "@/lib/mockData/clientData";
import { HiCalendarDays, HiChatBubbleLeftRight, HiChartBarSquare, HiArrowPath, HiCheckBadge, HiClock } from "react-icons/hi2";

const eventIcons: Record<string, React.ReactNode> = {
    onboarding: <HiCheckBadge className="text-emerald-400" size={14} />,
    meeting: <HiChatBubbleLeftRight className="text-sky-400" size={14} />,
    review: <HiChartBarSquare className="text-gold-400" size={14} />,
    rebalance: <HiArrowPath className="text-indigo-400" size={14} />,
};

const eventColors: Record<string, string> = {
    onboarding: "border-emerald-500/30 bg-emerald-500/5",
    meeting: "border-sky-500/30 bg-sky-500/5",
    review: "border-gold-500/30 bg-gold-500/5",
    rebalance: "border-indigo-500/30 bg-indigo-500/5",
};

export default function CRMDashboard({ client }: { client: ClientProfile }) {
    const { crm } = client;
    const clientMonths = Math.round(
        (Date.now() - new Date(crm.clientSince).getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    const clientYears = (clientMonths / 12).toFixed(1);

    const nextReviewDate = new Date(crm.nextReview);
    const daysUntilReview = Math.ceil(
        (nextReviewDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="space-y-6">
            {/* Relationship Overview Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 lg:p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center">
                        <HiChatBubbleLeftRight className="text-gold-400" size={18} />
                    </div>
                    <div>
                        <h3 className="text-lg font-display font-bold text-slate-200">
                            Relationship Summary
                        </h3>
                        <p className="text-xs text-slate-500">
                            {client.familyName} · Client since {new Date(crm.clientSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <StatCard
                        icon={<HiCalendarDays size={16} />}
                        label="Tenure"
                        value={`${clientYears}yr`}
                        subtext={`${clientMonths} months`}
                        accent="gold"
                    />
                    <StatCard
                        icon={<HiChatBubbleLeftRight size={16} />}
                        label="Meetings"
                        value={String(crm.totalMeetings)}
                        subtext="Total sessions"
                        accent="sky"
                    />
                    <StatCard
                        icon={<HiChartBarSquare size={16} />}
                        label="Reviews"
                        value={String(crm.portfolioReviews)}
                        subtext="Performance reviews"
                        accent="emerald"
                    />
                    <StatCard
                        icon={<HiArrowPath size={16} />}
                        label="Rebalances"
                        value={String(crm.rebalances)}
                        subtext="Portfolio adjustments"
                        accent="indigo"
                    />
                    <StatCard
                        icon={<HiCheckBadge size={16} />}
                        label="Satisfaction"
                        value={`${crm.satisfactionScore}`}
                        subtext="Out of 10"
                        accent="gold"
                    />
                    <StatCard
                        icon={<HiClock size={16} />}
                        label="Next Review"
                        value={nextReviewDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        subtext={daysUntilReview > 0 ? `In ${daysUntilReview} days` : "Overdue"}
                        accent={daysUntilReview > 0 ? "sky" : "crimson"}
                    />
                </div>
            </motion.div>

            {/* Engagement Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass rounded-2xl p-6 lg:p-8"
            >
                <h4 className="text-sm font-bold text-slate-300 mb-1">
                    Engagement Timeline
                </h4>
                <p className="text-xs text-slate-500 mb-6">
                    Complete history of meetings, reviews, and portfolio actions
                </p>

                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/40 via-slate-700/40 to-slate-800/20" />

                    <div className="space-y-1">
                        {crm.events.slice().reverse().map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, delay: i * 0.03 }}
                                className={`flex items-center gap-4 pl-10 py-3 rounded-xl border border-transparent hover:${eventColors[event.type]} transition-all relative group`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-2.5 w-[13px] h-[13px] rounded-full border-2 border-navy-900 bg-navy-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <div className={`w-[5px] h-[5px] rounded-full ${
                                        event.type === "onboarding" ? "bg-emerald-400" :
                                        event.type === "meeting" ? "bg-sky-400" :
                                        event.type === "review" ? "bg-gold-400" :
                                        "bg-indigo-400"
                                    }`} />
                                </div>

                                {/* Icon */}
                                <div className="shrink-0">
                                    {eventIcons[event.type]}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-200 truncate">
                                        {event.label}
                                    </p>
                                </div>

                                {/* Date */}
                                <span className="text-[11px] text-slate-500 shrink-0 tabular-nums">
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>

                                {/* Type badge */}
                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 ${
                                    event.type === "onboarding" ? "bg-emerald-500/10 text-emerald-400" :
                                    event.type === "meeting" ? "bg-sky-500/10 text-sky-400" :
                                    event.type === "review" ? "bg-gold-500/10 text-gold-400" :
                                    "bg-indigo-500/10 text-indigo-400"
                                }`}>
                                    {event.type}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    subtext,
    accent,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    subtext: string;
    accent: "gold" | "sky" | "emerald" | "indigo" | "crimson";
}) {
    const colors = {
        gold: "text-gold-400",
        sky: "text-sky-400",
        emerald: "text-emerald-400",
        indigo: "text-indigo-400",
        crimson: "text-crimson-400",
    };

    const bgColors = {
        gold: "bg-gold-500/10",
        sky: "bg-sky-500/10",
        emerald: "bg-emerald-500/10",
        indigo: "bg-indigo-500/10",
        crimson: "bg-crimson-500/10",
    };

    return (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-md ${bgColors[accent]} flex items-center justify-center ${colors[accent]}`}>
                    {icon}
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    {label}
                </p>
            </div>
            <p className={`text-xl font-bold ${colors[accent]} mb-0.5`}>{value}</p>
            <p className="text-[10px] text-slate-600">{subtext}</p>
        </div>
    );
}
