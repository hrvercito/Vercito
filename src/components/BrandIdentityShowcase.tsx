/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  Download,
  Eye,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  User,
  Building2,
  Globe,
  Sparkles,
  QrCode,
  ShieldCheck,
  FileText,
  Layers,
  Palette,
  Layout,
  Printer,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { useCMS } from '../context/CMSContext';

export const BrandIdentityShowcase: React.FC = () => {
  const { t } = useTranslation();
  const { cmsData } = useCMS();
  const founderName = cmsData.founderProfile?.name || 'Engr. Kazi Ashraful Islam';
  const [activeTab, setActiveTab] = useState<'all' | 'stationery' | 'digital' | 'signage' | 'cards'>('all');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="brand-kit" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B1F3A]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Award className="w-4 h-4" />
            <span>Corporate Identity & Brand Collateral</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            VERCITO Corporate Branding Suite
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Standard European luxury branding crafted for <strong className="text-[#D4AF37]">VERCITO International Education Consultancy</strong>. Founder & CEO: <span className="text-white font-medium">{founderName}</span> (Gulshan-2, Dhaka & Portugal, Europe).
          </p>

          {/* Color Palette Pill Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1F3A] border border-white/20 text-xs text-white">
              <span className="w-3 h-3 rounded-full bg-[#0B1F3A] border border-white" />
              <span className="font-mono">#0B1F3A (Navy Blue)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1F3A] border border-white/20 text-xs text-white">
              <span className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <span className="font-mono">#D4AF37 (Luxury Gold)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1F3A] border border-white/20 text-xs text-white">
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="font-mono">#FFFFFF (Crisp White)</span>
            </div>
          </div>
        </div>

        {/* Brand Kit Navigation Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All 12 Collaterals', icon: Layers },
            { id: 'cards', label: 'Logo & ID Cards', icon: User },
            { id: 'stationery', label: 'Office Stationery', icon: FileText },
            { id: 'digital', label: 'Digital & Social', icon: Layout },
            { id: 'signage', label: 'Office Signboard', icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Official Logo Vector Display */}
          {(activeTab === 'all' || activeTab === 'cards') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    01. Master Logo Mark
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Vector / Ultra HD</span>
                </div>

                {/* Logo Canvas Mockup */}
                <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-slate-950 border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all">
                  <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                  {/* Logo Mark Graphic */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                      {/* Crest / Gold Orbit Rings */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] drop-shadow-md">
                        {/* Outer Orbit Pathway */}
                        <path d="M 15 55 Q 50 90 85 45 Q 50 15 15 55 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 2" />
                        {/* Airplane Flight Trail */}
                        <path d="M 10 65 Q 50 95 90 35" fill="none" stroke="#D4AF37" strokeWidth="3" />
                        {/* Airplane Icon */}
                        <path d="M 88 33 L 95 30 L 91 38 L 86 35 Z" fill="#D4AF37" />
                        {/* Graduation Cap Top */}
                        <path d="M 50 18 L 82 30 L 50 42 L 18 30 Z" fill="#0B1F3A" stroke="#D4AF37" strokeWidth="2" />
                        <path d="M 32 36 L 32 52 Q 50 62 68 52 L 68 36" fill="none" stroke="#D4AF37" strokeWidth="2" />
                        {/* Central Luxury V */}
                        <text x="50" y="80" textAnchor="middle" fontSize="38" fontFamily="serif" fontWeight="bold" fill="#D4AF37">
                          V
                        </text>
                      </svg>
                    </div>

                    <h3 className="font-serif text-xl font-extrabold text-white tracking-wider">VERCITO</h3>
                    <p className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold mt-0.5">
                      Shaping Futures Beyond Borders
                    </p>
                    <span className="text-[8px] text-slate-400 font-mono mt-1">EST. 2026</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">VERCITO Vector Emblem</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Includes luxury V, Europe map silhouette, graduation cap, sleek jet airliner, and golden pathway orbit.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Navy #0B1F3A | Gold #D4AF37</span>
                <button
                  onClick={() => handleCopy('VERCITO Logo Specs: Navy Blue #0B1F3A, Gold #D4AF37', 'Logo Specs')}
                  className="flex items-center gap-1.5 text-[#D4AF37] font-bold hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedText === 'Logo Specs' ? 'Copied!' : 'Specs'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Business Card (Front & Back) */}
          {(activeTab === 'all' || activeTab === 'cards') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    02. Executive Business Card
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Standard 3.5" x 2"</span>
                </div>

                {/* Business Card Front/Back Preview */}
                <div className="space-y-3">
                  {/* Front Side */}
                  <div className="aspect-[1.75/1] w-full rounded-xl bg-[#0B1F3A] border border-[#D4AF37]/40 p-4 flex flex-col justify-between relative overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center font-serif font-bold text-[#0B1F3A] text-sm">
                          V
                        </div>
                        <div>
                          <p className="font-serif font-bold text-xs text-white">VERCITO</p>
                          <p className="text-[7px] text-[#D4AF37] font-mono">STUDY ABROAD</p>
                        </div>
                      </div>
                      <span className="text-[7px] px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-mono">
                        EST. 2026
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-extrabold text-white">Md Sohel Rana</h4>
                      <p className="text-[9px] text-[#D4AF37] font-semibold">Founder & CEO</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[8px] text-slate-300 border-t border-white/10 pt-2 font-mono">
                      <p className="flex items-center gap-1"><Phone className="w-2.5 h-2.5 text-[#D4AF37]" /> +8801912114343</p>
                      <p className="flex items-center gap-1"><Mail className="w-2.5 h-2.5 text-[#D4AF37]" /> hr.vercito@gmail.com</p>
                      <p className="flex items-center gap-1 col-span-2"><MapPin className="w-2.5 h-2.5 text-[#D4AF37]" /> Gulshan-2, Dhaka | Portugal Office</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">CEO Executive Business Card</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Luxury foil stamped gold accenting on heavy 400 GSM soft-touch navy cardstock.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Md Sohel Rana (CEO)</span>
                <span className="text-[#D4AF37] font-bold">Print Ready 300 DPI</span>
              </div>
            </div>
          )}

          {/* 3. Official Staff ID Card */}
          {(activeTab === 'all' || activeTab === 'cards') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    03. Official Staff ID Card
                  </span>
                  <span className="text-xs text-slate-400 font-mono">CR80 Plastic Badge</span>
                </div>

                {/* ID Card Graphic */}
                <div className="w-48 mx-auto rounded-2xl bg-white text-slate-900 p-4 border-2 border-[#D4AF37] shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                  <div className="w-full bg-[#0B1F3A] text-white p-2.5 rounded-xl mb-3 text-center">
                    <p className="font-serif font-bold text-xs tracking-wider">VERCITO</p>
                    <p className="text-[7px] text-[#D4AF37] uppercase tracking-widest font-mono">Staff Identification</p>
                  </div>

                  {/* Photo Frame */}
                  <div className="w-16 h-20 rounded-xl bg-slate-200 border-2 border-[#D4AF37] flex flex-col items-center justify-center my-1 relative overflow-hidden shadow-inner">
                    <User className="w-10 h-10 text-slate-400" />
                    <span className="absolute bottom-0 inset-x-0 bg-[#0B1F3A] text-[6px] text-white text-center py-0.5">
                      OFFICIAL
                    </span>
                  </div>

                  <h4 className="font-serif font-extrabold text-xs text-[#0B1F3A] mt-2">Md Sohel Rana</h4>
                  <p className="text-[9px] font-bold text-[#D4AF37] uppercase">Founder & CEO</p>

                  <div className="mt-3 w-full border-t border-slate-200 pt-2 text-[8px] text-slate-600 space-y-0.5 text-left font-mono">
                    <p><strong className="text-slate-900">ID No:</strong> VRC-001</p>
                    <p><strong className="text-slate-900">Blood Group:</strong> O+</p>
                    <p><strong className="text-slate-900">Issue Date:</strong> 2026-01-15</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between w-full pt-1 border-t border-slate-100">
                    <QrCode className="w-6 h-6 text-[#0B1F3A]" />
                    <span className="text-[7px] font-mono text-slate-400">VERIFIED ID</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Employee & Officer Badge</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Vertical PVC smart badge with embedded microchip security watermark & lanyard loop.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Code: VRC-001</span>
                <span className="text-[#D4AF37] font-bold">RFID Compatible</span>
              </div>
            </div>
          )}

          {/* 4. Letterhead */}
          {(activeTab === 'all' || activeTab === 'stationery') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    04. Corporate Letterhead
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Standard A4</span>
                </div>

                {/* Letterhead Mockup */}
                <div className="aspect-[1/1.3] w-full rounded-xl bg-white text-slate-900 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-slate-200">
                  {/* Top Header */}
                  <div className="flex items-start justify-between border-b-2 border-[#D4AF37] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center font-serif font-bold text-[#D4AF37] text-base">
                        V
                      </div>
                      <div>
                        <h4 className="font-serif font-extrabold text-sm text-[#0B1F3A] leading-none">VERCITO</h4>
                        <p className="text-[7px] text-[#D4AF37] font-bold tracking-wider mt-0.5 uppercase">
                          Shaping Futures Beyond Borders
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-[8px] text-slate-500 font-mono">
                      <p className="font-bold text-[#0B1F3A]">VERCITO INTERNATIONAL</p>
                      <p>Gulshan-2, Dhaka-1212, Bangladesh</p>
                      <p>www.vercito.eu | hr.vercito@gmail.com</p>
                    </div>
                  </div>

                  {/* Watermark in Body */}
                  <div className="my-auto text-center opacity-5 pointer-events-none font-serif text-6xl font-bold text-[#0B1F3A]">
                    VERCITO
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-[7px] text-slate-500 font-mono">
                    <p>Head Office: Gulshan-2, Dhaka | Europe Office: Portugal</p>
                    <p>ISO 9001:2026 Certified</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Official Corporate Letterhead</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Designed for university recommendation letters, visa petition cover sheets, and contracts.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Format: A4 Vector</span>
                <span className="text-[#D4AF37] font-bold">Formal Seal Ready</span>
              </div>
            </div>
          )}

          {/* 5. Envelope */}
          {(activeTab === 'all' || activeTab === 'stationery') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    05. DL Corporate Envelope
                  </span>
                  <span className="text-xs text-slate-400 font-mono">220mm x 110mm</span>
                </div>

                {/* Envelope Graphic */}
                <div className="aspect-[2.2/1] w-full rounded-xl bg-slate-100 text-slate-900 p-4 border border-slate-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#0B1F3A] flex items-center justify-center font-serif font-bold text-[#D4AF37] text-xs">
                        V
                      </div>
                      <div>
                        <p className="font-serif font-bold text-xs text-[#0B1F3A]">VERCITO</p>
                        <p className="text-[6px] text-slate-500 font-mono">Gulshan-2, Dhaka, Bangladesh</p>
                      </div>
                    </div>

                    <div className="w-10 h-10 border border-dashed border-slate-300 rounded flex items-center justify-center text-[7px] text-slate-400 font-mono">
                      POSTAGE
                    </div>
                  </div>

                  <div className="self-end text-right text-[8px] text-slate-700 font-mono space-y-0.5 border-l-2 border-[#D4AF37] pl-3">
                    <p className="font-bold text-[#0B1F3A]">To: Embassy / University Admission Board</p>
                    <p>Recipient Name & Address</p>
                  </div>

                  <div className="w-full h-1 bg-[#0B1F3A] rounded-full" />
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">DL Executive Envelope</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Secured self-adhesive envelope with gold foil VERCITO insignia for visa document dispatch.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">DL Size (220x110)</span>
                <span className="text-[#D4AF37] font-bold">Security Pattern</span>
              </div>
            </div>
          )}

          {/* 6. Official Rubber Stamp / Seal */}
          {(activeTab === 'all' || activeTab === 'stationery') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    06. Official Corporate Stamp
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Circular 45mm Seal</span>
                </div>

                {/* Stamp Graphic */}
                <div className="aspect-square w-40 mx-auto rounded-full bg-white p-3 border-2 border-[#0B1F3A] flex items-center justify-center relative shadow-xl">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-[#0B1F3A] flex flex-col items-center justify-center text-center p-2 text-[#0B1F3A]">
                    <span className="text-[7px] font-bold uppercase tracking-widest font-mono">
                      ★ VERCITO CONSULTANCY ★
                    </span>
                    <div className="my-1 font-serif text-lg font-extrabold text-[#0B1F3A]">
                      VERCITO
                    </div>
                    <span className="text-[6px] font-semibold text-slate-600 font-mono">
                      GULSHAN-2, DHAKA
                    </span>
                    <span className="text-[6px] font-bold text-[#D4AF37] mt-0.5">
                      ★ EST. 2026 ★
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Self-Inking Official Seal</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Circular official authentication stamp used on student application files & attestations.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Diameter: 45mm</span>
                <span className="text-[#D4AF37] font-bold">Navy Ink Standard</span>
              </div>
            </div>
          )}

          {/* 7. Facebook Cover */}
          {(activeTab === 'all' || activeTab === 'digital') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    07. Facebook Cover Banner
                  </span>
                  <span className="text-xs text-slate-400 font-mono">820px x 312px</span>
                </div>

                {/* Facebook Cover Graphic */}
                <div className="aspect-[2.6/1] w-full rounded-xl bg-gradient-to-r from-[#0B1F3A] via-[#102A4E] to-[#0B1F3A] border border-[#D4AF37]/30 p-4 flex items-center justify-between relative overflow-hidden shadow-xl">
                  <div className="space-y-1 relative z-10">
                    <div className="inline-flex items-center gap-1 text-[7px] px-2 py-0.5 rounded bg-[#D4AF37] text-[#0B1F3A] font-bold">
                      <Sparkles className="w-2.5 h-2.5" /> European Higher Education
                    </div>
                    <h3 className="font-serif text-sm font-extrabold text-white">VERCITO</h3>
                    <p className="text-[8px] text-slate-200 font-light">Shaping Futures Beyond Borders</p>
                    <p className="text-[7px] text-[#D4AF37] font-mono">Gulshan-2, Dhaka | Portugal Office</p>
                  </div>

                  <div className="text-right text-[8px] text-white font-mono space-y-0.5 relative z-10">
                    <p className="text-[#D4AF37] font-bold">Call / WhatsApp:</p>
                    <p>+880 1912-114343</p>
                    <p className="text-slate-300">hr.vercito@gmail.com</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Social Media Header Banner</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Optimized dimensions for Facebook page cover with direct contact details & CTA.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">FB Page Specs</span>
                <span className="text-[#D4AF37] font-bold">High Conversion</span>
              </div>
            </div>
          )}

          {/* 8. Office Signboard */}
          {(activeTab === 'all' || activeTab === 'signage') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    08. Office 3D Acrylic Signboard
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Gulshan-2 Office Facade</span>
                </div>

                {/* Signboard Graphic */}
                <div className="aspect-video w-full rounded-xl bg-slate-950 border-4 border-slate-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                  {/* Facade texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-black/90" />

                  <div className="relative z-10 border-2 border-[#D4AF37] p-4 rounded-2xl bg-[#0B1F3A]/90 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center font-serif font-bold text-[#0B1F3A] text-xs shadow-md">
                        V
                      </div>
                      <h3 className="font-serif text-xl font-extrabold text-white tracking-widest">VERCITO</h3>
                    </div>
                    <p className="text-[8px] text-[#D4AF37] uppercase tracking-widest font-bold">
                      Shaping Futures Beyond Borders
                    </p>
                    <p className="text-[7px] text-slate-300 font-mono mt-1">
                      STUDY ABROAD CONSULTANCY • EST. 2026
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Gulshan-2 Main Facade Signage</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    3D backlit acrylic golden lettering on deep navy aluminum composite panel.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">LED Backlit 3D</span>
                <span className="text-[#D4AF37] font-bold">Luxury Metallic</span>
              </div>
            </div>
          )}

          {/* 9. Email Signature */}
          {(activeTab === 'all' || activeTab === 'digital') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    09. Executive HTML Email Signature
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Outlook / Gmail Ready</span>
                </div>

                {/* Email Signature Graphic */}
                <div className="w-full rounded-xl bg-white text-slate-900 p-4 border border-slate-200 shadow-lg text-left text-xs font-mono space-y-2">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold border-2 border-[#D4AF37]">
                      V
                    </div>
                    <div>
                      <h4 className="font-serif font-extrabold text-sm text-[#0B1F3A]">Md Sohel Rana</h4>
                      <p className="text-[10px] text-[#D4AF37] font-bold">Founder & CEO | VERCITO</p>
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#0B1F3A]" /> +880 1912-114343</p>
                    <p className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-[#0B1F3A]" /> hr.vercito@gmail.com</p>
                    <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#0B1F3A]" /> Gulshan-2, Dhaka | Portugal Office</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">CEO HTML Email Signature</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Includes click-to-call links, verified badge, social profiles, and office locations.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">HTML / CSS Code</span>
                <button
                  onClick={() => handleCopy('Md Sohel Rana | Founder & CEO | VERCITO (+8801912114343)', 'Signature')}
                  className="text-[#D4AF37] font-bold flex items-center gap-1 hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedText === 'Signature' ? 'Copied!' : 'Copy Info'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 10. Company Profile Cover */}
          {(activeTab === 'all' || activeTab === 'stationery') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    10. Company Profile Cover
                  </span>
                  <span className="text-xs text-slate-400 font-mono">A4 Dossier Booklet</span>
                </div>

                {/* Profile Cover Graphic */}
                <div className="aspect-[1/1.4] w-full rounded-xl bg-[#0B1F3A] border-2 border-[#D4AF37]/40 p-5 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl">
                  <div className="pt-4">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40">
                      OFFICIAL DOSSIER 2026
                    </span>
                    <h3 className="font-serif text-2xl font-extrabold text-white mt-4 tracking-wide">
                      VERCITO
                    </h3>
                    <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">
                      Shaping Futures Beyond Borders
                    </p>
                  </div>

                  <div className="my-auto py-6 border-y border-white/10 text-xs text-slate-200 space-y-1 font-light">
                    <p className="font-semibold text-white">European Higher Education Consultancy</p>
                    <p className="text-[10px] text-slate-400">Italy • Germany • France • Hungary • Spain</p>
                  </div>

                  <div className="text-[8px] text-slate-400 font-mono border-t border-white/10 pt-2 text-left flex justify-between">
                    <span>Gulshan-2, Dhaka</span>
                    <span>EST. 2026</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Corporate Profile Dossier</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Luxury presentation booklet handed to partner universities, embassies, and prospective students.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">A4 High Gloss Cover</span>
                <span className="text-[#D4AF37] font-bold">Gold Embossed</span>
              </div>
            </div>
          )}

          {/* 11. Social Media Kit */}
          {(activeTab === 'all' || activeTab === 'digital') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    11. Social Media Campaign Kit
                  </span>
                  <span className="text-xs text-slate-400 font-mono">1080x1080 Square</span>
                </div>

                {/* Social Post Graphic */}
                <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-[#0B1F3A] to-slate-950 border border-[#D4AF37]/30 p-5 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-[#D4AF37] text-[#0B1F3A] flex items-center justify-center font-serif font-bold text-xs">
                        V
                      </div>
                      <span className="font-serif font-bold text-xs text-white">VERCITO</span>
                    </div>
                    <span className="text-[7px] text-[#D4AF37] font-mono">VISA ALERT 98.8%</span>
                  </div>

                  <div className="my-auto space-y-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      ITALY DSU SCHOLARSHIP
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white leading-tight">
                      €7,000/yr Grant + 100% Tuition Waiver
                    </h4>
                    <p className="text-[9px] text-slate-300 font-light">
                      Applications open for Masters & Bachelors. Zero tuition fee in top Italian public universities.
                    </p>
                  </div>

                  <div className="bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-[8px] py-1.5 px-3 rounded-lg text-center uppercase tracking-wider">
                    Book Free Assessment: +880 1912-114343
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">Instagram & LinkedIn Post Kit</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    High-engagement social graphic template optimized for student visa announcements & scholarship alerts.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">1080x1080 PNG</span>
                <span className="text-[#D4AF37] font-bold">Multi-Platform</span>
              </div>
            </div>
          )}

          {/* 12. WordPress Responsive Platform */}
          {(activeTab === 'all' || activeTab === 'digital') && (
            <div className="group glass-card-gold p-6 rounded-3xl border border-white/15 bg-slate-900/90 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                    12. Responsive Multilingual Platform
                  </span>
                  <span className="text-xs text-slate-400 font-mono">13 Languages / SEO</span>
                </div>

                {/* Website Mockup Preview */}
                <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-700 p-3 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[8px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span>https://vercito.eu/bn</span>
                  </div>

                  <div className="my-auto space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="text-[10px] font-bold text-white">বাংলা (Primary) & 12 European Languages</span>
                    </div>
                    <p className="text-[8px] text-slate-300">
                      Full SEO hreflang indexing, AI eligibility evaluator, Italian DSU grant calculator, and mobile responsive layout.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[7px] text-[#D4AF37] font-mono pt-2 border-t border-white/10">
                    <span>98.8% Visa Success Rate</span>
                    <span>Gulshan-2, Dhaka</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-white">WordPress / React Multilingual Site</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Built with proper Noto Sans Bengali typography, instant currency toggle (EUR/BDT), and live WhatsApp chat integration.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Live In Production</span>
                <a href="#hero" className="text-[#D4AF37] font-bold flex items-center gap-1 hover:underline">
                  <span>Explore Site</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Corporate Summary & Contacts Footer Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-slate-900 to-[#0B1F3A] border border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              <span>VERCITO Brand Identity Verification</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl font-light">
              All branding collateral is registered under <strong className="text-white">VERCITO International Education Consultancy</strong>.
              Founder & CEO: <span className="text-[#D4AF37] font-semibold">Md Sohel Rana</span>. Head Office: Gulshan-2, Dhaka, Bangladesh. Future Europe Office: Portugal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="mailto:hr.vercito@gmail.com"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg hover:scale-105 transition-all text-center flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact HR / CEO</span>
            </a>
            <a
              href="tel:+8801912114343"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>+880 1912-114343</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
