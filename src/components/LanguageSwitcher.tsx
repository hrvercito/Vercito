/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGES, SupportedLanguage } from '../i18n/languages';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'footer' | 'mobile';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'navbar' }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES[language] || LANGUAGES['bn'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        <label className="block text-xs font-semibold text-slate-300 mb-2">Select Language / ভাষা সিলেক্ট করুন:</label>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 bg-slate-900/80 rounded-xl border border-white/10 custom-scrollbar">
          {(Object.keys(LANGUAGES) as SupportedLanguage[]).map((code) => {
            const item = LANGUAGES[code];
            const isSelected = language === code;
            return (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-sm">{item.flag}</span>
                  <span className="truncate">{item.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
          variant === 'footer'
            ? 'bg-slate-900 border-white/15 text-slate-200 hover:border-[#D4AF37]'
            : 'border-slate-200 dark:border-white/10 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 shadow-sm'
        }`}
        aria-label="Switch Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="flex items-center gap-1.5 font-medium">
          <span className="text-sm">{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
          <span className="sm:hidden uppercase">{currentLang.code}</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0B1F3A] text-white shadow-2xl border border-white/15 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
              13 Languages (১৩টি ভাষা)
            </span>
            <span className="text-[10px] text-slate-400 font-mono">SEO Enabled</span>
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
            {(Object.keys(LANGUAGES) as SupportedLanguage[]).map((code) => {
              const item = LANGUAGES[code];
              const isSelected = language === code;
              return (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold shadow-md'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">{item.flag}</span>
                    <div className="flex flex-col text-left truncate">
                      <span className="font-semibold leading-tight">{item.nativeName}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-[#0B1F3A]/80' : 'text-slate-400'}`}>
                        {item.name} ({item.path})
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-[#0B1F3A]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
