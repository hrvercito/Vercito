/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';
import { useCMS } from '../context/CMSContext';
import { Quote, Award, ShieldCheck, MapPin, Star, ArrowRight, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';

interface SuccessStoriesProps {
  onOpenApplication?: () => void;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ onOpenApplication }) => {
  const { t, language } = useTranslation();
  const { cmsData } = useCMS();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const testimonialsList = cmsData.testimonials && cmsData.testimonials.length > 0 ? cmsData.testimonials : SUCCESS_STORIES;

  const filteredStories = testimonialsList.filter((s) => {
    if (selectedFilter === 'All') return true;
    return s.country === selectedFilter;
  });

  const isBn = language === 'bn';

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('testimonials.tag')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {['All', 'Italy', 'Germany', 'USA', 'France', 'Hungary', 'Spain'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === c
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-md font-extrabold scale-105'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c === 'All'
                ? t('testimonials.filterAll')
                : t('testimonials.studentsIn', { country: c })}
            </button>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => {
            const quoteText = isBn && story.quoteBn ? story.quoteBn : story.quote;
            const degreeText = isBn && story.degreeBn ? story.degreeBn : story.degree;
            const scholarshipText = isBn && story.scholarshipWonBn ? story.scholarshipWonBn : story.scholarshipWon;
            const homeCityText = isBn && story.homeCityBn ? story.homeCityBn : story.homeCity || 'Dhaka, BD';
            const visaMonthYear = story.visaApprovalYear || '2026';

            return (
              <motion.div
                key={story.id}
                whileHover={{ y: -6 }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 relative"
              >
                <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6 pointer-events-none" />

                <div className="space-y-4">
                  {/* Rating Stars & Requirement 8: "Visa Granted [month/year]" Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold font-mono uppercase">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Visa Granted {visaMonthYear}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                    "{quoteText}"
                  </p>

                  {scholarshipText && (
                    <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#0B1F3A] dark:text-[#D4AF37] flex items-center gap-2">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>{scholarshipText}</span>
                    </div>
                  )}
                </div>

                {/* Requirement 8: Student photo, name, home city, university & program */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
                  <img
                    src={story.photo}
                    alt={story.studentName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
                  />

                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0B1F3A] dark:text-white">
                      {story.studentName}
                    </h4>
                    <p className="text-[11px] text-[#D4AF37] font-semibold">
                      {story.university} — {degreeText}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>From: {homeCityText}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Requirement 8: End CTA Button "Start Your Application" */}
        {onOpenApplication && (
          <div className="mt-16 text-center space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
              {isBn ? 'আপনার ইউরোপ ও আমেরিকা উচ্চশিক্ষার গল্প তৈরি করুন' : 'Ready to Become Our Next Visa Success Story?'}
            </h3>
            <div>
              <button
                onClick={onOpenApplication}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{isBn ? 'আবেদন করা শুরু করুন' : 'Start Your Application'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
