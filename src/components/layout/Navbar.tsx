"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Research" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "glass py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-110 relative">
            <Image src="/favicon-rr.png" alt="RR Logo" fill className="object-cover" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Ryan Renfro
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/about#resume"
            className="ml-2 px-5 py-2 text-sm font-semibold rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all duration-300"
          >
            Résumé
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about#resume"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-5 py-2.5 text-sm font-semibold rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20"
              >
                Résumé
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
