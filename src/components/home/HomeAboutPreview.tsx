"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiArrowDown } from "react-icons/hi2";
import Image from "next/image";

export default function HomeAboutPreview() {
    return (
        <section className="section-padding border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
                    {/* Small Avatar + Quick Bio — 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 flex flex-col items-center lg:items-start"
                    >
                        {/* Tasteful small avatar */}
                        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-navy-700 via-navy-600 to-navy-700 overflow-hidden relative mb-5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,168,76,0.10),transparent_60%)]" />
                            <Image src="/profile-rollins.jpg" alt="Ryan Renfro" fill className="object-cover" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                            About
                        </p>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 text-center lg:text-left">
                            Ryan Renfro
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed text-center lg:text-left mb-6">
                            Economics student, collegiate athlete, and aspiring wealth advisor.
                            Learning in public through research, mock portfolios, and building
                            software.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/about"
                                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full border border-slate-600 text-slate-200 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                            >
                                More About Me
                                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="/resume.pdf"
                                download="Ryan_Renfro_Resume.pdf"
                                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 transition-all duration-300"
                            >
                                Résumé
                                <HiArrowDown className="transition-transform group-hover:translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Data-driven stat cards — 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4"
                    >
                        {[
                            { value: "Econ", label: "Major", sub: "B.S. Economics" },
                            {
                                value: "D1",
                                label: "Athletics",
                                sub: "Collegiate Athlete",
                            },
                            {
                                value: "3+",
                                label: "Projects",
                                sub: "SaaS & Web Apps",
                            },
                            {
                                value: "8",
                                label: "Mock Positions",
                                sub: "Paper Portfolio",
                            },
                            {
                                value: "3",
                                label: "Asset Classes",
                                sub: "Tracked",
                            },
                            {
                                value: "∞",
                                label: "Curiosity",
                                sub: "Always Learning",
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                                className="glass-light rounded-xl p-4 text-center"
                            >
                                <p className="text-xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                    {stat.label}
                                </p>
                                <p className="text-[10px] text-slate-600 mt-0.5">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
