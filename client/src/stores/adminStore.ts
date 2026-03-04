import { create } from "zustand";

interface Registration {
  id: string;
  name: string;
  program: string;
  status: "Pending" | "Confirmed";
  payment: "Unpaid" | "Paid";
  date: string;
}

interface Session {
  id: string;
  name: string;
  day: string;
  time: string;
  ageGroup: string;
}

interface Trip {
  id: string;
  destination: string;
  dates: string;
  cost: string;
  description: string;
  bookedPlayers: string[];
}

interface AdminState {
  registrations: Registration[];
  sessions: Session[];
  trips: Trip[];
  toggleRegistrationStatus: (id: string) => void;
  togglePaymentStatus: (id: string) => void;
  updateSession: (id: string, day: string, time: string) => void;
  addTrip: (trip: Omit<Trip, "id" | "bookedPlayers">) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
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
  sessions: [
    { id: "s1", name: "Group Session", day: "Tuesday", time: "6:30pm - 8:00pm", ageGroup: "2012-2014" },
    { id: "s2", name: "Group Session", day: "Thursday", time: "6:30pm - 8:00pm", ageGroup: "2012-2014" },
    { id: "s3", name: "Group Session", day: "Wednesday", time: "5:00pm - 6:30pm", ageGroup: "2009-2011" },
    { id: "s4", name: "Group Session", day: "Friday", time: "5:00pm - 6:30pm", ageGroup: "2009-2011" },
    { id: "s5", name: "Group Session", day: "Monday", time: "6:30pm - 8:00pm", ageGroup: "2015/2016" },
    { id: "s6", name: "Group Session", day: "Monday", time: "5:00pm - 6:30pm", ageGroup: "2017/2018" },
    { id: "s7", name: "Justplay", day: "Saturday", time: "3:00pm - 5:00pm", ageGroup: "2015" },
    { id: "s8", name: "Justplay", day: "Sunday", time: "3:00pm - 5:00pm", ageGroup: "2017" },
  ],
  trips: [
    {
      id: "t1",
      destination: "Lisbon, Portugal",
      dates: "July 10-20, 2026",
      cost: "$3,500",
      description: "Benfica Academy scouting trip. Players will train with Benfica youth coaches and participate in showcase matches.",
      bookedPlayers: ["Petra Bandula", "Diago Delgado"],
    },
    {
      id: "t2",
      destination: "Porto, Portugal",
      dates: "August 5-12, 2026",
      cost: "$2,800",
      description: "FC Porto youth development exchange. Exposure to elite European training methodologies.",
      bookedPlayers: ["Viktoria Brodar"],
    },
  ],
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
  updateSession: (id, day, time) =>
    set((state) => ({
      sessions: state.sessions.map((s) => (s.id === id ? { ...s, day, time } : s)),
    })),
  addTrip: (trip) =>
    set((state) => ({
      trips: [...state.trips, { ...trip, id: `t${Date.now()}`, bookedPlayers: [] }],
    })),
}));
