import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  Plane,
  Settings,
  LogOut,
  Download,
  Check,
  X,
  Plus,
  Edit2,
  Save,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  Menu,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminStore } from "@/stores/adminStore";
import logoSrc from "@assets/Ginga_Soccer_Logo_1772593615133.png";

type Tab = "dashboard" | "registrations" | "schedule" | "trips" | "settings";

const sidebarItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "registrations", label: "Registrations", icon: UserCheck },
  { key: "schedule", label: "Schedule", icon: Calendar },
  { key: "trips", label: "Trips", icon: Plane },
  { key: "settings", label: "Settings", icon: Settings },
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
    sessions,
    trips,
    toggleRegistrationStatus,
    togglePaymentStatus,
    updateSession,
    addTrip,
  } = useAdminStore();

  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [editDay, setEditDay] = useState("");
  const [editTime, setEditTime] = useState("");

  const [newTrip, setNewTrip] = useState({ destination: "", dates: "", cost: "", description: "" });

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

  const startEditSession = (s: { id: string; day: string; time: string }) => {
    setEditingSession(s.id);
    setEditDay(s.day);
    setEditTime(s.time);
  };

  const saveSession = (id: string) => {
    updateSession(id, editDay, editTime);
    setEditingSession(null);
  };

  const handleAddTrip = () => {
    if (!newTrip.destination || !newTrip.dates || !newTrip.cost) return;
    addTrip(newTrip);
    setNewTrip({ destination: "", dates: "", cost: "", description: "" });
  };

  const confirmedCount = registrations.filter((r) => r.status === "Confirmed").length;
  const paidCount = registrations.filter((r) => r.payment === "Paid").length;
  const pendingCount = registrations.filter((r) => r.status === "Pending").length;

  const handleLogout = async () => {
    await logout.mutateAsync();
    setLocation("/");
  };

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
            <span className="text-xs text-neutral-500 font-mono hidden sm:block">
              {user?.username}
            </span>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold text-xs">
              A
            </div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-dashboard-heading">
                OVERVIEW
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Total Registrations", value: registrations.length, icon: Users, color: "amber" },
                  { label: "Confirmed", value: confirmedCount, icon: Check, color: "green" },
                  { label: "Pending", value: pendingCount, icon: Clock, color: "yellow" },
                  { label: "Revenue (Paid)", value: paidCount, icon: DollarSign, color: "emerald" },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#171717] border border-white/5 p-6" data-testid={`card-stat-${i}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase font-display">
                        {stat.label}
                      </span>
                      <stat.icon size={16} className="text-amber-500" />
                    </div>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#171717] border border-white/5 p-6">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">
                  RECENT ACTIVITY
                </h3>
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
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${
                          r.status === "Confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                        }`}>
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
                <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display" data-testid="text-registrations-heading">
                  REGISTRATIONS
                </h2>
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
                          <th key={h} className="text-left px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-neutral-500 font-display">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((r) => (
                        <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors" data-testid={`row-registration-${r.id}`}>
                          <td className="px-6 py-4 text-white text-sm font-bold">{r.name}</td>
                          <td className="px-6 py-4 text-neutral-400 text-sm font-mono">{r.program}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${
                              r.status === "Confirmed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                            }`}>
                              {r.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold tracking-wider px-2 py-1 ${
                              r.payment === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            }`}>
                              {r.payment.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-neutral-500 text-xs font-mono">{r.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleRegistrationStatus(r.id)}
                                className={`text-[10px] font-bold tracking-wider px-3 py-1.5 transition-colors ${
                                  r.status === "Confirmed"
                                    ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                                    : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                }`}
                                data-testid={`button-confirm-${r.id}`}
                              >
                                {r.status === "Confirmed" ? "REVOKE" : "CONFIRM"}
                              </button>
                              <button
                                onClick={() => togglePaymentStatus(r.id)}
                                className={`text-[10px] font-bold tracking-wider px-3 py-1.5 transition-colors ${
                                  r.payment === "Paid"
                                    ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                                    : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                }`}
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

          {activeTab === "schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-schedule-heading">
                SCHEDULE MANAGER
              </h2>
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="bg-[#171717] border border-white/5 p-6 flex flex-wrap items-center justify-between gap-4" data-testid={`row-session-${s.id}`}>
                    {editingSession === s.id ? (
                      <>
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-white font-bold text-sm mb-1">{s.name}</p>
                          <p className="text-neutral-500 text-xs font-mono">{s.ageGroup}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <input
                            value={editDay}
                            onChange={(e) => setEditDay(e.target.value)}
                            className="bg-[#0a0a0a] border border-neutral-700 px-3 py-2 text-sm text-white w-32 focus:outline-none focus:border-amber-500"
                            data-testid={`input-edit-day-${s.id}`}
                          />
                          <input
                            value={editTime}
                            onChange={(e) => setEditTime(e.target.value)}
                            className="bg-[#0a0a0a] border border-neutral-700 px-3 py-2 text-sm text-white w-44 focus:outline-none focus:border-amber-500"
                            data-testid={`input-edit-time-${s.id}`}
                          />
                          <button
                            onClick={() => saveSession(s.id)}
                            className="bg-green-500/20 text-green-400 p-2 hover:bg-green-500/30 transition-colors"
                            data-testid={`button-save-session-${s.id}`}
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingSession(null)}
                            className="bg-neutral-800 text-neutral-400 p-2 hover:bg-neutral-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 min-w-[200px]">
                          <p className="text-white font-bold text-sm">{s.name}</p>
                          <p className="text-neutral-500 text-xs font-mono">{s.ageGroup}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-amber-500 text-sm font-bold">{s.day}</p>
                            <p className="text-neutral-400 text-xs font-mono">{s.time}</p>
                          </div>
                          <button
                            onClick={() => startEditSession(s)}
                            className="bg-white/5 text-neutral-400 p-2 hover:bg-white/10 hover:text-white transition-colors"
                            data-testid={`button-edit-session-${s.id}`}
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "trips" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-trips-heading">
                INTERNATIONAL SCOUTING TRIPS
              </h2>

              <div className="bg-[#171717] border border-white/5 p-6 mb-8">
                <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">
                  ADD NEW TRIP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                      DESTINATION
                    </label>
                    <input
                      value={newTrip.destination}
                      onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="e.g. Barcelona, Spain"
                      data-testid="input-trip-destination"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                      DATES
                    </label>
                    <input
                      value={newTrip.dates}
                      onChange={(e) => setNewTrip({ ...newTrip, dates: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="e.g. July 10-20, 2026"
                      data-testid="input-trip-dates"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                      COST
                    </label>
                    <input
                      value={newTrip.cost}
                      onChange={(e) => setNewTrip({ ...newTrip, cost: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="e.g. $3,500"
                      data-testid="input-trip-cost"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                      DESCRIPTION
                    </label>
                    <input
                      value={newTrip.description}
                      onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Brief description of the trip"
                      data-testid="input-trip-description"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddTrip}
                  className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-400 transition-colors"
                  data-testid="button-add-trip"
                >
                  <Plus size={14} /> ADD TRIP
                </button>
              </div>

              <div className="space-y-4">
                {trips.map((trip) => (
                  <div key={trip.id} className="bg-[#171717] border border-white/5 p-6" data-testid={`card-trip-${trip.id}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white uppercase font-display">
                          {trip.destination}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-amber-500 text-sm font-mono">{trip.dates}</span>
                          <span className="text-neutral-400 text-sm font-bold">{trip.cost}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={16} className="text-amber-500" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 font-display">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    <p className="text-neutral-400 text-sm mb-4">{trip.description}</p>
                    {trip.bookedPlayers.length > 0 && (
                      <div className="border-t border-white/5 pt-4">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 mb-2 font-display">
                          BOOKED PLAYERS
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {trip.bookedPlayers.map((p) => (
                            <span key={p} className="text-xs bg-white/5 text-white px-3 py-1 font-mono">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8" data-testid="text-settings-heading">
                SETTINGS
              </h2>
              <div className="bg-[#171717] border border-white/5 p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-4 font-display">
                    ACADEMY INFO
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                        ACADEMY NAME
                      </label>
                      <div className="bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                        Ginga Soccer Academy
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                        LOCATION
                      </label>
                      <div className="bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                        1197 Unit 5 Union Street, Kitchener, ON
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                        EMAIL
                      </label>
                      <div className="bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                        info@gingasoccer.ca
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2 font-display">
                        HST NUMBER
                      </label>
                      <div className="bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                        818 696 890 RT0001
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <h3 className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-4 font-display">
                    POLICIES
                  </h3>
                  <div className="bg-[#0a0a0a] border border-neutral-700 p-4">
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      <span className="text-amber-500 font-bold">No-Refund Policy:</span> Ginga Soccer has a strict no-refund policy. Upon signing the registration form and committing to a team/program, families are held financially responsible for the entire season/program. All programs require a 6-month minimum commitment.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
