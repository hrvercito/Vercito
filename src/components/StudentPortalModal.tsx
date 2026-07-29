/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Upload,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  Send,
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  GraduationCap,
  CreditCard,
  MessageSquare,
  Bot,
  Paperclip,
  Sparkles,
  Award
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { VercitoLogo } from './VercitoLogo';
import { AIAssessmentRecord } from '../types';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment?: () => void;
}

interface ChatMsg {
  id: string;
  sender: 'student' | 'counselor' | 'auto';
  senderName: string;
  text: string;
  time: string;
}

interface DemoFileStatus {
  id: string;
  studentName: string;
  country: string;
  university: string;
  program: string;
  submittedDate: string;
  currentStepIndex: number;
  steps: { title: string; desc: string; completed: boolean; current?: boolean }[];
  documents: { name: string; status: 'Approved' | 'Pending' | 'Required'; date: string }[];
}

const DEMO_RECORDS: Record<string, DemoFileStatus> = {
  'VRC-2026-8891': {
    id: 'VRC-2026-8891',
    studentName: 'Tanvir Hossain',
    country: 'Italy',
    university: 'Politecnico di Milano',
    program: 'M.Sc. Computer Science',
    submittedDate: '15 Jan 2026',
    currentStepIndex: 3,
    steps: [
      { title: '1. Profile Submitted', desc: 'Mandatory profile assessment & evaluation complete', completed: true },
      { title: '2. Documents Uploaded', desc: 'Transcript, Certificate, CV & Passport verified', completed: true },
      { title: '3. University Applied', desc: 'Application submitted on Universitaly portal', completed: true },
      { title: '4. Offer Letter Received', desc: 'Conditional Admission Offer Letter issued', completed: true, current: true },
      { title: '5. Tuition Paid', desc: 'Regional tax & pre-enrollment deposit confirmed', completed: false },
      { title: '6. Visa Submitted', desc: 'Dossier & Bank solvency lodged at VFS Dhaka', completed: false },
      { title: '7. Visa Approved', desc: 'Schengen National Type-D Study Visa granted', completed: false },
      { title: '8. Departure', desc: 'Pre-departure flight & accommodation briefing', completed: false },
    ],
    documents: [
      { name: 'S.S.C & H.S.C Board Certificates', status: 'Approved', date: '16 Jan 2026' },
      { name: 'Bachelor Degree Transcript & Certificate', status: 'Approved', date: '18 Jan 2026' },
      { name: 'Bank Solvency & 6-Month Statement', status: 'Approved', date: '22 Jan 2026' },
      { name: 'Police Clearance Certificate (MOFA)', status: 'Approved', date: '25 Jan 2026' },
      { name: 'Medical Certificate', status: 'Pending', date: 'Awaiting Audit' },
    ]
  },
  'VRC-2026-5420': {
    id: 'VRC-2026-5420',
    studentName: 'Nusrat Jahan',
    country: 'Germany',
    university: 'TU Munich (TUM)',
    program: 'B.Sc. Data Engineering',
    submittedDate: '02 Feb 2026',
    currentStepIndex: 6,
    steps: [
      { title: '1. Profile Submitted', desc: 'Profile audit & eligibility complete', completed: true },
      { title: '2. Documents Uploaded', desc: 'Uni-assist notarized copies verified', completed: true },
      { title: '3. University Applied', desc: 'Direct application lodged at TUM', completed: true },
      { title: '4. Offer Letter Received', desc: 'Direct Unconditional Admission Letter', completed: true },
      { title: '5. Tuition Paid', desc: 'Semester fee & Expatrio Blocked Account funded', completed: true },
      { title: '6. Visa Submitted', desc: 'Passport lodged at German Embassy Dhaka', completed: true },
      { title: '7. Visa Approved', desc: 'German National Student Visa Issued', completed: true, current: true },
      { title: '8. Departure', desc: 'Munich accommodation & flight ticket confirmed', completed: false },
    ],
    documents: [
      { name: 'H.S.C Board & Marksheet', status: 'Approved', date: '04 Feb 2026' },
      { name: 'IELTS Academic Scorecard (7.5)', status: 'Approved', date: '05 Feb 2026' },
      { name: 'Fintiba / Expatrio Blocked Account Confirmation', status: 'Approved', date: '12 Feb 2026' },
      { name: 'Motivation Letter (SOP)', status: 'Approved', date: '15 Feb 2026' },
    ]
  }
};

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'track' | 'upload' | 'payments' | 'chat' | 'assessments'>('track');
  const [searchId, setSearchId] = useState('VRC-2026-8891');
  const [fileRecord, setFileRecord] = useState<DemoFileStatus | null>(DEMO_RECORDS['VRC-2026-8891']);
  const [searchError, setSearchError] = useState('');

  // AI Assessments state loaded from localStorage
  const [savedAssessments, setSavedAssessments] = useState<AIAssessmentRecord[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vercito_student_assessments');
      if (stored) {
        setSavedAssessments(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    }
  }, [isOpen]);

  // Live Chat State
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {
      id: 'm1',
      sender: 'auto',
      senderName: 'VERCITO AI Counselor',
      text: 'Assalamu Alaikum! Welcome to VERCITO Gulshan & European Admissions desk. How can I assist with your visa dossier today?',
      time: '10:00 AM'
    },
    {
      id: 'm2',
      sender: 'student',
      senderName: 'Tanvir Hossain',
      text: 'Hello, is my Universitaly pre-enrollment summary verified by the embassy counselor?',
      time: '10:02 AM'
    },
    {
      id: 'm3',
      sender: 'counselor',
      senderName: 'Shahriar Kabir (Senior Counselor)',
      text: 'Yes Tanvir! Your Universitaly application for Politecnico di Milano is approved. Next step is scheduling your VFS Dhaka appointment.',
      time: '10:05 AM'
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Payment Submission State
  const [payMethod, setPayMethod] = useState<'bKash' | 'Nagad' | 'Bank Transfer'>('bKash');
  const [payTxnId, setPayTxnId] = useState('');
  const [payAmount, setPayAmount] = useState('15000');
  const [payPurpose, setPayPurpose] = useState('Universitaly Application Fee');
  const [paySubmitted, setPaySubmitted] = useState(false);

  // Upload Form State
  const [uploadData, setUploadData] = useState({
    name: '',
    phone: '',
    email: '',
    targetCountry: 'Italy',
    fileType: 'Academic Transcripts',
    notes: '',
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [newAssignedId, setNewAssignedId] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = searchId.trim().toUpperCase();
    if (DEMO_RECORDS[cleaned]) {
      setFileRecord(DEMO_RECORDS[cleaned]);
      setSearchError('');
    } else {
      setSearchError(
        language === 'bn'
          ? 'কোনো ফাইল রেকর্ড পাওয়া যায়নি। অনুগ্রহ করে VRC-2026-8891 অথবা VRC-2026-5420 দিয়ে চেষ্টা করুন।'
          : 'No file record found for this ID. Try searching with demo ID: VRC-2026-8891 or VRC-2026-5420.'
      );
      setFileRecord(null);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VRC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setNewAssignedId(generatedId);
    setUploadSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0B1F3A] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden text-slate-900 dark:text-slate-100 my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <VercitoLogo variant="horizontal" size="sm" isDarkBg={true} />
            <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold border border-[#D4AF37]/30 hidden sm:inline-block">
              LIVE PORTAL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-1">
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'track'
                ? 'bg-white dark:bg-[#0B1F3A] text-[#0B1F3A] dark:text-[#D4AF37] shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('portal.trackTab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'assessments'
                ? 'bg-white dark:bg-[#0B1F3A] text-[#0B1F3A] dark:text-[#D4AF37] shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>AI Assessments</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-[#0B1F3A] text-[#0B1F3A] dark:text-[#D4AF37] shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t('portal.uploadTab')}</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'payments'
                ? 'bg-white dark:bg-[#0B1F3A] text-[#0B1F3A] dark:text-[#D4AF37] shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Payments</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-white dark:bg-[#0B1F3A] text-[#0B1F3A] dark:text-[#D4AF37] shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Counselor Chat</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'assessments' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-[#D4AF37]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#D4AF37] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>My AI Profile Assessment Reports</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    Saved admission score audits, top 10 matched universities, and action plans.
                  </p>
                </div>
              </div>

              {savedAssessments.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-white/10 space-y-3">
                  <Bot className="w-10 h-10 mx-auto text-[#D4AF37]" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    You have not saved any AI profile assessments yet.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Run the "VERCITO AI Study Specialist" on the homepage to generate and save your report here!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedAssessments.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-5 rounded-2xl bg-slate-900 border border-white/10 text-white space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#D4AF37]">{rec.id}</span>
                          <h5 className="font-bold text-sm text-white">{rec.input.fullName}</h5>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-[#D4AF37]">
                            {rec.result.eligibilityScore}%
                          </span>
                          <span className="block text-[10px] font-semibold text-emerald-400">
                            {rec.result.admissionChance}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div>Target: <strong>{rec.input.preferredCountry} ({rec.input.preferredUniversity})</strong></div>
                        <div>Subject: <strong>{rec.input.intendedSubject}</strong></div>
                        <div>Intake: <strong>{rec.input.preferredIntake}</strong></div>
                        <div>Budget: <strong>{rec.input.estimatedBudget}</strong></div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-xs text-slate-200">
                        <strong className="text-[#D4AF37] block mb-1">Chief Advisor Advice:</strong>
                        <p className="bg-white/5 p-2.5 rounded-xl leading-relaxed">{rec.result.personalizedAdvice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'track' ? (
            <div className="space-y-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder={t('portal.trackPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] transition-transform active:scale-95"
                >
                  {t('portal.trackBtn')}
                </button>
              </form>

              {searchError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {fileRecord && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* File Overview Summary Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37]">
                          {fileRecord.id}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Submitted: {fileRecord.submittedDate}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold mt-1 text-slate-900 dark:text-white">
                        {fileRecord.studentName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{fileRecord.university} ({fileRecord.country})</span>
                        <span className="text-slate-400">•</span>
                        <span>{fileRecord.program}</span>
                      </p>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-white/10 sm:pl-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        File Status
                      </span>
                      <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        Stage {fileRecord.currentStepIndex + 1} of {fileRecord.steps.length}
                      </span>
                    </div>
                  </div>

                  {/* Visual Stepper Timeline */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>Live Visa & Admission Process Steps</span>
                    </h5>

                    <div className="relative space-y-4 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-white/10">
                      {fileRecord.steps.map((st, idx) => (
                        <div key={idx} className="relative flex items-start gap-4 pl-1">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                              st.completed
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                                : st.current
                                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold ring-4 ring-[#D4AF37]/30'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                            }`}
                          >
                            {st.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{idx + 1}</span>}
                          </div>
                          <div>
                            <h6 className={`text-sm font-bold ${st.current ? 'text-[#D4AF37]' : st.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                              {st.title}
                            </h6>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{st.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Audit Checklist */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D4AF37]" />
                      <span>Submitted Document File Status</span>
                    </h5>
                    <div className="divide-y divide-slate-200 dark:divide-white/10">
                      {fileRecord.documents.map((doc, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{doc.name}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              doc.status === 'Approved'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'upload' ? (
            <div className="space-y-6">
              {uploadSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {language === 'bn' ? 'ফাইল সফলভাবে জমা হয়েছে!' : 'File Uploaded Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'আপনার ফাইল রেজিস্টার করা হয়েছে। আমাদের ডকুমেন্ট স্পেশালিস্ট পরবর্তী ১২ ঘন্টার মধ্যে আপনার ফাইলটি যাচাই করবেন।'
                      : 'Your file has been registered. Our document specialist will audit your file within 12 hours.'}
                  </p>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl inline-block border border-slate-200 dark:border-white/10 font-mono text-sm font-bold text-[#D4AF37]">
                    Ref ID: {newAssignedId}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setUploadSuccess(false);
                        setSearchId(newAssignedId);
                        setActiveTab('track');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs shadow-md"
                    >
                      {language === 'bn' ? 'ফাইল ট্র্যাকিংয়ে যান' : 'Go to File Tracking'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#D4AF37]" />
                      <span>{t('portal.uploadTitle')}</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t('portal.uploadDesc')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Student Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="text"
                          value={uploadData.name}
                          onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                          placeholder="e.g. Tanvir Hossain"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Phone Number (WhatsApp) *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="tel"
                          value={uploadData.phone}
                          onChange={(e) => setUploadData({ ...uploadData, phone: e.target.value })}
                          placeholder="+880 1711-000000"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="email"
                          value={uploadData.email}
                          onChange={(e) => setUploadData({ ...uploadData, email: e.target.value })}
                          placeholder="student@gmail.com"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Target Country *</label>
                      <select
                        value={uploadData.targetCountry}
                        onChange={(e) => setUploadData({ ...uploadData, targetCountry: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Italy">Italy (EU)</option>
                        <option value="Germany">Germany (EU)</option>
                        <option value="USA">United States of America</option>
                        <option value="Finland">Finland (EU)</option>
                        <option value="Hungary">Hungary (EU)</option>
                        <option value="France">France (EU)</option>
                        <option value="Poland">Poland (EU)</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload Box */}
                  <div>
                    <label className="block text-xs font-bold mb-1">Upload Document PDF / Zip *</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-2xl p-6 text-center hover:border-[#D4AF37] transition-colors bg-slate-50 dark:bg-slate-900/30 cursor-pointer">
                      <Upload className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Click or drag & drop transcripts, passport or bank statement
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Supported formats: PDF, JPG, PNG (Max 15MB)
                      </p>
                      <input type="file" className="hidden" id="file-upload-input" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit File for Evaluation</span>
                  </button>
                </form>
              )}
            </div>
          ) : activeTab === 'payments' ? (
            /* Payments Tab */
            <div className="space-y-6">
              {paySubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Payment Submission Received</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Transaction ID <strong className="text-[#D4AF37]">{payTxnId}</strong> has been logged. Our finance team will verify with bKash/Bank and update your portal status within 2 hours.
                  </p>
                  <button
                    onClick={() => setPaySubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs"
                  >
                    Submit Another Payment
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPaySubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                      <span>bKash / Nagad / Bank Transfer Submission</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Merchant bKash Number: <strong className="text-[#D4AF37]">01711-889911</strong> (Make Payment option)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Payment Method</label>
                      <select
                        value={payMethod}
                        onChange={(e) => setPayMethod(e.target.value as any)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="bKash">bKash Merchant</option>
                        <option value="Nagad">Nagad Merchant</option>
                        <option value="Bank Transfer">Eastern Bank Ltd (EBL Dhaka)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Transaction ID (TxnID) *</label>
                      <input
                        required
                        type="text"
                        value={payTxnId}
                        onChange={(e) => setPayTxnId(e.target.value)}
                        placeholder="e.g. BK8923419023"
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">Amount Paid (BDT)</label>
                      <input
                        required
                        type="number"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">Payment Purpose</label>
                      <input
                        required
                        type="text"
                        value={payPurpose}
                        onChange={(e) => setPayPurpose(e.target.value)}
                        placeholder="e.g. Pre-enrollment Fee"
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Upload Payment Slip / Screenshot (Optional)</label>
                    <div className="border border-dashed border-slate-300 dark:border-white/20 rounded-xl p-4 text-center bg-slate-50 dark:bg-slate-900/30">
                      <Paperclip className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                      <p className="text-xs text-slate-600 dark:text-slate-300">Click to upload screenshot</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Payment Verification Claim</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Live Chat Tab */
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                  <Bot className="w-4 h-4 text-[#D4AF37]" />
                  <span>VERCITO Gulshan Desk (Active)</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold">
                  Online
                </span>
              </div>

              {/* Chat Log */}
              <div className="h-64 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.senderName} • {msg.time}</span>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'student'
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-semibold rounded-br-none'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newChatText.trim()) return;
                  const studentMsg: ChatMsg = {
                    id: Date.now().toString(),
                    sender: 'student',
                    senderName: 'Tanvir Hossain',
                    text: newChatText,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  setChatMessages([...chatMessages, studentMsg]);
                  setNewChatText('');

                  setTimeout(() => {
                    const replyMsg: ChatMsg = {
                      id: (Date.now() + 1).toString(),
                      sender: 'counselor',
                      senderName: 'Shahriar Kabir (Counselor)',
                      text: 'Thank you for your message! Our Gulshan team has logged your query and will assist you shortly.',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setChatMessages((prev) => [...prev, replyMsg]);
                  }, 1200);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  placeholder="Type message for your European Counselor..."
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
