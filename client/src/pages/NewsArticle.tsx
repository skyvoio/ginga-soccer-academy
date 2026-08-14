import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";

/** Renders the markdown-lite content format used in news posts */
function renderContent(content: string) {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    // Horizontal rule
    if (block.trim() === "---") {
      return <hr key={i} className="border-white/10 my-8" />;
    }

    // ### Heading
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display mt-10 mb-4"
        >
          {block.slice(4)}
        </h3>
      );
    }

    // Bullet block — lines starting with • or -
    const lines = block.split("\n");
    const isBulletBlock = lines.every(
      (l) => l.trim().startsWith("•") || l.trim().startsWith("-") || l.trim() === ""
    );
    if (isBulletBlock && lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"))) {
      return (
        <ul key={i} className="space-y-3 my-6">
          {lines
            .filter((l) => l.trim().startsWith("•") || l.trim().startsWith("-"))
            .map((line, j) => {
              const text = line.replace(/^[•\-]\s*/, "");
              return (
                <li key={j} className="flex items-start gap-3 text-neutral-300 text-base leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0" />
                  <span>{renderInline(text)}</span>
                </li>
              );
            })}
        </ul>
      );
    }

    // Block quote / italics-only block (starts and ends with *)
    if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
      return (
        <blockquote
          key={i}
          className="border-l-2 border-amber-500 pl-6 my-8 text-neutral-400 italic text-base leading-relaxed"
        >
          {block.slice(1, -1)}
        </blockquote>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-neutral-300 text-base leading-relaxed my-4">
        {renderInline(block)}
      </p>
    );
  });
}

/** Handles inline formatting: **bold**, *italic* */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Split on **bold** and *italic*
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const raw = match[0];
    if (raw.startsWith("**")) {
      parts.push(
        <strong key={key++} className="text-white font-bold">
          {raw.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={key++} className="italic text-neutral-400">
          {raw.slice(1, -1)}
        </em>
      );
    }
    last = match.index + raw.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length === 1 ? parts[0] : parts;
}

export default function NewsArticle() {
  const params = useParams<{ id: string }>();
  const { news } = useAdminStore();
  const article = news.find((n) => n.id === params.id);

  if (!article) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pt-32 text-center px-6">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter font-display">
          Article Not Found
        </h1>
        <p className="text-neutral-400 mt-4">This article may have been removed.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-mono text-sm"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-20">
      {/* Hero image */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="-mt-6 relative z-10 mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-amber-500 transition-colors font-mono text-xs tracking-wide"
          >
            <ArrowLeft size={13} /> BACK TO NEWS
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-amber-500 border border-amber-500/30 bg-amber-500/5 font-display uppercase">
              ACADEMY NEWS
            </span>
            <span className="flex items-center gap-1.5 text-neutral-500 text-xs font-mono">
              <Calendar size={11} />
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter font-display leading-[1.05] mb-6">
            {article.title}
          </h1>

          <p className="text-xs font-mono text-neutral-500 mb-10 pb-10 border-b border-white/5">
            By Ginga Soccer HQ &nbsp;·&nbsp; Published for gingasoccer.ca
          </p>

          {/* Content */}
          <div className="min-h-[200px]">
            {renderContent(article.content)}
          </div>

          {/* External source link if present */}
          {article.link && (
            <div className="mt-10 pt-8 border-t border-white/5">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-mono text-sm"
              >
                <ExternalLink size={14} />
                Read original source
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:info@gingasoccer.ca"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
            >
              Contact Us for More Info
            </a>
            <Link
              href="/"
              className="text-neutral-500 hover:text-white text-sm font-mono transition-colors"
            >
              ← Back to all news
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
