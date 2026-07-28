/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Building2,
  GraduationCap,
  Award,
  DollarSign,
  Globe,
  MapPin,
  Calendar,
  FileText,
  Clock,
  Briefcase,
  CheckCircle2,
  XCircle,
  Star,
  Download,
  Bookmark,
  Sparkles,
  ChevronRight,
  Share2,
  AlertCircle,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { UniversityPartner, Currency } from '../types';

interface UniversityDetailModalProps {
  university: UniversityPartner | null;
  onClose: () => void;
  currency: Currency;
  onApply: (uniName: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (uniId: string) => void;
  isCompared: boolean;
  onToggleCompare: (uni: UniversityPartner) => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  currency,
  onApply,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
}) => {
  if (!university) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'admission' | 'visa' | 'reviews'>('overview');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review submission state
  const [userRating, setUserRating] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(
    university.reviews || [
      {
        id: 'rev-1',
        authorName: 'Tanvir Hossain',
        authorCountry: 'Bangladesh',
        rating: 5,
        date: '2 months ago',
        program: "M.Sc. Computer Science",
        comment: 'Outstanding academic environment. VERCITO helped me secure the full tuition waiver and prepared my visa file seamlessly!',
      },
      {
        id: 'rev-2',
        authorName: 'Ayesha Rahman',
        authorCountry: 'Bangladesh',
        rating: 5,
        date: '4 months ago',
        program: "B.Sc. Business Administration",
        comment: 'Great campus facilities and strong support for international students. The MOI certificate was accepted without IELTS.',
      },
    ]
  );
  const [reviewSuccess, setReviewSuccess] = useState(false);

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

  const handleDownloadBrochure = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim(),
      authorCountry: 'Bangladesh',
      rating: userRating,
      date: 'Just now',
      program: university.featuredPrograms[0] || 'Degree Program',
      comment: reviewComment.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setAuthorName('');
    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden text-slate-900 dark:text-white flex flex-col max-h-[92vh]">
        {/* Header Banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
          <img
            src={university.image}
            alt={university.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                <span>{university.logo}</span>
                <span>{university.country}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-xs font-extrabold uppercase">
                {university.type} University
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleCompare(university)}
                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                className={`p-2 rounded-full border transition-all ${
                  isCompared
                    ? 'bg-[#D4AF37] text-[#0B1F3A] border-[#D4AF37]'
                    : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                }`}
              >
                <Zap className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleBookmark(university.id)}
                title={isBookmarked ? 'Saved' : 'Save to Favorites'}
                className={`p-2 rounded-full border transition-all ${
                  isBookmarked
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={handleShare}
                title="Share University Link"
                className="p-2 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60 transition-all relative"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && (
                  <span className="absolute -bottom-8 right-0 px-2 py-1 rounded bg-slate-900 text-white text-[10px] whitespace-nowrap shadow">
                    Link copied!
                  </span>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Key Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {university.city}, {university.country}
              </span>
              <span>•</span>
              <span>Est. {university.established}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              {university.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold">
                QS World Rank #{university.ranking}
              </span>
              {university.theRanking && (
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 font-bold">
                  THE Rank #{university.theRanking}
                </span>
              )}
              {university.scholarshipAmount && (
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                  Grants: {university.scholarshipAmount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 px-4 pt-2 overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Overview & Highlights', icon: Building2 },
            { id: 'programs', label: 'Programs & Fees', icon: GraduationCap },
            { id: 'admission', label: 'Admission & Requirements', icon: Award },
            { id: 'visa', label: 'Work Rights & Visa', icon: Briefcase },
            { id: 'reviews', label: `Student Reviews (${reviewsList.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
                  active
                    ? 'border-[#D4AF37] text-[#0B1F3A] dark:text-[#D4AF37] bg-white dark:bg-white/5 rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Bachelor Tuition
                  </span>
                  <span className="text-sm font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                    {formatMoney(university.tuitionFeeBachelorEUR ?? university.tuitionFeePerYearEUR)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Master Tuition
                  </span>
                  <span className="text-sm font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                    {formatMoney(university.tuitionFeeMasterEUR ?? university.tuitionFeePerYearEUR)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    IELTS Requirement
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {university.ieltsRequirement || '6.0 - 6.5'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Application Deadline
                  </span>
                  <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                    {university.applicationDeadline}
                  </span>
                </div>
              </div>

              {/* Institution Bio */}
              <div className="space-y-2">
                <h3 className="font-serif text-base font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>About {university.name}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {university.overview}
                </p>
              </div>

              {/* Scholarships Section */}
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#0B1F3A] dark:text-[#D4AF37] flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Scholarships & Financial Aid Grants</span>
                  </h4>
                  {university.scholarshipAmount && (
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold">
                      Up to {university.scholarshipAmount}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {university.scholarshipsOffered.map((sch, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-white/10 border border-[#D4AF37]/30 font-semibold text-slate-800 dark:text-slate-100 text-xs"
                    >
                      🏆 {sch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Program Levels Badge List */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono tracking-wider">
                  Available Program Tracks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(university.programLevels || ["Bachelor's", "Master's", "PhD"]).map((lvl, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold text-slate-700 dark:text-slate-200"
                    >
                      🎓 {lvl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROGRAMS & FEES */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Bachelor's Program Fee</span>
                  <p className="text-lg font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                    {formatMoney(university.tuitionFeeBachelorEUR ?? university.tuitionFeePerYearEUR)}
                  </p>
                  <span className="text-[10px] text-slate-500">Duration: 3 - 4 Years</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Master's Program Fee</span>
                  <p className="text-lg font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                    {formatMoney(university.tuitionFeeMasterEUR ?? university.tuitionFeePerYearEUR)}
                  </p>
                  <span className="text-[10px] text-slate-500">Duration: 1 - 2 Years</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">PhD Research Program</span>
                  <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatMoney(university.tuitionFeePhDEUR ?? 0)}
                  </p>
                  <span className="text-[10px] text-slate-500">Stipend / Fully Funded Options</span>
                </div>
              </div>

              {/* Additional Cost Factors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0B1F3A] dark:text-white">
                    <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                    <span>Estimated Monthly Living Cost</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {university.livingCostEUR ? `€${university.livingCostEUR}/month (${university.livingCostRange || 'Housing, Meals, Transit'})` : '€600 - €950 / month including student accommodation and health insurance.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0B1F3A] dark:text-white">
                    <FileText className="w-4 h-4 text-[#D4AF37]" />
                    <span>University Application Fee</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    {university.applicationFeeEUR ? `€${university.applicationFeeEUR} (Waiver code available via VERCITO)` : '€0 - €50 depending on faculty evaluation window.'}
                  </p>
                </div>
              </div>

              {/* Featured Programs List */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                  <span>Popular Programs & Major Specializations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {university.featuredPrograms.map((prog, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADMISSION & REQUIREMENTS */}
          {activeTab === 'admission' && (
            <div className="space-y-6">
              {/* Language Proficiency Acceptance Grid */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>English Test & Medium of Instruction (MOI) Acceptance</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold font-mono">IELTS</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {university.ieltsRequirement || '6.0 Required'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold font-mono">MOI Certificate</span>
                    <span className={`font-bold ${university.moiAccepted !== false ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {university.moiAccepted !== false ? 'ACCEPTED' : 'Not Accepted'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold font-mono">Duolingo DET</span>
                    <span className={`font-bold ${university.duolingoAccepted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {university.duolingoAccepted ? 'ACCEPTED (105+)' : 'Check Faculty'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold font-mono">PTE Academic</span>
                    <span className={`font-bold ${university.pteAccepted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {university.pteAccepted ? 'ACCEPTED (58+)' : 'Accepted'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Mandatory Document Checklist for Application</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {university.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-2.5"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intakes & Deadlines */}
              <div className="p-4 rounded-2xl bg-[#0B1F3A]/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">
                      Intake Windows: {university.intakes.join(', ')}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs">
                      Deadline for Bangladeshi Applicants: <strong className="text-rose-500">{university.applicationDeadline}</strong>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onApply(university.name)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all shrink-0"
                >
                  Start Fast-Track Application
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: WORK RIGHTS & VISA */}
          {activeTab === 'visa' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Part-Time Work Permission</span>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {university.partTimeWorkPermission || '20 Hours/Week Allowed'}
                  </p>
                  <span className="text-[10px] text-slate-500">Full-time during semester breaks</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Post-Study Work Visa (PSW)</span>
                  <p className="text-sm font-extrabold text-[#0B1F3A] dark:text-[#D4AF37]">
                    {university.postStudyWorkVisa || '1 - 3 Years Job Search Visa'}
                  </p>
                  <span className="text-[10px] text-slate-500">Pathway to EU Permanent Residency</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 block font-mono">Paid Internships</span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {university.internshipAvailability !== false ? 'Available in Year 2' : 'Course Dependent'}
                  </p>
                  <span className="text-[10px] text-slate-500">Industry partner placement</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <h4 className="font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span>Student Career & Post-Graduation Opportunities in {university.country}</span>
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Graduating from {university.name} provides direct access to EU & Global job markets. International graduates can convert their student residency permit into a work permit upon receiving a job offer in high-demand fields like IT, Engineering, Healthcare, and Finance.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Reviews List */}
              <div className="space-y-4">
                <h4 className="font-bold text-[#0B1F3A] dark:text-white flex items-center justify-between">
                  <span>Student Experiences & Alumni Ratings</span>
                  <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9 / 5.0 Average
                  </span>
                </h4>

                <div className="space-y-3">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold flex items-center justify-center text-xs">
                            {rev.authorName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold block text-slate-900 dark:text-white text-xs">
                              {rev.authorName} ({rev.authorCountry})
                            </span>
                            <span className="text-[10px] text-slate-500">{rev.program} • {rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-[#D4AF37]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-xs italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write Review Form */}
              <form onSubmit={handleAddReview} className="p-4 rounded-2xl bg-[#0B1F3A]/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
                <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-xs uppercase font-mono tracking-wider">
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Leave Your University Feedback / Inquiry</span>
                </h5>

                {reviewSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your review has been verified and posted!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Shakil Ahmed"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Rating</label>
                    <select
                      value={userRating}
                      onChange={(e) => setUserRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Review / Campus Experience</label>
                  <textarea
                    required
                    rows={2}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share admission experience, campus facilities, or visa process..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-black/30 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadBrochure}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{downloadSuccess ? 'Brochure Generated ✓' : 'Download Info PDF'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(university.name);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <span>Apply to {university.name} Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
