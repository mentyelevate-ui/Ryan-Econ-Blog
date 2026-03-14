import Link from "next/link";
import {
    FaLinkedinIn,
    FaGithub,
    FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";

const socialLinks = [
    { href: "https://www.linkedin.com/in/ryan-renfro/", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "https://github.com", icon: FaGithub, label: "GitHub" },
    { href: "https://x.com", icon: FaXTwitter, label: "X / Twitter" },
    { href: "mailto:ryanmrenfro@gmail.com", icon: HiOutlineEnvelope, label: "Email" },
];

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Research" },
    { href: "/about", label: "About" },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-navy-900/80">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center font-bold text-navy-900 text-sm">
                                RR
                            </div>
                            <span className="font-display text-lg font-semibold">
                                Ryan Renfro
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            Economics student documenting research, tracking mock portfolios, and building software. Learning in public.
                        </p>
                    </div>

                    {/* Nav */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300"
                                >
                                    <s.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <span>&copy; {new Date().getFullYear()} Ryan Renfro. All rights reserved.</span>
                    <span>Built with curiosity &amp; code.</span>
                </div>
            </div>
        </footer>
    );
}
