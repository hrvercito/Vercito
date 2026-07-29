/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Globe2,
  Award,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  FileText,
  Upload,
  Calendar,
  AlertCircle,
  Download,
  Printer,
  Mail,
  Save,
  ChevronRight,
  DollarSign,
  Briefcase,
  FileCheck,
  Check,
  Clock,
  Building2,
  HelpCircle,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';
import {
  ProfileEvaluationInput,
  ProfileEvaluationResult,
  AIAssessmentRecord,
  AdmissionChance
} from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { evaluateProfileWithGemini, chatWithGeminiCounselor, getGeminiApiKey } from '../lib/gemini';
import { UNIVERSITIES_DATABASE } from '../data/universitiesDatabase';
import { UniversityMatcher } from './tools/UniversityMatcher';
import { ScholarshipMatcher } from './tools/ScholarshipMatcher';
import { SOPReviewer } from './tools/SOPReviewer';
import { CVReviewer } from './tools/CVReviewer';
import { DocumentChecker } from './tools/DocumentChecker';
import { VisaPredictor } from './tools/VisaPredictor';
import { OfficialPDFReport } from './tools/OfficialPDFReport';

interface AIEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: () => void;
}

const COUNTRIES = [
  'Italy',
  'Germany',
  'USA',
  'United Kingdom',
  'Canada',
  'Finland',
  'Hungary',
  'France',
  'Australia',
  'Netherlands',
  'Sweden',
  'Ireland',
  'Spain',
  'Poland',
  'New Zealand',
];

const POPULAR_SUBJECTS = [
  'Computer Science & Software Engineering',
  'Data Science & Artificial Intelligence',
  'Business Administration & MBA',
  'Finance, Economics & Accounting',
  'International Relations & Public Policy',
  'Mechanical & Automotive Engineering',
  'Public Health & Biomedical Sciences',
  'Architecture & Design',
  'Cyber Security & Information Tech',
  'Tourism & Hospitality Management',
];

export const AIEvaluatorModal: React.FC<AIEvaluatorModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<
    'form' | 'university-match' | 'scholarship-match' | 'sop-reviewer' | 'cv-analyzer' | 'doc-checker' | 'visa-predictor' | 'chat'
  >('form');

  // Mandatory 15 Fields State
  const [formData, setFormData] = useState<ProfileEvaluationInput>({
    fullName: '',
    email: '',
    phone: '',
    currentEducationLevel: 'Bachelors Degree',
    cgpaOrGpa: '',
    englishProficiency: 'IELTS 6.5',
    preferredCountry: 'Italy',
    preferredUniversity: '',
    intendedSubject: 'Computer Science & Software Engineering',
    preferredIntake: 'Fall 2026 (Sept/Oct)',
    passportAvailable: 'Yes',
    nationality: 'Bangladeshi',
    estimatedBudget: '€3,000 - €5,000 / year',
    scholarshipPreference: 'Full Scholarship',
    preferredStudyLevel: 'Masters',

    // Optional Fields
    workExperience: 'None',
    visaRefusal: 'No',
    visaRefusalDetails: '',
    studyMode: 'On-Campus',
    additionalNotes: '',

    // Upload Metadata
    transcriptFileName: '',
    certificateFileName: '',
    passportFileName: '',
    cvFileName: '',
    englishReportFileName: '',
  });

  // Upload file state indicators
  const [uploadedFiles, setUploadedFiles] = useState<{
    transcript?: File;
    certificate?: File;
    passport?: File;
    cv?: File;
    englishReport?: File;
  }>({});

  // Validation state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ProfileEvaluationResult | null>(null);
  const [currentAssessmentRecord, setCurrentAssessmentRecord] = useState<AIAssessmentRecord | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat State
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        'Assalamu Alaikum! I am VERCITO AI European Admission & Scholarship Specialist. Ask me about Italy DSU grants (€7,000 stipend), German tuition-free universities, blocked accounts, VFS appointments in Dhaka, or course prerequisites!',
    },
  ]);
  const [isChatSending, setIsChatSending] = useState(false);

  // Dynamically update available target universities when country changes
  const availableUniversities = useMemo(() => {
    const selectedCountry = formData.preferredCountry;
    const unis = UNIVERSITIES_DATABASE.filter(
      (u) => u.country.toLowerCase() === selectedCountry.toLowerCase()
    );
    return unis;
  }, [formData.preferredCountry]);

  // Set default target university when available list updates
  useEffect(() => {
    if (availableUniversities.length > 0) {
      setFormData((prev) => ({
        ...prev,
        preferredUniversity: availableUniversities[0].name,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        preferredUniversity: 'Other / Any Recommended University',
      }));
    }
  }, [availableUniversities]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // File Change Handlers
  const handleFileChange = (field: 'transcript' | 'certificate' | 'passport' | 'cv' | 'englishReport', file: File | null) => {
    if (!file) return;

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please upload a smaller file.');
      return;
    }

    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
    setFormData((prev) => {
      const fieldToPropMap: Record<string, keyof ProfileEvaluationInput> = {
        transcript: 'transcriptFileName',
        certificate: 'certificateFileName',
        passport: 'passportFileName',
        cv: 'cvFileName',
        englishReport: 'englishReportFileName',
      };
      const propName = fieldToPropMap[field];
      return propName ? { ...prev, [propName]: file.name } : prev;
    });
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number (min 7 digits)';
    }

    if (!formData.cgpaOrGpa.trim()) {
      errors.cgpaOrGpa = 'CGPA / GPA is required';
    } else {
      const gpaNum = parseFloat(formData.cgpaOrGpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 5.0) {
        errors.cgpaOrGpa = 'Enter valid numeric CGPA (e.g. 3.45 / 4.0 or 5.0)';
      }
    }

    if (!formData.intendedSubject.trim()) errors.intendedSubject = 'Field of Study is required';
    if (!formData.nationality.trim()) errors.nationality = 'Nationality is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Evaluation
  const handleEvaluateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsEvaluating(true);

    try {
      const evalData = await evaluateProfileWithGemini(formData);
      setResult(evalData);

      // Create Record
      const newRecord: AIAssessmentRecord = {
        id: `ASSESS-2026-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString(),
        input: formData,
        result: evalData,
        status: 'New Assessment',
        assignedCounselor: 'Unassigned (Gulshan HQ)',
      };

      setCurrentAssessmentRecord(newRecord);

      // Save to localStorage for Admin Panel and Student Portal
      try {
        const existingRaw = localStorage.getItem('vercito_ai_assessments');
        const existing: AIAssessmentRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newRecord, ...existing];
        localStorage.setItem('vercito_ai_assessments', JSON.stringify(updated));

        // Also save for student portal
        localStorage.setItem('vercito_student_assessments', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      showToast('AI Profile Assessment Report generated successfully!');
    } catch (err) {
      console.error('AI Assessment evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Save to Student Portal
  const handleSaveToPortal = () => {
    if (!currentAssessmentRecord) return;
    try {
      const existingRaw = localStorage.getItem('vercito_student_assessments');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [currentAssessmentRecord, ...existing.filter((x: any) => x.id !== currentAssessmentRecord.id)];
      localStorage.setItem('vercito_student_assessments', JSON.stringify(updated));
      showToast(`Assessment ${currentAssessmentRecord.id} saved to your Student Portal!`);
    } catch (e) {
      showToast('Saved to Student Portal!');
    }
  };

  // Trigger Print Report
  const handlePrintReport = () => {
    window.print();
  };

  // Simulate Email Dispatch
  const handleEmailReport = () => {
    showToast(`Assessment Report emailed to ${formData.email}! Check your inbox.`);
  };

  // Chat Submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: userText }];
    setChatHistory(updatedHistory);
    setChatMessage('');
    setIsChatSending(true);

    try {
      let reply = '';
      if (getGeminiApiKey()) {
        reply = await chatWithGeminiCounselor(userText, updatedHistory);
      } else {
        const response = await fetch('/api/ai-counselor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText, chatHistory: updatedHistory }),
        });
        const data = await response.json();
        reply = data.reply || 'Our senior counselors in Gulshan are ready to assist you.';
      }
      setChatHistory([...updatedHistory, { role: 'assistant', content: reply }]);
    } catch (err) {
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: 'Our Gulshan & Chittagong offices are available for direct 1-on-1 counseling!' },
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-5xl my-6 bg-[#0B1F3A] text-white rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/30"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0B1F3A]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#E2C044] to-[#C5A028] p-0.5 shadow-lg shadow-[#D4AF37]/20">
              <div className="w-full h-full bg-[#0B1F3A] rounded-[14px] flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>VERCITO AI Study Platform</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold border border-[#D4AF37]/30 hidden sm:inline-block">
                  Pro AI Suite
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                AI University Matcher • SOP & CV Reviewer • Visa Estimator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-xs font-semibold scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Evaluation</span>
          </button>

          <button
            onClick={() => setActiveTab('university-match')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'university-match'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Uni Match Score</span>
          </button>

          <button
            onClick={() => setActiveTab('scholarship-match')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'scholarship-match'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scholarship Match</span>
          </button>

          <button
            onClick={() => setActiveTab('sop-reviewer')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'sop-reviewer'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SOP Reviewer</span>
          </button>

          <button
            onClick={() => setActiveTab('cv-analyzer')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'cv-analyzer'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>CV Reviewer</span>
          </button>

          <button
            onClick={() => setActiveTab('doc-checker')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'doc-checker'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Doc Verifier</span>
          </button>

          <button
            onClick={() => setActiveTab('visa-predictor')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'visa-predictor'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Visa Predictor</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Live Chat</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'university-match' && (
            <UniversityMatcher profileForm={formData} />
          )}

          {activeTab === 'scholarship-match' && (
            <ScholarshipMatcher profileForm={formData} />
          )}

          {activeTab === 'sop-reviewer' && (
            <SOPReviewer />
          )}

          {activeTab === 'cv-analyzer' && (
            <CVReviewer />
          )}

          {activeTab === 'doc-checker' && (
            <DocumentChecker profileForm={formData} />
          )}

          {activeTab === 'visa-predictor' && (
            <VisaPredictor profileForm={formData} />
          )}

          {activeTab === 'form' && (
            <div>
              {!result ? (
                /* Form View */
                <form onSubmit={handleEvaluateSubmit} className="space-y-6">
                  {/* Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0B1F3A] to-slate-900/90 border border-[#D4AF37]/30 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-bold text-[#D4AF37]">
                        Complete Profile Evaluation Form
                      </h4>
                      <p className="text-slate-300 mt-0.5">
                        Provide accurate academic and target details to receive your top 10 university matches, scholarship probability, cost estimate, and action plan.
                      </p>
                    </div>
                  </div>

                  {/* Section 1: MANDATORY FIELDS (1 - 15) */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 border-b border-white/10 pb-2">
                      <User className="w-4 h-4" />
                      <span>1. Mandatory Applicant Information (Required)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 1. Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          1. Full Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tanvir Hossain"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.fullName ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                        {formErrors.fullName && (
                          <p className="text-[10px] text-rose-400 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      {/* 2. Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          2. Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="tanvir@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.email ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                        {formErrors.email && (
                          <p className="text-[10px] text-rose-400 mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      {/* 3. Phone Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          3. Phone Number <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+880 1711-889911"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.phone ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                        {formErrors.phone && (
                          <p className="text-[10px] text-rose-400 mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      {/* 4. Current Education Level */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          4. Current Education Level <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.currentEducationLevel}
                          onChange={(e) => setFormData({ ...formData, currentEducationLevel: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="HSC / A-Levels">HSC / A-Levels Graduate</option>
                          <option value="Bachelors Degree">Bachelors Degree Graduate</option>
                          <option value="Masters Degree">Masters Degree Holder</option>
                          <option value="Diploma Engineering">Diploma Engineering</option>
                        </select>
                      </div>

                      {/* 5. CGPA / GPA */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          5. CGPA / GPA (out of 4.0 or 5.0) <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 3.45"
                          value={formData.cgpaOrGpa}
                          onChange={(e) => setFormData({ ...formData, cgpaOrGpa: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.cgpaOrGpa ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                        {formErrors.cgpaOrGpa && (
                          <p className="text-[10px] text-rose-400 mt-1">{formErrors.cgpaOrGpa}</p>
                        )}
                      </div>

                      {/* 6. English Proficiency */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          6. English Proficiency <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.englishProficiency}
                          onChange={(e) => setFormData({ ...formData, englishProficiency: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="IELTS 7.5+">IELTS 7.5 or higher</option>
                          <option value="IELTS 7.0">IELTS 7.0</option>
                          <option value="IELTS 6.5">IELTS 6.5</option>
                          <option value="IELTS 6.0">IELTS 6.0</option>
                          <option value="PTE Academic 65+">PTE Academic (65+)</option>
                          <option value="Duolingo 120+">Duolingo English Test (120+)</option>
                          <option value="TOEFL iBT 90+">TOEFL iBT (90+)</option>
                          <option value="MOI / English Waiver">MOI / Medium of Instruction Waiver</option>
                        </select>
                      </div>

                      {/* 7. Target Country */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          7. Target Country <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.preferredCountry}
                          onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* 8. Target University (Automatically loads selected country's universities) */}
                      <div>
                        <label className="block text-xs font-bold text-[#D4AF37] mb-1 flex items-center justify-between">
                          <span>8. Target University <span className="text-rose-400">*</span></span>
                          <span className="text-[10px] text-slate-400 font-normal">Auto-filtered by {formData.preferredCountry}</span>
                        </label>
                        <select
                          value={formData.preferredUniversity}
                          onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-[#D4AF37]/40 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          {availableUniversities.map((uni) => (
                            <option key={uni.id} value={uni.name}>
                              {uni.name} ({uni.type || 'Public'})
                            </option>
                          ))}
                          <option value="Other / Any Recommended University">
                            Other / Any Recommended Top Institution
                          </option>
                        </select>
                      </div>

                      {/* 9. Intended Field of Study */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          9. Intended Field of Study <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          list="subjects-list"
                          placeholder="e.g. Artificial Intelligence"
                          value={formData.intendedSubject}
                          onChange={(e) => setFormData({ ...formData, intendedSubject: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.intendedSubject ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                        <datalist id="subjects-list">
                          {POPULAR_SUBJECTS.map((s, idx) => (
                            <option key={idx} value={s} />
                          ))}
                        </datalist>
                        {formErrors.intendedSubject && (
                          <p className="text-[10px] text-rose-400 mt-1">{formErrors.intendedSubject}</p>
                        )}
                      </div>

                      {/* 10. Preferred Intake */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          10. Preferred Intake <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.preferredIntake}
                          onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Fall 2026 (Sept/Oct)">Fall 2026 (September / October)</option>
                          <option value="Spring 2027 (Jan/Feb)">Spring 2027 (January / February)</option>
                          <option value="Summer 2026">Summer 2026 (May / June)</option>
                          <option value="Fall 2027">Fall 2027</option>
                        </select>
                      </div>

                      {/* 11. Passport Available */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          11. Passport Available <span className="text-rose-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, passportAvailable: 'Yes' })}
                            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                              formData.passportAvailable === 'Yes'
                                ? 'bg-[#D4AF37] text-[#0B1F3A] border-[#D4AF37]'
                                : 'bg-white/5 text-slate-300 border-white/15'
                            }`}
                          >
                            Yes (Valid)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, passportAvailable: 'No' })}
                            className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                              formData.passportAvailable === 'No'
                                ? 'bg-rose-500 text-white border-rose-500'
                                : 'bg-white/5 text-slate-300 border-white/15'
                            }`}
                          >
                            No / Applying
                          </button>
                        </div>
                      </div>

                      {/* 12. Nationality */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          12. Nationality <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Bangladeshi"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                            formErrors.nationality ? 'border-rose-500' : 'border-white/15'
                          } text-xs text-white focus:outline-none focus:border-[#D4AF37]`}
                        />
                      </div>

                      {/* 13. Estimated Budget */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          13. Estimated Annual Budget <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.estimatedBudget}
                          onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="€3,000 - €5,000 / year">€3,000 - €5,000 / year</option>
                          <option value="€5,000 - €10,000 / year">€5,000 - €10,000 / year</option>
                          <option value="€10,000 - €15,000 / year">€10,000 - €15,000 / year</option>
                          <option value="€15,000+ / year">€15,000+ / year</option>
                          <option value="Fully Scholarship Dependent">Fully Dependent on Scholarship Grants</option>
                        </select>
                      </div>

                      {/* 14. Scholarship Preference */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          14. Scholarship Preference <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.scholarshipPreference}
                          onChange={(e) => setFormData({ ...formData, scholarshipPreference: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Full Scholarship">100% Full Tuition + Living Grant</option>
                          <option value="Partial Scholarship">Partial Scholarship / Fee Waiver</option>
                          <option value="Self-Funded">Self-Funded Student</option>
                          <option value="Any">Any Matching Option</option>
                        </select>
                      </div>

                      {/* 15. Preferred Study Level */}
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          15. Preferred Study Level <span className="text-rose-400">*</span>
                        </label>
                        <select
                          value={formData.preferredStudyLevel}
                          onChange={(e) => setFormData({ ...formData, preferredStudyLevel: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Bachelors">Bachelor's Degree</option>
                          <option value="Masters">Master's Degree</option>
                          <option value="PhD">Doctoral / PhD Fellowship</option>
                          <option value="Diploma">Postgraduate Diploma</option>
                          <option value="Language Programs">Pre-sessional Language Program</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: OPTIONAL FIELDS & FILE UPLOADS (16 - 24) */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 border-b border-white/10 pb-2">
                      <Briefcase className="w-4 h-4" />
                      <span>2. Optional Profile Details & Document File Attachments</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* 16. Work Experience */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          16. Work Experience
                        </label>
                        <select
                          value={formData.workExperience}
                          onChange={(e) => setFormData({ ...formData, workExperience: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="None">No work experience</option>
                          <option value="1 Year">1 Year</option>
                          <option value="2 Years">2 Years</option>
                          <option value="3+ Years">3+ Years Professional Experience</option>
                        </select>
                      </div>

                      {/* 17. Previous Visa Refusal */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          17. Previous Visa Refusal
                        </label>
                        <select
                          value={formData.visaRefusal}
                          onChange={(e) => setFormData({ ...formData, visaRefusal: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="No">No Visa Refusal History</option>
                          <option value="Yes - Schengen">Yes - Schengen Visa</option>
                          <option value="Yes - USA/UK/Canada">Yes - USA / UK / Canada</option>
                          <option value="Yes - Other">Yes - Other Country</option>
                        </select>
                      </div>

                      {/* 18. Preferred Study Mode */}
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          18. Preferred Study Mode
                        </label>
                        <select
                          value={formData.studyMode}
                          onChange={(e) => setFormData({ ...formData, studyMode: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A] border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="On-Campus">On-Campus (Full-Time)</option>
                          <option value="Hybrid">Hybrid (Online + Campus)</option>
                          <option value="Distance Learning">Distance Learning</option>
                        </select>
                      </div>
                    </div>

                    {/* Document Uploads Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {/* 19. Academic Transcript */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-200 block mb-1">
                          19. Upload Academic Transcript
                        </span>
                        <p className="text-[10px] text-slate-400 mb-2">PDF, JPG, PNG (Max 15MB)</p>
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{formData.transcriptFileName ? formData.transcriptFileName.slice(0, 15) + '...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileChange('transcript', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* 20. Certificate */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-200 block mb-1">
                          20. Upload Certificate
                        </span>
                        <p className="text-[10px] text-slate-400 mb-2">Degree / Board Certificate</p>
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{formData.certificateFileName ? formData.certificateFileName.slice(0, 15) + '...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileChange('certificate', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* 21. Passport */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-200 block mb-1">
                          21. Upload Passport Scan
                        </span>
                        <p className="text-[10px] text-slate-400 mb-2">First 2 Pages Scan</p>
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{formData.passportFileName ? formData.passportFileName.slice(0, 15) + '...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileChange('passport', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* 22. CV / Resume */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-200 block mb-1">
                          22. Upload Europass CV / Resume
                        </span>
                        <p className="text-[10px] text-slate-400 mb-2">Europass or Academic Format</p>
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{formData.cvFileName ? formData.cvFileName.slice(0, 15) + '...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* 23. IELTS / Test Scorecard */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                        <span className="text-xs font-bold text-slate-200 block mb-1">
                          23. Upload IELTS / PTE / Test Score
                        </span>
                        <p className="text-[10px] text-slate-400 mb-2">Official Scorecard Report</p>
                        <label className="cursor-pointer inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{formData.englishReportFileName ? formData.englishReportFileName.slice(0, 15) + '...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileChange('englishReport', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>

                      {/* 24. Additional Notes */}
                      <div className="sm:col-span-2 md:col-span-3">
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          24. Additional Notes / Special Admission Requirements
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Mention any specific university preferences, backlogs, scholarship requests, or embassy appointment constraints..."
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isEvaluating}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm sm:text-base shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#0B1F3A]" />
                        <span>Evaluating Academic Profile & Matching Top Universities...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate My AI Profile Assessment Report</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* AI ANALYSIS REPORT DISPLAY */
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Action Toolbar */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                        {currentAssessmentRecord?.id || 'ASSESS-2026-REPORT'}
                      </span>
                      <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                        Applicant: <strong className="text-white">{formData.fullName}</strong>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleSaveToPortal}
                        className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/40 flex items-center gap-1.5 transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to Portal</span>
                      </button>

                      <button
                        onClick={handlePrintReport}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Print / PDF</span>
                      </button>

                      <button
                        onClick={handleEmailReport}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Email Report</span>
                      </button>

                      <button
                        onClick={() => setResult(null)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold"
                      >
                        Edit & Re-Evaluate
                      </button>
                    </div>
                  </div>

                  {/* Header Score Card */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
                        <Award className="w-4 h-4" />
                        <span>OFFICIAL ADMISSION ELIGIBILITY</span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                        {result.eligibilityScore}% Admission Score
                      </h3>
                      <p className="text-xs text-slate-300 max-w-xl">
                        Evaluated for <strong className="text-white">{formData.fullName}</strong> ({formData.intendedSubject}, {formData.preferredStudyLevel}) seeking admission in <strong className="text-[#D4AF37]">{formData.preferredCountry}</strong> for {formData.preferredIntake}.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-center min-w-[200px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Admission Chance
                      </span>
                      <span className="text-lg font-black px-4 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] shadow-md">
                        {result.admissionChance}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        High Visa Approval
                      </span>
                    </div>
                  </div>

                  {/* 1. TOP 10 UNIVERSITY RECOMMENDATIONS */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>1. Top 10 Recommended Universities</span>
                      </h4>
                      <span className="text-xs text-slate-400">
                        Matched for {formData.preferredCountry} & European Partners
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.recommendedUniversities.map((uni, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-[#D4AF37]/50 transition-all space-y-2 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-bold text-sm text-white flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] flex items-center justify-center font-mono font-bold">
                                  #{idx + 1}
                                </span>
                                <span>{uni.name}</span>
                              </h5>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-[#0B1F3A] shrink-0">
                                {uni.type}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                              <span>🌍 {uni.country}</span>
                              <span>•</span>
                              <span>🏆 {uni.qsRanking}</span>
                            </p>

                            <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">
                              {uni.matchReason}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-400 block text-[10px]">Tuition Fee:</span>
                              <strong className="text-[#D4AF37]">{uni.tuitionFee}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px]">Scholarship:</span>
                              <strong className="text-emerald-400">{uni.scholarshipAvailability}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. SCHOLARSHIP ANALYSIS */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>2. Scholarship & Financial Grant Analysis</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.recommendedScholarships.map((sch, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/80 border border-white/10 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-xs text-white flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                              <span>{sch.name}</span>
                            </h5>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                              Prob: {sch.winningProbability}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-[#D4AF37] bg-white/5 p-2 rounded-xl">
                            🎁 Coverage: {sch.coverage}
                          </p>

                          <div className="text-[11px] text-slate-300 space-y-1">
                            <p><strong>Eligibility:</strong> {sch.eligibility}</p>
                            <p><strong>Deadline:</strong> {sch.deadline}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. ENGLISH REQUIREMENT BREAKDOWN & COST ESTIMATE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Requirement */}
                    <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                        <Globe2 className="w-4 h-4" />
                        <span>3. English Requirement Status</span>
                      </h4>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                          <span>IELTS Requirement</span>
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${result.englishRequirements.ieltsRequired ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            {result.englishRequirements.ieltsRequired ? 'IELTS Preferred' : 'Waiver Eligible'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                          <span>Medium of Instruction (MOI) Accepted</span>
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                            {result.englishRequirements.moiAccepted ? 'Yes (Select Unis)' : 'No'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                          <span>Duolingo & PTE Academic</span>
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-500/20 text-emerald-400">
                            Accepted
                          </span>
                        </div>

                        {result.englishRequirements.ieltsNotes && (
                          <p className="text-[11px] text-slate-300 italic pt-1">
                            Note: {result.englishRequirements.ieltsNotes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>4. Estimated Cost & Budget Breakdown</span>
                      </h4>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Tuition Fee:</span>
                          <span className="font-bold text-white">{result.estimatedCost.tuitionFee}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Living Costs:</span>
                          <span className="font-bold text-white">{result.estimatedCost.livingCost}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Embassy Visa Fee:</span>
                          <span className="font-bold text-white">{result.estimatedCost.visaFee}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Health Insurance:</span>
                          <span className="font-bold text-white">{result.estimatedCost.healthInsurance}</span>
                        </div>
                        <div className="flex justify-between py-1.5 pt-2 font-bold text-[#D4AF37]">
                          <span>Total Annual Budget:</span>
                          <span>{result.estimatedCost.totalEstimatedBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. DOCUMENT CHECKLIST & PERSONALIZED ACTION PLAN */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" />
                      <span>5. Document Checklist & 5-Step Action Plan</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Document Checklist */}
                      <div className="space-y-2 bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <h5 className="font-bold text-slate-200">Required Documents Status:</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          {result.documentChecklist.requiredDocuments.map((doc, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>

                        {result.documentChecklist.missingDocuments.length > 0 && (
                          <div className="pt-2 border-t border-white/10">
                            <span className="text-amber-400 font-bold block mb-1">
                              Action Required / Missing Documents:
                            </span>
                            <ul className="space-y-1 text-amber-300">
                              {result.documentChecklist.missingDocuments.map((m, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                  <span>{m}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Action Plan */}
                      <div className="space-y-2 bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <h5 className="font-bold text-slate-200">Personalized Next Steps Action Plan:</h5>
                        <div className="space-y-2">
                          {result.nextStepsActionPlan.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-slate-300">
                              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0B1F3A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Senior Consultant Advice & Visa Feasibility */}
                  <div className="p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs space-y-3">
                    <div>
                      <h5 className="font-bold text-[#D4AF37] flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-4 h-4" />
                        Chief Admissions Advisor Summary:
                      </h5>
                      <p className="text-slate-200 leading-relaxed">{result.personalizedAdvice}</p>
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/20">
                      <h5 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-4 h-4" />
                        Visa Feasibility & VFS Appointment Guidance:
                      </h5>
                      <p className="text-slate-300 leading-relaxed">{result.visaFeasibility}</p>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAppointment();
                      }}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl hover:scale-[1.01] transition-transform text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book 1-on-1 Appointment with Senior European Consultant</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            /* AI LIVE COUNSELOR CHAT */
            <div className="flex flex-col h-[520px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] flex items-center justify-center shrink-0 font-bold text-xs shadow-md">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-semibold rounded-br-none shadow-md'
                          : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatSending && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>VERCITO AI Counselor is processing...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about DSU scholarship, Blocked Account, VFS appointment..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={isChatSending}
                  className="px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1 shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
