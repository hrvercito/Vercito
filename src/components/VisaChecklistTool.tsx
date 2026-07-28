/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DOCUMENT_CHECKLIST } from '../data/mockData';
import { ShieldCheck, CheckSquare, Square, Printer, Info, Download, AlertCircle } from 'lucide-react';

export const VisaChecklistTool: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Italy');
  const [checkedIds, setCheckedIds] = useState<string[]>(['doc-1', 'doc-2']);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalMandatory = DOCUMENT_CHECKLIST.filter((d) => d.isMandatory || d.id === 'doc-6').length;
  const completedCount = checkedIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalMandatory) * 100));

  return (
    <section id="visa-checklist" className="py-24 bg-slate-50 dark:bg-[#071426] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Interactive VFS & Embassy Dossier Audit</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Bangladeshi Student Visa Document Checklist
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Ensure 100% compliance before your VFS Global Dhaka appointment or Embassy submission.
          </p>
        </div>

        {/* Interactive Checklist Dashboard */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 shadow-xl space-y-8">
          {/* Top Bar: Country Selector & Progress */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-6">
            <div className="w-full md:w-auto">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                Target Embassy Country:
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full md:w-64 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Italy">Italy (VFS Dhaka / Embassy)</option>
                <option value="Germany">Germany (VFS / Embassy Dhaka - Sperrkonto)</option>
                <option value="France">France (Campus France & VFS Dhaka)</option>
                <option value="Hungary">Hungary (VFS / Stipendium Dossier)</option>
                <option value="Spain">Spain (Embassy Dhaka / UnEDasiss)</option>
                <option value="Portugal">Portugal (VFS New Delhi / Dhaka Representative)</option>
                <option value="Poland">Poland (VFS Dhaka Center)</option>
              </select>
            </div>

            {/* Progress Bar */}
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-200">Dossier Readiness Score:</span>
                <span className="text-[#D4AF37]">{progressPercent}% Ready</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Checklist</span>
            </button>
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENT_CHECKLIST.map((doc) => {
              const isChecked = checkedIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleCheck(doc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="mt-0.5 text-[#D4AF37] shrink-0">
                    {isChecked ? <CheckSquare className="w-5 h-5 fill-[#D4AF37] text-[#0B1F3A]" /> : <Square className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-sm font-bold">{doc.title}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        {doc.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">{doc.description}</p>

                    {doc.bangladeshNotes && (
                      <p className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1 pt-1">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>{doc.bangladeshNotes}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              <strong>Embassy Advisory:</strong> All Bangladeshi academic documents must undergo MOFA attestation before VFS submission. VERCITO provides end-to-end attestation & sworn translation support.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
