import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import logoSrc from "@assets/Ginga_Soccer_Logo_1772593615133.png";

const navLinks = [
  { name: "PROGRAMS", path: "/programs" },
  { name: "GINGAMAX", path: "/gingamax" },
  { name: "SCHEDULE", path: "/schedule" },
  { name: "MEMBERS", path: "/booking" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          data-testid="link-home"
        >
          <img src={logoSrc} alt="Ginga Soccer Academy" className="h-12 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${
                location === link.path
                  ? "text-amber-500"
                  : "text-neutral-400 hover:text-white"
              }`}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => logout.mutate()}
              className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              data-testid="button-logout"
            >
              <User size={14} />
              LOGOUT
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
              data-testid="link-login"
            >
              <User size={14} />
              LOGIN
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white z-50 relative"
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-20 bg-[#0a0a0a]/98 backdrop-blur-xl z-40 p-8 flex flex-col gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black text-white uppercase tracking-tight block py-2 font-display"
                  data-testid={`link-mobile-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout.mutate();
                  }}
                  className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-widest text-sm"
                  data-testid="button-mobile-logout"
                >
                  <User size={16} />
                  LOGOUT
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold uppercase tracking-widest text-sm"
                  data-testid="link-mobile-login"
                >
                  <User size={16} />
                  LOGIN
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
