"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StickyVideoPlayer({ videoUrl }: { videoUrl: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the original position scrolls out of view, make it sticky
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Original position sentinel */}
            <div ref={containerRef} className="w-full">
                <div
                    className={`${isSticky ? "invisible" : "visible"
                        } w-full aspect-video rounded-2xl overflow-hidden glass`}
                >
                    <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video"
                    />
                </div>
            </div>

            {/* Sticky pip */}
            {isSticky && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 w-80 aspect-video rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-gold-500/10"
                >
                    <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video"
                    />
                    <button
                        onClick={() => {
                            containerRef.current?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-navy-900/80 text-white text-xs flex items-center justify-center hover:bg-navy-800 transition-colors"
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </>
    );
}
