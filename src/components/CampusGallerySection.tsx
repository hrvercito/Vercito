/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, MapPin, Award, X, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface GalleryItem {
  id: string;
  country: string;
  countryFlag: string;
  university: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  imageUrl: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'polimi-campus',
    country: 'Italy',
    countryFlag: '🇮🇹',
    university: 'Politecnico di Milano',
    titleBn: 'পলিটেকনিকো দি মিলানো ঐতিহাসিক ক্যাম্পাস ও লাইব্রেরি',
    titleEn: 'Politecnico di Milano Main Historic Campus',
    descBn: 'ইটালির শীর্ষ টেকনিক্যাল বিশ্ববিদ্যালয়ে অধ্যয়নরত আমাদের বাংলাদেশি শিক্ষার্থীদের আড্ডাস্থল ও রিসার্চ লাইব্রেরি।',
    descEn: 'Historic architecture & high-tech research library at Italy top technical university in Milan.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80',
    tag: 'Campus Architecture'
  },
  {
    id: 'tum-lab',
    country: 'Germany',
    countryFlag: '🇩🇪',
    university: 'Technical University of Munich (TUM)',
    titleBn: 'টিউ মিউনিখ গুরচিং হাই-টেক রিসার্চ পার্ক ও স্টুডেন্ট ল্যাব',
    titleEn: 'TU Munich Garching Research Campus & Labs',
    descBn: 'জার্মানির সেরা পাবলিক বিশ্ববিদ্যালয়ে বিশ্বমানের ইঞ্জিনিয়ারিং ও ডাটা সায়েন্স গবেষণার পরিবেশ।',
    descEn: 'State-of-the-art engineering & AI robotics research complex at TUM Garching.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80',
    tag: 'Student Labs & Tech'
  },
  {
    id: 'usa-campus',
    country: 'USA',
    countryFlag: '🇺🇸',
    university: 'State University of New York (SUNY)',
    titleBn: 'আমেরিকান বিশ্ববিদ্যালয় ক্যাম্পাস ও গ্র্যাজুয়েশন ডে',
    titleEn: 'SUNY Campus Life & Student Convocation',
    descBn: 'যুক্তরাষ্ট্রের বিশাল সবুজ ক্যাম্পাস, আন্তর্জাতিক অ্যাথলেটিক্স এবং সাংস্কৃতিক মিলনমেলা।',
    descEn: 'Vibrant student life, athletic centers, and international convocation ceremonies in New York.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    tag: 'Student Culture'
  },
  {
    id: 'bologna-uni',
    country: 'Italy',
    countryFlag: '🇮🇹',
    university: 'University of Bologna',
    titleBn: 'ইউনিভার্সিটি অব বোলোনিয়া - বিশ্বের প্রাচীনতম বিশ্ববিদ্যালয়',
    titleEn: 'University of Bologna - World Oldest University',
    descBn: '১০৮৮ সালে প্রতিষ্ঠিত প্রাচীনতম ইউরোপিয়ান প্রাঙ্গণে শতভাগ ডিএসইউ স্কলারশিপপ্রাপ্ত আমাদের শিক্ষার্থীরা।',
    descEn: 'Established in 1088 AD, housing thousands of international scholars with full 100% grants.',
    imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4957185e?auto=format&fit=crop&w=1000&q=80',
    tag: 'Heritage Campus'
  },
  {
    id: 'helsinki-campus',
    country: 'Finland',
    countryFlag: '🇫🇮',
    university: 'University of Helsinki',
    titleBn: 'ফিনল্যান্ড ইউনিভার্সিটি ক্যাম্পাস ও স্টুডেন্ট হাউজিং',
    titleEn: 'Helsinki Modern Campus & Eco Student Housing',
    descBn: 'নর্ডিক প্রাকৃতিক সৌন্দর্য পরিবেষ্টিত আধুনিক ইকো-ফ্রেন্ডলি ক্যাম্পাস ও মনোরম আবাসন সুবিধা।',
    descEn: 'Eco-designed Scandinavian lecture halls, modern housing, and scenic nature parks in Finland.',
    imageUrl: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=1000&q=80',
    tag: 'Nordic Campus'
  },
  {
    id: 'hungary-stipendium',
    country: 'Hungary',
    countryFlag: '🇭🇺',
    university: 'Eötvös Loránd University (ELTE Budapest)',
    titleBn: 'বুদাপেস্ট এলটে বিশ্ববিদ্যালয় ও স্কলারশিপ গ্যালােক্সি',
    titleEn: 'ELTE Budapest Campus & Hungarian Scholars',
    descBn: 'স্টিপেন্ডিয়াম হাঙ্গারিকাম স্কলারশিপ বিজয়ী বাংলাদেশি শিক্ষার্থীদের বুদাপেস্ট ফ্রি ক্যাম্পাস জীবন।',
    descEn: 'Stipendium Hungaricum grant recipients thriving in Budapest historic academic center.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    tag: 'Budapest Heritage'
  }
];

export const CampusGallerySection: React.FC = () => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const countries = ['All', 'Italy', 'Germany', 'USA', 'Finland', 'Hungary'];

  const filteredItems = selectedCountry === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.country === selectedCountry);

  return (
    <section id="campus-gallery" className="py-20 bg-slate-50 dark:bg-[#0B1F3A]/70 text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('gallery.tag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('gallery.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filter Country Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCountry === c
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] shadow-md font-extrabold scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
              }`}
            >
              {c === 'All' ? t('gallery.allCountries') : c}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="h-64 w-full overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={isBn ? item.titleBn : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Country Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/20">
                  <span>{item.countryFlag}</span>
                  <span>{item.country}</span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-md bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-mono font-extrabold uppercase">
                  {item.tag}
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1">
                <p className="text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.university}</span>
                </p>
                <h3 className="font-serif text-base font-bold line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {isBn ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-light">
                  {isBn ? item.descBn : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Preview Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative max-w-3xl w-full bg-[#0B1F3A] rounded-3xl border border-white/20 overflow-hidden shadow-2xl text-white">
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-80 sm:h-96 w-full relative">
                <img
                  src={activeItem.imageUrl}
                  alt={isBn ? activeItem.titleBn : activeItem.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activeItem.countryFlag}</span>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase font-mono">
                    {activeItem.university} ({activeItem.country})
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {isBn ? activeItem.titleBn : activeItem.titleEn}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {isBn ? activeItem.descBn : activeItem.descEn}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
