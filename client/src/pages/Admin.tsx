import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UserCheck,
  Star,
  Image,
  Newspaper,
  LogOut,
  Download,
  Check,
  X,
  Plus,
  Trash2,
  Users,
  DollarSign,
  Clock,
  Menu,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminStore } from "@/stores/adminStore";
import logoSrc from "@assets/Ginga_Soccer_Logo_1772593615133.png";

type Tab = "dashboard" | "registrations" | "risingstars" | "media" | "news";

const sidebarItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "risingstars", label: "Rising Stars", icon: Star },
  { key: "media", label: "Media", icon: Image },
  { key: "news", label: "News", icon: Newspaper },
  { key: "registrations", label: "Registrations", icon: UserCheck },
];

function exportToCSV(registrations: { id: string; name: string; program: string; status: string; payment: string; date: string }[]) {
  const confirmed = registrations.filter((r) => r.status === "Confirmed");
  const headers = ["Name", "Program", "Status", "Payment", "Date"];
  const rows = confirmed.map((r) => [r.name, r.program, r.status, r.payment, r.date]);
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ginga_confirmed_registrations.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    registrations,
    risingStars,
    media,
    news,
    toggleRegistrationStatus,
    togglePaymentStatus,
    addRisingStar,
    removeRisingStar,
    addMedia,
    removeMedia,
    addNews,
    removeNews,
  } = useAdminStore();

  const [newStar, setNewStar] = useState({ name: "", position: "", club: "", bio: "", image: "" });
  const [newMediaItem, setNewMediaItem] = useState({ title: "", category: "Training" as "Training" | "Matches" | "International Trips", image: "" });
  const [newPost, setNewPost] = useState({ title: "", date: "", excerpt: "", content: "", image: "" });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neutral-800 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.username !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 flex items-start justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-[#171717] border border-red-500/30 flex items-center justify-center">
            <X className="text-red-500" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-display" data-testid="text-admin-denied">
            ACCESS DENIED
          </h2>
          <p className="text-neutral-400 mt-4 mb-8">Admin credentials required to access this panel.</p>
          <button
            onClick={() => setLocation("/login")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-3 font-bold uppercase tracking-[0.15em] text-sm"
            data-testid="button-admin-login"
          >
            GO TO LOGIN
          </button>
        </motion.div>
      </div>
    );
  }

  const confirmedCount = registrations.filter((r) => r.status === "Confirmed").length;
  const paidCount = registrations.filter((r) => r.payment === "Paid").length;
  const pendingCount = registrations.filter((r) => r.status === "Pending").length;

  const handleLogout = async () => {
    await logout.mutateAsync();
    setLocation("/");
  };

  const handleAddStar = () => {
    if (!newStar.name || !newStar.position || !newStar.club) return;
    addRisingStar({ ...newStar, image: newStar.image || "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80" });
    setNewStar({ name: "", position: "", club: "", bio: "", image: "" });
  };

  const handleAddMedia = () => {
    if (!newMediaItem.title || !newMediaItem.image) return;
    addMedia(newMediaItem);
    setNewMediaItem({ title: "", category: "Training", image: "" });
  };

  const handleAddNews = () => {
    if (!newPost.title || !newPost.content) return;
    addNews({ ...newPost, date: newPost.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), image: newPost.image || "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80" });
    setNewPost({ title: "", date: "", excerpt: "", content: "", image: "" });
  };

  const inputClass = "w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600";
  const labelClass = "text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#111] border-r border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/5">
          <img src={logoSrc} alt="Ginga Soccer" className="h-10 w-auto object-contain" data-testid="img-admin-logo" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500"
                  : "text-neutral-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
              data-testid={`button-tab-${item.key}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-red-400 transition-colors"
            data-testid="button-admin-logout"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-white" data-testid="button-menu-toggle">
              <Menu size={24} />
            </button>
            <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white font-display" data-testid="text-admin-title">
              ADMIN CONSOLE
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 font-mono hidden sm:block">{user?.username}</span>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold text-xs">A</div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-dashboard-heading">OVERVIEW</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Total Registrations", value: registrations.length, icon: Users },
                  { label: "Confirmed", value: confirmedCount, icon: Check },
                  { label: "Pending", value: pendingCount, icon: Clock },
                  { label: "Revenue (Paid)", value: paidCount, icon: DollarSign },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#171717] border border-white/5 p-6" data-testid={`card-stat-${i}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase font-display">{stat.label}</span>
                      <stat.icon size={16} className="text-amber-500" />
                    </div>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#171717] border border-white/5 p-6">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">RECENT ACTIVITY</h3>
                <div className="space-y-3">
                  {registrations.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
                          <UserCheck size={14} className="text-neutral-500" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold">{r.name}</p>
                          <p className="text-neutral-500 text-xs font-mono">{r.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${r.status === "Confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                          {r.status.toUpperCase()}
                        </span>
                        <span className="text-neutral-600 text-xs font-mono">{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "registrations" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display" data-testid="text-registrations-heading">REGISTRATIONS</h2>
                <button
                  onClick={() => exportToCSV(registrations)}
                  className="flex items-center gap-2 bg-amber-500 text-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors"
                  data-testid="button-export-csv"
                >
                  <Download size={14} /> EXPORT TO CSV
                </button>
              </div>
              <div className="bg-[#171717] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        {["NAME", "PROGRAM", "STATUS", "PAYMENT", "DATE", "ACTIONS"].map((h) => (
                          <th key={h} className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-neutral-500 font-display">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((r) => (
                        <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors" data-testid={`row-registration-${r.id}`}>
                          <td className="px-6 py-4 text-white text-sm font-bold">{r.name}</td>
                          <td className="px-6 py-4 text-neutral-400 text-sm font-mono">{r.program}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${r.status === "Confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                              {r.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${r.payment === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                              {r.payment.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-neutral-500 text-xs font-mono">{r.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleRegistrationStatus(r.id)}
                                className={`text-[10px] font-bold tracking-wider px-3 py-1.5 transition-colors ${r.status === "Confirmed" ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"}`}
                                data-testid={`button-confirm-${r.id}`}
                              >
                                {r.status === "Confirmed" ? "REVOKE" : "CONFIRM"}
                              </button>
                              <button
                                onClick={() => togglePaymentStatus(r.id)}
                                className={`text-[10px] font-bold tracking-wider px-3 py-1.5 transition-colors ${r.payment === "Paid" ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"}`}
                                data-testid={`button-payment-${r.id}`}
                              >
                                {r.payment === "Paid" ? "UNPAY" : "MARK PAID"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "risingstars" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-risingstars-heading">RISING STARS</h2>

              <div className="bg-[#171717] border border-white/5 p-6 mb-8">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">ADD NEW STAR</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>NAME</label>
                    <input value={newStar.name} onChange={(e) => setNewStar({ ...newStar, name: e.target.value })} className={inputClass} placeholder="Player name" data-testid="input-star-name" />
                  </div>
                  <div>
                    <label className={labelClass}>POSITION</label>
                    <input value={newStar.position} onChange={(e) => setNewStar({ ...newStar, position: e.target.value })} className={inputClass} placeholder="e.g. Attacker" data-testid="input-star-position" />
                  </div>
                  <div>
                    <label className={labelClass}>CLUB</label>
                    <input value={newStar.club} onChange={(e) => setNewStar({ ...newStar, club: e.target.value })} className={inputClass} placeholder="e.g. Ginga Academy" data-testid="input-star-club" />
                  </div>
                  <div>
                    <label className={labelClass}>IMAGE URL</label>
                    <input value={newStar.image} onChange={(e) => setNewStar({ ...newStar, image: e.target.value })} className={inputClass} placeholder="https://..." data-testid="input-star-image" />
                  </div>
                </div>
                <button onClick={handleAddStar} className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors" data-testid="button-add-star">
                  <Plus size={14} /> ADD STAR
                </button>
              </div>

              <div className="space-y-3">
                {risingStars.map((star) => (
                  <div key={star.id} className="bg-[#171717] border border-white/5 p-4 flex items-center justify-between gap-4" data-testid={`row-star-${star.id}`}>
                    <div className="flex items-center gap-4">
                      <img src={star.image} alt={star.name} className="w-12 h-12 object-cover flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-sm">{star.name}</p>
                        <p className="text-neutral-500 text-xs font-mono">{star.position} — {star.club}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeRisingStar(star.id)}
                      className="bg-red-500/10 text-red-400 p-2 hover:bg-red-500/20 transition-colors flex-shrink-0"
                      data-testid={`button-delete-star-${star.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "media" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-media-heading">MEDIA MANAGER</h2>

              <div className="bg-[#171717] border border-white/5 p-6 mb-8">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">UPLOAD IMAGE</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>TITLE</label>
                    <input value={newMediaItem.title} onChange={(e) => setNewMediaItem({ ...newMediaItem, title: e.target.value })} className={inputClass} placeholder="Image title" data-testid="input-media-title" />
                  </div>
                  <div>
                    <label className={labelClass}>CATEGORY</label>
                    <select
                      value={newMediaItem.category}
                      onChange={(e) => setNewMediaItem({ ...newMediaItem, category: e.target.value as any })}
                      className={inputClass}
                      data-testid="select-media-category"
                    >
                      <option value="Training">Training</option>
                      <option value="Matches">Matches</option>
                      <option value="International Trips">International Trips</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>IMAGE URL</label>
                    <input value={newMediaItem.image} onChange={(e) => setNewMediaItem({ ...newMediaItem, image: e.target.value })} className={inputClass} placeholder="https://..." data-testid="input-media-url" />
                  </div>
                </div>
                <button onClick={handleAddMedia} className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors" data-testid="button-add-media">
                  <Plus size={14} /> ADD IMAGE
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="relative group" data-testid={`card-admin-media-${item.id}`}>
                    <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                      <p className="text-white text-xs font-bold text-center">{item.title}</p>
                      <p className="text-amber-500 text-[10px] font-mono">{item.category}</p>
                      <button
                        onClick={() => removeMedia(item.id)}
                        className="bg-red-500/20 text-red-400 p-1.5 hover:bg-red-500/30 transition-colors mt-1"
                        data-testid={`button-delete-media-${item.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-news-heading">NEWS MANAGER</h2>

              <div className="bg-[#171717] border border-white/5 p-6 mb-8">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">WRITE POST</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>TITLE</label>
                    <input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className={inputClass} placeholder="Post title" data-testid="input-news-title" />
                  </div>
                  <div>
                    <label className={labelClass}>DATE</label>
                    <input value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className={inputClass} placeholder="e.g. Mar 5, 2026" data-testid="input-news-date" />
                  </div>
                  <div>
                    <label className={labelClass}>IMAGE URL</label>
                    <input value={newPost.image} onChange={(e) => setNewPost({ ...newPost, image: e.target.value })} className={inputClass} placeholder="https://..." data-testid="input-news-image" />
                  </div>
                  <div>
                    <label className={labelClass}>EXCERPT</label>
                    <input value={newPost.excerpt} onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} className={inputClass} placeholder="Short summary" data-testid="input-news-excerpt" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={labelClass}>CONTENT</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Full article content..."
                    data-testid="input-news-content"
                  />
                </div>
                <button onClick={handleAddNews} className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors" data-testid="button-add-news">
                  <Plus size={14} /> PUBLISH POST
                </button>
              </div>

              <div className="space-y-3">
                {news.map((post) => (
                  <div key={post.id} className="bg-[#171717] border border-white/5 p-4 flex items-center justify-between gap-4" data-testid={`row-news-${post.id}`}>
                    <div className="flex items-center gap-4">
                      <img src={post.image} alt={post.title} className="w-16 h-12 object-cover flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-sm">{post.title}</p>
                        <p className="text-neutral-500 text-xs font-mono">{post.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeNews(post.id)}
                      className="bg-red-500/10 text-red-400 p-2 hover:bg-red-500/20 transition-colors flex-shrink-0"
                      data-testid={`button-delete-news-${post.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
