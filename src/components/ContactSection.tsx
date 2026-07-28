/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface ContactSectionProps {
  onOpenAppointment: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAppointment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Offices in Dhaka & Chittagong</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Connect With VERCITO Senior Counselors
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Walk into our Gulshan 2 Dhaka or GEC Chittagong offices, or send us a message below for prompt European university support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Office Cards (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dhaka Head Office Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                    Dhaka Head Office (Gulshan 2)
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Primary European Counseling Hub</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Level 7, VERCITO Tower, Road 11, Block D, Gulshan 2, Dhaka-1212</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>+880 1700 000000 / +880 1711 000000</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Saturday – Thursday: 10:00 AM – 07:00 PM</span>
                </p>
              </div>

              <button
                onClick={onOpenAppointment}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all text-center"
              >
                Book Gulshan Office Visit
              </button>
            </div>

            {/* Chittagong Branch Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                    Chittagong Branch (GEC Circle)
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Greater Chattogram Student Center</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Suite 4A, Equity Central, GEC Circle, Chittagong</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>+880 1800 000000</span>
                </p>
              </div>

              <button
                onClick={onOpenAppointment}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-white/20 transition-all text-center"
              >
                Book Chittagong Visit
              </button>
            </div>
          </div>

          {/* Contact Form (Col 6-12) */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl space-y-6">
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white">
                Send Direct Message to VERCITO Admission Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Have a specific question regarding your eligibility or visa timeline? Leave a message and our counselor will respond within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                  Message Received!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you, {formData.name}. Our European admission desk has received your note and will contact you at {formData.phone || formData.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Al Mamun"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700 000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="mamun@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Message / Question *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your education background, CGPA, IELTS, and target country..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Counselors</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
