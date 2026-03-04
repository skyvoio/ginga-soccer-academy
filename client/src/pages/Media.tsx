import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle } from "lucide-react";
import { useAdminStore, type MediaItem } from "@/stores/adminStore";

const filters = ["All", "Interviews", "Matches", "International"] as const;

export default function Media() {
  const { media } = useAdminStore();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const filtered = activeFilter === "All" ? media : media.filter((m) => m.category === activeFilter);

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
              GALLERY
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-media-title"
            >
              CAPTURING THE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                GINGA SPIRIT
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-bold tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-amber-500 text-black"
                    : "bg-[#171717] text-neutral-400 border border-white/5 hover:text-white hover:border-white/20"
                }`}
                data-testid={`button-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setLightboxItem(item)}
                data-testid={`card-media-${item.id}`}
              >
                <div className="relative overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-amber-500/50 group-hover:scale-[1.02]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle size={56} className="text-white/80 drop-shadow-lg group-hover:text-amber-500 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-amber-500 text-[10px] font-bold tracking-[0.2em] uppercase font-display mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-sm">No media found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-amber-500 transition-colors z-10"
              onClick={() => setLightboxItem(null)}
              data-testid="button-close-lightbox"
            >
              <X size={32} />
            </button>
            {lightboxItem.type === "video" && lightboxItem.videoUrl ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={lightboxItem.videoUrl}
                  title={lightboxItem.title}
                  className="w-full aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </motion.div>
            ) : (
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
