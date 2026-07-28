/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SupportedLanguage =
  | 'bn'
  | 'en'
  | 'it'
  | 'fr'
  | 'es'
  | 'de'
  | 'pt'
  | 'el'
  | 'bg'
  | 'nl'
  | 'pl'
  | 'ro'
  | 'hu';

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
    metaTitle: 'ভার্সিটো - ইউরোপীয় শিক্ষা পরামর্শক | সীমানা ছাড়িয়ে আপনার ভবিষ্যৎ গঠন',
    metaDescription: 'বাংলাদেশি শিক্ষার্থীদের জন্য ইউরোপের সেরা বিশ্ববিদ্যালয় ও ১০০% স্কলারশিপের বিশ্বস্ত গাইডলাইন। ইটালি, জার্মানি, ফ্রান্স ও হাঙ্গেরি এডমিশন ও ভিসা প্রসেসিং।',
    sitemapUrl: '/sitemap-bn.xml',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    path: '/en',
    metaTitle: 'VERCITO - European Education Consultancy | Shaping Futures Beyond Borders',
    metaDescription: 'Premier European higher education consultancy for Bangladeshi students. Admissions, 100% scholarships, and visa processing for Italy, Germany, France, Hungary, and EU.',
    sitemapUrl: '/sitemap-en.xml',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    path: '/it',
    metaTitle: 'VERCITO - Consulenza per l\'Istruzione Europea | Plasmare il Futuro Oltre i Confini',
    metaDescription: 'Consulenza d\'eccellenza per l\'istruzione superiore europea. Ammissioni, borse di studio DSU al 100% e visto per Italia, Germania, Francia e UE.',
    sitemapUrl: '/sitemap-it.xml',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    path: '/fr',
    metaTitle: 'VERCITO - Conseil en Éducation Européenne | Façonner l\'Avenir au-delà des Frontières',
    metaDescription: 'Conseil en enseignement supérieur européen. Admissions, bourses d\'études à 100% et démarches de visa pour la France, l\'Italie, l\'Allemagne et l\'UE.',
    sitemapUrl: '/sitemap-fr.xml',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    path: '/es',
    metaTitle: 'VERCITO - Consultoría de Educación Europea | Forjando Futuros Más Allá de las Fronteras',
    metaDescription: 'Consultoría en educación superior europea. Admisiones, becas completas del 100% y tramitación de visados para España, Italia, Alemania y la UE.',
    sitemapUrl: '/sitemap-es.xml',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    path: '/de',
    metaTitle: 'VERCITO - Europäische Bildungsberatung | Zukunft über Grenzen Hinweg Gestalten',
    metaDescription: 'Führende Hochschulberatung für europäische Studiengänge. Zulassungen, 100% Stipendien und Visabearbeitung für Deutschland, Italien, Frankreich und die EU.',
    sitemapUrl: '/sitemap-de.xml',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    path: '/pt',
    metaTitle: 'VERCITO - Consultoria de Educação Europeia | Moldando Futuros Além das Fronteiras',
    metaDescription: 'Consultoria de ensino superior europeu. Admissões, bolsas de estudo a 100% e vistos para Portugal, Itália, Alemanha, França e UE.',
    sitemapUrl: '/sitemap-pt.xml',
  },
  el: {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    flag: '🇬🇷',
    path: '/el',
    metaTitle: 'VERCITO - Συμβουλευτική Ευρωπαϊκής Εκπαίδευσης | Διαμορφώνοντας το Μέλλον Πέρα από τα Σύνορα',
    metaDescription: 'Συμβουλευτική ευρωπαϊκής τριτοβάθμιας εκπαίδευσης. Εισαγωγές, 100% υποτροφίες, έκδοση βίζας για Ελλάδα, Ιταλία, Γερμανία και ΕΕ.',
    sitemapUrl: '/sitemap-el.xml',
  },
  bg: {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    flag: '🇧🇬',
    path: '/bg',
    metaTitle: 'VERCITO - Европейски Образователен Консултант | Оформяне на Бъдещето Отвъд Границите',
    metaDescription: 'Консултации за висше образование в Европа. Прием, 100% стипендии, обработка на визи за Европа и ЕС.',
    sitemapUrl: '/sitemap-bg.xml',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    path: '/nl',
    metaTitle: 'VERCITO - Europees Onderwijsadvies | Toekomst Vormgeven Voorbij Grenzen',
    metaDescription: 'Advies voor Europees hoger onderwijs. Toelatingen, 100% beurzen, visumverwerking voor Nederland, Duitsland, Italië en de EU.',
    sitemapUrl: '/sitemap-nl.xml',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    path: '/pl',
    metaTitle: 'VERCITO - Europejskie Doradztwo Edukacyjne | Kształtowanie Przyszłości Ponad Granicami',
    metaDescription: 'Doradztwo w zakresie europejskiego szkolnictwa wyższego. Rekrutacja, 100% stypendia, wizy do Polski, Niemiec, Włoch i UE.',
    sitemapUrl: '/sitemap-pl.xml',
  },
  ro: {
    code: 'ro',
    name: 'Romanian',
    nativeName: 'Română',
    flag: '🇷🇴',
    path: '/ro',
    metaTitle: 'VERCITO - Consultanță în Educație Europeană | Modelarea Viitorului Dincolo de Frontiere',
    metaDescription: 'Consultanță pentru învățământul superior european. Admiteri, burse 100%, procesare vize pentru Europa și UE.',
    sitemapUrl: '/sitemap-ro.xml',
  },
  hu: {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    flag: '🇭🇺',
    path: '/hu',
    metaTitle: 'VERCITO - Európai Oktatási Tanácsadás | A Jövő Formálása Határokon Túl',
    metaDescription: 'Európai felsőoktatási tanácsadás. Felvételi, 100%-os ösztöndíjak (Stipendium Hungaricum), vízumügyintézés Magyarországra és az EU-ba.',
    sitemapUrl: '/sitemap-hu.xml',
  },
};
