/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Building2, ChevronRight, Zap, CheckCircle2, Award, DollarSign, Calendar, Clock } from 'lucide-react';
import { UniversityPartner, Currency } from '../types';

interface UniversityCompareDrawerProps {
  comparedUnis: UniversityPartner[];
  onRemove: (uniId: string) => void;
  onClear: () => void;
  onClose: () => void;
  currency: Currency;
  onApply: (uniName: string) => void;
}

export const UniversityCompareDrawer: React.FC<UniversityCompareDrawerProps> = ({
  comparedUnis,
  onRemove,
  onClear,
  onClose,
  currency,
  onApply,
}) => {
  if (comparedUnis.length === 0) return null;

  const EUR_TO_BDT_RATE = 132;
  const formatMoney = (amountEUR?: number) => {
    if (amountEUR === undefined || amountEUR === null) return 'Contact Admissions';
    if (amountEUR === 0) return 'Tuition Free (€0)';
    if (currency === 'BDT') {
      const bdt = Math.round(amountEUR * EUR_TO_BDT_RATE);
      return `৳${bdt.toLocaleString('en-IN')}/yr`;
    }
    return `€${amountEUR.toLocaleString('en-US')}/yr`;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-[#0B1F3A] border-t-2 border-[#D4AF37] shadow-2xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto transition-all">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              Compare Universities ({comparedUnis.length} / 3)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={onClear}
              className="text-slate-500 hover:text-rose-500 underline font-semibold transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all text-slate-700 dark:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="overflow-x-auto pb-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="p-3 w-40 font-mono font-bold text-slate-400 uppercase text-[10px]">Criteria</th>
                {comparedUnis.map((uni) => (
                  <th key={uni.id} className="p-3 min-w-[220px] max-w-[280px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-xl block">{uni.logo}</span>
                        <h4 className="font-serif font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                          {uni.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block">{uni.city}, {uni.country}</span>
                      </div>
                      <button
                        onClick={() => onRemove(uni.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {/* QS World Rank */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">QS World Rank</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 font-extrabold text-[#D4AF37]">
                    #{uni.ranking}
                  </td>
                ))}
              </tr>

              {/* Institution Type */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">University Type</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 text-slate-800 dark:text-slate-200 font-semibold">
                    {uni.type}
                  </td>
                ))}
              </tr>

              {/* Bachelor Tuition */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Bachelor Tuition</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 font-bold text-slate-900 dark:text-white">
                    {formatMoney(uni.tuitionFeeBachelorEUR ?? uni.tuitionFeePerYearEUR)}
                  </td>
                ))}
              </tr>

              {/* Master Tuition */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Master Tuition</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 font-bold text-slate-900 dark:text-white">
                    {formatMoney(uni.tuitionFeeMasterEUR ?? uni.tuitionFeePerYearEUR)}
                  </td>
                ))}
              </tr>

              {/* IELTS Requirement */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">English Waiver / IELTS</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {uni.ieltsRequirement || (uni.englishWaiverPossible ? 'MOI / Waiver Accepted' : 'IELTS 6.0+')}
                  </td>
                ))}
              </tr>

              {/* Scholarship Offerd */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Available Grants</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                    {uni.scholarshipsOffered[0] || '100% Merit Waiver'}
                  </td>
                ))}
              </tr>

              {/* Application Deadline */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Application Deadline</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3 text-rose-600 dark:text-rose-400 font-bold">
                    {uni.applicationDeadline}
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Apply</td>
                {comparedUnis.map((uni) => (
                  <td key={uni.id} className="p-3">
                    <button
                      onClick={() => onApply(uni.name)}
                      className="w-full py-2 px-3 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Apply Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
