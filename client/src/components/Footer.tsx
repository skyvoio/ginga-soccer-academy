import { Link } from "wouter";
import { MapPin, Mail, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-6 w-6 bg-gradient-to-br from-amber-400 to-amber-600 rotate-45" />
              <span className="text-xl font-black tracking-tighter text-white uppercase font-display">
                GINGA<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Premium soccer training academy. Developing elite players through
              world-class coaching and cutting-edge performance programs.
            </p>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              <span>1197 Unit 5 Union Street, Kitchener, ON</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase mb-6 font-display">
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Programs", path: "/programs" },
                { label: "GingaMax", path: "/gingamax" },
                { label: "Schedule", path: "/schedule" },
                { label: "Members", path: "/booking" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className="text-neutral-500 text-sm hover:text-amber-500 transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase mb-6 font-display">
              PROGRAMS
            </h4>
            <div className="flex flex-col gap-3">
              {[
                "Private Sessions",
                "Group Training",
                "Just Play",
                "Camps",
                "Turf Rentals",
              ].map((item) => (
                <span key={item} className="text-neutral-500 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase mb-6 font-display">
              CONTACT
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@gingasoccer.ca"
                className="flex items-center gap-3 text-neutral-500 text-sm hover:text-amber-500 transition-colors"
                data-testid="link-email"
              >
                <Mail size={14} className="text-amber-500" />
                info@gingasoccer.ca
              </a>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="text-neutral-500 hover:text-amber-500 transition-colors"
                  data-testid="link-instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-amber-500 transition-colors"
                  data-testid="link-youtube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="#"
                  className="text-neutral-500 hover:text-amber-500 transition-colors"
                  data-testid="link-tiktok"
                >
                  <SiTiktok size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs tracking-wide">
            &copy; 2026 Ginga Soccer Academy. All rights reserved.
          </p>
          <p className="text-neutral-600 text-xs tracking-wide italic">
            Strict No-Refund Policy — High Performance Commitment
          </p>
        </div>
      </div>
    </footer>
  );
}
