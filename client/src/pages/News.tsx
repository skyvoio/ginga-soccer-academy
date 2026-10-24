import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";

export default function News() {
  const { news } = useAdminStore();

  return (
    <main className="bg-[#0a0a0a] min-h-screen pt-20">
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-amber-500 text-xs font-bold tracking-[0.3em] mb-4 font-display">
              LATEST
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display">
              Academy News
            </h1>
            <p className="text-neutral-400 mt-5 max-w-2xl leading-relaxed">
              Updates, events, and stories from Ginga Soccer Academy.
            </p>
          </motion.div>

          {news.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item, index) => {
                const card = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#171717]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="pt-5">
                      <p className="flex items-center gap-2 text-neutral-500 text-xs mb-3 font-mono">
                        <Calendar size={13} className="text-amber-500" />
                        {item.date}
                      </p>
                      <h2 className="text-white font-bold text-lg leading-snug group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-neutral-400 text-sm mt-3 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-5 text-amber-500 text-xs font-bold tracking-[0.15em] uppercase">
                        Read more <ArrowRight size={14} />
                      </span>
                    </div>
                  </>
                );

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                    className="group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {card}
                      </a>
                    ) : (
                      <Link href={`/news/${item.id}`} className="block">
                        {card}
                      </Link>
                    )}
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <p className="text-neutral-500 py-16 text-center">No news has been posted yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
