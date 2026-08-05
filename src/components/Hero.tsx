/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Compass,
  Plane,
  Award,
  ShieldCheck,
  Users,
  Building2,
  Headphones,
  Landmark
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { CountrySelect } from './CountrySelect';
import { VercitoLogo } from './VercitoLogo';

// Hero London Student Image
import heroStudentLondon from '../assets/images/hero_student_london_1785314504415.jpg';

interface HeroProps {
  onOpenAIEvaluator?: () => void;
  onOpenAppointment?: () => void;
  onOpenApplication?: () => void;
  onOpenStudentPortal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAIEvaluator,
  onOpenAppointment,
  onOpenApplication,
  onOpenStudentPortal,
}) => {
  const { t, language } = useTranslation();
  const { cmsData } = useCMS();

  // Instant Check card state (preserved strictly as requested)
  const [quickCountry, setQuickCountry] = useState('Australia');
  const [quickDegree, setQuickDegree] = useState('Masters');
  const [quickIelts, setQuickIelts] = useState('6.5');

  const isBn = language === 'bn';
  const hero = cmsData.hero;

  const topBadge = isBn ? hero.topBadgeBn : hero.topBadgeEn;
  const title1 = isBn ? hero.title1Bn : hero.title1En;
  const title2 = isBn ? hero.title2Bn : hero.title2En;
  const subtitle = isBn ? hero.subtitleBn : hero.subtitleEn;
  const widgetBadge = isBn ? hero.widgetBadgeBn : hero.widgetBadgeEn;
  const widgetTitle = isBn ? hero.widgetTitleBn : hero.widgetTitleEn;

  // Key statistics from CMS
  const statsList = [
    {
      value: (isBn ? hero.stat1ValBn : hero.stat1ValEn) || '98.8%',
      label: (isBn ? hero.stat1LabelBn : hero.stat1LabelEn) || t('hero.visaSuccess'),
      icon: ShieldCheck,
    },
    {
      value: (isBn ? hero.stat2ValBn : hero.stat2ValEn) || '€7,000',
      label: (isBn ? hero.stat2LabelBn : hero.stat2LabelEn) || t('hero.maxScholarship'),
      icon: Award,
    },
    {
      value: (isBn ? hero.stat3ValBn : hero.stat3ValEn) || '3,500+',
      label: (isBn ? hero.stat3LabelBn : hero.stat3LabelEn) || t('hero.studentsPlaced'),
      icon: Users,
    },
    {
      value: (isBn ? hero.stat4ValBn : hero.stat4ValEn) || '100%',
      label: (isBn ? hero.stat4LabelBn : hero.stat4LabelEn) || t('hero.tuitionWaiver'),
      icon: Building2,
    },
  ];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] pt-20 sm:pt-24 lg:pt-28 pb-0 overflow-hidden bg-[#071B36] text-white flex flex-col justify-between">
      {/* 1. Background Image - London Sunset with Student */}
      <div className="absolute inset-0 z-0">
        <img
          src={(hero as any)?.heroBgImage || heroStudentLondon}
          alt="VERCITO Student in London facing skyline sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform filter brightness-95 contrast-105"
        />
        {/* Dark Navy Overlay matching reference image composition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041122] via-[#041122]/90 to-[#071B36]/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041122] via-transparent to-[#041122]/70 z-10" />
      </div>

      {/* Airplane Flying in Sky */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: ['-10%', '115%'],
            y: ['12%', '30%', '8%'],
            rotate: [10, 20, 8],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-12 sm:top-16 left-0 flex items-center gap-2 opacity-80"
        >
          <div className="h-0.5 w-48 sm:w-64 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37] transform rotate-45 drop-shadow-[0_0_15px_rgba(212,175,55,0.9)]" />
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: HEADLINE, DESCRIPTION & BUTTONS */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-4 sm:space-y-5 text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/60 border border-[#D4AF37]/70 text-[#D4AF37] text-[11px] sm:text-xs font-semibold tracking-wide backdrop-blur-md shadow-md">
              <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {isBn
                  ? topBadge || 'ইউরোপ ও আমেরিকা উচ্চশিক্ষা এবং স্টুডেন্ট ভিসা স্পেশালিস্ট'
                  : 'Europe & USA Higher Education & Student Visa Specialist'}
              </span>
            </div>

            {/* Headline matching Reference Image */}
            <div className="space-y-0.5">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {isBn ? (
                  title1 || 'আপনার ভবিষ্যৎ, আমাদের দিকনির্দেশনা।'
                ) : (
                  <>
                    Your Future, <br />
                    Our Guidance.
                  </>
                )}
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#D4AF37] leading-[1.1] pt-0.5 sm:pt-1">
                {isBn ? (
                  title2 || 'বিশ্বজুড়ে সুযোগ।'
                ) : (
                  <>
                    Worldwide <br />
                    Opportunities.
                  </>
                )}
              </h1>
            </div>

            {/* Description matching Reference Image */}
            <p className="text-slate-200 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl">
              {isBn
                ? subtitle || 'আমরা শিক্ষার্থীদের বিদেশে উচ্চশিক্ষার স্বপ্ন পূরণ এবং সফল আন্তর্জাতিক ক্যারিয়ার গড়ে তুলতে বিশেষজ্ঞ ভর্তি পরামর্শ, স্কলারশিপ সহায়তা, বিশ্ববিদ্যালয় নির্বাচন, ভিসা প্রসেসিং এবং ধারাবাহিক শিক্ষার্থী সহায়তা প্রদান করি।'
                : 'We help students achieve their dreams of studying abroad and build a successful global career through expert admission guidance, scholarship assistance, university selection, visa processing, and continuous student support.'}
            </p>

            {/* CTA Buttons - Apply Now & View My Application */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 max-w-md">
              {/* Primary Button */}
              <button
                onClick={onOpenApplication}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#041122] font-extrabold text-xs shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                <span>🎓 {t('hero.applyNow')} →</span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={onOpenStudentPortal}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#071B36]/80 hover:bg-[#0E2A4D] text-white font-bold text-xs border border-[#D4AF37] hover:border-[#f3cb4d] transition-all flex items-center justify-center gap-2 backdrop-blur-md uppercase tracking-wider shadow-lg cursor-pointer"
              >
                <span>📁 {t('hero.viewMyApplication')}</span>
              </button>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: INSTANT CHECK CARD */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="p-5 sm:p-6 lg:p-6 rounded-2xl bg-[#091D38]/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative">
              {/* Protruding Instant Check Badge on Top Right */}
              <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-md bg-[#D4AF37] text-[#071B36] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                {widgetBadge || t('hero.instantCheck')}
              </div>

              <div className="space-y-3.5 pt-1">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                    {widgetTitle || t('hero.checkEligibility')}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-normal mt-0.5">
                    {isBn ? '১ মিনিটে আপনার ভর্তি ও স্কলারশিপ যোগ্যতা যাচাই করুন।' : 'Check immediate admission & scholarship eligibility in 1 minute.'}
                  </p>
                </div>

                {/* Target Country Select Dropdown */}
                <CountrySelect
                  value={quickCountry}
                  onChange={setQuickCountry}
                  label={t('hero.targetCountry')}
                />

                {/* Degree Level Segmented Control */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    {t('hero.degreeLevel')}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#051329] rounded-xl border border-slate-800">
                    {[
                      { key: 'Bachelors', labelBn: 'ব্যাচেলরস', labelEn: 'Bachelors' },
                      { key: 'Masters', labelBn: 'মাস্টার্স', labelEn: 'Masters' },
                      { key: 'PhD', labelBn: 'পিএইচডি', labelEn: 'PhD' }
                    ].map((degree) => (
                      <button
                        key={degree.key}
                        type="button"
                        onClick={() => setQuickDegree(degree.key)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          quickDegree === degree.key
                            ? 'bg-[#D4AF37] text-[#071B36] shadow-md font-extrabold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {isBn ? degree.labelBn : degree.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IELTS / English Score Select */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    {t('hero.ieltsScore')}
                  </label>
                  <select
                    value={quickIelts}
                    onChange={(e) => setQuickIelts(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#051329] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-medium"
                  >
                    <option value="7.5">{isBn ? 'আইইএলটিএস ৭.০ - ৮.০ (সরাসরি স্কলারশিপ ও এডমিশন)' : 'IELTS 7.0 - 8.0 (High Band Direct Admission)'}</option>
                    <option value="6.5">{isBn ? 'আইইএলটিএস ৬.০ - ৬.৫ (স্ট্যান্ডার্ড এন্ট্রি)' : 'IELTS 6.0 - 6.5 (Standard Direct Entry)'}</option>
                    <option value="5.5">{isBn ? 'আইইএলটিএস ৫.৫ / ডুওলিঙ্গো ইংলিশ টেস্ট' : 'IELTS 5.5 / Duolingo English Test'}</option>
                    <option value="MOI">{isBn ? 'এমওআই (আইইএলটিএস মুক্ত ওয়েভার)' : 'MOI (Medium of Instruction Waiver)'}</option>
                  </select>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={() => onOpenAIEvaluator?.()}
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#071B36] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-wider mt-1 active:scale-98 cursor-pointer"
                >
                  <span>✈ {t('hero.analyzeEligibility')}</span>
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM STATISTICS BAR MATCHING REFERENCE */}
      {/* ========================================= */}
      <div className="relative z-20 w-full bg-[#041122]/90 border-t border-white/10 py-3.5 sm:py-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {statsList.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="flex items-center justify-center md:justify-start gap-3 pt-2 md:pt-0 md:px-4">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-serif text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium">{stat.label}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};


