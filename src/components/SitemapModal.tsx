/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Download, Globe, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGES, SupportedLanguage } from '../i18n/languages';

export const SitemapModal: React.FC = () => {
  const { isSitemapOpen, closeSitemap, language, setLanguage, t } = useTranslation();

  if (!isSitemapOpen) return null;

  const generateSitemapXml = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://vercito.eu';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    (Object.keys(LANGUAGES) as SupportedLanguage[]).forEach((code) => {
      const item = LANGUAGES[code];
      xml += `  <url>\n`;
      xml += `    <loc>${origin}${item.path}</loc>\n`;
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${code === 'bn' ? '1.0' : '0.9'}</priority>\n`;

      // hreflang alternate links
      (Object.keys(LANGUAGES) as SupportedLanguage[]).forEach((altCode) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${altCode}" href="${origin}${LANGUAGES[altCode].path}" />\n`;
      });

      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const handleDownloadXml = () => {
    const xmlContent = generateSitemapXml();
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white relative">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 to-[#0B1F3A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {t('sitemap.title')}
              </h3>
              <p className="text-xs text-slate-400">
                {t('sitemap.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={closeSitemap}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          <div className="grid sm:grid-cols-2 gap-3">
            {(Object.keys(LANGUAGES) as SupportedLanguage[]).map((code) => {
              const item = LANGUAGES[code];
              const isCurrent = language === code;
              return (
                <div
                  key={code}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-lg'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.flag}</span>
                      <span className="font-bold text-sm">{item.nativeName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono text-slate-300">
                        {item.code}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-1">
                    <p className="font-mono text-[#D4AF37] text-[10px] truncate">URL: {item.path}</p>
                    <p className="line-clamp-2 text-slate-400 text-[11px]">{item.metaTitle}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">{item.sitemapUrl}</span>
                    <button
                      onClick={() => {
                        setLanguage(code);
                        closeSitemap();
                      }}
                      className="text-[11px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      Visit {item.code.toUpperCase()} <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical SEO Standards */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Full Google Search Console & Schema.org Multilingual Hreflang Indexing Enabled.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadXml}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t('sitemap.downloadXml')}</span>
          </button>

          <button
            onClick={closeSitemap}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15"
          >
            {t('sitemap.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
