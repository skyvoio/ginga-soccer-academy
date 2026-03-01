import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Users, Zap, Calendar, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "PRIVATE SESSIONS",
    description:
      "Elite 1-on-1 coaching tailored to your game. 120 minutes of focused technical development with expert trainers.",
    link: "/programs",
  },
  {
    icon: Zap,
    title: "GINGAMAX",
    description:
      "Speed. Agility. Acceleration. Powered by Maximus Performance science and data-driven methodology.",
    link: "/gingamax",
  },
  {
    icon: Calendar,
    title: "CAMPS",
    description:
      "Intensive training camps during March Break, Summer, and December. Full immersion development.",
    link: "/programs",
  },
];

const newsItems = [
  {
    id: 1,
    title: "Summer 2026 Camp Registration Now Open",
    category: "CAMPS",
    date: "Mar 1, 2026",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    excerpt:
      "Secure your spot for the most intensive summer training experience in the region.",
  },
  {
    id: 2,
    title: "GingaMax Program Launches New Speed Module",
    category: "PERFORMANCE",
    date: "Feb 20, 2026",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",
    excerpt:
      "Our partnership with Maximus Performance brings cutting-edge speed training technology.",
  },
  {
    id: 3,
    title: "Academy Players Selected for Provincial Team",
    category: "ACHIEVEMENTS",
    date: "Feb 15, 2026",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    excerpt:
      "Three academy players earn spots on the Ontario Provincial Select Team.",
  },
  {
    id: 4,
    title: "New Turf Facility Upgrade Complete",
    category: "FACILITY",
    date: "Feb 10, 2026",
    image:
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
    excerpt:
      "State-of-the-art turf installation brings FIFA-quality playing surface to Kitchener.",
  },
];

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p
              className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-6 uppercase font-display"
              data-testid="text-hero-subtitle"
            >
              GINGA SOCCER ACADEMY — KITCHENER, ON
            </p>
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] font-display"
              data-testid="text-hero-title"
            >
              TRAIN LIKE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                A PRO
              </span>
            </h1>
            <p className="mt-8 text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Elite soccer training for players who demand excellence. Develop
              your game with world-class coaching and cutting-edge performance
              science.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:from-amber-400 hover:to-amber-500"
              data-testid="link-hero-cta"
            >
              START YOUR JOURNEY
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              data-testid="link-hero-programs"
            >
              VIEW PROGRAMS
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-amber-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              WHAT WE OFFER
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display"
              data-testid="text-features-title"
            >
              ELITE PROGRAMS
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
                <Link href={feature.link}>
                  <div
                    className="group relative bg-[#171717] border border-white/5 p-10 h-full transition-all duration-500 hover:border-amber-500/30"
                    data-testid={`card-feature-${i}`}
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                    <feature.icon
                      className="text-amber-500 mb-6"
                      size={32}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 font-display">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      LEARN MORE <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-end justify-between gap-4 mb-16"
          >
            <div>
              <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
                LATEST
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display"
                data-testid="text-news-title"
              >
                ACADEMY NEWS
              </h2>
            </div>
            <Link
              href="/programs"
              className="hidden md:flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase hover:text-amber-400 transition-colors"
              data-testid="link-view-all-news"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
                data-testid={`card-news-${item.id}`}
              >
                <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] text-amber-500 bg-black/60 backdrop-blur-sm px-3 py-1 font-display">
                    {item.category}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs mb-2 font-mono">
                  {item.date}
                </p>
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-amber-500 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-xs mt-2 leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
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
              READY TO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                ELEVATE
              </span>{" "}
              YOUR GAME?
            </h2>
            <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto">
              Join the academy that produces champions. Limited spots available
              for the 2026 season.
            </p>
            <Link
              href="/booking"
              className="mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-12 py-5 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
              data-testid="link-cta-book"
            >
              BOOK YOUR SESSION <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
