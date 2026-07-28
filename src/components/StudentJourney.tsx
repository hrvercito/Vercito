/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { STUDENT_JOURNEY_STEPS } from '../data/mockData';
import { CheckCircle2, Clock, Sparkles, Send, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface StudentJourneyProps {
  onOpenAppointment: () => void;
}

export const StudentJourney: React.FC<StudentJourneyProps> = ({ onOpenAppointment }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#071426] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured Roadmap To Europe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            The VERCITO Student Journey Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            A battle-tested 6-step roadmap designed for Bangladeshi students — eliminating embassy delays, document errors, and visa complications.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Vertical Connecting Line for Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#0B1F3A] to-[#D4AF37] -translate-x-1/2" />

          <div className="space-y-12 relative z-10">
            {STUDENT_JOURNEY_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          {step.subtitle}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          {step.duration}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {step.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Key Deliverables:
                        </p>
                        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                          {step.keyActionItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Center Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-base flex items-center justify-center shadow-xl shadow-[#D4AF37]/30 ring-8 ring-slate-50 dark:ring-[#071426] shrink-0 z-20">
                    0{step.stepNumber}
                  </div>

                  {/* Empty Spacer Column for Alignment */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 text-center">
          <button
            onClick={onOpenAppointment}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Step 1: Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
