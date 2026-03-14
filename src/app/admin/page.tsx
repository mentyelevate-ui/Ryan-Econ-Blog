"use client";

import { useState } from "react";
import { HiDocumentArrowUp, HiCheckCircle } from "react-icons/hi2";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [fileStats, setFileStats] = useState<{ name: string; rows: number } | null>(null);

    const [articleStatus, setArticleStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [articleStats, setArticleStats] = useState<{ name: string; title: string } | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // A simple front-end lock. Feel free to change this password in the code later!
        if (password === "admin") {
            setIsAuthenticated(true);
            setLoginError(false);
        } else {
            setLoginError(true);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("uploading");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload-excel", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setFileStats({ name: file.name, rows: data.processed });
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    const handleArticleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setArticleStatus("uploading");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload-article", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setArticleStats({ name: file.name, title: data.title });
                setArticleStatus("success");
            } else {
                setArticleStatus("error");
            }
        } catch (err) {
            setArticleStatus("error");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <form onSubmit={handleLogin} className="glass rounded-2xl p-8 border hover:border-gold-500/20 transition-colors">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-display font-bold text-slate-200 mb-2">Secure Portal</h2>
                            <p className="text-slate-400 text-sm">Please enter your master password to access the data pipeline.</p>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password..."
                            className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-gold-500/50 mb-4"
                        />
                        {loginError && <p className="text-xs text-crimson-400 mb-4 text-center">Incorrect password.</p>}
                        <button
                            type="submit"
                            className="w-full bg-gold-500/10 text-gold-400 border border-gold-500/20 py-3 rounded-xl font-semibold hover:bg-gold-500/20 transition-colors"
                        >
                            Unlock Pipeline
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-10 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                        Data Command Center
                    </p>
                    <h1 className="font-display text-4xl font-bold mb-4">Pipeline Admin Portal</h1>
                    <p className="text-slate-400">
                        Upload raw source files (Excel, PDF, Word). The backend will automatically parse, format, and organize everything straight into your portfolio dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Excel Upload Portal */}
                    <div className="glass rounded-2xl p-8 border hover:border-gold-500/20 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4m-4 4h4m-4 4h4M6 10h4m-4 4h4m-4 4h4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-200">Portfolio Data (Excel / CSV)</h3>
                                <p className="text-xs text-slate-500">Auto-update holdings, metrics, and risk profiles</p>
                            </div>
                        </div>

                        <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/50 rounded-xl p-10 flex flex-col items-center justify-center bg-navy-900/40 hover:bg-navy-800/50 transition-colors">
                            <input
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            {status === "idle" && (
                                <>
                                    <HiDocumentArrowUp size={40} className="text-slate-500 mb-3 group-hover:text-gold-400 transition-colors" />
                                    <p className="text-sm font-semibold text-slate-300">Drag & Drop your Excel file</p>
                                    <p className="text-xs text-slate-500 mt-1">.xlsx or .csv — exact mapping happens automatically</p>
                                </>
                            )}

                            {status === "uploading" && (
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border-t-2 border-gold-400 animate-spin mb-3"></div>
                                    <p className="text-sm text-gold-400">Parsing spreadsheets & updating database...</p>
                                </div>
                            )}

                            {status === "success" && fileStats && (
                                <div className="flex flex-col items-center text-emerald-400">
                                    <HiCheckCircle size={40} className="mb-3" />
                                    <p className="text-sm font-bold">Successfully Parsed!</p>
                                    <p className="text-xs text-emerald-500/80 mt-1">Extracted {fileStats.rows} holdings from {fileStats.name}</p>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex flex-col items-center text-crimson-400">
                                    <p className="text-sm font-bold">Upload failed. Please ensure file format is correct.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PDF/Notes Upload Portal */}
                    <div className="glass rounded-2xl p-8 border hover:border-gold-500/20 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-200">Research & Memos (.txt / .md)</h3>
                                <p className="text-xs text-slate-500">Ingest pure text articles instantly into your blog</p>
                            </div>
                        </div>

                        <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/50 rounded-xl p-10 flex flex-col items-center justify-center bg-navy-900/40 hover:bg-navy-800/50 transition-colors">
                            <input
                                type="file"
                                accept=".txt,.md,.pdf"
                                onChange={handleArticleUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            {articleStatus === "idle" && (
                                <>
                                    <HiDocumentArrowUp size={40} className="text-slate-500 mb-3 group-hover:text-gold-400 transition-colors" />
                                    <p className="text-sm font-semibold text-slate-300">Drag & Drop your document</p>
                                    <p className="text-xs text-slate-500 mt-1">.txt, .md, or .pdf — titles and text extracted automatically</p>
                                </>
                            )}

                            {articleStatus === "uploading" && (
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full border-t-2 border-gold-400 animate-spin mb-3"></div>
                                    <p className="text-sm text-gold-400">Parsing text & generating blog metadata...</p>
                                </div>
                            )}

                            {articleStatus === "success" && articleStats && (
                                <div className="flex flex-col items-center text-emerald-400">
                                    <HiCheckCircle size={40} className="mb-3" />
                                    <p className="text-sm font-bold">Successfully Published!</p>
                                    <p className="text-xs text-emerald-500/80 mt-1">Found title: "{articleStats.title}"</p>
                                </div>
                            )}

                            {articleStatus === "error" && (
                                <div className="flex flex-col items-center text-crimson-400">
                                    <p className="text-sm font-bold">Upload failed. Please ensure file format is plain text or Markdown.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
