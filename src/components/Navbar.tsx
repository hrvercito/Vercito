/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Menu,
  X,
  Globe2,
  Moon,
  Sun,
  GraduationCap,
  ChevronRight,
  Send
} from 'lucide-react';
import { Currency } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAIEvaluator: () => void;
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  isDarkMode,
  onToggleDarkMode,
  onOpenAIEvaluator,
  onOpenAppointment,
  onOpenApplication,
}) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.scholarships'), href: '#scholarships' },
    { name: t('nav.universities'), href: '#universities' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.visaChecklist'), href: '#visa-checklist' },
    { name: t('nav.blog'), href: '#blog' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#0B1F3A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
              : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] p-0.5 shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#0B1F3A] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#0B1F3A] dark:text-white">
                    VERCITO
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37] font-semibold">
                    EU
                  </span>
                </div>
                <p className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase hidden sm:block">
                  {t('nav.tagline')}
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors py-1 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons & Utilities */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Language Switcher */}
              <LanguageSwitcher variant="navbar" />

              {/* Currency Selector */}
              <button
                onClick={onToggleCurrency}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200"
                title="Toggle Currency View"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currency === 'EUR' ? 'EUR (€)' : 'BDT (৳)'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] transition-all bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-[#D4AF37]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0B1F3A]" />
                )}
              </button>

              {/* AI Evaluator Trigger */}
              <button
                onClick={onOpenAIEvaluator}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-[#0B1F3A] text-white hover:from-[#0B1F3A] hover:to-slate-900 transition-all shadow-md border border-white/10 hover:border-[#D4AF37]/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>{t('nav.aiCheck')}</span>
              </button>

              {/* Consultation Appointment */}
              <button
                onClick={onOpenAppointment}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30 hover:scale-[1.02] transition-all active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('nav.bookConsultation')}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher variant="navbar" />
              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#0B1F3A] text-[#D4AF37] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#0B1F3A] text-white p-6 overflow-y-auto z-50 flex flex-col justify-between shadow-2xl border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37] p-0.5 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="font-serif text-xl font-bold text-white">VERCITO</span>
                    <p className="text-[10px] text-slate-400">{t('nav.tagline')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Language Selector */}
              <div className="py-4 border-b border-white/10">
                <LanguageSwitcher variant="mobile" />
              </div>

              {/* Navigation Links */}
              <nav className="py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm font-medium text-slate-200 hover:text-[#D4AF37] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 mb-1 text-xs font-semibold text-slate-300">
                <span>View Currency:</span>
                <button
                  onClick={onToggleCurrency}
                  className="px-3 py-1 rounded-lg bg-white/10 text-[#D4AF37] flex items-center gap-1 font-mono"
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{currency === 'EUR' ? 'EUR (€)' : 'BDT (৳)'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIEvaluator();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('nav.aiCheck')}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg shadow-[#D4AF37]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('nav.bookConsultation')}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApplication();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-xs"
              >
                <Send className="w-4 h-4" />
                <span>{t('nav.applyOnline')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
