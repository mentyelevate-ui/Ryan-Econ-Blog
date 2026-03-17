import type { Metadata } from "next";
import PortfolioClientView from "@/components/portfolio/PortfolioClientView";

export const metadata: Metadata = {
    title: "Client Portfolios | Ryan Renfro",
    description:
        "Mock client portfolio management showcasing financial planning strategies for two distinct family profiles. A practice sandbox demonstrating advisor-client relationship management.",
};

export default function PortfolioPage() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                        Financial Planning Sandbox
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                        Client Portfolios
                    </h1>
                    <p className="text-slate-400 max-w-2xl leading-relaxed">
                        Two mock family clients, each with unique financial goals, risk
                        tolerances, and investment strategies. Select a client below to
                        explore their portfolio, allocation, and our advisory relationship.
                    </p>
                </div>

                <PortfolioClientView />
            </div>
        </div>
    );
}
