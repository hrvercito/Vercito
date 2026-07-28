/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { HeroEditor } from './editors/HeroEditor';
import { DestinationsEditor } from './editors/DestinationsEditor';
import { ScholarshipsEditor } from './editors/ScholarshipsEditor';
import { TestimonialsEditor } from './editors/TestimonialsEditor';
import { FAQEditor } from './editors/FAQEditor';
import { VisaChecklistEditor } from './editors/VisaChecklistEditor';
import { BlogEditor } from './editors/BlogEditor';
import { ApplicationsManager } from './editors/ApplicationsManager';
import { VercitoLogo } from '../VercitoLogo';

import {
  Sparkles,
  Globe,
  Award,
  Quote,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  FolderKanban,
  LogOut,
  ExternalLink,
  RotateCcw,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';

type AdminSection = 'applications' | 'hero' | 'destinations' | 'scholarships' | 'testimonials' | 'faq' | 'visa-checklist' | 'blog';

interface AdminLayoutProps {
  onReturnToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnToSite }) => {
  const { logoutAdmin, saveMessage, resetToDefaultCMS, isSaving } = useCMS();
  const [activeSection, setActiveSection] = useState<AdminSection>('applications');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'applications' as AdminSection, label: 'Applications & Payments', icon: FolderKanban },
    { id: 'hero' as AdminSection, label: 'Hero Section', icon: Sparkles },
    { id: 'destinations' as AdminSection, label: 'Destinations & Universities', icon: Globe },
    { id: 'scholarships' as AdminSection, label: 'Scholarships', icon: Award },
    { id: 'testimonials' as AdminSection, label: 'Testimonials & Reviews', icon: Quote },
    { id: 'faq' as AdminSection, label: 'FAQ Section', icon: HelpCircle },
    { id: 'visa-checklist' as AdminSection, label: 'Visa Checklist', icon: ShieldCheck },
    { id: 'blog' as AdminSection, label: 'Blog & Country Guides', icon: BookOpen },
  ];

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all CMS content to default system values? This action cannot be undone.')) {
      await resetToDefaultCMS();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row selection:bg-[#D4AF37] selection:text-[#0B1F3A]">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B1F3A] border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs">
            VERCITO
          </div>
          <span className="font-serif font-bold text-sm text-white">CMS Panel</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-slate-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#0B1F3A] border-r border-white/10 p-5 shrink-0 flex flex-col justify-between space-y-8 z-40`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="hidden md:flex items-center gap-3 pb-4 border-b border-white/10">
            <VercitoLogo variant="horizontal" size="sm" isDarkBg={true} />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              Website Content Modules
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold shadow-lg shadow-[#D4AF37]/20'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B1F3A]' : 'text-[#D4AF37]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <button
            onClick={onReturnToSite}
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleResetData}
            className="w-full py-2 px-3 rounded-xl text-slate-400 hover:text-red-400 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset CMS Defaults</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl mx-auto space-y-6">
        {/* Global Save Notification Toast */}
        {saveMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{saveMessage}</span>
            </span>
          </div>
        )}

        {/* Active Editor Rendering */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-md">
          {activeSection === 'applications' && <ApplicationsManager />}
          {activeSection === 'hero' && <HeroEditor />}
          {activeSection === 'destinations' && <DestinationsEditor />}
          {activeSection === 'scholarships' && <ScholarshipsEditor />}
          {activeSection === 'testimonials' && <TestimonialsEditor />}
          {activeSection === 'faq' && <FAQEditor />}
          {activeSection === 'visa-checklist' && <VisaChecklistEditor />}
          {activeSection === 'blog' && <BlogEditor />}
        </div>
      </main>
    </div>
  );
};
