/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Calculator,
  GraduationCap,
  CheckCircle,
  FileCheck2,
  Building
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';
import { useCMS } from '../context/CMSContext';

interface HeroProps {
  onOpenAIEvaluator: () => void;
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAIEvaluator, onOpenApplication }) => {
  const { language, t } = useTranslation();
  const { cmsData } = useCMS();
  const [quickCountry, setQuickCountry] = useState('Italy');
  const [quickDegree, setQuickDegree] = useState('Masters');
  const [quickIelts, setQuickIelts] = useState('6.5');

  const isBn = language === 'bn';
  const hero = cmsData.hero;

  const topBadge = isBn ? hero.topBadgeBn : hero.topBadgeEn;
  const title1 = isBn ? hero.title1Bn : hero.title1En;
  const title2 = isBn ? hero.title2Bn : hero.title2En;
  const subtitle = isBn ? hero.subtitleBn : hero.subtitleEn;

  const stat1Val = isBn ? hero.stat1ValBn : hero.stat1ValEn;
  const stat1Label = isBn ? hero.stat1LabelBn : hero.stat1LabelEn;
  const stat2Val = isBn ? hero.stat2ValBn : hero.stat2ValEn;
  const stat2Label = isBn ? hero.stat2LabelBn : hero.stat2LabelEn;
  const stat3Val = isBn ? hero.stat3ValBn : hero.stat3ValEn;
  const stat3Label = isBn ? hero.stat3LabelBn : hero.stat3LabelEn;
  const stat4Val = isBn ? hero.stat4ValBn : hero.stat4ValEn;
  const stat4Label = isBn ? hero.stat4LabelBn : hero.stat4LabelEn;

  const widgetBadge = isBn ? hero.widgetBadgeBn : hero.widgetBadgeEn;
  const widgetTitle = isBn ? hero.widgetTitleBn : hero.widgetTitleEn;

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0B1F3A] text-white">
      {/* Background Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-[#D4AF37]/20 via-[#0B1F3A]/60 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{topBadge}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              {title1} <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] bg-clip-text text-transparent">
                {title2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* Requirement 3: Two Clear CTA Buttons Stacked or Responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2 max-w-md mx-auto lg:mx-0">
              {/* Primary CTA: Start New Application */}
              <button
                onClick={onOpenApplication}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{t('hero.startAppBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Budget & Cost Estimator */}
              <a
                href="#cost-estimator"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('hero.costEstimatorBtn')}</span>
              </a>
            </div>

            {/* Trust Signals Grid */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{stat1Val}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat1Label}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{stat2Val}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat2Label}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{stat3Val}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat3Label}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{stat4Val}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{stat4Label}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quick Eligibility Check Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/15 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                {widgetBadge}
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {widgetTitle}
                  </h3>
                  <p className="text-xs text-slate-300 font-light mt-1">
                    Check immediate admission & scholarship eligibility in 1 minute.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Country
                  </label>
                  <select
                    value={quickCountry}
                    onChange={(e) => setQuickCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Italy">🇮🇹 Italy (DSU 100% Grant + €7,000 Living Stipend)</option>
                    <option value="Germany">🇩🇪 Germany (Tuition-Free Public Universities)</option>
                    <option value="USA">🇺🇸 USA (State Universities & STEM OPT)</option>
                    <option value="Finland">🇫🇮 Finland (EU Excellence Grants)</option>
                    <option value="Hungary">🇭🇺 Hungary (Stipendium Full Scholarship)</option>
                    <option value="France">🇫🇷 France (Campus France & Housing Grant)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Degree Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Bachelors', 'Masters', 'PhD'].map((degree) => (
                      <button
                        key={degree}
                        type="button"
                        onClick={() => setQuickDegree(degree)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                          quickDegree === degree
                            ? 'bg-[#D4AF37] text-[#0B1F3A] border-[#D4AF37] shadow-md'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {degree}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    IELTS / English Score
                  </label>
                  <select
                    value={quickIelts}
                    onChange={(e) => setQuickIelts(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="7.5">IELTS 7.0 - 8.0 (High Band Direct Admission)</option>
                    <option value="6.5">IELTS 6.0 - 6.5 (Standard Direct Entry)</option>
                    <option value="5.5">IELTS 5.5 / Duolingo English Test</option>
                    <option value="MOI">MOI (Medium of Instruction Waiver)</option>
                  </select>
                </div>

                <button
                  onClick={onOpenAIEvaluator}
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs hover:bg-[#E2C044] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze My Eligibility Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
