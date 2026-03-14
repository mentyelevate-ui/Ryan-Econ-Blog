"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};

export default function HeroContent() {
    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl text-center"
            >
                {/* Eyebrow */}
                <motion.div variants={itemVariants} className="mb-6">
                    <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 border border-gold-500/20 rounded-full bg-gold-500/5">
                        Economics Student &bull; Market Researcher
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
                >
                    Tracking Trends.{" "}
                    <span className="gradient-text">Testing Strategies.</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-10"
                >
                    An open notebook for my macroeconomic research, personal blog, and a
                    tracker for my mock investment portfolio. Learning in public, one
                    thesis at a time.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/portfolio"
                        className="group flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300"
                    >
                        View Mock Portfolio
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full border border-slate-600 text-slate-200 hover:border-gold-500/40 hover:text-gold-400 transition-all duration-300"
                    >
                        Read Research Notes
                        <HiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Scroll hint */}
                <motion.div variants={itemVariants} className="mt-16">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-slate-600 mx-auto flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-slate-400" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
