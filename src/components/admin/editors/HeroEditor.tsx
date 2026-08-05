/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Save, Sparkles, Languages, Check } from 'lucide-react';
import { CMSHeroContent } from '../../../data/defaultCMSData';
import { ImageUploadField } from '../media/ImageUploadField';

export const HeroEditor: React.FC = () => {
  const { cmsData, updateHero, isSaving } = useCMS();
  const [heroForm, setHeroForm] = useState<CMSHeroContent>({ ...cmsData.hero });
  const [activeLang, setActiveLang] = useState<'bn' | 'en'>('bn');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof CMSHeroContent, value: string) => {
    setHeroForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateHero(heroForm);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span>Hero Section Editor</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit main headlines, badge, call-to-action buttons, trust metrics, and instant evaluation widget labels.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveLang('bn')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'bn'
                ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span>🇧🇩 Bangla (বাংলা)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLang === 'en'
                ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span>🇬🇧 English</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Top Badge */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
            1. Top Announcement Badge
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Badge Text (Bangla)
              </label>
              <input
                type="text"
                value={heroForm.topBadgeBn}
                onChange={(e) => handleChange('topBadgeBn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Badge Text (English)
              </label>
              <input
                type="text"
                value={heroForm.topBadgeEn}
                onChange={(e) => handleChange('topBadgeEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Hero Background Banner Image */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
            Hero Banner Image
          </h3>
          <ImageUploadField
            label="Homepage Hero Background / Banner Image"
            value={(heroForm as any).heroBgImage || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'}
            onChange={(url) => setHeroForm((prev) => ({ ...prev, heroBgImage: url } as any))}
            aspectRatio="16:9"
            category="hero"
            defaultImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
          />
        </div>

        {/* Headlines & Subtitle */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
            2. Main Title Headlines & Subtitle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Title Line 1 (Bangla)
              </label>
              <input
                type="text"
                value={heroForm.title1Bn}
                onChange={(e) => handleChange('title1Bn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Title Line 1 (English)
              </label>
              <input
                type="text"
                value={heroForm.title1En}
                onChange={(e) => handleChange('title1En', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Title Line 2 - Highlighted Gold (Bangla)
              </label>
              <input
                type="text"
                value={heroForm.title2Bn}
                onChange={(e) => handleChange('title2Bn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Title Line 2 - Highlighted Gold (English)
              </label>
              <input
                type="text"
                value={heroForm.title2En}
                onChange={(e) => handleChange('title2En', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subtitle Description (Bangla)
            </label>
            <textarea
              rows={2}
              value={heroForm.subtitleBn}
              onChange={(e) => handleChange('subtitleBn', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subtitle Description (English)
            </label>
            <textarea
              rows={2}
              value={heroForm.subtitleEn}
              onChange={(e) => handleChange('subtitleEn', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
            3. Call To Action Buttons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Button 1 (AI Evaluator) Bangla
              </label>
              <input
                type="text"
                value={heroForm.evaluateAiBn}
                onChange={(e) => handleChange('evaluateAiBn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Button 1 (AI Evaluator) English
              </label>
              <input
                type="text"
                value={heroForm.evaluateAiEn}
                onChange={(e) => handleChange('evaluateAiEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Button 2 (Book Counseling) Bangla
              </label>
              <input
                type="text"
                value={heroForm.bookConsultationBn}
                onChange={(e) => handleChange('bookConsultationBn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Button 2 (Book Counseling) English
              </label>
              <input
                type="text"
                value={heroForm.bookConsultationEn}
                onChange={(e) => handleChange('bookConsultationEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
            4. Hero Key Statistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <label className="block text-xs font-bold text-[#D4AF37]">Stat 1 (Visa Rate)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Val (BN)"
                  value={heroForm.stat1ValBn}
                  onChange={(e) => handleChange('stat1ValBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Val (EN)"
                  value={heroForm.stat1ValEn}
                  onChange={(e) => handleChange('stat1ValEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (BN)"
                  value={heroForm.stat1LabelBn}
                  onChange={(e) => handleChange('stat1LabelBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (EN)"
                  value={heroForm.stat1LabelEn}
                  onChange={(e) => handleChange('stat1LabelEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <label className="block text-xs font-bold text-[#D4AF37]">Stat 2 (DSU Grant)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Val (BN)"
                  value={heroForm.stat2ValBn}
                  onChange={(e) => handleChange('stat2ValBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Val (EN)"
                  value={heroForm.stat2ValEn}
                  onChange={(e) => handleChange('stat2ValEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (BN)"
                  value={heroForm.stat2LabelBn}
                  onChange={(e) => handleChange('stat2LabelBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (EN)"
                  value={heroForm.stat2LabelEn}
                  onChange={(e) => handleChange('stat2LabelEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <label className="block text-xs font-bold text-[#D4AF37]">Stat 3 (Students)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Val (BN)"
                  value={heroForm.stat3ValBn}
                  onChange={(e) => handleChange('stat3ValBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Val (EN)"
                  value={heroForm.stat3ValEn}
                  onChange={(e) => handleChange('stat3ValEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (BN)"
                  value={heroForm.stat3LabelBn}
                  onChange={(e) => handleChange('stat3LabelBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (EN)"
                  value={heroForm.stat3LabelEn}
                  onChange={(e) => handleChange('stat3LabelEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
              </div>
            </div>

            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <label className="block text-xs font-bold text-[#D4AF37]">Stat 4 (Tuition Waiver)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Val (BN)"
                  value={heroForm.stat4ValBn}
                  onChange={(e) => handleChange('stat4ValBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Val (EN)"
                  value={heroForm.stat4ValEn}
                  onChange={(e) => handleChange('stat4ValEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (BN)"
                  value={heroForm.stat4LabelBn}
                  onChange={(e) => handleChange('stat4LabelBn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
                <input
                  type="text"
                  placeholder="Label (EN)"
                  value={heroForm.stat4LabelEn}
                  onChange={(e) => handleChange('stat4LabelEn', e.target.value)}
                  className="px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl border border-white/15">
          <span className="text-xs text-slate-300 font-medium">
            {saveSuccess ? '✓ Saved successfully! Changes applied to live site.' : 'Ready to publish Hero section updates?'}
          </span>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs shadow-lg hover:shadow-[#D4AF37]/30 transition-all flex items-center gap-2"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#0B1F3A]" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Hero Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
