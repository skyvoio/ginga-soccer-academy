import { FileDown, Mail, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function RegistrationMaintenance() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="border border-amber-500/30 bg-[#171717] p-8 sm:p-12 md:p-16 text-center">
          <p className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase font-display mb-5">
            Registration update
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display mb-8">
            Register with our 2026 form
          </h1>
          <p className="text-neutral-200 text-base sm:text-lg leading-relaxed mb-10" data-testid="registration-maintenance-notice">
            Online registration is currently undergoing quick system maintenance. Please download our 2026 Programs Registration Form, fill it out, and email it directly to us or bring it in-person.
          </p>
          <a
            href="/Ginga_2026_Programs_Registration_Form.pdf"
            download="Ginga_2026_Programs_Registration_Form.pdf"
            onClick={() => trackEvent("registration_form_pdf_download_clicked", {
              form: "programs_2026",
              location: "registration_maintenance",
            })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 sm:px-10 py-4 font-bold uppercase tracking-wide text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 text-center"
            data-testid="download-registration-pdf"
          >
            <FileDown size={20} className="shrink-0" />
            Download 2026 Programs Registration Form (PDF)
          </a>
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-10 text-sm">
            <a href="mailto:info@gingasoccer.ca?subject=2026%20Programs%20Registration%20Form" className="inline-flex items-center gap-2 text-neutral-300 hover:text-amber-500 transition-colors">
              <Mail size={17} className="text-amber-500" />
              info@gingasoccer.ca
            </a>
            <span className="inline-flex items-center gap-2 text-neutral-300">
              <MapPin size={17} className="text-amber-500" />
              1197 Union Street, Unit 5, Kitchener, ON
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}