import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Check } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

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
              GET IN TOUCH
            </p>
            <h1
              className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-display"
              data-testid="text-contact-title"
            >
              CONTACT US
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-[#171717] border border-white/5 p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-8">
                    SEND A MESSAGE
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display">
                        NAME
                      </label>
                      <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                        placeholder="Your full name"
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                        placeholder="your@email.com"
                        data-testid="input-contact-email"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display">
                        SUBJECT
                      </label>
                      <input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                        placeholder="What's this about?"
                        data-testid="input-contact-subject"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2 font-display">
                        MESSAGE
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full bg-[#0a0a0a] border border-neutral-700 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600 resize-none"
                        placeholder="Your message..."
                        data-testid="input-contact-message"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 font-bold uppercase tracking-[0.15em] text-sm hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                    data-testid="button-send-message"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> SEND MESSAGE
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#171717] border border-white/5 p-8 md:p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <Check className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display" data-testid="text-contact-success">
                    MESSAGE SENT
                  </h3>
                  <p className="text-neutral-400 mt-4 text-sm">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-amber-500 text-xs font-bold uppercase tracking-[0.15em] hover:text-amber-400 transition-colors"
                    data-testid="button-send-another"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display mb-6">
                  HAVE QUESTIONS ABOUT OUR PROGRAMS?
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Whether you're looking to enroll your child in one of our programs, rent the turf, or learn more about our international scouting trips — we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-[#171717] border border-white/5" data-testid="card-contact-email">
                  <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase font-display mb-1">EMAIL</h3>
                    <p className="text-amber-500 text-sm font-mono">info@gingasoccer.ca</p>
                    <p className="text-neutral-500 text-xs mt-1">We reply within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#171717] border border-white/5" data-testid="card-contact-address">
                  <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase font-display mb-1">LOCATION</h3>
                    <p className="text-neutral-300 text-sm">1197 Unit 5 Union Street</p>
                    <p className="text-neutral-300 text-sm">Kitchener, Ontario</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#171717] border border-white/5" data-testid="card-contact-hours">
                  <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase font-display mb-1">TRAINING HOURS</h3>
                    <p className="text-neutral-300 text-sm">Mon-Fri: 11:00am - 8:00pm</p>
                    <p className="text-neutral-300 text-sm">Sat-Sun: 3:00pm - 5:00pm</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
