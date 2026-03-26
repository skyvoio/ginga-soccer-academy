import { create } from "zustand";
import newsHolidayImg from "@assets/Ginga_News_Holiday_Hustle_3v3_Champs_1773867574215.jpg";
import newsCoachImg from "@assets/Ginga_News_ND_with_Coach_Raf_Amora_FC_1773867574215.jpeg";
import newsSummerImg from "@assets/Ginga_News_Soccer_Summer_Camp_1773867574216.jpg";
import petraImg from "@assets/Petra_Bandula_1773607422405.jpeg";
import viktoriaImg from "@assets/Viktoria_Brodar_1773607422405.jpeg";
import diagoImg from "@assets/Diago_Delgado_1773607422404.jpeg";
import lucasDiasImg from "@assets/Lucas_Dias__1773607422405.jpeg";
import polImg from "@assets/Pol_Rivera_1773607422405.jpeg";
import lucasArecoImg from "@assets/Lucas_Areco_1773607422404.jpeg";
import carterImg from "@assets/Carter_Tavares_1773607422404.jpeg";

export interface ContentBlock {
  key: string;
  label: string;
  value: string;
}

export interface RisingStar {
  id: string;
  name: string;
  position: string;
  club: string;
  bio: string;
  image: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: "Training" | "Matches" | "International Trips" | "Interviews" | "International";
  type: "image" | "video";
  image: string;
  videoUrl?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface Registration {
  id: string;
  name: string;
  program: string;
  status: "Pending" | "Confirmed";
  payment: "Unpaid" | "Paid";
  date: string;
}

interface AdminState {
  contentBlocks: ContentBlock[];
  risingStars: RisingStar[];
  media: MediaItem[];
  news: NewsPost[];
  registrations: Registration[];

  updateContentBlock: (key: string, value: string) => void;

  addRisingStar: (star: Omit<RisingStar, "id">) => void;
  removeRisingStar: (id: string) => void;

  addMedia: (item: Omit<MediaItem, "id">) => void;
  removeMedia: (id: string) => void;

  addNews: (post: Omit<NewsPost, "id">) => void;
  removeNews: (id: string) => void;

  toggleRegistrationStatus: (id: string) => void;
  togglePaymentStatus: (id: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  contentBlocks: [
    { key: "home_hero_tagline", label: "Home — Hero Tagline", value: "Train Like The World Is Watching." },
    { key: "home_hero_sub", label: "Home — Hero Subtitle", value: "Premium soccer training for athletes who demand more. Based in Kitchener, Ontario." },
    { key: "programs_intro", label: "Programs — Intro Text", value: "From private coaching to competitive camps, find the program that matches your ambition." },
    { key: "justplay_desc", label: "Programs — Justplay Description", value: "120 minute Specialized conditioning to enhance Soccer I.Q. speed, stamina, and on-field agility." },
    { key: "group_desc", label: "Programs — Group Session Description", value: "Small group training to improve teamwork, positioning, and competitive play." },
    { key: "private_desc", label: "Programs — Private Session Description", value: "One-on-one intensive training focused on individual technique and tactical understanding." },
    { key: "march_camp_desc", label: "Camps — March Break Description", value: "Five-day intensive training camp during March Break. Full-day programming from 9am to 4pm. Space is limited — register early to secure your spot." },
    { key: "summer_camp_promo", label: "Camps — Summer Camp Promo Text", value: "Book all 4 weeks and get 1 week FREE, or book 3 weeks and save $150." },
    { key: "christmas_camp_desc", label: "Camps — Christmas Camp Description", value: "End-of-year intensive camp over 3 days. Perfect for maintaining peak performance and finishing the year strong." },
    { key: "about_tagline", label: "About — Page Tagline", value: "Built on love for the game. Rooted in Brazilian football culture." },
    { key: "contact_address", label: "Contact — Address", value: "1197 Union Street, Unit 5, Kitchener, Ontario" },
    { key: "contact_email", label: "Contact — Email", value: "info@gingasoccer.ca" },
  ],

  updateContentBlock: (key, value) =>
    set((state) => ({
      contentBlocks: state.contentBlocks.map((b) => (b.key === key ? { ...b, value } : b)),
    })),

  risingStars: [
    { id: "rs1", name: "Petra Bandula", position: "Attacker", club: "Ginga Academy", bio: "Rising star attacker.", image: petraImg },
    { id: "rs2", name: "Viktoria Brodar", position: "Attacker", club: "Ginga Academy", bio: "Skilled attacker.", image: viktoriaImg },
    { id: "rs3", name: "Diago Delgado", position: "Attacker", club: "Rio Ave FC Porto", bio: "Rising star attacker.", image: diagoImg },
    { id: "rs4", name: "Lucas Dias", position: "Attacker", club: "Sporting Portugal", bio: "Technical forward with vision.", image: lucasDiasImg },
    { id: "rs5", name: "Pol Rivera Lopez", position: "Attacker", club: "RCD Espanyol de Barcelona", bio: "Creative playmaker.", image: polImg },
    { id: "rs6", name: "Lucas Areco", position: "Attacker", club: "Ginga Academy", bio: "Dynamic young talent.", image: lucasArecoImg },
    { id: "rs7", name: "Carter Tavares/Roache", position: "Attacker", club: "Italy / AC Perugia Calcio", bio: "Dual-national prospect.", image: carterImg },
  ],
  media: [
    { id: "m1", title: "Adjusting to Playing Soccer Abroad", category: "Interviews", type: "video", image: "https://img.youtube.com/vi/Fsn6Q_pUzSE/maxresdefault.jpg", videoUrl: "https://www.youtube.com/embed/Fsn6Q_pUzSE" },
    { id: "m2", title: "F2FC at Old Trafford", category: "Matches", type: "video", image: "https://img.youtube.com/vi/UViTPSRWKBg/maxresdefault.jpg", videoUrl: "https://www.youtube.com/embed/UViTPSRWKBg" },
    { id: "m3", title: "Wembley Cup Final 2018", category: "Matches", type: "video", image: "https://img.youtube.com/vi/AjZ_nZuuObo/maxresdefault.jpg", videoUrl: "https://www.youtube.com/embed/AjZ_nZuuObo" },
    { id: "m4", title: "Public Pannas in Portugal", category: "International", type: "video", image: "https://img.youtube.com/vi/jLIM0LSd9PE/maxresdefault.jpg", videoUrl: "https://www.youtube.com/embed/jLIM0LSd9PE" },
  ],
  news: [
    {
      id: "n1",
      title: "Summer 2026 Camp Registration Now Open",
      date: "Mar 1, 2026",
      excerpt: "Secure your spot for the most intensive summer training experience in the region.",
      content: "Secure your spot for the most intensive summer training experience in the region. Our summer camps run weekly throughout August with professional coaching staff.",
      image: newsSummerImg,
    },
    {
      id: "n2",
      title: "GingaMax Program Launches New Speed Module",
      date: "Feb 20, 2026",
      excerpt: "Our partnership with Maximus Performance brings cutting-edge speed training technology.",
      content: "Our partnership with Maximus Performance brings cutting-edge speed training technology to Ginga Soccer Academy.",
      image: newsHolidayImg,
    },
    {
      id: "n3",
      title: "Academy Players Selected for Provincial Team",
      date: "Feb 15, 2026",
      excerpt: "Three academy players earn spots on the Ontario Provincial Select Team.",
      content: "Three of our academy players have been selected for the Ontario Provincial Select Team, showcasing the caliber of talent at Ginga Soccer Academy.",
      image: newsCoachImg,
    },
    {
      id: "n4",
      title: "New Turf Facility Upgrade Complete",
      date: "Feb 10, 2026",
      excerpt: "State-of-the-art turf installation brings FIFA-quality playing surface to Kitchener.",
      content: "Our facility upgrade is complete. The new FIFA-quality turf provides an elite training surface for all our programs.",
      image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
    },
  ],
  registrations: [
    { id: "r1", name: "Petra Bandula", program: "Group Session", status: "Confirmed", payment: "Paid", date: "2026-02-15" },
    { id: "r2", name: "Viktoria Brodar", program: "Private Session", status: "Confirmed", payment: "Paid", date: "2026-02-18" },
    { id: "r3", name: "Diago Delgado", program: "March Break Camp", status: "Pending", payment: "Unpaid", date: "2026-02-20" },
    { id: "r4", name: "Lucas Martinez", program: "Group Session", status: "Pending", payment: "Unpaid", date: "2026-02-22" },
    { id: "r5", name: "Sofia Chen", program: "Justplay", status: "Confirmed", payment: "Paid", date: "2026-02-25" },
    { id: "r6", name: "Amir Hassan", program: "Summer Camp", status: "Pending", payment: "Unpaid", date: "2026-02-28" },
    { id: "r7", name: "Emma Wilson", program: "Private Session", status: "Confirmed", payment: "Unpaid", date: "2026-03-01" },
    { id: "r8", name: "Kai Nakamura", program: "GingaMax Speed", status: "Pending", payment: "Unpaid", date: "2026-03-02" },
  ],

  addRisingStar: (star) =>
    set((state) => ({
      risingStars: [...state.risingStars, { ...star, id: `rs${Date.now()}` }],
    })),
  removeRisingStar: (id) =>
    set((state) => ({
      risingStars: state.risingStars.filter((s) => s.id !== id),
    })),

  addMedia: (item) =>
    set((state) => ({
      media: [...state.media, { ...item, id: `m${Date.now()}` }],
    })),
  removeMedia: (id) =>
    set((state) => ({
      media: state.media.filter((m) => m.id !== id),
    })),

  addNews: (post) =>
    set((state) => ({
      news: [{ ...post, id: `n${Date.now()}` }, ...state.news],
    })),
  removeNews: (id) =>
    set((state) => ({
      news: state.news.filter((n) => n.id !== id),
    })),

  toggleRegistrationStatus: (id) =>
    set((state) => ({
      registrations: state.registrations.map((r) =>
        r.id === id ? { ...r, status: r.status === "Pending" ? "Confirmed" : "Pending" } : r
      ),
    })),
  togglePaymentStatus: (id) =>
    set((state) => ({
      registrations: state.registrations.map((r) =>
        r.id === id ? { ...r, payment: r.payment === "Unpaid" ? "Paid" : "Unpaid" } : r
      ),
    })),
}));
