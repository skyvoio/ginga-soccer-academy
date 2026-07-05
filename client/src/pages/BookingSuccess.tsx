import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function BookingSuccess() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const program = params.get("program") || "";
  const queryClient = useQueryClient();
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const confirmMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest(
        "GET",
        `/api/checkout/confirm?session_id=${sessionId}&program=${encodeURIComponent(program)}`
      );
      return res.json();
    },
    onSuccess: () => {
      setConfirmed(true);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (err: any) => {
      setError(err.message || "Could not confirm enrollment. Please contact info@gingasoccer.ca.");
      setConfirmed(true);
    },
  });

  useEffect(() => {
    if (sessionId && program) {
      confirmMutation.mutate();
    } else {
      setConfirmed(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 flex items-start justify-center">
      <div className="max-w-lg w-full text-center">
        {!confirmed ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-20">
            <Loader2 size={40} className="text-amber-500 animate-spin" />
            <p className="text-neutral-400 font-mono text-sm tracking-wide">CONFIRMING ENROLLMENT...</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="w-24 h-24 mx-auto mb-8 bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <Check className="text-green-500" size={44} />
            </div>

            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-3 font-display">PAYMENT SUCCESSFUL</p>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-display mb-4">
              YOU'RE IN!
            </h1>

            {program && (
              <div className="bg-[#171717] border border-white/5 p-4 mb-6 inline-block">
                <p className="text-xs text-neutral-500 font-mono mb-1">ENROLLED PROGRAM</p>
                <p className="text-amber-500 font-bold uppercase tracking-wide">{program}</p>
              </div>
            )}

            {error ? (
              <p className="text-neutral-400 text-sm mb-8">{error}</p>
            ) : (
              <p className="text-neutral-400 text-sm mb-8">
                Your registration has been confirmed. A confirmation email will be sent shortly.
                Please return your completed registration form to{" "}
                <span className="text-amber-500">info@gingasoccer.ca</span>.
              </p>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
              data-testid="link-back-home"
            >
              BACK TO HOME <ChevronRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
