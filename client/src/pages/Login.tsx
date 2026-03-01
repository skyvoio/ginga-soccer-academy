import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { User, Lock, ChevronRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, register, isAuthenticated } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    setLocation("/booking");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      if (isRegister) {
        await register.mutateAsync({ username: username.trim(), password });
      } else {
        await login.mutateAsync({ username: username.trim(), password });
      }
      setLocation("/booking");
    } catch (err: any) {
      setError(
        isRegister
          ? "Registration failed. Username may already be taken."
          : "Invalid username or password."
      );
    }
  };

  const isPending = login.isPending || register.isPending;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rotate-45">
            <div className="w-full h-full flex items-center justify-center -rotate-45">
              <User size={28} className="text-black" />
            </div>
          </div>
          <h1
            className="text-4xl font-black text-white uppercase tracking-tighter font-display"
            data-testid="text-login-title"
          >
            {isRegister ? "JOIN THE ACADEMY" : "WELCOME BACK"}
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            {isRegister
              ? "Create your academy account to get started."
              : "Log in to access your member dashboard."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#171717] border border-white/5 p-8 md:p-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3"
              >
                <AlertCircle
                  size={16}
                  className="text-red-400 flex-shrink-0 mt-0.5"
                />
                <p
                  className="text-red-400 text-sm"
                  data-testid="text-login-error"
                >
                  {error}
                </p>
              </motion.div>
            )}

            <div className="mb-6">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-3 font-display">
                USERNAME
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-neutral-700 pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                  placeholder="Enter your username"
                  data-testid="input-username"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-3 font-display">
                PASSWORD
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-neutral-700 pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                  placeholder="Enter your password"
                  data-testid="input-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              data-testid="button-submit-login"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {isRegister ? "CREATING ACCOUNT..." : "SIGNING IN..."}
                </>
              ) : (
                <>
                  {isRegister ? "CREATE ACCOUNT" : "SIGN IN"}
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-neutral-500 text-sm hover:text-amber-500 transition-colors"
            data-testid="button-toggle-register"
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Create one"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
