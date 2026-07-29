import React, { useRef } from 'react';
import { Download, Printer, ShieldCheck, Sparkles, Building2, Award, Calendar, CheckCircle2, Globe2, FileText, ExternalLink } from 'lucide-react';
import { ProfileEvaluationInput, ProfileEvaluationResult, AIAssessmentRecord } from '../../types';

interface OfficialPDFReportProps {
  assessment: AIAssessmentRecord;
}

export const OfficialPDFReport: React.FC<OfficialPDFReportProps> = ({ assessment }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const input = assessment.input;
  const result = assessment.result;

  const handlePrintOrPDF = () => {
    window.print();
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `VERCITO Official Report ID: ${assessment.id} | Student: ${input.fullName} | Status: Verified`
  )}`;

  return (
    <div className="space-y-4">
      {/* Control Action Bar */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl border border-[#D4AF37]/40 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-semibold">VERCITO Official AI Assessment Report ({assessment.id})</span>
        </div>
        <button
          onClick={handlePrintOrPDF}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-[#0B1F3A] font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Download PDF / Print Report</span>
        </button>
      </div>

      {/* Printable Report Canvas */}
      <div
        ref={reportRef}
        id="printable-vercito-report"
        className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xl space-y-8 max-w-4xl mx-auto print:p-0 print:shadow-none print:border-none print:m-0"
      >
        {/* Header Branding */}
        <div className="flex items-start justify-between border-b-2 border-[#0B1F3A] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center text-[#D4AF37] font-black text-lg">
                V
              </div>
              <span className="text-2xl font-black tracking-wider text-[#0B1F3A] font-serif">
                VERCITO
              </span>
            </div>
            <p className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase">
              Higher Education Consultancy • Europe & Global
            </p>
            <p className="text-[11px] text-slate-500">
              Dhaka Head Office (Gulshan 2) | Chittagong Branch | www.vercito.com
            </p>
          </div>

          {/* QR Code & Status */}
          <div className="text-right flex flex-col items-end">
            <img src={qrUrl} alt="QR Verification" className="w-16 h-16 border border-slate-300 p-1 rounded-lg" />
            <span className="text-[10px] text-slate-500 font-mono mt-1">Ref ID: {assessment.id}</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-0.5">
              ✓ OFFICIAL VERIFIED ASSESSMENT
            </span>
          </div>
        </div>

        {/* Student Profile Overview */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-sm text-[#0B1F3A] uppercase tracking-wider border-b border-slate-200 pb-1">
            1. Student Profile & Application Scope
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Full Name:</span>
              <strong className="text-slate-900">{input.fullName || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Email & Phone:</span>
              <strong className="text-slate-900">{input.email || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Current Degree:</span>
              <strong className="text-slate-900">{input.currentEducationLevel} ({input.cgpaOrGpa} CGPA)</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Target Field & Country:</span>
              <strong className="text-[#0B1F3A]">{input.intendedSubject} ({input.preferredCountry})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">English Proficiency:</span>
              <strong className="text-slate-900">{input.englishProficiency}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Passport Status:</span>
              <strong className="text-slate-900">{input.passportAvailable === 'Yes' ? 'Available' : 'Pending'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Estimated Budget:</span>
              <strong className="text-slate-900">{input.estimatedBudget}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Target Intake:</span>
              <strong className="text-slate-900">{input.preferredIntake}</strong>
            </div>
          </div>
        </div>

        {/* Admission & Visa Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <span className="text-[10px] text-blue-700 font-bold uppercase">Eligibility Match Score</span>
            <div className="text-3xl font-black text-blue-900">{result.eligibilityScore}%</div>
            <span className="text-xs font-semibold text-blue-800">{result.admissionChance} Chance</span>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-[10px] text-amber-700 font-bold uppercase">Scholarship Opportunity</span>
            <div className="text-3xl font-black text-amber-900">100% Waiver</div>
            <span className="text-xs font-semibold text-amber-800">DSU / Merit Grant Pre-Eligible</span>
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-700 font-bold uppercase">Visa Feasibility</span>
            <div className="text-3xl font-black text-emerald-900">High</div>
            <span className="text-xs font-semibold text-emerald-800">VFS Embassy Solvency Approved</span>
          </div>
        </div>

        {/* Top 10 Universities */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#0B1F3A] uppercase tracking-wider border-b border-slate-200 pb-1">
            2. Top 10 Recommended Universities
          </h3>
          <div className="space-y-2">
            {result.recommendedUniversities.slice(0, 10).map((uni, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <strong className="text-slate-900 text-sm">#{idx + 1} {uni.name}</strong> ({uni.country}) — <span className="text-slate-600">{uni.qsRanking}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">{uni.matchReason}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="font-bold text-blue-900 block">{uni.tuitionFee}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">{uni.scholarshipAvailability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scholarships */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#0B1F3A] uppercase tracking-wider border-b border-slate-200 pb-1">
            3. Recommended Matching Scholarships
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {result.recommendedScholarships.map((sch, idx) => (
              <div key={idx} className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 space-y-1">
                <strong className="text-amber-900 font-bold block">{sch.name}</strong>
                <p className="text-slate-700 text-[11px]">💰 Coverage: {sch.coverage}</p>
                <p className="text-slate-600 text-[11px]">📋 Eligibility: {sch.eligibility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan & Costs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase">Estimated Financial Budget</h4>
            <p>• Tuition Fee: <strong>{result.estimatedCost.tuitionFee}</strong></p>
            <p>• Monthly Living Cost: <strong>{result.estimatedCost.livingCost}</strong></p>
            <p>• Visa & Health Insurance: <strong>{result.estimatedCost.visaFee} + {result.estimatedCost.healthInsurance}</strong></p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase">Action Plan & Next Steps</h4>
            {result.nextStepsActionPlan.map((step, idx) => (
              <p key={idx} className="text-slate-700 text-[11px]">• {step}</p>
            ))}
          </div>
        </div>

        {/* Official Footer */}
        <div className="pt-6 border-t-2 border-[#0B1F3A] flex justify-between items-center text-[10px] text-slate-500">
          <div>
            <p>VERCITO Higher Education Consultancy • ISO Certified Admissions Portal</p>
            <p>Issued on: {new Date(assessment.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#0B1F3A]">Authorized Officer Signature</p>
            <p className="italic text-slate-400 font-serif text-xs">Chief Admissions Officer, VERCITO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
