import { motion } from "framer-motion";
import { Instagram, Youtube, Award, Zap, Trophy, MapPin } from "lucide-react";
import kevinImg from "@assets/kevin-de-serpa_1772628179833.jpg";
import petraImg from "@assets/Petra_Bandula_1773607422405.jpeg";
import viktoriaImg from "@assets/Viktoria_Brodar_1773607422405.jpeg";
import diagoImg from "@assets/Diago_Delgado_1773607422404.jpeg";
import lucasArecoImg from "@assets/Lucas_Areco_1773607422404.jpeg";
import carterImg from "@assets/Carter_Tavares_1773607422404.jpeg";

const playerProfiles = [
  {
    name: "Lucas Areco",
    position: "Attacker",
    image: lucasArecoImg,
    club: "ASDC Gozzano",
    country: "Italy",
    highlights: [
      "Professional debut in Italian football with ASDC Gozzano",
      "Trained at Ginga Soccer Academy under Kevin De Serpa",
      "Dynamic forward with elite technical skills and finishing ability",
    ],
  },
  {
    name: "Petra Bandula",
    position: "Attacker",
    image: petraImg,
    club: "University of Missouri",
    country: "Croatia Youth National Team",
    highlights: [
      "Competing at the NCAA collegiate level — University of Missouri",
      "Selected for Croatia Youth National Team",
      "Developed through Ginga Academy's elite training system",
    ],
  },
  {
    name: "Viktoria Brodar",
    position: "Attacker",
    image: viktoriaImg,
    club: "Croatia Youth National Team",
    country: "Croatia",
    highlights: [
      "Representing Croatia at the youth international level",
      "Skilled attacker with strong technical foundation",
      "Ginga Academy graduate competing on the European stage",
    ],
  },
  {
    name: "Diago Delgado",
    position: "Attacker",
    image: diagoImg,
    club: "Rio Ave FC",
    country: "Portugal",
    highlights: [
      "Developing professionally at Rio Ave FC in Portugal",
      "Rising star with exceptional pace and vision",
      "Ginga Academy product making waves in European football",
    ],
  },
  {
    name: "Carter Tavares",
    position: "Attacker",
    image: carterImg,
    club: "Creighton University",
    country: "NCAA",
    highlights: [
      "Competing at the collegiate level with Creighton University",
      "Talented attacker with elite athleticism and finishing",
      "Trained at Ginga Soccer Academy from a young age",
    ],
  },
];

const tournamentExperience = [
  { name: "IberCup Estoril", location: "Portugal", appearances: 2 },
  { name: "Barcelona", location: "Spain", appearances: 1 },
  { name: "Footvia Barcelona", location: "Spain", appearances: 1 },
  { name: "Challenge Cup", location: "International", appearances: 4 },
];

const internationalClubs = [
  { country: "Portugal", clubs: ["SL Benfica U18", "Lusitânia", "FC Penafiel"] },
  { country: "Scotland", clubs: ["Livingston FC U18 / Reserves"] },
  { country: "Brazil", clubs: ["EC Comercial"] },
  { country: "Spain", clubs: ["Real Avilés"] },
  {
    country: "Norway",
    clubs: ["FK Haugesund", "FK Vard", "Stord/Moster FK", "Mandalskameratene FK"],
  },
];

const canadianClubs = [
  "Kitchener Minor Soccer",
  "South West United",
  "Dixie Soccer Club",
  "Cambridge Oriental",
  "Kitchener Hrvat",
  "Cambridge Supersonics",
  "Hamilton Thunder",
  "Toronto Lynx",
];

const coachingPillars = [
  {
    title: "Player development",
    text: "Build technical ability, decision-making, confidence and understanding of the game.",
  },
  {
    title: "Tactical understanding",
    text: "Teach positioning, movement, transitions, spacing and team structure.",
  },
  {
    title: "Competitive mentality",
    text: "Create an environment built around preparation, commitment, discipline and resilience.",
  },
  {
    title: "Team culture",
    text: "Build a positive, unified environment where players understand their roles and responsibilities.",
  },
  {
    title: "International exposure",
    text: "Draw on Canadian, European and Brazilian football environments and playing styles.",
  },
  {
    title: "Player pathway",
    text: "Help players understand what it takes to progress from grassroots football to higher levels of competition.",
  },
];

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
                    href="https://www.youtube.com/@kevindeserpa-mrginga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                    data-testid="link-kevin-youtube"
                  >
                    <Youtube size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/gingasoccerinc/"
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
                CEO · HEAD COACH · INTERNATIONAL SOCCER PROFESSIONAL
              </p>
              <h2
                className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter font-display mb-4"
                data-testid="text-kevin-name"
              >
                KEVIN DE SERPA
              </h2>
              <p className="text-neutral-400 text-lg mb-8">
                A Canadian coach and former professional player with experience across Canada, Europe and Brazil. Kevin has represented Ontario and Canada at youth levels and coached at international youth tournaments in Portugal and Spain.
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

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.youtube.com/@kevindeserpa-mrginga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-500 hover:text-amber-500 transition-colors text-xs font-mono"
                  data-testid="link-kevin-youtube-text"
                >
                  <Youtube size={14} className="text-amber-500" /> @kevindeserpa-mrginga
                </a>
                <span className="text-white/10">|</span>
                <a
                  href="https://www.instagram.com/gingasoccerinc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-500 hover:text-amber-500 transition-colors text-xs font-mono"
                  data-testid="link-kevin-instagram-text"
                >
                  <Instagram size={14} className="text-amber-500" /> @gingasoccerinc
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#0d0d0d]" data-testid="section-kevin-international-profile">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              COACHING & PLAYER DEVELOPMENT
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-display">
              A CAREER WITHOUT BORDERS
            </h2>
            <p className="mt-5 text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              From Canadian national-team pathways to professional clubs in Europe and Brazil, Kevin brings a broad range of football experience to player development at Ginga.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-[#171717] border border-white/5 p-7 md:p-8"
              data-testid="card-kevin-national-pathway"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-amber-500" size={20} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-display">
                  National & Provincial Pathway
                </h3>
              </div>
              <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-3">
                Canada Men’s National Team pathway
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {["U17", "U19", "U20", "U23"].map((level) => (
                  <span key={level} className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-amber-400 text-xs font-bold font-mono">
                    CANADA {level}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase mb-3">
                Provincial team
              </p>
              <span className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-sm text-neutral-300">
                <MapPin size={13} className="text-amber-500" />
                Ontario U18 Provincial Team
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="lg:col-span-3 bg-[#171717] border border-white/5 p-7 md:p-8"
              data-testid="card-kevin-tournament-experience"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="text-amber-500" size={20} />
                  <h3 className="text-lg font-black text-white uppercase tracking-tight font-display">
                    International Coaching
                  </h3>
                </div>
                <span className="text-amber-500 text-xs font-bold font-mono whitespace-nowrap">
                  8 APPEARANCES
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tournamentExperience.map((event) => (
                  <div key={event.name} className="border border-white/5 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-white text-sm font-bold">{event.name}</h4>
                      <span className="text-amber-500 text-xs font-mono">{event.appearances}×</span>
                    </div>
                    <p className="text-neutral-500 text-xs mt-1">{event.location}</p>
                  </div>
                ))}
              </div>
              <p className="text-neutral-500 text-xs mt-4 leading-relaxed">
                Youth tournament coaching experience in Portugal and Spain, including IberCup Estoril, Barcelona, Footvia Barcelona and Challenge Cup tournaments.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#171717] border border-white/5 p-7 md:p-8"
              data-testid="card-kevin-international-clubs"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-amber-500" size={19} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-display">
                  International Playing Career
                </h3>
              </div>
              <div className="space-y-4">
                {internationalClubs.map((group) => (
                  <div key={group.country} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="text-amber-500 text-xs font-bold uppercase tracking-wide">{group.country}</p>
                    <p className="text-neutral-300 text-sm leading-relaxed">{group.clubs.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="bg-[#171717] border border-white/5 p-7 md:p-8"
              data-testid="card-kevin-canadian-clubs"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-amber-500" size={19} />
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-display">
                  Canadian Club Career
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {canadianClubs.map((club) => (
                  <span key={club} className="border border-white/10 bg-black/20 px-3 py-2 text-xs text-neutral-300">
                    {club}
                  </span>
                ))}
              </div>
              <p className="text-neutral-500 text-xs mt-6 leading-relaxed">
                Kevin’s playing and coaching career spans Canada, Portugal, Scotland, Brazil, Spain and Norway.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" data-testid="section-kevin-coaching-philosophy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              HOW WE DEVELOP PLAYERS
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-display">
              COACHING PHILOSOPHY
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coachingPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="bg-[#171717] border border-white/5 p-6"
              >
                <div className="w-8 h-1 bg-amber-500 mb-5" />
                <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-3">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{pillar.text}</p>
              </motion.div>
            ))}
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
              GINGA ACADEMY ALUMNI
            </p>
            <h2
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-players-title"
            >
              RISING STARS
            </h2>
            <p className="mt-4 text-neutral-500 text-sm max-w-xl mx-auto">
              Players developed at Ginga Soccer Academy who have gone on to compete at the highest levels — collegiate, professional, and international.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {playerProfiles.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-[#171717] border border-white/5 overflow-hidden hover:border-amber-500/20 transition-all duration-500"
                data-testid={`card-player-${i}`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-amber-500/90 text-black text-[10px] font-black tracking-[0.2em] px-3 py-1 font-display mb-2">
                      {player.position.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight font-display mb-1 group-hover:text-amber-500 transition-colors duration-300">
                    {player.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin size={12} className="text-amber-500 flex-shrink-0" />
                    <span className="text-amber-500 text-xs font-mono">{player.club}</span>
                    {player.country !== player.club && (
                      <>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="text-neutral-500 text-xs font-mono">{player.country}</span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2.5 border-t border-white/5 pt-5">
                    {player.highlights.map((point, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <p className="text-neutral-400 text-xs leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
