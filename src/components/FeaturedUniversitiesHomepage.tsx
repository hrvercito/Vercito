/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Building2, MapPin, Award, GraduationCap, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Currency, UniversityPartner } from '../types';
import { useCMS } from '../context/CMSContext';

interface FeaturedUniversitiesHomepageProps {
  currency: Currency;
  onViewAllUniversities: () => void;
  onSelectUniversityForApplication: (uniName: string) => void;
}

export const FeaturedUniversitiesHomepage: React.FC<FeaturedUniversitiesHomepageProps> = ({
  currency,
  onViewAllUniversities,
  onSelectUniversityForApplication,
}) => {
  const { cmsData } = useCMS();
  const allUnis: UniversityPartner[] = cmsData.universities || [];

  // Pick top 4 featured universities for the compact homepage section
  const featuredUnis = allUnis.slice(0, 4);

  const EUR_TO_BDT_RATE = 132;
  const formatMoney = (amountEUR?: number) => {
    if (amountEUR === undefined || amountEUR === null) return 'Contact Admissions';
    if (amountEUR === 0) return 'Tuition Free (€0)';
    if (currency === 'BDT') {
      const bdt = Math.round(amountEUR * EUR_TO_BDT_RATE);
      return `৳${bdt.toLocaleString('en-IN')}/yr`;
    }
    return `€${amountEUR.toLocaleString('en-US')}/yr`;
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Featured Universities</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Top Partner Institutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 max-w-xl">
            Explore accredited public & private universities with tuition waiver & scholarship options.
          </p>
        </div>

        <button
          onClick={onViewAllUniversities}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase border border-white/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>View All Universities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of strictly 3-4 featured university cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredUnis.map((uni, idx) => (
          <motion.div
            key={uni.id || uni.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="group rounded-2xl bg-[#091D38] border border-white/10 hover:border-[#D4AF37]/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Header / Image */}
            <div className="relative h-40 overflow-hidden bg-slate-950">
              <img
                src={uni.image || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80'}
                alt={uni.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091D38] via-transparent to-black/40" />

              {/* Country Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/20 text-[11px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md">
                <span>{uni.country === 'Italy' ? '🇮🇹' : uni.country === 'Germany' ? '🇩🇪' : uni.country === 'Hungary' ? '🇭🇺' : uni.country === 'France' ? '🇫🇷' : uni.country === 'USA' ? '🇺🇸' : '🇪🇺'}</span>
                <span>{uni.country}</span>
              </div>

              {/* QS Rank Badge */}
              {uni.ranking && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-current" />
                  <span>QS #{uni.ranking}</span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{uni.city}, {uni.country}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                  {uni.name}
                </h3>
              </div>

              {/* Quick Info Tags */}
              <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tuition:</span>
                  <span className="font-bold text-[#D4AF37]">{formatMoney(uni.tuitionFeePerYearEUR)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Grant / Aid:</span>
                  <span className="font-bold text-emerald-400">{uni.scholarshipAmount || uni.scholarshipsOffered?.[0] || 'DSU Grant Eligible'}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectUniversityForApplication(uni.name)}
                className="w-full mt-2 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0B1F3A] font-extrabold text-xs transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply To University</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom View All Link for Mobile */}
      <div className="mt-8 text-center sm:hidden">
        <button
          onClick={onViewAllUniversities}
          className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>View All 150+ Universities</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
