import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Shield, Dumbbell, Flame, Calendar, Users, Clock, Mail } from "lucide-react";

const GOLD = "#C5A059";

const pillars = [
  {
    icon: Zap,
    label: "SPEED",
    title: "Fast Feet & Sprinting Speed",
    description:
      "Explosive sprint mechanics, acceleration drills, and fast-twitch muscle activation to make every player faster on the pitch.",
  },
  {
    icon: Shield,
    label: "AGILITY",
    title: "Agility, Balance & Coordination",
    description:
      "Ladder work, cone patterns, and reactive agility training that sharpens footwork and body control under pressure.",
  },
  {
    icon: Dumbbell,
    label: "POWER",
    title: "Core Strength, Power & Flexibility",
    description:
      "Functional strength circuits and mobility routines that build athletic power and keep players injury-free all season.",
  },
];

const features = [
  {
    icon: Flame,
    title: "HIGH-ENERGY GAMES",
    description:
      "Fun, competitive games woven into every session — with occasional ball work to make conditioning feel like play.",
  },
  {
    icon: Calendar,
    title: "15–16 SESSIONS",
    description:
      "Tuesdays, July 28 – Dec 15. August is excluded. Consistent weekly programming that builds compounding results.",
  },
  {
    icon: Users,
    title: "MAX 24 ATHLETES",
    description:
      "Strictly limited capacity ensures every player gets meaningful coaching attention and personalized feedback.",
  },
  {
    icon: Clock,
    title: "ONE HOUR, FULL EFFORT",
    description:
      "7:00 PM – 8:00 PM every Tuesday. Designed to be intense, efficient, and incomparably effective.",
  },
];

export default function GingaFit() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20">

      {/* HERO */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="inline-block mb-6 px-4 py-2"
              style={{ border: `1px solid ${GOLD}40`, background: `${GOLD}08` }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.3em] font-display uppercase"
                style={{ color: GOLD }}
              >
                YOUTH ATHLETIC CONDITIONING
              </p>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter font-display leading-[0.9]"
              data-testid="text-gingafit-title"
            >
              GINGA
              <span
                className="font-black"
                style={{ color: GOLD }}
              >
                FIT
              </span>
            </h1>

            <p
              className="mt-4 text-2xl md:text-3xl font-bold uppercase tracking-wide font-display"
              style={{ color: GOLD }}
            >
              Build Speed, Power &amp; Agility
            </p>

            <p className="mt-6 text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Designed to elevate every player's athleticism, overall fitness,
              and confidence on and off the pitch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-mono">
              <span className="flex items-center gap-2 text-neutral-400">
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                $40 + tax per session
              </span>
              <span className="flex items-center gap-2 text-neutral-400">
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                Tuesdays · 7:00 PM – 8:00 PM
              </span>
              <span className="flex items-center gap-2 text-neutral-400">
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                Limited to 24 athletes
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300"
                style={{ background: GOLD }}
                data-testid="link-gingafit-cta"
              >
                SECURE YOUR SPOT <ChevronRight size={18} />
              </Link>
              <a
                href="mailto:info@gingasoccer.ca"
                className="inline-flex items-center gap-2 text-sm font-mono text-neutral-500 hover:text-white transition-colors"
              >
                <Mail size={14} />
                info@gingasoccer.ca
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCHEDULE BANNER */}
      <section
        className="py-8 px-6 border-y"
        style={{ borderColor: `${GOLD}20`, background: `${GOLD}06` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            {[
              { label: "DAY", value: "Tuesday" },
              { label: "TIME", value: "7:00 – 8:00 PM" },
              { label: "STARTS", value: "Jul 28, 2025" },
              { label: "ENDS", value: "Dec 15, 2025" },
              { label: "SESSIONS", value: "15–16 total" },
              { label: "CAPACITY", value: "24 athletes" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 font-display mb-1">
                  {item.label}
                </p>
                <p className="text-white font-bold text-sm font-mono" style={{ color: GOLD }}>
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
            <p
              className="text-xs font-bold tracking-[0.3em] mb-4 font-display"
              style={{ color: GOLD }}
            >
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
                <div
                  className="relative bg-[#171717] border border-white/5 p-10 transition-all duration-500"
                  style={{ ["--hover-border" as string]: `${GOLD}40` }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = `${GOLD}40`)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)")
                  }
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                    style={{ background: GOLD }}
                  />
                  <pillar.icon
                    size={36}
                    strokeWidth={1.5}
                    style={{ color: GOLD }}
                    className="mb-6"
                  />
                  <p
                    className="text-xs font-bold tracking-[0.2em] mb-2 font-display"
                    style={{ color: GOLD }}
                  >
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

      {/* FEATURES GRID */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p
              className="text-xs font-bold tracking-[0.3em] mb-4 font-display"
              style={{ color: GOLD }}
            >
              HOW IT WORKS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display">
              WHAT TO EXPECT
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="bg-[#141414] border border-white/5 p-8 h-full">
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-6"
                    style={{ background: `${GOLD}18` }}
                  >
                    <feature.icon size={20} style={{ color: GOLD }} />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide font-display mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE: August excluded */}
      <section className="py-10 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex items-start gap-4">
          <div
            className="w-1 self-stretch rounded-full flex-shrink-0"
            style={{ background: GOLD }}
          />
          <p className="text-neutral-500 text-sm leading-relaxed">
            <span className="text-white font-semibold">Note on schedule:</span>{" "}
            Sessions run every Tuesday from July 28 through December 15. August
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
              <span className="font-black" style={{ color: GOLD }}>
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
                className="inline-flex items-center gap-3 text-black px-12 py-5 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:opacity-90"
                style={{ background: GOLD }}
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
