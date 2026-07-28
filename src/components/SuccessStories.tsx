/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../data/mockData';
import { Quote, Award, ShieldCheck, MapPin, GraduationCap, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const SuccessStories: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredStories = SUCCESS_STORIES.filter((s) => {
    if (selectedFilter === 'All') return true;
    return s.country === selectedFilter;
  });

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Proven Student Track Record</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Bangladeshi Scholars Thriving in Europe
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Real stories from Bangladeshi students who fulfilled their European education dreams with VERCITO's expert guidance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {['All', 'Italy', 'Germany', 'France', 'Hungary', 'Spain'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === c
                  ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c === 'All' ? 'All Verified Stories' : `Students in ${c}`}
            </button>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -6 }}
              className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold ml-2 text-slate-700 dark:text-slate-200">
                    Visa Granted {story.visaApprovalYear}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">
                  "{story.quote}"
                </p>

                {story.scholarshipWon && (
                  <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#0B1F3A] dark:text-[#D4AF37] flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{story.scholarshipWon}</span>
                  </div>
                )}
              </div>

              {/* Student Bio Profile */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
                <img
                  src={story.photo}
                  alt={story.studentName}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                />

                <div>
                  <h4 className="font-serif text-sm font-bold text-[#0B1F3A] dark:text-white">
                    {story.studentName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {story.degree}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      {story.homeCity}
                    </span>
                    <span>•</span>
                    <span className="text-[#D4AF37] font-semibold">{story.university}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
