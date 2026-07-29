import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2, Calendar, FileText, ExternalLink, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { ProfileEvaluationInput, RecommendedScholarshipDetail } from '../../types';

interface ScholarshipMatcherProps {
  profileForm: ProfileEvaluationInput;
  scholarships?: RecommendedScholarshipDetail[];
  onApplyScholarship?: (scholarshipName: string) => void;
}

export const ScholarshipMatcher: React.FC<ScholarshipMatcherProps> = ({
  profileForm,
  scholarships = [],
  onApplyScholarship,
}) => {
  const [filterType, setFilterType] = useState<'All' | 'Fully Funded' | 'Partial'>('All');

  const country = profileForm.preferredCountry || 'Europe';
  const gpa = parseFloat(profileForm.cgpaOrGpa) || 3.2;

  // Curated matching scholarships
  const defaultScholarships = [
    {
      name: `${country} DSU Regional Need-Based & Merit Grant`,
      coverage: '100% Tuition Waiver + €7,000/yr Cash Stipend + Free University Canteen Meals',
      type: 'Fully Funded' as const,
      deadline: 'September 15, 2026',
      eligibility: `Open to Bangladeshi students with family income solvency under €25,000 & CGPA ${gpa.toFixed(2)}+`,
      winningProbability: gpa >= 3.0 ? ('Very High' as const) : ('High' as const),
      requiredDocuments: [
        'Family Income Tax Return Certificate',
        'Bank Solvency Certificate from BD Bank',
        'Translated Passport & Academic Transcripts'
      ]
    },
    {
      name: 'VERCITO European Excellence Merit Fellowship',
      coverage: '€2,500 One-time Airfare & Initial Accommodation Settlement Subsidy',
      type: 'Partial' as const,
      deadline: 'Rolling Admission Basis',
      eligibility: 'Granted to all top-performing applicants registering via VERCITO Education Portal',
      winningProbability: 'Very High' as const,
      requiredDocuments: [
        'VERCITO Profile Evaluation Report',
        'Valid Passport Copy',
        'University Admission Pre-Enrollment Letter'
      ]
    },
    {
      name: 'Stipendium Hungaricum & Erasmus+ Student Mobility Grant',
      coverage: 'Full Tuition + €450/month Stipend + Free Dormitory Housing + Health Insurance',
      type: 'Fully Funded' as const,
      deadline: 'January 15, 2027',
      eligibility: `Completed ${profileForm.currentEducationLevel || 'Bachelors'} with minimum CGPA 3.00 & English proficiency`,
      winningProbability: gpa >= 3.3 ? ('High' as const) : ('Moderate' as const),
      requiredDocuments: [
        'Europass CV & Motivation Statement',
        '2 Recommendation Letters from Professors',
        'IELTS / MOI English Waiver Certificate'
      ]
    },
    {
      name: 'DAAD / Eiffel Excellence Scholarship Program',
      coverage: 'Full Tuition + €1,200/month Monthly Allowance + Travel Grant',
      type: 'Fully Funded' as const,
      deadline: 'November 30, 2026',
      eligibility: 'High academic honors or 2+ years research/industry experience',
      winningProbability: gpa >= 3.5 ? ('High' as const) : ('Moderate' as const),
      requiredDocuments: [
        'Detailed Thesis Proposal / Project Report',
        'Academic Transcripts with MOFA Attestation',
        'Official IELTS Scorecard (Band 6.5+)'
      ]
    },
    {
      name: 'European University Talent Waiver',
      coverage: '50% to 100% Academic Tuition Fee Discount',
      type: 'Partial' as const,
      deadline: 'May 31, 2026',
      eligibility: 'Automatic consideration upon submitting university pre-enrollment',
      winningProbability: 'Very High' as const,
      requiredDocuments: [
        'University Online Application Form',
        'Statement of Purpose (SOP)'
      ]
    }
  ];

  const filteredScholarships = defaultScholarships.filter((s) => {
    if (filterType === 'All') return true;
    return s.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900/90 via-[#0B1F3A] to-amber-900/90 p-6 rounded-2xl text-white border border-[#D4AF37]/40 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              AI Scholarship Matching Algorithm
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">
              Scholarships Recommended for <span className="text-[#D4AF37]">{profileForm.fullName || 'Student'}</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Matched based on target country (<strong className="text-white">{country}</strong>) and academic CGPA (<strong className="text-[#D4AF37]">{gpa.toFixed(2)}</strong>).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setFilterType('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'All' ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Grants
            </button>
            <button
              onClick={() => setFilterType('Fully Funded')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'Fully Funded' ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Fully Funded
            </button>
            <button
              onClick={() => setFilterType('Partial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'Partial' ? 'bg-[#D4AF37] text-[#0B1F3A] font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Partial Waivers
            </button>
          </div>
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredScholarships.map((s, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] transition-all duration-200 shadow-sm relative group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      s.type === 'Fully Funded'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300'
                    }`}
                  >
                    ✨ {s.type}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-xs font-semibold">
                    🎯 Win Probability: {s.winningProbability}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif group-hover:text-[#0B1F3A] dark:group-hover:text-[#D4AF37] transition-colors">
                  {s.name}
                </h3>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-xs space-y-1.5 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>Coverage: {s.coverage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                    <span>Eligibility: {s.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Deadline: {s.deadline}</span>
                  </div>
                </div>

                {/* Required Documents List */}
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Required Verification Documents:</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                    {s.requiredDocuments.map((doc, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col items-end justify-between self-stretch md:self-auto border-t md:border-t-0 pt-3 md:pt-0">
                <button
                  onClick={() => onApplyScholarship && onApplyScholarship(s.name)}
                  className="w-full md:w-auto px-5 py-2.5 bg-[#0B1F3A] hover:bg-[#1E3A8A] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors border border-[#D4AF37]/30"
                >
                  <span>Apply for Scholarship</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
