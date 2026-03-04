import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Users,
  MapPin,
  User as UserIcon,
  ArrowRight,
  Dumbbell,
} from "lucide-react";

const programs = [
  {
    icon: Clock,
    title: "JUSTPLAY",
    price: "$50 + Tax",
    label: "120m Session",
    description:
      "120 minute Specialized conditioning to enhance Soccer I.Q. speed, stamina, and on-field agility.",
    link: "/programs",
  },
  {
    icon: Users,
    title: "GROUP SESSION",
    price: "$50 + Tax",
    label: "90m Session",
    description:
      "Small group training to improve teamwork, positioning, and competitive play.",
    link: "/programs",
  },
  {
    icon: MapPin,
    title: "TURF RENTAL",
    price: "From $70",
    label: "1h Session",
    description:
      "Rent our premium turf field. Options: Full Field ($150), 3/4 Field ($100), Mini Field ($70).",
    link: "/programs",
  },
  {
    icon: Dumbbell,
    title: "PRIVATE SESSION",
    price: "$175 + Tax",
    label: "2h Session",
    description:
      "One-on-one intensive training focused on individual technique and tactical understanding.",
    link: "/programs",
  },
];

const risingStars = [
  {
    name: "Petra Bandula",
    position: "Attacker",
    club: "Ginga Academy",
    tagline: "Rising star attacker.",
    rating: 82,
    stats: { pace: 88, shoot: 76, pass: 72 },
  },
  {
    name: "Viktoria Brodar",
    position: "Attacker",
    club: "Ginga Academy",
    tagline: "Skilled attacker.",
    rating: 79,
    stats: { pace: 84, shoot: 78, pass: 74 },
  },
  {
    name: "Diago Delgado",
    position: "Attacker",
    club: "Rio Ave FC Porto",
    tagline: "Rising star attacker.",
    rating: 85,
    stats: { pace: 91, shoot: 82, pass: 77 },
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
              ELITE TRAINING FACILITY
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] font-display"
              data-testid="text-hero-title"
            >
              THE WAY TO SWAY
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                FOR BEAUTIFUL PLAYS
              </span>
            </h1>
            <p className="mt-8 text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Unlock your full potential with professional coaching,
              state-of-the-art facilities, and a methodology inspired by the
              Brazilian Ginga style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/programs"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:from-amber-400 hover:to-amber-500"
              data-testid="link-hero-cta"
            >
              VIEW ALL PROGRAMS
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              data-testid="link-hero-book"
            >
              BOOK NOW
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

      <section className="py-24 px-6" id="rising-stars">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              ACADEMY TALENT
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display"
              data-testid="text-rising-stars-title"
            >
              RISING STARS
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {risingStars.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div
                  className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-amber-500/30"
                  data-testid={`card-player-${i}`}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6 pb-4">
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <span className="text-black font-black text-lg font-display">
                          {player.rating}
                        </span>
                      </div>
                    </div>

                    <div className="w-20 h-20 bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-4 mx-auto">
                      <UserIcon
                        size={36}
                        className="text-neutral-600"
                        strokeWidth={1}
                      />
                    </div>

                    <div className="text-center">
                      <span className="inline-block text-[9px] font-bold tracking-[0.2em] text-amber-500 bg-amber-500/10 px-3 py-1 mb-3 font-display">
                        #{player.position.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-black text-white uppercase tracking-wide font-display">
                        {player.name}
                      </h3>
                      <p className="text-neutral-500 text-xs font-mono mt-1">
                        {player.club}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-2">
                    <p className="text-neutral-400 text-xs text-center italic">
                      "{player.tagline}"
                    </p>
                  </div>

                  <div className="px-6 pb-6 pt-4">
                    <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                      {Object.entries(player.stats).map(([key, val]) => (
                        <div key={key} className="text-center">
                          <p className="text-[9px] text-neutral-500 font-mono uppercase">
                            {key}
                          </p>
                          <p className="text-white font-bold text-sm">
                            {val}
                          </p>
                          <div className="mt-1 h-0.5 bg-neutral-800 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${val}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.3 + i * 0.1,
                              }}
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase hover:text-amber-400 transition-colors"
              data-testid="link-view-all-players"
            >
              VIEW ALL PLAYERS <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0d0d0d]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={program.link}>
                  <div
                    className="group relative bg-[#171717] border border-white/5 p-8 h-full transition-all duration-500 hover:border-amber-500/30"
                    data-testid={`card-feature-${i}`}
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                    <program.icon
                      className="text-amber-500 mb-4"
                      size={28}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-base font-bold text-white uppercase tracking-wide mb-1 font-display">
                      {program.title}
                    </h3>
                    <p className="text-amber-500 text-xl font-light mb-1">
                      {program.price}
                    </p>
                    <p className="text-neutral-500 text-[10px] font-mono mb-4">
                      {program.label}
                    </p>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      {program.description}
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

      <section className="py-24 px-6">
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

      <section className="py-24 px-6 bg-[#0d0d0d]">
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
