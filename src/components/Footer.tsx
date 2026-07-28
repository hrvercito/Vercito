/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  FileCode2
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Footer: React.FC = () => {
  const { t, openSitemap } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#071426] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand & Vision (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] p-0.5">
                <div className="w-full h-full bg-[#0B1F3A] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  VERCITO
                </span>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  {t('nav.tagline')}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {t('footer.aboutText')}
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-1 flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Website Language (ভাষা সিলেক্ট করুন):
              </span>
              <LanguageSwitcher variant="footer" />
            </div>

            {/* Accreditation Badges */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Licensed Foreign Ed Counselors
              </span>
            </div>
          </div>

          {/* Quick Navigation (Col 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in Italy (DSU €7,000 Grant)</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in Germany (Tuition-Free Public Unis)</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in France (Sorbonne & Campus France)</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in Hungary (Stipendium Hungaricum)</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in Spain (Barcelona & Madrid)</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Study in Portugal & Poland</a></li>
            </ul>
          </div>

          {/* Office Locations (Col 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              {t('footer.officeLocations')}
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Dhaka Head Office:
                </p>
                <p className="pl-5 text-slate-400">
                  Level 7, VERCITO Tower, Road 11, Block D, Gulshan 2, Dhaka-1212
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Chittagong Branch:
                </p>
                <p className="pl-5 text-slate-400">
                  Suite 4A, Equity Central, GEC Circle, Chittagong
                </p>
              </div>

              <div className="space-y-1 pt-1 border-t border-white/5">
                <p className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>+880 1700 000000 / +880 1800 000000</span>
                </p>
                <p className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>hr.vercito@gmail.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#D4AF37] uppercase tracking-wider">
              European Intake Alert
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Subscribe for upcoming deadline alerts, DSU scholarship updates, and VFS appointment slots.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! You will receive intake updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Sitemap Modal Button */}
            <div className="pt-2">
              <button
                onClick={openSitemap}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono border border-white/10 transition-all"
              >
                <FileCode2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>SEO Multilingual Sitemap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VERCITO International Education Consultancy. {t('footer.rights')}</p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
