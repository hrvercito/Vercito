/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, LANGUAGES, DEFAULT_LANGUAGE, LanguageMeta } from './languages';
import { TRANSLATIONS } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  langMeta: LanguageMeta;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, params?: Record<string, string>) => string;
  suggestedLang: SupportedLanguage | null;
  showSuggestion: boolean;
  dismissSuggestion: () => void;
  applySuggestedLang: () => void;
  isSitemapOpen: boolean;
  openSitemap: () => void;
  closeSitemap: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to extract language code from URL path or hash
const getLanguageFromURL = (): SupportedLanguage => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase();

  // Check path like /en, /it, /fr
  for (const langKey of Object.keys(LANGUAGES) as SupportedLanguage[]) {
    if (pathname === `/${langKey}` || pathname.startsWith(`/${langKey}/`)) {
      return langKey;
    }
    if (hash === `#/${langKey}` || hash.startsWith(`#/${langKey}/`)) {
      return langKey;
    }
  }

  // Check saved localStorage or default
  const saved = localStorage.getItem('vercito_language') as SupportedLanguage;
  if (saved && LANGUAGES[saved]) {
    return saved;
  }

  return DEFAULT_LANGUAGE;
};

// Detect visitor's browser primary language
const detectBrowserLanguage = (): SupportedLanguage | null => {
  if (typeof window === 'undefined' || !navigator) return null;

  const browserLangs = navigator.languages || [navigator.language];
  for (const rawLang of browserLangs) {
    if (!rawLang) continue;
    const code = rawLang.split('-')[0].toLowerCase() as SupportedLanguage;
    if (LANGUAGES[code]) {
      return code;
    }
  }
  return null;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => getLanguageFromURL());
  const [suggestedLang, setSuggestedLang] = useState<SupportedLanguage | null>(null);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState<boolean>(false);

  // Sync state with URL change / language change
  const setLanguage = (newLang: SupportedLanguage) => {
    if (!LANGUAGES[newLang]) return;
    setLanguageState(newLang);
    localStorage.setItem('vercito_language', newLang);

    // Update URL path without full reload
    const currentHash = window.location.hash;
    const newPath = `/${newLang}${currentHash}`;
    if (window.location.pathname !== `/${newLang}`) {
      window.history.pushState({ lang: newLang }, '', newPath);
    }

    // Dismiss suggestion banner if user manually picked a language
    setShowSuggestion(false);
  };

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const urlLang = getLanguageFromURL();
      if (urlLang !== language) {
        setLanguageState(urlLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Initial detection & SEO update
  useEffect(() => {
    // Detect browser language
    const detected = detectBrowserLanguage();
    const isDismissed = sessionStorage.getItem('vercito_lang_banner_dismissed') === 'true';

    if (detected && detected !== language && !isDismissed) {
      setSuggestedLang(detected);
      setShowSuggestion(true);
    }

    // Ensure URL matches current language if user opened plain root "/"
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.history.replaceState({ lang: language }, '', `/${language}${window.location.hash}`);
    }
  }, []);

  // Update HTML meta elements when language changes
  useEffect(() => {
    const meta = LANGUAGES[language];
    if (!meta) return;

    // 1. Update <html lang="...">
    document.documentElement.lang = meta.code;

    // 2. Update Document Title
    document.title = meta.metaTitle;

    // 3. Update Meta Description
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.setAttribute('name', 'description');
      document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', meta.metaDescription);
  }, [language]);

  const dismissSuggestion = () => {
    setShowSuggestion(false);
    sessionStorage.setItem('vercito_lang_banner_dismissed', 'true');
  };

  const applySuggestedLang = () => {
    if (suggestedLang) {
      setLanguage(suggestedLang);
    }
    setShowSuggestion(false);
  };

  // Translation function `t`
  const t = (key: string, params?: Record<string, string>): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS[DEFAULT_LANGUAGE];
    let template = (dict as any)[key] || (TRANSLATIONS[DEFAULT_LANGUAGE] as any)[key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        template = template.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), value);
      });
    }

    return template;
  };

  const value: LanguageContextType = {
    language,
    langMeta: LANGUAGES[language],
    setLanguage,
    t,
    suggestedLang,
    showSuggestion,
    dismissSuggestion,
    applySuggestedLang,
    isSitemapOpen,
    openSitemap: () => setIsSitemapOpen(true),
    closeSitemap: () => setIsSitemapOpen(false),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
