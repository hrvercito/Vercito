/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, GraduationCap, FileCheck2, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseVercitoProps {
  onLearnMore?: () => void;
}

export const WhyChooseVercito: React.FC<WhyChooseVercitoProps> = ({ onLearnMore }) => {
  const features = [
    {
      icon: ShieldCheck,
      title: '98.8% Visa Success Rate',
      description: 'Rigorous 3-tier document audit & embassy interview simulation before filing.',
    },
    {
      icon: GraduationCap,
      title: '150+ Partner Universities',
      description: 'Direct admissions to premier public & private universities in Europe & USA.',
    },
    {
      icon: FileCheck2,
      title: 'Full Scholarship Assistance',
      description: 'Guidance for DSU, Regional Grants, and Merit Scholarships up to €7,000/yr.',
    },
    {
      icon: HeartHandshake,
      title: 'End-to-End & Arrival Support',
      description: 'Complete guidance from university apply to airport pickup & residence permit.',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-slate-900/60 dark:bg-black/20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
              <span>Why Choose Vercito</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Your Trusted Gateway to World-Class Education
            </h2>
          </div>

          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline cursor-pointer"
            >
              <span>Learn More About Vercito</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Maximum 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#0B1F3A] border border-white/10 hover:border-[#D4AF37]/40 shadow-md hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white mb-1.5">{feat.title}</h3>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
