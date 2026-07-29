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
  Home,
  Info,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  FolderKanban,
  CreditCard,
  BookOpen,
  Mail,
  UserCheck,
  Send,
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const desktopNavLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#process-steps' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Universities', href: '#universities' },
    { name: 'Scholarships', href: '#scholarships' },
    { name: 'Language Programs', href: '#language-programs' },
    { name: 'Student Portal', onClick: onOpenStudentPortal },
    { name: 'Payments', href: '#payment' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const mobileMenuItems = [
    { name: 'Home', href: '#', icon: Home, hash: '#' },
    { name: 'About', href: '#process-steps', icon: Info, hash: '#process-steps' },
    { name: 'Destinations', href: '#destinations', icon: Globe, hash: '#destinations' },
    { name: 'Services', href: '#services', icon: Briefcase, hash: '#services' },
    { name: 'Universities', href: '#universities', icon: GraduationCap, hash: '#universities' },
    { name: 'Scholarships', href: '#scholarships', icon: Award, hash: '#scholarships' },
    { name: 'Language Programs', href: '#language-programs', icon: Languages, hash: '#language-programs' },
    { name: 'Student Portal', action: 'portal', icon: FolderKanban, hash: '#portal' },
    { name: 'Payments', href: '#payment', icon: CreditCard, hash: '#payment' },
    { name: 'Blog', href: '#blog', icon: BookOpen, hash: '#blog' },
    { name: 'Contact', href: '#contact', icon: Mail, hash: '#contact' },
    { name: 'Login', href: '#admin', icon: UserCheck, hash: '#admin' },
  ];

  const handleItemClick = (item: typeof mobileMenuItems[0]) => {
    if (item.action === 'portal') {
      onOpenStudentPortal();
    } else if (item.href) {
      window.location.hash = item.href;
      setActiveHash(item.href);
    }
    setIsMobileMenuOpen(false);
  };

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
          <div className="flex items-center justify-between gap-3">
            {/* VERCITO Brand Logo */}
            <a href="#" className="flex items-center group focus:outline-none shrink-0">
              <VercitoLogo variant="horizontal" size="sm" isDarkBg={true} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5">
              {desktopNavLinks.map((link) => {
                const isActive = link.href === activeHash;
                return link.onClick ? (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className="text-xs font-bold tracking-wider text-slate-100 hover:text-[#D4AF37] transition-colors py-1 cursor-pointer"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveHash(link.href || '#')}
                    className={`text-xs font-bold tracking-wider transition-colors relative py-1 group ${
                      isActive ? 'text-[#D4AF37]' : 'text-slate-100 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
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

              {/* Apply Now CTA */}
              <button
                onClick={onOpenApplication}
                className="hidden md:block px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs tracking-wider uppercase shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
              >
                APPLY NOW
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/10 text-[#D4AF37] hover:bg-white/20 transition-all border border-white/20 shrink-0 focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-[#D4AF37]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Animated Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Dark Transparent Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Smooth Slide-in Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[88vw] max-w-sm bg-[#0B1F3A] border-l-2 border-[#D4AF37]/50 shadow-2xl rounded-l-3xl flex flex-col justify-between overflow-hidden z-50"
            >
              {/* Header with Uploaded VERCITO Logo */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
                <VercitoLogo variant="horizontal" size="sm" isDarkBg={true} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-white/20">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                  Navigation Menu
                </p>

                {mobileMenuItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeHash === item.hash;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#D4AF37] shadow-md'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isActive ? 'bg-[#D4AF37] text-[#0B1F3A]' : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`}
                      />
                    </button>
                  );
                })}

                {/* Apply Now Primary Highlighted Button */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenApplication();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>

              {/* Footer Quick Actions */}
              <div className="p-4 border-t border-white/10 bg-slate-900/90 space-y-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAIEvaluator();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs hover:bg-[#D4AF37]/10 transition-all"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>AI Eligibility Check</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Free Counseling</span>
                </button>

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span>Language / ভাষা:</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

