/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  PlaneTakeoff,
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface VisaProcessStepsProps {
  onOpenAppointment?: () => void;
}

export const VisaProcessSteps: React.FC<VisaProcessStepsProps> = ({ onOpenAppointment }) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';

  const steps = [
    {
      num: '01',
      title: isBn ? 'ডকুমেন্ট ভেরিফিকেশন ও লিগ্যালাইজেশন' : 'Document Verification',
      shortTitle: 'Verification',
      icon: FileCheck2,
      desc: isBn
        ? 'শিক্ষা বোর্ড, শিক্ষা মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয় (MOFA) থেকে মূল সার্টিফিকেট ও ট্রান্সক্রিপ্ট সত্যায়ন।'
        : 'Board, MOE & Ministry of Foreign Affairs (MOFA) attestation for academic certificates and transcripts.',
      timeframe: '2 - 3 Weeks',
      badge: isBn ? 'ধাপ ১' : 'Step 1',
    },
    {
      num: '02',
      title: isBn ? 'বিশ্ববিদ্যালয় আবেদন ও অফার লেটার' : 'University Application',
      shortTitle: 'Application',
      icon: GraduationCap,
      desc: isBn
        ? 'পছন্দের পাবলিক বিশ্ববিদ্যালয়ে টিউটরিয়াল ও স্কলারশিপ ক্যাটাগরিতে আবেদন জমা ও অফার লেটার সংগ্রহ।'
        : 'Direct submission to target European & US public universities with scholarship evaluation & pre-enrollment.',
      timeframe: '3 - 6 Weeks',
      badge: isBn ? 'ধাপ ২' : 'Step 2',
    },
    {
      num: '03',
      title: isBn ? 'ভিসা ফাইল জমা ও এমবেসি ইন্টারভিউ' : 'Visa Filing & Appointment',
      shortTitle: 'Visa Filing',
      icon: ShieldCheck,
      desc: isBn
        ? 'ব্যাংক সলভেন্সি সার্টিফিকেট, অডিট পেপারস প্রস্তুত ও VFS/এমবেসি অ্যাপয়েন্টমেন্টে ভিসা ফাইল সাবমিশন।'
        : 'Bank solvency audit, VFS appointment scheduling, and mock embassy interview preparation.',
      timeframe: '4 - 8 Weeks',
      badge: isBn ? 'ধাপ ৩' : 'Step 3',
    },
    {
      num: '04',
      title: isBn ? 'ফ্লাইট বুকিং ও ট্রাভেল প্রিপারেশন' : 'Travel Prep & Arrival',
      shortTitle: 'Travel Prep',
      icon: PlaneTakeoff,
      desc: isBn
        ? 'ভিসা প্রাপ্তির পর স্টুডেন্ট হাউজিং বা ডরমিটরি বুকিং, টিকিট রিজার্ভেশন ও প্রি-ডিপার্চার ব্রিফিং।'
        : 'Student accommodation booking, flight reservation, airport pickup, and pre-departure orientation.',
      timeframe: '1 - 2 Weeks',
      badge: isBn ? 'ধাপ ৪' : 'Step 4',
    },
  ];

  return (
    <section id="process-steps" className="py-20 bg-slate-50 dark:bg-[#0B1F3A]/60 text-slate-900 dark:text-slate-100 border-y border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{t('process.tag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('process.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t('process.subtitle')}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Badge & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37] uppercase">
                      {step.badge}
                    </span>
                    <span className="font-serif text-3xl font-black text-slate-300 dark:text-slate-700 group-hover:text-[#D4AF37] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] dark:bg-white/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Footer Timeframe Tag */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Est: {step.timeframe}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        {onOpenAppointment && (
          <div className="mt-12 text-center">
            <button
              onClick={onOpenAppointment}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B1F3A] text-white dark:bg-white dark:text-[#0B1F3A] font-extrabold text-xs shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>{isBn ? 'আপনার ভি্স ফাইল তৈরি শুরু করুন' : 'Start Your Visa File Preparation'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
