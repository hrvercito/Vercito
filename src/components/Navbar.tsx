/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Globe2,
  Moon,
  Sun,
  GraduationCap,
  BookOpen,
  FolderKanban,
  ShieldCheck,
  Headphones,
  ChevronRight,
  Sparkles,
  Calendar,
  Send
} from 'lucide-react';
import { Currency } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VercitoLogo } from './VercitoLogo';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAIEvaluator: () => void;
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
  onOpenStudentPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  isDarkMode,
  onToggleDarkMode,
  onOpenAIEvaluator,
  onOpenAppointment,
  onOpenApplication,
  onOpenStudentPortal,
}) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'ABOUT US', href: '#process-steps' },
    { name: 'DESTINATIONS', href: '#destinations' },
    { name: 'SERVICES', href: '#services' },
    { name: 'UNIVERSITIES', href: '#universities' },
    { name: 'SCHOLARSHIPS', href: '#scholarships' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const quickNavLinks = [
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.scholarships'), href: '#scholarships' },
    { name: t('nav.universities'), href: '#universities' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.visaChecklist'), href: '#doc-guide' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  const primaryCards = [
    {
      id: 'info',
      icon: BookOpen,
      title: t('nav.infoGuidelines'),
      desc: t('nav.infoGuidelinesDesc'),
      href: '#process-steps',
      action: () => setIsDrawerOpen(false),
      badge: 'GUIDELINES',
      gradient: 'from-blue-600/20 to-indigo-600/20 text-blue-500',
    },
    {
      id: 'portal',
      icon: FolderKanban,
      title: t('nav.studentPortal'),
      desc: t('nav.studentPortalDesc'),
      action: () => {
        setIsDrawerOpen(false);
        onOpenStudentPortal();
      },
      badge: 'LIVE TRACKER',
      gradient: 'from-amber-500/20 to-yellow-600/20 text-amber-500',
    },
    {
      id: 'admin',
      icon: ShieldCheck,
      title: t('nav.adminPanel'),
      desc: t('nav.adminPanelDesc'),
      href: '#admin',
      action: () => setIsDrawerOpen(false),
      badge: 'PORTAL LOGIN',
      gradient: 'from-purple-600/20 to-pink-600/20 text-purple-400',
    },
    {
      id: 'support',
      icon: Headphones,
      title: t('nav.supportContact'),
      desc: t('nav.supportContactDesc'),
      href: '#contact',
      action: () => setIsDrawerOpen(false),
      badge: 'DHAKA & CTG',
      gradient: 'from-emerald-600/20 to-teal-600/20 text-emerald-400',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#0B1F3A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5'
              : 'bg-[#0B1F3A]/95 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-xl py-2.5 text-white'
            : 'bg-gradient-to-b from-[#0B1F3A]/90 to-transparent py-3 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo using official Vercito Logo */}
            <a href="#" className="flex items-center group focus:outline-none shrink-0">
              <VercitoLogo variant="horizontal" size="sm" isDarkBg={true} />
            </a>

            {/* Desktop Navigation Menu Links matching Image 1 */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-extrabold tracking-wider text-slate-100 hover:text-[#D4AF37] transition-colors relative py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Currency Selector */}
              <button
                onClick={onToggleCurrency}
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-white/20 hover:border-[#D4AF37] transition-all bg-white/10 text-white"
                title="Toggle Currency (EUR / BDT)"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currency === 'EUR' ? 'EUR' : 'BDT'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-1.5 sm:p-2 rounded-xl border border-white/20 hover:border-[#D4AF37] transition-all bg-white/10 text-white"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-white" />}
              </button>

              {/* Student Portal Button */}
              <button
                onClick={onOpenStudentPortal}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1F3A] transition-all"
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Portal</span>
              </button>

              {/* Apply Now Primary Button matching Image 1 */}
              <button
                onClick={onOpenApplication}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                APPLY NOW
              </button>

              {/* Menu Drawer Toggle */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="flex items-center gap-1.5 p-2 px-2.5 rounded-xl bg-white/10 text-[#D4AF37] font-bold text-xs hover:bg-white/20 transition-colors border border-white/20"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Requirement 1: Slide-over Navigation Side Menu with 4 Icon Cards */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0B1F3A] text-white p-6 overflow-y-auto shadow-2xl border-l border-white/10 flex flex-col justify-between z-50 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37] p-0.5 flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                    <GraduationCap className="w-6 h-6 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="font-serif text-xl font-bold text-white tracking-tight">VERCITO</span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t('nav.tagline')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* 4 Primary Icon-Based Cards */}
              <div className="py-6 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Main Navigation Hub
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {primaryCards.map((card) => {
                    const IconComp = card.icon;
                    return (
                      <a
                        key={card.id}
                        href={card.href || '#'}
                        onClick={(e) => {
                          if (card.action) card.action();
                        }}
                        className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-[#D4AF37] transition-all group relative overflow-hidden block"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`p-3 rounded-xl bg-slate-800 ${card.gradient} group-hover:scale-110 transition-transform`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                                {card.title}
                              </h4>
                              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                                {card.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {card.desc}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Quick Page Links
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-[#D4AF37] p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onOpenAIEvaluator();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>{t('nav.aiCheck')}</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs shadow-lg shadow-[#D4AF37]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('nav.bookConsultation')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
