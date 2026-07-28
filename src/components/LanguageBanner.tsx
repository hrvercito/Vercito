/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, X, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/languages';

export const LanguageBanner: React.FC = () => {
  const { showSuggestion, suggestedLang, applySuggestedLang, dismissSuggestion, t } = useTranslation();

  if (!showSuggestion || !suggestedLang) return null;

  const targetLangMeta = LANGUAGES[suggestedLang];
  if (!targetLangMeta) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="glass-card-gold p-4 rounded-2xl shadow-2xl border border-[#D4AF37]/40 text-white flex flex-col gap-3 relative">
        <button
          onClick={dismissSuggestion}
          className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Dismiss language suggestion"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{targetLangMeta.flag}</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Language Detected / ভাষা সংকেত
              </h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {t('langBanner.notice', { langName: targetLangMeta.nativeName })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/10">
          <button
            onClick={applySuggestedLang}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-md hover:scale-[1.02] transition-all"
          >
            <span>{t('langBanner.switchBtn', { langName: targetLangMeta.nativeName })}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={dismissSuggestion}
            className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-white/10 transition-all"
          >
            {t('langBanner.keepBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
