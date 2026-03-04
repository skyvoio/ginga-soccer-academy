import { create } from "zustand";

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
  category: "Training" | "Matches" | "International Trips";
  image: string;
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
  risingStars: RisingStar[];
  media: MediaItem[];
  news: NewsPost[];
  registrations: Registration[];

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
  risingStars: [
    { id: "rs1", name: "Petra Bandula", position: "Attacker", club: "Ginga Academy", bio: "Rising star attacker.", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80" },
    { id: "rs2", name: "Viktoria Brodar", position: "Attacker", club: "Ginga Academy", bio: "Skilled attacker.", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80" },
    { id: "rs3", name: "Diago Delgado", position: "Attacker", club: "Rio Ave FC Porto", bio: "Rising star attacker.", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=400&q=80" },
    { id: "rs4", name: "Lucas Dias", position: "Attacker", club: "Sporting Portugal", bio: "Technical forward with vision.", image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&q=80" },
    { id: "rs5", name: "Pol Rivera Lopez", position: "Attacker", club: "RCD Espanyol de Barcelona", bio: "Creative playmaker.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80" },
    { id: "rs6", name: "Jayden Newberry", position: "Attacker", club: "Ginga Academy", bio: "Dynamic young talent.", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80" },
    { id: "rs7", name: "Carter Tavares/Roache", position: "Attacker", club: "Italy / AC Perugia Calcio", bio: "Dual-national prospect.", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=80" },
  ],
  media: [
    { id: "m1", title: "Training Session", category: "Training", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80" },
    { id: "m2", title: "Match Day", category: "Matches", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80" },
    { id: "m3", title: "Lisbon Trip", category: "International Trips", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80" },
    { id: "m4", title: "Speed Training", category: "Training", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80" },
    { id: "m5", title: "Academy Cup", category: "Matches", image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80" },
    { id: "m6", title: "Porto Exchange", category: "International Trips", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80" },
    { id: "m7", title: "Turf Session", category: "Training", image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
    { id: "m8", title: "Friendly Match", category: "Matches", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80" },
  ],
  news: [
    {
      id: "n1",
      title: "Summer 2026 Camp Registration Now Open",
      date: "Mar 1, 2026",
      excerpt: "Secure your spot for the most intensive summer training experience in the region.",
      content: "Secure your spot for the most intensive summer training experience in the region. Our summer camps run weekly throughout August with professional coaching staff.",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    },
    {
      id: "n2",
      title: "GingaMax Program Launches New Speed Module",
      date: "Feb 20, 2026",
      excerpt: "Our partnership with Maximus Performance brings cutting-edge speed training technology.",
      content: "Our partnership with Maximus Performance brings cutting-edge speed training technology to Ginga Soccer Academy.",
      image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",
    },
    {
      id: "n3",
      title: "Academy Players Selected for Provincial Team",
      date: "Feb 15, 2026",
      excerpt: "Three academy players earn spots on the Ontario Provincial Select Team.",
      content: "Three of our academy players have been selected for the Ontario Provincial Select Team, showcasing the caliber of talent at Ginga Soccer Academy.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
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
