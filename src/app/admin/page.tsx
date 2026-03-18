"use client";

import { useState, useEffect } from "react";
import { 
    HiDocumentArrowUp, 
    HiCheckCircle, 
    HiPencilSquare, 
    HiTrash, 
    HiArrowLeft, 
    HiPhoto,
    HiArrowUpTray,
    HiAcademicCap,
    HiCheck,
    HiXMark,
    HiBookOpen
} from "react-icons/hi2";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    // Form states
    const [articleStatus, setArticleStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [articleStats, setArticleStats] = useState<{ name: string; title: string } | null>(null);

    // Management states
    const [posts, setPosts] = useState<any[]>([]);
    const [editingPost, setEditingPost] = useState<any | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    // Resume states
    const [resumeStatus, setResumeStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
    const [resumeStats, setResumeStats] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const session = localStorage.getItem("admin_session");
        if (session === "active") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadPosts();
        }
    }, [isAuthenticated]);

    const loadPosts = async () => {
        try {
            const res = await fetch("/api/upload-article", { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                console.log(`[Admin] Successfully loaded ${data?.length || 0} posts from Sanity.`);
                setPosts(Array.isArray(data) ? data : []);
            } else {
                console.error("[Admin] Failed to load posts from API", res.status);
            }
        } catch (err) {
            console.error("[Admin] Critical Error in loadPosts:", err);
            setPosts([]);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin") {
            setIsAuthenticated(true);
            setLoginError(false);
            localStorage.setItem("admin_session", "active");
        } else {
            setLoginError(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("admin_session");
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
                await loadPosts();
            } else {
                setArticleStatus("error");
            }
        } catch (err) {
            setArticleStatus("error");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editingPost) return;

        setImageUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            // Save image to public/uploads
            const fileName = `cover_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
            const reader = new FileReader();
            reader.onload = () => {
                // For client-side preview
                setEditingPost({ ...editingPost, imageUrl: `/uploads/${fileName}` });
            };
            reader.readAsDataURL(file);

            // Upload via a simple POST to a dedicated image endpoint
            const imgRes = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });
            
            if (imgRes.ok) {
                const data = await imgRes.json();
                setEditingPost((prev: any) => ({ 
                    ...prev, 
                    imageUrl: data.url,
                    mainImageAssetId: data.assetId 
                }));
            }
        } catch (err) {
            console.error("Image upload failed", err);
        } finally {
            setImageUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/upload-article?id=${id}`, { 
                method: "DELETE",
                cache: "no-store",
            });
            if (res.ok) {
                setPosts(prev => prev.filter(p => p.id !== id));
                setPostToDelete(null);
            } else {
                const errorData = await res.json().catch(() => ({ error: "Delete failed" }));
                alert(`Error: ${errorData.error || "Unknown response from server"}`);
            }
        } catch (err) {
            alert("Delete failed — check your connection.");
        }
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setResumeStatus("uploading");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload-resume", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setResumeStats({ name: file.name });
                setResumeStatus("success");
                setTimeout(() => setResumeStatus("idle"), 5000);
            } else {
                setResumeStatus("error");
            }
        } catch (err) {
            setResumeStatus("error");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/upload-article", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingPost),
            });
            if (res.ok) {
                const data = await res.json();
                console.log("[Admin] Save success:", data);
                alert("Changes saved successfully!");
                setEditingPost(null);
                await loadPosts();
            } else {
                const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
                alert(`Save failed: ${errorData.error}${errorData.details ? `\n\nDetails: ${errorData.details}` : ""}`);
            }
        } catch (err) {
            alert("Save failed — check your connection and try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="max-w-md w-full px-6 text-center">
                    <form onSubmit={handleLogin} className="glass rounded-2xl p-8 border hover:border-gold-500/20 transition-colors">
                        <div className="mb-8">
                            <h2 className="text-2xl font-display font-bold text-slate-200 mb-2">Secure Portal</h2>
                            <p className="text-slate-400 text-sm">Enter your master password to access the data pipeline.</p>
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

    // Editing View
    if (editingPost) {
        return (
            <div className="min-h-screen pt-28 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <button 
                        onClick={() => setEditingPost(null)}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 mb-8 transition-colors"
                    >
                        <HiArrowLeft /> Back to Management
                    </button>
                    
                    <div className="glass rounded-2xl p-8 border border-gold-500/20 shadow-2xl">
                        <h2 className="text-2xl font-display font-bold text-slate-200 mb-6 underline decoration-gold-500/30">Edit Research Piece</h2>
                        
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Title</label>
                                    <input 
                                        type="text" 
                                        value={editingPost.title} 
                                        onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                                        className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Category</label>
                                    <input 
                                        type="text" 
                                        value={editingPost.category} 
                                        onChange={e => setEditingPost({...editingPost, category: e.target.value})}
                                        className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Cover Image Upload */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                                    <HiPhoto size={14} /> Cover Image
                                </label>
                                <div className="flex items-center gap-4">
                                    {editingPost.imageUrl && (
                                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                                            <img src={editingPost.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/50 rounded-xl p-4 flex items-center justify-center bg-navy-900/40 hover:bg-navy-800/50 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            {imageUploading ? (
                                                <div className="animate-spin w-5 h-5 border-t-2 border-gold-400 rounded-full" />
                                            ) : (
                                                <p className="text-xs text-slate-400">Drop an image here or click to upload</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] text-slate-500">or paste a URL:</span>
                                            <input 
                                                type="text" 
                                                value={editingPost.imageUrl || ""} 
                                                onChange={e => setEditingPost({...editingPost, imageUrl: e.target.value})}
                                                placeholder="https://..."
                                                className="flex-1 bg-navy-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Excerpt / Summary</label>
                                <textarea 
                                    rows={2}
                                    value={editingPost.excerpt || ""} 
                                    onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
                                    placeholder="Short summary for the blog grid..."
                                    className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Author&apos;s Insight (Informal Commentary)</label>
                                <textarea 
                                    rows={3}
                                    value={editingPost.insight || ""} 
                                    onChange={e => setEditingPost({...editingPost, insight: e.target.value})}
                                    placeholder="Add your personal take or informal thoughts here..."
                                    className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Native Content (Article Text)</label>
                                <textarea 
                                    rows={10}
                                    value={editingPost.nativeContent || ""} 
                                    onChange={e => setEditingPost({...editingPost, nativeContent: e.target.value})}
                                    placeholder="Paste your research paper text here to render it naturally on the site..."
                                    className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none font-mono text-sm shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Research Disclaimer</label>
                                <input 
                                    type="text" 
                                    value={editingPost.disclaimer || ""} 
                                    onChange={e => setEditingPost({...editingPost, disclaimer: e.target.value})}
                                    placeholder="Optional disclaimer text..."
                                    className="w-full bg-navy-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-1 focus:ring-gold-500/50 outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-8 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 mb-2">
                            Data Command Center
                        </p>
                        <h1 className="font-display text-4xl font-bold mb-2 text-white">Pipeline Admin Portal</h1>
                        <p className="text-slate-400 max-w-xl">
                            Manage your research papers, upload new memos, and refine your portfolio data with precision.
                            <span className="text-[10px] opacity-20 ml-2">v1.1.5-live</span>
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-xs font-medium text-slate-500 hover:text-crimson-400 transition-colors uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-lg"
                    >
                        Log Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass rounded-2xl p-6 border border-slate-700/50">
                            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                                <HiDocumentArrowUp className="text-gold-400" /> New Research Paper
                            </h3>
                            <div className="relative group cursor-pointer border-2 border-dashed border-slate-700/50 rounded-xl p-8 flex flex-col items-center justify-center bg-navy-900/40 hover:bg-navy-800/50 transition-colors text-center">
                                <input
                                    type="file"
                                    accept=".pdf,.txt,.md"
                                    onChange={handleArticleUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {articleStatus === "uploading" ? (
                                    <div className="animate-spin w-6 h-6 border-t-2 border-gold-400 rounded-full" />
                                ) : (
                                    <>
                                        <p className="text-xs font-semibold text-slate-300">Upload PDF / TXT / MD</p>
                                        <p className="text-[10px] text-slate-500 mt-1">Automatic parsing & metadata</p>
                                    </>
                                )}
                            </div>
                            {articleStatus === "success" && articleStats && (
                                <p className="text-[10px] text-emerald-400 mt-3 flex items-center gap-1">
                                    <HiCheckCircle /> &ldquo;{articleStats.title}&rdquo; published
                                </p>
                            )}
                        </div>

                        {/* Career Assets / Resume */}
                        <div className="glass rounded-2xl p-6 border border-slate-700/50">
                            <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                                <HiAcademicCap className="text-gold-400" /> Career Assets
                            </h3>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <input
                                        type="file"
                                        onChange={handleResumeUpload}
                                        accept=".pdf"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`p-6 border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center
                                        ${resumeStatus === 'uploading' ? 'border-gold-500/50 bg-gold-500/5' :
                                            resumeStatus === 'success' ? 'border-emerald-500/50 bg-emerald-500/5' :
                                                resumeStatus === 'error' ? 'border-crimson-500/50 bg-crimson-500/5' :
                                                    'border-slate-700/50 hover:border-slate-600 hover:bg-white/5'}`}>
                                        
                                        {resumeStatus === 'idle' && (
                                            <>
                                                <HiArrowUpTray className="text-slate-500" size={20} />
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Update 📜</p>
                                                    <p className="text-[9px] text-slate-500 mt-0.5">PDF Format</p>
                                                </div>
                                            </>
                                        )}

                                        {resumeStatus === 'uploading' && (
                                            <div className="animate-spin w-5 h-5 border-t-2 border-gold-400 rounded-full" />
                                        )}

                                        {resumeStatus === 'success' && (
                                            <>
                                                <HiCheck className="text-emerald-400" />
                                                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Success!</p>
                                            </>
                                        )}

                                        {resumeStatus === 'error' && (
                                            <>
                                                <HiXMark className="text-crimson-400" />
                                                <p className="text-[10px] font-bold text-crimson-400 uppercase tracking-widest">Failed</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-3 rounded-xl bg-navy-900/40 border border-slate-700/50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <HiBookOpen className="text-slate-500" size={14} />
                                        <span className="text-[10px] text-slate-400 font-medium">resume.pdf</span>
                                    </div>
                                    <a 
                                        href="/resume.pdf" 
                                        target="_blank" 
                                        className="text-[9px] font-bold uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
                                    >
                                        View
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manage Posts Section */}
                    <div className="lg:col-span-2">
                        <div className="glass rounded-2xl p-8 border border-slate-700/50 h-full min-h-[500px]">
                            <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-gold-400" />
                                Manage Live Research
                            </h3>
                            
                            <div className="space-y-4">
                                {posts.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <p className="text-slate-500 text-sm">No research pieces found. Upload your first one!</p>
                                    </div>
                                ) : (
                                    posts.map(post => (
                                        <div key={post.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-gold-500/30 transition-all">
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                {post.imageUrl && (
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                                                        <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-bold text-slate-200 mb-1 truncate">{post.title}</h4>
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <span className="text-[9px] uppercase tracking-widest text-gold-400/80 font-bold">{post.category}</span>
                                                        <span className="text-[9px] text-slate-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                                                        {post.insight && <span className="text-[9px] text-emerald-400/80">&bull; Insight</span>}
                                                        {post.nativeContent && <span className="text-[9px] text-sky-400/80">&bull; Native</span>}
                                                        {post.pdfUrl && <span className="text-[9px] text-crimson-400/80">&bull; PDF</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0 ml-4">
                                                <button 
                                                    onClick={() => setEditingPost(post)}
                                                    className="p-2 text-slate-400 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-all"
                                                    title="Edit Post"
                                                >
                                                    <HiPencilSquare size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => setPostToDelete(post.id)}
                                                    className="p-2 text-slate-400 hover:text-crimson-400 hover:bg-crimson-500/10 rounded-lg transition-all"
                                                    title="Delete Post"
                                                >
                                                    <HiTrash size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Delete Modal */}
            {postToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy-950/80 backdrop-blur-sm">
                    <div className="glass-light max-w-sm w-full p-8 border border-white/10 rounded-3xl shadow-2xl">
                        <div className="w-16 h-16 rounded-full bg-crimson-500/10 flex items-center justify-center text-crimson-400 mb-6 mx-auto">
                            <HiTrash size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-slate-200 text-center mb-2">Delete Research?</h3>
                        <p className="text-sm text-slate-400 text-center mb-8 leading-relaxed">
                            This action is permanent and will remove this research piece from the pipeline immediately.
                        </p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setPostToDelete(null)}
                                className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all font-semibold"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleDelete(postToDelete)}
                                className="flex-1 py-3 rounded-xl bg-crimson-500 text-white font-bold hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
