/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  Award,
  Globe2,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  Trash2,
  Download,
  Printer,
  ChevronRight,
  User,
  X
} from 'lucide-react';
import { AIAssessmentRecord } from '../../../types';

const SAMPLE_ASSESSMENTS: AIAssessmentRecord[] = [
  {
    id: 'ASSESS-2026-892',
    createdAt: '2026-02-14T10:30:00Z',
    status: 'New Assessment',
    assignedCounselor: 'Shahriar Kabir (Gulshan HQ)',
    input: {
      fullName: 'Tanvir Hossain',
      email: 'tanvir.hossain@gmail.com',
      phone: '+880 1711-889911',
      currentEducationLevel: 'Bachelors Degree',
      cgpaOrGpa: '3.42',
      englishProficiency: 'IELTS 7.0',
      preferredCountry: 'Italy',
      preferredUniversity: 'Politecnico di Milano',
      intendedSubject: 'Computer Science & Software Engineering',
      preferredIntake: 'Fall 2026 (Sept/Oct)',
      passportAvailable: 'Yes',
      nationality: 'Bangladeshi',
      estimatedBudget: '€3,000 - €5,000 / year',
      scholarshipPreference: 'Full Scholarship',
      preferredStudyLevel: 'Masters',
      workExperience: '1 Year as Software Developer',
      visaRefusal: 'No',
      studyMode: 'On-Campus',
      transcriptFileName: 'BRAC_University_Transcript_Tanvir.pdf',
      cvFileName: 'Europass_CV_Tanvir.pdf',
    },
    result: {
      eligibilityScore: 92,
      admissionChance: 'Excellent',
      recommendedUniversities: [
        {
          name: 'Politecnico di Milano',
          country: 'Italy',
          qsRanking: '#111 QS',
          type: 'Public',
          tuitionFee: '€3,892 / year (DSU Fee Waiver Available)',
          scholarshipAvailability: '100% DSU Regional Grant + €7,000 Living Stipend',
          applicationDeadline: 'May 15, 2026',
          matchReason: 'Top engineering university in Italy with high acceptance rate for BRAC University CSE graduates.',
        },
        {
          name: 'Sapienza University of Rome',
          country: 'Italy',
          qsRanking: '#134 QS',
          type: 'Public',
          tuitionFee: '€1,000 / year',
          scholarshipAvailability: 'LazioDiSCo Grant + Accommodation',
          applicationDeadline: 'April 30, 2026',
          matchReason: 'Excellent M.Sc. Data Science and AI programs with low tuition cost.',
        }
      ],
      recommendedScholarships: [
        {
          name: 'Lombardy DSU Regional Need-Based Grant',
          coverage: '100% Tuition Waiver + €7,000/yr Living Allowance',
          eligibility: 'ISEE Parificato < €25,000',
          deadline: 'September 15, 2026',
          winningProbability: 'Very High',
        }
      ],
      englishRequirements: {
        ieltsRequired: false,
        ieltsWaiverAvailable: true,
        moiAccepted: true,
        duolingoAccepted: true,
        pteAccepted: true,
        toeflAccepted: true,
      },
      estimatedCost: {
        tuitionFee: '€1,000 - €3,800 / year',
        livingCost: '€500 - €650 / month',
        visaFee: '€116',
        healthInsurance: '€150 / year',
        totalEstimatedBudget: '€3,000 - €5,000 / year',
      },
      documentChecklist: {
        requiredDocuments: ['Valid Passport', 'B.Sc Academic Transcript', 'IELTS Scorecard', 'MOFA Legalized Certificates'],
        missingDocuments: ['SOP / Motivation Letter Final Proofing'],
      },
      nextStepsActionPlan: [
        'Step 1: Get Education Board, Education Ministry & MOFA Attestation for B.Sc Transcript.',
        'Step 2: Submit Universitaly pre-enrollment application.',
        'Step 3: Prepare Sponsor Bank Solvency Statement (BDT 20 Lakhs).',
      ],
      personalizedAdvice: 'Tanvir, your CGPA of 3.42 and IELTS 7.0 make you an ideal candidate for Politecnico di Milano with 100% DSU scholarship eligibility.',
      visaFeasibility: 'High feasibility. Sponsor account requirements are clean.',
    }
  }
];

export const AIAssessmentsManager: React.FC = () => {
  const [assessments, setAssessments] = useState<AIAssessmentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [countryFilter, setCountryFilter] = useState<string>('ALL');

  const [selectedRecord, setSelectedRecord] = useState<AIAssessmentRecord | null>(null);

  // Load Assessments from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vercito_ai_assessments');
      if (stored) {
        const parsed: AIAssessmentRecord[] = JSON.parse(stored);
        setAssessments(parsed.length > 0 ? parsed : SAMPLE_ASSESSMENTS);
      } else {
        setAssessments(SAMPLE_ASSESSMENTS);
        localStorage.setItem('vercito_ai_assessments', JSON.stringify(SAMPLE_ASSESSMENTS));
      }
    } catch (e) {
      setAssessments(SAMPLE_ASSESSMENTS);
    }
  }, []);

  const saveAssessments = (updated: AIAssessmentRecord[]) => {
    setAssessments(updated);
    try {
      localStorage.setItem('vercito_ai_assessments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: AIAssessmentRecord['status']) => {
    const updated = assessments.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    saveAssessments(updated);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, status: newStatus });
    }
  };

  const handleAssignCounselor = (id: string, counselor: string) => {
    const updated = assessments.map((a) => (a.id === id ? { ...a, assignedCounselor: counselor } : a));
    saveAssessments(updated);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, assignedCounselor: counselor });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this AI assessment record?')) {
      const updated = assessments.filter((a) => a.id !== id);
      saveAssessments(updated);
      if (selectedRecord?.id === id) setSelectedRecord(null);
    }
  };

  // Filtered
  const filteredAssessments = assessments.filter((record) => {
    const textMatch =
      record.input.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.input.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.input.phone.includes(searchTerm) ||
      record.input.preferredCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = statusFilter === 'ALL' || record.status === statusFilter;
    const countryMatch = countryFilter === 'ALL' || record.input.preferredCountry === countryFilter;

    return textMatch && statusMatch && countryMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#122A4E] to-[#0B1F3A] border border-[#D4AF37]/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] flex items-center justify-center font-bold shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-extrabold text-white flex items-center gap-2">
              <span>AI Profile Assessments</span>
              <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
                {assessments.length} Total Logs
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Manage live student profile audits generated via VERCITO AI Specialist.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Email, Country, Assessment ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="ALL">All Statuses</option>
            <option value="New Assessment">New Assessment</option>
            <option value="In Review">In Review</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted to Application">Converted to Application</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="ALL">All Countries</option>
            <option value="Italy">Italy</option>
            <option value="Germany">Germany</option>
            <option value="USA">USA</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Finland">Finland</option>
            <option value="Hungary">Hungary</option>
            <option value="France">France</option>
          </select>
        </div>
      </div>

      {/* Assessments Data Table */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-3">Ref ID & Date</th>
                <th className="p-3">Student Info</th>
                <th className="p-3">Target Country & Uni</th>
                <th className="p-3">Academic Score</th>
                <th className="p-3">AI Score & Chance</th>
                <th className="p-3">Status</th>
                <th className="p-3">Counselor</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium">
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No AI assessment records found matching your query.
                  </td>
                </tr>
              ) : (
                filteredAssessments.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <span className="font-mono font-bold text-[#D4AF37] block">{rec.id}</span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-3">
                      <strong className="text-slate-900 dark:text-white block">{rec.input.fullName}</strong>
                      <span className="text-[10px] text-slate-400 block">{rec.input.email}</span>
                      <span className="text-[10px] text-slate-400">{rec.input.phone}</span>
                    </td>

                    <td className="p-3">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        {rec.input.preferredCountry}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{rec.input.preferredUniversity}</span>
                      <span className="text-[10px] text-slate-400">{rec.input.intendedSubject}</span>
                    </td>

                    <td className="p-3">
                      <span className="block font-bold">CGPA {rec.input.cgpaOrGpa}</span>
                      <span className="text-[10px] text-slate-400 block">{rec.input.currentEducationLevel}</span>
                      <span className="text-[10px] text-slate-400">{rec.input.englishProficiency}</span>
                    </td>

                    <td className="p-3">
                      <span className="font-extrabold text-[#D4AF37] text-sm block">
                        {rec.result.eligibilityScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37] inline-block">
                        {rec.result.admissionChance}
                      </span>
                    </td>

                    <td className="p-3">
                      <select
                        value={rec.status}
                        onChange={(e) => handleUpdateStatus(rec.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                      >
                        <option value="New Assessment">New Assessment</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted to Application">Converted to Application</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <select
                        value={rec.assignedCounselor || 'Unassigned'}
                        onChange={(e) => handleAssignCounselor(rec.id, e.target.value)}
                        className="px-2 py-1 rounded-lg text-[11px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10"
                      >
                        <option value="Unassigned">Unassigned</option>
                        <option value="Shahriar Kabir (Gulshan HQ)">Shahriar Kabir</option>
                        <option value="Anika Tabassum (Gulshan)">Anika Tabassum</option>
                        <option value="Mahfuzur Rahman (Chittagong)">Mahfuzur Rahman</option>
                      </select>
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRecord(rec)}
                          className="p-1.5 rounded-lg bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37] hover:bg-[#D4AF37]/30 transition-colors"
                          title="View Assessment Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(rec.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL FOR ADMIN */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#0B1F3A] text-white rounded-3xl p-6 border border-[#D4AF37]/40 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                  {selectedRecord.id}
                </span>
                <h4 className="text-lg font-bold text-white">
                  Assessment Details: {selectedRecord.input.fullName}
                </h4>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                <h5 className="font-bold text-[#D4AF37]">Applicant Info:</h5>
                <p><strong>Name:</strong> {selectedRecord.input.fullName}</p>
                <p><strong>Email:</strong> {selectedRecord.input.email}</p>
                <p><strong>Phone:</strong> {selectedRecord.input.phone}</p>
                <p><strong>Nationality:</strong> {selectedRecord.input.nationality}</p>
                <p><strong>Passport Available:</strong> {selectedRecord.input.passportAvailable}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-1.5">
                <h5 className="font-bold text-[#D4AF37]">Academic & Target Info:</h5>
                <p><strong>Education:</strong> {selectedRecord.input.currentEducationLevel} (CGPA {selectedRecord.input.cgpaOrGpa})</p>
                <p><strong>English:</strong> {selectedRecord.input.englishProficiency}</p>
                <p><strong>Target:</strong> {selectedRecord.input.preferredCountry} - {selectedRecord.input.preferredUniversity}</p>
                <p><strong>Intake & Subject:</strong> {selectedRecord.input.preferredIntake} ({selectedRecord.input.intendedSubject})</p>
                <p><strong>Scholarship Pref:</strong> {selectedRecord.input.scholarshipPreference}</p>
              </div>
            </div>

            {/* AI Results */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-[#D4AF37]">Generated AI Assessment Result:</h5>
                <span className="text-base font-extrabold text-[#D4AF37]">
                  {selectedRecord.result.eligibilityScore}% ({selectedRecord.result.admissionChance})
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-200">Top University Recommendations:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecord.result.recommendedUniversities.slice(0, 6).map((u, i) => (
                    <div key={i} className="p-2 rounded bg-white/5 border border-white/5">
                      <strong className="text-white block">{u.name} ({u.country})</strong>
                      <span className="text-[10px] text-slate-400 block">{u.tuitionFee} • {u.qsRanking}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs">
                <p className="font-bold text-[#D4AF37] mb-1">Advice Summary:</p>
                <p className="text-slate-300 bg-white/5 p-3 rounded-lg leading-relaxed">
                  {selectedRecord.result.personalizedAdvice}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Report</span>
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#0B1F3A] text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
