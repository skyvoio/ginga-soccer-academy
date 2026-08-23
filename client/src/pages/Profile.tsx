import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Mail, Phone, AlertCircle, Save, Check, LogOut, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [, setLocation] = useLocation();
  const qc = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        emergencyContact: user.emergencyContact ?? "",
      });
    }
  }, [user]);

  const updateProfile = useMutation({
    mutationFn: async (data: typeof form) => {
      const res = await apiRequest("PUT", "/api/auth/user", data);
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Failed to update profile");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setSaved(true);
      setError(null);
      setTimeout(() => setSaved(false), 2500);
    },
    onError: (err: any) => {
      setError(err.message || "Something went wrong");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neutral-800 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-40 pb-20 px-6 flex items-start justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter font-display mb-4">
            SIGN IN REQUIRED
          </h2>
          <p className="text-neutral-400 mb-8">You must be logged in to view your profile.</p>
          <button
            onClick={() => setLocation("/login")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-3 font-bold uppercase tracking-[0.15em] text-sm"
          >
            GO TO LOGIN
          </button>
        </motion.div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600";
  const labelClass =
    "text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display";

  const isDirty =
    form.name !== (user?.name ?? "") ||
    form.email !== (user?.email ?? "") ||
    form.phone !== (user?.phone ?? "") ||
    form.emergencyContact !== (user?.emergencyContact ?? "");

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase mb-2 font-display">
                MY ACCOUNT
              </p>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter font-display leading-none">
                PROFILE
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-2">
              {user?.isAdmin && (
                <button
                  onClick={() => setLocation("/admin")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                >
                  <ShieldCheck size={14} />
                  ADMIN
                </button>
              )}
              <button
                onClick={async () => { await logout.mutateAsync(); setLocation("/"); }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-neutral-500 border border-neutral-700 hover:text-red-400 hover:border-red-400/40 transition-colors"
                data-testid="button-profile-logout"
              >
                <LogOut size={14} />
                LOGOUT
              </button>
            </div>
          </div>

          {/* Identity card */}
          <div className="bg-[#171717] border border-white/5 p-6 mb-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-black text-xl flex-shrink-0">
              {(user?.name ?? user?.username ?? "?")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-lg leading-tight truncate">
                {user?.name || user?.username}
              </p>
              <p className="text-neutral-500 text-xs font-mono mt-0.5">@{user?.username}</p>
              {user?.enrolledProgram && (
                <span className="inline-block mt-2 text-[10px] font-bold tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-400">
                  ENROLLED — {user.enrolledProgram.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Edit form */}
          <div className="bg-[#171717] border border-white/5 p-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase mb-6 font-display">
              PERSONAL INFORMATION
            </h2>

            {error && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 mb-6">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className={labelClass}>FULL NAME</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass} pl-9`}
                    placeholder="Your full name"
                    maxLength={80}
                    data-testid="input-profile-name"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email"
                    className={`${inputClass} pl-9`}
                    placeholder="you@example.com"
                    data-testid="input-profile-email"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>PHONE NUMBER</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    type="tel"
                    className={`${inputClass} pl-9`}
                    placeholder="+1 (519) 000-0000"
                    maxLength={30}
                    data-testid="input-profile-phone"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>EMERGENCY CONTACT</label>
                <div className="relative">
                  <AlertCircle size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                  <input
                    value={form.emergencyContact}
                    onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                    className={`${inputClass} pl-9`}
                    placeholder="Name and phone number"
                    maxLength={120}
                    data-testid="input-profile-emergency"
                  />
                </div>
                <p className="text-neutral-600 text-[11px] font-mono mt-2">
                  Used only in case of emergency during training sessions.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => updateProfile.mutate(form)}
                disabled={updateProfile.isPending || !isDirty}
                className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                  saved
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : isDirty
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:opacity-90"
                    : "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                }`}
                data-testid="button-profile-save"
              >
                {updateProfile.isPending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    SAVING…
                  </>
                ) : saved ? (
                  <><Check size={14} /> SAVED</>
                ) : (
                  <><Save size={14} /> SAVE CHANGES</>
                )}
              </button>
              {isDirty && !updateProfile.isPending && (
                <button
                  onClick={() => {
                    setForm({
                      name: user?.name ?? "",
                      email: user?.email ?? "",
                      phone: user?.phone ?? "",
                      emergencyContact: user?.emergencyContact ?? "",
                    });
                    setError(null);
                  }}
                  className="text-xs font-bold uppercase tracking-[0.1em] text-neutral-600 hover:text-neutral-400 transition-colors"
                  data-testid="button-profile-discard"
                >
                  DISCARD
                </button>
              )}
            </div>
          </div>

          {/* Username note */}
          <p className="text-neutral-700 text-[11px] font-mono mt-6 text-center">
            Username cannot be changed — contact info@gingasoccer.ca for help.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
