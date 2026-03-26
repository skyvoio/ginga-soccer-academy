import { useLocation } from "wouter";
import { Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function FloatingAdminButton() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated || user?.username !== "admin") return null;

  return (
    <button
      onClick={() => setLocation("/admin")}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-4 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105"
      data-testid="button-floating-admin"
      title="Admin Dashboard"
    >
      <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
      <span className="text-xs font-black uppercase tracking-[0.15em] font-display hidden sm:block">
        Admin
      </span>
    </button>
  );
}
