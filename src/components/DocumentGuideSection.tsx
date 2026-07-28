/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  CheckCircle2,
  Building2,
  Award
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface DocumentRule {
  id: string;
  nameBn: string;
  nameEn: string;
  badgeBn: string;
  badgeEn: string;
  icon: string;
  summaryBn: string;
  summaryEn: string;
  rulesBn: string[];
  rulesEn: string[];
  officialAuthorityBn: string;
  officialAuthorityEn: string;
}

const DOCUMENTS_LIST: DocumentRule[] = [
  {
    id: 'transcripts',
    nameBn: 'একাডেমিক ট্রান্সক্রিপ্ট ও বোর্ড সার্টিফিকেট',
    nameEn: 'Academic Transcripts & Board Certificates',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '🎓',
    summaryBn: 'এসএসসি, এইচএসসি ও ব্যাচেলর ডিগ্রির মূল মূল সার্টিফিকেট ও নম্বরপত্র।',
    summaryEn: 'Original certificates and marksheets for S.S.C, H.S.C and Bachelor Degree.',
    rulesBn: [
      'সংশ্লিষ্ট মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড থেকে সত্যায়ন করতে হবে।',
      'শিক্ষা মন্ত্রণালয় (ঢাকা সচিবালয়) থেকে দ্বিতীয় ধাপে সত্যায়ন সম্পন্ন করতে হবে।',
      'পররাষ্ট্র মন্ত্রণালয় (MOFA, সেগুনবাগিচা) থেকে চূড়ান্ত কিউআর কোড বা সিলমোহরকৃত সত্যায়ন নিতে হবে।',
      'ইটালি ইতালীয় ভাষার অনুবাদ এবং ডুভ (DOV/CIMEA) প্রসেস সম্পন্ন রাখা আবশ্যক।'
    ],
    rulesEn: [
      'Must be attested by the respective Secondary & Higher Secondary Education Board.',
      'Secondary attestation required from the Ministry of Education (Dhaka Secretariat).',
      'Final apostille / QR code verification from the Ministry of Foreign Affairs (MOFA, Segunbagicha).',
      'Italian applicants require certified Italian translation & CIMEA / DOV verification.'
    ],
    officialAuthorityBn: 'শিক্ষা বোর্ড + শিক্ষা মন্ত্রণালয় + পররাষ্ট্র মন্ত্রণালয় (MOFA)',
    officialAuthorityEn: 'Education Board + Ministry of Education + MOFA Bangladesh'
  },
  {
    id: 'police',
    nameBn: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (PCC)',
    nameEn: 'Police Clearance Certificate (PCC)',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '🛡️',
    summaryBn: 'বাংলাদেশ পুলিশ থেকে প্রাপ্ত ৬ মাসের কম সময়সীমার অপরাধমুক্ত সনদ।',
    summaryEn: 'Criminal clearance certificate issued by Bangladesh Police HQ within 6 months.',
    rulesBn: [
      'অনলাইন পোর্টাল (pcc.police.gov.bd) থেকে আবেদন করে স্থানীয় থানা পুলিশ ভেরিফিকেশন সম্পন্ন করতে হবে।',
      'সার্টিফিকেট প্রাপ্তির পর পররাষ্ট্র মন্ত্রণালয় (MOFA) থেকে কিউআর কোড সিল নিতে হবে।',
      'এমবেসিতে জমা দেয়ার সময় সার্টিফিকেটের মেয়াদ ন্যূনতম ৩-৪ মাস অবশিষ্ট থাকতে হবে।'
    ],
    rulesEn: [
      'Apply via official online portal (pcc.police.gov.bd) and complete local police verification.',
      'Must be attested by the Ministry of Foreign Affairs (MOFA) upon issuance.',
      'Must have at least 3-4 months validity remaining on the date of visa filing.'
    ],
    officialAuthorityBn: 'বাংলাদেশ পুলিশ সদর দপ্তর + পররাষ্ট্র মন্ত্রণালয় (MOFA)',
    officialAuthorityEn: 'Bangladesh Police HQ + MOFA Bangladesh'
  },
  {
    id: 'bank',
    nameBn: 'ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট',
    nameEn: 'Bank Statement & Solvency Certificate',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '🏦',
    summaryBn: 'আবেদনকারীর বা স্পন্সরের ৬ মাসের ব্যাংক বিবরণী ও সলভেন্সি পেপার।',
    summaryEn: '6-month bank transaction history and solvency certificate of student or sponsor.',
    rulesBn: [
      'বাংলাদেশ ব্যাংকের অনুমোদিত তফসিলি ব্যাংকে ন্যূনতম ৬ মাসের লেনদেন থাকতে হবে।',
      'ইটালি/স্পেন/জার্মানি ভিসার জন্য প্রয়োজনীয় ফান্ড (ইউরো ৬,০০০ - ১২,০০০ বা সমপরিমাণ টাকা) পর্যাপ্ত সময় পরিপক্ক থাকতে হবে।',
      'জার্মানির জন্য Expatrio / Fintiba Blocked Account (€11,208) কনফার্মেশন লেটার প্রয়োজন।',
      'স্পন্সরের ইনকাম ট্যাক্স রিটার্ন (IT-10B) ও পে-স্লিপ সংযুক্ত করতে হবে।'
    ],
    rulesEn: [
      'Must be maintained in a Bangladesh Bank scheduled commercial bank for at least 6 months.',
      'Sufficient fund balance (€6,000 - €12,000 depending on destination) with proven fund source.',
      'Germany requires official Blocked Account (€11,208) confirmation letter.',
      'Sponsor Income Tax Return (IT-10B acknowledgment) and trade license / pay-slip attached.'
    ],
    officialAuthorityBn: 'তফসিলি ব্যাংক + জাতীয় রাজস্ব বোর্ড (NBR Tax Return)',
    officialAuthorityEn: 'Scheduled Commercial Bank + NBR Tax Return'
  },
  {
    id: 'medical',
    nameBn: 'মেডিকেল ফিটনেস ও রিপোর্ট',
    nameEn: 'Medical Certificate & Health Fitness Report',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '🩺',
    summaryBn: 'অনুমোদিত ডায়াগনস্টিক সেন্টারের স্বাস্থ্য পরীক্ষা ও ফিটনেস সার্টিফিকেট।',
    summaryEn: 'Medical health fitness certificate issued by an approved diagnostic center.',
    rulesBn: [
      'যক্ষ্মা (TB X-Ray), হেপাটাইটিস বি ও সি, এইচআইভি এবং সংক্রামক রোগের পরীক্ষা অন্তর্ভুক্ত থাকতে হবে।',
      'এমবিবিএস ডাক্তারের সিল ও রেজিস্ট্রেশন নম্বর সহ ফিটনেস সার্টিফিকেট থাকতে হবে।',
      'পররাষ্ট্র মন্ত্রণালয় (MOFA) থেকে মেডিকেল রিপোর্ট সত্যায়ন করতে হবে।'
    ],
    rulesEn: [
      'Must cover TB Chest X-Ray, Hepatitis B/C, HIV, and general physical health check.',
      'Signed and stamped by an BMDC registered MBBS physician.',
      'Attestation from the Ministry of Foreign Affairs (MOFA) required for specific Schengen visas.'
    ],
    officialAuthorityBn: 'বিএমডিসি নিবন্ধিত চিকিৎসক + পররাষ্ট্র মন্ত্রণালয়',
    officialAuthorityEn: 'BMDC Registered Medical Center + MOFA'
  },
  {
    id: 'passport',
    nameBn: 'বৈধ ই-পাসপোর্ট কপি ও বায়োমেট্রিক ছবি',
    nameEn: 'Valid E-Passport Copy & Biometric Photo',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '📘',
    summaryBn: 'ন্যূনতম ১-২ বছর মেয়াদসম্পন্ন পাসপোর্ট এবং ৩৫x৪৫ মিমি বায়োমেট্রিক ছবি।',
    summaryEn: 'Original e-passport with 1-2 years validity and biometric visa photographs.',
    rulesBn: [
      'পাসপোর্টে ন্যূনতম ২-৩ টি খালি পৃষ্ঠা থাকতে হবে।',
      'পূর্বে ব্যবহৃত বা রিজেক্টেড কোনো ভিসা থাকলে তার কপি প্রস্তুত রাখতে হবে।',
      'ছবি অবশ্যই সাদা ব্যাকগ্রাউন্ডে ৩৫x৪৫ মিমি সাইজের ম্যাট পেপারে তোলা হতে হবে।'
    ],
    rulesEn: [
      'Must contain at least 2-3 blank pages for visa sticker stamping.',
      'Provide copies of all previous visas and entry stamps if applicable.',
      'Photos must be 35x45mm matte finish with 80% face coverage on plain white background.'
    ],
    officialAuthorityBn: 'ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তর (DIP Bangladesh)',
    officialAuthorityEn: 'Department of Immigration & Passports Bangladesh'
  },
  {
    id: 'visaform',
    nameBn: 'ভিসা আবেদনপত্র ও এসওপি (Cover Letter)',
    nameEn: 'Visa Application Forms & SOP (Cover Letter)',
    badgeBn: 'বাধ্যতামূলক / প্রয়োজনীয়',
    badgeEn: 'Mandatory / Required',
    icon: '📝',
    summaryBn: 'সঠিকভাবে পূরণকৃত আবেদনপত্র এবং স্টেটমেন্ট অফ পারপাস (SOP)।',
    summaryEn: 'Duly filled Schengen / US visa application form & Statement of Purpose.',
    rulesBn: [
      'ভিসা ফরমে আপনার নাম ও জন্মতারিখ হুবহু পাসপোর্টের সাথে মিল থাকতে হবে।',
      'এসওপি-তে কেন ইউরোপ/আমেরিকায় পড়াশোনা করতে চান এবং পড়াশোনা শেষে বাংলাদেশে ফেরার ভবিষ্যৎ পরিকল্পনা স্পষ্ট থাকতে হবে।',
      'ভার্সিটি অফার লেটার ও টিউশন ফি রসিদ সংযুক্ত করতে হবে।'
    ],
    rulesEn: [
      'All personal details must match passport and academic credentials strictly.',
      'SOP must outline genuine study motivation, financial background, and intent to return to Bangladesh.',
      'Attach university acceptance letter, housing confirmation, and pre-enrollment receipt.'
    ],
    officialAuthorityBn: 'সংশ্লিষ্ট দেশীয় এমবেসি / VFS Global / US Embassy Dhaka',
    officialAuthorityEn: 'Respective Embassy / VFS Global / US Embassy Dhaka'
  }
];

export const DocumentGuideSection: React.FC = () => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const [expandedId, setExpandedId] = useState<string | null>('transcripts');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="doc-guide" className="py-20 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{t('docGuide.tag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('docGuide.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t('docGuide.subtitle')}
          </p>
        </div>

        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS_LIST.map((doc) => {
            const isExpanded = expandedId === doc.id;
            return (
              <div
                key={doc.id}
                className={`rounded-3xl border transition-all duration-300 bg-slate-50 dark:bg-slate-900/80 overflow-hidden ${
                  isExpanded
                    ? 'border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20'
                    : 'border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/50 shadow-sm'
                }`}
              >
                {/* Card Top Header */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl">{doc.icon}</span>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 uppercase">
                      {isBn ? doc.badgeBn : doc.badgeEn}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white leading-snug">
                    {isBn ? doc.nameBn : doc.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isBn ? doc.summaryBn : doc.summaryEn}
                  </p>

                  <button
                    onClick={() => toggleExpand(doc.id)}
                    className="w-full mt-2 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#0B1F3A] dark:text-[#D4AF37] hover:underline"
                  >
                    <span>{isExpanded ? t('docGuide.hideDetails') : t('docGuide.expandDetails')}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expandable Preparation Rules Detail Box */}
                {isExpanded && (
                  <div className="p-6 pt-0 bg-amber-500/5 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{isBn ? 'সত্যায়ন ও ফাইল প্রিপারেশন নিয়ম:' : 'Preparation Rules & Attestation Steps:'}</span>
                      </h4>
                      <ul className="space-y-2">
                        {(isBn ? doc.rulesBn : doc.rulesEn).map((rule, idx) => (
                          <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-[#D4AF37] font-bold">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>
                        <strong className="text-slate-900 dark:text-white">Authority: </strong>
                        {isBn ? doc.officialAuthorityBn : doc.officialAuthorityEn}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
