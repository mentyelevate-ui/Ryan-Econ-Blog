"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    HiArrowDown,
    HiAcademicCap,
    HiRocketLaunch,
    HiTrophy,
    HiChartBar,
    HiCodeBracket,
    HiBookOpen,
} from "react-icons/hi2";
import { useState, useEffect } from "react";
const highlights = [
    {
        icon: HiAcademicCap,
        title: "Economics",
        description:
            "Currently studying macroeconomics, econometrics, and financial theory. Building analytical frameworks one course at a time.",
    },
    {
        icon: HiTrophy,
        title: "Collegiate Athletics",
        description:
            "Balancing competitive athletics with academics. Learning discipline, time management, and what it means to show up every day.",
    },
    {
        icon: HiRocketLaunch,
        title: "Building Things",
        description:
            "Entrepreneurial projects from SaaS products to this website. I learn best by building — shipping code and seeing what works.",
    },
];

const interests = [
    { icon: HiChartBar, label: "Macro Research" },
    { icon: HiBookOpen, label: "Behavioral Econ" },
    { icon: HiCodeBracket, label: "Full-Stack Dev" },
    { icon: HiRocketLaunch, label: "SaaS / Startups" },
];

export default function AboutPage() {
    const [resumeUrl, setResumeUrl] = useState("/resume.pdf");

    useEffect(() => {
        async function fetchResume() {
            try {
                const res = await fetch("/api/upload-resume");
                if (res.ok) {
                    const data = await res.json();
                    if (data.url) setResumeUrl(data.url);
                }
            } catch {
                // use fallback
            }
        }
        fetchResume();
    }, []);

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Row — data-driven, not narrative-heavy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                        About
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                        Ryan Renfro
                    </h1>
                    <p className="text-slate-400 max-w-2xl leading-relaxed">
                        Economics student, collegiate athlete, and aspiring wealth advisor.
                        This site is where I document what I&apos;m learning — from macro research
                        and mock portfolio management to building software.
                    </p>
                </motion.div>

                {/* Two-Column Grid: Photo + Quick Facts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* Photo — moderate size, not hero-scale */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="aspect-[3/4] max-w-xs mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-navy-700 via-navy-600 to-navy-700 overflow-hidden relative">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,168,76,0.10),transparent_60%)]" />
                            <Image src="/profile-rollins.jpg" alt="Ryan Renfro" fill className="object-cover" priority />
                        </div>
                    </motion.div>

                    {/* Quick Facts Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-2"
                    >
                        <div className="space-y-5 text-slate-400 leading-relaxed mb-8">
                            <p>
                                I&apos;m an economics student building the analytical toolkit for a
                                career in wealth advisory and commercial banking. Rather than
                                waiting until I land a role to start learning, I decided to learn
                                in public — tracking mock portfolios, writing research notes, and
                                building the tools to do it.
                            </p>
                            <p>
                                As a collegiate athlete, I understand what disciplined
                                preparation looks like. The same willingness to put in reps on
                                the field carries over to researching companies and writing
                                investment theses at my desk.
                            </p>
                        </div>

                        {/* Interest Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {interests.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2 px-3.5 py-2 glass-light rounded-full text-xs text-slate-300"
                                >
                                    <item.icon size={13} className="text-gold-400" />
                                    {item.label}
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div id="resume" className="flex flex-wrap gap-3">
                            <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
                            >
                                View Résumé
                                <HiArrowDown className="transition-transform group-hover:translate-y-0.5" />
                            </a>
                            <a
                                href="mailto:ryanmrenfro@gmail.com"
                                className="px-7 py-3 text-sm font-semibold rounded-full border border-slate-700 text-slate-300 hover:bg-white/5 hover:border-slate-500 transition-all text-center"
                            >
                                Contact Me
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Highlights Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
                        What I&apos;m Working On
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass rounded-2xl p-8 text-center group hover:border-gold-500/20 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-500/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                                <item.icon className="text-gold-400" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
