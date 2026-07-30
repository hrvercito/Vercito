/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Send,
  X,
  CheckCircle2,
  Upload,
  Sparkles,
  Building2,
  GraduationCap,
  Calendar,
  DollarSign,
  FileText,
  User,
  BookOpen,
  Award,
  Globe,
  ArrowRight,
  ArrowLeft,
  Printer,
  Download,
  Home,
  Search,
  Check,
  AlertCircle,
  RefreshCw,
  Clock,
  ShieldCheck,
  Lock,
  Eye,
  LogOut,
  UserCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { UNIVERSITIES_DATABASE } from '../data/universitiesDatabase';
import { UniversityPartner, ApplicationRecord } from '../types';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

interface OnlineApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountry?: string;
  initialUniversity?: string;
  onOpenStudentPortal?: () => void;
  onOpenTrackerWithId?: (appId: string) => void;
}

export const OnlineApplicationModal: React.FC<OnlineApplicationModalProps> = ({
  isOpen,
  onClose,
  initialCountry = 'USA',
  initialUniversity = 'Harvard University',
  onOpenStudentPortal,
  onOpenTrackerWithId,
}) => {
  const { currentUser, isLoggedIn, login, register, switchUser, allStudents } = useAuth();
  const {
    startNewApplicationSession,
    checkSavedDraftForUni,
    saveApplicationDraft,
    submitApplicationRecord,
    getApplicationWithPrivacyCheck,
  } = useApplication();

  // Find initial matching university from database
  const matchingUni = useMemo(() => {
    if (initialUniversity) {
      const found = UNIVERSITIES_DATABASE.find(
        (u) => u.name.toLowerCase().includes(initialUniversity.toLowerCase()) || u.id === initialUniversity
      );
      if (found) return found;
    }
    if (initialCountry) {
      const foundCountry = UNIVERSITIES_DATABASE.find(
        (u) => u.country.toLowerCase() === initialCountry.toLowerCase()
      );
      if (foundCountry) return foundCountry;
    }
    return UNIVERSITIES_DATABASE[0];
  }, [initialUniversity, initialCountry]);

  // Session state
  const [appData, setAppData] = useState<ApplicationRecord | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showDraftPrompt, setShowDraftPrompt] = useState<boolean>(false);
  const [existingDraft, setExistingDraft] = useState<ApplicationRecord | null>(null);

  // University switch selector modal
  const [showUniChangeModal, setShowUniChangeModal] = useState<boolean>(false);
  const [uniSearchQuery, setUniSearchQuery] = useState<string>('');
  const [uniCountryFilter, setUniCountryFilter] = useState<string>('All');

  // Submission & Validation
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const [accessDeniedError, setAccessDeniedError] = useState<string>('');

  // Quick Login / Register Inline state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');

  // Initialize Application Session when modal opens or initial University changes
  useEffect(() => {
    if (isOpen && matchingUni) {
      // Check if unfinished draft exists for this university & current user
      const draft = checkSavedDraftForUni(matchingUni.id);
      if (draft) {
        setExistingDraft(draft);
        setShowDraftPrompt(true);
      } else {
        // Automatically start new application session
        const freshApp = startNewApplicationSession(matchingUni);
        setAppData(freshApp);
        setShowDraftPrompt(false);
        setIsSubmitted(false);
        setCurrentStep(1);
      }
    }
  }, [isOpen, matchingUni]);

  // Handle starting brand new app
  const handleStartNewSession = () => {
    if (matchingUni) {
      const freshApp = startNewApplicationSession(matchingUni);
      setAppData(freshApp);
      setShowDraftPrompt(false);
      setIsSubmitted(false);
      setCurrentStep(1);
    }
  };

  // Handle loading saved draft
  const handleContinueSavedDraft = () => {
    if (existingDraft) {
      setAppData(existingDraft);
      setShowDraftPrompt(false);
      setIsSubmitted(false);
      setCurrentStep(1);
    }
  };

  // Handle University Switch
  const selectUniversityFromList = (uni: UniversityPartner) => {
    // Starting a new session for newly selected university
    const freshApp = startNewApplicationSession(uni);
    setAppData(freshApp);
    setShowUniChangeModal(false);
    setShowDraftPrompt(false);
    setCurrentStep(1);
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    setValidationError('');
    if (!appData) return false;

    if (step === 2) {
      if (!appData.fullName.trim()) {
        setValidationError('Please enter applicant full name.');
        return false;
      }
      if (!appData.studentEmail.trim() || !appData.studentEmail.includes('@')) {
        setValidationError('Please enter a valid email address.');
        return false;
      }
      if (!appData.studentPhone.trim()) {
        setValidationError('Please enter phone / WhatsApp number.');
        return false;
      }
    } else if (step === 3) {
      if (!appData.institutionName.trim()) {
        setValidationError('Please enter your previous institution name.');
        return false;
      }
      if (!appData.cgpa.trim()) {
        setValidationError('Please enter your CGPA / Result.');
        return false;
      }
    } else if (step === 4) {
      if (!appData.englishScore.trim()) {
        setValidationError('Please enter your English proficiency score / details.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (appData) saveApplicationDraft(appData);
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setValidationError('');
    if (appData) saveApplicationDraft(appData);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Final Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appData) return;

    if (!validateStep(2) || !validateStep(3) || !validateStep(4)) {
      return;
    }

    const submittedRecord = submitApplicationRecord(appData);
    setAppData(submittedRecord);
    setIsSubmitted(true);

    // Confetti
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#0B1F3A', '#10B981'],
    });
  };

  // PDF Generator Function with strict owner verification
  const handleDownloadPDF = () => {
    if (!appData) return;

    // Strict Privacy Verification Check
    const activeUserId = currentUser?.id || 'GUEST';
    const privacyCheck = getApplicationWithPrivacyCheck(appData.id, activeUserId);

    if (!privacyCheck.success) {
      setAccessDeniedError(privacyCheck.error || 'Access Denied: You do not own this application dossier.');
      return;
    }

    try {
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

      // Navy background header box
      doc.setFillColor(11, 31, 58);
      doc.rect(14, 12, 182, 22, 'F');

      // Gold accent line
      doc.setFillColor(212, 175, 55);
      doc.rect(14, 34, 182, 1.5, 'F');

      // Header Title
      doc.setTextColor(212, 175, 55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('VERCITO HIGHER EDUCATION', 18, 21);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('SHAPING FUTURES BEYOND BORDERS', 18, 27);

      doc.setFontSize(7);
      doc.text('Head Office: Gulshan-2, Dhaka | Hotline: +880 1800 000000 | www.vercito.com', 190, 27, {
        align: 'right',
      });

      // Document Title
      doc.setTextColor(11, 31, 58);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('STUDENT UNIVERSITY APPLICATION FORM', 105, 43, { align: 'center' });

      // Meta Bar
      doc.setFillColor(241, 245, 249);
      doc.rect(14, 47, 182, 9, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, 47, 182, 9, 'S');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`APPLICATION ID: ${appData.id}`, 18, 53);
      doc.text(`SUBMISSION DATE: ${appData.submissionDate}`, 95, 53);
      doc.setTextColor(16, 185, 129);
      doc.text(`STATUS: ${appData.status}`, 150, 53);

      const drawSectionHeader = (y: number, title: string) => {
        doc.setFillColor(11, 31, 58);
        doc.rect(14, y, 182, 6, 'F');
        doc.setTextColor(212, 175, 55);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 18, y + 4.2);
      };

      const drawRow = (y: number, label1: string, val1: string, label2: string, val2: string) => {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text(label1, 18, y);
        doc.text(label2, 110, y);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        doc.text(val1 || 'N/A', 50, y);
        doc.text(val2 || 'N/A', 142, y);
      };

      // Section 1
      drawSectionHeader(60, '1. APPLICANT PERSONAL INFORMATION');
      drawRow(71, 'Full Name:', appData.fullName, 'Date of Birth:', appData.dateOfBirth);
      drawRow(77, 'Nationality:', appData.nationality, 'Phone / WhatsApp:', appData.studentPhone);
      drawRow(83, 'Email Address:', appData.studentEmail, 'District / Address:', `${appData.studentDistrict}, ${appData.fullAddress}`);

      // Section 2
      drawSectionHeader(90, '2. TARGET UNIVERSITY & PROGRAMME DETAILS');
      drawRow(101, 'University Name:', appData.universityName, 'Country / City:', `${appData.country}, ${appData.city}`);
      drawRow(107, 'Selected Course:', appData.selectedCourse, 'Degree Level:', appData.degreeLevel);
      drawRow(113, 'Intake Season:', appData.intake, 'Tuition Fee / Year:', `€${appData.tuitionFeeEUR.toLocaleString()}`);
      drawRow(119, 'Application Fee:', `€${appData.applicationFeeEUR}`, 'Application Deadline:', appData.applicationDeadline);

      // Section 3
      drawSectionHeader(126, '3. ACADEMIC QUALIFICATIONS');
      drawRow(137, 'Previous Degree:', appData.previousEducation, 'Institution Name:', appData.institutionName);
      drawRow(143, 'Subject / Major:', appData.academicSubject, 'CGPA / Result:', appData.cgpa);
      drawRow(149, 'Graduation Year:', appData.graduationYear, 'Status:', 'Verified Academic Credentials');

      // Section 4
      drawSectionHeader(156, '4. ENGLISH LANGUAGE PROFICIENCY');
      drawRow(167, 'Test Type:', appData.englishTestType, 'Overall Score / Band:', appData.englishScore);
      drawRow(173, 'Test / MOI Date:', appData.testDate, 'Verification Status:', 'Result Verification Pending');

      // Section 5
      drawSectionHeader(180, '5. UPLOADED DOCUMENTS CHECKLIST');
      const docsList = [
        { name: '1. Passport Copy', status: appData.documents.passport?.status || 'Provided' },
        { name: '2. Academic Certificates', status: appData.documents.certificates?.status || 'Provided' },
        { name: '3. Academic Transcripts', status: appData.documents.transcripts?.status || 'Provided' },
        { name: '4. English Test Result / MOI', status: appData.documents.englishTest?.status || 'Provided' },
        { name: '5. Curriculum Vitae (CV)', status: appData.documents.cv?.status || 'Provided' },
        { name: '6. Personal Statement (SOP)', status: appData.documents.sop?.status || 'Provided' },
      ];

      docsList.forEach((docItem, idx) => {
        const col = idx % 2 === 0 ? 18 : 110;
        const rowY = 191 + Math.floor(idx / 2) * 5.5;
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text(docItem.name, col, rowY);

        if (docItem.status === 'Provided' || docItem.status === 'Approved') {
          doc.setTextColor(16, 185, 129);
          doc.text('[✓ Provided]', col + 52, rowY);
        } else {
          doc.setTextColor(239, 68, 68);
          doc.text('[✗ Not Provided]', col + 52, rowY);
        }
      });

      // Section 6
      drawSectionHeader(211, '6. APPLICANT DECLARATION & SIGNATURES');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(51, 65, 85);
      doc.text(
        'I confirm that the information provided in this application is accurate and complete to the best of my knowledge.',
        18,
        221
      );

      doc.setDrawColor(148, 163, 184);
      doc.line(18, 237, 75, 237);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`Student Signature: ${appData.fullName}`, 18, 241);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${appData.submissionDate}`, 18, 245);

      // Office Box
      doc.setDrawColor(212, 175, 55);
      doc.setFillColor(254, 252, 232);
      doc.rect(95, 222, 101, 26, 'FD');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(11, 31, 58);
      doc.text('FOR VERCITO OFFICE USE ONLY', 98, 227);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Counsellor Name: Head Office Admissions Desk', 98, 232);
      doc.text('Review Status: Credentials Verified & Forwarded', 98, 236);
      doc.text('Internal Notes: Priority European Dossier', 98, 240);

      doc.setDrawColor(148, 163, 184);
      doc.rect(162, 225, 30, 20, 'S');
      doc.setFontSize(6);
      doc.setTextColor(148, 163, 184);
      doc.text('OFFICIAL STAMP', 177, 236, { align: 'center' });

      // Footer
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 275, 196, 275);
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`VERCITO Global Education Portal | Ref: ${appData.id}`, 18, 280);
      doc.text('Page 1 of 1', 105, 280, { align: 'center' });
      doc.text('Confidential — Personal application information handled securely', 194, 280, { align: 'right' });

      const safeName = appData.fullName.trim().replace(/\s+/g, '_') || 'Applicant';
      doc.save(`VERCITO_Application_${appData.id}_${safeName}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not generate PDF. Please try again or use Direct Print Application.');
    }
  };

  // Direct Print Handler
  const handlePrint = () => {
    if (!appData) return;
    const activeUserId = currentUser?.id || 'GUEST';
    const privacyCheck = getApplicationWithPrivacyCheck(appData.id, activeUserId);

    if (!privacyCheck.success) {
      setAccessDeniedError(privacyCheck.error || 'Access Denied: You do not own this application dossier.');
      return;
    }

    window.print();
  };

  // Filtered universities for Change University modal
  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES_DATABASE.filter((u) => {
      const matchesSearch =
        !uniSearchQuery ||
        u.name.toLowerCase().includes(uniSearchQuery.toLowerCase()) ||
        u.city.toLowerCase().includes(uniSearchQuery.toLowerCase()) ||
        u.country.toLowerCase().includes(uniSearchQuery.toLowerCase());
      const matchesCountry = uniCountryFilter === 'All' || u.country === uniCountryFilter;
      return matchesSearch && matchesCountry;
    });
  }, [uniSearchQuery, uniCountryFilter]);

  const allCountriesList = useMemo(() => {
    const set = new Set<string>();
    UNIVERSITIES_DATABASE.forEach((u) => set.add(u.country));
    return ['All', ...Array.from(set).sort()];
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="w-full max-w-4xl bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl relative my-auto max-h-[94vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    VERCITO ADMISSION PORTAL
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Official Application
                  </span>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {isSubmitted ? 'Application Summary Dossier' : 'University Direct Application Portal'}
                </h2>
              </div>
            </div>

            {/* Account Info Pill & Close */}
            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-slate-200">
                  <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-bold truncate max-w-[120px]">{currentUser.fullName}</span>
                  <span className="text-[10px] text-[#D4AF37]">({currentUser.id})</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy Access Denied Error View */}
          {accessDeniedError ? (
            <div className="p-8 text-center space-y-4 my-auto">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-red-500">Access Denied</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {accessDeniedError}
              </p>
              <button
                onClick={() => setAccessDeniedError('')}
                className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs"
              >
                Return to Application
              </button>
            </div>
          ) : showDraftPrompt ? (
            /* SAVED DRAFT VS NEW APPLICATION CHOICE PROMPT */
            <div className="p-8 text-center space-y-6 my-auto max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/30">
                <Clock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#D4AF37]">
                  UNFINISHED APPLICATION FOUND
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                  {matchingUni?.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  You have a saved unfinished draft for this university. Would you like to continue your saved application draft or start a brand new independent application?
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left text-xs space-y-1">
                <p className="font-bold text-[#0B1F3A] dark:text-white">Draft Application ID: {existingDraft?.id}</p>
                <p className="text-slate-500">Last updated: {existingDraft?.lastUpdated}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleContinueSavedDraft}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Continue Saved Application
                </button>
                <button
                  onClick={handleStartNewSession}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#0B1F3A] dark:bg-white/10 text-white font-extrabold text-xs border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                >
                  Start New Application
                </button>
              </div>
            </div>
          ) : !isSubmitted && appData ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Stepper Progress Bar */}
              <div className="bg-slate-50 dark:bg-white/5 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  {[
                    { step: 1, label: 'University', icon: Building2 },
                    { step: 2, label: 'Student Info', icon: User },
                    { step: 3, label: 'Academics', icon: GraduationCap },
                    { step: 4, label: 'English', icon: Globe },
                    { step: 5, label: 'Documents', icon: FileText },
                    { step: 6, label: 'Review', icon: CheckCircle2 },
                  ].map((s) => {
                    const Icon = s.icon;
                    const isActive = currentStep === s.step;
                    const isCompleted = currentStep > s.step;

                    return (
                      <button
                        key={s.step}
                        onClick={() => {
                          if (s.step < currentStep || validateStep(currentStep)) {
                            setCurrentStep(s.step);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md font-extrabold'
                            : isCompleted
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-white'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">
                          {s.step}. {s.label}
                        </span>
                        <span className="sm:hidden">{s.step}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Validation Alert */}
              {validationError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* STEP 1: AUTOMATIC UNIVERSITY INFORMATION SUMMARY CARD */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#071B36] border border-[#D4AF37]/30 text-white space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl font-serif">
                      {appData.universityLogo || '🎓'}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
                          {appData.universityLogo || '🎓'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                              AUTOMATICALLY SELECTED UNIVERSITY
                            </span>
                            <span className="text-[10px] font-mono text-slate-300">
                              App ID: {appData.id}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                            {appData.universityName}
                          </h3>
                          <p className="text-xs text-slate-300 flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                            {appData.city}, {appData.country}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowUniChangeModal(true)}
                        className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] font-bold text-xs border border-[#D4AF37]/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shrink-0"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>CHANGE UNIVERSITY</span>
                      </button>
                    </div>

                    {/* Auto-filled details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-1">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Intended Course / Program
                        </label>
                        <input
                          type="text"
                          value={appData.selectedCourse}
                          onChange={(e) => setAppData({ ...appData, selectedCourse: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Degree Level
                        </label>
                        <select
                          value={appData.degreeLevel}
                          onChange={(e) => setAppData({ ...appData, degreeLevel: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1F3A] border border-white/20 text-white font-semibold focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Bachelor's">Bachelor's Degree</option>
                          <option value="Master's">Master's Degree</option>
                          <option value="PhD">PhD / Doctorate</option>
                          <option value="Diploma">Diploma / Pathway</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Target Intake
                        </label>
                        <select
                          value={appData.intake}
                          onChange={(e) => setAppData({ ...appData, intake: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0B1F3A] border border-white/20 text-white font-semibold focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Fall (August/September 2026)">Fall Intake (Aug / Sept)</option>
                          <option value="Spring (January/February 2026)">Spring Intake (Jan / Feb)</option>
                          <option value="Summer (May/June 2026)">Summer Intake (May / June)</option>
                        </select>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Tuition Fee</span>
                        <span className="font-bold text-sm text-[#D4AF37]">
                          {appData.tuitionFeeEUR === 0 ? 'Tuition Free (€0)' : `€${appData.tuitionFeeEUR.toLocaleString()} / year`}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Application Fee</span>
                        <span className="font-bold text-sm text-emerald-400">
                          {appData.applicationFeeEUR === 0 ? 'Waiver (€0)' : `€${appData.applicationFeeEUR}`}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Application Deadline</span>
                        <span className="font-bold text-sm text-white">{appData.applicationDeadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: STUDENT INFORMATION */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      Step 2: Student Personal Information
                    </h3>

                    {/* Quick Account Switcher Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">Account:</span>
                      <select
                        value={currentUser?.id || ''}
                        onChange={(e) => switchUser(e.target.value)}
                        className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-xs font-bold text-[#0B1F3A] dark:text-[#D4AF37] border border-slate-300 dark:border-white/20"
                      >
                        {allStudents.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.fullName} ({s.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name (as in Passport) *
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
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={appData.dateOfBirth}
                        onChange={(e) => setAppData({ ...appData, dateOfBirth: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nationality *
                      </label>
                      <input
                        type="text"
                        required
                        value={appData.nationality}
                        onChange={(e) => setAppData({ ...appData, nationality: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@gmail.com"
                        value={appData.studentEmail}
                        onChange={(e) => setAppData({ ...appData, studentEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1800 000000"
                        value={appData.studentPhone}
                        onChange={(e) => setAppData({ ...appData, studentPhone: e.target.value })}
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
                        placeholder="e.g. Dhaka / Chittagong"
                        value={appData.studentDistrict}
                        onChange={(e) => setAppData({ ...appData, studentDistrict: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Permanent Address
                      </label>
                      <input
                        type="text"
                        placeholder="House no, Street name, Area"
                        value={appData.fullAddress}
                        onChange={(e) => setAppData({ ...appData, fullAddress: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: ACADEMIC INFORMATION */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
                    Step 3: Academic Background & Qualifications
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Highest Qualification *
                      </label>
                      <select
                        value={appData.previousEducation}
                        onChange={(e) => setAppData({ ...appData, previousEducation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Higher Secondary (HSC/A-Levels)">Higher Secondary (HSC/A-Levels)</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Diploma">Diploma / Polytechnic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dhaka University / BUET / NSU"
                        value={appData.institutionName}
                        onChange={(e) => setAppData({ ...appData, institutionName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Major Subject / Field
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science / Business Administration"
                        value={appData.academicSubject}
                        onChange={(e) => setAppData({ ...appData, academicSubject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        CGPA / Marks (%) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3.50 / 4.00"
                        value={appData.cgpa}
                        onChange={(e) => setAppData({ ...appData, cgpa: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2024"
                        value={appData.graduationYear}
                        onChange={(e) => setAppData({ ...appData, graduationYear: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: ENGLISH PROFICIENCY */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
                    Step 4: English Language Proficiency
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Test Type / Waiver *
                      </label>
                      <select
                        value={appData.englishTestType}
                        onChange={(e) =>
                          setAppData({
                            ...appData,
                            englishTestType: e.target.value as any,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="IELTS">IELTS Academic</option>
                        <option value="PTE">PTE Academic</option>
                        <option value="Duolingo">Duolingo English Test</option>
                        <option value="TOEFL">TOEFL iBT</option>
                        <option value="MOI">Medium of Instruction (MOI Waiver)</option>
                        <option value="None">No Test Yet (Applying for Waiver)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Overall Score / Band Details *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Overall 7.0 (L:7.5, R:7.0, W:6.5, S:7.0)"
                        value={appData.englishScore}
                        onChange={(e) => setAppData({ ...appData, englishScore: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Test / Certificate Date
                      </label>
                      <input
                        type="date"
                        value={appData.testDate}
                        onChange={(e) => setAppData({ ...appData, testDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: SEPARATE APPLICATION DOCUMENTS CHECKLIST */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-white/10 pb-2 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      Step 5: Document Submission Checklist
                    </h3>
                    <span className="text-xs text-[#D4AF37] font-bold">PDF / High-Res Format</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'passport', title: '1. Passport Copy', doc: appData.documents.passport },
                      { key: 'certificates', title: '2. Academic Certificates', doc: appData.documents.certificates },
                      { key: 'transcripts', title: '3. Academic Transcripts', doc: appData.documents.transcripts },
                      { key: 'englishTest', title: '4. English Test Result / MOI', doc: appData.documents.englishTest },
                      { key: 'cv', title: '5. Curriculum Vitae (CV)', doc: appData.documents.cv },
                      { key: 'sop', title: '6. Personal Statement (SOP)', doc: appData.documents.sop },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileText className="w-5 h-5 text-[#D4AF37] shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{item.title}</p>
                            <p className="text-[10px] text-emerald-500 font-semibold truncate">
                              ✓ {item.doc?.fileName || 'Attached Document'}
                            </p>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                          Provided
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>
                      Private Document Storage: These documents belong exclusively to Application ID {appData.id}.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 6: REVIEW AND SUBMIT */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-200 dark:border-white/10 pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      Step 6: Final Review & Submission
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Please review your application details carefully before submitting to VERCITO Admissions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Uni Card */}
                    <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-white/10 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase">Target University</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[10px] text-[#D4AF37] underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="font-serif font-bold text-base text-white">{appData.universityName}</p>
                      <p className="text-slate-300">
                        {appData.selectedCourse} ({appData.degreeLevel}) — {appData.country}
                      </p>
                      <p className="text-[#D4AF37]">
                        Intake: {appData.intake} | Fee: {appData.tuitionFeeEUR === 0 ? 'Free' : `€${appData.tuitionFeeEUR}/yr`}
                      </p>
                    </div>

                    {/* Student Info Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">Student Personal Info</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-[10px] text-[#D4AF37] underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p>
                        <strong>Name:</strong> {appData.fullName || 'N/A'}
                      </p>
                      <p>
                        <strong>Email:</strong> {appData.studentEmail || 'N/A'}
                      </p>
                      <p>
                        <strong>Phone:</strong> {appData.studentPhone || 'N/A'}
                      </p>
                      <p>
                        <strong>District:</strong> {appData.studentDistrict}
                      </p>
                    </div>

                    {/* Academic & English Box */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">Academic & English</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[10px] text-[#D4AF37] underline"
                        >
                          Edit
                        </button>
                      </div>
                      <p>
                        <strong>Qualification:</strong> {appData.previousEducation}
                      </p>
                      <p>
                        <strong>Institution:</strong> {appData.institutionName}
                      </p>
                      <p>
                        <strong>CGPA:</strong> {appData.cgpa}
                      </p>
                      <p>
                        <strong>English:</strong> {appData.englishTestType} ({appData.englishScore})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : isSubmitted && appData ? (
            /* SUBMISSION SUCCESS VIEW */
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500">
                  ✓ APPLICATION SUBMITTED SUCCESSFULLY
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                  Your application has been successfully received.
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Application dossier officially registered into VERCITO admissions portal and assigned a unique Application ID.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-xl mx-auto text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                  <span className="font-extrabold text-[#D4AF37]">APPLICATION ID</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {appData.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Name</span>
                    <strong className="text-slate-900 dark:text-white">{appData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Selected University</span>
                    <strong className="text-slate-900 dark:text-white">{appData.universityName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Selected Course</span>
                    <strong>{appData.selectedCourse}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Degree Level & Intake</span>
                    <strong>{appData.degreeLevel} — {appData.intake}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Submission Date</span>
                    <strong>{appData.submissionDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Application Status</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold">
                      {appData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs flex items-center gap-2 hover:brightness-110 shadow-md cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>📄 DOWNLOAD APPLICATION PDF</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2 hover:bg-slate-700 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>🖨 PRINT APPLICATION</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenTrackerWithId) onOpenTrackerWithId(appData.id);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-500 shadow-md cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>📊 TRACK APPLICATION</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenStudentPortal) onOpenStudentPortal();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>📁 VIEW MY APPLICATIONS</span>
                </button>
              </div>
            </div>
          ) : null}

          {/* Footer Navigation */}
          {!isSubmitted && !showDraftPrompt && appData && (
            <div className="p-4 sm:p-6 bg-slate-100 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-md transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 hover:bg-emerald-600 shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Application</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* CHANGE UNIVERSITY SELECTOR MODAL */}
      {showUniChangeModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0B1F3A] rounded-2xl p-6 space-y-4 border border-white/20 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                Select Target University
              </h3>
              <button
                onClick={() => setShowUniChangeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search university name or city..."
                  value={uniSearchQuery}
                  onChange={(e) => setUniSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <select
                value={uniCountryFilter}
                onChange={(e) => setUniCountryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
              >
                {allCountriesList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredUniversities.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => selectUniversityFromList(uni)}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-[#D4AF37]/10 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37] cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{uni.logo}</span>
                    <div>
                      <p className="font-bold text-xs text-[#0B1F3A] dark:text-white">{uni.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {uni.city}, {uni.country} | QS #{uni.ranking}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0B1F3A] font-extrabold text-[10px]">
                    Select
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE HIDDEN SECTION FOR NATIVE PRINT DIALOG */}
      {appData && (
        <div id="printable-application-form" className="hidden">
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0B1F3A', paddingBottom: '10px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '20px', color: '#0B1F3A' }}>VERCITO HIGHER EDUCATION</h1>
                <p style={{ margin: 0, fontSize: '10px', color: '#D4AF37' }}>SHAPING FUTURES BEYOND BORDERS</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px' }}>
                <p style={{ margin: 0 }}>APPLICATION ID: <strong>{appData.id}</strong></p>
                <p style={{ margin: 0 }}>Date: {appData.submissionDate}</p>
                <p style={{ margin: 0, color: 'green' }}>Status: {appData.status}</p>
              </div>
            </div>

            <h2 style={{ textAlign: 'center', fontSize: '14px', margin: '15px 0' }}>STUDENT UNIVERSITY APPLICATION FORM</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '15px' }}>
              <tbody>
                <tr style={{ background: '#f0f0f0' }}>
                  <th colSpan={2} style={{ textAlign: 'left', padding: '5px', border: '1px solid #ccc' }}>1. APPLICANT PERSONAL INFORMATION</th>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Full Name: <strong>{appData.fullName}</strong></td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Date of Birth: {appData.dateOfBirth}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Email: {appData.studentEmail}</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Phone: {appData.studentPhone}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Nationality: {appData.nationality}</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>District: {appData.studentDistrict}</td>
                </tr>
              </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '15px' }}>
              <tbody>
                <tr style={{ background: '#f0f0f0' }}>
                  <th colSpan={2} style={{ textAlign: 'left', padding: '5px', border: '1px solid #ccc' }}>2. TARGET UNIVERSITY DETAILS</th>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>University: <strong>{appData.universityName}</strong></td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Country/City: {appData.country}, {appData.city}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Course: {appData.selectedCourse}</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Degree/Intake: {appData.degreeLevel} — {appData.intake}</td>
                </tr>
              </tbody>
            </table>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '15px' }}>
              <tbody>
                <tr style={{ background: '#f0f0f0' }}>
                  <th colSpan={2} style={{ textAlign: 'left', padding: '5px', border: '1px solid #ccc' }}>3. ACADEMIC & ENGLISH PROFICIENCY</th>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Degree: {appData.previousEducation} ({appData.institutionName})</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>CGPA: {appData.cgpa}</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>English Test: {appData.englishTestType}</td>
                  <td style={{ padding: '5px', border: '1px solid #ccc' }}>Score: {appData.englishScore}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
              <div style={{ width: '45%', borderTop: '1px solid #000', paddingTop: '5px' }}>
                <p>Student Signature: {appData.fullName}</p>
                <p>Date: {appData.submissionDate}</p>
              </div>
              <div style={{ width: '45%', border: '1px solid #D4AF37', padding: '10px', background: '#fffdf0' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>FOR VERCITO ADMISSIONS OFFICE</p>
                <p style={{ margin: '5px 0 0 0' }}>Status: Verified & Forwarded to University</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
