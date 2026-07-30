/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  FileText,
  Clock,
  DollarSign,
  GraduationCap,
  Globe,
  Award,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  HelpCircle,
  Download,
  Printer,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UniversityPartner } from '../types';

interface UniversityGuideModalProps {
  university: UniversityPartner;
  isOpen: boolean;
  onClose: () => void;
  onApplyNow: (uniName: string) => void;
}

export const UniversityGuideModal: React.FC<UniversityGuideModalProps> = ({
  university,
  isOpen,
  onClose,
  onApplyNow,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'steps' | 'documents' | 'requirements' | 'fees' | 'timeline'
  >('steps');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl relative my-auto max-h-[94vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  OFFICIAL ADMISSION GUIDE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Verified 2026 Process
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>{university.name}</span>
                <span className="text-sm font-sans text-[#D4AF37]">({university.country})</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* University Hero Header */}
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#0D2545] to-[#07172E] p-4 sm:p-6 border-b border-white/10 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-white/20 shadow-md">
              {university.logo || '🎓'}
            </div>
            <div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                {university.city}, {university.country} | QS World Rank #{university.ranking}
              </p>
              <p className="text-xs font-semibold text-[#D4AF37] mt-0.5">
                Tuition Fee: {university.tuitionFeePerYearEUR === 0 ? 'Tuition Free (€0)' : `€${university.tuitionFeePerYearEUR?.toLocaleString()}/yr`} | App Fee: €{university.applicationFeeEUR || 0}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onApplyNow(university.name);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>APPLY NOW TO THIS UNIVERSITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 p-2 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1">
            {[
              { id: 'steps', label: '10-Step How to Apply', icon: CheckCircle2 },
              { id: 'overview', label: 'University Overview', icon: Building2 },
              { id: 'documents', label: 'Required Documents', icon: FileText },
              { id: 'requirements', label: 'Entry Requirements', icon: Award },
              { id: 'fees', label: 'Fees & Intakes', icon: DollarSign },
              { id: 'timeline', label: 'Processing Timeline', icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: 10-STEP HOW TO APPLY */}
          {activeTab === 'steps' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <h4 className="font-bold text-[#0B1F3A] dark:text-[#D4AF37]">
                    Official VERCITO 10-Step Direct Application Workflow
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Follow this exact step-by-step roadmap to submit your application dossier to {university.name}.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: 'Select the University',
                    desc: `Locate ${university.name} in the VERCITO Global University Directory. Review details, ranking (#${university.ranking}), and tuition structure.`,
                  },
                  {
                    step: 2,
                    title: 'Click "Apply Now"',
                    desc: 'Clicking Apply Now automatically opens a clean, independent application session and transfers all official university details.',
                  },
                  {
                    step: 3,
                    title: 'Create or Log into Student Account',
                    desc: 'Log in or register your secure VERCITO Student Account. All application data and documents are protected under your private User ID.',
                  },
                  {
                    step: 4,
                    title: 'Complete Student Personal Information',
                    desc: 'Enter your full legal name as it appears on your passport, contact details, district, and permanent residential address.',
                  },
                  {
                    step: 5,
                    title: 'Complete Academic Information',
                    desc: 'Provide details of your highest academic qualification, degree title, CGPA/Result, institution name, and graduation year.',
                  },
                  {
                    step: 6,
                    title: 'Add English Language Information',
                    desc: 'Specify your English test result (IELTS, PTE, Duolingo, TOEFL) or select Medium of Instruction (MOI Waiver) if applicable.',
                  },
                  {
                    step: 7,
                    title: 'Upload Required Documents',
                    desc: 'Attach PDF copies of your Passport, Certificates, Transcripts, Test Scores, CV, and Personal Statement (SOP).',
                  },
                  {
                    step: 8,
                    title: 'Review the Application',
                    desc: 'Perform a full audit of your entered information and document attachments before final transmission.',
                  },
                  {
                    step: 9,
                    title: 'Submit the Application',
                    desc: 'Confirm submission to receive your unique Application ID (e.g. VER-APP-2026-XXXXXX) registered in VERCITO database.',
                  },
                  {
                    step: 10,
                    title: 'Download or Print the Application Form',
                    desc: 'Download your official A4 PDF dossier and print a copy for your personal records and embassy visa folder.',
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0B1F3A] dark:text-white">
                        Step {s.step}: {s.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Institution Type</span>
                  <p className="text-sm font-bold">{university.type} University</p>
                  <p className="text-xs text-slate-500">Established: {university.established || 1880}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Global Recognition</span>
                  <p className="text-sm font-bold">QS Rank #{university.ranking}</p>
                  <p className="text-xs text-slate-500">THE World Rank: #{university.theRanking || university.ranking + 15}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Location</span>
                  <p className="text-sm font-bold">{university.city}, {university.country}</p>
                  <p className="text-xs text-slate-500">Schengen / Higher Education Jurisdiction</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Available Degrees</span>
                  <p className="text-sm font-bold">
                    {university.programLevels?.join(', ') || "Bachelor's, Master's, PhD"}
                  </p>
                </div>
              </div>

              {/* Featured Programs */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span>Featured Specializations at {university.name}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {university.featuredPrograms?.map((prog, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                Mandatory Application Document Checklist
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All documents must be scanned clearly in PDF format.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: '1. Valid International Passport', req: 'First page & signature page in high resolution PDF' },
                  { name: '2. Academic Certificates', req: 'SSC, HSC, or Bachelor Degree Certificates attested' },
                  { name: '3. Official Academic Transcripts', req: 'Marksheet / Transcript issued by Controller of Examinations' },
                  { name: '4. English Language Certificate', req: 'IELTS Academic, PTE, Duolingo, or MOI Certificate' },
                  { name: '5. Curriculum Vitae (CV)', req: 'Europass or standard academic CV detailing education & achievements' },
                  { name: '6. Personal Statement (SOP)', req: 'Motivation letter detailing why you chose this course and university' },
                  { name: '7. Recommendation Letters (LOR)', req: '1 or 2 recommendation letters from academic professors or employers' },
                  { name: '8. Portfolio / Work Experience (if applicable)', req: 'Required for Design, Architecture, or specialized Master programs' },
                ].map((doc, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                    <p className="font-bold text-[#0B1F3A] dark:text-white">{doc.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{doc.req}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ENTRY REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                Academic & Language Admission Eligibility
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="font-bold text-[#D4AF37] block uppercase text-[10px]">Academic CGPA Requirement</span>
                  <p className="text-slate-800 dark:text-slate-200">
                    Minimum CGPA 2.75 / 4.00 (or equivalent 60% aggregate) in relevant previous degree for Master's entry. HSC GPA 3.50+ for Bachelor's entry.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="font-bold text-[#D4AF37] block uppercase text-[10px]">English Requirement</span>
                  <p className="text-slate-800 dark:text-slate-200">
                    {university.ieltsRequirement || 'IELTS Overall 6.0 - 6.5 (no band below 5.5), PTE 58+, Duolingo 110+, or English MOI letter from prior university.'}
                  </p>
                  {university.englishWaiverPossible && (
                    <span className="inline-block mt-2 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                      ✓ English MOI / IELTS Waiver Accepted
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="font-bold text-[#D4AF37] block uppercase text-[10px]">Course Specific Requirements</span>
                  <p className="text-slate-800 dark:text-slate-200">
                    Relevant bachelor's degree in engineering, science, IT, or business matching target master's course curriculum.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FEES & INTAKES */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                Tuition Fees, Application Costs & Intakes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Annual Tuition Fee</span>
                  <p className="text-xl font-extrabold text-[#D4AF37] mt-1">
                    {university.tuitionFeePerYearEUR === 0 ? 'Tuition Free (€0)' : `€${university.tuitionFeePerYearEUR?.toLocaleString()} / year`}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Scholarships / Grants: {university.scholarshipsOffered?.join(', ') || 'Regional Grant Available'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Application Fee</span>
                  <p className="text-xl font-extrabold text-emerald-500 mt-1">
                    {university.applicationFeeEUR === 0 ? 'Waiver (€0)' : `€${university.applicationFeeEUR}`}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Direct online application processing fee</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Available Intakes</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-white mt-1">
                    {university.intakes?.join(', ') || 'Fall (August/September) & Spring (January)'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Application Deadline</span>
                  <p className="text-sm font-bold text-rose-500 mt-1">{university.applicationDeadline || 'Rolling Admissions'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROCESSING TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                Application Processing Timeline Roadmap
              </h4>

              <div className="relative border-l-2 border-[#D4AF37] ml-4 pl-6 space-y-6 text-xs">
                {[
                  { title: 'Application Submitted', time: 'Day 1', desc: 'Application registered in VERCITO system and assigned unique ID.' },
                  { title: 'Application Received & Verified', time: 'Day 2 - 3', desc: 'Admissions desk checks document completeness and attestation.' },
                  { title: 'Document Review', time: 'Week 1', desc: 'Verification of academic transcripts, CGPA, and English waiver eligibility.' },
                  { title: 'University Direct Review', time: 'Week 2 - 4', desc: 'Dossier transmitted directly to target university international office.' },
                  { title: 'University Decision', time: 'Week 4 - 6', desc: 'Evaluation by faculty admission committee.' },
                  { title: 'Offer Letter Issued', time: 'Week 6', desc: 'Official admission offer letter and pre-enrollment document issued.' },
                ].map((t, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-white dark:border-[#0B1F3A]" />
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-[#0B1F3A] dark:text-white">{t.title}</h5>
                      <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold">{t.time}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notes Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Important VERCITO Admission Rules:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-700 dark:text-amber-200">
              <li>Submit accurate information. Overwritten or fraudulent documents lead to immediate rejection.</li>
              <li>Upload clear, high-resolution PDF scans.</li>
              <li>Keep your Application ID safely stored in your Student Account.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-100 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Guide provided by VERCITO Higher Education Admissions Desk.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer flex-1 sm:flex-none"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyNow(university.name);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-none shadow-md"
            >
              <span>APPLY NOW TO THIS UNIVERSITY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
