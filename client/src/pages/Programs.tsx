import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Users, Dumbbell, MapPin, Calendar } from "lucide-react";

type ProgramCategory = "TRAINING" | "CAMPS" | "RENTALS";

interface Program {
  id: string;
  category: ProgramCategory;
  title: string;
  price: string;
  details: string;
  description: string;
  icon: typeof Clock;
  image: string;
}

const programs: Program[] = [
  {
    id: "justplay",
    category: "TRAINING",
    title: "Justplay",
    price: "$50 + Tax",
    details: "120m Session",
    description:
      "120 minute Specialized conditioning to enhance Soccer I.Q. speed, stamina, and on-field agility.",
    icon: Clock,
    image:
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
  },
  {
    id: "group",
    category: "TRAINING",
    title: "Group Session",
    price: "$50 + Tax",
    details: "90m Session",
    description:
      "Small group training to improve teamwork, positioning, and competitive play.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
  {
    id: "turf-rental",
    category: "TRAINING",
    title: "Turf Rental",
    price: "From $70",
    details: "1h Session",
    description:
      "Rent our premium turf field. Options: Full Field ($150), 3/4 Field ($100), Mini Field ($70).",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
  },
  {
    id: "private",
    category: "TRAINING",
    title: "Private Session",
    price: "$175 + Tax",
    details: "2h Session",
    description:
      "One-on-one intensive training focused on individual technique and tactical understanding.",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",
  },
  {
    id: "gingamax",
    category: "TRAINING",
    title: "GingaMax Speed",
    price: "$50 + Tax",
    details: "Powered by Maximus",
    description:
      "Data-driven speed, agility, and acceleration training using elite performance science.",
    icon: Dumbbell,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
  },
  {
    id: "march-camp",
    category: "CAMPS",
    title: "March Break Camp",
    price: "$500 + HST",
    details: "March 16-20 | 9am-4pm",
    description:
      "Five-day intensive training camp during March Break. Full-day programming. Space limited to 30 participants.",
    icon: Calendar,
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
  },
  {
    id: "summer-camp",
    category: "CAMPS",
    title: "Summer Camp",
    price: "$500/wk + HST",
    details: "August Weekly Sessions",
    description:
      "Weekly intensive summer camps. Multiple weeks available in August. Multi-child and multi-week discounts available.",
    icon: Calendar,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
  },
  {
    id: "december-camp",
    category: "CAMPS",
    title: "Christmas Camp",
    price: "$300 + HST",
    details: "Dec 28-30 | 3 Days",
    description:
      "End-of-year intensive camp. Perfect for maintaining peak performance during the off-season.",
    icon: Calendar,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80",
  },
  {
    id: "full-turf",
    category: "RENTALS",
    title: "Full Turf Rental",
    price: "$150/hr",
    details: "Full Pitch Access",
    description:
      "Complete turf facility rental for teams, events, or private training sessions.",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
  },
  {
    id: "three-quarter-turf",
    category: "RENTALS",
    title: "3/4 Turf Rental",
    price: "$100/hr",
    details: "Three-Quarter Pitch",
    description:
      "Three-quarter pitch rental ideal for mid-size teams and training groups.",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
  },
  {
    id: "mini-turf",
    category: "RENTALS",
    title: "Mini Turf Rental",
    price: "$70/hr",
    details: "Mini Pitch",
    description:
      "Compact turf rental perfect for small group sessions and individual training.",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
  },
];

const categories: { key: ProgramCategory; label: string }[] = [
  { key: "TRAINING", label: "Training Programs" },
  { key: "CAMPS", label: "Camps" },
  { key: "RENTALS", label: "Turf Rentals" },
];

export default function Programs() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              OUR OFFERINGS
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-programs-title"
            >
              PROGRAMS
            </h1>
            <p className="mt-6 text-neutral-400 text-lg max-w-2xl">
              From private coaching to competitive camps, find the program that
              matches your ambition.
            </p>
          </motion.div>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat.key} className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-[0.3em] text-amber-500 uppercase mb-8 font-display"
              data-testid={`text-category-${cat.key.toLowerCase()}`}
            >
              {cat.label}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs
                .filter((p) => p.category === cat.key)
                .map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div
                      className="group relative bg-[#171717] border border-white/5 overflow-hidden transition-all duration-500 hover:border-amber-500/30"
                      data-testid={`card-program-${program.id}`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/30 to-transparent" />
                        <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.2em] text-amber-500 bg-black/60 backdrop-blur-sm px-3 py-1 font-display">
                          {program.category}
                        </span>
                      </div>

                      <div className="p-8">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-amber-500 transition-colors duration-300 font-display">
                          {program.title}
                        </h3>
                        <p className="text-3xl font-light text-white mb-4">
                          {program.price}
                        </p>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                          {program.description}
                        </p>

                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                          <p className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                            <program.icon size={12} /> {program.details}
                          </p>
                          <Link
                            href="/booking"
                            className="text-xs font-bold tracking-[0.15em] text-amber-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 flex-shrink-0"
                            data-testid={`link-book-${program.id}`}
                          >
                            BOOK NOW <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#171717] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                READY TO START?
              </h3>
              <p className="text-neutral-400 mt-2">
                Book your first session and begin your journey to excellence.
              </p>
            </div>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex-shrink-0"
              data-testid="link-programs-cta"
            >
              BOOK NOW <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
