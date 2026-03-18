import { useState, useEffect, useRef } from "react";
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
import { useAdminStore } from "@/stores/adminStore";
import justplayImg from "@assets/Ginga_Just_Play_1773867452909.png";
import agilityImg from "@assets/Ginga_Agility_1772628248650.png";
import summerCampImg from "@assets/Ginga_Soccer_Summer_Camp_1772628543655.jpg";
import privateSessionImg from "@assets/Ginga_Group_1773867449495.JPG";
import challengeCupImg from "@assets/CHALLENGE_CT_Id_01-300x133_1772628285717.jpg";
import brazucaImg from "@assets/brazilian_Sports_Events_1772628280844.jpg";

const programCards = [
  {
    icon: Clock,
    title: "JUSTPLAY",
    price: "$50 + Tax",
    label: "120m Session",
    description:
      "120 minute Specialized conditioning to enhance Soccer I.Q. speed, stamina, and on-field agility.",
    link: "/programs",
    image: justplayImg,
  },
  {
    icon: Users,
    title: "GINGA SUMMER CAMP",
    price: "$500/wk + HST",
    label: "August Weekly",
    description:
      "Full-week intensive summer training camp with professional coaching and competitive match play.",
    link: "/programs",
    image: summerCampImg,
  },
  {
    icon: Dumbbell,
    title: "GINGAMAX SPEED & AGILITY",
    price: "$50 + Tax",
    label: "Per Session",
    description:
      "Elite speed and agility training powered by Maximus Performance methodology.",
    link: "/gingamax",
    image: agilityImg,
  },
  {
    icon: MapPin,
    title: "PRIVATE SESSION",
    price: "$175 + Tax",
    label: "2h Session",
    description:
      "One-on-one intensive training focused on individual technique and tactical understanding.",
    link: "/programs",
    image: privateSessionImg,
  },
];

function RisingStarsCarousel() {
  const { risingStars } = useAdminStore();
  const [isPaused, setIsPaused] = useState(false);

  const doubled = [...risingStars, ...risingStars];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: risingStars.length * 5,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {doubled.map((player, i) => (
          <div
            key={`${player.id}-${i}`}
            className="group relative flex-shrink-0 w-[220px] bg-gradient-to-b from-[#1a1a1a] to-[#111] border border-white/5 overflow-hidden transition-all duration-500 hover:border-amber-500/30"
            data-testid={`card-player-${i}`}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-40 overflow-hidden">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent" />
            </div>

            <div className="p-4 text-center">
              <span className="inline-block text-[9px] font-bold tracking-[0.2em] text-amber-500 bg-amber-500/10 px-2 py-0.5 mb-2 font-display">
                #{player.position.toUpperCase()}
              </span>
              <h3 className="text-sm font-black text-white uppercase tracking-wide font-display">
                {player.name}
              </h3>
              <p className="text-neutral-500 text-[10px] font-mono mt-1">
                {player.club}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { news } = useAdminStore();
  const [videoEnded, setVideoEnded] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      document.head.appendChild(tag);
    }

    const onReady = () => {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player("hero-yt-player", {
        videoId: "JoYCUpivuUQ",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              setVideoEnded(true);
            }
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      onReady();
    } else {
      (window as any).onYouTubeIframeAPIReady = onReady;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&q=80')`,
            opacity: videoEnded ? 1 : 0,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{ opacity: videoEnded ? 0 : 1 }}
        >
          <div id="hero-yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full pointer-events-none" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
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

          <RisingStarsCarousel />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/about"
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
            {programCards.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={program.link}>
                  <div
                    className="group relative bg-[#171717] border border-white/5 overflow-hidden h-full transition-all duration-500 hover:border-amber-500/30"
                    data-testid={`card-feature-${i}`}
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-black/30 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-bold text-white uppercase tracking-wide mb-1 font-display">
                        {program.title}
                      </h3>
                      <p className="text-amber-500 text-xl font-light mb-1">
                        {program.price}
                      </p>
                      <p className="text-neutral-500 text-[10px] font-mono mb-3">
                        {program.label}
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        LEARN MORE <ArrowRight size={14} />
                      </div>
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
              href="/media"
              className="hidden md:flex items-center gap-2 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase hover:text-amber-400 transition-colors"
              data-testid="link-view-all-news"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.slice(0, 4).map((item, i) => (
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
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              TRUSTED BY
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display"
              data-testid="text-partners-title"
            >
              OUR PARTNERS
            </h2>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
              data-testid="partner-challenge-cup"
            >
              <img
                src={challengeCupImg}
                alt="Challenge Cup Tournaments"
                className="h-20 md:h-28 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group"
              data-testid="partner-brazuca"
            >
              <img
                src={brazucaImg}
                alt="Brazuca Soccer Sports and Events"
                className="h-20 md:h-28 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
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
