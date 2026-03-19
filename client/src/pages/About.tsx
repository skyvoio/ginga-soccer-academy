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
                10-year International Pro Career | Canadian National Team | FC Penafiel · FK Haugesund · Benfica U18
              </p>

              <div className="space-y-5">
                {[
                  {
                    label: "NATIONAL TEAM",
                    text: "Represented U17 Canadian National Team in CONCACAF World Cup Qualifiers, scoring against Mexico, Netherlands Antilles, and USA. Played internationally in Bermuda and Portugal, including a stint with Benfica U18.",
                  },
                  {
                    label: "1998",
                    text: "Signed first professional contract with Toronto Lynx. Continued with the U20 Canadian National Team, A-League's Toronto Lynx, and Livingston FC in Scotland.",
                  },
                  {
                    label: "1999",
                    text: "Ventured to Brazil with E.C Commercial. Joined Mississauga Olympians and trained in Portugal and Spain.",
                  },
                  {
                    label: "2004",
                    text: "Signed a 5-year contract with FC Penafiel in Portugal, winning the 2nd Division championship in the inaugural year. Brief stint with Mirandela in Portugal.",
                  },
                  {
                    label: "2005",
                    text: "Signed a 1-year contract with FK Haugesund in Norway, achieving promotion to 1st Division. Selected as first team All-Star in 2nd Division Norway.",
                  },
                  {
                    label: "2006–2007",
                    text: "Overcame an ankle injury to contribute to Stord Sunnhordland. Trial with top-division club Brann (Norway). Secured a 1-year contract with Mandalskameratene in 1st Division Norway. Represented Canada in futsal in Brazil before a career-ending shin fracture in 2007.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex gap-6 items-start"
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="flex-shrink-0 w-24">
                      <span className="text-amber-500 text-[10px] font-bold tracking-[0.2em] font-display leading-tight">
                        {item.label}
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

      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              FINDING INSPIRATION IN EVERY TURN
            </p>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-ginga-story-title"
            >
              THE ROOTS OF GINGA
            </h2>
            <p className="mt-4 text-neutral-500 text-sm font-mono tracking-widest">
              A JOURNEY THROUGH TIME AND CULTURE
            </p>
          </motion.div>

          <div className="space-y-10">
            {[
              {
                label: "ORIGINS",
                body: "Ginga finds its origins in the Kikongo language, spoken in parts of present-day Angola and the Congo Kingdom. The Portuguese, arriving in the early fifteenth century, played a role in shaping the cultural connections that brought Ginga into the Portuguese language.",
              },
              {
                label: "NZINGA, MBUNDO QUEEN",
                body: "The metonymic effect of Nzinga, the first woman to lead the Mbundo Kingdom, left an imprint on the Portuguese language as a reference to warriors and a secret male society. Referred to as 'Ginga' by the Portuguese, these Ngingas Warriors played a crucial role, according to African historian Joseph Miller. The word 'Jinga,' with its semantic focus on constant movement, also contributed to the development of Ginga.",
              },
              {
                label: "BRAZILIAN SPIRIT",
                body: "In Brazilian Portuguese, Ginga is a slang word synonymous with shaking the body with skill. It represents a search for a balanced life, embodied by the flow and rhythm of movement — the fluidity of motion seen in athletes like Ronaldo and Michael Jordan, embodying the rhythm of life.",
              },
              {
                label: "LIFE FORCE",
                body: "Ginga serves as the life force of Afro-Brazilian people, resonating with Afro-Americans and Native Americans. For Rio de Janeiro resident Jefferson, Ginga is reflected in his way of walking, speaking, and dressing — a slow, dancing, and light-hearted approach to life.",
              },
              {
                label: "RHYTHM & EXCELLENCE",
                body: "Music plays a pivotal role in Ginga's essence, symbolizing rhythm present in everything — from the sea to the wind through the trees. Tuning into this rhythm harmonizes the physical and spiritual selves, allowing individuals to achieve excellence. Brazilian footballers, hailed as the best globally, attribute their unique style and fluency of motion to the power of Ginga.",
              },
              {
                label: "THE GIFT",
                body: "In essence, Ginga is a gift from the divine, accessible to all who are willing to tune in and receive its transformative energy.",
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex gap-8 items-start"
                data-testid={`ginga-story-section-${i}`}
              >
                <div className="flex-shrink-0 w-32 pt-1">
                  <span className="text-amber-500 text-[10px] font-bold tracking-[0.2em] font-display leading-tight">
                    {section.label}
                  </span>
                </div>
                <div className="flex-1 border-l border-amber-500/20 pl-8">
                  <p className="text-neutral-400 text-base leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <p className="text-amber-500/60 text-sm font-mono tracking-[0.3em] italic">
              "THE WAY TO PLAY BEAUTIFUL SOCCER"
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
