import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Timer, Target, TrendingUp, Activity, BarChart3 } from "lucide-react";

const stats = [
  {
    icon: Zap,
    label: "SPEED",
    value: "40M",
    unit: "Sprint Analysis",
    description:
      "Laser-timed 40-meter sprint protocols to benchmark and improve your acceleration phase.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Target,
    label: "AGILITY",
    value: "T-Test",
    unit: "Pro Protocol",
    description:
      "Advanced agility assessments including T-Test, Illinois, and reactive agility drills.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: TrendingUp,
    label: "ACCELERATION",
    value: "0-10M",
    unit: "Explosive Power",
    description:
      "First-step explosiveness training with biomechanical analysis and targeted programming.",
    color: "from-orange-400 to-red-500",
  },
];

const features = [
  {
    icon: Activity,
    title: "BIOMETRIC TRACKING",
    description:
      "Real-time performance data collection during every session. Track your progress with precision.",
  },
  {
    icon: BarChart3,
    title: "PROGRESS REPORTS",
    description:
      "Monthly performance reports with detailed metrics, comparisons, and improvement recommendations.",
  },
  {
    icon: Timer,
    title: "PERIODIZATION",
    description:
      "Scientifically structured training cycles designed to peak performance at critical moments.",
  },
];

export default function GingaMax() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20">
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=80')`,
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
            <div className="inline-block mb-6 px-4 py-2 border border-amber-500/30 bg-amber-500/5">
              <p className="text-amber-500 text-[10px] font-bold tracking-[0.3em] font-display">
                POWERED BY MAXIMUS PERFORMANCE
              </p>
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter font-display leading-[0.9]"
              data-testid="text-gingamax-title"
            >
              GINGA
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                MAX
              </span>
            </h1>
            <p className="mt-8 text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              The ultimate performance program. Data-driven training methodology
              that transforms raw talent into elite athleticism.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-neutral-500 font-mono">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                $50 + tax per session
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              PERFORMANCE METRICS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display">
              THREE PILLARS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group"
              >
                <div
                  className="relative bg-[#171717] border border-white/5 p-10 transition-all duration-500 hover:border-amber-500/30"
                  data-testid={`card-stat-${stat.label.toLowerCase()}`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <stat.icon
                    className="text-amber-500 mb-6"
                    size={36}
                    strokeWidth={1.5}
                  />
                  <p className="text-xs font-bold tracking-[0.2em] text-amber-500 mb-2 font-display">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-black text-white mb-1 font-display">
                    {stat.value}
                  </p>
                  <p className="text-neutral-500 text-sm font-mono mb-6">
                    {stat.unit}
                  </p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>

                  <div className="mt-8 h-1 bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              THE SYSTEM
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display">
              HOW IT WORKS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="bg-[#141414] border border-white/5 p-10 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-amber-500/10 flex items-center justify-center">
                      <feature.icon
                        className="text-amber-500"
                        size={20}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide font-display">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-display">
              UNLOCK YOUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                POTENTIAL
              </span>
            </h2>
            <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto">
              Join the GingaMax program and train with the precision and
              intensity of a professional athlete.
            </p>
            <Link
              href="/booking"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-12 py-5 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
              data-testid="link-gingamax-cta"
            >
              ENROLL NOW <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
