import type { Metadata } from "next";
import PortfolioTracker from "@/components/portfolio/PortfolioTracker";
import { getHoldings } from "@/lib/sanityQueries";

export const metadata: Metadata = {
    title: "Mock Portfolio | Ryan Renfro",
    description:
        "A paper trading sandbox where I track simulated positions and write investment theses to practice fundamental analysis and portfolio construction.",
};

export const revalidate = 60; // Revalidate live data every minute

export default async function PortfolioPage() {
    const holdings = await getHoldings();

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                        Paper Trading Sandbox
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                        Mock Portfolio
                    </h1>
                    <p className="text-slate-400 max-w-2xl leading-relaxed">
                        A practice portfolio where I research companies, write investment
                        theses, and track how my picks would have performed. Click any card
                        to read my reasoning — the process matters more than the simulated
                        numbers.
                    </p>
                </div>

                <PortfolioTracker initialHoldings={holdings} />
            </div>
        </div>
    );
}
