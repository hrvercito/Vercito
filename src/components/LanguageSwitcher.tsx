/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useTranslation();

  const isBangla = language === 'bn';
  const isEnglish = language === 'en';

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-full bg-[#071B36]/90 border border-white/20 shadow-md backdrop-blur-md shrink-0 ${className}`}
    >
      {/* Bangla Option */}
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
          isBangla
            ? 'bg-[#D4AF37] text-[#0B1F3A] font-extrabold shadow-sm scale-[1.02]'
            : 'text-white hover:text-[#D4AF37] hover:bg-white/10'
        }`}
        title="বাংলায় পরিবর্তন করুন"
      >
        <span className="text-[10px] sm:text-xs leading-none">🇧🇩</span>
        <span>বাংলা</span>
      </button>

      {/* Vertical Divider */}
      <div className="w-[1px] h-3 sm:h-3.5 bg-white/20 my-auto shrink-0 mx-0.5" />

      {/* English Option */}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer whitespace-nowrap ${
          isEnglish
            ? 'bg-[#D4AF37] text-[#0B1F3A] font-extrabold shadow-sm scale-[1.02]'
            : 'text-white hover:text-[#D4AF37] hover:bg-white/10'
        }`}
        title="Switch to English"
      >
        <span className="text-[10px] sm:text-xs leading-none">🇬🇧</span>
        <span>English</span>
      </button>
    </div>
  );
};

