/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  CheckCircle2,
  Building2,
  Plus,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Currency } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface CourseSelectionStepperProps {
  currency: Currency;
  onOpenApplicationWithUni?: (uniName: string, country: string) => void;
}

interface UniversityOption {
  id: string;
  name: string;
  country: string;
  flag: string;
  tuitionEur: number;
  livingCostEurPerYear: number;
  courses: string[];
}

const UNIVERSITIES: UniversityOption[] = [
  {
    id: 'polimi',
    name: 'Politecnico di Milano',
    country: 'Italy',
    flag: '🇮🇹',
    tuitionEur: 1500, // Reduced with DSU waiver
    livingCostEurPerYear: 6500,
    courses: ['M.Sc. Computer Science & AI', 'M.Sc. Automation & Robotics', 'M.Sc. Architecture & Design']
  },
  {
    id: 'bologna',
    name: 'University of Bologna',
    country: 'Italy',
    flag: '🇮🇹',
    tuitionEur: 1000,
    livingCostEurPerYear: 6000,
    courses: ['M.Sc. Data Science & Analytics', 'M.Sc. International Business', 'B.Sc. Economics & Finance']
  },
  {
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    flag: '🇩🇪',
    tuitionEur: 3000,
    livingCostEurPerYear: 11208, // Blocked Account
    courses: ['M.Sc. Software Engineering', 'B.Sc. Data Engineering', 'M.Sc. Power Engineering']
  },
  {
    id: 'suny',
    name: 'State University of New York (SUNY)',
    country: 'USA',
    flag: '🇺🇸',
    tuitionEur: 16000,
    livingCostEurPerYear: 12000,
    courses: ['MBA Business Analytics', 'M.Sc. Information Technology', 'B.Sc. Computer Science']
  },
  {
    id: 'helsinki',
    name: 'University of Helsinki',
    country: 'Finland',
    flag: '🇫🇮',
    tuitionEur: 13000,
    livingCostEurPerYear: 8500,
    courses: ['M.Sc. Data Science', 'M.Sc. Environmental Change', 'B.Sc. Science & AI']
  },
  {
    id: 'elte',
    name: 'Eötvös Loránd University (ELTE)',
    country: 'Hungary',
    flag: '🇭🇺',
    tuitionEur: 3500,
    livingCostEurPerYear: 5000,
    courses: ['M.Sc. Computer Science', 'M.Sc. International Relations', 'B.Sc. Psychology']
  }
];

interface AddonService {
  id: string;
  nameBn: string;
  nameEn: string;
  costEur: number;
}

const ADDON_SERVICES: AddonService[] = [
  { id: 'legalization', nameBn: 'শিক্ষা বোর্ড ও পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন ফি', nameEn: 'MOFA & Board Legalization Service', costEur: 150 },
  { id: 'sop', nameBn: 'স্টেটমেন্ট অব পারপাস (SOP) ও রিজিউমি এডিটিং', nameEn: 'SOP & Motivation Letter Review', costEur: 100 },
  { id: 'preenrollment', nameBn: 'বিশ্ববিদ্যালয় প্রি-এনরোলমেন্ট ও অফার লেটার ফাইল ফিলিং', nameEn: 'University Pre-Enrollment & Portal Filing', costEur: 200 },
  { id: 'visaprep', nameBn: 'এমবেসি ভিসা ফাইল প্রিপারেশন ও মক ইন্টারভিউ', nameEn: 'Schengen / US Visa File Prep & Mock Interview', costEur: 300 },
  { id: 'housing', nameBn: 'স্টুডেন্ট হাউজিং বুকিং ও এয়ারপোর্ট পিকআপ', nameEn: 'Student Accommodation & Arrival Support', costEur: 100 },
];

export const CourseSelectionStepper: React.FC<CourseSelectionStepperProps> = ({
  currency,
  onOpenApplicationWithUni,
}) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedUni, setSelectedUni] = useState<UniversityOption>(UNIVERSITIES[0]);
  const [selectedCourse, setSelectedCourse] = useState<string>(UNIVERSITIES[0].courses[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['legalization', 'visaprep']);

  const EUR_TO_BDT = 132;

  const handleUniChange = (uniId: string) => {
    const uni = UNIVERSITIES.find((u) => u.id === uniId) || UNIVERSITIES[0];
    setSelectedUni(uni);
    setSelectedCourse(uni.courses[0]);
  };

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculateAddonsCost = () => {
    return ADDON_SERVICES.filter((a) => selectedAddons.includes(a.id)).reduce(
      (sum, item) => sum + item.costEur,
      0
    );
  };

  const tuitionCost = selectedUni.tuitionEur;
  const livingCost = selectedUni.livingCostEurPerYear;
  const vercitoCost = calculateAddonsCost();
  const totalCostEur = tuitionCost + livingCost + vercitoCost;

  const formatMoney = (eurAmount: number) => {
    if (currency === 'BDT') {
      const bdt = eurAmount * EUR_TO_BDT;
      return `৳${bdt.toLocaleString('en-US')}`;
    }
    return `€${eurAmount.toLocaleString('en-US')}`;
  };

  return (
    <section id="cost-estimator" className="py-20 bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#0B1F3A] dark:text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('stepper.tag')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('stepper.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t('stepper.subtitle')}
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />

            {[1, 2, 3].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setCurrentStep(stepNum)}
                className={`relative z-10 w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                  currentStep >= stepNum
                    ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md ring-4 ring-[#D4AF37]/20 font-black'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {stepNum}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 text-xs font-bold text-slate-600 dark:text-slate-300 px-1">
            <span>{t('stepper.step1Title')}</span>
            <span>{t('stepper.step2Title')}</span>
            <span>{t('stepper.step3Title')}</span>
          </div>
        </div>

        {/* Stepper Card Body */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-2xl">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('stepper.step1Title')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select University */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-slate-700 dark:text-slate-300">
                    {t('stepper.selectUni')}
                  </label>
                  <select
                    value={selectedUni.id}
                    onChange={(e) => handleUniChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#D4AF37]"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.flag} {u.name} ({u.country})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Course */}
                <div>
                  <label className="block text-xs font-bold mb-2 text-slate-700 dark:text-slate-300">
                    {t('stepper.selectCourse')}
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#D4AF37]"
                  >
                    {selectedUni.courses.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected University Details Box */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Country & Destination</span>
                  <span className="text-sm font-bold text-[#D4AF37]">{selectedUni.flag} {selectedUni.country}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Estimated Tuition Fee</span>
                  <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(selectedUni.tuitionEur)} / Year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Est. Annual Living Expenses</span>
                  <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{formatMoney(selectedUni.livingCostEurPerYear)} / Year</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <span>Next: Additional Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('stepper.addonsTitle')}</span>
              </h3>

              <div className="space-y-3">
                {ADDON_SERVICES.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-amber-500/10 dark:bg-slate-800 border-[#D4AF37]'
                          : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B1F3A]'
                              : 'border-slate-400 bg-transparent'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                          {isBn ? addon.nameBn : addon.nameEn}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#D4AF37] shrink-0">
                        +{formatMoney(addon.costEur)}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <span>Next: View Total Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('stepper.totalBudget')}</span>
              </h3>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="border-b border-slate-100 dark:border-white/10 pb-3">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Selected University & Degree</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedUni.flag} {selectedUni.name} — {selectedCourse}
                  </h4>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t('stepper.tuitionEst')}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{formatMoney(tuitionCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t('stepper.livingEst')}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{formatMoney(livingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{t('stepper.vercitoFee')}</span>
                    <span className="font-mono font-bold text-[#D4AF37]">{formatMoney(vercitoCost)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#0B1F3A] dark:text-white uppercase tracking-wider">
                    {t('stepper.grandTotal')}
                  </span>
                  <span className="font-serif text-2xl font-black text-[#D4AF37]">
                    {formatMoney(totalCostEur)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Modify Addons
                </button>

                <button
                  onClick={() => {
                    if (onOpenApplicationWithUni) {
                      onOpenApplicationWithUni(selectedUni.name, selectedUni.country);
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>{t('stepper.applyWithPlan')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
