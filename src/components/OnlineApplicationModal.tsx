/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, X, CheckCircle2, Upload, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { OnlineApplication } from '../types';
import { CountrySelect } from './CountrySelect';

interface OnlineApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountry?: string;
  initialUniversity?: string;
}

export const OnlineApplicationModal: React.FC<OnlineApplicationModalProps> = ({
  isOpen,
  onClose,
  initialCountry = 'Italy',
  initialUniversity = 'Politecnico di Milano',
}) => {
  const [appData, setAppData] = useState<OnlineApplication>({
    fullName: '',
    email: '',
    phone: '',
    passportNumber: '',
    district: 'Dhaka',
    targetCountry: initialCountry,
    preferredUniversity: initialUniversity,
    intendedProgram: 'M.Sc. Artificial Intelligence & Computer Science',
    cgpa: '3.35',
    ieltsStatus: 'IELTS 6.5',
    passportStatus: 'Available',
    additionalDetails: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appReference, setAppReference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'EU-APP-' + Math.floor(10000 + Math.random() * 90000);
    setAppReference(ref);
    setIsSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#0B1F3A', '#10B981'],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">
                <Send className="w-4 h-4" />
                <span>Direct University Application Portal</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                Apply to European Universities
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submit your credentials directly to VERCITO’s European admission team for offer letter issuance.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Applicant Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuzur Rahman"
                    value={appData.fullName}
                    onChange={(e) => setAppData({ ...appData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1800 000000"
                    value={appData.phone}
                    onChange={(e) => setAppData({ ...appData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Passport Number * (Mandatory)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A01234567"
                    value={appData.passportNumber}
                    onChange={(e) => setAppData({ ...appData, passportNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mahfuz@gmail.com"
                    value={appData.email}
                    onChange={(e) => setAppData({ ...appData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Home District / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka / Chittagong / Sylhet"
                    value={appData.district}
                    onChange={(e) => setAppData({ ...appData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <CountrySelect
                  value={appData.targetCountry}
                  onChange={(country) => setAppData({ ...appData, targetCountry: country })}
                  label="Target Country"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target University / Program
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Politecnico di Milano - M.Sc. AI"
                    value={appData.preferredUniversity}
                    onChange={(e) => setAppData({ ...appData, preferredUniversity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Academic CGPA
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3.40 / 4.00"
                    value={appData.cgpa}
                    onChange={(e) => setAppData({ ...appData, cgpa: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Passport Availability
                  </label>
                  <select
                    value={appData.passportStatus}
                    onChange={(e) => setAppData({ ...appData, passportStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Available">Available (Valid MRP Passport)</option>
                    <option value="In Progress">In Progress (Applied at Passport Office)</option>
                    <option value="Not Yet Applied">Not Yet Applied</option>
                  </select>
                </div>
              </div>

              {/* Upload Placeholder */}
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-center space-y-1">
                <Upload className="w-5 h-5 text-[#D4AF37] mx-auto" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Optional: Upload Transcript / CV (PDF)
                </p>
                <p className="text-[10px] text-slate-400">Our Gulshan document team will verify upon submission.</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit European Admission Dossier</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-[#D4AF37]">Application Submitted</span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white mt-1">
                Your EU Application Dossier is Registered!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-2">
                Application Reference: <strong className="text-[#D4AF37]">{appReference}</strong>. Our European admissions manager will review your transcripts and contact you via WhatsApp/Email within 24 hours.
              </p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs"
            >
              Return to VERCITO Portal
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
