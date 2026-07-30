/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UserCheck, FileCheck, Award, Plane, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SimpleApplicationProcessProps {
  onStartApplication?: () => void;
}

export const SimpleApplicationProcess: React.FC<SimpleApplicationProcessProps> = ({
  onStartApplication,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Eligibility & Free Counseling',
      desc: 'Free assessment of your academic transcript, IELTS/MOI, and target university shortlist.',
      icon: UserCheck,
    },
    {
      num: '02',
      title: 'Document Prep & Application',
      desc: 'Professional SOP drafting, document translation, and official university portal submission.',
      icon: FileCheck,
    },
    {
      num: '03',
      title: 'Offer Letter & Scholarship',
      desc: 'Receive official admission offer and file for DSU / Regional tuition waivers up to €7,000.',
      icon: Award,
    },
    {
      num: '04',
      title: 'Visa Approval & Travel',
      desc: 'Embassy interview preparation, financial file audit, visa issuance, and departure support.',
      icon: Plane,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#071B36] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-2">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            How Your Journey Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5">
            A clear, transparent, and structured path from initial assessment to student visa issuance.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#091D38] border border-white/10 hover:border-[#D4AF37]/50 shadow-lg relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-2xl font-black text-white/20">{step.num}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#D4AF37]/40">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        {onStartApplication && (
          <div className="mt-10 text-center">
            <button
              onClick={onStartApplication}
              className="px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e2bd44] text-[#071B36] font-extrabold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Your Application Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
