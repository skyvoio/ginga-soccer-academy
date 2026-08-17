import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Zap,
  Shield,
  Dumbbell,
  Flame,
  Calendar,
  Users,
  Clock,
  Mail,
  Activity,
  Wind,
  Heart,
  Star,
} from "lucide-react";

const pillars = [
  {
    icon: Zap,
    label: "SPEED",
    title: "Speed & Sprinting",
    description:
      "Explosive sprint mechanics, fast feet drills, and acceleration work to make every athlete faster — on the pitch and beyond.",
  },
  {
    icon: Shield,
    label: "AGILITY & CO-ORDINATION",
    title: "Agility, Balance & Co-ordination",
    description:
      "Multi-directional movement, balance challenges, and co-ordination patterns that sharpen body control and reaction time.",
  },
  {
    icon: Dumbbell,
    label: "STRENGTH & FLEXIBILITY",
    title: "Strength, Core & Flexibility",
    description:
      "Push-ups, sit-ups, squats, core circuits, and mobility work that build athletic power and keep athletes injury-free all season.",
  },
];

const activities = [
  { icon: Wind, label: "Fast Feet Work" },
  { icon: Activity, label: "Agility" },
  { icon: Star, label: "Co-ordination" },
  { icon: Heart, label: "Flexibility" },
  { icon: Zap, label: "Sprinting" },
  { icon: Dumbbell, label: "Push-ups / Sit-ups / Core Work / Squats" },
  { icon: Shield, label: "Balance Work" },
  { icon: Flame, label: "Fun Games" },
];

export default function GingaFit() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20">

      {/* HERO */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('/gingafit-hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-block mb-6 px-4 py-2 border border-amber-500/30 bg-amber-500/5">
              <p className="text-amber-500 text-[10px] font-bold tracking-[0.3em] font-display uppercase">
                YOUTH ATHLETIC CONDITIONING
              </p>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter font-display leading-[0.9]"
              data-testid="text-gingafit-title"
            >
              GINGA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                FIT
              </span>
            </h1>

            <p className="mt-4 text-2xl md:text-3xl font-bold uppercase tracking-wide font-display text-amber-500">
              Speed · Strength · Co-ordination · Power · Flexibility
            </p>

            <p className="mt-6 text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Built to improve the overall level of speed, strength, co-ordination,
              power, flexibility and confidence — for the first 24 athletes who sign up.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-mono">
              <span className="flex items-center gap-2 text-neutral-500">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                $40 + tax
              </span>
              <span className="flex items-center gap-2 text-neutral-500">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Tuesdays · 7:00 PM – 8:00 PM
              </span>
              <span className="flex items-center gap-2 text-neutral-500">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                Limited to 24 athletes
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                data-testid="link-gingafit-cta"
              >
                SECURE YOUR SPOT <ChevronRight size={18} />
              </Link>
              <a
                href="mailto:info@gingasoccer.ca"
                className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-amber-500 transition-colors"
              >
                <Mail size={14} />
                info@gingasoccer.ca
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCHEDULE BANNER */}
      <section className="py-8 px-6 border-y border-amber-500/10 bg-amber-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            {[
              { label: "DAY", value: "Tuesday" },
              { label: "TIME", value: "7:00 – 8:00 PM" },
              { label: "STARTS", value: "Jul 28, 2026" },
              { label: "ENDS", value: "Dec 15, 2026" },
              { label: "SESSIONS", value: "15–16 total" },
              { label: "CAPACITY", value: "24 athletes" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 font-display mb-1">
                  {item.label}
                </p>
                <p className="text-amber-500 font-bold text-sm font-mono">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              PROGRAM FOCUS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display">
              THREE PILLARS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group"
              >
                <div className="relative bg-[#171717] border border-white/5 p-10 transition-all duration-500 hover:border-amber-500/30 h-full">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <pillar.icon
                    size={36}
                    strokeWidth={1.5}
                    className="text-amber-500 mb-6"
                  />
                  <p className="text-amber-500 text-xs font-bold tracking-[0.2em] mb-2 font-display">
                    {pillar.label}
                  </p>
                  <h3 className="text-xl font-black text-white mb-4 font-display uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S IN EVERY SESSION */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              EVERY TUESDAY
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display">
              WHAT'S IN EVERY SESSION
            </h2>
            <p className="mt-4 text-neutral-500 text-sm max-w-xl leading-relaxed">
              Each 60-minute session is packed with purposeful work. The ball may make
              occasional appearances — but this is pure athletic conditioning first.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="group flex items-center gap-4 bg-[#141414] border border-white/5 px-6 py-5 hover:border-amber-500/25 transition-all duration-300">
                  <div className="w-8 h-8 bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors duration-300">
                    <activity.icon size={16} className="text-amber-500" />
                  </div>
                  <p className="text-white text-sm font-semibold font-display uppercase tracking-wide leading-tight">
                    {activity.label}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Ball note card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: activities.length * 0.08 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <div className="flex items-start gap-4 bg-amber-500/5 border border-amber-500/15 px-6 py-5">
                <div className="w-1 self-stretch bg-amber-500 rounded-full flex-shrink-0" />
                <p className="text-neutral-400 text-sm leading-relaxed">
                  <span className="text-amber-400 font-semibold">Note on the ball:</span>{" "}
                  The ball will be introduced occasionally but not often — the focus is
                  pure athleticism. Players who improve their speed, strength, and
                  co-ordination become better footballers automatically.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROGRAM BASIS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
                THE FOUNDATION
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display leading-tight">
                THE BASIS OF<br />GINGAFIT
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                The basis is to{" "}
                <span className="text-amber-400 font-semibold">
                  improve the level of overall speed, strength, co-ordination,
                  power, flexibility and confidence.
                </span>
              </p>
              <p className="text-neutral-400 text-base leading-relaxed">
                The program will take the first <span className="text-white font-semibold">24 kids</span> interested.
                Sessions run every Tuesday from <span className="text-white font-semibold">July 28</span> through{" "}
                <span className="text-white font-semibold">December 15, 2026</span> — with August fully excluded.
                That's <span className="text-white font-semibold">15–16 sessions</span> of focused athletic development.
              </p>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { value: "24", label: "Max Athletes" },
              { value: "15–16", label: "Total Sessions" },
              { value: "60", label: "Minutes Per Session" },
              { value: "$40", label: "Per Session + Tax" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0a0a0a] px-8 py-10 text-center">
                <p className="text-4xl font-black text-amber-500 font-display mb-2">
                  {stat.value}
                </p>
                <p className="text-xs font-bold tracking-[0.15em] text-neutral-500 font-display uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE: August excluded */}
      <section className="py-10 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex items-start gap-4">
          <div className="w-1 self-stretch bg-amber-500 rounded-full flex-shrink-0" />
          <p className="text-neutral-500 text-sm leading-relaxed">
            <span className="text-white font-semibold">Note on schedule:</span>{" "}
            Sessions run every Tuesday from July 28 through December 15, 2026. August
            is fully excluded — the program resumes in September and continues
            through to the end of the fall season. Total of 15–16 sessions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-display">
              READY TO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                LEVEL UP?
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto">
              Spots are strictly capped at 24 athletes. Once it's full, it's
              full — secure your place in the GingaFit program now.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-12 py-5 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
                data-testid="link-gingafit-enroll"
              >
                ENROLL NOW <ChevronRight size={18} />
              </Link>
              <a
                href="mailto:info@gingasoccer.ca?subject=GingaFit Inquiry"
                className="inline-flex items-center gap-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 px-8 py-5 text-sm font-mono tracking-wide transition-all duration-300"
              >
                <Mail size={14} />
                info@gingasoccer.ca
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
