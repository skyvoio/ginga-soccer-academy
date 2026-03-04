import { motion } from "framer-motion";
import { Instagram, Youtube, Award, Zap, Trophy } from "lucide-react";
import kevinImg from "@assets/kevin-de-serpa_1772628179833.jpg";
import kenenImg from "@assets/Kenen_Shadd_1772628402082.jpeg";

export default function About() {
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
              THE PEOPLE BEHIND THE PITCH
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-about-title"
            >
              MEET THE TEAM
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img
                src={kevinImg}
                alt="Kevin De Serpa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3">
                  <a
                    href="https://youtube.com/@kevindeserpa-mrginga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                    data-testid="link-kevin-youtube"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://instagram.com/gingasoccerinc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                    data-testid="link-kevin-instagram"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
                CEO & HEAD TRAINER
              </p>
              <h2
                className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter font-display mb-4"
                data-testid="text-kevin-name"
              >
                KEVIN DE SERPA
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                10-year International Pro Career | Sporting CP (B) & FK Haugesund
              </p>

              <div className="space-y-6">
                {[
                  { year: "1998", text: "Signed pro with Toronto Lynx." },
                  { year: "GLOBAL", text: "E.C Commercial (Brazil), FC Penafiel (Portugal - 2nd Div Champ)." },
                  { year: "NORDIC", text: "FK Haugesund (Norway - Promotion), 1st Team All-Star." },
                  { year: "INT'L", text: "U17 World Cup Qualifiers (Goals vs Mexico/USA)." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="flex-shrink-0 w-20">
                      <span className="text-amber-500 text-xs font-bold tracking-[0.2em] font-display">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-1 border-l border-white/10 pl-6">
                      <p className="text-neutral-300 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-neutral-500 text-xs font-mono">
                <Youtube size={14} className="text-amber-500" /> @kevindeserpa-mrginga
                <span className="mx-2">|</span>
                <Instagram size={14} className="text-amber-500" /> @gingasoccerinc
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
                CO-FOUNDER | SPEED & AGILITY
              </p>
              <h2
                className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter font-display mb-4"
                data-testid="text-kenen-name"
              >
                KENEN SHADD
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                Maximus Performance background. Elite agility training.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Award, label: "NCAA D1 Athlete" },
                  { icon: Trophy, label: "5x Triple Jump Champ" },
                  { icon: Zap, label: "NJCAA National Champion" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-[#171717] border border-white/5 p-5 text-center"
                    data-testid={`stat-kenen-${i}`}
                  >
                    <stat.icon size={24} className="text-amber-500 mx-auto mb-3" />
                    <p className="text-white text-xs font-bold uppercase tracking-wide font-display">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed">
                Kenen brings an elite athletic background to the Ginga coaching staff. As an NCAA Division 1 athlete and 5-time Triple Jump champion, he understands what it takes to perform at the highest levels. His Maximus Performance methodology focuses on developing explosive speed, agility, and acceleration — the physical attributes that separate good players from great ones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden order-1 lg:order-2"
            >
              <img
                src={kenenImg}
                alt="Kenen Shadd"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
