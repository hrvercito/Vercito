/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { useTranslation } from '../i18n/LanguageContext';

export const FAQSection: React.FC = () => {
  const { cmsData } = useCMS();
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const FAQS = cmsData.faqs;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  // Requirement 9: Collapsed by default (openFaqId = null)
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const categories = [
    { id: 'All', bn: 'সবপ্রশ্ন', en: 'All' },
    { id: 'Admissions', bn: 'ভর্তি প্রক্রিয়া', en: 'Admissions' },
    { id: 'Scholarships', bn: 'স্কলারশিপ', en: 'Scholarships' },
    { id: 'Visa & Embassy', bn: 'ভিসা ও এম্বাসি', en: 'Visa & Embassy' },
    { id: 'Finances', bn: 'আর্থিক স্বচ্ছলতা', en: 'Finances' },
    { id: 'General', bn: 'সাধারণ তথ্য', en: 'General' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-[#071426] transition-colors border-t border-slate-200 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('faq.tag')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={
                isBn
                  ? 'প্রশ্ন খুঁজুন (যেমনঃ আইইএলটিএস, ডিএসইউ গ্রান্ট, ব্লকড একাউন্ট, পররাষ্ট্রমন্ত্রণালয়, ব্যাংক ব্যালেন্স)...'
                  : 'Search FAQ keywords (e.g. IELTS, DSU grant, Blocked account, MOFA, Bank balance)...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37] shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-md font-extrabold'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                {isBn ? c.bn : c.en}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List (Collapsed by Default) */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:border-[#D4AF37]/40 transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#0B1F3A] dark:text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-white/5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
