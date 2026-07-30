/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, Sparkles, Send, FolderKanban, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickAccessSectionProps {
  onExploreUniversities: () => void;
  onCheckEligibility: () => void;
  onApplyOnline: () => void;
  onViewApplication: () => void;
}

export const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  onExploreUniversities,
  onCheckEligibility,
  onApplyOnline,
  onViewApplication,
}) => {
  const actions = [
    {
      id: 'explore',
      title: 'Explore Universities',
      subtitle: 'Browse 150+ partner universities in Europe & USA',
      icon: Building2,
      badge: '150+ Partners',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      action: onExploreUniversities,
      buttonText: 'View Universities',
    },
    {
      id: 'eligibility',
      title: 'Check Eligibility',
      subtitle: 'Instant AI evaluation for admission & grants',
      icon: Sparkles,
      badge: 'AI Instant',
      badgeColor: 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30',
      action: onCheckEligibility,
      buttonText: 'Check Now',
    },
    {
      id: 'apply',
      title: 'Apply Online',
      subtitle: 'Submit your student dossier & start processing',
      icon: Send,
      badge: 'Easy Steps',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      action: onApplyOnline,
      buttonText: 'Start Application',
    },
    {
      id: 'tracking',
      title: 'View My Application',
      subtitle: 'Track status with Application or Transaction ID',
      icon: FolderKanban,
      badge: 'Live Status',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      action: onViewApplication,
      buttonText: 'Track Status',
    },
  ];

  return (
    <section className="relative z-30 -mt-6 sm:-mt-8 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={item.action}
              className="group p-4 sm:p-5 rounded-2xl bg-[#091D38] dark:bg-[#0B1F3A] border border-white/10 hover:border-[#D4AF37]/60 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-300" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1F3A] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-normal mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                <span>{item.buttonText}</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
