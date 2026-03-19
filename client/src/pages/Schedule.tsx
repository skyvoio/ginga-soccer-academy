import { motion } from "framer-motion";
import { Clock, MapPin, AlertCircle } from "lucide-react";

interface ScheduleSlot {
  time: string;
  program: string;
  type: "private" | "group" | "justplay" | "gingamax" | "camp" | "open";
  notes?: string;
}

interface DaySchedule {
  day: string;
  slots: ScheduleSlot[];
}

const schedule: DaySchedule[] = [
  {
    day: "MONDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "5:00 PM - 6:30 PM", program: "Group Session", type: "group", notes: "2017–2018" },
      { time: "6:30 PM - 8:00 PM", program: "Group Session", type: "group", notes: "2015–2016" },
    ],
  },
  {
    day: "TUESDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
    ],
  },
  {
    day: "WEDNESDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "5:00 PM - 6:30 PM", program: "Group Session", type: "group", notes: "2009–2011" },
      { time: "6:30 PM - 8:00 PM", program: "Group Session", type: "group", notes: "2015–2016" },
    ],
  },
  {
    day: "THURSDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "6:30 PM - 8:00 PM", program: "Group Session", type: "group", notes: "2012–2014" },
    ],
  },
  {
    day: "FRIDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "5:00 PM - 6:30 PM", program: "Group Session", type: "group", notes: "2009–2011" },
      { time: "6:30 PM - 8:00 PM", program: "Group Session", type: "group", notes: "2015–2016" },
    ],
  },
  {
    day: "SATURDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
    ],
  },
  {
    day: "SUNDAY",
    slots: [
      { time: "11:00 AM - 1:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "1:00 PM - 3:00 PM", program: "Private Session", type: "private", notes: "By appointment" },
      { time: "3:00 PM - 5:00 PM", program: "Just Play", type: "justplay" },
    ],
  },
];

const typeColors: Record<string, string> = {
  private: "border-amber-500/50 bg-amber-500/5 text-amber-500",
  group: "border-blue-500/50 bg-blue-500/5 text-blue-400",
  justplay: "border-green-500/50 bg-green-500/5 text-green-400",
  gingamax: "border-orange-500/50 bg-orange-500/5 text-orange-400",
  camp: "border-purple-500/50 bg-purple-500/5 text-purple-400",
  open: "border-neutral-500/50 bg-neutral-500/5 text-neutral-400",
};

const typeDots: Record<string, string> = {
  private: "bg-amber-500",
  group: "bg-blue-500",
  justplay: "bg-green-500",
  gingamax: "bg-orange-500",
  camp: "bg-purple-500",
  open: "bg-neutral-500",
};

export default function Schedule() {
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
              WEEKLY TIMETABLE
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-schedule-title"
            >
              SCHEDULE
            </h1>
            <p className="mt-6 text-neutral-400 text-lg max-w-2xl">
              Plan your training week. All sessions take place at our Kitchener
              facility.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-6 mb-12">
            {[
              { type: "private", label: "Private" },
              { type: "group", label: "Group" },
              { type: "justplay", label: "Just Play" },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2 text-xs text-neutral-400">
                <div className={`w-2 h-2 rounded-full ${typeDots[item.type]}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: dayIndex * 0.05 }}
                className="bg-[#171717] border border-white/5"
                data-testid={`schedule-day-${day.day.toLowerCase()}`}
              >
                <div className="p-4 border-b border-white/5">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-white font-display">
                    {day.day}
                  </h3>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  {day.slots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className={`p-3 border ${typeColors[slot.type]} transition-all duration-300`}
                    >
                      <p className="text-[10px] font-mono opacity-70 mb-1 flex items-center gap-1">
                        <Clock size={9} />
                        {slot.time}
                      </p>
                      <p className="text-xs font-bold">{slot.program}</p>
                      {slot.notes && (
                        <p className="text-[10px] opacity-50 mt-1">
                          {slot.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#171717] border border-white/5 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="text-amber-500" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2 font-display">
                  LOCATION
                </h3>
                <p className="text-neutral-400 text-sm">
                  1197 Union Street, Unit 5, Kitchener, Ontario
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <AlertCircle className="text-amber-500" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2 font-display">
                  IMPORTANT NOTICE
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Schedule is subject to change during camp weeks (March, August, December). Private sessions are available by appointment only. Please contact{" "}
                  <a href="mailto:info@gingasoccer.ca" className="text-amber-500 hover:text-amber-400 transition-colors">
                    info@gingasoccer.ca
                  </a>{" "}
                  for scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
