/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Compass,
  FileText,
  Award,
  ShieldCheck,
  Stamp,
  PlaneTakeoff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAppointment,
  onOpenApplication,
}) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-[#D4AF37]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'Stamp':
        return <Stamp className="w-6 h-6 text-[#D4AF37]" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === activeService) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('services.tag')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => {
            const isSelected = activeService === service.id;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6 }}
                onClick={() => setActiveService(service.id)}
                className={`cursor-pointer rounded-2xl p-7 transition-all duration-300 border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0B1F3A] text-white border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                    : 'bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                {/* Badge if exists */}
                {service.badge && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#D4AF37] text-[#0B1F3A]">
                    {service.badge}
                  </span>
                )}

                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-5">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-serif text-lg font-bold mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-6 ${isSelected ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
                    {service.shortDesc}
                  </p>

                  {/* Features Bullets */}
                  <ul className="space-y-2 text-xs">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className={isSelected ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-bold">
                  <span className="text-[#D4AF37]">Detailed Scope</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#D4AF37]' : 'text-slate-400'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlighted Service Drawer / Summary Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-slate-900 text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Selected Service Focus</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {selectedServiceObj.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {selectedServiceObj.fullDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onOpenAppointment}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>{t('services.bookConsultation')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenApplication}
                className="w-full py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all text-center"
              >
                {t('services.startApplication')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
