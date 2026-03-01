import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Download,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Lock,
  User,
  Shield,
  Star,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type ProgramCategory = "TRAINING" | "CAMPS" | "RENTALS";

interface Program {
  id: string;
  category: ProgramCategory;
  title: string;
  price: string;
  details: string;
  isCamp: boolean;
}

const PROGRAMS: Program[] = [
  { id: "p1", category: "TRAINING", title: "Private Session", price: "$175 + tax", details: "120 Min | 1-on-1 Coaching", isCamp: false },
  { id: "p2", category: "TRAINING", title: "Group Session", price: "$50 + tax", details: "90 Min | Small Group Tactics", isCamp: false },
  { id: "p3", category: "TRAINING", title: "Just Play", price: "$50 + tax", details: "120 Min | Sundays Only", isCamp: false },
  { id: "p4", category: "TRAINING", title: "GingaMax Speed", price: "$50 + tax", details: "Powered by Maximus", isCamp: false },
  { id: "c1", category: "CAMPS", title: "March Break Camp", price: "$500", details: "March 11-15 | Intensive", isCamp: true },
  { id: "c2", category: "CAMPS", title: "Summer Camp", price: "$500/wk", details: "July & September", isCamp: true },
  { id: "c3", category: "CAMPS", title: "December Camp", price: "$500", details: "December Break", isCamp: true },
  { id: "r1", category: "RENTALS", title: "Full Turf Rental", price: "$150/hr", details: "Full Pitch Access", isCamp: false },
  { id: "r2", category: "RENTALS", title: "3/4 Turf Rental", price: "$100/hr", details: "Three-Quarter Pitch", isCamp: false },
  { id: "r3", category: "RENTALS", title: "Mini Turf Rental", price: "$70/hr", details: "Mini Pitch", isCamp: false },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["SELECT", "VERIFY", "REGISTER", "PAYMENT"];
  return (
    <div className="flex gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1">
          <div
            className={`h-1 transition-all duration-500 mb-2 ${
              i + 1 <= current ? "bg-amber-500" : "bg-neutral-800"
            }`}
          />
          <p
            className={`text-[10px] font-bold tracking-[0.15em] font-display ${
              i + 1 <= current ? "text-amber-500" : "text-neutral-600"
            }`}
          >
            {labels[i]}
          </p>
        </div>
      ))}
    </div>
  );
}

function PlayerCard({ username }: { username: string }) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-amber-500/20 p-6 mb-10">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
          <User size={24} className="text-black" />
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-amber-500 font-display mb-1">
            ACADEMY MEMBER
          </p>
          <p className="text-white font-bold text-lg uppercase font-display">
            {username}
          </p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1 text-amber-500">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} fill="currentColor" />
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[10px] text-neutral-500 font-mono">SKILL</p>
          <p className="text-white font-bold text-sm">87</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-500 font-mono">SESSIONS</p>
          <p className="text-white font-bold text-sm">12</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-500 font-mono">LEVEL</p>
          <p className="text-white font-bold text-sm">ELITE</p>
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [confirmationId] = useState(
    `REQ-${Math.floor(Math.random() * 9000) + 1000}`
  );

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setStep(2);
    setTimeout(() => setStep(3), 1200);
  };

  const handleDownload = () => {
    setTimeout(() => setHasDownloaded(true), 800);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentComplete(true);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neutral-800 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-[#171717] border border-white/10 flex items-center justify-center">
              <Lock className="text-amber-500" size={32} />
            </div>
            <h2
              className="text-4xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-auth-required"
            >
              MEMBERS ONLY
            </h2>
            <p className="text-neutral-400 mt-4 mb-10">
              You must be logged in to access the booking system. Create an
              account or log in to reserve your spot.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
              data-testid="link-booking-login"
            >
              LOGIN TO CONTINUE <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PlayerCard username={user?.username || "PLAYER"} />

          <div className="mb-10">
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white font-display"
              data-testid="text-booking-title"
            >
              RESERVE YOUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                SPOT
              </span>
            </h2>
            <p className="text-neutral-400 mt-2 font-mono text-sm">
              SECURE YOUR PLACE ON THE PITCH.
            </p>
          </div>
        </motion.div>

        <StepIndicator current={step} total={4} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROGRAMS.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => handleProgramSelect(program)}
                    className="group relative bg-[#171717] border border-white/5 p-8 text-left transition-all duration-300 hover:border-amber-500/30"
                    data-testid={`button-select-${program.id}`}
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-amber-500 text-black p-1">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-500 mb-3 block tracking-[0.2em] font-display">
                      {program.category}
                    </span>
                    <h3 className="text-xl font-bold uppercase text-white mb-1 group-hover:text-amber-500 transition-colors font-display">
                      {program.title}
                    </h3>
                    <p className="text-2xl font-light text-white mb-4">
                      {program.price}
                    </p>
                    <div className="border-t border-white/5 pt-4 mt-4">
                      <p className="text-xs text-neutral-400 font-mono flex items-center gap-2">
                        <Calendar size={12} /> {program.details}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-neutral-800 border-t-amber-500 rounded-full animate-spin mb-6" />
              <p className="font-mono text-sm text-neutral-400 tracking-wide">
                CHECKING AVAILABILITY...
              </p>
            </motion.div>
          )}

          {(step === 3 || step === 4) && selectedProgram && (
            <motion.div
              key="step3-4"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedProgram(null);
                  setHasDownloaded(false);
                  setPaymentComplete(false);
                }}
                className="mb-6 text-neutral-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors"
                data-testid="button-back"
              >
                <ChevronLeft size={16} /> Back to Selection
              </button>

              <div className="bg-[#171717] border border-white/5 p-8 md:p-12">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8 border-b border-white/5 pb-8">
                  <div>
                    <h3
                      className="text-2xl font-bold uppercase text-white font-display"
                      data-testid="text-selected-program"
                    >
                      {selectedProgram.title}
                    </h3>
                    <p className="text-amber-500 font-mono mt-1">
                      {selectedProgram.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-neutral-500 font-mono">
                      CONFIRMATION ID
                    </p>
                    <p className="text-sm text-white font-mono">
                      {confirmationId}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 font-display">
                    STEP 1: REGISTRATION DOSSIER
                  </h4>
                  <div
                    className={`p-6 border transition-colors duration-300 ${
                      hasDownloaded
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-neutral-700 bg-[#0a0a0a]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-white font-bold">
                          {selectedProgram.isCamp
                            ? "2026 Camp Application"
                            : "Official 2026 Academy Registration"}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          PDF Document
                        </p>
                      </div>
                      {!hasDownloaded ? (
                        <button
                          onClick={handleDownload}
                          className="bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] hover:bg-amber-500 transition-colors flex items-center gap-2"
                          data-testid="button-download"
                        >
                          <Download size={14} /> Download
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase">
                          <Check size={14} /> Downloaded
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-4 italic">
                      Please complete and return to info@gingasoccer.ca to
                      finalize placement.
                    </p>
                  </div>
                </div>

                {hasDownloaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 font-display">
                      STEP 2: SECURE PAYMENT
                    </h4>
                    <div className="p-6 border border-neutral-700 bg-[#0a0a0a]">
                      {!paymentComplete ? (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-amber-500" size={20} />
                            <div>
                              <p className="text-white font-bold text-sm">
                                Secure Payment Portal
                              </p>
                              <p className="text-neutral-500 text-xs">
                                256-bit SSL encrypted
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4 mb-6">
                            <div>
                              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2">
                                Card Number
                              </label>
                              <div className="bg-[#171717] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                                4242 4242 4242 4242
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2">
                                  Expiry
                                </label>
                                <div className="bg-[#171717] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                                  12/28
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] block mb-2">
                                  CVC
                                </label>
                                <div className="bg-[#171717] border border-neutral-700 px-4 py-3 text-sm text-neutral-400 font-mono">
                                  ***
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={handlePayment}
                            disabled={paymentProcessing}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            data-testid="button-pay"
                          >
                            {paymentProcessing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                PROCESSING...
                              </>
                            ) : (
                              <>
                                <CreditCard size={16} />
                                PAY {selectedProgram.price}
                              </>
                            )}
                          </button>
                          <p className="text-[10px] text-neutral-600 mt-3 text-center italic">
                            Strict No-Refund Policy — High Performance
                            Commitment
                          </p>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8"
                        >
                          <div className="w-16 h-16 mx-auto mb-6 bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                            <Check className="text-green-500" size={32} />
                          </div>
                          <h3
                            className="text-2xl font-black text-white uppercase tracking-tight font-display"
                            data-testid="text-payment-success"
                          >
                            BOOKING CONFIRMED
                          </h3>
                          <p className="text-neutral-400 mt-2 text-sm">
                            Confirmation #{confirmationId}
                          </p>
                          <p className="text-neutral-500 mt-4 text-xs">
                            A confirmation email will be sent to your registered
                            address.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
