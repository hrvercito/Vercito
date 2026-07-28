/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/languages';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-inner ${className}`}>
      <button
        onClick={() => setLanguage('bn')}
        type="button"
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
          language === 'bn'
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-md font-extrabold scale-[1.02]'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="বাংলায় পরিবর্তন করুন"
      >
        <span className="text-xs">🇧🇩</span>
        <span>BN</span>
      </button>

      <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-white/20 mx-0.5" />

      <button
        onClick={() => setLanguage('en')}
        type="button"
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-md font-extrabold scale-[1.02]'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Switch to English"
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
};
