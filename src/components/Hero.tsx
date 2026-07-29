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
  Headphones
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { CountrySelect } from './CountrySelect';
import { VercitoLogo } from './VercitoLogo';

// Hero London Student Image
import heroStudentLondon from '../assets/images/hero_student_london_1785314504415.jpg';

interface HeroProps {
  onOpenAIEvaluator: () => void;
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAIEvaluator,
  onOpenAppointment,
  onOpenApplication,
}) => {
  const { language } = useTranslation();
  const { cmsData } = useCMS();

  // Instant Check card state (preserved strictly as requested)
  const [quickCountry, setQuickCountry] = useState('Italy');
  const [quickDegree, setQuickDegree] = useState('Masters');
  const [quickIelts, setQuickIelts] = useState('6.5');

  const isBn = language === 'bn';
  const hero = cmsData.hero;

  const widgetBadge = isBn ? hero.widgetBadgeBn : hero.widgetBadgeEn;
  const widgetTitle = isBn ? hero.widgetTitleBn : hero.widgetTitleEn;

  // 5 Statistics cards required by user
  const statsList = [
    {
      value: '98.8%',
      label: 'Visa Success Rate',
      icon: ShieldCheck,
    },
    {
      value: '€7,000',
      label: 'Max Annual Scholarship',
      icon: Award,
    },
    {
      value: '3,500+',
      label: 'Successful Students',
      icon: Users,
    },
    {
      value: '100+',
      label: 'University Partners',
      icon: Building2,
    },
    {
      value: '24/7',
      label: 'Student Support',
      icon: Headphones,
    },
  ];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] pt-20 sm:pt-24 lg:pt-28 pb-0 overflow-hidden bg-[#071B36] text-white flex flex-col justify-between">
      {/* 1. Background Image - London Sunset with Student */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroStudentLondon}
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
              <span>Europe & USA Higher Education & Student Visa Specialist</span>
            </div>

            {/* Headline matching Reference Image */}
            <div className="space-y-0.5">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Your Future, <br />
                Our Guidance.
              </h1>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#D4AF37] leading-[1.1] pt-0.5 sm:pt-1">
                Worldwide <br />
                Opportunities.
              </h1>
            </div>

            {/* Description matching Reference Image */}
            <p className="text-slate-200 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl">
              We help students achieve their dreams of studying abroad and build a successful global career through expert admission guidance, scholarship assistance, university selection, visa processing, and continuous student support.
            </p>

            {/* CTA Buttons matching Reference Image */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 max-w-md">
              {/* Primary Button */}
              <button
                onClick={onOpenApplication}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#041122] font-extrabold text-xs shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <GraduationCap className="w-4 h-4 text-[#041122]" />
                <span>APPLY NOW</span>
                <ArrowRight className="w-4 h-4 text-[#041122]" />
              </button>

              {/* Secondary Button */}
              <a
                href="#services"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#071B36]/80 hover:bg-[#0E2A4D] text-white font-bold text-xs border border-[#D4AF37] hover:border-[#f3cb4d] transition-all flex items-center justify-center gap-2 backdrop-blur-md uppercase tracking-wider shadow-lg"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>OUR SERVICES</span>
              </a>
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
                {widgetBadge || 'INSTANT CHECK'}
              </div>

              <div className="space-y-3.5 pt-1">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight">
                    {widgetTitle || 'Check Admission Eligibility'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-normal mt-0.5">
                    Check immediate admission & scholarship eligibility in 1 minute.
                  </p>
                </div>

                {/* Target Country Select Dropdown */}
                <CountrySelect
                  value={quickCountry}
                  onChange={setQuickCountry}
                  label="Target Country"
                />

                {/* Degree Level Segmented Control */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    Degree Level
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#051329] rounded-xl border border-slate-800">
                    {['Bachelors', 'Masters', 'PhD'].map((degree) => (
                      <button
                        key={degree}
                        type="button"
                        onClick={() => setQuickDegree(degree)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                          quickDegree === degree
                            ? 'bg-[#D4AF37] text-[#071B36] shadow-md font-extrabold'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {degree}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IELTS / English Score Select */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    IELTS / English Score
                  </label>
                  <select
                    value={quickIelts}
                    onChange={(e) => setQuickIelts(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#051329] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-medium"
                  >
                    <option value="7.5">IELTS 7.0 - 8.0 (High Band Direct Admission)</option>
                    <option value="6.5">IELTS 6.0 - 6.5 (Standard Direct Entry)</option>
                    <option value="5.5">IELTS 5.5 / Duolingo English Test</option>
                    <option value="MOI">MOI (Medium of Instruction Waiver)</option>
                  </select>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={onOpenAIEvaluator}
                  className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#071B36] font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-wider mt-1 active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#071B36]" />
                  <span>ANALYZE MY ELIGIBILITY NOW</span>
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
            
            {/* Stat 1 */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2 md:pt-0 md:px-4">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-extrabold text-white">98.8%</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium">Visa Success Rate</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2 md:pt-0 md:px-4">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-extrabold text-white">€7,000</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium">Max Annual DSU Grant</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2 md:pt-0 md:px-4">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-extrabold text-white">3,500+</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium">Successful Students</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2 md:pt-0 md:px-4">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-extrabold text-white">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium">Tuition Waiver Support</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};


