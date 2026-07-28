/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedLanguage = 'bn' | 'en';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  sitemapUrl: string;
}

export const DEFAULT_LANGUAGE: SupportedLanguage = 'bn';

export const LANGUAGES: Record<SupportedLanguage, LanguageMeta> = {
  bn: {
    code: 'bn',
    name: 'Bangla',
    nativeName: 'বাংলা',
    flag: '🇧🇩',
    path: '/bn',
    metaTitle: 'ভার্সিটো - ইউরোপ ও আমেরিকা শিক্ষা পরামর্শক | সীমানা ছাড়িয়ে আপনার ভবিষ্যৎ গঠন',
    metaDescription: 'বাংলাদেশি শিক্ষার্থীদের জন্য ইউরোপ ও আমেরিকার সেরা বিশ্ববিদ্যালয় ও ১০০% স্কলারশিপের বিশ্বস্ত গাইডলাইন। ইটালি, জার্মানি, আমেরিকা, ফ্রান্স ও ইউরোপিয়ান ইউনিয়ন এডমিশন ও ভিসা প্রসেসিং।',
    sitemapUrl: '/sitemap-bn.xml',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    path: '/en',
    metaTitle: 'VERCITO - European & US Education Consultancy | Shaping Futures Beyond Borders',
    metaDescription: 'Premier European and American higher education consultancy for Bangladeshi students. Admissions, 100% scholarships, and visa processing for Italy, Germany, USA, France, and EU.',
    sitemapUrl: '/sitemap-en.xml',
  },
};
