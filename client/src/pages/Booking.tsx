import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Lock,
  User,
  Shield,
  Star,
  AlertCircle,
  Loader2,
  ExternalLink,
  Heart,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { digitalRegistrationSchema, type DigitalRegistration } from "@shared/schema";

type ProgramCategory = "TRAINING" | "CAMPS" | "RENTALS";

interface Program {
  id: string;
  category: ProgramCategory;
  title: string;
  price: string;
  unitAmount: number;
  details: string;
  isCamp: boolean;
}

const PROGRAMS: Program[] = [
  { id: "p1", category: "TRAINING", title: "Justplay",        price: "$50 + Tax",     unitAmount: 5650,  details: "120m Session",              isCamp: false },
  { id: "p2", category: "TRAINING", title: "Group Session",   price: "$50 + Tax",     unitAmount: 5650,  details: "90m Session",               isCamp: false },
  { id: "p3", category: "TRAINING", title: "Private Session", price: "$175 + Tax",    unitAmount: 19775, details: "2h Session",                 isCamp: false },
  { id: "p4", category: "TRAINING", title: "GingaFit",        price: "$40 + Tax",     unitAmount: 4520,  details: "Tuesdays · 7–8 PM",          isCamp: false },
  { id: "c1", category: "CAMPS",    title: "PD Day Camp",     price: "$150 + Tax",    unitAmount: 16950, details: "May 29 & Jun 26",            isCamp: true  },
  { id: "c2", category: "CAMPS",    title: "Summer Camp",     price: "$500/wk + Tax", unitAmount: 56500, details: "August Weekly Sessions",     isCamp: true  },
  { id: "c3", category: "CAMPS",    title: "Christmas Camp",  price: "$300 + Tax",    unitAmount: 33900, details: "Dec 28-30 | 3 Days",         isCamp: true  },
  { id: "r1", category: "RENTALS",  title: "Full Turf Rental",price: "$150/hr",        unitAmount: 15000, details: "Full Pitch Access",          isCamp: false },
  { id: "r2", category: "RENTALS",  title: "3/4 Turf Rental", price: "$100/hr",        unitAmount: 10000, details: "Three-Quarter Pitch",        isCamp: false },
  { id: "r3", category: "RENTALS",  title: "Mini Turf Rental",price: "$70/hr",         unitAmount: 7000,  details: "Mini Pitch",                 isCamp: false },
];

const CATEGORY_LABELS: Record<ProgramCategory, string> = {
  TRAINING: "Training Programs",
  CAMPS: "Camps",
  RENTALS: "Turf Rentals",
};

// ── Shared form field styles ────────────────────────────────────────────────
const fieldClass =
  "w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600";
const labelClass =
  "block text-[10px] font-bold tracking-[0.18em] text-neutral-500 uppercase mb-1.5 font-display";
const errorClass = "mt-1 text-xs text-red-400 font-mono";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className={errorClass}>{msg}</p>;
}

function FormSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/5">
        <Icon size={14} className="text-amber-500" />
        <h5 className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase font-display">
          {title}
        </h5>
      </div>
      {children}
    </div>
  );
}

// ── Step indicator ──────────────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ["SELECT", "REGISTER", "CHECKOUT", "ENROLLED"];
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

// ── Player card ─────────────────────────────────────────────────────────────
function PlayerCard({
  username,
  enrolledProgram,
}: {
  username: string;
  enrolledProgram?: string | null;
}) {
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
          {enrolledProgram && (
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">
              Enrolled: {enrolledProgram}
            </p>
          )}
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1 text-amber-500">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function Booking() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProgramCategory | "ALL">("ALL");

  const { data: stripeStatus } = useQuery<{ connected: boolean }>({
    queryKey: ["/api/stripe/status"],
  });

  // ── React Hook Form ────────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DigitalRegistration>({
    resolver: zodResolver(digitalRegistrationSchema),
    defaultValues: { program: selectedProgram?.title ?? "" },
  });

  // ── Mutations ──────────────────────────────────────────────────────────────
  const registrationMutation = useMutation({
    mutationFn: async (data: DigitalRegistration) => {
      const res = await apiRequest("POST", "/api/registrations", data);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Registration failed. Please try again.");
      }
      return res.json();
    },
    onSuccess: () => {
      setFormSubmitted(true);
      setSubmitError("");
    },
    onError: (err: any) => {
      setSubmitError(err.message || "Registration failed. Please try again.");
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (program: Program) => {
      const res = await apiRequest("POST", "/api/checkout", {
        programId: program.id,
        programName: program.title,
        unitAmount: program.unitAmount,
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: (err: any) => {
      setCheckoutError(err.message || "Failed to start checkout. Please try again.");
    },
  });

  // ── Handlers ───────────────────────────────────────────────────────────────
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    setFormSubmitted(false);
    setSubmitError("");
    setCheckoutError("");
    reset({ program: program.title });
    setStep(2);
    setTimeout(() => setStep(3), 1000);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedProgram(null);
    setFormSubmitted(false);
    setSubmitError("");
    setCheckoutError("");
    reset();
  };

  const onFormSubmit = (data: DigitalRegistration) => {
    if (!selectedProgram) return;
    registrationMutation.mutate({ ...data, program: selectedProgram.title });
  };

  const handleCheckout = () => {
    if (!selectedProgram) return;
    setCheckoutError("");
    checkoutMutation.mutate(selectedProgram);
  };

  const filteredPrograms =
    activeCategory === "ALL"
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCategory);

  const categories: Array<ProgramCategory | "ALL"> = [
    "ALL",
    "TRAINING",
    "CAMPS",
    "RENTALS",
  ];

  // Step-indicator current position
  const indicatorStep =
    step <= 2 ? 1 : formSubmitted ? 3 : 2;

  // ── Auth guard ─────────────────────────────────────────────────────────────
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
          <PlayerCard
            username={user?.username || "PLAYER"}
            enrolledProgram={(user as any)?.enrolledProgram}
          />
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

        <StepIndicator current={indicatorStep} total={4} />

        <AnimatePresence mode="wait">
          {/* ── Step 1: Program selection ───────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-amber-500 text-black"
                        : "bg-[#171717] text-neutral-400 border border-white/5 hover:text-white hover:border-white/20"
                    }`}
                    data-testid={`button-category-${cat.toLowerCase()}`}
                  >
                    {cat === "ALL" ? "All Programs" : CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPrograms.map((program) => (
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

          {/* ── Step 2: Loading ─────────────────────────────────────────────── */}
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

          {/* ── Step 3: Registration form + Checkout ────────────────────────── */}
          {step === 3 && selectedProgram && (
            <motion.div
              key="step3"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="mb-6 text-neutral-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors"
                data-testid="button-back"
              >
                <ChevronLeft size={16} /> Back to Selection
              </button>

              {/* Program header */}
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
                  <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 border border-white/10 px-3 py-1.5 font-display">
                    {selectedProgram.category}
                  </span>
                </div>

                {/* ── Digital Registration Form ─────────────────────────────── */}
                {!formSubmitted ? (
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6 font-display">
                      STEP 1 — REGISTRATION FORM
                    </h4>

                    {submitError && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                        <AlertCircle
                          size={16}
                          className="text-red-400 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-red-400 text-sm">{submitError}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                      {/* Player Info */}
                      <FormSection icon={User} title="Player Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className={labelClass}>First Name *</label>
                            <input
                              {...register("playerFirstName")}
                              className={fieldClass}
                              placeholder="e.g. Marcus"
                              data-testid="input-player-first-name"
                            />
                            <FieldError msg={errors.playerFirstName?.message} />
                          </div>
                          <div>
                            <label className={labelClass}>Last Name *</label>
                            <input
                              {...register("playerLastName")}
                              className={fieldClass}
                              placeholder="e.g. Silva"
                              data-testid="input-player-last-name"
                            />
                            <FieldError msg={errors.playerLastName?.message} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>Date of Birth *</label>
                            <input
                              type="date"
                              {...register("playerDob")}
                              className={fieldClass}
                              data-testid="input-player-dob"
                            />
                            <FieldError msg={errors.playerDob?.message} />
                          </div>
                          <div>
                            <label className={labelClass}>Gender *</label>
                            <select
                              {...register("playerGender")}
                              className={fieldClass}
                              data-testid="select-player-gender"
                            >
                              <option value="">Select gender…</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Non-binary">Non-binary</option>
                              <option value="Prefer not to say">
                                Prefer not to say
                              </option>
                            </select>
                            <FieldError msg={errors.playerGender?.message} />
                          </div>
                        </div>
                      </FormSection>

                      {/* Medical Info */}
                      <FormSection icon={Heart} title="Medical Information">
                        <div>
                          <label className={labelClass}>
                            Medical Conditions or Allergies{" "}
                            <span className="text-neutral-600 normal-case tracking-normal font-normal font-mono">
                              (Optional)
                            </span>
                          </label>
                          <textarea
                            {...register("medicalNotes")}
                            rows={3}
                            className={`${fieldClass} resize-none`}
                            placeholder="List any allergies, medical conditions, medications, or special requirements our coaches should know about…"
                            data-testid="textarea-medical-notes"
                          />
                          <FieldError msg={errors.medicalNotes?.message} />
                          <p className="mt-2 text-[11px] text-neutral-600 font-mono">
                            This information is kept confidential and shared only
                            with coaching staff.
                          </p>
                        </div>
                      </FormSection>

                      {/* Parent / Guardian Info */}
                      <FormSection icon={Users} title="Parent / Guardian Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className={labelClass}>First Name *</label>
                            <input
                              {...register("parentFirstName")}
                              className={fieldClass}
                              placeholder="e.g. Ana"
                              data-testid="input-parent-first-name"
                            />
                            <FieldError msg={errors.parentFirstName?.message} />
                          </div>
                          <div>
                            <label className={labelClass}>Last Name *</label>
                            <input
                              {...register("parentLastName")}
                              className={fieldClass}
                              placeholder="e.g. Silva"
                              data-testid="input-parent-last-name"
                            />
                            <FieldError msg={errors.parentLastName?.message} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className={labelClass}>Email *</label>
                            <input
                              type="email"
                              {...register("parentEmail")}
                              className={fieldClass}
                              placeholder="parent@email.com"
                              data-testid="input-parent-email"
                            />
                            <FieldError msg={errors.parentEmail?.message} />
                          </div>
                          <div>
                            <label className={labelClass}>Phone Number *</label>
                            <input
                              type="tel"
                              {...register("parentPhone")}
                              className={fieldClass}
                              placeholder="e.g. (519) 555-0100"
                              data-testid="input-parent-phone"
                            />
                            <FieldError msg={errors.parentPhone?.message} />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Home Address *</label>
                          <input
                            {...register("parentAddress")}
                            className={fieldClass}
                            placeholder="e.g. 123 Main St, Kitchener, ON N2G 1A1"
                            data-testid="input-parent-address"
                          />
                          <FieldError msg={errors.parentAddress?.message} />
                        </div>
                      </FormSection>

                      <button
                        type="submit"
                        disabled={isSubmitting || registrationMutation.isPending}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-submit-registration"
                      >
                        {registrationMutation.isPending ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            SUBMITTING…
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            SUBMIT REGISTRATION — CONTINUE TO PAYMENT
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Registration submitted — show confirmation banner */
                  <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 flex items-start gap-3">
                    <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-400 text-sm font-bold">
                        Registration submitted!
                      </p>
                      <p className="text-green-400/70 text-xs mt-0.5">
                        Your details have been saved. Complete payment below to
                        secure your spot.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Checkout (revealed after form submission) ─────────────── */}
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 font-display">
                      STEP 2 — SECURE PAYMENT
                    </h4>

                    {checkoutError && (
                      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                        <AlertCircle
                          size={16}
                          className="text-red-400 flex-shrink-0 mt-0.5"
                        />
                        <p
                          className="text-red-400 text-sm"
                          data-testid="text-checkout-error"
                        >
                          {checkoutError}
                        </p>
                      </div>
                    )}

                    <div className="p-6 border border-neutral-700 bg-[#0a0a0a]">
                      <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-amber-500" size={20} />
                        <div>
                          <p className="text-white font-bold text-sm">
                            Secure Checkout
                          </p>
                          <p className="text-neutral-500 text-xs">
                            {stripeStatus?.connected
                              ? "Powered by Stripe — 256-bit SSL encrypted"
                              : "Payment processing via Stripe"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6 p-4 bg-[#171717] border border-white/5">
                        <div>
                          <p className="text-xs text-neutral-500 font-mono">
                            PROGRAM
                          </p>
                          <p className="text-white font-bold">
                            {selectedProgram.title}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 font-mono">
                            TOTAL
                          </p>
                          <p className="text-amber-500 font-bold text-lg">
                            {selectedProgram.price}
                          </p>
                        </div>
                      </div>

                      {stripeStatus?.connected ? (
                        <>
                          <button
                            onClick={handleCheckout}
                            disabled={checkoutMutation.isPending}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            data-testid="button-pay"
                          >
                            {checkoutMutation.isPending ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />{" "}
                                REDIRECTING TO CHECKOUT...
                              </>
                            ) : (
                              <>
                                <ExternalLink size={16} /> PAY{" "}
                                {selectedProgram.price} — STRIPE CHECKOUT
                              </>
                            )}
                          </button>
                          <p className="text-[10px] text-neutral-600 mt-3 text-center italic">
                            Strict No-Refund Policy — High Performance Commitment
                          </p>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <div className="flex items-center gap-3 mb-4 p-4 bg-amber-500/5 border border-amber-500/20">
                            <CreditCard
                              className="text-amber-500 flex-shrink-0"
                              size={20}
                            />
                            <div className="text-left">
                              <p className="text-white font-bold text-sm">
                                Online Payments Coming Soon
                              </p>
                              <p className="text-neutral-400 text-xs mt-1">
                                Contact us directly to complete your registration
                                and payment.
                              </p>
                            </div>
                          </div>
                          <a
                            href={`mailto:info@gingasoccer.ca?subject=Registration: ${selectedProgram.title}&body=Hi, I'd like to register for ${selectedProgram.title} (${selectedProgram.price}).`}
                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                            data-testid="button-email-register"
                          >
                            EMAIL TO REGISTER <ChevronRight size={16} />
                          </a>
                          <p className="text-[10px] text-neutral-600 mt-3 text-center italic">
                            Strict No-Refund Policy — High Performance Commitment
                          </p>
                        </div>
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
