/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Download,
  Upload,
  User,
  GraduationCap,
  Building2,
  Calendar,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  Send,
  Eye,
  LogOut,
  UserCheck,
  Sparkles,
  Printer,
  ChevronRight,
  Lock,
  RefreshCw,
  PlusCircle,
  FileCheck2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import { ApplicationRecord, ApplicationStatus } from '../types';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchId?: string;
  onOpenApplyNow?: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  initialSearchId = '',
  onOpenApplyNow,
}) => {
  const { currentUser, isLoggedIn, login, register, logout, switchUser, allStudents, updateProfile } = useAuth();
  const { getUserApplications, getApplicationWithPrivacyCheck } = useApplication();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'applications' | 'tracking' | 'documents' | 'profile' | 'settings'
  >('dashboard');

  // Tracking Search State
  const [searchId, setSearchId] = useState(initialSearchId);
  const [searchResult, setSearchResult] = useState<ApplicationRecord | null>(null);
  const [searchError, setSearchError] = useState('');

  // Auth Inline Modal Tab (if not logged in)
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'reset'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDistrict, setRegDistrict] = useState('Dhaka');
  const [authMsg, setAuthMsg] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.fullName || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editDistrict, setEditDistrict] = useState(currentUser?.district || '');
  const [profileMsg, setProfileMsg] = useState('');

  // Get current user's owned applications
  const myApplications = getUserApplications(currentUser?.id);
  const submittedApps = myApplications.filter((a) => !a.isDraft);
  const savedDrafts = myApplications.filter((a) => a.isDraft);

  // Handle Tracking Search with Strict Privacy Ownership Verification
  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearchError('');
    setSearchResult(null);

    const activeUserId = currentUser?.id || 'GUEST';
    const check = getApplicationWithPrivacyCheck(searchId, activeUserId);

    if (check.success && check.application) {
      setSearchResult(check.application);
    } else {
      setSearchError(check.error || 'No matching application record found.');
    }
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMsg('');
    const res = await login(loginEmail, loginPass);
    if (res.success) {
      setAuthMsg('Login successful!');
    } else {
      setAuthMsg(res.message || 'Login failed.');
    }
  };

  // Register handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMsg('');
    const res = await register({
      fullName: regName,
      email: regEmail,
      phone: regPhone,
      district: regDistrict,
      dateOfBirth: '2001-05-15',
      nationality: 'Bangladeshi',
    });
    if (res.success) {
      setAuthMsg('Account created successfully!');
    } else {
      setAuthMsg(res.message || 'Registration failed.');
    }
  };

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName,
      phone: editPhone,
      district: editDistrict,
    });
    setProfileMsg('Profile updated successfully!');
    setTimeout(() => setProfileMsg(''), 3000);
  };

  // PDF Download Handler with Strict Privacy Check
  const handleDownloadPDF = (app: ApplicationRecord) => {
    const activeUserId = currentUser?.id || 'GUEST';
    const check = getApplicationWithPrivacyCheck(app.id, activeUserId);

    if (!check.success) {
      alert(check.error || 'Access Denied: You do not own this application.');
      return;
    }

    try {
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

      // Header Banner
      doc.setFillColor(11, 31, 58);
      doc.rect(14, 12, 182, 22, 'F');
      doc.setFillColor(212, 175, 55);
      doc.rect(14, 34, 182, 1.5, 'F');

      doc.setTextColor(212, 175, 55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('VERCITO HIGHER EDUCATION', 18, 21);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL STUDENT APPLICATION DOSSIER', 18, 27);

      doc.setTextColor(11, 31, 58);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('APPLICATION DOSSIER', 105, 43, { align: 'center' });

      doc.setFillColor(241, 245, 249);
      doc.rect(14, 47, 182, 9, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, 47, 182, 9, 'S');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`APPLICATION ID: ${app.id}`, 18, 53);
      doc.text(`DATE: ${app.submissionDate}`, 95, 53);
      doc.setTextColor(16, 185, 129);
      doc.text(`STATUS: ${app.status}`, 150, 53);

      // Personal & Uni Info
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(11, 31, 58);
      doc.text('STUDENT & UNIVERSITY DETAILS', 18, 64);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(`Student Name: ${app.fullName}`, 18, 71);
      doc.text(`Email: ${app.studentEmail}`, 18, 76);
      doc.text(`Phone: ${app.studentPhone}`, 18, 81);
      doc.text(`Target University: ${app.universityName}`, 105, 71);
      doc.text(`Target Program: ${app.selectedCourse}`, 105, 76);
      doc.text(`Degree & Intake: ${app.degreeLevel} — ${app.intake}`, 105, 81);

      doc.line(14, 88, 196, 88);
      doc.setFontSize(7);
      doc.text(`VERCITO Admissions Portal — Application Record ${app.id}`, 18, 93);

      const safeName = app.fullName.trim().replace(/\s+/g, '_');
      doc.save(`VERCITO_Application_${app.id}_${safeName}.pdf`);
    } catch (e) {
      console.error(e);
      alert('PDF generation error.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-5xl bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-white rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl relative my-auto max-h-[94vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  STUDENT PORTAL
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Secure Access
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                {currentUser ? `Welcome, ${currentUser.fullName}` : 'Student Account Login'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Account Switcher for easy privacy testing */}
            {currentUser && (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] font-bold text-slate-400">Switch Account:</span>
                <select
                  value={currentUser.id}
                  onChange={(e) => switchUser(e.target.value)}
                  className="px-2.5 py-1 rounded-xl bg-white/10 text-xs font-bold text-[#D4AF37] border border-white/20 focus:outline-none cursor-pointer"
                >
                  {allStudents.map((s) => (
                    <option key={s.id} value={s.id} className="text-slate-900">
                      {s.fullName} ({s.id})
                    </option>
                  ))}
                </select>
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

        {/* NOT LOGGED IN VIEW */}
        {!isLoggedIn || !currentUser ? (
          <div className="p-6 sm:p-10 max-w-md mx-auto my-auto space-y-6 w-full">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/30">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                {authMode === 'login' ? 'Student Portal Login' : 'Register Student Account'}
              </h3>
              <p className="text-xs text-slate-500">
                Sign in to manage your university applications, track admission status, and access documents.
              </p>
            </div>

            {authMsg && (
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#D4AF37] text-center font-bold">
                {authMsg}
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="tanvir@gmail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Log In to Student Portal
                </button>

                <div className="pt-2 text-center text-slate-500">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-[#D4AF37] font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusrat Jahan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="nusrat@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1800 000000"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-extrabold shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Create Student Account
                </button>

                <div className="pt-2 text-center text-slate-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-[#D4AF37] font-bold hover:underline"
                  >
                    Log In
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* LOGGED IN STUDENT DASHBOARD VIEW */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-50 dark:bg-white/5 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 p-4 space-y-2 shrink-0">
              {/* Student Profile Card */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1 mb-4 border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0B1F3A] font-bold flex items-center justify-center text-xs">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-xs text-white truncate">{currentUser.fullName}</p>
                    <p className="text-[10px] text-[#D4AF37] font-mono">{currentUser.id}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs font-bold">
                {[
                  { id: 'dashboard', label: 'Student Dashboard', icon: UserCheck, count: null },
                  { id: 'applications', label: 'My Applications', icon: FileText, count: submittedApps.length },
                  { id: 'tracking', label: 'Application Tracking', icon: Search, count: null },
                  { id: 'documents', label: 'My Documents', icon: FileCheck2, count: null },
                  { id: 'profile', label: 'My Profile', icon: User, count: null },
                  { id: 'settings', label: 'Account Settings', icon: Lock, count: null },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count !== null && (
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={logout}
                  className="w-full p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 flex items-center gap-2.5 transition-all mt-4 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#07172E] text-white border border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Submitted Applications</span>
                      <p className="text-2xl font-extrabold">{submittedApps.length}</p>
                      <p className="text-[11px] text-slate-300">Active university dossiers</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Saved Drafts</span>
                      <p className="text-2xl font-extrabold text-[#D4AF37]">{savedDrafts.length}</p>
                      <p className="text-[11px] text-slate-500">Incomplete applications</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Registered User ID</span>
                      <p className="text-xl font-extrabold text-emerald-500 font-mono">{currentUser.id}</p>
                      <p className="text-[11px] text-slate-500">Private Student Key</p>
                    </div>
                  </div>

                  {/* Apply New Button Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                        Apply to Another University
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Every Apply Now click generates a brand new independent application with its own Application ID.
                      </p>
                    </div>
                    {onOpenApplyNow && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenApplyNow();
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs flex items-center gap-2 hover:brightness-110 shadow-md cursor-pointer shrink-0"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Start New Application</span>
                      </button>
                    )}
                  </div>

                  {/* Submitted Applications List */}
                  <div className="space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                      Recent Application History
                    </h4>

                    {submittedApps.length === 0 ? (
                      <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 text-xs space-y-2">
                        <FileText className="w-10 h-10 mx-auto text-slate-400" />
                        <p>No submitted applications found yet.</p>
                      </div>
                    ) : (
                      submittedApps.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#D4AF37]/50 transition-all"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs text-[#D4AF37]">{app.id}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold text-[10px]">
                                {app.status}
                              </span>
                            </div>
                            <h5 className="font-serif font-bold text-sm text-[#0B1F3A] dark:text-white">
                              {app.universityName}
                            </h5>
                            <p className="text-xs text-slate-500">
                              {app.selectedCourse} ({app.degreeLevel}) | Submitted: {app.submissionDate}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => {
                                setSearchId(app.id);
                                setActiveTab('tracking');
                                setSearchResult(app);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Search className="w-3.5 h-3.5" />
                              <span>Track</span>
                            </button>

                            <button
                              onClick={() => handleDownloadPDF(app)}
                              className="px-3 py-1.5 rounded-lg bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY APPLICATIONS HISTORY */}
              {activeTab === 'applications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      My Submitted Applications & History
                    </h3>
                    <span className="text-xs text-slate-500">Total: {submittedApps.length}</span>
                  </div>

                  {submittedApps.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-white/5 text-xs text-slate-500">
                      No submitted applications found for {currentUser.fullName}.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submittedApps.map((app) => (
                        <div
                          key={app.id}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
                            <div>
                              <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                                APPLICATION ID: {app.id}
                              </span>
                              <h4 className="font-serif font-bold text-base text-[#0B1F3A] dark:text-white">
                                {app.universityName}
                              </h4>
                            </div>

                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xs self-start sm:self-auto">
                              {app.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <div>
                              <span className="text-[10px] text-slate-400 block">Course</span>
                              <strong>{app.selectedCourse}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Degree & Intake</span>
                              <strong>{app.degreeLevel} — {app.intake}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Submission Date</span>
                              <strong>{app.submissionDate}</strong>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleDownloadPDF(app)}
                              className="px-3.5 py-2 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: APPLICATION TRACKING SYSTEM */}
              {activeTab === 'tracking' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 dark:border-white/10 pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      Secure Application Tracking System
                    </h3>
                    <p className="text-xs text-slate-500">
                      Search and track your official application status in real-time.
                    </p>
                  </div>

                  {/* Search Bar */}
                  <form onSubmit={handleSearchTracking} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter Application ID e.g. VER-APP-2026-100001"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold text-xs cursor-pointer hover:brightness-110"
                    >
                      Track Application
                    </button>
                  </form>

                  {/* Error / Privacy Denied Banner */}
                  {searchError && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-3">
                      <Lock className="w-5 h-5 shrink-0" />
                      <div>
                        <h5 className="font-bold">Access Restricted</h5>
                        <p>{searchError}</p>
                      </div>
                    </div>
                  )}

                  {/* Search Result Tracking View */}
                  {searchResult && (
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#D4AF37]">
                            {searchResult.id}
                          </span>
                          <h4 className="font-serif font-bold text-xl text-[#0B1F3A] dark:text-white">
                            {searchResult.universityName}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {searchResult.selectedCourse} ({searchResult.degreeLevel})
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xs">
                            {searchResult.status}
                          </span>
                          <p className="text-[10px] text-slate-400 mt-1">Submitted: {searchResult.submissionDate}</p>
                        </div>
                      </div>

                      {/* Visual Progress Timeline */}
                      <div className="space-y-3">
                        <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                          Application Processing Timeline
                        </h5>

                        <div className="relative border-l-2 border-[#D4AF37] ml-4 pl-6 space-y-4 text-xs">
                          {searchResult.timeline.map((event, idx) => (
                            <div key={idx} className="relative">
                              <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-white dark:border-[#0B1F3A]" />
                              <div className="flex items-center justify-between font-bold">
                                <span className="text-[#0B1F3A] dark:text-white">{event.status}</span>
                                <span className="text-slate-400 text-[10px]">{event.date}</span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 mt-0.5">{event.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: MY DOCUMENTS */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-white/10 pb-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                      Private Application Documents
                    </h3>
                    <p className="text-xs text-slate-500">
                      Documents uploaded under your account key ({currentUser.id}).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { title: 'Passport Copy', status: 'Approved', type: 'PDF' },
                      { title: 'Academic Certificates', status: 'Approved', type: 'PDF' },
                      { title: 'Academic Transcripts', status: 'Approved', type: 'PDF' },
                      { title: 'IELTS / PTE Result TRF', status: 'Approved', type: 'PDF' },
                      { title: 'Curriculum Vitae (CV)', status: 'Approved', type: 'PDF' },
                      { title: 'Statement of Purpose (SOP)', status: 'Approved', type: 'PDF' },
                    ].map((d, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-5 h-5 text-[#D4AF37]" />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{d.title}</p>
                            <span className="text-[10px] text-emerald-500">✓ Encrypted & Verified</span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold text-[10px]">
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: MY PROFILE */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
                    Student Profile Details
                  </h3>

                  {profileMsg && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                      {profileMsg}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs max-w-md">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">User ID</label>
                      <input
                        type="text"
                        disabled
                        value={currentUser.id}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 border border-slate-300 font-mono text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled
                        value={currentUser.email}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 border border-slate-300 text-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Home District</label>
                      <input
                        type="text"
                        value={editDistrict}
                        onChange={(e) => setEditDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-extrabold cursor-pointer hover:brightness-110"
                    >
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white border-b border-slate-200 dark:border-white/10 pb-2">
                    Account Security & Privacy Settings
                  </h3>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Strict Student Privacy Enforcement</p>
                        <p className="text-slate-500 text-[11px]">Backend & frontend owner verification active.</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500 font-bold text-[10px]">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-3">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">Session Security</p>
                        <p className="text-slate-500 text-[11px]">Logged in as User ID {currentUser.id}</p>
                      </div>
                      <button
                        onClick={logout}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-500 font-bold text-xs cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
